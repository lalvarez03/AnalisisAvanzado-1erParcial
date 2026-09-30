// pages/card-numerables.js — Conjuntos finitos, numerables; numerabilidad de ℚ.

import { el, slider } from '../utils/dom.js';
import { pageHeader, callout, mountCanvas } from '../utils/page.js';
import { exRef } from '../utils/ejercicios.js';
import { COLORS } from '../constants.js';

export function renderNumerables(root) {
  root.appendChild(pageHeader(
    'Conjuntos finitos, numerables y no numerables',
    'Clasificamos los conjuntos según su cardinal. El primer infinito es $\\aleph_0$, el de $\\mathbb{N}$.'
  ));

  root.appendChild(callout('def', 'Definiciones',
    '<strong>Finito:</strong> $A \\sim \\{1, \\dots, n\\}$ para algún $n$, o $A = \\varnothing$.<br>'
    + '<strong>Numerable</strong> (infinito numerable): $A \\sim \\mathbb{N}$. Su cardinal es $\\aleph_0$.<br>'
    + '<strong>Contable:</strong> finito o numerable.<br>'
    + '<strong>No numerable:</strong> infinito y no coordinable con $\\mathbb{N}$ (por ejemplo $\\mathbb{R}$).'
  ));

  root.appendChild(callout('thm', 'Hechos que usaremos (Práctica 2)',
    '• Unión de dos contables es contable.<br>'
    + '• Unión <em>numerable</em> de conjuntos contables es contable.<br>'
    + '• $\\mathbb{Z}$, $\\mathbb{Q}$, los primos y $\\mathbb{N}^k$ son numerables.<br>'
    + '• Un subconjunto infinito de un numerable es numerable.'
  ));
  root.appendChild(exRef(2, [1, 2, 4, 6]));

  root.appendChild(el('h2', { text: 'ℚ⁺ es numerable: el recorrido diagonal de Cantor' }));
  root.appendChild(el('p', { html:
    'Ordenamos las fracciones $p/q$ en una grilla ($p$ = fila, $q$ = columna) y las recorremos '
    + 'en diagonales. Saltando las que ya aparecieron (no reducidas), obtenemos una lista: '
    + 'una biyección $\\mathbb{N} \\to \\mathbb{Q}^{+}$.' }));

  const controls = el('div', { class: 'controls' });
  const pasos = slider({ label: 'Fracciones enumeradas', min: 1, max: 60, step: 1, value: 15 });
  const auto = el('button', { class: 'btn' }, '▶ Animar');
  controls.appendChild(pasos.wrap);
  controls.appendChild(auto);
  root.appendChild(controls);

  const N = 8; // grilla N x N
  const viz = mountCanvas(root, {
    height: 440,
    view: { xmin: 0, xmax: 1, ymin: 0, ymax: 1 },
    hint: 'filas = numerador p · columnas = denominador q',
  });

  // Precalcular el orden diagonal, marcando las fracciones ya vistas.
  const seen = new Set();
  const order = []; // {p, q, dup}
  for (let s = 2; s <= 2 * N; s++) {
    // suma p+q = s; alternamos dirección para el zig-zag
    const cells = [];
    for (let p = 1; p < s; p++) {
      const q = s - p;
      if (p <= N && q <= N) cells.push([p, q]);
    }
    if (s % 2 === 0) cells.reverse();
    for (const [p, q] of cells) {
      const val = p / q;
      const dup = seen.has(val);
      if (!dup) seen.add(val);
      order.push({ p, q, dup });
    }
  }

  function draw() {
    const p = viz.plane;
    p.clear();
    const W = p.width, H = p.height;
    const m = 46; // margen
    const cell = Math.min((W - m - 20), (H - m - 20)) / N;
    const ox = m, oy = m;
    const count = Number(pasos.input.value);

    // etiquetas de ejes
    p.ctx.font = '12px Inter';
    p.ctx.fillStyle = COLORS.textDim;
    p.ctx.textAlign = 'center'; p.ctx.textBaseline = 'middle';
    for (let q = 1; q <= N; q++) p.textPx('q=' + q, ox + (q - 0.5) * cell, oy - 16, { align: 'center', color: COLORS.textDim, font: '11px Inter' });
    for (let pp = 1; pp <= N; pp++) p.textPx('p=' + pp, ox - 22, oy + (pp - 0.5) * cell, { align: 'center', color: COLORS.textDim, font: '11px Inter' });

    // grilla de fracciones
    for (let pp = 1; pp <= N; pp++) {
      for (let q = 1; q <= N; q++) {
        const cx = ox + (q - 0.5) * cell;
        const cy = oy + (pp - 0.5) * cell;
        p.ctx.strokeStyle = COLORS.border;
        p.ctx.lineWidth = 1;
        p.ctx.strokeRect(ox + (q - 1) * cell, oy + (pp - 1) * cell, cell, cell);
        p.ctx.fillStyle = '#5a6690';
        p.ctx.font = Math.max(10, cell * 0.24) + 'px Inter';
        p.textPx(pp + '/' + q, cx, cy, { align: 'center', color: '#5a6690', font: Math.max(10, cell * 0.24) + 'px Inter' });
      }
    }

    // camino recorrido
    let k = 0;
    let prev = null;
    let label = 1;
    for (let i = 0; i < order.length && k < count; i++) {
      const { p: pp, q, dup } = order[i];
      const cx = ox + (q - 0.5) * cell;
      const cy = oy + (pp - 0.5) * cell;
      if (prev) {
        p.ctx.strokeStyle = dup ? '#4a5478' : COLORS.accent;
        p.ctx.lineWidth = 2;
        p.ctx.setLineDash(dup ? [4, 4] : []);
        p.ctx.beginPath(); p.ctx.moveTo(prev[0], prev[1]); p.ctx.lineTo(cx, cy); p.ctx.stroke();
        p.ctx.setLineDash([]);
      }
      // marca de la celda
      p.ctx.beginPath();
      p.ctx.arc(cx, cy, cell * 0.34, 0, 7);
      p.ctx.fillStyle = dup ? 'rgba(90,102,144,0.35)' : COLORS.accent;
      p.ctx.fill();
      if (!dup) {
        p.ctx.fillStyle = '#fff';
        p.ctx.font = 'bold ' + Math.max(10, cell * 0.26) + 'px Inter';
        p.textPx(String(label), cx, cy, { align: 'center', color: '#fff', font: 'bold ' + Math.max(10, cell * 0.26) + 'px Inter' });
        label++;
      }
      prev = [cx, cy];
      k++;
    }
  }

  viz.setDraw(draw);
  pasos.input.addEventListener('input', () => viz.redraw());

  // Animación simple
  let timer = null;
  auto.addEventListener('click', () => {
    if (timer) { clearInterval(timer); timer = null; auto.textContent = '▶ Animar'; return; }
    auto.textContent = '⏸ Pausar';
    timer = setInterval(() => {
      let v = Number(pasos.input.value);
      if (v >= 60) { clearInterval(timer); timer = null; auto.textContent = '▶ Animar'; return; }
      pasos.input.value = v + 1;
      pasos.setLabel(v + 1);
      viz.redraw();
    }, 220);
  });
  // limpieza del timer al salir de la página
  import('../state.js').then(({ registerCleanup }) => {
    registerCleanup(() => { if (timer) clearInterval(timer); });
  });

  root.appendChild(callout('tip', 'Por qué funciona',
    'El recorrido diagonal visita <em>toda</em> fracción positiva en un número finito de pasos. '
    + 'Descartar las no reducidas (líneas punteadas) deja una enumeración sin repeticiones. '
    + 'Agregando el $0$ y los negativos con un zig-zag, obtenemos $\\mathbb{Q} \\sim \\mathbb{N}$.'
  ));
}
