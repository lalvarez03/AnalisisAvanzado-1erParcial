// Resultados clave — Espacios métricos, parte 1: distancia y topología (teórica Cap. 4 · Práctica 3).
// Esquema: { n, ref, d: definiciones formales, e: enunciado, p: demostración, x: ejemplo de uso paso a paso }.
const R = String.raw;

const DEF_MET = R`<p><strong>Métrica</strong> en $E$: $d:E\times E\to\mathbb{R}$ con (M1) $d(x,y)=0\iff x=y$; (M2) $d(x,y)=d(y,x)$; (M3) $d(x,z)\le d(x,y)+d(y,z)$. <strong>Bola abierta:</strong> $B(x,r)=\{y\in E:d(x,y)<r\}$, $r>0$; <strong>bola cerrada:</strong> $\overline B(x,r)=\{y:d(x,y)\le r\}$.</p>`;
const DEF_TOP = DEF_MET + R`<ul><li><strong>Abierto:</strong> $U\subseteq E$ tal que $\forall x\in U\ \exists r>0:\ B(x,r)\subseteq U$. <strong>Cerrado:</strong> $F$ con $E\setminus F$ abierto.</li>
<li><strong>Interior:</strong> $A^\circ=\{x:\exists r>0,\ B(x,r)\subseteq A\}$. <strong>Clausura (adherencia):</strong> $\overline A=\{x:\forall r>0,\ B(x,r)\cap A\ne\varnothing\}$. <strong>Frontera:</strong> $\partial A=\overline A\setminus A^\circ$.</li></ul>`;

