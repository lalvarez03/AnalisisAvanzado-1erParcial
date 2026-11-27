// utils/guia-p4.js — Práctica 4 resuelta (Continuidad y Continuidad Uniforme en Espacios Métricos).
// Resoluciones paso a paso para el componente solvedExercise().
// Definición de continuidad (ε–δ): ∀ε>0 ∃δ>0 ∀y: d_E(x0,y)<δ ⇒ d_E'(f(x0),f(y))<ε.
// Equivalente a la secuencial: x_n→x0 ⇒ f(x_n)→f(x0).

import { consigna } from '../ejercicios.js';

const E = (n) => consigna(4, n);

export const GUIA_P4 = [
  {
    fuente: 'Práctica 4 · Ej. 1', enunciado: E(1),
    idea: 'Para cada caso decidimos con álgebra de continuas (composiciones, sumas, cocientes), con la definición ε–δ en el origen, o con la topología (qué abiertos definen las métricas discreta y usual).',
    pasos: [
      {
        idea: '(a) $f(x,y)=x^2+y^2$',
        detalle: '<p>Las proyecciones $\\pi_1(x,y)=x$ y $\\pi_2(x,y)=y$ son continuas (pues $|x-x_0|\\le d_2((x,y),(x_0,y_0))$). Como $f=\\pi_1^2+\\pi_2^2$ es suma de productos de funciones continuas, es continua en todo $\\mathbb{R}^2$.</p>',
      },
      {
        idea: '(b) $f(x,y)=\\frac{x^2y}{\\frac12x^2+(x-1)^2y^2}$, $f(0,0)=0$',
        detalle: '<p>Sea $D(x,y)=\\tfrac12x^2+(x-1)^2y^2\\ge0$. Si $(x,y)\\ne(0,0)$ entonces $D>0$: si $x\\ne0$, $D\\ge\\tfrac12x^2>0$; si $x=0$, $D=y^2>0$. Así, fuera del origen $f$ es cociente de continuas con denominador no nulo, luego continua.</p>'
          + '<p>En el origen hay que probar $f(x,y)\\to0$. Si $x=0$, $f(0,y)=0$. Si $x\\ne0$, usamos $D\\ge\\tfrac12x^2$ (porque $(x-1)^2y^2\\ge0$):</p>'
          + '<p>$|f(x,y)|=\\dfrac{x^2|y|}{D}\\le\\dfrac{x^2|y|}{\\tfrac12x^2}=2|y|\\le2\\,d_2\\big((x,y),(0,0)\\big)\\xrightarrow[(x,y)\\to(0,0)]{}0=f(0,0)$.</p>'
          + '<p>Dado $\\varepsilon>0$, basta $\\delta=\\varepsilon/2$. Por lo tanto es continua en el origen y, así, en todo $\\mathbb{R}^2$. (Ojo: no alcanza con "el límite es $0$ por las rectas": hay que acotar por una cantidad que dependa sólo de la distancia al origen, como acá.)</p>',
      },
      {
        idea: '(c) $\\operatorname{id}:(\\mathbb{R}^2,\\delta)\\to(\\mathbb{R}^2,d_2)$',
        detalle: '<p>En la métrica discreta $\\delta$, <em>todo</em> conjunto es abierto (pues $\\{x\\}=B_\\delta(x,\\tfrac12)$). La preimagen de cualquier abierto es un abierto, así que la identidad es continua.</p>',
      },
      {
        idea: '(d) $\\operatorname{id}:(\\mathbb{R}^2,d_2)\\to(\\mathbb{R}^2,\\delta)$',
        detalle: '<p>En el codominio discreto, $\\{(0,0)\\}$ es abierto. Su preimagen por la identidad es $\\{(0,0)\\}$, que <em>no</em> es abierto en $d_2$ (ninguna bola $d_2$ está contenida en un punto). La preimagen de un abierto no es abierta: no es continua.</p>',
      },
      {
        idea: '¿Cambia con $d_1$ o $d_\\infty$?',
        detalle: '<p>No. Las tres métricas $d_1,d_2,d_\\infty$ son equivalentes en $\\mathbb{R}^2$ (Práctica 3, Ej. 12), así que definen los mismos abiertos. Reemplazar $d_2$ por $d_1$ o $d_\\infty$ preserva (a), (b) y (d); (c) no involucra a las tres. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Son continuas (a), (b) y (c); (d) no lo es. La álgebra de continuas resuelve (a) y (b) fuera del origen, una cota resuelve (b) en el origen, y la topología discreta (todo es abierto) resuelve (c) y falla en (d).',
  },
  {
    fuente: 'Práctica 4 · Ej. 2', enunciado: E(2),
    idea: 'En $0$ se prueba por ε–δ con $\\delta=\\varepsilon$. En cualquier otro $x_0$, la densidad de $\\mathbb{Q}$ y de los irracionales permite tomar sucesiones de cada tipo que tienden a $x_0$ y cuyas imágenes tienden a límites distintos: la continuidad secuencial falla.',
    pasos: [
      {
        idea: 'Continuidad en $x_0=0$',
        detalle: '<p>Dado $\\varepsilon>0$, tomamos $\\delta=\\varepsilon$. Si $|x|<\\delta$: si $x\\in\\mathbb{Q}$, $|f(x)-0|=|x|<\\varepsilon$; si $x\\notin\\mathbb{Q}$, $|f(x)-0|=0<\\varepsilon$. En ambos casos $|f(x)-f(0)|<\\varepsilon$. Así $f$ es continua en $0$.</p>',
      },
      {
        idea: 'Discontinuidad en $x_0\\in\\mathbb{Q}\\setminus\\{0\\}$',
        detalle: '<p>Tomamos una sucesión $(x_n)\\subseteq\\mathbb{R}\\setminus\\mathbb{Q}$ con $x_n\\to x_0$ (existe por densidad de los irracionales). Entonces $f(x_n)=0\\to0$, pero $f(x_0)=x_0\\ne0$. Si $f$ fuera continua, $f(x_n)\\to f(x_0)$; como no, es discontinua.</p>',
      },
      {
        idea: 'Discontinuidad en $x_0\\notin\\mathbb{Q}$',
        detalle: '<p>Tomamos $(x_n)\\subseteq\\mathbb{Q}$ con $x_n\\to x_0$ (densidad de $\\mathbb{Q}$). Entonces $f(x_n)=x_n\\to x_0$, pero $f(x_0)=0\\ne x_0$. De nuevo la continuidad secuencial falla. $\\blacksquare$</p>',
      },
    ],
    conclusion: '$f$ es continua únicamente en $0$. La densidad de racionales e irracionales fuerza que, en todo $x_0\\ne0$, haya sucesiones que se acercan "por dentro" y "por fuera" de $\\mathbb{Q}$, dando dos límites distintos para $f$.',
  },
  {
    fuente: 'Práctica 4 · Ej. 3', enunciado: E(3),
    idea: 'Elegir $\\varepsilon=\\tfrac{f(x_0)}2>0$ en la definición de continuidad; la bola que ésta garantiza cumple $f(x)>f(x_0)-\\varepsilon=\\tfrac{f(x_0)}2>0$.',
    pasos: [
      {
        idea: 'Aplicar la continuidad',
        detalle: '<p>Como $f(x_0)>0$, sea $\\varepsilon=\\tfrac{f(x_0)}2>0$. Por la continuidad de $f$ en $x_0$, existe $r>0$ tal que para todo $x\\in B(x_0,r)$ se cumple $|f(x)-f(x_0)|<\\varepsilon$.</p>',
      },
      {
        idea: 'Concluir el signo',
        detalle: '<p>Entonces $f(x)>f(x_0)-\\varepsilon=\\tfrac{f(x_0)}2>0$ para todo $x\\in B(x_0,r)$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Una continua conserva el signo de su valor en una bola centrada en el punto. La elección "la mitad del valor" deja un margen positivo aún en el peor caso del entorno.',
  },
  {
    fuente: 'Práctica 4 · Ej. 4', enunciado: E(4),
    idea: 'Ver (a) como preimagen de un abierto bajo la continua $h(x)=d_{E\'}(f(x),g(x))$; (b) es su complemento.',
    pasos: [
      {
        idea: 'La función separadora es continua',
        detalle: '<p>$h:E\\to\\mathbb{R}$, $h(x)=d_{E\'}(f(x),g(x))$ es continua: es composición de $x\\mapsto(f(x),g(x))$ (continua por pares) con la distancia $d_{E\'}$, que es continua (Práctica 3, Ej. 13).</p>',
      },
      {
        idea: '(a) $\\{f\\ne g\\}$ es abierto',
        detalle: '<p>$\\{x:f(x)\\ne g(x)\\}=\\{x:h(x)\\ne0\\}=h^{-1}\\bigl((0,+\\infty)\\bigr)$. Como $(0,+\\infty)$ es abierto y $h$ es continua, es la preimagen de un abierto, luego abierto.</p>',
      },
      {
        idea: '(b) $\\{f=g\\}$ es cerrado',
        detalle: '<p>$\\{x:f(x)=g(x)\\}=E\\setminus\\{x:f(x)\\ne g(x)\\}$, complemento del abierto de (a), luego cerrado. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Donde dos continuas difieren es abierto; donde coinciden es cerrado. Es la versión métrica de "el cero de una continua es cerrado", vía $h=d(f,g)$.',
  },
  {
    fuente: 'Práctica 4 · Ej. 5', enunciado: E(5),
    idea: 'Cada conjunto es la preimagen de un intervalo (abierto o cerrado) bajo una función continua explícita. La equivalencia de $d_1,d_2,d_\\infty$ preserva las conclusiones.',
    pasos: [
      {
        idea: '(a) $\\{x^2+y\\sin(e^x-1)=-2\\}$',
        detalle: '<p>Sea $f(x,y)=x^2+y\\sin(e^x-1)$, continua en $\\mathbb{R}^2$. El conjunto es $f^{-1}(\\{-2\\})$, preimagen del cerrado $\\{-2\\}$, luego cerrado.</p>',
      },
      {
        idea: '(b) $\\{-1\\le x^3-3y^4+z-2\\le3\\}$',
        detalle: '<p>Sea $g(x,y,z)=x^3-3y^4+z-2$, continua. El conjunto es $g^{-1}([-1,3])$, preimagen del intervalo cerrado $[-1,3]$, luego cerrado.</p>',
      },
      {
        idea: '(c) $\\{x_1-x_2>3\\}$',
        detalle: '<p>Sea $h(x)=x_1-x_2$, continua en $\\mathbb{R}^5$. El conjunto es $h^{-1}((3,+\\infty))$, preimagen del abierto $(3,+\\infty)$, luego abierto.</p>',
      },
      {
        idea: '¿Cambia con $d_1$ o $d_\\infty$?',
        detalle: '<p>No: las tres métricas son equivalentes en $\\mathbb{R}^n$ (Práctica 3, Ej. 12), así que definen los mismos abiertos y cerrados. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La regla operativa es: preimagen de cerrado por una continua es cerrada; preimagen de abierto es abierta. Basta reconocer el conjunto como un nivel o un trozo de una continua explícita.',
  },
  {
    fuente: 'Práctica 4 · Ej. 6', enunciado: E(6),
    idea: 'Una continua no siempre manda abiertos en abiertos ni cerrados en cerrados: alcanzan ejemplos donde el extremo se "pierde" al aplicar la función.',
    pasos: [
      {
        idea: '(a) Imagen de un abierto no abierta',
        detalle: '<p>$f(x)=x^2$ es continua. Con $G=(-1,1)$ abierto, $f(G)=[0,1)$: no es abierto, pues $0\\in f(G)$ no es interior (toda bola entorno de $0$ contiene negativos fuera de $[0,1)$).</p>',
      },
      {
        idea: '(b) Imagen de un cerrado no cerrada',
        detalle: '<p>$g(x)=\\tfrac{x^2}{1+x^2}$ es continua. Con $F=[0,+\\infty)$ cerrado, $g(F)=[0,1)$: no es cerrado, pues $1$ es punto de acumulación de $g(F)$ y $1\\notin g(F)$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La continuidad preserva preimágenes, no imágenes. En el caso (a) el origen "dobla" los dos lados en uno solo; en (b) el límite en el infinito aporta un punto de acumulación ausente.',
  },
  {
    fuente: 'Práctica 4 · Ej. 7', enunciado: E(7),
    idea: '(a) Si dos continuas coinciden en un denso, cualquier punto es límite de una sucesión del denso, y la continuidad secuencial las iguala. (b) Es la inyectividad de "restringir a un denso" aplicada a $D=\\mathbb{Q}\\cap[0,1]$.',
    pasos: [
      {
        idea: '(a) $f|_D=g|_D\\Rightarrow f=g$',
        detalle: '<p>Sea $x\\in E$. Como $D$ es denso, existe $(x_n)\\subseteq D$ con $x_n\\to x$. Como $x_n\\in D$, $f(x_n)=g(x_n)$. Por continuidad secuencial, $f(x)=\\lim f(x_n)=\\lim g(x_n)=g(x)$.</p>',
      },
      {
        idea: '(b) $\\mathcal{R}$ es inyectiva',
        detalle: '<p>Si $\\mathcal{R}(f)=\\mathcal{R}(g)$, entonces $f$ y $g$ coinciden en $D=\\mathbb{Q}\\cap[0,1]$, que es denso en $[0,1]$. Por (a), $f=g$. Luego $\\mathcal{R}$ es inyectiva. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Una continua queda unívocamente determinada por sus valores en un denso: dos continuas que coinciden "en un conjunto grueso" coinciden en todo el espacio. Por eso la restricción a $\\mathbb{Q}\\cap[0,1]$ no pierde información.',
  },
  {
    fuente: 'Práctica 4 · Ej. 8', enunciado: E(8),
    idea: 'Para $y\\in E\'$ usar la suryectividad para elegir $x$ con $f(x)=y$, aproximarlo por una sucesión del denso y transportarla por continuidad.',
    pasos: [
      {
        idea: 'Aproximar un antecedente',
        detalle: '<p>Sea $y\\in E\'$. Por suryectividad existe $x\\in E$ con $f(x)=y$. Como $D$ es denso en $E$, existe $(x_n)\\subseteq D$ con $x_n\\to x$.</p>',
      },
      {
        idea: 'Transportar por continuidad',
        detalle: '<p>Por continuidad de $f$, $f(x_n)\\to f(x)=y$. Como $f(x_n)\\in f(D)$, resulta $y\\in\\overline{f(D)}$. Como $y$ era cualquiera en $E\'$, $\\overline{f(D)}=E\'$, es decir $f(D)$ es denso en $E\'$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La imagen de un denso bajo una continua suryectiva es densa. La suryectividad garantiza un antecedente para cada punto del codominio, y la continuidad arrastra la aproximación.',
  },
  {
    fuente: 'Práctica 4 · Ej. 9', enunciado: E(9),
    idea: 'En $d_\\infty$ ambas son 1-Lipschitz (acotación por el máximo). En $d_1$, la integral sigue siendo 1-Lipschitz, pero la evaluación no: un pico fino y alto tiene $d_1$ chiquita pero evaluación grande. Como $d_1\\le d_\\infty$, continuidad en $d_1$ implica en $d_\\infty$.',
    pasos: [
      {
        idea: '(a) Continuidad en $d_\\infty$',
        detalle: '<p>$|\\mathcal{E}(f)-\\mathcal{E}(g)|=|f(0)-g(0)|\\le d_\\infty(f,g)$. Y $|\\mathcal{I}(f)-\\mathcal{I}(g)|\\le\\int_0^1|f-g|\\le d_\\infty(f,g)$. Ambas son 1-Lipschitz, por ende continuas.</p>',
      },
      {
        idea: '(b) En $d_1$: $\\mathcal{I}$ continua, $\\mathcal{E}$ no',
        detalle: '<p>$|\\mathcal{I}(f)-\\mathcal{I}(g)|\\le\\int|f-g|=d_1(f,g)$: $\\mathcal{I}$ es 1-Lipschitz en $d_1$. Para $\\mathcal{E}$, sea $f_n(x)=\\max(1-nx,0)$ (triángulo que cae de $1$ a $0$ en $[0,\\tfrac1n]$). Entonces $d_1(f_n,0)=\\tfrac{1}{2n}\\to0$, pero $\\mathcal{E}(f_n)=f_n(0)=1\\not\\to0=\\mathcal{E}(0)$. Discontinua.</p>',
      },
      {
        idea: '(c) ¿Continua en $d_1$ pero no en $d_\\infty$?',
        detalle: '<p>No puede ocurrir: como $d_1(f,g)\\le d_\\infty(f,g)$, si $f_n\\xrightarrow{d_\\infty}f$ entonces $f_n\\xrightarrow{d_1}f$, y una $\\mathcal{F}$ continua en $d_1$ satisface $\\mathcal{F}(f_n)\\to\\mathcal{F}(f)$. Así, continua en $d_1\\Rightarrow$ continua en $d_\\infty$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La convergencia en $d_\\infty$ es más fuerte que en $d_1$. La integral es robusta (promedia, ignora picos finos) y es continua en ambas; la evaluación "ve" el valor en un punto y por eso falla en $d_1$. Continuidad en $d_1$ implica en $d_\\infty$, no al revés.',
  },
  {
    fuente: 'Práctica 4 · Ej. 10', enunciado: E(10),
    idea: '$f(x)=d(x,x_0)$ es 1-Lipschitz por la desigualdad triangular. Las bolas se reconstruyen como conjuntos de nivel de $f$: $B(x_0,r)=f^{-1}((\\!-\\infty,r))$, etc.',
    pasos: [
      {
        idea: '(a) $f$ es continua (1-Lipschitz)',
        detalle: '<p>Por la triangular y su inversa: $|d(x,x_0)-d(y,x_0)|\\le d(x,y)$. Dado $\\varepsilon>0$, con $\\delta=\\varepsilon$: si $d(x,y)<\\delta$ entonces $|f(x)-f(y)|<\\varepsilon$. Es 1-Lipschitz, en particular continua en todo $E$.</p>',
      },
      {
        idea: '(b) Reconstrucción de bolas y esferas',
        detalle: '<p>Como $f$ es continua y $f(x)=d(x,x_0)$:</p>'
          + '<p>• $B(x_0,r)=\\{x:f(x)<r\\}=f^{-1}((\\!-\\infty,r))$, preimagen de abierto ⟹ abierto.</p>'
          + '<p>• $\\overline{B}(x_0,r)=\\{x:f(x)\\le r\\}=f^{-1}((\\!-\\infty,r])$, preimagen de cerrado ⟹ cerrado.</p>'
          + '<p>• $S(x_0,r)=\\{x:f(x)=r\\}=f^{-1}(\\{r\\})$, preimagen de cerrado ⟹ cerrado.</p>'
          + '<p>• (Práctica 3, Ej. 4(g)) $\\{y:2<d(y,x_0)<3\\}=f^{-1}\\big((2,3)\\big)$, preimagen del abierto $(2,3)$ ⟹ abierto. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La distancia a un punto es continua y sus conjuntos de nivel son exactamente las bolas y esferas. Así la apertura/cerradura de éstas se reduce a "preimagen de abierto/cerrado por una continua", unificado en un solo argumento.',
  },
  {
    fuente: 'Práctica 4 · Ej. 11', enunciado: E(11),
    idea: '$g(x)=d(x,A)$ es 1-Lipschitz (como $d(x,x_0)$, pero con un conjunto). La función de Urysohn $h=d(x,A)/(d(x,A)+d(x,B))$ separa $A$ y $B$ porque su denominador no se anula; los conjuntos de nivel de $h$ dan abiertos disjuntos.',
    pasos: [
      {
        idea: '(a) $g(x)=d(x,A)$ es continua y positiva fuera de $A$ cerrado',
        detalle: '<p>Como en el Ej. 10, $|d(x,A)-d(y,A)|\\le d(x,y)$: $g$ es 1-Lipschitz, continua. Si $A$ es cerrado y $x\\notin A$, entonces $d(x,A)>0$: si fuera $0$, por la caracterización de la clausura $x\\in\\overline A=A$, contradictorio.</p>',
      },
      {
        idea: '(b) Función de Urysohn $h$',
        detalle: '<p>Sean $A,B$ cerrados disjuntos no vacíos. Como $x\\notin A\\cup B$ es imposible que $d(x,A)=d(x,B)=0$ a la vez (eso daría $x\\in\\overline A\\cap\\overline B=A\\cap B=\\varnothing$); así el denominador $d(x,A)+d(x,B)>0$ nunca se anula. Por tanto $h(x)=\\tfrac{d(x,A)}{d(x,A)+d(x,B)}$ está bien definida y es continua (cociente de continuas con denominador no nulo). Si $x\\in A$, $d(x,A)=0$, así $h(x)=0$; si $x\\in B$, $d(x,B)=0$, así $h(x)=1$.</p>',
      },
      {
        idea: '(c) Lema de Urysohn',
        detalle: '<p>Tomamos $U=h^{-1}\\bigl((\\!-\\infty,\\tfrac12)\\bigr)$ y $V=h^{-1}\\bigl((\\tfrac12,+\\infty)\\bigr)$. Son abiertos (preimágenes de abiertos por $h$ continua), disjuntos (sus intervalos lo son), con $A\\subseteq U$ (pues $h|_A\\equiv0<\\tfrac12$) y $B\\subseteq V$ (pues $h|_B\\equiv1>\\tfrac12$). $\\blacksquare$</p>',
      },
    ],
    conclusion: 'En un métrico, dos cerrados disjuntos se separan por una continua (Urysohn) y por abiertos disjuntos. La clave es que $d(x,A)+d(x,B)>0$ fuera de $A\\cup B$, lo que evita la división por cero.',
  },
  {
    fuente: 'Práctica 4 · Ej. 12', enunciado: E(12),
    idea: 'Toda Lipschitz es uniformemente continua tomando $\\delta=\\varepsilon/L$. Tanto $d(\\cdot,x_0)$ como $d(\\cdot,A)$ son 1-Lipschitz.',
    pasos: [
      {
        idea: 'Son 1-Lipschitz',
        detalle: '<p>Por la desigualdad triangular (y su inversa), $|d(x,x_0)-d(y,x_0)|\\le d(x,y)$ y $|d(x,A)-d(y,A)|\\le d(x,y)$: ambas son 1-Lipschitz (constante $L=1$).</p>',
      },
      {
        idea: 'Lipschitz $\\Rightarrow$ uniformemente continua',
        detalle: '<p>Dado $\\varepsilon>0$, tomamos $\\delta=\\varepsilon/L=\\varepsilon$. Si $d(x,y)<\\delta$, $|f(x)-f(y)|\\le L\\,d(x,y)<L\\delta=\\varepsilon$. El $\\delta$ no depende del punto, sólo de $\\varepsilon$: continuidad uniforme. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Una cota de Lipschitz uniforme da un $\\delta$ global. La distancia a un punto y a un conjunto son 1-Lipschitz, por ende uniformemente continuas: son los ejemplos canónicos de funciones "suaves a escala fija".',
  },
  {
    fuente: 'Práctica 4 · Ej. 13', enunciado: E(13),
    idea: 'Para mostrar que no hay uniforme continuidad, exhibir dos sucesiones que se acercan ($|x_n-y_n|\\to0$) cuyas imágenes no ($|f(x_n)-f(y_n)|\\not\\to0$). Para la afirmativa, una cota Lipschitz basta.',
    pasos: [
      {
        idea: '(a) $1/x$ no es UC en $(0,+\\infty)$',
        detalle: '<p>Tomamos $x_n=\\tfrac1n$, $y_n=\\tfrac1{n+1}$. Entonces $|x_n-y_n|=\\tfrac1{n(n+1)}\\to0$, pero $|\\tfrac1{x_n}-\\tfrac1{y_n}|=|n-(n+1)|=1\\not\\to0$. No es uniformemente continua.</p>',
      },
      {
        idea: '(a) Sí lo es en $[\\varepsilon,+\\infty)$',
        detalle: '<p>Allí $|\\tfrac1x-\\tfrac1y|=\\tfrac{|x-y|}{xy}\\le\\tfrac1{\\varepsilon^2}|x-y|$: es Lipschitz (constante $1/\\varepsilon^2$), luego uniformemente continua.</p>',
      },
      {
        idea: '(b) $\\sin(1/x)$ no es UC en $(0,1)$',
        detalle: '<p>Tomamos $x_n=\\tfrac1{2n\\pi+\\pi/2}$ (donde $\\sin(1/x_n)=\\sin(\\tfrac\\pi2)=1$) e $y_n=\\tfrac1{2n\\pi}$ (donde $\\sin(1/y_n)=0$). Entonces $|x_n-y_n|\\to0$, pero $|\\sin(1/x_n)-\\sin(1/y_n)|=1\\not\\to0$. No es uniformemente continua. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La uniforme continuidad falla cuando la función oscila o se "dispara" en una zona cada vez más angosta. En $(0,+\\infty)$, $1/x$ se comporta mal cerca de $0$; lejos de ahí es Lipschitz. La rapidez creciente de las oscilaciones de $\\sin(1/x)$ rompe la uniformidad en $(0,1)$.',
  },
  {
    fuente: 'Práctica 4 · Ej. 14', enunciado: E(14),
    idea: 'Usar el $\\delta$ de la uniforme continuidad para trasladar la propiedad de Cauchy del dominio al codominio.',
    pasos: [
      {
        idea: 'Aplicar la definición',
        detalle: '<p>Dado $\\varepsilon>0$, existe $\\delta>0$ tal que $d_E(x,y)<\\delta\\Rightarrow d_{E\'}(f(x),f(y))<\\varepsilon$.</p>',
      },
      {
        idea: 'Trasladar Cauchy',
        detalle: '<p>Como $(x_n)$ es de Cauchy en $E$, existe $N$ tal que $d_E(x_n,x_m)<\\delta$ para $n,m\\ge N$. Por la cota anterior, $d_{E\'}(f(x_n),f(x_m))<\\varepsilon$ para $n,m\\ge N$. Así $(f(x_n))$ es de Cauchy en $E\'$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Las uniformemente continuas preservan sucesiones de Cauchy. Es una propiedad "uniforme": el mismo $\\delta$ sirve para todas las parejas de la cola, que es justo lo que la continuidad simple no garantiza.',
  },
  {
    fuente: 'Práctica 4 · Ej. 15', enunciado: E(15),
    idea: 'Desacoplar las dos nociones con contraejemplos: estar acotada no implica uniforme continuidad (oscilaciones que se aceleran), y la uniforme continuidad no exige acotación (una Lipschitz lineal).',
    pasos: [
      {
        idea: '(a) Acotada y continua, no UC',
        detalle: '<p>$f(x)=\\sin(x^2)$ en $\\mathbb{R}$. Es acotada ($|f|\\le1$) y continua, pero no es uniformemente continua: con $x_n=\\sqrt{\\pi n+\\tfrac\\pi2}$ e $y_n=\\sqrt{\\pi n}$, $|x_n-y_n|\\to0$ mientras $|f(x_n)-f(y_n)|=1\\not\\to0$ (las oscilaciones se aceleran al crecer $x$).</p>',
      },
      {
        idea: '(b) No acotada y UC',
        detalle: '<p>$f(x)=x$ en $\\mathbb{R}$. No está acotada, pero es 1-Lipschitz, por ende uniformemente continua (Ej. 12). $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Acotación y uniforme continuidad son independientes. La primera controla el "tamaño" de los valores; la segunda, la "variación" a escala fija. Oscilaciones que se comprimen (sin(x²)) rompen la uniformidad sin afectar la cota.',
  },
  {
    fuente: 'Práctica 4 · Ej. 16', enunciado: E(16),
    idea: 'Tomar $a_n\\in A$, $b_n\\in B$ con $d(a_n,b_n)\\to0$ (que existen pues $d(A,B)=0$) y aplicar la uniforme continuidad.',
    pasos: [
      {
        idea: 'Sucesiones que acercan $A$ y $B$',
        detalle: '<p>Como $d(A,B)=\\inf\\{d(a,b):a\\in A,b\\in B\\}=0$, para cada $n$ existen $a_n\\in A$, $b_n\\in B$ con $d(a_n,b_n)<\\tfrac1n$. Así $d(a_n,b_n)\\to0$.</p>',
      },
      {
        idea: 'Aplicar la uniforme continuidad',
        detalle: '<p>Dado $\\varepsilon>0$, existe $\\delta>0$ tal que $d(x,y)<\\delta\\Rightarrow d\'(f(x),f(y))<\\varepsilon$. Para $n$ grande, $d(a_n,b_n)<\\delta$, así que $d\'(f(a_n),f(b_n))<\\varepsilon$.</p>',
      },
      {
        idea: 'Concluir $d\'(f(A),f(B))=0$',
        detalle: '<p>Como $f(a_n)\\in f(A)$ y $f(b_n)\\in f(B)$, $d\'(f(A),f(B))\\le d\'(f(a_n),f(b_n))<\\varepsilon$ para $n$ grande. Como $\\varepsilon$ es arbitrario, $d\'(f(A),f(B))=0$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Una uniformemente continua preserva la proximidad entre conjuntos: si $A$ y $B$ se rozan ($d(A,B)=0$), también lo hacen sus imágenes. La continuidad simple no alcanzaría: necesitaría un $\\delta$ por punto.',
  },
];
