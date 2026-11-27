// materias/algoritmos-3/lib.js — grafos de ejemplo, dibujo y simuladores paso a paso de los algoritmos de la materia.
// Cada simulador devuelve una lista de "fotos" (snapshots) para recorrerlas con un slider. Todo O(n+m) o O(n^3) en tamaños chicos.

import { COLORS } from '../../js/constants.js';

export const fmt = (x) => (x === Infinity ? '∞' : x === -Infinity ? '−∞' : String(x).replace('-', '−'));

// ---------------------------------------------------------------------------
// Grafos de ejemplo. nodos: [x, y] en un plano 10×6; aristas: [u, v, w]
// ---------------------------------------------------------------------------
export const GRAFO_NO_DIR = {
  nombre: 'Grafo de 8 vértices', dirigido: false,
  nodos: [[1, 3], [3, 5], [3, 1], [5, 3], [7, 5], [7, 1], [9, 3], [5, 5.5]],
  aristas: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6], [1, 7], [7, 4]],
};

export const GRAFO_PUENTES = {
  nombre: 'Dos triángulos unidos por un puente', dirigido: false,
  nodos: [[1, 1.5], [3, 4.5], [3, 1], [5, 3], [7, 4.5], [7, 1], [9, 3]],
  aristas: [[0, 1], [0, 2], [1, 2], [2, 3], [3, 4], [3, 5], [4, 5], [4, 6]],
};

export const DIGRAFO_DAG = {
  nombre: 'DAG con un peso negativo', dirigido: true,
  nodos: [[1, 3], [3, 5], [3, 1], [5, 3], [7, 5], [7, 1], [9, 3]],
  aristas: [[0, 1, 2], [0, 2, 5], [1, 2, -2], [1, 3, 6], [2, 3, 3], [3, 4, 1], [3, 5, 4], [4, 6, 2], [5, 6, 1]],
};

export const DIGRAFO_POSITIVO = {
  nombre: 'Digrafo con pesos positivos', dirigido: true,
  nodos: [[1, 3], [3, 5], [3, 1], [5, 3], [7, 5], [7, 1], [9, 3]],
  aristas: [[0, 1, 7], [0, 2, 9], [0, 5, 14], [1, 2, 10], [1, 3, 15], [2, 3, 11], [2, 5, 2], [3, 4, 6], [5, 4, 9], [4, 6, 5], [5, 6, 20]],
};

export const DIGRAFO_NEGATIVO = {
  nombre: 'Digrafo con aristas negativas (sin ciclo negativo)', dirigido: true,
  nodos: [[1, 3], [3, 5], [3, 1], [5, 3], [7, 5], [7, 1], [9, 3]],
  aristas: [[0, 1, 6], [0, 2, 5], [0, 3, 5], [1, 4, -1], [2, 1, -2], [2, 4, 1], [3, 2, -2], [3, 5, -1], [4, 6, 3], [5, 6, 3]],
};

export const DIGRAFO_CICLO_NEG = {
  nombre: 'Digrafo con un ciclo de peso negativo', dirigido: true,
  nodos: [[1, 3], [3, 5], [3, 1], [5, 3], [7, 3]],
  aristas: [[0, 1, 1], [1, 2, -3], [2, 1, 1], [1, 3, 2], [3, 4, 1]],
};

export const RED_FLUJO = {
  nombre: 'Red de flujo', dirigido: true,
  nodos: [[0.8, 3], [3, 5], [3, 1], [6, 5], [6, 1], [9.2, 3]],   // s=0, a=1, b=2, c=3, d=4, t=5
  aristas: [[0, 1, 16], [0, 2, 13], [1, 2, 10], [2, 1, 4], [1, 3, 12], [3, 2, 9], [2, 4, 14], [4, 3, 7], [3, 5, 20], [4, 5, 4]],
  nombres: ['s', 'a', 'b', 'c', 'd', 't'],
};

export const nombreNodo = (g, i) => (g.nombres ? g.nombres[i] : String(i));

/** Lista de adyacencia [v] -> [{v, w, k}] (k = índice de la arista). Para no dirigidos agrega ambos sentidos. */
export function adyacencia(g) {
  const A = g.nodos.map(() => []);
  g.aristas.forEach(([u, v, w], k) => { A[u].push({ v, w: w ?? 1, k }); if (!g.dirigido) A[v].push({ v: u, w: w ?? 1, k }); });
  return A;
}

