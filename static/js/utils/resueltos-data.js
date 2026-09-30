// utils/resueltos-data.js — banco de ejercicios resueltos por tema.
// Fuentes: Parcial 1C2025 (manuscrito) y Prácticas 1-3 de la materia.
// Cada entrada es una config para solvedExercise().

// ===================== SUPREMOS E ÍNFIMOS =====================
export const RES_SUP_INF = [
  {
    fuente: 'Parcial 1C2025 · Ej. 2',
    enunciado: 'Sea $A \\subseteq \\mathbb{R}$ no vacío y acotado. Decidir si son verdaderas o falsas: '
      + '(a) $\\inf A = \\inf \\overline{A}$;  (b) $\\inf A = \\inf A^\\circ$.',
    idea: '(a) es <strong>verdadera</strong>: se prueba por doble desigualdad / absurdo usando que $\\overline{A}$ es cerrado. '
      + '(b) es <strong>falsa</strong>: alcanza un contraejemplo.',
    pasos: [
      {
        idea: '(a) Una desigualdad es gratis',
        detalle: 'Como $A \\subseteq \\overline{A}$, toda cota inferior de $\\overline{A}$ lo es de $A$, así que '
          + '$\\inf \\overline{A} \\le \\inf A$. Falta ver $\\inf A \\le \\inf \\overline{A}$.',
      },
      {
        idea: '(a) La otra, por el absurdo',
        detalle: 'Supongamos $\\inf \\overline{A} < \\inf A$. Llamemos $\\tilde\\imath = \\inf \\overline{A}$ e '
          + '$i = \\inf A$. Por la caracterización del ínfimo aplicada a $\\overline{A}$, existe $y \\in \\overline{A}$ '
          + 'con $y < i$.',
      },
      {
        idea: '(a) Usar que la clausura es cerrada',
        detalle: 'Como $y \\in \\overline{A}$, toda bola $B(y,r)$ corta a $A$. Tomando $r = i - y > 0$, hay un '
          + '$a \\in A$ con $a \\in (y-r,\\, y+r)$, es decir $a < y + r = i$. Pero entonces $a < i = \\inf A$, '
          + 'contradiciendo que $i$ sea cota inferior de $A$.',
      },
      {
        idea: '(a) Conclusión',
        detalle: 'El absurdo muestra $\\inf A \\le \\inf \\overline{A}$. Junto con el paso 1, '
          + '$\\inf A = \\inf \\overline{A}$. <strong>(a) es verdadera.</strong>',
      },
      {
        idea: '(b) Contraejemplo',
        detalle: 'Tomemos $A = (0,1) \\cup \\{2\\}$, que es acotado y no vacío. Su interior es $A^\\circ = (0,1)$ '
          + '(el punto $2$ es aislado, no interior). Entonces $\\inf A = 0$ pero $\\inf A^\\circ = 0$ también... '
          + 'ojo: para separar los ínfimos conviene $A = \\{-2\\} \\cup (0,1)$: ahí $\\inf A = -2$ mientras '
          + '$A^\\circ = (0,1)$ y $\\inf A^\\circ = 0$.',
      },
      {
        idea: '(b) Conclusión',
        detalle: 'Como $\\inf A = -2 \\ne 0 = \\inf A^\\circ$, la igualdad (b) <strong>no</strong> vale en general. '
          + 'La razón: pasar al interior puede <em>tirar</em> puntos aislados que son los que dan el ínfimo.',
      },
    ],
    conclusion: '$\\inf A = \\inf \\overline{A}$ siempre (la clausura no baja el ínfimo); '
      + 'en cambio $\\inf A = \\inf A^\\circ$ puede fallar, porque el interior descarta puntos aislados.',
  },
  {
    fuente: 'Práctica 1 · Ej. 4',
    enunciado: 'Hallar $\\sup$, $\\inf$, $\\max$ y $\\min$ (si existen) de $B = \\{\\tfrac{1}{2^n} : n \\in \\mathbb{N}\\}$.',
    idea: 'Escribir los primeros términos para ver el comportamiento, y luego justificar sup e inf con la definición.',
    pasos: [
      {
        idea: 'Listar términos',
        detalle: '$B = \\{\\tfrac12, \\tfrac14, \\tfrac18, \\dots\\}$. Es decreciente: el mayor es $\\tfrac12$ (en $n=1$) '
          + 'y los términos tienden a $0$.',
      },
      {
        idea: 'Supremo y máximo',
        detalle: '$\\tfrac12$ es cota superior y pertenece a $B$, luego $\\sup B = \\max B = \\tfrac12$.',
      },
      {
        idea: 'Ínfimo',
        detalle: '$0$ es cota inferior ($\\tfrac{1}{2^n} > 0$). Y es la mayor: dado $\\varepsilon > 0$, por Arquímedes '
          + 'existe $n$ con $\\tfrac{1}{2^n} < \\varepsilon$, así que ninguna cota inferior positiva sirve. Entonces $\\inf B = 0$.',
      },
      {
        idea: 'Mínimo',
        detalle: 'Como $0 \\notin B$, el ínfimo no se alcanza: $B$ <strong>no tiene mínimo</strong>.',
      },
    ],
    conclusion: '$\\sup B = \\max B = \\tfrac12$, $\\ \\inf B = 0$ y no hay mínimo.',
  },
];

