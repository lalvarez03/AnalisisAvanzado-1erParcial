// materias/alc/pages/interpolacion.js — Interpolación polinomial, fenómeno de Runge y regla de los trapecios.
// Teoría: apunte Acosta–Laplagne, Cap. 8 §1. Práctica 6, Ej. 1, 6–8, 14.

import { el, slider, selectControl } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { fmt, poligonal } from '../lib.js';

const R = String.raw;

/** Evalúa en x el polinomio interpolante de Lagrange de los nodos (xs, ys). O(n^2) por evaluación. */
function lagrange(xs, ys, x) {
  let s = 0;
  for (let i = 0; i < xs.length; i++) {
    let L = ys[i];
    for (let j = 0; j < xs.length; j++) if (j !== i) L *= (x - xs[j]) / (xs[i] - xs[j]);
    s += L;
  }
  return s;
}

export function renderInterpolacion(root) {
  root.appendChild(pageHeader('Interpolación: Vandermonde, Runge y trapecios',
    'Interpolar es pedirle al polinomio que pase <em>exactamente</em> por los datos. Suena ideal, pero tiene una trampa famosa: '
    + 'más nodos equiespaciados no significa mejor aproximación.'));

  root.appendChild(callout('thm', 'Existencia y unicidad del polinomio interpolante',
    R`Dados $x_0,\dots,x_n$ <b>distintos</b> y valores $y_0,\dots,y_n$, existe un único polinomio $p$ de grado $\le n$ con $p(x_i)=y_i$. Los coeficientes resuelven el sistema de Vandermonde $V a=y$, $V_{ij}=x_i^{\,j}$ (matriz $(n+1)\times(n+1)$), que es inversible.`,
    R`<p>Si $p,q$ interpolan, $p-q$ tiene grado $\le n$ y se anula en los $n+1$ puntos distintos $x_i$; un polinomio no nulo de grado $\le n$ tiene a lo sumo $n$ raíces, así que $p-q=0$. Esto prueba que $V a=0\Rightarrow a=0$ ($V$ inyectiva) y, al ser cuadrada, inversible. Entonces para cada $y$ hay solución: existencia. (Explícitamente: $p(x)=\sum_iy_i\prod_{j\neq i}\frac{x-x_j}{x_i-x_j}$.) $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Error de interpolación',
    R`Si $f\in C^{n+1}[a,b]$ y $p$ interpola a $f$ en $x_0,..,x_n\in[a,b]$, para cada $x\in[a,b]$ existe $\xi\in[a,b]$ con $\ f(x)-p(x)=\dfrac{f^{(n+1)}(\xi)}{(n+1)!}\prod_{i=0}^n(x-x_i)$. Si las derivadas de $f$ crecen más rápido que $(n+1)!/h^{n+1}$ (como en $\tfrac1{1+25x^2}$) el error <em>no</em> tiende a 0 con nodos equiespaciados.`));

  root.appendChild(callout('warn', 'El fenómeno de Runge',
    R`Para $f(x)=\dfrac1{1+25x^2}$ en $[-1,1]$ con nodos equiespaciados, $\|f-p_n\|_\infty\to\infty$ cuando $n\to\infty$: el polinomio oscila violentamente cerca de los extremos. Remedios: nodos de Chebyshev $x_k=\cos\frac{(2k+1)\pi}{2(n+1)}$ (se agrupan en los bordes) o interpolación <b>a trozos</b> con polinomios de grado bajo.`));

  root.appendChild(el('h2', { text: 'Visualización 1: Runge' }));
  const sn = slider({ label: 'n (grado)', min: 2, max: 24, step: 1, value: 10, format: (v) => v });
  const nod = selectControl({ label: 'Nodos: ', value: 'eq', options: [{ value: 'eq', label: 'equiespaciados' }, { value: 'ch', label: 'de Chebyshev' }] });
  root.appendChild(el('div', { class: 'controls' }, [sn.wrap, nod.wrap]));
  const out = readout('');
  const viz = mountCanvas(root, { height: 320, view: { xmin: -1.05, xmax: 1.05, ymin: -1, ymax: 1.5 }, hint: 'f(x) = 1/(1+25x²) (azul) y su interpolante pₙ (rosa)' });
  viz.setDraw(() => {
    const p = viz.plane; p.clear(); p.grid(0.5);
    const n = Number(sn.input.value); const cheb = nod.select.value === 'ch'; const f = (x) => 1 / (1 + 25 * x * x);
    const xs = Array.from({ length: n + 1 }, (_, k) => (cheb ? Math.cos(((2 * k + 1) * Math.PI) / (2 * (n + 1))) : -1 + (2 * k) / n)); const ys = xs.map(f);
    const X = Array.from({ length: 400 }, (_, i) => -1 + (2 * i) / 399);
    poligonal(p, X.map((x) => [x, f(x)]), COLORS.accent, 3);
    const P = X.map((x) => [x, lagrange(xs, ys, x)]);
    poligonal(p, P.filter(([, y]) => y > -4 && y < 4), COLORS.pink, 2.5);
    xs.forEach((x, i) => p.dot(x, ys[i], 4, COLORS.ok));
    const err = Math.max(...P.map(([x, y]) => Math.abs(y - f(x))));
    out.textContent = `n = ${n} · nodos ${cheb ? 'de Chebyshev' : 'equiespaciados'} · ‖f − pₙ‖∞ ≈ ${err < 1e4 ? fmt(err, 4) : err.toExponential(2)}`;
  });
  [sn.input, nod.select].forEach((c) => c.addEventListener('input', () => viz.redraw()));
  nod.select.addEventListener('change', () => viz.redraw());
  root.appendChild(out);
  root.appendChild(callout('tip', 'Qué observar',
    R`Con nodos equiespaciados el error <em>baja</em> hasta $n\approx6$ y después <em>sube</em>. Cambiá a Chebyshev: el error ahora sí tiende a 0 al aumentar $n$.`));

  root.appendChild(callout('thm', 'Regla de los trapecios compuesta',
    R`Con $x_i=a+ih$, $h=\frac{b-a}n$, se interpola $f$ linealmente en cada $[x_i,x_{i+1}]$ (poligonal $p_i$). Como $\int_{x_i}^{x_{i+1}}p_i=\tfrac h2\big(f(x_i)+f(x_{i+1})\big)$,
    $\displaystyle I=\int_a^bf\approx\frac{b-a}{n}\Big(\frac{f(a)+f(b)}2+\sum_{i=1}^{n-1}f(x_i)\Big)$. Si $f\in C^2$, el error es $\dfrac{(b-a)h^2}{12}f''(\xi)$.`,
    R`<p>$p_i(x)=f(x_i)+\frac{f(x_{i+1})-f(x_i)}{h}(x-x_i)$. Su integral es el área de un trapecio: $\int_{x_i}^{x_{i+1}}p_i=hf(x_i)+\frac{f(x_{i+1})-f(x_i)}{h}\cdot\frac{h^2}2=\frac h2\big(f(x_i)+f(x_{i+1})\big)$. Sumando de $i=0$ a $n-1$, cada nodo interior aparece dos veces (una por cada trapecio vecino) y los extremos una vez: $\frac h2\big(f(x_0)+2\sum_{i=1}^{n-1}f(x_i)+f(x_n)\big)$, que es la fórmula. $\blacksquare$</p>`));

  root.appendChild(el('h2', { text: 'Visualización 2: trapecios' }));
  const fun = selectControl({ label: 'Integral: ', value: 'sin', options: [
    { value: 'sin', label: '∫₀^{π/2} sen x dx = 1' }, { value: 'cos2', label: '∫₀^{2π} cos 2x dx = 0' }, { value: 'lor', label: '∫₋₁¹ 1/(1+x²) dx = π/2' }, { value: 'exp', label: '∫₀¹ eˣ dx = e − 1' }] });
  const sm = slider({ label: 'subintervalos n', min: 1, max: 60, step: 1, value: 4, format: (v) => v });
  root.appendChild(el('div', { class: 'controls' }, [fun.wrap, sm.wrap]));
  const D = { sin: [Math.sin, 0, Math.PI / 2, 1], cos2: [(x) => Math.cos(2 * x), 0, 2 * Math.PI, 0], lor: [(x) => 1 / (1 + x * x), -1, 1, Math.PI / 2], exp: [Math.exp, 0, 1, Math.E - 1] };
  const out2 = readout('');
  const viz2 = mountCanvas(root, { height: 260, view: {}, hint: 'curva y trapecios' });
  viz2.setDraw(() => {
    const p = viz2.plane; const [f, a, b, ex] = D[fun.select.value]; const n = Number(sm.input.value); const h = (b - a) / n;
    const X = Array.from({ length: 300 }, (_, i) => a + ((b - a) * i) / 299); const Y = X.map(f);
    p.view.xmin = a - 0.05 * (b - a); p.view.xmax = b + 0.05 * (b - a); p.view.ymin = Math.min(0, ...Y) - 0.15; p.view.ymax = Math.max(...Y) + 0.15; p.clear(); p.grid((b - a) / 4);
    for (let i = 0; i < n; i++) { const x0 = a + i * h; const x1 = x0 + h; p.polygon([[x0, 0], [x0, f(x0)], [x1, f(x1)], [x1, 0]], { stroke: COLORS.pink, fill: 'rgba(255,107,214,0.2)', wpx: 1 }); }
    poligonal(p, X.map((x, i) => [x, Y[i]]), COLORS.accent, 3);
    let I = (f(a) + f(b)) / 2; for (let i = 1; i < n; i++) I += f(a + i * h); I *= h;
    out2.textContent = `T_n = ${fmt(I, 8)}   exacto = ${fmt(ex, 8)}   error = ${Math.abs(I - ex).toExponential(2)}\nDuplicar n divide el error por ≈ 4 (error O(h²)). Con pocos subintervalos una función oscilante (cos 2x) se muestrea mal: el trapecio da un valor muy lejos del exacto.`;
  });
  [fun.select, sm.input].forEach((c) => c.addEventListener('input', () => viz2.redraw()));
  root.appendChild(out2);
}
