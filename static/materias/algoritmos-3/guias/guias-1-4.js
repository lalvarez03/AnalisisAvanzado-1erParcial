// materias/algoritmos-3/guias/guias-1-4.js — ejercicios resueltos de las Prácticas 1 a 4 (2C 2026).
// Formato solvedExercise: { fuente, enunciado, idea?, pasos: [{ idea, detalle }], conclusion? } — todo HTML/LaTeX.
const R = String.raw;

export const GUIA_P1 = [
  {
    fuente: 'Práctica 1 · Ej. 3',
    enunciado: R`Encontrar el error en esta "demostración" de que el producto de un par $m$ y un impar $n$ es par: "Como $m$ es par, $m=2k$. Como $n$ es impar, $n=2k+1$. Entonces $mn=2k(2k+1)=2(2k^2+k)$, que es par." Reescribirla bien.`,
    idea: 'Mirar si se usa la misma letra para dos enteros que no tienen por qué ser iguales.',
    pasos: [
      { idea: 'El error', detalle: R`<p>Se usó la <b>misma letra $k$</b> para ambos. Eso supone, sin justificarlo, que $m=2k$ y $n=2k+1$ para el mismo $k$, es decir $n=m+1$: solo se probó el caso de dos enteros consecutivos.</p>` },
      { idea: 'Prueba correcta', detalle: R`<p>Sean $m$ par y $n$ impar cualesquiera. Existen enteros <b>$k$ y $l$</b> con $m=2k$ y $n=2l+1$. Entonces $mn=2k(2l+1)=2\big(k(2l+1)\big)$ y $k(2l+1)$ es entero, así que $mn$ es par. $\blacksquare$</p>` },
    ],
    conclusion: 'Al "introducir" objetos por definición (existe k tal que…) cada uno necesita su propia variable.',
  },
  {
    fuente: 'Práctica 1 · Ej. 9',
    enunciado: R`¿Cuál es el error en la siguiente demostración de que $a^n=1$ para todo $a\neq0$? "Base $n=0$: $a^0=1$. Paso: si $a^{n-1}=1$ entonces $a^n=\dfrac{a^{n-1}\cdot a^{n-1}}{a^{n-2}}=\dfrac{1\cdot1}{1}=1$."`,
    idea: 'Mirar qué hipótesis inductivas usa el paso y qué casos base se probaron.',
    pasos: [
      { idea: 'Qué usa el paso', detalle: R`<p>El paso usa $a^{n-1}=1$ <em>y también</em> $a^{n-2}=1$ (el denominador). Es una inducción que necesita <b>dos</b> hipótesis previas.</p>` },
      { idea: 'Dónde se rompe', detalle: R`<p>Para $n=1$ el paso pide $a^{-1}$ y $a^{0}$ como hipótesis: $a^{-1}$ no está cubierto por la base $n=0$. Y de hecho el resultado es falso ya para $n=1$ ($a^1=a\neq1$ en general). Falta el caso base $n=1$, que no se puede probar.</p>` },
      { idea: 'Moraleja', detalle: R`<p>Con inducción fuerte (usar $P(n-1)$ y $P(n-2)$) hay que probar <b>dos casos base</b>, y el paso debe valer desde $n=2$. Acá el segundo caso base es falso, y el "teorema" también. $\blacksquare$</p>` },
    ],
    conclusion: 'El paso inductivo debe valer para TODOS los n ≥ n₀; probar casos base que cubran lo que el paso necesita.',
  },
  {
    fuente: 'Práctica 1 · Ej. 15',
    enunciado: R`Probar por inducción que $2^n>n^2$ para todo $n\ge5$. ¿Qué pasa para $n<5$?`,
    idea: 'Base n = 5; en el paso, 2^{n+1} = 2·2^n > 2n² ≥ (n+1)².',
    pasos: [
      { idea: 'Base', detalle: R`<p>$n=5$: $2^5=32>25=5^2$ ✓.</p>` },
      { idea: 'Paso inductivo', detalle: R`<p>Sea $n\ge5$ con $2^n>n^2$. Entonces $2^{n+1}=2\cdot2^n>2n^2$. Basta ver $2n^2\ge(n+1)^2$, es decir $n^2-2n-1\ge0$, que vale para $n\ge3$ (en $n=3$: $9-6-1=2\ge0$ y la función crece). Luego $2^{n+1}>(n+1)^2$. $\blacksquare$</p>` },
      { idea: 'Valores chicos', detalle: R`<p>$n=0$: $1>0$ ✓; $n=1$: $2>1$ ✓; $n=2$: $4=4$ ✗; $n=3$: $8<9$ ✗; $n=4$: $16=16$ ✗. Por eso hace falta $n\ge5$ (la base tiene que ser <em>5</em>, no 4: el paso $2n^2\ge(n+1)^2$ necesita una desigualdad estricta de partida).</p>` },
    ],
    conclusion: 'La propiedad vale para n = 0, 1 y n ≥ 5; la inducción arranca recién en 5.',
  },
  {
    fuente: 'Práctica 1 · Ej. 19',
    enunciado: R`Principio del palomar: si hay $n>0$ cajas y $m$ objetos repartidos entre ellas, existe una caja con al menos $\big\lfloor\tfrac{m-1}{n}\big\rfloor+1$ objetos.`,
    idea: 'Por absurdo: si todas tuvieran menos, la suma sería chica.',
    pasos: [
      { idea: 'Negar', detalle: R`<p>Supongamos que toda caja tiene $\le\lfloor\tfrac{m-1}n\rfloor$ objetos.</p>` },
      { idea: 'Sumar', detalle: R`<p>Entonces $m\le n\lfloor\tfrac{m-1}n\rfloor\le n\cdot\tfrac{m-1}n=m-1$.</p>` },
      { idea: 'Contradicción', detalle: R`<p>Queda $m\le m-1$: absurdo. Luego alguna caja tiene al menos $\lfloor\tfrac{m-1}n\rfloor+1$ objetos. $\blacksquare$</p>` },
    ],
    conclusion: 'Caso típico: 20 pelotas en 3 cajas ⇒ alguna caja tiene ≥ ⌊19/3⌋+1 = 7.',
  },
  {
    fuente: 'Práctica 1 · Ej. 20(a, iii)',
    enunciado: R`Decidir si $g\in O(f)$ y si $f\in O(g)$ para $g(n)=2n^2-50n-4$ y $f(n)=n$. Dar constantes cuando corresponda.`,
    idea: 'Una cuadrática le gana a una lineal: g ∉ O(f), pero f ∈ O(g).',
    pasos: [
      { idea: 'g ∉ O(f)', detalle: R`<p>Si existieran $c,n_0$ con $2n^2-50n-4\le cn$ para $n\ge n_0$, dividiendo por $n$: $2n-50-4/n\le c$, y el miembro izquierdo tiende a $\infty$. Contradicción: no hay constantes.</p>` },
      { idea: 'f ∈ O(g)', detalle: R`<p>Hay que ver $n\le c(2n^2-50n-4)$ para $n\ge n_0$. Con $c=1$: $2n^2-51n-4\ge0$ se cumple para $n\ge26$ (en $n=26$: $1352-1326-4=22\ge0$, y el polinomio crece). Entonces $c=1$, $n_0=26$ sirven. $\blacksquare$</p>` },
    ],
    conclusion: 'También g ∈ Ω(f) (g ≥ f) y f ∉ Ω(g): no son Θ uno del otro.',
  },
];

