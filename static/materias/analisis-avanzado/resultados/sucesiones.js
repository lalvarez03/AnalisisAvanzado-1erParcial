// Resultados clave — Sucesiones y series (teórica Cap. 2 · Práctica 1).
// Esquema: { n, ref, d: definiciones formales, e: enunciado, p: demostración, x: ejemplo de uso paso a paso }.
const R = String.raw;

const DEF_LIM = R`<p><strong>Sucesión:</strong> función $a:\mathbb{N}\to\mathbb{R}$, $a_n=a(n)$. <strong>Límite:</strong> $a_n\to\ell$ si $\forall\varepsilon>0\ \exists n_0\in\mathbb{N}\ \forall n\ge n_0:\ |a_n-\ell|<\varepsilon$.</p>`;

export const SUCESIONES = [
  {
    n: 'Unicidad del límite', ref: 'Prop. 2.8',
    d: DEF_LIM,
    e: R`Si $a_n\to\ell_1$ y $a_n\to\ell_2$, entonces $\ell_1=\ell_2$.`,
    p: R`<p>Sea $\varepsilon>0$. Existen $n_1,n_2$ tales que $|a_n-\ell_1|<\tfrac\varepsilon2$ si $n\ge n_1$ y $|a_n-\ell_2|<\tfrac\varepsilon2$ si $n\ge n_2$. Para $n\ge\max(n_1,n_2)$:</p>
<p>$|\ell_1-\ell_2|\le|\ell_1-a_n|+|a_n-\ell_2|<\varepsilon$.</p>
<p>Como vale para todo $\varepsilon>0$, $\ell_1=\ell_2$ (Supremos, Ej. 1). $\blacksquare$</p>`,
    x: {
      enunciado: R`Sea $(a_n)$ con $a_{n+1}=\tfrac12a_n+1$. Si $(a_n)$ converge, hallar su límite.`,
      idea: 'La sucesión $(a_{n+1})$ es la misma sucesión corrida: tiene el mismo límite. Por otro lado la fórmula da otro límite; por unicidad ambos coinciden.',
      pasos: [
        { idea: 'Llamar $\\ell$ al límite', detalle: R`<p>Supongamos $a_n\to\ell$. La cola $(a_{n+1})_n$ también converge a $\ell$ (es una subsucesión).</p>` },
        { idea: 'Álgebra de límites', detalle: R`<p>$\tfrac12a_n+1\to\tfrac12\ell+1$. Pero $\tfrac12a_n+1=a_{n+1}$, que converge a $\ell$.</p>` },
        { idea: 'Unicidad', detalle: R`<p>Una misma sucesión no puede tener dos límites: $\ell=\tfrac12\ell+1$, de donde $\ell=2$. $\blacksquare$</p>` },
      ],
      conclusion: 'Este truco calcula límites de recurrencias <em>una vez que sabés que convergen</em> (la convergencia se prueba aparte, por ejemplo con monotonía).',
    },
  },
  {
    n: 'Convergente $\\Rightarrow$ acotada', ref: 'Prop. 2.12',
    d: R`<p><strong>Acotada:</strong> $\exists M>0\ \forall n:\ |a_n|\le M$ (el conjunto $\{a_n\}$ está acotado).</p>`,
    e: R`Si $a_n\to\ell\in\mathbb{R}$, entonces $(a_n)$ está acotada. La recíproca es falsa: $((-1)^n)$.`,
    p: R`<p>Con $\varepsilon=1$ existe $n_0$ tal que $|a_n-\ell|<1$ para $n\ge n_0$, así $|a_n|<|\ell|+1$ para $n\ge n_0$. Los términos anteriores son finitos: $M=\max\{|a_1|,\dots,|a_{n_0-1}|,|\ell|+1\}$ cumple $|a_n|\le M$ para todo $n$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $b_n=n\,(1+(-1)^n)$ no converge.`,
      idea: 'Usar la contrarrecíproca: si no está acotada, no puede converger.',
      pasos: [
        { idea: 'Calcular términos', detalle: R`<p>Si $n$ es par, $b_n=2n$; si es impar, $b_n=0$.</p>` },
        { idea: 'No acotada', detalle: R`<p>Dado $M$, existe un $n$ par con $2n>M$, entonces $|b_n|>M$: $(b_n)$ no está acotada.</p>` },
        { idea: 'Conclusión', detalle: R`<p>Si convergiera estaría acotada (Prop. 2.12). Luego diverge. $\blacksquare$</p>` },
      ],
      conclusion: 'Acotación es una condición <em>necesaria</em> de convergencia: sirve para descartar. Para el recíproco hace falta algo más (monotonía, Bolzano–Weierstrass).',
    },
  },
  {
    n: 'Álgebra de límites', ref: 'Prop. 2.9',
    d: DEF_LIM,
    e: R`Si $a_n\to a$ y $b_n\to b$ (finitos): $ca_n\to ca$; $a_n+b_n\to a+b$; $a_nb_n\to ab$; y si $b\ne0$, $a_n/b_n\to a/b$.`,
    p: R`<p><strong>Suma.</strong> Con $n$ grande, $|a_n-a|<\tfrac\varepsilon2$ y $|b_n-b|<\tfrac\varepsilon2$; luego $|(a_n+b_n)-(a+b)|<\varepsilon$.</p>
<p><strong>Producto.</strong> $a_n$ está acotada: $|a_n|\le M$. Entonces $|a_nb_n-ab|\le|a_n||b_n-b|+|b||a_n-a|\le M|b_n-b|+|b||a_n-a|$, que se hace $<\varepsilon$ eligiendo $|b_n-b|<\tfrac\varepsilon{2M}$ y $|a_n-a|<\tfrac\varepsilon{2(|b|+1)}$.</p>
<p><strong>Cociente.</strong> Como $b\ne0$, para $n$ grande $|b_n|>\tfrac{|b|}2$, y $\left|\tfrac1{b_n}-\tfrac1b\right|=\tfrac{|b-b_n|}{|b_n||b|}\le\tfrac2{|b|^2}|b_n-b|\to0$. Se combina con el producto. $\blacksquare$</p>`,
    x: {
      enunciado: R`Calcular $\displaystyle\lim_{n\to\infty}\frac{3n^2+n}{2n^2-5}$.`,
      idea: 'Dividir por la mayor potencia para reducirse a sucesiones cuyo límite se conoce, y justificar cada paso con la proposición.',
      pasos: [
        { idea: 'Reescribir', detalle: R`<p>$\dfrac{3n^2+n}{2n^2-5}=\dfrac{3+\tfrac1n}{2-\tfrac5{n^2}}$ (se dividió numerador y denominador por $n^2$).</p>` },
        { idea: 'Límites básicos', detalle: R`<p>$\tfrac1n\to0$ (Arquímedes) y $\tfrac5{n^2}=5\cdot\tfrac1n\cdot\tfrac1n\to0$ por producto. El numerador tiende a $3$ y el denominador a $2\ne0$.</p>` },
        { idea: 'Cociente', detalle: R`<p>Por el álgebra de límites, el límite es $\tfrac32$. $\blacksquare$</p>` },
      ],
      conclusion: 'Cada igualdad de límites de la cuenta se apoya en una parte de la proposición; la condición $b\\ne0$ del cociente se verifica en el denominador.',
    },
  },
  {
    n: 'Sándwich y "acotada $\\times$ nula"', ref: 'Práctica 1, Ej. 8, 11',
    d: DEF_LIM + R`<p><strong>Nula:</strong> $x_n\to0$. <strong>Acotada:</strong> $|y_n|\le M$ para todo $n$.</p>`,
    e: R`(a) Si $|x_n-\ell|\le a_n$ para todo $n$ y $a_n\to0$, entonces $x_n\to\ell$. (b) Si $x_n\to0$ e $(y_n)$ está acotada, entonces $x_ny_n\to0$.`,
    p: R`<p>(a) Dado $\varepsilon>0$ existe $n_0$ con $a_n<\varepsilon$ para $n\ge n_0$; entonces $|x_n-\ell|\le a_n<\varepsilon$.</p>
<p>(b) Sea $|y_n|\le M$. Dado $\varepsilon>0$, para $n$ grande $|x_n|<\tfrac\varepsilon M$ y entonces $|x_ny_n|\le M|x_n|<\varepsilon$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $\displaystyle\frac{\cos n}{n^2+1}\to0$.`,
      idea: 'El coseno no tiene límite pero está acotado; el otro factor tiende a $0$.',
      pasos: [
        { idea: 'Factor acotado', detalle: R`<p>$y_n=\cos n$ cumple $|y_n|\le1$.</p>` },
        { idea: 'Factor nulo', detalle: R`<p>$0<\tfrac1{n^2+1}\le\tfrac1n\to0$; por sándwich (a), $x_n=\tfrac1{n^2+1}\to0$.</p>` },
        { idea: 'Producto', detalle: R`<p>Por (b), $\tfrac{\cos n}{n^2+1}=x_ny_n\to0$. $\blacksquare$</p>` },
      ],
      conclusion: 'No se puede usar "límite del producto = producto de límites" porque $\\cos n$ no converge: el resultado (b) lo reemplaza.',
    },
  },
  {
    n: 'Paso al límite en desigualdades', ref: 'Práctica 1, Ej. 10',
    d: DEF_LIM,
    e: R`Si $x_n\le y_n$ para todo $n$, $x_n\to\ell_1$ e $y_n\to\ell_2$, entonces $\ell_1\le\ell_2$. (Las desigualdades estrictas <em>no</em> se conservan.)`,
    p: R`<p>Supongamos $\ell_1>\ell_2$ y sea $\varepsilon=\tfrac{\ell_1-\ell_2}2$. Para $n$ grande, $x_n>\ell_1-\varepsilon=\tfrac{\ell_1+\ell_2}2$ e $y_n<\ell_2+\varepsilon=\tfrac{\ell_1+\ell_2}2$. Entonces $y_n<x_n$, contradiciendo $x_n\le y_n$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Sea $a_n=\dfrac{2n+1}{n+3}$. Probar que $a_n<2$ para todo $n$ y que, aun así, $\lim a_n=2$ (la desigualdad estricta se pierde).`,
      idea: 'Comparar con la sucesión constante $2$ y pasar al límite: solo se obtiene $\\le$.',
      pasos: [
        { idea: 'Desigualdad para todo $n$', detalle: R`<p>$2n+1<2n+6=2(n+3)$, luego $a_n<2$.</p>` },
        { idea: 'Pasar al límite', detalle: R`<p>Con $y_n=2$ constante, el resultado da $\ell\le2$ (sin calcular $\ell$).</p>` },
        { idea: 'El límite exacto', detalle: R`<p>$a_n=\dfrac{2+\tfrac1n}{1+\tfrac3n}\to2$. Es $a_n<2$ siempre y $\ell=2$: la desigualdad estricta no sobrevive. $\blacksquare$</p>` },
      ],
      conclusion: 'Siempre que pases al límite en una desigualdad, escribí $\\le$, aunque antes fuera $<$.',
    },
  },
  {
    n: 'Teorema de la sucesión monótona', ref: 'Práctica 1, Ej. 12',
    d: R`<p><strong>Creciente:</strong> $a_{n+1}\ge a_n\ \forall n$. <strong>Decreciente:</strong> $a_{n+1}\le a_n\ \forall n$. <strong>Monótona:</strong> una de las dos.</p>`,
    e: R`Una sucesión creciente y acotada superiormente converge a $\sup\{a_n\}$; una decreciente y acotada inferiormente converge a $\inf\{a_n\}$. Si una creciente no está acotada superiormente, $a_n\to+\infty$.`,
    p: R`<p>Sea $(a_n)$ creciente y acotada, $s=\sup\{a_n\}$ (existe por completitud). Dado $\varepsilon>0$ existe $n_0$ con $a_{n_0}>s-\varepsilon$ (caracterización $\varepsilon$). Para $n\ge n_0$, por monotonía y por ser $s$ cota: $s-\varepsilon<a_{n_0}\le a_n\le s$, así $|a_n-s|<\varepsilon$. El caso decreciente es simétrico. Si no está acotada y $M>0$, existe $n_0$ con $a_{n_0}>M$, y para $n\ge n_0$, $a_n\ge a_{n_0}>M$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Sea $a_1=\sqrt2$ y $a_{n+1}=\sqrt{2+a_n}$. Probar que converge y hallar el límite.`,
      idea: 'Probar por inducción que es creciente y acotada por $2$; el teorema da la convergencia; el límite sale de la recurrencia (como en el ejemplo de unicidad).',
      pasos: [
        { idea: 'Acotada por 2', detalle: R`<p>$a_1=\sqrt2<2$. Si $a_n<2$, entonces $a_{n+1}=\sqrt{2+a_n}<\sqrt4=2$.</p>` },
        { idea: 'Creciente', detalle: R`<p>$a_{n+1}\ge a_n\iff 2+a_n\ge a_n^2\iff(2-a_n)(1+a_n)\ge0$, cierto pues $0<a_n<2$.</p>` },
        { idea: 'Convergencia', detalle: R`<p>Creciente y acotada: $a_n\to\ell=\sup\{a_n\}\le2$.</p>` },
        { idea: 'Límite', detalle: R`<p>Pasando al límite en $a_{n+1}^2=2+a_n$: $\ell^2=2+\ell$, es decir $(\ell-2)(\ell+1)=0$. Como $\ell>0$, $\ell=2$. $\blacksquare$</p>` },
      ],
      conclusion: 'Receta: (1) acotada, (2) monótona, (3) existe el límite, (4) se despeja de la recurrencia. Nunca calcules el límite antes de probar que existe.',
    },
  },
  {
    n: 'Las subsucesiones heredan el límite', ref: 'Prop. 2.23',
    d: R`<p><strong>Subsucesión:</strong> $(a_{n_k})_{k\ge1}$ con $n_1<n_2<\cdots$ estrictamente creciente (en particular $n_k\ge k$).</p>`,
    e: R`Si $a_n\to\ell$, toda subsucesión $(a_{n_k})$ también tiende a $\ell$. En consecuencia, dos subsucesiones con límites distintos implican que $(a_n)$ no converge.`,
    p: R`<p>Dado $\varepsilon>0$ existe $n_0$ con $|a_n-\ell|<\varepsilon$ si $n\ge n_0$. Para $k\ge n_0$ vale $n_k\ge k\ge n_0$, luego $|a_{n_k}-\ell|<\varepsilon$. Si dos subsucesiones tuvieran límites distintos, $a_n$ tendría dos límites y contradiría la unicidad. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $a_n=(-1)^n+\tfrac1n$ no converge.`,
      idea: 'Exhibir dos subsucesiones con límites distintos.',
      pasos: [
        { idea: 'Pares', detalle: R`<p>$a_{2k}=1+\tfrac1{2k}\to1$.</p>` },
        { idea: 'Impares', detalle: R`<p>$a_{2k-1}=-1+\tfrac1{2k-1}\to-1$.</p>` },
        { idea: 'Conclusión', detalle: R`<p>Si $a_n\to\ell$, las dos subsucesiones tenderían a $\ell$, pero tienden a $1\ne-1$. Luego $(a_n)$ diverge. $\blacksquare$</p>` },
      ],
      conclusion: 'Es la herramienta estándar para probar que una sucesión <em>no</em> converge.',
    },
  },
  {
    n: 'Bolzano–Weierstrass', ref: 'Práctica 1, Ej. 14; Teo. de subsucesiones',
    d: R`<p><strong>Pico:</strong> $n$ es un <em>pico</em> de $(a_n)$ si $a_n\ge a_m$ para todo $m>n$. <strong>Divergir a $+\infty$:</strong> $\forall M\ \exists n_0\ \forall n\ge n_0:\ a_n>M$.</p>`,
    e: R`Toda sucesión acotada de reales tiene una subsucesión convergente. Si $(a_n)$ no está acotada superiormente, tiene una subsucesión que diverge a $+\infty$.`,
    p: R`<p><strong>Paso 1: toda sucesión tiene una subsucesión monótona.</strong> Si hay infinitos picos $n_1<n_2<\cdots$, entonces $a_{n_1}\ge a_{n_2}\ge\cdots$ (decreciente). Si hay finitos, sea $N$ mayor que todos; para cada $n>N$ (que no es pico) existe $m>n$ con $a_m>a_n$: eligiendo $n_1=N+1$, $n_{k+1}>n_k$ con $a_{n_{k+1}}>a_{n_k}$, queda una subsucesión creciente.</p>
<p><strong>Paso 2.</strong> Si $(a_n)$ está acotada, esa subsucesión monótona también, y converge por el teorema de la monótona. $\blacksquare$</p>
<p><em>No acotada superiormente:</em> elijo $n_1$ con $a_{n_1}>1$ y, dado $n_k$, como $\{a_n:n>n_k\}$ sigue sin cota (quitar finitos términos no acota), elijo $n_{k+1}>n_k$ con $a_{n_{k+1}}>k+1$; entonces $a_{n_k}\to+\infty$.</p>`,
    x: {
      enunciado: R`Sea $x_n=(-1)^n\tfrac{n}{n+1}$. Garantizar que tiene una subsucesión convergente y exhibir una.`,
      idea: 'Verificar la hipótesis (acotada) para saber que existe; luego, en este caso, se puede dar explícita.',
      pasos: [
        { idea: 'Acotada', detalle: R`<p>$|x_n|=\tfrac n{n+1}<1$ para todo $n$: está acotada.</p>` },
        { idea: 'Aplicar el teorema', detalle: R`<p>Por Bolzano–Weierstrass existe una subsucesión convergente (sin necesidad de construirla).</p>` },
        { idea: 'Una explícita', detalle: R`<p>Los pares: $x_{2k}=\tfrac{2k}{2k+1}=1-\tfrac1{2k+1}\to1$. (Los impares dan $-1$: hay dos límites de subsucesiones, así que $x_n$ no converge.) $\blacksquare$</p>` },
      ],
      conclusion: 'El teorema solo asegura que existe; en la práctica (como en este caso) conviene mirar la estructura de la sucesión y exhibir la subsucesión.',
    },
  },
  {
    n: 'Criterios de convergencia por subsucesiones', ref: 'Práctica 1, Ej. 15–16',
    d: R`<p>Una <em>sub-subsucesión</em> es una subsucesión de una subsucesión. $(a_{2k})$ son los términos pares y $(a_{2k-1})$ los impares.</p>`,
    e: R`(a) Si toda subsucesión de $(a_n)$ tiene una sub-subsucesión que converge a $\ell$, entonces $a_n\to\ell$. (b) Si $(a_{2k})$ y $(a_{2k-1})$ convergen al mismo límite $\ell$, entonces $a_n\to\ell$. (c) Si $(a_{2k})$, $(a_{2k-1})$ y $(a_{3k})$ convergen, entonces $(a_n)$ converge.`,
    p: R`<p>(a) Si $a_n\not\to\ell$, existen $\varepsilon_0>0$ y una subsucesión con $|a_{n_k}-\ell|\ge\varepsilon_0$ para todo $k$. Ninguna sub-subsucesión suya puede tender a $\ell$: contradice la hipótesis.</p>
<p>(b) Dado $\varepsilon$ existen $K_1,K_2$ con $|a_{2k}-\ell|<\varepsilon$ ($k\ge K_1$) y $|a_{2k-1}-\ell|<\varepsilon$ ($k\ge K_2$). Si $n\ge2\max(K_1,K_2)$, $n$ es $2k$ o $2k-1$ con $k\ge\max(K_1,K_2)$.</p>
<p>(c) $(a_{6k})$ es subsucesión de $(a_{2k})$ y de $(a_{3k})$, así que los límites de pares y de $(a_{3k})$ coinciden; $(a_{6k-3})$ es subsucesión de $(a_{2k-1})$ y de $(a_{3k})$, así que coinciden los de impares y de $(a_{3k})$. Los tres límites son iguales y se aplica (b). $\blacksquare$</p>`,
    x: {
      enunciado: R`Sea $a_n=\tfrac1n$ si $n$ es impar y $a_n=\tfrac1{n^2}$ si $n$ es par. Probar que $a_n\to0$ usando subsucesiones pares e impares.`,
      idea: 'Calcular el límite de cada paridad por separado y aplicar (b).',
      pasos: [
        { idea: 'Pares', detalle: R`<p>$a_{2k}=\tfrac1{4k^2}\le\tfrac1k\to0$, así que $a_{2k}\to0$ por sándwich.</p>` },
        { idea: 'Impares', detalle: R`<p>$a_{2k-1}=\tfrac1{2k-1}\le\tfrac1k\to0$.</p>` },
        { idea: 'Conclusión', detalle: R`<p>Ambos límites son $0$: por (b), $a_n\to0$. $\blacksquare$</p>` },
      ],
      conclusion: 'Cuando la fórmula de $a_n$ depende de la paridad, separá en $2k$ y $2k-1$ y recomponé con este criterio.',
    },
  },
  {
    n: 'Condición necesaria de las series', ref: 'Prop. 2.27',
    d: R`<p><strong>Serie:</strong> $\sum_{n\ge1}a_n$ converge si las sumas parciales $S_N=\sum_{n=1}^Na_n$ convergen; entonces $\sum a_n=\lim S_N$.</p>`,
    e: R`Si $\sum a_n$ converge, entonces $a_n\to0$. La recíproca es falsa (serie armónica $\sum\tfrac1n$).`,
    p: R`<p>Si $S_N\to S$, entonces $S_{N-1}\to S$ también y $a_N=S_N-S_{N-1}\to S-S=0$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $\sum_{n\ge1}\dfrac n{n+1}$ diverge.`,
      idea: 'Mostrar que el término general no tiende a $0$ (contrarrecíproca).',
      pasos: [
        { idea: 'Límite del término', detalle: R`<p>$\tfrac n{n+1}=1-\tfrac1{n+1}\to1\ne0$.</p>` },
        { idea: 'Contrarrecíproca', detalle: R`<p>Si la serie convergiera, el término general tendería a $0$. Como no, diverge. $\blacksquare$</p>` },
      ],
      conclusion: 'Sirve solo para <em>descartar</em> convergencia. Si $a_n\\to0$ no se concluye nada: hay que usar otro criterio.',
    },
  },
  {
    n: 'Serie geométrica', ref: 'Def. 2.29, Prop. 2.30',
    d: R`<p>La <strong>serie geométrica</strong> de razón $r\in\mathbb{R}$ es $\sum_{n\ge0}r^n$, con sumas parciales $S_N=1+r+\cdots+r^N$.</p>`,
    e: R`$\sum_{n\ge0}r^n$ converge sii $|r|<1$, y en ese caso suma $\dfrac1{1-r}$.`,
    p: R`<p>Si $r\ne1$, $S_N=\dfrac{1-r^{N+1}}{1-r}$ (multiplicar $S_N$ por $1-r$ y telescopar). Si $|r|<1$, $r^{N+1}\to0$ y $S_N\to\tfrac1{1-r}$. Si $|r|\ge1$, $r^n\not\to0$ y la serie diverge por la condición necesaria. $\blacksquare$</p>`,
    x: {
      enunciado: R`Calcular $\displaystyle\sum_{n\ge1}\frac3{4^n}$ y expresar $0{,}\overline{9}$ como fracción.`,
      idea: 'Reescribir como $c\\,r^k\\sum r^n$ y usar la fórmula.',
      pasos: [
        { idea: 'Reindexar', detalle: R`<p>$\sum_{n\ge1}\tfrac3{4^n}=\tfrac34\sum_{n\ge0}\left(\tfrac14\right)^n$.</p>` },
        { idea: 'Aplicar la fórmula', detalle: R`<p>$|r|=\tfrac14<1$: $\tfrac34\cdot\tfrac1{1-1/4}=\tfrac34\cdot\tfrac43=1$.</p>` },
        { idea: '$0{,}\overline9$', detalle: R`<p>$0{,}999\ldots=\sum_{n\ge1}\tfrac9{10^n}=\tfrac9{10}\cdot\tfrac1{1-1/10}=1$. Por eso el desarrollo decimal de un número no es único. $\blacksquare$</p>` },
      ],
      conclusion: 'La fórmula vale solo si $|r|<1$; chequear esa condición es parte de la respuesta.',
    },
  },
  {
    n: 'Series de términos no negativos: comparación', ref: 'Ej. 2.33, Prop. 2.34, 2.35',
    d: R`<p>Serie de términos no negativos: $a_n\ge0$ para todo $n$ (las sumas parciales $S_N$ forman una sucesión creciente).</p>`,
    e: R`Si $a_n\ge0$: $\sum a_n$ converge sii $(S_N)$ está acotada. <strong>Comparación:</strong> si $0\le a_n\le b_n$ y $\sum b_n$ converge, entonces $\sum a_n$ converge (y si $\sum a_n$ diverge, $\sum b_n$ también). <strong>Por cociente:</strong> si $a_n,b_n>0$ y $a_n/b_n\to L\in(0,\infty)$, ambas series tienen el mismo carácter.`,
    p: R`<p>$(S_N)$ es creciente: converge sii está acotada (monótona). Para la comparación, $\sum_{n\le N}a_n\le\sum_{n\le N}b_n\le\sum b_n$: acotada, luego converge. Por cociente: para $n$ grande $\tfrac L2b_n\le a_n\le2Lb_n$, y se aplica comparación en ambos sentidos. $\blacksquare$</p>`,
    x: {
      enunciado: R`Decidir si convergen (a) $\sum\dfrac1{2^n+n}$ y (b) $\sum\dfrac{n+1}{n\,2^n}$.`,
      idea: 'Comparar con la geométrica $\\sum2^{-n}$, que converge.',
      pasos: [
        { idea: '(a) Acotar', detalle: R`<p>$0<\tfrac1{2^n+n}\le\tfrac1{2^n}$ y $\sum2^{-n}$ converge ($r=\tfrac12$).</p>` },
        { idea: '(a) Concluir', detalle: R`<p>Por comparación, la serie (a) converge.</p>` },
        { idea: '(b) Cociente', detalle: R`<p>Con $b_n=2^{-n}$: $\tfrac{a_n}{b_n}=\tfrac{n+1}n\to1\in(0,\infty)$. Misma conducta que $\sum2^{-n}$: converge. $\blacksquare$</p>` },
      ],
      conclusion: 'Elegí la serie de comparación por el comportamiento dominante del término general (acá, $2^n$ en el denominador).',
    },
  },
];
