// utils/resueltos.js — componente de "ejercicio resuelto" con resolución
// paso a paso revelable. Pensado para ver la técnica de resolución de cada tema.

import { el, typeset } from './dom.js';

/**
 * @typedef {Object} Paso
 * @property {string} idea   título corto del paso (qué se hace)
 * @property {string} detalle contenido HTML/LaTeX del paso
 */

/**
 * Construye un ejercicio resuelto.
 * @param {Object} cfg
 *  - fuente: etiqueta de origen (ej. "Parcial 1C2025 · Ej. 2" o "Práctica 1 · Ej. 7")
 *  - enunciado: HTML/LaTeX del enunciado
 *  - idea: (opcional) resumen de la estrategia general
 *  - pasos: array de { idea, detalle }
 *  - conclusion: (opcional) cierre / resultado final
 * @returns {HTMLElement}
 */
export function solvedExercise(cfg) {
  const root = el('div', { class: 'solved' });

  // Cabecera: fuente + enunciado
  if (cfg.fuente) root.appendChild(el('div', { class: 'solved-src', text: cfg.fuente }));
  root.appendChild(el('div', { class: 'solved-enun', html: '<strong>Enunciado.</strong> ' + cfg.enunciado }));

  if (cfg.idea) {
    root.appendChild(el('div', { class: 'solved-idea', html: '<strong>Estrategia:</strong> ' + cfg.idea }));
  }

  // Contenedor de pasos (ocultos hasta revelar)
  const stepsWrap = el('div', { class: 'solved-steps' });
  const stepNodes = cfg.pasos.map((p, i) => {
    const node = el('div', { class: 'solved-step' }, [
      el('div', { class: 'solved-step-head' }, [
        el('span', { class: 'solved-step-num', text: String(i + 1) }),
        el('span', { class: 'solved-step-idea', html: p.idea }),
      ]),
      el('div', { class: 'solved-step-body', html: p.detalle }),
    ]);
    node.style.display = 'none';
    stepsWrap.appendChild(node);
    return node;
  });

  const concl = cfg.conclusion
    ? el('div', { class: 'solved-concl', html: '<strong>Conclusión.</strong> ' + cfg.conclusion, style: 'display:none;' })
    : null;
  if (concl) stepsWrap.appendChild(concl);
  root.appendChild(stepsWrap);

  // Controles
  let shown = 0;
  const total = stepNodes.length;

  const next = el('button', { class: 'btn' }, '▶ Revelar paso 1');
  const all = el('button', { class: 'btn ghost' }, '⏭ Mostrar todo');
  const reset = el('button', { class: 'btn ghost', style: 'display:none;' }, '↺ Reiniciar');
  const controls = el('div', { class: 'controls', style: 'margin-top:10px;' }, [next, all, reset]);
  root.appendChild(controls);

  function reveal(k) {
    for (let i = 0; i < k; i++) stepNodes[i].style.display = 'block';
    shown = k;
    if (shown >= total) {
      if (concl) concl.style.display = 'block';
      next.style.display = 'none';
      all.style.display = 'none';
      reset.style.display = 'inline-flex';
    } else {
      next.textContent = `▶ Revelar paso ${shown + 1}`;
      reset.style.display = shown > 0 ? 'inline-flex' : 'none';
    }
    if (window.MathJax?.typesetPromise) {
      requestAnimationFrame(() => window.MathJax.typesetPromise([stepsWrap]).catch(() => {}));
    }
  }

  next.addEventListener('click', () => reveal(shown + 1));
  all.addEventListener('click', () => reveal(total));
  reset.addEventListener('click', () => {
    stepNodes.forEach((n) => { n.style.display = 'none'; });
    if (concl) concl.style.display = 'none';
    next.style.display = 'inline-flex';
    all.style.display = 'inline-flex';
    reset.style.display = 'none';
    shown = 0;
    next.textContent = '▶ Revelar paso 1';
  });

  typeset(root);
  return root;
}

/**
 * Agrupa varios ejercicios resueltos bajo un título de sección.
 * @param {string} titulo
 * @param {Array} lista  array de configs para solvedExercise
 * @returns {HTMLElement}
 */
export function seccionResueltos(titulo, lista) {
  const frag = document.createDocumentFragment();
  frag.appendChild(el('h2', { text: titulo }));
  frag.appendChild(el('p', {
    class: 'page-sub',
    html: 'Resoluciones paso a paso. Revelá cada paso a tu ritmo para ver la técnica, o mostrá todo de una.',
  }));
  lista.forEach((cfg) => frag.appendChild(solvedExercise(cfg)));
  return frag;
}
