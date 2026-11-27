// materias/alc/pages/autovalores.js — Autovalores, autovectores y diagonalización.
// Teoría: apunte Acosta–Laplagne, Cap. 5 §1–3. Práctica 4, Ej. 1–11.

import { el, slider, selectControl } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { fmt, vistaIgual, flecha, eig2, imagenCirculo, poligonal } from '../lib.js';

const R = String.raw;

export function renderAutovalores(root) {
  root.appendChild(pageHeader('Autovalores y diagonalización',
    'Casi toda dirección cambia de rumbo cuando una matriz actúa sobre ella. Los <strong>autovectores</strong> son las direcciones '
    + 'especiales que la matriz solo estira o encoge. Si hay suficientes, la matriz se ve como una diagonal en la base correcta.'));

  root.appendChild(callout('def', 'Autovalor y autovector',
    R`Sea $A\in\mathbb{K}^{n\times n}$. Un escalar $\lambda\in\mathbb{K}$ es <b>autovalor</b> de $A$ si existe $v\neq0$ con $Av=\lambda v$; ese $v$ es un <b>autovector</b>.
    Equivalentemente $\det(A-\lambda I)=0$; el polinomio $p_A(\lambda)=\det(\lambda I-A)$ es el <b>polinomio característico</b>.
    El subespacio $E_\lambda=\operatorname{Nu}(A-\lambda I)$ es el <b>autoespacio</b>. Ojo: depende del cuerpo: $\begin{pmatrix}0&a\\-a&0\end{pmatrix}$ no tiene autovalores reales y sí complejos ($\pm ia$).`));

  root.appendChild(callout('thm', 'Autovectores de autovalores distintos son linealmente independientes',
    R`Si $v_1,\dots,v_k$ son autovectores de autovalores <b>distintos</b> $\lambda_1,\dots,\lambda_k$, entonces $\{v_1,\dots,v_k\}$ es linealmente independiente. En particular, si $A$ tiene $n$ autovalores distintos, es diagonalizable.`,
    R`<p>Inducción en $k$. Para $k=1$, $v_1\neq0$. Supongamos cierto para $k-1$ y sea $\sum_{i=1}^k c_iv_i=0$. Aplicando $A$: $\sum c_i\lambda_iv_i=0$. Restando $\lambda_k$ por la primera: $\sum_{i<k}c_i(\lambda_i-\lambda_k)v_i=0$. Por hipótesis inductiva $c_i(\lambda_i-\lambda_k)=0$, y como $\lambda_i\neq\lambda_k$, $c_i=0$ para $i<k$. Queda $c_kv_k=0$, o sea $c_k=0$. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Diagonalización',
    R`$A$ es <b>diagonalizable</b> (existe $C$ inversible con $C^{-1}AC=D$ diagonal) $\iff$ $\mathbb{K}^n$ tiene una base de autovectores. En ese caso las columnas de $C$ son los autovectores, $D=\operatorname{diag}(\lambda_i)$ y $A^k=CD^kC^{-1}$.`,
    R`<p>Si $C=(v_1|\dots|v_n)$ y $D=\operatorname{diag}(\lambda_i)$, entonces $AC=(Av_1|\dots|Av_n)$ y $CD=(\lambda_1v_1|\dots|\lambda_nv_n)$. Luego $AC=CD$ equivale a $Av_i=\lambda_iv_i$ para todo $i$. Y $C$ es inversible $\iff$ sus columnas forman una base. Por último $A^k=(CDC^{-1})^k=CD^kC^{-1}$ (los $C^{-1}C$ intermedios se cancelan). $\blacksquare$</p>`));

  root.appendChild(callout('tip', 'Aplicación 1: Fibonacci con una fórmula cerrada',
    R`$\begin{pmatrix}F_n\\F_{n+1}\end{pmatrix}=A\begin{pmatrix}F_{n-1}\\F_n\end{pmatrix}$ con $A=\begin{pmatrix}0&1\\1&1\end{pmatrix}$, así que $\begin{pmatrix}F_n\\F_{n+1}\end{pmatrix}=A^n\begin{pmatrix}0\\1\end{pmatrix}$.
    $p_A(\lambda)=\lambda^2-\lambda-1$ tiene raíces $\varphi=\frac{1+\sqrt5}2$ y $\psi=\frac{1-\sqrt5}2$ (distintas ⇒ diagonalizable). Autovectores $(1,\varphi)^t$ y $(1,\psi)^t$. Al calcular $CD^nC^{-1}$ resulta $\ F_n=\dfrac{\varphi^n-\psi^n}{\sqrt5}$ (fórmula de Binet).`));

  root.appendChild(callout('tip', 'Aplicación 2: sistemas de ecuaciones diferenciales',
    R`Para $x'=Ax$ con $A=CDC^{-1}$, el cambio $u=C^{-1}x$ da $u'=Du$, que se desacopla: $u_i(t)=u_i(0)e^{\lambda_it}$. Así $x(t)=C\,\operatorname{diag}(e^{\lambda_it})\,C^{-1}x(0)$. Para $A=\begin{pmatrix}6&2\\2&3\end{pmatrix}$ los autovalores son $7$ y $2$.`));

  root.appendChild(callout('warn', 'Trampas',
    R`<ul><li>Que haya $n$ autovalores <em>contados con multiplicidad</em> no alcanza: $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ tiene $\lambda=1$ doble pero un solo autovector independiente: <b>no es diagonalizable</b>.</li>
    <li>$A$ y $A^t$ tienen los mismos autovalores (mismo polinomio característico) pero en general distintos autovectores.</li>
    <li>Calcular autovalores como raíces del polinomio característico es <b>mal condicionado</b>: pequeñas perturbaciones de los coeficientes mueven mucho las raíces (Ej. 11). Por eso se usan métodos como QR o potencia.</li></ul>`));

  root.appendChild(el('h2', { text: 'Visualización: qué le hace A a la circunferencia unitaria' }));
  const pre = selectControl({ label: 'Ejemplo: ', value: 'sim', options: [
    { value: 'sim', label: 'Simétrica (autovectores ortogonales)' }, { value: 'diag', label: 'Diagonalizable no simétrica' },
    { value: 'rot', label: 'Rotación (autovalores complejos)' }, { value: 'jor', label: 'No diagonalizable (bloque de Jordan)' }, { value: 'libre', label: 'Libre' }] });
  const PRE = { sim: [2, 1, 1, 2], diag: [2, 1, 0, 1], rot: [0, -1, 1, 0], jor: [1, 1, 0, 1] };
  const sl = ['a', 'b', 'c', 'd'].map((n, i) => slider({ label: n, min: -3, max: 3, step: 0.05, value: [2, 1, 1, 2][i], format: (v) => v.toFixed(2) }));
  pre.select.addEventListener('change', () => { const q = PRE[pre.select.value]; if (q) { q.forEach((x, i) => { sl[i].input.value = x; sl[i].setLabel(x); }); viz.redraw(); } });
  root.appendChild(el('div', { class: 'controls' }, [pre.wrap, ...sl.map((s) => s.wrap)]));
  const out = readout('');
  const viz = mountCanvas(root, { height: 330, view: {}, hint: 'circunferencia unitaria (punteada) y su imagen (rosa); rectas verdes = autovectores' });
  viz.setDraw(() => {
    const p = viz.plane; vistaIgual(p, 4); p.clear(); p.grid(1);
    const [a, b, c, d] = sl.map((s) => Number(s.input.value)); const A = [[a, b], [c, d]]; const e = eig2(A);
    p.circle(0, 0, 1, { stroke: COLORS.textDim, wpx: 1.5, dash: [4, 4] });
    poligonal(p, imagenCirculo(A), COLORS.pink, 3);
    if (!e.complejo) {
      [[e.l1, e.v1, COLORS.ok], [e.l2, e.v2, COLORS.warn]].forEach(([l, v, col]) => {
        p.segment(-6 * v[0], -6 * v[1], 6 * v[0], 6 * v[1], col, 1.2, [6, 4]);
        flecha(p, 0, 0, v[0], v[1], col, 2); flecha(p, 0, 0, l * v[0], l * v[1], col, 3);
      });
      out.textContent = `p_A(λ) = λ² − ${fmt(e.tr, 2)}·λ + ${fmt(e.dt, 2)}\nλ₁ = ${fmt(e.l1, 3)}, v₁ = (${fmt(e.v1[0], 2)}, ${fmt(e.v1[1], 2)})   λ₂ = ${fmt(e.l2, 3)}, v₂ = (${fmt(e.v2[0], 2)}, ${fmt(e.v2[1], 2)})\n`
        + (e.repetido && Math.abs(b) + Math.abs(c) > 1e-9 && Math.abs(a - d) < 1e-9 ? '⚠ autovalor doble con un solo autovector: NO diagonalizable.' : 'Cada autovector (flecha corta) queda sobre la misma recta con su estiramiento λ (flecha larga).');
    } else {
      out.textContent = `p_A(λ) = λ² − ${fmt(e.tr, 2)}·λ + ${fmt(e.dt, 2)}  →  λ = ${fmt(e.re, 3)} ± ${fmt(e.im, 3)}i\nNo hay autovectores reales: ninguna recta queda fija (la matriz "rota" las direcciones).`;
    }
  });
  sl.forEach((s) => s.input.addEventListener('input', () => { pre.select.value = 'libre'; viz.redraw(); }));
  root.appendChild(out);

  // Fibonacci
  root.appendChild(el('h2', { text: 'Fibonacci: matriz vs. fórmula de Binet' }));
  const sN = slider({ label: 'n', min: 1, max: 70, step: 1, value: 10, format: (v) => v });
  root.appendChild(el('div', { class: 'controls' }, [sN.wrap]));
  const out2 = readout('');
  const fib = () => {
    const n = Number(sN.input.value); const s5 = Math.sqrt(5); const ph = (1 + s5) / 2; const ps = (1 - s5) / 2;
    let a = 0; let b = 1; for (let i = 0; i < n; i++) [a, b] = [b, a + b];
    const binet = (ph ** n - ps ** n) / s5;
    out2.textContent = `F_${n} por recursión = ${a}\nBinet (φⁿ − ψⁿ)/√5 = ${binet.toFixed(n > 40 ? 0 : 4)}\nF_${n + 1}/F_${n} = ${(b / a).toFixed(10)}  →  φ = ${ph.toFixed(10)} (autovalor dominante)`;
  };
  sN.input.addEventListener('input', fib); root.appendChild(out2); fib();
}
