// pages/em-acumulacion.js — Puntos de acumulación y puntos aislados.

import { el, slider, selectControl } from '../utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../utils/page.js';
import { exRef } from '../utils/ejercicios.js';
import { COLORS } from '../constants.js';
import { registerCleanup } from '../state.js';

// Conjuntos en R representados como listas de puntos (para dibujar) y un test de pertenencia denso.
const SETS = {
  inv_n: {
    label: '{ 1/n : n ∈ ℕ }',
    points: () => Array.from({ length: 60 }, (_, i) => 1 / (i + 1)),
    isLimit: (x) => Math.abs(x) < 1e-9,          // sólo 0 es de acumulación
    limitDesc: 'El único punto de acumulación es 0 (que no pertenece al conjunto).',
    isolatedDesc: 'Todos los puntos 1/n son aislados.',
  },
  inv_n_0: {
    label: '{ 1/n : n ∈ ℕ } ∪ {0}',
    points: () => [0, ...Array.from({ length: 60 }, (_, i) => 1 / (i + 1))],
    isLimit: (x) => Math.abs(x) < 1e-9,
    limitDesc: 'El único punto de acumulación es 0, y ahora sí pertenece: el conjunto es cerrado.',
    isolatedDesc: 'Los 1/n siguen siendo aislados; 0 es de acumulación (no aislado).',
  },
  interval: {
    label: '[0, 1]',
    points: () => Array.from({ length: 200 }, (_, i) => i / 199),
    isLimit: (x) => x >= 0 && x <= 1,
    limitDesc: 'Todo punto de [0,1] es de acumulación (el intervalo es "denso en sí mismo").',
    isolatedDesc: 'No hay puntos aislados.',
  },
  open_interval: {
    label: '(0, 1)   (abierto)',
    points: () => Array.from({ length: 200 }, (_, i) => 0.002 + (0.996 * i) / 199),
    isLimit: (x) => x >= 0 && x <= 1,
    limitDesc: 'A\' = [0,1]: incluso 0 y 1 son de acumulación aunque no pertenezcan a (0,1). Por eso (0,1) no es cerrado.',
    isolatedDesc: 'No hay puntos aislados.',
  },
  rationals: {
    label: 'ℚ ∩ [0, 1]   (racionales)',
    points: () => {
      const pts = [];
      for (let q = 1; q <= 14; q++) for (let p = 0; p <= q; p++) pts.push(p / q);
      return pts;
    },
    isLimit: (x) => x >= 0 && x <= 1,
    limitDesc: 'ℚ∩[0,1] es denso: TODO punto de [0,1] es de acumulación (racional o irracional). A\' = [0,1].',
    isolatedDesc: 'No hay puntos aislados: entre dos racionales siempre hay otro.',
  },
  two_limits: {
    label: '{ 1/n } ∪ { 1 − 1/n } ∪ {0, 1}',
    points: () => [0, 1, ...Array.from({ length: 30 }, (_, i) => 1 / (i + 2)), ...Array.from({ length: 30 }, (_, i) => 1 - 1 / (i + 2))],
    isLimit: (x) => Math.abs(x) < 1e-9 || Math.abs(x - 1) < 1e-9,
    limitDesc: 'DOS puntos de acumulación: 0 y 1 (ambos pertenecen). A\' = {0, 1}.',
    isolatedDesc: 'Todos los términos 1/n y 1−1/n son aislados; sólo 0 y 1 son de acumulación.',
  },
  integers: {
    label: 'ℤ ∩ [0, 1] = {0, 1}   (discreto)',
    points: () => [0, 1],
    isLimit: () => false,
    limitDesc: 'Un conjunto finito nunca tiene puntos de acumulación: A\' = ∅. Es cerrado y discreto.',
    isolatedDesc: 'Los dos puntos, 0 y 1, son aislados.',
  },
};