// ---------------------------------------------------------------------------
// Dibujo
// ---------------------------------------------------------------------------
/**
 * Dibuja un grafo sobre un plano de `createPlane` con vista 0..10 × 0..6.
 * estilo: { nodoFill(i), nodoStroke(i), nodoTexto(i), nodoSub(i), aristaColor(k), aristaGrosor(k), aristaTexto(k), aristaDash(k) }
 */
export function dibujarGrafo(p, g, estilo = {}) {
  p.view.xmin = -0.2; p.view.xmax = 10.2; p.view.ymin = -0.3; p.view.ymax = 6.3;
  const ctx = p.ctx; const R = 17;
  g.aristas.forEach(([u, v, w], k) => {
    const [x1, y1] = g.nodos[u]; const [x2, y2] = g.nodos[v];
    const a = [p.sx(x1), p.sy(y1)]; const b = [p.sx(x2), p.sy(y2)];
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    // En aristas dirigidas opuestas (u→v y v→u) se curvan levemente para no superponerse.
    const opuesta = g.dirigido && g.aristas.some(([s, t], j) => j !== k && s === v && t === u);
    const off = opuesta ? 9 : 0; const nx = -Math.sin(ang) * off; const ny = Math.cos(ang) * off;
    const sx = a[0] + Math.cos(ang) * R + nx; const sy = a[1] + Math.sin(ang) * R + ny;
    const ex = b[0] - Math.cos(ang) * R + nx; const ey = b[1] - Math.sin(ang) * R + ny;
    ctx.save();
    ctx.strokeStyle = estilo.aristaColor ? estilo.aristaColor(k) : COLORS.textDim;
    ctx.fillStyle = ctx.strokeStyle; ctx.lineWidth = estilo.aristaGrosor ? estilo.aristaGrosor(k) : 2;
    if (estilo.aristaDash?.(k)) ctx.setLineDash([6, 5]);
    ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke(); ctx.setLineDash([]);
    if (g.dirigido) {
      ctx.beginPath(); ctx.moveTo(ex, ey);
      ctx.lineTo(ex - 10 * Math.cos(ang - 0.4), ey - 10 * Math.sin(ang - 0.4));
      ctx.lineTo(ex - 10 * Math.cos(ang + 0.4), ey - 10 * Math.sin(ang + 0.4)); ctx.closePath(); ctx.fill();
    }
    const txt = estilo.aristaTexto ? estilo.aristaTexto(k) : (w !== undefined ? String(w) : null);
    if (txt !== null && txt !== undefined) {
      const mx = (sx + ex) / 2 + nx * 0.8 - Math.sin(ang) * 10; const my = (sy + ey) / 2 + ny * 0.8 + Math.cos(ang) * 10;
      ctx.font = '600 12px Inter, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const wd = ctx.measureText(txt).width + 6; ctx.fillStyle = COLORS.bgSoft; ctx.fillRect(mx - wd / 2, my - 8, wd, 16);
      ctx.fillStyle = estilo.aristaColor ? estilo.aristaColor(k) : COLORS.textDim; ctx.fillText(txt, mx, my);
    }
    ctx.restore();
  });
  g.nodos.forEach(([x, y], i) => {
    ctx.save();
    ctx.beginPath(); ctx.arc(p.sx(x), p.sy(y), R, 0, Math.PI * 2);
    ctx.fillStyle = estilo.nodoFill ? estilo.nodoFill(i) : COLORS.panel; ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = estilo.nodoStroke ? estilo.nodoStroke(i) : COLORS.textDim; ctx.stroke();
    ctx.fillStyle = COLORS.text; ctx.font = '700 13px Inter, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(estilo.nodoTexto ? estilo.nodoTexto(i) : nombreNodo(g, i), p.sx(x), p.sy(y));
    const sub = estilo.nodoSub?.(i);
    if (sub !== undefined && sub !== null) { ctx.font = '600 12px Inter, sans-serif'; ctx.fillStyle = COLORS.warn; ctx.fillText(sub, p.sx(x), p.sy(y) - R - 9); }
    ctx.restore();
  });
}

// ---------------------------------------------------------------------------
// Simuladores paso a paso
// ---------------------------------------------------------------------------

