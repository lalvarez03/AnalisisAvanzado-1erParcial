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
//   herramientas: [{ id, ic, titulo, desc }]          (estudio, guia, feedback tienen versión genérica)
//   paginas:      { [idPagina]: (root) => void }      (render de cada página propia; pisan a las genéricas)
//   resultados:   { [idPagina]: [{ n, e, ref?, p? }] } (teoremas/propiedades del tema)
//   estudio:      [{ id, titulo, teoria, paginas, resumen, saber, recetas, mapa, errores }]  (uno por guía)
//   guias:        [{ id, nombre, datos: [ejercicioResuelto] }]
//   machete:      'machete.html'                      (fragmento HTML dentro de la carpeta de la materia)
//   almacenamiento: { visited, seen, lastPage, navCollapsed, practica }  (solo para claves heredadas)

/** Deriva orden de páginas, títulos y búsqueda de unidad a partir de unidades + herramientas. */
export function crearPlan({ unidades = [], herramientas = [] }) {
  const PAGINAS_TEORIA = unidades.flatMap((u) => u.paginas.map((p) => p.id));
  const PAGE_ORDER = ['inicio', ...PAGINAS_TEORIA, ...herramientas.map((h) => h.id)];
  const PAGE_TITLES = {
    inicio: 'Presentación',
    ...Object.fromEntries(unidades.flatMap((u) => u.paginas.map((p) => [p.id, p.titulo]))),
    ...Object.fromEntries(herramientas.map((h) => [h.id, h.titulo])),
  };
  const unidadDePagina = (pageId) => unidades.find((u) => u.paginas.some((p) => p.id === pageId)) || null;
  return { UNIDADES: unidades, HERRAMIENTAS: herramientas, PAGINAS_TEORIA, PAGE_ORDER, PAGE_TITLES, unidadDePagina };
}

let activa = null;

/** Activa una materia (ya cargada) y calcula su plan. */
export function activarMateria(manifiesto) {
  activa = { ...manifiesto, plan: crearPlan({ unidades: manifiesto.unidades, herramientas: manifiesto.herramientas }) };
  return activa;
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
