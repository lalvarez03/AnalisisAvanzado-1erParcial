// pages/asistente.js — Asistente de ejercicios de las Prácticas 1-3.
// Los ejercicios están segmentados por tema. El estudiante elige un tema,
// luego un ejercicio, y lo resuelve arrastrando pasos (orderProof) o
// completando huecos (fillBlanks).

import { el, typeset } from '../utils/dom.js';
import { pageHeader, callout } from '../utils/page.js';
import { orderProof, fillBlanks } from '../utils/dnd.js';
import { exRef } from '../utils/ejercicios.js';

// ============================================================
// Estructura: TEMAS = [{ id, nombre, ejercicios: [{ id, practica, num, tab, build }] }]
// build() devuelve el widget interactivo.
// ============================================================

const TEMAS = [
  // ---------------- SUPREMOS E ÍNFIMOS ----------------
  {
    id: 'sup',
    nombre: 'Supremos e ínfimos',
    ejercicios: [
      {
        id: 's1', practica: 1, num: 1, tab: 'Ej. 1 — Desigualdad ε',
        build: () => orderProof({
          title: 'Si x < y + ε para todo ε > 0, entonces x ≤ y',
          hint: 'Demostración por el absurdo. Ordená los pasos para que cada uno se apoye en el anterior.',
          steps: [
            'Supongamos, por el absurdo, que $x > y$.',
            'Entonces $x - y > 0$, así que podemos tomar $\\varepsilon_0 = x - y > 0$.',
            'Por hipótesis, $x < y + \\varepsilon$ vale para <em>todo</em> $\\varepsilon > 0$; en particular para $\\varepsilon_0$.',
            'Reemplazando: $x < y + \\varepsilon_0 = y + (x - y) = x$, es decir $x < x$.',
            'Esto es absurdo. Por lo tanto no puede ser $x > y$, y concluimos $x \\le y$. $\\blacksquare$',
          ],
        }),
      },
      {
        id: 's3', practica: 1, num: 3, tab: 'Ej. 3 — Caracterización ε del ínfimo',
        build: () => fillBlanks({
          title: 'i = ínf(A) ⟺ (i es cota inferior) y (∀ ε>0 ∃ a∈A : a < i + ε)',
          hint: 'La segunda condición dice que corriéndote a la derecha de i siempre aparece un elemento de A.',
          template:
            'Supongamos $i = \\inf(A)$. Entonces $i$ es cota {{0}} de $A$. '
            + 'Dado $\\varepsilon > 0$, el número $i + \\varepsilon$ {{1}} es cota inferior (sería mayor que el ínfimo), '
            + 'así que existe $a \\in A$ con $a$ {{2}} $i + \\varepsilon$. '
            + 'Recíprocamente, si $i$ es cota inferior y para todo $\\varepsilon > 0$ hay $a < i + \\varepsilon$, '
            + 'entonces ninguna cota inferior puede ser {{3}} que $i$, luego $i$ es la {{4}} cota inferior.',
          blanks: [
            { answer: 'inferior', options: ['inferior', 'superior'] },
            { answer: 'no', options: ['no', 'sí'] },
            { answer: '<', options: ['<', '>', '='] },
            { answer: 'mayor', options: ['mayor', 'menor'] },
            { answer: 'mayor', options: ['mayor', 'menor'] },
          ],
        }),
      },
      {
        id: 's6', practica: 1, num: 6, tab: 'Ej. 6 — inf(−A) = −sup(A)',
        build: () => orderProof({
          title: 'Si A está acotado sup., entonces −A está acotado inf. e inf(−A) = −sup(A)',
          hint: 'Traducí cada afirmación sobre A en una sobre −A multiplicando por −1 (invierte desigualdades).',
          steps: [
            'Sea $s = \\sup(A)$, que existe por el axioma de completitud (A acotado sup. y no vacío).',
            'Para todo $a \\in A$ vale $a \\le s$; multiplicando por $-1$: $-a \\ge -s$.',
            'Como los elementos de $-A$ son los $-a$, esto dice que $-s$ es cota inferior de $-A$.',
            'Falta ver que $-s$ es la <em>mayor</em> cota inferior. Sea $c$ otra cota inferior de $-A$.',
            'Entonces $c \\le -a$ para todo $a$, o sea $-c \\ge a$: $-c$ es cota superior de $A$.',
            'Como $s$ es la menor cota superior, $-c \\ge s$, es decir $c \\le -s$.',
            'Por lo tanto $-s$ es la mayor cota inferior: $\\inf(-A) = -s = -\\sup(A)$. $\\blacksquare$',
          ],
        }),
      },
      {
        id: 's2', practica: 1, num: 2, tab: 'Ej. 2 — Densidad de ℚ',
        build: () => orderProof({
          title: 'Si x < y, existe un racional q con x < q < y',
          hint: 'Usá Arquímedes para achicar el paso 1/n por debajo de y − x, y luego ubicá un múltiplo de 1/n.',
          steps: [
            'Como $x < y$, tenemos $y - x > 0$.',
            'Por Arquímedes existe $n \\in \\mathbb{N}$ con $\\frac{1}{n} < y - x$, es decir $n(y-x) > 1$.',
            'Entonces entre $nx$ y $ny$ (que distan más de $1$) hay un entero $m$: $nx < m < ny$.',
            'Dividiendo por $n > 0$: $x < \\frac{m}{n} < y$.',
            'Tomando $q = \\frac{m}{n} \\in \\mathbb{Q}$ queda probado. $\\blacksquare$',
          ],
        }),
      },
    ],
  },

  // ---------------- SUCESIONES ----------------
  {
    id: 'suc',
    nombre: 'Sucesiones',
    ejercicios: [
      {
        id: 'q7', practica: 1, num: 7, tab: 'Ej. 7 — Límite por definición',
        build: () => orderProof({
          title: 'Probar por definición que  lím (3 − 2n)/(n + 1) = −2',
          hint: 'Acotá |aₙ − (−2)| y hacelo menor que ε eligiendo n₀ con Arquímedes.',
          steps: [
            'Sea $\\varepsilon > 0$. Buscamos $n_0$ tal que $\\left|\\frac{3-2n}{n+1} - (-2)\\right| < \\varepsilon$ para $n \\ge n_0$.',
            'Calculamos: $\\frac{3-2n}{n+1} + 2 = \\frac{3-2n + 2(n+1)}{n+1} = \\frac{5}{n+1}$.',
            'Entonces $\\left|\\frac{3-2n}{n+1} + 2\\right| = \\frac{5}{n+1}$ (positivo).',
            'Queremos $\\frac{5}{n+1} < \\varepsilon$, equivalente a $n > \\frac{5}{\\varepsilon} - 1$.',
            'Por Arquímedes existe $n_0 \\in \\mathbb{N}$ con $n_0 > \\frac{5}{\\varepsilon} - 1$.',
            'Para todo $n \\ge n_0$ vale $\\frac{5}{n+1} < \\varepsilon$. $\\blacksquare$',
          ],
        }),
      },
      {
        id: 'q8', practica: 1, num: 8, tab: 'Ej. 8 — Criterio del sandwich',
        build: () => fillBlanks({
          title: 'Si |xₙ − ℓ| ≤ aₙ y aₙ → 0, entonces xₙ → ℓ',
          hint: 'Fijás ε, usás que aₙ → 0 para conseguir n₀, y encadenás la desigualdad.',
          template:
            'Sea $\\varepsilon > 0$. Como $a_n \\to$ {{0}}, existe $n_0$ tal que $a_n < \\varepsilon$ para todo $n \\ge n_0$. '
            + 'Por hipótesis $|x_n - \\ell|$ {{1}} $a_n$. Entonces, para $n \\ge n_0$: '
            + '$|x_n - \\ell| \\le a_n$ {{2}} $\\varepsilon$. '
            + 'Como esto vale para todo $\\varepsilon > 0$, concluimos que $x_n \\to$ {{3}}.',
          blanks: [
            { answer: '0', options: ['0', '\\ell', '+\\infty'] },
            { answer: '\\le', options: ['\\le', '\\ge', '='] },
            { answer: '<', options: ['<', '>', '='] },
            { answer: '\\ell', options: ['\\ell', '0', 'a_n'] },
          ],
        }),
      },
      {
        id: 'q11', practica: 1, num: 11, tab: 'Ej. 11 — Nula × acotada',
        build: () => orderProof({
          title: 'Si xₙ → 0 e (yₙ) está acotada, entonces xₙ yₙ → 0',
          hint: 'Acotá |xₙ yₙ| por M|xₙ| y aplicá la definición (o sandwich).',
          steps: [
            'Como $(y_n)$ está acotada, existe $M > 0$ con $|y_n| \\le M$ para todo $n$.',
            'Entonces $|x_n y_n| = |x_n|\\,|y_n| \\le M\\,|x_n|$.',
            'Sea $\\varepsilon > 0$. Como $x_n \\to 0$, existe $n_0$ con $|x_n| < \\frac{\\varepsilon}{M}$ para $n \\ge n_0$.',
            'Luego $|x_n y_n| \\le M\\,|x_n| < M \\cdot \\frac{\\varepsilon}{M} = \\varepsilon$ para $n \\ge n_0$.',
            'Por lo tanto $x_n y_n \\to 0$. $\\blacksquare$',
          ],
        }),
      },
      {
        id: 'q12', practica: 1, num: 12, tab: 'Ej. 12 — Monótona acotada',
        build: () => fillBlanks({
          title: 'Si (xₙ) es decreciente y acotada inferiormente, entonces xₙ → ínf{xₙ}',
          hint: 'Se usa la caracterización ε del ínfimo y la monotonía para atrapar la cola.',
          template:
            'Sea $\\ell = \\inf\\{x_n\\}$, que existe porque el conjunto es no vacío y acotado {{0}}. '
            + 'Dado $\\varepsilon > 0$, por la caracterización del ínfimo existe $n_0$ con $x_{n_0} < \\ell + \\varepsilon$. '
            + 'Como $(x_n)$ es {{1}}, para $n \\ge n_0$ vale $x_n \\le x_{n_0} < \\ell + \\varepsilon$. '
            + 'Además $x_n \\ge \\ell$ por ser $\\ell$ cota {{2}}. '
            + 'Entonces $|x_n - \\ell| < \\varepsilon$ para $n \\ge n_0$, o sea $x_n \\to$ {{3}}.',
          blanks: [
            { answer: 'inferiormente', options: ['inferiormente', 'superiormente'] },
            { answer: 'decreciente', options: ['decreciente', 'creciente'] },
            { answer: 'inferior', options: ['inferior', 'superior'] },
            { answer: '\\ell', options: ['\\ell', '0', '+\\infty'] },
          ],
        }),
      },
      {
        id: 'q16', practica: 1, num: 16, tab: 'Ej. 16 — Subsucesiones pares/impares',
        build: () => orderProof({
          title: 'Si (x₂ₖ) y (x₂ₖ₋₁) convergen al mismo ℓ, entonces (xₙ) converge a ℓ',
          hint: 'Conseguí un n₀ para los pares y otro para los impares, y tomá el máximo.',
          steps: [
            'Sea $\\varepsilon > 0$. Como $x_{2k} \\to \\ell$, existe $K_1$ con $|x_{2k} - \\ell| < \\varepsilon$ para $k \\ge K_1$.',
            'Como $x_{2k-1} \\to \\ell$, existe $K_2$ con $|x_{2k-1} - \\ell| < \\varepsilon$ para $k \\ge K_2$.',
            'Sea $n_0 = \\max(2K_1,\\, 2K_2 - 1)$.',
            'Si $n \\ge n_0$: cuando $n$ es par, $n = 2k$ con $k \\ge K_1$; cuando es impar, $n = 2k-1$ con $k \\ge K_2$.',
            'En ambos casos $|x_n - \\ell| < \\varepsilon$. Por lo tanto $x_n \\to \\ell$. $\\blacksquare$',
          ],
        }),
      },
    ],
  },

  // ---------------- CARDINALIDAD ----------------
  {
    id: 'card',
    nombre: 'Cardinalidad',
    ejercicios: [
      {
        id: 'c2', practica: 2, num: 2, tab: 'Ej. 2 — Unión de contables',
        build: () => orderProof({
          title: 'Si A y B son contables, entonces A ∪ B es contable',
          hint: 'Enumerá A con los pares y B con los impares (intercalando).',
          steps: [
            'Si $A$ o $B$ es finito el caso es sencillo; supongamos ambos numerables.',
            'Sean $A = \\{a_1, a_2, \\dots\\}$ y $B = \\{b_1, b_2, \\dots\\}$ enumeraciones.',
            'Definimos $f: \\mathbb{N} \\to A \\cup B$ intercalando: $f(2k-1) = a_k$, $f(2k) = b_k$.',
            'Esta $f$ es sobreyectiva (todo elemento de $A \\cup B$ aparece).',
            'Una sobreyección desde $\\mathbb{N}$ garantiza que $A \\cup B$ es contable. $\\blacksquare$',
          ],
        }),
      },
      {
        id: 'c6', practica: 2, num: 6, tab: 'Ej. 6 — Unión numerable de numerables',
        build: () => orderProof({
          title: 'Unión numerable de conjuntos numerables es numerable',
          hint: 'Poné los elementos en una grilla (fila n = conjunto Aₙ) y recorré por diagonales.',
          steps: [
            'Sea $\\{A_n\\}_{n\\in\\mathbb{N}}$ con cada $A_n = \\{a_{n,1}, a_{n,2}, \\dots\\}$ numerable.',
            'Disponemos los elementos en una grilla: la fila $n$ contiene a $A_n$.',
            'Recorremos la grilla por diagonales finitas $\\{(i,j) : i+j = k\\}$, $k = 2, 3, \\dots$',
            'Ese recorrido visita cada $a_{n,m}$ en un número finito de pasos: da una enumeración de $\\bigcup_n A_n$.',
            'Salteando repetidos obtenemos una biyección con (un subconjunto de) $\\mathbb{N}$: la unión es contable. $\\blacksquare$',
          ],
        }),
      },
      {
        id: 'c_diag', practica: 2, num: 10, tab: 'Cantor — ℝ no es numerable',
        build: () => orderProof({
          title: 'El intervalo [0,1) no es numerable (argumento diagonal)',
          hint: 'Suponé una lista completa y construí un número que difiere de cada uno en la diagonal.',
          steps: [
            'Por el absurdo, supongamos que $[0,1)$ es numerable: existe una lista $x_1, x_2, x_3, \\dots$ con todos sus elementos.',
            'Escribimos cada uno en decimal: $x_k = 0.d_{k1}d_{k2}d_{k3}\\dots$',
            'Definimos $y = 0.e_1 e_2 e_3\\dots$ con $e_k = 5$ si $d_{kk} \\ne 5$, y $e_k = 4$ si $d_{kk} = 5$.',
            'Entonces $y \\in [0,1)$ pero $y \\ne x_k$ para todo $k$ (difieren en la posición $k$).',
            'Así $y$ no está en la lista: contradicción. Luego $[0,1)$ no es numerable. $\\blacksquare$',
          ],
        }),
      },
      {
        id: 'c8', practica: 2, num: 8, tab: 'Ej. 8 — #P(A) = 2ⁿ',
        build: () => fillBlanks({
          title: 'Si #A = n, entonces #P(A) = 2ⁿ',
          hint: 'Cada subconjunto se identifica con su función indicadora A → {0,1}.',
          template:
            'A cada subconjunto $B \\subseteq A$ le asociamos su función {{0}} '
            + '$\\chi_B: A \\to \\{0,1\\}$, con $\\chi_B(a) = 1$ si $a \\in B$. '
            + 'Esta correspondencia es una {{1}} entre $\\mathcal{P}(A)$ y $\\{0,1\\}^A$. '
            + 'Si $\\#A = n$, hay $2$ elecciones por cada uno de los $n$ elementos, es decir {{2}} funciones. '
            + 'Por lo tanto $\\#\\mathcal{P}(A) =$ {{3}}.',
          blanks: [
            { answer: 'indicadora', options: ['indicadora', 'inversa', 'constante'] },
            { answer: 'biyección', options: ['biyección', 'inyección', 'sobreyección'] },
            { answer: '$2^n$', options: ['$2^n$', '$n^2$', '$2n$'] },
            { answer: '$2^n$', options: ['$2^n$', '$n!$', '$n^2$'] },
          ],
        }),
      },
    ],
  },

  // ---------------- ESPACIOS MÉTRICOS ----------------
  {
    id: 'em',
    nombre: 'Espacios métricos',
    ejercicios: [
      {
        id: 'm2', practica: 3, num: 2, tab: 'Ej. 2 — ¿(x−y)² es métrica?',
        build: () => orderProof({
          title: 'd(x,y) = (x−y)² NO es una métrica en ℝ',
          hint: 'Buscá un contraejemplo de la desigualdad triangular.',
          steps: [
            'Recordemos que una métrica debe cumplir $d(x,z) \\le d(x,y) + d(y,z)$.',
            'Tomemos $x = 0$, $y = 1$, $z = 2$.',
            'Calculamos $d(x,z) = (0-2)^2 = 4$.',
            'Y $d(x,y) + d(y,z) = (0-1)^2 + (1-2)^2 = 1 + 1 = 2$.',
            'Como $4 > 2$, falla la triangular: $d$ no es métrica. $\\blacksquare$',
          ],
        }),
      },
      {
        id: 'm4', practica: 3, num: 4, tab: 'Ej. 4 — La bola abierta es abierta',
        build: () => orderProof({
          title: 'B(x, r) es un conjunto abierto',
          hint: 'Tomá y en la bola y buscá un radio s que meta toda B(y,s) dentro de B(x,r); usá la triangular.',
          steps: [
            'Sea $y \\in B(x,r)$, es decir $d(x,y) < r$.',
            'Definimos $s = r - d(x,y) > 0$.',
            'Sea $z \\in B(y,s)$, o sea $d(y,z) < s$.',
            'Por la desigualdad triangular: $d(x,z) \\le d(x,y) + d(y,z) < d(x,y) + s = r$.',
            'Entonces $z \\in B(x,r)$, luego $B(y,s) \\subseteq B(x,r)$: todo punto de $B(x,r)$ es interior. $\\blacksquare$',
          ],
        }),
      },
      {
        id: 'm3', practica: 3, num: 3, tab: 'Ej. 3 — Interior y clausura de ℚ',
        build: () => fillBlanks({
          title: 'En ℝ: interior y clausura de ℚ',
          hint: 'Todo intervalo contiene racionales e irracionales (densidad).',
          template:
            'Cualquier bola $(q-r, q+r)$ alrededor de un racional contiene números {{0}}, '
            + 'así que ningún punto de $\\mathbb{Q}$ es interior: $\\mathbb{Q}^\\circ =$ {{1}}. '
            + 'Por otro lado, todo real es límite de racionales (densidad), '
            + 'de modo que toda bola corta a $\\mathbb{Q}$: la clausura es $\\overline{\\mathbb{Q}} =$ {{2}}. '
            + 'En consecuencia $\\mathbb{Q}$ no es ni abierto ni {{3}}.',
          blanks: [
            { answer: 'irracionales', options: ['irracionales', 'enteros', 'naturales'] },
            { answer: '$\\varnothing$', options: ['$\\varnothing$', '$\\mathbb{Q}$', '$\\mathbb{R}$'] },
            { answer: '$\\mathbb{R}$', options: ['$\\mathbb{R}$', '$\\mathbb{Q}$', '$\\varnothing$'] },
            { answer: 'cerrado', options: ['cerrado', 'acotado', 'compacto'] },
          ],
        }),
      },
      {
        id: 'm9', practica: 3, num: 9, tab: 'Ej. 9 — La frontera es cerrada',
        build: () => orderProof({
          title: '∂A = Ā \\ A° y por lo tanto ∂A es cerrado',
          hint: 'La frontera es lo que queda de la clausura al sacar el interior; interseca dos cerrados.',
          steps: [
            'Por definición, $x \\in \\partial A$ si toda bola de $x$ corta a $A$ y a $A^c$.',
            'Que toda bola corte a $A$ significa $x \\in \\overline{A}$; que corte a $A^c$ significa $x \\in \\overline{A^c}$.',
            'Luego $\\partial A = \\overline{A} \\cap \\overline{A^c}$.',
            'Como $\\overline{A^c} = (A^\\circ)^c$, resulta $\\partial A = \\overline{A} \\setminus A^\\circ$.',
            'Es intersección de dos cerrados ($\\overline{A}$ y $\\overline{A^c}$), por lo tanto $\\partial A$ es cerrado. $\\blacksquare$',
          ],
        }),
      },
    ],
  },

  // ---------------- COMPLETITUD ----------------
  {
    id: 'comp',
    nombre: 'Completitud',
    ejercicios: [
      {
        id: 'p13', practica: 3, num: 13, tab: 'Ej. 13 — Cauchy ⇒ d(xₙ,yₙ) converge',
        build: () => orderProof({
          title: 'Si (xₙ) e (yₙ) son de Cauchy, entonces (d(xₙ, yₙ)) converge en ℝ',
          hint: 'Probá que (d(xₙ,yₙ)) es de Cauchy en ℝ usando la desigualdad de cuatro puntos.',
          steps: [
            'Vale la desigualdad $|d(x_n,y_n) - d(x_m,y_m)| \\le d(x_n,x_m) + d(y_n,y_m)$.',
            'Sea $\\varepsilon > 0$. Como $(x_n)$ es de Cauchy, existe $N_1$ con $d(x_n,x_m) < \\varepsilon/2$ para $n,m \\ge N_1$.',
            'Como $(y_n)$ es de Cauchy, existe $N_2$ con $d(y_n,y_m) < \\varepsilon/2$ para $n,m \\ge N_2$.',
            'Para $n,m \\ge \\max(N_1,N_2)$: $|d(x_n,y_n) - d(x_m,y_m)| < \\varepsilon$.',
            'Así $(d(x_n,y_n))$ es de Cauchy en $\\mathbb{R}$, que es completo, luego converge. $\\blacksquare$',
          ],
        }),
      },
      {
        id: 'p15', practica: 3, num: 15, tab: 'Ej. 15 — Cerrado en completo',
        build: () => fillBlanks({
          title: 'Si E es completo y A ⊆ E es cerrado, entonces (A, d) es completo',
          hint: 'Una Cauchy en A converge en E; usá que A es cerrado para que el límite esté en A.',
          template:
            'Sea $(x_n) \\subseteq A$ una sucesión de {{0}}. Como es de Cauchy en $E$ y $E$ es {{1}}, '
            + 'converge a algún $x \\in E$. Ahora bien, $A$ es {{2}} y $(x_n) \\subseteq A$ con $x_n \\to x$, '
            + 'de modo que el límite cumple $x \\in$ {{3}}. Por lo tanto toda sucesión de Cauchy en $A$ '
            + 'converge dentro de $A$: $(A,d)$ es completo.',
          blanks: [
            { answer: 'Cauchy', options: ['Cauchy', 'monótona', 'acotada'] },
            { answer: 'completo', options: ['completo', 'compacto', 'abierto'] },
            { answer: 'cerrado', options: ['cerrado', 'abierto', 'denso'] },
            { answer: '$A$', options: ['$A$', '$E \\setminus A$', '$\\varnothing$'] },
          ],
        }),
      },
      {
        id: 'p16', practica: 3, num: 16, tab: 'Ej. 16 — Intersección de Cantor',
        build: () => orderProof({
          title: 'Encaje de cerrados con diam → 0 tiene intersección de un punto',
          hint: 'Elegí un punto por cada Aₙ, mostrá que la sucesión es de Cauchy y usá completitud.',
          steps: [
            'Elegimos $x_n \\in A_n$ para cada $n$ (los $A_n$ son no vacíos).',
            'Si $m > n$, como $A_m \\subseteq A_n$, ambos $x_n, x_m \\in A_n$, luego $d(x_n,x_m) \\le \\operatorname{diam}(A_n)$.',
            'Como $\\operatorname{diam}(A_n) \\to 0$, la sucesión $(x_n)$ es de Cauchy.',
            'Por completitud, $x_n \\to x$ para algún $x \\in E$.',
            'Cada $A_n$ es cerrado y contiene la cola $(x_k)_{k\\ge n}$, así que $x \\in A_n$ para todo $n$: $x \\in \\bigcap_n A_n$.',
            'Si hubiera dos puntos en la intersección, distarían $\\le \\operatorname{diam}(A_n) \\to 0$, luego son iguales: la intersección es un único punto. $\\blacksquare$',
          ],
        }),
      },
      {
        id: 'p_ban', practica: 3, num: 16, tab: 'Punto fijo de Banach',
        build: () => fillBlanks({
          title: 'Banach: contracción en espacio completo tiene único punto fijo',
          hint: 'La iteración xₙ₊₁ = T(xₙ) genera una sucesión de Cauchy; el límite es el punto fijo.',
          template:
            'Sea $T$ una {{0}} con constante $k < 1$ en un espacio {{1}}. Iterando $x_{n+1} = T(x_n)$, '
            + 'se tiene $d(x_{n+1}, x_n) \\le k^n d(x_1, x_0)$, de donde la sucesión es de {{2}}. '
            + 'Por completitud converge a un $x^\\ast$, y como $T$ es continua, $T(x^\\ast) = x^\\ast$: es punto fijo. '
            + 'Si $x^\\ast, y^\\ast$ son ambos fijos, $d(x^\\ast,y^\\ast) = d(Tx^\\ast, Ty^\\ast) \\le k\\,d(x^\\ast,y^\\ast)$; '
            + 'como $k<1$ esto obliga $d(x^\\ast,y^\\ast) =$ {{3}}, es decir el punto fijo es único.',
          blanks: [
            { answer: 'contracción', options: ['contracción', 'isometría', 'biyección'] },
            { answer: 'completo', options: ['completo', 'compacto', 'acotado'] },
            { answer: 'Cauchy', options: ['Cauchy', 'monótona', 'constante'] },
            { answer: '$0$', options: ['$0$', '$1$', '$k$'] },
          ],
        }),
      },
    ],
  },
];

