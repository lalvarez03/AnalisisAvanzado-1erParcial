// materias/alc/pages/espacios.js — Subespacios, sistemas de generadores, independencia lineal, bases y dimensión.
// Teoría: apunte Acosta–Laplagne, Cap. 1 §3 (Espacios vectoriales). Práctica 1, Ej. 5–13.

import { el, slider } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { fmt, vistaIgual, flecha } from '../lib.js';

const R = String.raw;

export function renderEspacios(root) {
  root.appendChild(pageHeader('Subespacios, bases y dimensión',
    'Un <strong>sistema lineal</strong> $Ax=b$ nos pone una pregunta geométrica: ¿está $b$ en el conjunto de todas las '
    + 'combinaciones de las columnas de $A$? Para contestarla con orden hace falta el lenguaje de los espacios vectoriales.'));

  root.appendChild(callout('tip', 'Motivación',
    R`Resolver $x_1 v_1 + x_2 v_2 = b$ es lo mismo que preguntarse si $b$ se puede "armar" con $v_1,v_2$.
    Si $v_1,v_2$ apuntan en la misma dirección solo se arman los múltiplos de esa dirección: se pierde una dimensión.
    Medir esa pérdida es lo que hacen la <em>independencia lineal</em> y la <em>dimensión</em>.`));

  root.appendChild(callout('def', 'Subespacio',
    R`Sea $V$ un $\mathbb{K}$-espacio vectorial ($\mathbb{K}=\mathbb{R}$ o $\mathbb{C}$). Un subconjunto $S\subseteq V$ es un <strong>subespacio</strong> si
    (i) $0\in S$; (ii) $\forall u,v\in S:\ u+v\in S$; (iii) $\forall \alpha\in\mathbb{K},\ \forall v\in S:\ \alpha v\in S$.`));

  root.appendChild(callout('def', 'Generadores, independencia, base',
    R`<ul>
    <li>$\langle v_1,\dots,v_k\rangle=\{\alpha_1v_1+\dots+\alpha_kv_k:\ \alpha_i\in\mathbb{K}\}$ es el subespacio <strong>generado</strong>; si es $S$, decimos que $\{v_i\}$ es un <em>sistema de generadores</em> de $S$.</li>
    <li>$\{v_1,\dots,v_k\}$ es <strong>linealmente independiente</strong> si $\alpha_1v_1+\dots+\alpha_kv_k=0\Rightarrow \alpha_1=\dots=\alpha_k=0$.</li>
    <li>Una <strong>base</strong> de $S$ es un sistema de generadores linealmente independiente. Todas las bases de $S$ tienen el mismo cardinal: la <strong>dimensión</strong> $\dim S$.</li></ul>`));

  root.appendChild(callout('thm', 'Teorema (dimensión de la suma)',
    R`Si $S,T$ son subespacios de dimensión finita de $V$, entonces $\dim(S+T)=\dim S+\dim T-\dim(S\cap T)$. En particular la suma es <strong>directa</strong> ($S\cap T=\{0\}$) si y solo si $\dim(S+T)=\dim S+\dim T$.`,
    R`<p>Sea $\{w_1,\dots,w_r\}$ una base de $S\cap T$. Se extiende a una base $\{w_1,..,w_r,s_1,..,s_p\}$ de $S$ y a una base $\{w_1,..,w_r,t_1,..,t_q\}$ de $T$. Basta ver que $B=\{w_i,s_j,t_l\}$ es base de $S+T$ (así $\dim(S+T)=r+p+q=(r+p)+(r+q)-r$).</p>
    <p><b>Generan:</b> todo $x\in S+T$ es $x=s+t$, y $s$ es combinación de los $w_i,s_j$, $t$ de los $w_i,t_l$.</p>
    <p><b>Independencia:</b> si $\sum a_iw_i+\sum b_js_j+\sum c_lt_l=0$, entonces $\sum c_lt_l=-\sum a_iw_i-\sum b_js_j\in S\cap T$ (está en $T$ porque es combinación de $t_l$, y en $S$ por el otro miembro). Luego $\sum c_lt_l=\sum d_iw_i$, y como $\{w_i,t_l\}$ es independiente, $c_l=0$ y $d_i=0$. Queda $\sum a_iw_i+\sum b_js_j=0$, y como $\{w_i,s_j\}$ es independiente, $a_i=b_j=0$. $\blacksquare$</p>`));

  root.appendChild(callout('tip', 'Cómo se calcula en la práctica',
    R`Para <b>extraer una base</b> de un sistema de generadores: se arma la matriz con los vectores como columnas, se escalona, y las columnas con pivote (de la matriz <em>original</em>) forman una base. Para $S\cap T$ cuando $S=\{Ax=0\}$ y $T=\{Bx=0\}$: se resuelve el sistema apilado $\begin{pmatrix}A\\B\end{pmatrix}x=0$.`));

  root.appendChild(callout('warn', 'Trampas frecuentes',
    R`<ul><li>$S\cup T$ <b>no</b> es subespacio en general: lo es si y solo si $S\subseteq T$ o $T\subseteq S$ (Ej. 9).</li>
    <li>Independiente sobre $\mathbb{R}$ y sobre $\mathbb{C}$ son lo mismo para vectores reales (Ej. 12), pero la <em>dimensión</em> de $\mathbb{C}^n$ es $n$ sobre $\mathbb{C}$ y $2n$ sobre $\mathbb{R}$.</li>
    <li>Al extraer base hay que tomar las columnas <em>originales</em>, no las del escalonado.</li></ul>`));

  // Visualización: dos vectores de R^2 y el subespacio que generan.
  root.appendChild(el('h2', { text: 'Visualización: ¿generan el plano?' }));
  root.appendChild(el('p', { class: 'page-sub', text: 'Movés el ángulo de $v_2$. Cuando $v_1$ y $v_2$ quedan alineados, el determinante vale 0, son linealmente dependientes y solo generan una recta.' }));
  const sA = slider({ label: 'ángulo de v₂ (grados)', min: 0, max: 360, step: 1, value: 60, format: (v) => v + '°' });
  const sL = slider({ label: 'largo de v₂', min: 0.3, max: 2.5, step: 0.05, value: 1.5, format: (v) => v.toFixed(2) });
  root.appendChild(el('div', { class: 'controls' }, [sA.wrap, sL.wrap]));
  const out = readout('');
  const viz = mountCanvas(root, { height: 320, view: {}, hint: 'v₁ fijo = (2, 0); v₂ móvil' });
  viz.setDraw(() => {
    const p = viz.plane; vistaIgual(p, 3.2); p.clear(); p.grid(1);
    const t = (Number(sA.input.value) * Math.PI) / 180; const l = Number(sL.input.value);
    const v1 = [2, 0]; const v2 = [l * Math.cos(t), l * Math.sin(t)];
    const d = v1[0] * v2[1] - v1[1] * v2[0]; const dep = Math.abs(d) < 0.08;
    if (dep) p.segment(-6, -6 * (v2[1] / (v2[0] || 1e-9)), 6, 6 * (v2[1] / (v2[0] || 1e-9)), COLORS.warn, 3, [6, 5]);
    else { p.polygon([[0, 0], v1, [v1[0] + v2[0], v1[1] + v2[1]], v2], { stroke: COLORS.cyan, fill: 'rgba(56,217,217,0.15)', wpx: 1.5 }); }
    flecha(p, 0, 0, v1[0], v1[1], COLORS.accent); flecha(p, 0, 0, v2[0], v2[1], COLORS.pink);
    p.text('v₁', v1[0] + 0.1, v1[1] + 0.15, { color: COLORS.accent }); p.text('v₂', v2[0] + 0.1, v2[1] + 0.15, { color: COLORS.pink });
    out.textContent = `det[v₁ v₂] = ${fmt(d, 2)}  →  ${dep ? 'LINEALMENTE DEPENDIENTES: ⟨v₁,v₂⟩ es una recta (dim 1)' : 'LINEALMENTE INDEPENDIENTES: ⟨v₁,v₂⟩ = ℝ² (dim 2)'}`;
  });
  [sA, sL].forEach((s) => s.input.addEventListener('input', () => viz.redraw()));
  root.appendChild(out);
}