// ---------------------------------------------------------------- Distancia y bolas
export const EM_DISTANCIA = [
  {
    n: 'Axiomas de métrica y primeras consecuencias', ref: 'Cap. 4',
    d: DEF_MET,
    e: R`En todo espacio métrico $d(x,y)\ge0$ (no negatividad), aunque no figura entre los axiomas: se deduce de ellos. Un par $(E,d)$ con (M1)–(M3) se llama <em>espacio métrico</em>.`,
    p: R`<p>Por (M3) y (M2): $0=d(x,x)\le d(x,y)+d(y,x)=2d(x,y)$, de donde $d(x,y)\ge0$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $d(x,y)=|e^x-e^y|$ es una métrica en $\mathbb{R}$.`,
      idea: 'Verificar los tres axiomas reduciéndolos a propiedades del valor absoluto y de la inyectividad de $\\exp$.',
      pasos: [
        { idea: '(M1) Identidad', detalle: R`<p>$d(x,y)=0\iff e^x=e^y\iff x=y$, porque $\exp$ es inyectiva (estrictamente creciente).</p>` },
        { idea: '(M2) Simetría', detalle: R`<p>$|e^x-e^y|=|e^y-e^x|$.</p>` },
        { idea: '(M3) Triangular', detalle: R`<p>$|e^x-e^z|\le|e^x-e^y|+|e^y-e^z|$ es la desigualdad triangular de $\mathbb{R}$ aplicada a $a=e^x,b=e^y,c=e^z$. $\blacksquare$</p>` },
      ],
      conclusion: 'Si $\\varphi$ es inyectiva, $d(x,y)=|\\varphi(x)-\\varphi(y)|$ siempre es métrica; la inyectividad es lo que asegura (M1).',
    },
  },
  {
    n: 'Desigualdad triangular inversa', ref: 'Ejemplo 4.28',
    d: DEF_MET,
    e: R`Para todos $x,y,z$: $|d(x,z)-d(y,z)|\le d(x,y)$. Más generalmente, $|d(x,y)-d(x',y')|\le d(x,x')+d(y,y')$.`,
    p: R`<p>Por (M3), $d(x,z)\le d(x,y)+d(y,z)$, o sea $d(x,z)-d(y,z)\le d(x,y)$. Intercambiando $x$ e $y$ (y usando (M2)), $d(y,z)-d(x,z)\le d(x,y)$. Ambas juntas dicen $|d(x,z)-d(y,z)|\le d(x,y)$. Para la versión general se aplica dos veces: $|d(x,y)-d(x',y')|\le|d(x,y)-d(x',y)|+|d(x',y)-d(x',y')|$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Si $d(x,a)=3$ y $d(y,a)=7$, ¿qué valores puede tomar $d(x,y)$?`,
      idea: 'Una cota inferior sale de la desigualdad inversa y una superior de la triangular directa.',
      pasos: [
        { idea: 'Cota inferior', detalle: R`<p>$d(x,y)\ge|d(x,a)-d(y,a)|=|3-7|=4$.</p>` },
        { idea: 'Cota superior', detalle: R`<p>$d(x,y)\le d(x,a)+d(a,y)=3+7=10$.</p>` },
        { idea: 'Conclusión', detalle: R`<p>$4\le d(x,y)\le10$, y ambos extremos se alcanzan en $\mathbb{R}$ ($a=0$, $x=-3$, $y=7$ da $10$; $x=3$, $y=7$ da $4$). $\blacksquare$</p>` },
      ],
      conclusion: 'La desigualdad inversa dice que $x\\mapsto d(x,z)$ es 1-Lipschitz: la distancia a un punto fijo varía a lo sumo tanto como el punto.',
    },
  },
  {
    n: 'Ejemplos fundamentales y contraejemplos', ref: 'Práctica 3, Ej. 1–2',
    d: DEF_MET + R`<ul><li>$d_1(x,y)=\sum|x_i-y_i|$, $d_2(x,y)=\big(\sum(x_i-y_i)^2\big)^{1/2}$, $d_\infty(x,y)=\max|x_i-y_i|$ en $\mathbb{R}^n$.</li><li>$d_\infty(f,g)=\max_{[0,1]}|f-g|$ en $C([0,1])$. <strong>Discreta:</strong> $\delta(x,y)=0$ si $x=y$ y $1$ si $x\ne y$.</li></ul>`,
    e: R`$d_1,d_2,d_\infty$, $d_\infty$ en $C[0,1]$, $\delta$ y $\sqrt{|x-y|}$ son métricas. En cambio $(x-y)^2$ y $|x^2-y^2|$ <em>no</em> lo son en $\mathbb{R}$.`,
    p: R`<p>Para $d_2$ la triangular se deduce de la desigualdad de Cauchy–Schwarz (Minkowski): $\|u+v\|_2\le\|u\|_2+\|v\|_2$ con $u=x-y$, $v=y-z$. Para $d_1,d_\infty$ se aplica $|a+b|\le|a|+|b|$ coordenada a coordenada. Para $d_\infty$ en $C[0,1]$: $|f(t)-h(t)|\le|f(t)-g(t)|+|g(t)-h(t)|\le d_\infty(f,g)+d_\infty(g,h)$ para todo $t$; el máximo existe por Weierstrass. Para $\sqrt{|x-y|}$: $\sqrt{a+b}\le\sqrt a+\sqrt b$ (elevar al cuadrado) con $a=|x-y|$, $b=|y-z|$.</p>
<p><em>$(x-y)^2$:</em> $d(0,2)=4>2=d(0,1)+d(1,2)$. <em>$|x^2-y^2|$:</em> $d(1,-1)=0$ con $1\ne-1$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Decidir si $d(x,y)=\sqrt{|x-y|}$ y $d'(x,y)=|x^2-y^2|$ son métricas en $\mathbb{R}$.`,
      idea: 'Para confirmar, verificar los tres axiomas; para refutar, basta un contraejemplo numérico a algún axioma.',
      pasos: [
        { idea: '$d$: (M1) y (M2)', detalle: R`<p>$\sqrt{|x-y|}=0\iff x=y$ y es simétrica.</p>` },
        { idea: '$d$: (M3)', detalle: R`<p>Primero notamos que $\sqrt{a+b}\le\sqrt a+\sqrt b$ para $a,b\ge 0$. Con $a=|x-y|$, $b=|y-z|$. <br> Esto vale porque $(\sqrt a+\sqrt b)^2=a+b+2\sqrt{ab}\ge a+b$, pues $2\sqrt{ab}\ge 0$.<br>Ahora, por desigualdad triangular en $\mathbb{R}$, $|x-z|\le |x-y|+|y-z|$.<br> Como la raíz es creciente, vale que $\sqrt{|x-z|}\le\sqrt{|x-y|+|y-z|}$.<br> Juntamos las dos desigualdades y queda que: <br> $d(x,z)=\sqrt{|x-z|}\le\sqrt{|x-y|+|y-z|}\le\sqrt{|x-y|}+\sqrt{|y-z|}=d(x,y)+d(y,z)$. <br> Es métrica.</p>` },
        { idea: '$d\'$ no lo es', detalle: R`<p>$d'(1,-1)=|1-1|=0$ pero $1\ne-1$: falla (M1). $\blacksquare$</p>` },
      ],
      conclusion: 'Elevar $|x-y|$ a una potencia $<1$ conserva la triangular; potencias $>1$ (como el cuadrado) la rompen.',
    },
  },
  {
    n: 'Comparación entre $d_1$, $d_2$ y $d_\\infty$', ref: 'Práctica 3, Ej. 12',
    d: R`<p>$B_1,B_2,B_\infty$ denotan las bolas abiertas para $d_1,d_2,d_\infty$ respectivamente.</p>`,
    e: R`En $\mathbb{R}^n$: $d_\infty(x,y)\le d_2(x,y)\le d_1(x,y)\le n\,d_\infty(x,y)$. Por lo tanto $B_1(x,r)\subseteq B_2(x,r)\subseteq B_\infty(x,r)\subseteq B_1(x,nr)$.`,
    p: R`<p>Sea $u=x-y$.<br> $d_\infty\le d_2$: $\max|u_i|=\sqrt{\max u_i^2}\le\sqrt{\sum u_i^2}$.<br> $d_2\le d_1$: $(\sum|u_i|)^2=\sum u_i^2+2\sum_{i<j}|u_iu_j|\ge\sum u_i^2$.<br> $d_1\le nd_\infty$: cada sumando es $\le\max|u_i|$ y hay $n$.<br> Las inclusiones de bolas salen de estas desigualdades: si $d_1(x,y)<r$, entonces $d_2(x,y)<r$ y así sucesivamente; si $d_\infty(x,y)<r$, entonces $d_1(x,y)\le nd_\infty<nr$. $\blacksquare$</p>`,
    x: {
      enunciado: R`En $\mathbb{R}^2$ tomar $x=(0,0)$, $y=(3,4)$. Verificar la cadena de desigualdades y encontrar un punto de $B_\infty(0,1)$ que no esté en $B_1(0,1)$.`,
      idea: 'Evaluar las tres distancias y buscar el punto en una esquina del cuadrado.',
      pasos: [
        { idea: 'Distancias', detalle: R`<p>$d_\infty=4$, $d_2=5$, $d_1=7$, $nd_\infty=8$. Se cumple $4\le5\le7\le8$.</p>` },
        { idea: 'Punto de la esquina', detalle: R`<p>$p=(0{,}9;0{,}9)$ cumple $d_\infty(0,p)=0{,}9<1$ pero $d_1(0,p)=1{,}8>1$ (y $d_2=0{,}9\sqrt2\approx1{,}27>1$): está en $B_\infty(0,1)$ y no en $B_1(0,1)$ ni $B_2(0,1)$.</p>` },
        { idea: 'Dentro de la bola grande', detalle: R`<p>Pero $d_1(0,p)=1{,}8<2=n\cdot1$: $p\in B_1(0,2)$, como asegura la última inclusión. $\blacksquare$</p>` },
      ],
      conclusion: 'El rombo ($B_1$) está dentro del círculo ($B_2$), que está dentro del cuadrado ($B_\\infty$); agrandar el rombo al doble ya cubre el cuadrado.',
    },
  },
  {
    n: 'Métricas equivalentes', ref: 'Cap. 4.1.4',
    d: R`<p>Dos métricas $d,d'$ en $E$ son <strong>equivalentes</strong> si definen los mismos abiertos (equivale a que toda bola de una contenga una bola de la otra con el mismo centro). Una condición suficiente: $\exists c,C>0:\ c\,d\le d'\le C\,d$.</p>`,
    e: R`Si $c\,d\le d'\le C\,d$, entonces $d$ y $d'$ son equivalentes: tienen los mismos abiertos, cerrados, sucesiones convergentes y funciones continuas.`,
    p: R`<p>De $d'\le Cd$: $B_d(x,r/C)\subseteq B_{d'}(x,r)$.<br> De $cd\le d'$: $B_{d'}(x,cr)\subseteq B_d(x,r)$.<br> Si $U$ es $d$-abierto y $x\in U$, hay $r$ con $B_d(x,r)\subseteq U$, y entonces $B_{d'}(x,cr)\subseteq U$: $U$ es $d'$-abierto. La recíproca es simétrica. Mismos abiertos implica mismas sucesiones convergentes ($x_n\to x$ sii todo abierto con $x$ contiene a $x_n$ desde un índice). $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $x_n=(\tfrac1n,\tfrac1{n^2})$ converge a $0$ en $(\mathbb{R}^2,d_1)$ sii converge en $(\mathbb{R}^2,d_\infty)$.`,
      idea: 'Usar $d_\\infty\\le d_1\\le2d_\\infty$ para pasar de una a otra.',
      pasos: [
        { idea: 'Equivalencia', detalle: R`<p>Con $n=2$: $d_\infty\le d_1\le2d_\infty$. Las constantes son $c=1$ y $C=2$.</p>` },
        { idea: '$d_\\infty$', detalle: R`<p>$d_\infty(x_n,0)=\max(\tfrac1n,\tfrac1{n^2})=\tfrac1n\to0$.</p>` },
        { idea: '$d_1$', detalle: R`<p>$d_1(x_n,0)\le2d_\infty(x_n,0)=\tfrac2n\to0$ (y directamente $\tfrac1n+\tfrac1{n^2}\to0$). Por la equivalencia, la convergencia no depende de la métrica elegida. $\blacksquare$</p>` },
      ],
      conclusion: 'Cuando probás algo "topológico" en $\\mathbb{R}^n$ (convergencia, abierto, continuidad), podés elegir la métrica más cómoda.',
    },
  },
  {
    n: 'Diámetro y conjuntos acotados', ref: 'Práctica 3, Ej. 7',
    d: R`<p><strong>Acotado:</strong> $A\subseteq B(x_0,R)$ para algún $x_0$ y $R$. <strong>Diámetro:</strong> $\operatorname{diam}A=\sup\{d(x,y):x,y\in A\}$ (finito si $A$ es acotado).</p>`,
    e: R`Si $A\subseteq B$ entonces $\operatorname{diam}A\le\operatorname{diam}B$, y $\operatorname{diam}A=\operatorname{diam}\overline A$.`,
    p: R`<p>Si $A\subseteq B$ el conjunto de distancias de $A$ está contenido en el de $B$, así que su sup es menor. Como $A\subseteq\overline A$, $\operatorname{diam}A\le\operatorname{diam}\overline A$. Recíprocamente, si $x,y\in\overline A$ y $\varepsilon>0$, existen $a,b\in A$ con $d(x,a),d(y,b)<\varepsilon$ y $d(x,y)\le d(x,a)+d(a,b)+d(b,y)<\operatorname{diam}A+2\varepsilon$. Luego $d(x,y)\le\operatorname{diam}A$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Calcular $\operatorname{diam}\big((0,1)\times(0,1)\big)$ con $d_\infty$ y con $d_2$.`,
      idea: 'Usar que el diámetro del conjunto es el de su clausura $[0,1]^2$, donde los extremos sí se alcanzan.',
      pasos: [
        { idea: 'Clausura', detalle: R`<p>$\overline{(0,1)^2}=[0,1]^2$, que tiene el mismo diámetro.</p>` },
        { idea: '$d_\\infty$', detalle: R`<p>$d_\infty((0,0),(1,0))=1$ y ninguna distancia supera $1$: diámetro $1$.</p>` },
        { idea: '$d_2$', detalle: R`<p>La mayor distancia es la diagonal $d_2((0,0),(1,1))=\sqrt2$: diámetro $\sqrt2$. En el cuadrado abierto es un supremo que <em>no se alcanza</em>. $\blacksquare$</p>` },
      ],
      conclusion: 'El diámetro depende de la métrica, pero las nociones "acotado/no acotado" son las mismas entre métricas equivalentes.',
    },
  },
];

