// materias/alc/pages/matrices.js — Operaciones con matrices, producto en bloques y cambio de base.
// Teoría: apunte Acosta–Laplagne, Cap. 1 §4–5. Práctica 1, Ej. 13–20.

import { el, slider } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { fmt, vistaIgual, flecha, solve } from '../lib.js';

const R = String.raw;

export function renderMatrices(root) {
  root.appendChild(pageHeader('Matrices, bloques y cambio de base',
    'Una matriz es a la vez una tabla de números, una lista de columnas y una función. Acá se fijan las reglas de cálculo '
    + 'que se usan en el resto de la materia.'));

  root.appendChild(callout('def', 'Producto de matrices',
    R`Si $A\in\mathbb{K}^{m\times n}$ y $B\in\mathbb{K}^{n\times r}$, entonces $AB\in\mathbb{K}^{m\times r}$ y $(AB)_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}$.
    Equivalentemente, la columna $j$ de $AB$ es $A B_j$ (donde $B_j$ es la columna $j$ de $B$): <em>$AB$ aplica $A$ a cada columna de $B$</em>.`));

  root.appendChild(callout('thm', 'Propiedades de la transpuesta y la traza',
    R`Para $A,A'\in\mathbb{K}^{m\times n}$, $B\in\mathbb{K}^{n\times r}$ y $D,D'\in\mathbb{K}^{n\times n}$:
    (a) $(AB)^t=B^tA^t$; (b) $AA^t$ y $A^tA$ son simétricas; (c) $\operatorname{tr}(DD')=\operatorname{tr}(D'D)$.`,
    R`<p>(a) $((AB)^t)_{ij}=(AB)_{ji}=\sum_k a_{jk}b_{ki}=\sum_k (B^t)_{ik}(A^t)_{kj}=(B^tA^t)_{ij}$.</p>
    <p>(b) $(AA^t)^t=(A^t)^tA^t=AA^t$ usando (a); análogo para $A^tA$.</p>
    <p>(c) $\operatorname{tr}(DD')=\sum_i\sum_k d_{ik}d'_{ki}=\sum_k\sum_i d'_{ki}d_{ik}=\operatorname{tr}(D'D)$ (se intercambia el orden de las sumas finitas). $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Producto por bloques',
    R`Si se parten $A=\begin{pmatrix}A_{11}&A_{12}\\A_{21}&A_{22}\end{pmatrix}$ y $B=\begin{pmatrix}B_{11}&B_{12}\\B_{21}&B_{22}\end{pmatrix}$ de modo que
    <b>las columnas de $A_{ik}$ coincidan con las filas de $B_{kj}$</b>, entonces $C_{ij}=A_{i1}B_{1j}+A_{i2}B_{2j}$ y $AB=(C_{ij})$.
    La partición es "realizable" si y solo si los tamaños de los bloques son compatibles para cada producto $A_{ik}B_{kj}$.`,
    R`<p>El coeficiente $(AB)_{ij}=\sum_{k}a_{ik}b_{kj}$ se puede dividir en dos sumas, la de los índices $k$ que caen en el primer grupo de columnas de $A$ (filas de $B$) y la de los que caen en el segundo. Cada suma parcial es exactamente un producto entre bloques; por eso hace falta que los grupos de índices $k$ coincidan en $A$ y en $B$. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Determinante de una matriz por bloques',
    R`Si $A\in\mathbb{K}^{n\times n}$ es inversible, entonces $\begin{pmatrix}A&B\\C&D\end{pmatrix}=\begin{pmatrix}A&0\\C&I\end{pmatrix}\begin{pmatrix}I&A^{-1}B\\0&D-CA^{-1}B\end{pmatrix}$ y por lo tanto $\det M=\det A\cdot\det(D-CA^{-1}B)$. Si además $AC=CA$, entonces $\det M=\det(AD-CB)$.`,
    R`<p>Se multiplica por bloques: $\begin{pmatrix}A&0\\C&I\end{pmatrix}\begin{pmatrix}I&A^{-1}B\\0&D-CA^{-1}B\end{pmatrix}=\begin{pmatrix}A&B\\C&CA^{-1}B+D-CA^{-1}B\end{pmatrix}=M$.</p>
    <p>Ambos factores son triangulares por bloques, así que su determinante es el producto de los determinantes de los bloques diagonales: $\det\begin{pmatrix}A&0\\C&I\end{pmatrix}=\det A$ y $\det\begin{pmatrix}I&A^{-1}B\\0&S\end{pmatrix}=\det S$ con $S=D-CA^{-1}B$. Entonces $\det M=\det A\det(D-CA^{-1}B)=\det(AD-ACA^{-1}B)$ (porque $\det(A)\det(X)=\det(AX)$).</p>
    <p>Si $AC=CA$ entonces $ACA^{-1}=C$ y queda $\det(AD-CB)$. $\blacksquare$</p>`));

  root.appendChild(callout('def', 'Coordenadas y matriz de cambio de base',
    R`Si $B=\{b_1,\dots,b_n\}$ es base de $\mathbb{K}^n$ y $v=\sum x_ib_i$, las <strong>coordenadas</strong> de $v$ en $B$ son $[v]_B=(x_1,\dots,x_n)^t$.
    Con $M_B=(b_1|\cdots|b_n)$ (las columnas son los $b_i$) vale $v=M_B[v]_B$, es decir $[v]_B=M_B^{-1}v$.
    La <strong>matriz de cambio de base</strong> de $B$ a $B'$ es $C(B,B')=M_{B'}^{-1}M_B$ y cumple $C(B,B')[v]_B=[v]_{B'}$.`));

  root.appendChild(callout('warn', 'Ojo con el sentido',
    R`$C(B,B')$ lleva coordenadas <em>en $B$</em> a coordenadas <em>en $B'$</em>: se aplica a $[v]_B$ y devuelve $[v]_{B'}$. Si te queda al revés, revisá si usaste $M_B^{-1}M_{B'}$.`));

  root.appendChild(el('h2', { text: 'Visualización: el mismo vector en dos bases' }));
  root.appendChild(el('p', { class: 'page-sub', text: 'Las coordenadas de $v$ cambian cuando cambia la base, pero el vector es el mismo. Probá hacer que $b_1$ y $b_2$ queden casi alineados: las coordenadas se disparan (la base se vuelve "mala").' }));
  const a2 = slider({ label: 'ángulo de b₂ (grados)', min: 10, max: 170, step: 1, value: 90, format: (v) => v + '°' });
  const vx = slider({ label: 'v₁', min: -3, max: 3, step: 0.1, value: 2, format: (v) => v.toFixed(1) });
  const vy = slider({ label: 'v₂', min: -3, max: 3, step: 0.1, value: 1.5, format: (v) => v.toFixed(1) });
  root.appendChild(el('div', { class: 'controls' }, [a2.wrap, vx.wrap, vy.wrap]));
  const out = readout('');
  const viz = mountCanvas(root, { height: 330, view: {}, hint: 'b₁ = (1,0) fijo; b₂ unitario móvil' });
  viz.setDraw(() => {
    const p = viz.plane; vistaIgual(p, 4); p.clear(); p.grid(1);
    const t = (Number(a2.input.value) * Math.PI) / 180;
    const b1 = [1, 0]; const b2 = [Math.cos(t), Math.sin(t)]; const v = [Number(vx.input.value), Number(vy.input.value)];
    const c = solve([[b1[0], b2[0]], [b1[1], b2[1]]], v);
    if (c) {
      p.segment(0, 0, c[0] * b1[0], c[0] * b1[1], COLORS.accent, 2, [5, 4]);
      p.segment(c[0] * b1[0], c[0] * b1[1], v[0], v[1], COLORS.pink, 2, [5, 4]);
    }
    flecha(p, 0, 0, b1[0], b1[1], COLORS.accent); flecha(p, 0, 0, b2[0], b2[1], COLORS.pink); flecha(p, 0, 0, v[0], v[1], COLORS.ok, 3);
    p.text('b₁', b1[0] + 0.1, -0.35, { color: COLORS.accent }); p.text('b₂', b2[0] + 0.1, b2[1] + 0.1, { color: COLORS.pink }); p.text('v', v[0] + 0.1, v[1] + 0.1, { color: COLORS.ok });
    out.textContent = c
      ? `[v]_canónica = (${fmt(v[0], 1)}, ${fmt(v[1], 1)})   →   [v]_B = (${fmt(c[0], 2)}, ${fmt(c[1], 2)})   (v = ${fmt(c[0], 2)}·b₁ + ${fmt(c[1], 2)}·b₂)`
      : 'b₁ y b₂ dependientes: no son una base.';
  });
  [a2, vx, vy].forEach((s) => s.input.addEventListener('input', () => viz.redraw()));
  root.appendChild(out);
}
