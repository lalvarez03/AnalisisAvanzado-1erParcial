// utils/dnd.js — componentes de ejercicios asistidos.
//   1) orderProof: reordenar pasos de una demostración arrastrándolos.
//   2) fillBlanks: completar huecos eligiendo/arrastrando fichas.

import { el, typeset } from './dom.js';

/**
 * Ejercicio de ordenar pasos de demostración.
 * @param {object} cfg
 *   steps: array de strings (HTML/LaTeX) EN EL ORDEN CORRECTO.
 *   title, hint (opcionales)
 * @returns {HTMLElement}
 */
export function orderProof(cfg) {
  const correct = cfg.steps.slice();
  const root = el('div', { class: 'dnd-block' });
  if (cfg.title) root.appendChild(el('h3', { text: cfg.title, style: 'margin-top:0;' }));
  if (cfg.hint) root.appendChild(el('div', { class: 'callout tip', html: `<div class="tag">Objetivo</div>${cfg.hint}` }));

  root.appendChild(el('p', {
    class: 'dnd-instr',
    html: 'Arrastrá los pasos (⠿) para ordenarlos en una demostración válida. Luego verificá.',
  }));

  const list = el('div', { class: 'dnd-list' });

  // orden inicial desordenado (shuffle asegurando que no quede igual)
  const order = shuffle(correct.map((_, i) => i), correct.length);

  function makeItem(idx) {
    const item = el('div', {
      class: 'dnd-item',
      draggable: 'true',
      dataset: { idx: String(idx) },
    }, [
      el('span', { class: 'dnd-handle', text: '⠿' }),
      el('span', { class: 'dnd-text', html: correct[idx] }),
    ]);
    bindDrag(item, list);
    return item;
  }

  order.forEach((idx) => list.appendChild(makeItem(idx)));
  root.appendChild(list);

  const controls = el('div', { class: 'controls', style: 'margin-top:12px;' });
  const check = el('button', { class: 'btn' }, '✓ Verificar orden');
  const reshuffle = el('button', { class: 'btn ghost' }, '🔀 Mezclar');
  const solve = el('button', { class: 'btn ghost' }, '💡 Ver solución');
  controls.appendChild(check); controls.appendChild(reshuffle); controls.appendChild(solve);
  root.appendChild(controls);

  const feedback = el('div', { class: 'quiz-feedback', style: 'display:none;' });
  root.appendChild(feedback);

  function currentOrder() {
    return [...list.querySelectorAll('.dnd-item')].map((n) => Number(n.dataset.idx));
  }
  function markPositions(showAll) {
    const cur = currentOrder();
    [...list.children].forEach((node, pos) => {
      node.classList.remove('dnd-ok', 'dnd-bad');
      if (showAll) node.classList.add(cur[pos] === pos ? 'dnd-ok' : 'dnd-bad');
    });
  }

  check.addEventListener('click', () => {
    const cur = currentOrder();
    const ok = cur.every((v, i) => v === i);
    markPositions(true);
    feedback.style.display = 'block';
    feedback.className = 'quiz-feedback ' + (ok ? 'ok' : 'no');
    const rightCount = cur.filter((v, i) => v === i).length;
    feedback.innerHTML = ok
      ? '✓ ¡Correcto! Los pasos forman una demostración bien encadenada.'
      : `✗ Todavía no. ${rightCount}/${correct.length} pasos están en su lugar (marcados en verde). Seguí probando.`;
  });

  reshuffle.addEventListener('click', () => {
    const ord = shuffle(correct.map((_, i) => i), correct.length);
    list.innerHTML = '';
    ord.forEach((idx) => list.appendChild(makeItem(idx)));
    feedback.style.display = 'none';
  });

  solve.addEventListener('click', () => {
    list.innerHTML = '';
    correct.forEach((_, idx) => list.appendChild(makeItem(idx)));
    markPositions(true);
    feedback.style.display = 'block';
    feedback.className = 'quiz-feedback ok';
    feedback.innerHTML = 'Esta es una ordenación correcta. Estudiá cómo cada paso habilita al siguiente.';
    typeset(list);
  });

  // El tipografiado lo hace quien inserta el widget en el DOM (typeset diferido).
  return root;
}

/**
 * Ejercicio de completar huecos.
 * @param {object} cfg
 *   template: string con marcadores {{0}}, {{1}}, ... (puede tener LaTeX alrededor)
 *   blanks: array de { answer, options } (options incluye la correcta)
 *   title, hint
 */
