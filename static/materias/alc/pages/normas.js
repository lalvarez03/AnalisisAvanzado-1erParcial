// materias/alc/pages/normas.js — Normas vectoriales y matriciales, equivalencia, Cauchy–Schwarz.
// Teoría: apunte Acosta–Laplagne, Cap. 3 §1–3. Práctica 2, Ej. 11–18.

import { el, slider } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { fmt, vistaIgual, poligonal, svd2, matNorm1, matNormInf, norm2 } from '../lib.js';

const R = String.raw;

export function renderNormas(root) {
  root.appendChild(pageHeader('Normas: Cauchy–Schwarz y equivalencia',
    'Para hablar de "error", "tamaño" o "convergencia" de vectores y matrices necesitamos una forma de medirlos. '
    + 'Una <em>norma</em> es esa regla; las tres más usadas son $\\|\\cdot\\|_1$, $\\|\\cdot\\|_2$ y $\\|\\cdot\\|_\\infty$.'));

  root.appendChild(callout('def', 'Norma',
    R`Una <strong>norma</strong> en $\mathbb{K}^n$ es $\|\cdot\|:\mathbb{K}^n\to\mathbb{R}_{\ge0}$ tal que
    (i) $\|x\|=0\iff x=0$; (ii) $\|\alpha x\|=|\alpha|\,\|x\|$; (iii) $\|x+y\|\le\|x\|+\|y\|$ (desigualdad triangular).
    Las normas $p$ son $\|x\|_p=\big(\sum|x_i|^p\big)^{1/p}$, con $\|x\|_\infty=\max_i|x_i|$.`));

  root.appendChild(callout('thm', 'Desigualdad de Cauchy–Schwarz',
    R`Para $x,y\in\mathbb{R}^n$: $|\langle x,y\rangle|=|x^ty|\le\|x\|_2\|y\|_2$, con igualdad si y solo si $x,y$ son linealmente dependientes.`,
    R`<p>Si $y=0$ es trivial. Si no, para todo $t\in\mathbb{R}$: $0\le\|x-ty\|_2^2=\|x\|^2-2t\,x^ty+t^2\|y\|^2$. Es un polinomio de grado 2 en $t$ que nunca es negativo, así que su discriminante es $\le0$: $4(x^ty)^2-4\|x\|^2\|y\|^2\le0$. Eso es la desigualdad. Hay igualdad exactamente cuando el discriminante es $0$, es decir cuando existe $t$ con $x-ty=0$. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Equivalencia de normas (constantes explícitas)',
    R`Para $x\in\mathbb{R}^n$: $\ \|x\|_\infty\le\|x\|_2\le\sqrt n\,\|x\|_\infty\ $ y $\ \tfrac1{\sqrt n}\|x\|_1\le\|x\|_2\le\|x\|_1$. Consecuencia: $\|x_k\|_a\to0\iff\|x_k\|_b\to0$ para cualquier par de normas, así que "converger" no depende de la norma elegida (en dimensión finita).`,
    R`<p>(1) Sea $j$ con $|x_j|=\|x\|_\infty$. Entonces $\|x\|_\infty^2=x_j^2\le\sum x_i^2=\|x\|_2^2\le\sum\|x\|_\infty^2=n\|x\|_\infty^2$.</p>
    <p>(2) $\|x\|_2^2=\sum|x_i|^2\le\big(\sum|x_i|\big)^2=\|x\|_1^2$ (al desarrollar el cuadrado aparecen además los productos cruzados, todos $\ge0$). Por Cauchy–Schwarz con $y=(1,\dots,1)$: $\|x\|_1=\sum1\cdot|x_i|\le\sqrt n\,\|x\|_2$. $\blacksquare$</p>`));

  root.appendChild(callout('def', 'Norma matricial inducida',
    R`Dada una norma vectorial, $\|A\|=\max_{x\neq0}\dfrac{\|Ax\|}{\|x\|}=\max_{\|x\|=1}\|Ax\|$. Cumple $\|Ax\|\le\|A\|\|x\|$ y $\|AB\|\le\|A\|\|B\|$.`));

  root.appendChild(callout('thm', 'Normas 1 e ∞ de una matriz',
    R`$\|A\|_\infty=\max_{i}\sum_{j}|a_{ij}|$ (máxima suma de <em>filas</em>) y $\|A\|_1=\max_{j}\sum_{i}|a_{ij}|$ (máxima suma de <em>columnas</em>). Además $\|A\|_2=\sqrt{\rho(A^tA)}=\sigma_1(A)$.`,
    R`<p>Para $\|A\|_\infty$. <b>(≤)</b> Para todo $x$ con $\|x\|_\infty=1$: $|(Ax)_i|=|\sum_ja_{ij}x_j|\le\sum_j|a_{ij}|\le M:=\max_i\sum_j|a_{ij}|$, entonces $\|Ax\|_\infty\le M$.</p>
    <p><b>(≥)</b> Sea $i_0$ una fila donde se alcanza $M$ y tomemos $x_j=\operatorname{sg}(a_{i_0j})$. Entonces $\|x\|_\infty=1$ y $(Ax)_{i_0}=\sum_j|a_{i_0j}|=M$, así que $\|Ax\|_\infty\ge M$. Luego $\|A\|_\infty=M$. $\blacksquare$</p>
    <p>La de $\|A\|_1$ es análoga con $x=e_{j_0}$ (columna de mayor suma). La de $\|A\|_2$ se prueba con el <a href="#alc-svd">SVD</a>.</p>`));

  root.appendChild(callout('warn', 'Errores comunes',
    R`<ul><li>$\|A\|_\infty$ suma <b>filas</b>; $\|A\|_1$ suma <b>columnas</b> (se confunden).</li><li>La norma de Frobenius $\|A\|_F=\sqrt{\sum a_{ij}^2}$ <b>no</b> es inducida y en general $\|A\|_2\le\|A\|_F$.</li><li>El radio espectral $\rho(A)$ <b>no</b> es una norma: $\rho\begin{pmatrix}0&1\\0&0\end{pmatrix}=0$.</li></ul>`));

  // Viz 1: bolas unitarias
  root.appendChild(el('h2', { text: 'Visualización 1: la bola unitaria depende de la norma' }));
  const sp = slider({ label: 'p', min: 1, max: 12, step: 0.1, value: 2, format: (v) => (v >= 11.95 ? '∞' : v.toFixed(1)) });
  root.appendChild(el('div', { class: 'controls' }, [sp.wrap]));
  const viz = mountCanvas(root, { height: 280, view: {}, hint: '{x : ‖x‖_p = 1} en ℝ²' });
  viz.setDraw(() => {
    const p = viz.plane; vistaIgual(p, 1.5); p.clear(); p.grid(0.5);
    const pv = Number(sp.input.value); const inf = pv >= 11.95;
    const pts = Array.from({ length: 241 }, (_, i) => {
      const t = (2 * Math.PI * i) / 240; const c = Math.cos(t); const s = Math.sin(t);
      const n = inf ? Math.max(Math.abs(c), Math.abs(s)) : (Math.abs(c) ** pv + Math.abs(s) ** pv) ** (1 / pv);
      return [c / n, s / n];
    });
    poligonal(p, pts, COLORS.accent, 3);
    p.circle(0, 0, 1, { stroke: COLORS.textDim, wpx: 1, dash: [4, 4] });
  });
  sp.input.addEventListener('input', () => viz.redraw());

  // Viz 2: norma 2 de una matriz = máximo de |Ax|/|x|
  root.appendChild(el('h2', { text: 'Visualización 2: la norma de A es el máximo estiramiento' }));
  const m = ['a', 'b', 'c', 'd'].map((n, i) => slider({ label: n, min: -3, max: 3, step: 0.1, value: [2, 1, 0, 1][i], format: (v) => v.toFixed(1) }));
  root.appendChild(el('div', { class: 'controls' }, m.map((s) => s.wrap)));
  const out = readout('');
  const viz2 = mountCanvas(root, { height: 260, view: { xmin: 0, xmax: 360, ymin: 0, ymax: 4 }, hint: 'eje x: dirección θ de x (grados); eje y: ‖Ax‖₂/‖x‖₂' });
  viz2.setDraw(() => {
    const p = viz2.plane; const [a, b, c, d] = m.map((s) => Number(s.input.value)); const A = [[a, b], [c, d]];
    const sv = svd2(A); p.view.ymax = Math.max(1, sv.s1 * 1.25); p.clear(); p.grid(45);
    const pts = Array.from({ length: 181 }, (_, i) => { const th = (i * 2 * Math.PI) / 180; return [i * 2, norm2([a * Math.cos(th) + b * Math.sin(th), c * Math.cos(th) + d * Math.sin(th)])]; });
    poligonal(p, pts, COLORS.pink, 3);
    p.segment(0, sv.s1, 360, sv.s1, COLORS.ok, 1.5, [6, 4]); p.segment(0, sv.s2, 360, sv.s2, COLORS.warn, 1.5, [6, 4]);
    p.text('‖A‖₂ = σ₁', 6, sv.s1 + p.view.ymax * 0.03, { color: COLORS.ok }); p.text('σ₂', 6, sv.s2 + p.view.ymax * 0.03, { color: COLORS.warn });
    out.textContent = `‖A‖₁ = ${fmt(matNorm1(A), 2)} (máx. columna) · ‖A‖∞ = ${fmt(matNormInf(A), 2)} (máx. fila) · ‖A‖₂ = σ₁ = ${fmt(sv.s1, 3)} · σ₂ = ${fmt(sv.s2, 3)}`;
  });
  m.forEach((s) => s.input.addEventListener('input', () => viz2.redraw()));
  root.appendChild(out);
  root.appendChild(el('p', { class: 'page-sub', text: 'La curva rosa nunca supera la línea verde, y la toca: ese máximo es exactamente la norma 2.' }));
}
