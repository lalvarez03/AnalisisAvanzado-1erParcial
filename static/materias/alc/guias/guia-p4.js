// materias/alc/guias/guia-p4.js — ejercicios resueltos de la Práctica 4 (2C 2026).
const R = String.raw;

export const GUIA_P4 = [
  {
    fuente: 'Práctica 4 · Ej. 1(a)',
    enunciado: R`Hallar el polinomio característico, autovalores y autovectores de $A=\begin{pmatrix}0&a\\-a&0\end{pmatrix}$, $a\in\mathbb{R}$, $a\neq0$, sobre $\mathbb{R}$ y sobre $\mathbb{C}$.`,
    idea: 'Calcular det(A − λI) y ver si tiene raíces en cada cuerpo.',
    pasos: [
      { idea: 'Polinomio característico', detalle: R`<p>$\det(A-\lambda I)=\begin{vmatrix}-\lambda&a\\-a&-\lambda\end{vmatrix}=\lambda^2+a^2$.</p>` },
      { idea: 'Sobre ℝ', detalle: R`<p>$\lambda^2+a^2>0$ para todo $\lambda$ real (con $a\neq0$): <b>no hay autovalores reales</b>. Geométricamente, $A$ es $a$ por una rotación de 90°: ninguna recta queda fija.</p>` },
      { idea: 'Sobre ℂ: autovalores', detalle: R`<p>$\lambda=\pm ia$.</p>` },
      { idea: 'Autovectores', detalle: R`<p>Para $\lambda=ia$: $(A-iaI)v=0$ da $-iav_1+av_2=0$, o sea $v_2=iv_1$: $v=(1,i)$. Para $\lambda=-ia$: $v_2=-iv_1$, $v=(1,-i)$. Como los autovalores son distintos, $A$ es diagonalizable sobre $\mathbb{C}$ pero no sobre $\mathbb{R}$. $\blacksquare$</p>` },
    ],
    conclusion: 'La existencia de autovalores depende del cuerpo: antes de calcular hay que decir en cuál se trabaja.',
  },
  {
    fuente: 'Práctica 4 · Ej. 3',
    enunciado: R`Fibonacci: $F_0=0,\ F_1=1,\ F_{n+1}=F_n+F_{n-1}$. Hallar $A$ con $\binom{F_n}{F_{n+1}}=A\binom{F_{n-1}}{F_n}$, diagonalizarla y obtener una fórmula cerrada para $F_n$.`,
    idea: 'La recursión es lineal en el vector (Fₙ, Fₙ₊₁); A^n se calcula diagonalizando.',
    pasos: [
      { idea: 'Matriz', detalle: R`<p>$A=\begin{pmatrix}0&1\\1&1\end{pmatrix}$ (la primera fila copia $F_n$, la segunda calcula $F_{n+1}=F_{n-1}+F_n$). Iterando, $\binom{F_n}{F_{n+1}}=A^n\binom01$.</p>` },
      { idea: 'Autovalores', detalle: R`<p>$p_A(\lambda)=\lambda^2-\lambda-1$, raíces $\varphi=\tfrac{1+\sqrt5}2$ y $\psi=\tfrac{1-\sqrt5}2$ (distintas ⇒ diagonalizable).</p>` },
      { idea: 'Autovectores', detalle: R`<p>$(A-\lambda I)v=0$: $-\lambda v_1+v_2=0\Rightarrow v=(1,\lambda)$. Entonces $v_\varphi=(1,\varphi)$ y $v_\psi=(1,\psi)$; $A=CDC^{-1}$ con $C=\begin{pmatrix}1&1\\\varphi&\psi\end{pmatrix}$, $D=\operatorname{diag}(\varphi,\psi)$.</p>` },
      { idea: 'Descomponer el dato inicial', detalle: R`<p>$(0,1)=c_1(1,\varphi)+c_2(1,\psi)$: $c_1+c_2=0$ y $c_1\varphi+c_2\psi=1\Rightarrow c_1=\tfrac1{\varphi-\psi}=\tfrac1{\sqrt5}$, $c_2=-\tfrac1{\sqrt5}$.</p>` },
      { idea: 'Fórmula', detalle: R`<p>$A^n(0,1)^t=c_1\varphi^nv_\varphi+c_2\psi^nv_\psi$ y la primera coordenada es $F_n=\dfrac{\varphi^n-\psi^n}{\sqrt5}$. Chequeo: $n=1$: $\tfrac{\varphi-\psi}{\sqrt5}=1$ ✓; $n=2$: $\tfrac{\varphi^2-\psi^2}{\sqrt5}=\varphi+\psi=1$ ✓. $\blacksquare$</p>` },
    ],
    conclusion: 'Como |ψ| < 1, F_n es el entero más cercano a φⁿ/√5 y F_{n+1}/F_n → φ.',
  },
  {
    fuente: 'Práctica 4 · Ej. 7(a)',
    enunciado: R`Sea $A\in\mathbb{R}^{3\times3}$ diagonalizable con $\operatorname{tr}A=-4$ y tal que los autovalores de $A^2+2A$ son $-1,3,8$. Hallar los autovalores de $A$.`,
    idea: 'Si λ es autovalor de A, λ²+2λ lo es de A²+2A; invertir el polinomio y usar la traza.',
    pasos: [
      { idea: 'Relación', detalle: R`<p>Con $p(t)=t^2+2t$: los autovalores de $p(A)$ son $p(\lambda_i)$. Al ser $A$ diagonalizable, $p(A)$ tiene exactamente los $p(\lambda_1),p(\lambda_2),p(\lambda_3)$ (con multiplicidad), que son $-1,3,8$ en algún orden.</p>` },
      { idea: 'Invertir p', detalle: R`<p>$\lambda^2+2\lambda=\mu\iff\lambda=-1\pm\sqrt{1+\mu}$. Para $\mu=-1$: $\lambda=-1$. Para $\mu=3$: $\lambda\in\{1,-3\}$. Para $\mu=8$: $\lambda\in\{2,-4\}$.</p>` },
      { idea: 'Usar la traza', detalle: R`<p>$\lambda_1+\lambda_2+\lambda_3=-4$ con $\lambda_1=-1$: $\lambda_2+\lambda_3=-3$. Combinaciones: $1+2=3$, $1-4=-3$ ✓, $-3+2=-1$, $-3-4=-7$.</p>` },
      { idea: 'Conclusión', detalle: R`<p>Los autovalores de $A$ son $-1,\ 1,\ -4$. Chequeo: $p(-1)=-1$, $p(1)=3$, $p(-4)=8$ ✓. $\blacksquare$</p>` },
    ],
    conclusion: 'Invertir un polinomio da dos candidatos por autovalor; la traza (o el determinante) desambigua.',
  },
  {
    fuente: 'Práctica 4 · Ej. 7(b)',
    enunciado: R`Sea $A\in\mathbb{R}^{4\times4}$ con $\det A=6$, autovalores $1$ y $-2$, y tal que $-4$ es autovalor de $A-3I$. Hallar los autovalores restantes.`,
    idea: 'Los autovalores de A − 3I son los de A menos 3; el determinante es el producto.',
    pasos: [
      { idea: 'Tercer autovalor', detalle: R`<p>Si $-4$ es autovalor de $A-3I$, entonces $-4+3=-1$ es autovalor de $A$.</p>` },
      { idea: 'Cuarto autovalor', detalle: R`<p>$\det A=\lambda_1\lambda_2\lambda_3\lambda_4=1\cdot(-2)\cdot(-1)\cdot\lambda_4=2\lambda_4=6\Rightarrow\lambda_4=3$.</p>` },
      { idea: 'Resultado', detalle: R`<p>Los autovalores son $1,-2,-1,3$. $\blacksquare$</p>` },
    ],
    conclusion: 'Traza = suma y determinante = producto de los autovalores (contados con multiplicidad).',
  },
  {
    fuente: 'Práctica 4 · Ej. 9',
    enunciado: R`Un proyector es una TL con $f(f(x))=f(x)$. Probar que sus únicos autovalores posibles son $0$ y $1$.`,
    idea: 'Aplicar f dos veces a un autovector.',
    pasos: [
      { idea: 'Planteo', detalle: R`<p>Sea $f(v)=\lambda v$ con $v\neq0$.</p>` },
      { idea: 'Aplicar f otra vez', detalle: R`<p>$f(f(v))=f(\lambda v)=\lambda f(v)=\lambda^2v$. Pero $f(f(v))=f(v)=\lambda v$ por ser proyector.</p>` },
      { idea: 'Concluir', detalle: R`<p>Entonces $\lambda^2v=\lambda v$ y como $v\neq0$, $\lambda^2=\lambda$, o sea $\lambda\in\{0,1\}$. $\blacksquare$</p>` },
    ],
    conclusion: 'Además un proyector es diagonalizable: R^n = Nu(f) ⊕ Im(f), con autovalores 0 y 1 respectivamente.',
  },
  {
    fuente: 'Práctica 4 · Ej. 10',
    enunciado: R`Sea $f:\mathbb{R}^3\to\mathbb{R}^3$ con $[f]=\begin{pmatrix}-3&2&0\\-6&4&0\\-9&6&0\end{pmatrix}$. Probar que es un proyector y hallar una base $B$ en la que $[f]_{BB}$ sea diagonal.`,
    idea: 'Calcular A² = A; una base de Im (autovalor 1) y una de Nu (autovalor 0).',
    pasos: [
      { idea: 'A² = A', detalle: R`<p>Fila 1 por columnas de $A$: $(-3,2,0)\cdot(-3,-6,-9)=9-12=-3$; $\cdot(2,4,6)=-6+8=2$; $\cdot(0,0,0)=0$ (se repite la fila 1). Análogamente filas 2 y 3: $(-6,4,0)\cdot(-3,-6,-9)=18-24=-6$ y $(-9,6,0)\cdot(-3,-6,-9)=27-36=-9$. Entonces $A^2=A$.</p>` },
      { idea: 'Imagen (autovalor 1)', detalle: R`<p>Las columnas son múltiplos de $(1,2,3)$: $\operatorname{Im}f=\langle(1,2,3)\rangle$. Chequeo: $A(1,2,3)=(-3+4,\,-6+8,\,-9+12)=(1,2,3)$ ✓.</p>` },
      { idea: 'Núcleo (autovalor 0)', detalle: R`<p>Todas las filas son múltiplos de $(-3,2,0)$: $\operatorname{Nu}f=\{-3x+2y=0\}$, base $\{(2,3,0),(0,0,1)\}$.</p>` },
      { idea: 'Base diagonalizante', detalle: R`<p>$B=\{(1,2,3),(2,3,0),(0,0,1)\}$ es base de $\mathbb{R}^3$ (reúne bases de $\operatorname{Im}$ y $\operatorname{Nu}$, con $\operatorname{Im}\cap\operatorname{Nu}=0$) y $[f]_{BB}=\operatorname{diag}(1,0,0)$. $\blacksquare$</p>` },
    ],
    conclusion: 'La dimensión de la imagen (1) es el número de autovalores 1: rango = traza para un proyector (−3 + 4 + 0 = 1).',
  },
];
