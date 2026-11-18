// utils/guia-sp2024.js — Segundo parcial 30/11/2024 resuelto.
// Resoluciones paso a paso para solvedExercise(). Los enunciados van inline
// (es un parcial, no una práctica numerada), al estilo de resueltos-data.js.
//
// Temas: (1) iteradas y punto fijo; (2) serie de potencias de coseno;
// (3) imagen Lipschitz de un nulo; (4) convergencia dominada para conjuntos
// decrecientes; (5) existencia de Picard (optativo).

// Enunciados del parcial, para no duplicarlos en cada ejercicio.
const ENUN_1 = 'Sean $E$ un espacio métrico completo y $f:E\\to E$. Probar que si existe $n\\in\\mathbb{N}$ '
  + 'tal que $f^n$ es una contracción, entonces existe un único punto fijo de $f$ en $E$. '
  + '(Sugerencia: probar que si $x$ es punto fijo de $f^n$, entonces $f(x)$ también lo es.)';
const ENUN_2 = 'Probar que $c:\\mathbb{R}\\to\\mathbb{R}$ dada por $c(x)=\\sum_{n=0}^{\\infty}\\tfrac{(-1)^n x^{2n}}{(2n)!}$ '
  + 'está bien definida, es dos veces derivable y verifica $c\'\'+c=0$.';
const ENUN_3 = 'Sea $f:\\mathbb{R}\\to\\mathbb{R}$ una función Lipschitz. Probar que $f(A)$ es medible y que '
  + '$\\mu(f(A))=0$ para todo conjunto nulo $A$.';
const ENUN_4 = 'Sean $f:E_1\\to\\mathbb{R}$ y $(E_n)_{n\\in\\mathbb{N}}$ una sucesión decreciente de subconjuntos medibles. '
  + 'Si existe $n_0$ tal que $f$ restringida a $E_{n_0}$ es integrable, probar que '
  + '$\\displaystyle\\lim_{n\\to\\infty}\\int_{E_n}f\\,d\\mu=\\int_{\\bigcap_{n\\in\\mathbb{N}}E_n}f\\,d\\mu$.';
const ENUN_5 = '(Optativo — Teorema de existencia de Picard.) Sea $f:\\mathbb{R}^d\\to\\mathbb{R}^d$ Lipschitz continua. '
  + 'Dado $y_0\\in\\mathbb{R}^d$, existe $\\varepsilon>0$ tal que el problema $y\'(t)=f(y(t))$, $y(0)=y_0$ '
  + 'tiene solución en $[-\\varepsilon,\\varepsilon]$.';

