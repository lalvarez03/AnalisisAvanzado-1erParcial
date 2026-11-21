// Resultados clave — Cardinalidad (teórica Cap. 3 · Práctica 2).
// Esquema: { n, ref, d: definiciones formales, e: enunciado, p: demostración, x: ejemplo de uso paso a paso }.
const R = String.raw;

const DEF_FUN = R`<ul>
<li><strong>Inyectiva:</strong> $f(x)=f(y)\Rightarrow x=y$. <strong>Sobreyectiva:</strong> $\forall b\in B\ \exists a\in A:\ f(a)=b$. <strong>Biyectiva:</strong> ambas.</li>
<li><strong>Coordinables:</strong> $A\sim B$ si existe una biyección $f:A\to B$.</li></ul>`;
const DEF_CONT = R`<ul>
<li><strong>Finito:</strong> $A=\varnothing$ o $A\sim\{1,\dots,n\}$. <strong>Numerable:</strong> $A\sim\mathbb{N}$ (cardinal $\aleph_0$). <strong>Contable:</strong> finito o numerable.</li></ul>`;

// ---------------------------------------------------------------- Equivalencia de conjuntos
export const CARD_EQUIVALENCIA = [
  {
    n: '$\\sim$ es una relación de equivalencia', ref: 'Cap. 3.1',
    d: DEF_FUN,
    e: R`La relación "$A\sim B$" es reflexiva ($A\sim A$), simétrica ($A\sim B\Rightarrow B\sim A$) y transitiva ($A\sim B,\ B\sim C\Rightarrow A\sim C$). Por eso tiene sentido hablar del <em>cardinal</em> de un conjunto (su clase de equivalencia).`,
    p: R`<p><em>Reflexiva:</em> $\mathrm{id}_A:A\to A$ es biyección. <em>Simétrica:</em> si $f:A\to B$ es biyección, su inversa $f^{-1}:B\to A$ (que existe porque $f$ es biyectiva) también lo es. <em>Transitiva:</em> si $f:A\to B$ y $g:B\to C$ son biyecciones, $g\circ f$ es inyectiva (composición de inyectivas) y sobreyectiva (composición de sobreyectivas). $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $\mathbb{N}\sim4\mathbb{N}$ usando que $\mathbb{N}\sim2\mathbb{N}$ y $2\mathbb{N}\sim4\mathbb{N}$.`,
      idea: 'Encadenar dos biyecciones simples con la transitividad.',
      pasos: [
        { idea: 'Primera biyección', detalle: R`<p>$f:\mathbb{N}\to2\mathbb{N}$, $f(n)=2n$: inyectiva y sobreyectiva (todo par es $2n$).</p>` },
        { idea: 'Segunda biyección', detalle: R`<p>$g:2\mathbb{N}\to4\mathbb{N}$, $g(m)=2m$: lleva $2n$ en $4n$; es biyectiva.</p>` },
        { idea: 'Componer', detalle: R`<p>$g\circ f(n)=4n$ es biyección $\mathbb{N}\to4\mathbb{N}$. Luego $\mathbb{N}\sim4\mathbb{N}$ (y, mirándolo al revés, $4\mathbb{N}\sim\mathbb{N}$ por simetría). $\blacksquare$</p>` },
      ],
      conclusion: 'Con la transitividad no hace falta inventar una biyección larga: se arma por tramos conocidos.',
    },
  },
  {
    n: 'Imagen y preimagen: propiedades', ref: 'Recuadro de la Práctica 2',
    d: R`<ul><li><strong>Imagen:</strong> $f(A)=\{f(a):a\in A\}$. <strong>Preimagen:</strong> $f^{-1}(C)=\{x\in X:f(x)\in C\}$.</li></ul>`,
    e: R`$f(A\cup B)=f(A)\cup f(B)$; $f(A\cap B)\subseteq f(A)\cap f(B)$; $f^{-1}(C\cup D)=f^{-1}(C)\cup f^{-1}(D)$; $f^{-1}(C\cap D)=f^{-1}(C)\cap f^{-1}(D)$; $A\subseteq f^{-1}(f(A))$ (igualdad si $f$ es inyectiva); $f(f^{-1}(C))\subseteq C$ (igualdad si $f$ es sobreyectiva).`,
    p: R`<p>$f(A\cap B)\subseteq f(A)\cap f(B)$: si $y=f(x)$ con $x\in A\cap B$, entonces $y\in f(A)$ e $y\in f(B)$.</p>
<p>$A\subseteq f^{-1}(f(A))$: si $x\in A$, $f(x)\in f(A)$, o sea $x\in f^{-1}(f(A))$. Si $f$ es inyectiva y $x\in f^{-1}(f(A))$, existe $a\in A$ con $f(x)=f(a)$, luego $x=a\in A$.</p>
<p>$f(f^{-1}(C))\subseteq C$: si $y=f(x)$ con $f(x)\in C$, entonces $y\in C$. Si $f$ es sobreyectiva y $y\in C$, existe $x$ con $f(x)=y\in C$, o sea $x\in f^{-1}(C)$ e $y\in f(f^{-1}(C))$.</p>
<p>Las uniones y las intersecciones de preimágenes salen de $x\in f^{-1}(C\cup D)\iff f(x)\in C\cup D$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Sea $f:\mathbb{R}\to\mathbb{R}$, $f(x)=x^2$. Con $A=[-1,0]$, $B=[0,1]$, $C=[-1,1]$, mostrar que las tres inclusiones pueden ser estrictas.`,
      idea: 'Calcular ambos lados y comparar: la falta de inyectividad/sobreyectividad rompe la igualdad.',
      pasos: [
        { idea: 'Imagen de la intersección', detalle: R`<p>$A\cap B=\{0\}$, así $f(A\cap B)=\{0\}$; pero $f(A)=f(B)=[0,1]$ y $f(A)\cap f(B)=[0,1]\supsetneq\{0\}$.</p>` },
        { idea: 'Preimagen de la imagen', detalle: R`<p>$f(A)=[0,1]$, $f^{-1}([0,1])=[-1,1]\supsetneq A=[-1,0]$ (no es inyectiva: $x$ y $-x$ tienen la misma imagen).</p>` },
        { idea: 'Imagen de la preimagen', detalle: R`<p>$f^{-1}(C)=f^{-1}([-1,1])=[-1,1]$ y $f([-1,1])=[0,1]\subsetneq C$ (no es sobreyectiva: nadie va a los negativos). $\blacksquare$</p>` },
      ],
      conclusion: 'Cada igualdad perdida corresponde a una propiedad perdida de $f$: intersección e inyectividad, preimagen de imagen e inyectividad, imagen de preimagen y sobreyectividad.',
    },
  },
  {
    n: 'Composición e inversa de biyecciones', ref: 'Recuadro de la Práctica 2',
    d: DEF_FUN + R`<p><strong>Inversa:</strong> $f^{-1}:B\to A$ con $f^{-1}(f(a))=a$ y $f(f^{-1}(b))=b$.</p>`,
    e: R`La composición de biyecciones es biyección y la inversa de una biyección es biyección. Una función $f:A\to B$ es biyectiva sii tiene inversa.`,
    p: R`<p>Si $f$ es biyectiva, para cada $b\in B$ hay <em>un único</em> $a$ con $f(a)=b$ (existencia por sobreyectividad, unicidad por inyectividad); definimos $f^{-1}(b)=a$. Entonces $f^{-1}\circ f=\mathrm{id}_A$ y $f\circ f^{-1}=\mathrm{id}_B$, y $f^{-1}$ es biyectiva porque su inversa es $f$. Recíprocamente, si existe $g$ con $g\circ f=\mathrm{id}$ y $f\circ g=\mathrm{id}$, $f$ es inyectiva ($f(x)=f(y)\Rightarrow x=g(f(x))=g(f(y))=y$) y sobreyectiva ($b=f(g(b))$). $\blacksquare$</p>`,
    x: {
      enunciado: R`Sean $f(x)=3x+1$ y $g(x)=x^3$, ambas $\mathbb{R}\to\mathbb{R}$. Probar que $g\circ f$ es biyectiva y calcular su inversa.`,
      idea: 'Cada función es biyectiva (tiene inversa explícita); la inversa de la composición es la composición de inversas en orden contrario.',
      pasos: [
        { idea: 'Inversas', detalle: R`<p>$f^{-1}(y)=\tfrac{y-1}3$ y $g^{-1}(y)=\sqrt[3]y$ (raíz cúbica real). Ambas funciones son biyectivas.</p>` },
        { idea: 'Composición', detalle: R`<p>$g\circ f(x)=(3x+1)^3$, biyectiva por ser composición de biyecciones.</p>` },
        { idea: 'Inversa de la composición', detalle: R`<p>$(g\circ f)^{-1}=f^{-1}\circ g^{-1}$: $y\mapsto\tfrac{\sqrt[3]y-1}3$. Control: $(3x+1)^3\mapsto\tfrac{(3x+1)-1}3=x$. $\blacksquare$</p>` },
      ],
      conclusion: 'El orden se invierte: primero se deshace lo último que se hizo.',
    },
  },
  {
    n: 'Intervalos y la recta son coordinables', ref: 'Cap. 3.1; Ej. 5.30',
    d: DEF_FUN,
    e: R`$h:\mathbb{R}\to(-1,1)$, $h(x)=\dfrac x{1+|x|}$, es biyección con inversa $h^{-1}(y)=\dfrac y{1-|y|}$. En consecuencia, todo intervalo abierto $(a,b)$ es coordinable con $\mathbb{R}$.`,
    p: R`<p>$h(x)\in(-1,1)$ porque $|x|<1+|x|$. Para $y\in(-1,1)$ sea $g(y)=\tfrac y{1-|y|}$ (está bien definida pues $|y|<1$). Entonces $|g(y)|=\tfrac{|y|}{1-|y|}$ y $1+|g(y)|=\tfrac1{1-|y|}$, de donde $h(g(y))=\tfrac y{1-|y|}(1-|y|)=y$. Análogamente $|h(x)|=\tfrac{|x|}{1+|x|}$, $1-|h(x)|=\tfrac1{1+|x|}$ y $g(h(x))=\tfrac x{1+|x|}(1+|x|)=x$. Así $h$ y $g$ son inversas. Para $(a,b)$ se compone con la afín $t\mapsto\tfrac{2t-(a+b)}{b-a}$, que lleva $(a,b)$ en $(-1,1)$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Dar una biyección explícita $(0,1)\to\mathbb{R}$.`,
      idea: 'Llevar $(0,1)$ a $(-1,1)$ con una afín y aplicar $h^{-1}$.',
      pasos: [
        { idea: 'Afín', detalle: R`<p>$\varphi(t)=2t-1$ es biyección $(0,1)\to(-1,1)$.</p>` },
        { idea: 'Inversa de $h$', detalle: R`<p>$h^{-1}:(-1,1)\to\mathbb{R}$, $h^{-1}(y)=\tfrac y{1-|y|}$.</p>` },
        { idea: 'Componer', detalle: R`<p>$F(t)=h^{-1}(\varphi(t))=\dfrac{2t-1}{1-|2t-1|}$ es biyección $(0,1)\to\mathbb{R}$. Por ejemplo $F(\tfrac12)=0$, $F(\tfrac34)=\tfrac{1/2}{1/2}=1$ y $F(t)\to\pm\infty$ en los extremos. $\blacksquare$</p>` },
      ],
      conclusion: 'Un segmento "chico" y la recta infinita tienen el mismo cardinal: el tamaño métrico no cuenta, solo las biyecciones.',
    },
  },
];

