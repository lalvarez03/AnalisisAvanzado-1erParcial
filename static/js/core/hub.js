// core/hub.js — menú de materias (capa superior). Una tarjeta por materia del registro.
// El progreso de cada una se calcula al cargar su manifiesto (en segundo plano).
//
// Ajustes:
//  · ⚙️ de cada tarjeta (a la derecha): orden de las prácticas y parcial de cada una (por materia, en localStorage).
//  · Botón "Ajustes" de arriba: agregar/quitar materias de esta pantalla, mostrar u ocultar el avance (todo o nada),
//    activar/desactivar el Pomodoro y enviar feedback.
//  Ambos ajustes se abren como popup (core/modal.js).

import { el } from '../utils/dom.js';
import { REGISTRO } from '../../materias/registry.js';
import { progresoDeMateria, registerCleanup } from '../state.js';
import { leerAjustes, guardarAjustes, parcialDe, unidadesOrdenadas } from './materia.js';
import {
  EVENTO_CONFIG, materiaVisible, setMateriaVisible, avanceActivo, setAvanceActivo, pomodoroActivo, setPomodoroActivo,
} from './config-usuario.js';
import { renderFeedback } from './paginas/feedback.js';
import { abrirModal } from './modal.js';

export const EVENTO_AJUSTES = 'aa:ajustes';

// ---------------------------------------------------------------------------
// Ajustes de UNA materia (se abre con el ⚙️ de su tarjeta)
// ---------------------------------------------------------------------------
function panelMateria(m, cont) {
  cont.innerHTML = '';
  const aj = leerAjustes(m);
  const unidades = unidadesOrdenadas(m, aj);
  const ids = unidades.map((u) => u.id);
  const hayParciales = Array.isArray(m.primerParcial);
  const guardar = (nuevo) => {
    guardarAjustes(m, nuevo);
    window.dispatchEvent(new CustomEvent(EVENTO_AJUSTES, { detail: { id: m.id } }));
    panelMateria(m, cont);
  };
  const copia = () => ({ orden: aj.orden ? aj.orden.slice() : null, parcial: { ...aj.parcial } });

  cont.appendChild(el('p', { class: 'aj-nota', html: 'Si la cátedra cambia el <strong>orden</strong> de los temas, reordená las prácticas: el menú lateral, el "siguiente tema" y las guías lo siguen. '
    + (hayParciales ? 'El menú lateral agrupa por <strong>primer y segundo parcial</strong>; podés pasar una práctica al otro parcial con su selector.' : '') }));

  const lista = el('ol', { class: 'aj-lista' });
  let ultimo = null;
  unidades.forEach((u, i) => {
    const p = hayParciales ? parcialDe(m, aj, u.id) : null;
    if (hayParciales && p !== ultimo) { lista.appendChild(el('li', { class: 'parcial-titulo', text: p === 1 ? 'Primer parcial' : 'Segundo parcial' })); ultimo = p; }
    const mover = (d) => { const j = i + d; const orden = ids.slice(); [orden[i], orden[j]] = [orden[j], orden[i]]; const a = copia(); a.orden = orden; guardar(a); };
    const vecinoMismoParcial = (j) => j >= 0 && j < ids.length && (!hayParciales || parcialDe(m, aj, ids[j]) === p);
    const fila = el('li', { class: 'aj-fila', style: `--unit:${u.color}` }, [
      el('span', { class: 'aj-num', text: u.etiqueta || String(u.num) }),
      el('span', { class: 'aj-titulo', text: u.titulo }),
    ]);
    if (hayParciales) {
      const sel = el('select', { 'aria-label': 'Parcial de ' + u.titulo }, [el('option', { value: '1' }, '1.º parcial'), el('option', { value: '2' }, '2.º parcial')]);
      sel.value = String(p);
      sel.addEventListener('change', () => { const a = copia(); a.parcial[u.id] = Number(sel.value); guardar(a); });
      fila.appendChild(sel);
    }
    fila.appendChild(el('button', { class: 'btn ghost aj-btn', type: 'button', title: 'Subir', 'aria-label': 'Subir ' + u.titulo, disabled: vecinoMismoParcial(i - 1) ? null : '', onClick: () => mover(-1) }, '↑'));
    fila.appendChild(el('button', { class: 'btn ghost aj-btn', type: 'button', title: 'Bajar', 'aria-label': 'Bajar ' + u.titulo, disabled: vecinoMismoParcial(i + 1) ? null : '', onClick: () => mover(1) }, '↓'));
    lista.appendChild(fila);
  });
  cont.appendChild(lista);
  cont.appendChild(el('div', { class: 'controls' }, [
    el('button', { class: 'btn ghost', type: 'button', onClick: () => guardar({ orden: null, parcial: {} }) }, '↺ Restablecer orden y parciales'),
  ]));
}

