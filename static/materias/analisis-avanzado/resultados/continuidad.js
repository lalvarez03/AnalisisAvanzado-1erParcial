// Resultados clave — Funciones continuas (teórica Cap. 5 · Práctica 4).
// Esquema: { n, ref, d: definiciones formales, e: enunciado, p: demostración, x: ejemplo de uso paso a paso }.
const R = String.raw;

const DEF_CONT = R`<ul><li><strong>Continua en $x$</strong> ($f:(M,d)\to(N,d')$): $\forall\varepsilon>0\ \exists\delta>0\ \forall y:\ d(x,y)<\delta\Rightarrow d'(f(x),f(y))<\varepsilon$, o sea $f(B(x,\delta))\subseteq B(f(x),\varepsilon)$. <strong>Continua:</strong> en todo punto.</li>
<li><strong>Uniformemente continua (UC):</strong> $\forall\varepsilon>0\ \exists\delta>0\ \forall x,y:\ d(x,y)<\delta\Rightarrow d'(f(x),f(y))<\varepsilon$ (el mismo $\delta$ para todos los puntos).</li>
<li><strong>Lipschitz:</strong> $\exists C\ge0\ \forall x,y:\ d'(f(x),f(y))\le C\,d(x,y)$.</li></ul>`;

export const EM_CONTINUIDAD = [
  {
    n: 'Tres caracterizaciones de la continuidad', ref: 'Teo. 5.7, 5.9; Ej. 5.10',
    d: DEF_CONT + R`<p>$f^{-1}(B)=\{x\in M:f(x)\in B\}$ (preimagen).</p>`,
    e: R`Para $f:(M,d)\to(N,d')$: (i) $f$ es continua en $x$ sii $x_n\to x\Rightarrow f(x_n)\to f(x)$. (ii) $f$ es continua en todo $M$ sii la preimagen de todo abierto es abierta sii la preimagen de todo cerrado es cerrada.`,
    p: R`<p><strong>(i) ($\Rightarrow$)</strong> Dado $\varepsilon$ tomo el $\delta$ de la continuidad; como $x_n\to x$, $d(x_n,x)<\delta$ para $n\ge n_0$ y entonces $d'(f(x_n),f(x))<\varepsilon$.</p>
<p><strong>(i) ($\Leftarrow$)</strong> Si $f$ no fuera continua en $x$, existiría $\varepsilon_0$ tal que para cada $n$ hay $x_n\in B(x,\tfrac1n)$ con $d'(f(x_n),f(x))\ge\varepsilon_0$. Entonces $x_n\to x$ pero $f(x_n)\not\to f(x)$.</p>
<p><strong>(ii) ($\Rightarrow$)</strong> Sea $A$ abierto y $x\in f^{-1}(A)$. Existe $B(f(x),r)\subseteq A$ y $\delta$ con $f(B(x,\delta))\subseteq B(f(x),r)\subseteq A$, o sea $B(x,\delta)\subseteq f^{-1}(A)$. <strong>($\Leftarrow$)</strong> $B(f(x),\varepsilon)$ es abierta, su preimagen es abierta y contiene a $x$: hay $\delta$ con $B(x,\delta)\subseteq f^{-1}(B(f(x),\varepsilon))$. Para cerrados se usa $f^{-1}(N\setminus F)=M\setminus f^{-1}(F)$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $D=\{(x,y)\in\mathbb{R}^2:x^2+y^2<1\}$ es abierto y que $S=\{(x,y):xy=1\}$ es cerrado, y que la evaluación $\mathrm{ev}_{1/2}:(C[0,1],d_\infty)\to\mathbb{R}$, $f\mapsto f(\tfrac12)$, es continua.`,
      idea: 'Dos conjuntos por preimagen de una continua; la evaluación por sucesiones.',
      pasos: [
        { idea: '$D$ abierto', detalle: R`<p>$\varphi(x,y)=x^2+y^2$ es continua (polinomio). $D=\varphi^{-1}((-\infty,1))$, preimagen de un abierto: abierto.</p>` },
        { idea: '$S$ cerrado', detalle: R`<p>$\psi(x,y)=xy$ es continua y $S=\psi^{-1}(\{1\})$, preimagen de un cerrado: cerrado.</p>` },
        { idea: 'Evaluación (por sucesiones)', detalle: R`<p>Si $f_n\to f$ en $d_\infty$: $|f_n(\tfrac12)-f(\tfrac12)|\le\max|f_n-f|=d_\infty(f_n,f)\to0$. Luego $\mathrm{ev}_{1/2}(f_n)\to\mathrm{ev}_{1/2}(f)$. $\blacksquare$</p>` },
      ],
      conclusion: 'Elegí el modo de la caracterización según el problema: "conjunto abierto/cerrado" ⇒ preimagen; "límite de una sucesión" ⇒ secuencial; "para todo $\\varepsilon$" ⇒ $\\varepsilon$–$\\delta$.',
    },
  },
  {
    n: 'Continuidad y clausura', ref: 'Teo. 5.13',
    d: R`<p>$\overline E$ es la clausura de $E$: $x\in\overline E\iff\exists(x_n)\subseteq E,\ x_n\to x$.</p>`,
    e: R`$f$ es continua sii $f(\overline E)\subseteq\overline{f(E)}$ para todo $E\subseteq M$.`,
    p: R`<p>($\Rightarrow$) Si $x\in\overline E$ hay $(x_n)\subseteq E$ con $x_n\to x$; entonces $f(x_n)\to f(x)$ y $f(x_n)\in f(E)$, así $f(x)\in\overline{f(E)}$. ($\Leftarrow$) Sea $F$ cerrado y $E=f^{-1}(F)$. Entonces $f(\overline E)\subseteq\overline{f(E)}\subseteq\overline F=F$, de modo que $\overline E\subseteq f^{-1}(F)=E$: $E$ es cerrado. Por (ii) del resultado anterior, $f$ es continua. $\blacksquare$</p>`,
    x: {
      enunciado: R`Con $E=(0,1)$, comparar $f(\overline E)$ y $\overline{f(E)}$ para $f(x)=x^2$ y para la función $g$ con $g(0)=1$ y $g(x)=0$ si $x\ne0$ (discontinua).`,
      idea: 'Una continua cumple la inclusión; una discontinua la puede violar.',
      pasos: [
        { idea: '$f(x)=x^2$', detalle: R`<p>$\overline E=[0,1]$, $f(\overline E)=[0,1]$, $f(E)=(0,1)$ y $\overline{f(E)}=[0,1]$: se cumple $f(\overline E)\subseteq\overline{f(E)}$.</p>` },
        { idea: '$g$', detalle: R`<p>$g(E)=\{0\}$, $\overline{g(E)}=\{0\}$, pero $g(\overline E)\ni g(0)=1\notin\{0\}$: la inclusión falla.</p>` },
        { idea: 'Conclusión', detalle: R`<p>Por el resultado, $g$ no es continua (en $0$). $\blacksquare$</p>` },
      ],
      conclusion: 'La continuidad significa "no se despega de la clausura": puntos pegados al conjunto van a puntos pegados a su imagen.',
    },
  },
  {
    n: 'La continua no preserva abiertos ni cerrados en la imagen', ref: 'Obs. 5.12; Práctica 4, Ej. 6',
    d: DEF_CONT,
    e: R`Una función continua puede mandar un abierto en un no abierto ($x^2$ lleva $(-1,1)$ en $[0,1)$) y un cerrado en un no cerrado ($\tfrac{x^2}{1+x^2}$ lleva $[0,\infty)$ en $[0,1)$; $e^x$ lleva $\mathbb{R}$ en $(0,\infty)$). La preimagen sí conserva ambos.`,
    p: R`<p>$x^2$: $f((-1,1))=[0,1)$, no es abierto porque $0$ no es interior (los negativos cercanos no están en la imagen). $g(x)=\tfrac{x^2}{1+x^2}=1-\tfrac1{1+x^2}$: para $x\ge0$ es creciente con $g(0)=0$ y $g<1$, y $g(x)\to1$; entonces $g([0,\infty))=[0,1)$ no es cerrado porque $1$ es límite de elementos de la imagen y no pertenece a ella. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $g([0,\infty))=[0,1)$ para $g(x)=\dfrac{x^2}{1+x^2}$.`,
      idea: 'Acotar la imagen y probar que se alcanza todo valor intermedio (continuidad).',
      pasos: [
        { idea: 'Cotas', detalle: R`<p>$0\le g(x)<1$ para todo $x$, pues $x^2<1+x^2$.</p>` },
        { idea: 'Todo valor se alcanza', detalle: R`<p>Dado $y\in[0,1)$, $g(x)=y\iff x^2=\tfrac y{1-y}\iff x=\sqrt{\tfrac y{1-y}}$, que existe (y es $\ge0$).</p>` },
        { idea: 'Conclusión', detalle: R`<p>La imagen es $[0,1)$: la imagen de un cerrado no es cerrada (falta el $1$, al que $g$ tiende sin alcanzar). $\blacksquare$</p>` },
      ],
      conclusion: 'Que el conjunto "tenga una cola infinita" es lo que permite que su imagen pierda un extremo; con compactos esto no pasa (ver compacidad).',
    },
  },
  {
    n: 'Álgebra de continuas y conjuntos $\\{f=g\\}$', ref: 'Cap. 5; Práctica 4, Ej. 1, 4, 5',
    d: DEF_CONT,
    e: R`Suma, producto, cociente (con denominador $\ne0$) y composición de continuas son continuas. Las proyecciones $\pi_i(x)=x_i$ y las distancias $d(\cdot,x_0)$, $d(\cdot,A)$ son continuas. Si $f,g:E\to E'$ son continuas, $\{f\ne g\}$ es abierto y $\{f=g\}$ es cerrado.`,
    p: R`<p>Por la caracterización secuencial, el álgebra de continuas se reduce al álgebra de límites de sucesiones reales; la composición: $x_n\to x\Rightarrow f(x_n)\to f(x)\Rightarrow g(f(x_n))\to g(f(x))$. $\pi_i$ es 1-Lipschitz ($|x_i-y_i|\le d_2(x,y)$). Para $h(x)=d'(f(x),g(x))$, que es continua (composición de continuas), $\{f=g\}=h^{-1}(\{0\})$ es cerrado y $\{f\ne g\}=h^{-1}((0,\infty))$ es abierto. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $F=\{(x,y,z)\in\mathbb{R}^3:-1\le x^3-3y^4+z-2\le3\}$ es cerrado, y que $f(x,y)=\dfrac{x^2y}{x^2+y^2}$ ($f(0,0)=0$) es continua.`,
      idea: '$F$ es la preimagen de un cerrado por una continua explícita; en $f$ hay que acotar en el origen.',
      pasos: [
        { idea: '$F$ cerrado', detalle: R`<p>$\varphi(x,y,z)=x^3-3y^4+z-2$ es un polinomio, continuo. $F=\varphi^{-1}([-1,3])$, preimagen de un cerrado: cerrado.</p>` },
        { idea: '$f$ fuera del origen', detalle: R`<p>Es cociente de continuas con denominador $x^2+y^2\ne0$: continua.</p>` },
        { idea: '$f$ en el origen', detalle: R`<p>$|f(x,y)|=\tfrac{x^2}{x^2+y^2}|y|\le|y|\le d_2((x,y),(0,0))$. Dado $\varepsilon$, $\delta=\varepsilon$ cumple $|f(x,y)-f(0,0)|<\varepsilon$. Luego $f$ es continua en $\mathbb{R}^2$. $\blacksquare$</p>` },
      ],
      conclusion: 'En una indeterminación $\\tfrac00$, "acotar por una cantidad que depende solo de la distancia al punto" es el método; probar a lo largo de rectas no alcanza.',
    },
  },
  {
    n: 'Densos y continuas', ref: 'Práctica 4, Ej. 7–8',
    d: R`<p>$D\subseteq E$ es denso si $\overline D=E$, es decir todo punto de $E$ es límite de una sucesión de $D$.</p>`,
    e: R`(a) Si $f,g:E\to E'$ son continuas y coinciden en un denso $D$, entonces $f=g$. (b) Si $f$ es continua y suryectiva y $D$ es denso en $E$, entonces $f(D)$ es denso en $E'$.`,
    p: R`<p>(a) Sea $x\in E$ y $x_n\in D$ con $x_n\to x$. Entonces $f(x)=\lim f(x_n)=\lim g(x_n)=g(x)$. (b) Sea $y\in E'$, $y=f(x)$ (suryectividad), $x_n\in D\to x$; entonces $f(x_n)\to y$ con $f(x_n)\in f(D)$, así $y\in\overline{f(D)}$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Sean $f,g:\mathbb{R}\to\mathbb{R}$ continuas con $f(q)=g(q)=q^2$ para todo $q\in\mathbb{Q}$. Probar que $f(x)=g(x)=x^2$ para todo $x$.`,
      idea: 'Comparar $f$ y $g$ con $h(x)=x^2$, continua, en el denso $\\mathbb{Q}$.',
      pasos: [
        { idea: 'Tres continuas', detalle: R`<p>$f$, $g$ y $h(x)=x^2$ son continuas y coinciden en $\mathbb{Q}$, que es denso en $\mathbb{R}$.</p>` },
        { idea: 'Aplicar (a)', detalle: R`<p>Por (a), $f=h$ y $g=h$. $\blacksquare$</p>` },
      ],
      conclusion: 'Una función continua queda determinada por sus valores en un denso. Es la base de la extensión por continuidad.',
    },
  },
  {
    n: 'Continuidad uniforme por sucesiones', ref: 'Prop. 5.18',
    d: DEF_CONT,
    e: R`$f$ es UC sii para todo par de sucesiones $(x_n),(y_n)$ con $d(x_n,y_n)\to0$ se tiene $d'(f(x_n),f(y_n))\to0$.`,
    p: R`<p>($\Rightarrow$) Dado $\varepsilon$ el $\delta$ de la UC sirve para todos los puntos; para $n$ grande $d(x_n,y_n)<\delta$, luego $d'(f(x_n),f(y_n))<\varepsilon$. ($\Leftarrow$) Si $f$ no fuera UC existiría $\varepsilon_0$ tal que para cada $n$ hay $x_n,y_n$ con $d(x_n,y_n)<\tfrac1n$ y $d'(f(x_n),f(y_n))\ge\varepsilon_0$, contradiciendo la hipótesis. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $f(x)=x^2$ no es UC en $\mathbb{R}$ y que $f(x)=\sin(1/x)$ no es UC en $(0,1)$.`,
      idea: 'Buscar dos sucesiones que se acercan entre sí cuyas imágenes no.',
      pasos: [
        { idea: '$x^2$', detalle: R`<p>$x_n=n$, $y_n=n+\tfrac1n$: $|x_n-y_n|=\tfrac1n\to0$ pero $|x_n^2-y_n^2|=2+\tfrac1{n^2}\ge2$.</p>` },
        { idea: '$\\sin(1/x)$', detalle: R`<p>$x_n=\tfrac1{2n\pi+\pi/2}$ (seno $=1$) e $y_n=\tfrac1{2n\pi}$ (seno $=0$): $|x_n-y_n|\to0$ y $|f(x_n)-f(y_n)|=1$.</p>` },
        { idea: 'Conclusión', detalle: R`<p>En ambos casos las sucesiones contradicen la condición necesaria; ninguna es UC. $\blacksquare$</p>` },
      ],
      conclusion: 'Este es el método estándar para refutar UC: la oscilación se "aprieta" (o la pendiente crece) en una región.',
    },
  },
  {
    n: 'Lipschitz $\\Rightarrow$ UC $\\Rightarrow$ continua', ref: 'Ej. 5.25, Obs. 5.28',
    d: DEF_CONT,
    e: R`Toda función Lipschitz es UC y toda UC es continua. Ninguna recíproca vale: $\sqrt x$ es UC en $[0,\infty)$ y no es Lipschitz; $x^2$ es continua y no es UC en $\mathbb{R}$. Si $f$ es derivable con $|f'|\le C$ en un intervalo, es $C$-Lipschitz.`,
    p: R`<p>Lipschitz $\Rightarrow$ UC: dado $\varepsilon$ tomo $\delta=\tfrac\varepsilon C$ ($C>0$). UC $\Rightarrow$ continua: es la misma definición con $\delta$ independiente del punto. Derivada acotada: por el teorema del valor medio $|f(x)-f(y)|=|f'(\xi)||x-y|\le C|x-y|$. $\sqrt x$: $|\sqrt x-\sqrt y|\le\sqrt{|x-y|}$ (para $x\ge y$: $\sqrt x\le\sqrt y+\sqrt{x-y}$), así $\delta=\varepsilon^2$ funciona; pero $\tfrac{\sqrt x-0}{x-0}=\tfrac1{\sqrt x}$ no está acotado cerca de $0$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $f(x)=\sqrt x$ es UC en $[0,\infty)$ y no es Lipschitz allí.`,
      idea: 'Una desigualdad que da el $\\delta$ explícito, y un cociente incremental no acotado.',
      pasos: [
        { idea: 'Desigualdad', detalle: R`<p>Para $x\ge y\ge0$: $(\sqrt x-\sqrt y)^2\le(\sqrt x-\sqrt y)(\sqrt x+\sqrt y)=x-y$, así $|\sqrt x-\sqrt y|\le\sqrt{|x-y|}$.</p>` },
        { idea: 'UC', detalle: R`<p>Dado $\varepsilon$, con $\delta=\varepsilon^2$: $|x-y|<\delta\Rightarrow|\sqrt x-\sqrt y|<\varepsilon$.</p>` },
        { idea: 'No Lipschitz', detalle: R`<p>$\dfrac{|\sqrt x-\sqrt0|}{|x-0|}=\dfrac1{\sqrt x}\to\infty$ cuando $x\to0^+$: ninguna constante $C$ sirve. $\blacksquare$</p>` },
      ],
      conclusion: 'UC es estrictamente más débil que Lipschitz: pendiente infinita en un punto no impide la UC.',
    },
  },
  {
    n: 'La UC preserva sucesiones de Cauchy', ref: 'Ej. 5.19; Práctica 4, Ej. 14',
    d: R`<p>$(x_n)$ es de Cauchy si $\forall\varepsilon\ \exists n_0\ \forall n,m\ge n_0:\ d(x_n,x_m)<\varepsilon$.</p>`,
    e: R`Si $f:(M,d)\to(N,d')$ es UC y $(x_n)$ es de Cauchy en $M$, entonces $(f(x_n))$ es de Cauchy en $N$. La continuidad simple no alcanza.`,
    p: R`<p>Dado $\varepsilon$ sea $\delta$ el de la UC. Existe $n_0$ con $d(x_n,x_m)<\delta$ para $n,m\ge n_0$; luego $d'(f(x_n),f(x_m))<\varepsilon$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Mostrar que $f(x)=\tfrac1x$ no es UC en $(0,1)$ usando este resultado.`,
      idea: 'Una sucesión de Cauchy cuya imagen no lo es.',
      pasos: [
        { idea: 'Sucesión de Cauchy', detalle: R`<p>$x_n=\tfrac1{n+1}\in(0,1)$ es de Cauchy (converge a $0$ en $\mathbb{R}$).</p>` },
        { idea: 'Imagen', detalle: R`<p>$f(x_n)=n+1$ no es de Cauchy ($|f(x_{n+1})-f(x_n)|=1$).</p>` },
        { idea: 'Conclusión', detalle: R`<p>Una UC enviaría Cauchy en Cauchy: $f$ no es UC. (Pero sí es continua.) $\blacksquare$</p>` },
      ],
      conclusion: 'Para refutar UC este criterio es a veces más rápido que buscar dos sucesiones acercándose.',
    },
  },
  {
    n: 'Extensión de funciones UC', ref: 'Teo. 5.22',
    d: R`<p>$E\subseteq M$ es denso si $\overline E=M$. $N$ es completo si toda sucesión de Cauchy converge.</p>`,
    e: R`Si $E$ es denso en $M$, $N$ es completo y $f:E\to N$ es UC, existe una única extensión UC $\tilde f:M\to N$ con $\tilde f|_E=f$.`,
    p: R`<p>Dado $x\in M$ elijo $x_n\in E\to x$; es de Cauchy, así $(f(x_n))$ es de Cauchy en $N$ (resultado anterior) y converge. Definimos $\tilde f(x)=\lim f(x_n)$. <em>Bien definida:</em> si $z_n\to x$ también, $d(x_n,z_n)\to0$ y por UC $d'(f(x_n),f(z_n))\to0$, así los límites coinciden. <em>UC:</em> dado $\varepsilon$ y el $\delta$ de $f$ para $\tfrac\varepsilon3$, si $d(x,y)<\tfrac\delta3$ con aproximantes $x_n\to x$, $y_n\to y$, para $n$ grande $d(x_n,y_n)<\delta$ y $d'(\tilde f(x),\tilde f(y))\le d'(\tilde f(x),f(x_n))+d'(f(x_n),f(y_n))+d'(f(y_n),\tilde f(y))<\varepsilon$. <em>Unicidad:</em> dos continuas iguales en un denso son iguales. $\blacksquare$</p>`,
    x: {
      enunciado: R`Sea $f(x)=\dfrac{x^2-1}{x-1}$ en $E=\mathbb{R}\setminus\{1\}$. Mostrar que $f$ es UC en $E$ y hallar su extensión a $\mathbb{R}$.`,
      idea: 'Simplificar $f$ para ver que es UC; el valor de la extensión es el límite de $f$ en $1$.',
      pasos: [
        { idea: 'Simplificar', detalle: R`<p>Para $x\ne1$: $f(x)=x+1$.</p>` },
        { idea: 'UC', detalle: R`<p>$|f(x)-f(y)|=|x-y|$: es 1-Lipschitz, luego UC. $E$ es denso en $\mathbb{R}$ y $\mathbb{R}$ es completo.</p>` },
        { idea: 'Extensión', detalle: R`<p>Con $x_n\to1$, $x_n\ne1$: $f(x_n)=x_n+1\to2$. Entonces $\tilde f(x)=x+1$ en todo $\mathbb{R}$, con $\tilde f(1)=2$. $\blacksquare$</p>` },
      ],
      conclusion: 'Así se justifica "rellenar" discontinuidades evitables: solo se puede cuando la función es UC (y el codominio es completo).',
    },
  },
  {
    n: 'Homeomorfismos e isometrías', ref: 'Def. 5.29, 5.33; Ej. 5.31',
    d: R`<ul><li><strong>Homeomorfismo:</strong> $f:M\to N$ biyectiva, continua y con inversa continua.</li><li><strong>Isometría:</strong> $d'(f(x),f(y))=d(x,y)$ para todos $x,y$.</li></ul>`,
    e: R`Dos métricas $d_1,d_2$ en $M$ son equivalentes sii $\mathrm{id}:(M,d_1)\to(M,d_2)$ es un homeomorfismo. Toda isometría es Lipschitz-1, inyectiva y un homeomorfismo sobre su imagen. $x\mapsto\tfrac x{1+|x|}$ es un homeomorfismo $\mathbb{R}\to(-1,1)$.`,
    p: R`<p>$\mathrm{id}$ es continua sii todo $d_2$-abierto es $d_1$-abierto; su inversa lo es sii vale la recíproca; juntas, mismos abiertos. Una isometría cumple $d'(f(x),f(y))\le1\cdot d(x,y)$ y, si $f(x)=f(y)$, $d(x,y)=0$, luego es inyectiva; su inversa sobre la imagen es también isometría, así continua. Para $h(x)=\tfrac x{1+|x|}$: es continua (cociente con denominador $\ge1$), biyectiva con inversa continua $y\mapsto\tfrac y{1-|y|}$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Mostrar que $F:[0,2\pi)\to S^1$, $F(t)=(\cos t,\sin t)$ es biyección continua que <em>no</em> es homeomorfismo.`,
      idea: 'La inversa falla en el punto $(1,0)$.',
      pasos: [
        { idea: 'Biyección continua', detalle: R`<p>$F$ es continua (coordenadas continuas), inyectiva en $[0,2\pi)$ y sobreyectiva sobre la circunferencia.</p>` },
        { idea: 'Inversa discontinua', detalle: R`<p>Sea $p_n=F(2\pi-\tfrac1n)\to(1,0)=F(0)$. Pero $F^{-1}(p_n)=2\pi-\tfrac1n\to2\pi\ne0=F^{-1}(1,0)$.</p>` },
        { idea: 'Conclusión', detalle: R`<p>$F^{-1}$ no es continua: no es homeomorfismo. (Si el dominio fuera compacto esto no podría pasar.) $\blacksquare$</p>` },
      ],
      conclusion: 'Una biyección continua no basta: hace falta continuidad de la inversa, que la compacidad del dominio garantiza.',
    },
  },
  {
    n: 'Funciones de Urysohn', ref: 'Práctica 4, Ej. 11',
    d: R`<p>$d(x,A)=\inf_{a\in A}d(x,a)$. $d(x,A)=0\iff x\in\overline A$.</p>`,
    e: R`Si $A,B$ son cerrados, disjuntos y no vacíos, $h(x)=\dfrac{d(x,A)}{d(x,A)+d(x,B)}$ es continua, $h|_A=0$ y $h|_B=1$. Por lo tanto existen abiertos disjuntos $U\supseteq A$ y $V\supseteq B$.`,
    p: R`<p>El denominador nunca es $0$: si $d(x,A)=d(x,B)=0$ entonces $x\in\overline A\cap\overline B=A\cap B=\varnothing$. $d(\cdot,A)$ y $d(\cdot,B)$ son continuas, luego $h$ es continua. En $A$, $d(x,A)=0$ y $h=0$; en $B$, $d(x,B)=0$ y $h=1$. Sean $U=h^{-1}((-\infty,\tfrac12))$ y $V=h^{-1}((\tfrac12,\infty))$: abiertos (preimágenes de abiertos), disjuntos, con $A\subseteq U$ y $B\subseteq V$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Para $A=\{0\}$ y $B=\{1\}$ en $\mathbb{R}$, calcular $h$ y los abiertos $U,V$.`,
      idea: 'Evaluar la fórmula con las distancias a puntos.',
      pasos: [
        { idea: 'Fórmula', detalle: R`<p>$d(x,A)=|x|$, $d(x,B)=|x-1|$, luego $h(x)=\dfrac{|x|}{|x|+|x-1|}$.</p>` },
        { idea: 'Valores', detalle: R`<p>$h(0)=0$, $h(1)=1$ y $h(x)=\tfrac12\iff|x|=|x-1|\iff x=\tfrac12$.</p>` },
        { idea: 'Abiertos', detalle: R`<p>$U=\{h<\tfrac12\}=(-\infty,\tfrac12)$ y $V=\{h>\tfrac12\}=(\tfrac12,\infty)$: disjuntos y separan $A$ de $B$. $\blacksquare$</p>` },
      ],
      conclusion: 'En un espacio métrico los cerrados disjuntos siempre se separan por abiertos: la distancia a un conjunto construye la función que lo hace.',
    },
  },
];