// ---------------------------------------------------------------- Finitos y numerables
export const CARD_NUMERABLES = [
  {
    n: 'Subconjuntos infinitos de $\\mathbb{N}$', ref: 'Cap. 3.1',
    d: DEF_CONT,
    e: R`Todo subconjunto infinito de $\mathbb{N}$ es numerable; por lo tanto todo subconjunto de un conjunto numerable es contable.`,
    p: R`<p>Sea $A\subseteq\mathbb{N}$ infinito. Definimos $n_1=\min A$ y $n_{k+1}=\min(A\setminus\{n_1,\dots,n_k\})$ (el conjunto no es vacío porque $A$ es infinito). La función $k\mapsto n_k$ es inyectiva y estrictamente creciente, luego $n_k\ge k$. Es sobreyectiva: si $a\in A$, como $n_k\ge k$ existe $k$ con $n_k>a$; si $a$ no fuera ninguno de $n_1,\dots,n_{k-1}$, por minimalidad habría sido elegido antes que $n_k$, contradicción. Así $\mathbb{N}\sim A$. Si $B$ es subconjunto de un numerable $X\sim\mathbb{N}$, se lo transporta a un subconjunto de $\mathbb{N}$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $7\mathbb{N}=\{7,14,21,\dots\}$ y $(-1,1)\cap\mathbb{Q}$ son numerables.`,
      idea: 'Ver que son subconjuntos infinitos de un conjunto numerable.',
      pasos: [
        { idea: '$7\\mathbb{N}$', detalle: R`<p>$7\mathbb{N}\subseteq\mathbb{N}$ es infinito (para cada $n$, $7n\in7\mathbb{N}$ son todos distintos), así que es numerable. Concretamente $k\mapsto7k$ es la enumeración.</p>` },
        { idea: '$(-1,1)\\cap\\mathbb{Q}$', detalle: R`<p>Es subconjunto de $\mathbb{Q}$ (numerable, ver el resultado siguiente) e infinito: contiene $\{\tfrac1{n+1}:n\in\mathbb{N}\}$. Luego es numerable. $\blacksquare$</p>` },
      ],
      conclusion: 'Infinito + contenido en un numerable = numerable: no hace falta escribir ninguna biyección.',
    },
  },
  {
    n: 'Todo conjunto infinito contiene un numerable', ref: 'Cap. 3.1',
    d: DEF_CONT + R`<p><strong>Infinito:</strong> no finito, es decir $A\setminus\{a_1,\dots,a_n\}\ne\varnothing$ para toda lista finita.</p>`,
    e: R`Si $A$ es infinito, existe una sucesión inyectiva $(a_n)\subseteq A$ (un subconjunto numerable). Así $\aleph_0$ es el menor cardinal infinito.`,
    p: R`<p>Elegimos $a_1\in A$. Dados $a_1,\dots,a_n$ distintos, $A\setminus\{a_1,\dots,a_n\}\ne\varnothing$ (si no, $A$ sería finito) y elegimos $a_{n+1}$ en él. La sucesión resultante es inyectiva, y $n\mapsto a_n$ es una biyección entre $\mathbb{N}$ y $\{a_n\}\subseteq A$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Sea $A\subseteq\mathbb{R}$ infinito y acotado. Probar que existe una sucesión de términos distintos en $A$ que tiene una subsucesión convergente.`,
      idea: 'Extraer una sucesión inyectiva con el resultado y aplicar Bolzano–Weierstrass.',
      pasos: [
        { idea: 'Sucesión inyectiva', detalle: R`<p>Como $A$ es infinito existen $a_1,a_2,\dots\in A$ todos distintos.</p>` },
        { idea: 'Acotada', detalle: R`<p>Está contenida en $A$, que es acotado: $(a_n)$ es acotada.</p>` },
        { idea: 'Bolzano–Weierstrass', detalle: R`<p>Existe $a_{n_k}\to x\in\mathbb{R}$. Como los términos son distintos, $x$ es un punto de acumulación de $A$ (infinitos puntos de $A$ cerca de $x$). $\blacksquare$</p>` },
      ],
      conclusion: 'Es el primer paso de la prueba de que "todo infinito acotado de $\\mathbb{R}$ tiene un punto de acumulación", que reaparece en compacidad.',
    },
  },
  {
    n: '$\\mathbb{N}\\times\\mathbb{N}$, $\\mathbb{Z}$ y $\\mathbb{Q}$ son numerables', ref: 'Cap. 3.1; Práctica 2, Ej. 1',
    d: DEF_CONT,
    e: R`$\mathbb{N}\times\mathbb{N}$, $\mathbb{Z}$ y $\mathbb{Q}$ son numerables.`,
    p: R`<p>$\mathbb{N}\times\mathbb{N}$: la función $(m,n)\mapsto2^m3^n$ es inyectiva (unicidad de la factorización en primos), así que $\mathbb{N}\times\mathbb{N}$ es coordinable con un subconjunto infinito de $\mathbb{N}$, que es numerable.</p>
<p>$\mathbb{Z}$: $k\mapsto2k$ si $k>0$ y $k\mapsto-2k+1$ si $k\le0$ es biyección $\mathbb{Z}\to\mathbb{N}$.</p>
<p>$\mathbb{Q}$: a cada racional se le asigna su fracción irreducible $\tfrac pq$ con $q\ge1$; $\tfrac pq\mapsto(p,q)\in\mathbb{Z}\times\mathbb{N}$ es inyectiva y $\mathbb{Z}\times\mathbb{N}\sim\mathbb{N}\times\mathbb{N}$ es numerable. $\mathbb{Q}$ es infinito, luego numerable. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $\mathbb{Q}\times\mathbb{Q}$ es numerable y calcular las imágenes de $(1,1)$, $(1,2)$, $(2,1)$ por $(m,n)\mapsto2^m3^n$.`,
      idea: 'El producto de dos numerables se reduce a $\\mathbb{N}\\times\\mathbb{N}$ componiendo biyecciones coordenada a coordenada.',
      pasos: [
        { idea: 'Biyecciones coordenada a coordenada', detalle: R`<p>Sea $\varphi:\mathbb{Q}\to\mathbb{N}$ biyección. Entonces $\Phi(p,q)=(\varphi(p),\varphi(q))$ es biyección $\mathbb{Q}\times\mathbb{Q}\to\mathbb{N}\times\mathbb{N}$.</p>` },
        { idea: 'Inyección a $\\mathbb{N}$', detalle: R`<p>Componiendo con $(m,n)\mapsto2^m3^n$ obtenemos una inyección $\mathbb{Q}\times\mathbb{Q}\to\mathbb{N}$.</p>` },
        { idea: 'Valores concretos', detalle: R`<p>$(1,1)\mapsto6$, $(1,2)\mapsto18$, $(2,1)\mapsto12$: son distintos, como asegura la unicidad de la factorización. $\mathbb{Q}^2$ es infinito, luego numerable. $\blacksquare$</p>` },
      ],
      conclusion: 'Por inducción, $\\mathbb{Q}^k$ es numerable para todo $k$: los productos <em>finitos</em> de numerables son numerables.',
    },
  },
  {
    n: 'Sobreyección desde $\\mathbb{N}$ implica contable', ref: 'Lema (L2), Práctica 2',
    d: DEF_FUN + DEF_CONT,
    e: R`Si existe una sobreyección $f:\mathbb{N}\to X$, entonces $X$ es contable.`,
    p: R`<p>Definimos $g:X\to\mathbb{N}$ por $g(x)=\min f^{-1}(\{x\})$ (el conjunto es no vacío por sobreyectividad). Es inyectiva: si $g(x)=g(y)=n$, entonces $x=f(n)=y$. Entonces $X\sim g(X)\subseteq\mathbb{N}$, que es finito o numerable. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $F=\{\sin n:n\in\mathbb{N}\}$ es contable.`,
      idea: 'Encontrar una sobreyección desde $\\mathbb{N}$: la propia función que define el conjunto.',
      pasos: [
        { idea: 'Definir $f$', detalle: R`<p>$f:\mathbb{N}\to F$, $f(n)=\sin n$.</p>` },
        { idea: 'Sobreyectiva', detalle: R`<p>Todo elemento de $F$ es, por definición, $\sin n$ para algún $n$.</p>` },
        { idea: 'Aplicar el resultado', detalle: R`<p>Por el resultado, $F$ es contable. (No hizo falta saber si es finito: la sobreyección lo cubre.) $\blacksquare$</p>` },
      ],
      conclusion: 'Todo conjunto "indexado por $\\mathbb{N}$" (la imagen de una sucesión) es contable.',
    },
  },
  {
    n: 'Uniones de conjuntos contables', ref: 'Práctica 2, Ej. 2, 5, 6',
    d: DEF_CONT + R`<p>$\bigcup_{n\in\mathbb{N}}A_n=\{x:\exists n\ (x\in A_n)\}$.</p>`,
    e: R`La unión de dos conjuntos contables es contable. La unión de una cantidad <em>numerable</em> de conjuntos contables es contable. Un producto finito de numerables es numerable; el conjunto de palabras finitas sobre un alfabeto finito es numerable.`,
    p: R`<p>Sean $A_n=\{a_{n,1},a_{n,2},\dots\}$ (si alguno es finito se repiten elementos). La función $(n,m)\mapsto a_{n,m}$ es una sobreyección $\mathbb{N}\times\mathbb{N}\to\bigcup A_n$ y $\mathbb{N}\times\mathbb{N}\sim\mathbb{N}$, así que hay una sobreyección desde $\mathbb{N}$, y la unión es contable. Las palabras de longitud $m$ sobre un alfabeto finito $\Sigma$ forman un conjunto finito $\Sigma^m$, y el conjunto de todas las palabras es $\bigcup_m\Sigma^m$ (infinito). $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $\mathbb{Z}[x]$, los polinomios con coeficientes enteros, es numerable.`,
      idea: 'Partir por grado: los polinomios de grado $\\le d$ se corresponden con $\\mathbb{Z}^{d+1}$, que es numerable.',
      pasos: [
        { idea: 'Estratificar', detalle: R`<p>$P_d=\{p\in\mathbb{Z}[x]:\deg p\le d\}$; $\mathbb{Z}[x]=\bigcup_{d\ge0}P_d$.</p>` },
        { idea: 'Cada estrato es numerable', detalle: R`<p>$p=\sum_{i\le d}c_ix^i\mapsto(c_0,\dots,c_d)$ es biyección $P_d\to\mathbb{Z}^{d+1}$, producto finito de numerables.</p>` },
        { idea: 'Unir', detalle: R`<p>Unión numerable de numerables es contable, y $\mathbb{Z}[x]$ es infinito: numerable. (Consecuencia: hay solo $\aleph_0$ números algebraicos, así que casi todos los reales son trascendentes.) $\blacksquare$</p>` },
      ],
      conclusion: 'Dividir en "capas finitas" y unir es la técnica universal para probar numerabilidad.',
    },
  },
  {
    n: 'Subconjuntos finitos de un numerable', ref: 'Práctica 2, Ej. 11',
    d: R`<p>$\mathcal{P}_f(A)=\{B\subseteq A:B\text{ finito}\}$.</p>`,
    e: R`Si $A$ es numerable, $\mathcal{P}_f(A)$ es numerable. (En cambio $\mathcal{P}(A)$ no lo es.)`,
    p: R`<p>Para cada $k$, $S_k=\{B\subseteq A:\#B\le k\}$ es imagen de $A^k$ por $(a_1,\dots,a_k)\mapsto\{a_1,\dots,a_k\}$, que es sobreyectiva; como $A^k$ es numerable, $S_k$ es contable. $\mathcal{P}_f(A)=\bigcup_kS_k$ es unión numerable de contables, contable; es infinito (contiene los singletons). $\blacksquare$</p>`,
    x: {
      enunciado: R`Dar una inyección explícita $\mathcal{P}_f(\mathbb{N})\to\mathbb{N}$ y calcular la imagen de $\{1,3,4\}$.`,
      idea: 'Codificar cada conjunto finito como un número escrito en binario.',
      pasos: [
        { idea: 'Definir', detalle: R`<p>$\Theta(B)=\sum_{b\in B}2^b$ (suma finita).</p>` },
        { idea: 'Inyectiva', detalle: R`<p>Es la escritura en base $2$: dos conjuntos distintos tienen distinta expansión binaria (la expansión finita es única), luego distinto número.</p>` },
        { idea: 'Ejemplo', detalle: R`<p>$\Theta(\{1,3,4\})=2+8+16=26=11010_2$. El conjunto se recupera leyendo los bits en $1$. $\blacksquare$</p>` },
      ],
      conclusion: 'Los conjuntos <em>finitos</em> se codifican con números; los infinitos necesitarían infinitos bits: por eso $\\mathcal{P}(\\mathbb{N})$ es más grande.',
    },
  },
];

