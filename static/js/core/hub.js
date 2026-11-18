// core/hub.js — menú de materias (capa superior). Una tarjeta por materia del registro.
// El progreso de cada una se calcula al cargar su manifiesto (en segundo plano).

import { el } from '../utils/dom.js';
import { REGISTRO } from '../../materias/registry.js';
import { progresoDeMateria } from '../state.js';

function tarjeta(meta, { onAbrir, cargarManifiesto }) {
  const activa = meta.estado === 'activa';
  const barra = el('i', { style: 'width:0%' });
  const progreso = el('small', { class: 'mat-prog-txt', text: activa ? 'Calculando avance…' : 'Próximamente' });
  const boton = el('button', { class: 'hero-btn primary', type: 'button', disabled: activa ? null : 'disabled' }, activa ? 'Entrar ›' : 'Próximamente');
  const cont = el('button', { class: 'hero-btn', type: 'button', hidden: 'hidden' }, '');
  const acciones = el('div', { class: 'unit-actions' }, [boton, cont]);

  const card = el('article', { class: 'materia-card' + (activa ? '' : ' disabled'), style: `--materia:${meta.color}` }, [
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

  boton.addEventListener('click', () => onAbrir(meta.id, 'inicio'));

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
        boton.textContent = 'Menú de la materia ›';
      }
    }
  }).catch((e) => {
    console.error('No se pudo cargar la materia', meta.id, e);
    progreso.textContent = 'Error al cargar';
  });

  return card;
}

export function renderHub(root, ctx) {
  root.appendChild(el('section', { class: 'hub-hero' }, [
    el('h1', { class: 'hero-title', text: 'Tus materias' }),
    el('p', { class: 'hero-sub', html:
      'Cada materia tiene su propio menú, teoría, ejercicios resueltos, machete y progreso. '
      + 'Elegí una para continuar; tu avance en cada una se guarda por separado.' }),
  ]));

  const grid = el('div', { class: 'materias-grid' });
  REGISTRO.forEach((meta) => grid.appendChild(tarjeta(meta, ctx)));

  grid.appendChild(el('article', { class: 'materia-card nueva' }, [
    el('div', { class: 'materia-ic', 'aria-hidden': 'true', text: '＋' }),
    el('div', { class: 'materia-body' }, [
      el('h3', { class: 'materia-nombre', text: 'Agregar una materia' }),
      el('p', { class: 'materia-desc', html:
        'Cada materia es un componente en <code>static/materias/&lt;id&gt;/</code>. Para crear una nueva: '
        + '<code>py tools/nueva_materia.py &lt;id&gt; "Nombre"</code> y registrarla en <code>materias/registry.js</code>. '
        + 'Guía completa en la skill <em>materias-componentes</em>.' }),
    ]),
  ]));

  root.appendChild(grid);
  root.appendChild(el('p', { class: 'home-foot', text: 'Tu progreso, el Pomodoro y tus preferencias se guardan en este navegador.' }));
}
