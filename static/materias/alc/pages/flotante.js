// materias/alc/pages/flotante.js — Aritmética de punto flotante: épsilon de máquina, absorción, cancelación.
// Teoría: apunte Acosta–Laplagne, Cap. 2 (Números de máquina). Práctica 2, Ej. 7–10; Práctica 3, Ej. 8.

import { el, slider } from '../../../js/utils/dom.js';
import { pageHeader, callout, readout } from '../../../js/utils/page.js';

const R = String.raw;

/** Redondea x a t cifras significativas decimales (sistema de redondeo, base 10). */
export function redondear(x, t) {
  if (x === 0 || !Number.isFinite(x)) return x;
  const e = Math.floor(Math.log10(Math.abs(x)));
  const f = 10 ** (t - 1 - e);
  return Math.round(x * f) / f;
}

/** Eliminación gaussiana 2x2 con aritmética de t dígitos. pivoteo: intercambia filas si |a21| > |a11|. */
function resolver2x2(A, b, t, pivoteo) {
  let [[a, bb], [c, d]] = A; let [e, f] = b;
  if (pivoteo && Math.abs(c) > Math.abs(a)) { [a, bb, e, c, d, f] = [c, d, f, a, bb, e]; }
  const r = (x) => redondear(x, t);
  const m = r(c / a);
  const d2 = r(d - r(m * bb));
  const f2 = r(f - r(m * e));
  const y = r(f2 / d2);
  const x = r(r(e - r(bb * y)) / a);
  return { x, y, m };
}

