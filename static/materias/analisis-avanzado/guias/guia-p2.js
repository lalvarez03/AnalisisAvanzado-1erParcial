// utils/guia-p2.js — Práctica 2 resuelta (Cardinalidad).
// Demostraciones con lemas explícitos y justificación de cada premisa.

import { consigna } from '../ejercicios.js';

const E = (n) => consigna(2, n);

// Lemas de referencia que se citan a lo largo de la práctica.
const LEMAS = `<p><strong>Convenciones y lemas usados en la práctica:</strong></p>
<ul>
<li><strong>(L1) Producto de numerables.</strong> $\\mathbb{N}\\times\\mathbb{N}$ es numerable (recorrido diagonal). En consecuencia $\\mathbb{Z}$ y $\\mathbb{Q}$ son numerables.</li>
<li><strong>(L2) Sobreyección desde $\\mathbb{N}$.</strong> Si existe una sobreyección $\\mathbb{N}\\to X$ con $X$ infinito, entonces $X$ es numerable (se extrae una biyección eligiendo el primer índice nuevo en cada paso).</li>
<li><strong>(L3) Cantor–Schröder–Bernstein (CSB).</strong> Si hay inyecciones $A\\hookrightarrow B$ y $B\\hookrightarrow A$, entonces $A\\sim B$.</li>
<li><strong>(L4) Cantor.</strong> $[0,1)$ no es numerable; su cardinal es $c=2^{\\aleph_0}$, y $\\{0,1\\}^{\\mathbb{N}}\\sim\\mathcal{P}(\\mathbb{N})\\sim\\mathbb{R}$.</li>
</ul>`;

