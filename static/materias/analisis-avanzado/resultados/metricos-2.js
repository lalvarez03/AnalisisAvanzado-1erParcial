// Resultados clave — Cauchy y completitud (teórica Cap. 4.2–4.3 · Práctica 3).
// Esquema: { n, ref, d: definiciones formales, e: enunciado, p: demostración, x: ejemplo de uso paso a paso }.
const R = String.raw;

const DEF_SUC = R`<ul><li><strong>Convergencia:</strong> $x_n\to x$ si $\forall\varepsilon>0\ \exists n_0\ \forall n\ge n_0:\ d(x_n,x)<\varepsilon$.</li>
<li><strong>Sucesión de Cauchy:</strong> $\forall\varepsilon>0\ \exists n_0\ \forall n,m\ge n_0:\ d(x_n,x_m)<\varepsilon$.</li>
<li><strong>Completo:</strong> $(E,d)$ es completo si toda sucesión de Cauchy converge a un punto de $E$.</li></ul>`;

export const EM_CAUCHY = [
  {
    n: 'Convergente $\\Rightarrow$ Cauchy $\\Rightarrow$ acotada', ref: 'Cap. 4.2',
    d: DEF_SUC,
    e: R`Toda sucesión convergente es de Cauchy, y toda sucesión de Cauchy está acotada. La recíproca de la primera es falsa en espacios no completos.`,
    p: R`<p>Si $x_n\to x$: $d(x_n,x_m)\le d(x_n,x)+d(x,x_m)<\varepsilon$ cuando ambos $d(\cdot,x)<\tfrac\varepsilon2$. Si $(x_n)$ es de Cauchy: con $\varepsilon=1$ existe $n_0$ con $d(x_n,x_{n_0})<1$ para $n\ge n_0$; entonces $(x_n)\subseteq B(x_{n_0},R)$ con $R=1+\max\{d(x_k,x_{n_0}):k<n_0\}$. $\blacksquare$</p>`,
    x: {
      enunciado: R`En $E=(0,1]$ con $d(x,y)=|x-y|$, mostrar que $x_n=\tfrac1n$ es de Cauchy pero no converge en $E$.`,
      idea: 'La sucesión se acumula en un punto que no pertenece al espacio.',
      pasos: [
        { idea: 'Es de Cauchy', detalle: R`<p>Si $n,m\ge n_0$, $|\tfrac1n-\tfrac1m|\le\tfrac1{n_0}$; basta $n_0>\tfrac1\varepsilon$.</p>` },
        { idea: 'No converge en $E$', detalle: R`<p>En $\mathbb{R}$ tiende a $0$ y el límite es único. Pero $0\notin(0,1]$: ningún punto de $E$ puede ser límite.</p>` },
        { idea: 'Moraleja', detalle: R`<p>Cauchy no implica convergente en un espacio no completo: $(0,1]$ no es completo. $\blacksquare$</p>` },
      ],
      conclusion: 'Cauchy es una propiedad <em>intrínseca</em> de la sucesión; converger depende de que el límite exista dentro del espacio.',
    },
  },
  {
    n: 'Cauchy con una subsucesión convergente converge', ref: 'Prop. 6.11 (ingrediente)',
    d: DEF_SUC,
    e: R`Si $(x_n)$ es de Cauchy y una subsucesión $x_{n_k}\to x$, entonces $x_n\to x$.`,
    p: R`<p>Dado $\varepsilon>0$ existe $n_0$ con $d(x_n,x_m)<\tfrac\varepsilon2$ para $n,m\ge n_0$, y $k$ con $n_k\ge n_0$ y $d(x_{n_k},x)<\tfrac\varepsilon2$. Para $n\ge n_0$: $d(x_n,x)\le d(x_n,x_{n_k})+d(x_{n_k},x)<\varepsilon$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $\mathbb{R}$ es completo usando este resultado y Bolzano–Weierstrass.`,
      idea: 'Cauchy ⇒ acotada ⇒ subsucesión convergente ⇒ toda la sucesión converge.',
      pasos: [
        { idea: 'Acotada', detalle: R`<p>Una sucesión de Cauchy está acotada.</p>` },
        { idea: 'Subsucesión', detalle: R`<p>Por Bolzano–Weierstrass tiene una subsucesión $x_{n_k}\to x\in\mathbb{R}$.</p>` },
        { idea: 'Toda la sucesión', detalle: R`<p>Por el resultado, $x_n\to x$. Toda sucesión de Cauchy de $\mathbb{R}$ converge: $\mathbb{R}$ es completo. $\blacksquare$</p>` },
      ],
      conclusion: 'La completitud de $\\mathbb{R}$ proviene en última instancia del axioma del supremo (vía Bolzano–Weierstrass).',
    },
  },
  {
    n: 'La distancia es continua respecto de las sucesiones', ref: 'Práctica 3, Ej. 13',
    d: DEF_SUC,
    e: R`Si $x_n\to x$ e $y_n\to y$, entonces $d(x_n,y_n)\to d(x,y)$. Si $(x_n)$ e $(y_n)$ son de Cauchy, la sucesión de reales $d(x_n,y_n)$ converge.`,
    p: R`<p>Por la desigualdad triangular inversa, $|d(x_n,y_n)-d(x,y)|\le d(x_n,x)+d(y_n,y)\to0$. Para Cauchy: $|d(x_n,y_n)-d(x_m,y_m)|\le d(x_n,x_m)+d(y_n,y_m)<\varepsilon$ para $n,m$ grandes, así $(d(x_n,y_n))$ es de Cauchy en $\mathbb{R}$ y converge por completitud. $\blacksquare$</p>`,
    x: {
      enunciado: R`En $E=(0,1]$ sea $x_n=\tfrac1n$, $y_n=\tfrac1{2n}$ (ambas de Cauchy y no convergentes en $E$). ¿Converge $d(x_n,y_n)$?`,
      idea: 'Aunque las sucesiones no tengan límite en $E$, la sucesión de distancias sí converge.',
      pasos: [
        { idea: 'Calcular', detalle: R`<p>$d(x_n,y_n)=\tfrac1n-\tfrac1{2n}=\tfrac1{2n}$.</p>` },
        { idea: 'Converge', detalle: R`<p>$\tfrac1{2n}\to0$, como asegura el resultado. $\blacksquare$</p>` },
      ],
      conclusion: 'Esto permite "completar" un espacio métrico: la distancia entre clases de sucesiones de Cauchy está bien definida.',
    },
  },
  {
    n: '$\\mathbb{R}^n$ es completo; $\\mathbb{Q}$ no', ref: 'Práctica 3, Ej. 14',
    d: DEF_SUC,
    e: R`$(\mathbb{R}^n,d_1)$, $(\mathbb{R}^n,d_2)$ y $(\mathbb{R}^n,d_\infty)$ son completos. $\mathbb{Q}$ con $|\cdot|$ no es completo.`,
    p: R`<p>Sea $(x^{(k)})$ de Cauchy en $d_\infty$ (equivalente a las otras). Como $|x^{(k)}_i-x^{(l)}_i|\le d_\infty$, cada coordenada es de Cauchy en $\mathbb{R}$ y converge a $x_i$. Entonces $d_\infty(x^{(k)},x)=\max_i|x^{(k)}_i-x_i|\to0$ (máximo de finitas sucesiones nulas). Como $d_\infty\le d_2\le d_1\le nd_\infty$, la convergencia es la misma para las tres. $\mathbb{Q}$: las aproximaciones decimales de $\sqrt2$ ($1;1{,}4;1{,}41;\dots$) son racionales, de Cauchy en $\mathbb{R}$, y su único límite $\sqrt2\notin\mathbb{Q}$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Decidir si son completos: $[0,1]$, $(0,1)$ y $\mathbb{Z}$ con la distancia usual.`,
      idea: 'Buscar una sucesión de Cauchy que se escape del espacio, o probar que toda de Cauchy converge dentro.',
      pasos: [
        { idea: '$[0,1]$', detalle: R`<p>Una de Cauchy converge en $\mathbb{R}$ a un $x$; como $[0,1]$ es cerrado, $x\in[0,1]$. Completo.</p>` },
        { idea: '$(0,1)$', detalle: R`<p>$\tfrac1{n+1}$ es de Cauchy y su límite $0\notin(0,1)$. No completo.</p>` },
        { idea: '$\\mathbb{Z}$', detalle: R`<p>Con $\varepsilon=\tfrac12$: $|x_n-x_m|<\tfrac12$ y enteros implican $x_n=x_m$; toda de Cauchy es eventualmente constante y converge. Completo. $\blacksquare$</p>` },
      ],
      conclusion: 'Completitud es una propiedad del <em>espacio</em>, no de la métrica sola: $(0,1)$ y $\\mathbb{R}$ son homeomorfos pero uno es completo y el otro no.',
    },
  },
  {
    n: 'Cerrado en completo es completo (y recíproco)', ref: 'Práctica 3, Ej. 15',
    d: DEF_SUC,
    e: R`Si $E$ es completo y $A\subseteq E$ es cerrado, entonces $(A,d)$ es completo. Recíprocamente, un subconjunto completo de un espacio métrico cualquiera es cerrado.`,
    p: R`<p>Sea $(a_n)\subseteq A$ de Cauchy. En $E$ converge a un $x$; como $A$ es cerrado (límites de sucesiones de $A$ están en $A$), $x\in A$. Recíprocamente, si $A$ es completo y $a_n\to x$ con $a_n\in A$, $(a_n)$ es de Cauchy, converge en $A$ a algún $a$, y por unicidad $x=a\in A$: $A$ es cerrado. $\blacksquare$</p>`,
    x: {
      enunciado: R`Decidir si son completos $A=\{\tfrac1n\}\cup\{0\}$ y $B=\{\tfrac1n\}$ con la distancia usual.`,
      idea: 'Verificar si son cerrados en $\\mathbb{R}$ (completo).',
      pasos: [
        { idea: '$A$', detalle: R`<p>$A$ es cerrado (contiene a su único punto de acumulación, $0$), así completo.</p>` },
        { idea: '$B$', detalle: R`<p>$B$ no es cerrado ($0\in B'\setminus B$), luego no completo: $(\tfrac1n)$ es de Cauchy en $B$ y su límite $0\notin B$. $\blacksquare$</p>` },
      ],
      conclusion: 'Para subespacios de $\\mathbb{R}^n$, "completo" y "cerrado" son la misma cosa.',
    },
  },
  {
    n: 'Teorema de intersección de Cantor', ref: 'Práctica 3, Ej. 16',
    d: R`<p><strong>Diámetro:</strong> $\operatorname{diam}A=\sup\{d(x,y):x,y\in A\}$.<br><strong>Hipótesis:</strong> $(E,d)$ espacio métrico completo y $(A_n)_{n\in\mathbb{N}}$ sucesión de subconjuntos de $E$ tales que cada $A_n$ es no vacío y cerrado, son encajados ($A_{n+1}\subseteq A_n$ para todo $n$) y $\operatorname{diam}A_n\to 0$.</p>`,
    e: R`Bajo las hipótesis anteriores, $\bigcap_{n=1}^{\infty} A_n$ consta exactamente de un punto.`,
    p: R`<p>Como cada $A_n\neq\varnothing$, elijo $x_n\in A_n$ para cada $n\in\mathbb{N}$.<br><strong>1. $(x_n)$ es de Cauchy y converge:</strong> Dado $\varepsilon>0$, como $\operatorname{diam}A_n\to 0$, existe $N\in\mathbb{N}$ tal que $\operatorname{diam}A_N<\varepsilon$. Por ser encajados, para todos $n,m\ge N$ se tiene $x_n,x_m\in A_N$, luego $d(x_n,x_m)\le\operatorname{diam}A_N<\varepsilon$. Así $(x_n)$ es de Cauchy; como $(E,d)$ es completo, existe $x\in E$ tal que $x_n\to x$.<br><strong>2. $x\in\bigcap_{n=1}^{\infty} A_n$:</strong> Fijado $N\in\mathbb{N}$, la subsucesión cola $(x_n)_{n\ge N}$ está contenida en $A_N$ y converge a $x$. Como $A_N$ es cerrado ($\overline{A_N}=A_N$), resulta $x\in A_N$. Como $N$ es arbitrario, $x\in\bigcap_{n=1}^{\infty} A_n$.<br><strong>3. Unicidad:</strong> Si $x,y\in\bigcap_{n=1}^{\infty} A_n$, entonces $x,y\in A_n$ para todo $n$, por lo que $0\le d(x,y)\le\operatorname{diam}A_n$. Tomando límite cuando $n\to\infty$, como $\operatorname{diam}A_n\to 0$, obtenemos $d(x,y)=0$, y por lo tanto $x=y$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Aplicar el teorema a $A_n=[-\tfrac1n,\tfrac1n]\subseteq\mathbb{R}$ y mostrar que cada hipótesis es necesaria.`,
      idea: 'Verificar todas las hipótesis en el ejemplo y luego construir contraejemplos rompiendo una hipótesis por vez.',
      pasos: [
        { idea: 'Aplicación', detalle: R`<p>En $(\mathbb{R},|\cdot|)$ (completo), cada $A_n=[-\tfrac1n,\tfrac1n]$ es cerrado, no vacío, cumple $A_{n+1}\subseteq A_n$ y $\operatorname{diam}A_n=\tfrac2n\to 0$. Por el teorema, $\bigcap_{n=1}^{\infty} A_n=\{0\}$.</p>` },
        { idea: 'Sin diámetro nulo', detalle: R`<p>$A_n=[n,\infty)\subseteq\mathbb{R}$ es cerrado, no vacío y decreciente, pero $\bigcap_{n=1}^{\infty} A_n=\varnothing$ ($\operatorname{diam}A_n=\infty\not\to 0$).</p>` },
        { idea: 'Sin completitud', detalle: R`<p>En $\mathbb{Q}$, $A_n=\{q\in\mathbb{Q}:|q-\sqrt2|\le\tfrac1n\}$ son cerrados en $\mathbb{Q}$, no vacíos, decrecientes y con $\operatorname{diam}A_n\le\tfrac2n\to 0$, pero $\bigcap_{n=1}^{\infty} A_n=\varnothing$ (el único candidato $\sqrt2\notin\mathbb{Q}$).</p>` },
        { idea: 'Sin cerrados', detalle: R`<p>En $\mathbb{R}$, $A_n=(0,\tfrac1n]$ es no vacío, decreciente y con $\operatorname{diam}A_n=\tfrac1n\to 0$, pero no son cerrados y $\bigcap_{n=1}^{\infty} A_n=\varnothing$.</p>` },
        { idea: 'Sin encajamiento', detalle: R`<p>En $\mathbb{R}$, $A_n=\{n\}$ es cerrado, no vacío y con $\operatorname{diam}A_n=0\to 0$, pero no cumple $A_{n+1}\subseteq A_n$ y $\bigcap_{n=1}^{\infty} A_n=\varnothing$. $\blacksquare$</p>` },
      ],
      conclusion: 'Si falla cualquiera de las hipótesis (completitud, cerrados, encajados o $\\operatorname{diam}A_n\\to 0$), la intersección puede ser vacía (o tener más de un punto si solo falla $\\operatorname{diam}A_n\\to 0$).',
    },
  },
  {
    n: 'Compacto $\\Rightarrow$ completo', ref: 'Prop. 6.11',
    d: DEF_SUC + R`<p><strong>Compacto</strong> (secuencial): toda sucesión de $K$ tiene una subsucesión convergente a un punto de $K$.</p>`,
    e: R`Todo espacio métrico compacto es completo.`,
    p: R`<p>Una sucesión de Cauchy en un compacto tiene una subsucesión convergente; por el resultado anterior, toda la sucesión converge. $\blacksquare$</p>`,
    x: {
      enunciado: R`Usar este resultado para deducir que $(0,1)$ no es compacto y que $[0,1]$ sí es completo.`,
      idea: 'Contrarrecíproca: si no es completo, no es compacto.',
      pasos: [
        { idea: '$(0,1)$', detalle: R`<p>$(0,1)$ no es completo (la sucesión $\tfrac1{n+1}$), luego no es compacto.</p>` },
        { idea: '$[0,1]$', detalle: R`<p>Es compacto (Heine–Borel), luego completo. $\blacksquare$</p>` },
      ],
      conclusion: 'Compacidad = completitud + "total acotación"; por eso es más fuerte que completo.',
    },
  },
  {
    n: 'Espacios de funciones completos', ref: 'Ejemplo 7.12',
    d: R`<p>$B(X)=\{f:X\to\mathbb{R}\text{ acotada}\}$ con $d_\infty(f,g)=\sup_x|f(x)-g(x)|$; $C(K)$ las continuas sobre un compacto $K$.</p>`,
    e: R`$(B(X),d_\infty)$ y $(C(K),d_\infty)$ son completos. En cambio $C([0,1])$ con $d_1(f,g)=\int_0^1|f-g|$ <em>no</em> es completo.`,
    p: R`<p>Una $d_\infty$-Cauchy es uniformemente de Cauchy, así $(f_n(x))$ es de Cauchy en $\mathbb{R}$ para cada $x$ y converge a un $f(x)$. Dado $\varepsilon$, para $n,m\ge n_0$: $|f_n(x)-f_m(x)|<\tfrac\varepsilon2$; haciendo $m\to\infty$, $|f_n(x)-f(x)|\le\tfrac\varepsilon2$ para todo $x$: $f_n\Rightarrow f$. El límite uniforme de acotadas es acotada y el de continuas es continuo (Teo. 7.6). Para $d_1$: $f_n$ continuas que valen $0$ en $[0,\tfrac12-\tfrac1n]$, $1$ en $[\tfrac12,1]$ y lineales en medio, son de Cauchy ($d_1(f_n,f_m)\le\tfrac1{\min(n,m)}$) pero su "límite" es el escalón, que no es continuo. $\blacksquare$</p>`,
    x: {
      enunciado: R`Mostrar que $f_n(x)=x^n$ en $C[0,1]$ no es de Cauchy para $d_\infty$ pero sí para $d_1$.`,
      idea: 'Un testigo punto a punto para $d_\\infty$; la integral para $d_1$.',
      pasos: [
        { idea: 'No Cauchy en $d_\\infty$', detalle: R`<p>En $a=2^{-1/n}$: $f_n(a)=\tfrac12$ y $f_{2n}(a)=\tfrac14$, así $d_\infty(f_n,f_{2n})\ge\tfrac14$ para todo $n$.</p>` },
        { idea: 'Cauchy en $d_1$', detalle: R`<p>$d_1(f_n,f_m)=\left|\tfrac1{n+1}-\tfrac1{m+1}\right|\to0$ (pues $f_n\ge f_m$ si $n\le m$ en $[0,1]$).</p>` },
        { idea: 'Conclusión', detalle: R`<p>Como $C[0,1]$ con $d_\infty$ es completo y $(f_n)$ no es de Cauchy, no converge uniformemente (su límite puntual es discontinuo). Con $d_1$ sí converge, a $0$: $d_1(f_n,0)=\tfrac1{n+1}\to0$. $\blacksquare$</p>` },
      ],
      conclusion: 'La misma sucesión es "buena" en una métrica y "mala" en otra: la completitud depende de la métrica, aun siendo el mismo conjunto de funciones.',
    },
  },
];
