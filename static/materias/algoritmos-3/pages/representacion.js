// materias/algoritmos-3/pages/representacion.js — Representación de grafos: listas vs. matriz de adyacencia (Práctica 3, Ej. 1–2).

import { el, slider } from '../../../js/utils/dom.js';
import { pageHeader, callout, readout } from '../../../js/utils/page.js';
import { GRAFO_NO_DIR, adyacencia } from '../lib.js';

const R = String.raw;

export function renderRepresentacion(root) {
  root.appendChild(pageHeader('Representación de grafos: listas y matriz',
    'El grafo es un objeto matemático; la <em>representación</em> es una estructura de datos. Elegir bien cómo guardarlo cambia la complejidad de todo algoritmo que lo recorra.'));

  root.appendChild(callout('def', 'Dos representaciones clásicas',
    R`Con $V=\{0,\dots,n-1\}$ y $N(v)$ el vecindario de $v$:
    <ul><li><b>Lista de adyacencias:</b> un arreglo con, para cada $v$, la lista de $N(v)$. Espacio $\Theta(n+m)$ (cada arista aparece dos veces en un grafo no dirigido).</li>
    <li><b>Matriz de adyacencia:</b> $A\in\{0,1\}^{n\times n}$ con $A[v][w]=1\iff vw\in E$. Espacio $\Theta(n^2)$; es simétrica si $G$ no es dirigido.</li></ul>`));

  root.appendChild(callout('thm', 'Costos de las operaciones',
    R`<table class="tbl"><tr><th>Operación</th><th>Lista</th><th>Matriz</th></tr>
    <tr><td>¿Es $vw\in E$?</td><td>$O(\deg v)$</td><td>$O(1)$</td></tr>
    <tr><td>Recorrer $N(v)$</td><td>$O(\deg v)$</td><td>$O(n)$</td></tr>
    <tr><td>Recorrer todas las aristas</td><td>$O(n+m)$</td><td>$O(n^2)$</td></tr>
    <tr><td>Insertar arista</td><td>$O(1)$</td><td>$O(1)$</td></tr>
    <tr><td>Remover arista</td><td>$O(\deg v+\deg w)$</td><td>$O(1)$</td></tr>
    <tr><td>Espacio</td><td>$\Theta(n+m)$</td><td>$\Theta(n^2)$</td></tr></table>`,
    R`<p>Para recorrer todas las aristas con listas se visitan las $n$ listas y se leen $\sum_v\deg(v)=2m$ elementos: $O(n+m)$ (lema del apretón de manos). Con la matriz hay que mirar las $n^2$ casillas aunque casi todas valgan 0. Una consulta de adyacencia en la lista exige buscar $w$ en la lista de $v$, que tiene $\deg(v)$ elementos. $\blacksquare$</p>`));

  root.appendChild(callout('tip', 'Cómo elegir',
    R`Si el grafo es <b>ralo</b> ($m\sim n$) conviene la lista: $n+m\ll n^2$. Si es <b>denso</b> ($m\sim n^2$) ambas ocupan lo mismo y la matriz responde "¿es arista?" en $O(1)$. Una variante intermedia es guardar, por vértice, una tabla de hash con su vecindario (Ej. 1, estructura 4).`));

  root.appendChild(callout('thm', 'Triángulos: dos algoritmos (Ej. 2)',
    R`Decidir si $G$ tiene un triángulo (tres vértices mutuamente adyacentes): el algoritmo <b>cúbico</b> prueba las $\binom n3$ ternas con la matriz, $\Theta(n^3)$. El <b>cuadrático</b> hace, para cada $v$: marcar $N(v)$ y buscar una arista $wz$ con $w,z$ marcados, en $\Theta(nm)=O(m^2)$.`,
    R`<p><b>Correctitud (cuadrático).</b> Hay un triángulo $\{v,w,z\}$ si y solo si para algún $v$ existen $w,z\in N(v)$ con $wz\in E$. Al marcar $N(v)$ y recorrer todas las aristas, se encuentra una con ambos extremos marcados exactamente en ese caso.</p>
    <p><b>Costo.</b> Para cada $v$: marcar y desmarcar $N(v)$ cuesta $O(\deg v)$ y recorrer todas las aristas $O(m)$, en total $\sum_v(\deg v+m)=2m+nm=\Theta(nm)$. Como $m\ge n$ en el enunciado, $nm\le m^2$. $\blacksquare$</p>`));

  // Calculadora de costos
  root.appendChild(el('h2', { text: 'Calculadora: ¿lista o matriz?' }));
  const sn = slider({ label: 'n (vértices)', min: 10, max: 10000, step: 10, value: 1000, format: (v) => v });
  const sm = slider({ label: 'm (aristas)', min: 10, max: 100000, step: 10, value: 3000, format: (v) => v });
  root.appendChild(el('div', { class: 'controls' }, [sn.wrap, sm.wrap]));
  const out = readout('');
  const calc = () => {
    const n = Number(sn.input.value); const mMax = (n * (n - 1)) / 2; const m = Math.min(Number(sm.input.value), mMax);
    const dens = (m / mMax) * 100; const lista = n + 2 * m; const mat = n * n;
    out.textContent = `n = ${n}, m = ${m} (máximo posible ${mMax.toLocaleString()}) · densidad ${dens.toFixed(2)}%\n`
      + `espacio: lista ≈ ${lista.toLocaleString()} entradas · matriz = ${mat.toLocaleString()} casillas (${(mat / lista).toFixed(1)}× más)\n`
      + `recorrer todo el grafo: lista ${(n + m).toLocaleString()} pasos · matriz ${mat.toLocaleString()} pasos\n`
      + `conclusión: ${dens < 10 ? 'grafo ralo → LISTAS' : dens > 50 ? 'grafo denso → la MATRIZ es razonable' : 'depende de la operación dominante'}`;
  };
  sn.input.addEventListener('input', calc); sm.input.addEventListener('input', calc);
  root.appendChild(out); calc();

  // Vista de ambas estructuras para el grafo de ejemplo
  root.appendChild(el('h2', { text: 'Un mismo grafo, dos estructuras' }));
  const g = GRAFO_NO_DIR; const A = adyacencia(g); const n = g.nodos.length;
  const M = Array.from({ length: n }, () => Array(n).fill(0)); g.aristas.forEach(([u, v]) => { M[u][v] = 1; M[v][u] = 1; });
  const lis = A.map((vs, i) => `${i} → ${vs.map((x) => x.v).sort((a, b) => a - b).join(', ')}`).join('\n');
  const mat = '    ' + [...Array(n).keys()].join(' ') + '\n' + M.map((f, i) => `${i} | ` + f.join(' ')).join('\n');
  root.appendChild(el('div', { class: 'controls' }, [el('pre', { class: 'readout', text: lis }), el('pre', { class: 'readout', text: mat })]));
  root.appendChild(el('p', { class: 'page-sub', text: `Lista: ${A.reduce((s, x) => s + x.length, 0)} entradas = 2m (m = ${g.aristas.length}). Matriz: ${n * n} casillas, de las cuales ${2 * g.aristas.length} valen 1.` }));
}
