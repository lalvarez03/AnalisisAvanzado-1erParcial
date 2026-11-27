// core/paginas/guia.js — "Guía resuelta": todos los ejercicios resueltos, con pestañas por guía (genérico).
// Lee `guias` de la materia activa: [{ id, nombre, datos: [ejercicioResuelto] }].

import { el } from '../../utils/dom.js';
import { pageHeader, callout } from '../../utils/page.js';
import { solvedExercise } from '../../utils/resueltos.js';
import { materiaActiva } from '../materia.js';
import { guardarSeleccion, leerSeleccion } from '../seleccion.js';

export function renderGuia(root) {
  const m = materiaActiva();
  const guias = m.guias || [];

  root.appendChild(pageHeader(
    'Guía resuelta',
    'Todos los ejercicios de las guías de <strong>' + m.nombre + '</strong> resueltos paso a paso. '
    + 'Elegí la práctica y revelá la resolución de cada ejercicio a tu ritmo.'
  ));

  if (!guias.length) {
    root.appendChild(callout('warn', 'Sin contenido todavía', 'Esta materia aún no tiene ejercicios resueltos.'));
    return;
  }

  root.appendChild(callout('tip', 'Cómo usar',
    'Cada ejercicio muestra su enunciado y una estrategia. Con <em>Revelar paso 1</em>, <em>2</em>… vas viendo '
    + 'la resolución de a poco (ideal para intentarlo antes), o <em>Mostrar todo</em> de una. '
    + 'Podés reiniciar cuando quieras.'
  ));

  const picker = el('div', { class: 'ex-picker' });
  const holder = el('div', {});

  function load(g) {
    [...picker.children].forEach((p) => p.classList.toggle('active', p.dataset.id === g.id));
    guardarSeleccion('guia', g.id);
    holder.innerHTML = '';
    holder.appendChild(el('div', { class: 'page-sub', style: 'margin: 6px 0 14px;', text: `${g.datos.length} ejercicios resueltos` }));
    g.datos.forEach((cfg) => holder.appendChild(solvedExercise(cfg)));
    if (window.MathJax?.typesetPromise) {
      requestAnimationFrame(() => window.MathJax.typesetPromise([holder]).catch(() => {}));
    }
  }

  guias.forEach((g) => {
    picker.appendChild(el('button', { class: 'ex-pill', dataset: { id: g.id }, onClick: () => load(g) }, g.nombre));
  });

  root.appendChild(el('div', { class: 'ex-picker-label', text: 'Práctica' }));
  root.appendChild(picker);
  root.appendChild(holder);
  const guardada = leerSeleccion('guia');
  load(guias.find((g) => g.id === guardada) || guias[0]);

  const extra = (m.herramientas || []).filter((h) => h.id === 'estudio');
  if (extra.length) {
    root.appendChild(callout('', 'Más práctica',
      extra.map((h) => `<a href="#${h.id}">${h.titulo}</a>`).join(' · ')));
  }
}
