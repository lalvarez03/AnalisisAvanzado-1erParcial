// pages/em-puntofijo.js — Teorema del punto fijo de Banach (contracciones).

import { el, slider, selectControl } from '../utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../utils/page.js';
import { COLORS } from '../constants.js';

// Funciones T: [0,3] -> R (o similar). k = constante de Lipschitz aproximada.
const MAPS = {
  cos: { label: 'T(x) = cos(x)   (contracción)', T: (x) => Math.cos(x), contraction: true, view: { xmin: -0.2, xmax: 2, ymin: -0.2, ymax: 2 } },
  avg: { label: 'T(x) = (x + 2/x)/2   (→ √2, Newton)', T: (x) => (x + 2 / x) / 2, contraction: true, view: { xmin: 0.5, xmax: 3, ymin: 0.5, ymax: 3 } },
  half: { label: 'T(x) = x/2 + 1   (escalera)', T: (x) => x / 2 + 1, contraction: true, view: { xmin: -0.2, xmax: 3, ymin: -0.2, ymax: 3 } },
  spiral: { label: 'T(x) = 1 − x/2   (contracción, espiral)', T: (x) => 1 - x / 2, contraction: true, view: { xmin: -0.5, xmax: 2.5, ymin: -0.5, ymax: 2.5 } },
  expand: { label: 'T(x) = 2x − 1   (NO contracción)', T: (x) => 2 * x - 1, contraction: false, view: { xmin: -0.5, xmax: 3, ymin: -0.5, ymax: 3 } },
};

