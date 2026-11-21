// Resultados clave — Supremos e ínfimos (teórica Cap. 1 · Práctica 1).
// Esquema: { n, ref, d: definiciones formales, e: enunciado, p: demostración, x: ejemplo de uso paso a paso }.
// Los textos usan String.raw: los backslashes de LaTeX se escriben tal cual (una sola barra).
const R = String.raw;

export const SUP_INF = [
  {
    n: 'Axioma de completitud (sup e ínf)', ref: 'Def. 1.4 / Teo. 1.21',
    d: R`<ul>
<li><strong>Acotado superiormente:</strong> $A\subseteq\mathbb{R}$, $A\ne\varnothing$, es acotado superiormente si $\exists c\in\mathbb{R}\ \forall a\in A:\ a\le c$ ($c$ es <em>cota superior</em>). Análogo inferior: $c\le a$.</li>
<li><strong>Supremo:</strong> $s=\sup A$ si (a) $s$ es cota superior de $A$ y (b) para toda cota superior $t$ de $A$, $s\le t$ (la <em>menor</em> cota superior).</li>
<li><strong>Ínfimo:</strong> $i=\inf A$ si (a) $i$ es cota inferior y (b) para toda cota inferior $t$, $t\le i$ (la <em>mayor</em> cota inferior).</li></ul>`,
    e: R`<strong>Axioma:</strong> todo $A\subseteq\mathbb{R}$ no vacío y acotado superiormente tiene supremo en $\mathbb{R}$. <strong>Teorema 1.21:</strong> todo $A\subseteq\mathbb{R}$ no vacío y acotado inferiormente tiene ínfimo. Esto distingue a $\mathbb{R}$ de $\mathbb{Q}$: en $\mathbb{Q}$ el conjunto $\{r:r^2<2\}$ está acotado y no tiene supremo.`,
    p: R`<p>El axioma no se demuestra. Probamos el <strong>Teorema 1.21</strong> a partir de él.</p>
<p>Sea $A\ne\varnothing$ acotado inferiormente por $c$ y $B=-A=\{-a:a\in A\}$. Entonces $B\ne\varnothing$ y $-c$ es cota superior de $B$ (de $c\le a$ sale $-a\le -c$). Por el axioma existe $s=\sup B$. Afirmamos $-s=\inf A$:</p>
<ul><li><em>$-s$ es cota inferior de $A$:</em> para $a\in A$, $-a\in B$, así $-a\le s$, es decir $-s\le a$.</li>
<li><em>Es la mayor:</em> si $t$ es cota inferior de $A$, entonces $-t$ es cota superior de $B$, luego $s\le -t$, o sea $t\le -s$. $\blacksquare$</li></ul>
<p><em>Por qué falla en $\mathbb{Q}$:</em> si $q=\sup\{r\in\mathbb{Q}:r^2<2\}$ existiera en $\mathbb{Q}$, ni $q^2<2$ (se podría agrandar $q$ un poco) ni $q^2>2$ (se podría achicar) son posibles, así que $q^2=2$, pero $\sqrt2\notin\mathbb{Q}$.</p>`,
    x: {
      enunciado: R`Sea $A=\{2+\tfrac1n:n\in\mathbb{N}\}$. Usando el teorema 1.21, justificá que $A$ tiene ínfimo y calculalo.`,
      idea: R`Primero se verifican las hipótesis del teorema (no vacío y acotado inferiormente); eso <em>garantiza</em> que el ínfimo existe. Después se identifica el candidato y se prueba con la definición.`,
      pasos: [
        { idea: 'Hipótesis del teorema', detalle: R`<p>$A\ne\varnothing$ ($3\in A$) y $2$ es cota inferior: $2+\tfrac1n>2$ para todo $n$. Por el Teo. 1.21, existe $\inf A\in\mathbb{R}$.</p>` },
        { idea: 'Candidato', detalle: R`<p>Los elementos se acercan a $2$ sin alcanzarlo: el candidato es $i=2$. Ya sabemos que es cota inferior.</p>` },
        { idea: 'Es la mayor cota inferior', detalle: R`<p>Sea $t>2$. Por Arquímedes existe $n$ con $\tfrac1n<t-2$; entonces $2+\tfrac1n<t$, así que $t$ <em>no</em> es cota inferior. Luego toda cota inferior es $\le2$, y $\inf A=2$ (no es mínimo: $2\notin A$). $\blacksquare$</p>` },
      ],
      conclusion: 'El teorema asegura que el ínfimo existe; encontrar su valor es un trabajo aparte: candidato + las dos condiciones de la definición.',
    },
  },
  {
    n: 'Caracterización $\\varepsilon$ del supremo y del ínfimo', ref: 'Prop. 1.17; Práctica 1, Ej. 3',
    d: R`<p>$s=\sup A$ significa: (a) $\forall a\in A:\ a\le s$ y (b) $\forall t$ cota superior: $s\le t$. La caracterización reemplaza (b) por una condición verificable con elementos de $A$.</p>`,
    e: R`$s=\sup A\iff$ (a) $s$ es cota superior de $A$ y (b) $\forall\varepsilon>0\ \exists a\in A:\ s-\varepsilon<a$. Análogamente, $i=\inf A\iff$ $i\le a\ \forall a\in A$ y $\forall\varepsilon>0\ \exists a\in A:\ a<i+\varepsilon$.`,
    p: R`<p>($\Rightarrow$) Sea $s=\sup A$ y $\varepsilon>0$. Como $s-\varepsilon<s$ y $s$ es la <em>menor</em> cota superior, $s-\varepsilon$ no es cota superior: existe $a\in A$ con $a>s-\varepsilon$.</p>
<p>($\Leftarrow$) Supongamos (a) y (b) y sea $t<s$ (queremos ver que $t$ no es cota superior; así toda cota superior es $\ge s$). Con $\varepsilon=s-t>0$, (b) da $a\in A$ con $a>s-\varepsilon=t$. Luego $t$ no es cota superior, y $s$ es la menor. $\blacksquare$</p>
<p>El ínfimo se prueba igual (o aplicando lo anterior a $-A$).</p>`,
    x: {
      enunciado: R`Probar que $\sup\{\tfrac{n}{n+1}:n\in\mathbb{N}\}=1$.`,
      idea: 'Verificar (a) cota superior y (b) para cada $\\varepsilon$ exhibir un elemento mayor que $1-\\varepsilon$ (el elemento depende de $\\varepsilon$).',
      pasos: [
        { idea: '(a) 1 es cota superior', detalle: R`<p>$\tfrac{n}{n+1}<1$ para todo $n$, pues $n<n+1$.</p>` },
        { idea: '(b) buscar el elemento', detalle: R`<p>Dado $\varepsilon>0$ queremos $\tfrac{n}{n+1}>1-\varepsilon$. Como $\tfrac n{n+1}=1-\tfrac1{n+1}$, equivale a $\tfrac1{n+1}<\varepsilon$, o sea $n+1>\tfrac1\varepsilon$.</p>` },
        { idea: 'Elegir $n$', detalle: R`<p>Por Arquímedes existe $n$ con $n>\tfrac1\varepsilon$; entonces $n+1>\tfrac1\varepsilon$ y $a=\tfrac n{n+1}>1-\varepsilon$. Por la caracterización, $\sup=1$ (no es máximo: $1\notin A$). $\blacksquare$</p>` },
      ],
      conclusion: 'El patrón "traducir $a>s-\\varepsilon$ a una condición sobre $n$ y despejar con Arquímedes" resuelve casi todos los cálculos de supremos.',
    },
  },
  {
    n: 'Una cota que pertenece al conjunto es el máximo', ref: 'Prop. 1.10',
    d: R`<p><strong>Máximo:</strong> $\max A=\sup A$ cuando $\sup A\in A$ (análogo: $\min A=\inf A$ si $\inf A\in A$).</p>`,
    e: R`Si $A$ es no vacío y acotado superiormente, $t$ es cota superior de $A$ y $t\in A$, entonces $t=\sup A=\max A$.`,
    p: R`<p>Por completitud existe $s=\sup A$. Como $t$ es cota superior y $s$ es la menor, $s\le t$. Como $t\in A$ y $s$ es cota superior, $t\le s$. Luego $t=s$, y como $t\in A$, es el máximo. $\blacksquare$</p>`,
    x: {
      enunciado: R`Hallar $\sup$, $\inf$, $\max$ y $\min$ de $A=[0,1)\cup\{2\}$.`,
      idea: 'Buscar cotas que pertenezcan al conjunto (máximo/mínimo inmediatos) y usar la caracterización $\\varepsilon$ cuando no.',
      pasos: [
        { idea: 'Superior', detalle: R`<p>Todo elemento es $\le2$ y $2\in A$: por la proposición, $\sup A=\max A=2$.</p>` },
        { idea: 'Ínfimo', detalle: R`<p>Todo elemento es $\ge0$ y $0\in A$: $\inf A=\min A=0$.</p>` },
        { idea: 'Moraleja', detalle: R`<p>Aunque $A$ "tiene un hueco" entre $1$ y $2$, el $1$ no interviene: $1$ es el supremo de la parte $[0,1)$ pero no de $A$. Los extremos de $A$ son $0$ y $2$. $\blacksquare$</p>` },
      ],
      conclusion: 'Antes de calcular nada con $\\varepsilon$, mirá si alguna cota ya está en el conjunto: te da el máximo/mínimo gratis.',
    },
  },
  {
    n: 'Principio de Arquímedes', ref: 'Teo. 1.11 y Prop. 1.12',
    d: R`<p>$\mathbb{N}=\{1,2,3,\dots\}$. Un conjunto $A$ es <em>acotado superiormente</em> si existe $c$ con $a\le c$ para todo $a\in A$.</p>`,
    e: R`<ol><li>Para todo $x\in\mathbb{R}$ existe $n\in\mathbb{N}$ con $n\ge x$ ($\mathbb{N}$ no está acotado).</li><li>Para todo $y>0$ existe $n\in\mathbb{N}$ con $0<\tfrac1n<y$.</li></ol>`,
    p: R`<p><strong>(1)</strong> Supongamos que $\mathbb{N}$ está acotado superiormente. Por completitud existe $s=\sup\mathbb{N}$. Como $s-1<s$, $s-1$ no es cota superior: existe $n\in\mathbb{N}$ con $n>s-1$, o sea $n+1>s$. Pero $n+1\in\mathbb{N}$, contradiciendo que $s$ es cota superior.</p>
<p><strong>(2)</strong> Como $y>0$, $\tfrac1y\in\mathbb{R}$. Por (1) existe $n>\tfrac1y$, que equivale a $\tfrac1n<y$; además $\tfrac1n>0$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $\inf\{\tfrac1n:n\in\mathbb{N}\}=0$ y encontrar un $n$ tal que $\tfrac1n<0{,}003$.`,
      idea: 'Cota inferior $0$ + el caso (2) de Arquímedes para ver que ningún $t>0$ es cota inferior.',
      pasos: [
        { idea: '0 es cota inferior', detalle: R`<p>$\tfrac1n>0$ para todo $n$.</p>` },
        { idea: 'Ningún $t>0$ lo es', detalle: R`<p>Sea $t>0$. Por Arquímedes (2) existe $n$ con $\tfrac1n<t$, así $t$ no es cota inferior. Luego $\inf=0$.</p>` },
        { idea: 'Caso numérico', detalle: R`<p>$\tfrac1n<0{,}003\iff n>\tfrac1{0{,}003}=333{,}\overline3$. Sirve $n=334$: $\tfrac1{334}\approx0{,}002994<0{,}003$. $\blacksquare$</p>` },
      ],
      conclusion: 'En los ejercicios de límites, "existe $n_0$" se resuelve siempre así: despejar $n>g(\\varepsilon)$ y tomar un natural mayor (Arquímedes).',
    },
  },
  {
    n: 'Parte entera', ref: 'Def. 1.13',
    d: R`<p>$\lfloor x\rfloor$ es el mayor entero $\le x$: $\lfloor x\rfloor=\max\{k\in\mathbb{Z}:k\le x\}$. Equivalente: es el único $k\in\mathbb{Z}$ con $k\le x<k+1$.</p>`,
    e: R`Para todo $x\in\mathbb{R}$ existe un único entero $\lfloor x\rfloor$ con $\lfloor x\rfloor\le x<\lfloor x\rfloor+1$.`,
    p: R`<p><em>Existencia.</em> $A_x=\{k\in\mathbb{Z}:k\le x\}$ es no vacío (por Arquímedes hay $n\ge-x$, entonces $-n\le x$) y está acotado superiormente por $x$. Sea $s=\sup A_x$. Como $s-1$ no es cota superior, existe $k_0\in A_x$ con $k_0>s-1$. Entonces $k_0+1>s$, luego $k_0+1\notin A_x$, es decir $k_0+1>x$. Además $k_0\le x$ por estar en $A_x$.</p>
<p><em>Unicidad.</em> Si $k\le x<k+1$ y $k'\le x<k'+1$, entonces $k<k'+1$ y $k'<k+1$, es decir $k-k'<1$ y $k'-k<1$; siendo enteros, $k=k'$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Probar que $\lfloor x\rfloor+\lfloor y\rfloor\le\lfloor x+y\rfloor\le\lfloor x\rfloor+\lfloor y\rfloor+1$.`,
      idea: 'Sumar las desigualdades que definen cada parte entera y usar la unicidad (o maximalidad) de $\\lfloor x+y\\rfloor$.',
      pasos: [
        { idea: 'Sumar definiciones', detalle: R`<p>De $\lfloor x\rfloor\le x<\lfloor x\rfloor+1$ y $\lfloor y\rfloor\le y<\lfloor y\rfloor+1$ se obtiene $\lfloor x\rfloor+\lfloor y\rfloor\le x+y<\lfloor x\rfloor+\lfloor y\rfloor+2$.</p>` },
        { idea: 'Cota inferior', detalle: R`<p>$m=\lfloor x\rfloor+\lfloor y\rfloor$ es un entero $\le x+y$; como $\lfloor x+y\rfloor$ es el <em>mayor</em> entero $\le x+y$, $m\le\lfloor x+y\rfloor$.</p>` },
        { idea: 'Cota superior', detalle: R`<p>$\lfloor x+y\rfloor\le x+y<m+2$ y es entero, así $\lfloor x+y\rfloor\le m+1$. $\blacksquare$</p>` },
      ],
      conclusion: 'Con $x=y=0{,}5$ se alcanza la cota superior ($0+0\\le\\lfloor1\\rfloor=1\\le0+0+1$): la desigualdad no se puede mejorar.',
    },
  },
  {
    n: 'Densidad de $\\mathbb{Q}$ y de los irracionales', ref: 'Prop. 1.14; Práctica 1, Ej. 2',
    d: R`<p>Un conjunto $D\subseteq\mathbb{R}$ es <em>denso</em> si entre dos reales $x<y$ cualesquiera hay un elemento de $D$: $\exists d\in D:\ x<d<y$.</p>`,
    e: R`Si $x<y$ en $\mathbb{R}$, existe un racional $q$ con $x<q<y$ y existe un irracional $r$ con $x<r<y$.`,
    p: R`<p><strong>Racional.</strong> Como $y-x>0$, existe $n$ con $\tfrac1n<y-x$ (Arquímedes). Sea $m=\lfloor nx\rfloor+1$. Entonces $m-1\le nx<m$, de modo que $\tfrac mn>x$ y $\tfrac mn\le\tfrac{nx+1}n=x+\tfrac1n<y$.</p>
<p><strong>Irracional.</strong> Aplicando lo anterior a $\tfrac x{\sqrt2}<\tfrac y{\sqrt2}$ obtenemos racionales $q_1<q_2$ en ese intervalo (aplicando la densidad dos veces); alguno es $\ne0$, digamos $q$. Entonces $q\sqrt2\in(x,y)$ es irracional (producto de un racional no nulo por un irracional). $\blacksquare$</p>`,
    x: {
      enunciado: R`Encontrar un racional y un irracional entre $0{,}31$ y $0{,}32$ siguiendo la demostración.`,
      idea: 'Aplicar el método paso a paso: elegir $n$ con $1/n<y-x$ y tomar $m=\\lfloor nx\\rfloor+1$.',
      pasos: [
        { idea: 'Elegir $n$', detalle: R`<p>$y-x=0{,}01$; sirve $n=101$ ($\tfrac1{101}<0{,}01$).</p>` },
        { idea: 'Calcular $m$', detalle: R`<p>$nx=101\cdot0{,}31=31{,}31$, $\lfloor nx\rfloor=31$, $m=32$. El racional es $\tfrac{32}{101}\approx0{,}31683$, que está entre $0{,}31$ y $0{,}32$.</p>` },
        { idea: 'Irracional', detalle: R`<p>$0{,}31+\tfrac{\sqrt2}{1000}\approx0{,}31141$: racional más irracional es irracional, y cae dentro del intervalo porque $\tfrac{\sqrt2}{1000}<0{,}01$. $\blacksquare$</p>` },
      ],
      conclusion: 'La densidad es lo que permite construir sucesiones de racionales (o irracionales) que convergen a cualquier real; se usa en continuidad y en clausuras.',
    },
  },
  {
    n: 'Monotonía del supremo y operaciones con conjuntos', ref: 'Práctica 1, Ej. 5–6',
    d: R`<p>$-A=\{-a:a\in A\}$ y $cA=\{ca:a\in A\}$. Si $A\subseteq B$ y $B$ está acotado superiormente, también lo está $A$.</p>`,
    e: R`Sean $\varnothing\ne A\subseteq B$. Si $B$ está acotado superiormente, $\sup A\le\sup B$; si lo está inferiormente, $\inf B\le\inf A$. Además $\inf(-A)=-\sup A$ y, si $c>0$, $\sup(cA)=c\,\sup A$.`,
    p: R`<p><strong>Monotonía.</strong> $\sup B$ es cota superior de $B\supseteq A$, luego de $A$; como $\sup A$ es la menor cota superior de $A$, $\sup A\le\sup B$. (El ínfimo es análogo.)</p>
<p><strong>$\inf(-A)=-\sup A$.</strong> Sea $s=\sup A$. De $a\le s$ sale $-s\le -a$: $-s$ es cota inferior de $-A$. Dado $\varepsilon>0$ existe $a\in A$ con $a>s-\varepsilon$, es decir $-a<-s+\varepsilon$; por la caracterización $\varepsilon$, $-s=\inf(-A)$.</p>
<p><strong>$\sup(cA)=c\sup A$ ($c>0$).</strong> De $a\le s$ sale $ca\le cs$. Dado $\varepsilon>0$, tomo $a>s-\tfrac\varepsilon c$; entonces $ca>cs-\varepsilon$. Por la caracterización, $cs=\sup(cA)$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Sea $A=\{1-\tfrac1n:n\in\mathbb{N}\}$ (con $\sup A=1$). Calcular $\sup(2A)$ e $\inf(-2A)$ sin repetir la caracterización $\varepsilon$.`,
      idea: 'Reducir a $\\sup A$ con las reglas de la proposición.',
      pasos: [
        { idea: '$\\sup(2A)$', detalle: R`<p>Con $c=2>0$: $\sup(2A)=2\sup A=2$.</p>` },
        { idea: '$\\inf(-2A)$', detalle: R`<p>$-2A=-(2A)$, así $\inf(-2A)=-\sup(2A)=-2$.</p>` },
        { idea: 'Control directo', detalle: R`<p>$-2A=\{-2+\tfrac2n\}$: sus elementos son $>-2$ y se acercan a $-2$. Coincide. $\blacksquare$</p>` },
      ],
      conclusion: 'Estas reglas evitan repetir el argumento $\\varepsilon$ cada vez: se reducen conjuntos nuevos a conjuntos cuyo supremo ya conocés.',
    },
  },
  {
    n: 'Si $x<y+\\varepsilon$ para todo $\\varepsilon>0$, entonces $x\\le y$', ref: 'Práctica 1, Ej. 1',
    d: R`<p>La cuantificación es sobre <em>todo</em> $\varepsilon>0$ (tan chico como se quiera): $\forall\varepsilon>0:\ x<y+\varepsilon$.</p>`,
    e: R`Si $x<y+\varepsilon$ para todo $\varepsilon>0$, entonces $x\le y$. En consecuencia, si $|x-y|<\varepsilon$ para todo $\varepsilon>0$, entonces $x=y$.`,
    p: R`<p>Por el absurdo: si $x>y$, tomo $\varepsilon=\tfrac{x-y}2>0$. Por hipótesis $x<y+\varepsilon=\tfrac{x+y}2<x$ (porque $\tfrac{x+y}2<x\iff y<x$), absurdo. Para la segunda parte, $|x-y|<\varepsilon$ da $x<y+\varepsilon$ e $y<x+\varepsilon$ para todo $\varepsilon$; por lo anterior, $x\le y$ e $y\le x$. $\blacksquare$</p>`,
    x: {
      enunciado: R`Sea $x\ge0$ tal que $x\le\tfrac1n$ para todo $n\in\mathbb{N}$. Probar que $x=0$.`,
      idea: 'Convertir "para todo $n$" en "para todo $\\varepsilon$" con Arquímedes y aplicar el resultado.',
      pasos: [
        { idea: 'Pasar a $\\varepsilon$', detalle: R`<p>Dado $\varepsilon>0$ existe $n$ con $\tfrac1n<\varepsilon$ (Arquímedes). Entonces $x\le\tfrac1n<\varepsilon=0+\varepsilon$.</p>` },
        { idea: 'Aplicar el resultado', detalle: R`<p>$x<0+\varepsilon$ para todo $\varepsilon>0$ implica $x\le0$. Como $x\ge0$, $x=0$. $\blacksquare$</p>` },
      ],
      conclusion: 'Este es el mecanismo de todos los "pasos al límite": una cantidad no negativa más chica que cualquier $\\varepsilon$ es cero.',
    },
  },
];
