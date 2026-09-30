// pages/quiz.js — Autoevaluación por temas (basada en Prácticas 2 y 3).

import { el, selectControl } from '../utils/dom.js';
import { pageHeader, callout } from '../utils/page.js';
import { buildQuiz } from '../utils/quiz.js';

const CARDINALIDAD = [
  {
    q: '¿Cuál es el cardinal de $\\mathbb{Z} \\times \\mathbb{N}$?',
    options: ['Finito', '$\\aleph_0$ (numerable)', '$c$ (el continuo)', '$2^{c}$'],
    answer: 1,
    explain: 'Producto de dos conjuntos numerables es numerable. $\\mathbb{Z}\\times\\mathbb{N} \\sim \\mathbb{N}$.',
  },
  {
    q: '¿Cuál es el cardinal del conjunto de los irracionales?',
    options: ['$\\aleph_0$', 'Finito', '$c$', 'Depende'],
    answer: 2,
    explain: 'Si fueran numerables, $\\mathbb{R} = \\mathbb{Q} \\cup \\text{Irr}$ sería numerable. Como $\\mathbb{R}$ no lo es, los irracionales tienen cardinal $c$.',
  },
  {
    q: 'Una unión numerable de conjuntos numerables es…',
    options: ['siempre no numerable', 'numerable (contable)', 'finita', 'de cardinal $c$'],
    answer: 1,
    explain: 'Resultado clásico (Práctica 2, Ej. 6): $\\bigcup_{n} A_n$ con cada $A_n$ contable es contable.',
  },
  {
    q: 'Si $\\#A = n$, ¿cuánto vale $\\#\\mathcal{P}(A)$?',
    options: ['$n$', '$2n$', '$n^2$', '$2^n$'],
    answer: 3,
    explain: 'Cada subconjunto se codifica con una función $A \\to \\{0,1\\}$, así que $\\mathcal{P}(A)\\sim\\{0,1\\}^A$ y $\\#\\mathcal{P}(A)=2^n$.',
  },
  {
    q: '¿Cuál es el cardinal de $\\mathbb{R}^k$ para $k \\in \\mathbb{N}$?',
    options: ['$c^k$ y por eso mayor que $c$', '$\\aleph_0$', '$c$ para todo $k$', '$2^{c}$'],
    answer: 2,
    explain: 'Agregar dimensiones no agranda el continuo: $\\#\\mathbb{R}^k = c$ (Práctica 2, Ej. 14).',
  },
  {
    q: 'El argumento diagonal de Cantor prueba que…',
    options: [
      '$\\mathbb{Q}$ no es numerable',
      'ninguna lista $x_1,x_2,\\dots$ agota $[0,1)$',
      '$\\mathbb{N} \\sim \\mathbb{R}$',
      'todo conjunto infinito es numerable',
    ],
    answer: 1,
    explain: 'Construye un número que difiere de cada $x_k$ en el dígito $k$, así que no está en la lista: $[0,1)$ es no numerable.',
  },
];

