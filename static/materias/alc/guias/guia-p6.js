// materias/alc/guias/guia-p6.js — ejercicios resueltos de la Práctica 6 (2C 2026).
const R = String.raw;

export const GUIA_P6 = [
  {
    fuente: 'Práctica 6 · Ej. 1',
    enunciado: R`Evaluar $p(x)=a_nx^n+\dots+a_1x+a_0$ en $x_0$. ¿Cuántos productos y sumas se hacen? Comparar con el método de Horner $p(x)=a_0+x(a_1+x(a_2+\dots+x(a_{n-1}+xa_n)\dots))$.`,
    idea: 'Contar operaciones de cada forma.',
    pasos: [
      { idea: 'Forma directa (potencias a mano)', detalle: R`<p>Si cada $x_0^k$ se calcula desde cero, $a_kx_0^k$ cuesta $k$ productos: $\sum_{k=1}^nk=\tfrac{n(n+1)}2$ productos. Si se reutiliza $x_0^{k}=x_0\cdot x_0^{k-1}$: $n-1$ productos para las potencias y $n$ para multiplicar por los $a_k$: $2n-1$. En ambos casos $n$ sumas.</p>` },
      { idea: 'Horner', detalle: R`<p>Se calcula de adentro hacia afuera: $b_n=a_n$, $b_{k}=a_k+x_0b_{k+1}$. Cada paso es 1 producto y 1 suma: $n$ productos y $n$ sumas en total. $\blacksquare$</p>` },
    ],
    conclusion: 'Horner usa la mitad de productos que la forma "inteligente" y O(n) en lugar de O(n²) si se recalculan potencias; además es más estable numéricamente.',
  },
  {
    fuente: 'Práctica 6 · Ej. 4',
    enunciado: R`Hallar la constante (polinomio de grado 0) que mejor aproxima, en cuadrados mínimos, a $f:[a,b]\to\mathbb{R}$ en los puntos $x_1,\dots,x_n$.`,
    idea: 'Es un problema de cuadrados mínimos con A = (1,…,1)ᵗ.',
    pasos: [
      { idea: 'Plantear', detalle: R`<p>Se busca $c$ que minimice $\sum_{i=1}^n(f(x_i)-c)^2=\|b-c\mathbf 1\|_2^2$ con $b=(f(x_1),\dots,f(x_n))^t$, o sea cuadrados mínimos con $A=\mathbf 1\in\mathbb{R}^{n\times1}$.</p>` },
      { idea: 'Ecuaciones normales', detalle: R`<p>$A^tA=\mathbf 1^t\mathbf 1=n$ y $A^tb=\sum f(x_i)$. Entonces $n\,c=\sum_if(x_i)$.</p>` },
      { idea: 'Resultado', detalle: R`<p>$c=\dfrac1n\sum_{i=1}^nf(x_i)$: el <b>promedio</b> de los valores. (Se verifica derivando: $\frac{d}{dc}\sum(f(x_i)-c)^2=-2\sum(f(x_i)-c)=0$; la segunda derivada $2n>0$ confirma el mínimo.) $\blacksquare$</p>` },
    ],
    conclusion: 'La media muestral es el ajuste constante óptimo en cuadrados mínimos.',
  },
  {
    fuente: 'Práctica 6 · Ej. 9',
    enunciado: R`Se deja caer un objeto desde 200 m y se mide: $t=0,1,2,4,6$ con alturas $200,195,180,120,25$. Ajustar $f(t)=at^2+b$ en cuadrados mínimos y estimar $g$ sabiendo que $f(t)=200-\tfrac12gt^2$.`,
    idea: 'Cambiar de variable s = t²: el modelo es una recta en s.',
    pasos: [
      { idea: 'Matriz del problema', detalle: R`<p>Las filas son $(t_i^2,\,1)$: $(0,1),(1,1),(4,1),(16,1),(36,1)$. <code>np.polyfit(t,h,2)</code> ajustaría también un término lineal $ct$ que no queremos; se usa en cambio <code>np.polyfit(t**2,h,1)</code>.</p>` },
      { idea: 'Ecuaciones normales', detalle: R`<p>Con $s=t^2$: $\sum s=57$, $\sum s^2=1569$, $\sum h=720$, $\sum sh=3735$, $n=5$. Entonces $1569a+57b=3735$ y $57a+5b=720$.</p>` },
      { idea: 'Resolver', detalle: R`<p>De la segunda: $b=144-11{,}4a$. En la primera: $1569a+8208-649{,}8a=3735\Rightarrow919{,}2a=-4473\Rightarrow a\approx-4{,}866$ y $b\approx199{,}5$.</p>` },
      { idea: 'Estimar g', detalle: R`<p>$a=-\tfrac g2\Rightarrow g=-2a\approx9{,}73\ \text{m/s}^2$ (cercano a $9{,}8$). $\blacksquare$</p>` },
    ],
    conclusion: 'Un modelo no lineal en t puede ser lineal en los parámetros si se eligen bien las columnas.',
  },
  {
    fuente: 'Práctica 6 · Ej. 10',
    enunciado: R`Peso $X$ (kg) vs. volumen pulmonar $Y$ (l): $(60;2{,}3),(85;4),(100;5),(150;9),(250;19{,}5)$. Ajustar $Y=aX^b$ por cuadrados mínimos y predecir $Y$ para $X=93$.`,
    idea: 'Tomar logaritmos: ln Y = ln a + b ln X es una recta.',
    pasos: [
      { idea: 'Linealizar', detalle: R`<p>$\ln Y=\ln a+b\ln X$. Nuevos datos $(u_i,v_i)=(\ln X_i,\ln Y_i)\approx(4{,}094;0{,}833),(4{,}443;1{,}386),(4{,}605;1{,}609),(5{,}011;2{,}197),(5{,}522;2{,}970)$.</p>` },
      { idea: 'Recta de cuadrados mínimos', detalle: R`<p>Medias: $\bar u\approx4{,}735$, $\bar v\approx1{,}799$. $S_{uu}\approx1{,}207$, $S_{uv}\approx1{,}795$. Pendiente $b=S_{uv}/S_{uu}\approx1{,}49$ y $\ln a=\bar v-b\bar u\approx-5{,}24$, o sea $a\approx0{,}0053$.</p>` },
      { idea: 'Predicción', detalle: R`<p>$\ln93\approx4{,}533$: $\ln Y\approx-5{,}24+1{,}49\cdot4{,}533\approx1{,}50\Rightarrow Y\approx4{,}5$ litros (valores aproximados; en Python con <code>np.polyfit(np.log(X),np.log(Y),1)</code>). $\blacksquare$</p>` },
    ],
    conclusion: 'Las cifras son aproximadas: este ajuste minimiza el error de ln Y, no el error absoluto de Y.',
  },
  {
    fuente: 'Práctica 6 · Ej. 14(a)–(c)',
    enunciado: R`Interpolando $f$ linealmente en $[x_i,x_{i+1}]$ (con $h=x_{i+1}-x_i$), hallar $p_i$, calcular $\int_{x_i}^{x_{i+1}}p_i$ y deducir la regla de los trapecios compuesta.`,
    idea: 'La integral de una recta es el área de un trapecio.',
    pasos: [
      { idea: 'Recta interpolante', detalle: R`<p>$p_i(x)=f(x_i)+\dfrac{f(x_{i+1})-f(x_i)}{x_{i+1}-x_i}(x-x_i)$.</p>` },
      { idea: 'Integral', detalle: R`<p>$\int_{x_i}^{x_{i+1}}p_i=hf(x_i)+\dfrac{f(x_{i+1})-f(x_i)}{h}\cdot\dfrac{h^2}2=\dfrac h2\big(f(x_i)+f(x_{i+1})\big)$.</p>` },
      { idea: 'Sumar tramos', detalle: R`<p>$\int_a^bf\approx\sum_{i=0}^{n-1}\tfrac h2(f(x_i)+f(x_{i+1}))=h\Big(\tfrac{f(x_0)+f(x_n)}2+\sum_{i=1}^{n-1}f(x_i)\Big)$ porque cada nodo interior aparece en dos tramos. Con $h=\tfrac{b-a}n$ es la fórmula pedida.</p>` },
      { idea: 'Chequeo numérico', detalle: R`<p>$\int_0^{\pi/2}\sin x\,dx=1$ con $n=2$: $h=\tfrac\pi4$, $T=\tfrac\pi4\big(\tfrac{0+1}2+\sin\tfrac\pi4\big)\approx0{,}785\cdot1{,}207=0{,}948$ (error $\approx0{,}05$; con $n=4$ baja a $\approx0{,}013$). $\blacksquare$</p>` },
    ],
    conclusion: 'El error de los trapecios decrece como h²: duplicar n lo divide por 4.',
  },
];