/** BFS desde s. Una foto por vértice extraído de la cola. */
export function pasosBFS(g, s) {
  const A = adyacencia(g); const n = g.nodos.length;
  const nivel = Array(n).fill(null); const padre = Array(n).fill(null); const cola = [s]; nivel[s] = 0;
  const fotos = [{ actual: null, cola: [s], nivel: nivel.slice(), padre: padre.slice(), texto: `Se encola el origen ${s} (nivel 0).` }];
  while (cola.length) {
    const u = cola.shift(); const nuevos = [];
    A[u].forEach(({ v }) => { if (nivel[v] === null) { nivel[v] = nivel[u] + 1; padre[v] = u; cola.push(v); nuevos.push(v); } });
    fotos.push({ actual: u, cola: cola.slice(), nivel: nivel.slice(), padre: padre.slice(),
      texto: `Se extrae ${u}; sus vecinos nuevos ${nuevos.length ? '[' + nuevos.join(', ') + ']' : '(ninguno)'} quedan en el nivel ${nivel[u] + 1}.` });
  }
  return fotos;
}

/** DFS desde s con tiempos de descubrimiento/finalización y low-link (para puentes). Una foto por evento. */
export function pasosDFS(g, s) {
  const A = adyacencia(g); const n = g.nodos.length;
  const d = Array(n).fill(null); const f = Array(n).fill(null); const padre = Array(n).fill(null); const low = Array(n).fill(null);
  const puentes = []; const pila = []; let t = 0; const fotos = [];
  const foto = (texto, actual) => fotos.push({ actual, pila: pila.slice(), d: d.slice(), f: f.slice(), padre: padre.slice(), low: low.slice(), puentes: puentes.slice(), texto });
  const visitar = (u, kPadre) => {
    d[u] = low[u] = ++t; pila.push(u); foto(`Se descubre ${u} (d = ${d[u]}).`, u);
    A[u].forEach(({ v, k }) => {
      if (k === kPadre) return;
      if (d[v] === null) {
        padre[v] = u; visitar(v, k); low[u] = Math.min(low[u], low[v]);
        if (low[v] > d[u]) { puentes.push(k); foto(`low(${v}) = ${low[v]} > d(${u}) = ${d[u]}: la arista ${u}–${v} es un PUENTE.`, u); }
      } else { low[u] = Math.min(low[u], d[v]); foto(`Arista de retroceso ${u}→${v}: low(${u}) = ${low[u]}.`, u); }
    });
    f[u] = ++t; pila.pop(); foto(`Termina ${u} (f = ${f[u]}); low(${u}) = ${low[u]}.`, pila[pila.length - 1] ?? null);
  };
  visitar(s, -1);
  return fotos;
}

/** Dijkstra desde s (pesos ≥ 0). Una foto por vértice fijado. */
export function pasosDijkstra(g, s) {
  const A = adyacencia(g); const n = g.nodos.length;
  const d = Array(n).fill(Infinity); const fijo = Array(n).fill(false); const padre = Array(n).fill(null); d[s] = 0;
  const fotos = [{ actual: null, d: d.slice(), fijo: fijo.slice(), padre: padre.slice(), texto: 'Inicio: d[s] = 0 y d[v] = ∞ para el resto.' }];
  for (let it = 0; it < n; it++) {
    let u = -1; for (let i = 0; i < n; i++) if (!fijo[i] && (u < 0 || d[i] < d[u])) u = i;
    if (u < 0 || d[u] === Infinity) break;
    fijo[u] = true; const rel = [];
    A[u].forEach(({ v, w }) => { if (!fijo[v] && d[u] + w < d[v]) { d[v] = d[u] + w; padre[v] = u; rel.push(v); } });
    fotos.push({ actual: u, d: d.slice(), fijo: fijo.slice(), padre: padre.slice(), texto: `Se fija ${u} con d = ${d[u]} (el mínimo no fijado). Se relajan sus salidas${rel.length ? ' → mejoran: ' + rel.join(', ') : ' (ninguna mejora)'}.` });
  }
  return fotos;
}

