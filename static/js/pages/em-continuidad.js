// pages/em-continuidad.js — Continuidad: definición ε–δ.

import { el, slider, selectControl } from '../utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../utils/page.js';
import { COLORS } from '../constants.js';

const FUNCS = {
  parabola: { label: 'f(x) = x²   (continua)', f: (x) => x * x, cont: true, view: { xmin: -3, xmax: 3, ymin: -1, ymax: 9 } },
  linear: { label: 'f(x) = 2x + 1   (continua)', f: (x) => 2 * x + 1, cont: true, view: { xmin: -3, xmax: 3, ymin: -5, ymax: 7 } },
  abs: { label: 'f(x) = |x|   (continua, con pico)', f: (x) => Math.abs(x), cont: true, view: { xmin: -3, xmax: 3, ymin: -0.5, ymax: 3 } },
  sqrtabs: { label: 'f(x) = √|x|   (continua)', f: (x) => Math.sqrt(Math.abs(x)), cont: true, view: { xmin: -3, xmax: 3, ymin: -0.5, ymax: 2 } },
  step: { label: 'f(x) = escalón (salto en 0)', f: (x) => (x < 0 ? -1 : 1), cont: false, jump: 0, view: { xmin: -3, xmax: 3, ymin: -2.2, ymax: 2.2 } },
  floor: { label: 'f(x) = ⌊x⌋   (saltos en cada entero)', f: (x) => Math.floor(x), cont: false, jump: 1, view: { xmin: -3, xmax: 3, ymin: -3.5, ymax: 3.5 } },
};