const ESPACIOS = [
  {
    q: 'En $\\mathbb{R}$, ¿cuál es el interior de $\\mathbb{Q}$?',
    options: ['$\\mathbb{Q}$', '$\\varnothing$', '$\\mathbb{R}$', 'los irracionales'],
    answer: 1,
    explain: 'Todo intervalo contiene irracionales, así que ningún punto de $\\mathbb{Q}$ es interior: $\\mathbb{Q}^\\circ=\\varnothing$. Además $\\overline{\\mathbb{Q}}=\\mathbb{R}$.',
  },
  {
    q: 'El conjunto $\\{1/n : n \\in \\mathbb{N}\\}$ (sin el 0)…',
    options: [
      'es cerrado',
      'es abierto',
      'no es cerrado: le falta el punto de acumulación 0',
      'es compacto',
    ],
    answer: 2,
    explain: '$0$ es punto de acumulación pero no pertenece, así que no contiene a su derivado: no es cerrado. Agregando $\\{0\\}$ sí es cerrado (y compacto).',
  },
  {
    q: 'Por el teorema de Heine-Borel, en $\\mathbb{R}^n$ un conjunto es compacto si y sólo si es…',
    options: ['abierto y acotado', 'cerrado y acotado', 'cerrado', 'acotado'],
    answer: 1,
    explain: 'Heine-Borel: compacto $\\iff$ cerrado y acotado (en $\\mathbb{R}^n$). El intervalo $(0,1]$ no es compacto porque no es cerrado.',
  },
  {
    q: '¿Cuál de estas NO es una métrica en $\\mathbb{R}$?',
    options: ['$d(x,y)=|x-y|$', '$d(x,y)=\\sqrt{|x-y|}$', '$d(x,y)=(x-y)^2$', 'la métrica discreta'],
    answer: 2,
    explain: '$(x-y)^2$ falla la desigualdad triangular (Práctica 3, Ej. 2). Por ejemplo con $x=0,z=2,y=1$: $4 \\not\\le 1+1$.',
  },
  {
    q: 'Una sucesión de Cauchy en $\\mathbb{Q}$ que “apunta” a $\\sqrt{2}$…',
    options: [
      'converge en $\\mathbb{Q}$',
      'no converge en $\\mathbb{Q}$: muestra que $\\mathbb{Q}$ no es completo',
      'no es de Cauchy',
      'no existe',
    ],
    answer: 1,
    explain: 'Es de Cauchy pero su límite $\\sqrt2 \\notin \\mathbb{Q}$. Por eso $(\\mathbb{Q},|\\cdot|)$ no es completo; $\\mathbb{R}$ sí.',
  },
  {
    q: 'El teorema del punto fijo de Banach requiere que $T$ sea…',
    options: [
      'sólo continua',
      'una contracción en un espacio completo',
      'biyectiva',
      'acotada',
    ],
    answer: 1,
    explain: 'Contracción ($k<1$) + espacio completo garantiza punto fijo único y convergencia de la iteración. Sólo continuidad no alcanza.',
  },
  {
    q: 'Caracterización topológica de continuidad: $f$ es continua si y sólo si…',
    options: [
      'la imagen de todo abierto es abierta',
      'la preimagen de todo abierto es abierta',
      'es monótona',
      'la imagen de todo cerrado es cerrada',
    ],
    answer: 1,
    explain: 'La condición correcta es sobre la PREimagen: $f^{-1}(U)$ abierto para todo abierto $U$ (equivalente a preimagen de cerrado cerrada).',
  },
];

export function renderQuiz(root) {
  root.appendChild(pageHeader(
    'Autoevaluación',
    'Preguntas de opción múltiple para chequear los conceptos. Basadas en las Prácticas 2 y 3 de la materia. '
    + 'Elegí el bloque y respondé; cada opción muestra una explicación.'
  ));

  const sel = selectControl({
    label: 'Bloque de preguntas',
    options: [
      { value: 'card', label: 'Cardinalidad (6 preguntas)' },
      { value: 'em', label: 'Espacios métricos (7 preguntas)' },
    ],
    value: 'card',
  });
  root.appendChild(el('div', { class: 'controls' }, [sel.wrap]));

  const holder = el('div', {});
  root.appendChild(holder);

  function render() {
    holder.innerHTML = '';
    const isCard = sel.select.value === 'card';
    const quiz = buildQuiz(isCard ? CARDINALIDAD : ESPACIOS, {
      title: isCard ? 'Cardinalidad' : 'Espacios métricos',
    });
    holder.appendChild(quiz);
    if (window.MathJax?.typesetPromise) window.MathJax.typesetPromise([holder]);
  }

  sel.select.addEventListener('change', render);
  render();

  root.appendChild(callout('tip', 'Seguí practicando',
    'Estas preguntas cubren lo esencial, pero las demostraciones completas están en las prácticas. '
    + 'Reforzá con los ejercicios de supremos/sucesiones (Práctica 1) que son la base de todo lo demás.'
  ));
}