/** Bellman–Ford desde s. Una foto por pasada completa sobre todas las aristas; la n-ésima detecta ciclos negativos. */
export function pasosBellmanFord(g, s) {
  const n = g.nodos.length; const d = Array(n).fill(Infinity); const padre = Array(n).fill(null); d[s] = 0;
  const fotos = [{ pasada: 0, d: d.slice(), padre: padre.slice(), cambios: [], ciclo: false, texto: 'Inicio: d[s] = 0 y d[v] = ∞.' }];
  for (let it = 1; it <= n; it++) {
    const cambios = [];
    g.aristas.forEach(([u, v, w]) => { if (d[u] !== Infinity && d[u] + w < d[v]) { d[v] = d[u] + w; padre[v] = u; cambios.push(v); } });
    const ciclo = it === n && cambios.length > 0;
    fotos.push({ pasada: it, d: d.slice(), padre: padre.slice(), cambios, ciclo,
      texto: ciclo ? `Pasada ${it} (la n-ésima): TODAVÍA mejora ${cambios.join(', ')} ⇒ hay un ciclo de peso negativo alcanzable.`
        : `Pasada ${it}: ${cambios.length ? 'mejoran ' + cambios.join(', ') : 'no cambia nada'}${it === n ? ' ⇒ no hay ciclo negativo.' : '.'}` });
    if (!cambios.length) break;
  }
  return fotos;
}

/** Camino mínimo en un DAG: orden topológico + una relajación por arista. Una foto por vértice procesado. */
export function pasosDAG(g, s) {
  const A = adyacencia(g); const n = g.nodos.length; const gr = Array(n).fill(0);
  g.aristas.forEach(([, v]) => { gr[v]++; });
  const q = []; for (let i = 0; i < n; i++) if (!gr[i]) q.push(i);
  const orden = []; while (q.length) { const u = q.shift(); orden.push(u); A[u].forEach(({ v }) => { if (--gr[v] === 0) q.push(v); }); }
  const d = Array(n).fill(Infinity); const padre = Array(n).fill(null); d[s] = 0; const fijo = Array(n).fill(false);
  const fotos = [{ actual: null, d: d.slice(), fijo: fijo.slice(), padre: padre.slice(), orden, texto: `Orden topológico: ${orden.join(' → ')}.` }];
  orden.forEach((u) => {
    fijo[u] = true;
    A[u].forEach(({ v, w }) => { if (d[u] !== Infinity && d[u] + w < d[v]) { d[v] = d[u] + w; padre[v] = u; } });
    fotos.push({ actual: u, d: d.slice(), fijo: fijo.slice(), padre: padre.slice(), orden, texto: `Se procesa ${u} (ya no puede mejorar: todos sus predecesores ya fueron procesados).` });
  });
  return fotos;
}

/** Floyd–Warshall: foto D^(k) tras permitir los vértices 0..k−1 como intermedios. */
export function pasosFloyd(g) {
  const n = g.nodos.length; const D = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 0 : Infinity)));
  g.aristas.forEach(([u, v, w]) => { D[u][v] = Math.min(D[u][v], w); });
  const fotos = [{ k: 0, D: D.map((f) => f.slice()), cambios: [], texto: 'D⁰ = matriz de pesos de las aristas (∞ si no hay).' }];
  for (let k = 0; k < n; k++) {
    const cambios = [];
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (D[i][k] + D[k][j] < D[i][j]) { D[i][j] = D[i][k] + D[k][j]; cambios.push([i, j]); }
    fotos.push({ k: k + 1, D: D.map((f) => f.slice()), cambios, texto: `D^${k + 1}: se permite pasar por el vértice ${k}. ${cambios.length ? 'Mejoran: ' + cambios.map(([i, j]) => `(${i},${j})`).join(' ') : 'No mejora ningún par.'}` });
  }
  return fotos;
}

