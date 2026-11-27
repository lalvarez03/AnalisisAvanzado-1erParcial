// utils/guia-p7.js — Práctica 7 resuelta (Sucesiones y series de funciones).
// Teoría de referencia (Cap. 7): convergencia puntual (Def. 7.1), uniforme (Def. 7.3),
// Teorema 7.6 (límite uniforme de continuas es continuo), uniformemente de Cauchy (7.8, 7.11),
// Prop. 7.13 (integral y límite uniforme), Prop. 7.15 (derivada y límite uniforme).
// Receta central: f_n ⇒ f  <=>  sup_x d(f_n(x), f(x)) -> 0.

import { consigna } from '../ejercicios.js';

const E = (n) => consigna(7, n);

export const GUIA_P7 = [
  {
    fuente: 'Práctica 7 · Ej. 1', enunciado: E(1),
    idea: 'Es la negación de "$\\forall\\varepsilon\\,\\exists n_0\\,\\forall n\\ge n_0\\,\\forall x$" escrita de forma constructiva: un $\\varepsilon$ fijo ($\\alpha$) y, para índices arbitrariamente grandes, un punto $a$ donde falla. Ese enunciado es la herramienta estándar para refutar convergencia uniforme.',
    pasos: [
      {
        idea: '(⇐) Si existen $\\alpha$, $n_k$, $a_k$ entonces NO hay convergencia uniforme',
        detalle: '<p>Supongamos por absurdo que $f_n\\Rightarrow f$. Con $\\varepsilon=\\alpha$ hay $n_0$ tal que $d(f_n(x),f(x))<\\alpha$ para todo $n\\ge n_0$ y <em>todo</em> $x\\in A$. Como $n_k\\to\\infty$ (estrictamente creciente), existe $k$ con $n_k\\ge n_0$, y entonces $d(f_{n_k}(a_k),f(a_k))<\\alpha$, contradiciendo $d(f_{n_k}(a_k),f(a_k))\\ge\\alpha$.</p>',
      },
      {
        idea: '(⇒) Negar la definición',
        detalle: '<p>$f_n\\not\\Rightarrow f$ significa: existe $\\alpha>0$ tal que para todo $n_0$ existen $n\\ge n_0$ y $a\\in A$ con $d(f_n(a),f(a))\\ge\\alpha$.</p>',
      },
      {
        idea: '(⇒) Construir la subsucesión por recursión',
        detalle: '<p>Con $n_0=1$ obtenemos $n_1\\ge1$ y $a_1$ con $d(f_{n_1}(a_1),f(a_1))\\ge\\alpha$. Con $n_0=n_1+1$ obtenemos $n_2>n_1$ y $a_2$ con $d(f_{n_2}(a_2),f(a_2))\\ge\\alpha$. En general, dado $n_k$, aplicamos la negación con $n_0=n_k+1$ y obtenemos $n_{k+1}>n_k$ y $a_{k+1}$ con la misma desigualdad. Así $(n_k)$ es estrictamente creciente (una subsucesión) y $d(f_{n_k}(a_k),f(a_k))\\ge\\alpha$ para todo $k$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Para probar que NO hay convergencia uniforme alcanza con exhibir $\\alpha>0$ y puntos $a_k$ (que dependen de $k$) donde $f_{n_k}$ se aleja de $f$ al menos $\\alpha$. Lo vas a usar en casi todos los ejercicios siguientes: el truco es elegir $a_k$ "donde la función es más problemática" (el pico, el borde, el infinito).',
  },
  {
    fuente: 'Práctica 7 · Ej. 2', enunciado: E(2),
    idea: 'Primero el límite puntual (fijar $x$, $n\\to\\infty$). Después calcular o acotar $\\sup_x d(f_n(x),f(x))$: si $\\to0$, uniforme; si no, buscar puntos $a_n$ como en el Ej. 1.',
    pasos: [
      {
        idea: '(a) $f_n(x)=\\tfrac1n\\sin(nx)$ en $\\mathbb{R}$',
        detalle: '<p>Como $|\\sin|\\le1$, $|f_n(x)-0|\\le\\tfrac1n$ para <em>todo</em> $x$. Luego $f_n\\to0$ puntualmente y además $\\sup_x|f_n(x)|\\le\\tfrac1n\\to0$: convergencia <strong>uniforme</strong> a $f\\equiv0$ (y por lo tanto puntual).</p>',
      },
      {
        idea: '(b) $f_n(x)=\\sin(x/n)$ en $\\mathbb{R}$: puntual',
        detalle: '<p>Para $x$ fijo, $x/n\\to0$ y $\\sin$ es continua con $\\sin 0=0$: $f_n(x)\\to0$. Límite puntual $f\\equiv0$.</p>',
      },
      {
        idea: '(b) no es uniforme',
        detalle: '<p>Tomamos $a_n=\\tfrac{n\\pi}2$: $f_n(a_n)=\\sin(\\tfrac\\pi2)=1$, así $|f_n(a_n)-f(a_n)|=1\\ge\\alpha:=1$ para todo $n$ (Ej. 1). Equivalentemente $\\sup_{x\\in\\mathbb{R}}|\\sin(x/n)|=1\\not\\to0$. <strong>No</strong> converge uniformemente en $\\mathbb{R}$. (Sí lo hace en cualquier $[-R,R]$: $|\\sin(x/n)|\\le R/n$.)</p>',
      },
      {
        idea: '(c) $f_n(x,y)=\\tfrac n{n+1}(x,y)$: puntual',
        detalle: '<p>Para $(x,y)$ fijo, $\\tfrac n{n+1}\\to1$, así $f_n(x,y)\\to(x,y)$: el límite puntual es la identidad de $\\mathbb{R}^2$.</p>',
      },
      {
        idea: '(c) no es uniforme',
        detalle: '<p>$d_2(f_n(x,y),(x,y))=\\big\\|\\big(\\tfrac n{n+1}-1\\big)(x,y)\\big\\|_2=\\tfrac1{n+1}\\|(x,y)\\|_2$, que no está acotado en $(x,y)\\in\\mathbb{R}^2$. Con $a_n=(n+1,0)$: $d_2(f_n(a_n),a_n)=1$ para todo $n$. <strong>No</strong> uniforme en $\\mathbb{R}^2$ (sí lo es sobre cualquier bola: $\\le\\tfrac R{n+1}$).</p>',
      },
      {
        idea: '(d) $f_n(\\varphi)=\\tfrac n{n+1}\\varphi$ en $C([0,1])$ con $d_\\infty$',
        detalle: '<p>Puntual: para $\\varphi$ fijo, $d_\\infty(f_n(\\varphi),\\varphi)=\\tfrac1{n+1}\\|\\varphi\\|_\\infty\\to0$, así $f_n(\\varphi)\\to\\varphi$ (el límite es la identidad). Uniforme: no, porque $\\sup_\\varphi\\tfrac{\\|\\varphi\\|_\\infty}{n+1}=\\infty$; con $\\varphi_n\\equiv n+1$ (función constante), $d_\\infty(f_n(\\varphi_n),\\varphi_n)=1$. <strong>No</strong> es uniforme en todo $C([0,1])$; sí lo es sobre conjuntos acotados. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Solo (a) converge uniformemente. En (b), (c) y (d) el error es "proporcional a la distancia al origen" ($\\tfrac{|x|}n$, $\\tfrac{\\|x\\|}{n+1}$), así que sobre un dominio no acotado no hay un $n_0$ que sirva para todos los puntos a la vez. En dominios acotados esos tres sí serían uniformes.',
  },
  {
    fuente: 'Práctica 7 · Ej. 3', enunciado: E(3),
    idea: 'Cada ítem es el mismo protocolo: (1) límite puntual; (2) $\\sup|f_n-f|$ (con derivadas si hace falta) o un testigo $a_n$; (3) comparar con la continuidad del límite (Teorema 7.6).',
    pasos: [
      {
        idea: '(a)-i. $f_n(x)=x^n$ en $(-1,1]$',
        detalle: '<p>Si $|x|<1$, $x^n\\to0$. Si $x=1$, $1^n=1$. El límite puntual es $f(x)=0$ para $x\\in(-1,1)$ y $f(1)=1$.</p>',
      },
      {
        idea: '(a)-ii. $f_n(x)=x^{-n}e^x$ en $(1,+\\infty)$',
        detalle: '<p>Para $x>1$, $x^{-n}=(1/x)^n\\to0$ y $e^x$ es una constante: $f_n(x)\\to0$. Límite $f\\equiv0$.</p>',
      },
      {
        idea: '(a)-iii. $f_n(x)=n^2x(1-x^2)^n$ en $[0,1]$',
        detalle: '<p>En $x=0$ y en $x=1$, $f_n=0$. Si $0<x<1$, $q=1-x^2\\in(0,1)$ y $n^2q^n\\to0$ (una geométrica le gana a cualquier polinomio: $n^2q^n$ tiene cociente $\\tfrac{(n+1)^2}{n^2}q\\to q<1$). Límite $f\\equiv0$.</p>',
      },
      {
        idea: '(a)-iv. $f_n(x)=xe^{-nx^2}$ en $\\mathbb{R}$',
        detalle: '<p>En $x=0$ vale $0$. Si $x\\ne0$, $e^{-nx^2}\\to0$. Límite $f\\equiv0$.</p>',
      },
      {
        idea: '(b)-i. Uniforme sobre $(0,\\tfrac12)$',
        detalle: '<p>Si $0<x<\\tfrac12$, $|x^n-0|\\le(\\tfrac12)^n\\to0$, y la cota no depende de $x$. Luego $\\sup_{(0,1/2)}|f_n-f|\\le2^{-n}\\to0$: uniforme.</p>',
      },
      {
        idea: '(b)-ii. Uniforme sobre $[2,5]$',
        detalle: '<p>Para $x\\in[2,5]$: $0\\le x^{-n}e^x\\le2^{-n}e^5$ (pues $x\\ge2$ y $e^x\\le e^5$). Luego $\\sup_{[2,5]}|f_n|\\le e^5\\,2^{-n}\\to0$: uniforme.</p>',
      },
      {
        idea: '(c)-i. En $(-1,1]$ NO es uniforme',
        detalle: '<p>Las $f_n(x)=x^n$ son continuas y el límite puntual es discontinuo en $1$. Por el Teorema 7.6, si fuera uniforme el límite sería continuo: absurdo. (Directo: $a_n=2^{-1/n}$ da $f_n(a_n)=\\tfrac12$, error $\\tfrac12$.)</p>',
      },
      {
        idea: '(c)-ii. En $(1,+\\infty)$ NO es uniforme',
        detalle: '<p>Para $n$ fijo, $x^{-n}e^x\\to+\\infty$ cuando $x\\to+\\infty$ (la exponencial gana a la potencia): $\\sup_{(1,\\infty)}|f_n|=+\\infty$ y no puede tender a $0$. Es decir $f_n$ ni siquiera es acotada en $A$.</p>',
      },
      {
        idea: '(c)-iii. En $[0,1]$ NO es uniforme',
        detalle: '<p>Tomamos $a_n=\\tfrac1n$: $f_n(a_n)=n^2\\tfrac1n\\big(1-\\tfrac1{n^2}\\big)^n=n\\big(1-\\tfrac1{n^2}\\big)^n\\ge n\\big(1-\\tfrac n{n^2}\\big)=n-1\\to\\infty$ (Bernoulli: $(1-t)^n\\ge1-nt$). El error no tiende a $0$: no es uniforme. (Cada $f_n$ tiene un "pico" que se hace alto y angosto cerca de $0$.)</p>',
      },
      {
        idea: '(c)-iv. En $\\mathbb{R}$ SÍ es uniforme',
        detalle: '<p>$f_n$ es impar; para $x\\ge0$, $f_n\'(x)=e^{-nx^2}(1-2nx^2)$, que se anula en $x_n=\\tfrac1{\\sqrt{2n}}$ y es el máximo. Entonces $\\sup_{\\mathbb{R}}|f_n|=f_n(x_n)=\\tfrac1{\\sqrt{2n}}e^{-1/2}\\to0$. Convergencia <strong>uniforme</strong> en $\\mathbb{R}$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Resumen: i no (límite discontinuo), ii no en $(1,\\infty)$ pero sí en $[2,5]$, iii no (pico que escapa hacia $0$), iv sí (el máximo $\\tfrac{e^{-1/2}}{\\sqrt{2n}}$ se calcula derivando). Regla práctica: si $f_n\\to f$ puntual pero $\\sup|f_n-f|$ no baja, buscá el punto del máximo derivando $f_n-f$.',
  },
  {
    fuente: 'Práctica 7 · Ej. 4', enunciado: E(4),
    idea: '(a) Cota uniforme: $|f|\\le|f-f_N|+|f_N|$ con $N$ tal que $\\sup|f-f_N|<1$. Para puntual se necesita contraejemplo con $f_n$ acotadas cuyas cotas crecen. (b) Se completa con las finitas primeras funciones.',
    pasos: [
      {
        idea: '(a) $f_n\\Rightarrow f$ y $f_n$ acotadas $\\Rightarrow f$ acotada',
        detalle: '<p>Como $f_n\\Rightarrow f$, existe $N$ tal que $|f_N(x)-f(x)|<1$ para todo $x\\in X$. Sea $M_N$ una cota de $f_N$ ($f_N\\in B(X)$). Entonces $|f(x)|\\le|f(x)-f_N(x)|+|f_N(x)|<1+M_N$ para todo $x$: $f\\in B(X)$.</p>',
      },
      {
        idea: '(a) Con convergencia solo puntual NO vale',
        detalle: '<p>$X=[0,+\\infty)$ y $f_n(x)=\\min(x,n)$. Cada $f_n$ es acotada (por $n$) y $f_n(x)\\to x$ puntualmente (si $n\\ge x$, $f_n(x)=x$). Pero el límite $f(x)=x$ no es acotado: $f\\notin B(X)$. (No hay convergencia uniforme: $\\sup|f_n-f|=\\infty$.)</p>',
      },
      {
        idea: '(b) Uniformemente acotada',
        detalle: '<p>Sea $f$ el límite uniforme; por (a), $f\\in B(X)$, digamos $|f|\\le M_f$. Existe $n_0$ con $\\sup_x|f_n(x)-f(x)|<1$ para $n\\ge n_0$, y entonces $|f_n(x)|<1+M_f$ para $n\\ge n_0$. Para los finitos $n<n_0$ cada $f_n$ tiene su cota $M_n$. Tomando $M=\\max\\{1+M_f,M_1,\\dots,M_{n_0-1}\\}$ (y $M>0$), se cumple $|f_n(x)|\\le M$ para todo $x$ y todo $n$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La convergencia uniforme preserva la acotación y da una cota común para toda la sucesión; la puntual no ($\\min(x,n)\\to x$). Es el mismo mecanismo que en el Ej. 7.10 de la teoría: "uniforme" convierte un control puntual en control global.',
  },
  {
    fuente: 'Práctica 7 · Ej. 5', enunciado: E(5),
    idea: 'Calcular el límite puntual de $f_n$ y de $f_n\'$, y comparar: ¿la derivada del límite es el límite de las derivadas? Con convergencia uniforme (Teorema 7.6/Prop. 7.15) sí; acá se verá que falla.',
    pasos: [
      {
        idea: 'Límite puntual de $f_n$',
        detalle: '<p>$f_n(0)=0$ para todo $n$. Si $x\\in(0,1]$: $f_n(x)=\\tfrac{nx^2}{1+nx^2}=1-\\tfrac1{1+nx^2}\\to1$. Límite puntual: $f(0)=0$ y $f(x)=1$ para $x\\in(0,1]$ (discontinuo en $0$).</p>',
      },
      {
        idea: '$(f_n)$ no converge uniformemente',
        detalle: '<p>Cada $f_n$ es continua y el límite $f$ no lo es; por el Teorema 7.6 la convergencia no puede ser uniforme. Directo: $a_n=\\tfrac1{\\sqrt n}$ da $f_n(a_n)=\\tfrac{1}{2}$ y $|f_n(a_n)-f(a_n)|=\\tfrac12$.</p>',
      },
      {
        idea: 'Derivadas y su límite puntual',
        detalle: '<p>$f_n\'(x)=\\dfrac{2nx}{(1+nx^2)^2}$. En $x=0$ vale $0$. Si $x>0$, $f_n\'(x)\\le\\dfrac{2nx}{n^2x^4}=\\dfrac2{n\\,x^3}\\to0$. Límite puntual de $(f_n\')$: $g\\equiv0$.</p>',
      },
      {
        idea: '$(f_n\')$ no converge uniformemente',
        detalle: '<p>Con $a_n=\\tfrac1{\\sqrt n}$: $f_n\'(a_n)=\\dfrac{2n\\,n^{-1/2}}{(1+1)^2}=\\dfrac{\\sqrt n}2\\to\\infty$. El sup no baja a $0$ (ni siquiera es acotado): no es uniforme.</p>',
      },
      {
        idea: 'Moraleja: derivar y pasar al límite no conmutan',
        detalle: '<p>$f$ ni siquiera es derivable (ni continua) en $0$, mientras que $f_n\'\\to0$ puntualmente. Recordá la Prop. 7.15: para concluir "$f\'=\\lim f_n\'$" hace falta convergencia <em>uniforme de las derivadas</em>; acá falta justamente eso. $\\blacksquare$</p>',
      },
    ],
    conclusion: '$f_n\\to f$ puntualmente (límite discontinuo), $f_n\'\\to0$ puntualmente, y ninguna de las dos convergencias es uniforme. Los dos picos (en $f_n$ el salto que se afina cerca de $0$, en $f_n\'$ el pico que sube como $\\sqrt n$) viven en $x\\approx n^{-1/2}$.',
  },
  {
    fuente: 'Práctica 7 · Ej. 6', enunciado: E(6),
    idea: '(a) desigualdad triangular. (b) Para el producto se usa el truco de sumar y restar $f_ng$ y las cotas uniformes.',
    pasos: [
      {
        idea: '(a) Suma',
        detalle: '<p>Dado $\\varepsilon>0$ existen $n_1,n_2$ tales que $|f_n-f|<\\tfrac\\varepsilon2$ para $n\\ge n_1$ y $|g_n-g|<\\tfrac\\varepsilon2$ para $n\\ge n_2$ (en todo $X$). Para $n\\ge\\max(n_1,n_2)$ y todo $x$: $|(f_n+g_n)(x)-(f+g)(x)|\\le|f_n-f|+|g_n-g|<\\varepsilon$.</p>',
      },
      {
        idea: '(b) Cota común',
        detalle: '<p>Sea $M>0$ tal que $|f_n|\\le M$ y $|g_n|\\le M$ para todo $n$ y todo $x$. Como $f_n(x)\\to f(x)$ y $g_n(x)\\to g(x)$ puntualmente, pasando al límite $|f(x)|\\le M$ y $|g(x)|\\le M$.</p>',
      },
      {
        idea: '(b) Producto',
        detalle: '<p>$f_ng_n-fg=f_n(g_n-g)+g(f_n-f)$. Entonces $|f_ng_n-fg|\\le M|g_n-g|+M|f_n-f|$. Dado $\\varepsilon>0$, para $n$ grande ambos $|g_n-g|,|f_n-f|<\\tfrac{\\varepsilon}{2M}$ en todo $X$, y así $|f_ng_n-fg|<\\varepsilon$ en todo $X$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La convergencia uniforme respeta sumas siempre, y productos si hay acotación uniforme. Sin acotación falla: $f_n(x)=x+\\tfrac1n\\Rightarrow x$ en $\\mathbb{R}$, pero $f_n^2=x^2+\\tfrac{2x}n+\\tfrac1{n^2}$ no converge uniformemente a $x^2$ en $\\mathbb{R}$ (el error $\\tfrac{2x}n$ no está acotado).',
  },
  {
    fuente: 'Práctica 7 · Ej. 7', enunciado: E(7),
    idea: 'Argumento "$\\varepsilon/3$": aproximar $f$ por una $f_{n_0}$ que ya es uniformemente continua, y usar la uniformidad de la aproximación para trasladar la propiedad.',
    pasos: [
      {
        idea: 'Elegir $n_0$ por la convergencia uniforme',
        detalle: '<p>Dado $\\varepsilon>0$, como $f_n\\Rightarrow f$ existe $n_0$ con $d\'(f_{n_0}(x),f(x))<\\tfrac\\varepsilon3$ para <em>todo</em> $x\\in X$.</p>',
      },
      {
        idea: 'Elegir $\\delta$ por la continuidad uniforme de $f_{n_0}$',
        detalle: '<p>$f_{n_0}$ es uniformemente continua: existe $\\delta>0$ tal que $d(x,y)<\\delta\\Rightarrow d\'(f_{n_0}(x),f_{n_0}(y))<\\tfrac\\varepsilon3$, el mismo $\\delta$ para todos los $x,y$.</p>',
      },
      {
        idea: 'Desigualdad triangular',
        detalle: '<p>Si $d(x,y)<\\delta$: $d\'(f(x),f(y))\\le d\'(f(x),f_{n_0}(x))+d\'(f_{n_0}(x),f_{n_0}(y))+d\'(f_{n_0}(y),f(y))<\\tfrac\\varepsilon3+\\tfrac\\varepsilon3+\\tfrac\\varepsilon3=\\varepsilon$. El $\\delta$ no depende de $x,y$: $f$ es uniformemente continua. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Es la demostración del Teorema 7.6 (continuidad) en versión uniforme: lo único que cambia es que $\\delta$ ahora es global. Con convergencia solo puntual falla ($x^n$ en $[0,1]$: continuas, límite discontinuo).',
  },
  {
    fuente: 'Práctica 7 · Ej. 8', enunciado: E(8),
    idea: 'La cota de derivadas da, por el teorema del valor medio, que cada $f_n$ es $c$-Lipschitz. Esa propiedad sobrevive al límite puntual, y Lipschitz implica continuidad. (No se necesita convergencia uniforme.)',
    pasos: [
      {
        idea: 'Cada $f_n$ es Lipschitz de constante $c$',
        detalle: '<p>Sean $x<y$ en $[a,b]$. Por el TVM existe $\\xi\\in(x,y)$ con $f_n(y)-f_n(x)=f_n\'(\\xi)(y-x)$, así $|f_n(y)-f_n(x)|\\le c\\,|y-x|$ para todo $n$.</p>',
      },
      {
        idea: 'Pasar al límite puntual',
        detalle: '<p>Fijados $x,y$, hacemos $n\\to\\infty$ en la desigualdad: $f_n(x)\\to f(x)$, $f_n(y)\\to f(y)$, y el valor absoluto es continuo, así $|f(y)-f(x)|\\le c\\,|y-x|$.</p>',
      },
      {
        idea: 'Lipschitz ⟹ continua',
        detalle: '<p>Dado $\\varepsilon>0$, con $\\delta=\\varepsilon/c$: $|x-y|<\\delta\\Rightarrow|f(x)-f(y)|<\\varepsilon$. Luego $f$ es continua (incluso uniformemente continua). $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Si las derivadas están uniformemente acotadas, el límite puntual es Lipschitz y por lo tanto continuo. Moraleja: la cota $|f_n\'|\\le c$ evita los saltos y los picos finos, que son los que romperían la continuidad del límite.',
  },
  {
    fuente: 'Práctica 7 · Ej. 9', enunciado: E(9),
    idea: 'Las sumas parciales $S_N=\\sum_{n\\le N}f_n$ son continuas y convergen uniformemente a $f$; luego aplicar el Teorema 7.6 (continuidad) y la Prop. 7.13 (integral y límite uniforme).',
    pasos: [
      {
        idea: '(a) $f$ es continua',
        detalle: '<p>Cada $S_N$ es suma finita de continuas, luego continua. Por hipótesis $S_N\\Rightarrow f$ (esto es lo que significa que la serie converge uniformemente). Por el Teorema 7.6 el límite uniforme de continuas es continuo: $f$ es continua en $X$. $\\blacksquare$</p>',
      },
      {
        idea: '(b) Integral del límite',
        detalle: '<p>Si $X=[a,b]$, las $S_N$ y $f$ son continuas con $S_N\\Rightarrow f$; por la Prop. 7.13, $\\int_a^bS_N\\to\\int_a^bf$.</p>',
      },
      {
        idea: '(b) Integral de la suma parcial',
        detalle: '<p>Por linealidad de la integral, $\\int_a^bS_N=\\sum_{n=1}^N\\int_a^bf_n$. Entonces $\\sum_{n=1}^N\\int_a^bf_n\\to\\int_a^bf$, es decir $\\int_a^b\\sum_{n\\ge1}f_n=\\sum_{n\\ge1}\\int_a^bf_n$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Con convergencia uniforme, se puede pasar el límite a través de la integral y la continuidad ("integrar término a término"). Sin ella no: los picos $f_n(x)=n^2x(1-x^2)^n$ del Ej. 3-iii tienden a $0$ puntualmente pero $\\int_0^1f_n=\\tfrac{n^2}{2(n+1)}\\to+\\infty\\ne0=\\int_0^1\\lim f_n$.',
  },
  {
    fuente: 'Práctica 7 · Ej. 10', enunciado: E(10),
    idea: 'Herramienta: <strong>criterio M de Weierstrass</strong> — si $|u_k(x)|\\le M_k$ en un conjunto $D$ y $\\sum M_k<\\infty$, entonces $\\sum u_k$ converge absoluta y uniformemente en $D$ (la cola uniformemente chica sale de $\\sum_{k>N}M_k\\to0$). Para $\\sin$: acotar el resto de Taylor y usar que los polinomios no están acotados.',
    pasos: [
      {
        idea: 'Criterio M (lo demostramos)',
        detalle: '<p>Sea $|u_k(x)|\\le M_k$ para todo $x\\in D$ con $\\sum M_k<\\infty$. Para cada $x$, $\\sum u_k(x)$ converge absolutamente (comparación). Y para $N$ fijo, $\\big|\\sum_{k>N}u_k(x)\\big|\\le\\sum_{k>N}M_k$ para todo $x\\in D$; como la cola de una serie convergente tiende a $0$, $\\sup_D|S(x)-S_N(x)|\\to0$: convergencia uniforme.</p>',
      },
      {
        idea: '(a) La serie de Taylor representa a $\\sin x$',
        detalle: '<p>Sea $P_m(x)$ el polinomio de Taylor de $\\sin$ en $0$ de grado $m$. Por el resto de Lagrange, $|\\sin x-P_m(x)|\\le\\dfrac{|x|^{m+1}}{(m+1)!}$ (toda derivada de $\\sin$ está acotada por $1$). Como $\\tfrac{|x|^{m+1}}{(m+1)!}\\to0$ para todo $x$ (es el término general de la serie de $e^{|x|}$), $\\sin x=\\sum_{k\\ge0}\\tfrac{(-1)^k}{(2k+1)!}x^{2k+1}$.</p>',
      },
      {
        idea: '(a) Convergencia absoluta y uniforme en acotados',
        detalle: '<p>Sea $D\\subseteq[-R,R]$. Entonces $\\big|\\tfrac{(-1)^k}{(2k+1)!}x^{2k+1}\\big|\\le M_k:=\\tfrac{R^{2k+1}}{(2k+1)!}$ en $D$. La serie $\\sum M_k$ converge por el criterio del cociente: $\\tfrac{M_{k+1}}{M_k}=\\tfrac{R^2}{(2k+2)(2k+3)}\\to0$. Por el criterio M, la serie converge absoluta y uniformemente en $D$.</p>',
      },
      {
        idea: '(a) En todo $\\mathbb{R}$ NO es uniforme',
        detalle: '<p>Sea $P_N=\\sum_{k\\le N}\\tfrac{(-1)^k}{(2k+1)!}x^{2k+1}$, un polinomio de grado $2N+1\\ge1$. Es no acotado en $\\mathbb{R}$, mientras que $\\sin$ es acotada. Luego $\\sup_{x\\in\\mathbb{R}}|\\sin x-P_N(x)|=+\\infty$ para todo $N$, que no tiende a $0$: no hay convergencia uniforme en $\\mathbb{R}$. (Comparalo con el Ej. 4: un límite uniforme de funciones acotadas es acotado; acá los $P_N$ no son acotados pero $\\sin$ sí, y eso ya impide la uniformidad.)</p>',
      },
      {
        idea: '(b) $f(x)=\\sum_{n\\ge0}\\big(\\tfrac{x^n}{n!}\\big)^2$ está bien definida',
        detalle: '<p>Fijado $x$, $\\Big(\\tfrac{x^n}{n!}\\Big)^2\\ge0$ y el cociente de términos consecutivos es $\\dfrac{x^2}{(n+1)^2}\\to0<1$. Por el criterio del cociente la serie converge: $f(x)\\in\\mathbb{R}$ para todo $x$.</p>',
      },
      {
        idea: '(b) Continuidad',
        detalle: '<p>En $[-R,R]$: $\\Big(\\tfrac{x^n}{n!}\\Big)^2\\le M_n:=\\Big(\\tfrac{R^n}{n!}\\Big)^2$ y $\\sum M_n<\\infty$ (mismo cociente con $R$). Por el criterio M la serie converge uniformemente en $[-R,R]$; sus términos son polinomios (continuos), así que por el Ej. 9(a) $f$ es continua en $[-R,R]$. Dado cualquier $x_0$, elegimos $R>|x_0|$ y $f$ es continua en $x_0$ (que es interior de $[-R,R]$). Luego $f$ es continua en $\\mathbb{R}$, aunque la convergencia <em>no</em> sea uniforme en todo $\\mathbb{R}$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Truco central de esta práctica: <strong>uniforme en cada acotado ⟹ continua en todo $\\mathbb{R}$</strong>, aunque en $\\mathbb{R}$ entero no haya uniformidad (la continuidad es una propiedad local). El criterio M da la uniformidad con una sola serie numérica convergente.',
  },
  {
    fuente: 'Práctica 7 · Ej. 11', enunciado: E(11),
    idea: 'Serie geométrica en $x$: calcular la suma exacta y el resto $R_N(x)=\\sum_{n>N}f_n(x)$, y estudiar $\\sup R_N$. <strong>Atención: tal como figura en el PDF la afirmación es falsa</strong>; resolvemos el enunciado literal, mostramos dónde falla y resolvemos la versión que casi seguro se pretendía.',
    pasos: [
      {
        idea: 'Lectura literal: $f_n(x)=x^{-n}e^x$, serie geométrica de razón $1/x$',
        detalle: '<p>$\\sum_{n\\ge1}x^{-n}e^x=e^x\\sum_{n\\ge1}(1/x)^n$. Converge sii $|1/x|<1$, o sea $x>1$ (con $x>0$), y suma $\\dfrac{e^x}{x-1}$. En $x\\le1$, $x>0$, el término general $x^{-n}e^x\\ge e^x\\not\\to0$: la serie <strong>diverge</strong>. Por lo tanto no puede converger (menos aún uniformemente) en $[a,\\infty)$ con $0<a\\le1$ ni en $(0,\\infty)$ por falta de convergencia puntual.</p>',
      },
      {
        idea: 'Lectura literal, $a>1$: tampoco es uniforme en $[a,+\\infty)$',
        detalle: '<p>El resto es $R_N(x)=\\sum_{n>N}x^{-n}e^x=\\dfrac{e^x\\,x^{-N}}{x-1}$. Para $N$ fijo, $R_N(x)\\to+\\infty$ cuando $x\\to+\\infty$ ($e^x$ le gana a todo polinomio). Entonces $\\sup_{[a,\\infty)}R_N=+\\infty$ para todo $N$: no hay convergencia uniforme en $[a,\\infty)$. Sí la hay en intervalos <em>acotados</em> $[a,b]$ con $a>1$: $x^{-n}e^x\\le a^{-n}e^b=:M_n$, con $\\sum M_n<\\infty$ (geométrica de razón $1/a<1$); criterio M.</p>',
      },
      {
        idea: 'Versión probablemente intencionada: $f_n(x)=x\\,e^{-nx}$',
        detalle: '<p>Para $x>0$, $\\sum_{n\\ge1}xe^{-nx}$ es geométrica de razón $e^{-x}<1$ y su resto es $R_N(x)=\\sum_{n>N}xe^{-nx}=\\dfrac{x\\,e^{-(N+1)x}}{1-e^{-x}}=\\dfrac{x\\,e^{-Nx}}{e^x-1}$. (Con la notación del PDF, "$x^{-n}e^x$" y "$xe^{-nx}$" se parecen mucho al perder los superíndices; esta versión es la que cuadra con "$a>0$" y "no en $(0,\\infty)$".)</p>',
      },
      {
        idea: 'Uniforme en $[a,+\\infty)$, $a>0$',
        detalle: '<p>Como $e^x-1\\ge x$, se tiene $\\dfrac x{e^x-1}\\le1$, y entonces $0\\le R_N(x)\\le e^{-Nx}\\le e^{-Na}$ para todo $x\\ge a$. Luego $\\sup_{[a,\\infty)}R_N\\le e^{-Na}\\to0$: convergencia uniforme en $[a,+\\infty)$ (también se ve con criterio de Cauchy uniforme, Def. 7.8).</p>',
      },
      {
        idea: 'NO uniforme en $(0,+\\infty)$',
        detalle: '<p>Tomamos $x_N=\\tfrac1N$ (que está en $(0,\\infty)$): $R_N(x_N)=\\dfrac{\\tfrac1N\\,e^{-1}}{e^{1/N}-1}$. Como $e^{t}-1\\le te^{t}$, $e^{1/N}-1\\le\\tfrac1Ne^{1/N}\\le\\tfrac{e}{N}$, y entonces $R_N(x_N)\\ge\\dfrac{e^{-1}/N}{e/N}=e^{-2}$. El resto no se hace chico uniformemente (Ej. 1): <strong>no</strong> converge uniformemente en $(0,+\\infty)$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Moraleja técnica: para series que se pueden sumar (geométricas) conviene calcular el resto $R_N$ y su sup. Moraleja de estudio: el enunciado literal con $x^{-n}e^x$ no es correcto (diverge en $x\\le1$ y el resto explota en $\\infty$); la versión $xe^{-nx}$ es la que da "uniforme en $[a,\\infty)$ pero no en $(0,\\infty)$". Si en clase lo vieron distinto, consultalo con el docente.',
  },
];
