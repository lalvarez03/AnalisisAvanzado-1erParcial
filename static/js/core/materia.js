// core/materia.js — contrato de "materia" y materia activa.
//
// Una materia es un componente autocontenido (ver .kiro/skills/materias-componentes/SKILL.md):
//   static/materias/<id>/index.js  exporta por defecto un objeto con la forma de abajo.
// El núcleo no conoce ninguna materia en particular: todo (menú, progreso, inicio, ejercicios,
// machete) sale del manifiesto de la materia activa.
//
// Manifiesto (campos):
//   id, nombre, nombreCorto, icono, color, descripcion, institucion, subtitulo
//   unidades:     [{ id, num, etiqueta, ic, color, titulo, capitulo, resumen, requiere:[ids], paginas:[{id, ic, titulo, desc}] }]
//   herramientas: [{ id, ic, titulo, desc, modo?, grupo? }]  (estudio, guia, feedback tienen versión genérica)
//                 modo: 'teoria' | 'practica' (por defecto 'practica'; las de grupo 'extra' son neutrales)
//   Modos: la app tiene dos "mundos". Teoría = inicio + temas de `unidades`. Práctica = página genérica
//   'practicas' (menú de prácticas) + herramientas (estudio, guia, asistente…), segmentadas por unidad/guía.
//   paginas:      { [idPagina]: (root) => void }      (render de cada página propia; pisan a las genéricas)
//   resultados:   { [idPagina]: [{ n, e, ref?, p? }] } (teoremas/propiedades del tema)
//   estudio:      [{ id, titulo, teoria, paginas, resumen, saber, recetas, mapa, errores }]  (uno por guía)
//   guias:        [{ id, nombre, datos: [ejercicioResuelto] }]
//   machete:      'machete.html'                      (fragmento HTML dentro de la carpeta de la materia)
//   primerParcial: [idUnidad…]                       (unidades del 1.º parcial; el resto es 2.º parcial. Opcional)
//   redirecciones: { [idViejo]: idNuevo }            (rutas eliminadas que se redirigen, opcional)
//   almacenamiento: { visited, seen, lastPage, navCollapsed, practica }  (solo para claves heredadas)

/** Deriva orden de páginas, títulos y búsqueda de unidad a partir de unidades + herramientas. */
export function crearPlan({ unidades = [], herramientas = [] }) {
  const PAGINAS_TEORIA = unidades.flatMap((u) => u.paginas.map((p) => p.id));
  const PAGE_ORDER = ['inicio', ...PAGINAS_TEORIA, ...herramientas.map((h) => h.id)];
  const PAGE_TITLES = {
    inicio: 'Presentación',
    practicas: 'Prácticas',
    ...Object.fromEntries(unidades.flatMap((u) => u.paginas.map((p) => [p.id, p.titulo]))),
    ...Object.fromEntries(herramientas.map((h) => [h.id, h.titulo])),
  };
  const unidadDePagina = (pageId) => unidades.find((u) => u.paginas.some((p) => p.id === pageId)) || null;

  // Modo ("mundo") al que pertenece cada página: 'teoria' | 'practica' | null (neutral: no cambia de modo).
  //  · 'inicio' y los temas de las unidades → teoría; 'practicas' → práctica.
  //  · Herramientas: usan `h.modo` si lo declaran; si no, las del grupo 'extra' son neutrales y el resto es práctica.
  const MODO_POR_PAGINA = {
    inicio: 'teoria',
    practicas: 'practica',
    ...Object.fromEntries(PAGINAS_TEORIA.map((id) => [id, 'teoria'])),
    ...Object.fromEntries(herramientas.map((h) => [h.id, h.modo || (h.grupo === 'extra' ? null : 'practica')])),
  };
  const modoDePagina = (pageId) => MODO_POR_PAGINA[pageId] ?? null;

  return { UNIDADES: unidades, HERRAMIENTAS: herramientas, PAGINAS_TEORIA, PAGE_ORDER, PAGE_TITLES, unidadDePagina, modoDePagina };
}

let activa = null;

// ---------------------------------------------------------------------------
// Ajustes de la materia (localStorage): orden de las unidades y agrupación por parcial.
//   { orden: [idUnidad…] | null, parcial: { [idUnidad]: 1|2 } }
// Si la materia declara `primerParcial`, las unidades siempre se agrupan por parcial (1.º y 2.º).
// Los ajustes se editan desde el ⚙️ de la tarjeta de cada materia en el menú de materias (core/hub.js).
// El manifiesto declara `primerParcial: [idUnidad…]` (las unidades del 1.º parcial por defecto).
// ---------------------------------------------------------------------------