// ===================== SUCESIONES =====================
export const RES_SUCESIONES = [
  {
    fuente: 'Práctica 1 · Ej. 7',
    enunciado: 'Probar por definición que $\\displaystyle\\lim_{n\\to\\infty} \\frac{3 - 2n}{n + 1} = -2$.',
    idea: 'Acotar $\\left|\\tfrac{3-2n}{n+1} - (-2)\\right|$ por algo que tienda a $0$, y usar Arquímedes para elegir $n_0$.',
    pasos: [
      {
        idea: 'Plantear la definición',
        detalle: 'Sea $\\varepsilon > 0$. Queremos $n_0$ tal que $\\left|\\tfrac{3-2n}{n+1} + 2\\right| < \\varepsilon$ '
          + 'para todo $n \\ge n_0$.',
      },
      {
        idea: 'Simplificar la expresión',
        detalle: '$\\dfrac{3-2n}{n+1} + 2 = \\dfrac{3 - 2n + 2(n+1)}{n+1} = \\dfrac{5}{n+1}$. '
          + 'Como es positivo, $\\left|\\tfrac{3-2n}{n+1} + 2\\right| = \\dfrac{5}{n+1}$.',
      },
      {
        idea: 'Despejar la condición',
        detalle: 'Queremos $\\dfrac{5}{n+1} < \\varepsilon \\iff n + 1 > \\dfrac{5}{\\varepsilon} \\iff n > \\dfrac{5}{\\varepsilon} - 1$.',
      },
      {
        idea: 'Elegir n₀ (Arquímedes)',
        detalle: 'Por el Principio de Arquímedes existe $n_0 \\in \\mathbb{N}$ con $n_0 > \\tfrac{5}{\\varepsilon} - 1$. '
          + 'Para todo $n \\ge n_0$ vale la desigualdad, que es lo que queríamos. $\\blacksquare$',
      },
    ],
    conclusion: 'Elegido $n_0 > \\tfrac{5}{\\varepsilon} - 1$, se cumple la definición de límite: '
      + '$\\lim \\tfrac{3-2n}{n+1} = -2$.',
  },
  {
    fuente: 'Práctica 1 · Ej. 12',
    enunciado: 'Sea $(x_n)$ decreciente y acotada inferiormente. Probar que converge y '
      + '$\\lim x_n = \\inf\\{x_n : n \\in \\mathbb{N}\\}$.',
    idea: 'El ínfimo existe por completitud; con la caracterización $\\varepsilon$ del ínfimo y la monotonía se atrapa la cola.',
    pasos: [
      {
        idea: 'Definir el candidato a límite',
        detalle: 'Sea $\\ell = \\inf\\{x_n\\}$, que existe porque el conjunto es no vacío y acotado inferiormente '
          + '(axioma de completitud).',
      },
      {
        idea: 'Usar la caracterización del ínfimo',
        detalle: 'Dado $\\varepsilon > 0$, existe $n_0$ con $x_{n_0} < \\ell + \\varepsilon$ (si no, $\\ell + \\varepsilon$ '
          + 'sería una cota inferior mayor que $\\ell$).',
      },
      {
        idea: 'Aprovechar la monotonía',
        detalle: 'Como $(x_n)$ es decreciente, para todo $n \\ge n_0$: $x_n \\le x_{n_0} < \\ell + \\varepsilon$. '
          + 'Y $x_n \\ge \\ell$ siempre, por ser $\\ell$ cota inferior.',
      },
      {
        idea: 'Cerrar con la definición',
        detalle: 'Entonces $\\ell \\le x_n < \\ell + \\varepsilon$, o sea $|x_n - \\ell| < \\varepsilon$ para $n \\ge n_0$. '
          + 'Esto es exactamente $x_n \\to \\ell$. $\\blacksquare$',
      },
    ],
    conclusion: 'Toda sucesión decreciente y acotada inferiormente converge a su ínfimo (dualmente, creciente y '
      + 'acotada superiormente converge a su supremo).',
  },
];

