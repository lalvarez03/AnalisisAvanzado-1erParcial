// materias/algoritmos-3/pages/backtracking.js — Backtracking: formalización, árbol de llamadas y podas (Práctica 5).

import { el, slider, selectControl } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { arbolSubsetSum } from '../lib.js';

const R = String.raw;

const PRESETS = { a: [6, 12, 6], b: [3, 5, 2, 7], c: [4, 6, 5, 2, 3] };

/** Posiciona los nodos del árbol: x por orden de hojas, y por profundidad. */
function posicionar(raiz) {
  let hoja = 0; const lista = []; let profMax = 0;
  const rec = (nodo, prof) => {
    profMax = Math.max(profMax, prof);
    if (!nodo.hijos.length) { nodo.x = hoja++; } else { nodo.hijos.forEach((h) => rec(h, prof + 1)); nodo.x = (nodo.hijos[0].x + nodo.hijos[nodo.hijos.length - 1].x) / 2; }
    nodo.prof = prof; lista.push(nodo);
  };
  rec(raiz, 0); return { lista, hojas: hoja, profMax };
}

export function renderBacktracking(root) {
  root.appendChild(pageHeader('Backtracking: suma de subconjuntos y podas',
    'Cuando no sabemos resolver un problema "de manera inteligente", podemos al menos <em>probar todas las posibilidades de forma ordenada</em>. '
    + 'Backtracking arma la solución de a poco y abandona un camino apenas sabe que no puede llevar a una solución.'));

  root.appendChild(callout('def', 'Formalización de un problema (la receta de la materia)',
    R`<ol><li><b>Soluciones candidatas</b> $Sols$: todas las "respuestas posibles" (válidas o no).</li>
    <li><b>Predicado de validación</b> $\text{válida}(a)$: cuáles de ellas cumplen lo pedido.</li>
    <li>El problema es calcular una <em>fórmula</em> sobre las válidas: ¿existe una? (decisión), ¿cuántas hay? (conteo) o ¿cuál es la mejor según un orden $\le$ / función de valuación? (optimización).</li>
    <li><b>Soluciones parciales</b> $Sols_{parciales}$ y una relación de <em>sucesión</em> (cómo se extiende cada parcial); el conjunto con esa relación es el <b>árbol de backtracking</b>.</li></ol>`));

  root.appendChild(callout('tip', 'Ejemplo: Suma de Subconjuntos (Ej. 1, 5–8)',
    R`Dado $C=\{c_1,\dots,c_n\}$ y $k$, ¿hay un subconjunto que sume $k$? Candidatas: vectores $a\in\{0,1\}^n$ ($a_i=1\iff c_i$ está en el subconjunto), $2^n$ en total. Válida: $\sum_ia_ic_i=k$. Pregunta: $ss(C,k)=\exists a\in Sols:\ \text{válida}_{C,k}(a)$.
    La recurrencia sobre el último elemento: $\ ss_{rec}(\{c_1..c_n\},k)=ss_{rec}(\{c_1..c_{n-1}\},k)\ \lor\ ss_{rec}(\{c_1..c_{n-1}\},k-c_n)$, con base $ss_{rec}(\emptyset,k)=[k=0]$.`));

  root.appendChild(callout('thm', 'Correctitud de la recurrencia (Ej. 6)',
    R`Para todo multiconjunto $C$ de naturales y todo entero $k$: $\ ss_{rec}(C,k)=ss(C,k)$.`,
    R`<p>Inducción en $n=|C|$. <b>Base</b> $n=0$: el único subconjunto es $\emptyset$, que suma $0$; luego $ss(\emptyset,k)=[k=0]=ss_{rec}$. <b>Paso:</b> sea $|C|=n>0$ y supongamos la igualdad para $n-1$. Si existe un subconjunto $S\subseteq C$ con suma $k$, hay dos casos: $c_n\notin S$, y entonces $S\subseteq\{c_1..c_{n-1}\}$ suma $k$; o $c_n\in S$, y entonces $S\setminus\{c_n\}\subseteq\{c_1..c_{n-1}\}$ suma $k-c_n$. Recíprocamente, un subconjunto de $\{c_1..c_{n-1}\}$ que suma $k$ (o $k-c_n$, al que se le agrega $c_n$) es un subconjunto de $C$ que suma $k$. Por hipótesis inductiva ambas condiciones son las llamadas recursivas. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Poda por factibilidad (Ej. 8)',
    R`Regla: si el objetivo restante es negativo ($j<0$), la solución parcial <b>no puede extenderse</b> a una válida, así que se corta la rama con <code>false</code>. Es correcta porque todos los $c_i\ge0$: sumar más elementos solo aleja la suma de $k$.`,
    R`<p>Sea $p=(a_i,\dots,a_n)$ una parcial con $\sum_{q\ge i}a_qc_q>k$. Cualquier solución que tenga a $p$ como sufijo suma $\ge\sum_{q\ge i}a_qc_q>k$ (los términos restantes son no negativos), luego no es válida. Por lo tanto no se pierde ninguna solución válida al cortar. $\blacksquare$</p>`));

  root.appendChild(callout('def', 'Complejidad y podas por optimalidad',
    R`Sin poda, el árbol tiene $\Theta(2^n)$ nodos (Suma de Subconjuntos), $\Theta(n!)$ para permutaciones (viajante de comercio: $(n-1)!$ circuitos) o $\Theta(k^n)$ para asignar $k$ colores a $n$ vértices. En <b>optimización</b>, la poda por <em>optimalidad</em> corta una rama si una cota optimista de lo mejor que podría lograr es <b>peor</b> que la mejor solución ya encontrada (y la cota debe ser realmente optimista, o se pierde el óptimo). La poda mejora el caso práctico; en el peor caso la complejidad asintótica sigue siendo exponencial.`));

  root.appendChild(callout('warn', 'Errores comunes',
    R`<ul><li>Podar con una condición que descarta soluciones válidas (hay que <em>demostrar</em> que no se pierden).</li><li>Copiar la solución parcial en cada llamada: eso suma un factor $O(n)$ por nodo; hay que mantener un único vector que se modifica y se deshace.</li><li>Confundir la complejidad del <em>árbol</em> (cantidad de nodos) con la del trabajo por nodo.</li></ul>`));

  // Viz
  root.appendChild(el('h2', { text: 'Laboratorio: el árbol de llamadas de Suma de Subconjuntos' }));
  root.appendChild(el('p', { class: 'page-sub', text: 'Cada nodo es una llamada ss(i, j): "¿alcanzan los primeros i elementos para sumar j?". Hijo izquierdo: no tomar cᵢ. Hijo derecho: tomar cᵢ (queda j − cᵢ).' }));
  const pre = selectControl({ label: 'Conjunto C: ', value: 'a', options: [{ value: 'a', label: '{6, 12, 6}  (Ej. 1)' }, { value: 'b', label: '{3, 5, 2, 7}' }, { value: 'c', label: '{4, 6, 5, 2, 3}' }] });
  const mod = selectControl({ label: 'Variante: ', value: 'sin', options: [{ value: 'sin', label: 'Backtracking sin poda' }, { value: 'poda', label: 'Con poda por factibilidad (j < 0)' }, { value: 'memo', label: 'Con memoización (programación dinámica)' }] });
  const sk = slider({ label: 'objetivo k', min: 0, max: 30, step: 1, value: 12, format: (v) => v });
  root.appendChild(el('div', { class: 'controls' }, [pre.wrap, mod.wrap, sk.wrap]));
  const out = readout('');
  const viz = mountCanvas(root, { height: 380, view: {}, hint: 'verde = verdadero · rojo = podado · celeste = ya calculado (memo) · gris = falso' });
  viz.setDraw(() => {
    const p = viz.plane; p.clear(); const C = PRESETS[pre.select.value]; const k = Number(sk.input.value); const v = mod.select.value;
    const { raiz, nodos, respuesta } = arbolSubsetSum(C, k, { poda: v === 'poda' || v === 'memo', memo: v === 'memo' });
    const { lista, hojas, profMax } = posicionar(raiz); const ctx = p.ctx; const W = p.width; const H = p.height;
    const X = (x) => 30 + (W - 60) * (hojas > 1 ? x / (hojas - 1) : 0.5); const Y = (d) => 28 + (H - 60) * (profMax > 0 ? d / profMax : 0);
    ctx.save(); ctx.lineWidth = 1.5; ctx.strokeStyle = COLORS.border;
    lista.forEach((nd) => nd.hijos.forEach((h, idx) => { ctx.beginPath(); ctx.moveTo(X(nd.x), Y(nd.prof)); ctx.lineTo(X(h.x), Y(h.prof)); ctx.stroke(); ctx.fillStyle = COLORS.textDim; ctx.font = '10px Inter'; ctx.textAlign = 'center'; ctx.fillText(idx === 0 ? '0' : '1', (X(nd.x) + X(h.x)) / 2 + (idx === 0 ? -6 : 6), (Y(nd.prof) + Y(h.prof)) / 2); }));
    lista.forEach((nd) => {
      const col = nd.estado === 'podado' ? COLORS.err : nd.estado === 'memo' ? COLORS.cyan : (nd.estado === 'hoja' && nd.verdadero) ? COLORS.ok : nd.verdadero ? COLORS.ok : COLORS.textDim;
      const r = Math.max(6, Math.min(14, (W / Math.max(hojas, 1)) / 2.4));
      ctx.beginPath(); ctx.arc(X(nd.x), Y(nd.prof), r, 0, Math.PI * 2); ctx.fillStyle = col + '55'; ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.stroke();
      if (r >= 9) { ctx.fillStyle = COLORS.text; ctx.font = `${r > 11 ? 10 : 8}px Inter`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(`${nd.i},${nd.j}`, X(nd.x), Y(nd.prof)); }
    });
    ctx.restore();
    const total = 2 ** (C.length + 1) - 1;
    out.textContent = `C = {${C.join(', ')}}, k = ${k} → respuesta: ${respuesta ? 'SÍ, existe un subconjunto que suma k' : 'NO existe'}\nnodos del árbol de llamadas: ${nodos} (el árbol completo sin poda tendría ${total}) · ${v === 'memo' ? `subproblemas distintos posibles: ≤ (n+1)(k+1) = ${(C.length + 1) * (k + 1)}` : v === 'poda' ? 'la poda corta las ramas con j < 0' : 'sin poda: Θ(2ⁿ) nodos'}`;
  });
  [pre.select, mod.select, sk.input].forEach((c) => c.addEventListener('input', () => viz.redraw()));
  [pre.select, mod.select].forEach((c) => c.addEventListener('change', () => viz.redraw()));
  root.appendChild(out);
  root.appendChild(callout('tip', 'Qué observar',
    R`Con $C=\{6,12,6\}$ y $k=12$ hay <b>dos</b> soluciones ($\{12\}$ y $\{6,6\}$). Con $k$ chico la poda corta muchísimas ramas; con "memoización" varios nodos se repiten (mismo $(i,j)$) y quedan en celeste: ese es el puente a la <a href="#a3-dp">programación dinámica</a>.`));
}
