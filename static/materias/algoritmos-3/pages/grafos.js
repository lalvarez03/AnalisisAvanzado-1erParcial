// materias/algoritmos-3/pages/grafos.js — Teoría de grafos: grado, conexión, árboles y bipartitos (Práctica 2).

import { el } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { dibujarGrafo } from '../lib.js';

const R = String.raw;
const N = 7;
const POS = Array.from({ length: N }, (_, i) => [5 + 3.6 * Math.cos((2 * Math.PI * i) / N - Math.PI / 2), 3 + 2.4 * Math.sin((2 * Math.PI * i) / N - Math.PI / 2)]);

/** Componentes, bipartición y ciclo impar de un grafo en {0..N−1} con aristas dadas. O(n+m). */
function analizar(aristas) {
  const A = Array.from({ length: N }, () => []); aristas.forEach(([u, v]) => { A[u].push(v); A[v].push(u); });
  const comp = Array(N).fill(-1); const color = Array(N).fill(-1); let c = 0; let bip = true; let malArista = null;
  for (let s = 0; s < N; s++) {
    if (comp[s] >= 0) continue; comp[s] = c; color[s] = 0; const q = [s];
    while (q.length) { const u = q.shift(); A[u].forEach((v) => { if (comp[v] < 0) { comp[v] = c; color[v] = 1 - color[u]; q.push(v); } else if (color[v] === color[u]) { bip = false; malArista = malArista || [u, v]; } }); }
    c++;
  }
  return { A, comp, color, componentes: c, bip, malArista, grados: A.map((x) => x.length) };
}