export const GUIA_SP2024 = [
  {
    fuente: '2º parcial 2024 · Ej. 1', enunciado: ENUN_1,
    idea: 'Como $E$ es completo y $f^n$ es contracción, Banach da un único $x$ con $f^n(x)=x$. La sugerencia muestra que $f(x)$ también es punto fijo de $f^n$ (porque $f$ y $f^n$ conmutan), así que por unicidad $f(x)=x$. La unicidad para $f$ se hereda de la de $f^n$.',
    pasos: [
      {
        idea: 'Existencia de un punto fijo de $f^n$',
        detalle: '<p>Como $E$ es completo y $f^n$ es contracción, por el Teorema de Banach existe un único $x\\in E$ con $f^n(x)=x$.</p>',
      },
      {
        idea: 'Sugerencia: $f(x)$ también lo es',
        detalle: '<p>Como $f$ y $f^n$ conmutan ($f\\circ f^n=f^n\\circ f$), $f^n(f(x))=f(f^n(x))=f(x)$. Es decir, $f(x)$ es también punto fijo de $f^n$.</p>',
      },
      {
        idea: 'Conclusión: $x$ es punto fijo de $f$',
        detalle: '<p>Por la unicidad del punto fijo de $f^n$, debe ser $f(x)=x$. Así $x$ es punto fijo de $f$.</p>',
      },
      {
        idea: 'Unicidad para $f$',
        detalle: '<p>Si $y$ es punto fijo de $f$, por inducción $f^n(y)=y$, así $y$ es punto fijo de $f^n$; por unicidad, $y=x$. Existe un único punto fijo de $f$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Si una iterada $f^n$ es contracción en un completo, $f$ mismo tiene un único punto fijo. La conmutatividad $f\\circ f^n=f^n\\circ f$ es lo que "arrastra" el punto fijo de $f^n$ al de $f$.',
  },
  {
    fuente: '2º parcial 2024 · Ej. 2', enunciado: ENUN_2,
    idea: 'La serie converge absolutamente para cada $x$ por el criterio de la razón, y uniformemente en todo acotado por el criterio $M$ de Weierstrass; eso permite derivar término a término dos veces. Al derivar dos veces la serie se recupera (con signo) la original, de donde $c\'\'+c=0$.',
    pasos: [
      {
        idea: 'Convergencia puntual (bien definida)',
        detalle: '<p>Para $x$ fijo, el cociente de términos consecutivos es $\\tfrac{|a_{n+1}|}{|a_n|}=\\tfrac{x^2}{(2n+2)(2n+1)}\\to0<1$. Por el criterio de D\'Alembert, $\\sum\\tfrac{x^{2n}}{(2n)!}$ converge absolutamente para cada $x$. Entonces $c(x)$ está bien definida para todo $x\\in\\mathbb{R}$.</p>',
      },
      {
        idea: 'Convergencia uniforme en acotados (Weierstrass $M$)',
        detalle: '<p>Fijemos $M>0$ y trabajemos en $[-M,M]$. Allí $\\big|\\tfrac{(-1)^n x^{2n}}{(2n)!}\\big|\\le\\tfrac{M^{2n}}{(2n)!}=:c_n$, y $\\sum c_n<\\infty$ (razón $\\to0$). Por el criterio $M$ de Weierstrass, la serie converge uniformemente en $[-M,M]$.</p>',
      },
      {
        idea: 'Derivación término a término (primera y segunda)',
        detalle: '<p>Las series derivadas $\\sum\\tfrac{(-1)^n(2n)x^{2n-1}}{(2n)!}=\\sum\\tfrac{(-1)^n x^{2n-1}}{(2n-1)!}$ y la segunda derivada $\\sum\\tfrac{(-1)^n x^{2n-2}}{(2n-2)!}$ también convergen uniformemente en acotados (misma razón que tiende a $0$). Por el teorema de derivación bajo la integral de la serie, $c$ es $C^2$ y $c\'$, $c\'\'$ son las sumas de las series derivadas.</p>',
      },
      {
        idea: 'Identificar $c\'\'$ con $-c$',
        detalle: '<p>Reindexando la segunda derivada: $c\'\'(x)=\\sum_{n\\ge1}\\tfrac{(-1)^n x^{2n-2}}{(2n-2)!}=\\sum_{m\\ge0}\\tfrac{(-1)^{m+1}x^{2m}}{(2m)!}=-c(x)$. Por lo tanto $c\'\'+c=0$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La serie define una función $C^2$ (de hecho $C^\\infty$) que satisface $c\'\'+c=0$: es el coseno construido desde su serie de Taylor. La convergencia uniforme en acotados de la serie y sus derivadas (Weierstrass $M$) es lo que legitima derivar término a término.',
  },
  {
    fuente: '2º parcial 2024 · Ej. 3', enunciado: ENUN_3,
    idea: 'Una Lipschitz es continua, así que manda cada intervalo en un intervalo de longitud controlada por la constante. Cubriendo un nulo por intervalos chiquitos, su imagen se cubre por intervalos cuya longitud total se controla; como $\\varepsilon$ es arbitrario, la imagen es nula (y por lo tanto medible).',
    pasos: [
      {
        idea: 'Marco y estrategia',
        detalle: '<p>Sea $K$ la constante de Lipschitz de $f$. Basta probar $\\mu(f(A))=0$, porque todo conjunto nulo es medible (lo que da la medibilidad de $f(A)$). Trabajamos con la medida externa de Lebesgue $\\mu^*$.</p>',
      },
      {
        idea: 'Cubrir $A$ por intervalos',
        detalle: '<p>Dado $\\varepsilon>0$, como $A$ es nulo, existen intervalos abiertos $I_n=(a_n,b_n)$ con $A\\subseteq\\bigcup_n I_n$ y $\\sum_n\\mu(I_n)<\\tfrac\\varepsilon{2K}$.</p>',
      },
      {
        idea: 'Controlar la imagen de cada intervalo',
        detalle: '<p>Para $x\\in I_n$, $|f(x)-f(a_n)|\\le K|x-a_n|<K(b_n-a_n)=K\\,\\mu(I_n)$. Así $f(I_n)\\subseteq\\bigl[f(a_n)-K\\mu(I_n),\\,f(a_n)+K\\mu(I_n)\\bigr]$, un intervalo de longitud $2K\\,\\mu(I_n)$.</p>',
      },
      {
        idea: 'Sumar y concluir',
        detalle: '<p>Como $f(A)\\subseteq\\bigcup_n f(I_n)$, $\\mu^*(f(A))\\le\\sum_n 2K\\,\\mu(I_n)<2K\\cdot\\tfrac\\varepsilon{2K}=\\varepsilon$. Como $\\varepsilon>0$ era arbitrario, $\\mu^*(f(A))=0$, es decir $\\mu(f(A))=0$, y $f(A)$ es medible. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Una función Lipschitz no "infla" los nulos: la imagen de un conjunto de medida cero vuelve a tener medida cero. La constante de Lipschitz controla cuánto crece la longitud de cada intervalo del cubrimiento.',
  },
  {
    fuente: '2º parcial 2024 · Ej. 4', enunciado: ENUN_4,
    idea: 'Reescribir la integral sobre $E_n$ como $\\int f\\,\\chi_{E_n}$ y aplicar el teorema de convergencia dominada: las $f\\,\\chi_{E_n}$ tienden a $f\\,\\chi_E$ (con $E=\\bigcap E_n$) y están dominadas por $|f|\\,\\chi_{E_{n_0}}$, que es integrable por hipótesis.',
    pasos: [
      {
        idea: 'Reescribir con indicatrices',
        detalle: '<p>Sea $E=\\bigcap_{n\\in\\mathbb{N}}E_n$. La integral sobre $E_n$ es $\\int_{E_n}f\\,d\\mu=\\int f\\,\\chi_{E_n}\\,d\\mu$. Definimos $g_n=f\\,\\chi_{E_n}$.</p>',
      },
      {
        idea: 'Convergencia puntual $g_n\\to f\\,\\chi_E$',
        detalle: '<p>Si $x\\in E$, entonces $x\\in E_n$ para todo $n$, así $g_n(x)=f(x)=f\\,\\chi_E(x)$. Si $x\\notin E$, existe $n^*$ con $x\\notin E_n$ para todo $n\\ge n^*$, así que $g_n(x)=0$ a partir de $n^*$, igual que $f\\,\\chi_E(x)=0$. Luego $g_n\\to f\\,\\chi_E$ puntualmente.</p>',
      },
      {
        idea: 'Dominante integrable',
        detalle: '<p>Para $n\\ge n_0$, $E_n\\subseteq E_{n_0}$, así $|g_n|=|f|\\,\\chi_{E_n}\\le|f|\\,\\chi_{E_{n_0}}$. Por hipótesis $f|_{E_{n_0}}$ es integrable, es decir $|f|\\,\\chi_{E_{n_0}}\\in L^1$. Ese es el dominante.</p>',
      },
      {
        idea: 'Convergencia dominada',
        detalle: '<p>Por el teorema de convergencia dominada, $\\lim_n\\int g_n\\,d\\mu=\\int\\lim_n g_n\\,d\\mu$, es decir $\\lim_n\\int_{E_n}f\\,d\\mu=\\int f\\,\\chi_E\\,d\\mu=\\int_E f\\,d\\mu$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La intersección "se come" la integrabilidad vía la convergencia dominada. La hipótesis de que $f$ sea integrable en algún $E_{n_0}$ es la que aporta el dominante $|f|\\,\\chi_{E_{n_0}}$ que controla toda la cola.',
  },
  {
    fuente: '2º parcial 2024 · Ej. 5 (optativo)', enunciado: ENUN_5,
    idea: 'Plantear la EDO como punto fijo del operador integral de Picard $\\varphi(y)(t)=y_0+\\int_0^t f(y(s))\\,ds$ en $C([\\!-\\varepsilon,\\varepsilon\\!],\\mathbb{R}^d)$ con la norma sup. Elegir $\\varepsilon<1/K$ hace que $\\varphi$ sea contracción; Banach da la solución.',
    pasos: [
      {
        idea: 'El espacio y el operador',
        detalle: '<p>Sea $X=C([\\!-\\varepsilon,\\varepsilon\\!],\\mathbb{R}^d)$ con $\\|y\\|_\\infty=\\max_{t}|y(t)|$; es completo. Definimos $\\varphi(y)(t)=y_0+\\int_0^t f(y(s))\\,ds$. Si $y$ es continua, $f\\circ y$ también (composición de continuas), y $\\varphi(y)$ es continua: $\\varphi:X\\to X$ está bien definido.</p>',
      },
      {
        idea: 'Es una contracción para $\\varepsilon$ chico',
        detalle: '<p>Sean $K$ la constante de Lipschitz de $f$ y $y,z\\in X$. Para cada $t$, $|\\varphi(y)(t)-\\varphi(z)(t)|\\le\\int_0^{|t|}|f(y(s))-f(z(s))|\\,ds\\le K\\int_0^{|t|}\\|y-z\\|_\\infty\\,ds\\le K\\varepsilon\\,\\|y-z\\|_\\infty$. Tomando máximo en $t$, $\\|\\varphi(y)-\\varphi(z)\\|_\\infty\\le(K\\varepsilon)\\,\\|y-z\\|_\\infty$.</p>',
      },
      {
        idea: 'Aplicar Banach',
        detalle: '<p>Elegimos $0<\\varepsilon<1/K$, así $K\\varepsilon<1$ y $\\varphi$ es contracción en el completo $X$. Por el teorema de Banach existe un único $y\\in X$ con $\\varphi(y)=y$, es decir $y(t)=y_0+\\int_0^t f(y(s))\\,ds$.</p>',
      },
      {
        idea: 'Concluir',
        detalle: '<p>Esa igualdad integral equivale a $y\'(t)=f(y(t))$ con $y(0)=y_0$ en $[\\!-\\varepsilon,\\varepsilon\\!]$ (por el teorema fundamental del cálculo). $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La existencia local de Picard es un punto fijo de Banach: la EDO se reescribe como una integral, el operador integral contrae en un intervalo chico (factor $K\\varepsilon<1$), y Banach da la solución. Es el arquetipo de "teorema de punto fijo aplicado a un EDP/EDO".',
  },
];
