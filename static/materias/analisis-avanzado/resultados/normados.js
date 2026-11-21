// Resultados clave — Espacios normados y operadores (Práctica 6).
// Esquema: { n, ref, d: definiciones formales, e: enunciado, p: demostración, x: ejemplo de uso paso a paso }.
const R = String.raw;

const DEF_NORM = R`<ul><li><strong>Norma</strong> en un $\mathbb{R}$-espacio vectorial $E$: $\|\cdot\|:E\to\mathbb{R}$ con (N1) $\|x\|\ge0$ y $\|x\|=0\iff x=0$; (N2) $\|\alpha x\|=|\alpha|\,\|x\|$; (N3) $\|x+y\|\le\|x\|+\|y\|$. <strong>Distancia inducida:</strong> $d(x,y)=\|x-y\|$.</li>
<li><strong>Banach:</strong> espacio normado completo. <strong>Normas equivalentes:</strong> $\exists c,C>0:\ c\|x\|\le\|x\|'\le C\|x\|\ \forall x$.</li></ul>`;
const DEF_OP = R`<ul><li><strong>Operador lineal</strong> $T:E\to F$: $T(\alpha x+\beta y)=\alpha Tx+\beta Ty$. <strong>Acotado:</strong> $\exists M\ge0:\ \|Tx\|_F\le M\|x\|_E\ \forall x$.</li>
<li><strong>Norma de $T$:</strong> $\|T\|=\sup_{\|x\|\le1}\|Tx\|$ (el menor $M$ posible).</li></ul>`;