export const GUIA_P2 = [
  {
    fuente: 'Práctica 2 · Ej. 3',
    enunciado: R`Sea $G$ un grafo de $n\ge2$ vértices sin vértices de grado $0$. ¿Cuáles de estas condiciones garantizan que $G$ es un árbol? (a) $n-1$ aristas; (b) exactamente 2 vértices de grado 1; (c) 2 de grado 1 y $n-1$ aristas; (d) 2 de grado 1 y sin ciclos; (e) 2 de grado 1 y conexo; (f) 2 de grado 1 y los demás de grado 2.`,
    idea: 'Un árbol es conexo y sin ciclos: buscar contraejemplos que fallen una de las dos cosas.',
    pasos: [
      { idea: '(a) No', detalle: R`<p>Un triángulo más una arista aparte: $n=5$, $4=n-1$ aristas, todos con grado $\ge1$, pero no es conexo (y tiene un ciclo).</p>` },
      { idea: '(b) No', detalle: R`<p>Un triángulo con dos vértices pendientes (hojas) colgando de vértices distintos: tiene exactamente 2 hojas y un ciclo.</p>` },
      { idea: '(c) No', detalle: R`<p>Un camino $P_3$ (tiene las 2 hojas) más un triángulo disjunto: $n=6$, $m=2+3=5=n-1$, grados $\ge1$, exactamente 2 de grado 1, pero es disconexo.</p>` },
      { idea: '(d) Sí', detalle: R`<p>Sin ciclos, cada componente es un árbol; como ningún vértice tiene grado 0, cada componente tiene al menos 2 vértices y por lo tanto al menos 2 hojas. Con exactamente 2 hojas en total, hay <b>una sola componente</b>: $G$ es conexo y acíclico, o sea un árbol.</p>` },
      { idea: '(e) No', detalle: R`<p>El mismo triángulo con dos pendientes de (b) es conexo y tiene 2 hojas, pero tiene un ciclo.</p>` },
      { idea: '(f) No', detalle: R`<p>Un $P_3$ más un ciclo disjunto: dos hojas, todos los demás de grado 2, pero disconexo. $\blacksquare$</p>` },
    ],
    conclusion: 'Solo (d) lo garantiza: "acíclico" ya fuerza que cada componente sea árbol y las hojas obligan a que haya una.',
  },
  {
    fuente: 'Práctica 2 · Ej. 6',
    enunciado: R`Demostrar por reducción al absurdo que todo grafo no trivial (con $n\ge2$ vértices) tiene al menos dos vértices del mismo grado.`,
    idea: 'Si todos los grados son distintos, deben ser 0, 1, …, n−1 y eso es contradictorio.',
    pasos: [
      { idea: 'Suponer lo contrario', detalle: R`<p>Todos los $n$ vértices tienen grados distintos.</p>` },
      { idea: 'Los valores posibles', detalle: R`<p>En un grafo simple de $n$ vértices el grado está en $\{0,1,\dots,n-1\}$ ($n$ valores). Como son $n$ vértices con grados distintos, aparece <b>cada</b> valor exactamente una vez.</p>` },
      { idea: 'Contradicción', detalle: R`<p>Existe $u$ con $\deg u=n-1$, que es adyacente a los otros $n-1$ vértices, y existe $w$ con $\deg w=0$ (también $\neq u$ porque $n\ge2$). Pero $u$ es adyacente a $w$: entonces $\deg w\ge1$. Absurdo. $\blacksquare$</p>` },
    ],
    conclusion: 'En cualquier fiesta con 2 o más personas hay dos que dieron la mano la misma cantidad de veces.',
  },
  {
    fuente: 'Práctica 2 · Ej. 9',
    enunciado: R`Sean $P$ y $Q$ dos caminos distintos de $v$ a $w$ en $G$ (no necesariamente disjuntos). Probar en forma directa que $G$ tiene un ciclo cuyas aristas pertenecen a $P$ o a $Q$.`,
    idea: 'Mirar dónde se separan, y el primer vértice de Q (después de separarse) que vuelve a estar en P.',
    pasos: [
      { idea: 'Notación', detalle: R`<p>$P=v_0,\dots,v_p$ y $Q=w_0,\dots,w_q$ con $v_0=w_0=v$ y $v_p=w_q=w$. Ambos son caminos: no repiten vértices.</p>` },
      { idea: 'Primer índice de diferencia', detalle: R`<p>Como $P\neq Q$, existe un primer índice $i\ge1$ con $v_i\neq w_i$ (si uno fuera prefijo del otro, como ambos terminan en $w$ y no repiten vértices, serían iguales). Sea $a=v_{i-1}=w_{i-1}$.</p>` },
      { idea: 'Dónde se vuelven a encontrar', detalle: R`<p>Sea $l\ge i$ el menor índice con $w_l\in P$ (existe porque $w_q=w=v_p\in P$) y sea $w_l=v_j$. Como $w_0..w_{i-1}$ coinciden con $v_0..v_{i-1}$ y $Q$ no repite vértices, $w_l\notin\{v_0,\dots,v_{i-1}\}$, así que $j\ge i$. Además, si $l=i$ entonces $j>i$ (porque $v_i\neq w_i$). En cualquier caso, el tramo de $P$ ($a,v_i,\dots,v_j$) y el tramo de $Q$ ($a,w_i,\dots,w_l$) tienen juntos al menos 3 aristas.</p>` },
      { idea: 'El ciclo', detalle: R`<p>Tomo el tramo $a=v_{i-1},v_i,\dots,v_j$ de $P$ y el tramo $a=w_{i-1},w_i,\dots,w_l=v_j$ de $Q$. Los vértices interiores del tramo de $Q$ ($w_i..w_{l-1}$) no están en $P$ (por la elección de $l$ como mínimo), así que no coinciden con ningún vértice del tramo de $P$. Los vértices interiores del tramo de $P$ son distintos entre sí. Los dos tramos solo comparten $a$ y $v_j$. Recorriendo uno y volviendo por el otro se obtiene un ciclo sin vértices repetidos, y como $v_i\neq w_i$ los dos tramos son distintos y el ciclo tiene longitud $\ge3$ (o es un ciclo entre dos vértices con dos aristas distintas, imposible en un grafo simple). Todas sus aristas son de $P$ o de $Q$. $\blacksquare$</p>` },
    ],
    conclusion: 'Dos caminos distintos entre los mismos extremos siempre encierran un ciclo: por eso en un árbol el camino entre dos vértices es único.',
  },
];

