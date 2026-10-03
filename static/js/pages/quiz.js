// pages/quiz.js — Autoevaluación por temas (basada en las Prácticas de la materia).

import { el, selectControl } from '../utils/dom.js';
import { pageHeader, callout } from '../utils/page.js';
import { buildQuiz } from '../utils/quiz.js';

const SUP_INF = [
  {
    q: 'Sea $A \\subseteq \\mathbb{R}$ un conjunto no vacío y acotado superiormente. ¿Cuál de las siguientes afirmaciones equivale formalmente a decir que $s = \\sup(A)$?',
    options: [
      '$s$ es cota superior de $A$ y existe $\\varepsilon > 0$ tal que $s - \\varepsilon \\in A$.',
      '$s$ es cota superior de $A$ y para todo $\\varepsilon > 0$ existe $a \\in A$ tal que $s - \\varepsilon < a \\le s$.',
      'Para todo $a \\in A$, $a < s$.',
      '$s \\in A$ y $a \\le s$ para todo $a \\in A$.'
    ],
    answer: 1,
    explain: 'La caracterización operativa del supremo establece que $s = \\sup(A)$ si y solo si $s$ es cota superior y al desplazarnos un $\\varepsilon > 0$ arbitrario hacia la izquierda ($s - \\varepsilon$), siempre se encuentra al menos un elemento de $A$ dentro de la banda. La opción D caracteriza al máximo (no todo supremo pertenece al conjunto).'
  },
  {
    q: 'Considere el conjunto $A = \\{r \\in \\mathbb{Q} : r > 0 \\text{ y } r^2 < 2\\}$. Indique la afirmación correcta:',
    options: [
      '$A$ no está acotado superiormente en $\\mathbb{Q}$.',
      '$A$ posee supremo en $\\mathbb{Q}$ y vale $s = \\sqrt{2}$.',
      '$A$ está acotado superiormente en $\\mathbb{Q}$, pero no posee supremo en $\\mathbb{Q}$.',
      '$A$ posee máximo en $\\mathbb{R}$.'
    ],
    answer: 2,
    explain: '$A$ está acotado superiormente (por ejemplo, por 2). Sin embargo, no existe ningún número racional cuyo cuadrado sea 2, y supeditar la búsqueda de la menor cota superior dentro de $\\mathbb{Q}$ conduce a una contradicción por el Principio de Arquímedes. En $\\mathbb{R}$, en cambio, el Axioma de Completitud garantiza que $\\sup(A) = \\sqrt{2}$, pero como $\\sqrt{2} \\notin A$, no posee máximo.'
  },
  {
    q: 'Sean $A, B \\subseteq \\mathbb{R}$ conjuntos no vacíos y acotados superiormente. ¿Cuál de las siguientes propiedades es FALSA?',
    options: [
      'Si $A \\subseteq B$, entonces $\\sup(A) \\le \\sup(B)$.',
      '$\\inf(-A) = -\\sup(A)$.',
      '$\\sup(A \\cup B) = \\max\\{\\sup(A), \\sup(B)\\}.$',
      '$\\sup(A \\cap B) = \\min\\{\\sup(A), \\sup(B)\\}$ siempre que $A \\cap B \\neq \\emptyset$.'
    ],
    answer: 3,
    explain: 'Si $A = (0, 3)$ y $B = (1, 2) \\cup (4, 5)$, $A \\cap B = (1, 2)$, con $\\sup(A \\cap B) = 2$, mientras que $\\min\\{\\sup(A), \\sup(B)\\} = \\min\\{3, 5\\} = 3$. La intersección puede eliminar los elementos superiores de ambos conjuntos.'
  }
];

