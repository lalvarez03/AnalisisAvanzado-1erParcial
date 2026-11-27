// materias/alc/pages/tl.js — Transformaciones lineales: matriz, núcleo, imagen y teorema de la dimensión.
// Teoría: apunte Acosta–Laplagne, Cap. 1 §6. Práctica 2, Ej. 1–6.

import { el, slider } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { fmt, vistaIgual, flecha, det, poligonal } from '../lib.js';

const R = String.raw;

export function renderTL(root) {
  root.appendChild(pageHeader('Transformaciones lineales: teorema de la dimensión',
    'Toda matriz $A\\in\\mathbb{K}^{m\\times n}$ define una función $x\\mapsto Ax$. Entender <em>qué hace</em> esa función '
    + '(qué aplasta, qué cubre) es entender cuándo $Ax=b$ tiene solución y cuántas.'));

  root.appendChild(callout('def', 'Transformación lineal',
    R`$f:V\to W$ es <strong>lineal</strong> si $\forall u,v\in V,\ \forall\alpha\in\mathbb{K}$: $f(u+v)=f(u)+f(v)$ y $f(\alpha v)=\alpha f(v)$.
    Su <strong>núcleo</strong> es $\operatorname{Nu}(f)=\{v\in V: f(v)=0\}$ y su <strong>imagen</strong> es $\operatorname{Im}(f)=\{f(v): v\in V\}$.
    Es <em>monomorfismo</em> si es inyectiva, <em>epimorfismo</em> si es suryectiva e <em>isomorfismo</em> si es biyectiva.`));

  root.appendChild(callout('thm', 'Una TL queda determinada por lo que hace en una base',
    R`Si $\{v_1,\dots,v_n\}$ es base de $V$ y $w_1,\dots,w_n\in W$ son cualesquiera, existe una <b>única</b> TL $f:V\to W$ con $f(v_i)=w_i$. Si $V=\mathbb{K}^n$ y $W=\mathbb{K}^m$, su matriz en las bases canónicas es $A=\big(f(e_1)|\cdots|f(e_n)\big)$.`,
    R`<p><b>Existencia.</b> Todo $v$ se escribe de forma única $v=\sum x_iv_i$; se define $f(v)=\sum x_iw_i$. Es lineal porque las coordenadas respecto de una base son lineales en $v$.</p>
    <p><b>Unicidad.</b> Si $f,g$ cumplen lo pedido, $f(v)=\sum x_if(v_i)=\sum x_ig(v_i)=g(v)$. $\blacksquare$</p>
    <p><em>Consecuencia (Ej. 3b):</em> dados más vectores que la dimensión, hay que chequear <em>consistencia</em>: si $v_3=\alpha v_1+\beta v_2$, debe ser $w_3=\alpha w_1+\beta w_2$.</p>`));

  root.appendChild(callout('thm', 'Teorema de la dimensión (núcleo e imagen)',
    R`Si $f:V\to W$ es lineal y $\dim V<\infty$, entonces $\dim V=\dim\operatorname{Nu}(f)+\dim\operatorname{Im}(f)$. Además $f$ es monomorfismo $\iff\operatorname{Nu}(f)=\{0\}$.`,
    R`<p>Sea $\{u_1,..,u_k\}$ base de $\operatorname{Nu}(f)$; se extiende a una base $\{u_1,..,u_k,v_1,..,v_r\}$ de $V$. Se afirma que $\{f(v_1),..,f(v_r)\}$ es base de $\operatorname{Im}(f)$, lo que da $\dim V=k+r$.</p>
    <p><b>Generan:</b> $f(x)=\sum a_if(u_i)+\sum b_jf(v_j)=\sum b_jf(v_j)$ pues $f(u_i)=0$.</p>
    <p><b>Independientes:</b> si $\sum b_jf(v_j)=0$ entonces $f(\sum b_jv_j)=0$, o sea $\sum b_jv_j\in\operatorname{Nu}(f)=\langle u_i\rangle$: $\sum b_jv_j=\sum a_iu_i$. Como $\{u_i,v_j\}$ es independiente, todos los $b_j$ (y $a_i$) son 0.</p>
    <p>Último enunciado: $f(u)=f(v)\iff f(u-v)=0\iff u-v\in\operatorname{Nu}(f)$. $\blacksquare$</p>`));

  root.appendChild(callout('tip', 'Receta para núcleo e imagen de una matriz',
    R`$\operatorname{Nu}(A)$: se resuelve $Ax=0$ (variables libres ⇒ generadores). $\operatorname{Im}(A)=\langle\text{columnas de }A\rangle$: una base son las columnas <em>con pivote</em>. Con $A\in\mathbb{K}^{m\times n}$: inyectiva $\iff\operatorname{rg}A=n$; suryectiva $\iff\operatorname{rg}A=m$.`));

  root.appendChild(el('h2', { text: 'Visualización: qué le hace una matriz al plano' }));
  root.appendChild(el('p', { class: 'page-sub', text: 'El cuadrado unidad (azul) se transforma en un paralelogramo (rosa). Si el determinante se acerca a 0 el paralelogramo se aplasta: se pierde una dimensión, aparece un núcleo y la imagen deja de ser todo el plano.' }));
  const sl = ['a', 'b', 'c', 'd'].map((n, i) => slider({ label: n, min: -2, max: 2, step: 0.05, value: [1, 0.5, 0.5, 1][i], format: (v) => v.toFixed(2) }));
  const pre = el('select', {}, [['Libre', 'free'], ['Proyección en x', 'proy'], ['Rotación 45°', 'rot'], ['Reflexión', 'ref'], ['Singular (rango 1)', 'sing']]
    .map(([l, v]) => el('option', { value: v }, l)));
  const PRE = { proy: [1, 0, 0, 0], rot: [0.71, -0.71, 0.71, 0.71], ref: [1, 0, 0, -1], sing: [1, 2, 0.5, 1] };
  pre.addEventListener('change', () => { const q = PRE[pre.value]; if (q) { q.forEach((x, i) => { sl[i].input.value = x; sl[i].setLabel(x); }); viz.redraw(); } });
  root.appendChild(el('div', { class: 'controls' }, [el('div', { class: 'control' }, [el('label', { text: 'Ejemplo: ' }), pre]), ...sl.map((s) => s.wrap)]));
  const out = readout('');
  const viz = mountCanvas(root, { height: 330, view: {}, hint: 'matriz A = [[a,b],[c,d]]' });
  viz.setDraw(() => {
    const p = viz.plane; vistaIgual(p, 3.5); p.clear(); p.grid(1);
    const [a, b, c, d] = sl.map((s) => Number(s.input.value)); const A = [[a, b], [c, d]];
    const ap = (x, y) => [a * x + b * y, c * x + d * y];
    poligonal(p, [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]], COLORS.accent, 2);
    const im = [[0, 0], ap(1, 0), ap(1, 1), ap(0, 1), [0, 0]];
    p.polygon(im.slice(0, 4), { stroke: COLORS.pink, fill: 'rgba(255,107,214,0.18)', wpx: 2 });
    flecha(p, 0, 0, ...ap(1, 0), COLORS.warn); flecha(p, 0, 0, ...ap(0, 1), COLORS.ok);
    const D = det(A);
    if (Math.abs(D) < 0.05 && (a || b || c || d)) {
      // núcleo: dirección (−b, a) o (d,−c) según cuál no sea nula
      const k = Math.abs(a) + Math.abs(b) > 1e-9 ? [-b, a] : [-d, c];
      if (Math.hypot(...k) > 1e-9) p.segment(-6 * k[0], -6 * k[1], 6 * k[0], 6 * k[1], COLORS.err, 2, [6, 4]);
    }
    const rg = Math.abs(D) > 0.05 ? 2 : ((Math.abs(a) + Math.abs(b) + Math.abs(c) + Math.abs(d)) > 0.05 ? 1 : 0);
    out.textContent = `det A = ${fmt(D, 2)} · rango = ${rg} · dim Nu = ${2 - rg} · dim Im = ${rg}  (${rg === 2 ? 'isomorfismo' : 'ni inyectiva ni suryectiva; el núcleo es la recta roja'}) · área del paralelogramo = |det| = ${fmt(Math.abs(D), 2)}`;
  });
  sl.forEach((s) => s.input.addEventListener('input', () => { pre.value = 'free'; viz.redraw(); }));
  root.appendChild(out);
}
