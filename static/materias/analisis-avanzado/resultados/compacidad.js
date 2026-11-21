// Resultados clave — Compacidad y puntos fijos (teórica Cap. 6 · Práctica 5).
// Esquema: { n, ref, d: definiciones formales, e: enunciado, p: demostración, x: ejemplo de uso paso a paso }.
const R = String.raw;

const DEF_COMP = R`<ul><li><strong>Compacto</strong> (def. secuencial): $K\subseteq M$ tal que toda sucesión $(x_n)\subseteq K$ tiene una subsucesión $x_{n_k}\to x$ con $x\in K$.</li>
<li><strong>Cubrimiento por abiertos</strong> de $K$: familia $\{U_i\}$ de abiertos con $K\subseteq\bigcup U_i$. <strong>Subcubrimiento finito:</strong> finitos de ellos que siguen cubriendo $K$.</li>
<li><strong>Acotado:</strong> contenido en alguna bola. <strong>Cerrado:</strong> contiene los límites de sus sucesiones convergentes.</li></ul>`;

export const EM_COMPACIDAD = [
  {
    n: 'Definición y equivalencias de compacidad', ref: 'Def. 6.1, Teo. 6.14',
    d: DEF_COMP + R`<p><strong>Punto de acumulación</strong> de $L$: $x$ tal que toda bola $B(x,r)$ contiene un punto de $L$ distinto de $x$.</p>`,
    e: R`Para $K\subseteq M$ (espacio métrico) son equivalentes: (1) $K$ es compacto; (2) todo subconjunto infinito de $K$ tiene un punto de acumulación en $K$; (3) todo cubrimiento por abiertos de $K$ admite un subcubrimiento finito.`,
    p: R`<p><strong>(1)⇒(2).</strong> Si $L\subseteq K$ es infinito, contiene una sucesión inyectiva $(x_n)$. Una subsucesión converge a $x\in K$, y como los términos son distintos, $x$ es punto de acumulación de $L$.</p>
<p><strong>(2)⇒(1).</strong> Sea $(x_n)\subseteq K$ y $L=\{x_n\}$. Si $L$ es finito, algún valor se repite infinitas veces: hay una subsucesión constante. Si es infinito, tiene un punto de acumulación $x\in K$: elijo $n_1<n_2<\cdots$ con $x_{n_k}\in B(x,\tfrac1k)$ (hay infinitos términos en cada bola), y $x_{n_k}\to x$.</p>
<p><strong>(3)⇒(2).</strong> Si un $L$ infinito no tuviera puntos de acumulación en $K$, cada $x\in K$ tendría una bola $B(x,r_x)$ con a lo sumo un punto de $L$. Esas bolas cubren $K$; un subcubrimiento finito contendría a $L$ en finitos puntos, absurdo. (La implicación (1)⇒(3) usa que un compacto es totalmente acotado y el número de Lebesgue; el curso la acepta sin demostración.) $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $K=\{\tfrac1n:n\ge1\}\cup\{0\}$ es compacto usando la definición por cubrimientos.`,
      idea: 'Un abierto que contiene al $0$ contiene a casi todos los puntos; los que sobran son finitos.',
      pasos: [
        { idea: 'Cubrimiento arbitrario', detalle: R`<p>Sea $\{U_i\}$ un cubrimiento por abiertos de $K$. Algún $U_{i_0}$ contiene a $0$.</p>` },
        { idea: 'Casi todo en un abierto', detalle: R`<p>Como $U_{i_0}$ es abierto, contiene $B(0,r)$; entonces contiene a todos los $\tfrac1n$ con $\tfrac1n<r$, o sea a todos salvo finitos.</p>` },
        { idea: 'Subcubrimiento finito', detalle: R`<p>Los finitos puntos restantes $\tfrac11,\dots,\tfrac1N$ se cubren con un $U_i$ cada uno. En total $U_{i_0}$ más a lo sumo $N$ abiertos más cubren $K$. $\blacksquare$</p>` },
      ],
      conclusion: 'La técnica general: el "mal comportamiento" en el punto límite se cubre con un abierto grande y el resto es finito.',
    },
  },
  {
    n: 'Compacto $\\Rightarrow$ cerrado y acotado', ref: 'Prop. 6.3',
    d: DEF_COMP,
    e: R`Todo subconjunto compacto de un espacio métrico es cerrado y acotado. La recíproca falla en general.`,
    p: R`<p><em>Cerrado:</em> si $x_n\in K$ y $x_n\to x$, la subsucesión convergente de $K$ debe converger al mismo $x$ (límite único), y su límite está en $K$: $x\in K$. <em>Acotado:</em> si no lo fuera, elijo $x_1\in K$ y $x_n\in K$ con $d(x_1,x_n)\ge n-1$. Una subsucesión $x_{n_k}\to x\in K$ implica $d(x_1,x_{n_k})\to d(x_1,x)\in\mathbb{R}$ (acotada) pero $d(x_1,x_{n_k})\ge n_k-1\to\infty$: absurdo. $\blacksquare$</p>`,
    x: {
      enunciado: R`Decidir cuáles de $(0,1]$, $[0,\infty)$ y $\mathbb{Q}\cap[0,1]$ son compactos.`,
      idea: 'Ver si fallan "cerrado" o "acotado" y exhibir la sucesión que lo prueba.',
      pasos: [
        { idea: '$(0,1]$', detalle: R`<p>No es cerrado: $x_n=\tfrac1n\to0\notin(0,1]$. Toda subsucesión tiende a $0$, no converge en el conjunto.</p>` },
        { idea: '$[0,\\infty)$', detalle: R`<p>No es acotado: $x_n=n$ no tiene subsucesión convergente.</p>` },
        { idea: '$\\mathbb{Q}\\cap[0,1]$', detalle: R`<p>No es cerrado: tomar racionales $q_n\to\tfrac{\sqrt2}2\notin\mathbb{Q}$. Ninguno es compacto. $\blacksquare$</p>` },
      ],
      conclusion: 'Para refutar compacidad basta una sucesión "que se escapa", ya sea hacia el infinito o hacia un punto que no está.',
    },
  },
  {
    n: 'Teorema de Heine–Borel', ref: 'Teo. 6.6',
    d: DEF_COMP,
    e: R`$K\subseteq\mathbb{R}^m$ (con $d_1$, $d_2$ o $d_\infty$) es compacto sii es cerrado y acotado.`,
    p: R`<p>($\Rightarrow$) Prop. 6.3. ($\Leftarrow$) Sea $(x_n)\subseteq K$. Está acotada, luego cada coordenada $(x_n^i)_n$ está acotada en $\mathbb{R}$. Por Bolzano–Weierstrass extraigo una subsucesión donde converge la 1.ª coordenada, de ella otra donde converge también la 2.ª, y así hasta la $m$-ésima. Queda una subsucesión que converge coordenada a coordenada a un $x$, y eso es convergencia en $d_2$. Como $K$ es cerrado, $x\in K$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Decidir si $K=\{(x,y):x^2+y^2\le4,\ y\ge x\}$ y $H=\{(x,y):xy=1\}$ son compactos.`,
      idea: 'Aplicar Heine–Borel: comprobar cerrado (por preimagen) y acotado.',
      pasos: [
        { idea: '$K$ cerrado', detalle: R`<p>$\varphi(x,y)=x^2+y^2$ y $\psi(x,y)=y-x$ son continuas; $K=\varphi^{-1}((-\infty,4])\cap\psi^{-1}([0,\infty))$ es intersección de cerrados.</p>` },
        { idea: '$K$ acotado', detalle: R`<p>$K\subseteq\overline B_2(0,2)$. Es cerrado y acotado en $\mathbb{R}^2$: compacto.</p>` },
        { idea: '$H$', detalle: R`<p>$H=\{xy=1\}$ es cerrado (preimagen de $\{1\}$) pero no acotado: $(n,\tfrac1n)\in H$. No es compacto. $\blacksquare$</p>` },
      ],
      conclusion: 'En $\\mathbb{R}^m$ la compacidad se reduce a dos chequeos concretos; en espacios de funciones o sucesiones, no.',
    },
  },
  {
    n: 'Cerrado dentro de un compacto', ref: 'Prop. 6.8',
    d: DEF_COMP,
    e: R`Si $K$ es compacto y $F\subseteq K$ es cerrado, entonces $F$ es compacto.`,
    p: R`<p>Sea $(x_n)\subseteq F\subseteq K$. Una subsucesión converge a $x\in K$; como $F$ es cerrado, $x\in F$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que el segmento $S=\{(x,y)\in[0,1]^2:x+y=1\}$ es compacto.`,
      idea: '$S$ es un cerrado dentro del compacto $[0,1]^2$.',
      pasos: [
        { idea: 'El compacto ambiente', detalle: R`<p>$[0,1]^2$ es cerrado y acotado en $\mathbb{R}^2$: compacto (Heine–Borel).</p>` },
        { idea: 'Cerrado', detalle: R`<p>$S=[0,1]^2\cap\varphi^{-1}(\{1\})$ con $\varphi(x,y)=x+y$ continua: es intersección de cerrados.</p>` },
        { idea: 'Conclusión', detalle: R`<p>$S$ es un cerrado contenido en un compacto: es compacto. $\blacksquare$</p>` },
      ],
      conclusion: 'Es el atajo habitual para no repetir Heine–Borel: encerrar el conjunto en un compacto conocido.',
    },
  },
  {
    n: 'Uniones e intersecciones de compactos', ref: 'Prop. 6.9, Obs. 6.10',
    d: DEF_COMP,
    e: R`La unión finita de compactos es compacta; la intersección arbitraria de compactos es compacta. La unión infinita puede no serlo.`,
    p: R`<p>Unión finita: una sucesión en $K_1\cup\dots\cup K_m$ tiene infinitos términos en algún $K_i$, que forman una subsucesión con una sub-subsucesión convergente en $K_i$. Intersección: cada $K_i$ es cerrado, así $\bigcap K_i$ es cerrado y está contenido en un compacto $K_{i_0}$ (Prop. 6.8). $\blacksquare$</p>`,
    x: {
      enunciado: R`Mostrar que $\bigcup_{i\ge1}[\tfrac1i,1]$ no es compacto, pero $\bigcap_{i\ge1}[0,1+\tfrac1i]$ sí.`,
      idea: 'La unión infinita puede perder el cierre; la intersección hereda del compacto.',
      pasos: [
        { idea: 'Unión infinita', detalle: R`<p>$\bigcup[\tfrac1i,1]=(0,1]$, que no es cerrado: no compacto aunque cada $[\tfrac1i,1]$ lo sea.</p>` },
        { idea: 'Intersección', detalle: R`<p>$\bigcap[0,1+\tfrac1i]=[0,1]$, cerrado y acotado: compacto. $\blacksquare$</p>` },
      ],
      conclusion: 'Con la unión hay que cuidar el número de conjuntos (finito); con la intersección no.',
    },
  },
  {
    n: 'La imagen continua de un compacto es compacta', ref: 'Teo. 6.15',
    d: DEF_COMP,
    e: R`Si $f:M\to N$ es continua y $K\subseteq M$ es compacto, entonces $f(K)$ es compacto. En particular $K\times K$ es compacto si $K$ lo es, y también lo son $K+K$ y $K\cdot K$ para $K\subseteq\mathbb{R}$.`,
    p: R`<p>Sea $(y_n)\subseteq f(K)$, $y_n=f(x_n)$ con $x_n\in K$. Una subsucesión $x_{n_k}\to x\in K$ y, por continuidad, $y_{n_k}=f(x_{n_k})\to f(x)\in f(K)$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Sea $K=[0,1]\cup\{3\}\subseteq\mathbb{R}$. Probar que $K+K=\{x+y:x,y\in K\}$ es compacto y calcularlo.`,
      idea: '$K+K$ es la imagen del compacto $K\\times K$ por la suma, que es continua.',
      pasos: [
        { idea: '$K\\times K$ compacto', detalle: R`<p>$K$ es cerrado y acotado, así que $K\times K$ también lo es en $\mathbb{R}^2$: compacto.</p>` },
        { idea: 'Continua', detalle: R`<p>$\sigma(x,y)=x+y$ es continua; $K+K=\sigma(K\times K)$ es compacto.</p>` },
        { idea: 'Cálculo', detalle: R`<p>$[0,1]+[0,1]=[0,2]$, $[0,1]+3=[3,4]$, $3+3=6$: $K+K=[0,2]\cup[3,4]\cup\{6\}$, cerrado y acotado. $\blacksquare$</p>` },
      ],
      conclusion: 'Sin compacidad, $A+B$ puede no ser cerrado ($\\mathbb{N}+\\{-n+\\tfrac1n\\}$ da un conjunto con $0$ en la clausura y fuera del conjunto).',
    },
  },
  {
    n: 'Weierstrass y sus consecuencias', ref: 'Cor. 6.17; Práctica 5, Ej. 2, 9, 10, 12',
    d: DEF_COMP + R`<p>$d(x,K)=\inf_{y\in K}d(x,y)$; $b_d(A,B)=\inf\{d(a,b):a\in A,b\in B\}$.</p>`,
    e: R`(a) Si $K$ es compacto y $f:K\to\mathbb{R}$ es continua, $f$ alcanza máximo y mínimo. (b) Todo compacto no vacío de $\mathbb{R}$ tiene máximo y mínimo. (c) La distancia de un punto a un compacto se realiza: $\exists y\in K:\ d(x,y)=d(x,K)$. (d) Si $f:K\to(0,\infty)$ es continua, existe $\alpha>0$ con $f>\alpha$. (e) Si $A$ es compacto, $B$ cerrado y $A\cap B=\varnothing$, entonces $b_d(A,B)>0$.`,
    p: R`<p>(a) $f(K)\subseteq\mathbb{R}$ es compacto, luego cerrado y acotado: su supremo e ínfimo pertenecen a $f(K)$. (b) Es (a) con $f=\mathrm{id}$. (c) $y\mapsto d(x,y)$ es continua sobre $K$: alcanza su mínimo. (d) $f$ alcanza su mínimo $m>0$; con $\alpha=\tfrac m2$, $f>\alpha$. (e) $a\mapsto d(a,B)$ es continua en $A$ y alcanza su mínimo en algún $a_0$; como $a_0\notin B$ y $B$ es cerrado, $d(a_0,B)>0$; y $b_d(A,B)=\min_Ad(\cdot,B)>0$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Sea $K=[0,1]^2$ y $x=(3,2)$. Hallar el punto de $K$ más cercano a $x$ (con $d_2$) y la distancia, y justificar que existe sin calcularlo.`,
      idea: 'Primero la existencia (compacidad + continuidad); después el cálculo.',
      pasos: [
        { idea: 'Existencia', detalle: R`<p>$K$ es compacto y $y\mapsto d_2(x,y)$ es continua: alcanza su mínimo en $K$.</p>` },
        { idea: 'Candidato', detalle: R`<p>Coordenada a coordenada, el punto de $[0,1]$ más cercano a $3$ es $1$ y a $2$ es $1$: $y^*=(1,1)$.</p>` },
        { idea: 'Distancia', detalle: R`<p>$d_2(x,y^*)=\sqrt{(3-1)^2+(2-1)^2}=\sqrt5$. Para otro $y\in K$, $|3-y_1|\ge2$ y $|2-y_2|\ge1$, así $d_2(x,y)\ge\sqrt5$. $\blacksquare$</p>` },
      ],
      conclusion: 'Weierstrass asegura <em>que</em> se alcanza; encontrar <em>dónde</em> es un cálculo aparte. En un conjunto no compacto (por ejemplo $[0,1)^2$ con $x=(1,0)$) la distancia puede no alcanzarse.',
    },
  },
  {
    n: 'Continua en un compacto $\\Rightarrow$ uniformemente continua', ref: 'Teo. 6.18',
    d: DEF_COMP + R`<p>UC: $\forall\varepsilon\ \exists\delta\ \forall x,y:\ d(x,y)<\delta\Rightarrow d'(f(x),f(y))<\varepsilon$.</p>`,
    e: R`Si $M$ es compacto y $f:M\to N$ es continua, entonces $f$ es uniformemente continua.`,
    p: R`<p>Si no lo fuera, existirían $\varepsilon_0>0$ y sucesiones $x_n,y_n$ con $d(x_n,y_n)\to0$ y $d'(f(x_n),f(y_n))\ge\varepsilon_0$. Por compacidad, $x_{n_k}\to x$ y entonces $y_{n_k}\to x$ también ($d(y_{n_k},x)\le d(y_{n_k},x_{n_k})+d(x_{n_k},x)\to0$). Por continuidad, $f(x_{n_k}),f(y_{n_k})\to f(x)$ y $d'(f(x_{n_k}),f(y_{n_k}))\to0$, contradiciendo $\ge\varepsilon_0$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $f(x)=x^2$ es UC en $[0,3]$, dar un $\delta$ explícito y explicar por qué falla en $\mathbb{R}$.`,
      idea: 'El teorema da la existencia del $\\delta$; aquí además se calcula con una cota de Lipschitz.',
      pasos: [
        { idea: 'Existencia', detalle: R`<p>$[0,3]$ es compacto y $f$ continua: es UC por el teorema.</p>` },
        { idea: '$\\delta$ explícito', detalle: R`<p>$|x^2-y^2|=|x-y|\,|x+y|\le6|x-y|$ en $[0,3]$: tomando $\delta=\tfrac\varepsilon6$, $|x-y|<\delta\Rightarrow|f(x)-f(y)|<\varepsilon$.</p>` },
        { idea: 'En $\\mathbb{R}$', detalle: R`<p>El factor $|x+y|$ no está acotado: con $x_n=n$, $y_n=n+\tfrac1n$ se tiene $|x_n-y_n|\to0$ y $|f(x_n)-f(y_n)|\ge2$. $\mathbb{R}$ no es compacto, y no hay UC. $\blacksquare$</p>` },
      ],
      conclusion: 'Por eso en integración de Riemann se puede usar siempre $\\delta$ uniforme para funciones continuas en $[a,b]$.',
    },
  },
  {
    n: 'Biyección continua desde un compacto es homeomorfismo', ref: 'Práctica 5, Ej. 14',
    d: R`<p><strong>Homeomorfismo:</strong> biyección continua con inversa continua. Una función es <em>cerrada</em> si lleva cerrados en cerrados.</p>`,
    e: R`Si $E$ es compacto y $f:E\to E'$ es continua y biyectiva, entonces $f$ es un homeomorfismo.`,
    p: R`<p>Basta ver que $f$ lleva cerrados en cerrados (equivale a que $f^{-1}$ sea continua). Si $F\subseteq E$ es cerrado, es compacto (cerrado en compacto); $f(F)$ es compacto (imagen continua), y todo compacto de un espacio métrico es cerrado: $f(F)$ es cerrado. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $f:[0,1]\to[0,1]$, $f(x)=x^3$ es un homeomorfismo usando solo este resultado, y explicar por qué no se puede aplicar a $F:[0,2\pi)\to S^1$.`,
      idea: 'Comprobar las tres hipótesis: dominio compacto, continua, biyectiva.',
      pasos: [
        { idea: 'Hipótesis', detalle: R`<p>$[0,1]$ es compacto; $x^3$ es continua, estrictamente creciente (inyectiva) y sobreyectiva sobre $[0,1]$.</p>` },
        { idea: 'Conclusión', detalle: R`<p>Es homeomorfismo; su inversa $\sqrt[3]{\cdot}$ es continua, sin necesidad de verificarlo a mano.</p>` },
        { idea: 'Contraste', detalle: R`<p>$[0,2\pi)$ no es compacto (no cerrado), por lo que el resultado no aplica: de hecho la inversa de $F$ es discontinua en $(1,0)$. $\blacksquare$</p>` },
      ],
      conclusion: 'La compacidad del dominio es lo que "compra" la continuidad de la inversa.',
    },
  },
  {
    n: 'Encaje de cerrados en compactos', ref: 'Práctica 5, Ej. 6, 15',
    d: DEF_COMP,
    e: R`Si $E$ es compacto y $(F_n)$ es una sucesión de cerrados no vacíos con $F_{n+1}\subseteq F_n$, entonces $\bigcap_nF_n\ne\varnothing$. Recíprocamente, si esa propiedad vale en un espacio métrico $E$, entonces $E$ es compacto.`,
    p: R`<p>($\Rightarrow$) Elijo $x_n\in F_n$; una subsucesión $x_{n_k}\to x$. Fijado $m$, para $n_k\ge m$ vale $x_{n_k}\in F_{n_k}\subseteq F_m$, y $F_m$ es cerrado, así $x\in F_m$ para todo $m$. ($\Leftarrow$) Dada $(x_n)$, sea $F_n=\overline{\{x_k:k\ge n\}}$ (cerrados no vacíos, decrecientes). Existe $x\in\bigcap F_n$. Cada bola $B(x,\tfrac1j)$ corta a toda cola, así elijo $n_1<n_2<\cdots$ con $d(x_{n_j},x)<\tfrac1j$: $x_{n_j}\to x$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Comparar $F_n=[0,\tfrac1n]\subseteq[0,1]$ con $F_n=[n,\infty)\subseteq\mathbb{R}$.`,
      idea: 'Con compacto la intersección no es vacía; sin compacto puede serlo.',
      pasos: [
        { idea: 'En $[0,1]$ (compacto)', detalle: R`<p>$F_n$ cerrados, no vacíos, decrecientes: $\bigcap F_n=\{0\}\ne\varnothing$, como asegura el teorema.</p>` },
        { idea: 'En $\\mathbb{R}$', detalle: R`<p>$[n,\infty)$ también son cerrados, no vacíos y decrecientes, pero $\bigcap=\varnothing$ (Arquímedes). $\mathbb{R}$ no es compacto: no hay contradicción. $\blacksquare$</p>` },
      ],
      conclusion: 'Es la versión "lógica" de la compacidad: infinitos cerrados encajados no se pueden "escapar al infinito".',
    },
  },
  {
    n: 'Compactos en espacios discretos y conjuntos finitos', ref: 'Ej. 6.2; Práctica 5, Ej. 5',
    d: R`<p><strong>Discreto:</strong> $\delta(x,y)=1$ si $x\ne y$. Allí $B(x,\tfrac12)=\{x\}$.</p>`,
    e: R`Todo conjunto finito es compacto. En un espacio métrico discreto, $K$ es compacto sii es finito.`,
    p: R`<p>Una sucesión en un finito repite algún valor infinitas veces: subsucesión constante, convergente. Si $K\subseteq(E,\delta)$ es infinito, tiene una sucesión inyectiva con $\delta(x_n,x_m)=1$, de modo que ninguna subsucesión es de Cauchy: $K$ no es compacto. (Equivalente por cubrimientos: $\{\{x\}:x\in K\}$ no tiene subcubrimiento finito.) $\blacksquare$</p>`,
    x: {
      enunciado: R`En $(\mathbb{N},|\cdot|)$ (donde $|n-m|\ge1$, discreto) decidir si $\{1,2,3\}$ y $\mathbb{N}$ son compactos.`,
      idea: 'Finito: compacto. Infinito discreto: cubrir con bolas que contienen un solo punto.',
      pasos: [
        { idea: '$\\{1,2,3\\}$', detalle: R`<p>Es finito: compacto.</p>` },
        { idea: '$\\mathbb{N}$', detalle: R`<p>$B(n,\tfrac12)=\{n\}$ para cada $n$: $\{B(n,\tfrac12)\}_n$ cubre $\mathbb{N}$ y ningún subconjunto finito cubre todo. No es compacto. $\blacksquare$</p>` },
      ],
      conclusion: 'Los compactos de un espacio discreto son los "chicos": en este caso, la compacidad equivale a finitud.',
    },
  },
];

