// pages/em-normados.js — Espacios normados (Práctica 6).
// Visualización interactiva de las bolas unitarias de ||·||_1, ||·||_2, ||·||_inf
// en R^2 (rombo, círculo, cuadrado), su anidamiento y la equivalencia de normas.

import { el, slider, selectControl } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { hexAlpha } from '../../../js/utils/canvas2d.js';

const NORMAS = {
  uno: {
    label: '‖·‖₁   (|x|+|y|)',
    color: COLORS.cyan,
    norm: (x, y) => Math.abs(x) + Math.abs(y),
    ball: (r) => [[r, 0], [0, r], [-r, 0], [0, -r]], // rombo
  },
  dos: {
    label: '‖·‖₂   √(x²+y²)',
    color: COLORS.accent,
    norm: (x, y) => Math.hypot(x, y),
    ball: null, // círculo: se dibuja aparte
  },
  inf: {
    label: '‖·‖∞   max(|x|,|y|)',
    color: COLORS.warn,
    norm: (x, y) => Math.max(Math.abs(x), Math.abs(y)),
    ball: (r) => [[r, r], [-r, r], [-r, -r], [r, -r]], // cuadrado
  },
};

const NORM_ORDER = ['uno', 'dos', 'inf'];

export function renderNormados(root) {
  root.appendChild(pageHeader(
    'Espacios normados',
    'Una norma generaliza la "longitud" de un vector. En $\\mathbb{R}^n$ las normas $\\|\\cdot\\|_1$, '
    + '$\\|\\cdot\\|_2$ y $\\|\\cdot\\|_\\infty$ dan bolas con formas distintas (rombo, círculo, cuadrado) '
    + 'pero equivalentes: definen los mismos abiertos y la misma convergencia.'
  ));

  root.appendChild(callout('def', 'Norma y espacio normado',
    'Una <strong>norma</strong> en un espacio vectorial $E$ es una función $\\|\\cdot\\|:E\\to[0,+\\infty)$ con: '
    + '(N1) $\\|x\\|\\ge0$ y $\\|x\\|=0\\iff x=0$; (N2) $\\|\\alpha x\\|=|\\alpha|\\,\\|x\\|$; '
    + '(N3) $\\|x+y\\|\\le\\|x\\|+\\|y\\|$ (triangular). Un <strong>espacio normado</strong> es un par $(E,\\|\\cdot\\|)$; '
    + 'si además es completo se llama <strong>espacio de Banach</strong>. La norma induce la métrica $d(x,y)=\\|x-y\\|$.'
  ));

  root.appendChild(callout('thm', 'Equivalencia de normas en dimensión finita',
    'En $\\mathbb{R}^n$, las tres normas son <strong>equivalentes</strong>: existen constantes $c,C>0$ con '
    + '$c\\,\\|x\\|_a\\le\\|x\\|_b\\le C\\,\\|x\\|_a$. En $\\mathbb{R}^2$ vale la cadena '
    + '$\\|x\\|_\\infty\\le\\|x\\|_2\\le\\|x\\|_1\\le 2\\,\\|x\\|_\\infty$, '
    + 'de donde $B_1(0,r)\\subseteq B_2(0,r)\\subseteq B_\\infty(0,r)\\subseteq B_1(0,2r)$. '
    + 'En dimensión infinita esto <strong>falla</strong> (p. ej. $\\|t^n\\|_\\infty=1$ pero $\\|t^n\\|_1=\\tfrac1{n+1}\\to0$ en $\\mathbb{R}[t]$).'
  ));

  // --- Visualización: bolas unitarias ---
  root.appendChild(el('h2', { text: 'Bolas de las tres normas en $\\mathbb{R}^2$' }));
  root.appendChild(el('p', { html:
    'Elegí una norma para ver su bola de radio $r$, o superponé las tres y mirá cómo se anidan '
    + '(rombo $\\subseteq$ círculo $\\subseteq$ cuadrado). Arrastrá el punto y mirá cómo cambian sus tres normas '
    + 'y adentro de qué bolas cae.' }));

  const controls = el('div', { class: 'controls' });
  const normSel = selectControl({
    label: 'Norma',
    options: NORM_ORDER.map((k) => ({ value: k, label: NORMAS[k].label })),
    value: 'dos',
  });
  const rS = slider({ label: 'r', min: 0.2, max: 2.5, step: 0.05, value: 1, format: (v) => v.toFixed(2) });
  const overlayChk = el('input', { type: 'checkbox', id: 'norm-overlay' });
  const overlayWrap = el('label', { class: 'control' }, [overlayChk, ' superponer las tres']);
  controls.appendChild(normSel.wrap);
  controls.appendChild(rS.wrap);
  controls.appendChild(overlayWrap);
  root.appendChild(controls);

  const viz = mountCanvas(root, {
    height: 440,
    view: { xmin: -3, xmax: 3, ymin: -3, ymax: 3 },
    hint: 'arrastrá el punto · rombo=‖·‖₁ · círculo=‖·‖₂ · cuadrado=‖·‖∞',
  });

  const out = readout('');
  root.appendChild(out);

  // punto arrastrable
  let pt = { x: 0.6, y: 0.4 };
  let dragging = false;

  function worldFromEvent(e) {
    const rect = viz.canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    return { x: viz.plane.wx(px), y: viz.plane.wy(py) };
  }

  viz.canvas.addEventListener('pointerdown', (e) => {
    const w = worldFromEvent(e);
    if (Math.hypot(w.x - pt.x, w.y - pt.y) < 0.4) { dragging = true; viz.canvas.setPointerCapture(e.pointerId); }
    else { pt = w; dragging = true; viz.canvas.setPointerCapture(e.pointerId); draw(); }
  });
  viz.canvas.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    pt = worldFromEvent(e);
    draw();
  });
  viz.canvas.addEventListener('pointerup', () => { dragging = false; });

  function drawBall(plane, key, r, fillAlpha, strokeOnly) {
    const N = NORMAS[key];
    plane.ctx.save();
    if (key === 'dos') {
      // muestrear la circunferencia en coords. del mundo para respetar el aspect del canvas
      const pts = [];
      const steps = 64;
      for (let i = 0; i < steps; i++) {
        const a = (2 * Math.PI * i) / steps;
        pts.push([r * Math.cos(a), r * Math.sin(a)]);
      }
      plane.polygon(pts, { stroke: N.color, fill: strokeOnly ? null : hexAlpha(N.color, fillAlpha), wpx: 2.5 });
    } else {
      plane.polygon(N.ball(r), { stroke: N.color, fill: strokeOnly ? null : hexAlpha(N.color, fillAlpha), wpx: 2.5 });
    }
    plane.ctx.restore();
  }

  function draw() {
    const p = viz.plane;
    p.clear();
    p.grid(1);
    const r = Number(rS.input.value);
    const overlay = overlayChk.checked;
    const key = normSel.select.value;

    if (overlay) {
      // anidamiento: rombo ⊆ círculo ⊆ cuadrado (mismo r)
      drawBall(p, 'uno', r, 0.10);
      drawBall(p, 'dos', r, 0.08);
      drawBall(p, 'inf', r, 0.06);
    } else {
      drawBall(p, key, r, 0.16);
    }

    // etiquetas de los radios (sólo si no está muy amontonado)
    p.text(`r=${r.toFixed(2)}`, 0.06, r + 0.12, { color: COLORS.textDim, font: '12px Inter' });

    // punto arrastrable: sus tres normas
    const n1 = NORMAS.uno.norm(pt.x, pt.y);
    const n2 = NORMAS.dos.norm(pt.x, pt.y);
    const ninf = NORMAS.inf.norm(pt.x, pt.y);
    p.dot(pt.x, pt.y, 5, COLORS.pink);

    const inside = (k) => NORMAS[k].norm(pt.x, pt.y) <= r;
    const mark = (b) => b ? '✓' : '✗';
    const enBola = overlay
      ? `en B₁: ${mark(inside('uno'))}   en B₂: ${mark(inside('dos'))}   en B∞: ${mark(inside('inf'))}`
      : `en B_${key === 'uno' ? 1 : key === 'dos' ? 2 : '\\infty'}: ${mark(inside(key))}`;

    out.textContent =
      `punto = (${pt.x.toFixed(2)}, ${pt.y.toFixed(2)})\n`
      + `‖p‖₁ = ${n1.toFixed(3)}    ‖p‖₂ = ${n2.toFixed(3)}    ‖p‖∞ = ${ninf.toFixed(3)}\n`
      + `r = ${r.toFixed(2)}   ·   ${enBola}`;
  }

  viz.setDraw(draw);
  normSel.select.addEventListener('change', () => viz.redraw());
  rS.input.addEventListener('input', () => viz.redraw());
  overlayChk.addEventListener('change', () => viz.redraw());

  // --- Operadores: continuo ⟺ acotado ---
  root.appendChild(el('h2', { text: 'Operadores lineales: continuo ⟺ acotado' }));
  root.appendChild(callout('thm', 'Equivalencia para operadores lineales',
    'Si $T:E\\to F$ es <strong>lineal</strong>, son equivalentes: continua en un punto, continua en todos lados, '
    + 'uniformemente continua, <strong>acotada</strong> ($\\|Tx\\|\\le M\\|x\\|$) y manda acotados en acotados. '
    + 'La norma del operador es $\\|T\\|=\\sup_{\\|x\\|\\le1}\\|Tx\\|$.'
  ));
  root.appendChild(callout('warn', 'La derivada no es continua',
    'La derivación $\\delta p=p\'$ en $\\mathbb{R}[t]$ con $\\|\\cdot\\|_\\infty$ es lineal pero <strong>no</strong> continua: '
    + '$\\|t^n\\|_\\infty=1$ pero $\\|\\delta(t^n)\\|_\\infty=\\|n\\,t^{n-1}\\|_\\infty=n\\to\\infty$. '
    + 'Derivar amplifica; integrar (operador con kernel continuo) suaviza y sí es continuo.'
  ));

  root.appendChild(callout('tip', 'Por qué importa',
    'La equivalencia "continuo $\\iff$ acotado" es específica de lo lineal: una función lineal continua es automáticamente '
    + 'Lipschitz. En dimensión infinita aparecen operadores discontinuos (como la derivada) y la Heine–Borel falla '
    + '(bolas cerradas y acotadas que no son compactas, p. ej. en $\\ell^2$ o $C[0,1]$).'
  ));
}
