// utils/ejercicios.js — consignas de los ejercicios de las Prácticas 1-4.
// Permite mostrar, además del número, el enunciado real del ejercicio.

import { el } from '../../js/utils/dom.js';

// Clave: "p.n" (práctica.ejercicio). Valor: consigna en HTML/LaTeX.
export const EJERCICIOS = {
  // ---------- Práctica 1 (Supremos, Sucesiones) ----------
  '1.1': 'Probar que si $x < y + \\varepsilon$ para todo $\\varepsilon > 0$, entonces $x \\le y$. '
       + 'Deducir que si $|x - y| < \\varepsilon$ para todo $\\varepsilon > 0$, entonces $x = y$.',
  '1.2': 'Probar la densidad: (a) si $y - x > 1$ hay un entero entre $x$ e $y$; (b) entre dos reales '
       + 'hay un racional; (c) entre dos racionales hay un irracional; (d) entre dos reales hay un irracional.',
  '1.3': 'Sea $A \\subseteq \\mathbb{R}$ no vacío y acotado inferiormente. Probar la equivalencia: '
       + '$i = \\inf A \\iff$ ($i \\le a\\ \\forall a \\in A$) y ($\\forall \\varepsilon > 0\\ \\exists a \\in A: i \\le a < i + \\varepsilon$).',
  '1.4': 'Hallar, si existen, supremo, ínfimo, máximo y mínimo de: (a) $(a,b]$; '
       + '(b) $B = \\{\\tfrac{1}{2^n} : n \\in \\mathbb{N}\\}$; (c) $B \\cup \\{0\\}$; (d) $\\{x^2 - x - 1 : x \\in \\mathbb{R}\\}$; y probarlo.',
  '1.5': 'Sean $A \\subseteq B \\subseteq \\mathbb{R}$, $A \\ne \\varnothing$. Probar: (a) si $B$ está acotado '
       + 'superiormente, $A$ también y $\\sup A \\le \\sup B$; (b) análogo con ínfimos; (c) si $A$ no está acotado, $B$ tampoco.',
  '1.6': 'Dado $c \\in \\mathbb{R}$, sea $cA = \\{ca : a \\in A\\}$. Probar: (a) si $A$ está acotado sup., '
       + 'entonces $-A$ está acotado inf. e $\\inf(-A) = -\\sup A$; (b) si $c > 0$, $\\sup(cA) = c\\,\\sup A$.',
  '1.7': 'Probar, usando la definición de límite: (a) $\\lim \\tfrac{3-2n}{n+1} = -2$; '
       + '(b) $\\lim \\tfrac{\\sin n}{n} = 0$; (c) $\\lim \\tfrac{2n-3}{2n+4} = 1$.',
  '1.8': 'Sean $(x_n)$ y $(a_n)$ sucesiones reales. Probar que si $|x_n - \\ell| \\le a_n$ para todo $n$ y '
       + '$a_n \\to 0$, entonces $x_n \\to \\ell$ (criterio del sandwich).',
  '1.9': 'Si $x_n \\to \\ell_1$ e $y_n \\to \\ell_2$, probar que $x_n + y_n \\to \\ell_1 + \\ell_2$ en los casos: '
       + '(a) ambos finitos; (b) $\\ell_1$ finito, $\\ell_2 = \\infty$; (c) ambos $+\\infty$; (d) por qué falla si $+\\infty$ y $-\\infty$.',
  '1.10': 'Si $x_n \\to \\ell_1$, $y_n \\to \\ell_2$ y $x_n \\le y_n$ para todo $n$, probar que $\\ell_1 \\le \\ell_2$.',
  '1.11': 'Si $(x_n)$ converge a $0$ e $(y_n)$ está acotada, probar que $(x_n y_n)$ converge a $0$.',
  '1.12': 'Sea $(x_n)$ decreciente. Probar: (a) si está acotada inferiormente, converge y '
        + '$\\lim x_n = \\inf\\{x_n\\}$; (b) si no lo está, $x_n \\to -\\infty$.',
  '1.13': 'Sea $A$ acotado sup. y no vacío. Probar que si $A$ no tiene máximo, existe $(a_n) \\subseteq A$ '
        + 'estrictamente creciente con $a_n \\to \\sup A$.',
  '1.14': 'Sea $(x_n)$ no acotada superiormente. Probar que existe una subsucesión $(x_{n_k})$ que diverge a $+\\infty$.',
  '1.15': 'Probar que si toda subsucesión de $(x_n)$ tiene a su vez una subsubsucesión que converge a $\\ell$, '
        + 'entonces $(x_n)$ converge a $\\ell$.',
  '1.16': 'Probar: (a) si $(x_{2k})$ y $(x_{2k-1})$ convergen al mismo límite, $(x_n)$ converge; '
        + '(b) si $(x_{2k})$, $(x_{2k-1})$ y $(x_{3k})$ convergen, $(x_n)$ converge.',

  // ---------- Práctica 2 (Cardinalidad) ----------
  '2.1': 'Hallar el cardinal de: (a) $\\mathbb{Z}_{\\le -3}$; (b) $5\\mathbb{Z}$; (c) $\\mathbb{Z} \\times \\mathbb{N}$; (d) $(-1,1) \\cap \\mathbb{Q}$.',
  '2.2': 'Sean $A$ y $B$ conjuntos contables. Probar que $A \\cup B$ es contable.',
  '2.3': 'Sean $A\\subseteq B$ conjuntos tales que $A$ es contable y $B\\setminus A$ es infinito. '
       + '(a) Probar que existe $C\\subseteq B\\setminus A$ tal que $C\\sim C\\cup A$. (b) Deducir que $B\\setminus A\\sim B$.',
  '2.4': 'Hallar el cardinal del conjunto de los números irracionales.',
  '2.5': 'Sea $(A_n)_{n\\in\\mathbb{N}}$ una sucesión de conjuntos y $A=\\bigcup_{n\\in\\mathbb{N}}A_n$. '
       + '(a) Encontrar una sucesión $(B_n)$ de conjuntos disjuntos dos a dos tal que $B_n\\subseteq A_n$ para todo $n$ y '
       + '$\\bigcup_{n\\le m}B_n=\\bigcup_{n\\le m}A_n$ para todo $m$. '
       + '(b) Probar que para toda $(B_n)$ como arriba se tiene $A=\\bigcup_{n\\in\\mathbb{N}}B_n$.',
  '2.6': '(a) Sea $\\{A_n\\}_{n \\in \\mathbb{N}}$ familia de conjuntos contables. Probar que $\\bigcup_n A_n$ es contable. '
       + '(b) Con alfabeto finito, hay más reales que palabras (sucesiones finitas de símbolos).',
  '2.7': 'Sea $c = \\#\\mathbb{R}$. Probar: (a) si $\\#A = \\#B = c$, entonces $\\#(A \\cup B) = c$; '
       + '(b) si $\\#A_n = c\\ \\forall n$, entonces $\\#(\\bigcup_n A_n) = c$.',
  '2.8': 'Sea $A$ un conjunto. (a) Probar que $\\mathcal{P}(A) \\sim \\{0,1\\}^A$; (b) concluir que si $\\#A = n$, entonces $\\#\\mathcal{P}(A) = 2^n$.',
  '2.9': 'Sean $A$ y $B$ conjuntos. Probar: (a) $\\mathcal{P}(A)\\cap\\mathcal{P}(B)=\\mathcal{P}(A\\cap B)$; '
       + '(b) $\\mathcal{P}(A)\\cup\\mathcal{P}(B)\\subseteq\\mathcal{P}(A\\cup B)$; (c) $A\\sim B\\Rightarrow\\mathcal{P}(A)\\sim\\mathcal{P}(B)$.',
  '2.10': '(a) Probar que $[0,1) \\sim \\{0,1\\}^{\\mathbb{N}}$ (sugerencia: desarrollo binario; ¡ojo!, no es único). (b) Concluir que $\\#\\mathcal{P}(\\mathbb{N}) = c$.',
  '2.11': 'Probar que si $A$ es numerable, entonces $\\mathcal{P}_f(A) = \\{B \\subseteq A : B \\text{ finito}\\}$ es numerable.',
  '2.12': '(a) Probar que el conjunto de los números primos es numerable. '
        + '(b) Escribir a $\\mathbb{N}$ como unión numerable de conjuntos numerables disjuntos dos a dos.',
  '2.13': 'Calcular el cardinal del conjunto $\\{B\\subseteq\\mathbb{N}:\\ \\#B=\\#(\\mathbb{N}\\setminus B)=\\aleph_0\\}$.',
  '2.14': 'Calcular el cardinal de: (a) $\\mathcal{P}(\\mathbb{N}) \\times \\mathcal{P}(\\mathbb{N})$; (b) $[0,1) \\times [0,1)$; (c) $\\mathbb{R}^k$ para cada $k \\in \\mathbb{N}$.',
  '2.15': 'Calcular el cardinal de $\\mathbb{R}[X]$ (polinomios con coeficientes reales).',
  '2.16': 'Calcular el cardinal de: (a) $\\{(a_n)_{n\\in\\mathbb{N}}\\subseteq\\mathbb{Z}:\\ (a_n)\\text{ converge}\\}$; '
        + '(b) $\\{(a_n)_{n\\in\\mathbb{N}}\\subseteq\\mathbb{Q}:\\ (a_n)\\text{ es periódica}\\}$.',
  '2.17': '(a) Sea $I$ un conjunto de índices y $\\{A_i\\}_{i\\in I}$ una familia de <em>intervalos</em> con $\\#A_i>1$ para todo $i$ y '
        + '$A_i\\cap A_j=\\varnothing$ si $i\\ne j$. Probar que $I$ es contable. '
        + '(b) Sea $f:\\mathbb{R}\\to\\mathbb{R}$ monótona. Probar que el conjunto de sus discontinuidades es contable.',

  // ---------- Práctica 3 (Espacios métricos) ----------
  '3.1': 'Probar que son espacios métricos (dibujar una bola abierta): (a) $\\mathbb{R}$ con $|x-y|$; '
       + '(b) $\\mathbb{R}^n$ con $d_2$; (c) con $d_1$; (d) con $d_\\infty$; (e) $C([0,1])$ con $d_\\infty$; (f) la métrica discreta $\\delta$.',
  '3.2': 'Decidir cuáles son métricas en $\\mathbb{R}$: (a) $d(x,y) = (x-y)^2$; (b) $d(x,y) = \\sqrt{|x-y|}$; (c) $d(x,y) = |x^2 - y^2|$.',
  '3.3': 'Hallar interior y clausura de cada subconjunto de $\\mathbb{R}$, y decidir si es abierto o cerrado: '
       + '(a) $[0,1]$; (b) $(0,1)$; (c) $\\mathbb{Q}$; (d) $\\mathbb{Q} \\cap [0,1]$; (e) $\\mathbb{Z}$; (f) $[0,1) \\cup \\{2\\}$; '
       + '(g) $\\{\\tfrac1n\\}$; (h) $\\{\\tfrac1n\\} \\cup \\{0\\}$.',
  '3.4': 'Sea $(E,d)$ espacio métrico, $x \\in E$, $r > 0$. Probar: (a) $\\{x\\}$ es cerrado; (b) $B(x,r)$ es abierto; '
       + '(c) si $r > r\' > 0$ entonces $B(x,r\') \\subseteq B(x,r)$; (d) $\\overline{B}(x,r)=\\{y \\in E : d(x,y) \\le r\\}$ es cerrado; '
       + '(e) deducir que $\\overline{B(x,r)} \\subseteq \\overline{B}(x,r)$; (f) dar un ejemplo donde $\\overline{B(x,r)}$ sea un subconjunto propio de $\\overline{B}(x,r)$; '
       + '(g) probar que $\\{y \\in E : 2 < d(y,x) < 3\\}$ es abierto.',
  '3.5': 'Sea $A \\subseteq E$. Probar: (a) $E \\setminus A^\\circ = \\overline{E \\setminus A}$; '
       + '(b) $E \\setminus \\overline{A} = (E \\setminus A)^\\circ$. ¿Valen $\\overline{A} = \\overline{A^\\circ}$ y $A^\\circ = (\\overline{A})^\\circ$?',
  '3.6': 'Sean $A, B \\subseteq E$. Probar: (a) $(A \\cap B)^\\circ = A^\\circ \\cap B^\\circ$; '
       + '(b) $A^\\circ \\cup B^\\circ \\subseteq (A \\cup B)^\\circ$; (c) $\\overline{A \\cup B} = \\overline{A} \\cup \\overline{B}$; '
       + '(d) $\\overline{A \\cap B} \\subseteq \\overline{A} \\cap \\overline{B}$. Buscar contraejemplos para (b) y (d).',
  '3.7': 'Sean $E$ un espacio métrico y $A,B\\subseteq E$ acotados. (a) Probar que si $A\\subseteq B$ entonces $\\operatorname{diam}(A)\\le\\operatorname{diam}(B)$. '
       + '(b) Probar que $\\operatorname{diam}(A)=\\operatorname{diam}(\\overline{A})$.',
  '3.8': 'Hallar frontera y puntos de acumulación de cada subconjunto del Ej. 3.',
  '3.9': 'Sea $A \\subseteq E$. Probar: (a) $\\partial A = \\overline{A} \\setminus A^\\circ$, y concluir que $\\partial A$ es cerrado; '
       + '(b) $\\partial A = \\overline{A} \\cap \\overline{E \\setminus A}$, y concluir $\\partial A = \\partial(E \\setminus A)$.',
  '3.10': 'Se define $d(x, A) = \\inf\\{d(x,a) : a \\in A\\}$. Probar: (a) $|d(x,A) - d(y,A)| \\le d(x,y)$; '
        + '(b) $x \\in A \\Rightarrow d(x,A) = 0$; (c) $d(x,A) = 0 \\iff x \\in \\overline{A}$; (d) $\\{d(x,A) < r\\}$ es abierto; (e) $\\{d(x,A) \\le r\\}$ es cerrado.',
  '3.11': 'Sea $(E,d)$ métrico y $X=\\{A\\subseteq E: A\\ne\\varnothing\\}$. Se define $b_d:X\\times X\\to\\mathbb{R}$, '
        + '$b_d(A,B)=\\inf\\{d(a,b):a\\in A,\\ b\\in B\\}$. Decidir si son verdaderas o falsas: (a) $b_d(A,B)=b_d(\\overline{A},\\overline{B})$; '
        + '(b) $b_d(A,B)=0\\iff A\\cap B\\ne\\varnothing$; (c) $b_d(A,B)=0\\iff\\overline{A}\\cap\\overline{B}\\ne\\varnothing$; '
        + '(d) $b_d(A,B)\\le b_d(A,C)+b_d(C,B)$. Concluir que $b_d$ no es una distancia.',
  '3.12': 'En $\\mathbb{R}^n$: (a) probar que $d_\\infty \\le d_2 \\le d_1 \\le n\\,d_\\infty$; '
        + '(b) deducir $B_1(x,r) \\subseteq B_2(x,r) \\subseteq B_\\infty(x,r) \\subseteq B_1(x,nr)$.',
  '3.13': 'Sean $(x_n), (y_n)$ en $E$. Probar: (a) si $x_n \\to x$ e $y_n \\to y$, entonces $d(x_n,y_n) \\to d(x,y)$; '
        + '(b) si ambas son de Cauchy, $(d(x_n,y_n))$ converge.',
  '3.14': 'Probar que $(\\mathbb{R}^n, d_1)$, $(\\mathbb{R}^n, d_2)$ y $(\\mathbb{R}^n, d_\\infty)$ son completos.',
  '3.15': 'Sea $(E,d)$ completo y $A \\subseteq E$. Probar que si $A$ es cerrado, entonces $(A, d)$ es completo.',
  '3.16': 'Teorema de intersección de Cantor: en $E$ completo, si $(A_n)$ son cerrados, acotados, no vacíos, '
        + 'con $A_{n+1} \\subseteq A_n$ y $\\operatorname{diam}(A_n) \\to 0$, entonces $\\bigcap_n A_n$ es un único punto.',

  // ---------- Práctica 4 (Continuidad y Continuidad Uniforme) ----------
  '4.1': 'Decidir cuáles de las siguientes funciones son continuas: '
       + '(a) $f:(\\mathbb{R}^2,d_2)\\to(\\mathbb{R},d_2)$, $f(x,y)=x^2+y^2$; '
       + '(b) $f(x,y)=\\frac{x^2y}{\\frac12x^2+(x-1)^2y^2}$ si $(x,y)\\neq(0,0)$ y $0$ en el origen; '
       + '(c) $\\operatorname{id}:(\\mathbb{R}^2,\\delta)\\to(\\mathbb{R}^2,d_2)$; '
       + '(d) $\\operatorname{id}:(\\mathbb{R}^2,d_2)\\to(\\mathbb{R}^2,\\delta)$. ¿Cambia algo con $d_1$ o $d_\\infty$?',
  '4.2': 'Sea $f:\\mathbb{R}\\to\\mathbb{R}$ dada por $f(x)=x$ si $x\\in\\mathbb{Q}$ y $f(x)=0$ si $x\\notin\\mathbb{Q}$. Probar que $f$ es continua únicamente en $x=0$.',
  '4.3': 'Sea $f:E\\to\\mathbb{R}$ continua en $x_0$. Probar que si $f(x_0)>0$, existe $r>0$ tal que $f(x)>0$ para todo $x\\in B(x_0,r)$.',
  '4.4': 'Sean $f,g:E\\to E\'$ continuas. Probar que: (a) $\\{x\\in E : f(x)\\neq g(x)\\}$ es abierto; (b) $\\{x\\in E : f(x)=g(x)\\}$ es cerrado.',
  '4.5': 'En $\\mathbb{R}^n$ con $d_2$, probar: (a) $\\{(x,y): x^2+y\\sin(e^x-1)=-2\\}$ es cerrado; '
       + '(b) $\\{(x,y,z): -1\\le x^3-3y^4+z-2\\le 3\\}$ es cerrado; '
       + '(c) $\\{(x_1,\\dots,x_5): 3 < x_1-x_2\\}$ es abierto.',
  '4.6': 'Para $f(x)=x^2$ y $g(x)=\\frac{x^2}{1+x^2}$, probar: (a) $f$ es continua pero existe un abierto $G$ con $f(G)$ no abierto; '
       + '(b) $g$ es continua pero existe un cerrado $F$ con $g(F)$ no cerrado.',
  '4.7': 'Sean $f,g:E\\to E\'$ continuas. (a) Si $D\\subseteq E$ es denso y $f|_D = g|_D$, probar que $f=g$. '
       + '(b) Concluir que la restricción $\\mathcal{R}:C([0,1])\\to\\mathbb{R}^{\\mathbb{Q}\\cap[0,1]}$ es inyectiva.',
  '4.8': 'Si $f:E\\to E\'$ es continua y suryectiva, y $D\\subseteq E$ es denso, probar que $f(D)$ es denso en $E\'$.',
  '4.9': 'Sean $\\mathcal{E}(f)=f(0)$ e $\\mathcal{I}(f)=\\int_0^1 f(x)dx$ en $C([0,1])$. '
       + '(a) Probar que con $d_\\infty$ ambas son continuas; '
       + '(b) Con $d_1$, $\\mathcal{I}$ es continua pero $\\mathcal{E}$ no; '
       + '(c) Analizar si una funcional puede ser continua en $d_1$ y no en $d_\\infty$.',
  '4.10': 'Probar que $f(x)=d(x,x_0)$ es continua. Usar esto para re-demostrar que bolas abiertas son abiertas, cerradas son cerradas y esferas son cerradas.',
  '4.11': 'Sea $g(x)=d(x,A)$. (a) Probar que $g$ es continua y que si $A$ es cerrado, $g(x)>0$ para $x\\notin A$. '
        + '(b) Para $A,B$ cerrados disjuntos, $h(x)=\\frac{d(x,A)}{d(x,A)+d(x,B)}$ es continua, $h|_A\\equiv 0$, $h|_B\\equiv 1$. '
        + '(c) Deducir el Lema de Urysohn: existen abiertos disjuntos $U\\supseteq A$ y $V\\supseteq B$.',
  '4.12': 'Probar que $f(x)=d(x,x_0)$ y $g(x)=d(x,A)$ son de tipo Lipschitz y deducir que son uniformemente continuas.',
  '4.13': '(a) Verificar que $f(x)=1/x$ no es uniformemente continua en $(0,+\\infty)$. ¿Y en $[\\varepsilon,+\\infty)$ para $\\varepsilon>0$? '
        + '(b) Verificar que $f(x)=\\sin(1/x)$ no es uniformemente continua en $(0,1)$.',
  '4.14': 'Sea $f:E\\to E\'$ unif. continua y $(x_n)$ de Cauchy en $E$. Probar que $(f(x_n))$ es de Cauchy en $E\'$.',
  '4.15': '(a) Dar ejemplo de $f:\\mathbb{R}\\to\\mathbb{R}$ acotada y continua pero no unif. continua. '
        + '(b) Dar ejemplo de $f:\\mathbb{R}\\to\\mathbb{R}$ no acotada y unif. continua.',
  '4.16': 'Sea $f:(E,d)\\to(E\',d\') $ unif. continua y $A,B\\subseteq E$ con $d(A,B)=0$. Probar que $d\'(f(A),f(B))=0$.',

  // ---------- Práctica 5 (Compacidad, Punto fijo) ----------
  '5.1': 'En $(\\mathbb{R}, |\\cdot|)$ decidir si cada conjunto es compacto (probar por definición si lo es, '
       + 'o dar una sucesión sin subsucesión convergente si no): (a) $K=\\{\\tfrac1n:n\\in\\mathbb{N}\\}$; '
       + '(b) $K=\\mathbb{N}$; (c) $K=\\mathbb{Q}\\cap[0,1]$; (d) $K=[0,1]$; (e) $K=\\{1,\\tfrac12,\\tfrac23,\\tfrac34,\\dots\\}$.',
  '5.2': 'Sea $K\\subseteq\\mathbb{R}$ compacto no vacío. Probar que $K$ tiene mínimo y máximo.',
  '5.3': 'Sea $K\\subseteq\\mathbb{R}$ compacto. Probar que $S=\\{x+y:x,y\\in K\\}$ y $P=\\{xy:x,y\\in K\\}$ son compactos.',
  '5.4': 'Sea $\\{F_i\\}_{i\\in I}$ una familia de cerrados en $E$. Probar que si existe $i_0$ con $F_{i_0}$ compacto, '
       + 'entonces $\\bigcap_{i\\in I} F_i$ es compacto.',
  '5.5': 'Sea $E$ un espacio métrico discreto. ¿Cuáles son los subconjuntos compactos de $E$?',
  '5.6': 'Sea $E$ compacto. Probar que para toda sucesión $(F_n)$ decreciente de cerrados no vacíos se tiene '
       + '$\\bigcap_{n\\ge1} F_n\\ne\\varnothing$.',
  '5.7': 'Decidir V/F (probar o dar contraejemplo): (a) una unión numerable de compactos es compacta; '
       + '(b) una intersección numerable de compactos es compacta; (c) si $K$ es compacto, $A\\cap K$ es compacto; '
       + '(d) todo conjunto finito es compacto; (e) todo conjunto numerable es compacto; '
       + '(f) la intersección de una sucesión decreciente de cerrados no vacíos es no vacía.',
  '5.8': 'Para los conjuntos del Ej. 1 que no sean compactos, exhibir un cubrimiento por abiertos sin subcubrimiento finito.',
  '5.9': 'En $(E,d)$, la distancia de un punto a un compacto se realiza: para todo $K$ compacto y todo $x\\in E$ '
       + 'existe $y\\in K$ con $d(x,y)=d(x,K)$.',
  '5.10': 'Sea $b_d$ la función del Ej. 11 de la Práctica 3. Probar que si $A$ es compacto, $B$ es cerrado y '
        + '$A\\cap B=\\varnothing$, entonces $b_d(A,B)>0$. ¿Sucede lo mismo si $A$ es sólo cerrado?',
  '5.11': 'En $(C[0,1], d_\\infty)$, con $f_0$ la función nula, probar que $\\overline{B}(f_0,1)$ no es compacta '
        + '(pero sí es cerrada y acotada). ¿Qué pasa si se cambia $d_\\infty$ por $d_1$?',
  '5.12': 'Sea $E$ compacto y $f:E\\to(0,+\\infty)$ continua. Probar que existe $\\alpha>0$ tal que $f(x)>\\alpha$ para todo $x\\in E$.',
  '5.13': 'Sea $f:\\mathbb{R}\\to\\mathbb{R}$ continua con $\\lim_{x\\to-\\infty}f(x)=\\lim_{x\\to+\\infty}f(x)=0$. '
        + 'Probar que $f$ es uniformemente continua en $\\mathbb{R}$.',
  '5.14': 'Sean $E,E\'$ métricos y $f:E\\to E\'$ continua. Probar que si $E$ es compacto y $f$ es biyectiva, entonces $f$ es un homeomorfismo.',
  '5.15': '(opcional) Sea $E$ métrico. Probar que si para toda sucesión decreciente de cerrados no vacíos se tiene '
        + 'intersección no vacía, entonces $E$ es compacto.',
  '5.16': 'Sea $f:E\\to E$ continua. Probar que el conjunto de puntos fijos de $f$ es cerrado.',
  '5.17': 'Sea $f(x)=\\tfrac12\\arctan(x)+3$. Probar que $f$ es una contracción.',
  '5.18': 'Sea $E=\\mathbb{R}\\setminus\\{0\\}$ con la distancia usual y $f(x)=\\tfrac13 x$. Probar que $f$ es una contracción '
        + 'pero no tiene punto fijo. ¿Qué falla en el Teorema de Banach?',
  '5.19': 'Sean $f:E\\to E$ y $f^n=f\\circ\\cdots\\circ f$ ($n$ veces). Probar: (a) si $x$ es punto fijo de $f$, lo es de $f^n$; '
        + '(b) si $E$ es completo y existe $n$ con $f^n$ contracción, entonces existe un único punto fijo de $f$; '
        + '(c) deducir que existe un único $x\\in\\mathbb{R}$ con $\\cos(x)=x$.',
  '5.20': 'En $(\\mathbb{R}^n,d_2)$, sea $f:\\mathbb{R}^n\\to\\mathbb{R}^n$ continua. Si existe $M>0$ tal que para todo $\\varepsilon>0$ '
        + 'existe $x\\in B(0,M)$ con $d_2(x,f(x))<\\varepsilon$, probar que $f$ tiene un punto fijo.',
  '5.21': 'Sea $f:[a,b]\\to[a,b]$ continua. Probar que $f$ tiene un punto fijo (sugerencia: Bolzano).',
  '5.22': 'Sea $f:C\\to\\mathbb{R}$ continua, con $C=\\{(x,y):x^2+y^2=1\\}$. Probar que existe un par de puntos opuestos '
        + 'donde $f$ toma el mismo valor (Borsuk–Ulam en la circunferencia).',

  // ---------- Práctica 6 (Espacios normados, Operadores) ----------
  '6.1': 'Probar que $\\|\\cdot\\|_1$, $\\|\\cdot\\|_2$ y $\\|\\cdot\\|_\\infty$ son normas en $\\mathbb{R}^n$, donde '
       + '$\\|x\\|_1=\\sum|x_i|$, $\\|x\\|_2=(\\sum x_i^2)^{1/2}$ y $\\|x\\|_\\infty=\\max|x_i|$.',
  '6.2': 'Sea $E$ un espacio normado. Probar: (a) $\\overline{B(x,r)}=\\overline{B}(x,r)$ (clausura de la bola abierta = bola cerrada); '
       + '(b) $\\operatorname{diam}(B(x,r))=2r$; (c) toda bola es convexa.',
  '6.3': 'Sea $E$ normado, $(x_n)\\subseteq E$ con $x_n\\to x_0$. Probar que $y_n=\\tfrac{x_1+\\cdots+x_n}{n}\\to x_0$ (Cesàro).',
  '6.4': 'Sea $S\\subseteq E$ un subespacio vectorial. Probar: (a) $\\overline{S}$ es subespacio; (b) si $S\\ne E$, $S^\\circ=\\varnothing$; '
       + '(c) si $\\dim S<\\infty$, $S$ es cerrado; (d) si $S$ es un hiperplano, es denso o cerrado.',
  '6.5': 'Sea $\\mathbb{R}_n[t]$ los polinomios de grado $\\le n$ con $\\|p\\|_\\infty=\\max_{[0,1]}|p|$ y $\\|p\\|_1=\\int_0^1|p|$. '
       + '(a) ¿Son $(\\mathbb{R}_n[t],\\|\\cdot\\|_\\infty)$ y $(\\mathbb{R}_n[t],\\|\\cdot\\|_1)$ espacios de Banach? '
       + '(b) ¿Son equivalentes ambas normas para todo $n$? '
       + '(c) En $\\mathbb{R}[t]$ (todos los polinomios), probar que $\\|\\cdot\\|_\\infty$ y $\\|\\cdot\\|_1$ no son equivalentes.',
  '6.6': 'Sea $\\ell^\\infty=\\{(a_n):\\sup|a_n|<\\infty\\}$ con $\\|a\\|_\\infty=\\sup|a_n|$. '
       + '(a) Probar que la bola cerrada de centro $0$ y radio $1$ no es compacta. '
       + '(b) Probar que no existe ningún conjunto numerable denso en $\\ell^\\infty$.',
  '6.7': 'Sea $E=\\{a\\in\\ell^\\infty:\\exists n_0,\\ a_n=0\\ \\forall n\\ge n_0\\}$ (sucesiones casi nulas) y '
       + '$S=\\{a\\in E:\\sum_{n\\ge1}a_n=0\\}$. Probar que $S$ es denso en $E$.',
  '6.8': 'Sean $(E,\\|\\cdot\\|_E)$, $(F,\\|\\cdot\\|_F)$ normados y $T:E\\to F$ lineal. Probar la equivalencia: '
       + '(a) $T$ continuo en $0$; (b) $T$ continuo en algún $x_0$; (c) $T$ continuo; (d) $T$ uniformemente continuo; '
       + '(e) $T$ acotado; (f) para todo $A\\subseteq E$ acotado, $T(A)$ es acotado.',
  '6.9': 'Sean $(E,\\|\\cdot\\|_E)$, $(F,\\|\\cdot\\|_F)$ normados y $T:E\\to F$ lineal continuo. Verificar '
       + '$\\|T\\|=\\sup_{\\|x\\|_E\\le1}\\|Tx\\|_F=\\sup_{\\|x\\|_E=1}\\|Tx\\|_F=\\sup_{x\\ne0}\\tfrac{\\|Tx\\|_F}{\\|x\\|_E}$.',
  '6.10': 'En $C[0,1]$ con $\\|f\\|_\\infty=\\max|f|$ y $\\|f\\|_1=\\int_0^1|f|$, sean $E(f)=f(0)$ e $I(f)=\\int_0^1 f$. '
        + 'Para cada norma, decidir si cada funcional es continua y, en caso afirmativo, acotar su norma.',
  '6.11': 'En $C[0,1]$ con $\\|\\cdot\\|_\\infty$, fijada $k:[0,1]^2\\to\\mathbb{R}$ continua, sea '
        + '$(Kf)(x)=\\int_0^1 k(x,y)f(y)\\,dy$. Probar que $K$ es lineal y continuo, y acotar $\\|K\\|$.',
  '6.12': 'En $\\mathbb{R}[t]$ con $\\|\\cdot\\|_\\infty$, sea $\\delta p=p\'$ (derivación). Probar que $\\delta$ es lineal pero no continuo.',
  '6.13': 'Sea $\\ell^2=\\{(a_n):\\sum|a_n|^2<\\infty\\}$ con $\\|a\\|_2=(\\sum|a_n|^2)^{1/2}$. '
        + '(a) ¿Es compacta la bola cerrada de centro $0$ y radio $1$? '
        + '(b) Probar que $\\gamma(a)=\\sum_{n\\ge1}\\tfrac{a_n}{n}$ es una funcional lineal continua (Cauchy–Schwarz).',

  // ---------- Práctica 7 (Sucesiones de funciones) ----------
  '7.1': 'Sea $A$ un conjunto, $(Y,d)$ un espacio métrico, $f:A\\to Y$ y, para cada $n\\in\\mathbb{N}$, $f_n:A\\to Y$. '
       + 'Probar que $(f_n)_{n\\ge1}$ <em>no</em> converge uniformemente a $f$ si y solo si existen $\\alpha>0$, una subsucesión $(f_{n_k})_{k\\ge1}$ '
       + 'y una sucesión $(a_k)_{k\\ge1}\\subseteq A$ tales que $d(f_{n_k}(a_k),f(a_k))\\ge\\alpha$ para todo $k\\in\\mathbb{N}$.',
  '7.2': 'Analizar la convergencia puntual y uniforme de: (a) $f_n:\\mathbb{R}\\to\\mathbb{R}$, $f_n(x)=\\tfrac1n\\sin(nx)$; '
       + '(b) $f_n:\\mathbb{R}\\to\\mathbb{R}$, $f_n(x)=\\sin(\\tfrac xn)$; (c) $f_n:\\mathbb{R}^2\\to\\mathbb{R}^2$, $f_n(x,y)=\\tfrac{n}{n+1}(x,y)$; '
       + '(d) $f_n:C([0,1])\\to C([0,1])$, $f_n(\\varphi)=\\tfrac{n}{n+1}\\varphi$ (en $C([0,1])$ se considera $d_\\infty$).',
  '7.3': '(a) Hallar el límite puntual de $f_n:A\\to\\mathbb{R}$ en cada caso: i. $f_n(x)=x^n$, $A=(-1,1]$; ii. $f_n(x)=x^{-n}e^x$, $A=(1,+\\infty)$; '
       + 'iii. $f_n(x)=n^2x(1-x^2)^n$, $A=[0,1]$; iv. $f_n(x)=xe^{-nx^2}$, $A=\\mathbb{R}$. '
       + '(b) Para i., probar que la convergencia es uniforme sobre $(0,\\tfrac12)$, y para ii., que es uniforme sobre $[2,5]$. '
       + '(c) ¿Es uniforme la convergencia sobre $A$ en alguno de los casos?',
  '7.4': 'Sea $X$ un conjunto y $B(X)$ el conjunto de las funciones acotadas de $X$ en $\\mathbb{R}$; sea $(f_n)_{n\\ge1}$ en $B(X)$. '
       + '(a) Si $(f_n)$ converge uniformemente a $f:X\\to\\mathbb{R}$, mostrar que $f\\in B(X)$. ¿Sigue valiendo si la convergencia es solamente puntual? '
       + '(b) Si $(f_n)$ converge uniformemente en $X$, mostrar que existe $M>0$ con $|f_n(x)|\\le M$ para todo $x\\in X$ y todo $n$ '
       + '(es decir, $(f_n)$ es uniformemente acotada).',
  '7.5': 'Sea $f_n:[0,1]\\to\\mathbb{R}$, $f_n(x)=\\dfrac{nx^2}{1+nx^2}$. Estudiar la convergencia puntual y uniforme de $(f_n)_{n\\ge1}$ y de $(f_n\')_{n\\ge1}$.',
  '7.6': 'Sea $X$ un espacio métrico y $(f_n),(g_n):X\\to\\mathbb{R}$ que convergen uniformemente a $f,g$ respectivamente. Probar: '
       + '(a) $(f_n+g_n)$ converge uniformemente a $f+g$; (b) si ambas sucesiones están uniformemente acotadas, $(f_ng_n)$ converge uniformemente a $fg$.',
  '7.7': 'Sean $X,Y$ espacios métricos y $f_n:X\\to Y$ uniformemente continuas que convergen uniformemente a $f:X\\to Y$. Probar que $f$ es uniformemente continua.',
  '7.8': 'Sea $f_n:[a,b]\\to\\mathbb{R}$ una sucesión de funciones derivables que converge puntualmente a $f:[a,b]\\to\\mathbb{R}$. '
       + 'Probar que si existe $c>0$ tal que $|f_n\'(x)|\\le c$ para todo $x\\in[a,b]$ y todo $n$, entonces $f$ es continua.',
  '7.9': 'Sea $X$ un espacio métrico y $(f_n)$ una sucesión de funciones continuas $X\\to\\mathbb{R}$ tal que $\\sum_{n\\ge1}f_n$ converge uniformemente en $X$. Probar: '
       + '(a) $f=\\sum_{n\\ge1}f_n$ es continua en $X$; (b) si $X=[a,b]$, entonces $\\int_a^bf(x)\\,dx=\\sum_{n\\ge1}\\int_a^bf_n(x)\\,dx$.',
  '7.10': '(a) Probar que para todo $x\\in\\mathbb{R}$, $\\sin(x)=\\sum_{k\\ge0}\\tfrac{(-1)^k}{(2k+1)!}x^{2k+1}$, y que la serie converge absoluta y uniformemente '
        + 'en todo conjunto acotado. ¿Es uniforme la convergencia en $\\mathbb{R}$? (Sugerencia: $\\sin$ es acotada.) '
        + '(b) Probar que $f(x)=\\sum_{n\\ge0}\\big(\\tfrac{x^n}{n!}\\big)^2$ está bien definida en $\\mathbb{R}$ y es continua.',
  '7.11': 'Sea $(f_n)_{n\\ge1}$ la sucesión definida por $f_n(x)=x^{-n}e^x$. Probar que la serie de término general $f_n$ converge uniformemente '
        + 'en cualquier intervalo de la forma $[a,+\\infty)$ con $a>0$, pero no en $(0,+\\infty)$. '
        + '<em>(Ojo: tal como está escrito el enunciado es problemático; ver la resolución.)</em>',
};