const SUCESIONES = [
  {
    q: 'Sea $(a_n)_{n \\in \\mathbb{N}}$ una sucesión real monótona decreciente y acotada inferiormente. ¿A qué valor converge necesariamente $(a_n)$?',
    options: [
      'Al máximo de la sucesión.',
      'A su ínfimo $\\inf\\{a_n : n \\in \\mathbb{N}\\}$.',
      'A su supremo $\\sup\\{a_n : n \\in \\mathbb{N}\\}$.',
      'No se puede asegurar que converja sin saber si es de Cauchy.'
    ],
    answer: 1,
    explain: 'Toda sucesión monótona y acotada es convergente en $\\mathbb{R}$. Si es decreciente y acotada inferiormente, su límite coincide con el ínfimo del conjunto de sus términos $\\inf\\{a_n : n \\in \\mathbb{N}\\}$. Análogamente, si es creciente y acotada superiormente, tiende a su supremo.'
  },
  {
    q: 'Dada la sucesión $a_n = (-1)^n + \\frac{1}{n}$, determine la afirmación correcta:',
    options: [
      'Converge a $0$ porque $\\frac{1}{n} \\to 0$.',
      'Diverge porque las subsucesiones de índices pares e impares convergen a límites distintos ($1$ y $-1$).',
      'Diverge a $+\\infty$.',
      'Es no acotada.'
    ],
    answer: 1,
    explain: 'Si una sucesión es convergente, todas sus subsucesiones deben heredar el mismo límite. Para la subsucesión par, $a_{2k} = 1 + \\frac{1}{2k} \\to 1$, mientras que para la impar, $a_{2k-1} = -1 + \\frac{1}{2k-1} \\to -1$. Al tener dos subsucesiones con límites distintos, la sucesión diverge.'
  },
  {
    q: 'Si la serie numérica $\\sum_{n=1}^\\infty a_n$ converge en $\\mathbb{R}$, se deduce necesariamente que:',
    options: [
      'La sucesión $(a_n)$ es monótona decreciente.',
      '$\\lim_{n \\to \\infty} a_n = 0$.',
      'La serie $\\sum_{n=1}^\\infty |a_n|$ también converge.',
      '$a_n > 0$ para todo $n \\in \\mathbb{N}$.'
    ],
    answer: 1,
    explain: 'La condición necesaria de convergencia establece que si la suma infinita existe, el término general debe tender a cero ($a_n = S_n - S_{n-1} \\to S - S = 0$). La recíproca es falsa (ej. la serie armónica $\\sum \\frac{1}{n}$ diverge aunque $\\frac{1}{n} \\to 0$).'
  }
];

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

const ESPACIOS_TOPOLOGIA = [
  {
    q: 'Para el subconjunto $E = \\mathbb{Z} \\subseteq (\\mathbb{R}, |\\cdot|)$ de los números enteros, señale la opción correcta:',
    options: [
      '$E^\\circ = \\mathbb{Z}$ y $\\partial E = \\varnothing$.',
      '$\\overline{E} = \\mathbb{Z}$, $E\' = \\varnothing$ y $\\partial E = \\mathbb{Z}$.',
      '$E\' = \\mathbb{Z}$ y $E^\\circ = \\varnothing$.',
      '$E$ es un conjunto abierto.'
    ],
    answer: 1,
    explain: 'Para cada entero $n \\in \\mathbb{Z}$, tomando una bola $B(n, r) = (n-r, n+r)$ con $r < 1$, se tiene $B(n, r) \\cap \\mathbb{Z} = \\{n\\}$. Por ende, no contiene puntos interiores ($E^\\circ = \\varnothing$), no tiene puntos de acumulación ($E\' = \\varnothing$, todos sus puntos son aislados), su clausura es $\\overline{E} = E \\cup E\' = \\mathbb{Z}$ (es cerrado) y toda bola interseca tanto a $\\mathbb{Z}$ como a $\\mathbb{Z}^c$, haciendo que $\\partial \\mathbb{Z} = \\mathbb{Z}$.'
  },
  {
    q: 'Si $d_1$ y $d_2$ son dos métricas equivalentes sobre un conjunto $M$, ¿cuál de las siguientes propiedades NO se preserva necesariamente al cambiar de $d_1$ a $d_2$?',
    options: [
      'Los conjuntos abiertos y cerrados.',
      'La convergencia de sucesiones.',
      'La propiedad de que un conjunto sea acotado.',
      'Los puntos de acumulación y frontera de un subconjunto.'
    ],
    answer: 2,
    explain: 'Dos métricas equivalentes inducen exactamente la misma topología (mismos abiertos, cerrados, límites y puntos de acumulación). Sin embargo, la propiedad de acotación de un conjunto no se preserva en general bajo métricas equivalentes (por ejemplo, mediante la métrica acotada $d_2(x,y) = \\frac{d_1(x,y)}{1+d_1(x,y)}$).'
  },
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
    q: '¿Cuál de estas NO es una métrica en $\\mathbb{R}$?',
    options: ['$d(x,y)=|x-y|$', '$d(x,y)=\\sqrt{|x-y|}$', '$d(x,y)=(x-y)^2$', 'la métrica discreta'],
    answer: 2,
    explain: '$(x-y)^2$ falla la desigualdad triangular (Práctica 3, Ej. 2). Por ejemplo con $x=0,z=2,y=1$: $4 \\not\\le 1+1$.',
  }
];