// ---------------------------------------------------------------- Interior, clausura y frontera
export const EM_TOPOLOGIA = [
  {
    n: 'Bolas abiertas son abiertas; $\\{x\\}$ y bolas cerradas son cerrados', ref: 'Práctica 3, Ej. 4',
    d: DEF_TOP,
    e: R`$B(x,r)$ es abierta; $\{x\}$ es cerrado; $\overline B(x,r)=\{y:d(x,y)\le r\}$ es cerrada; y $\overline{B(x,r)}\subseteq\overline B(x,r)$ (puede ser estricta).`,
    p: R`<p><em>$B(x,r)$ abierta:</em> si $y\in B(x,r)$, sea $\rho=r-d(x,y)>0$. Si $z\in B(y,\rho)$, $d(x,z)\le d(x,y)+d(y,z)<d(x,y)+\rho=r$.</p>
<p><em>$\overline B(x,r)$ cerrada:</em> si $d(x,y)>r$, con $\rho=d(x,y)-r$ y $z\in B(y,\rho)$: $d(x,z)\ge d(x,y)-d(y,z)>r$, así $B(y,\rho)\subseteq E\setminus\overline B(x,r)$. El complemento es abierto, entonces $\overline B(x,r)$ es cerrado.</p>
<p><em>$\{x\}$ cerrado:</em> si $y\ne x$, $B(y,d(x,y))$ no contiene a $x$. Como $\overline B(x,r)$ es cerrada y contiene a $B(x,r)$, contiene su clausura. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $G=\{y\in E:2<d(y,x)<3\}$ es abierto y mostrar un ejemplo donde $\overline{B(x,1)}\ne\overline B(x,1)$.`,
      idea: 'Para $G$, un radio que no llegue a ninguno de los dos bordes. Para el contraejemplo, la métrica discreta.',
      pasos: [
        { idea: 'Radio', detalle: R`<p>Dado $y\in G$, sea $\rho=\min\{d(y,x)-2,\,3-d(y,x)\}>0$.</p>` },
        { idea: '$B(y,\\rho)\\subseteq G$', detalle: R`<p>Si $z\in B(y,\rho)$: $d(z,x)\ge d(y,x)-d(y,z)>d(y,x)-\rho\ge2$ y $d(z,x)\le d(y,x)+d(y,z)<d(y,x)+\rho\le3$. Luego $G$ es abierto.</p>` },
        { idea: 'Contraejemplo', detalle: R`<p>En $(E,\delta)$ con $E$ de más de un punto: $B(x,1)=\{x\}$, que es cerrado, así $\overline{B(x,1)}=\{x\}$; pero $\overline B(x,1)=E$. $\blacksquare$</p>` },
      ],
      conclusion: 'El radio $\\rho=r-d(x,y)$ ("distancia al borde") es la herramienta estándar para mostrar que un conjunto es abierto.',
    },
  },
  {
    n: 'Uniones e intersecciones de abiertos', ref: 'Teo. 4.18',
    d: DEF_TOP,
    e: R`La unión arbitraria de abiertos es abierta; la intersección <em>finita</em> de abiertos es abierta; $\varnothing$ y $E$ son abiertos. La intersección infinita puede no serlo.`,
    p: R`<p>Unión: si $x\in\bigcup U_i$, está en algún $U_i$ y existe $r$ con $B(x,r)\subseteq U_i\subseteq\bigcup U_i$.<br> Intersección finita $U_1\cap\dots\cap U_k$: si $x$ está en todos hay $r_i$ con $B(x,r_i)\subseteq U_i$; con $r=\min r_i>0$ (mínimo de finitos), $B(x,r)\subseteq\bigcap U_i$.<br> Para infinitos, el ínfimo de los radios puede ser $0$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Determinar $G=\bigcap_{n\ge1}\big(-\tfrac1n,\,1+\tfrac1n\big)$ y decidir si es abierto.`,
      idea: 'Cada intervalo es abierto; la intersección infinita puede dejar de serlo.',
      pasos: [
        { idea: '$[0,1]\\subseteq G$', detalle: R`<p>Si $0\le x\le1$, $x\in(-\tfrac1n,1+\tfrac1n)$ para todo $n$.</p>` },
        { idea: '$G\\subseteq[0,1]$', detalle: R`<p>Si $x<0$, existe $n$ con $\tfrac1n<-x$ (Arquímedes), y entonces $x\notin(-\tfrac1n,\dots)$. Análogamente si $x>1$.</p>` },
        { idea: 'No es abierto', detalle: R`<p>$G=[0,1]$ no es abierto: ninguna bola alrededor de $0$ está contenida en $[0,1]$. $\blacksquare$</p>` },
      ],
      conclusion: 'La palabra "finita" es imprescindible en la intersección de abiertos.',
    },
  },
  {
    n: 'Uniones e intersecciones de cerrados', ref: 'Teo. 4.31',
    d: DEF_TOP,
    e: R`La intersección arbitraria de cerrados es cerrada; la unión <em>finita</em> de cerrados es cerrada; $\varnothing$ y $E$ son cerrados.`,
    p: R`<p>Por las leyes de De Morgan: $E\setminus\bigcap F_i=\bigcup(E\setminus F_i)$ es unión de abiertos, abierta; y $E\setminus(F_1\cup\dots\cup F_k)=\bigcap(E\setminus F_i)$ es intersección finita de abiertos, abierta. $\blacksquare$</p>`,
    x: {
      enunciado: R`Mostrar que $\bigcup_{n\ge2}[\tfrac1n,1]$ no es cerrado, y que $[0,1]\cup\{2\}$ sí lo es.`,
      idea: 'La primera es una unión infinita; la segunda, finita.',
      pasos: [
        { idea: 'Unión infinita', detalle: R`<p>$\bigcup_{n\ge2}[\tfrac1n,1]=(0,1]$: no es cerrado, $0$ es límite de puntos del conjunto pero no pertenece a él.</p>` },
        { idea: 'Unión finita', detalle: R`<p>$[0,1]$ y $\{2\}$ son cerrados, luego su unión lo es. $\blacksquare$</p>` },
      ],
      conclusion: 'Es la contracara de la proposición anterior: en cerrados, la unión infinita es el problema.',
    },
  },
  {
    n: 'Interior y clausura: son los extremos', ref: 'Cap. 4.1',
    d: DEF_TOP,
    e: R`$A^\circ$ es el mayor abierto contenido en $A$ y $\overline A$ es el menor cerrado que contiene a $A$. Además $A$ es abierto sii $A=A^\circ$ y cerrado sii $A=\overline A$.`,
    p: R`<p>$A^\circ$ es abierto: si $B(x,r)\subseteq A$ y $y\in B(x,r)$, entonces $B(y,r-d(x,y))\subseteq B(x,r)\subseteq A$, o sea $y\in A^\circ$. Si $U\subseteq A$ es abierto, cada punto de $U$ es interior a $U$, luego a $A$: $U\subseteq A^\circ$.<br> Para la clausura se usa que $\overline A=E\setminus(E\setminus A)^\circ$ (dualidad) y se aplica lo anterior al complemento. $\blacksquare$</p>`,
    x: {
      enunciado: R`Hallar $A^\circ$ y $\overline A$ para $A=(0,1]\cup\{2\}$.`,
      idea: 'Punto por punto: ¿hay una bola dentro? ¿toda bola toca al conjunto?',
      pasos: [
        { idea: 'Interior', detalle: R`<p>Los puntos de $(0,1)$ tienen una bola dentro. $1$ no (todo entorno contiene números $>1$). $2$ tampoco (es aislado). Luego $A^\circ=(0,1)$.</p>` },
        { idea: 'Clausura', detalle: R`<p>$0$ toca a $A$ en toda bola (contiene puntos de $(0,1]$); $1,2\in A$. Los demás puntos tienen una bola que no toca a $A$. Luego $\overline A=[0,1]\cup\{2\}$.</p>` },
        { idea: 'Control con la extremalidad', detalle: R`<p>$(0,1)$ es abierto y está en $A$; $[0,1]\cup\{2\}$ es cerrado y contiene a $A$; ninguno se puede mejorar. $\blacksquare$</p>` },
      ],
      conclusion: 'Interior = lo que está "bien adentro"; clausura = lo que está dentro o pegado.',
    },
  },
  {
    n: 'Dualidad entre interior y clausura', ref: 'Práctica 3, Ej. 5',
    d: DEF_TOP,
    e: R`$E\setminus A^\circ=\overline{E\setminus A}$ y $E\setminus\overline A=(E\setminus A)^\circ$. En cambio, en general $\overline A\ne\overline{A^\circ}$ y $A^\circ\ne(\overline A)^\circ$.`,
    p: R`<p>$x\in E\setminus A^\circ\iff$ ninguna bola $B(x,r)$ está contenida en $A\iff$ toda bola corta a $E\setminus A\iff x\in\overline{E\setminus A}$.<br> La segunda igualdad se obtiene aplicando la primera a $E\setminus A$.<br> Contraejemplo para las dos desigualdades: $A=\mathbb{Q}$ tiene $A^\circ=\varnothing$ y $\overline A=\mathbb{R}$; entonces $\overline{A^\circ}=\varnothing\ne\mathbb{R}=\overline A$ y $(\overline A)^\circ=\mathbb{R}\ne\varnothing=A^\circ$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Usando la dualidad, probar que $\mathbb{R}\setminus\mathbb{Q}$ es denso en $\mathbb{R}$.`,
      idea: '$\\mathbb{Q}$ no contiene intervalos: su interior es vacío; la dualidad lo traduce a una clausura.',
      pasos: [
        { idea: 'Interior de $\\mathbb{Q}$', detalle: R`<p>Todo intervalo contiene un irracional, así $\mathbb{Q}^\circ=\varnothing$.</p>` },
        { idea: 'Dualidad', detalle: R`<p>$\overline{\mathbb{R}\setminus\mathbb{Q}}=\mathbb{R}\setminus\mathbb{Q}^\circ=\mathbb{R}\setminus\varnothing=\mathbb{R}$.</p>` },
        { idea: 'Conclusión', detalle: R`<p>La clausura de los irracionales es $\mathbb{R}$: son densos. $\blacksquare$</p>` },
      ],
      conclusion: '"Sin interior" y "complemento denso" son la misma propiedad vista desde dos lados.',
    },
  },
  {
    n: 'Álgebra de interior y clausura', ref: 'Práctica 3, Ej. 6',
    d: DEF_TOP,
    e: R`$(A\cap B)^\circ=A^\circ\cap B^\circ$ y $\overline{A\cup B}=\overline A\cup\overline B$. En cambio $A^\circ\cup B^\circ\subseteq(A\cup B)^\circ$ y $\overline{A\cap B}\subseteq\overline A\cap\overline B$ pueden ser estrictas.`,
    p: R`<p>$(A\cap B)^\circ$: una bola dentro de $A\cap B$ está dentro de $A$ y de $B$; recíprocamente, si hay $B(x,r_1)\subseteq A$ y $B(x,r_2)\subseteq B$, con $r=\min$ queda dentro de $A\cap B$.<br> $\overline{A\cup B}$: una bola que no corta a $A\cup B$ no corta a $A$ ni a $B$, y recíprocamente con el mínimo de radios. Las inclusiones son directas por monotonía.<br> Contraejemplo: $A=\mathbb{Q}$, $B=\mathbb{R}\setminus\mathbb{Q}$: $A^\circ\cup B^\circ=\varnothing\subsetneq\mathbb{R}=(A\cup B)^\circ$ y $\overline{A\cap B}=\varnothing\subsetneq\mathbb{R}=\overline A\cap\overline B$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Calcular ambos lados de las dos inclusiones para $A=[0,1)$ y $B=[1,2]$.`,
      idea: 'Calcular interiores y clausuras de cada conjunto y de las operaciones.',
      pasos: [
        { idea: 'Interiores', detalle: R`<p>$A^\circ=(0,1)$, $B^\circ=(1,2)$, así $A^\circ\cup B^\circ=(0,1)\cup(1,2)$. Pero $A\cup B=[0,2]$ y $(A\cup B)^\circ=(0,2)$, que contiene a $1$: inclusión estricta.</p>` },
        { idea: 'Clausuras', detalle: R`<p>$A\cap B=\varnothing$ y $\overline{A\cap B}=\varnothing$. Pero $\overline A=[0,1]$, $\overline B=[1,2]$ y $\overline A\cap\overline B=\{1\}$: inclusión estricta. $\blacksquare$</p>` },
      ],
      conclusion: 'El punto $1$ es donde "se pegan" los dos conjuntos: no es interior de ninguno pero sí de la unión.',
    },
  },
  {
    n: 'Frontera', ref: 'Práctica 3, Ej. 9',
    d: DEF_TOP + R`<p>Equivalentemente, $x\in\partial A$ si toda bola $B(x,r)$ corta a $A$ y a $E\setminus A$.</p>`,
    e: R`$\partial A=\overline A\setminus A^\circ=\overline A\cap\overline{E\setminus A}$. Es cerrada y $\partial A=\partial(E\setminus A)$. Además $\overline A=A\cup\partial A$ y $E=A^\circ\sqcup\partial A\sqcup(E\setminus A)^\circ$.`,
    p: R`<p>$\overline A\setminus A^\circ=\overline A\cap(E\setminus A^\circ)=\overline A\cap\overline{E\setminus A}$ por la dualidad. Es intersección de dos cerrados, cerrada. La simetría $\partial A=\partial(E\setminus A)$ es evidente en la última expresión.<br> La partición: un punto es interior a $A$, interior al complemento, o ninguno de los dos (frontera). $\blacksquare$</p>`,
    x: {
      enunciado: R`Calcular $\partial A$ para $A=[0,1)\cup\{2\}$ y $\partial\mathbb{Q}$.`,
      idea: 'Usar $\\partial A=\\overline A\\setminus A^\\circ$.',
      pasos: [
        { idea: '$A=[0,1)\\cup\\{2\\}$', detalle: R`<p>$\overline A=[0,1]\cup\{2\}$, $A^\circ=(0,1)$. Luego $\partial A=\{0,1,2\}$.</p>` },
        { idea: '$\\mathbb{Q}$', detalle: R`<p>$\overline{\mathbb{Q}}=\mathbb{R}$ y $\mathbb{Q}^\circ=\varnothing$, así $\partial\mathbb{Q}=\mathbb{R}$. $\blacksquare$</p>` },
      ],
      conclusion: 'El $0$ pertenece a $A$ y a su frontera; el $2$ es un punto aislado y también está en la frontera.',
    },
  },
  {
    n: 'Distancia de un punto a un conjunto', ref: 'Práctica 3, Ej. 10',
    d: R`<p>$d(x,A)=\inf\{d(x,a):a\in A\}$ para $A\ne\varnothing$.</p>`,
    e: R`(a) $|d(x,A)-d(y,A)|\le d(x,y)$; (b) $d(x,A)=0\iff x\in\overline A$; (c) $\{x:d(x,A)<r\}$ es abierto y $\{x:d(x,A)\le r\}$ es cerrado.`,
    p: R`<p>(a) Para cada $a\in A$, $d(x,A)\le d(x,a)\le d(x,y)+d(y,a)$; tomando ínfimo en $a$, $d(x,A)\le d(x,y)+d(y,A)$. Se intercambian $x,y$.<br> (b) $d(x,A)=0\iff\forall\varepsilon\ \exists a\in A:\ d(x,a)<\varepsilon\iff x\in\overline A$.<br> (c) Si $d(x,A)<r$ y $\rho=r-d(x,A)$, para $y\in B(x,\rho)$ vale $d(y,A)\le d(x,A)+d(x,y)<r$. El otro es el complemento de $\{d(x,A)>r\}$, que es abierto por (a). $\blacksquare$</p>`,
    x: {
      enunciado: R`Para $A=(0,1)\subseteq\mathbb{R}$ calcular $d(2,A)$, $d(1,A)$ y $\{x:d(x,A)<\tfrac12\}$.`,
      idea: 'Calcular el ínfimo directamente; observar cuándo se alcanza.',
      pasos: [
        { idea: '$d(2,A)$', detalle: R`<p>$d(2,A)=\inf\{2-a:a\in(0,1)\}=1$, y no se alcanza (necesitaría $a=1\notin A$).</p>` },
        { idea: '$d(1,A)$', detalle: R`<p>$1\in\overline A$, así $d(1,A)=0$ por (b), aunque $1\notin A$.</p>` },
        { idea: 'El entorno', detalle: R`<p>$\{x:d(x,A)<\tfrac12\}=(-\tfrac12,\tfrac32)$, abierto como asegura (c). $\blacksquare$</p>` },
      ],
      conclusion: '$d(x,A)=0$ no significa $x\\in A$, sino $x\\in\\overline A$: es la caracterización métrica de la clausura.',
    },
  },
  {
    n: 'La "distancia" entre conjuntos no es una métrica', ref: 'Práctica 3, Ej. 11',
    d: R`<p>$b_d(A,B)=\inf\{d(a,b):a\in A,\,b\in B\}$ para $A,B\ne\varnothing$.</p>`,
    e: R`$b_d(A,B)=b_d(\overline A,\overline B)$; $b_d(A,B)=0$ vale si $A\cap B\ne\varnothing$ o $\overline A\cap\overline B\ne\varnothing$, pero la recíproca es falsa; y $b_d$ no cumple la triangular. Por lo tanto $b_d$ no es métrica.`,
    p: R`<p>$\overline A\supseteq A$ da $b_d(\overline A,\overline B)\le b_d(A,B)$.<br> Para $\ge$: dados $x\in\overline A$, $y\in\overline B$, $\varepsilon>0$ hay $a\in A$, $b\in B$ cerca, y $b_d(A,B)\le d(a,b)<d(x,y)+2\varepsilon$.<br> Contraejemplos: $A=(0,1)$, $B=(1,2)$ tienen $b_d=0$ y $A\cap B=\varnothing$.<br> $A=\{0\}$, $B=\{2\}$, $C=[0,2]$: $b_d(A,C)=0=b_d(C,B)$ pero $b_d(A,B)=2$: falla la triangular. $\blacksquare$</p>`,
    x: {
      enunciado: R`Dar dos cerrados disjuntos de $\mathbb{R}$ con $b_d=0$.`,
      idea: 'Dos sucesiones que se acercan entre sí "en el infinito".',
      pasos: [
        { idea: 'Los conjuntos', detalle: R`<p>$A=\mathbb{N}$ y $B=\{n+\tfrac1n:n\ge2\}$.</p>` },
        { idea: 'Cerrados y disjuntos', detalle: R`<p>Ambos son discretos y sin puntos de acumulación finitos, luego cerrados. Si $n+\tfrac1n=m\in\mathbb{N}$ habría $\tfrac1n\in\mathbb{Z}$, imposible para $n\ge2$.</p>` },
        { idea: 'Distancia cero', detalle: R`<p>$d(n,n+\tfrac1n)=\tfrac1n\to0$, así $b_d(A,B)=0$. $\blacksquare$</p>` },
      ],
      conclusion: 'Con un compacto y un cerrado disjuntos la distancia sí es positiva (se verá en compacidad).',
    },
  },
];

