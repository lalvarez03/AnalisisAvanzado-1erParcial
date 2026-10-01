// utils/guia-p2.js — Práctica 2 resuelta (Cardinalidad).
// Demostraciones con lemas explícitos y justificación de cada premisa.

import { consigna } from './ejercicios.js';

const E = (n) => consigna(2, n);

// Lemas de referencia que se citan a lo largo de la práctica.
const LEMAS = `<p><strong>Convenciones y lemas usados en la práctica:</strong></p>
<ul>
<li><strong>(L1) Producto de numerables.</strong> $\\mathbb{N}\\times\\mathbb{N}$ es numerable (recorrido diagonal). En consecuencia $\\mathbb{Z}$ y $\\mathbb{Q}$ son numerables.</li>
<li><strong>(L2) Sobreyección desde $\\mathbb{N}$.</strong> Si existe una sobreyección $\\mathbb{N}\\to X$ con $X$ infinito, entonces $X$ es numerable (se extrae una biyección eligiendo el primer índice nuevo en cada paso).</li>
<li><strong>(L3) Cantor–Schröder–Bernstein (CSB).</strong> Si hay inyecciones $A\\hookrightarrow B$ y $B\\hookrightarrow A$, entonces $A\\sim B$.</li>
<li><strong>(L4) Cantor.</strong> $[0,1)$ no es numerable; su cardinal es $c=2^{\\aleph_0}$, y $\\{0,1\\}^{\\mathbb{N}}\\sim\\mathcal{P}(\\mathbb{N})\\sim\\mathbb{R}$.</li>
</ul>`;

export const GUIA_P2 = [
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
