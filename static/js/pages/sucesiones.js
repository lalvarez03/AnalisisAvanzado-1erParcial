// pages/sucesiones.js — Sucesiones y límites (Práctica 1).

import { el, slider, selectControl } from '../utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../utils/page.js';
import { exRef } from '../utils/ejercicios.js';
import { seccionResueltos } from '../utils/resueltos.js';
import { RES_SUCESIONES } from '../utils/resueltos-data.js';
import { COLORS } from '../constants.js';

const SEQS = {
  inv_n: { label: 'aₙ = 1/n   (→ 0, decreciente)', f: (n) => 1 / n, L: 0, conv: true },
  mono: { label: 'aₙ = 2 − 1/n   (→ 2, creciente acotada)', f: (n) => 2 - 1 / n, L: 2, conv: true },
  ratio: { label: 'aₙ = (3 − 2n)/(n + 1)   (→ −2)', f: (n) => (3 - 2 * n) / (n + 1), L: -2, conv: true },
  ratio2: { label: 'aₙ = (2n − 3)/(2n + 4)   (→ 1)', f: (n) => (2 * n - 3) / (2 * n + 4), L: 1, conv: true },
  alt_n: { label: 'aₙ = (−1)ⁿ/n   (alternante → 0)', f: (n) => Math.pow(-1, n) / n, L: 0, conv: true },
  approach_both: { label: 'aₙ = 1 + (−1)ⁿ/n   (→ 1 por ambos lados)', f: (n) => 1 + Math.pow(-1, n) / n, L: 1, conv: true },
  sinn: { label: 'aₙ = sin(n)/n   (acotada/nula → 0)', f: (n) => Math.sin(n) / n, L: 0, conv: true },
  osc: { label: 'aₙ = (−1)ⁿ   (oscila, diverge)', f: (n) => (n % 2 === 0 ? 1 : -1), L: null, conv: false },
  sqrt: { label: 'aₙ = √n   (diverge a +∞)', f: (n) => Math.sqrt(n), L: null, conv: false, divTo: '+∞' },
  harm: { label: 'aₙ = 1 + 1/2 + … + 1/n   (diverge a +∞)', f: (function () { const c = [1]; return (n) => { while (c.length < n) c.push(c[c.length - 1] + 1 / (c.length + 1)); return c[n - 1]; }; })(), L: null, conv: false, divTo: '+∞' },
};

