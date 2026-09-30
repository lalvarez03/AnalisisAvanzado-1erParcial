// pages/em-cauchy.js — Sucesiones de Cauchy y completitud.

import { el, slider, selectControl } from '../utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../utils/page.js';
import { exRef } from '../utils/ejercicios.js';
import { COLORS } from '../constants.js';

// Sucesiones de ejemplo (en R o en Q).
const SEQS = {
  geom: {
    label: 'aₙ = 1 + 1/2 + … + 1/2ⁿ  (→ 2)',
    space: 'ℝ',
    term: (n) => 2 - Math.pow(2, -n),
    limit: 2, converges: true,
  },
  sqrt2: {
    label: 'Newton para √2 en ℚ  (→ √2 ∉ ℚ)',
    space: 'ℚ',
    term: (function () {
      const cache = [1.5];
      return (n) => { while (cache.length <= n) { const x = cache[cache.length - 1]; cache.push((x + 2 / x) / 2); } return cache[n]; };
    })(),
    limit: Math.SQRT2, converges: 'enQ-no',
  },
  harmonic: {
    label: 'aₙ = 1 + 1/2 + … + 1/n  (diverge)',
    space: 'ℝ',
    term: (function () {
      const cache = [1];
      return (n) => { while (cache.length <= n) cache.push(cache[cache.length - 1] + 1 / (cache.length + 1)); return cache[n]; };
    })(),
    limit: null, converges: false,
  },
  pi_trunc: {
    label: 'Truncados de π: 3; 3,1; 3,14; …  (Cauchy en ℚ → π ∉ ℚ)',
    space: 'ℚ',
    term: (function () {
      const digits = '3141592653589793238462643383279';
      return (n) => {
        const k = Math.min(n, 15);            // usar hasta 15 decimales
        return Number('3.' + digits.slice(1, 1 + k));
      };
    })(),
    limit: Math.PI, converges: 'enQ-no',
  },
  osc: {
    label: 'aₙ = (-1)ⁿ  (no es de Cauchy)',
    space: 'ℝ',
    term: (n) => (n % 2 === 0 ? 1 : -1),
    limit: null, converges: false,
  },
  cauchy_conv: {
    label: 'aₙ = (-1)ⁿ/n  (Cauchy, → 0 en ℝ)',
    space: 'ℝ',
    term: (n) => Math.pow(-1, n) / n,
    limit: 0, converges: true,
  },
};