export function renderContinuidad(root) {
  root.appendChild(pageHeader(
    'Continuidad',
    'La idea $\\varepsilon$–$\\delta$: por chico que fijemos el objetivo $\\varepsilon$ alrededor de $f(x_0)$, '
    + 'existe una tolerancia $\\delta$ en la entrada que lo garantiza.'
  ));

  root.appendChild(callout('def', 'Definición — Continuidad en un punto',
    '$f:(E,d) \\to (F,\\rho)$ es <strong>continua en $x_0$</strong> si '
    + '$\\forall \\varepsilon>0\\; \\exists \\delta>0$ tal que '
    + '$d(x, x_0) < \\delta \\Rightarrow \\rho(f(x), f(x_0)) < \\varepsilon$. '
    + '$f$ es continua si lo es en todo punto.'
  ));

  root.appendChild(callout('def', 'Caracterizaciones equivalentes',
    '• <strong>Sucesional:</strong> $x_n \\to x_0 \\Rightarrow f(x_n) \\to f(x_0)$.<br>'
    + '• <strong>Topológica:</strong> $f$ es continua $\\iff$ la <em>preimagen de todo abierto es abierta</em> '
    + '($\\iff$ preimagen de todo cerrado es cerrada).'
  ));

  root.appendChild(callout('def', 'Continuidad uniforme, homeomorfismo, isometría',
    '<strong>Uniformemente continua:</strong> $\\forall \\varepsilon > 0\\; \\exists \\delta > 0\\; '
    + '\\forall x, y:\\ d(x,y) < \\delta \\Rightarrow \\rho(f(x), f(y)) < \\varepsilon$ '
    + '(un mismo $\\delta$ sirve para todos los puntos).<br>'
    + '<strong>Homeomorfismo:</strong> biyección continua $f$ cuya inversa $f^{-1}$ también es continua.<br>'
    + '<strong>Isometría:</strong> $f$ que preserva distancias: $\\rho(f(x), f(y)) = d(x,y)$ para todo $x,y$.'
  ));

  root.appendChild(el('h2', { text: 'El juego ε–δ' }));
  root.appendChild(el('p', { html:
    'Fijás la banda horizontal $\\varepsilon$ alrededor de $f(x_0)$ (verde). Luego movés $\\delta$: la banda '
    + 'vertical (azul) debe hacer que toda la curva sobre $(x_0-\\delta,\\, x_0+\\delta)$ quede dentro de la verde.' }));

  const controls = el('div', { class: 'controls' });
  const fSel = selectControl({
    label: 'Función',
    options: Object.entries(FUNCS).map(([k, v]) => ({ value: k, label: v.label })),
    value: 'parabola',
  });
  const x0S = slider({ label: 'x₀', min: -2.5, max: 2.5, step: 0.1, value: 1, format: (v) => v.toFixed(1) });
  const epsS = slider({ label: 'ε', min: 0.1, max: 3, step: 0.05, value: 1.2, format: (v) => v.toFixed(2) });
  const delS = slider({ label: 'δ', min: 0.05, max: 2, step: 0.05, value: 0.5, format: (v) => v.toFixed(2) });
  controls.appendChild(fSel.wrap);
  controls.appendChild(x0S.wrap);
  controls.appendChild(epsS.wrap);
  controls.appendChild(delS.wrap);
  root.appendChild(controls);

  const viz = mountCanvas(root, {
    height: 420,
    view: FUNCS.parabola.view,
    hint: 'verde = banda ε en la salida · azul = banda δ en la entrada',
  });

  const out = readout('');
  root.appendChild(out);

  function draw() {
    const p = viz.plane;
    const key = fSel.select.value;
    const F = FUNCS[key];
    // ajustar vista a la función
    Object.assign(p.view, F.view);
    p.clear();
    p.grid(1);

    const x0 = Number(x0S.input.value);
    const eps = Number(epsS.input.value);
    const del = Number(delS.input.value);
    const y0 = F.f(x0);

    // banda epsilon (horizontal)
    p.ctx.fillStyle = 'rgba(53,201,138,0.16)';
    const yTop = p.sy(y0 + eps), yBot = p.sy(y0 - eps);
    p.ctx.fillRect(0, yTop, p.width, yBot - yTop);
    // banda delta (vertical)
    p.ctx.fillStyle = 'rgba(91,140,255,0.16)';
    const xL = p.sx(x0 - del), xR = p.sx(x0 + del);
    p.ctx.fillRect(xL, 0, xR - xL, p.height);

    // curva
    p.ctx.strokeStyle = COLORS.pink; p.ctx.lineWidth = 2.5;
    p.ctx.beginPath();
    let first = true;
    let worst = 0; // máxima desviación dentro de delta
    for (let px = 0; px <= p.width; px += 2) {
      const x = p.wx(px);
      if (key === 'step' && Math.abs(x) < 0.01) { first = true; continue; }
      const y = F.f(x);
      const sy = p.sy(y);
      if (first) { p.ctx.moveTo(px, sy); first = false; } else p.ctx.lineTo(px, sy);
    }
    p.ctx.stroke();

    // chequeo: sobre (x0-del, x0+del) ¿|f(x)-y0|<eps?
    let ok = true;
    const samples = 200;
    for (let i = 0; i <= samples; i++) {
      const x = x0 - del + (2 * del) * (i / samples);
      const dev = Math.abs(F.f(x) - y0);
      worst = Math.max(worst, dev);
      if (dev >= eps) ok = false;
    }
    if (!F.cont && x0 === 0) ok = false;

    // punto (x0, y0)
    p.dot(x0, y0, 6, COLORS.warn);
    p.text('(x₀, f(x₀))', x0 + 0.12, y0 + (F.view.ymax - F.view.ymin) * 0.05, { color: COLORS.warn, font: '12px Inter' });

    out.textContent =
      `x₀ = ${x0.toFixed(2)},  f(x₀) = ${y0.toFixed(3)}\n`
      + `en (x₀ ± δ), máx |f(x) − f(x₀)| ≈ ${worst.toFixed(3)}  (objetivo: < ε = ${eps.toFixed(2)})\n`
      + (ok ? '✓ Este δ funciona para este ε.' : '✗ Este δ es demasiado grande: achicalo (o la función salta acá).');

    // marco de estado
    p.ctx.strokeStyle = ok ? COLORS.ok : COLORS.err;
    p.ctx.lineWidth = 3;
    p.ctx.strokeRect(1.5, 1.5, p.width - 3, p.height - 3);
  }

  viz.setDraw(draw);
  fSel.select.addEventListener('change', () => viz.redraw());
  [x0S, epsS, delS].forEach((s) => s.input.addEventListener('input', () => viz.redraw()));

  root.appendChild(callout('tip', 'Continuidad uniforme',
    'Si un mismo $\\delta$ sirve para <em>todos</em> los $x_0$ (dado $\\varepsilon$), la función es '
    + '<strong>uniformemente continua</strong>. Toda función continua sobre un <em>compacto</em> es '
    + 'uniformemente continua (Heine-Cantor).'
  ));

  root.appendChild(callout('warn', 'El escalón',
    'En $x_0 = 0$ el salto vale $2$. Para $\\varepsilon < 1$ ningún $\\delta$ alcanza: siempre hay puntos a '
    + 'izquierda con $f = -1$. Por eso no es continua ahí, y la preimagen de un abierto chico alrededor de $1$ '
    + 'no es abierta.'
  ));
}