// ---------------------------------------------------------------- Punto fijo
const DEF_FIJO = R`<ul><li><strong>Punto fijo</strong> de $f:M\to M$: $x^\ast$ con $f(x^\ast)=x^\ast$.</li>
<li><strong>Contracción:</strong> $\exists\alpha\in(0,1)\ \forall x,y:\ d(f(x),f(y))\le\alpha\,d(x,y)$ ($\alpha$ fijo, no depende de $x,y$).</li>
<li><strong>Completo:</strong> toda sucesión de Cauchy converge en el espacio.</li></ul>`;

export const EM_PUNTOFIJO = [
  {
    n: 'Contracciones', ref: 'Def. 6.23, Obs. 6.24',
    d: DEF_FIJO,
    e: R`Toda contracción es Lipschitz (constante $\alpha$) y por lo tanto UC. Si $f:I\to\mathbb{R}$ es derivable en un intervalo con $|f'|\le\alpha<1$, es contracción. La condición $d(f(x),f(y))<d(x,y)$ <em>no</em> alcanza para ser contracción.`,
    p: R`<p>Lo primero es la definición. Por el teorema del valor medio, $|f(x)-f(y)|=|f'(\xi)||x-y|\le\alpha|x-y|$. Para el último punto basta el contraejemplo de abajo. $\blacksquare$</p>`,
    x: {
      enunciado: R`Mostrar que $f(x)=\tfrac12\arctan x+3$ es contracción en $\mathbb{R}$, y que $g(x)=x+\tfrac1x$ en $[1,\infty)$ cumple $|g(x)-g(y)|<|x-y|$ pero no es contracción.`,
      idea: 'Acotar la derivada por una constante $<1$; y mostrar que el supremo de $|g\'|$ vale exactamente $1$.',
      pasos: [
        { idea: '$f$ contracción', detalle: R`<p>$f'(x)=\tfrac1{2(1+x^2)}\le\tfrac12$: por el valor medio, $f$ es contracción de constante $\alpha=\tfrac12$.</p>` },
        { idea: '$g$ achica distancias', detalle: R`<p>$g(x)-g(y)=(x-y)\left(1-\tfrac1{xy}\right)$ y $0\le1-\tfrac1{xy}<1$ para $x,y\ge1$: $|g(x)-g(y)|<|x-y|$ si $x\ne y$.</p>` },
        { idea: '$g$ no es contracción', detalle: R`<p>$1-\tfrac1{xy}\to1$ si $x,y\to\infty$: no hay $\alpha<1$ uniforme. Además $g(x)=x$ es imposible ($\tfrac1x\ne0$): sin punto fijo en el completo $[1,\infty)$. $\blacksquare$</p>` },
      ],
      conclusion: 'La constante $\\alpha<1$ debe ser <em>uniforme</em>: achicar distancias punto a punto no basta (el teorema de Banach lo requiere).',
    },
  },
  {
    n: 'Teorema del punto fijo de Banach', ref: 'Teo. 6.26',
    d: DEF_FIJO,
    e: R`Si $(M,d)$ es completo y $f:M\to M$ es una contracción, existe un único $x^\ast\in M$ con $f(x^\ast)=x^\ast$, y para todo $x_0\in M$ la sucesión $x_{n+1}=f(x_n)$ converge a $x^\ast$.`,
    p: R`<p><strong>Paso 1 (distancias consecutivas):</strong> $d(x_{n+1},x_n)\le\alpha\,d(x_n,x_{n-1})\le\cdots\le\alpha^nd(x_1,x_0)$.</p>
<p><strong>Paso 2 (Cauchy):</strong> para $k\ge1$, $d(x_n,x_{n+k})\le\sum_{i=0}^{k-1}\alpha^{n+i}d(x_1,x_0)\le\dfrac{\alpha^n}{1-\alpha}d(x_1,x_0)\to0$. Entonces $(x_n)$ es de Cauchy, y converge por completitud a un $x^\ast$.</p>
<p><strong>Paso 3 (punto fijo):</strong> $f$ es continua (Lipschitz), así $f(x_n)\to f(x^\ast)$; pero $f(x_n)=x_{n+1}\to x^\ast$. Por unicidad del límite, $f(x^\ast)=x^\ast$.</p>
<p><strong>Paso 4 (unicidad):</strong> si $y^\ast$ también es fijo, $d(x^\ast,y^\ast)=d(f(x^\ast),f(y^\ast))\le\alpha\,d(x^\ast,y^\ast)$, de donde $(1-\alpha)d(x^\ast,y^\ast)\le0$ y $x^\ast=y^\ast$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Para $f(x)=\tfrac12\arctan x+3$ probar que existe un único punto fijo en $\mathbb{R}$ y aproximarlo con dos iteraciones desde $x_0=3$.`,
      idea: 'Verificar las hipótesis del teorema y después iterar.',
      pasos: [
        { idea: 'Hipótesis', detalle: R`<p>$\mathbb{R}$ es completo y $f$ es contracción con $\alpha=\tfrac12$ (por el resultado anterior). Banach asegura un único $x^\ast$ con $\tfrac12\arctan x^\ast+3=x^\ast$.</p>` },
        { idea: 'Iterar', detalle: R`<p>$x_0=3$; $x_1=\tfrac12\arctan3+3\approx3{,}6245$; $x_2=\tfrac12\arctan(3{,}6245)+3\approx3{,}6508$.</p>` },
        { idea: 'Dónde está', detalle: R`<p>La iteración se estabiliza: $x^\ast\approx3{,}65$. Se puede ubicar sin iterar: como $|\tfrac12\arctan t|<\tfrac\pi4$ para todo $t$, todo punto fijo cumple $x^\ast\in(3-\tfrac\pi4,\,3+\tfrac\pi4)\approx(2{,}21;\,3{,}79)$. $\blacksquare$</p>` },
      ],
      conclusion: 'El teorema da existencia, unicidad <em>y un algoritmo</em>: no hace falta "despejar" la ecuación trascendente.',
    },
  },
  {
    n: 'Cota del error de la iteración', ref: 'Obs. 6.27',
    d: DEF_FIJO,
    e: R`Con $x_{n+1}=f(x_n)$ y $f$ contracción de constante $\alpha$: $d(x_n,x^\ast)\le\dfrac{\alpha^n}{1-\alpha}\,d(x_1,x_0)$.`,
    p: R`<p>Del paso 2 de Banach, $d(x_n,x_{n+k})\le\tfrac{\alpha^n}{1-\alpha}d(x_1,x_0)$ para todo $k$. Haciendo $k\to\infty$ y usando que $d(x_n,\cdot)$ es continua, $d(x_n,x^\ast)\le\tfrac{\alpha^n}{1-\alpha}d(x_1,x_0)$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Una contracción con $\alpha=\tfrac12$ cumple $d(x_1,x_0)=1$. ¿Cuántas iteraciones garantizan un error menor que $10^{-6}$?`,
      idea: 'Despejar $n$ en la cota.',
      pasos: [
        { idea: 'Cota', detalle: R`<p>Error $\le\dfrac{(1/2)^n}{1/2}\cdot1=2^{1-n}$.</p>` },
        { idea: 'Despejar', detalle: R`<p>$2^{1-n}<10^{-6}\iff2^{n-1}>10^6\iff n-1>\log_2(10^6)\approx19{,}93$, es decir $n\ge21$.</p>` },
        { idea: 'Control', detalle: R`<p>Con $n=21$: $2^{-20}\approx9{,}5\cdot10^{-7}<10^{-6}$. Bastan $21$ iteraciones. $\blacksquare$</p>` },
      ],
      conclusion: 'La velocidad es geométrica: cada paso gana un factor $\\alpha$ de precisión.',
    },
  },
  {
    n: 'La completitud es indispensable', ref: 'Práctica 5, Ej. 18',
    d: DEF_FIJO,
    e: R`$f(x)=\tfrac x3$ en $E=\mathbb{R}\setminus\{0\}$ es contracción sin punto fijo: Banach falla porque $E$ no es completo.`,
    p: R`<p>$|f(x)-f(y)|=\tfrac13|x-y|$: contracción. Un punto fijo cumpliría $x=\tfrac x3$, o sea $x=0\notin E$. $E$ no es completo: $\tfrac1n$ es de Cauchy y su límite $0\notin E$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Dar otro ejemplo: $f(x)=\tfrac x2$ en $(0,1]$. ¿Qué pasa en $[0,1]$?`,
      idea: 'Comparar el mismo $f$ sobre un espacio no completo y sobre uno completo.',
      pasos: [
        { idea: 'En $(0,1]$', detalle: R`<p>$f$ lleva $(0,1]$ en $(0,\tfrac12]\subseteq(0,1]$ y es contracción de constante $\tfrac12$, pero $f(x)=x\iff x=0\notin(0,1]$: no hay punto fijo. $(0,1]$ no es completo.</p>` },
        { idea: 'En $[0,1]$', detalle: R`<p>$[0,1]$ es cerrado en $\mathbb{R}$, completo. Banach aplica y el único punto fijo es $0$. $\blacksquare$</p>` },
      ],
      conclusion: 'El punto fijo "cae" justo en el agujero del espacio: el que falta es el límite de la iteración.',
    },
  },
  {
    n: 'Punto fijo en un compacto', ref: 'Teo. 6.28',
    d: DEF_FIJO,
    e: R`Si $M$ es compacto y $f:M\to M$ es continua con $d(f(x),f(y))<d(x,y)$ para $x\ne y$, entonces $f$ tiene un único punto fijo.`,
    p: R`<p>La función $x\mapsto d(x,f(x))$ es continua y $M$ compacto: alcanza su mínimo $i$ en algún $x^\ast$. Si $i>0$, $y=f(x^\ast)\ne x^\ast$ y $d(y,f(y))<d(x^\ast,y)=i$, contra la minimalidad. Luego $i=0$ y $f(x^\ast)=x^\ast$. Si $y^\ast$ es otro punto fijo con $y^\ast\ne x^\ast$, $d(x^\ast,y^\ast)=d(f(x^\ast),f(y^\ast))<d(x^\ast,y^\ast)$, absurdo. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $f(x)=\sin x$ en $[0,1]$ tiene un único punto fijo aunque no sea contracción.`,
      idea: 'Verificar las hipótesis del teorema para compactos.',
      pasos: [
        { idea: 'Lleva $[0,1]$ en sí mismo', detalle: R`<p>$0\le\sin x\le\sin1<1$ para $x\in[0,1]$.</p>` },
        { idea: 'Achica distancias', detalle: R`<p>Si $x\ne y$, por el valor medio $|\sin x-\sin y|=\cos\xi\,|x-y|$ con $\xi$ estrictamente entre ellos, así $\xi>0$ y $\cos\xi<1$: $|f(x)-f(y)|<|x-y|$.</p>` },
        { idea: 'No es contracción', detalle: R`<p>$\sup\cos\xi=1$ (cerca de $0$): no hay $\alpha<1$ uniforme.</p>` },
        { idea: 'Conclusión', detalle: R`<p>$[0,1]$ es compacto: existe un único punto fijo. Es $x=0$ ($\sin0=0$). $\blacksquare$</p>` },
      ],
      conclusion: 'Compacidad reemplaza a la completitud; a cambio, hace falta la desigualdad <em>estricta</em> punto a punto.',
    },
  },
  {
    n: 'Iteradas de una función', ref: 'Práctica 5, Ej. 19',
    d: DEF_FIJO + R`<p>$f^n=f\circ\cdots\circ f$ ($n$ veces).</p>`,
    e: R`Si $E$ es completo y $f^n$ es contracción para algún $n$, entonces $f$ tiene un único punto fijo. (Un punto fijo de $f$ lo es de $f^n$.)`,
    p: R`<p>Por Banach, $f^n$ tiene un único punto fijo $x$. Como $f$ y $f^n$ conmutan, $f^n(f(x))=f(f^n(x))=f(x)$: $f(x)$ también es fijo de $f^n$, así $f(x)=x$. Si $y$ es fijo de $f$, lo es de $f^n$, luego $y=x$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que existe un único $x\in\mathbb{R}$ con $\cos x=x$.`,
      idea: '$\\cos$ no es contracción, pero $\\cos\\circ\\cos$ sí.',
      pasos: [
        { idea: '$\\cos$ no alcanza', detalle: R`<p>$|\cos'|=|\sin|$ llega a $1$: no podemos concluir con $f=\cos$.</p>` },
        { idea: '$f^2$ contracción', detalle: R`<p>$(\cos\circ\cos)'(x)=\sin(\cos x)\sin x$; como $|\cos x|\le1$ y $\sin$ es creciente en $[-1,1]$, $|\sin(\cos x)|\le\sin1<1$. Entonces $|(f^2)'|\le\sin1\approx0{,}84$: contracción en el completo $\mathbb{R}$.</p>` },
        { idea: 'Conclusión', detalle: R`<p>Por el resultado, $\cos$ tiene un único punto fijo ($x^\ast\approx0{,}739$). $\blacksquare$</p>` },
      ],
      conclusion: 'Cuando $f$ no es contracción pero "dos pasos" sí lo son, el punto fijo existe igual.',
    },
  },
  {
    n: 'Puntos fijos en $[a,b]$ y conjunto de puntos fijos', ref: 'Ejemplo 6.22; Práctica 5, Ej. 16, 21',
    d: R`<p>$\mathrm{Fix}(f)=\{x:f(x)=x\}$.</p>`,
    e: R`(a) Si $f:[a,b]\to[a,b]$ es continua, tiene un punto fijo. (b) Si $f:E\to E$ es continua, $\mathrm{Fix}(f)$ es cerrado.`,
    p: R`<p>(a) Sea $g(x)=f(x)-x$, continua. Como $f(a)\ge a$ y $f(b)\le b$: $g(a)\ge0\ge g(b)$. Por el teorema de Bolzano existe $c$ con $g(c)=0$. (b) $\mathrm{Fix}(f)=h^{-1}(\{0\})$ con $h(x)=d(f(x),x)$ continua. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $f(x)=e^{-x}$ tiene un punto fijo en $[0,1]$ y que no puede haber dos.`,
      idea: 'Bolzano para la existencia; monotonía para la unicidad.',
      pasos: [
        { idea: 'Lleva $[0,1]$ en sí', detalle: R`<p>$e^{-1}\le e^{-x}\le1$ para $x\in[0,1]$.</p>` },
        { idea: 'Existencia', detalle: R`<p>$g(x)=e^{-x}-x$: $g(0)=1>0$ y $g(1)=e^{-1}-1<0$; Bolzano da un cero.</p>` },
        { idea: 'Unicidad', detalle: R`<p>$g'(x)=-e^{-x}-1<0$: $g$ es estrictamente decreciente, tiene a lo sumo un cero. El punto fijo es $x^\ast\approx0{,}567$. $\blacksquare$</p>` },
      ],
      conclusion: 'Bolzano da existencia sin unicidad; para la unicidad hace falta algo más (monotonía, contracción).',
    },
  },
];
