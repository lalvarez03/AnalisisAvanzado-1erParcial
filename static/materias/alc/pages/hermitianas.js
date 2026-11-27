// materias/alc/pages/hermitianas.js — Descomposición de Schur, matrices hermitianas y teorema espectral.
// Teoría: apunte Acosta–Laplagne, Cap. 5 §4–5. Práctica 5, Ej. 1–6.

import { el, slider } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { fmt, vistaIgual, eig2, poligonal } from '../lib.js';

const R = String.raw;

export function renderHermitianas(root) {
  root.appendChild(pageHeader('Schur y teorema espectral',
    'No toda matriz se diagonaliza, pero <em>toda</em> matriz se puede triangularizar con una base ortonormal (Schur). '
    + 'Y si la matriz es simétrica (hermitiana), esa triangular resulta diagonal: los autovectores forman una base ortonormal.'));

  root.appendChild(callout('def', 'Matrices especiales',
    R`$A^*=\bar A^t$ es la adjunta. $A$ es <b>hermitiana</b> si $A^*=A$ (en $\mathbb{R}$: simétrica), <b>unitaria</b> si $U^*U=I$ (en $\mathbb{R}$: ortogonal) y <b>definida positiva</b> si $x^*Ax>0$ para todo $x\neq0$.
    Dos matrices son <em>unitariamente semejantes</em> si $B=U^*AU$ con $U$ unitaria.`));

  root.appendChild(callout('thm', 'Descomposición de Schur',
    R`Toda $A\in\mathbb{C}^{n\times n}$ es unitariamente semejante a una triangular superior: $A=UTU^*$, con $U$ unitaria y $T$ triangular superior cuya diagonal son los autovalores de $A$.`,
    R`<p>Inducción en $n$. Para $n=1$ es trivial. Sea $\lambda_1$ un autovalor de $A$ (existe en $\mathbb{C}$ por el teorema fundamental del álgebra) y $u_1$ un autovector de norma 1. Completamos $u_1$ a una base ortonormal $\{u_1,\dots,u_n\}$ (Gram–Schmidt) y sea $U_1=(u_1|\cdots|u_n)$, unitaria. Entonces $U_1^*AU_1=\begin{pmatrix}\lambda_1&*\\0&A'\end{pmatrix}$ con $A'\in\mathbb{C}^{(n-1)\times(n-1)}$ (la primera columna es $U_1^*\lambda_1u_1=\lambda_1e_1$). Por hipótesis inductiva $A'=U'T'U'^*$. Con $U=U_1\begin{pmatrix}1&0\\0&U'\end{pmatrix}$ (unitaria) resulta $U^*AU=\begin{pmatrix}\lambda_1&*\\0&T'\end{pmatrix}=T$. Los autovalores de $T$ (su diagonal) son los de $A$ porque $A$ y $T$ son semejantes. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Teorema espectral',
    R`Si $A\in\mathbb{K}^{n\times n}$ es hermitiana: (a) los elementos de la diagonal y <b>todos los autovalores son reales</b>; (b) autovectores de autovalores distintos son ortogonales; (c) existe $U$ unitaria con $A=UDU^*$, $D$ diagonal real (se diagonaliza <b>ortonormalmente</b>).
    Además $A$ es definida positiva $\iff$ todos sus autovalores son $>0$.`,
    R`<p>(a) $a_{ii}=\overline{a_{ii}}$ porque $A=A^*$. Si $Av=\lambda v$, $v\neq0$: $\lambda\,v^*v=v^*Av=(A^*v)^*v=(Av)^*v=\bar\lambda\,v^*v$, y como $v^*v>0$, $\lambda=\bar\lambda\in\mathbb{R}$.</p>
    <p>(b) Si $Av=\lambda v$, $Aw=\mu w$ con $\lambda\neq\mu$ reales: $\lambda\,w^*v=w^*Av=(Aw)^*v=\mu\,w^*v$, entonces $(\lambda-\mu)w^*v=0$ y $w^*v=0$.</p>
    <p>(c) Por Schur, $A=UTU^*$. Entonces $T=U^*AU$ es hermitiana ($T^*=U^*A^*U=T$). Una matriz triangular superior y hermitiana es diagonal (los elementos bajo la diagonal son 0, y los de arriba son sus conjugados). Así $T=D$ real.</p>
    <p>(definida positiva) Si $A=UDU^*$ y $y=U^*x$: $x^*Ax=y^*Dy=\sum\lambda_i|y_i|^2$, que es $>0$ para todo $y\neq0$ si y solo si todos los $\lambda_i>0$. $\blacksquare$</p>`));

  root.appendChild(callout('tip', 'Aplicación: potencias vía Schur',
    R`Si $A=UTU^*$ entonces $A^k=UT^kU^*$. Descomponiendo $T=D+S$ con $D$ diagonal y $S$ estrictamente triangular superior, $S^n=0$, lo que facilita calcular $T^k$ (Ej. 1c). Y un subespacio $S$ invariante por una hermitiana tiene a $S^\perp$ también invariante (Ej. 4).`));

  root.appendChild(callout('warn', 'Trampas',
    R`<ul><li>Una matriz <em>simétrica compleja</em> ($A^t=A$) <b>no</b> es hermitiana y puede no ser diagonalizable.</li><li>Toda matriz real simétrica tiene autovalores reales y se diagonaliza en $\mathbb{R}$; una real no simétrica puede tener autovalores complejos.</li><li>Unitariamente semejante $\Rightarrow$ semejante, pero no al revés (Schur usa $U^*$, no $C^{-1}$ cualquiera).</li></ul>`));

  root.appendChild(el('h2', { text: 'Visualización: la forma cuadrática de una simétrica' }));
  root.appendChild(el('p', { class: 'page-sub', text: 'Para A = [[a,b],[b,c]] se dibuja el conjunto {x : xᵗAx = 1}. Sus ejes son los autovectores (ortogonales) y los semiejes miden 1/√λ. Cuando un autovalor pasa a ser negativo la elipse se abre en hipérbola: A deja de ser definida positiva.' }));
  const sa = slider({ label: 'a', min: -3, max: 3, step: 0.05, value: 2, format: (v) => v.toFixed(2) });
  const sb = slider({ label: 'b', min: -3, max: 3, step: 0.05, value: 1, format: (v) => v.toFixed(2) });
  const sc = slider({ label: 'c', min: -3, max: 3, step: 0.05, value: 1.5, format: (v) => v.toFixed(2) });
  root.appendChild(el('div', { class: 'controls' }, [sa.wrap, sb.wrap, sc.wrap]));
  const out = readout('');
  const viz = mountCanvas(root, { height: 320, view: {}, hint: 'xᵗAx = 1; rectas verde y naranja = autovectores' });
  viz.setDraw(() => {
    const p = viz.plane; vistaIgual(p, 2.2); p.clear(); p.grid(1);
    const a = Number(sa.input.value); const b = Number(sb.input.value); const c = Number(sc.input.value);
    const e = eig2([[a, b], [b, c]]);
    const q = (x, y) => a * x * x + 2 * b * x * y + c * y * y;
    // Se dibuja en polares: para cada dirección u con q(u)>0, el punto u/√q(u). Las ramas de la hipérbola se cortan en las asíntotas.
    let seg = [];
    const flush = () => { if (seg.length > 1) poligonal(p, seg, COLORS.pink, 3); seg = []; };
    for (let i = 0; i <= 720; i++) {
      const t = (i * Math.PI) / 360; const x = Math.cos(t); const y = Math.sin(t); const v = q(x, y);
      if (v > 0.02) seg.push([x / Math.sqrt(v), y / Math.sqrt(v)]); else flush();
    }
    flush();
    [[e.v1, COLORS.ok], [e.v2, COLORS.warn]].forEach(([v, col]) => p.segment(-4 * v[0], -4 * v[1], 4 * v[0], 4 * v[1], col, 1.5, [6, 4]));
    const defin = e.l1 > 1e-9 && e.l2 > 1e-9 ? 'DEFINIDA POSITIVA (elipse)' : (e.l1 < -1e-9 && e.l2 < -1e-9 ? 'definida negativa (vacío: xᵗAx = 1 no tiene solución)' : 'INDEFINIDA o semidefinida (hipérbola / rectas)');
    out.textContent = `λ₁ = ${fmt(e.l1, 3)}, v₁ = (${fmt(e.v1[0], 2)}, ${fmt(e.v1[1], 2)})   λ₂ = ${fmt(e.l2, 3)}, v₂ = (${fmt(e.v2[0], 2)}, ${fmt(e.v2[1], 2)})\nv₁·v₂ = ${fmt(e.v1[0] * e.v2[0] + e.v1[1] * e.v2[1], 6)} (ortogonales)\nA es ${defin}${e.l1 > 1e-9 && e.l2 > 1e-9 ? `\nsemiejes: 1/√λ₁ = ${fmt(1 / Math.sqrt(e.l1), 3)}, 1/√λ₂ = ${fmt(1 / Math.sqrt(e.l2), 3)}` : ''}`;
  });
  [sa, sb, sc].forEach((s) => s.input.addEventListener('input', () => viz.redraw()));
  root.appendChild(out);
}
