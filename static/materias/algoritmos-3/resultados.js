// materias/algoritmos-3/resultados.js — checklist de resultados clave por página de teoría.
// Cada ítem: n (nombre), ref (práctica/teórica), e (enunciado), p (demostración), x (ejemplo de uso paso a paso, opcional).
const R = String.raw;

export const RESULTADOS = {
  'a3-demostraciones': [
    {
      n: 'Principio de inducción', ref: 'Práctica 1',
      e: R`Si $P(n_0)$ vale y $\forall n\ge n_0:\ P(n)\Rightarrow P(n+1)$, entonces $P(n)$ vale para todo $n\ge n_0$.`,
      p: R`<p>Si no, el conjunto $\{n\ge n_0:\neg P(n)\}$ tiene un mínimo $m>n_0$ (por el buen orden de $\mathbb{N}$). Como $P(m-1)$ vale, el paso inductivo da $P(m)$: contradicción. $\blacksquare$</p>`,
      x: {
        enunciado: R`Probar por inducción que $\sum_{i=0}^{n}2^i=2^{n+1}-1$ para todo $n\ge0$ (Práctica 1, Ej. 13).`,
        idea: 'Definir P(n), probar la base y usar la hipótesis para P(n+1).',
        pasos: [
          { idea: 'Predicado y base', detalle: R`<p>$P(n):\ \sum_{i=0}^n2^i=2^{n+1}-1$. Para $n=0$: $2^0=1=2^1-1$ ✓.</p>` },
          { idea: 'Paso inductivo', detalle: R`<p>Suponiendo $P(n)$: $\sum_{i=0}^{n+1}2^i=\big(\sum_{i=0}^n2^i\big)+2^{n+1}=2^{n+1}-1+2^{n+1}=2^{n+2}-1$, que es $P(n+1)$. $\blacksquare$</p>` },
        ],
        conclusion: 'La hipótesis inductiva se usa exactamente en la igualdad del medio.',
      },
    },
    {
      n: 'Reducción al absurdo: tres cajas con tres cantidades impares', ref: 'Práctica 1 · Ej. 7',
      e: R`En toda distribución de 20 pelotas en 3 cajas, alguna caja tiene una cantidad par.`,
      p: R`<p>Si las tres cantidades $a,b,c$ fueran impares, $a=2x+1$, $b=2y+1$, $c=2z+1$, entonces $a+b+c=2(x+y+z)+3$ es impar, pero debe ser $20$ (par). Contradicción. $\blacksquare$</p>`,
    },
  ],

  'a3-complejidad': [
    {
      n: 'Propiedades de O, Ω y Θ', ref: 'Práctica 1 · Ej. 20',
      e: R`(a) $g\in O(f)\iff f\in\Omega(g)$. (b) $O$ es transitiva. (c) $2^n\le n!$ para $n\ge4$.`,
      p: R`<p>(a) $g\le cf\iff f\ge\tfrac1cg$. (b) $g\le c_1f$ y $f\le c_2h$ dan $g\le c_1c_2h$ para $n\ge\max(n_1,n_2)$. (c) Inducción: $4!=24\ge16$ y $(n+1)!\ge5\cdot2^n\ge2^{n+1}$. $\blacksquare$</p>`,
      x: {
        enunciado: R`Mostrar que $g(n)=5n+2\in O(f)$ con $f(n)=\tfrac12n-20$ y dar $c,n_0$.`,
        idea: 'f es negativa para n < 40: elegir n₀ mayor.',
        pasos: [
          { idea: 'Elegir n₀', detalle: R`<p>Para $n\ge80$, $\tfrac12n-20\ge\tfrac14n$ (equivale a $\tfrac14n\ge20$).</p>` },
          { idea: 'Acotar g', detalle: R`<p>Para $n\ge1$, $5n+2\le7n$, y $7n\le28\cdot\tfrac14n\le28\big(\tfrac12n-20\big)$ si $n\ge80$. Entonces $c=28$, $n_0=80$ sirven: $g(n)\le28f(n)$ para $n\ge80$. $\blacksquare$</p>` },
        ],
        conclusion: 'Las constantes no son únicas ni hace falta que sean ajustadas.',
      },
    },
  ],

  'a3-grafos': [
    {
      n: 'Lema del apretón de manos', ref: 'Práctica 2 · Ej. 4, 5',
      e: R`$\sum_{v}\deg(v)=2|E(G)|$; en un digrafo $\sum d_{in}=\sum d_{out}=|E|$.`,
      p: R`<p>Inducción en $|E|$: quitar una arista $uv$ baja en 1 el grado de $u$ y de $v$ (suma total $-2$); sin aristas ambos lados valen 0. $\blacksquare$</p>`,
    },
    {
      n: 'Dos vértices con el mismo grado', ref: 'Práctica 2 · Ej. 6',
      e: R`Todo grafo con $n\ge2$ vértices tiene dos vértices del mismo grado.`,
      p: R`<p>Si todos los grados fueran distintos, serían exactamente $0,1,\dots,n-1$. El de grado $n-1$ es adyacente a todos, incluido el de grado $0$: absurdo. $\blacksquare$</p>`,
      x: {
        enunciado: R`En una reunión de 7 personas, ¿es posible que todas hayan estrechado una cantidad distinta de manos?`,
        idea: 'Modelar con un grafo: personas = vértices, apretón = arista.',
        pasos: [
          { idea: 'Modelo', detalle: R`<p>Es un grafo simple de $n=7$ vértices; el grado de cada vértice es la cantidad de manos estrechadas.</p>` },
          { idea: 'Aplicar el resultado', detalle: R`<p>Como $n\ge2$, hay dos vértices del mismo grado: <b>no</b> es posible que todos hayan estrechado una cantidad distinta. $\blacksquare$</p>` },
        ],
        conclusion: 'El principio del palomar es el corazón de la prueba: n vértices, n−1 grados posibles una vez excluida la combinación 0 y n−1.',
      },
    },
    {
      n: 'Muchas aristas implican conexo', ref: 'Práctica 2 · Ej. 7',
      e: R`Si $G$ tiene $n$ vértices y más de $\tfrac{(n-1)(n-2)}2$ aristas, entonces $G$ es conexo.`,
      p: R`<p>Si fuera disconexo, con una componente de $a$ vértices tendría a lo sumo $\binom a2+\binom{n-a}2\le\tfrac{(n-1)(n-2)}2$ aristas (función convexa en $a$, máximo en $a=1$). $\blacksquare$</p>`,
    },
  ],

  'a3-representacion': [
    {
      n: 'Costos de lista vs. matriz', ref: 'Práctica 3 · Ej. 1',
      e: R`Lista: espacio $\Theta(n+m)$, ¿$vw\in E$? en $O(\deg v)$, recorrer todo en $O(n+m)$. Matriz: espacio $\Theta(n^2)$, adyacencia en $O(1)$, recorrer todo en $O(n^2)$.`,
      p: R`<p>La suma de longitudes de las listas es $\sum_v\deg v=2m$ (lema del apretón de manos), más $n$ cabeceras. La matriz tiene $n^2$ casillas y hay que leerlas todas para enumerar las aristas. $\blacksquare$</p>`,
    },
    {
      n: 'Triángulos en tiempo Θ(nm)', ref: 'Práctica 3 · Ej. 2',
      e: R`Marcar $N(v)$ para cada $v$ y buscar una arista con ambos extremos marcados decide si hay triángulo en $\Theta(nm)=O(m^2)$.`,
      p: R`<p>$\{v,w,z\}$ es triángulo $\iff w,z\in N(v)$ y $wz\in E$. Por cada $v$ el costo es $\deg v$ (marcar/desmarcar) $+\,m$ (recorrer aristas): $\sum_v(\deg v+m)=2m+nm$. $\blacksquare$</p>`,
    },
  ],

  'a3-bfs-dfs': [
    {
      n: 'BFS calcula distancias', ref: 'Práctica 3 · Ej. 16',
      e: R`El nivel de $w$ en un BFS desde $v$ es $d_G(v,w)$; todo árbol BFS enraizado en $v$ es $v$-geodésico.`,
      p: R`<p>Un vértice recibe nivel $k+1$ al extraer su primer vecino de nivel $k$; un camino más corto lo habría descubierto antes. En el árbol, el camino de $v$ a $w$ tiene $\text{nivel}(w)$ aristas. $\blacksquare$</p>`,
    },
    {
      n: 'Puentes con DFS y low-link', ref: 'Práctica 3 · Ej. 12',
      e: R`La arista de árbol $uv$ ($u$ padre de $v$) es puente $\iff\operatorname{low}(v)>d[u]$. Todo en $O(n+m)$.`,
      p: R`<p>Las aristas fuera del árbol DFS son de retroceso (conectan ancestro–descendiente). La arista $uv$ está en un ciclo $\iff$ alguna arista de retroceso del subárbol de $v$ llega a $u$ o a un ancestro, es decir $\operatorname{low}(v)\le d[u]$. Una arista es puente exactamente cuando no está en ningún ciclo. $\blacksquare$</p>`,
      x: {
        enunciado: R`En el grafo con triángulos $\{0,1,2\}$ y $\{3,4,5\}$ más las aristas $2\!-\!3$ y $4\!-\!6$, hallar los puentes con DFS desde 0.`,
        idea: 'Calcular low en el árbol DFS y comparar con d del padre.',
        pasos: [
          { idea: 'Árbol y tiempos', detalle: R`<p>DFS: $0(d{=}1)\to1\to2\to3\to4\to5$ y $4\to6$ (el orden depende de las listas). Las aristas de retroceso son $2\!\to\!0$ y $5\!\to\!3$.</p>` },
          { idea: 'Valores low', detalle: R`<p>Los vértices del primer triángulo alcanzan $d[0]=1$ por la arista de retroceso; los del segundo alcanzan $d[3]$; el vértice $6$ solo se ve a sí mismo.</p>` },
          { idea: 'Criterio', detalle: R`<p>$2\!-\!3$: $\operatorname{low}(3)=d[3]>d[2]$ ⇒ <b>puente</b>. $4\!-\!6$: $\operatorname{low}(6)=d[6]>d[4]$ ⇒ <b>puente</b>. Las aristas dentro de los triángulos tienen $\operatorname{low}\le d[\text{padre}]$ ⇒ no son puentes. $\blacksquare$</p>` },
        ],
        conclusion: 'Los puentes son exactamente las aristas que no pertenecen a ningún ciclo.',
      },
    },
  ],

  'a3-dyc': [
    {
      n: 'Teorema Maestro (f = Θ(nᵈ))', ref: 'Práctica 4 · Ej. 1–3',
      e: R`$T(n)=aT(n/b)+\Theta(n^d)$: si $d>\log_ba$, $\Theta(n^d)$; si $d=\log_ba$, $\Theta(n^d\log n)$; si $d<\log_ba$, $\Theta(n^{\log_ba})$.`,
      p: R`<p>El nivel $i$ del árbol de recursión cuesta $a^i(n/b^i)^d=n^d(a/b^d)^i$. Sumando la serie geométrica de razón $r=a/b^d$ sobre los $\log_bn+1$ niveles: converge si $r<1$ (domina la raíz), da $\log_bn+1$ términos iguales si $r=1$ y se dispara hasta el último término si $r>1$ (hojas, $a^{\log_bn}=n^{\log_ba}$). $\blacksquare$</p>`,
      x: {
        enunciado: R`Resolver (a) $T(n)=2T(n/2)+n$; (b) $T(n)=T(n/2)+\sqrt n$; (c) $T(n)=3T(n/4)$.`,
        idea: 'Calcular a, b, d y comparar d con log_b a.',
        pasos: [
          { idea: '(a)', detalle: R`<p>$a=2,b=2,d=1$, $\log_22=1=d$ ⇒ $\Theta(n\log n)$ (MergeSort).</p>` },
          { idea: '(b)', detalle: R`<p>$a=1,b=2,d=\tfrac12$, $\log_21=0<d$ ⇒ $\Theta(\sqrt n)$ (domina la raíz).</p>` },
          { idea: '(c)', detalle: R`<p>$a=3,b=4,d=0$, $\log_43\approx0{,}79>d$ ⇒ $\Theta(n^{\log_43})$ (dominan las hojas). $\blacksquare$</p>` },
        ],
        conclusion: 'Se compara siempre d contra log_b a: raíz, empate u hojas.',
      },
    },
    {
      n: 'Contar inversiones en Θ(n log n)', ref: 'Práctica 4 · Ej. 11',
      e: R`MergeSort modificado cuenta las inversiones sumando, durante el merge, $|L|-i$ cada vez que se toma un elemento de la mitad derecha.`,
      p: R`<p>Las inversiones son de tres tipos (dos en la izquierda, dos en la derecha, cruzadas). Con ambas mitades ordenadas, al tomar $R[j]<L[i]$ queda en inversión exactamente con $L[i..]$. Recurrencia $T(n)=2T(n/2)+\Theta(n)$. $\blacksquare$</p>`,
    },
  ],

  'a3-backtracking': [
    {
      n: 'Correctitud de la recurrencia de Suma de Subconjuntos', ref: 'Práctica 5 · Ej. 6',
      e: R`$ss_{rec}(C,k)=ss(C,k)$, con $ss_{rec}(\emptyset,k)=[k=0]$ y $ss_{rec}(C,k)=ss_{rec}(C',k)\lor ss_{rec}(C',k-c_n)$, $C'=C\setminus\{c_n\}$.`,
      p: R`<p>Inducción en $|C|$. Un subconjunto de $C$ que suma $k$ o no contiene a $c_n$ (y es de $C'$ con suma $k$) o lo contiene (y sin $c_n$ es de $C'$ con suma $k-c_n$); la recíproca es inmediata. $\blacksquare$</p>`,
      x: {
        enunciado: R`Evaluar $ss_{rec}(\{6,12,6\},12)$ y contar las soluciones.`,
        idea: 'Abrir el árbol: no tomar / tomar el último elemento.',
        pasos: [
          { idea: 'Primer nivel', detalle: R`<p>$ss(\{6,12,6\},12)=ss(\{6,12\},12)\lor ss(\{6,12\},6)$.</p>` },
          { idea: 'Rama izquierda', detalle: R`<p>$ss(\{6,12\},12)=ss(\{6\},12)\lor ss(\{6\},0)$. $ss(\{6\},12)$ es falso ($6\ne12$) y $ss(\{6\},0)$ es verdadero (conjunto vacío) ⇒ verdadero: solución $\{12\}$.</p>` },
          { idea: 'Rama derecha', detalle: R`<p>$ss(\{6,12\},6)=ss(\{6\},6)\lor ss(\{6\},-6)$; $ss(\{6\},6)=ss(\emptyset,6)\lor ss(\emptyset,0)$ es verdadero: solución $\{6,6\}$ (los dos elementos de valor 6 son distintos como elementos). $\blacksquare$</p>` },
        ],
        conclusion: 'Hay exactamente dos soluciones; el booleano global es verdadero.',
      },
    },
    {
      n: 'Poda por factibilidad', ref: 'Práctica 5 · Ej. 8',
      e: R`Si el objetivo restante $j$ es negativo, la rama no puede llevar a una solución válida y se corta sin perder soluciones.`,
      p: R`<p>Todos los $c_i\ge0$: agregar elementos solo suma. Si ya se pasó de $k$ ($j<0$), cualquier extensión suma más que $k$. $\blacksquare$</p>`,
    },
  ],

  'a3-dp': [
    {
      n: 'Memoización: Θ(nk) para Suma de Subconjuntos', ref: 'Práctica 6 · Ej. 3',
      e: R`Con $M[i][j]=M[i-1][j]\lor(j\ge c_i\land M[i-1][j-c_i])$, todas las celdas se llenan en $O(nk)$ tiempo y $O(nk)$ espacio ($O(k)$ guardando una fila).`,
      p: R`<p>Hay $(n+1)(k+1)$ parámetros y cada celda se calcula en $O(1)$ con dos celdas de la fila anterior. La corrección sale de la inducción de la recurrencia de backtracking. $\blacksquare$</p>`,
      x: {
        enunciado: R`Llenar la tabla para $C=\{2,3\}$, $k=5$ y reconstruir una solución.`,
        idea: 'Filas i = 0, 1, 2; columnas j = 0..5.',
        pasos: [
          { idea: 'Fila 0', detalle: R`<p>$M[0][0]=\text{V}$ y $M[0][j]=\text{F}$ para $j>0$.</p>` },
          { idea: 'Fila 1 (c₁ = 2)', detalle: R`<p>$M[1][j]=M[0][j]\lor M[0][j-2]$: verdadero solo en $j=0$ y $j=2$.</p>` },
          { idea: 'Fila 2 (c₂ = 3)', detalle: R`<p>$M[2][j]=M[1][j]\lor M[1][j-3]$: verdadero en $j=0,2,3,5$. En particular $M[2][5]=\text{V}$ (porque $M[1][2]=\text{V}$).</p>` },
          { idea: 'Reconstrucción', detalle: R`<p>En $(2,5)$: $M[1][5]=\text{F}$ ⇒ se usó $c_2=3$ y se pasa a $(1,2)$. En $(1,2)$: $M[0][2]=\text{F}$ ⇒ se usó $c_1=2$ y se pasa a $(0,0)$. Solución $\{2,3\}$. $\blacksquare$</p>` },
        ],
        conclusion: 'La tabla completa permite reconstruir; con una sola fila solo se sabe el valor.',
      },
    },
    {
      n: 'Fibonacci: de Θ(φⁿ) a O(n)', ref: 'Práctica 6 · Ej. 1',
      e: R`La recursión directa hace $\Theta(\varphi^n)$ llamadas; con memoización $O(n)$ y bottom-up con dos variables $O(n)$ tiempo y $O(1)$ espacio.`,
      p: R`<p>Con memoización el cuerpo se ejecuta una sola vez por valor de $m\le n$. En el bottom-up cada valor depende solo de los dos anteriores. $\blacksquare$</p>`,
    },
  ],

  'a3-greedy': [
    {
      n: 'Demoras: orden creciente de duración', ref: 'Práctica 7 · Ej. 7',
      e: R`La suma de demoras se minimiza atendiendo las tareas de menor a mayor duración.`,
      p: R`<p>La suma es $\sum_i(n-i+1)t_{\pi(i)}$. Intercambiar dos consecutivas con $t_{\pi(i)}>t_{\pi(i+1)}$ cambia la suma en $t_{\pi(i+1)}-t_{\pi(i)}<0$. Un óptimo no puede tener inversiones consecutivas: está ordenado. $\blacksquare$</p>`,
      x: {
        enunciado: R`Tareas de duración $5,2,8,1,3$: comparar el orden dado con el creciente.`,
        idea: 'Calcular las demoras acumuladas.',
        pasos: [
          { idea: 'Orden dado', detalle: R`<p>Finalizaciones: $5,7,15,16,19$; suma $=62$.</p>` },
          { idea: 'Orden creciente $1,2,3,5,8$', detalle: R`<p>Finalizaciones: $1,3,6,11,19$; suma $=40<62$. $\blacksquare$</p>` },
        ],
        conclusion: 'La última tarea termina siempre en 19; lo que mejora es el tiempo de espera de las demás.',
      },
    },
    {
      n: 'Ruta eficiente: parar lo más lejos posible', ref: 'Práctica 7 · Ej. 2',
      e: R`Desde la última carga, ir a la estación más lejana alcanzable minimiza la cantidad de paradas.`,
      p: R`<p>Intercambio: en el primer índice $i$ donde difieren la solución greedy $g_i$ y otra $s_i$, vale $s_i\le g_i$; reemplazar $s_i$ por $g_i$ mantiene la validez (el tramo siguiente se acorta o desaparece) sin aumentar paradas. $\blacksquare$</p>`,
    },
    {
      n: 'Deadlines: greedy por deadline creciente', ref: 'Práctica 7 · Ej. 5',
      e: R`Ordenando por deadline y aceptando una tarea si cabe en su plazo, se maximiza la cantidad de tareas a tiempo.`,
      p: R`<p>Greedy va adelante: si $g_i$ y $o_i$ cuentan las aceptadas entre las primeras $i$, vale $g_i\ge o_i$ por inducción (si el óptimo acepta la $i$-ésima, $o_i\le d_i$ y el greedy también puede aceptarla). $\blacksquare$</p>`,
    },
  ],

  'a3-caminos': [
    {
      n: 'Subestructura óptima de los caminos mínimos', ref: 'Teórica de caminos mínimos',
      e: R`Todo subcamino de un camino mínimo es un camino mínimo.`,
      p: R`<p>Si uno más corto reemplazara un tramo, el camino total mejoraría, contradiciendo la minimalidad. $\blacksquare$</p>`,
    },
    {
      n: 'Corrección de Dijkstra', ref: 'Práctica 8',
      e: R`Con pesos $\ge0$, al fijar $u$ se cumple $d[u]=\delta(s,u)$.`,
      p: R`<p>Si $u$ fuera el primero mal fijado, con $P$ camino mínimo y $(x,y)$ su primera arista que sale de los fijados: $d[y]=\delta(s,y)\le\delta(s,u)<d[u]$ y se habría extraído $y$ antes que $u$. $\blacksquare$</p>`,
      x: {
        enunciado: R`Mostrar que Dijkstra falla con una arista negativa: $s\to a$ (2), $s\to b$ (3), $b\to a$ ($-2$).`,
        idea: 'Ejecutar Dijkstra: se fija a antes de ver el camino mejor por b.',
        pasos: [
          { idea: 'Inicio', detalle: R`<p>$d[s]=0$; relajando: $d[a]=2$, $d[b]=3$.</p>` },
          { idea: 'Se fija a', detalle: R`<p>$a$ es el mínimo no fijado ($2<3$): queda con $d[a]=2$.</p>` },
          { idea: 'Se fija b', detalle: R`<p>Al relajar $b\to a$ ya no se puede cambiar $a$ (está fijado). Dijkstra devuelve $d[a]=2$, pero el camino $s\to b\to a$ pesa $3-2=1$. $\blacksquare$</p>` },
        ],
        conclusion: 'Bellman–Ford sí da 1 (relaja todas las aristas varias veces).',
      },
    },
    {
      n: 'Corrección de Bellman–Ford y ciclos negativos', ref: 'Práctica 8',
      e: R`Tras $n-1$ pasadas, $d[v]=\delta(s,v)$ si no hay ciclos negativos alcanzables; si la pasada $n$ aún mejora algo, hay un ciclo negativo alcanzable.`,
      p: R`<p>Un camino mínimo tiene $\le n-1$ aristas y en la pasada $i$ se relaja su $i$-ésima arista con el valor ya correcto. Si no hubiera mejora en la pasada $n$ y existiera un ciclo negativo, sumando $d[c_i]\le d[c_{i-1}]+w$ sobre el ciclo se tendría $0\le w(\text{ciclo})<0$. $\blacksquare$</p>`,
    },
  ],

  'a3-floyd': [
    {
      n: 'Recurrencia de Floyd–Warshall', ref: 'Práctica 8 · Ej. 9',
      e: R`$D^k[i][j]=\min\big(D^{k-1}[i][j],\ D^{k-1}[i][k]+D^{k-1}[k][j]\big)$; $D^n=\delta$ si no hay ciclos negativos. Tiempo $O(n^3)$.`,
      p: R`<p>Un camino mínimo con intermedios en $\{1..k\}$ no pasa por $k$ (peso $D^{k-1}[i][j]$) o pasa una vez y se parte en dos mínimos con intermedios en $\{1..k-1\}$. $\blacksquare$</p>`,
    },
  ],

  'a3-estados': [
    {
      n: 'Modelo de capas: a lo sumo una arista negativa', ref: 'Práctica 8 · Ej. 7',
      e: R`Con vértices $(v,j)$, $j\in\{0,1\}$, aristas no negativas dentro de cada capa y cada arista negativa $u\to v$ solo como $(u,0)\to(v,1)$, el peso mínimo de un recorrido de $s$ a $t$ con a lo sumo una arista negativa es $\min\{d((s,0),(t,0)),\ d((s,0),(t,1))\}$.`,
      p: R`<p>Proyectar un camino del grafo de capas (olvidando $j$) da un recorrido con el mismo peso y exactamente $j$ aristas negativas, porque las negativas solo existen como saltos $0\to1$ y no hay vuelta. Recíprocamente un recorrido con a lo sumo una negativa se levanta usando la capa 0 hasta la negativa y la capa 1 después. Los pesos mínimos coinciden. $\blacksquare$</p>`,
      x: {
        enunciado: R`Aristas $s\to a$ (4), $a\to t$ ($-3$), $s\to b$ (1), $b\to a$ ($-2$). Hallar el mínimo recorrido $s\to t$ con a lo sumo una negativa.`,
        idea: 'Construir las capas y mirar los dos destinos (t,0) y (t,1).',
        pasos: [
          { idea: 'Aristas del modelo', detalle: R`<p>No negativas: $(s,j)\to(a,j)$ peso 4 y $(s,j)\to(b,j)$ peso 1 para $j=0,1$. Negativas (solo bajan de capa): $(a,0)\to(t,1)$ peso $-3$ y $(b,0)\to(a,1)$ peso $-2$.</p>` },
          { idea: 'Caminos desde (s,0)', detalle: R`<p>$(s,0)\to(a,0)\to(t,1)$ pesa $4-3=1$. $(s,0)\to(b,0)\to(a,1)$ pesa $1-2=-1$, pero desde $(a,1)$ ya no hay salida negativa hacia $t$, así que no llega a $t$ (usó su única negativa y $a\to t$ es negativa). Entonces el óptimo es $1$.</p>` },
          { idea: 'Comparar con el libre', detalle: R`<p>Sin restricción: $s\to b\to a\to t$ pesa $1-2-3=-4$ (dos negativas). La restricción obliga a pagar $5$ más. $\blacksquare$</p>` },
        ],
        conclusion: 'Las aristas "prohibidas" por el estado simplemente no existen en el grafo de capas.',
      },
    },
  ],

  'a3-flujo': [
    {
      n: 'Flujo máximo = corte mínimo', ref: 'Práctica 9 · Ej. 2',
      e: R`$f$ es máximo $\iff$ $G_f$ no tiene camino de aumento $\iff$ existe un corte con $c(S,\bar S)=|f|$.`,
      p: R`<p>Con $S$ = alcanzables desde $s$ en $G_f$, toda arista de $S$ a $\bar S$ está saturada y toda de $\bar S$ a $S$ tiene flujo 0; luego $|f|=c(S,\bar S)$. Por dualidad débil ningún flujo supera esa capacidad. $\blacksquare$</p>`,
      x: {
        enunciado: R`Red $s\to a$ (3), $s\to b$ (2), $a\to t$ (2), $b\to t$ (3), $a\to b$ (1). Hallar el flujo máximo y un corte mínimo.`,
        idea: 'Aumentar con caminos y mirar la red residual.',
        pasos: [
          { idea: 'Primer aumento', detalle: R`<p>$s\to a\to t$ con cuello $\min(3,2)=2$. Flujo $=2$.</p>` },
          { idea: 'Segundo aumento', detalle: R`<p>$s\to b\to t$ con cuello $\min(2,3)=2$. Flujo $=4$. Residual: $a\to t$ y $s\to b$ saturadas.</p>` },
          { idea: 'Tercer aumento', detalle: R`<p>$s\to a\to b\to t$: capacidades residuales $1,1,1$ ⇒ cuello 1. Flujo $=5$.</p>` },
          { idea: 'Corte', detalle: R`<p>Desde $s$ ya no hay aristas con capacidad residual: $s\to a$ está saturada ($f=3$) y $s\to b$ también ($f=2$). Entonces el conjunto de alcanzables es $S=\{s\}$. Su capacidad es $3+2=5=|f|$ ✓. $\blacksquare$</p>` },
        ],
        conclusion: 'El flujo máximo es 5 y el corte mínimo aísla a la fuente.',
      },
    },
    {
      n: 'Modelado: caminos disjuntos y matching', ref: 'Práctica 9 · Ej. 3, 5',
      e: R`Con capacidad 1 en toda arista, el flujo máximo de $s$ a $t$ es la cantidad máxima de caminos disjuntos en aristas. El matching máximo bipartito es el flujo máximo en la red $s\to L\to R\to t$ con capacidades 1.`,
      p: R`<p>(⇒) Un flujo entero de valor $k$ con capacidades 1 se descompone en $k$ caminos sin aristas repetidas. (⇐) $k$ caminos disjuntos dan un flujo con 1 en cada arista usada. Para matching: las aristas con flujo 1 entre $L$ y $R$ forman un matching (conservación + capacidades 1) de tamaño igual al valor. $\blacksquare$</p>`,
    },
  ],
};
