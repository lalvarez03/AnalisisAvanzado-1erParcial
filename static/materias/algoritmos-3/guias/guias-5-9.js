// materias/algoritmos-3/guias/guias-5-9.js — ejercicios resueltos de las Prácticas 5 a 9 (2C 2026).
const R = String.raw;

export const GUIA_P5 = [
  {
    fuente: 'Práctica 5 · Ej. 1',
    enunciado: R`Suma Subconjuntos con $C=\{6,12,6\}$ y $k=12$. (a) Escribir las soluciones candidatas $Sols$ (vectores binarios). (b) Las válidas. (c) Valor de $ss(C,k)$. (d) Comparar con las candidatas de Cecilia ($Sols'$ = todos los conjuntos de naturales).`,
    idea: 'Enumerar los 2³ vectores y quedarse con los que suman 12.',
    pasos: [
      { idea: '(a) Candidatas', detalle: R`<p>$Sols=\{0,1\}^3$: $(0,0,0),(0,0,1),(0,1,0),(0,1,1),(1,0,0),(1,0,1),(1,1,0),(1,1,1)$. El vector $a$ representa el subconjunto que contiene a $c_i$ si $a_i=1$.</p>` },
      { idea: '(b) Válidas', detalle: R`<p>Sumas: $0,6,12,18,6,12,18,24$. Suman $12$: $(0,1,0)$ (el subconjunto $\{12\}$) y $(1,0,1)$ (el subconjunto $\{6,6\}$, los dos 6 distintos).</p>` },
      { idea: '(c) Respuesta', detalle: R`<p>$ss(C,k)=\exists a\in Sols:\ \text{válida}(a)$ es <b>verdadero</b>.</p>` },
      { idea: '(d) Elección del universo', detalle: R`<p>$Sols$ tiene $2^n$ elementos; $Sols'$ es infinito (todos los conjuntos de naturales), así que un algoritmo de fuerza bruta no podría recorrerlo. Para fuerza bruta se elige $Sols$. (Y si $Sols^*$ fuera exactamente el conjunto de las válidas, el predicado sería trivial y habría que saber construirlas: no hay algoritmo de fuerza bruta que recorra solo esas.) $\blacksquare$</p>` },
    ],
    conclusion: 'El universo de candidatas tiene que ser finito, fácil de enumerar y contener a todas las válidas.',
  },
  {
    fuente: 'Práctica 5 · Ej. 4',
    enunciado: R`Quiz combinatorio: (1) hojas de un árbol binario completo de $n$ niveles; (2) permutaciones de $n$ elementos; (3) elementos de $\mathcal P(A)$ con $|A|=n$; (4) formas de repartir $n$ libros en $k$ cajas distintas; (5) formas de elegir $k$ de $n$ objetos.`,
    idea: 'Contar decisiones independientes.',
    pasos: [
      { idea: '(1) y (3)', detalle: R`<p>Cada nivel duplica la cantidad de nodos: $\Theta(2^n)$ hojas. Igual para $\mathcal P(A)$: cada elemento está o no está: $2^n$.</p>` },
      { idea: '(2)', detalle: R`<p>$n$ opciones para el primero, $n-1$ para el segundo, …: $n!$, o sea $\Theta(n!)$.</p>` },
      { idea: '(4)', detalle: R`<p>Cada libro elige una de las $k$ cajas: $k^n$, $\Theta(k^n)$.</p>` },
      { idea: '(5)', detalle: R`<p>Es $\binom nk$ (sin importar el orden). $\blacksquare$</p>` },
    ],
    conclusion: 'Estas cantidades son la cantidad de hojas de los árboles de backtracking de cada tipo de problema.',
  },
  {
    fuente: 'Práctica 5 · Ej. 11(f)',
    enunciado: R`Demostrar que el número mágico de un cuadrado mágico de orden $n$ (filas, columnas y diagonales suman lo mismo, con los números $1..n^2$) es siempre $\dfrac{n^3+n}{2}$. ¿Cómo mejora la poda?`,
    idea: 'Sumar todas las filas.',
    pasos: [
      { idea: 'Suma total', detalle: R`<p>Los números $1,\dots,n^2$ suman $\dfrac{n^2(n^2+1)}2$.</p>` },
      { idea: 'Por filas', detalle: R`<p>Hay $n$ filas y cada una suma el número mágico $M$: $nM=\dfrac{n^2(n^2+1)}2$, de donde $M=\dfrac{n(n^2+1)}2=\dfrac{n^3+n}2$. $\blacksquare$</p>` },
      { idea: 'Mejora de la poda', detalle: R`<p>Con $M$ conocido de antemano se puede podar apenas una fila (o columna) <b>completa</b> no suma $M$, y también cuando una fila parcial deja un faltante que no se puede completar con los números que quedan (cota de factibilidad más fuerte que "no pasarse de $M$").</p>` },
    ],
    conclusion: 'Un hecho matemático demostrado (el valor de M) vale más que cualquier optimización del código.',
  },
  {
    fuente: 'Práctica 5 · Ej. 13',
    enunciado: R`Coloreo: dado un grafo $G$ y $k$, decidir si se puede pintar cada vértice con uno de $k$ colores sin que dos adyacentes compartan color. Dar una función recursiva, una poda por factibilidad, una cota de complejidad y su semántica.`,
    idea: 'Colorear los vértices en orden; probar cada color permitido.',
    pasos: [
      { idea: 'Formalización', detalle: R`<p>$Sols=\{1..k\}^{V}$ (una función de vértices a colores). $\text{válida}(c)=\forall uv\in E:\ c(u)\neq c(v)$. Se pregunta si $\exists c\in Sols$ válida. Parcial: $(c(v_1),\dots,c(v_{i-1}))$, y sucesoras: asignar un color a $v_i$.</p>` },
      { idea: 'Función recursiva', detalle: R`<p>$\text{col}(i,c)$ = "existe una coloración válida de $G$ que extiende la parcial $c$ de $v_1..v_{i-1}$". Si $i>n$: <b>verdadero</b> (la parcial ya es completa y, con las podas, válida). Si no: $\bigvee_{x=1}^{k}\big[\ x\notin\{c(u):u<v_i,\ uv_i\in E\}\ \wedge\ \text{col}(i+1,c\cup\{v_i\mapsto x\})\ \big]$.</p>` },
      { idea: 'Poda por factibilidad', detalle: R`<p>La condición "$x$ no usado por un vecino ya coloreado" corta la rama apenas se viola una arista: si $c(u)=c(v_i)$ para algún $u$ vecino anterior, ninguna extensión es válida (la arista $uv_i$ ya está mal coloreada). No se pierden soluciones.</p>` },
      { idea: 'Complejidad y semántica', detalle: R`<p>Árbol de a lo sumo $k^n$ hojas y $\sum_{i\le n}k^i=O(k^n)$ nodos; cada nodo chequea hasta $\deg$ vecinos: $O(k^n\cdot n)$ en el peor caso. La semántica se prueba por inducción descendente en $i$ (la cantidad de vértices por colorear). Para devolver una coloración, se guarda $c$ y se retorna al primer éxito. $\blacksquare$</p>` },
    ],
    conclusion: 'Con k = 2 el problema es polinomial (bipartito); con k ≥ 3 no se conoce un algoritmo polinomial: es NP-completo.',
  },
];

