// materias/alc/pages/potencia.js — Método de la potencia, cociente de Rayleigh, potencia inversa y con desplazamiento.
// Teoría: apunte Acosta–Laplagne, Cap. 5 §6–7. Práctica 4, Ej. 17–24.

import { el, slider } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { fmt, vistaIgual, flecha, mulv, norm2, dot, poligonal } from '../lib.js';

const R = String.raw;

export function renderPotencia(root) {
  root.appendChild(pageHeader('Método de la potencia',
    'Calcular autovalores resolviendo $p_A(\\lambda)=0$ no es práctico para matrices grandes. Hay una idea mucho más simple: '
    + '<em>multiplicar y multiplicar por $A$</em>. La dirección del vector se alinea sola con el autovector dominante.'));

  root.appendChild(callout('def', 'El método',
    R`Sea $A$ con una base de autovectores normalizados $v_1,\dots,v_n$ y un <b>único autovalor de módulo máximo</b>: $|\lambda_1|>|\lambda_2|\ge\dots\ge|\lambda_n|$. Se parte de $v^{(0)}$ y se itera $\ v^{(k+1)}=\dfrac{Av^{(k)}}{\|Av^{(k)}\|}$ (se normaliza para que no explote ni tienda a 0). El autovalor se estima con el <b>cociente de Rayleigh</b> $r_k=\dfrac{(v^{(k)})^tAv^{(k)}}{(v^{(k)})^tv^{(k)}}$.`));

  root.appendChild(callout('thm', 'Convergencia del método de la potencia',
    R`Si $v^{(0)}=\sum a_iv_i$ con $a_1\neq0$, entonces $A^kv^{(0)}=\lambda_1^k\,(a_1v_1+\varepsilon_k)$ con $\varepsilon_k\to0$. Por lo tanto, si $\varphi$ es un funcional lineal con $\varphi(v_1)\neq0$: $\ \dfrac{\varphi(A v^{(k)})}{\varphi(v^{(k)})}\to\lambda_1$, y si $\lambda_1>0$ real, $v^{(k)}\to\pm v_1$. La velocidad es $O\big(|\lambda_2/\lambda_1|^k\big)$.`,
    R`<p>$A^kv^{(0)}=\sum_ia_i\lambda_i^kv_i=\lambda_1^k\Big(a_1v_1+\underbrace{\sum_{i\ge2}a_i(\lambda_i/\lambda_1)^kv_i}_{\varepsilon_k}\Big)$ y $|\lambda_i/\lambda_1|<1$ para $i\ge2$, así que $\varepsilon_k\to0$ y $\|\varepsilon_k\|\le C|\lambda_2/\lambda_1|^k$.</p>
    <p>Aplicando $\varphi$: $\dfrac{\varphi(A^{k+1}v^{(0)})}{\varphi(A^kv^{(0)})}=\lambda_1\dfrac{a_1\varphi(v_1)+\varphi(\varepsilon_{k+1})}{a_1\varphi(v_1)+\varphi(\varepsilon_k)}\to\lambda_1$ porque $a_1\varphi(v_1)\neq0$. La normalización solo reescala $v^{(k)}$ por un escalar y no cambia la dirección, de modo que $v^{(k)}=\pm\dfrac{a_1v_1+\varepsilon_k}{\|a_1v_1+\varepsilon_k\|}\to\pm v_1$. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Potencia inversa y desplazamientos',
    R`Si $A$ es inversible y $\lambda$ es autovalor, $\lambda^{-1}$ lo es de $A^{-1}$ (mismo autovector). Iterar $Av^{(k+1)}=v^{(k)}$ (potencia inversa) converge al autovalor de <b>menor módulo</b>. Aplicado a $A-\mu I$: la potencia da el autovalor <b>más lejano</b> a $\mu$; la potencia inversa da el <b>más cercano</b> a $\mu$. Para matrices simétricas, $\|A\|_2=\rho(A)$ y en general $\|A\|_2=\sqrt{\rho(A^tA)}$, por lo que la potencia aplicada a $A^tA$ da $\|A\|_2$ y $\operatorname{cond}_2(A)=\|A\|_2\|A^{-1}\|_2$.`,
    R`<p>$Av=\lambda v\Rightarrow v=\lambda A^{-1}v\Rightarrow A^{-1}v=\lambda^{-1}v$. El autovalor de menor módulo de $A$ es el de mayor módulo de $A^{-1}$.</p>
    <p>$A-\mu I$ tiene autovalores $\lambda_i-\mu$ con los mismos autovectores; el de mayor módulo corresponde al $\lambda_i$ más lejano de $\mu$. Su inversa tiene autovalores $(\lambda_i-\mu)^{-1}$, de mayor módulo cuando $|\lambda_i-\mu|$ es mínimo, o sea el más cercano. $\blacksquare$</p>`));

  root.appendChild(callout('warn', 'Cuándo falla o es lento',
    R`<ul><li>Si $a_1=0$ (el vector inicial es ortogonal a $v_1$ en la base), en teoría converge a $\lambda_2$; en la práctica el redondeo reintroduce $v_1$ y termina en $\lambda_1$.</li>
    <li>Si $|\lambda_1|=|\lambda_2|$ (autovalores $\pm$ o complejos conjugados) no converge.</li>
    <li>Si $|\lambda_2/\lambda_1|\approx1$ converge muy lento.</li></ul>`));

  root.appendChild(el('h2', { text: 'Visualización: el vector se alinea con el autovector dominante' }));
  const s1 = slider({ label: 'λ₁', min: 1, max: 4, step: 0.05, value: 3, format: (v) => v.toFixed(2) });
  const s2 = slider({ label: 'λ₂', min: -3.9, max: 3.9, step: 0.05, value: 2, format: (v) => v.toFixed(2) });
  const sth = slider({ label: 'dirección de v₁', min: 0, max: 180, step: 1, value: 30, format: (v) => v + '°' });
  const s0 = slider({ label: 'ángulo de v⁽⁰⁾', min: 0, max: 360, step: 1, value: 120, format: (v) => v + '°' });
  const sk = slider({ label: 'iteración k', min: 0, max: 25, step: 1, value: 3, format: (v) => v });
  root.appendChild(el('div', { class: 'controls' }, [s1.wrap, s2.wrap, sth.wrap, s0.wrap, sk.wrap]));
  const out = readout('');
  const viz = mountCanvas(root, { height: 320, view: {}, hint: 'A = Q·diag(λ₁,λ₂)·Qᵗ (simétrica); puntos rosas: v⁽ʲ⁾ para j ≤ k' });
  viz.setDraw(() => {
    const p = viz.plane; vistaIgual(p, 1.4); p.clear(); p.grid(0.5);
    const l1 = Number(s1.input.value); const l2 = Number(s2.input.value); const th = (Number(sth.input.value) * Math.PI) / 180; const k = Number(sk.input.value);
    const c = Math.cos(th); const s = Math.sin(th);
    const A = [[l1 * c * c + l2 * s * s, (l1 - l2) * c * s], [(l1 - l2) * c * s, l1 * s * s + l2 * c * c]];
    const a0 = (Number(s0.input.value) * Math.PI) / 180; let v = [Math.cos(a0), Math.sin(a0)];
    p.circle(0, 0, 1, { stroke: COLORS.textDim, wpx: 1.5, dash: [4, 4] });
    p.segment(-2 * c, -2 * s, 2 * c, 2 * s, COLORS.ok, 1.5, [6, 4]);
    const pts = [v]; let r = dot(v, mulv(A, v));
    for (let j = 0; j < k; j++) { const w = mulv(A, v); const n = norm2(w); v = w.map((x) => x / n); pts.push(v); r = dot(v, mulv(A, v)); }
    poligonal(p, pts, COLORS.pink, 1.5);
    pts.forEach((q, i) => p.dot(q[0], q[1], i === pts.length - 1 ? 7 : 4, i === pts.length - 1 ? COLORS.warn : COLORS.pink));
    flecha(p, 0, 0, v[0], v[1], COLORS.warn, 3);
    const cosErr = Math.abs(v[0] * c + v[1] * s);
    out.textContent = `r_${k} = ${fmt(r, 5)}   (λ₁ = ${fmt(l1, 2)}) · error del autovalor = ${Math.abs(r - l1).toExponential(2)}\nángulo entre v⁽ᵏ⁾ y v₁ = ${fmt((Math.acos(Math.min(1, cosErr)) * 180) / Math.PI, 4)}° · razón |λ₂/λ₁| = ${fmt(Math.abs(l2 / l1), 3)}  →  el error se multiplica por ≈ ${fmt(Math.abs(l2 / l1), 3)} (al cuadrado en r_k, por ser simétrica) en cada paso.`
      + (Math.abs(l2) >= l1 ? '\n⚠ |λ₂| ≥ λ₁: no hay autovalor dominante, el método no converge.' : '');
  });
  [s1, s2, sth, s0, sk].forEach((s) => s.input.addEventListener('input', () => viz.redraw()));
  root.appendChild(out);
  root.appendChild(callout('tip', 'Qué observar',
    R`Acercá $\lambda_2$ a $\lambda_1$: la convergencia se vuelve lenta. Ponelo en $-\lambda_1$ y el vector oscila entre dos puntos opuestos sin converger. Notá además que $r_k$ converge mucho más rápido que el vector (el error del cociente de Rayleigh es cuadrático en el error angular para matrices simétricas).`));
}