const COMPACIDAD_COMPLETITUD = [
  {
    q: 'En $(\\mathbb{R}^n, d_2)$, un subconjunto $K \\subseteq \\mathbb{R}^n$ es compacto si y solo si:',
    options: [
      'Es abierto y acotado.',
      'Es cerrado y acotado (Teorema de Heine-Borel).',
      'Es numerable y acotado.',
      'Toda función continua $f: K \\to \\mathbb{R}$ es inyectiva.'
    ],
    answer: 1,
    explain: 'El Teorema de Heine-Borel en dimensiones finitas ($\\mathbb{R}^n$) establece que un conjunto es compacto si y solo si es cerrado y acotado. En espacios métricos generales, la definición equivalente es que toda sucesión en $K$ posee una subsucesión convergente a un punto de $K$.'
  },
  {
    q: 'Sea $(M, d)$ un espacio métrico completo y $f: M \\to M$ una contracción (es decir, $d(f(x), f(y)) \\le \\alpha d(x,y)$ con $0 \\le \\alpha < 1$). Indique la conclusión del teorema:',
    options: [
      '$f$ tiene infinitos puntos fijos.',
      '$f$ posee un único punto fijo $x^* \\in M$, alcanzable como límite de la iteración $x_n = f(x_{n-1})$.',
      '$f$ es biyectiva y su inversa es continua.',
      '$M$ debe ser necesariamente compacto.'
    ],
    answer: 1,
    explain: 'El Teorema de Banach garantiza la existencia y unicidad de un punto fijo $x^* = f(x^*)$ en espacios completos. La prueba se construye demostrando que la sucesión iterada $x_n = f(x_{n-1})$ es de Cauchy en $M$, y por completitud, converge al punto fijo.'
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
    q: 'Caracterización topológica de continuidad: $f$ es continua si y sólo si…',
    options: [
      'la imagen de todo abierto es abierta',
      'la preimagen de todo abierto es abierta',
      'es monótona',
      'la imagen de todo cerrado es cerrada',
    ],
    answer: 1,
    explain: 'La condición correcta es sobre la PREimagen: $f^{-1}(U)$ abierto para todo abierto $U$ (equivalente a preimagen de cerrado cerrada).',
  }
];

export function renderQuiz(root) {
  root.appendChild(pageHeader(
    'Autoevaluación',
    'Preguntas de opción múltiple para chequear los conceptos. Basadas en las Prácticas de la materia. '
    + 'Elegí el bloque y respondé; cada opción muestra una explicación.'
  ));

  const sel = selectControl({
    label: 'Bloque de preguntas',
    options: [
      { value: 'sup_inf', label: '1. Supremos e Ínfimos (3 preguntas)' },
      { value: 'sucesiones', label: '2. Sucesiones y Series (3 preguntas)' },
      { value: 'card', label: '3. Cardinalidad (6 preguntas)' },
      { value: 'em', label: '4. Espacios Métricos y Topología (5 preguntas)' },
      { value: 'compac', label: '5. Compacidad, Completitud y Continuidad (4 preguntas)' }
    ],
    value: 'sup_inf',
  });
  root.appendChild(el('div', { class: 'controls' }, [sel.wrap]));

  const holder = el('div', {});
  root.appendChild(holder);

  function render() {
    holder.innerHTML = '';
    const val = sel.select.value;

    let data = SUP_INF;
    let title = 'Supremos e Ínfimos';

    if (val === 'sucesiones') {
      data = SUCESIONES;
      title = 'Sucesiones y Series';
    } else if (val === 'card') {
      data = CARDINALIDAD;
      title = 'Cardinalidad';
    } else if (val === 'em') {
      data = ESPACIOS_TOPOLOGIA;
      title = 'Espacios Métricos y Topología';
    } else if (val === 'compac') {
      data = COMPACIDAD_COMPLETITUD;
      title = 'Compacidad, Completitud y Continuidad';
    }

    const quiz = buildQuiz(data, { title });
    holder.appendChild(quiz);
    if (window.MathJax?.typesetPromise) window.MathJax.typesetPromise([holder]);
  }

  sel.select.addEventListener('change', render);
  render();

  root.appendChild(callout('tip', 'Seguí practicando',
    'Estas preguntas cubren lo esencial, pero las demostraciones completas están en las prácticas. '
    + 'Reforzá con la guía resuelta y los ejercicios asistidos para mayor profundidad.'
  ));
}