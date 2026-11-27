// materias/alc/plan.js — plan de estudio de Álgebra Lineal Computacional (DM · FCEN · UBA).
// Las unidades siguen el orden de las Prácticas 1 a 7 (2C 2026) y del apunte de Acosta–Laplagne.
// Teoría = unidades (definiciones, demostraciones, visualizaciones, resultados clave).
// Práctica = herramientas 'estudio' y 'guia' (se muestran en el otro mundo, segmentadas por práctica).

export const UNIDADES = [
  {
    id: 'p1', num: 1, etiqueta: 'P1', ic: '🧱', color: '#5b8cff',
    titulo: 'Espacios vectoriales y matrices',
    capitulo: 'Apunte: Cap. 1 · Práctica 1',
    resumen: 'El escenario de toda la materia: sistemas lineales, subespacios, bases, dimensión, producto de matrices y cambio de base.',
    requiere: [],
    paginas: [
      { id: 'alc-espacios', ic: '🧱', titulo: 'Subespacios, bases y dimensión', desc: 'Generadores, independencia lineal, base, dimensión, suma de subespacios.' },
      { id: 'alc-matrices', ic: '🔢', titulo: 'Matrices, bloques y cambio de base', desc: 'Producto, transpuesta, traza, determinante, inversa y coordenadas.' },
    ],
  },
  {
    id: 'p2', num: 2, etiqueta: 'P2', ic: '🎯', color: '#7c5cff',
    titulo: 'Transformaciones, punto flotante y condición',
    capitulo: 'Apunte: Cap. 1.6, 2 y 3.1–3.4 · Práctica 2',
    resumen: 'Qué hace una matriz como función, cómo se equivoca la computadora al calcular y cuánto amplifica el error un sistema.',
    requiere: ['p1'],
    paginas: [
      { id: 'alc-tl', ic: '🔄', titulo: 'Transformaciones lineales: teorema de la dimensión', desc: 'Matriz de una TL, núcleo, imagen y teorema de la dimensión.' },
      { id: 'alc-flotante', ic: '🧮', titulo: 'Punto flotante: error de redondeo y cancelación', desc: 'Épsilon de máquina, redondeo, cancelación y absorción.' },
      { id: 'alc-normas', ic: '📏', titulo: 'Normas: Cauchy–Schwarz y equivalencia', desc: 'Normas 1, 2, ∞, equivalencia, normas inducidas y Cauchy–Schwarz.' },
      { id: 'alc-condicion', ic: '⚖️', titulo: 'Número de condición: cotas de error', desc: 'Cuánto amplifica el error relativo un sistema Ax = b.' },
    ],
  },
  {
    id: 'p3', num: 3, etiqueta: 'P3', ic: '🪜', color: '#38d9d9',
    titulo: 'Factorizaciones: LU, Cholesky y QR',
    capitulo: 'Apunte: Cap. 3.5 y 4 · Práctica 3',
    resumen: 'Resolver Ax = b de manera directa: eliminar, ortonormalizar y proyectar.',
    requiere: ['p1', 'p2'],
    paginas: [
      { id: 'alc-lu', ic: '🪜', titulo: 'LU, pivoteo y Cholesky', desc: 'Existencia, unicidad, pivoteo parcial y matrices definidas positivas.' },
      { id: 'alc-ortogonal', ic: '📐', titulo: 'Gram–Schmidt, Householder y QR', desc: 'Gram–Schmidt, proyecciones, Householder y factorización QR.' },
    ],
  },
  {
    id: 'p4', num: 4, etiqueta: 'P4', ic: '🎡', color: '#35c98a',
    titulo: 'Autovalores: diagonalización, Markov y potencia',
    capitulo: 'Apunte: Cap. 5.1–5.3, 5.6, 5.10–5.11 · Práctica 4',
    resumen: 'Direcciones que una matriz solo estira: diagonalización, cadenas de Markov y el método de la potencia.',
    requiere: ['p1', 'p3'],
    paginas: [
      { id: 'alc-autovalores', ic: '🎡', titulo: 'Autovalores y diagonalización', desc: 'Polinomio característico, diagonalización, Fibonacci y ecuaciones diferenciales.' },
      { id: 'alc-markov', ic: '🐭', titulo: 'Procesos de Markov: Perron–Frobenius', desc: 'Matrices estocásticas, estados de equilibrio y límite de Pⁿ.' },
      { id: 'alc-potencia', ic: '⚡', titulo: 'Método de la potencia', desc: 'Autovalor dominante, cociente de Rayleigh y potencia inversa.' },
    ],
  },
  {
    id: 'p5', num: 5, etiqueta: 'P5', ic: '🔭', color: '#ffb454',
    titulo: 'Hermitianas y SVD: Schur y teorema espectral',
    capitulo: 'Apunte: Cap. 5.4–5.5 y 7 · Práctica 5',
    resumen: 'Schur, el teorema espectral y la descomposición en valores singulares: la mejor herramienta de la materia.',
    requiere: ['p4'],
    paginas: [
      { id: 'alc-hermitianas', ic: '🪞', titulo: 'Schur y teorema espectral', desc: 'Matrices hermitianas, unitarias y definidas positivas.' },
      { id: 'alc-svd', ic: '🔭', titulo: 'SVD: valores singulares y Eckart–Young', desc: 'Construcción, norma 2, aproximación de bajo rango y pseudo-inversa.' },
    ],
  },
  {
    id: 'p6', num: 6, etiqueta: 'P6', ic: '📈', color: '#ff6bd6',
    titulo: 'Cuadrados mínimos e interpolación',
    capitulo: 'Apunte: Cap. 8 · Práctica 6',
    resumen: 'Ajustar datos con modelos lineales, interpolar con polinomios y por qué el grado alto puede ser mala idea.',
    requiere: ['p3', 'p5'],
    paginas: [
      { id: 'alc-cuadrados', ic: '📈', titulo: 'Cuadrados mínimos: ecuaciones normales', desc: 'Ecuaciones normales, proyección ortogonal y regresión.' },
      { id: 'alc-interpolacion', ic: '〰️', titulo: 'Interpolación: Vandermonde, Runge y trapecios', desc: 'Vandermonde, fenómeno de Runge y regla de los trapecios.' },
    ],
  },
  {
    id: 'p7', num: 7, etiqueta: 'P7', ic: '🔁', color: '#ff6b7a',
    titulo: 'Métodos iterativos: Jacobi, Gauss–Seidel y gradiente',
    capitulo: 'Apunte: Cap. 6 · Práctica 7',
    resumen: 'Aproximar la solución de Ax = b por iteraciones: Jacobi, Gauss–Seidel, SOR, gradiente y gradiente conjugado.',
    requiere: ['p2', 'p4', 'p5'],
    paginas: [
      { id: 'alc-iterativos', ic: '🔁', titulo: 'Jacobi, Gauss–Seidel y SOR', desc: 'Matriz de iteración, radio espectral y condiciones de convergencia.' },
      { id: 'alc-gradiente', ic: '⛰️', titulo: 'Gradiente y gradiente conjugado', desc: 'Minimizar una cuadrática: descenso máximo y direcciones conjugadas.' },
    ],
  },
];

// 'estudio', 'guia' y 'feedback' tienen versión genérica en el núcleo.
// Mundo: 'estudio' y 'guia' son de Prácticas; 'feedback' (grupo 'extra') es neutral.
export const HERRAMIENTAS = [
  { id: 'estudio', ic: '🗺️', titulo: 'Estudiar por práctica', desc: 'Recetas, mapa de ejercicios y errores comunes de cada práctica.' },
  { id: 'guia', ic: '📖', titulo: 'Ejercicios resueltos', desc: 'Ejercicios de las Prácticas 1 a 7 resueltos paso a paso.' },
  { id: 'feedback', ic: '💬', titulo: 'Tu opinión', desc: 'Contanos qué te sirvió y qué no (hasta 2 imágenes).', grupo: 'extra' },
];
