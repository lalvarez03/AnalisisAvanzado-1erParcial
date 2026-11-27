// materias/alc/resultados.js — checklist de teoremas/propiedades por página de teoría.
// Cada ítem: n (nombre), ref (apunte Acosta–Laplagne), e (enunciado), p (demostración), x (ejemplo de uso paso a paso, opcional).
const R = String.raw; // con String.raw el LaTeX se escribe con una sola barra invertida

export const RESULTADOS = {
  'alc-espacios': [
    {
      n: 'Dimensión de la suma de subespacios', ref: 'Cap. 1 §3',
      e: R`$\dim(S+T)=\dim S+\dim T-\dim(S\cap T)$. La suma es directa $\iff S\cap T=\{0\}$.`,
      p: R`<p>Se toma una base $\{w_i\}$ de $S\cap T$, se extiende a bases $\{w_i,s_j\}$ de $S$ y $\{w_i,t_l\}$ de $T$ y se prueba que $\{w_i,s_j,t_l\}$ es base de $S+T$: genera por construcción; es independiente porque una combinación nula obliga a $\sum c_lt_l\in S\cap T$, de donde $c_l=0$ y luego los demás coeficientes se anulan. Contando elementos sale la fórmula. $\blacksquare$</p>`,
      x: {
        enunciado: R`En $\mathbb{R}^3$, $S=\{3x-2y+z=0\}$ y $T=\{x+z=0\}$. Hallar $\dim(S\cap T)$ y $\dim(S+T)$.`,
        idea: 'Cada subespacio es un plano (dim 2); si son distintos, su suma es todo R³.',
        pasos: [
          { idea: 'Dimensiones', detalle: R`<p>$S$ y $T$ son núcleos de una ecuación no nula en $\mathbb{R}^3$: $\dim S=\dim T=2$.</p>` },
          { idea: 'Intersección', detalle: R`<p>El sistema $3x-2y+z=0,\ x+z=0$ tiene rango 2, luego $\dim(S\cap T)=3-2=1$ (es la recta generada por $(1,1,-1)$: de $x+z=0$ sale $z=-x$ y reemplazando, $2x-2y=0$).</p>` },
          { idea: 'Aplicar la fórmula', detalle: R`<p>$\dim(S+T)=2+2-1=3$, entonces $S+T=\mathbb{R}^3$ (porque es un subespacio de dimensión 3). La suma <b>no</b> es directa.</p>` },
        ],
        conclusion: 'Dos planos distintos por el origen en R³ se cortan en una recta y suman todo el espacio.',
      },
    },
    {
      n: 'La unión de subespacios es subespacio solo si uno contiene al otro', ref: 'Cap. 1 §3 · Ej. 9',
      e: R`$S\cup T$ es subespacio de $V$ $\iff$ $S\subseteq T$ o $T\subseteq S$.`,
      p: R`<p>(⇐) Si $S\subseteq T$ entonces $S\cup T=T$, subespacio.</p><p>(⇒) Supongamos $S\not\subseteq T$ y $T\not\subseteq S$: existen $s\in S\setminus T$ y $t\in T\setminus S$. Como $s,t\in S\cup T$ que es subespacio, $s+t\in S\cup T$. Si $s+t\in S$, entonces $t=(s+t)-s\in S$, contradicción. Si $s+t\in T$, entonces $s=(s+t)-t\in T$, contradicción. $\blacksquare$</p>`,
    },
  ],

  'alc-matrices': [
    {
      n: 'Determinante por bloques (complemento de Schur)', ref: 'Cap. 1 §4 · Ej. 20',
      e: R`Si $A$ es inversible, $\det\begin{pmatrix}A&B\\C&D\end{pmatrix}=\det A\cdot\det(D-CA^{-1}B)$. Si además $AC=CA$, $=\det(AD-CB)$.`,
      p: R`<p>Se factoriza $\begin{pmatrix}A&B\\C&D\end{pmatrix}=\begin{pmatrix}A&0\\C&I\end{pmatrix}\begin{pmatrix}I&A^{-1}B\\0&D-CA^{-1}B\end{pmatrix}$ (se verifica multiplicando) y se usa que el determinante de una triangular por bloques es el producto de los determinantes de los bloques diagonales. $\blacksquare$</p>`,
    },
    {
      n: 'Cambio de base', ref: 'Cap. 1 §5 · Ej. 15',
      e: R`Si $M_B=(b_1|\cdots|b_n)$, entonces $[v]_B=M_B^{-1}v$ y $C(B,B')=M_{B'}^{-1}M_B$ cumple $C(B,B')[v]_B=[v]_{B'}$.`,
      p: R`<p>$v=\sum x_ib_i=M_B[v]_B$, entonces $[v]_B=M_B^{-1}v$. Luego $[v]_{B'}=M_{B'}^{-1}v=M_{B'}^{-1}M_B[v]_B$. $\blacksquare$</p>`,
      x: {
        enunciado: R`En $\mathbb{R}^2$ sea $B=\{(1,0),(1,1)\}$. Hallar $[(3,2)]_B$.`,
        idea: 'Resolver v = x₁b₁ + x₂b₂, o calcular M_B⁻¹ v.',
        pasos: [
          { idea: 'Plantear', detalle: R`<p>$x_1(1,0)+x_2(1,1)=(3,2)$ da el sistema $x_1+x_2=3,\ x_2=2$.</p>` },
          { idea: 'Resolver', detalle: R`<p>$x_2=2$, $x_1=1$. Entonces $[(3,2)]_B=(1,2)$. Verificación: $1\cdot(1,0)+2\cdot(1,1)=(3,2)$. $\blacksquare$</p>` },
        ],
        conclusion: 'Las coordenadas dependen de la base; el vector es el mismo.',
      },
    },
  ],

  'alc-tl': [
    {
      n: 'Teorema de la dimensión', ref: 'Cap. 1 §6',
      e: R`Si $f:V\to W$ es lineal y $\dim V<\infty$: $\dim V=\dim\operatorname{Nu}(f)+\dim\operatorname{Im}(f)$. Además $f$ es inyectiva $\iff\operatorname{Nu}(f)=\{0\}$.`,
      p: R`<p>Se extiende una base $\{u_i\}$ de $\operatorname{Nu}f$ a una base $\{u_i,v_j\}$ de $V$ y se prueba que $\{f(v_j)\}$ es base de $\operatorname{Im}f$: genera porque $f(u_i)=0$; es independiente porque $\sum b_jf(v_j)=0\Rightarrow\sum b_jv_j\in\operatorname{Nu}f$, y entonces todos los $b_j=0$. $\blacksquare$</p>`,
      x: {
        enunciado: R`$f:\mathbb{R}^3\to\mathbb{R}^4$, $f(x_1,x_2,x_3)=(x_1+x_2,\,x_1+x_3,\,0,\,0)$. Hallar $\operatorname{Nu}f$, $\operatorname{Im}f$ y clasificar.`,
        idea: 'Núcleo: sistema homogéneo; imagen: lo que generan f(e_i); luego el teorema de la dimensión verifica.',
        pasos: [
          { idea: 'Núcleo', detalle: R`<p>$x_1+x_2=0,\ x_1+x_3=0\Rightarrow x=t(1,-1,-1)$. Entonces $\operatorname{Nu}f=\langle(1,-1,-1)\rangle$, $\dim=1$.</p>` },
          { idea: 'Imagen', detalle: R`<p>$f(e_1)=(1,1,0,0)$, $f(e_2)=(1,0,0,0)$, $f(e_3)=(0,1,0,0)$. Son generadores de $\operatorname{Im}f$; $f(e_1)=f(e_2)+f(e_3)$, así que $\operatorname{Im}f=\langle(1,0,0,0),(0,1,0,0)\rangle$, $\dim=2$.</p>` },
          { idea: 'Chequeo y clasificación', detalle: R`<p>$1+2=3=\dim\mathbb{R}^3$ ✓. Como $\operatorname{Nu}f\neq\{0\}$ no es monomorfismo; como $\dim\operatorname{Im}f=2<4$ no es epimorfismo. $\blacksquare$</p>` },
        ],
        conclusion: 'Ni inyectiva ni suryectiva: el núcleo mide lo que se aplasta y la imagen lo que se cubre.',
      },
    },
    {
      n: 'Una TL queda determinada por su valor en una base', ref: 'Cap. 1 §6 · Ej. 3',
      e: R`Dada una base $\{v_i\}$ de $V$ y vectores $w_i\in W$, existe una única TL con $f(v_i)=w_i$.`,
      p: R`<p>Se define $f(\sum x_iv_i)=\sum x_iw_i$ (bien definida porque las coordenadas son únicas) y es lineal. Si $g$ cumple lo mismo, $g(\sum x_iv_i)=\sum x_ig(v_i)=\sum x_iw_i=f(\ldots)$. $\blacksquare$</p>`,
    },
  ],

  'alc-flotante': [
    {
      n: 'Error relativo del redondeo', ref: 'Cap. 2 §3',
      e: R`$\operatorname{fl}(x)=x(1+\delta)$ con $|\delta|\le u=\tfrac12\beta^{1-t}$.`,
      p: R`<p>La distancia entre números de máquina consecutivos en $[\beta^{e-1},\beta^e)$ es $\beta^{e-t}$; el redondeo comete error absoluto $\le\tfrac12\beta^{e-t}$ y $|x|\ge\beta^{e-1}$, de donde el error relativo es $\le\tfrac12\beta^{1-t}$. $\blacksquare$</p>`,
    },
    {
      n: 'Absorción', ref: 'Cap. 2 §3 · Ej. 7',
      e: R`Si $|q|<\tfrac{\varepsilon}{2}|p|$ (aprox.), entonces $\operatorname{fl}(p+q)=p$. Por eso $(p+q)-p$ puede dar $0$ aunque $q\neq0$ y la suma no es asociativa.`,
      p: R`<p>$p+q$ difiere de $p$ en menos de la mitad del espaciado de números de máquina alrededor de $p$ (que es $\approx\varepsilon|p|$); el redondeo al más cercano devuelve $p$. Para $p=10^{34}$ y $q=1$: $q/p=10^{-34}\ll\varepsilon/2\approx1{,}1\times10^{-16}$. $\blacksquare$</p>`,
    },
  ],

  'alc-normas': [
    {
      n: 'Desigualdad de Cauchy–Schwarz', ref: 'Cap. 3 §2',
      e: R`$|x^ty|\le\|x\|_2\|y\|_2$, con igualdad $\iff$ $x,y$ linealmente dependientes.`,
      p: R`<p>Para $y\neq0$ el polinomio $\|x-ty\|^2=\|x\|^2-2t\,x^ty+t^2\|y\|^2\ge0$ para todo $t$, así que su discriminante $4(x^ty)^2-4\|x\|^2\|y\|^2\le0$. La igualdad ocurre si y solo si existe $t$ con $x=ty$. $\blacksquare$</p>`,
    },
    {
      n: 'Constantes de equivalencia de normas', ref: 'Cap. 3 §1 · Ej. 11',
      e: R`$\|x\|_\infty\le\|x\|_2\le\sqrt n\|x\|_\infty$ y $\tfrac1{\sqrt n}\|x\|_1\le\|x\|_2\le\|x\|_1$.`,
      p: R`<p>$\|x\|_\infty^2=x_j^2\le\sum x_i^2\le n\|x\|_\infty^2$. Además $\sum x_i^2\le(\sum|x_i|)^2$ y, por Cauchy–Schwarz con $(1,..,1)$, $\sum|x_i|\le\sqrt n\|x\|_2$. $\blacksquare$</p>`,
    },
    {
      n: 'Normas matriciales inducidas ∞ y 1', ref: 'Cap. 3 §3 · Ej. 17',
      e: R`$\|A\|_\infty=\max_i\sum_j|a_{ij}|$ y $\|A\|_1=\max_j\sum_i|a_{ij}|$.`,
      p: R`<p>Para $\infty$: cota superior por la desigualdad triangular fila a fila; se alcanza con $x_j=\operatorname{sg}(a_{i_0j})$ en la fila $i_0$ de mayor suma. Para $1$: se usa $x=e_{j_0}$ (columna de mayor suma) y se acota $\sum_i|\sum_ja_{ij}x_j|\le\sum_j|x_j|\sum_i|a_{ij}|$. $\blacksquare$</p>`,
      x: {
        enunciado: R`Calcular $\|A\|_1$ y $\|A\|_\infty$ para $A=\begin{pmatrix}1&-2\\3&4\end{pmatrix}$.`,
        idea: 'Norma 1 = máxima suma de |columnas|; norma ∞ = máxima suma de |filas|.',
        pasos: [
          { idea: 'Columnas', detalle: R`<p>Col. 1: $|1|+|3|=4$. Col. 2: $|-2|+|4|=6$. Entonces $\|A\|_1=6$.</p>` },
          { idea: 'Filas', detalle: R`<p>Fila 1: $1+2=3$. Fila 2: $3+4=7$. Entonces $\|A\|_\infty=7$. $\blacksquare$</p>` },
        ],
        conclusion: 'No hay que maximizar sobre todos los x: las fórmulas lo resuelven.',
      },
    },
  ],

  'alc-condicion': [
    {
      n: 'Cotas de error por el número de condición', ref: 'Cap. 3 §4 · Ej. 19',
      e: R`$\dfrac1{\operatorname{cond}A}\dfrac{\|b-\tilde b\|}{\|b\|}\le\dfrac{\|x-\tilde x\|}{\|x\|}\le\operatorname{cond}A\dfrac{\|b-\tilde b\|}{\|b\|}$.`,
      p: R`<p>$x-\tilde x=A^{-1}(b-\tilde b)\Rightarrow\|x-\tilde x\|\le\|A^{-1}\|\|b-\tilde b\|$ y $\|b\|\le\|A\|\|x\|$. Para la cota inferior: $\|b-\tilde b\|\le\|A\|\|x-\tilde x\|$ y $\|x\|\le\|A^{-1}\|\|b\|$. Se dividen y multiplican las desigualdades. $\blacksquare$</p>`,
      x: {
        enunciado: R`Si $\operatorname{cond}_\infty(A)=10^4$ y los datos $b$ tienen error relativo $10^{-8}$, ¿qué se puede asegurar sobre el error relativo de $x$?`,
        idea: 'Aplicar la cota superior.',
        pasos: [{ idea: 'Aplicar el teorema', detalle: R`<p>$\dfrac{\|x-\tilde x\|}{\|x\|}\le10^4\cdot10^{-8}=10^{-4}$. $\blacksquare$</p>` }],
        conclusion: 'Se pierden hasta 4 dígitos de precisión: log₁₀ cond(A).',
      },
    },
    {
      n: 'Distancia relativa a una matriz singular', ref: 'Cap. 3 §4 · Ej. 21',
      e: R`$\dfrac1{\operatorname{cond}A}\le\dfrac{\|A-B\|}{\|A\|}$ para toda $B$ singular.`,
      p: R`<p>Con $Bz=0$, $z\neq0$: $z=A^{-1}(A-B)z\Rightarrow\|z\|\le\|A^{-1}\|\|A-B\|\|z\|\Rightarrow\|A-B\|\ge1/\|A^{-1}\|$. $\blacksquare$</p>`,
    },
  ],

  'alc-lu': [
    {
      n: 'Existencia y unicidad de LU', ref: 'Cap. 4 §2',
      e: R`Si los menores principales $A_{[1:k]}$, $k<n$, son inversibles, existe $A=LU$ con $\operatorname{diag}L=1$; si $A$ es inversible es única.`,
      p: R`<p>Inducción en $n$ planteando $A=\begin{pmatrix}A'&b\\c^t&d\end{pmatrix}=\begin{pmatrix}L'&0\\\ell^t&1\end{pmatrix}\begin{pmatrix}U'&u\\0&\mu\end{pmatrix}$, que se resuelve unívocamente. Unicidad: $L_2^{-1}L_1=U_2U_1^{-1}$ es a la vez triangular inferior con unos y triangular superior, o sea $I$. $\blacksquare$</p>`,
      x: {
        enunciado: R`Probar que $A=\begin{pmatrix}0&1&2\\1&1&0\\1&0&3\end{pmatrix}$ no admite LU y hallar $PA=LU$.`,
        idea: 'El primer pivote es 0; se intercambian filas.',
        pasos: [
          { idea: 'No existe LU', detalle: R`<p>Si $A=LU$, $a_{11}=\ell_{11}u_{11}=u_{11}=0$, y entonces $a_{21}=\ell_{21}u_{11}=0\neq1$. Contradicción.</p>` },
          { idea: 'Permutar filas 1 y 2', detalle: R`<p>$PA=\begin{pmatrix}1&1&0\\0&1&2\\1&0&3\end{pmatrix}$. Eliminación: $F_3\leftarrow F_3-F_1$ da $(0,-1,3)$; luego $F_3\leftarrow F_3+F_2$ da $(0,0,5)$.</p>` },
          { idea: 'Armar L y U', detalle: R`<p>$L=\begin{pmatrix}1&0&0\\0&1&0\\1&-1&1\end{pmatrix}$, $U=\begin{pmatrix}1&1&0\\0&1&2\\0&0&5\end{pmatrix}$. Verificación: $LU=PA$. $\blacksquare$</p>` },
        ],
        conclusion: 'Inversible no garantiza LU; con pivoteo parcial siempre existe PA = LU.',
      },
    },
    {
      n: 'Cholesky', ref: 'Cap. 4 §4 · Ej. 9–11',
      e: R`Si $A$ es simétrica definida positiva existe una única $L$ triangular inferior con diagonal positiva tal que $A=LL^t$.`,
      p: R`<p>Los menores principales de una definida positiva son definidos positivos, así que $A=LU$. Con $U=DU'$ y la simetría, $A=LDL^t$ con $d_i=\det A_i/\det A_{i-1}>0$, y se toma $L_c=LD^{1/2}$. $\blacksquare$</p>`,
    },
  ],

  'alc-ortogonal': [
    {
      n: 'Matrices ortogonales: cuatro caracterizaciones', ref: 'Cap. 3 §5 · Ej. 19',
      e: R`$Q^{-1}=Q^t\iff$ columnas ortonormales $\iff$ filas ortonormales $\iff\|Qx\|_2=\|x\|_2\ \forall x$.`,
      p: R`<p>$(Q^tQ)_{ij}=q_i^tq_j$ liga las dos primeras. Si $Q^tQ=I$, $\|Qx\|^2=x^tx$. Recíprocamente, por polarización $x^ty=\frac14(\|x+y\|^2-\|x-y\|^2)$ se obtiene $(Qx)^t(Qy)=x^ty$ y se evalúa en $e_i,e_j$. $\blacksquare$</p>`,
    },
    {
      n: 'Proyección ortogonal', ref: 'Cap. 3 §5 · Ej. 17, 24',
      e: R`Si las columnas de $Q$ son base ortonormal de $S$, $P_S=QQ^*$. Si $A$ tiene columnas l.i., $P_{\operatorname{Im}A}=A(A^*A)^{-1}A^*$.`,
      p: R`<p>$QQ^*$ es proyector ($(QQ^*)^2=Q(Q^*Q)Q^*=QQ^*$), fija a $S$ y $x-QQ^*x\perp S$. Con $A=QR$ ($R$ inversible), $A(A^*A)^{-1}A^*=QR(R^*R)^{-1}R^*Q^*=QQ^*$. $\blacksquare$</p>`,
      x: {
        enunciado: R`Hallar la matriz de la proyección ortogonal sobre $\operatorname{Im}(A)$, $A=\begin{pmatrix}1&0\\0&1\\1&0\end{pmatrix}$ (Práctica 3, Ej. 18).`,
        idea: 'Las columnas ya son ortogonales: se normalizan.',
        pasos: [
          { idea: 'Base ortonormal', detalle: R`<p>Col. 1 $=(1,0,1)$, $\|\cdot\|=\sqrt2$; col. 2 $=(0,1,0)$ ya es unitaria y es ortogonal a la primera. $q_1=\tfrac1{\sqrt2}(1,0,1)$, $q_2=(0,1,0)$.</p>` },
          { idea: 'P = q₁q₁ᵗ + q₂q₂ᵗ', detalle: R`<p>$P=\tfrac12\begin{pmatrix}1&0&1\\0&0&0\\1&0&1\end{pmatrix}+\begin{pmatrix}0&0&0\\0&1&0\\0&0&0\end{pmatrix}=\begin{pmatrix}\frac12&0&\frac12\\0&1&0\\\frac12&0&\frac12\end{pmatrix}$. Verificación: $P^2=P$ y $P^t=P$. $\blacksquare$</p>` },
        ],
        conclusion: 'Con base ortonormal la proyección se arma sumando proyecciones sobre cada eje.',
      },
    },
  ],

  'alc-autovalores': [
    {
      n: 'Autovectores de autovalores distintos son independientes', ref: 'Cap. 5 §2',
      e: R`Si $\lambda_1,\dots,\lambda_k$ son distintos, sus autovectores $v_1,..,v_k$ son l.i. Entonces $n$ autovalores distintos ⇒ diagonalizable.`,
      p: R`<p>Inducción: de $\sum c_iv_i=0$ se aplica $A-\lambda_kI$ y queda $\sum_{i<k}c_i(\lambda_i-\lambda_k)v_i=0$; por hipótesis, $c_i=0$ para $i<k$ y luego $c_k=0$. $\blacksquare$</p>`,
    },
    {
      n: 'Diagonalización', ref: 'Cap. 5 §3',
      e: R`$A$ diagonalizable $\iff$ hay una base de autovectores. Entonces $A=CDC^{-1}$ y $A^k=CD^kC^{-1}$.`,
      p: R`<p>$AC=CD\iff Av_i=\lambda_iv_i\ \forall i$ (comparando columnas), y $C$ inversible $\iff$ sus columnas son base. $\blacksquare$</p>`,
      x: {
        enunciado: R`Resolver $x'=6x+2y,\ y'=2x+3y$ con $x(0)=3,\ y(0)=-1$.`,
        idea: 'Diagonalizar la matriz del sistema; en las coordenadas de autovectores las ecuaciones se desacoplan.',
        pasos: [
          { idea: 'Autovalores', detalle: R`<p>$A=\begin{pmatrix}6&2\\2&3\end{pmatrix}$, $p_A=\lambda^2-9\lambda+14=(\lambda-7)(\lambda-2)$. Autovalores $7$ y $2$.</p>` },
          { idea: 'Autovectores', detalle: R`<p>$\lambda=7$: $(A-7I)v=0\Rightarrow-v_1+2v_2=0$, $v=(2,1)$. $\lambda=2$: $4v_1+2v_2=0$, $w=(1,-2)$.</p>` },
          { idea: 'Coordenadas del dato inicial', detalle: R`<p>$(3,-1)=a(2,1)+b(1,-2)$: $2a+b=3,\ a-2b=-1\Rightarrow a=1,\ b=1$.</p>` },
          { idea: 'Solución', detalle: R`<p>$(x,y)(t)=e^{7t}(2,1)+e^{2t}(1,-2)$, o sea $x=2e^{7t}+e^{2t}$, $y=e^{7t}-2e^{2t}$. Chequeo en $t=0$: $(3,-1)$ ✓. $\blacksquare$</p>` },
        ],
        conclusion: 'Cada autovector evoluciona independiente con su exponencial e^{λt}.',
      },
    },
  ],

  'alc-markov': [
    {
      n: 'Autovalores de una matriz estocástica', ref: 'Cap. 5 §11 · Ej. 12',
      e: R`Si $P$ es estocástica: $1$ es autovalor y $|\lambda|\le1$ para todo autovalor. $PQ$ y $P^n$ son estocásticas.`,
      p: R`<p>$\mathbf 1^tP=\mathbf 1^t\Rightarrow P^t\mathbf 1=\mathbf 1$, luego $1\in\sigma(P^t)=\sigma(P)$. Para la cota: en $P^tw=\lambda w$, tomando $|w_i|$ máximo, $|\lambda||w_i|\le\sum_j(P^t)_{ij}|w_j|\le|w_i|$ porque las filas de $P^t$ suman 1. $\blacksquare$</p>`,
    },
    {
      n: 'Convergencia a un único equilibrio (matriz positiva)', ref: 'Cap. 5 §11',
      e: R`Si $P$ es estocástica con entradas positivas (Perron–Frobenius), existe un único estado de equilibrio $v^*$ y $P^kv_0\to v^*$ para toda distribución $v_0$.`,
      p: R`<p>El autovalor $1$ es simple y los otros cumplen $|\lambda|<1$. Si $P=CDC^{-1}$, $D^k\to\operatorname{diag}(1,0,..,0)$ y $P^kv_0\to a_1w_1$ donde $w_1$ es el autovector de $1$; la suma de coordenadas se conserva ($\mathbf 1^tPv=\mathbf 1^tv$), lo que fija la escala: $v^*=w_1/\mathbf 1^tw_1$. (La prueba completa de $\lambda=1$ simple usa Perron–Frobenius.) $\blacksquare$</p>`,
    },
  ],

  'alc-potencia': [
    {
      n: 'Convergencia del método de la potencia', ref: 'Cap. 5 §6 · Ej. 17',
      e: R`Con $|\lambda_1|>|\lambda_2|\ge\dots$ y $a_1\neq0$: $A^kv^{(0)}=\lambda_1^k(a_1v_1+\varepsilon_k)$, $\varepsilon_k\to0$; $\varphi(Av^{(k)})/\varphi(v^{(k)})\to\lambda_1$ si $\varphi(v_1)\neq0$.`,
      p: R`<p>$A^kv^{(0)}=\sum a_i\lambda_i^kv_i=\lambda_1^k(a_1v_1+\sum_{i\ge2}a_i(\lambda_i/\lambda_1)^kv_i)$ y $(\lambda_i/\lambda_1)^k\to0$. El cociente de funcionales es $\lambda_1\frac{a_1\varphi(v_1)+\varphi(\varepsilon_{k+1})}{a_1\varphi(v_1)+\varphi(\varepsilon_k)}\to\lambda_1$. $\blacksquare$</p>`,
      x: {
        enunciado: R`Para $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ y $v^{(0)}=(1,0)$, hacer dos iteraciones sin normalizar y estimar $\lambda_1$ con $\varphi(v)=v_1$.`,
        idea: 'Multiplicar por A y mirar la razón de primeras coordenadas.',
        pasos: [
          { idea: 'Iterar', detalle: R`<p>$v^{(1)}=Av^{(0)}=(2,1)$; $v^{(2)}=Av^{(1)}=(5,4)$; $v^{(3)}=(14,13)$.</p>` },
          { idea: 'Cocientes', detalle: R`<p>$\varphi(v^{(2)})/\varphi(v^{(1)})=5/2=2{,}5$; $\varphi(v^{(3)})/\varphi(v^{(2)})=14/5=2{,}8$. Los autovalores son $3$ y $1$: la razón $|\lambda_2/\lambda_1|=1/3$ explica la convergencia rápida hacia $3$. $\blacksquare$</p>` },
        ],
        conclusion: 'Cada paso reduce el error aproximadamente a un tercio.',
      },
    },
    {
      n: 'Potencia inversa y con desplazamiento', ref: 'Cap. 5 §6 · Ej. 21–22',
      e: R`Potencia inversa → autovalor de menor módulo; potencia en $A-\mu I$ → el más lejano a $\mu$; potencia inversa en $A-\mu I$ → el más cercano a $\mu$.`,
      p: R`<p>Si $Av=\lambda v$ entonces $A^{-1}v=\lambda^{-1}v$ y $(A-\mu I)v=(\lambda-\mu)v$. Los módulos extremos de $\{|\lambda_i-\mu|\}$ o $\{|\lambda_i-\mu|^{-1}\}$ se invierten. $\blacksquare$</p>`,
    },
  ],

  'alc-hermitianas': [
    {
      n: 'Descomposición de Schur', ref: 'Cap. 5 §4',
      e: R`Toda $A\in\mathbb{C}^{n\times n}$ es $A=UTU^*$ con $U$ unitaria y $T$ triangular superior (diagonal = autovalores).`,
      p: R`<p>Inducción: un autovector unitario $u_1$ se completa a base ortonormal; $U_1^*AU_1=\begin{pmatrix}\lambda_1&*\\0&A'\end{pmatrix}$ y se aplica la hipótesis a $A'$. $\blacksquare$</p>`,
    },
    {
      n: 'Teorema espectral', ref: 'Cap. 5 §5',
      e: R`$A=A^*$ ⇒ autovalores reales, autovectores de autovalores distintos ortogonales y $A=UDU^*$ con $U$ unitaria, $D$ real. $A$ definida positiva $\iff\lambda_i>0$.`,
      p: R`<p>$\lambda v^*v=v^*Av=(Av)^*v=\bar\lambda v^*v$. Para la diagonalización: por Schur $T=U^*AU$ es hermitiana y triangular, luego diagonal. $x^*Ax=\sum\lambda_i|y_i|^2$ con $y=U^*x$. $\blacksquare$</p>`,
      x: {
        enunciado: R`Diagonalizar ortonormalmente $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$.`,
        idea: 'Autovalores reales; autovectores ortogonales; normalizar.',
        pasos: [
          { idea: 'Autovalores', detalle: R`<p>$\det(A-\lambda I)=(2-\lambda)^2-1=0\Rightarrow\lambda=3,1$.</p>` },
          { idea: 'Autovectores unitarios', detalle: R`<p>$\lambda=3$: $(1,1)/\sqrt2$. $\lambda=1$: $(1,-1)/\sqrt2$. Su producto escalar es $\tfrac12(1-1)=0$ ✓.</p>` },
          { idea: 'Armar U y D', detalle: R`<p>$U=\tfrac1{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$, $D=\operatorname{diag}(3,1)$, $A=UDU^t$. $\blacksquare$</p>` },
        ],
        conclusion: 'Los ejes de la elipse xᵗAx = 1 son exactamente estos autovectores.',
      },
    },
  ],

  'alc-svd': [
    {
      n: 'Existencia de la SVD', ref: 'Cap. 7 §3',
      e: R`$A=U\Sigma V^*$ con $\sigma_i=\sqrt{\lambda_i(A^*A)}$, $Av_i=\sigma_iu_i$.`,
      p: R`<p>$A^*A$ es hermitiana semidefinida positiva: se diagonaliza ortonormalmente con autovalores $\sigma_i^2\ge0$. Se define $u_i=Av_i/\sigma_i$ para $\sigma_i>0$ (ortonormales: $u_i^*u_j=\sigma_j^2\delta_{ij}/(\sigma_i\sigma_j)$) y se completa. $\blacksquare$</p>`,
      x: {
        enunciado: R`Hallar la SVD de $A=\begin{pmatrix}4&0\\3&5\end{pmatrix}$ (Práctica 5, Ej. 7).`,
        idea: 'Diagonalizar AᵗA; los σ son raíces de sus autovalores.',
        pasos: [
          { idea: 'Calcular AᵗA', detalle: R`<p>$A^tA=\begin{pmatrix}25&15\\15&25\end{pmatrix}$.</p>` },
          { idea: 'Autovalores y vectores', detalle: R`<p>$\lambda=40$ con $v_1=\tfrac1{\sqrt2}(1,1)$ y $\lambda=10$ con $v_2=\tfrac1{\sqrt2}(1,-1)$. Entonces $\sigma_1=\sqrt{40}=2\sqrt{10}$, $\sigma_2=\sqrt{10}$.</p>` },
          { idea: 'Vectores a izquierda', detalle: R`<p>$u_1=Av_1/\sigma_1=\tfrac{1}{\sqrt2\,2\sqrt{10}}(4,8)=\tfrac1{\sqrt5}(1,2)$; $u_2=Av_2/\sigma_2=\tfrac1{\sqrt2\sqrt{10}}(4,-2)=\tfrac1{\sqrt5}(2,-1)$.</p>` },
          { idea: 'Consecuencias', detalle: R`<p>$\|A\|_2=\sigma_1=2\sqrt{10}\approx6{,}32$ y $\operatorname{cond}_2(A)=\sigma_1/\sigma_2=2$. $\blacksquare$</p>` },
        ],
        conclusion: 'La elipse imagen del círculo unitario tiene semiejes σ₁ y σ₂ en las direcciones u₁ y u₂.',
      },
    },
    {
      n: 'Mejor aproximación de rango s (Eckart–Young)', ref: 'Cap. 7 §5 · Ej. 14',
      e: R`$A_s=\sum_{i\le s}\sigma_iu_iv_i^*$ cumple $\|A-A_s\|_2=\sigma_{s+1}\le\|A-B\|_2$ para toda $B$ de rango $\le s$.`,
      p: R`<p>Valor: $A-A_s$ tiene valores singulares $\sigma_{s+1},\dots$. Optimalidad: $\operatorname{Nu}B$ tiene dimensión $\ge n-s$ y corta a $\langle v_1,..,v_{s+1}\rangle$; en un $x$ unitario de la intersección, $\|(A-B)x\|=\|Ax\|\ge\sigma_{s+1}$. $\blacksquare$</p>`,
    },
  ],

  'alc-cuadrados': [
    {
      n: 'Ecuaciones normales', ref: 'Cap. 8 · Ej. 2',
      e: R`$\hat x$ minimiza $\|Ax-b\|_2\iff A^tA\hat x=A^tb$. Si $\operatorname{rg}A=n$, $\hat x=A^\dagger b=(A^tA)^{-1}A^tb$ es único.`,
      p: R`<p>Si $A^t(b-A\hat x)=0$, Pitágoras da $\|b-Ax\|^2=\|b-A\hat x\|^2+\|A(\hat x-x)\|^2$. Recíprocamente, la derivada de $\|b-A\hat x-\tau Av\|^2$ en $\tau=0$ es $-2(Av)^t(b-A\hat x)$. $\blacksquare$</p>`,
      x: {
        enunciado: R`Hallar la recta $y=\alpha+\beta t$ que mejor aproxima (cuadrados mínimos) los puntos $(−1,−3),(0,1),(1,1),(2,3)$ (Práctica 6, Ej. 3, 2.ª tabla).`,
        idea: 'Armar A con columnas (1, t) y resolver las ecuaciones normales.',
        pasos: [
          { idea: 'Matriz y términos', detalle: R`<p>$A=\begin{pmatrix}1&-1\\1&0\\1&1\\1&2\end{pmatrix}$, $b=(-3,1,1,3)^t$. $A^tA=\begin{pmatrix}4&2\\2&6\end{pmatrix}$, $A^tb=\begin{pmatrix}2\\10\end{pmatrix}$ (porque $\sum y=-3+1+1+3=2$ y $\sum ty=3+0+1+6=10$).</p>` },
          { idea: 'Resolver', detalle: R`<p>$4\alpha+2\beta=2$ y $2\alpha+6\beta=10$. De la primera, $\alpha=\tfrac{1-\beta}2$. Reemplazando en la segunda: $(1-\beta)+6\beta=10\Rightarrow\beta=\tfrac95$ y $\alpha=\tfrac{1-9/5}2=-\tfrac25$.</p>` },
          { idea: 'Resultado', detalle: R`<p>$y=-\tfrac25+\tfrac95t$. Residuo: $b-A\hat x=(-3+\tfrac{11}5,\ 1+\tfrac25,\ 1-\tfrac75,\ 3-\tfrac{16}5)=(-\tfrac45,\tfrac75,-\tfrac25,-\tfrac15)$, que es ortogonal a las dos columnas ($-\tfrac45+\tfrac75-\tfrac25-\tfrac15=0$ y $\tfrac45+0-\tfrac25-\tfrac25=0$). $\blacksquare$</p>` },
        ],
        conclusion: 'El chequeo de ortogonalidad del residuo con las columnas valida el resultado.',
      },
    },
    {
      n: 'cond(AᵗA) = cond(A)²', ref: 'Cap. 8',
      e: R`$\operatorname{cond}_2(A^tA)=\operatorname{cond}_2(A)^2$: las ecuaciones normales empeoran el condicionamiento.`,
      p: R`<p>Los valores singulares de $A^tA$ son $\sigma_i^2$ (es simétrica definida positiva con autovalores $\sigma_i^2$), luego $\operatorname{cond}_2(A^tA)=\sigma_1^2/\sigma_n^2$. $\blacksquare$</p>`,
    },
  ],

  'alc-interpolacion': [
    {
      n: 'Existencia y unicidad del interpolante', ref: 'Cap. 8 §1 · Ej. 6',
      e: R`Para $x_0,..,x_n$ distintos hay un único $p$ de grado $\le n$ con $p(x_i)=y_i$ (matriz de Vandermonde inversible).`,
      p: R`<p>Dos interpolantes difieren en un polinomio de grado $\le n$ con $n+1$ raíces: es 0. Así $Va=0\Rightarrow a=0$ y $V$ cuadrada es inversible. $\blacksquare$</p>`,
    },
    {
      n: 'Regla de los trapecios compuesta', ref: 'Cap. 8 · Ej. 14',
      e: R`$\int_a^bf\approx\frac{b-a}n\Big(\frac{f(a)+f(b)}2+\sum_{i=1}^{n-1}f(x_i)\Big)$, con error $\frac{(b-a)h^2}{12}f''(\xi)$.`,
      p: R`<p>La integral de la poligonal en $[x_i,x_{i+1}]$ es $\frac h2(f(x_i)+f(x_{i+1}))$ (área de un trapecio). Sumando, los nodos interiores aparecen dos veces. $\blacksquare$</p>`,
      x: {
        enunciado: R`Aproximar $\int_0^1e^x\,dx$ con trapecios y $n=2$.`,
        idea: 'h = 1/2; nodos 0, 1/2, 1.',
        pasos: [
          { idea: 'Evaluar', detalle: R`<p>$f(0)=1$, $f(\tfrac12)=e^{1/2}\approx1{,}6487$, $f(1)=e\approx2{,}7183$.</p>` },
          { idea: 'Aplicar la fórmula', detalle: R`<p>$T_2=\tfrac12\Big(\tfrac{1+2{,}7183}2+1{,}6487\Big)\approx\tfrac12(1{,}8591+1{,}6487)=1{,}7539$. Exacto: $e-1\approx1{,}7183$; el error $\approx0{,}036$ (teórico $\le\frac{h^2}{12}\max f''=\frac{0{,}25\cdot e}{12}\approx0{,}057$). $\blacksquare$</p>` },
        ],
        conclusion: 'Con n = 4 el error baja a casi la cuarta parte.',
      },
    },
  ],

  'alc-iterativos': [
    {
      n: 'Convergencia ⇔ radio espectral < 1', ref: 'Cap. 6 §2',
      e: R`$x_{k+1}=Bx_k+c$ converge para todo $x_0$ $\iff\rho(B)<1$. Además $\rho(B)\le\|B\|$ para toda norma inducida.`,
      p: R`<p>Si $\rho\ge1$, con $e_0$ autovector el error no tiende a 0. Si $\rho<1$ y $B$ es diagonalizable, $B^k=CD^kC^{-1}\to0$. $|\lambda|\|v\|=\|Bv\|\le\|B\|\|v\|$ da $\rho\le\|B\|$. $\blacksquare$</p>`,
    },
    {
      n: 'Jacobi converge si A es diagonal dominante; SOR exige ω ∈ (0,2)', ref: 'Cap. 6 §3 · Ej. 11',
      e: R`(a) $A$ estrictamente diagonal dominante por filas ⇒ Jacobi converge. (b) $\det B(\omega)=(1-\omega)^n$, luego convergencia de SOR ⇒ $\omega\in(0,2)$.`,
      p: R`<p>(a) $\|B_J\|_\infty=\max_i\sum_{j\neq i}|a_{ij}|/|a_{ii}|<1$. (b) $D+\omega L$ y $(1-\omega)D-\omega U$ son triangulares con diagonales $D$ y $(1-\omega)D$; $\prod|\lambda_i|=|1-\omega|^n\le\rho^n<1$ si converge. $\blacksquare$</p>`,
      x: {
        enunciado: R`¿Converge Jacobi para $A=\begin{pmatrix}64&-6\\6&-1\end{pmatrix}$? (Práctica 7, Ej. 3)`,
        idea: 'Calcular la matriz de iteración y su radio espectral.',
        pasos: [
          { idea: 'Matriz de iteración', detalle: R`<p>$B_J=-D^{-1}(L+U)=\begin{pmatrix}0&6/64\\6&0\end{pmatrix}$ (porque $D=\operatorname{diag}(64,-1)$: $-(-1)^{-1}\cdot6=6$).</p>` },
          { idea: 'Radio espectral', detalle: R`<p>$\lambda^2=\tfrac{6}{64}\cdot6=\tfrac{36}{64}\Rightarrow|\lambda|=\tfrac68=0{,}75<1$. Converge para todo dato inicial. $\blacksquare$</p>` },
          { idea: 'Observación', detalle: R`<p>$\|B_J\|_\infty=6>1$ y $\|B_J\|_1=6>1$: esas normas no alcanzan para probarlo. Hay que usar otra norma o el radio espectral.</p>` },
        ],
        conclusion: 'ρ(B) < 1 aunque ‖B‖_1 y ‖B‖_∞ sean mayores que 1.',
      },
    },
  ],

  'alc-gradiente': [
    {
      n: 'Ax = b equivale a minimizar f(x) = ½xᵗAx − bᵗx', ref: 'Cap. 6 §4 · Ej. 12',
      e: R`Si $A$ es simétrica, $\nabla f=Ax-b$. Con $A$ definida positiva, $f$ tiene un único mínimo en $x^*=A^{-1}b$.`,
      p: R`<p>$f(x^*+h)=f(x^*)+\nabla f(x^*)^th+\tfrac12h^tAh=f(x^*)+\tfrac12h^tAh>f(x^*)$ si $h\neq0$. $\blacksquare$</p>`,
    },
    {
      n: 'Paso óptimo del gradiente', ref: 'Cap. 6 §4 · Ej. 13–14',
      e: R`Con dirección $d$ y residuo $r=b-Ax$, $\varphi(t)=f(x+td)$ se minimiza en $t=\dfrac{r^td}{d^tAd}$; para $d=r$, $t=\dfrac{r^tr}{r^tAr}$ y los residuos consecutivos son ortogonales.`,
      p: R`<p>$\varphi(t)=f(x)-t\,r^td+\tfrac12t^2d^tAd$ es una parábola; $\varphi'(t)=-r^td+t\,d^tAd=0$. Además $r_{k+1}^tr_k=\varphi'(t_k)\cdot(-1)=0$. $\blacksquare$</p>`,
      x: {
        enunciado: R`Un paso del gradiente para $A=\begin{pmatrix}2&1\\1&12\end{pmatrix}$, $b=(7,-5)^t$ desde $x_0=(0,0)$ (Práctica 7, Ej. 16).`,
        idea: 'r₀ = b − Ax₀ = b; t = rᵗr / rᵗAr.',
        pasos: [
          { idea: 'Residuo', detalle: R`<p>$r_0=b=(7,-5)$, $r_0^tr_0=74$.</p>` },
          { idea: 'Paso óptimo', detalle: R`<p>$Ar_0=(14-5,\ 7-60)=(9,-53)$; $r_0^tAr_0=63+265=328$. $t_0=74/328\approx0{,}2256$.</p>` },
          { idea: 'Nueva iteración', detalle: R`<p>$x_1=t_0r_0\approx(1{,}579,\,-1{,}128)$. El nuevo residuo es $r_1=r_0-t_0Ar_0\approx(4{,}970,\ 6{,}957)$ y $r_1^tr_0\approx34{,}79-34{,}79=0$: los residuos consecutivos son ortogonales. $\blacksquare$</p>` },
        ],
        conclusion: 'Cada paso es una minimización exacta en una recta; los residuos zigzaguean en ángulo recto.',
      },
    },
  ],
};
