// materias/algoritmos-3/pages/bfs-dfs.js — Recorridos BFS y DFS, orden topológico, puentes y bipartición (Práctica 3).

import { el, selectControl } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { dibujarGrafo, GRAFO_NO_DIR, GRAFO_PUENTES, pasosBFS, pasosDFS, controlPasos } from '../lib.js';

const R = String.raw;
const GRAFOS = { norm: GRAFO_NO_DIR, puentes: GRAFO_PUENTES };

export function renderBfsDfs(root) {
  root.appendChild(pageHeader('BFS y DFS: niveles, retroceso y puentes',
    'Casi todos los algoritmos sobre grafos empiezan con "recorrer el grafo". Hay dos formas básicas: explorar <em>por capas</em> (BFS) o <em>meterse lo más hondo posible</em> antes de volver (DFS). '
    + 'Cada una resuelve problemas distintos.'));

  root.appendChild(callout('def', 'BFS (búsqueda a lo ancho) y DFS (a lo profundo)',
    R`<ul><li><b>BFS</b> usa una <em>cola</em>: visita primero a los vecinos del origen, luego a los vecinos de los vecinos, etc. Calcula el <b>nivel</b> (distancia en aristas) de cada vértice; $O(n+m)$ con listas.</li>
    <li><b>DFS</b> usa una <em>pila</em> (o recursión): sigue un camino hasta no poder avanzar y retrocede. Registra el tiempo de descubrimiento $d[v]$ y de finalización $f[v]$; $O(n+m)$ con listas.</li></ul>`));

  root.appendChild(callout('thm', 'BFS calcula distancias (árbol geodésico)',
    R`Si se corre BFS desde $v$, el nivel de cada vértice $w$ es $d_G(v,w)$; el árbol BFS es <b>$v$-geodésico</b> (la distancia en el árbol coincide con la distancia en $G$). La vuelta es falsa: hay árboles $v$-geodésicos que BFS no puede producir.`,
    R`<p>Se muestra por inducción en el nivel que, al extraer de la cola un vértice de nivel $k$, ya están en la cola o procesados todos los de nivel $\le k+1$ a distancia $\le k+1$. Un vértice $w$ recibe nivel $k+1$ cuando se extrae su primer vecino $u$ de nivel $k$; no puede existir un camino más corto porque eso lo habría descubierto antes un vértice de nivel $<k$. El camino del árbol de $v$ a $w$ tiene exactamente $\text{nivel}(w)=d_G(v,w)$ aristas. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Aristas de un árbol DFS',
    R`En un DFS de un grafo <b>no dirigido</b>, toda arista que no está en el árbol une un vértice con uno de sus <b>ancestros</b> (arista de retroceso). No hay aristas "transversales".`,
    R`<p>Sea $vw\notin T$ con $d[v]<d[w]$. Cuando DFS descubre $v$, $w$ aún no fue visitado; como $w$ es vecino de $v$, DFS lo visitará antes de terminar $v$, así que $w$ queda en el subárbol de $v$: $v$ es ancestro de $w$. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Puentes con DFS (low-link)',
    R`Sea $T$ un árbol DFS y $\operatorname{low}(v)$ el menor $d[\cdot]$ alcanzable desde el subárbol de $v$ usando a lo sumo una arista de retroceso. La arista de árbol $uv$ ($u$ padre de $v$) es un <b>puente</b> $\iff\operatorname{low}(v)>d[u]$. Todo en $O(n+m)$.`,
    R`<p>($\Leftarrow$) Si $\operatorname{low}(v)>d[u]$, ninguna arista del subárbol de $v$ llega a $u$ ni a un ancestro de $u$: el único vínculo entre el subárbol de $v$ y el resto es $uv$, que al sacarla desconecta el grafo.</p>
    <p>($\Rightarrow$) Si $\operatorname{low}(v)\le d[u]$, existe una arista de retroceso desde el subárbol de $v$ a $u$ o a un ancestro de $u$; junto con el camino del árbol forma un ciclo que contiene a $uv$, y una arista en un ciclo no es puente. Se usa que (a) una arista es puente $\iff$ no está en ningún ciclo, y (b) las aristas fuera del árbol son de retroceso. $\blacksquare$</p>`));

  root.appendChild(callout('tip', 'Orden topológico (digrafos acíclicos)',
    R`Un <b>orden topológico</b> de un digrafo $D$ es un orden de los vértices tal que $v\to w\in E\Rightarrow v<w$. Existe $\iff D$ no tiene ciclos. Algoritmo: mientras haya un vértice de $d_{in}=0$ (siempre existe en un DAG), se lo agrega al orden y se "borra" restando 1 al grado de entrada de sus vecinos; con una cola de vértices con $d_{in}=0$ cuesta $O(n+m)$ (Ej. 3).`));

  root.appendChild(callout('warn', 'Errores comunes',
    R`<ul><li>BFS da distancias de caminos mínimos <b>solo en grafos sin pesos</b>; con pesos hay que usar Dijkstra o similares.</li><li>En DFS, "ya visitado" no implica "ciclo": en un grafo no dirigido el padre también está visitado. En digrafos hay que distinguir retroceso (a un ancestro en la pila) de cruce.</li><li>Para contar componentes con BFS hay que reiniciar el recorrido desde cada vértice sin visitar (Ej. 15).</li></ul>`));

  root.appendChild(el('h2', { text: 'Laboratorio: recorré el grafo paso a paso' }));
  const gsel = selectControl({ label: 'Grafo: ', value: 'norm', options: [{ value: 'norm', label: 'Grafo de 8 vértices' }, { value: 'puentes', label: 'Dos triángulos con un puente' }] });
  const asel = selectControl({ label: 'Algoritmo: ', value: 'bfs', options: [{ value: 'bfs', label: 'BFS' }, { value: 'dfs', label: 'DFS (con low-link)' }] });
  let fotos = []; let g = GRAFOS.norm;
  const cp = controlPasos(0, () => viz.redraw());
  const out = readout('');
  const recomputar = () => { g = GRAFOS[gsel.select.value]; fotos = asel.select.value === 'bfs' ? pasosBFS(g, 0) : pasosDFS(g, 0); cp.setMax(fotos.length - 1); cp.reiniciar(); viz.redraw(); };
  root.appendChild(el('div', { class: 'controls' }, [gsel.wrap, asel.wrap]));
  root.appendChild(cp.wrap);
  const viz = mountCanvas(root, { height: 340, view: {}, hint: 'origen: vértice 0' });
  const idx = (u, v) => g.aristas.findIndex(([a, b]) => (a === u && b === v) || (a === v && b === u));
  viz.setDraw(() => {
    const p = viz.plane; p.clear(); if (!fotos.length) return;
    const F = fotos[Math.min(cp.valor(), fotos.length - 1)]; const esBFS = asel.select.value === 'bfs';
    const arbol = new Set(); const padre = F.padre;
    padre.forEach((u, v) => { if (u !== null) arbol.add(idx(u, v)); });
    const niv = ['#5b8cff', '#35c98a', '#ffb454', '#ff6bd6', '#38d9d9'];
    dibujarGrafo(p, g, {
      aristaTexto: () => null,
      aristaColor: (k) => (!esBFS && F.puentes.includes(k) ? COLORS.err : arbol.has(k) ? COLORS.ok : COLORS.textDim),
      aristaGrosor: (k) => (arbol.has(k) || (!esBFS && F.puentes.includes(k)) ? 4 : 1.5),
      aristaDash: (k) => !esBFS && !arbol.has(k) && F.d[g.aristas[k][0]] !== null && F.d[g.aristas[k][1]] !== null,
      nodoFill: (i) => (i === F.actual ? COLORS.warn : esBFS ? (F.nivel[i] === null ? COLORS.panel : niv[F.nivel[i] % niv.length] + 'aa') : (F.d[i] === null ? COLORS.panel : F.f[i] === null ? 'rgba(91,140,255,0.55)' : 'rgba(53,201,138,0.55)')),
      nodoSub: (i) => (esBFS ? (F.nivel[i] === null ? null : 'nivel ' + F.nivel[i]) : (F.d[i] === null ? null : `${F.d[i]}/${F.f[i] ?? '·'} low ${F.low[i]}`)),
    });
    out.textContent = F.texto + '\n' + (esBFS ? `cola: [${F.cola.join(', ')}]  ·  niveles: ${F.nivel.map((x, i) => i + ':' + (x ?? '·')).join('  ')}`
      : `pila (recursión): [${F.pila.join(', ')}]  ·  puentes encontrados: ${F.puentes.length ? F.puentes.map((k) => g.aristas[k].join('–')).join(', ') : 'ninguno todavía'}`);
  });
  gsel.select.addEventListener('change', recomputar); asel.select.addEventListener('change', recomputar);
  root.appendChild(out);
  recomputar();
  root.appendChild(callout('tip', 'Qué observar',
    R`En BFS los vértices se pintan por <b>niveles</b> y la cola nunca contiene más de dos niveles consecutivos. En DFS mirá cómo $\operatorname{low}$ "sube" por las aristas punteadas (retroceso) y cuál arista del grafo de los triángulos queda en rojo: el único puente.`));
}
