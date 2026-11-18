// utils/guia-p6.js — Práctica 6 resuelta (Espacios normados, Operadores).
// Resoluciones paso a paso para el componente solvedExercise().
// Una norma verifica: (N1) ||x||>=0 y ||=0<=>x=0; (N2) ||ax||=|a|||x||;
// (N3) desigualdad triangular. Un operador lineal es continuo <=> es acotado.

import { consigna } from './ejercicios.js';

const E = (n) => consigna(6, n);

export const GUIA_P6 = [
  {
    fuente: 'Práctica 6 · Ej. 1', enunciado: E(1),
    idea: 'Para cada una se verifican los tres axiomas de norma. La triangular de $\\|\\cdot\\|_2$ es Minkowski (de Cauchy–Schwarz); las otras dos salen sumando o maximizando coordenada a coordenada.',
    pasos: [
      {
        idea: 'Axiomas a verificar',
        detalle: '<p>Una norma cumple (N1) $\\|x\\|\\ge0$ y $\\|x\\|=0\\iff x=0$; (N2) $\\|\\alpha x\\|=|\\alpha|\\,\\|x\\|$; (N3) $\\|x+y\\|\\le\\|x\\|+\\|y\\|$.</p>',
      },
      {
        idea: '$\\|\\cdot\\|_1=\\sum|x_i|$',
        detalle: '<p>(N1) $\\sum|x_i|\\ge0$, y $=0\\iff$ todo $|x_i|=0\\iff x=0$. (N2) $\\sum|\\alpha x_i|=|\\alpha|\\sum|x_i|$. (N3) $\\|x+y\\|_1=\\sum|x_i+y_i|\\le\\sum(|x_i|+|y_i|)=\\|x\\|_1+\\|y\\|_1$.</p>',
      },
      {
        idea: '$\\|\\cdot\\|_\\infty=\\max|x_i|$',
        detalle: '<p>(N1) $\\max|x_i|\\ge0$, y $=0\\iff$ todo $|x_i|=0\\iff x=0$. (N2) $\\max|\\alpha x_i|=|\\alpha|\\max|x_i|$. (N3) para cada $i$, $|x_i+y_i|\\le|x_i|+|y_i|\\le\\|x\\|_\\infty+\\|y\\|_\\infty$; tomando máximo en $i$, $\\|x+y\\|_\\infty\\le\\|x\\|_\\infty+\\|y\\|_\\infty$.</p>',
      },
      {
        idea: '$\\|\\cdot\\|_2=(\\sum x_i^2)^{1/2}$',
        detalle: '<p>(N1) y (N2) inmediatas. (N3) es la <strong>desigualdad de Minkowski</strong> $\\|x+y\\|_2\\le\\|x\\|_2+\\|y\\|_2$, consecuencia de Cauchy–Schwarz $\\langle x,y\\rangle\\le\\|x\\|_2\\|y\\|_2$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Las tres son normas en $\\mathbb{R}^n$. $\\|\\cdot\\|_1$ y $\\|\\cdot\\|_\\infty$ son directas por suma/máximo; $\\|\\cdot\\|_2$ necesita Minkowski. (En la Práctica 3 vimos que las tres métricas asociadas son equivalentes topológicamente.)',
  },
  {
    fuente: 'Práctica 6 · Ej. 2', enunciado: E(2),
    idea: '(a) La bola cerrada es cerrada y contiene a la abierta; todo punto de su frontera se aproxima desde adentro por contracción. (b) acotar por $2r$ y aproximarlo con dos puntos casi opuestos. (c) convexidad por la triangular con pesos.',
    pasos: [
      {
        idea: '(a) $\\overline{B(x,r)}=\\overline{B}(x,r)$',
        detalle: '<p>La bola cerrada $\\overline{B}(x,r)=\\{y:\\|y-x\\|\\le r\\}$ es cerrada y contiene a $B(x,r)$, luego $\\overline{B(x,r)}\\subseteq\\overline{B}(x,r)$. Recíprocamente, si $\\|y-x\\|=r$ (frontera), $y_n=x+(1-\\tfrac1n)(y-x)$ cumple $\\|y_n-x\\|=(1-\\tfrac1n)r<r$ (en la bola abierta) y $y_n\\to y$; así $y\\in\\overline{B(x,r)}$. Igualdad.</p>',
      },
      {
        idea: '(b) $\\operatorname{diam}(B(x,r))=2r$',
        detalle: '<p>Para $y,z\\in B(x,r)$: $\\|y-z\\|\\le\\|y-x\\|+\\|z-x\\|<2r$, así que $\\operatorname{diam}\\le2r$. Tomando un vector $u\\ne0$ de norma $1$, $y_n=x+(1-\\tfrac1n)ru$ y $z_n=x-(1-\\tfrac1n)ru$ están en la bola y $\\|y_n-z_n\\|=2(1-\\tfrac1n)r\\to2r$. El supremo es $2r$, luego $\\operatorname{diam}=2r$.</p>',
      },
      {
        idea: '(c) convexidad',
        detalle: '<p>Sean $y,z\\in B(x,r)$ y $t\\in[0,1]$. Por triangular, $\\|(ty+(1-t)z)-x\\|=\\|t(y-x)+(1-t)(z-x)\\|\\le t\\|y-x\\|+(1-t)\\|z-x\\|<tr+(1-t)r=r$. Luego $ty+(1-t)z\\in B(x,r)$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'En un espacio normado la clausura de la bola abierta es la bola cerrada, el diámetro es exactamente $2r$ (se aproxima, no se alcanza, en la abierta) y toda bola es convexa. La homotecia y la traslación de la norma hacen todo el trabajo.',
  },
  {
    fuente: 'Práctica 6 · Ej. 3', enunciado: E(3),
    idea: 'Cesàro en espacios normados. Se separa la suma en la cabeza (fija) y la cola (chica); la cabeza se anula al dividir por $n$ y la cola se acota por $\\varepsilon$.',
    pasos: [
      {
        idea: 'Plantear la diferencia',
        detalle: '<p>$y_n-x_0=\\tfrac1n\\sum_{k=1}^n(x_k-x_0)=\\tfrac1n\\sum_{k=1}^n e_k$ con $e_k=x_k-x_0$. Dado $\\varepsilon>0$, como $x_k\\to x_0$ existe $N_0$ con $\\|e_k\\|<\\tfrac\\varepsilon2$ para $k\\ge N_0$.</p>',
      },
      {
        idea: 'Cabeza + cola',
        detalle: '<p>Para $n>N_0$: $\\|y_n-x_0\\|\\le\\tfrac1n\\Big\\|\\sum_{k=1}^{N_0}e_k\\Big\\|+\\tfrac1n\\sum_{k=N_0+1}^n\\|e_k\\|$. El primer término es $\\tfrac1n$ veces un vector fijo, que es $<\\tfrac\\varepsilon2$ para $n$ grande. El segundo es $\\le\\tfrac{n-N_0}{n}\\cdot\\tfrac\\varepsilon2<\\tfrac\\varepsilon2$.</p>',
      },
      {
        idea: 'Concluir',
        detalle: '<p>Para $n$ suficientemente grande, $\\|y_n-x_0\\|<\\tfrac\\varepsilon2+\\tfrac\\varepsilon2=\\varepsilon$. Como $\\varepsilon$ era arbitrario, $y_n\\to x_0$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'El promedio de Cesàro de una sucesión convergente converge al mismo límite. La parte "fija" de la suma se diluye al dividir por $n$; la cola, ya chiquita, no aporta.',
  },
  {
    fuente: 'Práctica 6 · Ej. 4', enunciado: E(4),
    idea: '(a) límites de sucesiones del subespacio; (b) si un subespacio tuviera interior, absorbería todas las direcciones y sería todo $E$; (c) isomorfo a un $\\mathbb{R}^k$, completo, luego cerrado; (d) un hiperplano es maximal, así que su clausura es él mismo o todo $E$.',
    pasos: [
      {
        idea: '(a) $\\overline S$ es subespacio',
        detalle: '<p>Si $x,y\\in\\overline S$, tomamos $(x_n),(y_n)\\subseteq S$ con $x_n\\to x$, $y_n\\to y$. Entonces $x_n+y_n\\in S\\to x+y$ y $\\alpha x_n\\in S\\to\\alpha x$; así $x+y,\\alpha x\\in\\overline S$.</p>',
      },
      {
        idea: '(b) $S\\ne E\\Rightarrow S^\\circ=\\varnothing$',
        detalle: '<p>Si $S$ tuviera interior, existiría $B(x,r)\\subseteq S$; entonces $x\\in S$ y $B(0,r)=B(x,r)-x\\subseteq S-x=S$ (porque $S$ es subespacio y $x\\in S$). Para cualquier $y\\ne0$, $\\tfrac{r}{2\\|y\\|}y$ tiene norma $<r$, está en $B(0,r)\\subseteq S$, y por ser $S$ subespacio, $y\\in S$. Así $E\\subseteq S$, absurdo. Luego $S^\\circ=\\varnothing$.</p>',
      },
      {
        idea: '(c) $\\dim S<\\infty\\Rightarrow S$ cerrado',
        detalle: '<p>Un subespacio de dimensión finita es isomorfo a $\\mathbb{R}^k$ (vía una base); todas las normas son equivalentes en dimensión finita, así que es completo. Un completo contenido en $E$ es cerrado en $E$.</p>',
      },
      {
        idea: '(d) Hiperplano: denso o cerrado',
        detalle: '<p>Un hiperplano $S$ es un subespacio maximal propio: el único subespacio que lo contiene propiamente es $E$. Como $\\overline S$ es subespacio (por (a)) y contiene a $S$, o bien $\\overline S=S$ (cerrado) o bien $\\overline S=E$ (denso). $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La clausura de un subespacio es subespacio; un subespacio propio no tiene interior (no "llena" ninguna bola); los finito-dimensionales son cerrados; un hiperplano, por ser maximal, sólo puede ser cerrado o denso.',
  },
  {
    fuente: 'Práctica 6 · Ej. 5', enunciado: E(5),
    idea: 'En dimensión finita todas las normas son equivalentes y el espacio es completo (Banach). En dimensión infinita ($\\mathbb{R}[t]$) eso falla: $t^n$ tiene $\\|t^n\\|_\\infty=1$ pero $\\|t^n\\|_1=\\tfrac1{n+1}\\to0$.',
    pasos: [
      {
        idea: '(a) $\\mathbb{R}_n[t]$ es de Banach',
        detalle: '<p>$\\mathbb{R}_n[t]$ tiene dimensión $n+1$ (base $1,t,\\dots,t^n$). Con $\\|\\cdot\\|_\\infty$ o $\\|\\cdot\\|_1$ es un espacio normado de dimensión finita, isomorfo a $\\mathbb{R}^{n+1}$; en dimensión finita todas las normas son equivalentes y el espacio es completo. Ambos son de Banach.</p>',
      },
      {
        idea: '(b) Equivalencia para cada $n$',
        detalle: '<p>En un espacio de dimensión finita, cualesquiera dos normas son equivalentes (existen $c,C>0$ con $c\\|p\\|_\\infty\\le\\|p\\|_1\\le C\\|p\\|_\\infty$). En particular lo son $\\|\\cdot\\|_\\infty$ y $\\|\\cdot\\|_1$ en $\\mathbb{R}_n[t]$ para cada $n$.</p>',
      },
      {
        idea: '(c) En $\\mathbb{R}[t]$ NO son equivalentes',
        detalle: '<p>Siempre vale $\\|p\\|_1=\\int_0^1|p|\\le\\|p\\|_\\infty$. Para la otra desigualdad, tomamos $p_n(t)=t^n$: $\\|p_n\\|_\\infty=1$ pero $\\|p_n\\|_1=\\tfrac1{n+1}\\to0$. Si existiera $C$ con $\\|p\\|_\\infty\\le C\\|p\\|_1$, sería $1\\le C\\tfrac1{n+1}$ para todo $n$, absurdo. No son equivalentes.</p>',
      },
      {
        idea: '¿Contradicción con (b)?',
        detalle: '<p>No la hay: (b) fija $n$ y trabaja en $\\mathbb{R}_n[t]$ (dimensión $n+1$); la constante de equivalencia depende de $n$ y crece sin cota al tomar $n\\to\\infty$. En $\\mathbb{R}[t]$ (dimensión infinita) ya no hay una constante única. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La equivalencia de normas es un fenómeno de dimensión finita. En $\\mathbb{R}_n[t]$ las normas sup e integral son equivalentes (con constantes que dependen de $n$); al pasar a $\\mathbb{R}[t]$ esa dependencia explota y dejan de ser equivalentes.',
  },
  {
    fuente: 'Práctica 6 · Ej. 6', enunciado: E(6),
    idea: '(a) La sucesión de vectores canónicos $e_n$ está en la bola unitaria y están a distancia $1$ entre sí: ninguna subsucesión es de Cauchy. (b) Hay $c$ sucesiones de $0$s y $1$s, todas a distancia $1$; un denso debería tener un representante cerca de cada una, y son distintos.',
    pasos: [
      {
        idea: '(a) $e_n$ en la bola, sin subsucesión convergente',
        detalle: '<p>Sean $e_n=(0,\\dots,0,1,0,\\dots)$ (el $1$ en la posición $n$). $\\|e_n\\|_\\infty=1$, así que $e_n\\in\\overline B(0,1)$. Pero $\\|e_n-e_m\\|_\\infty=1$ para $n\\ne m$: ninguna subsucesión es de Cauchy, luego no converge. La bola cerrada no es compacta.</p>',
      },
      {
        idea: '(b) Muchos puntos separados',
        detalle: '<p>El conjunto $\\{0,1\\}^{\\mathbb{N}}$ de sucesiones de $0$s y $1$s está en $\\overline B(0,1)$ y es no numerable (biyecta con $\\mathcal{P}(\\mathbb{N})$). Dos elementos distintos $x,y$ difieren en alguna coordenada, así que $\\|x-y\\|_\\infty=1$.</p>',
      },
      {
        idea: '(b) Un denso debería tocar a cada uno',
        detalle: '<p>Si $D$ fuera denso, para cada $x\\in\\{0,1\\}^{\\mathbb{N}}$ existe $d_x\\in D$ con $\\|d_x-x\\|_\\infty<\\tfrac12$. Para $x\\ne y$, $d_x\\ne d_y$: si fueran iguales, $1=\\|x-y\\|\\le\\|x-d\\|+\\|d-y\\|<1$, absurdo. Así $x\\mapsto d_x$ es inyectiva de $\\{0,1\\}^{\\mathbb{N}}$ en $D$, y $|D|\\ge c$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'No hay conjunto numerable denso: $\\ell^\\infty$ no es separable. La idea general es "muchos puntos mutuamente lejos": cualquier denso necesita un representante distinto para cada uno, y son $c$. La misma técnica da (a) como caso particular.',
  },
  {
    fuente: 'Práctica 6 · Ej. 7', enunciado: E(7),
    idea: 'Dada $a\\in E$ (casi nula, suma $s$), corregir su suma repartiendo $-s$ entre $k$ posiciones lejanas, de a $-s/k$ cada una. El cambio en norma sup es $|s|/k\\to0$ y la nueva sucesión está en $S$.',
    pasos: [
      {
        idea: 'Marco',
        detalle: '<p>$a\\in E$ es casi nula: existe $N$ con $a_n=0$ para $n\\ge N$. Sea $s=\\sum_{n\\ge1}a_n$ (suma finita). Queremos $b^{(k)}\\in S$ con $\\|b^{(k)}-a\\|_\\infty\\to0$.</p>',
      },
      {
        idea: 'Construcción de la corrección',
        detalle: '<p>Para $k\\ge1$, definimos $b^{(k)}_n=a_n$ para $n<N$, $b^{(k)}_n=-\\tfrac{s}{k}$ para $N\\le n\\le N+k-1$, y $b^{(k)}_n=0$ para $n\\ge N+k$. Es casi nula, así que $b^{(k)}\\in E$.</p>',
      },
      {
        idea: 'Suma cero',
        detalle: '<p>$\\sum_{n\\ge1}b^{(k)}_n=\\sum_{n<N}a_n + k\\cdot\\big(-\\tfrac{s}{k}\\big)=s-s=0$, así que $b^{(k)}\\in S$.</p>',
      },
      {
        idea: 'Convergencia en norma sup',
        detalle: '<p>Sobre $n<N$ coincide con $a$; en las posiciones de corrección ($n\\ge N$) el valor de $a$ es $0$, así que $|b^{(k)}_n-a_n|=\\tfrac{|s|}{k}$; y para $n\\ge N+k$ ambos son $0$. Por lo tanto $\\|b^{(k)}-a\\|_\\infty=\\tfrac{|s|}{k}\\to0$. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Repartir la "deuda" $-s$ entre muchos lugares chiquitos hace que la corrección se diluya en norma sup. Así $S$ (sumas cero) es denso en $E$ (casi nulas): cualquier casi nula se aproxima por casi nulas de suma cero.',
  },
  {
    fuente: 'Práctica 6 · Ej. 8', enunciado: E(8),
    idea: 'Para un operador lineal, continuo en un punto ⟺ continuo en todos ⟺ uniformemente continuo ⟺ acotado ($\\|Tx\\|\\le M\\|x\\|$) ⟺ manda acotados en acotados. Todo se reduce a "acotado", que es la condición operativa.',
    pasos: [
      {
        idea: 'Plan: cadena (a)⇒(e)⇒(d)⇒(c)⇒(b)⇒(a), más (e)⇔(f)',
        detalle: '<p>"Acotado" (e) significa $\\exists M\\ge0:\\ \\|Tx\\|_F\\le M\\|x\\|_E\\ \\forall x$. Probamos la cadena de implicaciones y después (e)$\\iff$(f); así las seis condiciones quedan equivalentes.</p>',
      },
      {
        idea: '(a)⇒(e): continua en $0$ ⟹ acotado',
        detalle: '<p>Con $\\varepsilon=1$ y $T(0)=0$, existe $\\delta>0$ tal que $\\|x\\|<\\delta\\Rightarrow\\|Tx\\|<1$. Dado $y\\ne0$, el vector $x=\\tfrac{\\delta}{2\\|y\\|}y$ tiene $\\|x\\|=\\tfrac\\delta2<\\delta$, así $\\|Tx\\|<1$; por linealidad $\\|Tx\\|=\\tfrac{\\delta}{2\\|y\\|}\\|Ty\\|$, es decir $\\|Ty\\|<\\tfrac2\\delta\\|y\\|$. Vale $M=\\tfrac2\\delta$ (y $y=0$ es trivial).</p>',
      },
      {
        idea: '(e)⇒(d): acotado ⟹ Lipschitz ⟹ unif. continuo',
        detalle: '<p>Por linealidad, $\\|Tx-Ty\\|=\\|T(x-y)\\|\\le M\\|x-y\\|$. $T$ es Lipschitz de constante $M$, y por lo tanto uniformemente continua ($\\delta=\\varepsilon/M$, o cualquiera si $M=0$).</p>',
      },
      {
        idea: '(d)⇒(c)⇒(b)',
        detalle: '<p>Uniformemente continua implica continua en todo punto (c), y esto implica continua en algún $x_0$ (b), trivialmente.</p>',
      },
      {
        idea: '(b)⇒(a): traslación',
        detalle: '<p>Si $T$ es continua en $x_0$ y $x_n\\to0$, entonces $x_0+x_n\\to x_0$, luego $T(x_0+x_n)\\to T(x_0)$. Por linealidad $T(x_0+x_n)-T(x_0)=T(x_n)$, así $T(x_n)\\to0=T(0)$: continua en $0$.</p>',
      },
      {
        idea: '(e)$\\iff$(f) Acotados en acotados',
        detalle: '<p>(e)$\\Rightarrow$(f): si $\\|x\\|\\le R$, $\\|Tx\\|\\le MR$. (f)$\\Rightarrow$(e): si $T(B(0,1))$ es acotado, $\\|Tx\\|\\le M$ para $\\|x\\|\\le1$; por homogeneidad $\\|Tx\\|\\le M\\|x\\|$ para todo $x$, así $T$ es acotada. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Para un lineal, las seis nociones coinciden; la más útil es "acotado" ($\\|Tx\\|\\le M\\|x\\|$). La linealidad convierte la continuidad puntual en global y en Lipschitz, y "imagen de acotado es acotado" en operador acotado.',
  },
  {
    fuente: 'Práctica 6 · Ej. 9', enunciado: E(9),
    idea: 'La clave es que $x/\\|x\\|$ recorre toda la esfera, y $\\|x\\|\\le1$ se reduce a la esfera por homogeneidad.',
    pasos: [
      {
        idea: 'Esfera y $x\\ne0$',
        detalle: '<p>Para $x\\ne0$, $u=x/\\|x\\|$ tiene $\\|u\\|=1$ y $\\tfrac{\\|Tx\\|}{\\|x\\|}=\\|Tu\\|$. Como $u$ recorre toda la esfera unitaria, $\\sup_{x\\ne0}\\tfrac{\\|Tx\\|}{\\|x\\|}=\\sup_{\\|u\\|=1}\\|Tu\\|$.</p>',
      },
      {
        idea: 'Bola $\\le$ esfera',
        detalle: '<p>Si $\\|x\\|\\le1$ y $x\\ne0$, $\\|Tx\\|=\\|x\\|\\,\\|T(x/\\|x\\|)\\|\\le\\|x\\|\\sup_{\\|u\\|=1}\\|Tu\\|\\le\\sup_{\\|u\\|=1}\\|Tu\\|$ (y $x=0$ da $0$). Así $\\sup_{\\|x\\|\\le1}\\|Tx\\|\\le\\sup_{\\|u\\|=1}\\|Tu\\|$.</p>',
      },
      {
        idea: 'Esfera $\\le$ bola',
        detalle: '<p>Como la esfera está contenida en la bola cerrada, $\\sup_{\\|u\\|=1}\\|Tu\\|\\le\\sup_{\\|x\\|\\le1}\\|Tx\\|$. Por doble desigualdad, las tres expresiones coinciden. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Las tres fórmulas para $\\|T\\|$ son la misma: la normalización $x/\\|x\\|$ identifica el problema "dentro de la bola" con "sobre la esfera", y la homogeneidad deja fuera el cociente $\\|Tx\\|/\\|x\\|$.',
  },
  {
    fuente: 'Práctica 6 · Ej. 10', enunciado: E(10),
    idea: 'Con $\\|\\cdot\\|_\\infty$, evaluación e integral se acotan por el máximo: ambas continuas, norma $1$. Con $\\|\\cdot\\|_1$, la integral se acota por $\\int|f|=\\|f\\|_1$ (continua, norma $1$), pero la evaluación en un punto no: un pico angosto y alto la rompe.',
    pasos: [
      {
        idea: '$\\|\\cdot\\|_\\infty$: $E$ e $I$ continuas',
        detalle: '<p>$|E(f)|=|f(0)|\\le\\max_{[0,1]}|f|=\\|f\\|_\\infty$, así $\\|E\\|\\le1$; con $f\\equiv1$, $\\|f\\|_\\infty=1$ y $E(f)=1$, así $\\|E\\|=1$. Análogamente $|I(f)|=|\\int_0^1 f|\\le\\int_0^1|f|\\le\\|f\\|_\\infty$, así $\\|I\\|\\le1$, y con $f\\equiv1$, $\\|I\\|=1$. Ambas continuas.</p>',
      },
      {
        idea: '$\\|\\cdot\\|_1$: $I$ continua',
        detalle: '<p>$|I(f)|\\le\\int_0^1|f|=\\|f\\|_1$, así $\\|I\\|\\le1$ (y $=1$ con $f\\equiv1$). La integral es continua en $\\|\\cdot\\|_1$.</p>',
      },
      {
        idea: '$\\|\\cdot\\|_1$: $E$ discontinua',
        detalle: '<p>Tomamos $f_n$ como un triángulo de altura $n$ y base $[0,\\tfrac2{n^2}]$, nulo fuera. Entonces $\\|f_n\\|_1=\\tfrac12\\cdot\\tfrac2{n^2}\\cdot n=\\tfrac1n\\to0$, pero $E(f_n)=f_n(0)=n\\to\\infty$. Si $E$ fuera continua, $E(f_n)\\to0$; no lo es. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'Con la norma sup, evaluación e integral son continuas (norma $1$). Con la norma integral, la integral sigue continua (norma $1$) pero la evaluación en un punto no lo es: picos cada vez más finos y altos tienen norma $\\|\\cdot\\|_1$ chiquita pero evaluación grande.',
  },
  {
    fuente: 'Práctica 6 · Ej. 11', enunciado: E(11),
    idea: 'Acotar $\\|Kf\\|_\\infty$ por $\\|f\\|_\\infty$ usando que $k$ está acotada: $\\|K\\|\\le\\max_x\\int_0^1|k(x,y)|\\,dy$.',
    pasos: [
      {
        idea: 'Linealidad',
        detalle: '<p>$K(\\alpha f+\\beta g)(x)=\\int k(x,y)(\\alpha f+\\beta g)(y)\\,dy=\\alpha(Kf)(x)+\\beta(Kg)(x)$: $K$ es lineal.</p>',
      },
      {
        idea: '$Kf$ es continua (la imagen cae en $C([0,1])$)',
        detalle: '<p>$k$ es continua en el compacto $[0,1]^2$, luego uniformemente continua (Teorema 6.18). Dado $\\varepsilon>0$ hay $\\delta>0$ tal que $|x-x\'|<\\delta\\Rightarrow|k(x,y)-k(x\',y)|<\\varepsilon$ para todo $y$. Entonces $|Kf(x)-Kf(x\')|\\le\\int_0^1|k(x,y)-k(x\',y)||f(y)|\\,dy\\le\\varepsilon\\|f\\|_\\infty$. Así $Kf\\in C([0,1])$.</p>',
      },
      {
        idea: 'Cota de la norma',
        detalle: '<p>La función $x\\mapsto\\int_0^1|k(x,y)|\\,dy$ es continua (mismo argumento que arriba, pues $|k|$ también es uniformemente continua) y $[0,1]$ es compacto: alcanza su máximo $M=\\max_x\\int_0^1|k(x,y)|\\,dy$.</p>',
      },
      {
        idea: 'Continuidad',
        detalle: '<p>$\\|Kf\\|_\\infty=\\max_x\\Big|\\int_0^1 k(x,y)f(y)\\,dy\\Big|\\le\\max_x\\int_0^1|k(x,y)|\\,|f(y)|\\,dy\\le\\|f\\|_\\infty\\max_x\\int_0^1|k(x,y)|\\,dy=M\\|f\\|_\\infty$. Así $K$ es acotado, con $\\|K\\|\\le M$, y por el Ej. 8 es continuo. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'El operador integral con kernel continuo es lineal y acotado, por ende continuo, con $\\|K\\|\\le\\max_x\\int_0^1|k(x,y)|\\,dy$. Es el prototipo de operador "suavizante": integra, así que no amplifica como la derivada.',
  },
  {
    fuente: 'Práctica 6 · Ej. 12', enunciado: E(12),
    idea: 'La derivación es lineal pero amplifica: $\\|\\delta(t^n)\\|_\\infty=n$ mientras $\\|t^n\\|_\\infty=1$. No es acotada, luego no es continua.',
    pasos: [
      {
        idea: 'Linealidad',
        detalle: '<p>$(\\delta(\\alpha p+\\beta q))(t)=(\\alpha p+\\beta q)\'(t)=\\alpha p\'(t)+\\beta q\'(t)$, así $\\delta$ es lineal.</p>',
      },
      {
        idea: 'No es acotada',
        detalle: '<p>Tomamos $p_n(t)=t^n\\in\\mathbb{R}[t]$. $\\|p_n\\|_\\infty=\\max_{[0,1]}t^n=1$, pero $\\delta p_n=nt^{n-1}$ cumple $\\|\\delta p_n\\|_\\infty=\\max_{[0,1]}nt^{n-1}=n$. Así $\\tfrac{\\|\\delta p_n\\|}{\\|p_n\\|}=n\\to\\infty$.</p>',
      },
      {
        idea: 'Concluir',
        detalle: '<p>Si $\\delta$ fuera continua (lineal), sería acotada (Ej. 8); pero $\\|\\delta p_n\\|/\\|p_n\\|=n$ no está acotado. Entonces $\\delta$ no es continuo. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La derivación es lineal pero discontinua: derivar $t^n$ multiplica por $n$, amplificando sin límite. Es el contrapunto del operador integral (Ej. 11): derivar amplifica, integrar suaviza.',
  },
  {
    fuente: 'Práctica 6 · Ej. 13', enunciado: E(13),
    idea: '(a) Igual que $\\ell^\\infty$: los $e_n$ están en la bola y $\\|e_n-e_m\\|_2=\\sqrt2$. (b) Cauchy–Schwarz con $b=(\\tfrac1n)$: $|\\sum a_n/n|\\le\\|a\\|_2\\,(\\sum\\tfrac1{n^2})^{1/2}$.',
    pasos: [
      {
        idea: '(a) Bola de $\\ell^2$ no compacta',
        detalle: '<p>$e_n=(0,\\dots,0,1,0,\\dots)$ cumple $\\|e_n\\|_2=1$, así $e_n\\in\\overline B(0,1)$. Y $\\|e_n-e_m\\|_2=\\sqrt2$ para $n\\ne m$: ninguna subsucesión es de Cauchy. La bola cerrada no es compacta.</p>',
      },
      {
        idea: '(b) $\\gamma$ lineal',
        detalle: '<p>$\\gamma(\\alpha a+\\beta b)=\\sum(\\alpha a_n+\\beta b_n)/n=\\alpha\\gamma(a)+\\beta\\gamma(b)$: es lineal.</p>',
      },
      {
        idea: '(b) Cota por Cauchy–Schwarz',
        detalle: '<p>Tomamos $b=(\\tfrac1n)_{n\\ge1}\\in\\ell^2$ (pues $\\sum\\tfrac1{n^2}=\\tfrac{\\pi^2}{6}<\\infty$). Por Cauchy–Schwarz en $\\ell^2$, $|\\gamma(a)|=\\big|\\sum\\tfrac{a_n}{n}\\big|=|\\langle a,b\\rangle|\\le\\|a\\|_2\\,\\|b\\|_2=\\|a\\|_2\\,(\\tfrac{\\pi^2}{6})^{1/2}$. Así $\\gamma$ es acotada y, por el Ej. 8, continua. $\\blacksquare$</p>',
      },
    ],
    conclusion: 'La bola unitaria de $\\ell^2$ no es compacta (los $e_n$ lo muestran como en $\\ell^\\infty$). La funcional $\\gamma(a)=\\sum a_n/n$ es continua: Cauchy–Schwarz la acota por $\\|a\\|_2\\,\\|b\\|_2$ con $b=(1/n)\\in\\ell^2$.',
  },
];
