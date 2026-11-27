// materias/algoritmos-3/pages/estados.js — Grafos de estado: modelar con capas, estados y vértice fantasma (Práctica 8).

import { el, slider } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { dibujarGrafo, fmt, pasosBellmanFord } from '../lib.js';

const R = String.raw;

export function renderEstados(root) {
  root.appendChild(pageHeader('Grafos de estado: capas, estados y vértice fantasma',
    'Muchos problemas de camino mínimo <em>no vienen escritos como un grafo</em>. El truco que más se usa en la Práctica 8 es construir uno nuevo, '
    + 'cuyos vértices son <strong>situaciones completas</strong>, y correr ahí Dijkstra, BFS o Bellman–Ford.'));

  root.appendChild(callout('tip', 'La idea en una frase',
    R`Cuando el enunciado no es "ir de un lugar a otro" sino "ir de una <em>situación</em> a otra", se construye un grafo cuyos <b>vértices son situaciones completas</b> (el "estado") y cuyas aristas son las <b>acciones permitidas</b>. Un camino mínimo en ese grafo es la mejor secuencia de acciones. El grafo original solo dice <em>dónde</em> estás; el estado dice <em>todo lo que necesitás saber para decidir qué podés hacer después</em>.`));

  root.appendChild(callout('def', 'Cómo se arma, paso a paso (la receta)',
    R`<ol>
    <li><b>¿Qué información cambia lo que puedo hacer más adelante?</b> Eso es el estado. Ejemplos: la posición <em>y</em> el valor acumulado módulo $k$ (Ej. 2); la posición <em>y</em> cuántas aristas negativas ya usé (Ej. 7); la posición <em>y</em> qué tipos de comida ya compré (Ej. 12, subconjunto de $\{1..k\}$).</li>
    <li><b>Vértices:</b> todas las combinaciones posibles de esa información. Si hay $n$ posiciones y el resto toma $q$ valores, son $n\cdot q$ vértices.</li>
    <li><b>Aristas:</b> por cada acción permitida desde un estado, una arista al estado que resulta, con el <b>costo de esa acción</b>. Las acciones prohibidas simplemente no tienen arista.</li>
    <li><b>Origen y destinos:</b> el estado inicial es un vértice; el objetivo puede ser <em>un</em> vértice o <em>cualquiera</em> de un conjunto (se toma el mínimo entre ellos, o se agrega un vértice fantasma al que todos apuntan con peso 0).</li>
    <li><b>Elegir el algoritmo según los pesos del grafo de estados</b> (no del original): BFS si todos cuestan 1, Dijkstra si $\ge0$, Bellman–Ford si hay negativos, orden topológico si es un DAG (como suele pasar cuando una componente del estado solo crece).</li>
    <li><b>Complejidad:</b> es la del algoritmo elegido <em>evaluada en el tamaño del grafo de estados</em>, no del original. Ej. 2: $O(kmn)$ vértices y aristas, y BFS cuesta $O(kmn)$.</li>
    <li><b>Correctitud:</b> mostrar la correspondencia en ambos sentidos: cada camino del grafo de estados es una secuencia válida de acciones con el mismo costo, y cada secuencia válida es un camino.</li></ol>`));

  root.appendChild(callout('thm', 'Ejemplo 1: "a lo sumo una arista negativa" (Ej. 7) con dos capas',
    R`Se pide el recorrido de peso mínimo de $s$ a $t$ que usa <b>a lo sumo una</b> arista de peso negativo. El estado es $(v,j)$ con $j\in\{0,1\}$ = cantidad de negativas ya usadas. Para cada arista $u\to v$ de peso $w$: si $w\ge0$, aristas $(u,0)\to(v,0)$ y $(u,1)\to(v,1)$ de peso $w$; si $w<0$, <b>solo</b> $(u,0)\to(v,1)$ (usar la negativa te sube de capa y desde la capa 1 ya no hay negativas). La respuesta es $\min\{d((s,0),(t,0)),\,d((s,0),(t,1))\}$. Son $2n$ vértices y $\le2m$ aristas.`,
    R`<p><b>Correspondencia.</b> Un camino de $(s,0)$ a $(t,j)$ proyecta (olvidando la capa) a un recorrido de $s$ a $t$ con el mismo peso y con exactamente $j$ aristas negativas, porque las negativas solo existen como saltos de la capa 0 a la 1 y no se puede volver. Recíprocamente, un recorrido con a lo sumo una negativa se levanta al grafo de estados poniéndolo en la capa 0 hasta la negativa y en la 1 después. Por eso los pesos mínimos coinciden.</p>
    <p><b>Algoritmo.</b> Hay pesos negativos, así que Dijkstra directo no sirve; pero cualquier ciclo del grafo de capas está dentro de una capa y usa solo aristas $\ge0$, de modo que no hay ciclos negativos y funciona Bellman–Ford: $O(2n\cdot2m)=O(nm)$. <b>Alternativa mejor:</b> con $d^+$ las distancias usando solo aristas $\ge0$, la respuesta es $\min\Big(d^+(s,t),\ \min_{u\to v,\ w<0}d^+(s,u)+w+d^+(v,t)\Big)$, con dos Dijkstra (desde $s$ y, en el grafo invertido, desde $t$): $O((n+m)\log n)$. $\blacksquare$</p>`));

  root.appendChild(callout('tip', 'Ejemplo 2: grilla con valores módulo k (Ej. 2) y vértice fantasma (Ej. 1)',
    R`<b>Grilla:</b> la grilla $m\times n$ tiene $mn$ celdas pero el movimiento transforma un valor $v\mapsto(v+z)\bmod k$ que depende de la <em>historia</em>. Si el vértice fuera solo la celda, el costo de una arista no estaría definido. Con vértice $=(\text{celda},v)$ todo se vuelve local: hay $kmn$ vértices, cada uno con $\le4$ aristas de peso 1, y se corre BFS.
    <b>Vértice fantasma:</b> para "la distancia mínima entre un vértice de $A$ y uno de $B$" se agrega un vértice $s^*$ con aristas de peso 0 a todos los de $A$ (y, si hace falta, de todos los de $B$ a un $t^*$) y se corre <em>una sola</em> búsqueda; sin el truco habría que correr una por cada $a\in A$.`));

  root.appendChild(callout('warn', 'Errores típicos al modelar',
    R`<ul><li><b>Estado incompleto:</b> olvidar una variable que cambia el futuro (p. ej. no distinguir si ya usaste la arista negativa). El modelo "funciona" en casos chicos y falla en otros.</li>
    <li><b>Estado de más:</b> guardar información irrelevante hace explotar la cantidad de vértices (p. ej. todo el camino recorrido en vez de un contador).</li>
    <li><b>Aristas negativas mal ubicadas:</b> en el modelo de capas, si la arista negativa conectara $(u,1)\to(v,1)$ habría ciclos negativos posibles.</li>
    <li>Calcular la complejidad con $n$ y $m$ del grafo original en lugar de los del grafo de estados.</li></ul>`));

  // Visualización del grafo de capas
  root.appendChild(el('h2', { text: 'Visualización: el grafo de dos capas para "a lo sumo una arista negativa"' }));
  root.appendChild(el('p', { class: 'page-sub', text: 'Arriba, la capa 0 ("todavía no usé ninguna arista negativa"); abajo, la capa 1 ("ya usé una"). Las aristas rojas son las negativas: solo bajan de capa. Mové el peso de la arista 1→2 y mirá cómo cambia el mejor camino.' }));
  const sw = slider({ label: 'peso de la arista 1→2', min: -8, max: 3, step: 1, value: -3, format: (v) => v });
  root.appendChild(el('div', { class: 'controls' }, [sw.wrap]));
  const out = readout('');
  const viz = mountCanvas(root, { height: 300, view: {}, hint: 'origen (0, capa 0) · destino (4, capa 0 o capa 1)' });
  const BASE = [[0, 1, 2], [1, 2, -3], [2, 3, -2], [1, 3, 5], [3, 4, 1], [0, 2, 6], [2, 4, 2]];
  viz.setDraw(() => {
    const p = viz.plane; p.clear(); const w12 = Number(sw.input.value); const n = 5;
    const base = BASE.map(([u, v, w], i) => (i === 1 ? [u, v, w12] : [u, v, w]));
    const nodos = []; for (let j = 0; j < 2; j++) for (let i = 0; i < n; i++) nodos.push([1 + 2 * i, j === 0 ? 4.7 : 1.3]);
    const aristas = [];
    base.forEach(([u, v, w]) => { if (w >= 0) { aristas.push([u, v, w]); aristas.push([n + u, n + v, w]); } else aristas.push([u, n + v, w]); });
    const g = { nodos, aristas, dirigido: true, nombres: Array.from({ length: 2 * n }, (_, i) => `${i % n}${i < n ? '' : "'"}`) };
    const fotos = pasosBellmanFord(g, 0); const F = fotos[fotos.length - 1];
    const enCamino = new Set(); const dest = F.d[4] <= F.d[n + 4] ? 4 : n + 4;
    if (F.d[dest] !== Infinity && !F.ciclo) { let v = dest; while (F.padre[v] !== null && F.padre[v] !== undefined) { enCamino.add(F.padre[v] + ',' + v); v = F.padre[v]; } }
    dibujarGrafo(p, g, {
      aristaColor: (k) => { const [u, v] = aristas[k]; return enCamino.has(u + ',' + v) ? COLORS.ok : aristas[k][2] < 0 ? COLORS.err : COLORS.textDim; },
      aristaGrosor: (k) => (enCamino.has(aristas[k][0] + ',' + aristas[k][1]) ? 4 : 1.8),
      nodoFill: (i) => (i < n ? 'rgba(91,140,255,0.25)' : 'rgba(255,107,214,0.25)'),
      nodoSub: (i) => (F.d[i] === Infinity ? null : 'd=' + fmt(F.d[i])),
    });
    // Comparación con el camino mínimo sin restricción (permitiendo varias negativas)
    const sinRestr = pasosBellmanFord({ nodos: nodos.slice(0, n), aristas: base, dirigido: true }, 0); const D = sinRestr[sinRestr.length - 1];
    const mejor = Math.min(F.d[4], F.d[n + 4]);
    out.textContent = `con a lo sumo UNA negativa: d(t) = ${fmt(mejor)}  (capa 0: ${fmt(F.d[4])} · capa 1: ${fmt(F.d[n + 4])})\n`
      + `sin restricción (todas las negativas permitidas): d(t) = ${D.ciclo ? '−∞' : fmt(D.d[4])}\n`
      + (D.d[4] < mejor ? '→ el camino libre usa dos negativas (0→1→2→3...); la restricción obliga a un rodeo más caro.' : '→ en este caso el óptimo ya usaba a lo sumo una negativa.');
  });
  sw.input.addEventListener('input', () => viz.redraw());
  root.appendChild(out);

  root.appendChild(callout('tip', 'Dónde seguir',
    R`Los mismos modelos aparecen en la <a href="#guia">guía resuelta de la Práctica 8</a> (Ej. 1, 2, 7). Los trucos análogos para flujos —partir vértices en <em>entrada/salida</em>— están en <a href="#a3-flujo">Max-flow min-cut y Edmonds–Karp</a>.`));
}
