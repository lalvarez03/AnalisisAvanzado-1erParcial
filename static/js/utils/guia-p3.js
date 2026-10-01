// utils/guia-p3.js — Práctica 3 resuelta (Espacios métricos).
// Demostraciones con axiomas de métrica, lemas explícitos y estructura clara.

import { consigna } from './ejercicios.js';

const E = (n) => consigna(3, n);

export const GUIA_P3 = [
  {
    fuente: 'Práctica 3 · Ej. 1', enunciado: E(1),
    idea: 'Verificar los tres axiomas de métrica (identidad, simetría, desigualdad triangular) en cada caso, enunciando el lema que sostiene la triangular.',
    pasos: [
      {
        idea: 'Axiomas a verificar',
        detalle: '<p>$d$ es métrica si: (M1) $d(x,y)\\ge 0$ y $d(x,y)=0\\iff x=y$; (M2) $d(x,y)=d(y,x)$; (M3) $d(x,z)\\le d(x,y)+d(y,z)$.</p>',
      },
      {
        idea: '(a) $\\mathbb{R}$ con $|x-y|$',
        detalle: '<p>(M1) $|x-y|\\ge0$ y $=0\\iff x=y$; (M2) $|x-y|=|y-x|$; (M3) es la desigualdad triangular del valor absoluto $|x-z|\\le|x-y|+|y-z|$. Bola: intervalo $(x-r,\\,x+r)$.</p>',
      },
      {
        idea: '(b)-(d) $\\mathbb{R}^n$ con $d_2, d_1, d_\\infty$',
        detalle: '<p>(M1) y (M2) son inmediatas en las tres. La triangular:</p>'
          + '<p>• $d_1$: sumando $|x_i-z_i|\\le|x_i-y_i|+|y_i-z_i|$ sobre $i$.</p>'
          + '<p>• $d_\\infty$: de $|x_i-z_i|\\le|x_i-y_i|+|y_i-z_i|\\le d_\\infty(x,y)+d_\\infty(y,z)$ para cada $i$, tomando máximo en $i$.</p>'
          + '<p>• $d_2$: es la <strong>desigualdad de Minkowski</strong> $\\|u+w\\|_2\\le\\|u\\|_2+\\|w\\|_2$ (consecuencia de Cauchy–Schwarz), con $u=x-y$, $w=y-z$. Bolas: rombo ($d_1$), círculo ($d_2$), cuadrado ($d_\\infty$).</p>',
      },
      {
        idea: '(e) $C([0,1])$ con $d_\\infty(f,g)=\\max_t|f(t)-g(t)|$',
        detalle: '<p>El máximo existe porque $|f-g|$ es continua en el compacto $[0,1]$ (Weierstrass). (M1)-(M2) claras. (M3): para cada $t$, $|f(t)-h(t)|\\le|f(t)-g(t)|+|g(t)-h(t)|\\le d_\\infty(f,g)+d_\\infty(g,h)$; tomando máximo en $t$ se obtiene la triangular.</p>',
      },
      {
        idea: '(f) métrica discreta $\\delta$',
        detalle: '<p>$\\delta(x,y)=0\\iff x=y$ (M1) y $\\delta$ es simétrica (M2) por definición. (M3): si $x=z$, el lado izquierdo es $0\\le$ cualquier cosa; si $x\\ne z$, entonces $x\\ne y$ o $y\\ne z$ (no pueden ser ambos iguales, pues daría $x=z$), luego el lado derecho es $\\ge 1 = \\delta(x,z)$. Bola: $B(x,r)=\\{x\\}$ si $r\\le 1$, y $B(x,r)=E$ si $r>1$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Los seis son espacios métricos. La única triangular no trivial es la de $d_2$ (Minkowski); la de la discreta se resuelve por casos. La forma de las bolas refleja la geometría de cada distancia.',
  },
  {
    fuente: 'Práctica 3 · Ej. 2', enunciado: E(2),
    idea: 'Basta un contraejemplo para descartar; para confirmar (b) se verifican los tres axiomas, apoyando la triangular en la subaditividad de $\\sqrt{\\cdot}$.',
    pasos: [
      {
        idea: '(a) $d(x,y)=(x-y)^2$ — NO es métrica',
        detalle: '<p>Falla la triangular. Contraejemplo: $x=0$, $y=1$, $z=2$. $d(0,2)=(0-2)^2=4$, pero $d(0,1)+d(1,2)=1+1=2$. Como $4>2$, (M3) no se cumple.</p>',
      },
      {
        idea: '(b) $d(x,y)=\\sqrt{|x-y|}$ — SÍ es métrica',
        detalle: '<p>(M1): $\\sqrt{|x-y|}\\ge0$ y $=0\\iff|x-y|=0\\iff x=y$. (M2): clara.</p>'
          + '<p>(M3): usamos el <strong>lema</strong> $\\sqrt{a+b}\\le\\sqrt a+\\sqrt b$ para $a,b\\ge0$ (se ve elevando al cuadrado: $a+b\\le a+b+2\\sqrt{ab}$). Con $a=|x-y|$, $b=|y-z|$ y $|x-z|\\le|x-y|+|y-z|$ (monotonía de $\\sqrt{\\cdot}$): $\\sqrt{|x-z|}\\le\\sqrt{|x-y|+|y-z|}\\le\\sqrt{|x-y|}+\\sqrt{|y-z|}$.</p>',
      },
      {
        idea: '(c) $d(x,y)=|x^2-y^2|$ — NO es métrica',
        detalle: '<p>Falla (M1): $d(1,-1)=|1^2-(-1)^2|=|1-1|=0$ pero $1\\ne-1$. Hay puntos distintos a distancia $0$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Sólo (b) es métrica. (a) rompe la triangular (un contraejemplo basta); (c) rompe la condición de identidad. Confirmar una métrica exige verificar los tres axiomas, no sólo la triangular.',
  },
  {
    fuente: 'Práctica 3 · Ej. 3', enunciado: E(3),
    idea: 'Para el interior se busca (o se descarta) una bola contenida; para la clausura, si toda bola corta al conjunto. La densidad de $\\mathbb{Q}$ e irracionales es el lema recurrente.',
    pasos: [
      {
        idea: 'Intervalos (a) $[0,1]$, (b) $(0,1)$',
        detalle: '<p>Interior de ambos: $(0,1)$ (en cada punto interior cabe una bola; en $0$ y $1$ no). Clausura de ambos: $[0,1]$. Por lo tanto $(0,1)$ es abierto (coincide con su interior) y $[0,1]$ es cerrado (coincide con su clausura).</p>',
      },
      {
        idea: 'Densos (c) $\\mathbb{Q}$, (d) $\\mathbb{Q}\\cap[0,1]$',
        detalle: '<p>Interior $=\\varnothing$: toda bola contiene irracionales (densidad, Ej. 2 de la Práctica 1), así que ninguna queda dentro de $\\mathbb{Q}$. Clausura: $\\overline{\\mathbb{Q}}=\\mathbb{R}$ y $\\overline{\\mathbb{Q}\\cap[0,1]}=[0,1]$ (densidad de $\\mathbb{Q}$). Ninguno es abierto ni cerrado.</p>',
      },
      {
        idea: 'Discretos (e) $\\mathbb{Z}$, (g) $\\{1/n\\}$',
        detalle: '<p>$\\mathbb{Z}$: interior $\\varnothing$ (toda bola de radio $<1$ excede... contiene no enteros), clausura $\\mathbb{Z}$ (sus puntos son aislados, sin acumulación), es cerrado. $\\{1/n:n\\in\\mathbb{N}\\}$: interior $\\varnothing$; clausura $\\{1/n\\}\\cup\\{0\\}$ (el $0$ es punto de acumulación); no es cerrado por faltarle el $0$.</p>',
      },
      {
        idea: 'Mixtos (f) $[0,1)\\cup\\{2\\}$, (h) $\\{1/n\\}\\cup\\{0\\}$',
        detalle: '<p>(f): interior $(0,1)$ (el $2$ es aislado, no interior); clausura $[0,1]\\cup\\{2\\}$; ni abierto ni cerrado. (h): interior $\\varnothing$; clausura sí mismo (ya contiene el $0$), luego es cerrado. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'El interior descarta bordes y puntos aislados; la clausura agrega los puntos de acumulación. La densidad de $\\mathbb{Q}$ y de los irracionales es la que vacía el interior de $\\mathbb{Q}$ y llena su clausura.',
  },
  {
    fuente: 'Práctica 3 · Ej. 4', enunciado: E(4),
    idea: 'Cada afirmación se deduce directamente de las definiciones de bola y conjunto abierto/cerrado, y de la desigualdad triangular (que es el único ingrediente “de métrica”).',
    pasos: [
      {
        idea: '(a) $\\{x\\}$ es cerrado',
        detalle: '<p>Vemos que su complemento es abierto. Sea $y\\ne x$; entonces $r=d(x,y)>0$ y la bola $B(y, r)$ no contiene a $x$ (todo $z$ con $d(y,z)<r=d(x,y)$ cumple $z\\ne x$). Luego $E\\setminus\\{x\\}$ es entorno de cada uno de sus puntos: es abierto, y $\\{x\\}$ cerrado.</p>',
      },
      {
        idea: '(b) $B(x,r)$ es abierto',
        detalle: '<p>Sea $y\\in B(x,r)$, o sea $d(x,y)<r$. Definimos $s=r-d(x,y)>0$. Si $z\\in B(y,s)$, por la triangular $d(x,z)\\le d(x,y)+d(y,z)<d(x,y)+s=r$, luego $z\\in B(x,r)$. Así $B(y,s)\\subseteq B(x,r)$: todo punto de $B(x,r)$ es interior.</p>',
      },
      {
        idea: '(c) $r>r\' \\Rightarrow \\overline{B(x,r\')}\\subseteq B(x,r)$',
        detalle: '<p>La bola cerrada $\\overline{B}(x,r\')=\\{y:d(x,y)\\le r\'\\}$ es cerrada (ítem d), y contiene a $B(x,r\')$; como es el menor cerrado que lo contiene, $\\overline{B(x,r\')}\\subseteq \\overline{B}(x,r\')=\\{d(x,\\cdot)\\le r\'\\}\\subseteq\\{d(x,\\cdot)<r\\}=... $ Más directo: si $d(x,y)\\le r\' < r$, entonces $y\\in B(x,r)$. Luego $\\overline{B}(x,r\')\\subseteq B(x,r)$ y, a fortiori, $\\overline{B(x,r\')}\\subseteq B(x,r)$.</p>',
      },
      {
        idea: '(d) $\\{y:d(x,y)\\le r\\}$ es cerrado',
        detalle: '<p>Su complemento $\\{y:d(x,y)>r\\}$ es abierto: dado $y$ con $d(x,y)>r$, sea $s=d(x,y)-r>0$; si $z\\in B(y,s)$, por triangular inversa $d(x,z)\\ge d(x,y)-d(y,z)>d(x,y)-s=r$, luego $z$ está en el complemento. Así el complemento es abierto y el conjunto, cerrado. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Singletons y bolas cerradas son cerrados; las bolas abiertas son abiertas. Todo sale de la definición de bola y de la desigualdad triangular (directa e inversa).',
  },
  {
    fuente: 'Práctica 3 · Ej. 5', enunciado: E(5),
    idea: 'Las dos identidades son la dualidad interior/clausura por complemento; se prueban traduciendo “toda bola corta” ↔ “existe bola contenida”. Las igualdades adicionales se refutan con un contraejemplo.',
    pasos: [
      {
        idea: '(a) $E\\setminus A^\\circ = \\overline{E\\setminus A}$',
        detalle: '<p>$x\\notin A^\\circ$ significa que <em>ninguna</em> bola $B(x,r)$ está contenida en $A$, es decir toda $B(x,r)$ contiene algún punto de $E\\setminus A$. Eso es precisamente $x\\in\\overline{E\\setminus A}$. Por doble implicación, $E\\setminus A^\\circ=\\overline{E\\setminus A}$.</p>',
      },
      {
        idea: '(b) $E\\setminus\\overline{A} = (E\\setminus A)^\\circ$',
        detalle: '<p>Se obtiene aplicando (a) al conjunto $E\\setminus A$ (y usando $E\\setminus(E\\setminus A)=A$), o directamente: $x\\notin\\overline A \\iff$ existe una bola $B(x,r)$ disjunta de $A$, i.e. $B(x,r)\\subseteq E\\setminus A$, i.e. $x\\in (E\\setminus A)^\\circ$.</p>',
      },
      {
        idea: '¿$\\overline A=\\overline{A^\\circ}$?  ¿$A^\\circ=(\\overline A)^\\circ$?  — En general NO',
        detalle: '<p>Contraejemplo con $A=\\mathbb{Q}\\subseteq\\mathbb{R}$: $A^\\circ=\\varnothing$, luego $\\overline{A^\\circ}=\\varnothing\\ne\\mathbb{R}=\\overline A$. Y $\\overline A=\\mathbb{R}$, luego $(\\overline A)^\\circ=\\mathbb{R}\\ne\\varnothing=A^\\circ$. Ambas igualdades fallan. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Interior y clausura son duales por complemento (las dos identidades valen siempre). Pero componer los operadores ($\\overline{A^\\circ}$, $(\\overline A)^\\circ$) no devuelve $\\overline A$ ni $A^\\circ$: $\\mathbb{Q}$ lo exhibe.',
  },
  {
    fuente: 'Práctica 3 · Ej. 6', enunciado: E(6),
    idea: 'Las igualdades (a) y (c) se prueban por doble inclusión con las definiciones; las inclusiones (b) y (d) valen siempre pero pueden ser estrictas, lo que se muestra con intervalos.',
    pasos: [
      {
        idea: '(a) $(A\\cap B)^\\circ=A^\\circ\\cap B^\\circ$',
        detalle: '<p>($\\subseteq$) Si $B(x,r)\\subseteq A\\cap B$, entonces $B(x,r)\\subseteq A$ y $\\subseteq B$, luego $x\\in A^\\circ\\cap B^\\circ$. ($\\supseteq$) Si $B(x,r_1)\\subseteq A$ y $B(x,r_2)\\subseteq B$, entonces $B(x,\\min(r_1,r_2))\\subseteq A\\cap B$. Igualdad.</p>',
      },
      {
        idea: '(b) $A^\\circ\\cup B^\\circ\\subseteq(A\\cup B)^\\circ$, con inclusión posiblemente estricta',
        detalle: '<p>Inclusión: si una bola cabe en $A$ (o en $B$), cabe en $A\\cup B$. Estricta: $A=[0,1]$, $B=[1,2]$. Entonces $1\\in(A\\cup B)^\\circ=(0,2)^\\circ$ pero $1\\notin A^\\circ\\cup B^\\circ=(0,1)\\cup(1,2)$.</p>',
      },
      {
        idea: '(c) $\\overline{A\\cup B}=\\overline A\\cup\\overline B$',
        detalle: '<p>($\\supseteq$) $\\overline A,\\overline B\\subseteq\\overline{A\\cup B}$ por monotonía de la clausura. ($\\subseteq$) Si $x\\notin\\overline A\\cup\\overline B$, hay bolas $B(x,r_1)$ disjunta de $A$ y $B(x,r_2)$ disjunta de $B$; la de radio $\\min(r_1,r_2)$ es disjunta de $A\\cup B$, luego $x\\notin\\overline{A\\cup B}$. Igualdad.</p>',
      },
      {
        idea: '(d) $\\overline{A\\cap B}\\subseteq\\overline A\\cap\\overline B$, con inclusión posiblemente estricta',
        detalle: '<p>Inclusión por monotonía ($A\\cap B\\subseteq A$ y $\\subseteq B$). Estricta: $A=(0,1)$, $B=(1,2)$. Entonces $A\\cap B=\\varnothing$, $\\overline{A\\cap B}=\\varnothing$, pero $\\overline A\\cap\\overline B=[0,1]\\cap[1,2]=\\{1\\}$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'El interior conmuta con $\\cap$ y la clausura con $\\cup$ (igualdades). Con la operación “cruzada” sólo hay inclusión, que puede ser estricta (los puntos de contacto entre $A$ y $B$ son los que sobran).',
  },
  {
    fuente: 'Práctica 3 · Ej. 8', enunciado: E(8),
    idea: 'La frontera es $\\overline A\\setminus A^\\circ$ (Ej. 9); el conjunto derivado $A\'$ reúne los puntos de acumulación. Se calculan reutilizando interiores y clausuras del Ej. 3.',
    pasos: [
      {
        idea: 'Intervalos',
        detalle: '<p>$[0,1]$ y $(0,1)$: interior $(0,1)$, clausura $[0,1]$, luego $\\partial=\\{0,1\\}$. Derivado $A\'=[0,1]$ en ambos (todo punto del intervalo es de acumulación).</p>',
      },
      {
        idea: 'Densos y discretos',
        detalle: '<p>$\\mathbb{Q}$: $\\partial\\mathbb{Q}=\\overline{\\mathbb{Q}}\\setminus\\mathbb{Q}^\\circ=\\mathbb{R}\\setminus\\varnothing=\\mathbb{R}$; derivado $\\mathbb{R}$. $\\mathbb{Z}$: $\\partial\\mathbb{Z}=\\mathbb{Z}\\setminus\\varnothing=\\mathbb{Z}$; derivado $\\varnothing$ (puntos aislados).</p>',
      },
      {
        idea: 'Sucesión $\\{1/n\\}$ y variantes',
        detalle: '<p>$\\{1/n\\}$: clausura $\\{1/n\\}\\cup\\{0\\}$, interior $\\varnothing$, luego $\\partial=\\{1/n\\}\\cup\\{0\\}$; derivado $\\{0\\}$ (único punto de acumulación). $\\{1/n\\}\\cup\\{0\\}$: mismo derivado $\\{0\\}$, frontera igual, pero ya es cerrado. $[0,1)\\cup\\{2\\}$: $\\partial=\\{0,1,2\\}$, derivado $[0,1]$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La frontera junta “los bordes” ($\\overline A\\setminus A^\\circ$); el derivado retiene sólo los puntos a los que el conjunto se acumula (excluye los aislados). Se apoya en los cálculos del Ej. 3 y en la fórmula del Ej. 9.',
  },
  {
    fuente: 'Práctica 3 · Ej. 9', enunciado: E(9),
    idea: 'Se caracteriza la frontera como intersección de dos clausuras; de ahí sale que es cerrada y simétrica en $A$ y $A^c$.',
    pasos: [
      {
        idea: '(a) $\\partial A=\\overline A\\setminus A^\\circ$ y es cerrada',
        detalle: '<p>Por definición, $x\\in\\partial A$ sii toda bola $B(x,r)$ corta $A$ y corta $A^c$. “Toda bola corta $A$” es $x\\in\\overline A$; “ninguna bola queda dentro de $A$” es $x\\notin A^\\circ$. Luego $\\partial A=\\overline A\\setminus A^\\circ=\\overline A\\cap (A^\\circ)^c$.</p>'
          + '<p>$\\overline A$ es cerrado y $(A^\\circ)^c$ es cerrado (complemento de abierto); la intersección de cerrados es cerrada, así que $\\partial A$ es cerrada.</p>',
      },
      {
        idea: '(b) $\\partial A=\\overline A\\cap\\overline{A^c}$',
        detalle: '<p>Usando el Ej. 5(a), $(A^\\circ)^c=\\overline{A^c}$. Sustituyendo en (a): $\\partial A=\\overline A\\cap\\overline{A^c}$.</p>',
      },
      {
        idea: 'Simetría $\\partial A=\\partial(A^c)$',
        detalle: '<p>La expresión $\\overline A\\cap\\overline{A^c}$ es simétrica al intercambiar $A\\leftrightarrow A^c$ (pues $(A^c)^c=A$). Por lo tanto $\\partial A=\\partial(A^c)$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La frontera es siempre cerrada (intersección de dos clausuras) y coincide con la de su complemento. Es la herramienta usada para calcular fronteras en el Ej. 8.',
  },
  {
    fuente: 'Práctica 3 · Ej. 10', enunciado: E(10),
    idea: 'La función $x\\mapsto d(x,A)$ es 1-Lipschitz (se prueba con la triangular y el ínfimo); de ahí salen su relación con la clausura y la apertura/cerradura de sus conjuntos de nivel.',
    pasos: [
      {
        idea: '(a) $|d(x,A)-d(y,A)|\\le d(x,y)$',
        detalle: '<p>Para todo $a\\in A$: $d(x,A)\\le d(x,a)\\le d(x,y)+d(y,a)$. Tomando ínfimo sobre $a\\in A$ en el lado derecho: $d(x,A)\\le d(x,y)+d(y,A)$, o sea $d(x,A)-d(y,A)\\le d(x,y)$. Por simetría (intercambiar $x,y$) también $d(y,A)-d(x,A)\\le d(x,y)$. Combinando, $|d(x,A)-d(y,A)|\\le d(x,y)$.</p>',
      },
      {
        idea: '(b)-(c) relación con la clausura',
        detalle: '<p>(b) Si $x\\in A$, entonces $0\\le d(x,A)\\le d(x,x)=0$, luego $d(x,A)=0$.</p>'
          + '<p>(c) $d(x,A)=0 \\iff \\inf_{a}d(x,a)=0 \\iff$ para todo $r>0$ existe $a\\in A$ con $d(x,a)<r \\iff$ toda bola $B(x,r)$ corta $A \\iff x\\in\\overline A$.</p>',
      },
      {
        idea: '(d)-(e) conjuntos de nivel',
        detalle: '<p>Sea $\\varphi(x)=d(x,A)$, que es continua por ser 1-Lipschitz (dado $\\varepsilon$, con $\\delta=\\varepsilon$: $d(x,y)<\\delta\\Rightarrow|\\varphi(x)-\\varphi(y)|<\\varepsilon$).</p>'
          + '<p>(d) $\\{x:\\varphi(x)<r\\}=\\varphi^{-1}\\big((-\\infty,r)\\big)$ es preimagen de un abierto por función continua, luego abierto. (e) $\\{x:\\varphi(x)\\le r\\}=\\varphi^{-1}\\big((-\\infty,r]\\big)$ es preimagen de un cerrado, luego cerrado. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La distancia a un conjunto es 1-Lipschitz (por lo tanto continua), detecta la clausura ($d(x,A)=0\\iff x\\in\\overline A$) y sus conjuntos de nivel heredan abierto/cerrado de la continuidad.',
  },
  {
    fuente: 'Práctica 3 · Ej. 12', enunciado: E(12),
    idea: 'Se prueba la cadena de desigualdades entre normas comparando coordenada a coordenada; de ella se deducen las inclusiones de bolas, lo que da la equivalencia topológica de $d_1,d_2,d_\\infty$.',
    pasos: [
      {
        idea: '(a) cadena $d_\\infty\\le d_2\\le d_1\\le n\\,d_\\infty$',
        detalle: '<p>Sea $u_i=|x_i-y_i|\\ge0$ y $M=\\max_i u_i=d_\\infty(x,y)$.</p>'
          + '<p>• $d_\\infty\\le d_2$: $M^2=\\max u_i^2\\le\\sum u_i^2$, luego $M\\le\\sqrt{\\sum u_i^2}=d_2$.</p>'
          + '<p>• $d_2\\le d_1$: $\\big(\\sum u_i\\big)^2=\\sum u_i^2+\\sum_{i\\ne j}u_iu_j\\ge\\sum u_i^2$, luego $d_1\\ge d_2$.</p>'
          + '<p>• $d_1\\le n\\,d_\\infty$: $\\sum u_i\\le\\sum M=nM=n\\,d_\\infty$.</p>',
      },
      {
        idea: '(b) inclusiones de bolas',
        detalle: '<p>De $d_1\\ge d_2\\ge d_\\infty$: si $d_1(x,y)<r$ entonces $d_2(x,y)<r$ y $d_\\infty(x,y)<r$, o sea $B_1(x,r)\\subseteq B_2(x,r)\\subseteq B_\\infty(x,r)$.</p>'
          + '<p>De $d_1\\le n\\,d_\\infty$: si $d_\\infty(x,y)<r$ entonces $d_1(x,y)<nr$, o sea $B_\\infty(x,r)\\subseteq B_1(x,nr)$. Encadenando: $B_1(x,r)\\subseteq B_2(x,r)\\subseteq B_\\infty(x,r)\\subseteq B_1(x,nr)$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Las tres métricas se acotan mutuamente por constantes, luego son <strong>equivalentes</strong>: definen los mismos abiertos y la misma noción de convergencia en $\\mathbb{R}^n$. Las inclusiones de bolas lo hacen explícito.',
  },
  {
    fuente: 'Práctica 3 · Ej. 13', enunciado: E(13),
    idea: 'Ambas partes descansan en que la distancia es 1-Lipschitz en cada variable (desigualdad de los cuatro puntos), que se prueba con la triangular.',
    pasos: [
      {
        idea: 'Lema: desigualdad de los cuatro puntos',
        detalle: '<p><strong>Lema.</strong> $|d(x_n,y_n)-d(x,y)|\\le d(x_n,x)+d(y_n,y)$.</p>'
          + '<p><em>Prueba.</em> Por la triangular (dos veces): $d(x_n,y_n)\\le d(x_n,x)+d(x,y)+d(y,y_n)$, de donde $d(x_n,y_n)-d(x,y)\\le d(x_n,x)+d(y_n,y)$. Simétricamente se acota $d(x,y)-d(x_n,y_n)$. $\\square$</p>',
      },
      {
        idea: '(a) $d(x_n,y_n)\\to d(x,y)$',
        detalle: '<p>Si $x_n\\to x$ e $y_n\\to y$, entonces $d(x_n,x)\\to0$ y $d(y_n,y)\\to0$. Por el Lema, $|d(x_n,y_n)-d(x,y)|\\le d(x_n,x)+d(y_n,y)\\to0$, luego $d(x_n,y_n)\\to d(x,y)$.</p>',
      },
      {
        idea: '(b) $(d(x_n,y_n))$ es de Cauchy en $\\mathbb{R}$',
        detalle: '<p>Sea $\\varepsilon>0$. Como $(x_n),(y_n)$ son de Cauchy, existe $N$ tal que para $n,m\\ge N$: $d(x_n,x_m)<\\varepsilon/2$ y $d(y_n,y_m)<\\varepsilon/2$. Por el Lema (con los pares $(x_n,y_n)$ y $(x_m,y_m)$): $|d(x_n,y_n)-d(x_m,y_m)|\\le d(x_n,x_m)+d(y_n,y_m)<\\varepsilon$.</p>'
          + '<p>Así $(d(x_n,y_n))$ es de Cauchy en $\\mathbb{R}$; como $\\mathbb{R}$ es completo (Ej. 14), converge. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La distancia es continua (transporta límites) y respeta la propiedad de Cauchy, gracias a la desigualdad de los cuatro puntos. La convergencia final en (b) usa la completitud de $\\mathbb{R}$.',
  },
  {
    fuente: 'Práctica 3 · Ej. 14', enunciado: E(14),
    idea: 'Una sucesión de Cauchy en $\\mathbb{R}^n$ es de Cauchy coordenada a coordenada; se usa la completitud de $\\mathbb{R}$ y se recompone el límite, apoyándose en la equivalencia de métricas (Ej. 12).',
    pasos: [
      {
        idea: 'Reducir a $d_\\infty$',
        detalle: '<p>Por la equivalencia del Ej. 12, basta probarlo para una de las métricas; usamos $d_\\infty$ (las otras se siguen). Sea $(x^{(k)})_k$ de Cauchy en $(\\mathbb{R}^n,d_\\infty)$, con $x^{(k)}=(x^{(k)}_1,\\dots,x^{(k)}_n)$.</p>',
      },
      {
        idea: 'Cauchy en cada coordenada',
        detalle: '<p>Para cada índice $i$: $|x^{(k)}_i-x^{(m)}_i|\\le\\max_j|x^{(k)}_j-x^{(m)}_j|=d_\\infty(x^{(k)},x^{(m)})$. Como el lado derecho es pequeño para $k,m$ grandes, $(x^{(k)}_i)_k$ es de Cauchy en $\\mathbb{R}$.</p>',
      },
      {
        idea: 'Converger y recomponer',
        detalle: '<p>$\\mathbb{R}$ es completo (Axioma de Completitud vía sucesiones de Cauchy / Bolzano–Weierstrass), así que $x^{(k)}_i\\to L_i$ para cada $i$. Sea $L=(L_1,\\dots,L_n)$.</p>'
          + '<p>Dado $\\varepsilon>0$, para cada $i$ existe $K_i$ con $|x^{(k)}_i-L_i|<\\varepsilon$ ($k\\ge K_i$); con $K=\\max_i K_i$, para $k\\ge K$: $d_\\infty(x^{(k)},L)=\\max_i|x^{(k)}_i-L_i|<\\varepsilon$. Luego $x^{(k)}\\to L$ en $d_\\infty$, y por equivalencia también en $d_1,d_2$. $\\blacksquare$</p>',
      },
    ],
    conclusion: '$(\\mathbb{R}^n,d_1),(\\mathbb{R}^n,d_2),(\\mathbb{R}^n,d_\\infty)$ son completos: la completitud de $\\mathbb{R}$ se hereda coordenada a coordenada, y la equivalencia de métricas traslada el resultado entre las tres.',
  },
  {
    fuente: 'Práctica 3 · Ej. 15', enunciado: E(15),
    idea: 'Una sucesión de Cauchy en $A$ converge en $E$ por completitud; ser $A$ cerrado obliga a que el límite quede en $A$.',
    pasos: [
      {
        idea: 'Tomar una Cauchy en $A$',
        detalle: '<p>Sea $(x_n)\\subseteq A$ de Cauchy en $(A,d)$. Como la métrica de $A$ es la restricción de la de $E$, $(x_n)$ también es de Cauchy en $E$.</p>',
      },
      {
        idea: 'Converger en $E$',
        detalle: '<p>$E$ es completo, así que existe $x\\in E$ con $x_n\\to x$.</p>',
      },
      {
        idea: 'El límite está en $A$',
        detalle: '<p>Como $(x_n)\\subseteq A$ y $x_n\\to x$, todo entorno de $x$ contiene términos de la sucesión, luego puntos de $A$: $x\\in\\overline A$. Al ser $A$ cerrado, $\\overline A=A$, de modo que $x\\in A$.</p>'
          + '<p>Entonces $(x_n)$ converge <em>dentro de $A$</em>. Como toda Cauchy en $A$ converge en $A$, $(A,d)$ es completo. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Un subconjunto cerrado de un espacio completo es completo: el límite de una Cauchy no puede “escaparse” de un cerrado. La cerradura es esencial (p. ej. $\\mathbb{Q}\\subseteq\\mathbb{R}$ no es completo).',
  },
  {
    fuente: 'Práctica 3 · Ej. 16', enunciado: E(16),
    idea: 'Teorema de encaje de Cantor. Se elige un punto por cerrado, se prueba que la sucesión es de Cauchy usando el diámetro, y la completitud junto con la cerradura dan el punto de la intersección; el diámetro $\\to0$ fuerza la unicidad.',
    pasos: [
      {
        idea: 'Construir la sucesión de representantes',
        detalle: '<p>Como cada $A_n\\ne\\varnothing$, elegimos $x_n\\in A_n$ para todo $n$.</p>',
      },
      {
        idea: 'Es de Cauchy',
        detalle: '<p>Sea $\\varepsilon>0$. Como $\\operatorname{diam}(A_n)\\to0$, existe $N$ con $\\operatorname{diam}(A_N)<\\varepsilon$. Para $m\\ge n\\ge N$: por el encaje $A_m\\subseteq A_n\\subseteq A_N$, así que $x_n,x_m\\in A_N$ y $d(x_n,x_m)\\le\\operatorname{diam}(A_N)<\\varepsilon$. Luego $(x_n)$ es de Cauchy.</p>',
      },
      {
        idea: 'Converge a un punto de la intersección',
        detalle: '<p>Por completitud de $E$, $x_n\\to x$ para algún $x\\in E$. Fijado $n$, la cola $(x_k)_{k\\ge n}$ está contenida en $A_n$ (encaje) y $A_n$ es cerrado, de modo que el límite $x\\in A_n$. Como vale para todo $n$, $x\\in\\bigcap_n A_n$; en particular la intersección es no vacía.</p>',
      },
      {
        idea: 'Unicidad',
        detalle: '<p>Si $x,y\\in\\bigcap_n A_n$, entonces $x,y\\in A_n$ para todo $n$, luego $d(x,y)\\le\\operatorname{diam}(A_n)\\to0$, y por lo tanto $d(x,y)=0$, es decir $x=y$. La intersección tiene exactamente un punto. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'En un espacio completo, un encaje de cerrados no vacíos con diámetros que tienden a $0$ tiene intersección igual a un único punto. Se usan: elección de representantes, el diámetro para la propiedad de Cauchy, la completitud y la cerradura para capturar el límite, y de nuevo el diámetro para la unicidad.',
  },
];
