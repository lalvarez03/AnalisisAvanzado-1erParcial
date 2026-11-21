// Resultados clave — Sucesiones y series de funciones (teórica Cap. 7 · Práctica 7).
// Esquema: { n, ref, d: definiciones formales, e: enunciado, p: demostración, x: ejemplo de uso paso a paso }.
const R = String.raw;

const DEF_CONV = R`<ul><li><strong>Puntual:</strong> $f_n\to f$ si $\forall x\ \forall\varepsilon>0\ \exists n_0\ \forall n\ge n_0:\ d(f_n(x),f(x))<\varepsilon$ ($n_0$ puede depender de $x$).</li>
<li><strong>Uniforme:</strong> $f_n\Rightarrow f$ si $\forall\varepsilon>0\ \exists n_0\ \forall n\ge n_0\ \forall x:\ d(f_n(x),f(x))<\varepsilon$ (el mismo $n_0$ para todo $x$); equivale a $\sup_xd(f_n(x),f(x))\to0$.</li></ul>`;

export const EM_FUNCIONES = [
  {
    n: 'Uniforme $\\Rightarrow$ puntual', ref: 'Obs. 7.4',
    d: DEF_CONV,
    e: R`Si $f_n\Rightarrow f$, entonces $f_n\to f$ puntualmente. La recíproca es falsa: $f_n(x)=x^n$ en $[0,1]$.`,
    p: R`<p>Dado $\varepsilon>0$, el $n_0$ de la convergencia uniforme sirve para todo $x$, en particular para cada $x$ fijado. $\blacksquare$</p>`,
    x: {
      enunciado: R`Mostrar que $f_n(x)=x^n$ en $[0,1]$ converge puntualmente pero no uniformemente.`,
      idea: 'Hallar el límite puntual y puntos $a_n$ donde el error no baja.',
      pasos: [
        { idea: 'Límite puntual', detalle: R`<p>Si $0\le x<1$, $x^n\to0$; si $x=1$, $1^n=1$. Límite $f=0$ en $[0,1)$ y $f(1)=1$.</p>` },
        { idea: 'Testigos', detalle: R`<p>$a_n=2^{-1/n}\in(0,1)$ cumple $a_n^n=\tfrac12$, entonces $|f_n(a_n)-f(a_n)|=\tfrac12$ para todo $n$.</p>` },
        { idea: 'Conclusión', detalle: R`<p>$\sup_x|f_n-f|\ge\tfrac12\not\to0$: no hay convergencia uniforme. $\blacksquare$</p>` },
      ],
      conclusion: 'La convergencia puntual no controla la velocidad: cerca de $x=1$ la convergencia se hace arbitrariamente lenta.',
    },
  },
  {
    n: 'Criterio por supremo y negación de la uniformidad', ref: 'Def. 7.3; Práctica 7, Ej. 1',
    d: DEF_CONV,
    e: R`$f_n\Rightarrow f\iff M_n=\sup_xd(f_n(x),f(x))\to0$. Equivalentemente, $f_n\not\Rightarrow f$ sii existen $\alpha>0$, una subsucesión $n_k$ y puntos $a_k$ con $d(f_{n_k}(a_k),f(a_k))\ge\alpha$.`,
    p: R`<p>($\Rightarrow$) Dado $\varepsilon$, para $n\ge n_0$ y todo $x$, $d<\tfrac\varepsilon2$, así $M_n\le\tfrac\varepsilon2<\varepsilon$. ($\Leftarrow$) Si $M_n\to0$, dado $\varepsilon$ hay $n_0$ con $M_n<\varepsilon$ para $n\ge n_0$, o sea $d<\varepsilon$ para todo $x$. Negación: si $f_n\not\Rightarrow f$ existe $\alpha$ tal que para cada $n_0$ hay $n\ge n_0$ y $a$ con $d\ge\alpha$; eligiendo recursivamente $n_{k+1}>n_k$ se obtiene la subsucesión. El recíproco es inmediato. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $f_n(x)=x\,e^{-nx^2}$ converge uniformemente a $0$ en $\mathbb{R}$.`,
      idea: 'Calcular $M_n=\\sup|f_n|$ derivando.',
      pasos: [
        { idea: 'Límite puntual', detalle: R`<p>$f_n(0)=0$ y, si $x\ne0$, $e^{-nx^2}\to0$: límite $f\equiv0$.</p>` },
        { idea: 'Máximo de $|f_n|$', detalle: R`<p>$f_n$ es impar; para $x\ge0$, $f_n'(x)=e^{-nx^2}(1-2nx^2)=0\iff x=\tfrac1{\sqrt{2n}}$, que es el máximo.</p>` },
        { idea: 'Valor del supremo', detalle: R`<p>$M_n=f_n\big(\tfrac1{\sqrt{2n}}\big)=\tfrac{e^{-1/2}}{\sqrt{2n}}\to0$. Por el criterio, $f_n\Rightarrow0$. $\blacksquare$</p>` },
      ],
      conclusion: 'Receta: límite puntual → $M_n$ (derivar $|f_n-f|$) → ¿$M_n\\to0$?',
    },
  },
  {
    n: 'Límite uniforme de continuas es continuo', ref: 'Teo. 7.6',
    d: DEF_CONV + R`<p>$f$ continua en $x$: $\forall\varepsilon\ \exists\delta:\ d(x,y)<\delta\Rightarrow d'(f(x),f(y))<\varepsilon$.</p>`,
    e: R`Si $f_n:X\to Y$ son continuas y $f_n\Rightarrow f$, entonces $f$ es continua. (Lo mismo vale con "uniformemente continuas" y con "acotadas".)`,
    p: R`<p>Sea $x\in X$ y $\varepsilon>0$. Por la convergencia uniforme existe $n_0$ con $d'(f_{n_0}(z),f(z))<\tfrac\varepsilon3$ para todo $z$. Como $f_{n_0}$ es continua en $x$, existe $\delta$ tal que $d(x,y)<\delta\Rightarrow d'(f_{n_0}(x),f_{n_0}(y))<\tfrac\varepsilon3$. Entonces
$d'(f(x),f(y))\le d'(f(x),f_{n_0}(x))+d'(f_{n_0}(x),f_{n_0}(y))+d'(f_{n_0}(y),f(y))<\varepsilon$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $f_n(x)=\dfrac{nx^2}{1+nx^2}$ en $[0,1]$ no converge uniformemente sin calcular ningún supremo.`,
      idea: 'Las $f_n$ son continuas; si el límite puntual no lo es, la convergencia no puede ser uniforme.',
      pasos: [
        { idea: 'Continuas', detalle: R`<p>Cada $f_n$ es cociente de polinomios con denominador $\ge1$: continua.</p>` },
        { idea: 'Límite puntual', detalle: R`<p>$f_n(0)=0$; si $x>0$, $f_n(x)=1-\tfrac1{1+nx^2}\to1$. El límite es $0$ en $x=0$ y $1$ en $(0,1]$: discontinuo en $0$.</p>` },
        { idea: 'Contrarrecíproca', detalle: R`<p>Si la convergencia fuera uniforme, el límite sería continuo. Luego no lo es. $\blacksquare$</p>` },
      ],
      conclusion: 'Es el atajo más rápido para refutar uniformidad cuando el límite puntual salta.',
    },
  },
  {
    n: 'Uniformemente de Cauchy $\\iff$ convergencia uniforme', ref: 'Def. 7.8, Teo. 7.11; Ej. 7.10',
    d: R`<p><strong>Uniformemente de Cauchy:</strong> $\forall\varepsilon>0\ \exists n_0\ \forall n,m\ge n_0:\ \sup_xd'(f_n(x),f_m(x))<\varepsilon$. <strong>Uniformemente acotada:</strong> $\exists M:\ |f_n(x)|\le M\ \forall x,n$.</p>`,
    e: R`(a) Si $f_n\Rightarrow f$, $(f_n)$ es uniformemente de Cauchy. (b) Si $Y$ es completo y $(f_n)$ es uniformemente de Cauchy, existe $f$ con $f_n\Rightarrow f$. (c) Si las $f_n$ son acotadas y uniformemente de Cauchy, están uniformemente acotadas.`,
    p: R`<p>(a) $d'(f_n,f_m)\le d'(f_n,f)+d'(f,f_m)<\varepsilon$ si $n,m\ge n_0$ (con $\tfrac\varepsilon2$). (b) Para cada $x$, $(f_n(x))$ es de Cauchy en $Y$ completo, converge a $f(x)$. Dado $\varepsilon$ y $n_0$ para $\tfrac\varepsilon2$: para $n\ge n_0$ y $m\to\infty$, $d'(f_n(x),f(x))\le\tfrac\varepsilon2<\varepsilon$ para todo $x$. (c) Con $\varepsilon=1$: para $n\ge n_0$, $|f_n|\le|f_{n_0}|+1\le M_{n_0}+1$; se toma el máximo con las cotas de $f_1,\dots,f_{n_0-1}$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $S_n(x)=\sum_{k=1}^n\dfrac{\sin(kx)}{k^2}$ converge uniformemente en $\mathbb{R}$ sin conocer el límite.`,
      idea: 'Probar que es uniformemente de Cauchy y usar la completitud de $\\mathbb{R}$.',
      pasos: [
        { idea: 'Diferencia de sumas parciales', detalle: R`<p>Para $n>m$: $|S_n(x)-S_m(x)|\le\sum_{k=m+1}^n\tfrac1{k^2}$ (pues $|\sin|\le1$).</p>` },
        { idea: 'Acotar la cola', detalle: R`<p>$\sum_{k>m}\tfrac1{k^2}\le\sum_{k>m}\tfrac1{k(k-1)}=\tfrac1m\to0$ (telescópica). La cota no depende de $x$.</p>` },
        { idea: 'Conclusión', detalle: R`<p>$(S_n)$ es uniformemente de Cauchy; como $\mathbb{R}$ es completo, converge uniformemente en $\mathbb{R}$ a una función continua (límite uniforme de continuas). $\blacksquare$</p>` },
      ],
      conclusion: 'Es el esqueleto del criterio M de Weierstrass: se controla la cola con una serie numérica.',
    },
  },
  {
    n: '$B(X)$ y $C(K)$ son espacios métricos completos', ref: 'Ejemplo 7.12',
    d: R`<p>$B(X)=\{f:X\to\mathbb{R}\text{ acotada}\}$, $C(K)$ las continuas sobre un compacto $K$, ambos con $d_\infty(f,g)=\sup_x|f(x)-g(x)|$.</p>`,
    e: R`$(B(X),d_\infty)$ y $(C(K),d_\infty)$ son completos. Todo subconjunto cerrado de ellos también.`,
    p: R`<p>Una $d_\infty$-Cauchy es uniformemente de Cauchy; por el resultado anterior converge uniformemente a un $f$. En $B(X)$, $f$ es acotada ($|f|\le|f_{n_0}|+1$). En $C(K)$, $f$ es continua (Teo. 7.6) y $K$ compacto da que es acotada. Y $d_\infty(f_n,f)\to0$. Cerrados de completos son completos. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $Z=\{f\in C[0,1]:f(0)=0\}$ es completo con $d_\infty$.`,
      idea: 'Es un cerrado de un completo.',
      pasos: [
        { idea: 'Completo ambiente', detalle: R`<p>$C[0,1]$ con $d_\infty$ es completo ($[0,1]$ es compacto).</p>` },
        { idea: '$Z$ cerrado', detalle: R`<p>$Z=\mathrm{ev}_0^{-1}(\{0\})$ y la evaluación es continua ($|f(0)-g(0)|\le d_\infty(f,g)$): preimagen de un cerrado.</p>` },
        { idea: 'Conclusión', detalle: R`<p>Cerrado en completo es completo. $\blacksquare$</p>` },
      ],
      conclusion: 'Esto se usa para resolver ecuaciones: se construye una sucesión de funciones y se la hace converger dentro del espacio completo adecuado.',
    },
  },
  {
    n: 'Integral del límite uniforme', ref: 'Prop. 7.13',
    d: DEF_CONV,
    e: R`Si $f_n,f:[a,b]\to\mathbb{R}$ son continuas y $f_n\Rightarrow f$, entonces $\int_a^bf_n\to\int_a^bf$, con error $\le(b-a)\,d_\infty(f_n,f)$.`,
    p: R`<p>$\Big|\int_a^bf_n-\int_a^bf\Big|\le\int_a^b|f_n-f|\le\int_a^bd_\infty(f_n,f)\,dx=(b-a)\,d_\infty(f_n,f)\to0$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Calcular $\lim\int_0^\pi\dfrac{\sin(nx)}n\,dx$ y mostrar un caso donde el intercambio falla.`,
      idea: 'En el primero hay convergencia uniforme; en el segundo, no.',
      pasos: [
        { idea: 'Convergencia uniforme', detalle: R`<p>$f_n=\tfrac{\sin nx}n$ cumple $|f_n|\le\tfrac1n$: $f_n\Rightarrow0$.</p>` },
        { idea: 'Intercambiar', detalle: R`<p>Por el resultado el límite de las integrales es $\int_0^\pi0=0$. (Directo: $\int_0^\pi\tfrac{\sin nx}n=\tfrac{1-\cos n\pi}{n^2}\le\tfrac2{n^2}\to0$.)</p>` },
        { idea: 'Falla sin uniformidad', detalle: R`<p>$g_n(x)=n^2x(1-x^2)^n\to0$ puntualmente en $[0,1]$ pero $\int_0^1g_n=\tfrac{n^2}{2(n+1)}\to\infty\ne\int_0^10$. $\blacksquare$</p>` },
      ],
      conclusion: 'El límite puntual no alcanza para pasar el límite adentro de la integral: hace falta uniformidad (o dominación, en teoría de la medida).',
    },
  },
  {
    n: 'Derivada del límite', ref: 'Prop. 7.15',
    d: R`<p>$C^1([a,b])$: funciones derivables con derivada continua. $f_n\to f$ puntualmente y $f_n'\Rightarrow g$.</p>`,
    e: R`Si $f_n\in C^1([a,b])$, $f_n\to f$ puntualmente y $f_n'\Rightarrow g$, entonces $f$ es derivable y $f'=g$.`,
    p: R`<p>$g$ es continua (límite uniforme de continuas). Por el teorema fundamental del cálculo, $f_n(x)-f_n(a)=\int_a^xf_n'(t)\,dt$. Pasando al límite (Prop. 7.13 para $f_n'\Rightarrow g$): $f(x)-f(a)=\int_a^xg(t)\,dt$. Otra vez por el TFC, $f$ es derivable y $f'=g$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Comparar $f_n(x)=\tfrac{\sin nx}n$ (con $f_n\Rightarrow0$) y $h_n(x)=x+\tfrac{x^n}n$ en $[0,\tfrac12]$.`,
      idea: 'La uniformidad de las <em>derivadas</em> es lo que se necesita; que las funciones converjan uniformemente no alcanza.',
      pasos: [
        { idea: '$f_n$', detalle: R`<p>$f_n\Rightarrow0$ pero $f_n'(x)=\cos nx$ no converge (en $x=0$ vale $1$, en $x=\tfrac\pi{2n}$ vale $0$): la hipótesis sobre las derivadas falla, y de hecho $0'=0\ne\lim f_n'$.</p>` },
        { idea: '$h_n$', detalle: R`<p>$h_n\to x$ y $h_n'(x)=1+x^{n-1}\Rightarrow1$ en $[0,\tfrac12]$, porque $\sup x^{n-1}\le2^{-(n-1)}\to0$.</p>` },
        { idea: 'Aplicar', detalle: R`<p>Por el resultado, $f(x)=x$ es derivable con $f'=1=\lim h_n'$. $\blacksquare$</p>` },
      ],
      conclusion: 'Derivar es más delicado que integrar: derivar amplifica oscilaciones, por eso la hipótesis recae en $f_n\'$.',
    },
  },
  {
    n: 'Series de funciones y criterio M de Weierstrass', ref: 'Práctica 7, Ej. 9–11',
    d: R`<p>$\sum f_n$ converge (puntual o uniformemente) si lo hacen las sumas parciales $S_N=\sum_{n\le N}f_n$. <strong>Criterio M:</strong> $|u_n(x)|\le M_n$ para todo $x\in D$ y $\sum M_n<\infty$.</p>`,
    e: R`(a) <strong>Criterio M:</strong> si $|u_n|\le M_n$ en $D$ y $\sum M_n<\infty$, entonces $\sum u_n$ converge absoluta y uniformemente en $D$. (b) Si las $f_n$ son continuas y $\sum f_n$ converge uniformemente, la suma es continua y, en $[a,b]$, $\int\sum f_n=\sum\int f_n$. (c) Uniforme en cada conjunto acotado implica suma continua en todo $\mathbb{R}$.`,
    p: R`<p>(a) Para cada $x$ converge absolutamente por comparación; la cola cumple $\Big|\sum_{n>N}u_n(x)\Big|\le\sum_{n>N}M_n$ para todo $x$, y la cola numérica tiende a $0$: $\sup_D|S-S_N|\to0$. (b) Las sumas parciales son continuas y convergen uniformemente: continuidad por Teo. 7.6 e integral por Prop. 7.13. (c) La continuidad es local: dado $x_0$, se toma $[-R,R]\ni x_0$ en su interior. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $f(x)=\sum_{n\ge1}\dfrac{\cos(nx)}{n^2}$ es continua en $\mathbb{R}$ y calcular $\int_0^\pi f(x)\,dx$.`,
      idea: 'Criterio M con $M_n=\\tfrac1{n^2}$, luego integrar término a término.',
      pasos: [
        { idea: 'Criterio M', detalle: R`<p>$\left|\tfrac{\cos nx}{n^2}\right|\le\tfrac1{n^2}=M_n$ y $\sum\tfrac1{n^2}=\tfrac{\pi^2}6<\infty$. La serie converge absoluta y uniformemente en todo $\mathbb{R}$.</p>` },
        { idea: 'Continuidad', detalle: R`<p>Los términos son continuos; por (b) la suma $f$ es continua en $\mathbb{R}$.</p>` },
        { idea: 'Integral', detalle: R`<p>Término a término: $\int_0^\pi\tfrac{\cos nx}{n^2}dx=\tfrac{\sin n\pi}{n^3}=0$. Luego $\int_0^\pi f=\sum0=0$. $\blacksquare$</p>` },
      ],
      conclusion: 'Cuando hay una serie numérica convergente que domina, el criterio M te regala uniformidad, continuidad e intercambio con la integral de una vez.',
    },
  },
];