export const GUIA_P6 = [
  {
    fuente: 'Práctica 6 · Ej. 1',
    enunciado: R`El ejército del rey: $F(0)=F(1)=1$ y $F(n)=F(n-1)+F(n-2)$. (b) Complejidad de la versión directa; (c) ¿qué se repite?; (d)–(e) versión con memoización; (f) bottom-up con $O(1)$ espacio.`,
    idea: 'El árbol de llamadas repite F(n−2), F(n−3), …',
    pasos: [
      { idea: '(b) Directa', detalle: R`<p>$C(n)=1+C(n-1)+C(n-2)$ crece como $\varphi^n\approx1{,}6^n$: exponencial.</p>` },
      { idea: '(c) Repetición', detalle: R`<p>Para $n=4$: $F(4)$ llama a $F(3)$ y $F(2)$; $F(3)$ llama a $F(2)$ y $F(1)$. Entonces $F(2)$ se calcula <b>dos veces</b> (y $F(1)$ tres). Hay solo $n+1$ subproblemas distintos pero exponencialmente muchas llamadas.</p>` },
      { idea: '(d) Memoización', detalle: R`<p>Un arreglo <code>memo[0..n]</code> inicializado en "indefinido": <code>f(m)</code> devuelve <code>memo[m]</code> si está definido; si no, lo calcula con <code>f(m-1)+f(m-2)</code>, lo guarda y lo devuelve.</p>` },
      { idea: '(e) Costo', detalle: R`<p>El cuerpo "caro" se ejecuta una sola vez por cada $m\le n$ y cuesta $O(1)$: $O(n)$ tiempo y $O(n)$ espacio (arreglo y pila de recursión). Mucho mejor que $\Theta(\varphi^n)$.</p>` },
      { idea: '(f) Bottom-up', detalle: R`<p>$a=b=1$; para $i=2..n$: $(a,b)\leftarrow(b,a+b)$. Solo se guardan los dos últimos valores: $O(n)$ tiempo y $O(1)$ espacio. $\blacksquare$</p>` },
    ],
    conclusion: 'Patrón general: si una función recursiva depende solo de unos pocos valores previos, el bottom-up puede ahorrar la tabla.',
  },
  {
    fuente: 'Práctica 6 · Ej. 2',
    enunciado: R`Vacaciones: Tomás tiene $n$ días; cada día puede hacer gimnasio o competencia (si están disponibles y no hizo esa misma actividad el día anterior) o descansar. Minimizar los días de descanso. Ejemplo $n=4$, gimnasio $\{2,3\}$, competencias $\{1,2\}$: se pueden lograr 2 días de descanso.`,
    idea: 'El estado es (día, qué hizo el día anterior).',
    pasos: [
      { idea: 'Candidatas y orden', detalle: R`<p>$Sols=\{\text{descanso},\text{gym},\text{comp}\}^n$. Válida: cada día elige una actividad disponible, y nunca la misma que el día anterior. Valuación: cantidad de descansos; se busca el mínimo entre las válidas.</p>` },
      { idea: 'Función recursiva', detalle: R`<p>$f(i,u)$ = mínima cantidad de descansos entre los días $i,\dots,n$ sabiendo que el día $i-1$ se hizo $u\in\{0,1,2\}$ ($0$ = descanso). $f(n+1,u)=0$ y para $i\le n$: $f(i,u)=\min\Big\{\,1+f(i+1,0),\ \ f(i+1,1)\text{ si gym}(i)\wedge u\neq1,\ \ f(i+1,2)\text{ si comp}(i)\wedge u\neq2\Big\}$. La respuesta es $f(1,0)$.</p>` },
      { idea: 'Correctitud', detalle: R`<p>Por inducción descendente en $i$: la decisión del día $i$ solo afecta a la validez del día $i+1$ a través de $u$, y el costo restante depende solo de $(i,u)$.</p>` },
      { idea: 'Complejidad', detalle: R`<p>Hay $3n$ estados y cada uno cuesta $O(1)$: $O(n)$ con memoización, contra $\Theta(3^n)$ en backtracking. Bottom-up desde $i=n$ guardando solo $f(i+1,\cdot)$: $O(1)$ espacio.</p>` },
      { idea: 'Ejemplo', detalle: R`<p>Día 1: comp; día 2: gym; día 3: gym no (hizo gym el día 2) y comp no está disponible ⇒ descanso; día 4: nada disponible ⇒ descanso. Total 2 descansos, el mínimo posible. $\blacksquare$</p>` },
    ],
    conclusion: 'Para devolver qué hacer cada día se guarda en cada estado la opción que logró el mínimo y se la sigue desde (1, 0).',
  },
  {
    fuente: 'Práctica 6 · Ej. 4',
    enunciado: R`Contar la cantidad de caminos distintos entre $s$ y $t$ en un DAG en $O(n+m)$.`,
    idea: 'Contar los caminos que terminan en cada vértice, siguiendo un orden topológico.',
    pasos: [
      { idea: 'Definición', detalle: R`<p>$c(v)$ = cantidad de caminos de $s$ a $v$. Entonces $c(s)=1$ (el camino trivial) y, para $v\neq s$, $c(v)=\sum_{u\to v}c(u)$ (todo camino a $v$ termina en una arista $u\to v$ y su prefijo es un camino de $s$ a $u$; hay una biyección).</p>` },
      { idea: 'Bottom-up', detalle: R`<p>Calcular un orden topológico $v_1,\dots,v_n$ en $O(n+m)$ y llenar $c$ en ese orden: cuando se calcula $c(v)$ todos sus predecesores ya están calculados. Costo total $O(n+m)$ (cada arista se suma una vez).</p>` },
      { idea: 'Top-down', detalle: R`<p>$c(v)$ con memoización recorriendo las aristas entrantes (se necesitan listas de predecesores). Mismo costo $O(n+m)$ y $O(n)$ espacio. La respuesta es $c(t)$. $\blacksquare$</p>` },
    ],
    conclusion: 'En general, el número de caminos puede ser exponencial, pero se cuenta en tiempo polinomial sin enumerarlos.',
  },
  {
    fuente: 'Práctica 6 · Ej. 6',
    enunciado: R`AstroTrade: con precios $p_1..p_n$, se puede comprar a lo sumo un asteroide por día y vender a lo sumo uno por día, sin vender lo que no se compró, y se termina sin asteroides. Máxima ganancia neta. Ej.: $p=(3,2,5,6)\to6$; $p=(3,6,10)\to7$.`,
    idea: 'El estado es (día, cantidad de asteroides en stock).',
    pasos: [
      { idea: 'Recurrencia', detalle: R`<p>$f(i,k)$ = máxima ganancia neta de los días $i..n$ empezando con $k$ asteroides y terminando con $0$. $f(n+1,0)=0$ y $f(n+1,k>0)=-\infty$. Para $i\le n$: $f(i,k)=\max\{\,f(i+1,k),\ \ -p_i+f(i+1,k+1),\ \ p_i+f(i+1,k-1)\ (k\ge1)\}$ (nada, comprar o vender). Respuesta $f(1,0)$.</p>` },
      { idea: 'Cota del stock', detalle: R`<p>Nunca conviene tener más de $n-i+1$ asteroides en el día $i$ (no se llegarían a vender), así que $k\le n$.</p>` },
      { idea: 'Complejidad', detalle: R`<p>$O(n^2)$ estados con $O(1)$ cada uno: $O(n^2)$ tiempo; bottom-up con las dos últimas columnas $f(i+1,\cdot)$: $O(n)$ espacio.</p>` },
      { idea: 'Chequeo', detalle: R`<p>$p=(3,6,10)$: comprar el día 1 ($-3$) y vender el día 3 ($+10$) da $7$; no se puede comprar y vender más de uno por día. $p=(3,2,5,6)$: comprar días 1 y 2 ($-5$), vender días 3 y 4 ($+11$): $6$. $\blacksquare$</p>` },
    ],
    conclusion: 'Existe un greedy O(n) más fino (heap), pero la PD es la formulación pedida y generaliza a otras restricciones.',
  },
];

