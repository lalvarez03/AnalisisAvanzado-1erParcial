// utils/guia-p5.js — Práctica 5 resuelta (Compacidad, Teoremas de punto fijo).
// Resoluciones paso a paso para el componente solvedExercise().
// En ℝ usamos Heine–Borel (compacto ⟺ cerrado y acotado) y la compacidad secuencial
// (toda sucesión tiene subsucesión convergente), que en métricos son equivalentes.

import { consigna } from './ejercicios.js';

const E = (n) => consigna(5, n);

export const GUIA_P5 = [
  {
    fuente: 'Práctica 5 · Ej. 1', enunciado: E(1),
    idea: 'En ℝ vale Heine–Borel: $K$ es compacto sii es cerrado y acotado. Si no, alcanza con exhibir una sucesión en $K$ sin subsucesión convergente (en $K$).',
    pasos: [
      {
        idea: '(a) $K=\\{\\tfrac1n:n\\in\\mathbb{N}\\}$ — NO compacto',
        detalle: '<p>Es acotado pero <strong>no cerrado</strong>: $0$ es punto de acumulación y $0\\notin K$. Como sucesión testigo, $(\\tfrac1n)$ vive en $K$ y toda subsucesión suya tiende a $0\\notin K$; luego no tiene subsucesión convergente <em>en $K$</em>.</p>',
      },
      {
        idea: '(b) $K=\\mathbb{N}$ — NO compacto',
        detalle: '<p>No es acotado. La sucesión $x_n=n$ no tiene subsucesión convergente: cualquier subsucesión diverge a $+\\infty$.</p>',
      },
      {
        idea: '(c) $K=\\mathbb{Q}\\cap[0,1]$ — NO compacto',
        detalle: '<p>Acotado pero no cerrado: $\\overline K=[0,1]$. Tomamos $x_n=\\lfloor 2^n\\alpha\\rfloor/2^n$ con $\\alpha=\\tfrac{\\sqrt2}{2}\\in(0,1)$ irracional. Cada $x_n\\in K$ y $x_n\\to\\alpha\\notin K$; toda subsucesión también tiende a $\\alpha$, fuera de $K$.</p>',
      },
      {
        idea: '(d) $K=[0,1]$ — compacto',
        detalle: '<p>Es cerrado y acotado, luego compacto por Heine–Borel. Por definición secuencial: toda sucesión en $[0,1]$ está acotada, por Bolzano–Weierstrass tiene subsucesión convergente (a un $\\ell\\in\\mathbb{R}$); como $[0,1]$ es cerrado, $\\ell\\in[0,1]$. $\\blacksquare$</p>',
      },
      {
        idea: '(e) $K=\\{1,\\tfrac12,\\tfrac23,\\tfrac34,\\dots\\}$ — compacto',
        detalle: '<p>Sea $a_k=\\tfrac{k}{k+1}$; entonces $a_k\\to 1$ y $1\\in K$, de modo que $K=\\{a_k:k\\ge1\\}\\cup\\{1\\}$ es una sucesión junto con su límite: es cerrado (su único punto de acumulación, $1$, ya está en $K$) y acotado ($K\\subseteq[\\tfrac12,1]$). Por Heine–Borel, compacto. Por definición: una sucesión en $K$ o repite algún valor infinitas veces (subsucesión constante) o toma infinitos valores distintos $a_{k_j}$ con $k_j\\to\\infty$, y entonces $a_{k_j}\\to1\\in K$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Los compactos son (d) y (e). La pauta es Heine–Borel en ℝ: cerrado + acotado. Cuando falla, la sucesión testigo "se escapa" hacia un punto de acumulación que no está en $K$ (casos a, c) o hacia $\\pm\\infty$ (caso b).',
  },
  {
    fuente: 'Práctica 5 · Ej. 2', enunciado: E(2),
    idea: 'Compacto en ℝ ⟹ acotado (existe $\\sup K$) y cerrado (el $\\sup$ y el $\\inf$ pertenecen a $K$).',
    pasos: [
      {
        idea: 'Existencia de $\\sup$ y $\\inf$',
        detalle: '<p>Como $K$ es compacto, es acotado; como $K\\ne\\varnothing$, por el axioma de completitud existen $s=\\sup K$ e $i=\\inf K$.</p>',
      },
      {
        idea: 'El $\\sup$ está en $K$',
        detalle: '<p>Por la caracterización $\\varepsilon$ del supremo, para cada $n$ existe $a_n\\in K$ con $s-\\tfrac1n<a_n\\le s$. Entonces $a_n\\to s$. Como $K$ es cerrado (compacto ⟹ cerrado), $s\\in K$, y $s=\\max K$.</p>',
      },
      {
        idea: 'El $\\inf$ está en $K$',
        detalle: '<p>Análogamente, existe $b_n\\in K$ con $i\\le b_n<i+\\tfrac1n$, así que $b_n\\to i$; por cerradura $i\\in K$, e $i=\\min K$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Todo compacto no vacío de ℝ alcanza su supremo y su ínfimo: $\\max K=\\sup K\\in K$ y $\\min K=\\inf K\\in K$. La cerradura es lo que impide que el extremo "se escape".',
  },
  {
    fuente: 'Práctica 5 · Ej. 3', enunciado: E(3),
    idea: 'Ver $S$ y $P$ como imágenes del compacto $K\\times K$ bajo las funciones continuas $(x,y)\\mapsto x+y$ y $(x,y)\\mapsto xy$, y usar que la imagen continua de un compacto es compacta.',
    pasos: [
      {
        idea: '$K\\times K$ es compacto',
        detalle: '<p>Como $K$ es compacto en ℝ, es cerrado y acotado; entonces $K\\times K$ es cerrado y acotado en $\\mathbb{R}^2$, luego compacto por Heine–Borel.</p>',
      },
      {
        idea: 'Suma $S=+(K\\times K)$',
        detalle: '<p>La función $\\sigma(x,y)=x+y$ es continua (polinomio). $S=\\sigma(K\\times K)$ es la imagen de un compacto por una continua, luego compacta.</p>',
      },
      {
        idea: 'Producto $P=\\cdot(K\\times K)$',
        detalle: '<p>Análogamente $\\pi(x,y)=xy$ es continua y $P=\\pi(K\\times K)$, imagen de un compacto por una continua, luego compacta. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La suma y el producto de un compacto $K$ consigo mismo son compactos. La herramienta es "imagen continua de compacto es compacta"; $K\\times K$ es compacto por Heine–Borel en $\\mathbb{R}^2$.',
  },
  {
    fuente: 'Práctica 5 · Ej. 4', enunciado: E(4),
    idea: 'La intersección es un subconjunto cerrado del compacto $F_{i_0}$, y un cerrado contenido en un compacto es compacto.',
    pasos: [
      {
        idea: 'La intersección es cerrada',
        detalle: '<p>Cada $F_i$ es cerrado, y la intersección arbitraria de cerrados es cerrada: $F:=\\bigcap_{i\\in I}F_i$ es cerrado.</p>',
      },
      {
        idea: 'Está contenida en un compacto',
        detalle: '<p>Como $F\\subseteq F_{i_0}$ y $F_{i_0}$ es compacto, $F$ es un subconjunto cerrado de un compacto. Un cerrado dentro de un compacto es compacto (toda sucesión en $F$ está en $F_{i_0}$, tiene subsucesión convergente a un punto de $F_{i_0}$; el límite está en $F$ por ser $F$ cerrado). $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Basta que <em>uno solo</em> de los cerrados sea compacto para que toda la intersección (aunque sea sobre un índice arbitrario) sea compacta.',
  },
  {
    fuente: 'Práctica 5 · Ej. 5', enunciado: E(5),
    idea: 'En la métrica discreta todo singleton es abierto; un compacto no puede admitir un cubrimiento por singletons sin subcubrimiento finito, salvo que sea finito.',
    pasos: [
      {
        idea: 'Finito ⟹ compacto',
        detalle: '<p>Si $K$ es finito, todo cubrimiento por abiertos cubre cada punto con algún abierto; eligiendo uno por punto se obtiene un subcubrimiento finito.</p>',
      },
      {
        idea: 'Infinito $\\Rightarrow$ no compacto (por sucesiones)',
        detalle: '<p>Si $K$ es infinito, hay una sucesión $(x_n)\\subseteq K$ de términos todos distintos. Para $n\\ne m$, $\\delta(x_n,x_m)=1$, así que ninguna subsucesión es de Cauchy y, por lo tanto, ninguna converge. Luego $K$ no es compacto.</p>',
      },
      {
        idea: 'Lo mismo, por cubrimientos',
        detalle: '<p>En la discreta, $\\{x\\}=B(x,\\tfrac12)$ es abierto para cada $x\\in E$. Si $K$ es infinito, $\\mathcal{U}=\\{\\{x\\}:x\\in K\\}$ es un cubrimiento abierto de $K$ y cada abierto cubre un solo punto: ningún subconjunto finito de $\\mathcal{U}$ cubre a $K$. Luego $K$ no es compacto. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'En un espacio métrico discreto, los compactos son exactamente los subconjuntos finitos. La discretitud convierte cada punto en su propio abierto, lo que impide la compacidad salvo en cantidad finita.',
  },
  {
    fuente: 'Práctica 5 · Ej. 6', enunciado: E(6),
    idea: 'Con la definición secuencial: elegir $x_n\\in F_n$, extraer una subsucesión convergente y ver que su límite cae en todos los $F_m$ (porque son cerrados y la subsucesión eventualmente vive en $F_m$). Alternativa con cubrimientos al final.',
    pasos: [
      {
        idea: 'Prueba secuencial: elegir un punto en cada $F_n$',
        detalle: '<p>Como cada $F_n\\ne\\varnothing$, elegimos $x_n\\in F_n$. Por compacidad existe una subsucesión $x_{n_k}\\to x\\in E$.</p>',
      },
      {
        idea: 'El límite está en todos los $F_m$',
        detalle: '<p>Fijemos $m$. Para $k$ con $n_k\\ge m$ se tiene $x_{n_k}\\in F_{n_k}\\subseteq F_m$ (decrecientes). Entonces $(x_{n_k})_{k\\ge k_0}\\subseteq F_m$ converge a $x$, y como $F_m$ es cerrado, $x\\in F_m$. Esto vale para todo $m$, así que $x\\in\\bigcap_m F_m\\neq\\varnothing$. $\\blacksquare$</p>',
      },
      {
        idea: 'Prueba alternativa por cubrimientos: suponer intersección vacía',
        detalle: '<p>Supongamos $\\bigcap_n F_n=\\varnothing$. Tomando complementos, $E=E\\setminus\\bigcap_n F_n=\\bigcup_n(E\\setminus F_n)$. Como $F_n$ es cerrado, $E\\setminus F_n$ es abierto: es un cubrimiento abierto de $E$.</p>',
      },
      {
        idea: 'Usar la monotonía',
        detalle: '<p>Como $F_{n+1}\\subseteq F_n$, los complementos cumplen $E\\setminus F_n\\subseteq E\\setminus F_{n+1}$: la familia es <em>creciente</em>.</p>',
      },
      {
        idea: 'Subcubrimiento finito y contradicción',
        detalle: '<p>Por compacidad existe $N$ con $E=\\bigcup_{n=1}^N(E\\setminus F_n)$. Por ser creciente, $\\bigcup_{n=1}^N(E\\setminus F_n)=E\\setminus F_N$, así que $E=E\\setminus F_N$, es decir $F_N=\\varnothing$. Contradicción con que todos los $F_n$ son no vacíos. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'En un compacto, una sucesión decreciente de cerrados no vacíos tiene intersección no vacía. Es la versión "continua" del teorema de encaje de Cantor (sin pedir $\\operatorname{diam}\\to0$).',
  },
  {
    fuente: 'Práctica 5 · Ej. 7', enunciado: E(7),
    idea: 'Las que afirman "intersección/cerrado/contenido en compacto" tienden a ser verdaderas; las de "unión/numerable" se refutan con conjuntos que escapen al infinito o no sean cerrados.',
    pasos: [
      {
        idea: '(a) Unión numerable — FALSA',
        detalle: '<p>$K_n=\\{n\\}$ es compacto (es finito), pero $\\bigcup_n K_n=\\mathbb{N}$ no es acotado, luego no compacto.</p>',
      },
      {
        idea: '(b) Intersección numerable — VERDADERA',
        detalle: '<p>$\\bigcap_n K_n\\subseteq K_1$, que es compacto; la intersección de cerrados es cerrada. Un cerrado dentro de un compacto es compacto.</p>',
      },
      {
        idea: '(c) $A\\cap K$ compacto — FALSA',
        detalle: '<p>$K=[0,1]$, $A=\\mathbb{Q}$. Entonces $A\\cap K=\\mathbb{Q}\\cap[0,1]$, que no es cerrado (su clausura es $[0,1]$), luego no compacto.</p>',
      },
      {
        idea: '(d) Finito ⟹ compacto — VERDADERA',
        detalle: '<p>Toda sucesión en un finito repite un valor, dando una subsucesión constante (convergente).</p>',
      },
      {
        idea: '(e) Numerable ⟹ compacto — FALSA',
        detalle: '<p>$\\mathbb{N}$ es numerable pero no compacto (no acotado).</p>',
      },
      {
        idea: '(f) Decreciente de cerrados no vacíos con intersección no vacía — FALSA',
        detalle: '<p>En $\\mathbb{R}$, $F_n=[n,+\\infty)$ es cerrado, no vacío y decreciente, pero $\\bigcap_n F_n=\\varnothing$. Hace falta compacidad (cf. Ej. 6). $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Verdaderas: (b) y (d). Falsas: (a), (c), (e) y (f). La intersección de compactos hereda la compacidad por inclusión en uno de ellos; la unión y la intersección con un arbitrario la pierden (no preservan ni acotación ni cerradura).',
  },
  {
    fuente: 'Práctica 5 · Ej. 8', enunciado: E(8),
    idea: 'Para cada conjunto no compacto, armar un cubrimiento abierto "un punto por abierto" (o que deje siempre puntos sin cubrir) de modo que ningún finito alcance.',
    pasos: [
      {
        idea: '(a) $K=\\{\\tfrac1n\\}$',
        detalle: '<p>Cubrimos cada $\\tfrac1n$ con $U_n=(\\tfrac1{n+1},\\,\\tfrac1{n-1})$ (abierto, contiene a $\\tfrac1n$ y a ningún otro $\\tfrac1m$ si $n\\ge2$; para $n=1$ usar $U_1=(\\tfrac12,2)$). Como cada $U_n$ cubre un solo punto de $K$, ningún subcubrimiento finito cubre los infinitos puntos. Sin subcubrimiento finito.</p>',
      },
      {
        idea: '(b) $K=\\mathbb{N}$',
        detalle: '<p>$U_n=(n-\\tfrac13,\\,n+\\tfrac13)$ cubre a $n$ y a ningún otro entero. Cualquier subcubrimiento finito cubre finitos enteros.</p>',
      },
      {
        idea: '(c) $K=\\mathbb{Q}\\cap[0,1]$',
        detalle: '<p>Fijemos el irracional $\\alpha=\\tfrac{\\sqrt2}{2}\\in(0,1)$. Definimos $U_n=(-1,\\,\\alpha-\\tfrac1n)\\cup(\\alpha+\\tfrac1n,\\,2)$, que es abierto. La familia es creciente y $\\bigcup_n U_n=(-1,\\alpha)\\cup(\\alpha,2)$ contiene a todo racional de $[0,1]$ (pues $\\alpha\\notin\\mathbb{Q}$). Pero $U_N$ no cubre los racionales de $(\\alpha-\\tfrac1N,\\,\\alpha+\\tfrac1N)$, que existen por densidad; luego ningún subcubrimiento finito (= $U_N$ por monotonía) alcanza. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Cubrir "un punto por abierto" da un cubrimiento sin subcubrimiento finito cuando hay infinitos puntos discretos (a, b). En (c) se usa un punto de acumulación ausente ($\\alpha$) para construir abiertos crecientes que siempre dejan racionales sin cubrir.',
  },
  {
    fuente: 'Práctica 5 · Ej. 9', enunciado: E(9),
    idea: 'La función $x\\mapsto d(x,K)$ es continua y $K$ es compacto: el inf se realiza como un mínimo.',
    pasos: [
      {
        idea: 'Fijar $x$ y mirar $y\\mapsto d(x,y)$',
        detalle: '<p>Fijemos $x\\in E$ y sea $h:K\\to\\mathbb{R}$, $h(y)=d(x,y)$. Es continua (Práctica 4, Ej. 10: $|d(x,y)-d(x,y\')|\\le d(y,y\')$).</p>',
      },
      {
        idea: 'Mínimo en un compacto',
        detalle: '<p>$K$ es compacto y no vacío, así que $h$ alcanza su mínimo: existe $y_0\\in K$ con $d(x,y_0)=\\min_{y\\in K}d(x,y)=\\inf_{y\\in K}d(x,y)=d(x,K)$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La distancia de un punto a un compacto siempre se realiza (se alcanza). Es la compacidad la que "cierra" el inf: en un conjunto no compacto el inf puede no alcanzarse.',
  },
  {
    fuente: 'Práctica 5 · Ej. 10', enunciado: E(10),
    idea: 'Recordar $b_d(A,B)=\\inf\\{d(x,y):x\\in A,y\\in B\\}=\\inf_{x\\in A}d(x,B)$. Sobre el compacto $A$, la continua $d(\\cdot,B)$ alcanza su mínimo; si ese mínimo fuera $0$, algún $a\\in A$ cumpliría $d(a,B)=0$, forzando $a\\in\\overline B=B$, absurdo.',
    pasos: [
      {
        idea: 'El inf se realiza en $A$ compacto',
        detalle: '<p>$b_d(A,B)=\\inf_{x\\in A}d(x,B)$. Como $d(\\cdot,B)$ es continua y $A$ es compacto, existe $a_0\\in A$ con $d(a_0,B)=b_d(A,B)$.</p>',
      },
      {
        idea: 'Ese mínimo es positivo',
        detalle: '<p>Como $A\\cap B=\\varnothing$, $a_0\\notin B$; y $B$ es cerrado. Por la Práctica 3, Ej. 10(c), $d(a_0,B)=0\\iff a_0\\in\\overline B=B$; como $a_0\\notin B$, se tiene $d(a_0,B)>0$. Por lo tanto $b_d(A,B)=d(a_0,B)>0$. $\\blacksquare$</p>',
      },
      {
        idea: '¿Y si $A$ es sólo cerrado?',
        detalle: '<p>Falla. Contraejemplo en $\\mathbb{R}$: $A=\\mathbb{N}$ y $B=\\{n+\\tfrac1n:n\\ge2\\}$ son cerrados (discretos, sin acumulación finita), disjuntos ($2{,}5\\notin\\mathbb{N}$, etc.), y $d(n,\\,n+\\tfrac1n)=\\tfrac1n\\to0$. Así $b_d(A,B)=0$ aun siendo ambos cerrados y disjuntos. La compacidad de $A$ es esencial.</p>',
      },
    ],
    conclusion: 'Un compacto y un cerrado disjuntos siempre están a distancia positiva. Con dos cerrados puede haber acercamiento asintótico (los conjuntos "rozándose" en el infinito) y la distancia ser $0$.',
  },
  {
    fuente: 'Práctica 5 · Ej. 11', enunciado: E(11),
    idea: 'La bola es cerrada y acotada por definición. Para ver que no es compacta, exhibir una sucesión en la bola sin subsucesión convergente (en $d_\\infty$).',
    pasos: [
      {
        idea: 'Cerrada y acotada',
        detalle: '<p>$\\overline B(f_0,1)=\\{f:\\|f\\|_\\infty\\le1\\}$ es una bola cerrada, luego cerrada; está acotada por definición.</p>',
      },
      {
        idea: 'Sucesión testigo $f_n(x)=x^n$',
        detalle: '<p>Cada $f_n$ es continua y $\\|f_n\\|_\\infty=\\max_{[0,1]}x^n=1$, así que $f_n$ está en la bola cerrada. Puntualmente $f_n(x)\\to g(x)$ con $g(x)=0$ si $x<1$ y $g(1)=1$, que <em>no</em> es continua.</p>',
      },
      {
        idea: 'Ninguna subsucesión converge en $d_\\infty$',
        detalle: '<p>Si una subsucesión $f_{n_k}$ convergiera en $d_\\infty$ a alguna $h\\in C[0,1]$, entonces convergería uniformemente y, en particular, puntualmente; pero puntualmente toda subsucesión tiende a $g$, así que $h=g$, contradictorio con que $g$ sea discontinua y $h$ continua. No hay subsucesión convergente: la bola no es compacta.</p>',
      },
      {
        idea: 'Con $d_1$',
        detalle: '<p>Ahora $d_1(f_n,f_0)=\\int_0^1 x^n\\,dx=\\tfrac1{n+1}\\to0$, así que $f_n\\to f_0$ en $d_1$: el testigo anterior deja de servir. La bola $\\overline B_{d_1}(f_0,1)=\\{f:\\int_0^1|f|\\le1\\}$ sigue siendo cerrada y <em>tampoco</em> es compacta. Testigo: $g_n(x)=\\max(0,\\,n-n^2x)$ (triángulo de altura $n$ y base $[0,\\tfrac1n]$), continua con $\\|g_n\\|_1=\\tfrac12\\le1$. Si $g_{n_k}\\to h$ en $d_1$ con $h\\in C[0,1]$: para $\\delta>0$ y $n_k>1/\\delta$, $g_{n_k}\\equiv0$ en $[\\delta,1]$, así que $\\int_\\delta^1|h|\\le\\|g_{n_k}-h\\|_1\\to0$; luego $h=0$ en $[\\delta,1]$ para todo $\\delta$ y, por continuidad, $h\\equiv0$. Pero $\\|g_{n_k}-0\\|_1=\\tfrac12\\not\\to0$. Absurdo: ninguna subsucesión converge. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'En un espacio de dimensión infinita, cerrado y acotado <strong>no</strong> implica compacto: Heine–Borel falla fuera de $\\mathbb{R}^n$. Cambiar $d_\\infty$ por $d_1$ sólo cambia el testigo, no la conclusión.',
  },
  {
    fuente: 'Práctica 5 · Ej. 12', enunciado: E(12),
    idea: 'Una continua sobre un compacto alcanza su mínimo; ese mínimo es positivo porque $f>0$ en todo el espacio.',
    pasos: [
      {
        idea: 'El mínimo se alcanza',
        detalle: '<p>$f:E\\to(0,+\\infty)$ es continua y $E$ es compacto, así que $f$ alcanza su mínimo: existe $x_0\\in E$ con $f(x_0)=\\min_{x\\in E}f(x)$.</p>',
      },
      {
        idea: 'Ese mínimo es positivo',
        detalle: '<p>Como $f(x_0)>0$ (la función toma valores en $(0,+\\infty)$), sea $\\alpha=\\tfrac{f(x_0)}2>0$. Para todo $x\\in E$, $f(x)\\ge f(x_0)>\\alpha$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Una continua estrictamente positiva en un compacto está uniformemente lejos de $0$. Es la versión global del Ej. 3 de la Práctica 4 (conservación del signo en una bola), donde la compacidad da el $\\alpha$ para todo el espacio de una vez.',
  },
  {
    fuente: 'Práctica 5 · Ej. 13', enunciado: E(13),
    idea: 'En el compacto $[-M-1,M+1]$ la $f$ es uniformemente continua; en las colas $|x|>M$ la $f$ ya es chiquita, así que la diferencia entre dos valores de la cola también. La elección $\\delta\\le1$ empalma las dos regiones.',
    pasos: [
      {
        idea: 'Acotar las colas',
        detalle: '<p>Dado $\\varepsilon>0$, como $f(x)\\to0$ en $\\pm\\infty$, existe $M>0$ tal que $|x|>M\\Rightarrow |f(x)|<\\tfrac\\varepsilon2$.</p>',
      },
      {
        idea: 'Uniforme continuidad en el compacto',
        detalle: '<p>En $[-M-1,\\,M+1]$ (compacto) la continua $f$ es uniformemente continua: existe $\\delta_0>0$ tal que si $x,y\\in[-M-1,M+1]$ y $|x-y|<\\delta_0$, entonces $|f(x)-f(y)|<\\varepsilon$.</p>',
      },
      {
        idea: 'Combinar con $\\delta=\\min(\\delta_0,1)$',
        detalle: '<p>Sean $x,y$ con $|x-y|<\\delta$. Caso 1: ambos en $[-M-1,M+1]$ — se cumple por el paso anterior. Caso 2: ambos con $|x|,|y|>M$ — entonces $|f(x)-f(y)|\\le|f(x)|+|f(y)|<\\tfrac\\varepsilon2+\\tfrac\\varepsilon2=\\varepsilon$. Caso 3: uno (digamos $x$) cumple $|x|\\le M$; entonces $y\\in[x-1,x+1]\\subseteq[-M-1,M+1]$, y volvemos al Caso 1. En todos los casos $|f(x)-f(y)|<\\varepsilon$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Una continua que tiende a un mismo límite en ambos extremos es uniformemente continua: la "calma" en las colas y la uniforme continuidad en el compacto central se combinan con un $\\delta\\le1$ que evita el salto de una zona a la otra.',
  },
  {
    fuente: 'Práctica 5 · Ej. 14', enunciado: E(14),
    idea: 'Una biyección continua desde un compacto hacia un Hausdorff (todo métrico lo es) es un homeomorfismo: basta ver que manda cerrados en cerrados, lo que equivale a que $f^{-1}$ sea continua.',
    pasos: [
      {
        idea: 'Estrategia: probar que $f$ es cerrada',
        detalle: '<p>Como $f$ es biyectiva, $f^{-1}$ existe. Que $f^{-1}$ sea continua equivale a que $f$ lleve cerrados en cerrados. Probemos esto.</p>',
      },
      {
        idea: 'Imagen de un cerrado',
        detalle: '<p>Sea $F\\subseteq E$ cerrado. Como $E$ es compacto, $F$ (cerrado en compacto) es compacto. La imagen $f(F)$ de un compacto por una continua es compacta. Y todo compacto en un métrico (espacio de Hausdorff) es cerrado: $f(F)$ es cerrado en $E\'$.</p>',
      },
      {
        idea: 'Conclusión',
        detalle: '<p>Así $f$ es una función cerrada, en particular $f^{-1}$ es continua, y $f$ es un homeomorfismo. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Una biyección continua $f:E\\to E\'$ con $E$ compacto es automáticamente un homeomorfismo: la compacidad "paga" la continuidad de la inversa. Sin compacidad esto es falso (p. ej. $[0,2\\pi)\\to$ circunferencia).',
  },
  {
    fuente: 'Práctica 5 · Ej. 15', enunciado: E(15),
    idea: 'Basta probar compacidad secuencial. Dada una sucesión, las clausuras de sus colas forman una familia decreciente de cerrados no vacíos; por hipótesis su intersección no es vacía, y un punto allí es un punto de acumulación de la sucesión, del que se extrae una subsucesión convergente.',
    pasos: [
      {
        idea: 'Clausuras de las colas',
        detalle: '<p>Dada $(x_n)$ en $E$, definimos $F_n=\\overline{\\{x_k:k\\ge n\\}}$. Son cerrados, no vacíos, y decrecientes ($F_{n+1}\\subseteq F_n$). Por hipótesis, existe $x\\in\\bigcap_n F_n$.</p>',
      },
      {
        idea: '$x$ es punto de acumulación',
        detalle: '<p>Como $x\\in F_n$ para todo $n$, toda bola $B(x,r)$ corta a la cola $\\{x_k:k\\ge n\\}$. Es decir, cada entorno de $x$ contiene infinitos términos de la sucesión (para cada $n$ hay un $k\\ge n$ con $x_k\\in B(x,r)$).</p>',
      },
      {
        idea: 'Extraer una subsucesión $\\to x$',
        detalle: '<p>Construimos $n_1<n_2<\\cdots$ con $d(x_{n_j},x)<\\tfrac1j$ (posible porque $B(x,\\tfrac1j)$ corta la cola a partir de cualquier índice). Entonces $x_{n_j}\\to x$. Toda sucesión tiene subsucesión convergente, así $E$ es secuencialmente compacto y, por ser métrico, compacto. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La propiedad de intersección no vacía para familias decrecientes de cerrados caracteriza la compacidad en métricos. Es el recíproco del Ej. 6, y muestra que esa condición es equivalente a la compacidad secuencial.',
  },
  {
    fuente: 'Práctica 5 · Ej. 16', enunciado: E(16),
    idea: 'El conjunto de puntos fijos es el conjunto de ceros de la continua $g(x)=d(f(x),x)$, es decir, la preimagen de $\\{0\\}$ (cerrado).',
    pasos: [
      {
        idea: 'Construir $g$ continua',
        detalle: '<p>Sean $g(x)=d(f(x),x)$. Como $f$ es continua, $x\\mapsto x$ es continua y la distancia es continua, $g$ es continua en $E$.</p>',
      },
      {
        idea: 'Puntos fijos = $g^{-1}(\\{0\\})$',
        detalle: '<p>$x$ es punto fijo de $f$ sii $f(x)=x$ sii $d(f(x),x)=0$ sii $g(x)=0$. Luego $\\operatorname{Fix}(f)=g^{-1}(\\{0\\})$. Como $\\{0\\}$ es cerrado en $\\mathbb{R}$ y $g$ es continua, $\\operatorname{Fix}(f)$ es cerrado. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'El conjunto de puntos fijos de una continua es cerrado: es la preimagen de $\\{0\\}$ bajo la continua $x\\mapsto d(f(x),x)$. Igual de directo que "el conjunto donde dos continuas coinciden es cerrado" (Práctica 4).',
  },
  {
    fuente: 'Práctica 5 · Ej. 17', enunciado: E(17),
    idea: 'Basta ver que $\\arctan$ es 1-Lipschitz (su derivada $\\tfrac1{1+t^2}\\le1$), así que $f$ es contracción con constante $\\tfrac12$.',
    pasos: [
      {
        idea: 'Lipschitz del arctan',
        detalle: '<p>Por el teorema del valor medio, para $x<y$ existe $c\\in(x,y)$ con $|\\arctan x-\\arctan y|=|\\arctan\'(c)|\\,|x-y|=\\tfrac1{1+c^2}|x-y|\\le|x-y|$. Así $\\arctan$ es 1-Lipschitz.</p>',
      },
      {
        idea: 'Contracción de $f$',
        detalle: '<p>$|f(x)-f(y)|=\\tfrac12|\\arctan x-\\arctan y|\\le\\tfrac12|x-y|$. La constante de contracción es $\\tfrac12<1$, así que $f$ es una contracción (y, por Banach, tiene un único punto fijo en $\\mathbb{R}$ completo). $\\blacksquare$</p>',
      },
    ],
    conclusion: '$f(x)=\\tfrac12\\arctan(x)+3$ es contracción de constante $\\tfrac12$. La clave es $|\\arctan\'|\\le1$; el factor $\\tfrac12$ la convierte en contracción estricta.',
  },
  {
    fuente: 'Práctica 5 · Ej. 18', enunciado: E(18),
    idea: 'Es contracción de constante $\\tfrac13$ por linealidad. El único candidato a punto fijo es $0$, que no está en $E$: el teorema de Banach no aplica porque $E=\\mathbb{R}\\setminus\\{0\\}$ no es completo.',
    pasos: [
      {
        idea: 'Es contracción',
        detalle: '<p>$|f(x)-f(y)|=\\tfrac13|x-y|$, así que $f$ es contracción de constante $\\tfrac13<1$ sobre $E$.</p>',
      },
      {
        idea: 'No tiene punto fijo en $E$',
        detalle: '<p>Un punto fijo cumpliría $x=\\tfrac13 x$, es decir $x=0$; pero $0\\notin E$. Luego $f$ no tiene punto fijo en $E$.</p>',
      },
      {
        idea: 'Qué falla en Banach',
        detalle: '<p>El Teorema de Banach exige que el espacio sea <em>completo</em>. Pero $E=\\mathbb{R}\\setminus\\{0\\}$ no lo es: la sucesión $x_n=\\tfrac1n$ es de Cauchy en $E$ y converge a $0\\notin E$, así que no converge en $E$. Justamente el "agujero" en $0$ es el punto fijo que falta. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La completitud es una hipótesis insustituible de Banach. Aquí $f$ es contracción en un espacio no completo, y el punto fijo "cae" exactamente en el agujero del espacio.',
  },
  {
    fuente: 'Práctica 5 · Ej. 19', enunciado: E(19),
    idea: '(a) por inducción; (b) $f^n$ tiene un único punto fijo $x$ por Banach, y como $f$ y $f^n$ conmutan, $f(x)$ también lo es, de modo que $f(x)=x$ por unicidad; (c) $\\cos$ no es contracción, pero $\\cos^2$ sí lo es.',
    pasos: [
      {
        idea: '(a) Punto fijo de $f$ ⟹ de $f^n$',
        detalle: '<p>Si $f(x)=x$, por inducción $f^n(x)=x$: el caso $n=1$ es la hipótesis, y $f^{n+1}(x)=f(f^n(x))=f(x)=x$.</p>',
      },
      {
        idea: '(b) Existencia por Banach para $f^n$',
        detalle: '<p>Como $E$ es completo y $f^n$ es contracción, por Banach existe un único $x\\in E$ con $f^n(x)=x$.</p>',
      },
      {
        idea: '(b) $f(x)$ también es punto fijo de $f^n$',
        detalle: '<p>Como $f$ y $f^n$ conmutan ($f\\circ f^n=f^n\\circ f$), $f^n(f(x))=f(f^n(x))=f(x)$. Así $f(x)$ es punto fijo de $f^n$; por unicidad, $f(x)=x$. Luego $x$ es punto fijo de $f$.</p>',
      },
      {
        idea: '(b) Unicidad para $f$',
        detalle: '<p>Si $y$ es punto fijo de $f$, por (a) es punto fijo de $f^n$, y por unicidad de éste, $y=x$. Existe un único punto fijo de $f$.</p>',
      },
      {
        idea: '(c) $\\cos(x)=x$ tiene única solución',
        detalle: '<p>Sea $f(x)=\\cos x$. No es contracción ($|f\'|=|\\sin x|\\le1$, no estricto). Pero $f^2=\\cos\\circ\\cos$ sí: por el valor medio, $|(f^2)\'(t)|=|\\sin(\\cos t)\\cdot\\sin t|\\le\\sin(1)<1$, así que $f^2$ es contracción de constante $\\sin 1$. Como $\\mathbb{R}$ es completo, por (b) $f=\\cos$ tiene un único punto fijo: existe un único $x\\in\\mathbb{R}$ con $\\cos x=x$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Si una iterada $f^n$ es contracción en un completo, $f$ mismo tiene un único punto fijo. Esto rescata casos (como $\\cos$) en los que $f$ no es contracción pero una iterada sí lo es.',
  },
  {
    fuente: 'Práctica 5 · Ej. 20', enunciado: E(20),
    idea: 'La continua $h(x)=d_2(x,f(x))$ sobre el compacto $\\overline B(0,M)$ alcanza su mínimo; por hipótesis ese mínimo es $0$, y se alcanza en un punto $x_0$ del compacto, que es el punto fijo.',
    pasos: [
      {
        idea: 'El compacto y la función',
        detalle: '<p>$K=\\overline B(0,M)$ es cerrado y acotado en $\\mathbb{R}^n$, luego compacto (Heine–Borel). La función $h(x)=d_2(x,f(x))=\\|x-f(x)\\|_2$ es continua.</p>',
      },
      {
        idea: 'El mínimo es $0$',
        detalle: '<p>Por hipótesis, para cada $\\varepsilon>0$ existe $x\\in B(0,M)\\subseteq K$ con $h(x)<\\varepsilon$, así que $\\inf_K h=0$. Como $h\\ge0$, el inf es $0$.</p>',
      },
      {
        idea: 'Se alcanza y da el punto fijo',
        detalle: '<p>Una continua sobre un compacto alcanza su mínimo: existe $x_0\\in K$ con $h(x_0)=\\min_K h=0$. Entonces $d_2(x_0,f(x_0))=0$, es decir $f(x_0)=x_0$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Si $f$ se acerca arbitrariamente a la identidad dentro de una bola, entonces coincide con la identidad en algún punto de su clausura. Es un argumento de "mínimo de continua en compacto".',
  },
  {
    fuente: 'Práctica 5 · Ej. 21', enunciado: E(21),
    idea: 'Plantear $g(x)=f(x)-x$; en los extremos tiene signos opuestos (o se anula), así que Bolzano da un cero.',
    pasos: [
      {
        idea: 'Definir $g(x)=f(x)-x$',
        detalle: '<p>$g:[a,b]\\to\\mathbb{R}$ es continua. Como $f(a)\\in[a,b]$, $g(a)=f(a)-a\\ge0$; como $f(b)\\in[a,b]$, $g(b)=f(b)-b\\le0$.</p>',
      },
      {
        idea: 'Aplicar Bolzano',
        detalle: '<p>Si $g(a)=0$ o $g(b)=0$ ya hay punto fijo. Si no, $g(a)>0$ y $g(b)<0$; por el teorema de Bolzano (valores intermedios) existe $c\\in(a,b)$ con $g(c)=0$, es decir $f(c)=c$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Toda continua de un intervalo en sí mismo tiene un punto fijo. Es el teorema del punto fijo de Brouwer en dimensión 1, y sale directo de Bolzano vía $g(x)=f(x)-x$.',
  },
  {
    fuente: 'Práctica 5 · Ej. 22', enunciado: E(22),
    idea: 'Parametrizar la circunferencia como $c(t)=(\\cos t,\\sin t)$ y estudiar $g(t)=f(c(t))-f(c(t+\\pi))$. Como $g(t+\\pi)=-g(t)$, algún $g$ se anula por Bolzano: ahí hay puntos opuestos con igual valor.',
    pasos: [
      {
        idea: 'Parametrizar y plantear $g$',
        detalle: '<p>Escribimos $C=\\{c(t):t\\in[0,2\\pi]\\}$ con $c(t)=(\\cos t,\\sin t)$; el opuesto de $c(t)$ es $c(t+\\pi)$. Definimos $g(t)=f(c(t))-f(c(t+\\pi))$, continua en $[0,\\pi]$.</p>',
      },
      {
        idea: 'Simetría $g(t+\\pi)=-g(t)$',
        detalle: '<p>$g(t+\\pi)=f(c(t+\\pi))-f(c(t+2\\pi))=f(c(t+\\pi))-f(c(t))=-g(t)$.</p>',
      },
      {
        idea: 'Bolzano da el cero',
        detalle: '<p>Si $g(0)=0$, hecho. Si no, $g(0)\\ne0$ y $g(\\pi)=-g(0)$ tiene signo opuesto; por Bolzano existe $t_0\\in(0,\\pi)$ con $g(t_0)=0$, es decir $f(c(t_0))=f(c(t_0+\\pi))$. Los puntos $c(t_0)$ y $c(t_0+\\pi)$ son opuestos y $f$ toma en ellos el mismo valor. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Es el teorema de Borsuk–Ulam en dimensión 1: una continua en la circunferencia iguala algún par de puntos antipodales. La antisimetría $g(t+\\pi)=-g(t)$ fuerza un cambio de signo, y Bolzano hace el resto.',
  },
];
