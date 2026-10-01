// utils/guia-p1.js — Práctica 1 resuelta (Supremos e ínfimos, Sucesiones).
// Cada item es config para solvedExercise(). El enunciado se toma de consigna(1,n).
// Las demostraciones enuncian explícitamente los lemas/axiomas que usan y
// justifican cada premisa, sin apoyarse en propiedades no probadas.

import { consigna } from './ejercicios.js';

const E = (n) => consigna(1, n);

export const GUIA_P1 = [
  {
    fuente: 'Práctica 1 · Ej. 1', enunciado: E(1),
    idea: 'Ambas partes por reducción al absurdo: si la desigualdad no estricta fallara, existiría un $\\varepsilon$ concreto que contradice la hipótesis “para todo $\\varepsilon>0$”.',
    pasos: [
      {
        idea: 'Primera afirmación: planteo del absurdo',
        detalle: '<p>Hipótesis: $x < y + \\varepsilon$ para todo $\\varepsilon > 0$. Tesis: $x \\le y$.</p>'
          + '<p>Supongamos, por el absurdo, que <em>no</em> vale $x \\le y$. Por la tricotomía del orden en $\\mathbb{R}$, esto equivale a $x > y$, y entonces $x - y > 0$.</p>',
      },
      {
        idea: 'Elección del $\\varepsilon$ testigo',
        detalle: '<p>Como $x - y > 0$, es un $\\varepsilon$ admisible: tomamos $\\varepsilon_0 := x - y > 0$.</p>'
          + '<p>Aplicando la hipótesis a este $\\varepsilon_0$ en particular: $\\,x < y + \\varepsilon_0 = y + (x - y) = x$.</p>'
          + '<p>Obtenemos $x < x$, que es falso (contradice la reflexividad/irreflexividad del orden). El absurdo provino de suponer $x > y$; por lo tanto $x \\le y$.</p>',
      },
      {
        idea: 'Segunda afirmación: reducir el módulo a dos desigualdades',
        detalle: '<p>Hipótesis: $|x - y| < \\varepsilon$ para todo $\\varepsilon > 0$. Recordemos que $|x-y| < \\varepsilon \\iff -\\varepsilon < x - y < \\varepsilon$.</p>'
          + '<p>De $x - y < \\varepsilon$ se obtiene $x < y + \\varepsilon$ (para todo $\\varepsilon>0$); de $-\\varepsilon < x - y$ se obtiene $y < x + \\varepsilon$ (para todo $\\varepsilon>0$).</p>',
      },
      {
        idea: 'Aplicar la primera afirmación a ambos lados',
        detalle: '<p>Por la primera parte aplicada a $x < y + \\varepsilon\\ \\forall\\varepsilon$, resulta $x \\le y$.</p>'
          + '<p>La misma primera parte, con los roles de $x$ e $y$ intercambiados, aplicada a $y < x + \\varepsilon\\ \\forall\\varepsilon$, da $y \\le x$.</p>'
          + '<p>De $x \\le y$ y $y \\le x$, por antisimetría del orden, $x = y$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Una desigualdad estricta válida para todo $\\varepsilon>0$ “colapsa” a la desigualdad no estricta; teniéndola en ambos sentidos, se obtiene la igualdad. Se usaron únicamente los axiomas de orden de $\\mathbb{R}$ (tricotomía y antisimetría).',
  },
  {
    fuente: 'Práctica 1 · Ej. 2', enunciado: E(2),
    idea: 'La herramienta central es el Principio de Arquímedes; con él se fabrica un paso $1/n$ menor que la distancia $y-x$ y se ubica un múltiplo de ese paso en el medio.',
    pasos: [
      {
        idea: 'Lema previo: existencia de un entero en un intervalo de longitud $>1$',
        detalle: '<p><strong>Lema.</strong> Si $u, v \\in \\mathbb{R}$ con $v - u > 1$, existe $m \\in \\mathbb{Z}$ con $u < m < v$.</p>'
          + '<p><em>Prueba.</em> Sea $m = \\lfloor u \\rfloor + 1 \\in \\mathbb{Z}$. Por definición de parte entera, $\\lfloor u \\rfloor \\le u < \\lfloor u \\rfloor + 1$, luego $m = \\lfloor u \\rfloor + 1 > u$. Además $m = \\lfloor u \\rfloor + 1 \\le u + 1 < u + (v - u) = v$. Así $u < m < v$. $\\square$</p>',
      },
      {
        idea: '(a) Entero entre $x$ e $y$ cuando $y - x > 1$',
        detalle: '<p>Es exactamente el Lema anterior con $u = x$, $v = y$: existe $m \\in \\mathbb{Z}$ con $x < m < y$.</p>',
      },
      {
        idea: '(b) Racional entre dos reales',
        detalle: '<p>Sean $x < y$, de modo que $y - x > 0$. Por el Principio de Arquímedes existe $n \\in \\mathbb{N}$ con $n(y - x) > 1$, es decir $ny - nx > 1$.</p>'
          + '<p>Aplicando el Lema a $u = nx$, $v = ny$ (cuya diferencia supera $1$), existe $m \\in \\mathbb{Z}$ con $nx < m < ny$. Dividiendo por $n > 0$ (preserva el orden): $x < \\tfrac{m}{n} < y$, y $\\tfrac{m}{n} \\in \\mathbb{Q}$.</p>',
      },
      {
        idea: '(c) Irracional entre dos racionales',
        detalle: '<p>Sean $x < y$ racionales. Definimos $t = x + \\tfrac{\\sqrt{2}}{2}(y - x)$. Como $0 < \\tfrac{\\sqrt2}{2} < 1$, se tiene $x < t < y$.</p>'
          + '<p>$t$ es irracional: si fuera $t \\in \\mathbb{Q}$, entonces $\\tfrac{\\sqrt2}{2} = \\tfrac{t - x}{y - x}$ sería cociente de racionales (recordar $x,y\\in\\mathbb{Q}$, $y\\ne x$), es decir racional; pero $\\tfrac{\\sqrt2}{2}$ es irracional (pues $\\sqrt2$ lo es). Absurdo. Luego $t \\notin \\mathbb{Q}$.</p>',
      },
      {
        idea: '(d) Irracional entre dos reales',
        detalle: '<p>Sean $x < y$ reales. Por (b) existe un racional $r$ con $x < r < y$, y aplicando (b) otra vez en $(r, y)$, un racional $r\'$ con $r < r\' < y$.</p>'
          + '<p>Ahora $r, r\'$ son racionales con $r < r\'$; por (c) existe un irracional $t$ con $r < t < r\'$. Como $x < r < t < r\' < y$, ese $t$ está en $(x, y)$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Todo se apoya en el Principio de Arquímedes (para achicar $1/n$) y en el lema del entero en un intervalo largo. Se prueba que $\\mathbb{Q}$ y los irracionales son ambos densos en $\\mathbb{R}$.',
  },
  {
    fuente: 'Práctica 1 · Ej. 3', enunciado: E(3),
    idea: 'Doble implicación a partir de la definición de ínfimo como <em>la mayor de las cotas inferiores</em>. La condición $\\varepsilon$ traduce esa minimalidad en un enunciado existencial verificable.',
    pasos: [
      {
        idea: 'Marco y definición',
        detalle: '<p>$i = \\inf A$ significa, por definición: (i) $i$ es cota inferior de $A$ ($i \\le a$ para todo $a \\in A$); y (ii) si $t$ es cualquier cota inferior de $A$, entonces $t \\le i$.</p>'
          + '<p>Queremos probar la equivalencia con: (i) $i$ cota inferior, y (ii\') para todo $\\varepsilon>0$ existe $a \\in A$ con $i \\le a < i + \\varepsilon$.</p>',
      },
      {
        idea: '(⇒) De ínfimo a la condición $\\varepsilon$',
        detalle: '<p>Supongamos $i = \\inf A$. La condición (i) es común. Sea $\\varepsilon > 0$; consideremos $i + \\varepsilon > i$.</p>'
          + '<p>Como $i$ es la <em>mayor</em> cota inferior, ningún número estrictamente mayor que $i$ es cota inferior; en particular $i + \\varepsilon$ no lo es. Que $i+\\varepsilon$ no sea cota inferior significa, por negación de la definición, que existe $a \\in A$ con $a < i + \\varepsilon$.</p>'
          + '<p>Además $a \\ge i$ porque $i$ sí es cota inferior. Entonces $i \\le a < i + \\varepsilon$, que es (ii\').</p>',
      },
      {
        idea: '(⇐) De la condición $\\varepsilon$ a ínfimo',
        detalle: '<p>Supongamos (i) e (ii\'). Debemos ver que $i$ es la mayor cota inferior. Sea $t$ una cota inferior cualquiera; probamos $t \\le i$ por el absurdo.</p>'
          + '<p>Si fuera $t > i$, tomamos $\\varepsilon = t - i > 0$. Por (ii\') existe $a \\in A$ con $a < i + \\varepsilon = t$. Pero $t$ es cota inferior, así que $t \\le a$: contradicción con $a < t$.</p>'
          + '<p>Luego toda cota inferior cumple $t \\le i$, y junto con (i) esto es exactamente $i = \\inf A$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La caracterización $\\varepsilon$ es la forma operativa de la minimalidad: “corriéndose a la derecha de $i$ cualquier distancia $\\varepsilon$, siempre aparece un elemento de $A$”. Sólo se usó la definición de ínfimo.',
  },
  {
    fuente: 'Práctica 1 · Ej. 4', enunciado: E(4),
    idea: 'Para cada conjunto se exhibe el candidato a sup/inf y se verifican las dos condiciones de la definición (cota + minimalidad/maximalidad); luego se decide máximo/mínimo según pertenezca o no.',
    pasos: [
      {
        idea: '(a) $A = (a,b]$',
        detalle: '<p><strong>$\\sup A = b$.</strong> $b$ es cota superior ($x \\le b$ para todo $x \\in (a,b]$). Y es la menor: si $t < b$, tomando $x = \\max(t, \\tfrac{a+b}{2})$... más directo: dado $t<b$, el punto medio entre $\\max(t,a)$ y $b$ pertenece a $(a,b]$ y supera a $t$, luego $t$ no es cota superior. Como $b \\in (a,b]$, es $\\max A = b$.</p>'
          + '<p><strong>$\\inf A = a$.</strong> $a$ es cota inferior. Dado $\\varepsilon>0$, el punto $a + \\min(\\varepsilon, b-a)/2 \\in (a,b]$ es $< a+\\varepsilon$, así que por la caracterización $\\varepsilon$ (Ej. 3) $a=\\inf A$. Como $a \\notin (a,b]$, <em>no hay mínimo</em>.</p>',
      },
      {
        idea: '(b) $B = \\{1/2^n : n \\in \\mathbb{N}\\}$',
        detalle: '<p>La sucesión $1/2^n$ es estrictamente decreciente, con mayor término $1/2$ (en $n=1$). Entonces $1/2$ es cota superior y pertenece: $\\sup B = \\max B = 1/2$.</p>'
          + '<p><strong>$\\inf B = 0$.</strong> $0$ es cota inferior ($1/2^n > 0$). Es la mayor: dado $\\varepsilon>0$, por Arquímedes existe $n$ con $2^n > 1/\\varepsilon$ (pues $2^n \\ge n+1 \\to \\infty$), luego $1/2^n < \\varepsilon$; así ninguna cota inferior positiva sirve. Como $0 \\notin B$, <em>no hay mínimo</em>.</p>',
      },
      {
        idea: '(c) $B \\cup \\{0\\}$',
        detalle: '<p>Agregar $0$ no cambia las cotas superiores: $\\sup = \\max = 1/2$ igual que en (b).</p>'
          + '<p>Para el ínfimo, $0$ sigue siendo la mayor cota inferior (mismo argumento), y ahora $0 \\in B \\cup \\{0\\}$: por lo tanto $\\inf = \\min = 0$.</p>',
      },
      {
        idea: '(d) $C = \\{x^2 - x - 1 : x \\in \\mathbb{R}\\}$',
        detalle: '<p>Completando cuadrados, $x^2 - x - 1 = \\left(x - \\tfrac12\\right)^2 - \\tfrac54 \\ge -\\tfrac54$, con igualdad sólo en $x = \\tfrac12$. Entonces $-\\tfrac54$ es cota inferior y se alcanza: $\\inf C = \\min C = -\\tfrac54$.</p>'
          + '<p>$C$ <em>no está acotado superiormente</em>: si $x \\to +\\infty$, $x^2 - x - 1 \\to +\\infty$ (formalmente, dado $M$, para $x > 1 + \\sqrt{M+2}$ se tiene $x^2-x-1>M$). Por lo tanto no existe supremo (finito) ni máximo.</p>',
      },
    ],
    conclusion: 'Máximo y mínimo existen exactamente cuando el sup/inf pertenece al conjunto. La existencia del sup/inf en los casos acotados está garantizada por el Axioma de Completitud; la minimalidad se verifica con la caracterización $\\varepsilon$ del Ej. 3 y con Arquímedes.',
  },
  {
    fuente: 'Práctica 1 · Ej. 5', enunciado: E(5),
    idea: 'Traducir la inclusión $A \\subseteq B$ a comparaciones entre cotas. La clave es que una cota superior de $B$ lo es también de $A$.',
    pasos: [
      {
        idea: '(a) $\\sup A \\le \\sup B$',
        detalle: '<p>Hipótesis: $B$ acotado superiormente y $\\varnothing \\ne A \\subseteq B$. Por el Axioma de Completitud existen $\\sup B$ y, como veremos, $\\sup A$.</p>'
          + '<p>Sea $s_B = \\sup B$. Para todo $a \\in A$: como $a \\in B$ (pues $A \\subseteq B$) y $s_B$ es cota superior de $B$, se tiene $a \\le s_B$. Luego $s_B$ es cota superior de $A$; en particular $A$ está acotado superiormente y (Completitud) existe $s_A = \\sup A$.</p>'
          + '<p>Como $s_A$ es la <em>menor</em> cota superior de $A$ y $s_B$ es una cota superior de $A$, resulta $s_A \\le s_B$, es decir $\\sup A \\le \\sup B$.</p>',
      },
      {
        idea: '(b) $\\inf B \\le \\inf A$',
        detalle: '<p>Simétrico. Si $B$ está acotado inferiormente, sea $i_B = \\inf B$. Para $a \\in A \\subseteq B$ vale $i_B \\le a$, así que $i_B$ es cota inferior de $A$; existe $i_A = \\inf A$ y, por ser la <em>mayor</em> cota inferior de $A$, $i_A \\ge i_B$. Luego $\\inf B \\le \\inf A$.</p>',
      },
      {
        idea: '(c) $A$ no acotado $\\Rightarrow$ $B$ no acotado',
        detalle: '<p>Contrarrecíproco de una inclusión de cotas: si $B$ estuviera acotado (digamos superiormente por $c$), entonces $c$ sería cota superior de $A$ (todo $a \\in A$ está en $B$, luego $a \\le c$), y $A$ estaría acotado. Como por hipótesis $A$ no lo está, $B$ tampoco. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Achicar un conjunto no puede aumentar su supremo ni disminuir su ínfimo, y la no acotación “se hereda” al conjunto mayor. Se usó el Axioma de Completitud para garantizar la existencia de los sup/inf.',
  },
  {
    fuente: 'Práctica 1 · Ej. 6', enunciado: E(6),
    idea: 'Reflejar por $-1$ invierte el orden y transforma cotas superiores de $A$ en cotas inferiores de $-A$; multiplicar por $c>0$ lo preserva. En ambos casos se verifican las dos condiciones de la definición.',
    pasos: [
      {
        idea: '(a) $-s$ es cota inferior de $-A$',
        detalle: '<p>Sea $s = \\sup A$ (existe por Completitud, $A$ acotado sup. y no vacío). Los elementos de $-A$ son los $-a$ con $a \\in A$.</p>'
          + '<p>Para todo $a \\in A$: $a \\le s \\iff -a \\ge -s$ (multiplicar por $-1$ invierte la desigualdad). Luego $-s \\le -a$ para todo $-a \\in -A$: $-s$ es cota inferior de $-A$.</p>',
      },
      {
        idea: '(a) $-s$ es la mayor cota inferior',
        detalle: '<p>Sea $c$ cualquier cota inferior de $-A$: $c \\le -a$ para todo $a\\in A$, o sea $-c \\ge a$ para todo $a$. Entonces $-c$ es cota superior de $A$, y como $s = \\sup A$ es la menor, $-c \\ge s$, es decir $c \\le -s$.</p>'
          + '<p>Toda cota inferior de $-A$ es $\\le -s$, y $-s$ lo es: por definición $\\inf(-A) = -s = -\\sup A$.</p>',
      },
      {
        idea: '(b) $\\sup(cA) = c\\,\\sup A$ para $c>0$',
        detalle: '<p>Los elementos de $cA$ son $ca$, $a\\in A$. Como $c>0$, multiplicar por $c$ preserva el orden: $a \\le s \\iff ca \\le cs$. Luego $cs$ es cota superior de $cA$.</p>'
          + '<p>Es la menor: si $t$ es cota superior de $cA$, entonces $ca \\le t$ para todo $a$, o sea $a \\le t/c$ (usando $c>0$); así $t/c$ es cota superior de $A$ y $t/c \\ge s$, de donde $t \\ge cs$. Por lo tanto $\\sup(cA) = cs = c\\sup A$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La reflexión intercambia sup e inf con cambio de signo; el escalado positivo saca la constante del supremo. Ambas pruebas verifican las <em>dos</em> condiciones (ser cota y ser la óptima), no sólo la primera.',
  },
  {
    fuente: 'Práctica 1 · Ej. 7', enunciado: E(7),
    idea: 'En cada caso se calcula exactamente $|a_n - \\ell|$, se acota por una expresión sencilla y se resuelve la desigualdad; el $n_0$ existe por Arquímedes. Se prueba por la definición formal de límite.',
    pasos: [
      {
        idea: '(a) $\\lim \\tfrac{3-2n}{n+1} = -2$',
        detalle: '<p>Sea $\\varepsilon>0$. Calculamos $\\left|\\tfrac{3-2n}{n+1} - (-2)\\right| = \\left|\\tfrac{3-2n+2(n+1)}{n+1}\\right| = \\left|\\tfrac{5}{n+1}\\right| = \\tfrac{5}{n+1}$ (positivo).</p>'
          + '<p>$\\tfrac{5}{n+1} < \\varepsilon \\iff n+1 > \\tfrac5\\varepsilon \\iff n > \\tfrac5\\varepsilon - 1$. Por Arquímedes existe $n_0 \\in \\mathbb{N}$ con $n_0 > \\tfrac5\\varepsilon - 1$. Para todo $n \\ge n_0$ vale la desigualdad, luego $|a_n+2| < \\varepsilon$.</p>',
      },
      {
        idea: '(b) $\\lim \\tfrac{\\sin n}{n} = 0$',
        detalle: '<p>Sea $\\varepsilon>0$. Como $|\\sin n| \\le 1$, $\\left|\\tfrac{\\sin n}{n} - 0\\right| = \\tfrac{|\\sin n|}{n} \\le \\tfrac1n$.</p>'
          + '<p>$\\tfrac1n < \\varepsilon \\iff n > \\tfrac1\\varepsilon$; por Arquímedes existe tal $n_0$. Para $n \\ge n_0$: $\\left|\\tfrac{\\sin n}{n}\\right| \\le \\tfrac1n < \\varepsilon$. (Este paso es el criterio del Ej. 8 con $a_n = 1/n$.)</p>',
      },
      {
        idea: '(c) $\\lim \\tfrac{2n-3}{2n+4} = 1$',
        detalle: '<p>Sea $\\varepsilon>0$. $\\left|\\tfrac{2n-3}{2n+4} - 1\\right| = \\left|\\tfrac{2n-3-(2n+4)}{2n+4}\\right| = \\tfrac{7}{2n+4}$.</p>'
          + '<p>$\\tfrac{7}{2n+4} < \\varepsilon \\iff 2n+4 > \\tfrac7\\varepsilon \\iff n > \\tfrac{7/\\varepsilon - 4}{2}$. Por Arquímedes existe $n_0$ con esa cota; para $n \\ge n_0$ vale $|a_n - 1| < \\varepsilon$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'El método es sistemático: se calcula $|a_n-\\ell|$ de forma exacta, se lo acota por una expresión monótona en $n$, se despeja $n$ y se invoca Arquímedes para asegurar el $n_0$.',
  },
  {
    fuente: 'Práctica 1 · Ej. 8', enunciado: E(8),
    idea: 'Es el criterio del sándwich en su versión con una sola cota: la sucesión de control $a_n \\to 0$ fuerza $|x_n - \\ell| \\to 0$.',
    pasos: [
      {
        idea: 'Traducir las hipótesis',
        detalle: '<p>Hipótesis: $|x_n - \\ell| \\le a_n$ para todo $n$, y $a_n \\to 0$. Notar que entonces $a_n \\ge 0$ (por ser $\\ge |x_n-\\ell| \\ge 0$).</p>',
      },
      {
        idea: 'Usar la definición de $a_n \\to 0$',
        detalle: '<p>Sea $\\varepsilon>0$. Por definición de $a_n \\to 0$, existe $n_0$ tal que para todo $n \\ge n_0$ se cumple $|a_n - 0| < \\varepsilon$, es decir $a_n < \\varepsilon$ (usando $a_n \\ge 0$).</p>',
      },
      {
        idea: 'Encadenar y concluir',
        detalle: '<p>Para $n \\ge n_0$: $|x_n - \\ell| \\le a_n < \\varepsilon$. Como $\\varepsilon>0$ era arbitrario, esto es exactamente la definición de $x_n \\to \\ell$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Si la distancia al límite queda dominada por una sucesión nula, la sucesión converge. Es la herramienta que legitima acotaciones como $|\\sin n / n| \\le 1/n$ (Ej. 7b).',
  },
  {
    fuente: 'Práctica 1 · Ej. 9', enunciado: E(9),
    idea: 'El caso finito usa la desigualdad triangular con el reparto $\\varepsilon/2 + \\varepsilon/2$. Los casos con infinito se tratan con la definición de divergencia y una cota inferior de la parte convergente. El caso $+\\infty-\\infty$ se refuta con un contraejemplo.',
    pasos: [
      {
        idea: '(a) $\\ell_1, \\ell_2$ finitos',
        detalle: '<p>Sea $\\varepsilon>0$. Existen $n_1$ con $|x_n-\\ell_1| < \\varepsilon/2$ ($n\\ge n_1$) y $n_2$ con $|y_n-\\ell_2| < \\varepsilon/2$ ($n\\ge n_2$). Sea $n_0 = \\max(n_1,n_2)$.</p>'
          + '<p>Para $n \\ge n_0$, por desigualdad triangular: $|(x_n+y_n)-(\\ell_1+\\ell_2)| \\le |x_n-\\ell_1| + |y_n-\\ell_2| < \\tfrac\\varepsilon2 + \\tfrac\\varepsilon2 = \\varepsilon$.</p>',
      },
      {
        idea: '(b) $\\ell_1 \\in \\mathbb{R}$, $\\ell_2 = +\\infty$',
        detalle: '<p>Como $x_n \\to \\ell_1$ finito, $(x_n)$ está acotada (Lema: toda sucesión convergente es acotada); en particular existe $c$ con $x_n \\ge c$ para todo $n$.</p>'
          + '<p>Sea $M>0$. Como $y_n \\to +\\infty$, existe $n_0$ con $y_n > M - c$ para $n \\ge n_0$. Entonces $x_n + y_n > c + (M-c) = M$. Luego $x_n + y_n \\to +\\infty$.</p>',
      },
      {
        idea: '(c) $\\ell_1 = \\ell_2 = +\\infty$',
        detalle: '<p>Sea $M>0$. Existen $n_1, n_2$ con $x_n > M/2$ ($n \\ge n_1$) e $y_n > M/2$ ($n \\ge n_2$). Para $n \\ge \\max(n_1,n_2)$: $x_n + y_n > M$. Luego $x_n+y_n \\to +\\infty$.</p>',
      },
      {
        idea: '(d) $+\\infty$ y $-\\infty$: indeterminación',
        detalle: '<p>No hay una regla general. Contraejemplo: $x_n = n \\to +\\infty$, $y_n = -n \\to -\\infty$, pero $x_n + y_n = 0 \\to 0$. Con $y_n = -n + 5$ el mismo esquema da límite $5$, y con $y_n = -2n$ da $-\\infty$: el resultado depende de las sucesiones, por eso “$\\infty - \\infty$” no está definido. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La suma respeta límites finitos (triangular + reparto de $\\varepsilon$) y las combinaciones con un solo infinito (acotación de la parte convergente). El caso $+\\infty - \\infty$ es genuinamente indeterminado. Se usó el lema “convergente $\\Rightarrow$ acotada”.',
  },
  {
    fuente: 'Práctica 1 · Ej. 10', enunciado: E(10),
    idea: 'Paso al límite de una desigualdad no estricta, por el absurdo: si el orden se invirtiera en el límite, se podrían separar las colas con bandas disjuntas, contradiciendo $x_n \\le y_n$.',
    pasos: [
      {
        idea: 'Planteo del absurdo',
        detalle: '<p>Hipótesis: $x_n \\to \\ell_1$, $y_n \\to \\ell_2$ y $x_n \\le y_n$ para todo $n$. Tesis: $\\ell_1 \\le \\ell_2$.</p>'
          + '<p>Supongamos, por el absurdo, $\\ell_1 > \\ell_2$. Definimos $\\varepsilon = \\tfrac{\\ell_1 - \\ell_2}{2} > 0$ y el punto medio $m = \\tfrac{\\ell_1+\\ell_2}{2}$, de modo que $\\ell_1 - \\varepsilon = m = \\ell_2 + \\varepsilon$.</p>',
      },
      {
        idea: 'Separar las colas',
        detalle: '<p>Por $x_n \\to \\ell_1$, existe $n_1$ con $|x_n - \\ell_1| < \\varepsilon$ para $n \\ge n_1$; en particular $x_n > \\ell_1 - \\varepsilon = m$.</p>'
          + '<p>Por $y_n \\to \\ell_2$, existe $n_2$ con $|y_n - \\ell_2| < \\varepsilon$ para $n \\ge n_2$; en particular $y_n < \\ell_2 + \\varepsilon = m$.</p>',
      },
      {
        idea: 'Contradicción',
        detalle: '<p>Para $n \\ge \\max(n_1, n_2)$: $x_n > m > y_n$, es decir $x_n > y_n$. Esto contradice la hipótesis $x_n \\le y_n$. Por lo tanto $\\ell_1 \\le \\ell_2$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'El orden entre términos pasa al límite en forma no estricta. Advertencia: aunque valga $x_n < y_n$ estricto, en el límite sólo se garantiza $\\ell_1 \\le \\ell_2$ (ej. $0 < 1/n$ pero ambos límites son $0$).',
  },
  {
    fuente: 'Práctica 1 · Ej. 11', enunciado: E(11),
    idea: 'La acotación de $(y_n)$ impide que el producto “escape”: se domina $|x_n y_n|$ por $M|x_n|$, con $M$ cota de $(y_n)$, y se aplica la definición.',
    pasos: [
      {
        idea: 'Usar la acotación de $(y_n)$',
        detalle: '<p>Por hipótesis $(y_n)$ está acotada: existe $M>0$ con $|y_n| \\le M$ para todo $n$. Entonces, para todo $n$: $|x_n y_n| = |x_n|\\,|y_n| \\le M\\,|x_n|$.</p>',
      },
      {
        idea: 'Aplicar $x_n \\to 0$',
        detalle: '<p>Sea $\\varepsilon>0$. Como $x_n \\to 0$, existe $n_0$ tal que $|x_n| < \\tfrac{\\varepsilon}{M}$ para $n \\ge n_0$ (podemos dividir por $M>0$).</p>',
      },
      {
        idea: 'Concluir',
        detalle: '<p>Para $n \\ge n_0$: $|x_n y_n| \\le M\\,|x_n| < M \\cdot \\tfrac{\\varepsilon}{M} = \\varepsilon$. Luego $x_n y_n \\to 0$. $\\blacksquare$</p>'
          + '<p><em>Observación:</em> la hipótesis de acotación es esencial: $x_n = 1/n \\to 0$ pero $y_n = n$ (no acotada) da $x_n y_n = 1 \\not\\to 0$.</p>',
      },
    ],
    conclusion: 'Sucesión nula por sucesión acotada da sucesión nula. Alternativamente sale del sándwich (Ej. 8) con $a_n = M|x_n| \\to 0$.',
  },
  {
    fuente: 'Práctica 1 · Ej. 12', enunciado: E(12),
    idea: 'Es el Teorema de la Convergencia Monótona. La existencia del ínfimo viene del Axioma de Completitud; la caracterización $\\varepsilon$ (Ej. 3) más la monotonía atrapan toda la cola en la banda.',
    pasos: [
      {
        idea: '(a) Definir el candidato',
        detalle: '<p>Sea $(x_n)$ decreciente y acotada inferiormente. El conjunto $S = \\{x_n : n \\in \\mathbb{N}\\}$ es no vacío y acotado inferiormente, así que por el Axioma de Completitud existe $\\ell = \\inf S$.</p>',
      },
      {
        idea: '(a) Atrapar la cola',
        detalle: '<p>Sea $\\varepsilon>0$. Por la caracterización $\\varepsilon$ del ínfimo (Ej. 3), existe un índice $n_0$ con $x_{n_0} < \\ell + \\varepsilon$.</p>'
          + '<p>Como $(x_n)$ es decreciente, para todo $n \\ge n_0$ vale $x_n \\le x_{n_0} < \\ell + \\varepsilon$. Y $x_n \\ge \\ell$ siempre, por ser $\\ell$ cota inferior. Entonces $\\ell \\le x_n < \\ell + \\varepsilon$, es decir $0 \\le x_n - \\ell < \\varepsilon$, o sea $|x_n - \\ell| < \\varepsilon$. Luego $x_n \\to \\ell = \\inf\\{x_n\\}$.</p>',
      },
      {
        idea: '(b) Caso no acotada inferiormente',
        detalle: '<p>Si $(x_n)$ no está acotada inferiormente, dado $M>0$ existe $n_0$ con $x_{n_0} < -M$ (si no, $-M$ sería cota inferior). Por ser decreciente, $x_n \\le x_{n_0} < -M$ para todo $n \\ge n_0$. Esto es la definición de $x_n \\to -\\infty$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Toda sucesión decreciente tiene límite en $\\overline{\\mathbb{R}}$: su ínfimo si está acotada inferiormente, o $-\\infty$ si no. (El caso creciente es dual, con el supremo.) Depende crucialmente de la Completitud.',
  },
  {
    fuente: 'Práctica 1 · Ej. 13', enunciado: E(13),
    idea: 'Se construye la sucesión por recursión, usando la caracterización $\\varepsilon$ para elegir en cada paso un elemento más cercano al supremo que el anterior y que $s - 1/k$. La convergencia sale por sándwich.',
    pasos: [
      {
        idea: 'Marco',
        detalle: '<p>Sea $s = \\sup A$ (existe por Completitud). Como $A$ no tiene máximo, $s \\notin A$; en consecuencia todo $a \\in A$ cumple $a < s$ (estricto).</p>',
      },
      {
        idea: 'Construcción recursiva',
        detalle: '<p><strong>Base:</strong> por la caracterización $\\varepsilon$ del supremo (con $\\varepsilon = 1$), existe $a_1 \\in A$ con $s - 1 < a_1 < s$.</p>'
          + '<p><strong>Paso:</strong> supongamos elegido $a_k \\in A$ (con $a_k < s$). Tomamos $\\varepsilon_k = \\min\\left(s - a_k,\\ \\tfrac{1}{k+1}\\right) > 0$. Por la caracterización, existe $a_{k+1} \\in A$ con $s - \\varepsilon_k < a_{k+1} < s$.</p>'
          + '<p>De $s - \\varepsilon_k \\ge s - (s - a_k) = a_k$ se sigue $a_{k+1} > a_k$ (estrictamente creciente) y de $s-\\varepsilon_k \\ge s - \\tfrac1{k+1}$ que $a_{k+1} > s - \\tfrac1{k+1}$.</p>',
      },
      {
        idea: 'Convergencia',
        detalle: '<p>Para todo $k$: $s - \\tfrac1k < a_k < s$, luego $|a_k - s| < \\tfrac1k$. Como $\\tfrac1k \\to 0$, por el criterio del sándwich (Ej. 8) $a_k \\to s = \\sup A$. La sucesión es estrictamente creciente por construcción. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Aun cuando el supremo no se alcanza, se lo aproxima por una sucesión estrictamente creciente de elementos del conjunto. La construcción usa recursión y la caracterización $\\varepsilon$ del supremo.',
  },
  {
    fuente: 'Práctica 1 · Ej. 14', enunciado: E(14),
    idea: 'Se extraen índices por recursión, garantizando en cada paso un valor mayor. El punto fino es que quitar finitos términos no acota una sucesión no acotada, lo que permite continuar la construcción.',
    pasos: [
      {
        idea: 'Lema auxiliar',
        detalle: '<p><strong>Lema.</strong> Si $(x_n)$ no está acotada superiormente, entonces para cada $N \\in \\mathbb{N}$ y cada cota $C$, existe $n > N$ con $x_n > C$.</p>'
          + '<p><em>Prueba.</em> El conjunto $\\{x_1,\\dots,x_N\\}$ es finito, con máximo $Q$. Si para todo $n>N$ fuese $x_n \\le C$, entonces $\\max(Q, C)$ acotaría toda la sucesión, contradiciendo la no acotación. $\\square$</p>',
      },
      {
        idea: 'Construcción de la subsucesión',
        detalle: '<p><strong>Base:</strong> por el Lema (con $N=0$, $C=1$) existe $n_1$ con $x_{n_1} > 1$.</p>'
          + '<p><strong>Paso:</strong> dado $n_k$, por el Lema (con $N = n_k$, $C = k+1$) existe $n_{k+1} > n_k$ con $x_{n_{k+1}} > k+1$. Los índices son estrictamente crecientes, luego $(x_{n_k})$ es una subsucesión legítima.</p>',
      },
      {
        idea: 'Divergencia a $+\\infty$',
        detalle: '<p>Por construcción $x_{n_k} > k$ para todo $k$. Dado $M>0$, para $k \\ge \\lceil M \\rceil$ se tiene $x_{n_k} > k \\ge M$; esto es la definición de $x_{n_k} \\to +\\infty$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'De toda sucesión no acotada superiormente se extrae una subsucesión que diverge a $+\\infty$. El lema (quitar finitos no acota) es lo que legitima el paso recursivo con $n_{k+1} > n_k$.',
  },
  {
    fuente: 'Práctica 1 · Ej. 15', enunciado: E(15),
    idea: 'Por el absurdo. Negar $x_n \\to \\ell$ produce una subsucesión que se mantiene a distancia $\\ge \\varepsilon_0$ de $\\ell$; ninguna de sus subsubsucesiones puede converger a $\\ell$, contradiciendo la hipótesis.',
    pasos: [
      {
        idea: 'Negación cuantificada de la convergencia',
        detalle: '<p>Que $x_n \\to \\ell$ es: $\\forall \\varepsilon>0\\ \\exists n_0\\ \\forall n\\ge n_0:\\ |x_n-\\ell|<\\varepsilon$. Su negación es: $\\exists \\varepsilon_0>0\\ \\forall n_0\\ \\exists n\\ge n_0:\\ |x_n-\\ell|\\ge \\varepsilon_0$.</p>'
          + '<p>Supongamos, por el absurdo, que $x_n \\not\\to \\ell$, y sea $\\varepsilon_0$ el testigo.</p>',
      },
      {
        idea: 'Construir la subsucesión “lejana”',
        detalle: '<p>Usando la negación repetidamente: elegimos $n_1$ con $|x_{n_1}-\\ell| \\ge \\varepsilon_0$; dado $n_k$, tomamos $n_{k+1} > n_k$ con $|x_{n_{k+1}} - \\ell| \\ge \\varepsilon_0$. Así obtenemos una subsucesión $(x_{n_k})$ con $|x_{n_k} - \\ell| \\ge \\varepsilon_0$ para todo $k$.</p>',
      },
      {
        idea: 'Contradicción con la hipótesis',
        detalle: '<p>Toda subsubsucesión $\\big(x_{n_{k_j}}\\big)_j$ de $(x_{n_k})$ hereda $|x_{n_{k_j}} - \\ell| \\ge \\varepsilon_0$ para todo $j$, así que ninguna converge a $\\ell$.</p>'
          + '<p>Pero la hipótesis afirma que la subsucesión $(x_{n_k})$ posee <em>alguna</em> subsubsucesión que converge a $\\ell$. Contradicción. Por lo tanto $x_n \\to \\ell$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Criterio muy útil: para probar $x_n \\to \\ell$ basta ver que toda subsucesión admite una subsubsucesión con límite $\\ell$. La prueba es puramente la manipulación de la negación de la definición de límite.',
  },
  {
    fuente: 'Práctica 1 · Ej. 16', enunciado: E(16),
    idea: 'Cada parte cubre todos los índices con subsucesiones que convergen al mismo límite; se combinan sus $n_0$. En (b) primero hay que probar que los tres límites coinciden usando subsucesiones compartidas.',
    pasos: [
      {
        idea: '(a) Pares e impares al mismo límite',
        detalle: '<p>Supongamos $x_{2k} \\to \\ell$ y $x_{2k-1} \\to \\ell$. Sea $\\varepsilon>0$. Existen $K_1$ con $|x_{2k}-\\ell|<\\varepsilon$ ($k\\ge K_1$) y $K_2$ con $|x_{2k-1}-\\ell|<\\varepsilon$ ($k \\ge K_2$).</p>'
          + '<p>Sea $n_0 = \\max(2K_1,\\ 2K_2 - 1)$. Todo $n \\ge n_0$ es par ($n=2k$ con $k \\ge K_1$) o impar ($n = 2k-1$ con $k \\ge K_2$); en ambos casos $|x_n - \\ell| < \\varepsilon$. Luego $x_n \\to \\ell$.</p>',
      },
      {
        idea: '(b) Igualar los tres límites',
        detalle: '<p>Sean $\\ell_2 = \\lim x_{2k}$, $\\ell_3 = \\lim x_{3k}$, $\\ell_i = \\lim x_{2k-1}$ (existen por hipótesis).</p>'
          + '<p>La sucesión $(x_{6k})$ es subsucesión de $(x_{2k})$ y de $(x_{3k})$; como toda subsucesión de una convergente converge al mismo límite (Ej. 15/Prop. de subsucesiones), $\\ell_2 = \\ell_3$. Análogamente $(x_{6k-3}) = (x_{3(2k-1)})$ es subsucesión de $(x_{3k})$ y de $(x_{2k-1})$, luego $\\ell_i = \\ell_3$.</p>',
      },
      {
        idea: '(b) Reducir a (a)',
        detalle: '<p>De lo anterior $\\ell_2 = \\ell_i\\ (= \\ell_3)$: las subsucesiones par e impar convergen al mismo límite. Por la parte (a), $(x_n)$ converge (a ese límite común). $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Si subsucesiones que <em>cubren</em> todos los índices convergen al mismo valor, la sucesión converge. En (b) el ingrediente clave es que $(x_{6k})$ y $(x_{6k-3})$ son subsucesiones comunes que fuerzan la igualdad de los tres límites.',
  },
];