export const GUIA_P7 = [
  {
    fuente: 'Práctica 7 · Ej. 3',
    enunciado: R`Suma de subconjuntos: tenemos un conjunto $S$ y un valor $t$; se busca el subconjunto más chico que suma $t$. Gervasio propone: ir agarrando el número más grande que no supere $t$ hasta llegar a $t$. Mostrar un caso en que falla.`,
    idea: 'Un contraejemplo chico basta.',
    pasos: [
      { idea: 'Instancia', detalle: R`<p>$S=\{6,4,3\}$ y $t=7$.</p>` },
      { idea: 'Lo que hace la estrategia', detalle: R`<p>El mayor que no supera $7$ es $6$; queda por sumar $1$ y no hay ningún elemento $\le1$: la estrategia concluye "no hay solución".</p>` },
      { idea: 'La verdad', detalle: R`<p>$\{4,3\}$ suma $7$: existe solución (de tamaño 2). La estrategia es incorrecta. $\blacksquare$</p>` },
    ],
    conclusion: 'Para este problema (NP-completo) no se conoce un greedy correcto: la PD de la práctica 6 resuelve el caso pseudo-polinomial.',
  },
  {
    fuente: 'Práctica 7 · Ej. 6',
    enunciado: R`Dados $v,w\in\mathbb{R}^n$, hallar permutaciones $\sigma,\tau$ que minimicen $\langle v_\sigma,w_\tau\rangle$. Proponer un algoritmo greedy y demostrar su optimalidad.`,
    idea: 'Emparejar los más grandes de v con los más chicos de w.',
    pasos: [
      { idea: 'Algoritmo', detalle: R`<p>Ordenar $v$ de forma creciente y $w$ de forma decreciente y calcular el producto escalar. $O(n\log n)$.</p>` },
      { idea: 'Lema de intercambio', detalle: R`<p>Si $a\le b$ y $c\le d$, entonces $ad+bc\le ac+bd$, pues $ac+bd-ad-bc=(b-a)(d-c)\ge0$. Es decir: es mejor emparejar el menor de un vector con el mayor del otro.</p>` },
      { idea: 'Optimalidad', detalle: R`<p>Sea $S$ un emparejamiento óptimo y $G$ el del algoritmo (v creciente con w decreciente). Si en $S$ hay dos índices $i<j$ con $v_i\le v_j$ y $w'_i\le w'_j$ (ambos "en el mismo orden"), intercambiar los $w'$ no aumenta el producto, por el lema. Repitiendo (cantidad finita de inversiones se reduce estrictamente) se llega a que $v$ y $w'$ están en órdenes opuestos: $S$ se transforma en $G$ sin empeorar. $\blacksquare$</p>` },
    ],
    conclusion: 'Es la desigualdad del reordenamiento: la suma de productos se minimiza con orden opuesto y se maximiza con el mismo orden.',
  },
  {
    fuente: 'Práctica 7 · Ej. 7 (ejemplo)',
    enunciado: R`Demoras: $n$ tareas de duraciones $t_i$, secuenciales; minimizar la suma de los tiempos de finalización. Probar que el orden creciente de duración es óptimo y calcular un ejemplo con $t=(4,1,3)$.`,
    idea: 'Intercambiar dos tareas consecutivas mal ordenadas mejora la suma.',
    pasos: [
      { idea: 'Fórmula de la suma', detalle: R`<p>Con el orden $\pi$, la suma de demoras es $\sum_{i=1}^n(n-i+1)\,t_{\pi(i)}$: la tarea en la posición $i$ retrasa a las $n-i+1$ que están desde ella en adelante.</p>` },
      { idea: 'Intercambio', detalle: R`<p>Si $t_{\pi(i)}>t_{\pi(i+1)}$, intercambiándolas la suma cambia en $t_{\pi(i+1)}-t_{\pi(i)}<0$: mejora. Un orden óptimo no tiene pares consecutivos desordenados, es decir está en orden creciente.</p>` },
      { idea: 'Ejemplo', detalle: R`<p>Orden dado $(4,1,3)$: finalizaciones $4,5,8$, suma $17$. Orden creciente $(1,3,4)$: $1,4,8$, suma $13<17$. $\blacksquare$</p>` },
    ],
    conclusion: 'Mismo argumento (SPT) que en scheduling: atender primero lo corto minimiza el tiempo medio de espera.',
  },
  {
    fuente: 'Práctica 7 · Ej. 5 (ejemplo)',
    enunciado: R`Deadlines: tareas de 1 unidad con deadlines $D=\{2,1,3,2\}$. Aplicar el greedy "ordenar por deadline y aceptar si cabe" y verificar optimalidad.`,
    idea: 'Ordenar: 1, 2, 2, 3.',
    pasos: [
      { idea: 'Ordenar', detalle: R`<p>Deadlines ordenados: $1,2,2,3$ (tareas $t_2,t_1,t_4,t_3$).</p>` },
      { idea: 'Aceptar o rechazar', detalle: R`<p>$t=0$. $d=1$: $0+1\le1$ ⇒ aceptar, $t=1$. $d=2$: $1+1\le2$ ⇒ aceptar, $t=2$. $d=2$: $2+1=3>2$ ⇒ rechazar. $d=3$: $2+1\le3$ ⇒ aceptar, $t=3$.</p>` },
      { idea: 'Resultado', detalle: R`<p>Se completan 3 tareas: $t_2,t_1,t_3$, como en la solución óptima del enunciado. Con 4 tareas haría falta terminar a tiempo $4$ unidades con deadline máximo $3$: imposible. $\blacksquare$</p>` },
    ],
    conclusion: 'La prueba general es "greedy va adelante" (ver la teoría): tras cada tarea, el greedy acepta al menos tantas como cualquier solución.',
  },
];

