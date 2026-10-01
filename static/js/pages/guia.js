// pages/guia.js — Guía resuelta: todos los ejercicios de las Prácticas 1-3
// resueltos paso a paso, con tabs por práctica.

import { el } from '../utils/dom.js';
import { pageHeader, callout } from '../utils/page.js';
import { solvedExercise } from '../utils/resueltos.js';
import { GUIA_P1 } from '../utils/guia-p1.js';
import { GUIA_P2 } from '../utils/guia-p2.js';
import { GUIA_P3 } from '../utils/guia-p3.js';

const PRACTICAS = [
  { id: 'p1', nombre: 'Práctica 1 · Supremos y sucesiones', datos: GUIA_P1 },
  { id: 'p2', nombre: 'Práctica 2 · Cardinalidad', datos: GUIA_P2 },
  { id: 'p3', nombre: 'Práctica 3 · Espacios métricos', datos: GUIA_P3 },
];

export function renderGuia(root) {
  root.appendChild(pageHeader(
    'Guía resuelta',
    'Todos los ejercicios de las <strong>Prácticas 1, 2 y 3</strong> resueltos paso a paso. '
    + 'Elegí la práctica y revelá la resolución de cada ejercicio a tu ritmo.'
  ));

  root.appendChild(callout('tip', 'Cómo usar',
    'Cada ejercicio muestra su enunciado y una estrategia. Con <em>Revelar paso 1</em>, <em>2</em>… vas viendo '
    + 'la resolución de a poco (ideal para intentarlo antes), o <em>Mostrar todo</em> de una. '
    + 'Podés reiniciar cuando quieras.'
  ));

  // selector de práctica (tabs)
  const picker = el('div', { class: 'ex-picker' });
  const holder = el('div', {});

  function load(prac) {
    [...picker.children].forEach((p) => p.classList.toggle('active', p.dataset.id === prac.id));
    holder.innerHTML = '';
    holder.appendChild(el('div', {
      class: 'page-sub',
      style: 'margin: 6px 0 14px;',
      text: `${prac.datos.length} ejercicios resueltos`,
    }));
    prac.datos.forEach((cfg) => holder.appendChild(solvedExercise(cfg)));
    if (window.MathJax?.typesetPromise) {
      requestAnimationFrame(() => window.MathJax.typesetPromise([holder]).catch(() => {}));
    }
  }

  PRACTICAS.forEach((prac) => {
    picker.appendChild(el('button', {
      class: 'ex-pill',
      dataset: { id: prac.id },
      onClick: () => load(prac),
    }, prac.nombre));
  });

  root.appendChild(el('div', { class: 'ex-picker-label', text: 'Práctica' }));
  root.appendChild(picker);
  root.appendChild(holder);

  load(PRACTICAS[0]);

  root.appendChild(callout('', 'Más práctica',
    'Para armar demostraciones arrastrando pasos, visitá el <a href="#asistente">Asistente de ejercicios</a>. '
    + 'Para preguntas rápidas, la <a href="#quiz">Autoevaluación</a>.'
  ));
}
