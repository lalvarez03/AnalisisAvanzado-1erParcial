// materias/algoritmos-3/pages/complejidad.js — Complejidad asintótica: O, Ω, Θ (Práctica 1, Ej. 20).

import { el, slider, selectControl } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { poligonal } from '../lib.js';

const R = String.raw;

const PARES = {
  lin: { g: (n) => 5 * n + 2, f: (n) => 0.5 * n - 20, tg: '5n + 2', tf: 'n/2 − 20' },
  cuad: { g: (n) => 2 * n * n - 50 * n - 4, f: (n) => n, tg: '2n² − 50n − 4', tf: 'n' },
  exp: { g: (n) => 2 ** n, f: (n) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }, tg: '2ⁿ', tf: 'n!' },
};

export function renderComplejidad(root) {
  root.appendChild(pageHeader('Complejidad asintótica: O, Ω y Θ',
    'Para comparar algoritmos no importa cuántos nanosegundos tarda cada uno en tu compu, sino <em>cómo crece</em> el tiempo cuando la entrada se agranda. '
    + 'La notación asintótica ignora constantes y términos chicos para quedarse con esa forma de crecer.'));

  root.appendChild(callout('def', 'O, Ω y Θ',
    R`Para $f,g:\mathbb{N}\to\mathbb{R}_{\ge0}$:
    <ul><li>$g\in O(f)$ si $\exists c>0\ \exists n_0\ \forall n\ge n_0:\ g(n)\le c\,f(n)$ (cota superior).</li>
    <li>$g\in\Omega(f)$ si $\exists c>0\ \exists n_0\ \forall n\ge n_0:\ g(n)\ge c\,f(n)$ (cota inferior).</li>
    <li>$g\in\Theta(f)$ si $g\in O(f)$ y $g\in\Omega(f)$ (crecen igual, salvo constantes).</li></ul>`));

  root.appendChild(callout('thm', 'Propiedades útiles',
    R`(a) $g\in O(f)\iff f\in\Omega(g)$. (b) $O$ es transitiva: $g\in O(f)$ y $f\in O(h)\Rightarrow g\in O(h)$. (c) Un polinomio de grado $d$ es $\Theta(n^d)$. (d) $2^n\le n!$ para todo $n\ge4$, o sea $2^n\in O(n!)$ con $c=1$ y $n_0=4$.`,
    R`<p>(a) $g(n)\le cf(n)\iff f(n)\ge\tfrac1cg(n)$: se usa el mismo $n_0$ y la constante $1/c$.</p>
    <p>(b) Si $g\le c_1f$ para $n\ge n_1$ y $f\le c_2h$ para $n\ge n_2$, entonces $g\le c_1c_2h$ para $n\ge\max(n_1,n_2)$.</p>
    <p>(c) $a_dn^d+\dots+a_0\le(|a_d|+\dots+|a_0|)n^d$ para $n\ge1$ (cota superior); y para $n$ grande, $a_dn^d$ domina, de donde $\ge\tfrac{a_d}2n^d$ (cota inferior).</p>
    <p>(d) Por inducción: $4!=24\ge16=2^4$. Si $n!\ge2^n$ con $n\ge4$, entonces $(n+1)!=(n+1)\,n!\ge5\cdot2^n\ge2\cdot2^n=2^{n+1}$. $\blacksquare$</p>`));

  root.appendChild(callout('warn', 'Errores comunes',
    R`<ul><li>$O(f)$ es una <em>cota superior</em>, no una igualdad: $n\in O(n^2)$ es cierto (aunque poco ajustado). Para decir "crece exactamente como" se usa $\Theta$.</li>
    <li>"El peor caso" y "$O$" son cosas distintas: se puede dar $\Theta$ del peor caso, o $O$ del mejor caso.</li>
    <li>Las constantes <b>sí</b> importan en la práctica (un $O(n)$ con constante $10^6$ pierde contra $O(n\log n)$ para $n$ razonables) pero no en la notación.</li></ul>`));

  // Viz 1: verificar cotas
  root.appendChild(el('h2', { text: 'Visualización 1: ¿g está en O(f)? Probá constantes' }));
  const par = selectControl({ label: 'Funciones: ', value: 'lin', options: [
    { value: 'lin', label: 'g = 5n + 2   vs   f = n/2 − 20' }, { value: 'cuad', label: 'g = 2n² − 50n − 4   vs   f = n' }, { value: 'exp', label: 'g = 2ⁿ   vs   f = n!' }] });
  const sc = slider({ label: 'constante c', min: 0.1, max: 30, step: 0.1, value: 12, format: (v) => v.toFixed(1) });
  const sn = slider({ label: 'n₀', min: 1, max: 60, step: 1, value: 10, format: (v) => v });
  root.appendChild(el('div', { class: 'controls' }, [par.wrap, sc.wrap, sn.wrap]));
  const out = readout('');
  const viz = mountCanvas(root, { height: 280, view: {}, hint: 'rosa = g(n) · verde = c·f(n) · línea vertical = n₀' });
  viz.setDraw(() => {
    const p = viz.plane; const P = PARES[par.select.value]; const c = Number(sc.input.value); const n0 = Number(sn.input.value);
    const N = par.select.value === 'exp' ? 14 : 60; p.view.xmin = 0; p.view.xmax = N;
    const gs = Array.from({ length: N + 1 }, (_, n) => P.g(n)); const fs = Array.from({ length: N + 1 }, (_, n) => c * P.f(n));
    const top = Math.max(...gs.slice(1), ...fs.slice(1)); p.view.ymin = Math.min(0, ...gs, ...fs) * 1.1; p.view.ymax = Math.min(top, 1e9) * 1.1 || 1; p.clear(); p.grid(Math.max(1, Math.round(N / 6)));
    poligonal(p, gs.map((y, n) => [n, y]), COLORS.pink, 3); poligonal(p, fs.map((y, n) => [n, y]), COLORS.ok, 3);
    p.segment(n0, p.view.ymin, n0, p.view.ymax, COLORS.warn, 1.5, [5, 4]);
    let ok = true; let primero = null;
    for (let n = n0; n <= (par.select.value === 'exp' ? 40 : 2000); n++) { if (P.g(n) > c * P.f(n) + 1e-9) { ok = false; primero = n; break; } }
    out.textContent = `¿g(n) ≤ ${c.toFixed(1)}·f(n) para todo n ≥ ${n0}? ${ok ? 'SÍ (en el rango revisado): estas constantes certifican g ∈ O(f).' : 'NO: falla en n = ' + primero + '. Probá con un c más grande o un n₀ mayor (si ninguno sirve, g ∉ O(f)).'}\n`
      + (par.select.value === 'cuad' ? 'g es cuadrática y f lineal: ningún c alcanza (g ∉ O(f)), pero f ∈ O(g).' : par.select.value === 'exp' ? 'n! crece más rápido que 2ⁿ: 2ⁿ ∈ O(n!) con c = 1, n₀ = 4.' : 'Ambas son lineales: g ∈ O(f) y f ∈ O(g) (g ∈ Θ(f)), con n₀ grande porque f(n) = n/2 − 20 es negativa al principio.');
  });
  [par.select, sc.input, sn.input].forEach((c) => c.addEventListener('input', () => viz.redraw()));
  par.select.addEventListener('change', () => viz.redraw());
  root.appendChild(out);

  // Viz 2: velocidades de crecimiento
  root.appendChild(el('h2', { text: 'Visualización 2: cuánto tarda cada orden' }));
  const sT = slider({ label: 'n', min: 1, max: 100, step: 1, value: 20, format: (v) => v });
  root.appendChild(el('div', { class: 'controls' }, [sT.wrap]));
  const tab = el('div', {});
  const fila = (n) => {
    const fact = n <= 20 ? String(factorial(n)) : '> 10¹⁸';
    return [['log n', Math.log2(n).toFixed(1)], ['n', n], ['n log n', (n * Math.log2(n)).toFixed(0)], ['n²', n * n], ['n³', n ** 3], ['2ⁿ', n <= 60 ? (2 ** n).toExponential(2) : '> 10¹⁸'], ['n!', n <= 20 ? fact : '> 10¹⁸']];
  };
  function factorial(n) { let r = 1n; for (let i = 2n; i <= BigInt(n); i++) r *= i; return r; }
  const calc = () => {
    const n = Number(sT.input.value);
    tab.innerHTML = '<table class="tbl"><tr><th>Orden</th><th>Operaciones</th><th>Tiempo a 10⁹ op/s</th></tr>'
      + fila(n).map(([k, v]) => {
        const num = Number(String(v).replace('> 10¹⁸', '1e18'));
        const seg = num / 1e9; const t = seg < 1e-6 ? '< 1 µs' : seg < 1 ? (seg * 1e3).toFixed(2) + ' ms' : seg < 3600 ? seg.toFixed(1) + ' s' : seg < 3.15e7 ? (seg / 86400).toFixed(1) + ' días' : seg < 3.15e16 ? (seg / 3.15e7).toExponential(1) + ' años' : 'más que la edad del universo';
        return `<tr><td>${k}</td><td>${v}</td><td>${t}</td></tr>`;
      }).join('') + '</table>';
  };
  sT.input.addEventListener('input', calc); root.appendChild(tab); calc();
  root.appendChild(callout('tip', 'Qué observar',
    R`A $n=100$ un algoritmo $O(n^2)$ hace $10^4$ operaciones (instantáneo) y uno $O(2^n)$ hace $\approx10^{30}$ (imposible). Por eso <b>backtracking</b> sirve solo para $n$ chicos y la <b>programación dinámica</b> o un <b>greedy</b> valen oro cuando se pueden aplicar.`));
}
