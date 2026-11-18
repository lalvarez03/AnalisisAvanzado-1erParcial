// pages/em-continuidad.js — Continuidad: definición ε–δ e Preimagen de Abiertos.

import { el, slider, selectControl } from '../utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../utils/page.js';
import { COLORS } from '../constants.js';

const FUNCS = {
  parabola: { label: 'f(x) = x²   (continua)', f: (x) => x * x, cont: true, view: { xmin: -3, xmax: 3, ymin: -1, ymax: 9 } },
  linear: { label: 'f(x) = 2x + 1   (continua)', f: (x) => 2 * x + 1, cont: true, view: { xmin: -3, xmax: 3, ymin: -5, ymax: 7 } },
  abs: { label: 'f(x) = |x|   (continua)', f: (x) => Math.abs(x), cont: true, view: { xmin: -3, xmax: 3, ymin: -0.5, ymax: 3 } },
  sqrtabs: { label: 'f(x) = √|x|   (continua)', f: (x) => Math.sqrt(Math.abs(x)), cont: true, view: { xmin: -3, xmax: 3, ymin: -0.5, ymax: 2 } },
  step: { label: 'f(x) = escalón (discontinua en 0)', f: (x) => (x < 0 ? -1 : 1), cont: false, jump: 0, view: { xmin: -3, xmax: 3, ymin: -2.2, ymax: 2.2 } },
};

