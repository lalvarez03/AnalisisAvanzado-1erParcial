// materias/alc/pages/condicion.js — Número de condición de una matriz y propagación del error en Ax = b.
// Teoría: apunte Acosta–Laplagne, Cap. 3 §4 (Condición de matrices). Práctica 2, Ej. 19–25.

import { el, slider } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { fmt, solve, inv, matNormInf, normInf } from '../lib.js';

const R = String.raw;

export function renderCondicion(root) {
  root.appendChild(pageHeader('Número de condición: cotas de error',
    'Dos sistemas con la <em>misma</em> cantidad de ecuaciones pueden comportarse muy distinto: en uno, un error de $10^{-6}$ en los datos '
    + 'cambia poco la solución; en otro, la destruye. El <strong>número de condición</strong> mide esa sensibilidad.'));

  root.appendChild(callout('def', 'Número de condición',
    R`Para $A$ inversible y una norma matricial inducida, $\operatorname{cond}(A)=\|A\|\,\|A^{-1}\|$. Siempre $\operatorname{cond}(A)\ge\|AA^{-1}\|=\|I\|=1$.
    Se dice que $A$ está <b>bien condicionada</b> si $\operatorname{cond}(A)$ es chico y <b>mal condicionada</b> si es grande.`));

  root.appendChild(callout('thm', 'Sensibilidad de Ax = b respecto de los datos',
    R`Sean $Ax=b$ y $A\tilde x=\tilde b$, con $b\neq0$. Entonces $\ \dfrac1{\operatorname{cond}(A)}\dfrac{\|b-\tilde b\|}{\|b\|}\le\dfrac{\|x-\tilde x\|}{\|x\|}\le\operatorname{cond}(A)\dfrac{\|b-\tilde b\|}{\|b\|}.$
    Con el residuo $r=b-A\tilde x$ y el error $e=x-\tilde x$ vale lo mismo reemplazando $\|b-\tilde b\|$ por $\|r\|$.`,
    R`<p><b>Cota superior.</b> $A(x-\tilde x)=b-\tilde b$, entonces $x-\tilde x=A^{-1}(b-\tilde b)$ y $\|x-\tilde x\|\le\|A^{-1}\|\|b-\tilde b\|$. Además $\|b\|=\|Ax\|\le\|A\|\|x\|$, o sea $\frac1{\|x\|}\le\frac{\|A\|}{\|b\|}$. Multiplicando: $\frac{\|x-\tilde x\|}{\|x\|}\le\|A\|\|A^{-1}\|\frac{\|b-\tilde b\|}{\|b\|}$.</p>
    <p><b>Cota inferior.</b> $\|b-\tilde b\|=\|A(x-\tilde x)\|\le\|A\|\|x-\tilde x\|$ y $\|x\|=\|A^{-1}b\|\le\|A^{-1}\|\|b\|$. Entonces $\frac{\|b-\tilde b\|}{\|b\|}\le\|A\|\|x-\tilde x\|\cdot\frac{\|A^{-1}\|}{\|x\|}=\operatorname{cond}(A)\frac{\|x-\tilde x\|}{\|x\|}$. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'cond(A) es la inversa de la distancia relativa a las singulares',
    R`$\ \dfrac1{\operatorname{cond}(A)}\le\inf\Big\{\dfrac{\|A-B\|}{\|A\|}:\ B\text{ singular}\Big\}$ (y de hecho vale la igualdad). Una matriz mal condicionada está <em>cerca</em> de una matriz singular.`,
    R`<p>Sea $B$ singular: existe $z\neq0$ con $Bz=0$. Entonces $\|z\|=\|A^{-1}Az\|=\|A^{-1}(A-B)z\|\le\|A^{-1}\|\|A-B\|\|z\|$, y dividiendo por $\|z\|$: $1\le\|A^{-1}\|\|A-B\|$, o sea $\frac{\|A-B\|}{\|A\|}\ge\frac1{\|A\|\|A^{-1}\|}=\frac1{\operatorname{cond}(A)}$. Tomando ínfimo sobre $B$ singulares sale la desigualdad. $\blacksquare$</p>`));

  root.appendChild(callout('warn', 'El determinante NO mide la condición',
    R`$D_n=\tfrac1{10}I_n$ tiene $\det D_n=10^{-n}\to0$ y sin embargo $\operatorname{cond}(D_n)=1$ (está perfectamente condicionada). Un determinante chico puede deberse solo a un cambio de escala; lo que importa es cuánto <em>se aplasta una dirección respecto de otra</em>.`));

  root.appendChild(el('h2', { text: 'Visualización: dos rectas casi paralelas' }));
  root.appendChild(el('p', { class: 'page-sub', html:
    R`Sistema $x+y=2$, $\ x+(1+\varepsilon)y=2+\varepsilon$ (solución exacta $(1,1)$). Se perturba el término independiente de la segunda ecuación por $\delta$. Cuando $\varepsilon\to0$ las rectas son casi paralelas y su punto de corte se mueve muchísimo.` }));
  const sEps = slider({ label: 'log₁₀ ε', min: -6, max: 0, step: 0.1, value: -1, format: (v) => '10^' + v.toFixed(1) });
  const sDel = slider({ label: 'perturbación δ de b₂', min: -0.1, max: 0.1, step: 0.002, value: 0.02, format: (v) => v.toFixed(3) });
  root.appendChild(el('div', { class: 'controls' }, [sEps.wrap, sDel.wrap]));
  const out = readout('');
  const viz = mountCanvas(root, { height: 300, view: { xmin: -1, xmax: 3, ymin: -1, ymax: 3 }, hint: 'rectas del sistema original (azul) y perturbado (rosa)' });
  viz.setDraw(() => {
    const p = viz.plane; p.clear(); p.grid(1);
    const eps = 10 ** Number(sEps.input.value); const del = Number(sDel.input.value);
    const A = [[1, 1], [1, 1 + eps]]; const b = [2, 2 + eps]; const bt = [2, 2 + eps + del];
    const x = [1, 1]; const xt = solve(A, bt);
    const linea = (row, rhs, col, dash) => {
      const [a1, a2] = row; const f = (X) => (rhs - a1 * X) / a2;
      p.segment(-1, f(-1), 3, f(3), col, 2, dash);
    };
    linea(A[0], b[0], COLORS.accent); linea(A[1], b[1], COLORS.accent2); linea(A[1], bt[1], COLORS.pink, [6, 4]);
    p.dot(1, 1, 6, COLORS.ok);
    if (xt && Math.abs(xt[0]) < 20 && Math.abs(xt[1]) < 20) p.dot(xt[0], xt[1], 6, COLORS.pink);
    const Ai = inv(A); const cond = matNormInf(A) * matNormInf(Ai);
    const relB = Math.abs(del) / normInf(b); const relX = xt ? normInf([xt[0] - x[0], xt[1] - x[1]]) / normInf(x) : NaN;
    out.textContent = `cond∞(A) = ${cond < 1e9 ? fmt(cond, 1) : cond.toExponential(2)}\n`
      + `error relativo en b  = ${relB.toExponential(2)}\n`
      + `error relativo en x  = ${relX.toExponential(2)}   (≤ cond · error en b = ${(cond * relB).toExponential(2)})\n`
      + `x̃ = (${xt ? fmt(xt[0], 3) : '—'}, ${xt ? fmt(xt[1], 3) : '—'})   [exacta: (1, 1)]`;
  });
  [sEps, sDel].forEach((s) => s.input.addEventListener('input', () => viz.redraw()));
  root.appendChild(out);
  root.appendChild(callout('tip', 'Qué observar',
    R`Con $\varepsilon=10^{-1}$ un error de $0{,}02$ en $b_2$ mueve poco la solución; con $\varepsilon=10^{-5}$ el mismo error la lleva lejísimo. El cociente "error en $x$ / error en $b$" nunca supera $\operatorname{cond}(A)$: justamente eso afirma el teorema.`));
}