export function renderFlotante(root) {
  root.appendChild(pageHeader('Punto flotante: error de redondeo y cancelación',
    'La computadora no guarda los reales: guarda <em>aproximaciones con una cantidad fija de dígitos</em>. '
    + 'Por eso $(a+b)+c$ puede dar distinto que $a+(b+c)$, y un algoritmo correcto "en papel" puede fallar al ejecutarlo.'));

  root.appendChild(callout('def', 'Sistema de punto flotante',
    R`Un número de máquina con base $\beta$ y $t$ dígitos de mantisa tiene la forma $\pm\,0.d_1d_2\dots d_t\times\beta^{e}$ con $d_1\neq0$.
    El <strong>épsilon de máquina</strong> $\varepsilon=\beta^{1-t}$ es la distancia entre $1$ y el siguiente número de máquina. En doble precisión (IEEE 754) $\beta=2$, $t=53$ y $\varepsilon\approx2{,}22\times10^{-16}$ (en Python: <code>np.finfo(float).eps</code>).`));

  root.appendChild(callout('thm', 'Error relativo del redondeo',
    R`Si $x\neq0$ está en el rango de los números de máquina y $\operatorname{fl}(x)$ es su redondeo al más cercano, entonces
    $\dfrac{|\operatorname{fl}(x)-x|}{|x|}\le u:=\tfrac12\beta^{1-t}=\tfrac{\varepsilon}{2}$. Es decir, $\operatorname{fl}(x)=x(1+\delta)$ con $|\delta|\le u$.
    Cada operación elemental cumple $\operatorname{fl}(a\ \square\ b)=(a\ \square\ b)(1+\delta)$, $|\delta|\le u$.`,
    R`<p>Escribimos $x=\pm\,0.d_1d_2\dots\times\beta^{e}$ con $d_1\ge1$. Los números de máquina consecutivos cerca de $x$ distan $\beta^{e-t}$, y el redondeo al más cercano comete un error absoluto $\le\tfrac12\beta^{e-t}$.</p>
    <p>Como $d_1\ge1$, $|x|\ge\beta^{e-1}$. Entonces $\dfrac{|\operatorname{fl}(x)-x|}{|x|}\le\dfrac{\tfrac12\beta^{e-t}}{\beta^{e-1}}=\tfrac12\beta^{1-t}$. $\blacksquare$</p>`));

  root.appendChild(callout('warn', 'Los dos grandes problemas',
    R`<ul><li><b>Absorción:</b> sumar un número muy chico a uno muy grande no cambia el grande: $10^{34}+1-10^{34}$ da $0$, no $1$.</li>
    <li><b>Cancelación catastrófica:</b> restar dos números casi iguales deja solo los dígitos "sucios": se pierde precisión relativa aunque la resta sea exacta.</li>
    <li>La suma <b>no es asociativa</b>. Para sumar términos positivos conviene sumar <em>de menor a mayor</em>.</li></ul>`));

  // Experimentos reales con doubles (los mismos del Ej. 7 de la Práctica 2)
  root.appendChild(el('h2', { text: 'Laboratorio 1: experimentos en doble precisión' }));
  const exp = readout('');
  const calc = () => {
    const eps = Number.EPSILON;
    const p = 10 ** Number(sE.input.value);
    const lineas = [
      `ε (épsilon de máquina)              = ${eps.toExponential(3)}`,
      `p = 10^${sE.input.value}, q = 1:  (p + q) − p  = ${(p + 1) - p}   (esperado: 1)`,
      `0.1 + 0.2 == 0.3                    → ${0.1 + 0.2 === 0.3}   (0.1+0.2 = ${(0.1 + 0.2).toPrecision(17)})`,
      `0.1 + 0.3 == 0.4                    → ${0.1 + 0.3 === 0.4}`,
      `(1 + ε/2) + ε/2 − 1                 = ${((1 + eps / 2) + eps / 2) - 1}`,
      `1 + (ε/2 + ε/2) − 1                 = ${(1 + (eps / 2 + eps / 2)) - 1}`,
      `sen(π·10^j) con j = ${sJ.input.value}              = ${Math.sin(Math.PI * 10 ** Number(sJ.input.value)).toExponential(3)}   (esperado: 0)`,
    ];
    exp.textContent = lineas.join('\n');
  };
  const sE = slider({ label: 'exponente de p', min: 0, max: 34, step: 1, value: 16, format: (v) => v });
  const sJ = slider({ label: 'j', min: 1, max: 25, step: 1, value: 5, format: (v) => v });
  root.appendChild(el('div', { class: 'controls' }, [sE.wrap, sJ.wrap]));
  root.appendChild(exp);
  [sE, sJ].forEach((s) => s.input.addEventListener('input', calc));
  calc();
  root.appendChild(el('p', { class: 'page-sub', text: 'Mové el exponente: cuando p ≈ 1/ε (≈ 10^16) el 1 se absorbe y (p+1)−p deja de dar 1. Eso es lo que pasa en el Ej. 7(a) con p = 10^34.' }));

  // Laboratorio 2: eliminación gaussiana con t dígitos
  root.appendChild(el('h2', { text: 'Laboratorio 2: por qué pivotear' }));
  root.appendChild(el('p', { class: 'page-sub', html:
    R`Sistema $10^{-3}x+2y=8,\ x+y=2$ (Práctica 3, Ej. 8). Reemplazando $x=2-y$ en la primera ecuación: $1{,}999\,y=7{,}998$, o sea $y\approx4{,}0005$ y $x\approx-2{,}0005$. Elegí cuántos dígitos usa la "máquina".` }));
  const sT = slider({ label: 't (dígitos)', min: 2, max: 8, step: 1, value: 3, format: (v) => v });
  root.appendChild(el('div', { class: 'controls' }, [sT.wrap]));
  const out2 = readout('');
  const calc2 = () => {
    const t = Number(sT.input.value); const A = [[1e-3, 2], [1, 1]]; const b = [8, 2];
    const yEx = (8 - 0.002) / 1.999; const xEx = 2 - yEx;   // solución exacta (ver texto)
    const s1 = resolver2x2(A, b, t, false); const s2 = resolver2x2(A, b, t, true);
    out2.textContent = [
      `exacta:                 x = ${xEx.toFixed(6)}   y = ${yEx.toFixed(6)}`,
      `sin pivoteo (m = ${s1.m}): x = ${s1.x}   y = ${s1.y}      error en x = ${Math.abs(s1.x - xEx).toExponential(2)}`,
      `con pivoteo:            x = ${s2.x}   y = ${s2.y}      error en x = ${Math.abs(s2.x - xEx).toExponential(2)}`,
    ].join('\n');
  };
  sT.input.addEventListener('input', calc2);
  root.appendChild(out2);
  calc2();
  root.appendChild(callout('tip', 'Lectura',
    R`Sin pivoteo el multiplicador es $m=10^{3}$, enorme: al restar, los números $2\cdot10^{3}$ "tapan" a los datos originales (absorción) y el $x$ sale con error grande. Con pivoteo parcial $|m|\le1$ y los errores no se amplifican. Eso motiva el <a href="#alc-lu">pivoteo en LU</a>.`));
}
