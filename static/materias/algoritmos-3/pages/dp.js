// materias/algoritmos-3/pages/dp.js — Programación dinámica: memoización, bottom-up y reconstrucción (Práctica 6).

import { el, slider, selectControl } from '../../../js/utils/dom.js';
import { pageHeader, callout, readout } from '../../../js/utils/page.js';
import { controlPasos } from '../lib.js';

const R = String.raw;
const CONJ = { a: [6, 12, 6], b: [3, 5, 2, 7], c: [4, 6, 5, 2, 3] };

/** Llamadas de Fibonacci con y sin memoización. */
function llamadasFib(n) {
  const sin = (m) => (m <= 1 ? 1 : 1 + sin(m - 1) + sin(m - 2));
  const memo = new Map(); let con = 0;
  const f = (m) => { con++; if (m <= 1) return m; if (memo.has(m)) return memo.get(m); const r = f(m - 1) + f(m - 2); memo.set(m, r); return r; };
  f(n);
  return { sin: n <= 30 ? sin(n) : null, con };
}

export function renderDP(root) {
  root.appendChild(pageHeader('Programación dinámica: estados y reconstrucción',
    'Si un algoritmo recursivo resuelve <em>los mismos subproblemas</em> una y otra vez, la solución es obvia: <strong>guardar</strong> cada resultado la primera vez que se calcula. '
    + 'Eso transforma un algoritmo exponencial en uno polinomial.'));

  root.appendChild(callout('def', 'Cuándo aplica y cómo se arma',
    R`Hace falta que el problema tenga <b>subestructura óptima</b> (la solución se arma con soluciones de subproblemas) y <b>superposición de subproblemas</b> (hay pocos subproblemas distintos comparados con la cantidad de llamadas). La receta:
    <ol><li>Definir una función recursiva con su <b>semántica</b> (qué significa $f(i,j)$) y demostrar por inducción que es correcta.</li>
    <li>Contar los <b>parámetros distintos</b>: eso acota la cantidad de subproblemas.</li>
    <li><b>Top-down:</b> recursión + diccionario (memoización). <b>Bottom-up:</b> llenar una tabla en un orden que respete las dependencias.</li>
    <li>Si se pide la solución (no solo su valor), <b>reconstruir</b> yendo hacia atrás por la tabla.</li></ol>`));

  root.appendChild(callout('thm', 'Fibonacci / el ejército del rey (Ej. 1)',
    R`$F(n)=F(n-1)+F(n-2)$ con $F(0)=F(1)=1$. La versión directa hace $\Theta(\varphi^n)$ llamadas ($\varphi\approx1{,}618$). Con memoización, $O(n)$ tiempo y espacio; bottom-up con solo los dos últimos valores, $O(n)$ tiempo y $O(1)$ espacio.`,
    R`<p>Sea $C(n)$ la cantidad de llamadas de la versión directa: $C(n)=1+C(n-1)+C(n-2)\ge F(n)$, que crece como $\varphi^n$ (porque $\varphi^2=\varphi+1$ y se prueba por inducción $F(n)\ge\varphi^{n-2}$). Con memoización, para cada $m\le n$ el cuerpo recursivo se ejecuta una sola vez (las demás llamadas devuelven el valor guardado en $O(1)$): $O(n)$ llamadas en total. En el bottom-up, $F(i)$ solo depende de $F(i-1)$ y $F(i-2)$, así que alcanza con guardar dos variables. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Suma de subconjuntos por PD (Ej. 3)',
    R`Sea $M[i][j]=ss'_C(i,j)$: "¿algún subconjunto de $\{c_1..c_i\}$ suma $j$?". Entonces $M[0][0]=\text{V}$, $M[0][j]=\text{F}$ ($j>0$) y, para $i\ge1$, $\ M[i][j]=M[i-1][j]\ \lor\ \big(j\ge c_i\land M[i-1][j-c_i]\big)$. Se llena en $O(nk)$ tiempo y se puede bajar el espacio a $O(k)$ guardando solo la fila anterior. Es <em>pseudo-polinomial</em>: polinomial en el <b>valor</b> $k$, no en su tamaño de codificación.`,
    R`<p>Hay $(n+1)(k+1)$ parámetros posibles $(i,j)$ y cada celda se calcula en $O(1)$ a partir de dos celdas de la fila anterior, de donde $O(nk)$. La corrección sale de la misma inducción que la recurrencia de backtracking (se usa o no $c_i$). Comparación con backtracking: $\Theta(2^n)$ vs. $\Theta(nk)$; si $k\ll2^n/n$ gana la PD, y si $k$ es enorme el backtracking con poda puede ser mejor. $\blacksquare$</p>`));

  root.appendChild(callout('tip', 'Reconstrucción de la solución',
    R`Desde $M[n][k]$ hacia atrás: si $M[i-1][j]$ es verdadera, $c_i$ <em>no</em> se usó (se baja a $(i-1,j)$); si no, $c_i$ se usó y se baja a $(i-1,j-c_i)$. Se paran al llegar a $i=0$. Cuesta $O(n)$ extra, pero obliga a guardar la tabla entera (no alcanza con la última fila).`));

  root.appendChild(callout('warn', 'Errores comunes',
    R`<ul><li>Memoizar sin que los parámetros caractericen al subproblema (si la función depende de algo global que cambia, el diccionario da respuestas incorrectas).</li><li>Escribir el bottom-up en un orden en que una celda se calcula <em>antes</em> que las que necesita.</li><li>Decir que $O(nk)$ es "polinomial": depende del valor de $k$, no de $\log k$ (pseudo-polinomial).</li></ul>`));

  root.appendChild(el('h2', { text: 'Punto difícil: ¿cómo elijo el estado?' }));
  root.appendChild(callout('tip', 'El estado es "lo mínimo que necesito saber para seguir"',
    R`Un <b>estado</b> son los parámetros de la función recursiva: tienen que alcanzar para que, <em>sin saber cómo llegué hasta acá</em>, el mejor resultado del resto del problema quede determinado. Método para encontrarlo:
    <ol><li>Escribir el backtracking y mirar qué argumentos <em>cambian</em> en las llamadas (índice, objetivo restante, qué hice el paso anterior…).</li>
    <li>Preguntarse, por cada dato que arrastra la solución parcial: <b>¿cambia lo que puedo hacer después, o su costo?</b> Si sí, es parte del estado; si no (p. ej. <em>qué</em> elementos usé, cuando solo importa su suma), se descarta.</li>
    <li>Contar estados = producto de los rangos de cada parámetro; la complejidad es <b>estados × costo por estado</b>.</li></ol>
    <b>Ejemplos:</b> en Suma de Subconjuntos el estado es $(i,j)$ — no hace falta saber <em>cuáles</em> elementos usé, solo cuánto me falta ($O(nk)$ estados). En Vacaciones (Ej. 2) es $(\text{día},\text{última actividad})$: qué hice hace dos días no importa ($3n$ estados). En AstroTrade (Ej. 6) es $(\text{día},\text{stock})$: el stock cambia cuánto puedo vender ($n^2$ estados).`));

  root.appendChild(callout('warn', 'Señales de que el estado está mal',
    R`<ul><li><b>Falta algo:</b> dos llamadas con los mismos parámetros dan respuestas distintas (la memoización devolvería un valor equivocado).</li>
    <li><b>Sobra algo:</b> la cantidad de estados es exponencial: se está guardando información (p. ej. el subconjunto entero) en lugar de su efecto (la suma).</li>
    <li>Se puede probar la semántica: "$f(i,j)$ = el mejor resultado de ... dado ...". Si no se puede escribir esa frase con precisión, el estado probablemente no está bien definido.</li></ul>`));

  // Viz 1: tabla de subset sum
  root.appendChild(el('h2', { text: 'Laboratorio 1: llenar la tabla de Suma de Subconjuntos' }));
  const pre = selectControl({ label: 'Conjunto C: ', value: 'a', options: [{ value: 'a', label: '{6, 12, 6}' }, { value: 'b', label: '{3, 5, 2, 7}' }, { value: 'c', label: '{4, 6, 5, 2, 3}' }] });
  const sk = slider({ label: 'objetivo k', min: 1, max: 20, step: 1, value: 12, format: (v) => v });
  const cp = controlPasos(0, () => dibujar());
  root.appendChild(el('div', { class: 'controls' }, [pre.wrap, sk.wrap]));
  root.appendChild(cp.wrap);
  const tabla = el('div', { style: 'overflow-x:auto' });
  const out = readout('');
  const dibujar = () => {
    const C = CONJ[pre.select.value]; const k = Number(sk.input.value); const n = C.length; const paso = cp.valor();
    const orden = []; for (let j = 0; j <= k; j++) orden.push([0, j]); for (let i = 1; i <= n; i++) for (let j = 0; j <= k; j++) orden.push([i, j]);
    cp.setMax(orden.length);
    const M = Array.from({ length: n + 1 }, () => Array(k + 1).fill(null)); const dep = new Set(); let actual = null;
    orden.slice(0, paso).forEach(([i, j]) => {
      M[i][j] = i === 0 ? j === 0 : (M[i - 1][j] || (j >= C[i - 1] && M[i - 1][j - C[i - 1]]));
      actual = [i, j];
    });
    if (actual && actual[0] > 0) { dep.add((actual[0] - 1) + ',' + actual[1]); if (actual[1] >= C[actual[0] - 1]) dep.add((actual[0] - 1) + ',' + (actual[1] - C[actual[0] - 1])); }
    const completa = paso >= orden.length; const camino = new Set(); const usados = [];
    if (completa && M[n][k]) { let i = n; let j = k; while (i > 0) { camino.add(i + ',' + j); if (M[i - 1][j]) { i--; } else { usados.push(C[i - 1]); j -= C[i - 1]; i--; } } camino.add('0,' + j); }
    let h = '<table class="tbl"><tr><th>i \\ j</th>' + Array.from({ length: k + 1 }, (_, j) => `<th>${j}</th>`).join('') + '</tr>';
    for (let i = 0; i <= n; i++) {
      h += `<tr><th>${i}${i ? ' (c=' + C[i - 1] + ')' : ''}</th>` + Array.from({ length: k + 1 }, (_, j) => {
        const v = M[i][j]; const es = actual && actual[0] === i && actual[1] === j; const d = dep.has(i + ',' + j); const cm = camino.has(i + ',' + j);
        const bg = es ? 'background:#ffb454;color:#0f1421;font-weight:700' : cm ? 'background:rgba(53,201,138,.45)' : d ? 'background:rgba(91,140,255,.45)' : '';
        return `<td style="text-align:center;${bg}">${v === null ? '' : v ? 'V' : 'F'}</td>`;
      }).join('') + '</tr>';
    }
    tabla.innerHTML = h + '</table>';
    out.textContent = actual ? `Calculando M[${actual[0]}][${actual[1]}] ${actual[0] === 0 ? '(caso base)' : `= M[${actual[0] - 1}][${actual[1]}] ∨ ${actual[1] >= C[actual[0] - 1] ? `M[${actual[0] - 1}][${actual[1] - C[actual[0] - 1]}]` : '(c_i > j: no se puede usar)'}`} → ${M[actual[0]][actual[1]] ? 'V' : 'F'}   (celdas azules = de las que depende)`
      : 'Todavía no se calculó ninguna celda: avanzá con ▶ o el slider.';
    if (completa) out.textContent += `\nRespuesta M[${n}][${k}] = ${M[n][k] ? 'V: sí existe subconjunto' : 'F: no existe'}${M[n][k] ? ` · reconstrucción (verde): usa {${usados.reverse().join(', ')}}` : ''}`;
    typesetSoft();
  };
  const typesetSoft = () => {};
  [pre.select, sk.input].forEach((c) => c.addEventListener('input', () => { cp.reiniciar(); dibujar(); }));
  root.appendChild(tabla); root.appendChild(out); dibujar();

  // Viz 2: Fibonacci
  root.appendChild(el('h2', { text: 'Laboratorio 2: cuántas llamadas hace Fibonacci' }));
  const sn = slider({ label: 'n', min: 1, max: 40, step: 1, value: 25, format: (v) => v });
  root.appendChild(el('div', { class: 'controls' }, [sn.wrap]));
  const o2 = readout('');
  const calc = () => { const n = Number(sn.input.value); const r = llamadasFib(n); o2.textContent = `F(${n}): llamadas sin memoización = ${r.sin === null ? '≈ ' + Math.round(1.618 ** n * 0.72).toExponential(2) + ' (se estima, no se ejecuta)' : r.sin.toLocaleString()} · con memoización = ${r.con} (≈ 2n − 1)`; };
  sn.input.addEventListener('input', calc); root.appendChild(o2); calc();
}