export function renderCauchy(root) {
  root.appendChild(pageHeader(
    'Sucesiones de Cauchy y completitud',
    'Una sucesión es de <strong>Cauchy</strong> si sus términos se juntan entre sí. En un espacio '
    + '<strong>completo</strong> eso basta para que converja: no hay “agujeros”.'
  ));

  root.appendChild(callout('def', 'Convergencia y diámetro en un espacio métrico',
    '$(x_n)$ <strong>converge</strong> a $x$ si $d(x_n, x) \\to 0$, es decir $\\forall \\varepsilon>0\\; '
    + '\\exists n_0\\; \\forall n \\ge n_0: d(x_n, x) < \\varepsilon$.<br>'
    + 'El <strong>diámetro</strong> de $A$ es $\\operatorname{diam}(A) = \\sup\\{ d(x,y) : x, y \\in A \\}$.'
  ));

  root.appendChild(callout('def', 'Cauchy y completitud',
    '$(x_n)$ es de <strong>Cauchy</strong> si $\\forall \\varepsilon>0\\; \\exists N$ tal que '
    + '$d(x_n, x_m) < \\varepsilon$ para todos $n, m \\ge N$.<br>'
    + 'El espacio $(E,d)$ es <strong>completo</strong> si toda sucesión de Cauchy en $E$ converge a un punto de $E$.<br>'
    + 'Toda sucesión convergente es de Cauchy; la vuelta vale sólo si el espacio es completo.'
  ));

  root.appendChild(el('h2', { text: 'Diámetro de las colas' }));
  root.appendChild(el('p', { html:
    'Para $N$ dado, dibujamos la “cola” $\\{x_n : n \\ge N\\}$ y su diámetro '
    + '$\\sup_{n,m \\ge N} |x_n - x_m|$. La sucesión es de Cauchy si ese diámetro tiende a $0$ al crecer $N$.' }));

  const controls = el('div', { class: 'controls' });
  const seqSel = selectControl({
    label: 'Sucesión',
    options: Object.entries(SEQS).map(([k, v]) => ({ value: k, label: v.label })),
    value: 'geom',
  });
  const nSlider = slider({ label: 'N (inicio de la cola)', min: 0, max: 25, step: 1, value: 3 });
  controls.appendChild(seqSel.wrap);
  controls.appendChild(nSlider.wrap);
  root.appendChild(controls);

  const viz = mountCanvas(root, {
    height: 340,
    view: { xmin: -1, xmax: 26, ymin: -1.6, ymax: 2.6 },
    hint: 'puntos = aₙ · banda naranja = diámetro de la cola desde N',
  });

  const out = readout('');
  root.appendChild(out);

  function draw() {
    const p = viz.plane;
    p.clear();
    p.grid(1);
    const key = seqSel.select.value;
    const S = SEQS[key];
    const N = Number(nSlider.input.value);
    const MAX = 26;

    // límite (si aplica)
    if (S.limit != null) {
      p.segment(-1, S.limit, MAX, S.limit, COLORS.ok, 1.5, [6, 5]);
      p.text('L=' + S.limit.toFixed(3), MAX - 6, S.limit + 0.18, { color: COLORS.ok, font: '12px Inter' });
    }

    // cola: min y max de a_n para n>=N
    let lo = Infinity, hi = -Infinity;
    for (let nn = N; nn < MAX; nn++) { const v = S.term(nn); lo = Math.min(lo, v); hi = Math.max(hi, v); }
    // banda
    p.ctx.fillStyle = 'rgba(255,180,84,0.16)';
    const yTop = p.sy(hi), yBot = p.sy(lo), xL = p.sx(N - 0.3), xR = p.sx(MAX);
    p.ctx.fillRect(xL, yTop, xR - xL, yBot - yTop);

    // puntos
    for (let nn = 0; nn < MAX; nn++) {
      const v = S.term(nn);
      const inTail = nn >= N;
      p.dot(nn, v, inTail ? 4.5 : 3, inTail ? COLORS.warn : '#5a6690');
    }

    const diam = hi - lo;
    let veredicto;
    if (S.converges === true) veredicto = `Converge a ${S.limit}. Es de Cauchy y ℝ es completo → ✓`;
    else if (S.converges === 'enQ-no') veredicto = 'Es de Cauchy, pero su límite √2 ∉ ℚ → (ℚ, |·|) NO es completo.';
    else veredicto = 'El diámetro NO tiende a 0 → no es de Cauchy → diverge.';

    out.textContent =
      `espacio: ${S.space}\n`
      + `cola desde N=${N}:  diámetro ≈ ${diam.toFixed(4)}\n`
      + veredicto;
  }

  viz.setDraw(draw);
  seqSel.select.addEventListener('change', () => viz.redraw());
  nSlider.input.addEventListener('input', () => viz.redraw());

  root.appendChild(callout('thm', 'Completitud',
    '• $(\\mathbb{R}^n, d_1), (\\mathbb{R}^n, d_2), (\\mathbb{R}^n, d_\\infty)$ son completos.<br>'
    + '• Un subconjunto <strong>cerrado</strong> de un completo es completo.<br>'
    + '• Teorema de Cantor: en un completo, una sucesión decreciente de cerrados no vacíos con '
    + '$\\operatorname{diam} \\to 0$ tiene intersección igual a un único punto.',
    // demostración del teorema de intersección de Cantor
    '<p><span class="proof-step">Cerrado en completo es completo.</span> Sea $A$ cerrado en $E$ completo '
    + 'y $(x_n) \\subseteq A$ de Cauchy. Como $E$ es completo, $x_n \\to x \\in E$. Como $A$ es cerrado y '
    + 'contiene a la sucesión, $x \\in A$. Luego toda Cauchy en $A$ converge en $A$.</p>'
    + '<p><span class="proof-step">Intersección de Cantor.</span> Elegimos $x_n \\in A_n$. Para $m > n$, '
    + '$x_n, x_m \\in A_n$ (por el encaje), así que $d(x_n, x_m) \\le \\operatorname{diam}(A_n) \\to 0$: '
    + '$(x_n)$ es de Cauchy. Por completitud, $x_n \\to x$. Como cada $A_n$ es cerrado y contiene la cola '
    + '$(x_k)_{k \\ge n}$, resulta $x \\in A_n$ para todo $n$, o sea $x \\in \\bigcap_n A_n$. '
    + 'Y es único: si $x, y$ están en la intersección, $d(x,y) \\le \\operatorname{diam}(A_n) \\to 0$, '
    + 'luego $x = y$. $\\blacksquare$</p>'
  ));
  root.appendChild(exRef(3, [13, 14, 15, 16]));

  root.appendChild(callout('warn', 'ℚ no es completo',
    'La sucesión de Newton $x_{n+1} = \\tfrac{1}{2}(x_n + 2/x_n)$ es de Cauchy dentro de $\\mathbb{Q}$, '
    + 'pero su límite $\\sqrt{2}$ es irracional. El “agujero” que deja es justamente lo que el axioma de '
    + 'completitud de $\\mathbb{R}$ rellena.'
  ));
}