export function fillBlanks(cfg) {
  const root = el('div', { class: 'dnd-block' });
  if (cfg.title) root.appendChild(el('h3', { text: cfg.title, style: 'margin-top:0;' }));
  if (cfg.hint) root.appendChild(el('div', { class: 'callout tip', html: `<div class="tag">Idea</div>${cfg.hint}` }));

  const state = new Array(cfg.blanks.length).fill(null);
  const selects = [];

  // separar el template por marcadores
  const parts = cfg.template.split(/(\{\{\d+\}\})/g);
  const body = el('div', { class: 'fill-body' });
  parts.forEach((part) => {
    const m = part.match(/^\{\{(\d+)\}\}$/);
    if (m) {
      const bi = Number(m[1]);
      const sel = el('select', { class: 'fill-select', dataset: { bi: String(bi) } });
      sel.appendChild(el('option', { value: '' }, '—'));
      // opciones mezcladas
      const opts = shuffle(cfg.blanks[bi].options.slice(), cfg.blanks[bi].options.length);
      opts.forEach((o) => sel.appendChild(el('option', { value: o }, o)));
      sel.addEventListener('change', () => { state[bi] = sel.value; });
      selects.push(sel);
      body.appendChild(sel);
    } else if (part) {
      body.appendChild(el('span', { html: part }));
    }
  });
  root.appendChild(body);

  const controls = el('div', { class: 'controls', style: 'margin-top:12px;' });
  const check = el('button', { class: 'btn' }, '✓ Verificar');
  const solve = el('button', { class: 'btn ghost' }, '💡 Ver solución');
  controls.appendChild(check); controls.appendChild(solve);
  root.appendChild(controls);

  const feedback = el('div', { class: 'quiz-feedback', style: 'display:none;' });
  root.appendChild(feedback);

  check.addEventListener('click', () => {
    let allOk = true;
    selects.forEach((sel) => {
      const bi = Number(sel.dataset.bi);
      const ok = sel.value === cfg.blanks[bi].answer;
      sel.classList.remove('fill-ok', 'fill-bad');
      sel.classList.add(ok ? 'fill-ok' : 'fill-bad');
      if (!ok) allOk = false;
    });
    feedback.style.display = 'block';
    feedback.className = 'quiz-feedback ' + (allOk ? 'ok' : 'no');
    feedback.innerHTML = allOk
      ? '✓ ¡Todo correcto! La demostración quedó bien completada.'
      : '✗ Hay huecos mal (en rojo). Revisá esos pasos.';
  });

  solve.addEventListener('click', () => {
    selects.forEach((sel) => {
      const bi = Number(sel.dataset.bi);
      sel.value = cfg.blanks[bi].answer;
      sel.classList.remove('fill-bad');
      sel.classList.add('fill-ok');
    });
    feedback.style.display = 'block';
    feedback.className = 'quiz-feedback ok';
    feedback.innerHTML = 'Solución completada. Leé la cadena entera para ver el razonamiento.';
  });

  // El tipografiado lo hace quien inserta el widget en el DOM (typeset diferido).
  return root;
}

// ---------- helpers internos ----------

function shuffle(arr, n) {
  // Fisher-Yates; reintenta si queda idéntico al original (para n>1).
  const original = arr.slice();
  let out = arr.slice();
  let tries = 0;
  do {
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    tries++;
  } while (n > 1 && out.every((v, i) => v === original[i]) && tries < 20);
  return out;
}

function bindDrag(item, list) {
  item.addEventListener('dragstart', (e) => {
    item.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    try { e.dataTransfer.setData('text/plain', item.dataset.idx); } catch { /* IE */ }
  });
  item.addEventListener('dragend', () => item.classList.remove('dragging'));

  // habilitar drop sobre la lista (una vez por lista)
  if (!list.__dndBound) {
    list.__dndBound = true;
    list.addEventListener('dragover', (e) => {
      e.preventDefault();
      const dragging = list.querySelector('.dragging');
      if (!dragging) return;
      const after = getAfterElement(list, e.clientY);
      if (after == null) list.appendChild(dragging);
      else list.insertBefore(dragging, after);
    });
  }
}

function getAfterElement(list, y) {
  const items = [...list.querySelectorAll('.dnd-item:not(.dragging)')];
  let closest = { offset: -Infinity, element: null };
  for (const child of items) {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) closest = { offset, element: child };
  }
  return closest.element;
}