export const GUIA_P3 = [
  {
    fuente: 'Práctica 3 · Ej. 3',
    enunciado: R`Orden topológico. (a) Si un digrafo no tiene ciclos, tiene un vértice con $d_{in}=0$. (b) Algoritmo para construir un orden topológico y su complejidad. (c) $D$ admite orden topológico $\iff$ no tiene ciclos.`,
    idea: 'Caminar hacia atrás por aristas de entrada; sacar siempre un vértice de entrada 0.',
    pasos: [
      { idea: '(a) Existencia de fuente', detalle: R`<p>Por absurdo: si todo vértice tuviera una arista entrante, partiendo de $v_0$ podríamos elegir $v_1\to v_0$, luego $v_2\to v_1$, etc. Con $n$ vértices, en $n+1$ pasos algún vértice se repite: $v_j=v_i$ con $j>i$, y $v_j\to\dots\to v_i$ es un ciclo dirigido. Contradicción.</p>` },
      { idea: '(b) Algoritmo', detalle: R`<p>Mantener $d_{in}$ de cada vértice y una cola $Q$ con los de $d_{in}=0$. Mientras $Q$ no esté vacía: sacar $v$, ponerlo al final del orden y, para cada $v\to w$, decrementar $d_{in}(w)$ y encolar $w$ si llega a 0. <b>Correctitud:</b> al sacar $v$ ya fueron colocados todos sus predecesores (su $d_{in}$ llegó a 0 al "borrarlos"), así que cada arista $u\to w$ queda con $u$ antes que $w$. Como el subgrafo restante sigue siendo acíclico, por (a) siempre hay un candidato hasta que se agotan los vértices. <b>Costo:</b> cada vértice se encola una vez y cada arista se procesa una vez con listas de adyacencia: $O(n+m)$ tiempo, $O(n)$ espacio extra.</p>` },
      { idea: '(c) ⇒ por contrarrecíproco', detalle: R`<p>Si $D$ tiene un ciclo $c_1\to c_2\to\dots\to c_k\to c_1$, un orden topológico exigiría $c_1<c_2<\dots<c_k<c_1$: absurdo. Entonces con ciclos no existe orden.</p>` },
      { idea: '(c) ⇐', detalle: R`<p>Si $D$ no tiene ciclos, el algoritmo de (b) termina con todos los vértices ubicados y devuelve un orden topológico. $\blacksquare$</p>` },
    ],
    conclusion: 'Orden topológico ⇔ DAG; además es la base de la programación dinámica sobre DAGs y de caminos mínimos en DAG.',
  },
  {
    fuente: 'Práctica 3 · Ej. 4(a)',
    enunciado: R`Un digrafo tiene forma de $\rho$ si todos sus vértices tienen grado de salida 1. Demostrar en forma constructiva que si además es conexo (su grafo subyacente) tiene un único ciclo dirigido.`,
    idea: 'Seguir la única arista de salida hasta repetir; todos terminan en el mismo ciclo por conexión.',
    pasos: [
      { idea: 'Notación', detalle: R`<p>Sea $f(v)$ el único sucesor de $v$.</p>` },
      { idea: 'Existencia (constructiva)', detalle: R`<p>Desde cualquier $v$ se generan $v,f(v),f^2(v),\dots$. Con $n$ vértices algún vértice se repite: sea $j$ el primer índice con $f^j(v)=f^i(v)$, $i<j$. Entonces $f^i(v),\dots,f^{j-1}(v)$ es un ciclo dirigido (si $j=i+1$ es un <em>loop</em>).</p>` },
      { idea: 'Todo vértice llega a un ciclo', detalle: R`<p>Por lo anterior, para cada vértice $v$ la sucesión $f^k(v)$ termina recorriendo un ciclo $C(v)$.</p>` },
      { idea: 'Unicidad', detalle: R`<p>Si $u\to w$ es arista (o sea $w=f(u)$) entonces $C(u)=C(w)$ (el trayecto de $u$ pasa por $w$). Como el grafo subyacente es conexo, todos los vértices comparten el mismo $C$. Todo ciclo dirigido $C'$ es su propio $C(x)$ para $x\in C'$ (cada vértice del ciclo tiene su única salida dentro), así que $C'=C$: hay exactamente un ciclo. $\blacksquare$</p>` },
    ],
    conclusion: 'Para el inciso (b), basta borrar iterativamente los vértices de entrada 0: lo que queda son los ciclos (cada componente es un ciclo).',
  },
  {
    fuente: 'Práctica 3 · Ej. 10',
    enunciado: R`Dado un árbol generador $T$ de $G$ (conexo) con raíz $r$, sean $V$ y $W$ los vértices a distancia par e impar de $r$. Demostrar: (a) si una arista fuera de $T$ une dos vértices de $V$ o de $W$, el ciclo de $T$ + esa arista tiene longitud impar; (b) si toda arista fuera de $T$ une $V$ con $W$, $G$ es bipartito; (c) algoritmo lineal.`,
    idea: 'La paridad de la longitud del camino en el árbol entre dos vértices es la de la suma de sus niveles.',
    pasos: [
      { idea: '(a) Ciclo impar', detalle: R`<p>Sea $vw\notin T$ con $v,w$ de la misma paridad de nivel. El camino de $T$ entre $v$ y $w$ pasa por su ancestro común $z$: longitud $(\text{niv}(v)-\text{niv}(z))+(\text{niv}(w)-\text{niv}(z))\equiv\text{niv}(v)+\text{niv}(w)\equiv0\pmod2$ (par). Agregando $vw$ queda un ciclo de longitud <b>impar</b>.</p>` },
      { idea: '(b) Bipartición', detalle: R`<p>Las aristas de $T$ unen niveles consecutivos (distinta paridad: $V$–$W$) y, por hipótesis, las demás también. Entonces toda arista une $V$ con $W$: $(V,W)$ es una bipartición.</p>` },
      { idea: '(c) Algoritmo', detalle: R`<p>Correr BFS (o DFS) desde $r$ calculando niveles; recorrer todas las aristas: si alguna une dos vértices de igual paridad de nivel, devolver el ciclo impar (camino en el árbol + arista); si no, devolver $(V,W)$. Costo $O(n+m)$. Para grafos no conexos se repite en cada componente (un grafo es bipartito $\iff$ todas sus componentes lo son). $\blacksquare$</p>` },
    ],
    conclusion: 'Un grafo es bipartito exactamente cuando no tiene ciclos impares (y el algoritmo exhibe uno o la partición).',
  },
  {
    fuente: 'Práctica 3 · Ej. 12(a)',
    enunciado: R`Una arista de $G$ es puente si al removerla aumenta la cantidad de componentes conexas. Demostrar que $vw$ es puente $\iff$ no pertenece a ningún ciclo de $G$.`,
    idea: 'Contrarrecíproco en ambos sentidos: ciclo ⇒ camino alternativo; camino alternativo ⇒ ciclo.',
    pasos: [
      { idea: '(⇒) no puente si está en un ciclo', detalle: R`<p>Si $vw$ está en un ciclo, el resto del ciclo es un camino de $v$ a $w$ que no usa $vw$. Al sacar $vw$, $v$ y $w$ siguen conectados y cualquier camino que usaba $vw$ se reemplaza por ese camino alternativo: las componentes no cambian, luego $vw$ no es puente.</p>` },
      { idea: '(⇐) no puente ⇒ está en un ciclo', detalle: R`<p>Si $vw$ no es puente, $G-vw$ tiene las mismas componentes que $G$: $v$ y $w$ están en la misma componente de $G-vw$, así que hay un camino $P$ de $v$ a $w$ sin $vw$. Agregando la arista $wv$ a $P$ se obtiene un ciclo que contiene a $vw$.</p>` },
      { idea: 'Concluir', detalle: R`<p>Entonces $vw$ es puente $\iff$ $vw$ no está en ningún ciclo. $\blacksquare$</p>` },
    ],
    conclusion: 'Por eso el algoritmo de puentes busca "aristas de retroceso" que cubran cada arista del árbol DFS.',
  },
];