export const EM_NORMADOS = [
  {
    n: 'Norma y métrica inducida', ref: 'Práctica 6, Ej. 1',
    d: DEF_NORM + R`<p>En $\mathbb{R}^n$: $\|x\|_1=\sum|x_i|$, $\|x\|_2=(\sum x_i^2)^{1/2}$, $\|x\|_\infty=\max|x_i|$. En $C[0,1]$: $\|f\|_\infty=\max|f|$ y $\|f\|_1=\int_0^1|f|$.</p>`,
    e: R`$\|\cdot\|_1,\|\cdot\|_2,\|\cdot\|_\infty$ son normas de $\mathbb{R}^n$ (y las de $C[0,1]$ también). Toda norma induce una métrica $d(x,y)=\|x-y\|$, invariante por traslaciones y homogénea: $d(\alpha x,\alpha y)=|\alpha|d(x,y)$.`,
    p: R`<p><strong>$\|\cdot\|_2$:</strong> (N1), (N2) son inmediatas. (N3): $\|x+y\|_2^2=\|x\|_2^2+2\langle x,y\rangle+\|y\|_2^2\le\|x\|_2^2+2\|x\|_2\|y\|_2+\|y\|_2^2=(\|x\|_2+\|y\|_2)^2$ por Cauchy–Schwarz. <strong>$\|\cdot\|_1,\|\cdot\|_\infty$:</strong> $|x_i+y_i|\le|x_i|+|y_i|$ y se suma o se toma máximo.</p>
<p><strong>Métrica inducida:</strong> $d(x,y)=0\iff x=y$ por (N1); $d(x,y)=\|-(y-x)\|=d(y,x)$ por (N2); $d(x,z)=\|(x-y)+(y-z)\|\le d(x,y)+d(y,z)$ por (N3). $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $\|f\|_1=\int_0^1|f(t)|\,dt$ es una norma en $C([0,1])$.`,
      idea: 'La única parte no trivial es (N1): una continua no negativa con integral nula es nula.',
      pasos: [
        { idea: '(N2) y (N3)', detalle: R`<p>$\int|\alpha f|=|\alpha|\int|f|$ y $|f+g|\le|f|+|g|$ integrando.</p>` },
        { idea: '(N1) $\\|f\\|_1=0\\Rightarrow f=0$', detalle: R`<p>Si $f(t_0)\ne0$, por continuidad $|f|>\tfrac{|f(t_0)|}2$ en un intervalo $I\ni t_0$ de longitud $\ell>0$. Entonces $\int_0^1|f|\ge\tfrac{|f(t_0)|}2\ell>0$.</p>` },
        { idea: 'Conclusión', detalle: R`<p>Contrarrecíprocamente, $\|f\|_1=0$ fuerza $f\equiv0$. Es una norma. (Para funciones sólo integrables y no continuas, (N1) falla: se anula en conjuntos de medida cero.) $\blacksquare$</p>` },
      ],
      conclusion: 'La continuidad es lo que hace valer (N1) para $\\|\\cdot\\|_1$ en $C[0,1]$.',
    },
  },
  {
    n: 'La norma y las operaciones son continuas', ref: 'Cap. 4.2',
    d: DEF_NORM,
    e: R`$\big|\|x\|-\|y\|\big|\le\|x-y\|$; por lo tanto $x\mapsto\|x\|$ es continua. Si $x_n\to x$, $y_n\to y$ y $\alpha_n\to\alpha$, entonces $x_n+y_n\to x+y$ y $\alpha_nx_n\to\alpha x$.`,
    p: R`<p>$\|x\|=\|(x-y)+y\|\le\|x-y\|+\|y\|$ y simétricamente $\|y\|\le\|x-y\|+\|x\|$. Suma: $\|(x_n+y_n)-(x+y)\|\le\|x_n-x\|+\|y_n-y\|$. Producto: $\|\alpha_nx_n-\alpha x\|\le|\alpha_n-\alpha|\|x_n\|+|\alpha|\|x_n-x\|$, y $\|x_n\|$ está acotada (converge). $\blacksquare$</p>`,
    x: {
      enunciado: R`Si $x_n\to x$ en un normado, entonces $\|x_n\|\to\|x\|$. Probar que la recíproca es falsa.`,
      idea: 'La primera parte sale de la desigualdad; para la segunda, un contraejemplo.',
      pasos: [
        { idea: 'Directa', detalle: R`<p>$\big|\|x_n\|-\|x\|\big|\le\|x_n-x\|\to0$.</p>` },
        { idea: 'Contraejemplo', detalle: R`<p>En $\mathbb{R}^2$ con $\|\cdot\|_2$ sea $x_n=(-1)^n(1,0)$: $\|x_n\|=1\to1=\|(1,0)\|$, pero $x_n$ no converge (sus pares tienden a $(1,0)$ y los impares a $(-1,0)$). $\blacksquare$</p>` },
      ],
      conclusion: 'Una sucesión puede conservar su "tamaño" y aun así no converger: el módulo no recuerda la dirección.',
    },
  },
  {
    n: 'Geometría de las bolas en un normado', ref: 'Práctica 6, Ej. 2',
    d: DEF_NORM + R`<p>$B(x,r)=\{y:\|y-x\|<r\}$, $\overline B(x,r)=\{y:\|y-x\|\le r\}$. <strong>Convexo:</strong> $y,z\in C\Rightarrow ty+(1-t)z\in C$ para $t\in[0,1]$.</p>`,
    e: R`En un espacio normado: (a) $\overline{B(x,r)}=\overline B(x,r)$; (b) $\operatorname{diam}B(x,r)=2r$; (c) toda bola es convexa.`,
    p: R`<p>(a) $\overline B(x,r)$ es cerrada y contiene a $B(x,r)$, luego contiene su clausura. Si $\|y-x\|=r$, $y_n=x+(1-\tfrac1n)(y-x)\in B(x,r)$ y $y_n\to y$. (b) $\|y-z\|\le\|y-x\|+\|x-z\|<2r$; con $u$ de norma 1, $x\pm(1-\tfrac1n)ru\in B(x,r)$ están a distancia $2(1-\tfrac1n)r\to2r$. (c) $\|ty+(1-t)z-x\|\le t\|y-x\|+(1-t)\|z-x\|<r$. $\blacksquare$</p>`,
    x: {
      enunciado: R`En $(\mathbb{R}^2,\|\cdot\|_\infty)$, verificar que $(1,1)\in\overline{B(0,1)}$ y que $\operatorname{diam}B(0,1)=2$.`,
      idea: 'Usar las curvas $(1-\\tfrac1n)v$ del resultado.',
      pasos: [
        { idea: '$(1,1)$ en la clausura', detalle: R`<p>$y_n=(1-\tfrac1n)(1,1)$ tiene $\|y_n\|_\infty=1-\tfrac1n<1$ y $y_n\to(1,1)$: $(1,1)$ es límite de puntos de $B(0,1)$.</p>` },
        { idea: 'Diámetro', detalle: R`<p>$x=(1-\tfrac1n,0)$ e $y=(-(1-\tfrac1n),0)$ pertenecen a $B(0,1)$ y $\|x-y\|_\infty=2(1-\tfrac1n)\to2$. Todo par está a distancia $<2$. $\blacksquare$</p>` },
      ],
      conclusion: 'En un espacio métrico general (por ejemplo, discreto) la clausura de la bola abierta puede ser más chica que la bola cerrada; con norma, nunca.',
    },
  },
  {
    n: 'Subespacios normados', ref: 'Práctica 6, Ej. 4',
    d: R`<p><strong>Subespacio:</strong> $S\subseteq E$ cerrado por suma y producto por escalares. <strong>Hiperplano:</strong> subespacio propio maximal (el único subespacio que lo contiene propiamente es $E$).</p>`,
    e: R`Sea $S$ un subespacio de un normado $E$. (a) $\overline S$ es subespacio. (b) Si $S\ne E$, $S^\circ=\varnothing$. (c) Si $\dim S<\infty$, $S$ es cerrado. (d) Si $S$ es hiperplano, es cerrado o denso.`,
    p: R`<p>(a) Si $x_n\to x$, $y_n\to y$ con $x_n,y_n\in S$: $x_n+y_n\to x+y$ y $\alpha x_n\to\alpha x$ (operaciones continuas), así $x+y,\alpha x\in\overline S$. (b) Si $B(x,r)\subseteq S$ con $x\in S$, entonces $B(0,r)=B(x,r)-x\subseteq S$; para $y\ne0$, $\tfrac r{2\|y\|}y\in B(0,r)\subseteq S$, luego $y\in S$: $S=E$. (c) $S$ es isomorfo a $\mathbb{R}^k$, completo; un completo es cerrado. (d) $\overline S$ es subespacio que contiene a $S$: por maximalidad $\overline S=S$ o $\overline S=E$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $\mathbb{R}_2[t]$ (polinomios de grado $\le2$) es un subespacio cerrado de $(C[0,1],\|\cdot\|_\infty)$ con interior vacío.`,
      idea: 'Dimensión finita para cerrado, propio para interior vacío.',
      pasos: [
        { idea: 'Cerrado', detalle: R`<p>$\dim\mathbb{R}_2[t]=3<\infty$: por (c) es cerrado.</p>` },
        { idea: 'Propio', detalle: R`<p>$t^3\in C[0,1]\setminus\mathbb{R}_2[t]$: el subespacio es propio.</p>` },
        { idea: 'Interior vacío', detalle: R`<p>Por (b), $\mathbb{R}_2[t]^\circ=\varnothing$: cerca de cualquier cuadrático $p$ hay funciones que no lo son, por ejemplo $p+\varepsilon t^3$ con $\varepsilon$ chico. $\blacksquare$</p>` },
      ],
      conclusion: 'Un subespacio "chico" es cerrado y vacío por dentro: no puede "llenar" ninguna bola.',
    },
  },
  {
    n: 'Dimensión finita vs. infinita', ref: 'Práctica 6, Ej. 5',
    d: DEF_NORM,
    e: R`En $\mathbb{R}^n$ todas las normas son equivalentes; por lo tanto todo espacio normado de dimensión finita es completo (Banach) y su bola cerrada es compacta. En dimensión infinita fallan las tres: en $\mathbb{R}[t]$, $\|\cdot\|_\infty$ y $\|\cdot\|_1$ no son equivalentes. (Recíprocamente, por el teorema de Riesz, si la bola cerrada es compacta la dimensión es finita; no se demuestra en el curso.)`,
    p: R`<p>Sea $\|\cdot\|$ una norma en $\mathbb{R}^n$ con base canónica $e_i$. <em>Cota superior:</em> $\|x\|\le\sum|x_i|\|e_i\|\le C\|x\|_\infty$, con $C=\sum\|e_i\|$. Entonces $|\|x\|-\|y\||\le\|x-y\|\le C\|x-y\|_\infty$: $\|\cdot\|$ es continua para $\|\cdot\|_\infty$. <em>Cota inferior:</em> la esfera $S=\{\|x\|_\infty=1\}$ es compacta (Heine–Borel); $\|\cdot\|$ es continua y positiva en $S$, así alcanza un mínimo $m>0$. Por homogeneidad, $\|x\|\ge m\|x\|_\infty$. Luego $m\|x\|_\infty\le\|x\|\le C\|x\|_\infty$. Completitud y compacidad de la bola se heredan por equivalencia con $\|\cdot\|_\infty$. En $\mathbb{R}[t]$: $\|t^n\|_\infty=1$ y $\|t^n\|_1=\tfrac1{n+1}$, así no existe $c>0$ con $c\|p\|_\infty\le\|p\|_1$. $\blacksquare$</p>`,
    x: {
      enunciado: R`En $\mathbb{R}_n[t]$ las normas $\|\cdot\|_\infty$ y $\|\cdot\|_1$ son equivalentes para cada $n$. Probar que las constantes de equivalencia no pueden ser independientes de $n$.`,
      idea: 'Usar $p=t^n$ para obligar a que la constante crezca.',
      pasos: [
        { idea: 'Equivalencia para $n$ fijo', detalle: R`<p>$\dim\mathbb{R}_n[t]=n+1<\infty$: existe $C_n$ con $\|p\|_\infty\le C_n\|p\|_1$ para todo $p$ de grado $\le n$.</p>` },
        { idea: 'Probar con $t^n$', detalle: R`<p>$1=\|t^n\|_\infty\le C_n\|t^n\|_1=\tfrac{C_n}{n+1}$, de modo que $C_n\ge n+1$.</p>` },
        { idea: 'Conclusión', detalle: R`<p>$C_n\to\infty$: no hay una constante que sirva a todos los $n$ a la vez, por lo que en $\mathbb{R}[t]=\bigcup\mathbb{R}_n[t]$ las normas no son equivalentes. Esto no contradice nada: el teorema vale para cada dimensión finita con constantes que dependen de ella. $\blacksquare$</p>` },
      ],
      conclusion: 'Cuando hay infinitas dimensiones, "equivalencia de normas" deja de ser automática.',
    },
  },
  {
    n: 'Espacios de sucesiones $\\ell^\\infty$ y $\\ell^2$', ref: 'Práctica 6, Ej. 6, 13',
    d: R`<ul><li>$\ell^\infty=\{a:\sup|a_n|<\infty\}$, $\|a\|_\infty=\sup|a_n|$. $\ell^2=\{a:\sum|a_n|^2<\infty\}$, $\|a\|_2=(\sum|a_n|^2)^{1/2}$.</li>
<li><strong>Separable:</strong> existe un conjunto numerable denso. $e_n$ es la sucesión con un $1$ en el lugar $n$ y ceros en el resto.</li></ul>`,
    e: R`(a) Las bolas cerradas de $\ell^\infty$ y $\ell^2$ no son compactas. (b) $\ell^\infty$ no es separable. (c) $\gamma(a)=\sum a_n/n$ es una funcional lineal continua en $\ell^2$, con $|\gamma(a)|\le\tfrac\pi{\sqrt6}\|a\|_2$.`,
    p: R`<p>(a) $\|e_n\|=1$ y $\|e_n-e_m\|_\infty=1$, $\|e_n-e_m\|_2=\sqrt2$ para $n\ne m$: ninguna subsucesión es de Cauchy. (b) Las sucesiones de $\{0,1\}^{\mathbb{N}}$ son $c$ puntos a distancia $1$ entre sí. Si $D$ fuera denso, para cada $x$ existiría $d_x\in D$ con $\|d_x-x\|<\tfrac12$; si $d_x=d_y$ sería $1\le\|x-y\|<1$, absurdo: $x\mapsto d_x$ es inyectiva y $|D|\ge c$. (c) $b=(\tfrac1n)\in\ell^2$ con $\|b\|_2^2=\sum\tfrac1{n^2}=\tfrac{\pi^2}6$, y por Cauchy–Schwarz $|\gamma(a)|=|\langle a,b\rangle|\le\|a\|_2\|b\|_2$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Calcular $\|\gamma\|$ para $\gamma(a)=\sum a_n/n$ en $\ell^2$.`,
      idea: 'La cota de Cauchy–Schwarz es una igualdad cuando $a$ es múltiplo de $b=(1/n)$.',
      pasos: [
        { idea: 'Cota superior', detalle: R`<p>$\|\gamma\|\le\|b\|_2=\tfrac\pi{\sqrt6}$.</p>` },
        { idea: 'Candidato que la alcanza', detalle: R`<p>Con $a=b$: $\gamma(b)=\sum\tfrac1{n^2}=\|b\|_2^2$, así $\tfrac{\gamma(b)}{\|b\|_2}=\|b\|_2$.</p>` },
        { idea: 'Conclusión', detalle: R`<p>$\|\gamma\|\ge\|b\|_2$ y por lo tanto $\|\gamma\|=\tfrac\pi{\sqrt6}\approx1{,}28$. Por ejemplo $\gamma(e_3)=\tfrac13\le1{,}28\cdot1$. $\blacksquare$</p>` },
      ],
      conclusion: 'En $\\ell^2$ la norma de una funcional $\\langle\\cdot,b\\rangle$ es exactamente $\\|b\\|_2$ (Riesz).',
    },
  },
  {
    n: 'Operador lineal: continuo $\\iff$ acotado', ref: 'Práctica 6, Ej. 8',
    d: DEF_OP,
    e: R`Para $T:E\to F$ lineal son equivalentes: (a) continuo en $0$; (b) continuo en algún punto; (c) continuo; (d) uniformemente continuo; (e) acotado; (f) manda acotados en acotados.`,
    p: R`<p>(a)⇒(e): con $\varepsilon=1$ hay $\delta$ tal que $\|x\|<\delta\Rightarrow\|Tx\|<1$; para $y\ne0$, $x=\tfrac\delta{2\|y\|}y$ da $\|Ty\|<\tfrac2\delta\|y\|$. (e)⇒(d): $\|Tx-Ty\|=\|T(x-y)\|\le M\|x-y\|$ (Lipschitz). (d)⇒(c)⇒(b) triviales. (b)⇒(a): si $x_n\to0$, $x_0+x_n\to x_0$ y $Tx_n=T(x_0+x_n)-Tx_0\to0$. (e)⇒(f): $\|x\|\le R\Rightarrow\|Tx\|\le MR$. (f)⇒(e): $T(B(0,1))$ acotado por $M$ da $\|Tx\|\le M\|x\|$ por homogeneidad. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $T:(C[0,1],\|\cdot\|_\infty)\to(C[0,1],\|\cdot\|_\infty)$, $(Tf)(x)=x\,f(x)$, es continuo y calcular $\|T\|$.`,
      idea: 'Acotar $\\|Tf\\|$ por $\\|f\\|$ y mostrar una $f$ que lo alcanza.',
      pasos: [
        { idea: 'Lineal y acotado', detalle: R`<p>$T$ es lineal. $|x f(x)|\le|f(x)|\le\|f\|_\infty$, luego $\|Tf\|_\infty\le\|f\|_\infty$: acotado con $M=1$, y por el resultado, continuo.</p>` },
        { idea: 'La norma', detalle: R`<p>Con $f\equiv1$: $\|f\|_\infty=1$ y $Tf=x$, con $\|Tf\|_\infty=1$. Entonces $\|T\|=1$. $\blacksquare$</p>` },
      ],
      conclusion: 'Para operadores lineales, "continuo" se prueba sin $\\varepsilon$–$\\delta$: basta una cota $\\|Tx\\|\\le M\\|x\\|$.',
    },
  },
  {
    n: 'Norma de un operador', ref: 'Práctica 6, Ej. 9',
    d: DEF_OP,
    e: R`Si $T$ es lineal continuo: $\|T\|=\sup_{\|x\|\le1}\|Tx\|=\sup_{\|x\|=1}\|Tx\|=\sup_{x\ne0}\tfrac{\|Tx\|}{\|x\|}$, y $\|Tx\|\le\|T\|\,\|x\|$ para todo $x$.`,
    p: R`<p>Para $x\ne0$, $u=\tfrac x{\|x\|}$ tiene norma $1$ y $\tfrac{\|Tx\|}{\|x\|}=\|Tu\|$: el tercero y el segundo coinciden. El segundo es $\le$ el primero (la esfera está en la bola), y si $\|x\|\le1$, $x\ne0$, $\|Tx\|=\|x\|\|Tu\|\le\|Tu\|\le\sup_{\|u\|=1}\|Tu\|$. La desigualdad final es la definición del tercero. $\blacksquare$</p>`,
    x: {
      enunciado: R`En $(\mathbb{R}^2,\|\cdot\|_\infty)$ sea $T(x,y)=(x+y,\,x-y)$. Calcular $\|T\|$.`,
      idea: 'Acotar por arriba y encontrar un vector que lo alcance.',
      pasos: [
        { idea: 'Fórmula de $\\|Tv\\|_\\infty$', detalle: R`<p>$\|Tv\|_\infty=\max(|x+y|,|x-y|)=|x|+|y|$.</p>` },
        { idea: 'Cota superior', detalle: R`<p>Si $\|v\|_\infty\le1$, $|x|+|y|\le2$: $\|T\|\le2$.</p>` },
        { idea: 'La alcanza', detalle: R`<p>$v=(1,1)$ tiene $\|v\|_\infty=1$ y $Tv=(2,0)$ con $\|Tv\|_\infty=2$. Luego $\|T\|=2$. $\blacksquare$</p>` },
      ],
      conclusion: 'Calcular $\\|T\\|$ siempre son dos desigualdades: una cota $\\le$ para todos y un vector que casi la alcanza.',
    },
  },
  {
    n: 'Ejemplos de operadores y funcionales', ref: 'Práctica 6, Ej. 10–12',
    d: DEF_OP + R`<p>$Ef=f(0)$, $If=\int_0^1f$, $(Kf)(x)=\int_0^1k(x,y)f(y)\,dy$ con $k$ continua, $(\delta p)(t)=p'(t)$.</p>`,
    e: R`(a) $E$ e $I$ son continuas en $(C[0,1],\|\cdot\|_\infty)$ con norma $1$. (b) Con $\|\cdot\|_1$, $I$ es continua (norma $1$) pero $E$ no lo es. (c) $K$ es continuo con $\|K\|\le\max_x\int_0^1|k(x,y)|\,dy$. (d) La derivación $\delta$ en $(\mathbb{R}[t],\|\cdot\|_\infty)$ es lineal y no continua.`,
    p: R`<p>(a) $|f(0)|\le\|f\|_\infty$ y $|\int f|\le\int|f|\le\|f\|_\infty$; con $f\equiv1$ ambas dan $1$. (b) $|\int f|\le\|f\|_1$. Para $E$: $g_n(x)=\max(0,n-n^2x)$ tiene $\|g_n\|_1=\tfrac12$ y $g_n(0)=n\to\infty$; reescalando por $\tfrac1n$, $\|\tfrac{g_n}n\|_1\to0$ con $E(\tfrac{g_n}n)=1$: $E$ no es acotada. (c) $|Kf(x)|\le\int|k(x,y)||f(y)|\,dy\le\|f\|_\infty\int|k(x,y)|\,dy$, y $Kf$ es continua porque $k$ es uniformemente continua. (d) $\|t^n\|_\infty=1$ y $\|\delta t^n\|_\infty=n$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Sea $k(x,y)=xy$. Calcular $\|K\|$ en $(C[0,1],\|\cdot\|_\infty)$.`,
      idea: 'Usar la cota $\\max_x\\int|k|$ y probar que se alcanza con $f\\equiv1$.',
      pasos: [
        { idea: 'Cota superior', detalle: R`<p>$\int_0^1|xy|\,dy=\tfrac x2$ y $\max_{x\in[0,1]}\tfrac x2=\tfrac12$. Entonces $\|K\|\le\tfrac12$.</p>` },
        { idea: 'Alcanzarla', detalle: R`<p>Con $f\equiv1$: $Kf(x)=x\int_0^1y\,dy=\tfrac x2$, de norma $\tfrac12=\tfrac12\|f\|_\infty$.</p>` },
        { idea: 'Conclusión', detalle: R`<p>$\|K\|=\tfrac12$. $\blacksquare$</p>` },
      ],
      conclusion: 'Integrar suaviza (operador acotado); derivar amplifica (no acotado): por eso en análisis se prefieren los operadores integrales.',
    },
  },
  {
    n: 'Cesàro en espacios normados', ref: 'Práctica 6, Ej. 3',
    d: R`<p>Promedios de Cesàro: $y_n=\tfrac{x_1+\cdots+x_n}{n}$.</p>`,
    e: R`Si $x_n\to x_0$ en un espacio normado, entonces $y_n\to x_0$.`,
    p: R`<p>$y_n-x_0=\tfrac1n\sum_{k\le n}(x_k-x_0)$. Dado $\varepsilon>0$ hay $N$ con $\|x_k-x_0\|<\tfrac\varepsilon2$ para $k\ge N$. Entonces $\|y_n-x_0\|\le\tfrac1n\Big\|\sum_{k<N}(x_k-x_0)\Big\|+\tfrac{n-N+1}{n}\cdot\tfrac\varepsilon2$. El primer sumando es $\tfrac{c}{n}\to0$ ($c$ fijo) y el segundo $<\tfrac\varepsilon2$. Para $n$ grande, $<\varepsilon$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $\dfrac1n\left(1+\dfrac12+\cdots+\dfrac1n\right)\to0$.`,
      idea: 'Es el promedio de Cesàro de la sucesión $\\tfrac1k$, que tiende a $0$.',
      pasos: [
        { idea: 'La sucesión', detalle: R`<p>$a_k=\tfrac1k\to0$ (Arquímedes).</p>` },
        { idea: 'Promedios', detalle: R`<p>$y_n=\tfrac1n\sum_{k\le n}a_k$ es el promedio de Cesàro de $(a_k)$.</p>` },
        { idea: 'Aplicar', detalle: R`<p>Por el resultado, $y_n\to0$. (La suma armónica crece como $\ln n$, que es mucho más lento que $n$.) $\blacksquare$</p>` },
      ],
      conclusion: 'Los promedios suavizan: pueden converger aunque la sucesión original no ($(-1)^n$ tiene promedios $\\to0$).',
    },
  },
];
