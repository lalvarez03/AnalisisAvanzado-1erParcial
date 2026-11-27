// materias/algoritmos-3/pages/caminos.js — Caminos mínimos: relajación, DAGs, Dijkstra y Bellman–Ford (Práctica 8).

import { el, selectControl } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { dibujarGrafo, fmt, DIGRAFO_DAG, DIGRAFO_POSITIVO, DIGRAFO_NEGATIVO, DIGRAFO_CICLO_NEG, pasosDAG, pasosDijkstra, pasosBellmanFord, controlPasos } from '../lib.js';

const R = String.raw;
const GRAFOS = { dag: DIGRAFO_DAG, pos: DIGRAFO_POSITIVO, neg: DIGRAFO_NEGATIVO, ciclo: DIGRAFO_CICLO_NEG };

export function renderCaminos(root) {
  root.appendChild(pageHeader('DAG, Dijkstra y Bellman–Ford',
    'Hay un solo problema —el camino de menor peso desde un origen— pero <strong>cuatro algoritmos</strong> según cómo sea el grafo: sin pesos (BFS), sin ciclos (DAG), con pesos no negativos (Dijkstra) o con pesos negativos (Bellman–Ford). Saber elegir es la mitad de la unidad.'));

  root.appendChild(callout('def', 'Relajación y subestructura óptima',
    R`Se mantiene una estimación $d[v]\ge\delta(s,v)$ (peso de un camino ya encontrado) y un predecesor $\pi[v]$. <b>Relajar</b> la arista $(u,v)$ es: si $d[u]+w(u,v)<d[v]$, entonces $d[v]\gets d[u]+w(u,v)$ y $\pi[v]\gets u$. 
    <b>Subestructura óptima:</b> todo subcamino de un camino mínimo es mínimo; por eso $\delta(s,v)=\min_{(u,v)\in E}\{\delta(s,u)+w(u,v)\}$.`));

  root.appendChild(callout('thm', 'Subestructura óptima de los caminos mínimos',
    R`Si $P=\langle v_0,v_1,\dots,v_k\rangle$ es un camino mínimo de $v_0$ a $v_k$, entonces para todo $0\le i\le j\le k$ el subcamino $\langle v_i,\dots,v_j\rangle$ es un camino mínimo de $v_i$ a $v_j$.`,
    R`<p>Si hubiera un camino $Q$ de $v_i$ a $v_j$ con peso menor, reemplazando en $P$ el tramo $v_i\dots v_j$ por $Q$ se obtendría un camino de $v_0$ a $v_k$ de peso estrictamente menor que $P$ (se suman los mismos pesos fuera del tramo), contradiciendo que $P$ es mínimo. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'DAG: orden topológico y una relajación por arista',
    R`En un digrafo acíclico, procesando los vértices en <b>orden topológico</b> y relajando las aristas salientes de cada uno, al terminar $d[v]=\delta(s,v)$ para todo $v$. Costo $O(n+m)$ y funciona con pesos negativos. Cambiando $\min$ por $\max$ se obtienen <b>caminos máximos</b> (gestión de proyectos: el camino más largo = duración mínima del proyecto).`,
    R`<p>Por inducción en el orden topológico. Cuando se procesa $v$, todos sus predecesores $u$ (con $u\to v$) ya fueron procesados, es decir ya relajaron la arista $(u,v)$ con su $d[u]=\delta(s,u)$ (hipótesis). Un camino mínimo a $v$ termina en alguna arista $(u,v)$ con $\delta(s,v)=\delta(s,u)+w(u,v)$ (subestructura óptima); esa relajación dejó $d[v]\le\delta(s,u)+w(u,v)=\delta(s,v)$, y como siempre $d[v]\ge\delta(s,v)$, vale la igualdad. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Dijkstra (pesos ≥ 0)',
    R`Se mantiene el conjunto $F$ de vértices "fijados". En cada paso se extrae el vértice $u\notin F$ con $d[u]$ mínimo, se lo agrega a $F$ y se relajan sus aristas. Con un heap binario: $O((n+m)\log n)$. Al fijar $u$, $d[u]=\delta(s,u)$.`,
    R`<p>Invariante: todo $v\in F$ cumple $d[v]=\delta(s,v)$. Sea $u$ el primer vértice que se fija con $d[u]>\delta(s,u)$, y $P$ un camino mínimo de $s$ a $u$. Sea $(x,y)$ la primera arista de $P$ que sale de $F$ ($x\in F$, $y\notin F$). Como $x$ está bien fijado y se relajó $(x,y)$: $d[y]=\delta(s,y)$ (subestructura óptima). Como los pesos son $\ge0$, $\delta(s,y)\le\delta(s,u)<d[u]$. Pero se extrajo $u$ y no $y$ con $d[u]\le d[y]=\delta(s,y)\le\delta(s,u)<d[u]$: contradicción. $\blacksquare$</p>
    <p><b>Con un peso negativo la prueba falla</b> en "$\delta(s,y)\le\delta(s,u)$": un camino por $y$ podría mejorar después. Dijkstra puede dar respuestas erróneas (ver el laboratorio).</p>`));

  root.appendChild(callout('thm', 'Bellman–Ford (pesos cualesquiera)',
    R`Repetir $n-1$ veces: relajar <b>todas</b> las aristas. Si no hay ciclos negativos alcanzables, $d[v]=\delta(s,v)$ y $O(nm)$. Una pasada más que todavía mejore alguna estimación detecta un <b>ciclo negativo alcanzable</b> desde $s$ (donde $\delta=-\infty$).`,
    R`<p>Sea $P=\langle s=v_0,\dots,v_k=v\rangle$ un camino mínimo con $k\le n-1$ aristas (sin ciclos negativos existe un mínimo sin repetir vértices). Después de la pasada $i$, $d[v_i]=\delta(s,v_i)$: por inducción, en la pasada $i$ se relaja $(v_{i-1},v_i)$ con $d[v_{i-1}]$ ya correcto. Así, tras $n-1$ pasadas, $d[v]=\delta(s,v)$.</p>
    <p>Si existiera un ciclo negativo alcanzable $c_0\to\dots\to c_r=c_0$ y ninguna arista pudiera relajarse más, sumando $d[c_{i}]\le d[c_{i-1}]+w(c_{i-1},c_i)$ sobre el ciclo daría $0\le\sum w<0$: absurdo. Entonces en la $n$-ésima pasada alguna arista mejora. $\blacksquare$</p>`));

  root.appendChild(callout('tip', '¿Qué algoritmo uso?',
    R`<table class="tbl"><tr><th>Grafo</th><th>Algoritmo</th><th>Costo</th></tr>
    <tr><td>sin pesos</td><td>BFS</td><td>$O(n+m)$</td></tr>
    <tr><td>DAG (pesos cualesquiera)</td><td>orden topológico + relajar</td><td>$O(n+m)$</td></tr>
    <tr><td>pesos $\ge0$</td><td>Dijkstra</td><td>$O((n+m)\log n)$</td></tr>
    <tr><td>pesos negativos o ciclo negativo</td><td>Bellman–Ford</td><td>$O(nm)$</td></tr>
    <tr><td>todos los pares</td><td>Floyd–Warshall / Dijkstra desde cada vértice</td><td>$O(n^3)$</td></tr></table>
    <b>Trucos de modelado</b> (explicados en la pestaña <a href="#a3-estados">Grafos de estado</a>): codificar el <em>estado</em> como vértice (posición + valor, Ej. 2), duplicar vértices en capas ("a lo sumo una arista negativa", Ej. 7), agregar un vértice fantasma (varias fuentes, Ej. 1) o correr el algoritmo más de una vez (aristas $st$-eficientes: $d(s,v)+c+d(w,t)=d(s,t)$, Ej. 5).`));

  root.appendChild(callout('warn', 'Errores comunes',
    R`<ul><li>Usar Dijkstra con pesos negativos "porque el grafo es chico": puede fallar aunque no haya ciclos negativos.</li><li>Sumar una constante a todos los pesos para "sacar los negativos": cambia cuál es el camino mínimo (los de más aristas se penalizan más).</li><li>En Bellman–Ford, con un ciclo negativo alcanzable las distancias no están definidas ($-\infty$); no hay que reportar los valores de $d$.</li></ul>`));

  root.appendChild(el('h2', { text: 'Laboratorio: corré los algoritmos paso a paso' }));
  const asel = selectControl({ label: 'Algoritmo: ', value: 'dijkstra', options: [{ value: 'dag', label: 'DAG (orden topológico)' }, { value: 'dijkstra', label: 'Dijkstra' }, { value: 'bf', label: 'Bellman–Ford' }] });
  const gsel = selectControl({ label: 'Grafo: ', value: 'pos', options: [{ value: 'pos', label: 'Pesos positivos' }, { value: 'dag', label: 'DAG con un peso negativo' }, { value: 'neg', label: 'Aristas negativas, sin ciclo negativo' }, { value: 'ciclo', label: 'Con un ciclo negativo' }] });
  root.appendChild(el('div', { class: 'controls' }, [asel.wrap, gsel.wrap]));
  let fotos = []; let g = GRAFOS.pos; let aviso = '';
  const cp = controlPasos(0, () => viz.redraw());
  root.appendChild(cp.wrap);
  const out = readout('');
  const viz = mountCanvas(root, { height: 330, view: {}, hint: 'origen: vértice 0 · sobre cada nodo: d[v] · aristas verdes = árbol de caminos mínimos' });
  const recomputar = () => {
    g = GRAFOS[gsel.select.value]; const a = asel.select.value; aviso = '';
    if (a === 'dag') { if (gsel.select.value === 'pos' || gsel.select.value === 'dag') fotos = pasosDAG(g, 0); else { fotos = []; aviso = 'Este grafo tiene ciclos o no es un DAG: el algoritmo por orden topológico no aplica.'; } }
    else if (a === 'dijkstra') { fotos = pasosDijkstra(g, 0); if (gsel.select.value !== 'pos') aviso = '⚠ Dijkstra requiere pesos ≥ 0: con aristas negativas el resultado puede ser incorrecto (compará con Bellman–Ford).'; }
    else fotos = pasosBellmanFord(g, 0);
    cp.setMax(Math.max(0, fotos.length - 1)); cp.reiniciar(); viz.redraw();
  };
  viz.setDraw(() => {
    const p = viz.plane; p.clear();
    if (!fotos.length) { dibujarGrafo(p, g, {}); out.textContent = aviso; return; }
    const F = fotos[Math.min(cp.valor(), fotos.length - 1)]; const arbol = new Set();
    F.padre.forEach((u, v) => { if (u !== null) { const k = g.aristas.findIndex(([a, b]) => a === u && b === v); if (k >= 0) arbol.add(k); } });
    dibujarGrafo(p, g, {
      aristaColor: (k) => (arbol.has(k) ? COLORS.ok : g.aristas[k][2] < 0 ? COLORS.err : COLORS.textDim), aristaGrosor: (k) => (arbol.has(k) ? 4 : 2),
      nodoFill: (i) => (i === F.actual ? COLORS.warn : (F.fijo ? F.fijo[i] : F.d[i] !== Infinity) ? 'rgba(53,201,138,0.45)' : COLORS.panel),
      nodoSub: (i) => 'd=' + fmt(F.d[i]),
    });
    const ref = pasosBellmanFord(g, 0); const real = ref[ref.length - 1];
    let comp = '';
    if (asel.select.value === 'dijkstra' && cp.valor() >= fotos.length - 1) {
      const malo = real.ciclo ? null : F.d.findIndex((x, i) => x !== real.d[i]);
      comp = real.ciclo ? '\n(el grafo tiene un ciclo negativo: las distancias reales son −∞)' : (malo >= 0 ? `\n✗ INCORRECTO: Dijkstra dejó d[${malo}] = ${fmt(F.d[malo])} pero la distancia real es ${fmt(real.d[malo])}.` : '\n✓ coincide con Bellman–Ford.');
    }
    out.textContent = (aviso ? aviso + '\n' : '') + F.texto + '\n' + 'd = [' + F.d.map(fmt).join(', ') + ']' + comp;
  });
  asel.select.addEventListener('change', recomputar); gsel.select.addEventListener('change', recomputar);
  root.appendChild(out); recomputar();
  root.appendChild(callout('tip', 'Qué observar',
    R`Elegí <b>Dijkstra</b> con "aristas negativas, sin ciclo negativo" y avanzá hasta el final: un vértice ya fijado queda con una distancia mayor que la real porque una arista negativa aparece <em>después</em>. Con <b>Bellman–Ford</b> en el mismo grafo todo da bien, y con "ciclo negativo" la pasada $n$ sigue mejorando.`));
}