// ===================== CARDINALIDAD =====================
export const RES_CARDINALIDAD = [
  {
    fuente: 'Parcial 1C2025 · Ej. 1',
    enunciado: 'Sea $A = \\{(a_n)_{n} \\in \\mathbb{Z}^{\\mathbb{N}} : a_{n+1} - a_n \\in \\{1, 2\\}\\ \\forall n\\}$. Hallar $\\#A$.',
    idea: 'Mostrar $\\#A = c$ por Cantor–Schröder–Bernstein: una inyección $\\{0,1\\}^{\\mathbb{N}} \\hookrightarrow A$ '
      + 'y otra $A \\hookrightarrow \\mathbb{Z} \\times \\{0,1\\}^{\\mathbb{N}}$ (ambos de cardinal $c$).',
    pasos: [
      {
        idea: 'Cota superior del cardinal',
        detalle: 'Una sucesión de $A$ queda determinada por su primer término $a_1 \\in \\mathbb{Z}$ y por la sucesión '
          + 'de saltos $s_n = a_{n+1} - a_n \\in \\{1,2\\}$. Esto da una inyección '
          + '$A \\hookrightarrow \\mathbb{Z} \\times \\{1,2\\}^{\\mathbb{N}}$, luego $\\#A \\le \\aleph_0 \\cdot c = c$.',
      },
      {
        idea: 'Cota inferior del cardinal',
        detalle: 'Definimos $\\varphi: \\{0,1\\}^{\\mathbb{N}} \\to A$ mandando la cadena $(y_n)$ a la sucesión con '
          + '$a_1 = 0$ y saltos $s_n = 1 + y_n \\in \\{1,2\\}$. Distintas cadenas dan distintos saltos, luego distintas '
          + 'sucesiones: $\\varphi$ es inyectiva. Así $c = \\#\\{0,1\\}^{\\mathbb{N}} \\le \\#A$.',
      },
      {
        idea: 'Aplicar Cantor–Schröder–Bernstein',
        detalle: 'Tenemos $\\#A \\le c$ y $c \\le \\#A$. Por CSB, $\\#A = c$. $\\blacksquare$',
      },
    ],
    conclusion: '$\\#A = c$ (el continuo). Codificar los saltos con desarrollos binarios es lo que “inyecta” $\\{0,1\\}^{\\mathbb{N}}$ dentro de $A$.',
  },
  {
    fuente: 'Práctica 2 · Ej. 6',
    enunciado: 'Probar que una unión numerable de conjuntos numerables es numerable.',
    idea: 'Ordenar los elementos en una grilla infinita y recorrerla por diagonales finitas.',
    pasos: [
      {
        idea: 'Poner nombres',
        detalle: 'Sea $\\{A_k\\}_{k \\in \\mathbb{N}}$ con cada $A_k = \\{a_{k,1}, a_{k,2}, a_{k,3}, \\dots\\}$ numerable. '
          + 'Queremos enumerar $\\bigcup_k A_k$.',
      },
      {
        idea: 'Disponer en grilla',
        detalle: 'Colocamos $a_{k,m}$ en la fila $k$, columna $m$. Toda la unión aparece en esta grilla infinita.',
      },
      {
        idea: 'Recorrer por diagonales',
        detalle: 'Recorremos las diagonales $\\{(k,m) : k + m = 2\\}, \\{k+m=3\\}, \\dots$ Cada diagonal es finita, '
          + 'así que en un número finito de pasos llegamos a cualquier $a_{k,m}$.',
      },
      {
        idea: 'Descartar repetidos',
        detalle: 'Ese recorrido da una sobreyección $\\mathbb{N} \\to \\bigcup_k A_k$. Salteando elementos ya vistos '
          + 'obtenemos una biyección con un subconjunto de $\\mathbb{N}$: la unión es contable. $\\blacksquare$',
      },
    ],
    conclusion: 'La unión es numerable. La misma idea (grilla + diagonal) prueba que $\\mathbb{Q}$ es numerable.',
  },
  {
    fuente: 'Práctica 2 · Ej. 10 (Cantor)',
    enunciado: 'Probar que $[0,1)$ no es numerable (argumento diagonal).',
    idea: 'Suponer una lista completa y fabricar un número que difiera de cada uno en su propia diagonal.',
    pasos: [
      {
        idea: 'Suponer lo contrario',
        detalle: 'Por el absurdo, supongamos que existe una lista $x_1, x_2, x_3, \\dots$ con <em>todos</em> los '
          + 'elementos de $[0,1)$.',
      },
      {
        idea: 'Escribir en decimal',
        detalle: 'Sea $x_k = 0.d_{k1} d_{k2} d_{k3} \\dots$ el desarrollo decimal de $x_k$.',
      },
      {
        idea: 'Construir el diagonal',
        detalle: 'Definimos $y = 0.e_1 e_2 e_3 \\dots$ con $e_k = 5$ si $d_{kk} \\ne 5$, y $e_k = 4$ si $d_{kk} = 5$ '
          + '(usar sólo $4$ y $5$ evita ambigüedades del tipo $0.4999\\ldots = 0.5$).',
      },
      {
        idea: 'Llegar al absurdo',
        detalle: 'Entonces $y \\in [0,1)$ pero $y \\ne x_k$ para todo $k$ (difieren en la posición $k$). Así $y$ no '
          + 'está en la lista, contradiciendo que fuera completa. $\\blacksquare$',
      },
    ],
    conclusion: '$[0,1)$ (y por lo tanto $\\mathbb{R}$) no es numerable: $\\#\\mathbb{R} = c > \\aleph_0$.',
  },
];

