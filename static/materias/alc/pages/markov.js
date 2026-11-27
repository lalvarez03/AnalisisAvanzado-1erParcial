// materias/alc/pages/markov.js — Matrices estocásticas, procesos de Markov, estados de equilibrio.
// Teoría: apunte Acosta–Laplagne, Cap. 5 §10–11. Práctica 4, Ej. 12–16.

import { el, slider } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { fmt, mulv } from '../lib.js';

const R = String.raw;

/** Dibuja barras (valores 0..ymax) en un plano con eje x = índice de estado. */
function barras(p, vals, color, etiquetas, ymax = 1) {
  const n = vals.length; p.view.xmin = -0.5; p.view.xmax = n - 0.5; p.view.ymin = -0.14 * ymax; p.view.ymax = ymax * 1.1; p.clear(); p.grid(1);
  vals.forEach((v, i) => {
    p.polygon([[i - 0.35, 0], [i + 0.35, 0], [i + 0.35, v], [i - 0.35, v]], { stroke: color, fill: color + '88', wpx: 1.5 });
    if (etiquetas) p.text(etiquetas[i], i, -0.07 * ymax, { align: 'center', color: COLORS.textDim, font: '12px Inter' });
  });
}

export function renderMarkov(root) {
  root.appendChild(pageHeader('Procesos de Markov: Perron–Frobenius',
    'Si un sistema salta entre estados con probabilidades fijas, la distribución después de $k$ pasos es $P^kv_0$. '
    + 'La pregunta natural: ¿se estabiliza? La respuesta está en los autovalores de $P$.'));

  root.appendChild(callout('def', 'Matriz estocástica',
    R`$P=(p_{ij})\in\mathbb{R}^{n\times n}$ es <b>estocástica</b> (o de Markov) si $p_{ij}\ge0$ y <b>cada columna suma 1</b>: $\mathbf 1^tP=\mathbf 1^t$. Aquí $p_{ij}$ es la proporción (probabilidad) de pasar del estado $j$ al $i$. Un vector $v\ge0$ con $\mathbf 1^tv=1$ es una <b>distribución</b>. Un <b>estado de equilibrio</b> es una distribución $v$ con $Pv=v$.`));

  root.appendChild(callout('thm', 'Propiedades de las matrices estocásticas',
    R`Si $P,Q$ son estocásticas: (a) $PQ$ y $P^n$ son estocásticas; (b) $\lambda=1$ es autovalor de $P$; (c) todo autovalor cumple $|\lambda|\le1$.`,
    R`<p>(a) $PQ\ge0$ y $\mathbf 1^t(PQ)=(\mathbf 1^tP)Q=\mathbf 1^tQ=\mathbf 1^t$. Inducción para $P^n$.</p>
    <p>(b) De $\mathbf 1^tP=\mathbf 1^t$ se tiene $P^t\mathbf 1=\mathbf 1$: $1$ es autovalor de $P^t$ y, como $P$ y $P^t$ tienen los mismos autovalores, también de $P$.</p>
    <p>(c) $P$ y $P^t$ tienen los mismos autovalores. $P^t$ tiene entradas $\ge0$ y <em>filas</em> que suman 1. Sea $P^tw=\lambda w$, $w\neq0$, e $i$ con $|w_i|$ máximo. Entonces $|\lambda||w_i|=\big|\sum_j(P^t)_{ij}w_j\big|\le\sum_j(P^t)_{ij}|w_j|\le|w_i|\sum_j(P^t)_{ij}=|w_i|$. Dividiendo por $|w_i|>0$: $|\lambda|\le1$. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Convergencia (Perron–Frobenius para matrices positivas)',
    R`Si $P$ es estocástica y <b>todas sus entradas son positivas</b> (o alguna potencia $P^m>0$), entonces $\lambda=1$ es un autovalor simple, los demás cumplen $|\lambda|<1$ y para toda distribución inicial $v_0$: $P^kv_0\to v^*$, el <b>único</b> estado de equilibrio. Es decir $P^\infty=\lim P^k$ existe y todas sus columnas son iguales a $v^*$.
    <em>Sin esa hipótesis</em> el límite puede depender de $v_0$ (estados absorbentes) o no existir (ciclos, autovalor $-1$).`));

  root.appendChild(callout('tip', 'Idea de por qué converge',
    R`Si $P$ es diagonalizable con $\lambda_1=1$ y $|\lambda_i|<1$ para $i\ge2$, escribimos $v_0=\sum a_iw_i$. Entonces $P^kv_0=a_1w_1+\sum_{i\ge2}a_i\lambda_i^kw_i\to a_1w_1$ porque $\lambda_i^k\to0$. La velocidad de convergencia la fija el <em>segundo</em> autovalor en módulo.`));

  // Viz 1: ciclo de 3 estados
  root.appendChild(el('h2', { text: 'Visualización 1: cadena de 3 estados' }));
  root.appendChild(el('p', { class: 'page-sub', text: 'Estados S → N → L → S. Cada slider es la probabilidad de avanzar al siguiente estado en un paso (si no, se queda).' }));
  const sa = slider({ label: 'P(S→N)', min: 0.05, max: 0.95, step: 0.05, value: 0.3, format: (v) => v.toFixed(2) });
  const sb = slider({ label: 'P(N→L)', min: 0.05, max: 0.95, step: 0.05, value: 0.5, format: (v) => v.toFixed(2) });
  const sc = slider({ label: 'P(L→S)', min: 0.05, max: 0.95, step: 0.05, value: 0.7, format: (v) => v.toFixed(2) });
  const sk = slider({ label: 'pasos k', min: 0, max: 40, step: 1, value: 0, format: (v) => v });
  root.appendChild(el('div', { class: 'controls' }, [sa.wrap, sb.wrap, sc.wrap, sk.wrap]));
  const out = readout('');
  const viz = mountCanvas(root, { height: 230, view: {}, hint: 'v_k = Pᵏ v₀, con v₀ = (1, 0, 0)' });
  viz.setDraw(() => {
    const a = Number(sa.input.value); const b = Number(sb.input.value); const c = Number(sc.input.value); const k = Number(sk.input.value);
    const P = [[1 - a, 0, c], [a, 1 - b, 0], [0, b, 1 - c]];
    let v = [1, 0, 0]; for (let i = 0; i < k; i++) v = mulv(P, v);
    let w = [1, 0, 0]; for (let i = 0; i < 400; i++) w = mulv(P, w);
    barras(viz.plane, v, COLORS.accent, ['S', 'N', 'L']);
    viz.plane.segment(-0.5, 0, 2.5, 0, COLORS.text, 1);
    w.forEach((x, i) => viz.plane.segment(i - 0.45, x, i + 0.45, x, COLORS.warn, 2, [5, 3]));
    out.textContent = `v_${k} = (${v.map((x) => fmt(x, 3)).join(', ')})\nequilibrio v* = (${w.map((x) => fmt(x, 3)).join(', ')})   (líneas punteadas)  ·  ‖v_k − v*‖₁ = ${fmt(v.reduce((s, x, i) => s + Math.abs(x - w[i]), 0), 4)}`;
  });
  [sa, sb, sc, sk].forEach((s) => s.input.addEventListener('input', () => viz.redraw()));
  root.appendChild(out);

  // Viz 2: caminata con extremos absorbentes (Ej. 15)
  root.appendChild(el('h2', { text: 'Visualización 2: el borracho con extremos absorbentes (Ej. 15)' }));
  root.appendChild(el('p', { class: 'page-sub', text: 'Avanza hacia casa con probabilidad p y retrocede con 1−p; los extremos (bar y casa) son absorbentes. Acá P^∞ existe pero el límite DEPENDE de la distribución inicial: hay dos autovectores de autovalor 1.' }));
  const sn = slider({ label: 'distancia n', min: 4, max: 20, step: 1, value: 10, format: (v) => v });
  const sp = slider({ label: 'p', min: 0.1, max: 0.9, step: 0.05, value: 0.5, format: (v) => v.toFixed(2) });
  const si = slider({ label: 'inicio', min: 1, max: 19, step: 1, value: 3, format: (v) => v });
  const st = slider({ label: 'pasos', min: 0, max: 400, step: 5, value: 0, format: (v) => v });
  root.appendChild(el('div', { class: 'controls' }, [sn.wrap, sp.wrap, si.wrap, st.wrap]));
  const out2 = readout('');
  const viz2 = mountCanvas(root, { height: 230, view: {}, hint: 'posición del borracho (0 = bar, n = casa)' });
  viz2.setDraw(() => {
    const n = Number(sn.input.value); const p = Number(sp.input.value); const k = Number(st.input.value); const i0 = Math.min(Number(si.input.value), n - 1);
    let v = Array(n + 1).fill(0); v[i0] = 1;
    for (let s = 0; s < k; s++) { const w = Array(n + 1).fill(0); w[0] += v[0]; w[n] += v[n]; for (let i = 1; i < n; i++) { w[i + 1] += p * v[i]; w[i - 1] += (1 - p) * v[i]; } v = w; }
    barras(viz2.plane, v, COLORS.pink, null, Math.max(0.2, ...v));
    out2.textContent = `tras ${k} pasos: P(en el bar) = ${fmt(v[0], 3)} · P(en casa) = ${fmt(v[n], 3)} · P(sigue caminando) = ${fmt(1 - v[0] - v[n], 3)}\nCambiá el "inicio": el estado límite cambia ⇒ no hay un único equilibrio.`;
  });
  [sn, sp, si, st].forEach((s) => s.input.addEventListener('input', () => viz2.redraw()));
  root.appendChild(out2);

  root.appendChild(callout('warn', 'Errores comunes',
    R`<ul><li>En esta materia las columnas suman 1 (en otros libros son las filas). Revisá la convención antes de multiplicar $Pv$.</li><li>"Tiene autovalor 1" no implica "converge": $P=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ tiene autovalor $-1$ y oscila para siempre.</li></ul>`));
}