export function renderSucesiones(root) {
  root.appendChild(pageHeader(
    'Sucesiones',
    'Una sucesión es una función $a:\\mathbb{N} \\to \\mathbb{R}$. Su <strong>límite</strong> captura el '
    + 'comportamiento a largo plazo. Formalizamos “acercarse” con $\\varepsilon$ y $n_0$.'
  ));

  root.appendChild(callout('def', 'Definición — Convergencia',
    '$(a_n) \\to \\ell$ si para todo $\\varepsilon > 0$ existe $n_0 \\in \\mathbb{N}$ tal que '
    + '$|a_n - \\ell| < \\varepsilon$ para todo $n \\ge n_0$.<br>'
    + '<em>Es decir:</em> por más fina que sea la banda $(\\ell - \\varepsilon, \\ell + \\varepsilon)$, '
    + 'a partir de cierto $n_0$ todos los términos caen dentro.'
  ));

  root.appendChild(callout('def', 'Divergencia a ±∞ y sucesión acotada',
    '$(a_n) \\to +\\infty$ si para todo $M > 0$ existe $n_0$ tal que $a_n > M$ para todo $n \\ge n_0$ '
    + '(análogo $a_n < -M$ para $-\\infty$).<br>'
    + '$(a_n)$ está <strong>acotada</strong> si existe $M > 0$ con $|a_n| \\le M$ para todo $n$.'
  ));

  root.appendChild(callout('def', 'Monótona y subsucesión',
    '$(a_n)$ es <strong>creciente</strong> si $a_{n+1} \\ge a_n$ para todo $n$, y <strong>decreciente</strong> '
    + 'si $a_{n+1} \\le a_n$ para todo $n$; en cualquiera de los dos casos se dice <strong>monótona</strong>.<br>'
    + 'Una <strong>subsucesión</strong> de $(a_n)$ es $(a_{n_k})_{k}$ donde los índices cumplen '
    + '$n_1 < n_2 < n_3 < \\cdots$ (estrictamente crecientes).'
  ));

  root.appendChild(el('p', { 
    style: 'margin-top: 16px;', 
    html: '<strong>Notación Sucesiones</strong>' 
  }));

  // Tabla 1: Notación General
  const tblNotacionGen = el('table', { class: 'tbl' });
  tblNotacionGen.innerHTML = `
    <thead>
      <tr>
        <th>Notación</th>
        <th>Nombre Formal</th>
        <th>¿Qué es realmente?</th>
        <th>Ejemplo ($a_n = \\frac{1}{n}$)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>$a_n$</td>
        <td><strong>Término $n$-ésimo</strong></td>
        <td>Un único número real (valor en posición $n$).</td>
        <td>$a_3 = \\frac{1}{3}$</td>
      </tr>
      <tr>
        <td>$(a_n)_{n \\in \\mathbb{N}}$</td>
        <td><strong>Sucesión</strong></td>
        <td>La función / lista ordenada infinita completa.</td>
        <td>$(1, \\frac{1}{2}, \\frac{1}{3}, \\frac{1}{4}, \\dots)$</td>
      </tr>
      <tr>
        <td>$\\{a_n : n \\in \\mathbb{N}\\}$</td>
        <td><strong>Conjunto imagen</strong></td>
        <td>Colección de valores (sin orden ni repeticiones).</td>
        <td>$\\{1, \\frac{1}{2}, \\frac{1}{3}, \\dots\\} \\subset \\mathbb{R}$<br><small style="color:var(--text-dim);">($\\sup=1$, $\\inf=0$)</small></td>
      </tr>
    </tbody>
  `;
  root.appendChild(tblNotacionGen);

  root.appendChild(el('p', { 
    style: 'margin-top: 16px;', 
    html: '<strong>Notación Subsucesiones</strong>' 
  }));

  // Tabla 2: Subsucesiones
  const tblNotacionSub = el('table', { class: 'tbl' });
  tblNotacionSub.innerHTML = `
    <thead>
      <tr>
        <th>Notación</th>
        <th>Nombre Formal</th>
        <th>¿Qué representa?</th>
        <th>Ejemplo ($a_n = \\frac{1}{n}$, $n_k = 2k$)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>$k$</td>
        <td><strong>Índice subsucesión</strong></td>
        <td>Contador de pasos ($1, 2, 3, \\dots$).</td>
        <td>Para $k=3$, elegimos el 3.º elemento.</td>
      </tr>
      <tr>
        <td>$n_k$</td>
        <td><strong>Índice seleccionado</strong></td>
        <td>Posición original elegida en paso $k$.</td>
        <td>$n_3 = 2(3) = 6$ (posición 6 original).</td>
      </tr>
      <tr>
        <td>$a_{n_k}$</td>
        <td><strong>Término $k$-ésimo</strong></td>
        <td>Un único número real extraído.</td>
        <td>$a_{n_3} = a_6 = \\frac{1}{6}$</td>
      </tr>
      <tr>
        <td>$(a_{n_k})_{k \\in \\mathbb{N}}$</td>
        <td><strong>Subsucesión</strong></td>
        <td>La nueva lista ordenada infinita.</td>
        <td>$(a_2, a_4, a_6, \\dots) = (\\frac{1}{2}, \\frac{1}{4}, \\frac{1}{6}, \\dots)$</td>
      </tr>
      <tr>
        <td>$\\{a_{n_k} : k \\in \\mathbb{N}\\}$</td>
        <td><strong>Conjunto término</strong></td>
        <td>El conjunto de valores alcanzados.</td>
        <td>$\\{\\frac{1}{2}, \\frac{1}{4}, \\frac{1}{6}, \\dots\\} \\subset \\mathbb{R}$</td>
      </tr>
    </tbody>
  `;
  root.appendChild(tblNotacionSub);

  // Re-renderizado de MathJax para las tablas creadas
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise([tblNotacionGen, tblNotacionSub]);
  }

  root.appendChild(el('h2', { text: 'El juego ε–n₀' }));
  root.appendChild(el('p', { html:
    'Elegí una sucesión y una tolerancia $\\varepsilon$. La app calcula el <strong>mínimo $n_0$</strong> a partir '
    + 'del cual todos los términos entran en la banda. Achicá $\\varepsilon$ y observá cómo $n_0$ crece. '
    + 'Las sucesiones $\\tfrac{3-2n}{n+1}$, $\\tfrac{\\sin n}{n}$ y $\\tfrac{2n-3}{2n+4}$ son las del ejercicio de límites por definición:' }));
  root.appendChild(exRef(1, 7));

  const controls = el('div', { class: 'controls' });
  const seqSel = selectControl({
    label: 'Sucesión',
    options: Object.entries(SEQS).map(([k, v]) => ({ value: k, label: v.label })),
    value: 'ratio',
  });
  const epsSlider = slider({ label: 'ε', min: 0.05, max: 1.5, step: 0.05, value: 0.5, format: (v) => v.toFixed(2) });
  controls.appendChild(seqSel.wrap);
  controls.appendChild(epsSlider.wrap);
  root.appendChild(controls);

  const viz = mountCanvas(root, {
    height: 380,
    view: { xmin: 0, xmax: 32, ymin: -3, ymax: 3 },
    hint: 'puntos = aₙ · banda verde = (ℓ−ε, ℓ+ε) · verde: n ≥ n₀',
  });

  const out = readout('');
  root.appendChild(out);

  const MAXN = 30;

  function draw() {
    const p = viz.plane;
    const S = SEQS[seqSel.select.value];
    const eps = Number(epsSlider.input.value);

    // ajustar rango vertical
    let lo = Infinity, hi = -Infinity;
    for (let n = 1; n <= MAXN; n++) { const v = S.f(n); lo = Math.min(lo, v); hi = Math.max(hi, v); }
    const pad = 0.6;
    p.view.ymin = Math.min(lo, S.L ?? lo) - pad;
    p.view.ymax = Math.max(hi, S.L ?? hi) + pad;
    p.clear();
    p.grid(1);

    // rótulos de ejes y marcas numéricas (para que la escala sea legible)
    // eje n (horizontal, abajo): marcas cada 5
    for (let n = 5; n <= MAXN; n += 5) {
      p.text(String(n), n, p.view.ymin + 0.18, { align: 'center', color: COLORS.textDim, font: '11px Inter' });
    }
    p.textPx('n', p.width - 12, p.height - 8, { align: 'right', color: COLORS.text, font: 'italic bold 13px Inter' });
    // eje aₙ (vertical, izquierda): marcas en enteros del rango
    const yLo = Math.ceil(p.view.ymin), yHi = Math.floor(p.view.ymax);
    for (let y = yLo; y <= yHi; y++) {
      p.textPx(String(y), 16, p.sy(y) - 3, { align: 'left', color: COLORS.textDim, font: '11px Inter' });
    }
    p.textPx('aₙ', 8, 14, { align: 'left', color: COLORS.text, font: 'italic bold 13px Inter' });

    // banda y limite
    let n0 = null;
    if (S.conv && S.L != null) {
      p.ctx.fillStyle = 'rgba(53,201,138,0.14)';
      const yT = p.sy(S.L + eps), yB = p.sy(S.L - eps);
      p.ctx.fillRect(0, yT, p.width, yB - yT);
      p.segment(0, S.L, MAXN + 2, S.L, COLORS.ok, 1.5, [6, 5]);
      p.text('ℓ = ' + S.L, MAXN - 4, S.L + 0.25, { color: COLORS.ok, font: '12px Inter' });

      // menor n0 tal que para todo n>=n0, |a_n - L| < eps
      for (let cand = 1; cand <= MAXN; cand++) {
        let ok = true;
        for (let n = cand; n <= MAXN + 200; n++) { if (Math.abs(S.f(n) - S.L) >= eps) { ok = false; break; } }
        if (ok) { n0 = cand; break; }
      }
      if (n0) {
        p.ctx.strokeStyle = COLORS.accent2; p.ctx.lineWidth = 1.5; p.ctx.setLineDash([4, 4]);
        p.ctx.beginPath(); p.ctx.moveTo(p.sx(n0), 0); p.ctx.lineTo(p.sx(n0), p.height); p.ctx.stroke();
        p.ctx.setLineDash([]);
        p.text('n₀=' + n0, n0 + 0.3, p.view.ymax - 0.3, { color: COLORS.accent2, font: 'bold 12px Inter' });
      }
    }

    // puntos
    for (let n = 1; n <= MAXN; n++) {
      const v = S.f(n);
      const inside = S.L != null && Math.abs(v - S.L) < eps;
      const afterN0 = n0 != null && n >= n0;
      p.dot(n, v, 4, afterN0 ? COLORS.ok : inside ? COLORS.cyan : COLORS.accent);
    }

    if (S.conv) {
      out.textContent =
        `ℓ = ${S.L}\nCon ε = ${eps.toFixed(2)}:  n₀ = ${n0 ?? '> 30'}\n`
        + `→ para todo n ≥ ${n0 ?? '…'}, |aₙ − ℓ| < ε  (puntos verdes)`;
    } else if (S.divTo) {
      out.textContent =
        `Esta sucesión DIVERGE a ${S.divTo}: los términos superan cualquier cota M a partir de cierto n.\n`
        + `No tiene límite finito. La banda ε no aplica.`;
    } else {
      out.textContent =
        'Esta sucesión NO converge: no existe ℓ que atrape a todos los términos en una banda ε pequeña.\n'
        + 'Ej. (−1)ⁿ alterna entre −1 y 1: para ε=1/2 ningún n₀ funciona.';
    }
  }

  viz.setDraw(draw);
  seqSel.select.addEventListener('change', () => viz.redraw());
  epsSlider.input.addEventListener('input', () => viz.redraw());

  root.appendChild(callout('thm', 'Resultados clave (Práctica 1)',
    '• <strong>Unicidad:</strong> el límite, si existe, es único.<br>'
    + '• <strong>Álgebra de límites:</strong> suma, producto y cociente de convergentes convergen (con cuidado en $\\infty$).<br>'
    + '• <strong>Sandwich:</strong> si $|x_n - \\ell| \\le a_n$ y $a_n \\to 0$, entonces $x_n \\to \\ell$.<br>'
    + '• <strong>Monótona + acotada $\\Rightarrow$ converge:</strong> una sucesión decreciente y acotada '
    + 'inferiormente tiende a su ínfimo.',
    // demostraciones de unicidad, sandwich y monótona
    '<p><span class="proof-step">Unicidad.</span> Supongamos $a_n \\to \\ell_1$ y $a_n \\to \\ell_2$. '
    + 'Dado $\\varepsilon > 0$, existen $n_1, n_2$ con $|a_n - \\ell_1| < \\varepsilon/2$ ($n \\ge n_1$) y '
    + '$|a_n - \\ell_2| < \\varepsilon/2$ ($n \\ge n_2$). Para $n \\ge \\max(n_1,n_2)$: '
    + '$|\\ell_1 - \\ell_2| \\le |\\ell_1 - a_n| + |a_n - \\ell_2| < \\varepsilon$. Como vale para todo '
    + '$\\varepsilon$, $\\ell_1 = \\ell_2$.</p>'
    + '<p><span class="proof-step">Sandwich.</span> Sea $\\varepsilon > 0$. Como $a_n \\to 0$, existe '
    + '$n_0$ con $a_n < \\varepsilon$ para $n \\ge n_0$. Entonces $|x_n - \\ell| \\le a_n < \\varepsilon$, '
    + 'o sea $x_n \\to \\ell$.</p>'
    + '<p><span class="proof-step">Monótona + acotada.</span> Sea $(x_n)$ decreciente y acotada inf.; '
    + 'sea $\\ell = \\inf\\{x_n\\}$ (existe por completitud). Dado $\\varepsilon>0$, por la caracterización '
    + 'del ínfimo existe $n_0$ con $x_{n_0} < \\ell + \\varepsilon$. Por ser decreciente, $x_n \\le x_{n_0} '
    + '< \\ell + \\varepsilon$ para $n \\ge n_0$; y $x_n \\ge \\ell$ siempre. Luego $|x_n - \\ell| < '
    + '\\varepsilon$: $x_n \\to \\ell$. $\\blacksquare$</p>'
  ));
  root.appendChild(exRef(1, [8, 9, 10, 11, 12]));

  root.appendChild(callout('tip', 'Subsucesiones',
    'Si $(a_n) \\to \\ell$, toda subsucesión $(a_{n_k}) \\to \\ell$. Si dos subsucesiones tienen límites '
    + 'distintos, la sucesión diverge (por eso $(-1)^n$ diverge: $a_{2k} \\to 1$ y $a_{2k-1} \\to -1$). '
    + 'Toda sucesión no acotada superiormente tiene una subsucesión que diverge a $+\\infty$.',
    // demostración de que subsucesión hereda el límite
    '<p><span class="proof-step">Subsucesión hereda el límite.</span> Sea $a_n \\to \\ell$ y $(a_{n_k})$ '
    + 'una subsucesión (con $n_k \\ge k$, estrictamente creciente). Dado $\\varepsilon > 0$, existe $n_0$ '
    + 'con $|a_n - \\ell| < \\varepsilon$ para $n \\ge n_0$. Como $n_k \\ge k$, para $k \\ge n_0$ vale '
    + '$n_k \\ge n_0$, así que $|a_{n_k} - \\ell| < \\varepsilon$. Luego $a_{n_k} \\to \\ell$.</p>'
    + '<p><span class="proof-step">Consecuencia.</span> Si dos subsucesiones convergen a límites '
    + 'distintos, la sucesión no puede converger (todas heredarían el mismo límite). Por eso $(-1)^n$ '
    + 'diverge. $\\blacksquare$</p>'
  ));
  root.appendChild(exRef(1, [13, 14, 15, 16]));

  root.appendChild(seccionResueltos('Ejercicios resueltos', RES_SUCESIONES));

  root.appendChild(callout('', 'Practicá las pruebas',
    'En el <a href="#asistente">Asistente de ejercicios</a> podés armar, arrastrando, la demostración de '
    + '$\\lim (3-2n)/(n+1) = -2$ por definición, y otras de sucesiones.'
  ));
}