// ===================== ESPACIOS MÉTRICOS / TOPOLOGÍA =====================
export const RES_TOPOLOGIA = [
  {
    fuente: 'Parcial 1C2025 · Ej. 3',
    enunciado: 'Sea $(E,d)$ un espacio métrico y $U \\subseteq E$. Probar que '
      + '$U$ es abierto $\\iff U \\cap \\overline{T} \\subseteq \\overline{U \\cap T}$ para todo $T \\subseteq E$.',
    idea: 'Es una doble implicación. En cada dirección se toma un punto y se usa la definición de abierto '
      + '(entorno) y de clausura (toda bola corta al conjunto).',
    pasos: [
      {
        idea: '(⇒) Tomar un punto',
        detalle: 'Supongamos $U$ abierto y sea $T \\subseteq E$. Sea $x \\in U \\cap \\overline{T}$. '
          + 'Queremos ver $x \\in \\overline{U \\cap T}$, es decir que toda bola de $x$ corta a $U \\cap T$.',
      },
      {
        idea: '(⇒) Usar que U es abierto',
        detalle: 'Sea $r > 0$. Como $U$ es abierto y $x \\in U$, existe $\\rho > 0$ con $B(x,\\rho) \\subseteq U$. '
          + 'Tomamos $r\' = \\min(r, \\rho) > 0$.',
      },
      {
        idea: '(⇒) Usar que x está en la clausura de T',
        detalle: 'Como $x \\in \\overline{T}$, la bola $B(x, r\')$ corta a $T$: hay $z \\in B(x,r\') \\cap T$. '
          + 'Pero $B(x,r\') \\subseteq B(x,\\rho) \\subseteq U$, así que $z \\in U \\cap T$ y además $z \\in B(x,r)$. '
          + 'Entonces $B(x,r) \\cap (U \\cap T) \\ne \\varnothing$; como $r$ era arbitrario, $x \\in \\overline{U \\cap T}$.',
      },
      {
        idea: '(⇐) Probar por el absurdo que U es abierto',
        detalle: 'Supongamos que vale la inclusión para todo $T$ pero $U$ no es abierto. Entonces existe $x \\in U$ '
          + 'que no es interior: para todo $r > 0$, $B(x,r) \\not\\subseteq U$, o sea $B(x,r) \\cap U^c \\ne \\varnothing$.',
      },
      {
        idea: '(⇐) Elegir T = complemento de U',
        detalle: 'Tomemos $T = U^c$. La condición anterior dice justamente que toda bola de $x$ corta a $U^c = T$, '
          + 'luego $x \\in \\overline{T}$, y como $x \\in U$ resulta $x \\in U \\cap \\overline{T}$.',
      },
      {
        idea: '(⇐) Contradicción',
        detalle: 'Por hipótesis $x \\in \\overline{U \\cap T} = \\overline{U \\cap U^c} = \\overline{\\varnothing} = \\varnothing$, '
          + 'absurdo. Luego todo punto de $U$ es interior: $U$ es abierto. $\\blacksquare$',
      },
    ],
    conclusion: 'La equivalencia vale. La clave del recíproco es elegir $T = U^c$, que convierte la hipótesis en '
      + '“$x \\in \\overline{\\varnothing}$”, imposible.',
  },
  {
    fuente: 'Práctica 3 · Ej. 3',
    enunciado: 'Hallar interior y clausura de $\\mathbb{Q}$ en $\\mathbb{R}$, y decidir si es abierto o cerrado.',
    idea: 'Usar la densidad: todo intervalo contiene racionales e irracionales.',
    pasos: [
      {
        idea: 'Interior',
        detalle: 'Sea $q \\in \\mathbb{Q}$. Toda bola $(q - r, q + r)$ contiene irracionales (densidad de los '
          + 'irracionales), así que ninguna bola queda dentro de $\\mathbb{Q}$: ningún punto es interior. '
          + 'Por lo tanto $\\mathbb{Q}^\\circ = \\varnothing$.',
      },
      {
        idea: 'Clausura',
        detalle: 'Sea $x \\in \\mathbb{R}$ cualquiera. Toda bola $(x - r, x + r)$ contiene racionales (densidad de '
          + '$\\mathbb{Q}$), así que corta a $\\mathbb{Q}$: $x \\in \\overline{\\mathbb{Q}}$. Luego $\\overline{\\mathbb{Q}} = \\mathbb{R}$.',
      },
      {
        idea: 'Abierto / cerrado',
        detalle: 'No es abierto ($\\mathbb{Q} \\ne \\mathbb{Q}^\\circ = \\varnothing$) ni cerrado '
          + '($\\mathbb{Q} \\ne \\overline{\\mathbb{Q}} = \\mathbb{R}$).',
      },
    ],
    conclusion: '$\\mathbb{Q}^\\circ = \\varnothing$, $\\overline{\\mathbb{Q}} = \\mathbb{R}$; $\\mathbb{Q}$ no es ni '
      + 'abierto ni cerrado. Su frontera es $\\partial\\mathbb{Q} = \\mathbb{R}$.',
  },
];

