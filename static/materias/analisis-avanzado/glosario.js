// materias/analisis-avanzado/glosario.js — diccionario de definiciones formales.
//
// Cada entrada: { nombre, alias: [fragmentos de regex], def: HTML + LaTeX }.
// Los términos de las demostraciones y de los ejemplos de uso se subrayan automáticamente (utils/glosario.js)
// y al hacer clic muestran `def` en un popup. Para sumar un término: agregá una entrada acá; nada más.
// Los alias no deben tener grupos de captura (usá (?:...)); se buscan sin distinguir mayúsculas.
const R = String.raw;

export const GLOSARIO = {
  // ------------------------------------------------------------------ Fundamentos de ℝ
  'cota-sup': {
    nombre: 'Cota superior / acotado superiormente',
    alias: ['cotas? superior(?:es)?', 'acotad[oa]s? superiormente'],
    def: R`<p>Sea $A\subseteq\mathbb{R}$. Un número $c$ es <strong>cota superior</strong> de $A$ si $\forall a\in A:\ a\le c$. $A$ está <strong>acotado superiormente</strong> si tiene alguna cota superior.</p>`,
  },
  'cota-inf': {
    nombre: 'Cota inferior / acotado inferiormente',
    alias: ['cotas? inferior(?:es)?', 'acotad[oa]s? inferiormente'],
    def: R`<p>Sea $A\subseteq\mathbb{R}$. Un número $c$ es <strong>cota inferior</strong> de $A$ si $\forall a\in A:\ c\le a$. $A$ está <strong>acotado inferiormente</strong> si tiene alguna cota inferior.</p>`,
  },
  'supremo': {
    nombre: 'Supremo',
    alias: ['supremos?'],
    def: R`<p>$s=\sup A$ si (a) $s$ es cota superior de $A$ y (b) para toda cota superior $t$ de $A$ vale $s\le t$ (es la <em>menor</em> cota superior).</p>
<p>Caracterización $\varepsilon$: $s=\sup A\iff s$ es cota superior y $\forall\varepsilon>0\ \exists a\in A:\ s-\varepsilon<a$.</p>`,
  },
  'infimo': {
    nombre: 'Ínfimo',
    alias: ['ínfimos?', 'infimos?'],
    def: R`<p>$i=\inf A$ si (a) $i$ es cota inferior de $A$ y (b) para toda cota inferior $t$ de $A$ vale $t\le i$ (es la <em>mayor</em> cota inferior).</p>
<p>Caracterización $\varepsilon$: $i=\inf A\iff i$ es cota inferior y $\forall\varepsilon>0\ \exists a\in A:\ a<i+\varepsilon$.</p>`,
  },
  'maximo': {
    nombre: 'Máximo',
    alias: ['máximos?', 'maximos?'],
    def: R`<p>$\max A$ es el $a\in A$ tal que $\forall x\in A:\ x\le a$. Existe sii $\sup A\in A$, y en ese caso $\max A=\sup A$.</p>`,
  },
  'minimo': {
    nombre: 'Mínimo',
    alias: ['mínimos?', 'minimos?'],
    def: R`<p>$\min A$ es el $a\in A$ tal que $\forall x\in A:\ a\le x$. Existe sii $\inf A\in A$, y en ese caso $\min A=\inf A$.</p>`,
  },
  'completitud': {
    nombre: 'Completitud',
    alias: ['axioma de completitud', 'axioma del supremo', 'complet[oa]s?', 'completitud'],
    def: R`<p><strong>En $\mathbb{R}$ (axioma):</strong> todo $A\subseteq\mathbb{R}$ no vacío y acotado superiormente tiene supremo en $\mathbb{R}$.</p>
<p><strong>En un espacio métrico:</strong> $(M,d)$ es <em>completo</em> si toda sucesión de Cauchy en $M$ converge a un punto de $M$.</p>`,
  },
  'arquimedes': {
    nombre: 'Principio de Arquímedes',
    alias: ['Arquímedes', 'principio arquimediano', 'propiedad arquimediana'],
    def: R`<p>(1) $\forall x\in\mathbb{R}\ \exists n\in\mathbb{N}:\ n\ge x$ ($\mathbb{N}$ no está acotado superiormente).</p>
<p>(2) $\forall y>0\ \exists n\in\mathbb{N}:\ 0<\tfrac1n<y$.</p>`,
  },
  'sucesion': {
    nombre: 'Sucesión',
    alias: ['sucesi(?:ón|ones)', 'sucesion(?:es)?'],
    def: R`<p>Una <strong>sucesión</strong> en un conjunto $M$ es una función $\mathbb{N}\to M$, $n\mapsto x_n$. Se la escribe $(x_n)_{n\in\mathbb{N}}$.</p>`,
  },
  'limite': {
    nombre: 'Límite / sucesión convergente',
    alias: ['límites?', 'limites?', 'convergentes?', 'convergencia', 'converg(?:e|en|er|ía|ieron)'],
    def: R`<p>$(x_n)\subseteq(M,d)$ <strong>converge</strong> a $x\in M$ (y se escribe $x_n\to x$) si
$$\forall\varepsilon>0\ \exists n_0\in\mathbb{N}\ \forall n\ge n_0:\ d(x_n,x)<\varepsilon.$$
En $\mathbb{R}$, $d(x_n,x)=|x_n-x|$. El límite, si existe, es único.</p>`,
  },
  'subsucesion': {
    nombre: 'Subsucesión',
    alias: ['subsucesi(?:ón|ones)', 'subsucesion(?:es)?'],
    def: R`<p>Una <strong>subsucesión</strong> de $(x_n)$ es $(x_{n_k})_{k}$ con $n_1<n_2<n_3<\cdots$ (índices estrictamente crecientes).</p>`,
  },
  'monotona': {
    nombre: 'Sucesión monótona',
    alias: ['mon[óo]tonas?', 'mon[óo]tonos?'],
    def: R`<p>$(x_n)\subseteq\mathbb{R}$ es <strong>creciente</strong> si $x_n\le x_{n+1}$ para todo $n$, y <strong>decreciente</strong> si $x_n\ge x_{n+1}$. <strong>Monótona</strong> = creciente o decreciente. Toda monótona y acotada converge (a su $\sup$ si crece, a su $\inf$ si decrece).</p>`,
  },
  'bolzano': {
    nombre: 'Teorema de Bolzano–Weierstrass',
    alias: ['Bolzano[–-]Weierstrass'],
    def: R`<p>Toda sucesión acotada en $\mathbb{R}$ (o en $\mathbb{R}^n$) tiene una subsucesión convergente.</p>`,
  },
  'serie': {
    nombre: 'Serie',
    alias: ['series?', 'sumas? parciales?'],
    def: R`<p>La <strong>serie</strong> $\sum_{n\ge1}a_n$ es la sucesión de sumas parciales $S_N=\sum_{n=1}^{N}a_n$. Converge si $(S_N)$ converge, y su suma es $\lim S_N$.</p>`,
  },

  // ------------------------------------------------------------------ Cardinalidad
  'funcion-inversa': {
    nombre: 'Función inversa',
    alias: ['inversas?'],
    def: R`<p>Si $f:A\to B$, una <strong>inversa</strong> es $g:B\to A$ con $g(f(a))=a\ \forall a\in A$ y $f(g(b))=b\ \forall b\in B$. Existe sii $f$ es biyectiva, y entonces es única: $f^{-1}$.</p>`,
  },
  'imagen': {
    nombre: 'Imagen',
    alias: ['imágenes', 'imagen', 'imagenes'],
    def: R`<p>Para $f:X\to Y$ y $A\subseteq X$: $f(A)=\{f(a):a\in A\}=\{y\in Y:\exists a\in A,\ f(a)=y\}$.</p>`,
  },
  'preimagen': {
    nombre: 'Preimagen',
    alias: ['preimágenes', 'preimagen', 'preimagenes'],
    def: R`<p>Para $f:X\to Y$ y $C\subseteq Y$: $f^{-1}(C)=\{x\in X:\ f(x)\in C\}$. (Es un conjunto, y no requiere que $f$ sea inversible.)</p>`,
  },
  'inyectiva': {
    nombre: 'Función inyectiva',
    alias: ['inyectivas?', 'inyecci(?:ón|ones)', 'inyectividad'],
    def: R`<p>$f:A\to B$ es <strong>inyectiva</strong> si $\forall x,y\in A:\ f(x)=f(y)\Rightarrow x=y$.</p>`,
  },
  'sobreyectiva': {
    nombre: 'Función sobreyectiva',
    alias: ['sobreyectiv[ao]s?', 'suryectiv[ao]s?', 'sobreyecci(?:ón|ones)', 'sobreyectividad'],
    def: R`<p>$f:A\to B$ es <strong>sobreyectiva</strong> si $\forall b\in B\ \exists a\in A:\ f(a)=b$, es decir $f(A)=B$.</p>`,
  },
  'biyeccion': {
    nombre: 'Biyección',
    alias: ['biyecci(?:ón|ones)', 'biyectiv[ao]s?'],
    def: R`<p>$f:A\to B$ es <strong>biyectiva</strong> si es inyectiva y sobreyectiva: $\forall b\in B\ \exists!\,a\in A:\ f(a)=b$.</p>`,
  },
  'coordinables': {
    nombre: 'Conjuntos coordinables (equipotentes)',
    alias: ['coordinables?', 'equipotentes?', 'equipotencia', 'coordinabilidad'],
    def: R`<p>$A\sim B$ (<strong>coordinables</strong>, o de igual cardinal) si existe una biyección $f:A\to B$. Es una relación de equivalencia entre conjuntos.</p>`,
  },
  'relacion-equivalencia': {
    nombre: 'Relación de equivalencia',
    alias: ['relaci(?:ón|ones) de equivalencia'],
    def: R`<p>Una relación $\sim$ en $X$ es de <strong>equivalencia</strong> si es (R) reflexiva: $x\sim x$; (S) simétrica: $x\sim y\Rightarrow y\sim x$; (T) transitiva: $x\sim y,\ y\sim z\Rightarrow x\sim z$.</p>`,
  },
  'finito': {
    nombre: 'Conjunto finito',
    alias: ['finit[oa]s?'],
    def: R`<p>$A$ es <strong>finito</strong> si $A=\varnothing$ o $A\sim\{1,\dots,n\}$ para algún $n\in\mathbb{N}$ (tiene $n$ elementos).</p>`,
  },
  'infinito': {
    nombre: 'Conjunto infinito',
    alias: ['infinit[oa]s?'],
    def: R`<p>$A$ es <strong>infinito</strong> si no es finito: para toda lista finita $a_1,\dots,a_n$ se tiene $A\setminus\{a_1,\dots,a_n\}\ne\varnothing$.</p>`,
  },
  'numerable': {
    nombre: 'Conjunto numerable',
    alias: ['numerables?', 'numerabilidad'],
    def: R`<p>$A$ es <strong>numerable</strong> si $A\sim\mathbb{N}$ (existe una biyección $\mathbb{N}\to A$); su cardinal es $\aleph_0$. Equivale a poder enumerarlo sin repetir: $A=\{a_1,a_2,a_3,\dots\}$.</p>`,
  },
  'contable': {
    nombre: 'Conjunto contable',
    alias: ['contables?'],
    def: R`<p>$A$ es <strong>contable</strong> si es finito o numerable (equivale a existir una inyección $A\to\mathbb{N}$).</p>`,
  },
  'no-numerable': {
    nombre: 'Conjunto no numerable',
    alias: ['no numerables?'],
    def: R`<p>$A$ es <strong>no numerable</strong> si es infinito y no es numerable, es decir, si no existe una biyección $\mathbb{N}\to A$. Ejemplo: $\mathbb{R}$.</p>`,
  },
  'cardinal': {
    nombre: 'Cardinal',
    alias: ['cardinales', 'cardinal', 'cardinalidad', 'continuo'],
    def: R`<p>El <strong>cardinal</strong> $|A|$ (o $\#A$) es la "clase de tamaño" de $A$: $|A|=|B|\iff A\sim B$, y $|A|\le|B|$ si existe una inyección $A\to B$. $|\mathbb{N}|=\aleph_0$; el <strong>cardinal del continuo</strong> es $c=|\mathbb{R}|$, con $\aleph_0<c$.</p>`,
  },
  'partes': {
    nombre: 'Conjunto de partes',
    alias: ['conjunto de partes', 'conjunto potencia', 'partes de'],
    def: R`<p>$\mathcal{P}(A)=\{B:B\subseteq A\}$ es el conjunto de todos los subconjuntos de $A$. Si $A$ tiene $n$ elementos, $\mathcal{P}(A)$ tiene $2^n$.</p>`,
  },
  'teo-cantor': {
    nombre: 'Teorema de Cantor',
    alias: ['teorema de Cantor'],
    def: R`<p>Para todo conjunto $A$ no existe una sobreyección $A\to\mathcal{P}(A)$; en particular $|A|<|\mathcal{P}(A)|$.</p>`,
  },
  'diagonal': {
    nombre: 'Argumento diagonal de Cantor',
    alias: ['argumento diagonal', 'diagonal de Cantor', 'desarrollos? decimal(?:es)? propios?', 'diagonal'],
    def: R`<p>Dada una lista $x_1,x_2,\dots$ en $[0,1)$ con desarrollos decimales propios (sin cola de $9$), se construye $y$ cambiando el dígito $k$-ésimo de $x_k$, con dígitos fuera de $\{0,9\}$. Entonces $y\in[0,1)$ y $y\ne x_k\ \forall k$: ninguna lista agota $[0,1)$.</p>`,
  },
  'schroder': {
    nombre: 'Teorema de Schröder–Bernstein',
    alias: ['Schr(?:ö|o)der[–-]Bernstein', 'Cantor[–-]Bernstein'],
    def: R`<p>Si existen inyecciones $f:A\to B$ y $g:B\to A$, entonces existe una biyección $A\to B$. Es decir: $|A|\le|B|$ y $|B|\le|A|$ implican $|A|=|B|$.</p>`,
  },

  // ------------------------------------------------------------------ Espacios métricos
  'metrica': {
    nombre: 'Métrica (distancia)',
    alias: ['métricas?', 'metricas?'],
    def: R`<p>Una <strong>métrica</strong> en $E$ es $d:E\times E\to\mathbb{R}$ tal que $\forall x,y,z\in E$: (M1) $d(x,y)=0\iff x=y$; (M2) $d(x,y)=d(y,x)$; (M3) $d(x,z)\le d(x,y)+d(y,z)$. De estos axiomas se deduce $d\ge0$.</p>`,
  },
  'espacio-metrico': {
    nombre: 'Espacio métrico',
    alias: ['espacios? métricos?', 'espacios? metricos?'],
    def: R`<p>Un <strong>espacio métrico</strong> es un par $(E,d)$ donde $E$ es un conjunto y $d$ una métrica en $E$.</p>`,
  },
  'triangular': {
    nombre: 'Desigualdad triangular',
    alias: ['desigualdad triangular', 'triangular'],
    def: R`<p>En un espacio métrico: $\forall x,y,z:\ d(x,z)\le d(x,y)+d(y,z)$. En $\mathbb{R}$: $|a+b|\le|a|+|b|$. Consecuencia: $|d(x,z)-d(y,z)|\le d(x,y)$.</p>`,
  },
  'cauchy-schwarz': {
    nombre: 'Desigualdad de Cauchy–Schwarz',
    alias: ['Cauchy[–-]Schwarz'],
    def: R`<p>Para $u,v\in\mathbb{R}^n$: $\Big|\sum_{i}u_iv_i\Big|\le\Big(\sum_iu_i^2\Big)^{1/2}\Big(\sum_iv_i^2\Big)^{1/2}$.</p>`,
  },
  'bola': {
    nombre: 'Bola abierta y cerrada',
    alias: ['bolas? abiertas?', 'bolas? cerradas?', 'bolas?'],
    def: R`<p>En $(E,d)$, con $x\in E$ y $r>0$: <strong>bola abierta</strong> $B(x,r)=\{y\in E:\ d(x,y)<r\}$; <strong>bola cerrada</strong> $\overline B(x,r)=\{y\in E:\ d(x,y)\le r\}$.</p>`,
  },
  'abierto': {
    nombre: 'Conjunto abierto',
    alias: ['abiert[oa]s?'],
    def: R`<p>$U\subseteq E$ es <strong>abierto</strong> si $\forall x\in U\ \exists r>0:\ B(x,r)\subseteq U$. (Todo punto de $U$ tiene una bola entera dentro de $U$.)</p>`,
  },
  'cerrado': {
    nombre: 'Conjunto cerrado',
    alias: ['cerrad[oa]s?'],
    def: R`<p>$F\subseteq E$ es <strong>cerrado</strong> si $E\setminus F$ es abierto. Equivale a: si $(x_n)\subseteq F$ y $x_n\to x$ en $E$, entonces $x\in F$ (contiene los límites de sus sucesiones convergentes). "Cerrado" no es lo opuesto de "abierto".</p>`,
  },
  'interior': {
    nombre: 'Interior',
    alias: ['interior(?:es)?'],
    def: R`<p>$A^\circ=\{x\in E:\ \exists r>0,\ B(x,r)\subseteq A\}$: el mayor abierto contenido en $A$.</p>`,
  },
  'clausura': {
    nombre: 'Clausura (adherencia)',
    alias: ['clausuras?', 'adherencia'],
    def: R`<p>$\overline A=\{x\in E:\ \forall r>0,\ B(x,r)\cap A\ne\varnothing\}$. Equivale a: $x\in\overline A\iff\exists(x_n)\subseteq A$ con $x_n\to x$. Es el menor cerrado que contiene a $A$.</p>`,
  },
  'frontera': {
    nombre: 'Frontera',
    alias: ['fronteras?'],
    def: R`<p>$\partial A=\overline A\setminus A^\circ$: los $x$ tales que toda bola $B(x,r)$ corta a $A$ y a $E\setminus A$.</p>`,
  },
  'acumulacion': {
    nombre: 'Punto de acumulación',
    alias: ['puntos? de acumulaci(?:ón|ones)', 'puntos? de acumulacion'],
    def: R`<p>$x$ es <strong>punto de acumulación</strong> de $A$ si $\forall r>0:\ \big(B(x,r)\setminus\{x\}\big)\cap A\ne\varnothing$. Al conjunto de ellos se lo llama derivado $A'$.</p>`,
  },
  'aislado': {
    nombre: 'Punto aislado',
    alias: ['puntos? aislados?'],
    def: R`<p>$a\in A$ es <strong>aislado</strong> en $A$ si $\exists r>0:\ B(a,r)\cap A=\{a\}$ (no es punto de acumulación de $A$).</p>`,
  },
  'denso': {
    nombre: 'Conjunto denso',
    alias: ['dens[oa]s?', 'densidad'],
    def: R`<p>$D\subseteq E$ es <strong>denso</strong> si $\overline D=E$; es decir, todo punto de $E$ es límite de una sucesión de $D$ (toda bola de $E$ corta a $D$).</p>`,
  },
  'acotado': {
    nombre: 'Conjunto acotado',
    alias: ['acotad[oa]s?', 'acotaci(?:ón)'],
    def: R`<p>$A\subseteq(E,d)$ es <strong>acotado</strong> si está contenido en alguna bola: $\exists x_0\in E,\ r>0:\ A\subseteq B(x_0,r)$. En $\mathbb{R}$: $\exists M\ \forall a\in A:\ |a|\le M$.</p>`,
  },
  'diametro': {
    nombre: 'Diámetro',
    alias: ['diámetros?', 'diametros?'],
    def: R`<p>$\operatorname{diam}(A)=\sup\{d(x,y):\ x,y\in A\}$.</p>`,
  },
  'discreta': {
    nombre: 'Métrica discreta',
    alias: ['discret[oa]s?'],
    def: R`<p>La <strong>métrica discreta</strong> en $E$ es $\delta(x,y)=0$ si $x=y$ y $\delta(x,y)=1$ si $x\ne y$. Allí $B(x,\tfrac12)=\{x\}$: todo conjunto es abierto y cerrado.</p>`,
  },
  'equivalentes': {
    nombre: 'Métricas equivalentes',
    alias: ['métricas equivalentes', 'metricas equivalentes'],
    def: R`<p>Dos métricas $d_1,d_2$ en $E$ son <strong>equivalentes</strong> si inducen los mismos abiertos; en particular, las mismas sucesiones convergentes. Basta que existan $\alpha,\beta>0$ con $\alpha\,d_1\le d_2\le\beta\,d_1$.</p>`,
  },
  'cauchy': {
    nombre: 'Sucesión de Cauchy',
    alias: ['(?:sucesiones? )?de Cauchy', 'Cauchy'],
    def: R`<p>$(x_n)\subseteq(M,d)$ es <strong>de Cauchy</strong> si
$$\forall\varepsilon>0\ \exists n_0\ \forall n,m\ge n_0:\ d(x_n,x_m)<\varepsilon.$$
Toda convergente es de Cauchy; la recíproca vale solo en espacios completos.</p>`,
  },

  // ------------------------------------------------------------------ Continuidad
  'continua': {
    nombre: 'Función continua',
    alias: ['continu[oa]s?', 'continuidad'],
    def: R`<p>$f:(M,d)\to(N,d')$ es <strong>continua en $x$</strong> si
$$\forall\varepsilon>0\ \exists\delta>0\ \forall y\in M:\ d(x,y)<\delta\Rightarrow d'(f(x),f(y))<\varepsilon.$$
Equivale a: $x_n\to x\Rightarrow f(x_n)\to f(x)$. Es <strong>continua</strong> si lo es en todo punto.</p>`,
  },
  'uc': {
    nombre: 'Continuidad uniforme',
    alias: ['uniformemente continu[oa]s?', 'continuidad uniforme', 'UC'],
    def: R`<p>$f:(M,d)\to(N,d')$ es <strong>uniformemente continua</strong> si
$$\forall\varepsilon>0\ \exists\delta>0\ \forall x,y\in M:\ d(x,y)<\delta\Rightarrow d'(f(x),f(y))<\varepsilon.$$
Acá $\delta$ depende solo de $\varepsilon$, no del punto.</p>`,
  },
  'lipschitz': {
    nombre: 'Función Lipschitz',
    alias: ['Lipschitz(?:iana)?', 'lipschitzianas?'],
    def: R`<p>$f:(M,d)\to(N,d')$ es <strong>Lipschitz</strong> si $\exists C\ge0\ \forall x,y\in M:\ d'(f(x),f(y))\le C\,d(x,y)$.</p>`,
  },
  'homeomorfismo': {
    nombre: 'Homeomorfismo',
    alias: ['homeomorfismos?'],
    def: R`<p>$f:M\to N$ es un <strong>homeomorfismo</strong> si es biyectiva, continua y su inversa $f^{-1}$ es continua.</p>`,
  },
  'isometria': {
    nombre: 'Isometría',
    alias: ['isometr(?:ía|ías|ia|ias)'],
    def: R`<p>$f:M\to N$ es una <strong>isometría</strong> si $d'(f(x),f(y))=d(x,y)$ para todos $x,y\in M$.</p>`,
  },

  // ------------------------------------------------------------------ Compacidad y punto fijo
  'compacto': {
    nombre: 'Conjunto compacto',
    alias: ['compact[oa]s?', 'compacidad'],
    def: R`<p>$K\subseteq M$ es <strong>compacto</strong> (secuencialmente) si toda sucesión $(x_n)\subseteq K$ tiene una subsucesión $x_{n_k}\to x$ con $x\in K$. En espacios métricos equivale a: todo cubrimiento por abiertos de $K$ tiene un subcubrimiento finito.</p>`,
  },
  'cubrimiento': {
    nombre: 'Cubrimiento por abiertos',
    alias: ['(?:sub|re)?cubrimientos?'],
    def: R`<p>Un <strong>cubrimiento por abiertos</strong> de $K$ es una familia $\{U_i\}_{i\in I}$ de abiertos con $K\subseteq\bigcup_iU_i$. Un <strong>subcubrimiento finito</strong> es una cantidad finita $U_{i_1},\dots,U_{i_m}$ que sigue cubriendo $K$.</p>`,
  },
  'heine-borel': {
    nombre: 'Teorema de Heine–Borel',
    alias: ['Heine[–-]Borel'],
    def: R`<p>$K\subseteq\mathbb{R}^n$ es compacto $\iff$ $K$ es cerrado y acotado.</p>`,
  },
  'weierstrass': {
    nombre: 'Teorema de Weierstrass',
    alias: ['Weierstrass'],
    def: R`<p>Si $K$ es compacto no vacío y $f:K\to\mathbb{R}$ es continua, entonces $f$ alcanza máximo y mínimo: $\exists x_1,x_2\in K\ \forall x\in K:\ f(x_1)\le f(x)\le f(x_2)$.</p>`,
  },
  'contraccion': {
    nombre: 'Contracción',
    alias: ['contracci(?:ón|ones)', 'contractiv[ao]s?'],
    def: R`<p>$f:M\to M$ es una <strong>contracción</strong> si $\exists\alpha\in(0,1)\ \forall x,y\in M:\ d(f(x),f(y))\le\alpha\,d(x,y)$. La constante $\alpha<1$ es fija: no depende de $x$ ni de $y$.</p>`,
  },
  'punto-fijo': {
    nombre: 'Punto fijo',
    alias: ['puntos? fijos?'],
    def: R`<p>$x^\ast$ es un <strong>punto fijo</strong> de $f:M\to M$ si $f(x^\ast)=x^\ast$.</p>`,
  },
  'banach': {
    nombre: 'Teorema del punto fijo de Banach',
    alias: ['teorema (?:del punto fijo )?de Banach', 'Banach'],
    def: R`<p>Si $(M,d)$ es un espacio métrico completo no vacío y $f:M\to M$ es una contracción, entonces $f$ tiene un único punto fijo $x^\ast$, y para todo $x_0\in M$ la sucesión $x_{n+1}=f(x_n)$ converge a $x^\ast$.</p>`,
  },
  'iteradas': {
    nombre: 'Iteración / iteradas',
    alias: ['iteradas?', 'iteraci(?:ón|ones)'],
    def: R`<p>Las <strong>iteradas</strong> de $f$ son $f^{n}=f\circ\cdots\circ f$ ($n$ veces). La <strong>iteración</strong> desde $x_0$ es $x_{n+1}=f(x_n)$, es decir $x_n=f^n(x_0)$.</p>`,
  },

  // ------------------------------------------------------------------ Normados y funciones
  'norma': {
    nombre: 'Norma',
    alias: ['normas?'],
    def: R`<p>Una <strong>norma</strong> en un espacio vectorial $V$ es $\|\cdot\|:V\to\mathbb{R}$ con (N1) $\|x\|=0\iff x=0$; (N2) $\|\lambda x\|=|\lambda|\,\|x\|$; (N3) $\|x+y\|\le\|x\|+\|y\|$. Induce la métrica $d(x,y)=\|x-y\|$.</p>`,
  },
  'espacio-normado': {
    nombre: 'Espacio normado',
    alias: ['espacios? normados?'],
    def: R`<p>Un <strong>espacio normado</strong> es un espacio vectorial $V$ con una norma $\|\cdot\|$ (con la métrica $d(x,y)=\|x-y\|$).</p>`,
  },
  'espacio-banach': {
    nombre: 'Espacio de Banach',
    alias: ['espacios? de Banach'],
    def: R`<p>Un <strong>espacio de Banach</strong> es un espacio normado completo: toda sucesión de Cauchy (para $d(x,y)=\|x-y\|$) converge.</p>`,
  },
  'operador': {
    nombre: 'Operador lineal',
    alias: ['operadores? lineales?', 'operadores?', 'transformaci(?:ón|ones) lineales?'],
    def: R`<p>$T:V\to W$ es <strong>lineal</strong> si $T(\lambda x+\mu y)=\lambda T(x)+\mu T(y)$. Entre espacios normados es <strong>acotado</strong> si $\exists C\ \forall x:\ \|Tx\|\le C\|x\|$; entonces $\|T\|=\sup_{\|x\|\le1}\|Tx\|$, y acotado $\iff$ continuo.</p>`,
  },
  'conv-puntual': {
    nombre: 'Convergencia puntual',
    alias: ['convergencia puntual', 'puntualmente', 'puntual'],
    def: R`<p>$f_n\to f$ <strong>puntualmente</strong> en $X$ si $\forall x\in X\ \forall\varepsilon>0\ \exists n_0\ \forall n\ge n_0:\ d(f_n(x),f(x))<\varepsilon$. Acá $n_0$ <em>puede depender de $x$</em>.</p>`,
  },
  'conv-uniforme': {
    nombre: 'Convergencia uniforme',
    alias: ['convergencia uniforme', 'convergen? uniformemente', 'uniformemente', 'uniforme'],
    def: R`<p>$f_n\Rightarrow f$ <strong>uniformemente</strong> en $X$ si $\forall\varepsilon>0\ \exists n_0\ \forall n\ge n_0\ \forall x\in X:\ d(f_n(x),f(x))<\varepsilon$. El mismo $n_0$ sirve para todo $x$. Equivale a $\sup_{x\in X}d(f_n(x),f(x))\to0$.</p>`,
  },
  'criterio-m': {
    nombre: 'Criterio M de Weierstrass',
    alias: ['criterio M(?: de Weierstrass)?'],
    def: R`<p>Si $|u_n(x)|\le M_n$ para todo $x\in D$ y $\sum M_n<\infty$, entonces $\sum u_n$ converge absoluta y uniformemente en $D$.</p>`,
  },
};
