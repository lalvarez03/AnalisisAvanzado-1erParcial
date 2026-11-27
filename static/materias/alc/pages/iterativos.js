// materias/alc/pages/iterativos.js — Métodos iterativos clásicos: Jacobi, Gauss–Seidel y SOR.
// Teoría: apunte Acosta–Laplagne, Cap. 6 §1–3. Práctica 7, Ej. 1–11.

import { el, slider, selectControl } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { fmt, inv, mul, radioEspectral2, poligonal, norm2 } from '../lib.js';

const R = String.raw;

/** Matriz de iteración 2x2 del método dado para A = L + D + U (partición aditiva). */
function matrizIteracion(A, metodo, w) {
  const D = [[A[0][0], 0], [0, A[1][1]]]; const L = [[0, 0], [A[1][0], 0]]; const U = [[0, A[0][1]], [0, 0]];
  const sub = (X, Y) => X.map((f, i) => f.map((x, j) => x - Y[i][j])); const esc = (c, X) => X.map((f) => f.map((x) => c * x));
  const suma = (X, Y) => X.map((f, i) => f.map((x, j) => x + Y[i][j]));
  if (metodo === 'jacobi') return mul(inv(D), esc(-1, suma(L, U)));
  if (metodo === 'gs') return mul(inv(suma(D, L)), esc(-1, U));
  return mul(inv(suma(D, esc(w, L))), sub(esc(1 - w, D), esc(w, U)));   // SOR
}

