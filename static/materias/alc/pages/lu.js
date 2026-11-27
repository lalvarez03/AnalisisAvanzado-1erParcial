// materias/alc/pages/lu.js — Factorización LU (con y sin pivoteo) y Cholesky.
// Teoría: apunte Acosta–Laplagne, Cap. 4 §1–4. Práctica 3, Ej. 1–12.

import { el, slider, selectControl } from '../../../js/utils/dom.js';
import { pageHeader, callout, readout } from '../../../js/utils/page.js';
import { matStr, luSinPivoteo, luPivoteo, cholesky, mul } from '../lib.js';

const R = String.raw;

export function renderLU(root) {
  root.appendChild(pageHeader('LU, pivoteo y Cholesky',
    'Eliminación gaussiana es "restar múltiplos de una fila a las de abajo". Si guardamos esos múltiplos, la eliminación se convierte en una '
    + '<strong>factorización</strong> $A=LU$ que permite resolver muchos sistemas $Ax=b$ con la misma $A$ casi sin costo.'));

  root.appendChild(callout('def', 'Factorización LU',
    R`$A\in\mathbb{K}^{n\times n}$ admite <b>factorización LU</b> si $A=LU$ con $L$ triangular inferior con unos en la diagonal y $U$ triangular superior.
    Las operaciones de eliminación son productos por matrices elementales $T_{ij}(a)=I+aE_{ij}$ ($i\neq j$), cuya inversa es $T_{ij}(-a)$.
    Resolver $Ax=b$ se reduce a dos sistemas triangulares: $Ly=b$ (sustitución hacia adelante) y $Ux=y$ (hacia atrás), cada uno $O(n^2)$; la factorización cuesta $O(n^3)$.`));

  root.appendChild(callout('thm', 'Existencia y unicidad de LU',
    R`Si todos los menores principales $A_{[1:k]}$ ($k=1,\dots,n-1$) de $A$ son inversibles, entonces $A$ tiene factorización $LU$ (con $\operatorname{diag}L=1$). Si además $A$ es inversible, la factorización es <b>única</b>.`,
    R`<p><b>Existencia (inducción en $n$).</b> Para $n=1$ es $A=(1)(a_{11})$. Escribimos $A=\begin{pmatrix}A'&b\\c^t&d\end{pmatrix}$ con $A'=L'U'$ por hipótesis inductiva (los menores de $A'$ son menores de $A$). Buscamos $L=\begin{pmatrix}L'&0\\\ell^t&1\end{pmatrix}$, $U=\begin{pmatrix}U'&u\\0&\mu\end{pmatrix}$. Igualando $LU=A$: $L'u=b$, $\ell^tU'=c^t$, $\ell^tu+\mu=d$. Como $A'$ inversible, $L'$ y $U'$ lo son y $u=L'^{-1}b$, $\ell^t=c^tU'^{-1}$, $\mu=d-\ell^tu$ están bien definidos.</p>
    <p><b>Unicidad.</b> Si $L_1U_1=L_2U_2$ con $A$ inversible, todos los factores son inversibles y $L_2^{-1}L_1=U_2U_1^{-1}$. El miembro izquierdo es triangular inferior con unos en la diagonal; el derecho es triangular superior. Solo la matriz $I$ es ambas cosas, luego $L_1=L_2$ y $U_1=U_2$. $\blacksquare$</p>`));

  root.appendChild(callout('warn', 'Inversible no alcanza',
    R`$A=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ es inversible y <b>no</b> tiene $LU$: el primer pivote es $0$. En cambio $\begin{pmatrix}1&0\\0&0\end{pmatrix}$ <em>sí</em> tiene (con $U$ singular). La existencia depende de los menores principales, no de la inversibilidad (Ej. 6).`));

  root.appendChild(callout('thm', 'Pivoteo parcial: PA = LU',
    R`Si $A$ es inversible existe una matriz de permutación $P$ tal que $PA=LU$, con $|\ell_{ij}|\le1$.
    En cada paso $k$ se intercambia la fila $k$ con la fila $i\ge k$ que maximiza $|a_{ik}^{(k)}|$: ese pivote nunca es $0$ (si lo fuera, toda la columna sería nula bajo la diagonal y $A$ sería singular).`));

  root.appendChild(callout('def', 'Matriz definida positiva y Cholesky',
    R`$A=A^t\in\mathbb{R}^{n\times n}$ es <b>definida positiva</b> si $x^tAx>0$ para todo $x\neq0$. Una matriz $A$ simétrica definida positiva se factoriza de forma única como $A=LL^t$ con $L$ triangular inferior de diagonal positiva (<b>Cholesky</b>).`));

  root.appendChild(callout('thm', 'Definida positiva ⇒ Cholesky',
    R`Si $A$ es simétrica definida positiva, entonces todos sus menores principales son definidos positivos (en particular inversibles), $A$ tiene $LU$ y existe $L$ con $A=LL^t$. Además, una matriz simétrica $A$ es definida positiva $\iff$ existen $x_1,\dots,x_n$ linealmente independientes con $a_{ij}=x_i^tx_j$ (es la matriz de Gram; basta tomar las columnas de $L^t$).`,
    R`<p>Sea $A_k$ el menor principal $k\times k$ y $y\in\mathbb{R}^k\setminus\{0\}$. Extendiendo $y$ con ceros a $\tilde y\in\mathbb{R}^n$: $y^tA_ky=\tilde y^tA\tilde y>0$. Entonces $A_k$ es definida positiva; sus autovalores son $>0$ y $\det A_k>0$ (producto de autovalores). Por el teorema anterior $A=LU$. Escribimos $U=DU'$ con $D=\operatorname{diag}(u_{ii})$ y $U'$ triangular con unos; como $A$ es simétrica, $A=A^t=U'^tDL^t$ y por unicidad de $LU$: $U'^t=L$, o sea $A=LDL^t$. Los $d_i=u_{ii}=\det A_i/\det A_{i-1}>0$, así que $L_c=L\,D^{1/2}$ cumple $A=L_cL_c^t$. $\blacksquare$</p>`));

  // Visualización: laboratorio de factorizaciones
  root.appendChild(el('h2', { text: 'Laboratorio: factorizá una matriz de 3×3' }));
  const presets = {
    chico: (e) => [[e, 1, 1], [1, 1, 0], [1, 0, 1]],
    ej5: () => [[0, 1, 2], [1, 1, 0], [1, 0, 3]],
    spd: () => [[4, 2, -2], [2, 5, 5], [-2, 5, 11]],
    ej2: () => [[1, -1, 0], [0, 1, 4], [2, -1, 0]],
  };
  const sel = selectControl({ label: 'Matriz: ', value: 'chico', options: [
    { value: 'chico', label: 'Pivote chico ε' }, { value: 'ej5', label: 'Práctica 3, Ej. 5 (no tiene LU)' },
    { value: 'spd', label: 'Práctica 3, Ej. 9 (def. positiva)' }, { value: 'ej2', label: 'Ejemplo 3×3 con LU sin pivoteo' }] });
  const sE = slider({ label: 'log₁₀ ε (solo "pivote chico")', min: -12, max: 0, step: 1, value: -8, format: (v) => '10^' + v });
  root.appendChild(el('div', { class: 'controls' }, [sel.wrap, sE.wrap]));
  const out = readout('');
  const calc = () => {
    const A = presets[sel.select.value](10 ** Number(sE.input.value));
    const sp = luSinPivoteo(A); const cp = luPivoteo(A); const ch = cholesky(A);
    const maxL = (L) => Math.max(...L.flatMap((f, i) => f.filter((_, j) => j < i).map(Math.abs)), 0);
    const lineas = ['A =\n' + matStr(A, 4), ''];
    lineas.push(sp ? `SIN pivoteo: A = L·U     (máx|ℓᵢⱼ| = ${maxL(sp.L).toExponential(1)})\nL =\n${matStr(sp.L, 3)}\nU =\n${matStr(sp.U, 3)}` : 'SIN pivoteo: aparece un pivote nulo ⇒ no existe LU.');
    lineas.push('');
    lineas.push(`CON pivoteo parcial: P·A = L·U   (máx|ℓᵢⱼ| = ${maxL(cp.L).toFixed(2)} ≤ 1, filas permutadas: [${cp.perm.map((i) => i + 1).join(', ')}])\nL =\n${matStr(cp.L, 3)}\nU =\n${matStr(cp.U, 3)}`);
    lineas.push('');
    const simetrica = A.every((f, i) => f.every((x, j) => Math.abs(x - A[j][i]) < 1e-12));
    lineas.push(!simetrica ? 'Cholesky: A no es simétrica (no aplica).' : (ch ? `Cholesky: A = L·Lᵗ  (A es definida positiva)\nL =\n${matStr(ch, 3)}\nverificación máx|A − LLᵗ| = ${Math.max(...mul(ch, ch[0].map((_, j) => ch.map((f) => f[j]))).flatMap((f, i) => f.map((x, j) => Math.abs(x - A[i][j])))).toExponential(1)}` : 'Cholesky: A es simétrica pero NO definida positiva.'));
    out.textContent = lineas.join('\n');
  };
  sel.select.addEventListener('change', calc); sE.input.addEventListener('input', calc);
  root.appendChild(out);
  calc();
  root.appendChild(callout('tip', 'Qué observar',
    R`Con "pivote chico" y $\varepsilon\to0$ los multiplicadores sin pivoteo explotan ($\ell_{21}=1/\varepsilon$) y el error numérico se amplifica; con pivoteo parcial nunca superan $1$. En el Ej. 5 se ve que $A$ inversible puede no tener $LU$ y sí $PA=LU$.`));
}
