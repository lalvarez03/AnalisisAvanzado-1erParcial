// core/paginas/practicas.js — menú principal del mundo PRÁCTICAS (genérico).
// Segmentado por práctica/unidad: cada tarjeta lleva a "Estudiar por práctica" y a los "Ejercicios resueltos"
// de esa guía. Debajo, las herramientas de práctica (p. ej. el asistente de demostraciones).

import { el } from '../../utils/dom.js';
import { materiaActiva, plan, etiquetaParcial } from '../materia.js';
import { irAPractica } from '../seleccion.js';

/** Unidades que tienen guía de estudio y/o ejercicios resueltos, con sus datos. */
export function practicasDeMateria(m) {
  return plan().UNIDADES
    .map((u) => ({
      u,
      estudio: (m.estudio || []).find((e) => e.id === u.id) || null,
      guia: (m.guias || []).find((g) => g.id === u.id) || null,
    }))
    .filter((x) => x.estudio || x.guia);
}

/** Guías que no corresponden a ninguna unidad (parciales, recuperatorios…). */
export function guiasSueltas(m) {
  const ids = new Set(plan().UNIDADES.map((u) => u.id));
  return (m.guias || []).filter((g) => !ids.has(g.id));
}

function tarjetaPractica(m, { u, estudio, guia }) {
  const rotulo = u.etiqueta || 'U' + u.num;
  const n = guia?.datos?.length || 0;
  const acciones = [];
  if (estudio) acciones.push(el('button', { class: 'hero-btn primary', type: 'button', onClick: () => irAPractica('estudio', u.id) }, '🗺️ Estudiar ' + rotulo));
  if (guia) acciones.push(el('button', { class: 'hero-btn', type: 'button', onClick: () => irAPractica('guia', u.id) }, `📖 Ejercicios resueltos (${n})`));
  const teoria = u.paginas[0];
  if (teoria) acciones.push(el('a', { class: 'hero-btn', href: '#' + teoria.id, title: 'Volver a la teoría de esta unidad' }, '📚 Ver teoría'));

  return el('article', { class: 'unit', style: `--unit:${u.color}` }, [
    el('div', { class: 'unit-rail' }, [el('div', { class: 'unit-badge', text: rotulo })]),
    el('div', { class: 'unit-card' }, [
      el('div', { class: 'unit-head' }, [
        el('div', {}, [
          el('h3', { class: 'unit-title', text: u.ic + ' ' + u.titulo }),
          el('div', { class: 'unit-meta' }, [el('span', { text: estudio?.titulo || u.capitulo || '' })]),
        ]),
      ]),
      el('p', { class: 'unit-desc', html: estudio?.resumen || u.resumen }),
      el('div', { class: 'unit-actions' }, acciones),
    ]),
  ]);
}

export function renderPracticas(root) {
  const m = materiaActiva();
  const { HERRAMIENTAS } = plan();
  const practicas = practicasDeMateria(m);
  const sueltas = guiasSueltas(m);

  root.appendChild(el('section', { class: 'hero', style: `--materia:${m.color}` }, [
    el('div', { class: 'hero-text' }, [
      el('h1', { class: 'hero-title', text: 'Prácticas · ' + m.nombre }),
      el('p', { class: 'hero-sub', html:
        'Acá se <strong>practica</strong>: una sección por guía de ejercicios, con recetas, mapa de ejercicios, '
        + 'errores comunes y todos los ejercicios resueltos paso a paso. La teoría (definiciones, demostraciones y gráficas) '
        + 'está en <a href="#inicio">Teóricas</a>.' }),
    ]),
  ]));

  root.appendChild(el('section', { class: 'flow' }, [
    el('h2', { class: 'home-h2', text: 'Cómo practicar cada guía' }),
    el('div', { class: 'flow-steps' }, [
      ['1', '🗺️', 'Mirá el mapa', 'Qué técnica va con cada ejercicio.'],
      ['2', '🧪', 'Elegí la receta', 'El patrón de resolución del tipo de ejercicio.'],
      ['3', '✏️', 'Intentá en papel', 'Antes de mirar nada.'],
      ['4', '👣', 'Revelá de a un paso', 'Compará tu camino con el resuelto.'],
      ['5', '🧩', 'Armá la demostración', 'Con el asistente, ordenando los pasos.'],
    ].map(([n, ic, h, p]) => el('div', { class: 'flow-step' }, [
      el('div', { class: 'flow-num', text: n }),
      el('div', { class: 'flow-ic', text: ic }),
      el('h4', { text: h }),
      el('p', { text: p }),
    ]))),
  ]));

  root.appendChild(el('h2', { class: 'home-h2', text: 'Guías por práctica' }));
  if (!practicas.length) {
    root.appendChild(el('p', { class: 'page-sub', text: 'Esta materia todavía no tiene guías de práctica cargadas.' }));
  } else {
    const ruta = el('div', { class: 'route' });
    let ultimoParcial = null;
    practicas.forEach((p) => {
      const lp = etiquetaParcial(p.u.id);
      if (lp && lp !== ultimoParcial) { ruta.appendChild(el('h3', { class: 'parcial-titulo', text: lp })); ultimoParcial = lp; }
      ruta.appendChild(tarjetaPractica(m, p));
    });
    root.appendChild(ruta);
  }

  if (sueltas.length) {
    root.appendChild(el('h2', { class: 'home-h2', text: 'Parciales y otras guías' }));
    const grid = el('div', { class: 'home-grid' });
    sueltas.forEach((g) => grid.appendChild(el('button', {
      class: 'home-card', type: 'button', onClick: () => irAPractica('guia', g.id),
    }, [
      el('div', { class: 'ic', text: '📝' }),
      el('h4', { text: g.nombre }),
      el('p', { text: `${g.datos.length} ejercicios resueltos` }),
    ])));
    root.appendChild(grid);
  }

  // Herramientas de práctica que no son estudio/guía (ya cubiertas por las tarjetas de arriba).
  const otras = HERRAMIENTAS.filter((h) => !h.grupo && h.id !== 'estudio' && h.id !== 'guia'
    && plan().modoDePagina(h.id) === 'practica');
  if (otras.length) {
    root.appendChild(el('h2', { class: 'home-h2', text: 'Herramientas' }));
    const grid = el('div', { class: 'home-grid' });
    otras.forEach((h) => grid.appendChild(el('a', { class: 'home-card', href: '#' + h.id }, [
      el('div', { class: 'ic', text: h.ic }),
      el('h4', { text: h.titulo }),
      el('p', { text: h.desc }),
    ])));
    root.appendChild(grid);
  }

  if (m.machete) {
    root.appendChild(el('p', { class: 'home-foot', html:
      'Para repasar rápido antes de un parcial: <a href="machete.html?m=' + encodeURIComponent(m.id)
      + '" target="_blank" rel="noopener">abrir el machete 📄</a>.' }));
  }
}
