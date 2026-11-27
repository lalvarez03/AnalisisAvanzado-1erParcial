// materias/alc/pages/ortogonal.js — Ortogonalidad, Gram–Schmidt, proyectores, Householder y QR.
// Teoría: apunte Acosta–Laplagne, Cap. 3 §2 y §5, Cap. 4 §5. Práctica 3, Ej. 13–24.

import { el, slider } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { fmt, vistaIgual, flecha, dot, norm2 } from '../lib.js';

const R = String.raw;

export function renderOrtogonal(root) {
  root.appendChild(pageHeader('Gram–Schmidt, Householder y QR',
    'Las bases ortonormales son las más cómodas: las coordenadas se calculan con productos internos y los errores no se amplifican. '
    + 'La factorización QR convierte cualquier base en una ortonormal y deja anotado cómo.'));

  root.appendChild(callout('def', 'Ortogonalidad',
    R`En $\mathbb{K}^n$ el producto interno es $\langle x,y\rangle=y^*x$. Dos vectores son <b>ortogonales</b> si $\langle x,y\rangle=0$. Un conjunto es <b>ortonormal</b> si sus vectores son ortogonales de a pares y de norma 1.
    Si $B=\{v_1,..,v_n\}$ es base ortonormal, las coordenadas de $v$ son $[v]_B=(v_1^*v,\dots,v_n^*v)$.`));

  root.appendChild(callout('thm', 'Matrices ortogonales',
    R`Para $Q\in\mathbb{R}^{n\times n}$ son equivalentes: (a) $Q^{-1}=Q^t$; (b) las columnas de $Q$ son ortonormales; (c) las filas de $Q$ son ortonormales; (d) $\|Qx\|_2=\|x\|_2$ para todo $x$ (conserva longitudes).`,
    R`<p><b>(a)⇔(b)</b>: $(Q^tQ)_{ij}=q_i^tq_j$, así que $Q^tQ=I$ equivale a que las columnas sean ortonormales; y para matrices cuadradas $Q^tQ=I\iff QQ^t=I\iff Q^{-1}=Q^t$. <b>(a)⇔(c)</b> es lo mismo aplicado a $QQ^t=I$.</p>
    <p><b>(a)⇒(d)</b>: $\|Qx\|^2=x^tQ^tQx=x^tx=\|x\|^2$.</p>
    <p><b>(d)⇒(b)</b>: de $\|Qx\|=\|x\|$ y la identidad de polarización $x^ty=\tfrac14(\|x+y\|^2-\|x-y\|^2)$ sale $(Qx)^t(Qy)=x^ty$, o sea $x^t(Q^tQ)y=x^ty$ para todo $x,y$. Tomando $x=e_i$, $y=e_j$: $(Q^tQ)_{ij}=\delta_{ij}$. $\blacksquare$</p>`));

  root.appendChild(callout('def', 'Gram–Schmidt',
    R`Dada una base $\{a_1,\dots,a_p\}$, se define $q_1=a_1/\|a_1\|$ y, para $j\ge2$: $\ \tilde q_j=a_j-\sum_{i<j}\langle a_j,q_i\rangle q_i,\ \ q_j=\tilde q_j/\|\tilde q_j\|$.
    Cada $q_j$ es combinación de $a_1,\dots,a_j$ y $\{q_1,..,q_j\}$ es ortonormal y genera el mismo subespacio que $\{a_1,..,a_j\}$. Reordenando se obtiene <b>$A=QR$</b>, con $Q$ de columnas ortonormales y $R$ triangular superior con diagonal $\|\tilde q_j\|>0$ ($r_{ij}=\langle a_j,q_i\rangle$).`));

  root.appendChild(callout('thm', 'Proyectores y proyección ortogonal',
    R`Una TL $P$ es un <b>proyector</b> si $P^2=P$; entonces $\mathbb{K}^n=\operatorname{Nu}(P)\oplus\operatorname{Im}(P)$. Si las columnas de $Q$ son una base ortonormal de $S$, la matriz de la <b>proyección ortogonal</b> sobre $S$ es $P_S=QQ^*=\sum_i v_iv_i^*$. Si $A$ tiene columnas l.i. (base de $S$), $P_S=A(A^*A)^{-1}A^*$. Además $I-P_S$ proyecta sobre $S^\perp$.`,
    R`<p>(Proyector) $\operatorname{Im}(P)\cap\operatorname{Nu}(P)=\{0\}$: si $y=Px$ y $Py=0$, entonces $y=Px=P^2x=Py=0$. Y todo $x=Px+(x-Px)$ con $P(x-Px)=Px-P^2x=0$, así que $x\in\operatorname{Im}P+\operatorname{Nu}P$.</p>
    <p>(Fórmula) $P=QQ^*$ cumple $P^2=Q(Q^*Q)Q^*=QQ^*=P$ (pues $Q^*Q=I$), $\operatorname{Im}P\subseteq S$ y $Pv=v$ para $v\in S$ (porque $v=Qc$ y $QQ^*Qc=Qc$). Para $x$ cualquiera, $x-Px\perp S$: $Q^*(x-QQ^*x)=Q^*x-Q^*x=0$. Entonces $Px$ es el único punto de $S$ con residuo ortogonal a $S$.</p>
    <p>(Con $A=QR$) $R$ es inversible, $A(A^*A)^{-1}A^*=QR(R^*Q^*QR)^{-1}R^*Q^*=QR\,R^{-1}R^{-*}R^*Q^*=QQ^*$. $\blacksquare$</p>`));

  root.appendChild(callout('def', 'Reflector de Householder',
    R`Si $\|u\|_2=1$, $\ H=I-2uu^t$ es simétrica y ortogonal ($H^2=I$): refleja respecto del hiperplano $u^\perp$ (si $x=w+v$ con $w\perp u$ y $v\parallel u$, entonces $Hx=w-v$). Dado $x\neq0$, tomando $u=\dfrac{x-\|x\|e_1}{\|x-\|x\|e_1\|}$ se logra $Hx=\|x\|e_1$: así se anulan, columna a columna, las entradas bajo la diagonal y se obtiene $QR$ con $Q=H_1H_2\cdots H_p$.`));

  root.appendChild(callout('warn', 'GS clásico vs. Householder',
    R`En exacta aritmética dan la misma $QR$ (salvo signos). En punto flotante, Gram–Schmidt clásico pierde ortogonalidad cuando las columnas son casi dependientes; Householder, que usa solo matrices ortogonales, es numéricamente estable. Es lo que observás al comparar con <code>np.linalg.qr</code> (Ej. 22).`));

  // Viz 1: Gram–Schmidt
  root.appendChild(el('h2', { text: 'Visualización 1: Gram–Schmidt en el plano' }));
  const sA = slider({ label: 'ángulo de a₂', min: 5, max: 175, step: 1, value: 50, format: (v) => v + '°' });
  const sL = slider({ label: '‖a₂‖', min: 0.5, max: 2.5, step: 0.05, value: 1.6, format: (v) => v.toFixed(2) });
  root.appendChild(el('div', { class: 'controls' }, [sA.wrap, sL.wrap]));
  const out = readout('');
  const viz = mountCanvas(root, { height: 300, view: {}, hint: 'a₁ fijo; q₁ = a₁/‖a₁‖; proyección de a₂ sobre a₁; q₂ ⟂ q₁' });
  viz.setDraw(() => {
    const p = viz.plane; vistaIgual(p, 2.8, 0.6, 0.8); p.clear(); p.grid(1);
    const a1 = [2, 0]; const t = (Number(sA.input.value) * Math.PI) / 180; const l = Number(sL.input.value);
    const a2 = [l * Math.cos(t), l * Math.sin(t)];
    const q1 = [1, 0]; const r12 = dot(a2, q1); const pr = [r12 * q1[0], r12 * q1[1]];
    const w = [a2[0] - pr[0], a2[1] - pr[1]]; const r22 = norm2(w); const q2 = [w[0] / r22, w[1] / r22];
    p.segment(a2[0], a2[1], pr[0], pr[1], COLORS.warn, 2, [5, 4]);
    flecha(p, 0, 0, a1[0], a1[1], COLORS.accent); flecha(p, 0, 0, a2[0], a2[1], COLORS.pink); flecha(p, 0, 0, pr[0], pr[1], COLORS.warn, 2);
    flecha(p, 0, 0, q1[0], q1[1], COLORS.ok, 3.5); flecha(p, 0, 0, q2[0], q2[1], COLORS.cyan, 3.5);
    p.text('a₁', a1[0] + 0.05, 0.15, { color: COLORS.accent }); p.text('a₂', a2[0] + 0.05, a2[1] + 0.12, { color: COLORS.pink });
    p.text('q₁', 0.55, -0.25, { color: COLORS.ok }); p.text('q₂', q2[0] + 0.05, q2[1] + 0.1, { color: COLORS.cyan });
    out.textContent = `R = [[ ${fmt(2, 2)}  ${fmt(r12, 2)} ]\n     [ 0      ${fmt(r22, 2)} ]]   ← r₁₁=‖a₁‖, r₁₂=⟨a₂,q₁⟩, r₂₂=‖a₂−proy‖\nq₁·q₂ = ${fmt(dot(q1, q2), 6)} (ortogonales)    |det R| = área del paralelogramo de a₁,a₂ = ${fmt(2 * r22, 2)}`;
  });
  [sA, sL].forEach((s) => s.input.addEventListener('input', () => viz.redraw()));
  root.appendChild(out);

  // Viz 2: Householder
  root.appendChild(el('h2', { text: 'Visualización 2: reflexión de Householder' }));
  const sU = slider({ label: 'dirección de u', min: 0, max: 180, step: 1, value: 105, format: (v) => v + '°' });
  const sX = slider({ label: 'ángulo de x', min: 0, max: 360, step: 1, value: 30, format: (v) => v + '°' });
  root.appendChild(el('div', { class: 'controls' }, [sU.wrap, sX.wrap]));
  const out2 = readout('');
  const viz2 = mountCanvas(root, { height: 280, view: {}, hint: 'H = I − 2uuᵗ refleja respecto de la recta ⟂ u' });
  viz2.setDraw(() => {
    const p = viz2.plane; vistaIgual(p, 1.7); p.clear(); p.grid(1);
    const tu = (Number(sU.input.value) * Math.PI) / 180; const u = [Math.cos(tu), Math.sin(tu)];
    const tx = (Number(sX.input.value) * Math.PI) / 180; const x = [1.3 * Math.cos(tx), 1.3 * Math.sin(tx)];
    const c = 2 * dot(u, x); const hx = [x[0] - c * u[0], x[1] - c * u[1]];
    p.segment(-3 * -u[1], -3 * u[0], 3 * -u[1], 3 * u[0], COLORS.textDim, 1.5, [6, 4]);
    p.segment(x[0], x[1], hx[0], hx[1], COLORS.warn, 1.5, [4, 4]);
    flecha(p, 0, 0, u[0], u[1], COLORS.accent, 3); flecha(p, 0, 0, x[0], x[1], COLORS.pink); flecha(p, 0, 0, hx[0], hx[1], COLORS.ok);
    p.text('u', u[0] + 0.05, u[1] + 0.1, { color: COLORS.accent }); p.text('x', x[0] + 0.05, x[1] + 0.1, { color: COLORS.pink }); p.text('Hx', hx[0] + 0.05, hx[1] + 0.1, { color: COLORS.ok });
    out2.textContent = `‖x‖ = ${fmt(norm2(x), 3)}   ‖Hx‖ = ${fmt(norm2(hx), 3)}  (H conserva la longitud)\nla recta punteada es u^⊥ (el "espejo"): x y Hx son simétricos respecto de ella.`;
  });
  [sU, sX].forEach((s) => s.input.addEventListener('input', () => viz2.redraw()));
  root.appendChild(out2);
}