export function renderAsistente(root) {
  root.appendChild(pageHeader(
    'Asistente de ejercicios',
    'Practicá las demostraciones de las <strong>Prácticas 1–3</strong> de forma guiada, '
    + 'organizadas por tema: arrastrá los pasos hasta ordenar una prueba correcta, o completá los huecos.'
  ));

  root.appendChild(callout('tip', 'Cómo funciona',
    '<strong>1)</strong> Elegí un <strong>tema</strong>. <strong>2)</strong> Elegí un <strong>ejercicio</strong>.<br>'
    + '<strong>Ordenar (⠿):</strong> los pasos aparecen mezclados; arrastralos al orden lógico y verificá '
    + '(los correctos quedan en verde). <strong>Completar:</strong> elegí en cada hueco la opción que hace '
    + 'válida la cadena. Siempre podés pedir <em>Ver solución</em>.'
  ));

  // --- Selector de tema (nivel 1) ---
  const temaPicker = el('div', { class: 'ex-picker tema-picker' });
  // --- Selector de ejercicio (nivel 2) ---
  const ejPicker = el('div', { class: 'ex-picker' });
  const holder = el('div', {});

  let temaActual = TEMAS[0];
  let ejActual = null;

  function loadEjercicio(ej) {
    ejActual = ej;
    [...ejPicker.children].forEach((p) => p.classList.toggle('active', p.dataset.ej === ej.id));
    holder.innerHTML = '';
    holder.appendChild(exRef(ej.practica, ej.num));
    holder.appendChild(ej.build());
    typeset(holder);
  }

  function loadTema(tema) {
    temaActual = tema;
    [...temaPicker.children].forEach((p) => p.classList.toggle('active', p.dataset.tema === tema.id));
    // reconstruir el selector de ejercicios
    ejPicker.innerHTML = '';
    tema.ejercicios.forEach((ej) => {
      ejPicker.appendChild(el('button', {
        class: 'ex-pill',
        dataset: { ej: ej.id },
        onClick: () => loadEjercicio(ej),
      }, ej.tab));
    });
    // cargar el primer ejercicio del tema
    loadEjercicio(tema.ejercicios[0]);
  }

  TEMAS.forEach((tema) => {
    temaPicker.appendChild(el('button', {
      class: 'ex-pill',
      dataset: { tema: tema.id },
      onClick: () => loadTema(tema),
    }, tema.nombre));
  });

  root.appendChild(el('div', { class: 'ex-picker-label', text: 'Tema' }));
  root.appendChild(temaPicker);
  root.appendChild(el('div', { class: 'ex-picker-label', text: 'Ejercicio' }));
  root.appendChild(ejPicker);
  root.appendChild(holder);

  loadTema(TEMAS[0]);

  root.appendChild(callout('', 'Más práctica',
    'Para la teoría de cada tema: <a href="#sup-inf">Supremos e ínfimos</a>, '
    + '<a href="#sucesiones">Sucesiones</a>, <a href="#card-numerables">Cardinalidad</a>, '
    + '<a href="#em-distancia">Espacios métricos</a>. '
    + 'Para preguntas rápidas de opción múltiple, la <a href="#quiz">Autoevaluación</a>.'
  ));
}