// ---------------------------------------------------------------- Hotel de Hilbert
export const CARD_HILBERT = [
  {
    n: 'Infinito $=$ coordinable con una parte propia', ref: 'Cap. 3.1',
    d: DEF_FUN,
    e: R`Un conjunto $A$ es infinito sii existe una biyección entre $A$ y un subconjunto propio de $A$. En particular, $\mathbb{N}\sim\mathbb{N}\setminus\{1\}$. Un conjunto finito nunca es coordinable con un subconjunto propio.`,
    p: R`<p>($\Rightarrow$) Si $A$ es infinito contiene $a_1,a_2,\dots$ distintos. La función $f(a_n)=a_{n+1}$ y $f(x)=x$ para $x\notin\{a_n\}$ es biyección $A\to A\setminus\{a_1\}$.</p>
<p>($\Leftarrow$) Si $A$ es finito con $n$ elementos, un subconjunto propio tiene menos de $n$ elementos y ninguna función de $A$ en él puede ser inyectiva (principio del palomar). $\blacksquare$</p>`,
    x: {
      enunciado: R`Dar una biyección $[0,1]\to(0,1]$.`,
      idea: 'Elegir una sucesión de puntos distintos dentro de $[0,1]$ que empiece en el punto a quitar y "correr" a todos un lugar.',
      pasos: [
        { idea: 'Elegir la sucesión', detalle: R`<p>$a_1=0$ y $a_n=\tfrac1{n-1}$ para $n\ge2$: $0,1,\tfrac12,\tfrac13,\dots$ (todos distintos).</p>` },
        { idea: 'Definir $f$', detalle: R`<p>$f(0)=1$, $f(\tfrac1k)=\tfrac1{k+1}$ para $k\ge1$, y $f(x)=x$ en el resto de $[0,1]$.</p>` },
        { idea: 'Verificar', detalle: R`<p>$f$ es inyectiva y su imagen es $[0,1]\setminus\{0\}=(0,1]$ (el $0$ nunca se alcanza, todos los demás sí). $\blacksquare$</p>` },
      ],
      conclusion: 'Es el Hotel de Hilbert: "correr un lugar a todos" deja libre la habitación $a_1$ sin dejar a nadie afuera.',
    },
  },
  {
    n: 'Aritmética de $\\aleph_0$', ref: 'Cap. 3.1',
    d: DEF_CONT,
    e: R`$\aleph_0+k=\aleph_0$ para $k$ finito, $\aleph_0+\aleph_0=\aleph_0$ y $\aleph_0\cdot\aleph_0=\aleph_0$.`,
    p: R`<p>$\aleph_0+k$: si $B=\mathbb{N}\sqcup\{p_1,\dots,p_k\}$, $p_i\mapsto i$ y $n\mapsto n+k$ es biyección $B\to\mathbb{N}$. $\aleph_0+\aleph_0$: $\mathbb{N}\sqcup\mathbb{N}\to\mathbb{N}$ llevando el $n$ de la primera copia a $2n-1$ y el de la segunda a $2n$. $\aleph_0\cdot\aleph_0$: $\mathbb{N}\times\mathbb{N}\sim\mathbb{N}$ (numerables). $\blacksquare$</p>`,
    x: {
      enunciado: R`Un hotel con habitaciones $1,2,3,\dots$ está lleno. Llegan infinitos micros, el micro $i$ con infinitos pasajeros $(i,1),(i,2),\dots$ Asignarles habitación sin conflicto.`,
      idea: 'Usar una inyección $\\mathbb{N}\\times\\mathbb{N}\\to\\mathbb{N}$ (no hace falta que sea sobreyectiva).',
      pasos: [
        { idea: 'Regla', detalle: R`<p>El pasajero $(i,j)$ va a la habitación $2^i3^j$.</p>` },
        { idea: 'Sin conflictos', detalle: R`<p>Si $2^i3^j=2^{i'}3^{j'}$, por unicidad de la factorización $i=i'$ y $j=j'$: nadie comparte habitación.</p>` },
        { idea: 'Los huéspedes originales', detalle: R`<p>Los pasajeros actuales de la habitación $n$ pasan a $5^n$ (que no es de la forma $2^i3^j$): tampoco chocan con los micros. Queda mucho lugar vacío, pero eso es irrelevante: lo que importa es no repetir habitación. $\blacksquare$</p>` },
      ],
      conclusion: 'Para probar que algo cabe en $\\mathbb{N}$ basta una <em>inyección</em>; no es necesario ocupar todos los lugares.',
    },
  },
  {
    n: 'Quitar un conjunto contable', ref: 'Práctica 2, Ej. 3 y 4',
    d: DEF_FUN + R`<p>$B\setminus A=\{x\in B:x\notin A\}$.</p>`,
    e: R`Si $A\subseteq B$ es contable y $B\setminus A$ es infinito, entonces $B\setminus A\sim B$. En particular, $\mathbb{R}\setminus\mathbb{Q}\sim\mathbb{R}$.`,
    p: R`<p>$B\setminus A$ es infinito: contiene un numerable $C$. Entonces $C\cup A$ es unión de contables, contable e infinito, o sea numerable; luego existe una biyección $\varphi:C\to C\cup A$. Sea $S=(B\setminus A)\setminus C$. Entonces $B\setminus A=S\sqcup C$ y $B=S\sqcup(C\cup A)$. La función igual a $\mathrm{id}$ sobre $S$ y a $\varphi$ sobre $C$ es una biyección $B\setminus A\to B$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $\mathbb{R}\setminus\mathbb{Q}$ tiene cardinal $c=\#\mathbb{R}$.`,
      idea: 'Aplicar el resultado con $B=\mathbb{R}$ y $A=\mathbb{Q}$.',
      pasos: [
        { idea: 'Hipótesis', detalle: R`<p>$\mathbb{Q}\subseteq\mathbb{R}$ es numerable.</p>` },
        { idea: '$\\mathbb{R}\\setminus\\mathbb{Q}$ es infinito', detalle: R`<p>Contiene $\{\sqrt2\,q:q\in\mathbb{Q}\setminus\{0\}\}$ (racional no nulo por irracional), que es infinito.</p>` },
        { idea: 'Conclusión', detalle: R`<p>Por el resultado, $\mathbb{R}\setminus\mathbb{Q}\sim\mathbb{R}$: hay tantos irracionales como reales. $\blacksquare$</p>` },
      ],
      conclusion: 'Los racionales son "pocos" ($\\aleph_0$) frente a $c$: quitarlos no cambia el cardinal.',
    },
  },
];

