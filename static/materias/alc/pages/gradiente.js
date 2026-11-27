// materias/alc/pages/gradiente.js — Método del gradiente (descenso máximo) y gradiente conjugado.
// Teoría: apunte Acosta–Laplagne, Cap. 6 §4–6. Práctica 7, Ej. 12–16.

import { el, slider } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { fmt, vistaIgual, poligonal, mulv, dot } from '../lib.js';

const R = String.raw;

export function renderGradiente(root) {
  root.appendChild(pageHeader('Gradiente y gradiente conjugado',
    'Resolver $Ax=b$ con $A$ simétrica definida positiva es lo mismo que <em>encontrar el punto más bajo de un "valle" cuadrático</em>. '
    + 'Entonces se puede bajar paso a paso, como si fuera una montaña al revés.'));

  root.appendChild(callout('thm', 'Resolver Ax = b ⇔ minimizar una cuadrática',
    R`Sea $A$ simétrica y $f(x)=\tfrac12x^tAx-b^tx+\eta$. Entonces $\nabla f(x)=Ax-b$, de modo que los puntos críticos son las soluciones de $Ax=b$. Si $A$ es definida positiva, $f$ tiene un <b>único mínimo</b> en $x^*=A^{-1}b$; si es definida negativa, un máximo; si tiene autovalores de ambos signos, un <b>punto silla</b>.`,
    R`<p>Derivando: $\partial_k\big(\tfrac12\sum_{i,j}a_{ij}x_ix_j\big)=\tfrac12\big(\sum_ja_{kj}x_j+\sum_ia_{ik}x_i\big)=(Ax)_k$ por simetría, y $\partial_k(b^tx)=b_k$.</p>
    <p>Para el mínimo: con $A$ definida positiva y $x=x^*+h$, $f(x)=f(x^*)+\nabla f(x^*)^th+\tfrac12h^tAh=f(x^*)+\tfrac12h^tAh>f(x^*)$ si $h\neq0$. Si $A$ tiene un autovalor $\lambda<0$ con autovector $w$, $f(x^*+tw)=f(x^*)+\tfrac12\lambda t^2\|w\|^2<f(x^*)$ (no es mínimo). $\blacksquare$</p>`));

  root.appendChild(callout('def', 'Método del gradiente (máximo descenso)',
    R`Se baja en la dirección en que $f$ decrece más rápido: $-\nabla f(x_k)=b-Ax_k=:r_k$ (el <b>residuo</b>). Se elige el paso $t_k$ que minimiza $\varphi(t)=f(x_k+tr_k)$, que para una cuadrática es $\ t_k=\dfrac{r_k^tr_k}{r_k^tAr_k}$, y $x_{k+1}=x_k+t_kr_k$. (Con una dirección $d_k$ cualquiera, $t=\dfrac{r_k^td_k}{d_k^tAd_k}$.)`));

  root.appendChild(callout('thm', 'Convergencia del gradiente y por qué zigzaguea',
    R`Con paso óptimo, $r_{k+1}\perp r_k$ (direcciones consecutivas perpendiculares) y $\ \|x_k-x^*\|_A\le\Big(\dfrac{\kappa-1}{\kappa+1}\Big)^k\|x_0-x^*\|_A$, con $\kappa=\operatorname{cond}_2(A)=\lambda_{\max}/\lambda_{\min}$ y $\|v\|_A=\sqrt{v^tAv}$. Si $\kappa$ es grande, el factor es casi 1: convergencia muy lenta.`,
    R`<p>(Perpendicularidad) Como $t_k$ minimiza $\varphi$, $0=\varphi'(t_k)=\nabla f(x_{k+1})^tr_k=-r_{k+1}^tr_k$.</p>
    <p>(Cota, idea) Para $A$ diagonal con autovalores $\lambda_{\min},\lambda_{\max}$ y $e=x-x^*$, un paso reduce $\|e\|_A^2$ por un factor $1-\dfrac{(e^tA^2e)^2}{(e^tA^3e)(e^tAe)}\le\Big(\dfrac{\kappa-1}{\kappa+1}\Big)^2$ (desigualdad de Kantorovich). Iterando se obtiene la cota. $\blacksquare$</p>`));

  root.appendChild(callout('def', 'Gradiente conjugado (CG)',
    R`Dos direcciones son <b>$A$-conjugadas</b> si $d_i^tAd_j=0$ ($i\neq j$). CG usa direcciones conjugadas: $d_0=r_0$; $\ x_{k+1}=x_k+\alpha_kd_k$ con $\alpha_k=\dfrac{r_k^tr_k}{d_k^tAd_k}$; $\ r_{k+1}=r_k-\alpha_kAd_k$; $\ \beta_k=\dfrac{r_{k+1}^tr_{k+1}}{r_k^tr_k}$; $\ d_{k+1}=r_{k+1}+\beta_kd_k$. En exacta aritmética <b>termina en a lo sumo $n$ pasos</b> y $x_k$ minimiza $f$ sobre el subespacio de Krylov $\langle r_0,Ar_0,\dots,A^{k-1}r_0\rangle$. Su tasa es $\Big(\dfrac{\sqrt\kappa-1}{\sqrt\kappa+1}\Big)^k$: mucho mejor que el gradiente.`));

  root.appendChild(callout('warn', 'Ojo',
    R`CG y el gradiente exigen $A$ <b>simétrica definida positiva</b>. En aritmética finita CG pierde la conjugación y no termina exactamente en $n$ pasos, pero igual converge rápido; en la práctica se corta por tolerancia sobre $\|r_k\|$.`));

  root.appendChild(el('h2', { text: 'Visualización: zigzag del gradiente vs. CG' }));
  const sk = slider({ label: 'κ = λmax/λmin', min: 1, max: 40, step: 0.5, value: 8, format: (v) => v.toFixed(1) });
  const sth = slider({ label: 'inclinación del valle', min: 0, max: 90, step: 1, value: 35, format: (v) => v + '°' });
  const sx0 = slider({ label: 'punto inicial (ángulo)', min: 0, max: 360, step: 5, value: 60, format: (v) => v + '°' });
  const sn = slider({ label: 'iteraciones', min: 0, max: 30, step: 1, value: 8, format: (v) => v });
  root.appendChild(el('div', { class: 'controls' }, [sk.wrap, sth.wrap, sx0.wrap, sn.wrap]));
  const out = readout('');
  const viz = mountCanvas(root, { height: 340, view: {}, hint: 'curvas de nivel de f; gradiente en rosa, gradiente conjugado en verde; mínimo en el origen' });
  viz.setDraw(() => {
    const p = viz.plane; vistaIgual(p, 2.6); p.clear(); p.grid(1);
    const kap = Number(sk.input.value); const th = (Number(sth.input.value) * Math.PI) / 180; const k = Number(sn.input.value);
    const l1 = 1; const l2 = kap; const c = Math.cos(th); const s = Math.sin(th);
    const A = [[l1 * c * c + l2 * s * s, (l1 - l2) * c * s], [(l1 - l2) * c * s, l1 * s * s + l2 * c * c]];
    const q = (x, y) => A[0][0] * x * x + 2 * A[0][1] * x * y + A[1][1] * y * y;
    [0.15, 0.5, 1, 2, 3.5].forEach((L) => {
      const pts = Array.from({ length: 181 }, (_, i) => { const t = (i * 2 * Math.PI) / 180; const x = Math.cos(t); const y = Math.sin(t); const m = Math.sqrt((2 * L) / q(x, y)); return [x * m, y * m]; });
      poligonal(p, pts, COLORS.border, 1.2);
    });
    const a0 = (Number(sx0.input.value) * Math.PI) / 180; const x0 = [2 * Math.cos(a0), 2 * Math.sin(a0)];
    // gradiente con paso óptimo (b = 0 ⇒ x* = 0, r = −Ax)
    let x = x0.slice(); const G = [x];
    for (let i = 0; i < k; i++) { const r = mulv(A, x).map((v) => -v); const rr = dot(r, r); if (rr < 1e-24) break; const t = rr / dot(r, mulv(A, r)); x = x.map((v, j) => v + t * r[j]); G.push(x); }
    const xg = x;
    // gradiente conjugado
    let y = x0.slice(); let r = mulv(A, y).map((v) => -v); let d = r.slice(); const C = [y];
    for (let i = 0; i < Math.min(k, 2); i++) {
      const rr = dot(r, r); if (rr < 1e-24) break;
      const Ad = mulv(A, d); const al = rr / dot(d, Ad); y = y.map((v, j) => v + al * d[j]); r = r.map((v, j) => v - al * Ad[j]);
      const be = dot(r, r) / rr; d = r.map((v, j) => v + be * d[j]); C.push(y);
    }
    poligonal(p, G, COLORS.pink, 2); G.forEach((g, i) => p.dot(g[0], g[1], i === 0 ? 6 : 3.5, i === 0 ? COLORS.warn : COLORS.pink));
    poligonal(p, C, COLORS.ok, 3); C.forEach((g, i) => { if (i > 0) p.dot(g[0], g[1], 5, COLORS.ok); });
    p.dot(0, 0, 6, COLORS.text);
    const nA = (v) => Math.sqrt(dot(v, mulv(A, v)));
    out.textContent = `κ = ${fmt(kap, 1)} · factor del gradiente (κ−1)/(κ+1) = ${fmt((kap - 1) / (kap + 1), 3)} · factor de CG (√κ−1)/(√κ+1) = ${fmt((Math.sqrt(kap) - 1) / (Math.sqrt(kap) + 1), 3)}\n`
      + `tras ${k} iteraciones: ‖e‖_A del gradiente = ${nA(xg).toExponential(2)} · de CG = ${nA(y).toExponential(2)}  (CG llega al mínimo en ≤ 2 pasos, n = 2)\n`
      + 'Observá: los pasos del gradiente son perpendiculares entre sí (zigzag); CG cambia de dirección para no "deshacer" lo ya ganado.';
  });
  [sk, sth, sx0, sn].forEach((s) => s.input.addEventListener('input', () => viz.redraw()));
  root.appendChild(out);
}