export const GUIA_P4 = [
  {
    fuente: 'Práctica 4 · Ej. 3',
    enunciado: R`Calcular la complejidad de cada recurrencia: 1) $T(n)=T(n-2)+5$; 2) $T(n-1)+n$; 3) $T(n-1)+\sqrt n$; 4) $T(n-1)+n^2$; 5) $2T(n-1)$; 6) $T(n/2)+n$; 7) $T(n/2)+\sqrt n$; 8) $T(n/2)+n^2$; 9) $2T(n-4)$; 10) $2T(n/2)+\log n$; 11) $3T(n/4)$; 12) $3T(n/4)+n$.`,
    idea: 'Las que restan se desarrollan; las que dividen van al Teorema Maestro.',
    pasos: [
      { idea: 'Las que restan (1–5, 9)', detalle: R`<p>1) $\sim n/2$ pasos de costo 5: $\Theta(n)$. 2) $\sum_{i\le n}i=\Theta(n^2)$. 3) $\sum\sqrt i=\Theta(n^{3/2})$. 4) $\sum i^2=\Theta(n^3)$. 5) cada paso duplica: $\Theta(2^n)$. 9) la profundidad es $n/4$ y cada nivel duplica: $\Theta(2^{n/4})$.</p>` },
      { idea: 'Las que dividen (6–8)', detalle: R`<p>$a=1,b=2$, $\log_21=0$. 6) $d=1>0$ ⇒ $\Theta(n)$. 7) $d=\tfrac12>0$ ⇒ $\Theta(\sqrt n)$. 8) $d=2>0$ ⇒ $\Theta(n^2)$ (domina la raíz).</p>` },
      { idea: '(10)', detalle: R`<p>$a=2,b=2$, $\log_22=1$ y $f(n)=\log n=O(n^{1-\varepsilon})$ (más chica que $n$ polinomialmente): dominan las hojas, $T(n)=\Theta(n)$. (No entra directamente en la forma $n^d$; se resuelve por el árbol: el nivel $i$ cuesta $2^i\log(n/2^i)$ y la suma es $O(n)$.)</p>` },
      { idea: '(11–12)', detalle: R`<p>$a=3,b=4$, $\log_43\approx0{,}79$. 11) $d=0<0{,}79$ ⇒ $\Theta(n^{\log_43})$. 12) $d=1>0{,}79$ ⇒ $\Theta(n)$. $\blacksquare$</p>` },
    ],
    conclusion: 'Regla práctica: mirar si el trabajo por nivel crece (hojas), se mantiene (log n de más) o decrece (raíz).',
  },
  {
    fuente: 'Práctica 4 · Ej. 4',
    enunciado: R`Un arreglo de tamaño potencia de 2 es "más a la izquierda" si la suma de su mitad izquierda supera la de la derecha y cada mitad es a su vez "más a la izquierda". Diseñar un algoritmo con complejidad estrictamente menor que $O(n^2)$.`,
    idea: 'Devolver, además del booleano, la suma del subarreglo, para no recalcularla.',
    pasos: [
      { idea: 'Función recursiva', detalle: R`<p><code>izq(A, i, j)</code> devuelve el par $(\text{ok},\text{suma})$ del subarreglo $A[i..j)$. Si $j-i=1$: $(\text{true},A[i])$. Si no: sea $m$ el medio; $(o_1,s_1)=$ <code>izq(A,i,m)</code>, $(o_2,s_2)=$ <code>izq(A,m,j)</code>; devolver $(o_1\wedge o_2\wedge s_1>s_2,\ s_1+s_2)$.</p>` },
      { idea: 'Correctitud', detalle: R`<p>Inducción en el tamaño: el predicado es exactamente la conjunción pedida (las dos mitades son "más a la izquierda" y la suma izquierda supera la derecha); la suma devuelta es la suma real del subarreglo.</p>` },
      { idea: 'Complejidad', detalle: R`<p>$T(n)=2T(n/2)+O(1)$: $a=2$, $b=2$, $d=0<\log_22=1$ ⇒ $\Theta(n)$. Si se recalculara la suma de cada mitad con un recorrido, sería $T(n)=2T(n/2)+\Theta(n)=\Theta(n\log n)$; devolver la suma lo baja a $\Theta(n)$. $\blacksquare$</p>` },
    ],
    conclusion: 'En D&C conviene devolver información extra (acá, la suma) para que combinar cueste O(1).',
  },
  {
    fuente: 'Práctica 4 · Ej. 5',
    enunciado: R`Dado un arreglo $a=[a_1<a_2<\dots<a_n]$ de enteros distintos en orden estrictamente creciente, determinar si existe $i$ con $a_i=i$ en tiempo estrictamente menor que lineal.`,
    idea: 'La resta a_i − i es no decreciente: se puede hacer búsqueda binaria.',
    pasos: [
      { idea: 'Propiedad clave', detalle: R`<p>Sea $b_i=a_i-i$. Como $a_i$ son enteros estrictamente crecientes, $a_{i+1}\ge a_i+1$, o sea $b_{i+1}\ge b_i$: la sucesión $b$ es <b>no decreciente</b>. Buscar $a_i=i$ es buscar $b_i=0$.</p>` },
      { idea: 'Algoritmo', detalle: R`<p>Con $\ell=1$, $r=n$: mientras $\ell\le r$, sea $m$ el medio. Si $b_m=0$, devolver $m$. Si $b_m>0$, hay que buscar a la izquierda ($r=m-1$) porque todos los de la derecha tienen $b\ge b_m>0$. Si $b_m<0$, buscar a la derecha ($\ell=m+1$). Si el intervalo se vacía: no existe.</p>` },
      { idea: 'Complejidad', detalle: R`<p>$T(n)=T(n/2)+O(1)$ ⇒ $\Theta(\log n)$. Ejemplo $a=[-4,-1,2,4,7]$: $b=[-5,-3,-1,0,2]$, $m=3$: $b_3=-1<0$ → derecha; $m=4$: $b_4=0$ → $i=4$. $\blacksquare$</p>` },
    ],
    conclusion: 'La monotonía de b_i justifica descartar la mitad en cada paso.',
  },
  {
    fuente: 'Práctica 4 · Ej. 6',
    enunciado: R`Calcular $a^b$ en tiempo logarítmico en $b$ (con $b$ no necesariamente potencia de 2).`,
    idea: 'a^b = (a^{⌊b/2⌋})² · (a si b impar).',
    pasos: [
      { idea: 'Recursión', detalle: R`<p><code>pot(a, b)</code>: si $b=0$ devolver 1; sea $h=$ <code>pot(a, ⌊b/2⌋)</code> (<b>una sola</b> llamada, reutilizada); devolver $h\cdot h$ si $b$ es par y $h\cdot h\cdot a$ si es impar.</p>` },
      { idea: 'Correctitud', detalle: R`<p>Si $b=2q$: $a^b=(a^q)^2$. Si $b=2q+1$: $a^b=(a^q)^2a$. Inducción en $b$.</p>` },
      { idea: 'Complejidad', detalle: R`<p>$T(b)=T(\lfloor b/2\rfloor)+O(1)$ ⇒ $\Theta(\log b)$ multiplicaciones. Si en cambio se llamara dos veces a <code>pot(a,b/2)</code>, sería $T(b)=2T(b/2)+O(1)=\Theta(b)$: <b>reutilizar</b> el resultado es lo que baja la complejidad. $\blacksquare$</p>` },
    ],
    conclusion: 'La misma idea (cuadrados sucesivos) sirve para potencias de matrices (Ej. 10) y para exponenciación modular.',
  },
  {
    fuente: 'Práctica 4 · Ej. 9',
    enunciado: R`Dada una secuencia de $n$ enteros, hallar el máximo valor de la suma de elementos contiguos en $O(n\log n)$ con dividir y conquistar.`,
    idea: 'La mejor subsecuencia está a la izquierda, a la derecha o cruza el medio.',
    pasos: [
      { idea: 'Tres casos', detalle: R`<p>Con $m$ el medio, una subsecuencia óptima está (1) toda en $A[1..m]$, (2) toda en $A[m+1..n]$ o (3) <b>cruza</b> el medio (contiene $A[m]$ y $A[m+1]$).</p>` },
      { idea: 'Caso cruzado', detalle: R`<p>Una subsecuencia que cruza es (una sufija de la izquierda) + (una prefija de la derecha), y se maximizan por separado: el mejor sufijo termina en $m$ y su suma máxima se halla recorriendo de $m$ hacia atrás; el mejor prefijo, recorriendo de $m+1$ hacia adelante. Costo $O(n)$.</p>` },
      { idea: 'Combinar', detalle: R`<p>El resultado es el máximo de los tres casos. Recurrencia $T(n)=2T(n/2)+O(n)$ ⇒ $\Theta(n\log n)$. Ejemplo $[3,-1,4,8\,|\,-2,2,-7,5]$: los sufijos de la izquierda que terminan en el medio suman $8,12,11,14$ (mejor: $14$); los prefijos de la derecha suman $-2,0,-7,-2$ (mejor: $0$); el caso cruzado da $14+0=14$, igual que la mitad izquierda sola ($14$) y mayor que la derecha ($5$). El máximo global es $14$. $\blacksquare$</p>` },
    ],
    conclusion: 'Existe también un algoritmo O(n) (Kadane) que mantiene la mejor suma terminada en cada posición.',
  },
];
