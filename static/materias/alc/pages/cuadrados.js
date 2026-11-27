// materias/alc/pages/cuadrados.js — Cuadrados mínimos: ecuaciones normales, proyección ortogonal y regresión.
// Teoría: apunte Acosta–Laplagne, Cap. 8. Práctica 6, Ej. 2–13.

import { el, slider } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { fmt, mul, T, solve, poligonal } from '../lib.js';

const R = String.raw;

/** Ajusta un polinomio de grado `g` por ecuaciones normales (solo para grados chicos). Devuelve coeficientes c0..cg o null. */
export function ajustePoly(pts, g) {
  const A = pts.map(([x]) => Array.from({ length: g + 1 }, (_, k) => x ** k));
  const At = T(A); const N = mul(At, A); const rhs = At.map((f) => f.reduce((s, a, i) => s + a * pts[i][1], 0));
  return solve(N, rhs);
}

export function renderCuadrados(root) {
  root.appendChild(pageHeader('Cuadrados mínimos: ecuaciones normales',
    'Con más ecuaciones que incógnitas, $Ax=b$ casi nunca tiene solución exacta (datos con ruido). En vez de rendirnos, '
    + 'buscamos el $x$ que deja el residuo $b-Ax$ lo más corto posible.'));

  root.appendChild(callout('def', 'Problema de cuadrados mínimos',
    R`Dados $A\in\mathbb{R}^{m\times n}$ ($m\ge n$) y $b\in\mathbb{R}^m$, hallar $\hat x=\arg\min_{x\in\mathbb{R}^n}\|Ax-b\|_2$. Si el modelo es $f(t)=\sum_{j}\alpha_jf_j(t)$ y se miden $(t_i,y_i)$, entonces $A_{ij}=f_j(t_i)$ y $b_i=y_i$ (modelo <b>lineal en los parámetros $\alpha_j$</b>, aunque las $f_j$ no sean lineales: $f_j(t)=t^j,\ \sin(\omega t),\dots$).`));

  root.appendChild(callout('thm', 'Ecuaciones normales',
    R`$\hat x$ minimiza $\|Ax-b\|_2$ $\iff$ $A^tA\hat x=A^tb$ $\iff$ el residuo $b-A\hat x$ es ortogonal a $\operatorname{Im}(A)$. Si $\operatorname{rg}A=n$, $A^tA$ es inversible (simétrica definida positiva), la solución es única, $\hat x=(A^tA)^{-1}A^tb=A^\dagger b$ y $A\hat x=P_{\operatorname{Im}A}\,b$.`,
    R`<p>Para cualquier $x$, escribimos $b-Ax=(b-A\hat x)+A(\hat x-x)$. Si $A^t(b-A\hat x)=0$, los dos sumandos son ortogonales ($A(\hat x-x)\in\operatorname{Im}A$) y por Pitágoras $\|b-Ax\|^2=\|b-A\hat x\|^2+\|A(\hat x-x)\|^2\ge\|b-A\hat x\|^2$: $\hat x$ es mínimo, y único si $A$ es inyectiva.</p>
    <p>Recíprocamente, si $\hat x$ es mínimo, para todo $v$ la función $\varphi(\tau)=\|b-A\hat x-\tau Av\|^2$ tiene mínimo en $\tau=0$; derivando, $\varphi'(0)=-2\,(Av)^t(b-A\hat x)=0$ para todo $v$, o sea $A^t(b-A\hat x)=0$.</p>
    <p>$A^tA$ inversible si $\operatorname{rg}A=n$: $A^tAx=0\Rightarrow x^tA^tAx=\|Ax\|^2=0\Rightarrow Ax=0\Rightarrow x=0$. Con la SVD reducida: $A^tA\,(A^\dagger b)=\hat V\hat\Sigma^2\hat V^t\hat V\hat\Sigma^{-1}\hat U^tb=\hat V\hat\Sigma\hat U^tb=A^tb$. $\blacksquare$</p>`));

  root.appendChild(callout('tip', 'Ajustes que se pueden "linealizar"',
    R`$Y=aX^b\Rightarrow\ln Y=\ln a+b\ln X$ (recta en log–log, Ej. 10). $g(x)=e^{p(x)}\Rightarrow\ln g=p(x)$ polinomio (Ej. 8). $f(t)=at^2+b$ se resuelve con columnas $(t_i^2,1)$ (Ej. 9). Cuidado: ajustar $\ln y$ minimiza el error relativo, no el absoluto de $y$.`));

  root.appendChild(callout('warn', 'Cuidado numérico',
    R`Formar $A^tA$ eleva al cuadrado el número de condición: $\operatorname{cond}_2(A^tA)=\operatorname{cond}_2(A)^2$. Es preferible resolver con <b>QR</b> ($R\hat x=Q^tb$) o con la SVD. Además, un polinomio de grado $n-1$ ajustado a $n$ puntos los <em>interpola</em> (residuo 0): ajustar mejor no significa predecir mejor.`));

  root.appendChild(el('h2', { text: 'Laboratorio: ajustá un polinomio a tus puntos' }));
  root.appendChild(el('p', { class: 'page-sub', text: 'Hacé clic sobre el gráfico para agregar puntos. El segmento rosa de cada punto es su residuo; el ajuste minimiza la suma de sus cuadrados.' }));
  let pts = [[-1, -1], [0, 3], [2, 11], [3, 27]];
  const sg = slider({ label: 'grado', min: 0, max: 5, step: 1, value: 1, format: (v) => v });
  const reset = el('button', { class: 'btn ghost', type: 'button' }, 'Datos de la Práctica 6, Ej. 3');
  const limpiar = el('button', { class: 'btn ghost', type: 'button' }, 'Borrar puntos');
  root.appendChild(el('div', { class: 'controls' }, [sg.wrap, reset, limpiar]));
  const out = readout('');
  const viz = mountCanvas(root, { height: 340, view: { xmin: -2, xmax: 5, ymin: -5, ymax: 35 }, hint: 'clic = agregar punto' });
  viz.setDraw(() => {
    const p = viz.plane; p.clear(); p.grid(1);
    const g = Number(sg.input.value); const xs = new Set(pts.map((q) => q[0]));
    const c = pts.length > g && xs.size > g ? ajustePoly(pts, g) : null;
    const f = (x) => (c ? c.reduce((s, ck, k) => s + ck * x ** k, 0) : 0);
    if (c) {
      const curva = Array.from({ length: 200 }, (_, i) => { const x = -2 + (7 * i) / 199; return [x, f(x)]; }).filter(([, y]) => y > -60 && y < 90);
      poligonal(p, curva, COLORS.ok, 3);
      pts.forEach(([x, y]) => p.segment(x, y, x, f(x), COLORS.pink, 2));
    }
    pts.forEach(([x, y]) => p.dot(x, y, 6, COLORS.accent));
    const sse = c ? pts.reduce((s, [x, y]) => s + (y - f(x)) ** 2, 0) : NaN;
    out.textContent = c
      ? `p(x) = ${c.map((ck, k) => `${fmt(ck, 3)}${k ? 'x' + (k > 1 ? '^' + k : '') : ''}`).join(' + ')}\nsuma de cuadrados de residuos ‖b − Ax̂‖² = ${fmt(sse, 4)}   (${pts.length} puntos, ${g + 1} parámetros)${pts.length === g + 1 ? '\n→ tantos parámetros como puntos: el polinomio INTERPOLA (residuo 0).' : ''}`
      : `Hacen falta más de ${g} puntos con abscisas distintas para ajustar grado ${g}.`;
  });
  viz.canvas.addEventListener('click', (e) => {
    const r = viz.canvas.getBoundingClientRect(); pts.push([viz.plane.wx(e.clientX - r.left), viz.plane.wy(e.clientY - r.top)]); viz.redraw();
  });
  sg.input.addEventListener('input', () => viz.redraw());
  reset.addEventListener('click', () => { pts = [[-1, -1], [0, 3], [2, 11], [3, 27]]; viz.redraw(); });
  limpiar.addEventListener('click', () => { pts = []; viz.redraw(); });
  root.appendChild(out);
  root.appendChild(callout('tip', 'Qué observar',
    R`Con los 4 puntos del Ej. 3, el polinomio de grado 3 pasa exactamente por todos (residuo 0): interpola, no "ajusta". Agregá un punto muy alejado y mirá cuánto mueve la recta: los cuadrados dan mucho peso a los <em>outliers</em>.`));
}