/** Edmonds–Karp (Ford–Fulkerson con BFS). Una foto por camino de aumento. */
export function pasosEdmondsKarp(g, s, t) {
  const n = g.nodos.length; const cap = Array.from({ length: n }, () => Array(n).fill(0));
  g.aristas.forEach(([u, v, c]) => { cap[u][v] += c; });
  const flujo = Array.from({ length: n }, () => Array(n).fill(0)); let valor = 0;
  const copia = () => flujo.map((f) => f.slice());
  const fotos = [{ camino: null, cuello: 0, valor: 0, flujo: copia(), corte: null, texto: 'Flujo inicial: 0 en todas las aristas.' }];
  const residual = (u, v) => cap[u][v] - flujo[u][v] + flujo[v][u];
  for (;;) {
    const padre = Array(n).fill(-1); padre[s] = s; const q = [s];
    while (q.length && padre[t] < 0) { const u = q.shift(); for (let v = 0; v < n; v++) if (padre[v] < 0 && residual(u, v) > 0) { padre[v] = u; q.push(v); } }
    if (padre[t] < 0) {
      const S = padre.map((x, i) => (x >= 0 ? i : -1)).filter((i) => i >= 0);
      fotos.push({ camino: null, cuello: 0, valor, flujo: copia(), corte: S, texto: `No hay camino de aumento en la red residual: flujo máximo = ${valor}. El corte (S, V∖S) con S = alcanzables desde s tiene capacidad ${valor}.` });
      break;
    }
    const camino = []; let b = Infinity;
    for (let v = t; v !== s; v = padre[v]) { camino.unshift(padre[v]); b = Math.min(b, residual(padre[v], v)); }
    camino.push(t);
    for (let i = 0; i + 1 < camino.length; i++) {
      const u = camino[i]; const v = camino[i + 1]; const cancel = Math.min(flujo[v][u], b); flujo[v][u] -= cancel; flujo[u][v] += b - cancel;
    }
    valor += b;
    fotos.push({ camino, cuello: b, valor, flujo: copia(), corte: null, texto: `Camino de aumento ${camino.map((i) => nombreNodo(g, i)).join(' → ')} con cuello de botella ${b}. Flujo total = ${valor}.` });
  }
  return fotos;
}

/**
 * Árbol de backtracking de Suma Subconjuntos (recurrencia ss(i, j) = ss(i−1, j) ∨ ss(i−1, j−C[i])).
 * Devuelve la raíz {i, j, hijos, estado, verdadero}, con estado 'hoja' | 'podado' | 'interno'. Si memo, no expande subproblemas repetidos.
 */
export function arbolSubsetSum(C, k, { poda = false, memo = false } = {}) {
  const vistos = new Map(); let nodos = 0;
  const rec = (i, j) => {
    nodos++;
    if (poda && j < 0) return { i, j, hijos: [], estado: 'podado', verdadero: false };
    if (i === 0) return { i, j, hijos: [], estado: 'hoja', verdadero: j === 0 };
    const clave = i + ',' + j;
    if (memo && vistos.has(clave)) return { i, j, hijos: [], estado: 'memo', verdadero: vistos.get(clave) };
    const a = rec(i - 1, j); const b = rec(i - 1, j - C[i - 1]);
    const verdadero = a.verdadero || b.verdadero;
    if (memo) vistos.set(clave, verdadero);
    return { i, j, hijos: [a, b], estado: 'interno', verdadero };
  };
  const raiz = rec(C.length, k);
  return { raiz, nodos, respuesta: raiz.verdadero };
}

// ---------------------------------------------------------------------------
// Controles
// ---------------------------------------------------------------------------
import { el, slider } from '../../js/utils/dom.js';

/** Slider de "paso" con botones ◀ ▶. alCambiar() se llama cada vez que cambia el paso. */
export function controlPasos(maxInicial, alCambiar) {
  const s = slider({ label: 'paso', min: 0, max: maxInicial, step: 1, value: 0, format: (v) => v });
  const ant = el('button', { class: 'btn ghost', type: 'button', title: 'Paso anterior' }, '◀');
  const sig = el('button', { class: 'btn ghost', type: 'button', title: 'Paso siguiente' }, '▶');
  const poner = (v) => { const m = Number(s.input.max); const x = Math.max(0, Math.min(m, v)); s.input.value = x; s.setLabel(x); alCambiar(); };
  ant.addEventListener('click', () => poner(Number(s.input.value) - 1));
  sig.addEventListener('click', () => poner(Number(s.input.value) + 1));
  s.input.addEventListener('input', alCambiar);
  return {
    wrap: el('div', { class: 'controls' }, [ant, s.wrap, sig]),
    valor: () => Number(s.input.value),
    setMax: (m) => { s.input.max = m; if (Number(s.input.value) > m) poner(m); },
    reiniciar: () => poner(0),
  };
}

/** Poligonal sobre un plano de createPlane: pts = [[x,y],...] en coordenadas del mundo. */
export function poligonal(plane, pts, color, w = 2, dash = null) {
  for (let i = 0; i + 1 < pts.length; i++) plane.segment(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], color, w, dash);
}