/**
 * Devuelve la consigna de un ejercicio, o null si no está registrada.
 * @param {number|string} practica
 * @param {number|string} num
 */
export function consigna(practica, num) {
  return EJERCICIOS[`${practica}.${num}`] || null;
}

/**
 * Componente visual: cita de ejercicio con su consigna desplegable.
 * Muestra "Práctica P · Ej. N" como chip y, debajo, la consigna (togglable).
 * @param {number} practica
 * @param {number|number[]} nums  un ejercicio o varios (rango)
 * @param {object} [opts] { titulo }
 * @returns {HTMLElement}
 */
export function exRef(practica, nums, opts = {}) {
  const list = Array.isArray(nums) ? nums : [nums];
  // Etiqueta: rango "a–b" si es una secuencia contigua, si no lista "a, b, c".
  const contiguous = list.length > 1 && list.every((v, i) => i === 0 || v === list[i - 1] + 1);
  let label;
  if (list.length === 1) label = `Práctica ${practica} · Ej. ${list[0]}`;
  else if (contiguous) label = `Práctica ${practica} · Ej. ${list[0]}–${list[list.length - 1]}`;
  else label = `Práctica ${practica} · Ej. ${list.join(', ')}`;

  const btn = el('button', { class: 'exref-toggle', 'aria-expanded': 'false' }, [
    el('span', { class: 'exref-badge', text: '📋 ' + label }),
    el('span', { class: 'exref-caret', text: ' ▸' }),
  ]);

  const body = el('div', { class: 'exref-body' });
  list.forEach((n) => {
    const c = consigna(practica, n);
    if (!c) return;
    body.appendChild(el('div', { class: 'exref-item' }, [
      el('span', { class: 'exref-num', text: `Ej. ${n}. ` }),
      el('span', { html: c }),
    ]));
  });
  if (!body.children.length) {
    body.appendChild(el('div', { class: 'exref-item', text: 'Consigna no disponible.' }));
  }

  const wrap = el('div', { class: 'exref-wrap' }, [btn, body]);
  btn.addEventListener('click', () => {
    const open = wrap.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    wrap.querySelector('.exref-caret').textContent = open ? ' ▾' : ' ▸';
    if (open && window.MathJax?.typesetPromise) {
      requestAnimationFrame(() => window.MathJax.typesetPromise([body]).catch(() => {}));
    }
  });
  return wrap;
}