// ===================== COMPLETITUD =====================
export const RES_COMPLETITUD = [
  {
    fuente: 'Parcial 1C2025 · Ej. 4',
    enunciado: 'Sea $X = \\{(a_n) \\in \\mathbb{R}^{\\mathbb{N}} : \\exists n_0,\\ a_n = 0\\ \\forall n \\ge n_0\\}$ '
      + '(sucesiones casi nulas) con $d_\\infty$. Probar que $(X, d_\\infty)$ <strong>no</strong> es completo.',
    idea: 'Exhibir una sucesión de Cauchy en $X$ cuyo límite natural NO está en $X$ (no es casi nula).',
    pasos: [
      {
        idea: 'Construir la sucesión candidata',
        detalle: 'Para cada $m \\in \\mathbb{N}$ definimos el elemento $x^{(m)} \\in X$ dado por '
          + '$x^{(m)}_n = \\tfrac{1}{n}$ si $n \\le m$, y $x^{(m)}_n = 0$ si $n > m$. Cada $x^{(m)}$ es casi nula, '
          + 'así que $x^{(m)} \\in X$.',
      },
      {
        idea: 'Ver que es de Cauchy',
        detalle: 'Si $m < m\'$, entonces $d_\\infty(x^{(m)}, x^{(m\')}) = \\sup_{n} |x^{(m)}_n - x^{(m\')}_n| '
          + '= \\sup_{m < n \\le m\'} \\tfrac{1}{n} = \\tfrac{1}{m+1}$. Dado $\\varepsilon > 0$, por Arquímedes '
          + 'existe $n_0$ con $\\tfrac{1}{n_0} < \\varepsilon$; para $m, m\' \\ge n_0$ la distancia es $< \\varepsilon$. '
          + 'Es de Cauchy.',
      },
      {
        idea: 'Identificar el límite natural',
        detalle: 'Puntualmente $x^{(m)} \\to x$ con $x_n = \\tfrac{1}{n}$ para todo $n$. En $d_\\infty$, '
          + '$d_\\infty(x^{(m)}, x) = \\sup_{n > m} \\tfrac1n = \\tfrac{1}{m+1} \\to 0$, así que ese sería el único límite posible.',
      },
      {
        idea: 'Ver que el límite no está en X',
        detalle: 'Pero $x = (1, \\tfrac12, \\tfrac13, \\dots)$ <strong>no</strong> es casi nula: $x_n = \\tfrac1n \\ne 0$ '
          + 'para todo $n$. Entonces $x \\notin X$, y la sucesión de Cauchy no converge <em>dentro de $X$</em>.',
      },
    ],
    conclusion: '$(X, d_\\infty)$ tiene una sucesión de Cauchy sin límite en $X$, por lo tanto <strong>no es completo</strong>. '
      + '(El “agujero” es la sucesión $\\tfrac1n$, que vive en el espacio más grande de sucesiones acotadas, no en las casi nulas.)',
  },
  {
    fuente: 'Práctica 3 · Ej. 16 (Cantor)',
    enunciado: 'En un espacio completo $E$, sea $(A_n)$ una sucesión de cerrados no vacíos con '
      + '$A_{n+1} \\subseteq A_n$ y $\\operatorname{diam}(A_n) \\to 0$. Probar que $\\bigcap_n A_n$ es un único punto.',
    idea: 'Elegir un punto por cada $A_n$, ver que forman una sucesión de Cauchy, y usar completitud + que los $A_n$ son cerrados.',
    pasos: [
      {
        idea: 'Elegir representantes',
        detalle: 'Como cada $A_n \\ne \\varnothing$, elegimos $x_n \\in A_n$.',
      },
      {
        idea: 'La sucesión es de Cauchy',
        detalle: 'Si $m > n$, por el encaje $A_m \\subseteq A_n$, así que $x_n, x_m \\in A_n$ y '
          + '$d(x_n, x_m) \\le \\operatorname{diam}(A_n) \\to 0$. Luego $(x_n)$ es de Cauchy.',
      },
      {
        idea: 'Converge (completitud)',
        detalle: 'Como $E$ es completo, $x_n \\to x$ para algún $x \\in E$.',
      },
      {
        idea: 'El límite está en toda la intersección',
        detalle: 'Fijado $n$, la cola $(x_k)_{k \\ge n}$ está en $A_n$ (por el encaje) y $A_n$ es cerrado, '
          + 'así que $x \\in A_n$. Como vale para todo $n$, $x \\in \\bigcap_n A_n$.',
      },
      {
        idea: 'Unicidad',
        detalle: 'Si $x, y \\in \\bigcap_n A_n$, entonces $d(x,y) \\le \\operatorname{diam}(A_n) \\to 0$, luego $d(x,y) = 0$ '
          + 'y $x = y$. $\\blacksquare$',
      },
    ],
    conclusion: 'La intersección de un encaje de cerrados con diámetro $\\to 0$ en un completo es exactamente un punto. '
      + 'La completitud es esencial (en $\\mathbb{Q}$ falla).',
  },
];
