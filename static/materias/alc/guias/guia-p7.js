// materias/alc/guias/guia-p7.js — ejercicios resueltos de la Práctica 7 (2C 2026).
const R = String.raw;

export const GUIA_P7 = [
  {
    fuente: 'Práctica 7 · Ej. 3',
    enunciado: R`Sea $A=\begin{pmatrix}64&-6\\6&-1\end{pmatrix}$, $b=(1,2)^t$. (a) Probar que Jacobi converge para todo dato inicial. (b) Hallar $\|J\|_1,\|J\|_\infty,\|J\|_2$ de la matriz de iteración $J$: ¿contradice (a)? (c) Hallar una norma con $\|J\|<1$.`,
    idea: 'Convergencia ⇔ ρ(J) < 1; las normas usuales pueden ser > 1 igual.',
    pasos: [
      { idea: 'Matriz de iteración', detalle: R`<p>$D=\operatorname{diag}(64,-1)$, $L+U=\begin{pmatrix}0&-6\\6&0\end{pmatrix}$. $J=-D^{-1}(L+U)=\begin{pmatrix}0&\tfrac3{32}\\6&0\end{pmatrix}$.</p>` },
      { idea: '(a) Radio espectral', detalle: R`<p>$\lambda^2=\tfrac3{32}\cdot6=\tfrac9{16}\Rightarrow\lambda=\pm\tfrac34$. $\rho(J)=\tfrac34<1$: Jacobi converge para todo dato inicial.</p>` },
      { idea: '(b) Normas', detalle: R`<p>$\|J\|_1$ (máx. columna) $=\max(6,\tfrac3{32})=6$; $\|J\|_\infty$ (máx. fila) $=\max(\tfrac3{32},6)=6$; $J^tJ=\operatorname{diag}(36,\tfrac9{1024})$, $\|J\|_2=6$. Son todas $>1$ pero <b>no contradicen</b> (a): $\rho(J)\le\|J\|$ da solo $\tfrac34\le6$, y una norma $>1$ no prueba divergencia.</p>` },
      { idea: '(c) Norma adaptada', detalle: R`<p>Autovectores: $\lambda=\tfrac34$: $\tfrac3{32}y=\tfrac34x\Rightarrow y=8x$, $v_1=(1,8)$; $\lambda=-\tfrac34$: $v_2=(1,-8)$. Con $C=(v_1|v_2)$ se define $\|x\|_*=\|C^{-1}x\|_\infty$. Entonces $\|J\|_*=\|C^{-1}JC\|_\infty=\|\operatorname{diag}(\tfrac34,-\tfrac34)\|_\infty=\tfrac34<1$. $\blacksquare$</p>` },
    ],
    conclusion: 'Siempre hay una norma con ‖J‖ < ρ(J) + ε: el radio espectral es el ínfimo de las normas inducidas.',
  },
  {
    fuente: 'Práctica 7 · Ej. 5(a)',
    enunciado: R`Decidir si Jacobi y Gauss–Seidel convergen para $\begin{pmatrix}3&1&1\\2&6&1\\1&1&4\end{pmatrix}x=\begin{pmatrix}5\\9\\6\end{pmatrix}$, resolver y comparar cuál converge más rápido.`,
    idea: 'Dominancia diagonal estricta garantiza ambos; luego iterar un par de veces a mano.',
    pasos: [
      { idea: 'Dominancia diagonal', detalle: R`<p>$3>1+1$, $6>2+1$, $4>1+1$: estrictamente diagonal dominante por filas. Entonces Jacobi converge ($\|B_J\|_\infty<1$) y también Gauss–Seidel. $A$ no es simétrica, así que no se puede aplicar el criterio SPD.</p>` },
      { idea: 'Solución exacta', detalle: R`<p>Se prueba $x=(1,1,1)$: $3+1+1=5$, $2+6+1=9$, $1+1+4=6$ ✓. Es la solución única.</p>` },
      { idea: 'Jacobi desde 0', detalle: R`<p>$x^{(1)}=(\tfrac53,\tfrac96,\tfrac64)=(1{,}667;\,1{,}5;\,1{,}5)$. $x^{(2)}=\big(\tfrac{5-1{,}5-1{,}5}3,\ \tfrac{9-2(1{,}667)-1{,}5}6,\ \tfrac{6-1{,}667-1{,}5}4\big)=(0{,}667;\,0{,}694;\,0{,}708)$.</p>` },
      { idea: 'Gauss–Seidel desde 0', detalle: R`<p>$x^{(1)}$: $x_1=\tfrac53=1{,}667$; $x_2=\tfrac{9-2(1{,}667)}6=0{,}944$; $x_3=\tfrac{6-1{,}667-0{,}944}4=0{,}847$. $x^{(2)}$: $x_1=\tfrac{5-0{,}944-0{,}847}3=1{,}069$; $x_2=\tfrac{9-2(1{,}069)-0{,}847}6=1{,}002$; $x_3=\tfrac{6-1{,}069-1{,}002}4=0{,}982$.</p>` },
      { idea: 'Comparar', detalle: R`<p>Después de 2 pasos, GS está a $\approx0{,}07$ de $(1,1,1)$ y Jacobi a $\approx0{,}33$: Gauss–Seidel converge más rápido (usa lo recién calculado). $\blacksquare$</p>` },
    ],
    conclusion: 'En matrices diagonal dominantes GS suele converger ≈ el doble de rápido que Jacobi (ρ_GS ≈ ρ_J²).',
  },
  {
    fuente: 'Práctica 7 · Ej. 8',
    enunciado: R`Sean $A=\begin{pmatrix}a&c&0\\c&a&c\\0&c&a\end{pmatrix}$ y $B=\begin{pmatrix}0&b&0\\b&0&b\\0&b&0\end{pmatrix}$. (a) Probar $\lim B^n=0\iff|b|<\tfrac{\sqrt2}2$. (b) Condiciones sobre $a,c$ para que Jacobi converja en $Ax=v$.`,
    idea: 'B es simétrica: B^n → 0 ⇔ ρ(B) < 1. Calcular sus autovalores.',
    pasos: [
      { idea: 'Autovalores de B', detalle: R`<p>Desarrollando $\det(B-\lambda I)$ por la primera fila: $-\lambda\big(\lambda^2-b^2\big)-b\big(b\cdot(-\lambda)-0\big)=-\lambda^3+2b^2\lambda=-\lambda(\lambda^2-2b^2)$. Autovalores: $0,\ \pm\sqrt2\,b$.</p>` },
      { idea: '(a)', detalle: R`<p>Como $B$ es simétrica (diagonalizable), $B^n\to0\iff\rho(B)<1\iff\sqrt2|b|<1\iff|b|<\tfrac{\sqrt2}2$.</p>` },
      { idea: '(b) Matriz de Jacobi', detalle: R`<p>Si $a\neq0$: $J=-D^{-1}(L+U)=-\tfrac1a\begin{pmatrix}0&c&0\\c&0&c\\0&c&0\end{pmatrix}$, que es $B$ con $b=-c/a$.</p>` },
      { idea: 'Condición', detalle: R`<p>Jacobi converge $\iff\rho(J)<1\iff\sqrt2\,|c/a|<1\iff a\neq0\ \text{y}\ |c|<\tfrac{|a|}{\sqrt2}$. (Si $a=0$, $D$ no es inversible y Jacobi no está definido.) $\blacksquare$</p>` },
    ],
    conclusion: 'Las matrices tridiagonales con diagonal constante tienen autovalores conocidos: a + 2c cos(kπ/(n+1)).',
  },
  {
    fuente: 'Práctica 7 · Ej. 12(a)(b)',
    enunciado: R`Dada $f(x,y)=\alpha x^2+\beta y^2+\gamma xy+\delta x+\varepsilon y+\eta$, probar que $f=\tfrac12x^tAx-b^tx+\eta$ para cierta $A$ simétrica, y que sus puntos críticos son las soluciones de $Ax=b$.`,
    idea: 'Identificar coeficientes y derivar.',
    pasos: [
      { idea: 'Forma matricial', detalle: R`<p>Con $A=\begin{pmatrix}2\alpha&\gamma\\\gamma&2\beta\end{pmatrix}$ (simétrica) y $b=(-\delta,-\varepsilon)^t$: $\tfrac12x^tAx=\tfrac12(2\alpha x^2+2\gamma xy+2\beta y^2)=\alpha x^2+\gamma xy+\beta y^2$ y $-b^tx=\delta x+\varepsilon y$. Sumando $\eta$ se recupera $f$.</p>` },
      { idea: 'Gradiente', detalle: R`<p>$\partial_xf=2\alpha x+\gamma y+\delta$ y $\partial_yf=\gamma x+2\beta y+\varepsilon$. En forma vectorial: $\nabla f=Ax-b$ (las filas de $A$ por $(x,y)$ más $(\delta,\varepsilon)=-b$).</p>` },
      { idea: 'Puntos críticos', detalle: R`<p>$\nabla f(x)=0\iff Ax=b$. $\blacksquare$</p>` },
      { idea: 'Clasificación (por qué sirve)', detalle: R`<p>La Hessiana es $A$: si $A$ es definida positiva el único punto crítico es un mínimo; si $\lambda_1<0<\lambda_2$ es un punto silla. Por eso resolver $Ax=b$ con $A$ SPD es lo mismo que minimizar $f$.</p>` },
    ],
    conclusion: 'Este es el puente que justifica el método del gradiente: resolver el sistema = bajar al fondo del valle.',
  },
];