// ---------------------------------------------------------------------------
// Tarjeta de materia
// ---------------------------------------------------------------------------
function tarjeta(meta, { onAbrir, cargarManifiesto }) {
  const activa = meta.estado === 'activa';
  const barra = el('i', { style: 'width:0%' });
  const progreso = el('small', { class: 'mat-prog-txt', text: activa ? 'Calculando avance…' : 'Próximamente' });
  const boton = el('button', { class: 'hero-btn primary', type: 'button', disabled: activa ? null : 'disabled' }, activa ? '📚 Menú de la teoría' : 'Próximamente');
  const botonPractica = activa ? el('button', { class: 'hero-btn', type: 'button' }, '✏️ Menú de la práctica') : null;
  const cont = el('button', { class: 'hero-btn', type: 'button', hidden: 'hidden' }, '');
  const acciones = el('div', { class: 'unit-actions' }, [boton, botonPractica, cont].filter(Boolean));

  const card = el('article', { class: 'materia-card' + (activa ? '' : ' disabled') , style: `--materia:${meta.color}` }, [
    el('div', { class: 'materia-ic', 'aria-hidden': 'true', text: meta.icono }),
    el('div', { class: 'materia-body' }, [
      el('h3', { class: 'materia-nombre', text: meta.nombre }),
      el('div', { class: 'materia-inst', text: meta.institucion || '' }),
      el('p', { class: 'materia-desc', text: meta.descripcion || '' }),
      el('div', { class: 'unit-prog' }, [el('div', { class: 'bar' }, [barra]), progreso]),
      acciones,
    ]),
  ]);

  if (!activa) return card;

  // ⚙️ a la derecha: ajustes de esta materia, en un popup (el manifiesto se carga recién al abrir)
  const gear = el('button', {
    class: 'materia-gear', type: 'button', title: 'Ajustes de la materia', 'aria-label': 'Ajustes de ' + meta.nombre, 'aria-haspopup': 'dialog',
  }, '⚙️');
  gear.addEventListener('click', async () => {
    const { cuerpo } = abrirModal({ titulo: `${meta.icono} Ajustes de ${meta.nombre}`, ancho: 680 });
    cuerpo.textContent = 'Cargando…';
    const m = await cargarManifiesto(meta.id);
    if (m) panelMateria(m, cuerpo); else cuerpo.textContent = 'No se pudieron cargar los ajustes.';
  });
  card.appendChild(gear);

  boton.addEventListener('click', () => onAbrir(meta.id, 'inicio'));
  botonPractica.addEventListener('click', () => onAbrir(meta.id, 'practicas'));

  cargarManifiesto(meta.id).then((m) => {
    if (!m) { progreso.textContent = 'No disponible'; return; }
    const p = progresoDeMateria(m);
    barra.style.width = p.pct + '%';
    progreso.textContent = `${p.hechos}/${p.total} temas · ${p.pct}%`;
    if (p.ultima) {
      const titulo = m.unidades.flatMap((u) => u.paginas).concat(m.herramientas || []).find((x) => x.id === p.ultima)?.titulo;
      if (titulo) {
        cont.hidden = false;
        cont.textContent = `▶ Seguir: ${titulo}`;
        cont.addEventListener('click', () => onAbrir(meta.id, p.ultima));
      }
    }
  }).catch((e) => {
    console.error('No se pudo cargar la materia', meta.id, e);
    progreso.textContent = 'Error al cargar';
  });

  return card;
}

// ---------------------------------------------------------------------------
// Ajustes generales (botón "Ajustes" del menú de materias)
// ---------------------------------------------------------------------------
function interruptor(texto, marcado, alCambiar) {
  const input = el('input', { type: 'checkbox' });
  input.checked = marcado;
  input.addEventListener('change', () => alCambiar(input.checked));
  return el('label', {}, [input, el('span', { text: texto })]);
}

