// materias/alc/guias/guia-p3.js — ejercicios resueltos de la Práctica 3 (2C 2026).
const R = String.raw;

export const GUIA_P3 = [
  {
    fuente: 'Práctica 3 · Ej. 2',
    enunciado: R`Sea $A=\begin{pmatrix}1&-1&0&1\\0&1&4&0\\2&-1&0&-2\\-3&3&0&-1\end{pmatrix}$. Hallar su descomposición $LU$ y usarla para resolver $Ax=b$ con $b=(1,-7,-5,1)^t$.`,
    idea: 'Eliminar columna por columna guardando los multiplicadores en L.',
    pasos: [
      { idea: 'Columna 1', detalle: R`<p>$F_3\leftarrow F_3-2F_1$ ($\ell_{31}=2$) y $F_4\leftarrow F_4+3F_1$ ($\ell_{41}=-3$). Quedan las filas $F_3=(0,1,0,-4)$ y $F_4=(0,0,0,2)$.</p>` },
      { idea: 'Columna 2', detalle: R`<p>$F_3\leftarrow F_3-F_2$ ($\ell_{32}=1$) da $F_3=(0,0,-4,-4)$. En $F_4$ el elemento de la columna 2 ya es 0: $\ell_{42}=0$.</p>` },
      { idea: 'Columna 3', detalle: R`<p>El elemento de $F_4$ en la columna 3 es 0, $\ell_{43}=0$.</p>` },
      { idea: 'Armar L y U', detalle: R`<p>$L=\begin{pmatrix}1&0&0&0\\0&1&0&0\\2&1&1&0\\-3&0&0&1\end{pmatrix}$, $U=\begin{pmatrix}1&-1&0&1\\0&1&4&0\\0&0&-4&-4\\0&0&0&2\end{pmatrix}$. Verificación: fila 3 de $LU$ $=2F_1+F_2+U_3=(2,-2,0,2)+(0,1,4,0)+(0,0,-4,-4)=(2,-1,0,-2)$ ✓.</p>` },
      { idea: 'Ly = b', detalle: R`<p>$y_1=1$; $y_2=-7$; $y_3=-5-2\cdot1-1\cdot(-7)=0$; $y_4=1+3\cdot1=4$.</p>` },
      { idea: 'Ux = y', detalle: R`<p>$x_4=4/2=2$; $-4x_3-4x_4=0\Rightarrow x_3=-2$; $x_2+4x_3=-7\Rightarrow x_2=1$; $x_1-x_2+x_4=1\Rightarrow x_1=0$. Entonces $x=(0,1,-2,2)^t$.</p>` },
      { idea: 'Verificar en A', detalle: R`<p>Fila 1: $0-1+0+2=1$ ✓; fila 2: $1-8=-7$ ✓; fila 3: $-1-4=-5$ ✓; fila 4: $3-2=1$ ✓. $\blacksquare$</p>` },
    ],
    conclusion: 'Con la factorización guardada, otro b solo cuesta dos sustituciones triangulares (O(n²)).',
  },
  {
    fuente: 'Práctica 3 · Ej. 8',
    enunciado: R`Resolver $10^{-3}x+2y=8$, $\ x+y=2$ por eliminación con aritmética de 3 dígitos y redondeo. (a) Sin pivoteo, ¿difiere mucho de la solución real? (b) Repetir con el pivote más conveniente.`,
    idea: 'Hacer las cuentas redondeando a 3 cifras significativas después de cada operación.',
    pasos: [
      { idea: 'Solución exacta', detalle: R`<p>$x=2-y$ en la primera: $0{,}002+1{,}999y=8\Rightarrow y=\tfrac{7{,}998}{1{,}999}\approx4{,}0005$ y $x\approx-2{,}0005$.</p>` },
      { idea: '(a) Sin pivoteo', detalle: R`<p>$m=1/10^{-3}=1000$. $F_2\leftarrow F_2-1000F_1$: coeficiente de $y$: $1-2000=-1999\to-2000$ (3 dígitos); término independiente: $2-8000=-7998\to-8000$. Entonces $y=\tfrac{-8000}{-2000}=4{,}00$. Luego $x=\tfrac{8-2\cdot4{,}00}{10^{-3}}=0$. Compare con $x\approx-2$: <b>error enorme</b> en $x$.</p>` },
      { idea: '(b) Con pivoteo (intercambiar filas)', detalle: R`<p>Ahora el pivote es $1$ y $m=10^{-3}$. $F_2\leftarrow F_2-10^{-3}F_1$: coeficiente de $y$: $2-0{,}001=1{,}999\to2{,}00$; término independiente: $8-0{,}002=7{,}998\to8{,}00$. $y=4{,}00$ y $x=2-4{,}00=-2{,}00$. Error del orden de $5\times10^{-4}$. $\blacksquare$</p>` },
    ],
    conclusion: 'Un pivote pequeño genera un multiplicador enorme que "tapa" los datos originales; el pivoteo parcial lo evita.',
  },
  {
    fuente: 'Práctica 3 · Ej. 9',
    enunciado: R`Mostrar que $A=\begin{pmatrix}4&2&-2\\2&5&5\\-2&5&11\end{pmatrix}$ es definida positiva y calcular su descomposición de Cholesky.`,
    idea: 'Probar menores principales > 0 y construir L columna a columna.',
    pasos: [
      { idea: 'Menores principales', detalle: R`<p>$4>0$; $\begin{vmatrix}4&2\\2&5\end{vmatrix}=16>0$; $\det A=4(55-25)-2(22+10)+(-2)(10+10)=120-64-40=16>0$. $A$ es simétrica con todos los menores principales positivos, luego definida positiva.</p>` },
      { idea: 'Columna 1 de L', detalle: R`<p>$\ell_{11}=\sqrt4=2$; $\ell_{21}=2/2=1$; $\ell_{31}=-2/2=-1$.</p>` },
      { idea: 'Columna 2', detalle: R`<p>$\ell_{22}=\sqrt{5-1^2}=2$; $\ell_{32}=\dfrac{5-\ell_{31}\ell_{21}}{\ell_{22}}=\dfrac{5+1}{2}=3$.</p>` },
      { idea: 'Columna 3', detalle: R`<p>$\ell_{33}=\sqrt{11-(-1)^2-3^2}=\sqrt1=1$.</p>` },
      { idea: 'Verificar', detalle: R`<p>$L=\begin{pmatrix}2&0&0\\1&2&0\\-1&3&1\end{pmatrix}$. Entre otros, $(LL^t)_{23}=1\cdot(-1)+2\cdot3=5$ ✓ y $(LL^t)_{33}=1+9+1=11$ ✓. $\blacksquare$</p>` },
    ],
    conclusion: 'Cholesky cuesta ≈ la mitad que LU y es estable sin pivoteo; si la raíz diera negativa, A no sería definida positiva.',
  },
  {
    fuente: 'Práctica 3 · Ej. 15(iii)',
    enunciado: R`Construir un proyector $f:\mathbb{R}^3\to\mathbb{R}^3$ con $\operatorname{Nu}(f)=\{3x_1-x_3=0\}$ e $\operatorname{Im}(f)=\langle(1,1,1)\rangle$.`,
    idea: 'Un proyector vale 0 en el núcleo y es la identidad en la imagen; dar una base adaptada.',
    pasos: [
      { idea: 'Base adaptada', detalle: R`<p>$\operatorname{Nu}f=\{x_3=3x_1\}$ tiene base $\{(1,0,3),(0,1,0)\}$. El vector $(1,1,1)$ cumple $3\cdot1-1=2\neq0$, luego $(1,1,1)\notin\operatorname{Nu}f$ y $\{(1,1,1),(1,0,3),(0,1,0)\}$ es base de $\mathbb{R}^3$.</p>` },
      { idea: 'Definir f', detalle: R`<p>$f(1,1,1)=(1,1,1)$ y $f(1,0,3)=f(0,1,0)=0$. Esto determina $f$ y cumple $f\circ f=f$ (es idéntica en la imagen).</p>` },
      { idea: 'Fórmula', detalle: R`<p>Sea $\lambda(x)=\tfrac{3x_1-x_3}{2}$: es lineal, se anula en $\operatorname{Nu}f$ y $\lambda(1,1,1)=1$. Entonces $f(x)=\lambda(x)\,(1,1,1)$, o sea $[f]=\tfrac12\begin{pmatrix}3&0&-1\\3&0&-1\\3&0&-1\end{pmatrix}$.</p>` },
      { idea: 'Chequeo', detalle: R`<p>$f(1,1,1)=\lambda(1,1,1)(1,1,1)=(1,1,1)$ ✓ y $f^2(x)=\lambda(x)\,\lambda(1,1,1)\,(1,1,1)=f(x)$ ✓. $\blacksquare$</p>` },
    ],
    conclusion: 'No es ortogonal: Im(f)^⊥ ≠ Nu(f) (el vector normal (3,0,−1) no es múltiplo de (1,1,1)).',
  },
  {
    fuente: 'Práctica 3 · Ej. 20(a)',
    enunciado: R`Hallar la factorización $QR$ de $A=\begin{pmatrix}0&-4\\0&0\\-5&-2\end{pmatrix}$.`,
    idea: 'Gram–Schmidt sobre las columnas.',
    pasos: [
      { idea: 'Primera columna', detalle: R`<p>$a_1=(0,0,-5)$, $r_{11}=\|a_1\|=5$, $q_1=(0,0,-1)$.</p>` },
      { idea: 'Segunda columna', detalle: R`<p>$r_{12}=\langle a_2,q_1\rangle=(-4,0,-2)\cdot(0,0,-1)=2$. $\tilde q_2=a_2-2q_1=(-4,0,-2)-(0,0,-2)=(-4,0,0)$, $r_{22}=4$, $q_2=(-1,0,0)$.</p>` },
      { idea: 'Armar y verificar', detalle: R`<p>$Q=\begin{pmatrix}0&-1\\0&0\\-1&0\end{pmatrix}$, $R=\begin{pmatrix}5&2\\0&4\end{pmatrix}$. Segunda columna de $QR$: $2q_1+4q_2=(0,0,-2)+(-4,0,0)=(-4,0,-2)=a_2$ ✓. $\blacksquare$</p>` },
    ],
    conclusion: 'Q (3×2) tiene columnas ortonormales; R es triangular superior con diagonal positiva.',
  },
  {
    fuente: 'Práctica 3 · Ej. 20(b)',
    enunciado: R`Hallar la factorización $QR$ de $A=\begin{pmatrix}3&2\\4&5\end{pmatrix}$.`,
    idea: 'Gram–Schmidt; controlar con |det A| = r₁₁r₂₂.',
    pasos: [
      { idea: 'q₁', detalle: R`<p>$a_1=(3,4)$, $r_{11}=5$, $q_1=(\tfrac35,\tfrac45)$.</p>` },
      { idea: 'q₂', detalle: R`<p>$r_{12}=\langle a_2,q_1\rangle=\tfrac{6+20}5=\tfrac{26}5$. $\tilde q_2=(2,5)-\tfrac{26}5(\tfrac35,\tfrac45)=(\tfrac{50-78}{25},\tfrac{125-104}{25})=(-\tfrac{28}{25},\tfrac{21}{25})$. $r_{22}=\tfrac{\sqrt{784+441}}{25}=\tfrac{35}{25}=\tfrac75$ y $q_2=(-\tfrac45,\tfrac35)$.</p>` },
      { idea: 'Control', detalle: R`<p>$R=\begin{pmatrix}5&26/5\\0&7/5\end{pmatrix}$ y $\det A=15-8=7=5\cdot\tfrac75$ ✓. $\blacksquare$</p>` },
    ],
    conclusion: 'Como Q es ortogonal, |det A| = |det R| = producto de los r_ii.',
  },
];