// ---------------------------------------------------------------- Acumulación y aislados
export const EM_ACUMULACION = [
  {
    n: 'Clausura $=A\\cup A\'$', ref: 'Cap. 4.1.3',
    d: DEF_TOP + R`<p><strong>Punto de acumulación:</strong> $x\in A'$ si $\forall r>0:\ (B(x,r)\setminus\{x\})\cap A\ne\varnothing$. $A'$ es el <em>conjunto derivado</em>.</p>`,
    e: R`$\overline A=A\cup A'$, y $A$ es cerrado sii $A'\subseteq A$.`,
    p: R`<p>Si $x\in A'$, toda bola toca a $A$, luego $x\in\overline A$; y $A\subseteq\overline A$. Recíprocamente si $x\in\overline A\setminus A$, toda bola corta a $A$ en un punto $\ne x$ (porque $x\notin A$), así $x\in A'$. Entonces $A$ es cerrado $\iff\overline A=A\iff A'\subseteq A$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Para $A=\{\tfrac1n:n\ge1\}$ calcular $A'$ y $\overline A$ y decidir si $A$ es cerrado.`,
      idea: 'Buscar los puntos hacia donde se acumulan los elementos.',
      pasos: [
        { idea: '$A\'$', detalle: R`<p>Toda bola alrededor de $0$ contiene $\tfrac1n$ con $n$ grande: $0\in A'$. Cualquier otro punto $x$ tiene una bola con a lo sumo un elemento de $A$: no está en $A'$. Luego $A'=\{0\}$.</p>` },
        { idea: 'Clausura', detalle: R`<p>$\overline A=A\cup A'=A\cup\{0\}$.</p>` },
        { idea: 'Cerrado', detalle: R`<p>$A'=\{0\}\not\subseteq A$, así $A$ no es cerrado; $A\cup\{0\}$ sí lo es. $\blacksquare$</p>` },
      ],
      conclusion: 'Un conjunto es cerrado sii contiene a todos sus puntos de acumulación: le "falta" el $0$.',
    },
  },
  {
    n: 'Caracterización por sucesiones', ref: 'Prop. 4.54',
    d: R`<p>$x_n\to x$ si $\forall\varepsilon>0\ \exists n_0\ \forall n\ge n_0:\ d(x_n,x)<\varepsilon$.</p>`,
    e: R`$x\in\overline A\iff\exists(x_n)\subseteq A$ con $x_n\to x$. $x\in A'\iff\exists(x_n)\subseteq A\setminus\{x\}$ de términos distintos con $x_n\to x$. En consecuencia, $A$ es cerrado sii el límite de toda sucesión convergente de $A$ está en $A$.`,
    p: R`<p>($\Rightarrow$) Para cada $n$ elijo $x_n\in B(x,\tfrac1n)\cap A$ (existe porque $x\in\overline A$); entonces $d(x_n,x)<\tfrac1n\to0$. ($\Leftarrow$) Dada una bola $B(x,r)$, para $n$ grande $x_n\in B(x,r)\cap A$. Para $A'$ se eligen además $x_n\ne x$ y todos distintos. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $\mathbb{Q}'=\mathbb{R}$ y que $[0,1)$ no es cerrado.`,
      idea: 'Construir sucesiones: de racionales por densidad, y una sucesión de $[0,1)$ que escapa por el borde.',
      pasos: [
        { idea: '$\\mathbb{Q}\'=\\mathbb{R}$', detalle: R`<p>Dado $x\in\mathbb{R}$, por densidad elijo racionales $q_n\in(x,x+\tfrac1n)$ (todos $\ne x$ y se pueden tomar distintos). $q_n\to x$.</p>` },
        { idea: '$[0,1)$ no cerrado', detalle: R`<p>$x_n=1-\tfrac1n\in[0,1)$ converge a $1\notin[0,1)$. Hay una sucesión de $[0,1)$ cuyo límite no pertenece al conjunto: no es cerrado. $\blacksquare$</p>` },
      ],
      conclusion: 'Para demostrar que un conjunto es cerrado, tomá una sucesión convergente del conjunto y probá que el límite también está; para refutarlo, exhibí una que se escape.',
    },
  },
  {
    n: 'Un punto de acumulación tiene infinitos puntos cerca', ref: 'Cap. 4.1.3',
    d: DEF_TOP,
    e: R`Si $x\in A'$, toda bola $B(x,r)$ contiene infinitos puntos de $A$. En particular un conjunto finito no tiene puntos de acumulación (y es cerrado).`,
    p: R`<p>Si $B(x,r)\cap A\setminus\{x\}$ fuera finito $=\{a_1,\dots,a_k\}$ ($k\ge1$ porque $x\in A'$), tomando $r'=\min d(x,a_i)>0$ resulta $B(x,r')\cap A\setminus\{x\}=\varnothing$, contra $x\in A'$. Un finito no tiene acumulación y por la caracterización $A'\subseteq A$ se cumple vacuamente: es cerrado. $\blacksquare$</p>`,
    x: {
      enunciado: R`Verificar el resultado en $A=\{1,2,3\}$ y en $B=\{\tfrac1n\}\cup\{0\}$.`,
      idea: 'Comparar un conjunto finito con uno que se acumula en un punto.',
      pasos: [
        { idea: 'Finito', detalle: R`<p>$A'=\varnothing$: alrededor de cada punto, una bola de radio $\tfrac12$ no contiene otros puntos de $A$. $A$ es cerrado.</p>` },
        { idea: 'Con acumulación', detalle: R`<p>$0\in B'$: toda bola $B(0,r)$ contiene $\tfrac1n$ para todo $n>\tfrac1r$, infinitos puntos.</p>` },
        { idea: 'Cerrado', detalle: R`<p>$B'=\{0\}\subseteq B$: $B$ es cerrado. $\blacksquare$</p>` },
      ],
      conclusion: 'Acumulación significa "infinitos puntos arbitrariamente cerca", no solo "un punto cerca".',
    },
  },
  {
    n: 'Puntos aislados', ref: 'Cap. 4.1.3',
    d: R`<p>$x\in A$ es <strong>aislado</strong> si $\exists r>0:\ B(x,r)\cap A=\{x\}$, es decir $x\in A\setminus A'$.</p>`,
    e: R`$A=\{\text{aislados de }A\}\sqcup(A\cap A')$. En la métrica discreta todo punto es aislado.`,
    p: R`<p>Un $x\in A$ o bien tiene una bola que no toca a $A\setminus\{x\}$ (aislado) o bien toda bola la toca ($x\in A'$). En $(E,\delta)$, $B(x,\tfrac12)=\{x\}$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Clasificar los puntos de $A=\{\tfrac1n:n\ge1\}\cup\{0\}$.`,
      idea: 'Buscar para cada punto una bola que lo aísle.',
      pasos: [
        { idea: 'Los $\\tfrac1n$', detalle: R`<p>El vecino más cercano de $\tfrac1n$ está a distancia $\tfrac1{n(n+1)}$; con $r=\tfrac1{2n(n+1)}$, $B(\tfrac1n,r)\cap A=\{\tfrac1n\}$: son aislados.</p>` },
        { idea: 'El $0$', detalle: R`<p>Toda bola alrededor de $0$ contiene otros puntos de $A$: $0\in A'\cap A$ no es aislado. $\blacksquare$</p>` },
      ],
      conclusion: 'Un conjunto puede ser cerrado y a la vez tener todos sus puntos aislados salvo uno (acá, el $0$).',
    },
  },
  {
    n: 'Densidad', ref: 'Def. 5.20',
    d: R`<p>$D\subseteq E$ es <strong>denso</strong> si $\overline D=E$.</p>`,
    e: R`$D$ es denso $\iff$ toda bola de $E$ corta a $D$ $\iff$ todo punto de $E$ es límite de una sucesión de $D$. $\mathbb{Q}$ y $\mathbb{R}\setminus\mathbb{Q}$ son densos en $\mathbb{R}$.`,
    p: R`<p>$\overline D=E$ significa que todo $x\in E$ satisface "toda bola $B(x,r)$ corta a $D$", y esto equivale a la existencia de la sucesión (caracterización por sucesiones). La densidad de $\mathbb{Q}$ y de los irracionales es la Prop. 1.14. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $D=\{\tfrac m{2^k}:m\in\mathbb{Z},k\ge0\}$ (diádicos) es denso en $\mathbb{R}$.`,
      idea: 'Dado $x$ y $\\varepsilon$, un diádico con $k$ grande está a distancia $<2^{-k}$.',
      pasos: [
        { idea: 'Elegir $k$', detalle: R`<p>Dado $\varepsilon>0$, por Arquímedes existe $k$ con $2^{-k}<\varepsilon$.</p>` },
        { idea: 'Elegir $m$', detalle: R`<p>Sea $m=\lfloor2^kx\rfloor$. Entonces $m\le2^kx<m+1$, es decir $0\le x-\tfrac m{2^k}<2^{-k}<\varepsilon$.</p>` },
        { idea: 'Conclusión', detalle: R`<p>Toda bola $B(x,\varepsilon)$ contiene un diádico: $D$ es denso. $\blacksquare$</p>` },
      ],
      conclusion: 'Los números con "pocos decimales" aproximan a cualquier real: es el fundamento de la aritmética de punto flotante.',
    },
  },
];
