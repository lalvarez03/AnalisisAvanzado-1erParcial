// materias/alc/pages/svd.js — Descomposición en valores singulares (SVD), aproximación de bajo rango y pseudo-inversa.
// Teoría: apunte Acosta–Laplagne, Cap. 7. Práctica 5, Ej. 7–23.

import { el, slider } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { fmt, vistaIgual, flecha, svd2, imagenCirculo, poligonal, svdJacobi } from '../lib.js';

const R = String.raw;

/** Imagen sintética de N×N píxeles en escala de grises (círculo, diagonal y marco). */
function imagenDemo(N) {
  return Array.from({ length: N }, (_, i) => Array.from({ length: N }, (_, j) => {
    const x = (j + 0.5) / N - 0.5; const y = (i + 0.5) / N - 0.5;
    let v = 0.15 + 0.5 * (j / N);
    if (x * x + y * y < 0.06) v = 0.95;
    if (Math.abs(x - y) < 0.04) v = 0.05;
    if (i < 2 || j < 2 || i >= N - 2 || j >= N - 2) v = 0.6;
    return v;
  }));
}

export function renderSVD(root) {
  root.appendChild(pageHeader('SVD: valores singulares y Eckart–Young',
    'Toda matriz —cuadrada o no, diagonalizable o no— se puede escribir como "rotar, estirar ejes, rotar". '
    + 'Esa es la SVD, y de ella salen la norma 2, el número de condición, la mejor aproximación de bajo rango y la compresión de imágenes.'));

  root.appendChild(callout('def', 'SVD',
    R`Para $A\in\mathbb{C}^{m\times n}$ existen $U\in\mathbb{C}^{m\times m}$ y $V\in\mathbb{C}^{n\times n}$ unitarias y $\Sigma\in\mathbb{R}^{m\times n}$ "diagonal" con $\sigma_1\ge\sigma_2\ge\dots\ge\sigma_r>0$ ($r=\operatorname{rg}A$) tales que $A=U\Sigma V^*$.
    Los $\sigma_i=\sqrt{\lambda_i(A^*A)}$ son los <b>valores singulares</b>; las columnas de $V$ son los <b>vectores singulares a derecha</b> y las de $U$ a <b>izquierda</b>: $Av_i=\sigma_iu_i$.`));

  root.appendChild(callout('thm', 'Existencia de la SVD (construcción)',
    R`Todo $A$ tiene una SVD. Los $v_i$ son autovectores ortonormales de $A^*A$, los $\sigma_i^2$ sus autovalores, y $u_i=Av_i/\sigma_i$.`,
    R`<p>$A^*A$ es hermitiana y semidefinida positiva ($x^*A^*Ax=\|Ax\|^2\ge0$), así que por el teorema espectral existe una base ortonormal $v_1,\dots,v_n$ de autovectores con autovalores $\lambda_i=\sigma_i^2\ge0$, ordenados decrecientemente; sea $r$ el número de $\sigma_i>0$.</p>
    <p>Para $i\le r$ definimos $u_i=Av_i/\sigma_i$. Son ortonormales: $u_i^*u_j=\dfrac{v_i^*A^*Av_j}{\sigma_i\sigma_j}=\dfrac{\sigma_j^2v_i^*v_j}{\sigma_i\sigma_j}=\delta_{ij}$. Se completan a una base ortonormal de $\mathbb{C}^m$. Para $i>r$, $\|Av_i\|^2=\sigma_i^2=0$ así que $Av_i=0$. Entonces $AV=U\Sigma$ y, como $V$ es unitaria, $A=U\Sigma V^*$. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Consecuencias: norma 2 y condición',
    R`$\|A\|_2=\sigma_1$; si $A$ es inversible, $\|A^{-1}\|_2=1/\sigma_n$ y por lo tanto $\operatorname{cond}_2(A)=\sigma_1/\sigma_n$. Además $A$ tiene un valor singular nulo $\iff$ $A$ es singular (Ej. 10), y $A,A^t,\bar A,A^*$ tienen los mismos valores singulares.`,
    R`<p>Para $\|x\|_2=1$ y $y=V^*x$ (también $\|y\|=1$): $\|Ax\|^2=\|U\Sigma y\|^2=\|\Sigma y\|^2=\sum\sigma_i^2|y_i|^2\le\sigma_1^2\sum|y_i|^2=\sigma_1^2$, con igualdad para $y=e_1$, es decir $x=v_1$. Entonces $\|A\|_2=\sigma_1$.</p>
    <p>$A^{-1}=V\Sigma^{-1}U^*$ es una SVD (con los $1/\sigma_i$ ordenados al revés), así que su mayor valor singular es $1/\sigma_n$. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Mejor aproximación de rango s (Eckart–Young)',
    R`$A=\sum_{i=1}^r\sigma_iu_iv_i^*$ es suma de $r$ matrices de rango 1. Para $s<r$, la matriz $A_s=\sum_{i=1}^s\sigma_iu_iv_i^*$ cumple $\|A-A_s\|_2=\sigma_{s+1}$ y es la mejor aproximación de rango $\le s$ en norma 2: $\ \|A-B\|_2\ge\sigma_{s+1}$ para toda $B$ de rango $\le s$.`,
    R`<p>(Valor) $A-A_s=\sum_{i>s}\sigma_iu_iv_i^*=U\operatorname{diag}(0,..,0,\sigma_{s+1},..)V^*$, cuya norma 2 es su mayor valor singular $\sigma_{s+1}$.</p>
    <p>(Optimalidad) Sea $\operatorname{rg}B\le s$. Entonces $\dim\operatorname{Nu}(B)\ge n-s$, y $W=\langle v_1,..,v_{s+1}\rangle$ tiene dimensión $s+1$, así que $W\cap\operatorname{Nu}(B)\neq\{0\}$ (dimensiones: $(s+1)+(n-s)>n$). Sea $x$ unitario en esa intersección: $\|(A-B)x\|=\|Ax\|=\big\|\sum_{i\le s+1}\sigma_i(v_i^*x)u_i\big\|\ge\sigma_{s+1}\|x\|=\sigma_{s+1}$. $\blacksquare$</p>`));

  root.appendChild(callout('def', 'Pseudo-inversa',
    R`Si $A=\hat U\hat\Sigma\hat V^t$ es la SVD reducida ($\hat\Sigma$ con solo los $\sigma_i>0$), $A^\dagger=\hat V\hat\Sigma^{-1}\hat U^t$. Cumple los cuatro axiomas de Moore–Penrose: $AA^\dagger A=A$, $A^\dagger AA^\dagger=A^\dagger$, $(AA^\dagger)^t=AA^\dagger$, $(A^\dagger A)^t=A^\dagger A$, y es la <b>única</b> con esas propiedades. Si $A$ tiene columnas l.i., $A^\dagger b$ es la solución de cuadrados mínimos (ver <a href="#alc-cuadrados">cuadrados mínimos</a>).`));

  root.appendChild(callout('warn', 'Errores comunes',
    R`<ul><li>Los valores singulares <b>no</b> son los módulos de los autovalores (solo coinciden si $A$ es normal, p. ej. simétrica).</li><li>La SVD no es única en los vectores si hay valores singulares repetidos (ni en signos).</li><li>El error de compresión relativo es $\sigma_{r+1}/\sigma_1$ en norma 2, <em>no</em> un porcentaje de píxeles.</li></ul>`));

  // Viz 1: circunferencia → elipse
  root.appendChild(el('h2', { text: 'Visualización 1: la elipse de A y sus valores singulares' }));
  const m = ['a', 'b', 'c', 'd'].map((n, i) => slider({ label: n, min: -3, max: 3, step: 0.05, value: [4, 0, 3, 5][i], format: (v) => v.toFixed(2) }));
  root.appendChild(el('div', { class: 'controls' }, m.map((s) => s.wrap)));
  const out = readout('');
  const viz = mountCanvas(root, { height: 340, view: {}, hint: 'circunferencia (punteada) → elipse {Ax: ‖x‖₂=1}; semiejes = σᵢ·uᵢ' });
  viz.setDraw(() => {
    const p = viz.plane; vistaIgual(p, 7); p.clear(); p.grid(1);
    const [a, b, c, d] = m.map((s) => Number(s.input.value)); const A = [[a, b], [c, d]]; const sv = svd2(A);
    p.circle(0, 0, 1, { stroke: COLORS.textDim, wpx: 1.5, dash: [4, 4] });
    poligonal(p, imagenCirculo(A), COLORS.pink, 3);
    flecha(p, 0, 0, sv.v1[0], sv.v1[1], COLORS.accent, 2); flecha(p, 0, 0, sv.v2[0], sv.v2[1], COLORS.accent2, 2);
    flecha(p, 0, 0, sv.s1 * sv.u1[0], sv.s1 * sv.u1[1], COLORS.ok, 3); flecha(p, 0, 0, sv.s2 * sv.u2[0], sv.s2 * sv.u2[1], COLORS.warn, 3);
    out.textContent = `σ₁ = ${fmt(sv.s1, 3)} (verde)   σ₂ = ${fmt(sv.s2, 3)} (naranja)\n‖A‖₂ = σ₁ = ${fmt(sv.s1, 3)} · cond₂(A) = σ₁/σ₂ = ${sv.s2 > 1e-9 ? fmt(sv.s1 / sv.s2, 3) : '∞ (A singular)'}\nmejor aproximación de rango 1: error en norma 2 = σ₂ = ${fmt(sv.s2, 3)}  (error relativo ${fmt(sv.s2 / Math.max(sv.s1, 1e-12), 3)})\nv₁, v₂ (azul, violeta, sobre la circunferencia) → u₁σ₁, u₂σ₂ (sobre la elipse).`;
  });
  m.forEach((s) => s.input.addEventListener('input', () => viz.redraw()));
  root.appendChild(out);

  // Viz 2: compresión de una imagen
  root.appendChild(el('h2', { text: 'Visualización 2: compresión de imágenes (Ej. 19–23)' }));
  root.appendChild(el('p', { class: 'page-sub', text: 'Imagen sintética de 40×40. Con rango r se guardan (m+n)·r + r + 2 números en lugar de m·n. Mové r: con pocos valores singulares ya se distingue casi todo.' }));
  const N = 40; const IMG = imagenDemo(N); const sv = svdJacobi(IMG);
  const sr = slider({ label: 'rango r', min: 1, max: N, step: 1, value: 3, format: (v) => v });
  root.appendChild(el('div', { class: 'controls' }, [sr.wrap]));
  const out2 = readout('');
  const viz2 = mountCanvas(root, { height: 260, view: {}, hint: 'izquierda: original · derecha: reconstrucción de rango r' });
  viz2.setDraw(() => {
    const p = viz2.plane; const ctx = p.ctx; p.clear(); const r = Number(sr.input.value);
    const rec = Array.from({ length: N }, () => Array(N).fill(0));
    for (let k = 0; k < r; k++) for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) rec[i][j] += sv.s[k] * sv.U[i][k] * sv.V[j][k];
    const lado = Math.min(p.height - 20, (p.width - 60) / 2); const y0 = (p.height - lado) / 2; const px = lado / N;
    const pinta = (M, x0) => M.forEach((f, i) => f.forEach((v, j) => { const g = Math.max(0, Math.min(255, Math.round(v * 255))); ctx.fillStyle = `rgb(${g},${g},${g})`; ctx.fillRect(x0 + j * px, y0 + i * px, px + 0.5, px + 0.5); }));
    pinta(IMG, 20); pinta(rec, 40 + lado);
    const comp = (N * N) / ((N + N) * r + r + 2);
    out2.textContent = `r = ${r}: error relativo ‖A−A_r‖₂/‖A‖₂ = σ_{r+1}/σ₁ = ${r < N ? fmt(sv.s[r] / sv.s[0], 4) : '0'} · compresión = ${fmt(comp, 2)}× ${comp < 1 ? '(¡no conviene: ocupa más!)' : ''}\nprimeros valores singulares: ${sv.s.slice(0, 6).map((x) => fmt(x, 2)).join(', ')} …`;
  });
  sr.input.addEventListener('input', () => viz2.redraw());
  root.appendChild(out2);
}