const AJUSTES_VACIOS = () => ({ orden: null, parcial: {} });

export function leerAjustes(manifiesto) {
  try {
    const raw = localStorage.getItem(claveMateria('ajustes', manifiesto));
    const a = raw ? JSON.parse(raw) : null;
    return a && typeof a === 'object' ? { ...AJUSTES_VACIOS(), ...a } : AJUSTES_VACIOS();
  } catch { return AJUSTES_VACIOS(); }
}

export function guardarAjustes(manifiesto, ajustes) {
  try { localStorage.setItem(claveMateria('ajustes', manifiesto), JSON.stringify(ajustes)); } catch { /* ignorar */ }
}

/** Parcial (1 o 2) de una unidad: el elegido por el usuario o, si no, el que declara el manifiesto. */
export function parcialDe(manifiesto, ajustes, idUnidad) {
  if (ajustes.parcial?.[idUnidad] === 1 || ajustes.parcial?.[idUnidad] === 2) return ajustes.parcial[idUnidad];
  const primero = manifiesto.primerParcial;
  if (!primero) return 1;
  return primero.includes(idUnidad) ? 1 : 2;
}

/** Ordena `lista` (con campo `id`) según `orden`; los ids que no figuran quedan al final, en su orden original. O(n log n). */
function ordenarPorIds(lista = [], orden) {
  if (!orden) return lista;
  const pos = new Map(orden.map((id, i) => [id, i]));
  return lista.map((x, i) => [x, i]).sort((a, b) => (pos.get(a[0].id) ?? 1e6 + a[1]) - (pos.get(b[0].id) ?? 1e6 + b[1])).map(([x]) => x);
}

/**
 * Unidades en el orden que ve el usuario: primero el orden guardado (o el del manifiesto) y, si la materia declara parciales,
 * agrupadas por parcial (1.º y luego 2.º), manteniendo dentro de cada grupo el orden elegido. O(n log n).
 */
export function unidadesOrdenadas(manifiesto, ajustes = leerAjustes(manifiesto)) {
  let unidades = ordenarPorIds(manifiesto.unidades, ajustes.orden);
  if (Array.isArray(manifiesto.primerParcial)) {
    unidades = unidades.map((u, i) => [u, i])
      .sort((a, b) => (parcialDe(manifiesto, ajustes, a[0].id) - parcialDe(manifiesto, ajustes, b[0].id)) || (a[1] - b[1]))
      .map(([u]) => u);
  }
  return unidades;
}

/** Activa una materia (ya cargada) y calcula su plan, aplicando los ajustes guardados (orden y parcial). */
export function activarMateria(manifiesto) {
  const ajustes = leerAjustes(manifiesto);
  const unidades = unidadesOrdenadas(manifiesto, ajustes);
  const orden = unidades.map((u) => u.id);
  activa = {
    ...manifiesto,
    base: manifiesto,
    ajustes,
    unidades,
    estudio: ordenarPorIds(manifiesto.estudio, orden),
    guias: ordenarPorIds(manifiesto.guias, orden),
    parcialDe: (idUnidad) => parcialDe(manifiesto, ajustes, idUnidad),
    plan: crearPlan({ unidades, herramientas: manifiesto.herramientas }),
  };
  return activa;
}

/** Vuelve a calcular la materia activa (tras cambiar los ajustes). */
export function reactivarMateria() {
  if (!activa) return null;
  return activarMateria(activa.base);
}

/** Nombre del parcial de una unidad cuando la agrupación está activa; si no, null. */
export function etiquetaParcial(idUnidad) {
  const m = activa;
  if (!m || !Array.isArray(m.base?.primerParcial)) return null;
  return m.parcialDe(idUnidad) === 1 ? 'Primer parcial' : 'Segundo parcial';
}

export function materiaActiva() {
  if (!activa) throw new Error('No hay una materia activa.');
  return activa;
}

export function hayMateriaActiva() { return activa !== null; }

export function plan() { return materiaActiva().plan; }

/**
 * Clave de localStorage de la materia activa. Las materias nuevas usan `aa:<id>:<nombre>`;
 * una materia con datos previos puede declarar sus claves antiguas en `almacenamiento`.
 */
export function claveMateria(nombre, manifiesto = activa) {
  return manifiesto?.almacenamiento?.[nombre] || `aa:${manifiesto.id}:${nombre}`;
}
