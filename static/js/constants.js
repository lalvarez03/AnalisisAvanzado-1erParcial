// constants.js — paleta y configuración visual compartida.

export const COLORS = {
  bg: '#0f1421',
  bgSoft: '#161d2e',
  panel: '#1c2438',
  border: '#2c3654',
  grid: '#25304d',
  text: '#e8ecf6',
  textDim: '#9aa6c4',
  accent: '#5b8cff',
  accent2: '#7c5cff',
  ok: '#35c98a',
  warn: '#ffb454',
  err: '#ff6b7a',
  pink: '#ff6bd6',
  cyan: '#38d9d9',
};

// Orden de las páginas (para navegación previa/siguiente y progreso).
export const PAGE_ORDER = [
  'inicio',
  'sup-inf',
  'sucesiones',
  'card-equivalencia',
  'card-numerables',
  'card-hilbert',
  'card-cantor',
  'card-orden',
  'em-distancia',
  'em-topologia',
  'em-acumulacion',
  'em-compacidad',
  'em-cauchy',
  'em-continuidad',
  'em-puntofijo',
  'guia',
  'asistente',
  'quiz',
];

export const PAGE_TITLES = {
  'inicio': 'Presentación',
  'sup-inf': 'Supremos e ínfimos',
  'sucesiones': 'Sucesiones',
  'card-equivalencia': 'Equivalencia de conjuntos',
  'card-numerables': 'Conjuntos finitos y numerables',
  'card-hilbert': 'El Hotel de Hilbert',
  'card-cantor': 'Cantor: ℝ no es numerable',
  'card-orden': 'Orden entre cardinales',
  'em-distancia': 'Distancia y bolas',
  'em-topologia': 'Interior, clausura y frontera',
  'em-acumulacion': 'Acumulación y aislados',
  'em-compacidad': 'Compacidad y Heine-Borel',
  'em-cauchy': 'Cauchy y completitud',
  'em-continuidad': 'Continuidad',
  'em-puntofijo': 'Teorema del punto fijo',
  'guia': 'Guía resuelta',
  'asistente': 'Asistente de ejercicios',
  'quiz': 'Autoevaluación',
};

export const DEFAULT_PAGE = 'inicio';