export function renderIterativos(root) {
  root.appendChild(pageHeader('Jacobi, Gauss–Seidel y SOR',
    'Para sistemas enormes (miles o millones de incógnitas, casi todo ceros) la eliminación es demasiado cara. '
    + 'La alternativa: partir de una aproximación y <em>mejorarla</em> en cada paso, usando solo productos matriz–vector.'));

  root.appendChild(callout('def', 'Esquema iterativo por partición',
    R`Se escribe $A=M-N$ con $M$ fácil de invertir y se itera $\ x_{k+1}=Bx_k+c$, con $B=M^{-1}N$ y $c=M^{-1}b$. Si $x^*$ es solución, $x^*=Bx^*+c$ y el error $e_k=x_k-x^*$ cumple $e_{k+1}=Be_k$, o sea $e_k=B^ke_0$.
    Con $A=L+D+U$ (parte estrictamente inferior, diagonal, estrictamente superior; $a_{ii}\neq0$): <ul>
    <li><b>Jacobi</b>: $M=D$, $\ B_J=-D^{-1}(L+U)$. Usa solo valores de la iteración anterior.</li>
    <li><b>Gauss–Seidel</b>: $M=D+L$, $\ B_{GS}=-(D+L)^{-1}U$. Usa los valores nuevos apenas se calculan.</li>
    <li><b>SOR($\omega$)</b>: $M=\tfrac1\omega(D+\omega L)$, $\ B(\omega)=(D+\omega L)^{-1}\big((1-\omega)D-\omega U\big)$.</li></ul>`));

  root.appendChild(callout('thm', 'Criterio de convergencia',
    R`El método converge para <b>todo</b> $x_0$ $\iff$ $\rho(B)<1$, donde $\rho(B)=\max|\lambda_i(B)|$. Como $\rho(B)\le\|B\|$ para cualquier norma inducida, <b>basta</b> hallar una norma con $\|B\|<1$. La velocidad: $\|e_k\|\approx\rho(B)^k\|e_0\|$.`,
    R`<p>(⇒) Si $\rho(B)\ge1$ hay un autovalor $|\lambda|\ge1$ con autovector $v$ (complejo en general). Con $e_0=v$ (o su parte real/imaginaria): $e_k=\lambda^kv\not\to0$.</p>
    <p>(⇐, caso diagonalizable) $B=CDC^{-1}$, $B^k=CD^kC^{-1}$ y $D^k\to0$ porque $|\lambda_i|<1$; luego $B^k\to0$ y $e_k\to0$. (En general se usa Schur o Jordan: para todo $\varepsilon>0$ existe una norma inducida con $\|B\|\le\rho(B)+\varepsilon$.)</p>
    <p><b>Radio espectral ≤ norma.</b> Si $Bv=\lambda v$, $\ |\lambda|\|v\|=\|Bv\|\le\|B\|\|v\|$. Para una norma matricial no inducida en $\mathbb{R}^{n\times n}$ se aplica a $B^m$ y la equivalencia de normas (Ej. 2). $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Condiciones suficientes y necesarias',
    R`(a) Si $A$ es <b>estrictamente diagonal dominante por filas</b> ($|a_{ii}|>\sum_{j\neq i}|a_{ij}|$), Jacobi converge. (b) Si $A$ es simétrica definida positiva, Gauss–Seidel converge. (c) Para SOR, $\det B(\omega)=(1-\omega)^n$, de modo que si converge, <b>$\omega\in(0,2)$</b>.`,
    R`<p>(a) $B_J=-D^{-1}(L+U)$ tiene en la fila $i$ los elementos $-a_{ij}/a_{ii}$; entonces $\|B_J\|_\infty=\max_i\sum_{j\neq i}|a_{ij}|/|a_{ii}|<1$.</p>
    <p>(c) $\det B(\omega)=\det\big((D+\omega L)^{-1}\big)\det\big((1-\omega)D-\omega U\big)$. Ambas son triangulares: $D+\omega L$ tiene diagonal $D$ y $(1-\omega)D-\omega U$ tiene diagonal $(1-\omega)D$. Entonces $\det B(\omega)=\frac{(1-\omega)^n\det D}{\det D}=(1-\omega)^n$. Como $|\det B|=\prod|\lambda_i|\le\rho(B)^n$, convergencia ($\rho<1$) exige $|1-\omega|<1$, o sea $0<\omega<2$. $\blacksquare$</p>`));

  root.appendChild(callout('warn', 'Trampas',
    R`<ul><li>Que $A$ esté mal condicionada <b>no</b> significa que el método sea lento, ni al revés (Ej. 10): la velocidad depende de $\rho(B)$, no de $\operatorname{cond}(A)$.</li><li>Jacobi puede converger y Gauss–Seidel no (y viceversa) para matrices no dominantes: hay que calcular $\rho$ de cada una.</li><li>Una norma con $\|B\|>1$ <em>no</em> prueba divergencia (Ej. 3): quizás otra norma dé $<1$.</li></ul>`));

  root.appendChild(el('h2', { text: 'Laboratorio: sistema 2×2' }));
  root.appendChild(el('p', { class: 'page-sub', html: R`Sistema $\begin{pmatrix}1&u\\v&1\end{pmatrix}x=b$ con solución $x^*=(1,1)$. Jacobi converge $\iff\sqrt{|uv|}<1$; Gauss–Seidel $\iff|uv|<1$ (y es el doble de rápido).` }));
  const met = selectControl({ label: 'Método: ', value: 'jacobi', options: [{ value: 'jacobi', label: 'Jacobi' }, { value: 'gs', label: 'Gauss–Seidel' }, { value: 'sor', label: 'SOR(ω)' }] });
  const su = slider({ label: 'u', min: -2, max: 2, step: 0.05, value: 0.8, format: (v) => v.toFixed(2) });
  const sv = slider({ label: 'v', min: -2, max: 2, step: 0.05, value: 0.6, format: (v) => v.toFixed(2) });
  const sw = slider({ label: 'ω (SOR)', min: 0.1, max: 2.2, step: 0.05, value: 1.2, format: (v) => v.toFixed(2) });
  const sk = slider({ label: 'iteraciones', min: 0, max: 30, step: 1, value: 6, format: (v) => v });
  root.appendChild(el('div', { class: 'controls' }, [met.wrap, su.wrap, sv.wrap, sw.wrap, sk.wrap]));
  const out = readout('');
  const viz = mountCanvas(root, { height: 320, view: { xmin: -2, xmax: 4, ymin: -2, ymax: 4 }, hint: 'iterados xₖ (rosa) partiendo de (−1, 3); x* = (1,1) en verde' });
  viz.setDraw(() => {
    const p = viz.plane; p.clear(); p.grid(1);
    const u = Number(su.input.value); const v = Number(sv.input.value); const w = Number(sw.input.value); const k = Number(sk.input.value); const m = met.select.value;
    const A = [[1, u], [v, 1]]; const xs = [1, 1]; const b = [A[0][0] * xs[0] + A[0][1] * xs[1], A[1][0] * xs[0] + A[1][1] * xs[1]];
    const paso = ([x, y]) => {
      if (m === 'jacobi') return [b[0] - u * y, b[1] - v * x];
      const xn = b[0] - u * y; const yn = b[1] - v * xn;
      if (m === 'gs') return [xn, yn];
      return [(1 - w) * x + w * xn, (1 - w) * y + w * (b[1] - v * ((1 - w) * x + w * xn))];
    };
    let x = [-1, 3]; const tray = [x];
    for (let i = 0; i < k; i++) { x = paso(x); tray.push(x); if (!x.every(Number.isFinite) || Math.abs(x[0]) > 1e6) break; }
    const dentro = tray.filter(([a, c]) => Math.abs(a) < 20 && Math.abs(c) < 20);
    poligonal(p, dentro, COLORS.pink, 1.5); dentro.forEach(([a, c], i) => p.dot(a, c, i === 0 ? 6 : 4, i === 0 ? COLORS.warn : COLORS.pink));
    p.dot(1, 1, 7, COLORS.ok);
    const B = matrizIteracion(A, m, w); const rho = radioEspectral2(B);
    const err = norm2([x[0] - 1, x[1] - 1]);
    const itsEstim = rho > 0 && rho < 1 ? Math.ceil(Math.log(1e-6) / Math.log(rho)) : null;
    out.textContent = `ρ(B) = ${fmt(rho, 4)} → ${rho < 1 ? 'CONVERGE' : 'NO converge'}${itsEstim ? ` (≈ ${itsEstim} iteraciones para bajar el error 10⁶ veces)` : ''}\n‖x_${k} − x*‖₂ = ${err < 1e6 ? err.toExponential(2) : '→ ∞'}\n${m === 'sor' ? `SOR: det B(ω) = (1−ω)² = ${fmt((1 - w) ** 2, 3)} ⇒ ${w > 0 && w < 2 ? 'ω ∈ (0,2) (condición necesaria OK)' : 'ω fuera de (0,2): no puede converger'}` : 'Jacobi: ρ = √|uv| · Gauss–Seidel: ρ = |uv|'}`;
  });
  [met.select, su.input, sv.input, sw.input, sk.input].forEach((c) => c.addEventListener('input', () => viz.redraw()));
  met.select.addEventListener('change', () => viz.redraw());
  root.appendChild(out);
  root.appendChild(callout('tip', 'Qué observar',
    R`Subí $|uv|$ hacia $1$: Jacobi y GS se enlentecen y en $|uv|=1$ dejan de converger. Con $\omega>1$ (sobre-relajación) SOR puede ir bastante más rápido que GS; con $\omega\notin(0,2)$ diverge siempre.`));
}
