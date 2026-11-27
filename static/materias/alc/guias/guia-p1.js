// materias/alc/guias/guia-p1.js — ejercicios resueltos de la Práctica 1 (2C 2026).
// Formato solvedExercise: { fuente, enunciado, idea?, pasos: [{ idea, detalle }], conclusion? } — todo HTML/LaTeX.
const R = String.raw;

export const GUIA_P1 = [
  {
    fuente: 'Práctica 1 · Ej. 2',
    enunciado: R`Determinar los $k\in\mathbb{R}$ para los que el sistema $\ x_1+kx_2-x_3=1,\ -x_1+x_2+k^2x_3=-1,\ x_1+kx_2+(k-2)x_3=2\ $ tiene solución única, infinitas soluciones o ninguna. Considerar también el sistema homogéneo asociado.`,
    idea: 'Combinar ecuaciones para aislar x₃ y discutir qué factores se anulan.',
    pasos: [
      { idea: 'Eliminar', detalle: R`<p>Las operaciones $E_3-E_1$ y $E_1+E_2$ son reversibles, así que el sistema es equivalente a: $E_1:\ x_1+kx_2-x_3=1$; $\ E_1+E_2:\ (k+1)x_2+(k^2-1)x_3=0$; $\ E_3-E_1:\ (k-1)x_3=1$.</p>` },
      { idea: 'Caso $k=1$', detalle: R`<p>La tercera ecuación queda $0\cdot x_3=1$: <b>no hay solución</b>.</p>` },
      { idea: 'Caso $k\neq1$', detalle: R`<p>$x_3=\tfrac1{k-1}$. La segunda ecuación es $(k+1)x_2+(k+1)(k-1)\tfrac1{k-1}=(k+1)(x_2+1)=0$.</p>` },
      { idea: 'Subcaso $k\neq\pm1$', detalle: R`<p>$x_2=-1$ y $x_1=1-kx_2+x_3=1+k+\tfrac1{k-1}$: <b>solución única</b>.</p>` },
      { idea: 'Subcaso $k=-1$', detalle: R`<p>$x_3=-\tfrac12$ y la segunda ecuación es $0=0$: $x_2$ queda libre y $x_1=x_2+\tfrac12$. <b>Infinitas soluciones</b> $\ (\tfrac12+t,\ t,\ -\tfrac12)$, $t\in\mathbb{R}$.</p>` },
      { idea: 'Sistema homogéneo', detalle: R`<p>Con segundo miembro nulo: $(k-1)x_3=0$ y $(k+1)x_2+(k^2-1)x_3=0$. Hay solución no trivial solo si $k=1$ o $k=-1$. Para $k=1$: $x_3$ libre, $x_2=0$, $x_1=x_3$: soluciones $t(1,0,1)$. Para $k=-1$: $x_3=0$, $x_2$ libre, $x_1=x_2$: soluciones $t(1,1,0)$. $\blacksquare$</p>` },
    ],
    conclusion: 'Los valores críticos son los que anulan los coeficientes que se despejan (k − 1 y k + 1): ahí cambia el rango.',
  },
  {
    fuente: 'Práctica 1 · Ej. 4',
    enunciado: R`Hallar los coeficientes de la parábola $y=ax^2+bx+c$ que pasa por $(1,1)$, $(2,2)$ y $(3,0)$.`,
    idea: 'Cada punto da una ecuación lineal en (a, b, c).',
    pasos: [
      { idea: 'Plantear el sistema', detalle: R`<p>$a+b+c=1$, $\ 4a+2b+c=2$, $\ 9a+3b+c=0$ (matriz de Vandermonde, inversible porque las abscisas son distintas).</p>` },
      { idea: 'Restar ecuaciones', detalle: R`<p>$(2)-(1):\ 3a+b=1$ y $(3)-(2):\ 5a+b=-2$. Restando: $2a=-3$, o sea $a=-\tfrac32$.</p>` },
      { idea: 'Despejar', detalle: R`<p>$b=1-3a=\tfrac{11}2$ y $c=1-a-b=-3$.</p>` },
      { idea: 'Verificar', detalle: R`<p>En $x=2$: $4(-\tfrac32)+2\cdot\tfrac{11}2-3=-6+11-3=2$ ✓. En $x=3$: $-\tfrac{27}2+\tfrac{33}2-3=0$ ✓. Entonces $y=-\tfrac32x^2+\tfrac{11}2x-3$. $\blacksquare$</p>` },
    ],
    conclusion: 'Tres puntos con abscisas distintas determinan una única parábola.',
  },
  {
    fuente: 'Práctica 1 · Ej. 7(a)',
    enunciado: R`En $V=\mathbb{R}^3$, sean $S=\{3x-2y+z=0\}$ y $T=\{x+z=0\}$. Hallar generadores de $S\cap T$ y de $S+T$, y decidir si la suma es directa.`,
    idea: 'Intersección: apilar ecuaciones. Suma: unir generadores y ver el rango.',
    pasos: [
      { idea: 'Intersección', detalle: R`<p>De $x+z=0$: $z=-x$. En la primera: $3x-2y-x=0\Rightarrow y=x$. Entonces $S\cap T=\{(x,x,-x)\}=\langle(1,1,-1)\rangle$, $\dim=1$.</p>` },
      { idea: 'Generadores de cada uno', detalle: R`<p>$S$: $z=-3x+2y$, base $\{(1,0,-3),(0,1,2)\}$. $T$: $z=-x$, base $\{(1,0,-1),(0,1,0)\}$.</p>` },
      { idea: 'Suma', detalle: R`<p>$S+T=\langle(1,0,-3),(0,1,2),(1,0,-1),(0,1,0)\rangle$. Restando los dos primeros con el tercero: $(1,0,-1)-(1,0,-3)=(0,0,2)$, o sea $e_3\in S+T$; luego también $e_1$ y $e_2$. Entonces $S+T=\mathbb{R}^3$.</p>` },
      { idea: 'Suma directa', detalle: R`<p>$\dim(S+T)=3=2+2-1$ ✓ (fórmula). Como $S\cap T\neq\{0\}$, la suma <b>no</b> es directa. $\blacksquare$</p>` },
    ],
    conclusion: 'Dos planos distintos por el origen se cortan en una recta y suman todo R³.',
  },
  {
    fuente: 'Práctica 1 · Ej. 11(a)',
    enunciado: R`Extraer una base de $S=\langle(1,1,2),(1,3,5),(1,1,4),(5,1,1)\rangle\subseteq\mathbb{R}^3$ y hallar $\dim S$.`,
    idea: 'Ver cuántos de los generadores son independientes.',
    pasos: [
      { idea: 'Probar que tres son independientes', detalle: R`<p>Con $v_1,v_2,v_3$ como columnas: $\det\begin{pmatrix}1&1&1\\1&3&1\\2&5&4\end{pmatrix}=1(12-5)-1(4-2)+1(5-6)=7-2-1=4\neq0$.</p>` },
      { idea: 'Conclusión de dimensión', detalle: R`<p>Tres vectores independientes en $\mathbb{R}^3$ forman base de $\mathbb{R}^3$; luego $S=\mathbb{R}^3$ y $\dim S=3$. El cuarto generador $(5,1,1)$ es combinación de los demás.</p>` },
      { idea: 'Base', detalle: R`<p>$\{(1,1,2),(1,3,5),(1,1,4)\}$ es base de $S$ y ya es base de todo $\mathbb{R}^3$: no hay que extender. $\blacksquare$</p>` },
    ],
    conclusion: 'Un determinante no nulo es la forma más rápida de certificar independencia en el caso cuadrado.',
  },
  {
    fuente: 'Práctica 1 · Ej. 12',
    enunciado: R`Sean $v_1,\dots,v_k\in\mathbb{R}^n$. Probar que $\{v_1,\dots,v_k\}$ es l.i. sobre $\mathbb{R}$ si y solo si es l.i. sobre $\mathbb{C}$.`,
    idea: 'Separar parte real e imaginaria de una combinación compleja.',
    pasos: [
      { idea: '(⇐) l.i. sobre ℂ ⇒ l.i. sobre ℝ', detalle: R`<p>Una combinación lineal real nula es en particular una combinación lineal compleja nula; por independencia sobre $\mathbb{C}$ todos los coeficientes son 0.</p>` },
      { idea: '(⇒) Planteo', detalle: R`<p>Sea $\sum_j(a_j+ib_j)v_j=0$ con $a_j,b_j\in\mathbb{R}$.</p>` },
      { idea: 'Parte real e imaginaria', detalle: R`<p>Como los $v_j$ son reales, $\sum a_jv_j$ y $\sum b_jv_j$ son vectores reales y $\sum a_jv_j+i\sum b_jv_j=0$. Un vector complejo es nulo si y solo si sus partes real e imaginaria lo son: $\sum a_jv_j=0$ y $\sum b_jv_j=0$.</p>` },
      { idea: 'Concluir', detalle: R`<p>Por independencia sobre $\mathbb{R}$, $a_j=b_j=0$ para todo $j$, o sea todos los coeficientes complejos son nulos. $\blacksquare$</p>` },
    ],
    conclusion: 'Esto falla si los vectores no son reales: (1, i) y (i, −1) son l.d. sobre ℂ pero l.i. sobre ℝ.',
  },
];
