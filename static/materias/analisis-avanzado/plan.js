// materias/analisis-avanzado/plan.js — plan de estudio de Análisis Avanzado.
// Las unidades siguen el orden de las guías de ejercicios (Prácticas 1 a 7) y de la teórica 1C2026.
// El núcleo (js/core/materia.js) deriva de acá el orden de páginas, los títulos y el progreso.
// No importa nada para evitar ciclos.

export const UNIDADES = [
  {
    id: 'p1', num: 1, etiqueta: 'P1', ic: '📏', color: '#5b8cff',
    titulo: 'Supremos y sucesiones',
    capitulo: 'Teórica: Cap. 1 y 2 · Práctica 1',
    resumen: 'La base de todo: el axioma de completitud de ℝ y los límites de sucesiones.',
    requiere: [],
    paginas: [
      { id: 'sup-inf', ic: '📏', titulo: 'Supremos e ínfimos', desc: 'Cotas, sup/ínf, completitud, Arquímedes, densidad.' },
      { id: 'sucesiones', ic: '📈', titulo: 'Sucesiones', desc: 'Límite ε–n₀, monótonas, subsucesiones, series.' },
    ],
  },
  {
    id: 'p2', num: 2, etiqueta: 'P2', ic: '♾️', color: '#7c5cff',
    titulo: 'Cardinalidad',
    capitulo: 'Teórica: Cap. 3 · Práctica 2',
    resumen: 'Cuántos elementos tiene un conjunto infinito: ℵ₀, el continuo y la jerarquía de infinitos.',
    requiere: ['p1'],
    paginas: [
      { id: 'card-equivalencia', ic: '🔗', titulo: 'Equivalencia de conjuntos', desc: 'Biyecciones y "mismo tamaño".' },
      { id: 'card-numerables', ic: '🔢', titulo: 'Finitos y numerables', desc: 'ℕ, ℤ, ℚ y uniones numerables.' },
      { id: 'card-hilbert', ic: '🏨', titulo: 'Hotel de Hilbert', desc: 'La intuición del infinito, jugando.' },
      { id: 'card-cantor', ic: '🌀', titulo: 'Cantor: ℝ no es numerable', desc: 'El argumento diagonal.' },
      { id: 'card-orden', ic: '📊', titulo: 'Orden entre cardinales', desc: 'CSB, partes de un conjunto, 2^ℕ.' },
    ],
  },
  {
    id: 'p3', num: 3, etiqueta: 'P3', ic: '📐', color: '#38d9d9',
    titulo: 'Espacios métricos',
    capitulo: 'Teórica: Cap. 4 · Práctica 3',
    resumen: 'Distancia abstracta, bolas, topología y completitud: el lenguaje del resto de la materia.',
    requiere: ['p1'],
    paginas: [
      { id: 'em-distancia', ic: '📐', titulo: 'Distancia y bolas', desc: 'Métricas d₁, d₂, d∞, discreta; equivalencia.' },
      { id: 'em-topologia', ic: '🧭', titulo: 'Interior, clausura, frontera', desc: 'Abiertos, cerrados y distancia a un conjunto.' },
      { id: 'em-acumulacion', ic: '🎯', titulo: 'Acumulación y aislados', desc: 'Conjunto derivado, sucesiones y clausura.' },
      { id: 'em-cauchy', ic: '➰', titulo: 'Cauchy y completitud', desc: 'Sucesiones de Cauchy, ℝⁿ completo, encaje de Cantor.' },
    ],
  },
  {
    id: 'p4', num: 4, etiqueta: 'P4', ic: '〰️', color: '#35c98a',
    titulo: 'Funciones continuas',
    capitulo: 'Teórica: Cap. 5 · Práctica 4',
    resumen: 'Continuidad ε–δ, por sucesiones y por preimágenes; continuidad uniforme y Lipschitz.',
    requiere: ['p3'],
    paginas: [
      { id: 'em-continuidad', ic: '〰️', titulo: 'Continuidad', desc: 'ε–δ, secuencial, abiertos, uniforme, homeomorfismos.' },
    ],
  },
  {
    id: 'p5', num: 5, etiqueta: 'P5', ic: '🫧', color: '#ffb454',
    titulo: 'Compacidad y punto fijo',
    capitulo: 'Teórica: Cap. 6 · Práctica 5',
    resumen: 'Cuándo un conjunto "no se escapa", y el teorema de Banach para contracciones.',
    requiere: ['p3', 'p4'],
    paginas: [
      { id: 'em-compacidad', ic: '🫧', titulo: 'Compacidad · Heine–Borel', desc: 'Sucesiones, cubrimientos y consecuencias.' },
      { id: 'em-puntofijo', ic: '📍', titulo: 'Teorema del punto fijo', desc: 'Contracciones, Banach, Bolzano y variantes.' },
    ],
  },
  {
    id: 'p6', num: 6, etiqueta: 'P6', ic: '📦', color: '#ff6bd6',
    titulo: 'Espacios normados',
    capitulo: 'Práctica 6',
    resumen: 'Espacios vectoriales con norma: dimensión finita vs. infinita y operadores lineales.',
    requiere: ['p3', 'p4', 'p5'],
    paginas: [
      { id: 'em-normados', ic: '📦', titulo: 'Espacios normados', desc: 'Normas, equivalencia, ℓ∞, ℓ², operadores acotados.' },
    ],
  },
  {
    id: 'p7', num: 7, etiqueta: 'P7', ic: '🌊', color: '#ff6b7a',
    titulo: 'Sucesiones de funciones',
    capitulo: 'Teórica: Cap. 7 · Práctica 7',
    resumen: 'Convergencia puntual vs. uniforme, y qué propiedades sobreviven al límite.',
    requiere: ['p4', 'p5'],
    paginas: [
      { id: 'em-funciones', ic: '🌊', titulo: 'Sucesiones de funciones', desc: 'Puntual, uniforme, series y criterio M.' },
    ],
  },
];

// Herramientas de práctica (no pertenecen a una unidad). Los ids 'estudio', 'guia' y 'feedback'
// tienen implementación genérica en el núcleo; 'asistente' y 'quiz' son propios de esta materia.
export const HERRAMIENTAS = [
  { id: 'quiz',      ic: '✍️',  titulo: 'Autoevaluación',       desc: 'Preguntas para ponerte a prueba.' },
  { id: 'asistente', ic: '🧩',  titulo: 'Asistente de ejercicios', desc: 'Armá demostraciones arrastrando los pasos.' },
  { id: 'estudio',   ic: '🗺️', titulo: 'Estudiar por práctica', desc: 'Recetas, mapa de ejercicios y errores comunes de cada guía.' },
  { id: 'guia',      ic: '📖',  titulo: 'Guía resuelta',         desc: 'Todos los ejercicios de P1–P7 resueltos paso a paso.' },
  { id: 'feedback',  ic: '💬',  titulo: 'Tu opinión',            desc: 'Contanos qué te sirvió y qué no (hasta 2 imágenes).', grupo: 'extra' },
];