export const GUIA_P8 = [
  {
    fuente: 'Práctica 8 · Ej. 1',
    enunciado: R`Dado un grafo $G$ con dos subconjuntos disjuntos de vértices $A$ y $B$, hallar en $O(n+m)$ los vértices $a\in A$, $b\in B$ más cercanos.`,
    idea: 'BFS con varias fuentes a la vez.',
    pasos: [
      { idea: 'Modelo', detalle: R`<p>Agregar un vértice fantasma $s$ conectado a todos los de $A$ (o, equivalentemente, encolar todos los de $A$ con nivel $0$ al inicio).</p>` },
      { idea: 'Algoritmo', detalle: R`<p>BFS desde todas las fuentes simultáneamente, guardando para cada vértice cuál fuente lo alcanzó. Al extraer por primera vez un vértice $b\in B$, su nivel es $d(A,b)=\min_{a\in A}d(a,b)$ y su fuente es el $a$ buscado.</p>` },
      { idea: 'Correctitud y costo', detalle: R`<p>BFS visita los vértices por nivel creciente: el primer $b\in B$ que aparece minimiza la distancia a $A$. El grafo agrandado tiene $n+1$ vértices y $m+|A|$ aristas: $O(n+m)$. $\blacksquare$</p>` },
    ],
    conclusion: 'El truco del "vértice fantasma" convierte un problema de muchas fuentes en uno de una sola.',
  },
  {
    fuente: 'Práctica 8 · Ej. 2',
    enunciado: R`Grilla modular: una grilla $m\times n$ con valores en $[0,k)$; empezamos en una celda con valor $v_1$, y cada movimiento horizontal/vertical a una celda con valor $z$ transforma $v\mapsto(v+z)\bmod k$. Hallar la mínima cantidad de movimientos para obtener $w$, usando BFS en $O(kmn)$.`,
    idea: 'El estado es (celda, valor actual).',
    pasos: [
      { idea: 'Vértices', detalle: R`<p>Un vértice por cada $(x,y,v)$ con $(x,y)$ celda y $v\in[0,k)$ el valor acumulado: $kmn$ vértices.</p>` },
      { idea: 'Aristas', detalle: R`<p>De $(x,y,v)$ a $(x',y',(v+z_{x'y'})\bmod k)$ para cada celda vecina $(x',y')$: a lo sumo 4 aristas por vértice, o sea $O(kmn)$ aristas, todas de peso 1.</p>` },
      { idea: 'Respuesta', detalle: R`<p>BFS desde $(x_1,y_1,v_1)$; la respuesta es el menor nivel de un vértice $(x,y,w)$ (cualquier celda). Correctitud: cada camino del grafo es una secuencia de movimientos con el valor acumulado correcto, y viceversa. Costo $O(kmn)$. $\blacksquare$</p>` },
    ],
    conclusion: 'Cuando el futuro depende de información extra (el valor), se codifica en el vértice: "modelar estados".',
  },
  {
    fuente: 'Práctica 8 · Ej. 3',
    enunciado: R`(a) Algoritmo $O(n+m)$ para el peso de un camino mínimo desde $v$ a todos los vértices de un DAG con pesos; (b) versión de caminos máximos; (c) reconstruir el camino.`,
    idea: 'Orden topológico y una relajación por arista.',
    pasos: [
      { idea: '(a) Algoritmo', detalle: R`<p>Calcular un orden topológico $L$. Inicializar $d[v]=0$ en el origen $v$ y $d=\infty$ en los demás. Para cada $u$ en el orden de $L$ y cada arista $u\to w$: si $d[u]+c(u\to w)<d[w]$, actualizar $d[w]$ y $\pi[w]=u$.</p>` },
      { idea: 'Correctitud', detalle: R`<p>Cuando se procesa $u$, todos sus predecesores ya fueron procesados, así que $d[u]$ ya es la distancia final (inducción en el orden topológico). Un camino mínimo a $w$ termina en alguna arista $u\to w$ y la relajación de esa arista deja $d[w]\le\delta(v,u)+c=\delta(v,w)$.</p>` },
      { idea: 'Costo', detalle: R`<p>$O(n+m)$ tiempo (orden topológico + una pasada por las aristas) y $O(n)$ espacio. Funciona con pesos negativos.</p>` },
      { idea: '(b) y (c)', detalle: R`<p>Máximo: cambiar $\min$ por $\max$ (inicializar con $-\infty$). Reconstrucción: seguir $\pi$ desde $w$ hacia atrás y invertir la lista; sirve también para el máximo. En un grafo <em>no</em> acíclico, el camino máximo no está bien definido en general (ciclos positivos). $\blacksquare$</p>` },
    ],
    conclusion: 'Es la misma idea que contar caminos en un DAG: un cómputo de programación dinámica en orden topológico.',
  },
  {
    fuente: 'Práctica 8 · Ej. 5(b)',
    enunciado: R`Dado un digrafo $D$ con pesos naturales positivos $c\ge1$ y $s,t$, una arista $v\to w$ es $st$-eficiente si pertenece a algún camino mínimo de $s$ a $t$. Demostrar que lo es $\iff d(s,v)+c(v\to w)+d(w,t)=d(s,t)$.`,
    idea: 'El inciso (a) da el mínimo recorrido (posiblemente con repeticiones) por la arista; con pesos positivos ese recorrido no puede repetir vértices.',
    pasos: [
      { idea: '(⇒)', detalle: R`<p>Si $v\to w$ está en un camino mínimo $P$ de $s$ a $t$, por subestructura óptima el tramo $s\leadsto v$ es mínimo (peso $d(s,v)$) y el tramo $w\leadsto t$ también (peso $d(w,t)$). Luego $d(s,t)=w(P)=d(s,v)+c(v\to w)+d(w,t)$.</p>` },
      { idea: '(⇐) (pesos positivos)', detalle: R`<p>Supongamos la igualdad y pesos $c\ge1$. Sea $Q_1$ un camino mínimo de $s$ a $v$ y $Q_2$ uno de $w$ a $t$. El recorrido $W=Q_1,\ v\to w,\ Q_2$ pesa $d(s,t)$. Si $W$ repitiera un vértice, contendría un ciclo de peso $\ge1$; quitándolo quedaría un recorrido de $s$ a $t$ de peso estrictamente menor que $d(s,t)$, absurdo. Entonces $W$ es un camino, es mínimo y contiene a $v\to w$: la arista es $st$-eficiente.</p><p><em>Nota:</em> con pesos $0$ permitidos hay que elegir con cuidado (un ciclo de peso nulo podría "absorber" la arista); por eso la práctica trabaja con pesos en $\mathbb{N}$ positivos.</p>` },
      { idea: 'Algoritmo', detalle: R`<p>Dijkstra desde $s$ en $D$ (da $d(s,\cdot)$) y desde $t$ en el grafo con aristas invertidas (da $d(\cdot,t)$): $O((n+m)\log n)$. Luego se testea la igualdad arista por arista en $O(m)$. $\blacksquare$</p>` },
    ],
    conclusion: 'Con pesos estrictamente positivos la prueba (⇐) es directa; con pesos 0 hay que tener cuidado con los ciclos de peso nulo.',
  },
  {
    fuente: 'Práctica 8 · Ej. 7 (grafo de estados)',
    enunciado: R`Dado un digrafo pesado $D$ (con pesos posiblemente negativos) y dos vértices $s,t$, hallar el recorrido de peso mínimo de $s$ a $t$ que pasa por <b>a lo sumo una</b> arista de peso negativo.`,
    idea: 'El estado es (vértice, cantidad de negativas usadas): un grafo con dos capas.',
    pasos: [
      { idea: '1) ¿Qué hay que recordar?', detalle: R`<p>Para decidir qué aristas se pueden tomar no alcanza saber en qué vértice estoy: también importa <b>si ya usé mi única arista negativa</b>. Entonces el estado es $(v,j)$ con $j\in\{0,1\}$.</p>` },
      { idea: '2) Vértices', detalle: R`<p>$2n$ vértices: la capa $0$ ("no usé ninguna negativa") y la capa $1$ ("ya usé una").</p>` },
      { idea: '3) Aristas', detalle: R`<p>Por cada arista $u\to v$ de peso $w$: si $w\ge0$, se agregan $(u,0)\to(v,0)$ y $(u,1)\to(v,1)$ con peso $w$ (se puede tomar en cualquier capa y no cambia el contador). Si $w<0$, se agrega <b>solo</b> $(u,0)\to(v,1)$ con peso $w$: tomarla consume la única negativa y sube de capa. No hay aristas negativas dentro de la capa 1, por eso no se pueden tomar dos.</p>` },
      { idea: '4) Origen y destino', detalle: R`<p>Se parte de $(s,0)$ y la respuesta es $\min\{d((s,0),(t,0)),\ d((s,0),(t,1))\}$ (o se agrega un fantasma $t^*$ al que apuntan ambos con peso 0).</p>` },
      { idea: '5) Correctitud', detalle: R`<p>Proyectando un camino del grafo de estados (olvidando la capa) se obtiene un recorrido de $s$ a $t$ del mismo peso con exactamente $j$ negativas ($j\le1$). Recíprocamente, un recorrido con a lo sumo una negativa se "levanta": capa 0 hasta la negativa y capa 1 después. Los pesos mínimos coinciden.</p>` },
      { idea: '6) Algoritmo y costo', detalle: R`<p>Hay pesos negativos, pero cualquier ciclo está dentro de una capa y solo usa aristas $\ge0$: no hay ciclos negativos y sirve Bellman–Ford en $O(2n\cdot2m)=O(nm)$. Mejor: sea $d^+$ la distancia usando solo aristas $\ge0$ (Dijkstra desde $s$ y, en el grafo invertido, desde $t$); la respuesta es $\min\big(d^+(s,t),\ \min_{u\to v,\,w<0}d^+(s,u)+w+d^+(v,t)\big)$ en $O((n+m)\log n)$. $\blacksquare$</p>` },
    ],
    conclusion: 'Receta general: estado = posición + lo que cambia el futuro; las aristas "prohibidas" simplemente no existen en el grafo de estados.',
  },
];