export function renderGrafos(root) {
  root.appendChild(pageHeader('Grafos: apretón de manos, árboles y bipartitos',
    'Un grafo es un modelo muy simple —puntos y conexiones— que alcanza para describir redes de rutas, dependencias, amistades y casi cualquier relación. '
    + 'Esta página fija el vocabulario y los resultados básicos que usan los algoritmos de las próximas unidades.'));

  root.appendChild(callout('def', 'Definiciones',
    R`Un <b>grafo</b> $G=(V,E)$ tiene vértices $V$ y aristas $E$ (pares no ordenados). El <b>grado</b> $\deg(v)$ es la cantidad de aristas que inciden en $v$. Un <b>camino</b> es una sucesión de vértices consecutivos adyacentes; $G$ es <b>conexo</b> si entre todo par de vértices hay un camino. Un <b>ciclo</b> es un camino cerrado sin repetir vértices. Un <b>árbol</b> es un grafo conexo sin ciclos. $G$ es <b>bipartito</b> si $V=A\cup B$ disjuntos y toda arista une $A$ con $B$. En un <b>digrafo</b> las aristas son pares ordenados y se distingue $d_{in}(v)$ de $d_{out}(v)$.`));

  root.appendChild(callout('thm', 'Lema del apretón de manos',
    R`Para todo grafo $G$: $\ \sum_{v\in V}\deg(v)=2|E|$. Para todo digrafo $D$: $\ \sum_vd_{in}(v)=\sum_vd_{out}(v)=|E|$.`,
    R`<p>Inducción en $|E|$. Sin aristas ambos lados valen $0$. Si $G$ tiene $m+1$ aristas, se quita una arista cualquiera $e=uv$: $G-e$ tiene $m$ aristas y por hipótesis $\sum_v\deg_{G-e}(v)=2m$. Al volver a poner $e$, los grados de $u$ y $v$ suben en $1$ cada uno: $\sum_v\deg_G(v)=2m+2=2(m+1)$. El caso digrafo es igual: la arista $u\to v$ suma $1$ a $d_{out}(u)$ y $1$ a $d_{in}(v)$. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Todo grafo no trivial tiene dos vértices con el mismo grado',
    R`Si $G$ tiene $n\ge2$ vértices, existen $u\neq v$ con $\deg(u)=\deg(v)$.`,
    R`<p>Por absurdo: supongamos que los $n$ grados son todos distintos. Los grados posibles son $0,1,\dots,n-1$ ($n$ valores), así que aparecen todos exactamente una vez. Pero un vértice de grado $n-1$ es adyacente a <em>todos</em> los demás, incluido el de grado $0$: contradicción. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Caracterizaciones de árbol',
    R`Sea $G$ un grafo de $n$ vértices. Son equivalentes: (i) $G$ es un árbol; (ii) $G$ es conexo y tiene $n-1$ aristas; (iii) $G$ es acíclico y tiene $n-1$ aristas; (iv) entre dos vértices cualesquiera hay <b>un único</b> camino.`,
    R`<p>Clave: todo árbol con $n\ge2$ tiene al menos una <b>hoja</b> (vértice de grado 1): un camino de longitud máxima termina en un vértice cuyos vecinos están todos en el camino, y si tuviera dos vecinos habría un ciclo.</p>
    <p>(i)⇒(ii) Inducción en $n$: se quita una hoja; queda un árbol de $n-1$ vértices con $n-2$ aristas (hipótesis); volviendo a ponerla, $n-1$ aristas. (iv)⇒(i): si hubiera un ciclo, dos de sus vértices tendrían dos caminos distintos. (i)⇒(iv): si hubiera dos caminos distintos entre $u$ y $v$ habría un ciclo (ver Ej. 9).</p>
    <p>(iii)⇒(i): un grafo acíclico con $c$ componentes es un bosque de $c$ árboles, con $n-c$ aristas (por (i)⇒(ii) en cada componente); si tiene $n-1$ aristas, $c=1$: es conexo. (ii)⇒(i): si hubiera un ciclo, quitar una arista del ciclo conserva la conexión; repitiendo hasta que no queden ciclos se llega a un árbol con $n-1-t$ aristas ($t\ge1$), pero todo árbol de $n$ vértices tiene $n-1$: contradicción. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Muchas aristas implican conexo (Ej. 7)',
    R`Si $G$ tiene $n$ vértices y más de $\tfrac{(n-1)(n-2)}2$ aristas, entonces $G$ es conexo.`,
    R`<p>Si $G$ fuese disconexo, tomamos una componente con $a$ vértices ($1\le a\le n-1$); las aristas son a lo sumo $\binom a2+\binom{n-a}2$. Esta función de $a$ es convexa, así que su máximo en $[1,n-1]$ se alcanza en los extremos: $\binom12+\binom{n-1}2=\tfrac{(n-1)(n-2)}2$. Entonces $|E|\le\tfrac{(n-1)(n-2)}2$, contradiciendo la hipótesis. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Bipartito ⇔ sin ciclos impares',
    R`$G$ es bipartito si y solo si no tiene ningún ciclo de longitud impar. Además, si $T$ es un árbol generador y $V_0,V_1$ son los vértices a distancia par/impar de la raíz, una arista fuera de $T$ con ambos extremos en el mismo conjunto cierra, junto con $T$, un ciclo impar.`,
    R`<p>(⇒) En un ciclo $v_0v_1\dots v_k v_0$ los vértices se alternan entre $A$ y $B$, así que $k+1$ (la longitud) es par. (⇐, vía árbol) Se colorea por paridad de la distancia en $T$. Si toda arista $vw$ fuera de $T$ une colores distintos, es bipartito. Si no, $v,w$ tienen la misma paridad de nivel; el camino en $T$ entre ellos tiene longitud par (suma de dos distancias a su ancestro común, de igual paridad), y con $vw$ forma un ciclo de longitud impar. Es la base del algoritmo lineal por BFS/DFS (Práctica 3, Ej. 10). $\blacksquare$</p>`));

  root.appendChild(callout('warn', 'Trampas',
    R`<ul><li>"Tiene $n-1$ aristas" <em>no</em> implica árbol (Ej. 3a): un triángulo más una arista aparte ($5$ vértices, $4$ aristas, todos de grado $\ge1$) no es conexo ni acíclico. Hace falta conexo <em>o</em> acíclico además de contar aristas.</li>
    <li>"Todos los grados $\ge1$" <em>no</em> implica conexo (Ej. 2): dos aristas disjuntas $12$ y $34$.</li>
    <li>Un subgrafo inducido por $W$ conserva <em>todas</em> las aristas entre vértices de $W$; un subgrafo cualquiera no.</li></ul>`));

  // Laboratorio interactivo
  root.appendChild(el('h2', { text: 'Laboratorio: armá tu grafo' }));
  root.appendChild(el('p', { class: 'page-sub', text: 'Hacé clic en dos vértices para agregar o quitar la arista entre ellos. Las propiedades se recalculan en vivo.' }));
  let aristas = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]];
  let sel = null;
  const botones = [['Camino', () => Array.from({ length: N - 1 }, (_, i) => [i, i + 1])], ['Ciclo par', () => [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]]], ['Ciclo impar', () => Array.from({ length: N }, (_, i) => [i, (i + 1) % N])],
    ['Estrella', () => Array.from({ length: N - 1 }, (_, i) => [0, i + 1])], ['Completo', () => { const e = []; for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) e.push([i, j]); return e; }], ['Vaciar', () => []]];
  root.appendChild(el('div', { class: 'controls' }, botones.map(([t, f]) => el('button', { class: 'btn ghost', type: 'button', onClick: () => { aristas = f(); sel = null; viz.redraw(); } }, t))));
  const out = readout('');
  const viz = mountCanvas(root, { height: 330, view: {}, hint: 'clic en dos vértices = agregar / quitar arista' });
  viz.setDraw(() => {
    const p = viz.plane; p.clear(); const an = analizar(aristas); const g = { nodos: POS, aristas, dirigido: false };
    const pal = [COLORS.accent, COLORS.pink, COLORS.ok, COLORS.warn, COLORS.cyan, COLORS.err, COLORS.accent2];
    dibujarGrafo(p, g, {
      nodoFill: (i) => (i === sel ? COLORS.warn : (an.bip ? (an.color[i] === 0 ? 'rgba(91,140,255,0.45)' : 'rgba(255,107,214,0.45)') : COLORS.panel)),
      nodoStroke: (i) => pal[an.comp[i] % pal.length], nodoSub: (i) => 'g=' + an.grados[i],
      aristaTexto: () => null, aristaColor: (k) => (!an.bip && an.malArista && ((aristas[k][0] === an.malArista[0] && aristas[k][1] === an.malArista[1]) || (aristas[k][0] === an.malArista[1] && aristas[k][1] === an.malArista[0])) ? COLORS.err : COLORS.textDim),
    });
    const m = aristas.length; const suma = an.grados.reduce((a, b) => a + b, 0);
    const conexo = an.componentes === 1; const aciclico = m === N - an.componentes;
    const rep = an.grados.some((gr, i) => an.grados.indexOf(gr) !== i);
    out.textContent = `n = ${N}, m = ${m} · Σ grados = ${suma} = 2m = ${2 * m} ✓ (lema del apretón de manos)\n`
      + `componentes: ${an.componentes} · conexo: ${conexo ? 'sí' : 'no'} · acíclico: ${aciclico ? 'sí' : 'no (m > n − c ⇒ hay ciclo)'} · ÁRBOL: ${conexo && aciclico ? 'SÍ' : 'no'} ${conexo && m === N - 1 ? '(conexo con n−1 aristas ⇒ árbol)' : ''}\n`
      + `bipartito: ${an.bip ? 'sí (colores azul / rosa)' : 'NO: la arista roja une dos vértices del mismo color ⇒ hay un ciclo impar'} · grados repetidos: ${rep ? 'sí (como debe ser para n ≥ 2)' : 'no'}`;
  });
  viz.canvas.addEventListener('click', (e) => {
    const r = viz.canvas.getBoundingClientRect(); const px = e.clientX - r.left; const py = e.clientY - r.top; const p = viz.plane;
    let best = -1; let bd = 26; POS.forEach(([x, y], i) => { const d = Math.hypot(p.sx(x) - px, p.sy(y) - py); if (d < bd) { bd = d; best = i; } });
    if (best < 0) { sel = null; viz.redraw(); return; }
    if (sel === null) sel = best;
    else if (sel === best) sel = null;
    else { const [a, b] = [Math.min(sel, best), Math.max(sel, best)]; const idx = aristas.findIndex(([u, v]) => u === a && v === b); if (idx >= 0) aristas.splice(idx, 1); else aristas.push([a, b]); sel = null; }
    viz.redraw();
  });
  root.appendChild(out);
}