export function renderPuntoFijo(root) {
  root.appendChild(pageHeader(
    'Teorema del punto fijo',
    'Si una función “acerca” los puntos (es una contracción) en un espacio completo, tiene un único '
    + 'punto fijo, y podés encontrarlo iterando desde cualquier lado.'
  ));

  root.appendChild(callout('def', 'Lipschitz, contracción y punto fijo',
    '<strong>Lipschitz:</strong> $T$ es Lipschitz si existe $K \\ge 0$ con '
    + '$d(T(x), T(y)) \\le K\\, d(x,y)$ para todos $x, y$.<br>'
    + '<strong>Contracción:</strong> es Lipschitz con constante $0 \\le k < 1$; el factor $k$ mide cuánto '
    + 'se acortan las distancias.<br>'
    + '<strong>Punto fijo</strong> de $T$: un $x^\\ast$ con $T(x^\\ast) = x^\\ast$.'
  ));

  root.appendChild(callout('thm', 'Teorema del punto fijo de Banach',
    'Sea $(E,d)$ <strong>completo</strong> y $T:E \\to E$ una contracción con constante $k$. Entonces: '
    + '$T$ tiene un <strong>único</strong> punto fijo $x^\\ast$ (con $T(x^\\ast)=x^\\ast$), y para todo '
    + '$x_0$ la iteración $x_{n+1} = T(x_n)$ converge a $x^\\ast$, con '
    + '$d(x_n, x^\\ast) \\le \\dfrac{k^n}{1-k}\\, d(x_1, x_0)$.',
    // demostración de Banach
    '<p><span class="proof-step">Paso 1 — Lema de contracción $\\Rightarrow$ continuidad.</span> '
    + 'Toda contracción es Lipschitz con constante $k$: $d(Tx,Ty)\\le k\\,d(x,y)$. En particular es continua, '
    + 'pues dado $\\varepsilon>0$ basta tomar $\\delta=\\varepsilon$ (si $k=0$) o $\\delta=\\varepsilon/k$: '
    + '$d(x,y)<\\delta \\Rightarrow d(Tx,Ty)<\\varepsilon$. Usaremos esto en el Paso 3.</p>'
    + '<p><span class="proof-step">Paso 2 — La iteración es de Cauchy.</span> Sea $x_{n+1}=T(x_n)$. '
    + 'Por inducción, $d(x_{n+1},x_n) = d(T x_n, T x_{n-1}) \\le k\\,d(x_n,x_{n-1}) \\le \\dots \\le k^{n} d(x_1,x_0)$. '
    + 'Para $m>n$, por la desigualdad triangular y la suma geométrica: '
    + '$d(x_n,x_m) \\le \\sum_{j=n}^{m-1} d(x_{j+1},x_j) \\le \\sum_{j=n}^{m-1} k^{j} d(x_1,x_0) '
    + '\\le d(x_1,x_0)\\sum_{j=n}^{\\infty} k^{j} = \\dfrac{k^n}{1-k}\\,d(x_1,x_0)$ '
    + '(la serie geométrica converge porque $0\\le k<1$). Como $\\tfrac{k^n}{1-k}\\to 0$, dado $\\varepsilon>0$ '
    + 'existe $N$ tal que para $m>n\\ge N$ vale $d(x_n,x_m)<\\varepsilon$: $(x_n)$ es de Cauchy.</p>'
    + '<p><span class="proof-step">Paso 3 — Converge a un punto fijo.</span> Como $E$ es completo, existe '
    + '$x^\\ast\\in E$ con $x_n\\to x^\\ast$. Por la continuidad de $T$ (Paso 1), $T(x_n)\\to T(x^\\ast)$; pero '
    + '$T(x_n)=x_{n+1}\\to x^\\ast$. Por unicidad del límite en un espacio métrico, $T(x^\\ast)=x^\\ast$: es punto fijo. '
    + 'Haciendo $m\\to\\infty$ en la cota del Paso 2 se obtiene además $d(x_n,x^\\ast)\\le \\tfrac{k^n}{1-k}d(x_1,x_0)$.</p>'
    + '<p><span class="proof-step">Paso 4 — Unicidad.</span> Si $x^\\ast$ e $y^\\ast$ son ambos puntos fijos, '
    + '$d(x^\\ast,y^\\ast) = d(T x^\\ast, T y^\\ast) \\le k\\,d(x^\\ast,y^\\ast)$, es decir $(1-k)\\,d(x^\\ast,y^\\ast)\\le 0$. '
    + 'Como $1-k>0$ y $d\\ge 0$, forzosamente $d(x^\\ast,y^\\ast)=0$, o sea $x^\\ast=y^\\ast$. $\\blacksquare$</p>'
  ));

  root.appendChild(el('h2', { text: 'Iteración de punto fijo (diagrama de telaraña)' }));
  root.appendChild(el('p', { html:
    'La escalera rebota entre la curva $y = T(x)$ y la recta $y = x$. Si $T$ es contracción, la escalera '
    + 'espirala hacia el punto fijo (intersección). Si no, se escapa.' }));

  const controls = el('div', { class: 'controls' });
  const mapSel = selectControl({
    label: 'Función T',
    options: Object.entries(MAPS).map(([k, v]) => ({ value: k, label: v.label })),
    value: 'cos',
  });
  const x0S = slider({ label: 'x₀ (semilla)', min: 0.1, max: 2.5, step: 0.05, value: 2, format: (v) => v.toFixed(2) });
  const itS = slider({ label: 'iteraciones', min: 0, max: 25, step: 1, value: 8 });
  controls.appendChild(mapSel.wrap);
  controls.appendChild(x0S.wrap);
  controls.appendChild(itS.wrap);
  root.appendChild(controls);

  const viz = mountCanvas(root, {
    height: 440,
    view: MAPS.cos.view,
    hint: 'rosa = y=T(x) · gris = y=x · azul = escalera de iteración',
  });

  const out = readout('');
  root.appendChild(out);

  function draw() {
    const p = viz.plane;
    const key = mapSel.select.value;
    const M = MAPS[key];
    Object.assign(p.view, M.view);
    p.clear();
    p.grid(0.5);

    // y = x
    p.segment(p.view.xmin, p.view.xmin, p.view.xmax, p.view.xmax, '#5a6690', 1.5, [5, 4]);

    // y = T(x)
    p.ctx.strokeStyle = COLORS.pink; p.ctx.lineWidth = 2.5;
    p.ctx.beginPath();
    let first = true;
    for (let px = 0; px <= p.width; px += 2) {
      const x = p.wx(px);
      const y = M.T(x);
      if (!isFinite(y)) { first = true; continue; }
      const sy = p.sy(y);
      if (first) { p.ctx.moveTo(px, sy); first = false; } else p.ctx.lineTo(px, sy);
    }
    p.ctx.stroke();

    // iteración
    const iters = Number(itS.input.value);
    let x = Number(x0S.input.value);
    const seq = [x];
    p.ctx.strokeStyle = COLORS.accent; p.ctx.lineWidth = 1.8;
    p.ctx.beginPath();
    p.ctx.moveTo(p.sx(x), p.sy(0));
    for (let i = 0; i < iters; i++) {
      const y = M.T(x);
      // sube a la curva
      p.ctx.lineTo(p.sx(x), p.sy(y));
      // horizontal a y=x
      p.ctx.lineTo(p.sx(y), p.sy(y));
      x = y;
      seq.push(x);
      if (!isFinite(x) || Math.abs(x) > 1e3) break;
    }
    p.ctx.stroke();

    // puntos de la sucesión
    seq.forEach((v, i) => { if (isFinite(v)) p.dot(v, M.T(v), 3.5, i === seq.length - 1 ? COLORS.ok : COLORS.accent); });

    // punto fijo aproximado (iterando mucho desde el centro)
    let star = 1.2;
    for (let i = 0; i < 200; i++) star = M.T(star);
    if (isFinite(star) && M.contraction) {
      p.dot(star, star, 6, COLORS.ok, false);
      p.text('x*≈' + star.toFixed(4), star + 0.05, star - 0.12, { color: COLORS.ok, font: '12px Inter' });
    }

    const last = seq[seq.length - 1];
    out.textContent =
      `x₀ = ${Number(x0S.input.value).toFixed(2)}\n`
      + `x_${seq.length - 1} = ${isFinite(last) ? last.toFixed(6) : 'diverge'}\n`
      + (M.contraction
        ? `converge al punto fijo x* ≈ ${star.toFixed(6)} (único).`
        : 'NO es contracción (|T′| ≥ 1): la iteración se aleja del punto fijo salvo que arranques justo en él.');
  }

  viz.setDraw(draw);
  mapSel.select.addEventListener('change', () => viz.redraw());
  [x0S, itS].forEach((s) => s.input.addEventListener('input', () => viz.redraw()));

  root.appendChild(callout('tip', 'Por qué importa',
    'Este teorema es el motor de muchos resultados de existencia y unicidad: soluciones de ecuaciones '
    + '($x = T(x)$), el método de Newton, y el teorema de existencia de soluciones de EDOs (Picard). '
    + 'La completitud es esencial: sin ella, la sucesión de Cauchy que genera la iteración podría no tener límite.'
  ));

  root.appendChild(callout('warn', 'Hace falta que sea contracción',
    'Continuidad sola no alcanza: $T(x) = 2x-1$ es continua con punto fijo en $1$, pero como $k=2>1$ '
    + 'la iteración se escapa. Y en un espacio no completo, aun siendo contracción, el punto fijo podría '
    + '“faltar” (como $\\sqrt 2$ en $\\mathbb{Q}$).'
  ));
}
