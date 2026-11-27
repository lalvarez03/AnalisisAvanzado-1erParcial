// materias/algoritmos-3/pages/floyd.js — Floyd–Warshall: caminos mínimos entre todos los pares (Práctica 8, Ej. 9–11).

import { el, selectControl } from '../../../js/utils/dom.js';
import { pageHeader, callout, readout } from '../../../js/utils/page.js';
import { fmt, DIGRAFO_POSITIVO, DIGRAFO_NEGATIVO, DIGRAFO_CICLO_NEG, pasosFloyd, controlPasos } from '../lib.js';

const R = String.raw;
const GRAFOS = { pos: DIGRAFO_POSITIVO, neg: DIGRAFO_NEGATIVO, ciclo: DIGRAFO_CICLO_NEG };

export function renderFloyd(root) {
  root.appendChild(pageHeader('Floyd–Warshall',
    'Si necesitás la distancia entre <em>todos</em> los pares de vértices, correr Dijkstra o Bellman–Ford desde cada origen funciona, pero hay una idea más elegante: '
    + 'preguntarse qué pasa si <strong>permitimos usar los vértices intermedios de a uno</strong>.'));

  root.appendChild(callout('def', 'La recurrencia (programación dinámica sobre intermedios)',
    R`Con $V=\{1,\dots,n\}$, sea $D^k[i][j]$ el peso del camino mínimo de $i$ a $j$ que usa como vértices <b>intermedios</b> solo a $\{1,\dots,k\}$. Entonces
    $D^0[i][j]=w(i,j)$ (o $\infty$; $D^0[i][i]=0$) y $\ D^k[i][j]=\min\big(D^{k-1}[i][j],\ D^{k-1}[i][k]+D^{k-1}[k][j]\big)$. La respuesta es $D^n$.`));

  root.appendChild(callout('thm', 'Correctitud y costo',
    R`Si el digrafo no tiene ciclos de peso negativo, $D^n[i][j]=\delta(i,j)$. El algoritmo hace tres ciclos anidados: $O(n^3)$ tiempo y $O(n^2)$ espacio (se puede actualizar la misma matriz). Si algún $D^n[i][i]<0$, hay un ciclo de peso negativo.`,
    R`<p>Inducción en $k$. Un camino mínimo de $i$ a $j$ con intermedios en $\{1..k\}$ (sin ciclos, pues no hay ciclos negativos) o <b>no pasa</b> por $k$ —y entonces es un camino mínimo con intermedios en $\{1..k-1\}$, de peso $D^{k-1}[i][j]$— o <b>pasa exactamente una vez</b> por $k$ y se parte en $i\to k$ y $k\to j$, ambos con intermedios en $\{1..k-1\}$ y mínimos por subestructura óptima: peso $D^{k-1}[i][k]+D^{k-1}[k][j]$. El mínimo de los dos casos es $D^k[i][j]$. Si hay un ciclo negativo que pasa por $i$, el camino $i\to i$ que lo recorre una vez aparece en algún $D^k[i][i]$ con valor $<0$. $\blacksquare$</p>`));

  root.appendChild(callout('tip', 'Cuándo conviene cada opción para todos los pares',
    R`<ul><li>Grafo <b>denso</b> o con pesos negativos: Floyd–Warshall, $O(n^3)$, muy simple de programar.</li><li>Grafo <b>ralo</b> sin pesos negativos: $n$ corridas de Dijkstra, $O(n(n+m)\log n)$.</li><li>Para <b>reconstruir</b> caminos se guarda una matriz de "siguiente vértice" o de "intermedio" que se actualiza junto con $D$.</li><li>Ej. 9 ("máximamente $st$-eficiente"): con $D=D^n$ una arista $v\to w$ es $st$-eficiente si $D[s][v]+c(v\to w)+D[w][t]=D[s][t]$; se cuenta para cada arista cuántos pares $(s,t)$ lo cumplen en $O(n^2m)$ (o $O(n^3)$ si se hace por vértices).</li></ul>`));

  root.appendChild(callout('warn', 'Errores comunes',
    R`<ul><li>El orden de los ciclos importa: <b>$k$ tiene que ser el ciclo más externo</b>. Con $k$ adentro, el algoritmo no es correcto.</li><li>Inicializar $D[i][i]=0$ (no $\infty$): si no, se pierde el caso "no pasar por ningún intermedio" y se detectan ciclos de forma falsa.</li><li>Sumar $\infty+(-5)$ como si fuera un número: hay que ignorar las sumas con $\infty$.</li></ul>`));

  root.appendChild(el('h2', { text: 'Laboratorio: la matriz D⁰, D¹, …, Dⁿ' }));
  const gsel = selectControl({ label: 'Grafo: ', value: 'pos', options: [{ value: 'pos', label: 'Pesos positivos (7 vértices)' }, { value: 'neg', label: 'Aristas negativas, sin ciclo negativo' }, { value: 'ciclo', label: 'Con un ciclo negativo (5 vértices)' }] });
  let fotos = [];
  const cp = controlPasos(0, () => dibujar());
  root.appendChild(el('div', { class: 'controls' }, [gsel.wrap]));
  root.appendChild(cp.wrap);
  const tabla = el('div', { style: 'overflow-x:auto' });
  const out = readout('');
  const dibujar = () => {
    if (!fotos.length) return;
    const F = fotos[Math.min(cp.valor(), fotos.length - 1)]; const n = F.D.length; const cambio = new Set(F.cambios.map(([i, j]) => i + ',' + j));
    let h = '<table class="tbl"><tr><th>D</th>' + Array.from({ length: n }, (_, j) => `<th>${j}</th>`).join('') + '</tr>';
    for (let i = 0; i < n; i++) {
      h += `<tr><th>${i}</th>` + F.D[i].map((x, j) => {
        const neg = i === j && x < 0; const st = neg ? 'background:rgba(255,107,122,.5);font-weight:700' : cambio.has(i + ',' + j) ? 'background:rgba(255,180,84,.55);font-weight:700' : (F.k > 0 && (i === F.k - 1 || j === F.k - 1)) ? 'background:rgba(91,140,255,.22)' : '';
        return `<td style="text-align:center;${st}">${fmt(x)}</td>`;
      }).join('') + '</tr>';
    }
    tabla.innerHTML = h + '</table>';
    const diagNeg = F.D.some((f, i) => f[i] < 0);
    out.textContent = F.texto + (F.k > 0 ? `\n(naranja = mejoró en este paso · fila y columna ${F.k - 1} resaltadas: son las que se combinan)` : '') + (diagNeg ? '\n⚠ hay un D[i][i] < 0: ciclo de peso negativo.' : '');
  };
  const recomputar = () => { fotos = pasosFloyd(GRAFOS[gsel.select.value]); cp.setMax(fotos.length - 1); cp.reiniciar(); dibujar(); };
  gsel.select.addEventListener('change', recomputar);
  root.appendChild(tabla); root.appendChild(out); recomputar();
}