const BASE_P2 = [
  {
    fuente: 'Práctica 2 · Ej. 1', enunciado: E(1),
    idea: 'En cada caso se exhibe una biyección explícita con un conjunto de cardinal conocido, o se lo reconoce como subconjunto infinito de un numerable.',
    pasos: [
      { idea: 'Lemas de la práctica', detalle: LEMAS },
      {
        idea: '(a) $\\mathbb{Z}_{\\le -3}$',
        detalle: '<p>La función $f:\\mathbb{N}\\to\\mathbb{Z}_{\\le -3}$, $f(n) = -(n+2)$, es biyectiva (inversa $m \\mapsto -m-2$). Luego $\\#\\mathbb{Z}_{\\le -3} = \\aleph_0$.</p>',
      },
      {
        idea: '(b) $5\\mathbb{Z}$',
        detalle: '<p>$g:\\mathbb{Z}\\to 5\\mathbb{Z}$, $g(k) = 5k$, es biyectiva (inversa $m \\mapsto m/5$, bien definida sobre múltiplos de $5$). Como $\\mathbb{Z}$ es numerable (L1), $\\#\\,5\\mathbb{Z} = \\aleph_0$.</p>',
      },
      {
        idea: '(c) $\\mathbb{Z}\\times\\mathbb{N}$',
        detalle: '<p>$\\mathbb{Z}$ y $\\mathbb{N}$ son numerables; el producto de dos numerables es numerable (L1, vía $\\mathbb{N}\\times\\mathbb{N}$ y biyecciones componente a componente). Luego $\\#(\\mathbb{Z}\\times\\mathbb{N}) = \\aleph_0$.</p>',
      },
      {
        idea: '(d) $(-1,1)\\cap\\mathbb{Q}$',
        detalle: '<p>Es un subconjunto de $\\mathbb{Q}$ (numerable), y es infinito: contiene a $\\{1/(n+1) : n \\in \\mathbb{N}\\}$, que es infinito. Un subconjunto infinito de un numerable es numerable, así que $\\#\\big((-1,1)\\cap\\mathbb{Q}\\big) = \\aleph_0$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Los cuatro conjuntos son numerables ($\\aleph_0$): tres por biyección explícita y el último por ser subconjunto infinito de $\\mathbb{Q}$.',
  },
  {
    fuente: 'Práctica 2 · Ej. 2', enunciado: E(2),
    idea: 'Se separan los casos según A o B sea finito; en el caso ambos numerables se intercalan las enumeraciones para fabricar una sobreyección desde $\\mathbb{N}$ (L2).',
    pasos: [
      {
        idea: 'Casos con algún conjunto finito',
        detalle: '<p>Si $A$ y $B$ son ambos finitos, $A \\cup B$ es finito, luego contable. Si uno es finito y el otro numerable (digamos $A$ finito, $B$ numerable), entonces $A \\cup B$ es numerable: agregar finitos elementos a un numerable no cambia su cardinal (se enumera primero los de $A\\setminus B$ y luego los de $B$).</p>',
      },
      {
        idea: 'Caso ambos numerables: enumeraciones',
        detalle: '<p>Sean $A = \\{a_1, a_2, \\dots\\}$ y $B = \\{b_1, b_2, \\dots\\}$ enumeraciones (existen por ser numerables).</p>',
      },
      {
        idea: 'Sobreyección por intercalado',
        detalle: '<p>Definimos $f:\\mathbb{N}\\to A\\cup B$ por $f(2k-1) = a_k$, $f(2k) = b_k$. Todo elemento de $A\\cup B$ es algún $a_k$ o $b_k$, luego $f$ es sobreyectiva.</p>'
          + '<p>$A\\cup B$ es infinito (contiene a $A$), así que por (L2) es numerable. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La unión de dos conjuntos contables es contable. El intercalado da la sobreyección desde $\\mathbb{N}$; (L2) la convierte en biyección. Se trataron por separado los casos finitos.',
  },
  {
    fuente: 'Práctica 2 · Ej. 4', enunciado: E(4),
    idea: 'Por el absurdo, apoyándose en que $\\mathbb{R}$ no es numerable (L4) y en que unión de numerables es numerable (Ej. 2).',
    pasos: [
      {
        idea: 'Descomposición de $\\mathbb{R}$',
        detalle: '<p>Sea $\\mathbb{I} = \\mathbb{R}\\setminus\\mathbb{Q}$ el conjunto de irracionales. Entonces $\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}$ (unión disjunta).</p>',
      },
      {
        idea: 'Absurdo si $\\mathbb{I}$ fuese numerable',
        detalle: '<p>Supongamos $\\mathbb{I}$ numerable. Como $\\mathbb{Q}$ es numerable (L1), por el Ej. 2 la unión $\\mathbb{Q}\\cup\\mathbb{I} = \\mathbb{R}$ sería numerable. Pero $\\mathbb{R}$ no es numerable (L4). Contradicción; luego $\\mathbb{I}$ no es numerable.</p>',
      },
      {
        idea: 'Cardinal exacto',
        detalle: '<p>Además $\\mathbb{I} \\subseteq \\mathbb{R}$ da $\\#\\mathbb{I} \\le c$. Y $\\#\\mathbb{I} \\ge c$: por ejemplo $x \\mapsto x + \\sqrt2$ inyecta $\\mathbb{Q}^c$... más simple, $\\mathbb{I}$ contiene a $\\{q+\\sqrt2 : q\\in\\mathbb{Q}\\}$ y a todo intervalo de irracionales; siendo no numerable y contenido en $\\mathbb{R}$, por CSB (L3) con la inclusión y una inyección de $[0,1)$ en $\\mathbb{I}$ se obtiene $\\#\\mathbb{I} = c$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Los irracionales tienen cardinal $c$: son “casi todos” los reales. La clave es que $\\mathbb{R}$ no es numerable y que quitar un numerable ($\\mathbb{Q}$) no puede dejar un numerable.',
  },
  {
    fuente: 'Práctica 2 · Ej. 6', enunciado: E(6),
    idea: '(a) recorrido diagonal de una grilla doble índice; (b) contar palabras por longitud (unión numerable de conjuntos finitos) y comparar con $c$.',
    pasos: [
      {
        idea: '(a) Disposición en grilla',
        detalle: '<p>Sea $\\{A_k\\}_{k\\in\\mathbb{N}}$ con cada $A_k = \\{a_{k,1}, a_{k,2}, \\dots\\}$ contable (enumerado, repitiendo si fuese finito). Colocamos $a_{k,m}$ en la posición $(k,m)$ de una grilla $\\mathbb{N}\\times\\mathbb{N}$.</p>',
      },
      {
        idea: '(a) Recorrido diagonal',
        detalle: '<p>La biyección diagonal $\\mathbb{N}\\to\\mathbb{N}\\times\\mathbb{N}$ (L1) recorre las antidiagonales finitas $\\{(k,m):k+m=s\\}$, $s=2,3,\\dots$, y alcanza toda posición en un número finito de pasos. Componiéndola con $(k,m)\\mapsto a_{k,m}$ se obtiene una sobreyección $\\mathbb{N}\\to\\bigcup_k A_k$.</p>'
          + '<p>Por (L2), $\\bigcup_k A_k$ es contable. $\\blacksquare$ (a)</p>',
      },
      {
        idea: '(b) Contar palabras',
        detalle: '<p>Sea $\\Sigma$ un alfabeto finito con $s = \\#\\Sigma$ símbolos. Las palabras de longitud $\\ell$ son $\\Sigma^\\ell$, un conjunto <em>finito</em> de $s^\\ell$ elementos. El conjunto de todas las palabras es $S = \\bigcup_{\\ell \\ge 1} \\Sigma^\\ell$.</p>'
          + '<p>Es unión numerable (indexada por $\\ell \\in \\mathbb{N}$) de conjuntos finitos; por la parte (a), $\\#S = \\aleph_0$.</p>',
      },
      {
        idea: '(b) Comparación con $\\mathbb{R}$',
        detalle: '<p>Como $\\#\\mathbb{R} = c > \\aleph_0 = \\#S$ (L4), no puede haber sobreyección de $S$ en $\\mathbb{R}$: hay “más reales que nombres finitos”. En consecuencia, con cualquier alfabeto finito, casi todo número real queda sin nombre. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Unión numerable de contables es contable (grilla + diagonal). El conjunto de todas las palabras finitas sobre un alfabeto finito es numerable, estrictamente menor que $\\mathbb{R}$.',
  },
  {
    fuente: 'Práctica 2 · Ej. 7', enunciado: E(7),
    idea: 'Se reparten copias de tamaño $c$ en trozos disjuntos de $\\mathbb{R}$ mediante biyecciones; la igualdad final se cierra con CSB (una inclusión da $\\ge c$, la construcción da $\\le c$).',
    pasos: [
      { idea: 'Lemas', detalle: LEMAS },
      {
        idea: '(a) unión de dos conjuntos de cardinal $c$',
        detalle: '<p>Sean $\\#A = \\#B = c$. Como $\\#(-\\infty,0) = \\#[0,+\\infty) = c$ (biyecciones con $\\mathbb{R}$), hay biyecciones $\\varphi:A\\to(-\\infty,0)$ y $\\psi:B\\to[0,+\\infty)$.</p>'
          + '<p>Estos codominios son disjuntos y su unión es $\\mathbb{R}$. Definimos $h:A\\cup B \\to \\mathbb{R}$ pegando $\\varphi$ y $\\psi$ (en $A\\cap B$ se elige, digamos, $\\varphi$); $h$ es sobreyectiva sobre $\\mathbb{R}$, así $\\#(A\\cup B) \\ge c$.</p>'
          + '<p>Por otro lado $A\\cup B$ inyecta en $\\mathbb{R}\\times\\{0,1\\}$ (marcando de qué conjunto proviene), de cardinal $c$; luego $\\#(A\\cup B) \\le c$. Por CSB (L3), $\\#(A\\cup B)=c$.</p>',
      },
      {
        idea: '(b) unión numerable de conjuntos de cardinal $c$',
        detalle: '<p>Sea $\\#A_n = c$ para cada $n$. Tomamos biyecciones $\\varphi_n: A_n \\to [n, n+1)$ (cada intervalo tiene cardinal $c$); los intervalos $[n,n+1)$, $n\\in\\mathbb{N}$, son disjuntos y su unión es $[1,+\\infty)$, de cardinal $c$.</p>'
          + '<p>Definiendo $h$ por trozos se obtiene una sobreyección de $\\bigcup_n A_n$ sobre $[1,+\\infty)$, luego $\\#\\big(\\bigcup_n A_n\\big) \\ge c$.</p>'
          + '<p>Para la cota superior: $\\bigcup_n A_n$ inyecta en $\\mathbb{N}\\times\\mathbb{R}$ (índice $n$ + imagen por $\\varphi_n$), y $\\#(\\mathbb{N}\\times\\mathbb{R}) = \\aleph_0 \\cdot c = c$. Por CSB, $\\#\\big(\\bigcup_n A_n\\big) = c$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'El continuo absorbe uniones finitas y numerables de conjuntos de cardinal $c$. En ambos incisos se prueban las dos desigualdades ($\\ge c$ por una copia, $\\le c$ por inyección en un producto de cardinal $c$) y se aplica CSB.',
  },
  {
    fuente: 'Práctica 2 · Ej. 8', enunciado: E(8),
    idea: 'La biyección canónica entre subconjuntos y funciones indicadoras; el conteo $2^n$ se sigue por el principio multiplicativo.',
    pasos: [
      {
        idea: '(a) biyección $\\mathcal{P}(A)\\to\\{0,1\\}^A$',
        detalle: '<p>Definimos $\\Phi:\\mathcal{P}(A)\\to\\{0,1\\}^A$ por $\\Phi(B) = \\chi_B$, la función indicadora: $\\chi_B(a)=1$ si $a\\in B$, $\\chi_B(a)=0$ si $a\\notin B$.</p>'
          + '<p><strong>Inyectiva:</strong> si $\\chi_B = \\chi_{B\'}$, entonces para todo $a$: $a\\in B \\iff \\chi_B(a)=1 \\iff \\chi_{B\'}(a)=1 \\iff a\\in B\'$, luego $B = B\'$.</p>'
          + '<p><strong>Sobreyectiva:</strong> dada $f\\in\\{0,1\\}^A$, el conjunto $B = \\{a\\in A: f(a)=1\\}$ cumple $\\chi_B = f$. Por lo tanto $\\Phi$ es biyección y $\\mathcal{P}(A)\\sim\\{0,1\\}^A$.</p>',
      },
      {
        idea: '(b) conteo para $\\#A = n$',
        detalle: '<p>Una función $A\\to\\{0,1\\}$ se determina eligiendo, independientemente, el valor $0$ o $1$ en cada uno de los $n$ elementos de $A$: por el principio multiplicativo hay $2\\cdot 2\\cdots 2 = 2^n$ tales funciones.</p>'
          + '<p>Como $\\mathcal{P}(A)\\sim\\{0,1\\}^A$ por (a), $\\#\\mathcal{P}(A) = 2^n$. $\\blacksquare$</p>',
      },
    ],
    conclusion: '$\\mathcal{P}(A)\\sim\\{0,1\\}^A$ vía la función indicadora, y para conjuntos finitos $\\#\\mathcal{P}(A)=2^{\\#A}$. La biyección se prueba verificando inyectividad y sobreyectividad, no se asume.',
  },
  {
    fuente: 'Práctica 2 · Ej. 10', enunciado: E(10),
    idea: 'El desarrollo binario da inyecciones en ambos sentidos entre $[0,1)$ y $\\{0,1\\}^{\\mathbb{N}}$; el problema de la ambigüedad (colas de $1$) se resuelve con CSB. Luego se encadenan cardinales.',
    pasos: [
      {
        idea: '(a) inyección $\\{0,1\\}^{\\mathbb{N}} \\hookrightarrow [0,1)$',
        detalle: '<p>A cada sucesión $(b_n)\\in\\{0,1\\}^{\\mathbb{N}}$ le asignamos $\\Psi\\big((b_n)\\big) = \\sum_{n\\ge1} b_n\\,3^{-n} \\in [0,1)$ (usamos base $3$ para evitar ambigüedades: dos sucesiones distintas dan desarrollos ternarios con dígitos en $\\{0,1\\}$ que son distintos). $\\Psi$ es inyectiva.</p>',
      },
      {
        idea: '(a) inyección $[0,1) \\hookrightarrow \\{0,1\\}^{\\mathbb{N}}$',
        detalle: '<p>A cada $x\\in[0,1)$ le asignamos su desarrollo binario $(b_n)$ eligiendo, por convención, el que <em>no</em> termina en infinitos $1$ (así el desarrollo es único). Esto define una inyección $[0,1)\\to\\{0,1\\}^{\\mathbb{N}}$.</p>',
      },
      {
        idea: '(a) cerrar con CSB',
        detalle: '<p>Con inyecciones en ambos sentidos, por CSB (L3) $[0,1) \\sim \\{0,1\\}^{\\mathbb{N}}$.</p>',
      },
      {
        idea: '(b) cardinal de $\\mathcal{P}(\\mathbb{N})$',
        detalle: '<p>Por el Ej. 8(a), $\\mathcal{P}(\\mathbb{N}) \\sim \\{0,1\\}^{\\mathbb{N}}$. Por (a), $\\{0,1\\}^{\\mathbb{N}} \\sim [0,1)$. Y $[0,1) \\sim \\mathbb{R}$ (biyección, p. ej. vía $\\tan$/reescalado). Encadenando, $\\#\\mathcal{P}(\\mathbb{N}) = \\#\\mathbb{R} = c$. $\\blacksquare$</p>',
      },
    ],
    conclusion: '$\\#\\mathcal{P}(\\mathbb{N}) = c = 2^{\\aleph_0}$. La sutileza de la no unicidad del desarrollo binario se evita usando base $3$ en un sentido y la convención “sin cola de unos” en el otro, cerrando con CSB.',
  },
  {
    fuente: 'Práctica 2 · Ej. 11', enunciado: E(11),
    idea: 'Se descompone $\\mathcal{P}_f(A)$ por tamaño: los subconjuntos de $k$ elementos forman un conjunto numerable, y la unión (sobre $k$) de numerables es numerable.',
    pasos: [
      {
        idea: 'Estratificar por cardinal',
        detalle: '<p>Sea $A$ numerable, fijemos una enumeración $A=\\{a_1,a_2,\\dots\\}$. Para $k\\ge 0$ sea $\\mathcal{P}_k = \\{B\\subseteq A : \\#B = k\\}$. Entonces $\\mathcal{P}_f(A) = \\bigcup_{k\\ge 0}\\mathcal{P}_k$ (unión disjunta).</p>',
      },
      {
        idea: 'Cada estrato es numerable',
        detalle: '<p>La aplicación que a un subconjunto $\\{a_{i_1},\\dots,a_{i_k}\\}$ (con $i_1<\\dots<i_k$) le asigna la tupla ordenada $(i_1,\\dots,i_k)\\in\\mathbb{N}^k$ es inyectiva. Como $\\mathbb{N}^k$ es numerable (L1, producto finito de numerables), $\\mathcal{P}_k$ es contable (subconjunto de numerable).</p>',
      },
      {
        idea: 'Unir los estratos',
        detalle: '<p>$\\mathcal{P}_f(A)$ es unión numerable (indexada por $k\\in\\mathbb{N}_0$) de conjuntos contables; por el Ej. 6(a) es contable. Además es infinito (contiene todos los singletons), luego numerable. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Los subconjuntos <em>finitos</em> de un numerable forman un conjunto numerable; contrasta con $\\mathcal{P}(A)$ entero, que tiene cardinal $c$. La diferencia está en admitir sólo subconjuntos de tamaño finito.',
  },
  {
    fuente: 'Práctica 2 · Ej. 14', enunciado: E(14),
    idea: 'Todos tienen cardinal $c$. Se usa repetidamente $c\\cdot c = c$ (intercalado de desarrollos) y, por inducción, $c^k = c$.',
    pasos: [
      { idea: 'Lema $c \\cdot c = c$', detalle: '<p><strong>Lema.</strong> $\\#([0,1)\\times[0,1)) = c$. <em>Prueba.</em> A $(x,y)$ con desarrollos (sin cola de unos) $x=0.x_1x_2\\dots$, $y=0.y_1y_2\\dots$ se le asigna $z = 0.x_1y_1x_2y_2\\dots$ (intercalado). Es inyectiva $[0,1)^2 \\hookrightarrow [0,1)$; con la inclusión $x\\mapsto(x,0)$ en el otro sentido y CSB, $c\\cdot c = c$. $\\square$</p>' },
      {
        idea: '(a) $\\mathcal{P}(\\mathbb{N})\\times\\mathcal{P}(\\mathbb{N})$',
        detalle: '<p>$\\#\\mathcal{P}(\\mathbb{N})=c$ (Ej. 10b). Entonces $\\#(\\mathcal{P}(\\mathbb{N})^2) = c\\cdot c = c$ por el Lema.</p>',
      },
      {
        idea: '(b) $[0,1)\\times[0,1)$',
        detalle: '<p>Es exactamente el Lema: $\\#([0,1)^2) = c$.</p>',
      },
      {
        idea: '(c) $\\mathbb{R}^k$',
        detalle: '<p>Por inducción en $k$. Base: $\\#\\mathbb{R}=c$. Paso: $\\#\\mathbb{R}^{k+1} = \\#(\\mathbb{R}^k\\times\\mathbb{R}) = c\\cdot c = c$ (Lema, usando $\\mathbb{R}\\sim[0,1)$). Luego $\\#\\mathbb{R}^k = c$ para todo $k\\in\\mathbb{N}$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Productos finitos de conjuntos de cardinal $c$ mantienen cardinal $c$: agregar dimensiones no agranda el continuo. El motor es $c\\cdot c=c$ por intercalado de dígitos.',
  },
  {
    fuente: 'Práctica 2 · Ej. 15', enunciado: E(15),
    idea: 'Un polinomio se identifica con la tupla finita de sus coeficientes; se estratifica por grado y se usa que la unión numerable de conjuntos de cardinal $c$ tiene cardinal $c$ (Ej. 7b).',
    pasos: [
      {
        idea: 'Estratificar por grado',
        detalle: '<p>Sea $P_n = \\{p \\in \\mathbb{R}[X] : \\deg p \\le n\\}$. La aplicación $p = \\sum_{i=0}^{n} c_i X^i \\mapsto (c_0,\\dots,c_n)\\in\\mathbb{R}^{n+1}$ es biyectiva, luego $\\#P_n = \\#\\mathbb{R}^{n+1} = c$ (Ej. 14c).</p>',
      },
      {
        idea: 'Unir grados',
        detalle: '<p>Todo polinomio tiene grado finito, así que $\\mathbb{R}[X] = \\bigcup_{n\\ge 0} P_n$: unión numerable de conjuntos de cardinal $c$. Por el Ej. 7(b), $\\#\\mathbb{R}[X] = c$.</p>',
      },
      {
        idea: 'Cota inferior',
        detalle: '<p>Además $\\#\\mathbb{R}[X] \\ge c$ porque los polinomios constantes ya forman una copia de $\\mathbb{R}$. Consistente con el resultado. $\\blacksquare$</p>',
      },
    ],
    conclusion: '$\\#\\mathbb{R}[X] = c$: aunque hay “infinitos grados”, el conjunto de polinomios reales no supera al continuo. Se apoya en $\\#\\mathbb{R}^{k}=c$ (Ej. 14) y en la unión numerable de copias de tamaño $c$ (Ej. 7b).',
  },
];

// ---------------------------------------------------------------------------
// Ejercicios agregados para completar la guía 2026: 3, 5, 9, 12, 13, 16, 17.
// ---------------------------------------------------------------------------
const EXTRA_P2 = [
  {
    fuente: 'Práctica 2 · Ej. 3', enunciado: E(3),
    idea: 'Un conjunto infinito siempre contiene una copia de $\\mathbb{N}$. Elegimos $C$ numerable dentro de $B\\setminus A$: $C$ y $C\\cup A$ son ambos numerables, luego equivalentes. Después "pegamos" esa biyección con la identidad en el resto.',
    pasos: [
      {
        idea: '(a) Elegir $C$ numerable dentro de $B\\setminus A$',
        detalle: '<p>$B\\setminus A$ es infinito, así que contiene un subconjunto numerable $C=\\{c_1,c_2,\\dots\\}$ (se eligen $c_1\\in B\\setminus A$, luego $c_2\\in(B\\setminus A)\\setminus\\{c_1\\}$, etc.; nunca se agota por ser infinito).</p>',
      },
      {
        idea: '(a) $C\\sim C\\cup A$',
        detalle: '<p>$C\\cup A$ es unión de dos conjuntos contables (Ej. 2), luego contable; y es infinito (contiene a $C$). Entonces es numerable. $C$ también es numerable, y dos conjuntos numerables son coordinables: existe una biyección $\\varphi:C\\to C\\cup A$.</p>',
      },
      {
        idea: '(b) Descomponer $B$ y $B\\setminus A$',
        detalle: '<p>Sea $R=(B\\setminus A)\\setminus C$ (lo que sobra). Como $C\\subseteq B\\setminus A$ y $A\\subseteq B$, valen las uniones <em>disjuntas</em> $B\\setminus A=R\\cup C$ y $B=R\\cup(C\\cup A)$ (disjuntas porque $C\\cap A=\\varnothing$ y $R\\cap(C\\cup A)=\\varnothing$).</p>',
      },
      {
        idea: '(b) Biyección $B\\setminus A\\to B$',
        detalle: '<p>Definimos $\\Phi:B\\setminus A\\to B$ por $\\Phi(x)=x$ si $x\\in R$ y $\\Phi(x)=\\varphi(x)$ si $x\\in C$. Es biyectiva: es la identidad en $R$ y una biyección $C\\to C\\cup A$, con imágenes disjuntas que reconstruyen $B$. Luego $B\\setminus A\\sim B$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Quitarle a un conjunto una parte contable no cambia su cardinal, siempre que lo que queda sea infinito. Es el mismo mecanismo del Hotel de Hilbert: "hacer lugar" a los elementos de $A$ reacomodando una copia de $\\mathbb{N}$.',
  },
  {
    fuente: 'Práctica 2 · Ej. 5', enunciado: E(5),
    idea: 'Disjuntar una unión: a cada $A_n$ le quitamos todo lo que ya apareció en los anteriores.',
    pasos: [
      {
        idea: '(a) Definición de $B_n$',
        detalle: '<p>$B_1=A_1$ y, para $n\\ge2$, $B_n=A_n\\setminus\\bigcup_{k<n}A_k$. Claramente $B_n\\subseteq A_n$.</p>',
      },
      {
        idea: '(a) Disjuntos dos a dos',
        detalle: '<p>Sean $m<n$. $B_m\\subseteq A_m$ y $B_n\\cap A_m=\\varnothing$ (a $A_n$ le sacamos todo $A_k$, $k<n$, en particular $A_m$). Luego $B_m\\cap B_n=\\varnothing$.</p>',
      },
      {
        idea: '(a) $\\bigcup_{n\\le m}B_n=\\bigcup_{n\\le m}A_n$',
        detalle: '<p>($\\subseteq$) $B_n\\subseteq A_n$. ($\\supseteq$) Sea $x\\in\\bigcup_{n\\le m}A_n$ y sea $n\\le m$ el <em>menor</em> índice con $x\\in A_n$. Entonces $x\\notin A_k$ para $k<n$, así que $x\\in B_n$.</p>',
      },
      {
        idea: '(b) Para toda $(B_n)$ con esas propiedades, $A=\\bigcup B_n$',
        detalle: '<p>($\\supseteq$) $B_n\\subseteq A_n\\subseteq A$. ($\\subseteq$) Si $x\\in A$, existe $m$ con $x\\in A_m\\subseteq\\bigcup_{n\\le m}A_n=\\bigcup_{n\\le m}B_n\\subseteq\\bigcup_nB_n$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Toda unión numerable puede reescribirse como unión numerable <em>disjunta</em>. Es la herramienta que usa el Ej. 6 para sumar cardinales, y la que se necesita para pasar de "unión" a "suma" cuando se miden tamaños.',
  },
  {
    fuente: 'Práctica 2 · Ej. 9', enunciado: E(9),
    idea: 'Los dos primeros ítems son lógica de pertenencia ($X\\subseteq A$). El tercero usa la imagen directa como biyección entre partes.',
    pasos: [
      {
        idea: '(a) $\\mathcal{P}(A)\\cap\\mathcal{P}(B)=\\mathcal{P}(A\\cap B)$',
        detalle: '<p>$X\\in\\mathcal{P}(A)\\cap\\mathcal{P}(B)\\iff X\\subseteq A\\ \\text{y}\\ X\\subseteq B\\iff X\\subseteq A\\cap B\\iff X\\in\\mathcal{P}(A\\cap B)$.</p>',
      },
      {
        idea: '(b) $\\mathcal{P}(A)\\cup\\mathcal{P}(B)\\subseteq\\mathcal{P}(A\\cup B)$',
        detalle: '<p>Si $X\\subseteq A$ o $X\\subseteq B$, entonces $X\\subseteq A\\cup B$. La igualdad falla: $A=\\{1\\}$, $B=\\{2\\}$, $X=\\{1,2\\}\\in\\mathcal{P}(A\\cup B)$ pero $X\\notin\\mathcal{P}(A)\\cup\\mathcal{P}(B)$.</p>',
      },
      {
        idea: '(c) $A\\sim B\\Rightarrow\\mathcal{P}(A)\\sim\\mathcal{P}(B)$',
        detalle: '<p>Sea $\\varphi:A\\to B$ biyección. Definimos $\\Phi:\\mathcal{P}(A)\\to\\mathcal{P}(B)$, $\\Phi(X)=\\varphi(X)$, y $\\Psi:\\mathcal{P}(B)\\to\\mathcal{P}(A)$, $\\Psi(Y)=\\varphi^{-1}(Y)$. Por las propiedades recordadas al comienzo de la guía: $\\varphi^{-1}(\\varphi(X))=X$ (porque $\\varphi$ es inyectiva) y $\\varphi(\\varphi^{-1}(Y))=Y$ (porque es sobreyectiva). Así $\\Psi\\circ\\Phi=\\mathrm{id}$ y $\\Phi\\circ\\Psi=\\mathrm{id}$: $\\Phi$ es biyectiva. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'El conjunto de partes respeta equivalencias (cardinales iguales dan partes de igual cardinal), $\\cap$ pasa a $\\cap$ pero $\\cup$ solo da inclusión.',
  },
  {
    fuente: 'Práctica 2 · Ej. 12', enunciado: E(12),
    idea: '(a) Infinitos primos (Euclides) + subconjunto infinito de $\\mathbb{N}$. (b) Cada natural se escribe de modo único como potencia de $2$ por un impar.',
    pasos: [
      {
        idea: '(a) Hay infinitos primos',
        detalle: '<p>Si $p_1,\\dots,p_k$ fueran todos, $N=p_1\\cdots p_k+1>1$ tiene algún divisor primo $q$. Pero $q\\ne p_i$ para todo $i$ (si $q=p_i$ dividiría a $N$ y a $p_1\\cdots p_k$, luego a $1$). Contradicción.</p>',
      },
      {
        idea: '(a) Numerable',
        detalle: '<p>El conjunto de primos es un subconjunto infinito de $\\mathbb{N}$, y un subconjunto infinito de un numerable es numerable (si $p_1<p_2<\\cdots$ son los primos ordenados, $n\\mapsto p_n$ es biyección). $\\blacksquare$</p>',
      },
      {
        idea: '(b) Descomposición $\\mathbb{N}=\\bigsqcup_{k\\ge0}A_k$',
        detalle: '<p>Sea $A_k=\\{2^k(2j+1):j\\ge0\\}$, $k=0,1,2,\\dots$. Todo $n\\ge1$ se escribe <em>de manera única</em> como $n=2^k\\cdot m$ con $m$ impar (factorización en primos: el exponente de $2$ está determinado). Luego los $A_k$ son disjuntos y cubren $\\mathbb{N}$.</p>',
      },
      {
        idea: '(b) Cada $A_k$ es numerable',
        detalle: '<p>$j\\mapsto2^k(2j+1)$ es una biyección $\\mathbb{N}_0\\to A_k$. ($A_0$ son los impares, $A_1=\\{2,6,10,\\dots\\}$, $A_2=\\{4,12,20,\\dots\\}$, etc.) $\\blacksquare$</p>',
      },
    ],
    conclusion: '$\\mathbb{N}$ es unión disjunta de $\\aleph_0$ conjuntos numerables: $\\aleph_0\\cdot\\aleph_0=\\aleph_0$ hecho a mano. (Los números primos son un ejemplo de que "subconjunto de densidad cero" no implica "cardinal menor".)',
  },
  {
    fuente: 'Práctica 2 · Ej. 13', enunciado: E(13),
    idea: 'Cota superior trivial ($\\subseteq\\mathcal{P}(\\mathbb{N})$) y una inyección de $\\mathcal{P}(\\mathbb{N})$ que fabrica, para cada $X$, un conjunto "mitad y mitad". CSB cierra.',
    pasos: [
      {
        idea: 'Cota superior',
        detalle: '<p>$\\mathcal{F}:=\\{B\\subseteq\\mathbb{N}:\\#B=\\#(\\mathbb{N}\\setminus B)=\\aleph_0\\}\\subseteq\\mathcal{P}(\\mathbb{N})$, así que $\\#\\mathcal{F}\\le c$.</p>',
      },
      {
        idea: 'Inyección $\\mathcal{P}(\\mathbb{N})\\to\\mathcal{F}$',
        detalle: '<p>Para $X\\subseteq\\mathbb{N}$ ($\\mathbb{N}=\\{1,2,\\dots\\}$) definimos $\\Theta(X)=\\{2x:x\\in X\\}\\cup\\{2x-1:x\\notin X\\}$. Para cada $n\\in\\mathbb{N}$, de los dos números $2n-1,2n$ exactamente <em>uno</em> pertenece a $\\Theta(X)$.</p>',
      },
      {
        idea: '$\\Theta(X)\\in\\mathcal{F}$',
        detalle: '<p>Hay un elemento de $\\Theta(X)$ en cada par $\\{2n-1,2n\\}$: infinitos. Y el otro elemento del par queda en el complemento: también infinitos. Entonces $\\Theta(X)$ y su complemento son infinitos.</p>',
      },
      {
        idea: '$\\Theta$ es inyectiva y conclusión',
        detalle: '<p>Se recupera $X$ desde $B=\\Theta(X)$: $x\\in X\\iff2x\\in B$. Así $\\Theta$ es inyectiva y $c=\\#\\mathcal{P}(\\mathbb{N})\\le\\#\\mathcal{F}\\le c$. Por Cantor–Schröder–Bernstein, $\\#\\mathcal{F}=c$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Casi todos los subconjuntos de $\\mathbb{N}$ son "grandes y con complemento grande": hay $c$ de ellos. Los únicos que se pierden (finitos y cofinitos) forman un conjunto numerable (Ej. 11).',
  },
  {
    fuente: 'Práctica 2 · Ej. 16', enunciado: E(16),
    idea: 'En ambos casos, el conjunto es una unión numerable de conjuntos numerables (cada parte se identifica con $\\mathbb{Z}^k$ o $\\mathbb{Q}^k$), así que es numerable. Se agrega que es infinito.',
    pasos: [
      {
        idea: '(a) Una sucesión entera convergente es eventualmente constante',
        detalle: '<p>Si $a_n\\to\\ell$, para $\\varepsilon=\\tfrac12$ existe $n_0$ con $|a_n-\\ell|<\\tfrac12$ para $n\\ge n_0$. Entonces $|a_n-a_m|<1$ para $n,m\\ge n_0$; como son enteros, $a_n=a_{n_0}$ para todo $n\\ge n_0$.</p>',
      },
      {
        idea: '(a) Contar',
        detalle: '<p>Sea $S_{n_0,\\ell}=\\{(a_n):a_n=\\ell\\ \\forall n\\ge n_0\\}$ ($n_0\\in\\mathbb{N}$, $\\ell\\in\\mathbb{Z}$). Está en biyección con $\\mathbb{Z}^{\\,n_0-1}$ (se eligen libremente los primeros $n_0-1$ términos), numerable (producto finito de numerables). El conjunto pedido es $\\bigcup_{n_0,\\ell}S_{n_0,\\ell}$, unión numerable de conjuntos contables: contable (Ej. 6a). Es infinito (contiene las constantes). Cardinal: $\\aleph_0$.</p>',
      },
      {
        idea: '(b) Una sucesión periódica queda determinada por un período',
        detalle: '<p>$(a_n)\\subseteq\\mathbb{Q}$ es periódica si existe $T\\ge1$ con $a_{n+T}=a_n$ para todo $n$. Para cada $T$, el conjunto $P_T$ de sucesiones con período $T$ está en biyección con $\\mathbb{Q}^T$ (se eligen $a_1,\\dots,a_T$ y el resto se repite). $\\mathbb{Q}^T$ es numerable.</p>',
      },
      {
        idea: '(b) Unir sobre $T$',
        detalle: '<p>El conjunto es $\\bigcup_{T\\ge1}P_T$: unión numerable de numerables, contable, e infinito (constantes racionales). Cardinal: $\\aleph_0$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Ambos conjuntos tienen cardinal $\\aleph_0$ (aunque están dentro de $\\mathbb{Z}^{\\mathbb{N}}$ y $\\mathbb{Q}^{\\mathbb{N}}$, que tienen cardinal $c$). Lo que los hace chicos es que "convergente en $\\mathbb{Z}$" y "periódica" son sucesiones con <em>finita información</em>.',
  },
  {
    fuente: 'Práctica 2 · Ej. 17', enunciado: E(17),
    idea: '(a) Cada intervalo con más de un punto contiene un racional: eso inyecta $I$ en $\\mathbb{Q}$. (b) Cada discontinuidad de una monótona es un salto; los saltos definen intervalos disjuntos.',
    pasos: [
      {
        idea: '(a) Un racional por intervalo',
        detalle: '<p>$A_i$ es un intervalo con $\\#A_i>1$: contiene dos puntos $u<v$ y todo $[u,v]\\subseteq A_i$. Por densidad de $\\mathbb{Q}$ hay un racional en $(u,v)\\subseteq A_i$. Fijamos una enumeración $\\mathbb{Q}=\\{q_1,q_2,\\dots\\}$ y definimos $\\rho(i)=$ el racional de $A_i$ de menor índice (esto evita elecciones arbitrarias).</p>',
      },
      {
        idea: '(a) $\\rho$ es inyectiva',
        detalle: '<p>Si $\\rho(i)=\\rho(j)$, ese racional está en $A_i\\cap A_j$, que es vacío si $i\\ne j$. Luego $i=j$. Entonces $\\rho:I\\to\\mathbb{Q}$ es inyectiva e $I$ es contable. $\\blacksquare$</p>',
      },
      {
        idea: '(b) Saltos de una monótona',
        detalle: '<p>Supongamos $f$ creciente (si es decreciente se aplica a $-f$). Para cada $x$ existen $f(x^-)=\\sup_{y<x}f(y)$ y $f(x^+)=\\inf_{y>x}f(y)$, con $f(x^-)\\le f(x)\\le f(x^+)$, y $f$ es continua en $x$ sii $f(x^-)=f(x^+)$. Sea $D$ el conjunto de discontinuidades; para $x\\in D$, $A_x=(f(x^-),f(x^+))$ es un intervalo con más de un punto.</p>',
      },
      {
        idea: '(b) Los $A_x$ son disjuntos',
        detalle: '<p>Si $x<y$ están en $D$, tomando $z\\in(x,y)$: $f(x^+)\\le f(z)\\le f(y^-)$. Entonces todo punto de $A_x$ es $<f(x^+)\\le f(y^-)\\le$ todo punto de $A_y$: $A_x\\cap A_y=\\varnothing$. Por (a), $D$ es contable. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Una función monótona tiene a lo sumo una cantidad numerable de discontinuidades. La idea: cada salto "consume" un intervalo de la recta vertical, y no puede haber más de $\\aleph_0$ intervalos disjuntos porque cada uno contiene un racional distinto.',
  },
];

// Combinadas y ordenadas por número de ejercicio.
export const GUIA_P2 = [...BASE_P2, ...EXTRA_P2].sort(
  (a, b) => Number(a.fuente.match(/Ej\. (\d+)/)[1]) - Number(b.fuente.match(/Ej\. (\d+)/)[1])
);