// ---------------------------------------------------------------- Cantor
export const CARD_CANTOR = [
  {
    n: 'Teorema de Cantor: $[0,1)$ no es numerable', ref: 'Cap. 3.2',
    d: R`<p><strong>Desarrollo decimal propio:</strong> todo $x\in[0,1)$ se escribe $x=0{,}x^1x^2x^3\dots=\sum x^k10^{-k}$ con $x^k\in\{0,\dots,9\}$ <em>sin colas de $9$</em>; con esa restricción el desarrollo es único. <strong>Cardinal del continuo:</strong> $c=\#\mathbb{R}$.</p>`,
    e: R`No existe una sobreyección $\mathbb{N}\to[0,1)$. En consecuencia $\mathbb{R}$ no es numerable, $\aleph_0<c$.`,
    p: R`<p>Supongamos que $x_1,x_2,\dots$ enumera todo $[0,1)$ con desarrollos propios $x_n=0{,}x_n^1x_n^2\dots$ Definimos $y=0{,}y^1y^2\dots$ con $y^k=5$ si $x_k^k\ne5$ y $y^k=4$ si $x_k^k=5$. Los dígitos de $y$ son $4$ o $5$ (ni $0$ ni $9$), así que el desarrollo es propio y $y\in[0,1)$. Por unicidad del desarrollo propio, $y\ne x_k$ porque difieren en el dígito $k$. Entonces $y$ no está en la lista: contradicción. $\blacksquare$</p>`,
    x: {
      enunciado: R`Dada la lista $x_1=0{,}1234\ldots$, $x_2=0{,}5555\ldots$, $x_3=0{,}9012\ldots$, $x_4=0{,}0007\ldots$, construir los primeros cuatro dígitos de un número que no figure en ella.`,
      idea: 'Cambiar el dígito diagonal de cada $x_k$ por $4$ o $5$.',
      pasos: [
        { idea: 'Diagonal', detalle: R`<p>Dígitos $k$-ésimos de $x_k$: $1,\ 5,\ 1,\ 7$ (el 1.º de $x_1$, el 2.º de $x_2$, el 3.º de $x_3$, el 4.º de $x_4$).</p>` },
        { idea: 'Reglas', detalle: R`<p>$y^1$: $1\ne5\Rightarrow5$. $y^2$: es $5\Rightarrow4$. $y^3$: $1\ne5\Rightarrow5$. $y^4$: $7\ne5\Rightarrow5$.</p>` },
        { idea: 'Resultado', detalle: R`<p>$y=0{,}5455\ldots$ difiere de $x_1$ en el 1.er dígito, de $x_2$ en el 2.º, de $x_3$ en el 3.º y de $x_4$ en el 4.º: no está en la lista. $\blacksquare$</p>` },
      ],
      conclusion: 'Evitar los dígitos $0$ y $9$ es lo que asegura que $y$ es distinto de verdad (por la no unicidad $0{,}4999\\ldots=0{,}5$).',
    },
  },
  {
    n: 'Irracionales e intervalos tienen cardinal $c$', ref: 'Práctica 2, Ej. 4',
    d: R`<p>$\#A=c$ significa $A\sim\mathbb{R}$. CSB: inyecciones $A\hookrightarrow B$ y $B\hookrightarrow A$ implican $A\sim B$.</p>`,
    e: R`$\mathbb{R}\setminus\mathbb{Q}$, $(a,b)$, $[a,b]$ y $\mathbb{R}$ tienen todos cardinal $c$.`,
    p: R`<p>$\mathbb{R}\setminus\mathbb{Q}\sim\mathbb{R}$ por la propiedad de quitar un contable. $(a,b)\sim(-1,1)\sim\mathbb{R}$ por la biyección $h$. Para $[a,b]$: $(a,b)\subseteq[a,b]\subseteq\mathbb{R}$ da inyecciones $(a,b)\hookrightarrow[a,b]$ y $[a,b]\hookrightarrow\mathbb{R}\sim(a,b)$; por CSB, $[a,b]\sim(a,b)\sim\mathbb{R}$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar $[0,1]\sim(0,1)$ sin construir la biyección, usando CSB.`,
      idea: 'Una inyección en cada sentido.',
      pasos: [
        { idea: '$(0,1)\\hookrightarrow[0,1]$', detalle: R`<p>La inclusión.</p>` },
        { idea: '$[0,1]\\hookrightarrow(0,1)$', detalle: R`<p>$x\mapsto\tfrac{x+1}3$ lleva $[0,1]$ en $[\tfrac13,\tfrac23]\subseteq(0,1)$ y es inyectiva.</p>` },
        { idea: 'CSB', detalle: R`<p>Hay inyecciones en ambos sentidos, luego $[0,1]\sim(0,1)$. $\blacksquare$</p>` },
      ],
      conclusion: 'CSB ahorra construir biyecciones feas (acá habría que hacer un truco tipo Hilbert).',
    },
  },
  {
    n: '$[0,1)\\sim\\{0,1\\}^{\\mathbb{N}}\\sim\\mathcal{P}(\\mathbb{N})$', ref: 'Práctica 2, Ej. 10',
    d: R`<ul><li>$\{0,1\}^{\mathbb{N}}$: sucesiones $(b_n)$ con $b_n\in\{0,1\}$.</li><li><strong>Función indicadora</strong> de $B\subseteq\mathbb{N}$: $\chi_B(n)=1$ si $n\in B$ y $0$ si no.</li></ul>`,
    e: R`$[0,1)\sim\{0,1\}^{\mathbb{N}}\sim\mathcal{P}(\mathbb{N})$. En particular $\#\mathcal{P}(\mathbb{N})=c$.`,
    p: R`<p>$\mathcal{P}(\mathbb{N})\sim\{0,1\}^{\mathbb{N}}$ por $B\mapsto\chi_B$ (biyección). $\{0,1\}^{\mathbb{N}}\hookrightarrow[0,1)$: $(b_n)\mapsto\sum b_n3^{-n}\le\tfrac12<1$, inyectiva porque los desarrollos en base $3$ con dígitos $0,1$ son únicos. $[0,1)\hookrightarrow\{0,1\}^{\mathbb{N}}$: se asigna el desarrollo binario que no termina en infinitos unos (único), lo que es inyectivo. Por CSB, $[0,1)\sim\{0,1\}^{\mathbb{N}}$. (El desarrollo binario no es único: $0{,}0\overline1=0{,}1$; por eso se usa CSB.) $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $\Phi:\mathcal{P}(\mathbb{N})\to\mathbb{R}$, $\Phi(B)=\sum_{n\in B}3^{-n}$, es inyectiva y calcular $\Phi(\{1,3\})$.`,
      idea: 'Si dos conjuntos difieren, mirar el primer índice donde difieren: ese término no puede ser compensado por la cola.',
      pasos: [
        { idea: 'Valor concreto', detalle: R`<p>$\Phi(\{1,3\})=\tfrac13+\tfrac1{27}=\tfrac{10}{27}$.</p>` },
        { idea: 'Primer índice distinto', detalle: R`<p>Sean $B\ne B'$ y $m$ el menor índice donde difieren, digamos $m\in B\setminus B'$. Entonces $\Phi(B)-\Phi(B')\ge3^{-m}-\sum_{n>m}3^{-n}$.</p>` },
        { idea: 'La cola no compensa', detalle: R`<p>$\sum_{n>m}3^{-n}=\tfrac{3^{-m}}2<3^{-m}$, así que la diferencia es $\ge\tfrac{3^{-m}}2>0$ y $\Phi(B)\ne\Phi(B')$. Es inyectiva: $\#\mathcal{P}(\mathbb{N})\le c$. $\blacksquare$</p>` },
      ],
      conclusion: 'Usar base $3$ con dígitos $0/1$ elimina la ambigüedad del binario ($0{,}0\\overline1=0{,}1$) y simplifica la prueba.',
    },
  },
  {
    n: '$c\\cdot c=c$ y $\\mathbb{R}^k\\sim\\mathbb{R}$', ref: 'Práctica 2, Ej. 7, 14, 15',
    d: R`<p>$\#A\cdot\#B=\#(A\times B)$. $\#\mathbb{R}[X]$: cardinal de los polinomios con coeficientes reales.</p>`,
    e: R`$\#([0,1)\times[0,1))=c$; por lo tanto $\#\mathbb{R}^k=c$ para todo $k\ge1$. Además, la unión numerable de conjuntos de cardinal $c$ tiene cardinal $c$ y $\#\mathbb{R}[X]=c$.`,
    p: R`<p>Dado $(x,y)\in[0,1)^2$ con desarrollos propios $x=0{,}x^1x^2\dots$, $y=0{,}y^1y^2\dots$, el número $z=0{,}x^1y^1x^2y^2\dots$ intercala los dígitos; es propio (no hay colas de $9$ porque no las hay en $x$ ni en $y$), y $(x,y)\mapsto z$ es inyectiva. Con $x\mapsto(x,0)$ en el otro sentido, CSB da $[0,1)^2\sim[0,1)$. Por inducción, $\#\mathbb{R}^{k+1}=\#(\mathbb{R}^k\times\mathbb{R})=c\cdot c=c$. Para $\mathbb{R}[X]=\bigcup_dP_d$ con $P_d\sim\mathbb{R}^{d+1}$: unión numerable de conjuntos de cardinal $c$, que tiene cardinal $c$ (cota inferior: las constantes). $\blacksquare$</p>`,
    x: {
      enunciado: R`Intercalar $x=0{,}135\ldots$ e $y=0{,}246\ldots$ y recuperar el par original desde el resultado.`,
      idea: 'La inyección es reversible: los dígitos impares de $z$ son los de $x$ y los pares los de $y$.',
      pasos: [
        { idea: 'Intercalar', detalle: R`<p>$z=0{,}1\,2\,3\,4\,5\,6\ldots=0{,}123456\ldots$ (dígitos de $x$ en posiciones impares, de $y$ en pares).</p>` },
        { idea: 'Recuperar', detalle: R`<p>$x$ = posiciones $1,3,5,\dots$ de $z$: $0{,}135\ldots$; $y$ = posiciones $2,4,6,\dots$: $0{,}246\ldots$</p>` },
        { idea: 'Conclusión', detalle: R`<p>La aplicación es inyectiva, así $\#[0,1)^2\le c$; con la inyección trivial, $=c$. Entonces $\mathbb{R}^2\sim\mathbb{R}$: el plano tiene tantos puntos como la recta. $\blacksquare$</p>` },
      ],
      conclusion: 'La dimensión geométrica no cambia el cardinal; lo que sí distingue a $\\mathbb{R}$ de $\\mathbb{R}^2$ es la topología (no son homeomorfos), no la cantidad de puntos.',
    },
  },
  {
    n: 'Objetos "chicos" dentro de $\\mathbb{R}$', ref: 'Práctica 2, Ej. 16, 17',
    d: R`<ul><li><strong>Eventualmente constante:</strong> $\exists n_0\ \forall n\ge n_0:\ a_n=a_{n_0}$.</li><li><strong>Periódica:</strong> $\exists T\ge1\ \forall n:\ a_{n+T}=a_n$.</li></ul>`,
    e: R`Son contables (de hecho numerables): (a) las sucesiones de enteros convergentes; (b) las sucesiones racionales periódicas; (c) el conjunto de discontinuidades de una función monótona $f:\mathbb{R}\to\mathbb{R}$.`,
    p: R`<p>(a) Si $a_n\to\ell$ con $a_n\in\mathbb{Z}$, tomando $\varepsilon=\tfrac12$ resulta $|a_n-a_m|<1$ para $n,m\ge n_0$, o sea $a_n=a_{n_0}$ para $n\ge n_0$. Cada conjunto "constante $\ell$ desde $n_0$" $\sim\mathbb{Z}^{n_0-1}$ es numerable y hay una cantidad numerable de pares $(n_0,\ell)$. (b) $P_T\sim\mathbb{Q}^T$ es numerable y la unión sobre $T$ es numerable. (c) Si $f$ es creciente, en cada discontinuidad $x$ el intervalo $(f(x^-),f(x^+))$ es no vacío y para $x<y$ son disjuntos; cada uno contiene un racional distinto, así que hay una inyección en $\mathbb{Q}$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que el conjunto $E$ de sucesiones de enteros que son eventualmente nulas es numerable.`,
      idea: 'Estratificar según desde dónde son nulas.',
      pasos: [
        { idea: 'Estratos', detalle: R`<p>$E_k=\{(a_n):a_n=0\ \forall n>k\}$, $E=\bigcup_kE_k$.</p>` },
        { idea: 'Cada estrato numerable', detalle: R`<p>$E_k\sim\mathbb{Z}^k$ (los primeros $k$ términos son libres), numerable.</p>` },
        { idea: 'Unir', detalle: R`<p>Unión numerable de numerables, infinita: numerable. (Mientras que $\mathbb{Z}^{\mathbb{N}}$ completo tiene cardinal $c$.) $\blacksquare$</p>` },
      ],
      conclusion: '"Información finita" ⇒ numerable; "información infinita" ⇒ cardinal $c$.',
    },
  },
];

