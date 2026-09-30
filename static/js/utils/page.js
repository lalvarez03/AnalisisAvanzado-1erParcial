// utils/page.js — utilidades de alto nivel compartidas por las páginas.

import { el } from './dom.js';
import { createPlane } from './canvas2d.js';
import { registerCleanup } from '../state.js';

/** Encabezado estándar de página. */
export function pageHeader(title, subtitle) {
  const frag = document.createDocumentFragment();
  frag.appendChild(el('h1', { class: 'page-title', text: title }));
  if (subtitle) frag.appendChild(el('p', { class: 'page-sub', html: subtitle }));
  return frag;
}

/**
 * Callout con etiqueta (def / thm / tip / warn / plain).
 * @param {string} kind    def | thm | tip | warn | ''
 * @param {string} tag     etiqueta corta (mayúsculas)
 * @param {string} htmlContent  cuerpo (HTML/LaTeX)
 * @param {string} [proofHtml]  si se pasa, agrega un botón que despliega esta demostración
 */
export function callout(kind, tag, htmlContent, proofHtml) {
  const node = el('div', { class: 'callout ' + (kind || '') }, [
    tag ? el('div', { class: 'tag', text: tag }) : null,
    el('div', { html: htmlContent }),
  ]);
  if (proofHtml) node.appendChild(proofBlock(proofHtml));
  return node;
}

/**
 * Bloque de demostración expandible con botón de toggle.
 * @param {string} proofHtml  contenido de la prueba (HTML/LaTeX)
 * @param {string} [label]    texto del botón (por defecto "Ver demostración")
 */
export function proofBlock(proofHtml, label = 'Ver demostración') {
  const body = el('div', { class: 'proof-body', html: proofHtml });
  const btn = el('button', { class: 'proof-toggle', 'aria-expanded': 'false' },
    [el('span', { class: 'proof-caret', text: '▸' }), el('span', { text: ' ' + label })]);
  const wrap = el('div', { class: 'proof-wrap' }, [btn, body]);

  btn.addEventListener('click', () => {
    const open = wrap.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.querySelector('.proof-caret').textContent = open ? '▾' : '▸';
    btn.querySelector('span:last-child').textContent = open ? ' Ocultar demostración' : ' ' + label;
    if (open && window.MathJax?.typesetPromise) {
      requestAnimationFrame(() => window.MathJax.typesetPromise([body]).catch(() => {}));
    }
  });
  return wrap;
}

/**
 * Monta un canvas con un plano cartesiano y un loop de dibujo.
 * Maneja resize (ResizeObserver) y limpieza automática al cambiar de página.
 * @returns {{canvas, plane, redraw}}
 */
export function mountCanvas(parent, { height = 380, view, hint, onReady }) {
  const wrap = el('div', { class: 'viz-wrap' });
  const canvas = el('canvas', { class: 'viz', style: `height:${height}px;` });
  wrap.appendChild(canvas);
  if (hint) wrap.appendChild(el('div', { class: 'viz-hint', text: hint }));
  parent.appendChild(wrap);

  const plane = createPlane(canvas, view || {});
  let drawFn = () => {};
  const redraw = () => { plane.resize(); drawFn(); };

  const api = {
    canvas,
    plane,
    setDraw(fn) { drawFn = fn; },
    redraw,
  };

  const ro = new ResizeObserver(() => redraw());
  ro.observe(canvas);
  registerCleanup(() => ro.disconnect());

  if (onReady) onReady(api);
  // primer dibujo tras layout
  requestAnimationFrame(redraw);
  return api;
}

/** requestAnimationFrame loop con cleanup automático. */
export function animate(step) {
  let raf = 0;
  let running = true;
  const loop = (t) => {
    if (!running) return;
    step(t);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  registerCleanup(() => { running = false; cancelAnimationFrame(raf); });
  return { stop() { running = false; cancelAnimationFrame(raf); } };
}

/** Lectura de valores en vivo (bloque monoespaciado). */
export function readout(initial = '') {
  return el('div', { class: 'readout', text: initial });
}
