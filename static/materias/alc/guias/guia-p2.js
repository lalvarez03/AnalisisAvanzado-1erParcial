// materias/alc/guias/guia-p2.js — ejercicios resueltos de la Práctica 2 (2C 2026).
const R = String.raw;

export const GUIA_P2 = [
  {
    fuente: 'Práctica 2 · Ej. 3(a)',
    enunciado: R`Probar que existe una única TL $f:\mathbb{R}^2\to\mathbb{R}^2$ con $f(1,1)=(-5,3)$ y $f(-1,1)=(5,2)$. Calcular $f(5,3)$ y $f(-1,2)$.`,
    idea: '{(1,1),(−1,1)} es base de R²: la TL queda determinada. Para evaluar, escribir cada vector en esa base.',
    pasos: [
      { idea: 'Es base', detalle: R`<p>$\det\begin{pmatrix}1&-1\\1&1\end{pmatrix}=2\neq0$, así que $\{(1,1),(-1,1)\}$ es base de $\mathbb{R}^2$. Por el teorema de existencia y unicidad, hay una única TL con esos valores.</p>` },
      { idea: 'Coordenadas de (5,3)', detalle: R`<p>$(5,3)=a(1,1)+b(-1,1)$: $a-b=5$, $a+b=3\Rightarrow a=4,\ b=-1$.</p>` },
      { idea: 'Aplicar f', detalle: R`<p>$f(5,3)=4f(1,1)-f(-1,1)=4(-5,3)-(5,2)=(-25,10)$.</p>` },
      { idea: 'Coordenadas de (−1,2)', detalle: R`<p>$a-b=-1$, $a+b=2\Rightarrow a=\tfrac12,\ b=\tfrac32$. Entonces $f(-1,2)=\tfrac12(-5,3)+\tfrac32(5,2)=(5,\tfrac92)$. $\blacksquare$</p>` },
    ],
    conclusion: 'Conocer f en una base alcanza para conocerla en todo el espacio.',
  },
  {
    fuente: 'Práctica 2 · Ej. 3(b)',
    enunciado: R`¿Existe una TL $f:\mathbb{R}^2\to\mathbb{R}^2$ con $f(1,1)=(2,6)$, $f(-1,1)=(2,1)$ y $f(2,7)=(5,3)$?`,
    idea: 'Los dos primeros ya determinan f; hay que ver si el tercero es consistente.',
    pasos: [
      { idea: 'Escribir (2,7) en la base', detalle: R`<p>$(2,7)=a(1,1)+b(-1,1)$: $a-b=2$, $a+b=7\Rightarrow a=\tfrac92,\ b=\tfrac52$.</p>` },
      { idea: 'Valor forzado por la linealidad', detalle: R`<p>$f(2,7)=\tfrac92(2,6)+\tfrac52(2,1)=(9+5,\ 27+\tfrac52)=(14,\ \tfrac{59}2)$.</p>` },
      { idea: 'Comparar', detalle: R`<p>$(14,\tfrac{59}2)\neq(5,3)$. Entonces <b>no existe</b> tal $f$. $\blacksquare$</p>` },
    ],
    conclusion: 'Si hay más datos que la dimensión, las dependencias lineales de los vectores deben reflejarse en las imágenes.',
  },
  {
    fuente: 'Práctica 2 · Ej. 6',
    enunciado: R`Sean $f:\mathbb{R}^3\to\mathbb{R}^4$, $f(x)=(x_1+x_2,\,x_1+x_3,\,0,\,0)$ y $g:\mathbb{R}^4\to\mathbb{R}^2$, $g(x)=(x_1-x_2,\,2x_1-x_2)$. Hallar núcleo e imagen de $f$, $g$ y $g\circ f$ y clasificarlas.`,
    idea: 'Resolver los sistemas homogéneos y usar el teorema de la dimensión para chequear.',
    pasos: [
      { idea: 'f', detalle: R`<p>$\operatorname{Nu}f$: $x_1+x_2=0,\ x_1+x_3=0\Rightarrow x=t(1,-1,-1)$. $\operatorname{Im}f=\langle(1,0,0,0),(0,1,0,0)\rangle$ (dim 2). $1+2=3$ ✓. No es mono (núcleo no nulo) ni epi ($2<4$).</p>` },
      { idea: 'g', detalle: R`<p>$\operatorname{Nu}g$: $x_1-x_2=0$ y $2x_1-x_2=0\Rightarrow x_1=x_2=0$, o sea $\operatorname{Nu}g=\langle e_3,e_4\rangle$ (dim 2). $\operatorname{Im}g=\mathbb{R}^2$ (el determinante $\begin{vmatrix}1&-1\\2&-1\end{vmatrix}=1\neq0$). $2+2=4$ ✓. Es epimorfismo, no mono.</p>` },
      { idea: 'g∘f', detalle: R`<p>$(g\circ f)(x)=g(x_1+x_2,\,x_1+x_3,0,0)=(x_2-x_3,\ x_1+2x_2-x_3)$. Núcleo: $x_2=x_3$ y $x_1+x_2=0$: $\operatorname{Nu}=\langle(-1,1,1)\rangle$. Imagen: las filas $(0,1,-1)$ y $(1,2,-1)$ son independientes, rango 2, entonces $\operatorname{Im}=\mathbb{R}^2$. Epi, no mono. $\blacksquare$</p>` },
    ],
    conclusion: 'Observación: Nu(g∘f) = Nu(f) porque Im(f) ∩ Nu(g) = {0}.',
  },
  {
    fuente: 'Práctica 2 · Ej. 12',
    enunciado: R`Decidir si existe $\lim x_n$ y calcularlo: (a) $x_n=\tfrac1n$; (b) $x_n=\tfrac{n^2+1}{n^2-1}$; (c) $x_n=(-1)^n$; (d) $x_n=(-1)^ne^{-n}$.`,
    idea: 'Dividir por la potencia dominante; para (c) mirar subsucesiones; para (d) acotar en módulo.',
    pasos: [
      { idea: '(a)', detalle: R`<p>Dado $\varepsilon>0$ y $n_0>1/\varepsilon$, para $n\ge n_0$: $|1/n-0|\le1/n_0<\varepsilon$. El límite es $0$.</p>` },
      { idea: '(b)', detalle: R`<p>$\tfrac{n^2+1}{n^2-1}=\tfrac{1+1/n^2}{1-1/n^2}\to\tfrac{1+0}{1-0}=1$ (álgebra de límites).</p>` },
      { idea: '(c)', detalle: R`<p>La subsucesión de índices pares es constante $1$ y la de impares es constante $-1$. Si existiera el límite $\ell$ todas las subsucesiones convergerían a $\ell$: $1=\ell=-1$, absurdo. <b>No existe</b>.</p>` },
      { idea: '(d)', detalle: R`<p>$|x_n|=e^{-n}\to0$, y $|x_n-0|\to0$ implica $x_n\to0$. El límite es $0$. $\blacksquare$</p>` },
    ],
    conclusion: 'Que el módulo converja a 0 alcanza para que la sucesión converja a 0, pero no a otros valores (c).',
  },
  {
    fuente: 'Práctica 2 · Ej. 20(a)(b)',
    enunciado: R`Sea $A=\begin{pmatrix}3&0&0\\0&\frac54&\frac34\\0&\frac34&\frac54\end{pmatrix}$. (a) Calcular $\operatorname{cond}_\infty(A)$. (b) ¿Qué error relativo en $b$ se tolera para tener error relativo en $x$ menor que $10^{-4}$ (en $\|\cdot\|_\infty$)?`,
    idea: 'cond∞ = ‖A‖∞‖A⁻¹‖∞ y luego la cota del teorema.',
    pasos: [
      { idea: 'Norma de A', detalle: R`<p>Sumas de filas: $3$, $\tfrac54+\tfrac34=2$, $2$. Entonces $\|A\|_\infty=3$.</p>` },
      { idea: 'Inversa', detalle: R`<p>El bloque $\begin{pmatrix}5/4&3/4\\3/4&5/4\end{pmatrix}$ tiene determinante $\tfrac{25}{16}-\tfrac9{16}=1$, y su inversa es $\begin{pmatrix}5/4&-3/4\\-3/4&5/4\end{pmatrix}$. Entonces $A^{-1}=\operatorname{diag}\big(\tfrac13,\ \text{ese bloque}\big)$.</p>` },
      { idea: 'Norma de la inversa y condición', detalle: R`<p>Sumas de filas de $A^{-1}$: $\tfrac13$, $\tfrac54+\tfrac34=2$, $2$, luego $\|A^{-1}\|_\infty=2$ y $\operatorname{cond}_\infty(A)=3\cdot2=6$.</p>` },
      { idea: 'Tolerancia del dato', detalle: R`<p>Por el teorema, $\dfrac{\|x-\tilde x\|}{\|x\|}\le6\dfrac{\|b-\tilde b\|}{\|b\|}$. Para que sea $<10^{-4}$ basta $\dfrac{\|b-\tilde b\|}{\|b\|}<\dfrac{10^{-4}}6\approx1{,}67\times10^{-5}$. $\blacksquare$</p>` },
    ],
    conclusion: 'Es una condición suficiente: la cota puede ser pesimista, pero nunca falla.',
  },
  {
    fuente: 'Práctica 2 · Ej. 24',
    enunciado: R`Sea $D_n=\tfrac1{10}I_n$. Verificar que $\det D_n\to0$. ¿Está $D_n$ mal condicionada? ¿Es el determinante un buen indicador de cercanía a la singularidad?`,
    idea: 'Calcular det y cond explícitamente.',
    pasos: [
      { idea: 'Determinante', detalle: R`<p>$\det D_n=(1/10)^n=10^{-n}\to0$.</p>` },
      { idea: 'Condición', detalle: R`<p>$D_n^{-1}=10I_n$; en cualquier norma inducida $\|D_n\|=\tfrac1{10}$ y $\|D_n^{-1}\|=10$, entonces $\operatorname{cond}(D_n)=1$: perfectamente condicionada.</p>` },
      { idea: 'Moraleja', detalle: R`<p>El determinante cambia con la escala de la matriz (multiplicar por $c$ lo multiplica por $c^n$) pero el condicionamiento no. $D_n$ <em>no</em> está cerca de una singular en sentido relativo: $\frac{\|D_n-B\|}{\|D_n\|}\ge\frac1{\operatorname{cond}}=1$. $\blacksquare$</p>` },
    ],
    conclusion: 'Para medir cercanía a la singularidad hay que usar cond(A) (o σₙ/σ₁), no det(A).',
  },
];
