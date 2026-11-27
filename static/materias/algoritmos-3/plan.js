// materias/algoritmos-3/plan.js — plan de estudio de Técnicas de Diseño de Algoritmos (Algoritmos y Estructuras de Datos III, DC · FCEyN · UBA).
// Unidades = Prácticas 1 a 9 (2C 2026). Primer parcial: grafos, algoritmos sobre grafos, divide & conquer, backtracking.
// Segundo parcial: programación dinámica, greedy, camino mínimo, flujo máximo.
// Teoría = unidades; Práctica = herramientas 'estudio' y 'guia' (se muestran en el otro mundo).

export const UNIDADES = [
  {
    id: 'p1', num: 1, etiqueta: 'P1', ic: '🧾', color: '#5b8cff',
    titulo: 'Demostraciones y complejidad',
    capitulo: 'Práctica 1 · Repaso',
    resumen: 'Cómo se demuestra (directo, contrarrecíproco, absurdo, inducción), los errores típicos y la notación O, Ω, Θ.',
    requiere: [],
    paginas: [
      { id: 'a3-demostraciones', ic: '🧾', titulo: 'Técnicas de demostración: inducción y absurdo', desc: 'Lógica, directa, absurdo, contrarrecíproco, inducción y errores comunes.' },
      { id: 'a3-complejidad', ic: '📈', titulo: 'Complejidad asintótica: O, Ω y Θ', desc: 'O, Ω, Θ y comparación de órdenes de crecimiento.' },
    ],
  },
  {
    id: 'p2', num: 2, etiqueta: 'P2', ic: '🕸️', color: '#7c5cff',
    titulo: 'Teoría de grafos',
    capitulo: 'Práctica 2 · Introducción a grafos',
    resumen: 'Grafos, digrafos, caminos, conexión, árboles y bipartitos: las definiciones sobre las que se apoya todo lo que sigue.',
    requiere: ['p1'],
    paginas: [
      { id: 'a3-grafos', ic: '🕸️', titulo: 'Grafos: apretón de manos, árboles y bipartitos', desc: 'Grado, conexo, ciclos, árboles, bipartito y lema del apretón de manos.' },
    ],
  },
  {
    id: 'p3', num: 3, etiqueta: 'P3', ic: '🧭', color: '#38d9d9',
    titulo: 'Algoritmos sobre grafos: BFS y DFS',
    capitulo: 'Práctica 3 · Representaciones, BFS y DFS',
    resumen: 'Cómo guardar un grafo y cómo recorrerlo: BFS, DFS, orden topológico, puentes y bipartición.',
    requiere: ['p2'],
    paginas: [
      { id: 'a3-representacion', ic: '🗂️', titulo: 'Representación de grafos: listas y matriz', desc: 'Listas vs. matriz de adyacencia y costos de cada operación.' },
      { id: 'a3-bfs-dfs', ic: '🧭', titulo: 'BFS y DFS: niveles, retroceso y puentes', desc: 'Recorridos paso a paso, árbol DFS, aristas de retroceso y low-link.' },
    ],
  },
  {
    id: 'p4', num: 4, etiqueta: 'P4', ic: '✂️', color: '#35c98a',
    titulo: 'Divide & conquer',
    capitulo: 'Práctica 4',
    resumen: 'Partir el problema, resolver las partes y combinar; recurrencias y Teorema Maestro.',
    requiere: ['p1'],
    paginas: [
      { id: 'a3-dyc', ic: '✂️', titulo: 'Teorema Maestro: MergeSort e inversiones', desc: 'MergeSort, búsqueda binaria, inversiones y cómo resolver T(n) = aT(n/b) + f(n).' },
    ],
  },
  {
    id: 'p5', num: 5, etiqueta: 'P5', ic: '🌳', color: '#ffb454',
    titulo: 'Backtracking',
    capitulo: 'Práctica 5',
    resumen: 'Formalizar un problema como soluciones candidatas, válidas y parciales; árbol de backtracking y podas.',
    requiere: ['p1'],
    paginas: [
      { id: 'a3-backtracking', ic: '🌳', titulo: 'Backtracking: suma de subconjuntos y podas', desc: 'Suma de subconjuntos, árbol de llamadas, poda por factibilidad y optimalidad.' },
    ],
  },
  {
    id: 'p6', num: 6, etiqueta: 'P6', ic: '🧮', color: '#ff6bd6',
    titulo: 'Programación dinámica',
    capitulo: 'Práctica 6',
    resumen: 'Subproblemas que se repiten: memoización top-down, tabla bottom-up y reconstrucción de la solución.',
    requiere: ['p5'],
    paginas: [
      { id: 'a3-dp', ic: '🧮', titulo: 'Programación dinámica: estados y reconstrucción', desc: 'Superposición de subproblemas, top-down vs. bottom-up y reconstrucción.' },
    ],
  },
  {
    id: 'p7', num: 7, etiqueta: 'P7', ic: '🍬', color: '#ff6b7a',
    titulo: 'Greedy',
    capitulo: 'Práctica 7',
    resumen: 'Decidir localmente lo mejor y demostrar que alcanza: argumento de intercambio y "greedy stays ahead".',
    requiere: ['p5', 'p6'],
    paginas: [
      { id: 'a3-greedy', ic: '🍬', titulo: 'Greedy: ruta eficiente, demoras y deadlines', desc: 'Ruta eficiente, demoras, deadlines y pruebas de optimalidad.' },
    ],
  },
  {
    id: 'p8', num: 8, etiqueta: 'P8', ic: '🛣️', color: '#5b8cff',
    titulo: 'Caminos mínimos: Dijkstra, Bellman–Ford, Floyd',
    capitulo: 'Práctica 8',
    resumen: 'Qué algoritmo usar según el grafo: BFS, DAG, Dijkstra, Bellman–Ford y Floyd–Warshall; trucos de modelado.',
    requiere: ['p3', 'p6'],
    paginas: [
      { id: 'a3-caminos', ic: '🛣️', titulo: 'DAG, Dijkstra y Bellman–Ford', desc: 'Relajación, correctitud y por qué Dijkstra falla con pesos negativos.' },
      { id: 'a3-floyd', ic: '🔀', titulo: 'Floyd–Warshall', desc: 'Todos contra todos por programación dinámica sobre vértices intermedios.' },
      { id: 'a3-estados', ic: '🧩', titulo: 'Grafos de estado: capas y vértice fantasma', desc: 'Cómo modelar un problema como camino mínimo: estados, capas y fuentes múltiples.' },
    ],
  },
  {
    id: 'p9', num: 9, etiqueta: 'P9', ic: '🌊', color: '#38d9d9',
    titulo: 'Flujos',
    capitulo: 'Práctica 9 · Mejora incremental',
    resumen: 'Flujo máximo, corte mínimo, Edmonds–Karp y problemas de modelado (caminos disjuntos, asignación).',
    requiere: ['p3', 'p8'],
    paginas: [
      { id: 'a3-flujo', ic: '🌊', titulo: 'Max-flow min-cut y Edmonds–Karp', desc: 'Red residual, caminos de aumento, teorema de max-flow min-cut y modelado.' },
    ],
  },
];

// 'estudio', 'guia' y 'feedback' tienen versión genérica en el núcleo. Estudio y guía pertenecen al mundo Prácticas.
export const HERRAMIENTAS = [
  { id: 'estudio', ic: '🗺️', titulo: 'Estudiar por práctica', desc: 'Recetas, mapa de ejercicios y errores comunes de cada práctica.' },
  { id: 'guia', ic: '📖', titulo: 'Ejercicios resueltos', desc: 'Ejercicios de las Prácticas 1 a 9 resueltos paso a paso.' },
  { id: 'feedback', ic: '💬', titulo: 'Tu opinión', desc: 'Contanos qué te sirvió y qué no (hasta 2 imágenes).', grupo: 'extra' },
];