// ---------------------------------------------------------------- Orden entre cardinales
export const CARD_ORDEN = [
  {
    n: 'Orden de cardinales', ref: 'Cap. 3.2',
    d: R`<p>$\#A\le\#B$ si existe una función inyectiva $A\to B$. $\#A<\#B$ si $\#A\le\#B$ y $A\not\sim B$.</p>`,
    e: R`El orden $\le$ es reflexivo, transitivo y antisimétrico (por Cantor–Schröder–Bernstein).`,
    p: R`<p>Reflexivo: $\mathrm{id}_A$. Transitivo: la composición de inyectivas es inyectiva. Antisimétrico: $\#A\le\#B$ y $\#B\le\#A$ da inyecciones en ambos sentidos, luego $A\sim B$ por CSB. $\blacksquare$</p>`,
    x: {
      enunciado: R`Ordenar $\#\mathbb{N}$, $\#\mathbb{Z}$, $\#\mathbb{Q}$, $\#\mathbb{R}$.`,
      idea: 'Las inclusiones dan desigualdades; los resultados de numerabilidad dan igualdades.',
      pasos: [
        { idea: 'Inclusiones', detalle: R`<p>$\mathbb{N}\subseteq\mathbb{Z}\subseteq\mathbb{Q}\subseteq\mathbb{R}$ da $\#\mathbb{N}\le\#\mathbb{Z}\le\#\mathbb{Q}\le\#\mathbb{R}$.</p>` },
        { idea: 'Numerables', detalle: R`<p>$\mathbb{Z}$ y $\mathbb{Q}$ son numerables, así $\#\mathbb{N}=\#\mathbb{Z}=\#\mathbb{Q}=\aleph_0$.</p>` },
        { idea: 'Estricto', detalle: R`<p>$\mathbb{R}$ no es numerable (Cantor): $\aleph_0<c$. Orden final: $\aleph_0=\aleph_0=\aleph_0<c$. $\blacksquare$</p>` },
      ],
      conclusion: 'Sólo hay dos cardinales distintos en esta lista: $\\aleph_0$ y $c$.',
    },
  },
  {
    n: 'Teorema de Cantor–Schröder–Bernstein', ref: 'Cap. 3.2',
    d: R`<p>$f:A\to B$ y $g:B\to A$ inyectivas. $g(B)\subseteq A$ es la imagen de $g$.</p>`,
    e: R`Si existen inyecciones $A\hookrightarrow B$ y $B\hookrightarrow A$, entonces $A\sim B$.`,
    p: R`<p>Sean $C_0=A\setminus g(B)$, $C_{n+1}=g(f(C_n))$ y $C=\bigcup_nC_n$. Definimos $h:A\to B$ por $h(x)=f(x)$ si $x\in C$ y $h(x)=g^{-1}(x)$ si $x\notin C$ (bien definido: $x\notin C\Rightarrow x\notin C_0\Rightarrow x\in g(B)$).</p>
<p><em>Inyectiva:</em> $f$ lo es en $C$ y $g^{-1}$ en $A\setminus C$. Si $f(x)=g^{-1}(y)$ con $x\in C$, $y\notin C$, entonces $y=g(f(x))\in C$ (pues $x\in C_n\Rightarrow y\in C_{n+1}$), contradicción.</p>
<p><em>Sobreyectiva:</em> sea $b\in B$. Si $g(b)\notin C$, $h(g(b))=g^{-1}(g(b))=b$. Si $g(b)\in C$, como $g(b)\in g(B)$ no está en $C_0$, así que $g(b)\in C_{n+1}=g(f(C_n))$, o sea $g(b)=g(f(x))$ con $x\in C_n$; por inyectividad de $g$, $b=f(x)=h(x)$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar $\mathbb{N}\sim\mathbb{N}\times\mathbb{N}$ usando CSB.`,
      idea: 'Una inyección en cada sentido, sin construir la biyección.',
      pasos: [
        { idea: '$\\mathbb{N}\\hookrightarrow\\mathbb{N}\\times\\mathbb{N}$', detalle: R`<p>$n\mapsto(n,1)$.</p>` },
        { idea: '$\\mathbb{N}\\times\\mathbb{N}\\hookrightarrow\\mathbb{N}$', detalle: R`<p>$(m,n)\mapsto2^m3^n$: inyectiva por factorización única. Por ejemplo $(2,3)\mapsto4\cdot27=108$.</p>` },
        { idea: 'CSB', detalle: R`<p>Hay inyecciones en ambos sentidos: $\mathbb{N}\sim\mathbb{N}\times\mathbb{N}$. $\blacksquare$</p>` },
      ],
      conclusion: 'CSB es la herramienta para "$\\le$ en ambos sentidos ⇒ $=$"; la biyección explícita existe pero no hace falta escribirla.',
    },
  },
  {
    n: 'Teorema de Cantor sobre partes', ref: 'Cap. 3.2',
    d: R`<p>$\mathcal{P}(A)$ es el conjunto de todos los subconjuntos de $A$.</p>`,
    e: R`Para todo conjunto $A$ no existe una sobreyección $A\to\mathcal{P}(A)$; en consecuencia $\#A<\#\mathcal{P}(A)$.`,
    p: R`<p>Sea $f:A\to\mathcal{P}(A)$ cualquiera y $D=\{a\in A:a\notin f(a)\}$. Si $D=f(a_0)$ para algún $a_0$, entonces $a_0\in D\iff a_0\notin f(a_0)=D$, absurdo. Luego $D$ no está en la imagen de $f$. Además $a\mapsto\{a\}$ es inyectiva $A\to\mathcal{P}(A)$, así $\#A\le\#\mathcal{P}(A)$, y por lo anterior no son coordinables. $\blacksquare$</p>`,
    x: {
      enunciado: R`Sea $A=\{1,2,3\}$ y $f(1)=\{1,2\}$, $f(2)=\{3\}$, $f(3)=\{1,3\}$. Calcular $D$ y verificar que no está en la imagen de $f$.`,
      idea: 'Construir $D$ elemento por elemento.',
      pasos: [
        { idea: 'Elemento 1', detalle: R`<p>$1\in f(1)=\{1,2\}$, entonces $1\notin D$.</p>` },
        { idea: 'Elementos 2 y 3', detalle: R`<p>$2\notin f(2)=\{3\}$, así $2\in D$. $3\in f(3)=\{1,3\}$, así $3\notin D$. Luego $D=\{2\}$.</p>` },
        { idea: 'No está en la imagen', detalle: R`<p>$D=\{2\}\ne f(1),f(2)=\{3\},f(3)$. $D$ difiere de $f(a)$ justamente en el elemento $a$. $\blacksquare$</p>` },
      ],
      conclusion: 'Es el mismo argumento diagonal que para $\\mathbb{R}$, con subconjuntos en lugar de decimales.',
    },
  },
  {
    n: '$\\mathcal{P}(A)\\sim\\{0,1\\}^A$ y propiedades de $\\mathcal{P}$', ref: 'Práctica 2, Ej. 8, 9',
    d: R`<p>$\chi_B:A\to\{0,1\}$, $\chi_B(a)=1$ si $a\in B$, $0$ si no. $\{0,1\}^A$ es el conjunto de funciones $A\to\{0,1\}$.</p>`,
    e: R`$\mathcal{P}(A)\sim\{0,1\}^A$; si $\#A=n$, $\#\mathcal{P}(A)=2^n$. Además $\mathcal{P}(A)\cap\mathcal{P}(B)=\mathcal{P}(A\cap B)$, $\mathcal{P}(A)\cup\mathcal{P}(B)\subseteq\mathcal{P}(A\cup B)$ y $A\sim B\Rightarrow\mathcal{P}(A)\sim\mathcal{P}(B)$.`,
    p: R`<p>$B\mapsto\chi_B$ es biyectiva con inversa $\chi\mapsto\chi^{-1}(\{1\})$. Una función $A\to\{0,1\}$ se define eligiendo $0$ o $1$ para cada uno de los $n$ elementos: $2^n$ posibilidades. $X\in\mathcal{P}(A)\cap\mathcal{P}(B)\iff X\subseteq A$ y $X\subseteq B\iff X\subseteq A\cap B$. Si $X\subseteq A$ o $X\subseteq B$, entonces $X\subseteq A\cup B$. Si $\varphi:A\to B$ es biyección, $X\mapsto\varphi(X)$ es biyección $\mathcal{P}(A)\to\mathcal{P}(B)$ con inversa $Y\mapsto\varphi^{-1}(Y)$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Para $A=\{1\}$ y $B=\{2\}$, mostrar que $\mathcal{P}(A)\cup\mathcal{P}(B)\ne\mathcal{P}(A\cup B)$ y listar $\mathcal{P}(\{a,b,c\})$ con sus funciones indicadoras.`,
      idea: 'Contar y listar: los 8 subconjuntos de un conjunto de 3 elementos se corresponden con las 8 cadenas de 3 bits.',
      pasos: [
        { idea: 'Contraejemplo', detalle: R`<p>$\mathcal{P}(A)\cup\mathcal{P}(B)=\{\varnothing,\{1\},\{2\}\}$ (3 elementos) pero $\mathcal{P}(\{1,2\})$ tiene $4$: falta $\{1,2\}$.</p>` },
        { idea: 'Codificación en bits', detalle: R`<p>Para $\{a,b,c\}$ el subconjunto $B$ se codifica con $(\chi_B(a),\chi_B(b),\chi_B(c))$: $\varnothing\mapsto000$, $\{a\}\mapsto100$, $\{b\}\mapsto010$, $\{c\}\mapsto001$, $\{a,b\}\mapsto110$, $\{a,c\}\mapsto101$, $\{b,c\}\mapsto011$, $\{a,b,c\}\mapsto111$.</p>` },
        { idea: 'Conteo', detalle: R`<p>Son $2^3=8$ cadenas, y cada una corresponde a exactamente un subconjunto. $\blacksquare$</p>` },
      ],
      conclusion: 'Pensar un subconjunto como "una cadena de unos y ceros" explica por qué $\\mathcal{P}(\\mathbb{N})\\sim\\{0,1\\}^{\\mathbb{N}}$ tiene cardinal $c$.',
    },
  },
  {
    n: 'Hay infinitos de infinitos', ref: 'Cap. 3.2',
    d: R`<p>$2^{\aleph_0}=\#\{0,1\}^{\mathbb{N}}=\#\mathcal{P}(\mathbb{N})$.</p>`,
    e: R`$\aleph_0<c=2^{\aleph_0}<2^c<2^{2^c}<\cdots$: no existe un "infinito más grande".`,
    p: R`<p>Por el teorema de Cantor, $\#\mathbb{N}<\#\mathcal{P}(\mathbb{N})$, y $\#\mathcal{P}(\mathbb{N})=c$ (resultado anterior). Aplicando Cantor a $\mathbb{R}$: $c<\#\mathcal{P}(\mathbb{R})=2^c$. Se itera con $\mathcal{P}(\mathcal{P}(\mathbb{R}))$ y así sucesivamente. $\blacksquare$</p>`,
    x: {
      enunciado: R`Dar una segunda prueba de que $\mathbb{R}$ no es numerable usando el teorema de Cantor.`,
      idea: 'Si $\\mathbb{R}$ fuera numerable, $\\mathcal{P}(\\mathbb{N})\\sim\\mathbb{R}\\sim\\mathbb{N}$, contradiciendo Cantor.',
      pasos: [
        { idea: 'Hechos', detalle: R`<p>$\mathcal{P}(\mathbb{N})\sim\mathbb{R}$ (desarrollo binario) y $\mathbb{N}\not\sim\mathcal{P}(\mathbb{N})$ (Cantor).</p>` },
        { idea: 'Absurdo', detalle: R`<p>Si $\mathbb{R}\sim\mathbb{N}$, componiendo biyecciones $\mathbb{N}\sim\mathbb{R}\sim\mathcal{P}(\mathbb{N})$, contradicción.</p>` },
        { idea: 'Conclusión', detalle: R`<p>Luego $\mathbb{R}$ no es numerable. $\blacksquare$</p>` },
      ],
      conclusion: 'Los dos argumentos diagonales (el de los decimales y el de las partes) son manifestaciones del mismo método.',
    },
  },
];
