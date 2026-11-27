// materias/alc/guias/guia-p5.js — ejercicios resueltos de la Práctica 5 (2C 2026).
const R = String.raw;

export const GUIA_P5 = [
  {
    fuente: 'Práctica 5 · Ej. 6',
    enunciado: R`Sea $A=\begin{pmatrix}4&\alpha+2&2\\\alpha^2&4&2\\2&2&1\end{pmatrix}$. (a) Hallar $\alpha\in\mathbb{R}$ para que $A$ sea simétrica y $\lambda=0$ sea autovalor. (b) Diagonalizar ortonormalmente $A$.`,
    idea: 'Simetría impone una ecuación en α; el autovalor 0 impone det A = 0.',
    pasos: [
      { idea: 'Simetría', detalle: R`<p>$a_{12}=a_{21}$: $\alpha+2=\alpha^2\iff\alpha^2-\alpha-2=0\iff\alpha=2$ o $\alpha=-1$.</p>` },
      { idea: 'Autovalor 0', detalle: R`<p>Para $\alpha=-1$: $A=\begin{pmatrix}4&1&2\\1&4&2\\2&2&1\end{pmatrix}$, $\det A=4(4-4)-1(1-4)+2(2-8)=3-12=-9\neq0$. Para $\alpha=2$: las filas 1 y 2 son iguales a $(4,4,2)=2(2,2,1)$, luego $\det A=0$. Entonces $\alpha=2$.</p>` },
      { idea: 'Estructura de A', detalle: R`<p>Con $\alpha=2$, $A=ww^t$ con $w=(2,2,1)^t$. Entonces $Aw=w(w^tw)=9w$ y $Ax=0$ para $x\perp w$.</p>` },
      { idea: 'Autovalores y base ortonormal', detalle: R`<p>Autovalores: $9$ (simple) y $0$ (doble). Base ortonormal: $u_1=\tfrac13(2,2,1)$; para $w^\perp$: $u_2=\tfrac1{\sqrt2}(1,-1,0)$ y $u_3=\tfrac1{\sqrt{18}}(1,1,-4)$ (ambos ortogonales a $w$: $2+2-4=0$, y entre sí).</p>` },
      { idea: 'Resultado', detalle: R`<p>$A=UDU^t$ con $U=(u_1|u_2|u_3)$ ortogonal y $D=\operatorname{diag}(9,0,0)$. $\blacksquare$</p>` },
    ],
    conclusion: 'Una matriz de rango 1 simétrica es w wᵗ: su único autovalor no nulo es ‖w‖².',
  },
  {
    fuente: 'Práctica 5 · Ej. 7',
    enunciado: R`Para $A=\begin{pmatrix}4&0\\3&5\end{pmatrix}$: (a) hallar una SVD; (c) calcular $\|A\|_2$ y $\operatorname{cond}_2(A)$; (d) calcular $A^{-1}$ usando la SVD.`,
    idea: 'Diagonalizar AᵗA, σ = √λ, u = Av/σ.',
    pasos: [
      { idea: 'AᵗA', detalle: R`<p>$A^tA=\begin{pmatrix}25&15\\15&25\end{pmatrix}$, con autovalores $40$ ($v_1=\tfrac1{\sqrt2}(1,1)$) y $10$ ($v_2=\tfrac1{\sqrt2}(1,-1)$).</p>` },
      { idea: 'Valores singulares', detalle: R`<p>$\sigma_1=\sqrt{40}=2\sqrt{10}$, $\sigma_2=\sqrt{10}$.</p>` },
      { idea: 'Vectores a izquierda', detalle: R`<p>$u_1=\dfrac{Av_1}{\sigma_1}=\dfrac{(4,8)/\sqrt2}{2\sqrt{10}}=\tfrac1{\sqrt5}(1,2)$ y $u_2=\dfrac{Av_2}{\sigma_2}=\dfrac{(4,-2)/\sqrt2}{\sqrt{10}}=\tfrac1{\sqrt5}(2,-1)$. Entonces $A=U\Sigma V^t$ con $U=(u_1|u_2)$, $\Sigma=\operatorname{diag}(2\sqrt{10},\sqrt{10})$, $V=(v_1|v_2)$.</p>` },
      { idea: '(c) Norma y condición', detalle: R`<p>$\|A\|_2=\sigma_1=2\sqrt{10}\approx6{,}32$ y $\operatorname{cond}_2(A)=\sigma_1/\sigma_2=2$.</p>` },
      { idea: '(d) Inversa', detalle: R`<p>$A^{-1}=V\Sigma^{-1}U^t=\sum_i\tfrac1{\sigma_i}v_iu_i^t=\tfrac1{2\sqrt{10}}\tfrac1{\sqrt2\sqrt5}\begin{pmatrix}1\\1\end{pmatrix}(1,2)+\tfrac1{\sqrt{10}}\tfrac1{\sqrt2\sqrt5}\begin{pmatrix}1\\-1\end{pmatrix}(2,-1)=\tfrac1{20}\begin{pmatrix}1&2\\1&2\end{pmatrix}+\tfrac1{10}\begin{pmatrix}2&-1\\-2&1\end{pmatrix}=\begin{pmatrix}1/4&0\\-3/20&1/5\end{pmatrix}$. Verificación: $A A^{-1}=\begin{pmatrix}1&0\\3/4-3/4&1\end{pmatrix}=I$ ✓. $\blacksquare$</p>` },
    ],
    conclusion: 'La imagen de la circunferencia unitaria es una elipse con semiejes σ₁u₁ y σ₂u₂.',
  },
  {
    fuente: 'Práctica 5 · Ej. 9',
    enunciado: R`Sea $A=\begin{pmatrix}2&14\\8&-19\\20&-10\end{pmatrix}$. Probar que $\|Av\|_2\ge15\|v\|_2$ para todo $v\in\mathbb{R}^2$.`,
    idea: 'El mínimo de ‖Av‖/‖v‖ es σ_min = √λ_min(AᵗA).',
    pasos: [
      { idea: 'AᵗA', detalle: R`<p>$A^tA=\begin{pmatrix}4+64+400&28-152-200\\-324&196+361+100\end{pmatrix}=\begin{pmatrix}468&-324\\-324&657\end{pmatrix}$.</p>` },
      { idea: 'Autovalores', detalle: R`<p>Traza $1125$, determinante $468\cdot657-324^2=307476-104976=202500$. Entonces $\lambda^2-1125\lambda+202500=0$ con discriminante $1265625-810000=455625=675^2$: $\lambda=\tfrac{1125\pm675}2=900,\ 225$.</p>` },
      { idea: 'Desigualdad', detalle: R`<p>Con $v=\sum y_iv_i$ (base ortonormal de autovectores de $A^tA$): $\|Av\|^2=v^tA^tAv=900y_1^2+225y_2^2\ge225(y_1^2+y_2^2)=225\|v\|^2$. Luego $\|Av\|\ge15\|v\|$ ($\sigma_2=15$). $\blacksquare$</p>` },
    ],
    conclusion: 'σ_min es la mejor constante: ‖Av‖ ≥ σ_min‖v‖, con igualdad en el último vector singular.',
  },
  {
    fuente: 'Práctica 5 · Ej. 10',
    enunciado: R`Mostrar que $A\in\mathbb{C}^{n\times n}$ tiene un valor singular nulo si y solo si tiene un autovalor nulo.`,
    idea: 'Ambos equivalen a que A sea singular, es decir que exista v ≠ 0 con Av = 0.',
    pasos: [
      { idea: '(⇒)', detalle: R`<p>Si $\sigma=0$ es valor singular, $0$ es autovalor de $A^*A$: existe $v\neq0$ con $A^*Av=0$. Entonces $0=v^*A^*Av=\|Av\|^2$, o sea $Av=0$: $0$ es autovalor de $A$.</p>` },
      { idea: '(⇐)', detalle: R`<p>Si $Av=0$ con $v\neq0$, entonces $A^*Av=0$ y $0$ es autovalor de $A^*A$, es decir $\sigma=\sqrt0=0$ es valor singular. $\blacksquare$</p>` },
    ],
    conclusion: 'Para matrices cuadradas: A singular ⇔ σₙ = 0 ⇔ det A = 0. (Para valores no nulos, σ ≠ |λ| en general.)',
  },
  {
    fuente: 'Práctica 5 · Ej. 15',
    enunciado: R`Sea $A=\begin{pmatrix}1&4&0\\-4&-1&0\\0&0&2\end{pmatrix}$. Hallar la matriz de rango 2 y la de rango 1 que mejor aproximan a $A$ en norma 2.`,
    idea: 'Calcular la SVD y truncar (Eckart–Young).',
    pasos: [
      { idea: 'AᵗA', detalle: R`<p>$A^tA=\begin{pmatrix}17&8&0\\8&17&0\\0&0&4\end{pmatrix}$. El bloque $\begin{pmatrix}17&8\\8&17\end{pmatrix}$ tiene autovalores $25$ y $9$ con autovectores $\tfrac1{\sqrt2}(1,1)$ y $\tfrac1{\sqrt2}(1,-1)$; el tercero es $4$ con $e_3$.</p>` },
      { idea: 'Valores singulares', detalle: R`<p>$\sigma_1=5,\ \sigma_2=3,\ \sigma_3=2$.</p>` },
      { idea: 'Rango 2', detalle: R`<p>Se descarta $\sigma_3u_3v_3^t$ con $u_3=v_3=e_3$ ($Ae_3=2e_3$): $A_2=A-2e_3e_3^t=\begin{pmatrix}1&4&0\\-4&-1&0\\0&0&0\end{pmatrix}$, con $\|A-A_2\|_2=\sigma_3=2$.</p>` },
      { idea: 'Rango 1', detalle: R`<p>Hay que quedarse solo con $\sigma_1u_1v_1^t$. $v_1=\tfrac1{\sqrt2}(1,1,0)$ y $u_1=Av_1/5=\tfrac1{5\sqrt2}(5,-5,0)=\tfrac1{\sqrt2}(1,-1,0)$. Entonces $A_1=5u_1v_1^t=\tfrac52\begin{pmatrix}1&1&0\\-1&-1&0\\0&0&0\end{pmatrix}$ y $\|A-A_1\|_2=\sigma_2=3$. $\blacksquare$</p>` },
    ],
    conclusion: 'Ninguna matriz de rango ≤ 1 queda a menos de σ₂ = 3 de A.',
  },
];