export function renderAcumulacion(root) {
  root.appendChild(pageHeader(
    'Puntos de acumulación y puntos aislados',
    'El <strong>conjunto derivado</strong> $A\'$ reúne los puntos a los que $A$ “se acumula”. '
    + 'Lo demás son puntos aislados o exteriores.'
  ));

  root.appendChild(callout('def', 'Definiciones',
    '$x$ es <strong>punto de acumulación</strong> de $A$ si toda bola $B(x,r)$ contiene un punto de $A$ '
    + '<em>distinto de $x$</em>. El conjunto de todos ellos es el <strong>derivado</strong> $A\'$.<br>'
    + '$x \\in A$ es <strong>aislado</strong> si existe $r>0$ con $B(x,r) \\cap A = \\{x\\}$.<br>'
    + 'Relación clave: $\\;\\overline{A} = A \\cup A\'$.'
  ));

  root.appendChild(callout('def', 'Conjunto denso',
    '$A$ es <strong>denso</strong> en $E$ si $\\overline{A} = E$; equivalentemente, si toda bola '
    + '$B(x,r)$ (con $r>0$) contiene algún punto de $A$. Ejemplo: $\\mathbb{Q}$ es denso en $\\mathbb{R}$.'
  ));

  root.appendChild(el('h2', { text: 'Explorador en la recta real' }));
  root.appendChild(el('p', { html:
    'Elegí un conjunto y un punto $x$ (slider). Reducí el radio $r$: si por más chico que sea la bola '
    + 'siempre atrapa puntos de $A$ distintos de $x$, entonces $x$ es de acumulación.' }));

  const controls = el('div', { class: 'controls' });
  const setSel = selectControl({
    label: 'Conjunto A',
    options: Object.entries(SETS).map(([k, v]) => ({ value: k, label: v.label })),
    value: 'inv_n_0',
  });
  const xSlider = slider({ label: 'x', min: -0.2, max: 1.2, step: 0.01, value: 0, format: (v) => v.toFixed(2) });
  const rSlider = slider({ label: 'radio r', min: 0.01, max: 0.5, step: 0.01, value: 0.2, format: (v) => v.toFixed(2) });
  controls.appendChild(setSel.wrap);
  controls.appendChild(xSlider.wrap);
  controls.appendChild(rSlider.wrap);
  root.appendChild(controls);

  const viz = mountCanvas(root, {
    height: 240,
    view: { xmin: -0.25, xmax: 1.25, ymin: -1, ymax: 1 },
    hint: 'puntos de A sobre la recta · banda = bola B(x, r)',
  });

  const out = readout('');
  root.appendChild(out);

  function draw() {
    const p = viz.plane;
    p.clear();
    // eje
    p.ctx.strokeStyle = COLORS.textDim;
    p.ctx.lineWidth = 1.5;
    p.ctx.beginPath();
    p.ctx.moveTo(0, p.sy(0)); p.ctx.lineTo(p.width, p.sy(0)); p.ctx.stroke();

    const setKey = setSel.select.value;
    const S = SETS[setKey];
    const x = Number(xSlider.input.value);
    const r = Number(rSlider.input.value);

    // banda de la bola
    p.ctx.fillStyle = 'rgba(124,92,255,0.18)';
    const x1 = p.sx(x - r), x2 = p.sx(x + r);
    p.ctx.fillRect(x1, 0, x2 - x1, p.height);
    p.ctx.strokeStyle = COLORS.accent2;
    p.ctx.setLineDash([5, 4]);
    p.ctx.beginPath(); p.ctx.moveTo(x1, 0); p.ctx.lineTo(x1, p.height);
    p.ctx.moveTo(x2, 0); p.ctx.lineTo(x2, p.height); p.ctx.stroke();
    p.ctx.setLineDash([]);

    // puntos de A
    const pts = S.points();
    let othersInBall = 0;
    for (const a of pts) {
      if (a < -0.25 || a > 1.25) continue;
      const inBall = Math.abs(a - x) < r;
      const isX = Math.abs(a - x) < 1e-6;
      if (inBall && !isX) othersInBall++;
      p.dot(a, 0, inBall ? 5 : 3.5, inBall ? COLORS.ok : COLORS.accent);
    }
    // marcador x
    p.dot(x, 0, 6, COLORS.warn, false);
    p.text('x', x, 0.28, { color: COLORS.warn, align: 'center', font: 'bold 13px Inter' });

    // ticks 0 y 1
    p.text('0', 0, -0.35, { color: COLORS.textDim, align: 'center' });
    p.text('1', 1, -0.35, { color: COLORS.textDim, align: 'center' });

    // clasificación
    const belongs = pts.some((a) => Math.abs(a - x) < 1e-6);
    const isLim = S.isLimit(x);
    let tipo;
    if (isLim && belongs) tipo = 'x ∈ A y es de acumulación (no aislado)';
    else if (isLim && !belongs) tipo = "x ∉ A pero es de acumulación (x ∈ A' \\ A)";
    else if (belongs) tipo = 'x ∈ A y es AISLADO';
    else tipo = 'x es exterior / ni de A ni de acumulación';

    out.textContent =
      `x = ${x.toFixed(2)},  r = ${r.toFixed(2)}\n`
      + `puntos de A en B(x,r) distintos de x: ${othersInBall}\n`
      + `→ ${tipo}`;
  }

  viz.setDraw(draw);
  setSel.select.addEventListener('change', () => viz.redraw());
  xSlider.input.addEventListener('input', () => viz.redraw());
  rSlider.input.addEventListener('input', () => viz.redraw());

  const dyn = callout('', 'Sobre este conjunto', SETS['inv_n_0'].limitDesc + ' ' + SETS['inv_n_0'].isolatedDesc);
  root.appendChild(dyn);
  setSel.select.addEventListener('change', () => {
    const S = SETS[setSel.select.value];
    dyn.querySelector('div:last-child').textContent = S.limitDesc + ' ' + S.isolatedDesc;
  });

  root.appendChild(callout('thm', 'Conexión con cerrados',
    '$A$ es <strong>cerrado</strong> $\\iff A\' \\subseteq A$ (contiene a todos sus puntos de acumulación). '
    + 'Por eso $\\{1/n\\}$ no es cerrado (le falta el $0$) pero $\\{1/n\\} \\cup \\{0\\}$ sí lo es.'
  ));
  root.appendChild(exRef(3, [3, 8, 10]));

  registerCleanup(() => {});
}