function panelGlobal() {
  const panel = el('div', { class: 'ajustes-global' });

  panel.appendChild(el('h3', { text: '📚 Materias de la pantalla principal' }));
  panel.appendChild(el('p', { class: 'aj-nota', text: 'Quitar una materia solo la oculta de esta pantalla: tu progreso y tus ajustes quedan guardados. Volvé a tildarla para agregarla de nuevo.' }));
  REGISTRO.forEach((meta) => {
    const fila = el('div', { class: 'aj-switch' + (materiaVisible(meta.id) ? '' : ' removida') }, [
      el('span', { class: 'aj-nombre', text: `${meta.icono} ${meta.nombre}` }),
      interruptor('Mostrar en la pantalla principal', materiaVisible(meta.id), (v) => { setMateriaVisible(meta.id, v); fila.classList.toggle('removida', !v); }),
    ]);
    panel.appendChild(fila);
  });

  panel.appendChild(el('h3', { text: '✅ Avance' }));
  panel.appendChild(el('p', { class: 'aj-nota', text: 'Se muestra el avance de todas las materias o de ninguna: checks del menú lateral, porcentajes, anillo y barras de progreso. Si lo desactivás, lo ya marcado no se borra.' }));
  panel.appendChild(el('div', { class: 'aj-switch' }, [
    el('span', { class: 'aj-nombre', text: 'Avance de las materias' }),
    interruptor('Mostrar avance', avanceActivo(), (v) => setAvanceActivo(v)),
  ]));

  panel.appendChild(el('h3', { text: '🍅 Pomodoro' }));
  panel.appendChild(el('div', { class: 'aj-switch' }, [
    el('span', { class: 'aj-nombre', text: 'Temporizador de la barra superior' }),
    interruptor('Mostrar el Pomodoro', pomodoroActivo(), (v) => setPomodoroActivo(v)),
  ]));

  panel.appendChild(el('h3', { text: '💬 Feedback' }));
  const fb = el('div', { class: 'ajustes-feedback' });
  panel.appendChild(fb);
  renderFeedback(fb);
  return panel;
}

// ---------------------------------------------------------------------------
// Pantalla principal
// ---------------------------------------------------------------------------
export function renderHub(root, ctx) {
  const btnAjustes = el('button', { class: 'hero-btn hub-ajustes-btn', type: 'button', 'aria-haspopup': 'dialog' }, '⚙️ Ajustes');
  btnAjustes.addEventListener('click', () => {
    abrirModal({ titulo: '⚙️ Ajustes', ancho: 640 }).cuerpo.appendChild(panelGlobal());
  });

  root.appendChild(el('section', { class: 'hub-hero' }, [
    el('div', { class: 'hub-top' }, [
      el('div', {}, [
        el('h1', { class: 'hero-title', text: 'Ñatos de Ciencias · Tus materias' }),
        el('p', { class: 'hero-sub', html:
          '<strong>Ñatos de Ciencias</strong>: un lugar para estudiar sin perderse. '
          + 'Cada materia tiene su menú de teoría y su menú de práctica, con ejercicios resueltos, machete y progreso. Con el <strong>⚙️ de cada tarjeta</strong> reordenás sus prácticas y parciales; '
          + 'con <strong>Ajustes</strong> elegís qué materias ver, el avance, el Pomodoro y mandás feedback.' }),
      ]),
      btnAjustes,
    ]),
  ]));
  const grid = el('div', { class: 'materias-grid' });
  const pintar = () => {
    grid.innerHTML = '';
    const visibles = REGISTRO.filter((meta) => materiaVisible(meta.id));
    visibles.forEach((meta) => grid.appendChild(tarjeta(meta, ctx)));
    if (!visibles.length) grid.appendChild(el('p', { class: 'page-sub', text: 'No hay materias en la pantalla principal. Agregalas desde Ajustes → Materias.' }));
    grid.appendChild(el('article', { class: 'materia-card nueva' }, [
      el('div', { class: 'materia-ic', 'aria-hidden': 'true', text: '＋' }),
      el('div', { class: 'materia-body' }, [
        el('h3', { class: 'materia-nombre', text: 'Próximamente, más materias' }),
        el('p', { class: 'materia-desc', text: 'Estamos preparando nuevas materias. Si ocultaste alguna, la volvés a mostrar desde Ajustes.' }),
      ]),
    ]));
  };
  pintar();
  root.appendChild(grid);
  root.appendChild(el('footer', { class: 'hub-pie' }, [
    el('p', { class: 'hub-pie-txt', html:
      'Esta aplicación se desarrolló con el fin de ayudar a los estudiantes de la carrera de <strong>Ciencias de Datos</strong> '
      + 'y de la <strong>Facultad de Ciencias Exactas y Naturales</strong>. Es una herramienta pensada <strong>para la comunidad</strong>.' }),
    el('p', { class: 'home-foot', text: 'Tu progreso, el Pomodoro y tus preferencias se guardan en este navegador.' }),
  ]));

  // Las tarjetas se redibujan cuando cambia la configuración (el panel de ajustes se conserva).
  const alCambiarConfig = () => pintar();
  window.addEventListener(EVENTO_CONFIG, alCambiarConfig);
  registerCleanup(() => window.removeEventListener(EVENTO_CONFIG, alCambiarConfig));
}