export const GUIA_P9 = [
  {
    fuente: 'Práctica 9 · Ej. 1',
    enunciado: R`Sobre el flujo máximo en una red $D$: (a) si todas las capacidades son pares, ¿es par el valor del flujo máximo? (b) ¿existe un flujo máximo con flujo par en cada arista? (c) capacidades impares ⇒ ¿valor impar? (d) capacidades impares ⇒ ¿existe un flujo máximo con flujo impar en cada arista? (e) capacidades racionales ⇒ ¿flujo máximo racional?`,
    idea: 'Usar max-flow min-cut para el valor y Ford–Fulkerson para el flujo por arista.',
    pasos: [
      { idea: '(a) Verdadero', detalle: R`<p>El valor es la capacidad de un corte mínimo, suma de capacidades pares: par.</p>` },
      { idea: '(b) Verdadero', detalle: R`<p>Dividiendo todas las capacidades por 2 se obtiene una red de capacidades enteras; por integralidad existe un flujo máximo entero $g$ en ella. Entonces $2g$ es un flujo máximo de la red original y sus valores por arista son pares.</p>` },
      { idea: '(c) Falso', detalle: R`<p>Red $s\to a\to t$ y $s\to b\to t$ con todas las capacidades $1$: flujo máximo $2$ (par), con capacidades impares.</p>` },
      { idea: '(d) Falso', detalle: R`<p>Aristas $s\to a$, $s\to b$, $a\to t$, $b\to t$, $a\to b$, todas de capacidad $1$. El flujo máximo vale $2$ y debe saturar las cuatro primeras; entonces $a\to b$ tiene flujo $0$ (par): no existe un flujo máximo con flujo impar en todas las aristas.</p>` },
      { idea: '(e) Verdadero', detalle: R`<p>Multiplicando las capacidades por el común denominador $q$ se obtienen enteras; el flujo máximo es entero ($v$) y el de la red original es $v/q$, racional. $\blacksquare$</p>` },
    ],
    conclusion: 'Las propiedades de "tipo" (par, entero, racional) del flujo máximo salen de la integralidad de Ford–Fulkerson.',
  },
  {
    fuente: 'Práctica 9 · Ej. 3',
    enunciado: R`Dado un digrafo $G$ con vértices $s,t$: (a) modelo de flujo para la máxima cantidad de caminos de $s$ a $t$ disjuntos en aristas; (b) interpretación; (c) demostración de correctitud; (d) complejidad con Edmonds–Karp.`,
    idea: 'Capacidad 1 en cada arista: una unidad de flujo es un camino.',
    pasos: [
      { idea: '(a) Modelo', detalle: R`<p>La red es $G$ con capacidad $1$ en cada arista, fuente $s$ y sumidero $t$. La respuesta es el valor del flujo máximo.</p>` },
      { idea: '(b) Interpretación', detalle: R`<p>Cada unidad de flujo que sale de $s$ viaja por una cadena de aristas hasta $t$ (conservación); la capacidad 1 impide que dos unidades usen la misma arista.</p>` },
      { idea: '(c) ⇐ (de caminos a flujo)', detalle: R`<p>Si hay $k$ caminos disjuntos en aristas, poner flujo $1$ en las aristas de cada camino: respeta capacidades (son disjuntos) y conservación; el valor es $k$.</p>` },
      { idea: '(c) ⇒ (de flujo a caminos)', detalle: R`<p>Por integralidad existe un flujo máximo entero, con flujo $0$ o $1$ en cada arista. Con valor $k$, de $s$ salen $k$ aristas con flujo 1. Siguiendo aristas con flujo 1 (la conservación garantiza siempre una saliente) se extraen $k$ caminos $s\to t$ sin aristas repetidas; los ciclos de flujo que aparezcan se descartan. Por lo tanto la cantidad máxima de caminos disjuntos es exactamente el valor del flujo máximo.</p>` },
      { idea: '(d) Costo', detalle: R`<p>Edmonds–Karp: $O(nm^2)$. Como el flujo máximo es $\le\deg^+(s)\le n$ y cada aumento suma $\ge1$ y cuesta un BFS $O(m)$, Ford–Fulkerson alcanza $O(nm)$. $\blacksquare$</p>` },
    ],
    conclusion: 'Para caminos disjuntos en vértices se parte cada vértice v en v_in → v_out con capacidad 1 (Teorema de Menger).',
  },
  {
    fuente: 'Práctica 9 · Ej. 5',
    enunciado: R`Matching máximo: una lista de personas y las tareas que puede hacer cada una; cada persona hace una tarea y cada tarea la hace una sola persona. Modelar con flujo, demostrar la correctitud y dar una cota de complejidad.`,
    idea: 'Red bipartita con capacidades 1.',
    pasos: [
      { idea: '(a) Red', detalle: R`<p>Vértices $s$, $t$, una vértice por persona $P_i$ y uno por tarea $T_j$. Aristas $s\to P_i$ (cap. 1), $P_i\to T_j$ (cap. 1) si la persona $i$ puede hacer la tarea $j$, y $T_j\to t$ (cap. 1).</p>` },
      { idea: '(b) Flujo ⇒ asignación', detalle: R`<p>Por integralidad hay un flujo máximo entero de valor $k$. Sea $M$ el conjunto de aristas $P_i\to T_j$ con flujo 1. Cada $P_i$ recibe a lo sumo 1 unidad (cap. de $s\to P_i$) y por conservación manda a lo sumo a una tarea; cada $T_j$ manda a lo sumo 1 a $t$ y recibe a lo sumo una. Entonces $M$ es un matching con $|M|=k$ (el flujo que sale de $s$ se reparte en las aristas del medio).</p>` },
      { idea: '(b) Asignación ⇒ flujo', detalle: R`<p>Dado un conjunto de $k$ asignaciones válidas, poner flujo 1 en $s\to P_i$, $P_i\to T_j$, $T_j\to t$ para cada asignación $(i,j)$: respeta capacidades (cada persona y cada tarea aparece una vez) y conservación, con valor $k$. Entonces el flujo máximo es $\ge k$ y por lo anterior coincide con el máximo número de tareas.</p>` },
      { idea: '(c) Cota', detalle: R`<p>La red tiene $n+m'+2$ vértices y $n+m'+E$ aristas ($E$ = pares persona–tarea posibles). Como el flujo máximo es $\le\min(n,m')$ y cada aumento cuesta $O(E)$, Ford–Fulkerson tarda $O(\min(n,m')\cdot E)$ (también sirve Edmonds–Karp con $O(VE^2)$). $\blacksquare$</p>` },
    ],
    conclusion: 'Este modelo también da el teorema de König: en un grafo bipartito, matching máximo = cubrimiento mínimo por vértices.',
  },
  {
    fuente: 'Práctica 9 · Ej. 3 (variante: disjuntos en vértices)',
    enunciado: R`Dado un digrafo $G$ y vértices $s,t$, modelar con flujo la máxima cantidad de caminos de $s$ a $t$ que no comparten <b>vértices</b> (salvo $s$ y $t$).`,
    idea: 'La restricción es sobre vértices: se parte cada vértice interno en entrada y salida con capacidad 1.',
    pasos: [
      { idea: '1) Por qué no alcanza con capacidad 1 en aristas', detalle: R`<p>Dos caminos pueden usar aristas distintas y aun así pasar por el mismo vértice $v$ (una arista entra a $v$ por un lado y otra por otro, y salen por aristas distintas). Con capacidad 1 solo en aristas eso estaría permitido.</p>` },
      { idea: '2) Partir cada vértice interno', detalle: R`<p>Cada $v\neq s,t$ se reemplaza por $v_{in}$ y $v_{out}$ con una arista $v_{in}\to v_{out}$ de capacidad $1$. Cada arista $u\to v$ de $G$ pasa a ser $u_{out}\to v_{in}$ (capacidad 1, o $\infty$: da igual); las que salen de $s$ parten de $s$ y las que llegan a $t$ llegan a $t$.</p>` },
      { idea: '3) Interpretación', detalle: R`<p>Una unidad de flujo es un camino; $v_{in}$ es "llego a $v$", $v_{out}$ es "salgo de $v$", y la arista del medio es el cupo: <b>a lo sumo una unidad puede atravesar $v$</b>.</p>` },
      { idea: '4) Correctitud', detalle: R`<p>($\Leftarrow$) $k$ caminos disjuntos en vértices dan un flujo de valor $k$: cada vértice interno es atravesado por a lo sumo uno, así que $v_{in}\to v_{out}$ lleva $\le1$. ($\Rightarrow$) Por integralidad hay un flujo máximo entero de valor $k$; descomponiéndolo se obtienen $k$ caminos sin aristas repetidas, y como cada $v_{in}\to v_{out}$ lleva $\le1$ unidad, ningún vértice interno aparece en dos caminos.</p>` },
      { idea: '5) Costo', detalle: R`<p>La red tiene $2n-2$ vértices y $m+n-2$ aristas. El flujo es $\le n-2$ (cada camino usa al menos un vértice interno distinto, salvo la arista directa $s\to t$) y cada aumento es un BFS: $O(nm)$ con Ford–Fulkerson/BFS. $\blacksquare$</p>` },
    ],
    conclusion: 'Por Menger, este valor coincide con la mínima cantidad de vértices cuya remoción desconecta s de t (el Ej. 4(b) de los "súbditos").',
  },
  {
    fuente: 'Práctica 9 · Ej. 8 (nodos intermedios)',
    enunciado: R`Hospital: $K$ períodos de feriados con días contiguos y $M$ médicos, cada uno con un conjunto de días disponibles $S_i$. Se pide, si existe, una asignación donde cada día tiene exactamente un médico, nadie trabaja más de $C$ días en total y cada médico trabaja a lo sumo un día por período. Modelar con flujo y demostrar.`,
    idea: 'Cada restricción "a lo sumo" se vuelve una capacidad; la de "uno por período" necesita un nodo por par (médico, período).',
    pasos: [
      { idea: '1) Una restricción, una capacidad', detalle: R`<p>Hay tres tipos de límite: por médico (total $C$), por médico y período (1) y por día (exactamente 1). Cada uno se representa con una arista de esa capacidad, y para el segundo hace falta un nodo extra.</p>` },
      { idea: '2) Red', detalle: R`<p>Vértices: $s$, $t$, un vértice $m_i$ por médico, un vértice $(m_i,k)$ por cada médico y período $k$ en que tiene algún día disponible, y un vértice $d$ por cada día. Aristas: $s\to m_i$ de capacidad $C$; $m_i\to(m_i,k)$ de capacidad $1$ ("a lo sumo un día en este período"); $(m_i,k)\to d$ de capacidad $1$ si $d\in D_k\cap S_i$; $d\to t$ de capacidad $1$.</p>` },
      { idea: '3) Qué significa el flujo', detalle: R`<p>Una unidad de flujo que pasa por $s\to m_i\to(m_i,k)\to d\to t$ es "el médico $i$ trabaja el día $d$ del período $k$".</p>` },
      { idea: '4) Equivalencia', detalle: R`<p>Hay una asignación válida $\iff$ existe un flujo de valor $|D|$ (cantidad total de días). ($\Leftarrow$) Se pone una unidad de flujo por cada asignación: respeta $C$ en $s\to m_i$, un día por período en $m_i\to(m_i,k)$ y un médico por día en $d\to t$. ($\Rightarrow$) Un flujo entero de valor $|D|$ satura todas las aristas $d\to t$ (es el máximo posible), o sea cada día recibe exactamente 1 unidad de un único $(m_i,k)$; por las capacidades, nadie excede $C$ ni trabaja dos días de un mismo período.</p>` },
      { idea: '5) Algoritmo', detalle: R`<p>Calcular el flujo máximo con Edmonds–Karp y comparar con $|D|$. La red tiene $O(M\cdot K+|D|)$ vértices y $O(M\cdot|D|)$ aristas, el flujo vale a lo sumo $|D|$: $O(|D|\cdot M|D|)$ con Ford–Fulkerson. $\blacksquare$</p>` },
    ],
    conclusion: 'Truco general: si una restricción es "a lo sumo X sobre un grupo de aristas", se hace pasar ese grupo por un único nodo (o arista) de capacidad X.',
  },
];