export function renderContinuidad(root) {
  root.appendChild(pageHeader(
    'Continuidad en Espacios Métricos',
    'Visualización interactiva de la definición $\\varepsilon$–$\\delta$ y la caracterización por preimagen de abiertos.'
  ));

  root.appendChild(callout('def', 'Definición — Continuidad en un punto',
    'Sean $(E,d)$ y $(F,\\rho)$ espacios métricos. Una función $f: E \\to F$ es <strong>continua en $x_0 \\in E$</strong> si '
    + '$\\forall \\varepsilon > 0\\; \\exists \\delta > 0$ tal que '
    + '$d(x, x_0) < \\delta \\Rightarrow \\rho(f(x), f(x_0)) < \\varepsilon$.<br>'
    + 'En términos de bolas: $f(B_d(x_0, \\delta)) \\subseteq B_\\rho(f(x_0), \\varepsilon)$.'
  ));

  root.appendChild(callout('thm', 'Caracterización Topológica',
    'Sea $f: (E,d) \\to (F,\\rho)$. Son equivalentes:<br>'
    + '1. $f$ es continua en todo $E$.<br>'
    + '2. Para todo conjunto abierto $V \\subseteq F$, su <strong>preimagen</strong> $f^{-1}(V) = \\{x \\in E \\mid f(x) \\in V\\}$ es un conjunto abierto en $E$.'
  ));

  let mode = 'eps-delta';

  const modeBar = el('div', { class: 'ex-picker', style: 'margin-bottom: 16px;' });
  const btnEps = el('button', { class: 'ex-pill active', text: '1. Definición ε–δ en x₀' });
  const btnPre = el('button', { class: 'ex-pill', text: '2. Preimagen de Abiertos f⁻¹(V)' });
  modeBar.appendChild(btnEps);
  modeBar.appendChild(btnPre);
  root.appendChild(modeBar);

  const controls = el('div', { class: 'controls' });
  const fSel = selectControl({
    label: 'Función f: E → F',
    options: Object.entries(FUNCS).map(([k, v]) => ({ value: k, label: v.label })),
    value: 'sqrtabs',
  });

  // Controles ε–δ
  const x0S = slider({ label: 'Punto x₀ ∈ E', min: -2.5, max: 2.5, step: 0.1, value: 0, format: (v) => v.toFixed(1) });
  const epsS = slider({ label: 'ε (Radio en F)', min: 0.1, max: 2.5, step: 0.05, value: 0.8, format: (v) => v.toFixed(2) });
  const delS = slider({ label: 'δ (Radio en E)', min: 0.05, max: 2, step: 0.05, value: 0.5, format: (v) => v.toFixed(2) });

  // Controles Preimagen
  const yMinS = slider({ label: 'Abierto V: cota inf. (a)', min: -1, max: 4, step: 0.1, value: 0.2, format: (v) => v.toFixed(1) });
  const yMaxS = slider({ label: 'Abierto V: cota sup. (b)', min: 0, max: 6, step: 0.1, value: 1.2, format: (v) => v.toFixed(1) });

  controls.appendChild(fSel.wrap);
  controls.appendChild(x0S.wrap);
  controls.appendChild(epsS.wrap);
  controls.appendChild(delS.wrap);
  controls.appendChild(yMinS.wrap);
  controls.appendChild(yMaxS.wrap);
  root.appendChild(controls);

  function updateControls() {
    const isEps = mode === 'eps-delta';
    x0S.wrap.style.display = isEps ? 'flex' : 'none';
    epsS.wrap.style.display = isEps ? 'flex' : 'none';
    delS.wrap.style.display = isEps ? 'flex' : 'none';
    yMinS.wrap.style.display = isEps ? 'none' : 'flex';
    yMaxS.wrap.style.display = isEps ? 'none' : 'flex';
  }
  updateControls();

  btnEps.addEventListener('click', () => {
    mode = 'eps-delta';
    btnEps.classList.add('active');
    btnPre.classList.remove('active');
    updateControls();
    viz.redraw();
  });

  btnPre.addEventListener('click', () => {
    mode = 'preimage';
    btnPre.classList.add('active');
    btnEps.classList.remove('active');
    updateControls();
    viz.redraw();
  });

  const viz = mountCanvas(root, {
    height: 420,
    view: FUNCS.sqrtabs.view,
    hint: 'Evaluación geométrica de las condiciones topológicas de continuidad.',
  });

  const out = readout('');
  root.appendChild(out);

  function draw() {
    const p = viz.plane;
    const key = fSel.select.value;
    const F = FUNCS[key];
    Object.assign(p.view, F.view);
    p.clear();
    p.grid(1);

    if (mode === 'eps-delta') {
      const x0 = Number(x0S.input.value);
      const eps = Number(epsS.input.value);
      const del = Number(delS.input.value);
      const y0 = F.f(x0);

      // Bola B_rho(f(x0), eps) en el codominio F (banda horizontal)
      p.ctx.fillStyle = 'rgba(53,201,138,0.16)';
      const yTop = p.sy(y0 + eps), yBot = p.sy(y0 - eps);
      p.ctx.fillRect(0, yTop, p.width, yBot - yTop);

      // Bola B_d(x0, del) en el dominio E (banda vertical)
      p.ctx.fillStyle = 'rgba(91,140,255,0.16)';
      const xL = p.sx(x0 - del), xR = p.sx(x0 + del);
      p.ctx.fillRect(xL, 0, xR - xL, p.height);

      // Gráfico de f
      p.ctx.strokeStyle = COLORS.pink; p.ctx.lineWidth = 2.5;
      p.ctx.beginPath();
      let first = true;
      for (let px = 0; px <= p.width; px += 2) {
        const x = p.wx(px);
        if (key === 'step' && Math.abs(x) < 0.01) { first = true; continue; }
        const y = F.f(x);
        const sy = p.sy(y);
        if (first) { p.ctx.moveTo(px, sy); first = false; } else p.ctx.lineTo(px, sy);
      }
      p.ctx.stroke();

      let ok = true;
      let maxDev = 0;
      const samples = 200;
      for (let i = 0; i <= samples; i++) {
        const x = x0 - del + (2 * del) * (i / samples);
        const dev = Math.abs(F.f(x) - y0);
        maxDev = Math.max(maxDev, dev);
        if (dev >= eps) ok = false;
      }
      if (!F.cont && x0 === 0) ok = false;

      p.dot(x0, y0, 6, COLORS.warn);

      out.textContent =
        `DEFINICIÓN EN x₀ = ${x0.toFixed(2)}:\n`
        + `• Punto imagen: f(x₀) = ${y0.toFixed(3)}\n`
        + `• Bola B_ρ(f(x₀), ε) = (${(y0 - eps).toFixed(2)}, ${(y0 + eps).toFixed(2)})\n`
        + `• Bola B_d(x₀, δ) = (${(x0 - del).toFixed(2)}, ${(x0 + del).toFixed(2)})\n`
        + `• Máxima distancia ρ(f(x), f(x₀)) en B_d(x₀, δ): ${maxDev.toFixed(3)}\n`
        + (ok ? '✓ Cumple la condición: f(B_d(x₀, δ)) ⊆ B_ρ(f(x₀), ε).' : '✗ No cumple: existe x tal que d(x,x₀) < δ pero ρ(f(x), f(x₀)) ≥ ε.');

      p.ctx.strokeStyle = ok ? COLORS.ok : COLORS.err;
      p.ctx.lineWidth = 3;
      p.ctx.strokeRect(1.5, 1.5, p.width - 3, p.height - 3);

    } else {
      // MODO PREIMAGEN
      let a = Number(yMinS.input.value);
      let b = Number(yMaxS.input.value);
      if (a >= b) b = a + 0.1;

      // Conjunto abierto V = (a, b) ⊆ F (Banda Horizontal)
      p.ctx.fillStyle = 'rgba(56,217,217,0.2)';
      const syA = p.sy(a), syB = p.sy(b);
      p.ctx.fillRect(0, syB, p.width, syA - syB);

      // Bordes del abierto V (líneas discontinuas indicando conjunto abierto)
      p.ctx.strokeStyle = COLORS.cyan; p.ctx.lineWidth = 2;
      p.ctx.beginPath(); p.ctx.moveTo(0, syA); p.ctx.lineTo(p.width, syA); p.ctx.stroke();
      p.ctx.beginPath(); p.ctx.moveTo(0, syB); p.ctx.lineTo(p.width, syB); p.ctx.stroke();

      // Preimagen f^-1(V) en E
      p.ctx.fillStyle = 'rgba(124,92,255,0.25)';
      const intervals = [];
      let inInt = false, startX = 0;

      for (let px = 0; px <= p.width; px++) {
        const x = p.wx(px);
        const y = F.f(x);
        const inside = (y > a && y < b);

        if (inside && !inInt) {
          inInt = true;
          startX = px;
        } else if (!inside && inInt) {
          inInt = false;
          intervals.push([startX, px]);
        }
      }
      if (inInt) intervals.push([startX, p.width]);

      // Sombrear f^-1(V) en el dominio E
      for (const [x1, x2] of intervals) {
        p.ctx.fillRect(x1, 0, x2 - x1, p.height);
      }

      // Dibujar gráfico de f
      p.ctx.strokeStyle = COLORS.pink; p.ctx.lineWidth = 2.5;
      p.ctx.beginPath();
      let first = true;
      for (let px = 0; px <= p.width; px += 2) {
        const x = p.wx(px);
        if (key === 'step' && Math.abs(x) < 0.01) { first = true; continue; }
        const y = F.f(x);
        const sy = p.sy(y);
        if (first) { p.ctx.moveTo(px, sy); first = false; } else p.ctx.lineTo(px, sy);
      }
      p.ctx.stroke();

      const preStr = intervals.map(([x1, x2]) => `(${p.wx(x1).toFixed(2)}, ${p.wx(x2).toFixed(2)})`).join(' ∪ ');

      out.textContent =
        `CARACTERIZACIÓN TOPOLÓGICA DE CONTINUIDAD:\n`
        + `• Conjunto abierto en el codominio: V = (${a.toFixed(1)}, ${b.toFixed(1)}) ⊆ F\n`
        + `• Preimagen en el dominio: f⁻¹(V) = ${preStr || '∅'} ⊆ E\n`
        + (F.cont 
            ? '✓ Como f es continua, la preimagen f⁻¹(V) de todo conjunto abierto V es un conjunto abierto en E.' 
            : '⚠ Para funciones discontinuas, existen conjuntos abiertos V cuya preimagen f⁻¹(V) NO es abierta (contiene extremos o puntos de frontera).');
    }
  }

  viz.setDraw(draw);
  fSel.select.addEventListener('change', () => viz.redraw());
  [x0S, epsS, delS, yMinS, yMaxS].forEach((s) => s.input.addEventListener('input', () => viz.redraw()));

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