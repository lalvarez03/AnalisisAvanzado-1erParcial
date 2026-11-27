// materias/algoritmos-3/pages/dyc.js — Divide y conquista y Teorema Maestro (Práctica 4).

import { el, slider } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';

const R = String.raw;

/** Cuenta inversiones y comparaciones con MergeSort modificado. Θ(n log n). */
function contarInversiones(a) {
  let comps = 0;
  const rec = (v) => {
    if (v.length <= 1) return { v, inv: 0 };
    const m = v.length >> 1; const L = rec(v.slice(0, m)); const Rr = rec(v.slice(m));
    const out = []; let i = 0; let j = 0; let inv = L.inv + Rr.inv;
    while (i < L.v.length && j < Rr.v.length) { comps++; if (L.v[i] <= Rr.v[j]) out.push(L.v[i++]); else { out.push(Rr.v[j++]); inv += L.v.length - i; } }
    return { v: out.concat(L.v.slice(i), Rr.v.slice(j)), inv };
  };
  const r = rec(a); return { inv: r.inv, ordenado: r.v, comps };
}

export function renderDyc(root) {
  root.appendChild(pageHeader('Teorema Maestro: MergeSort e inversiones',
    'Un problema grande a veces se resuelve partiéndolo en subproblemas del mismo tipo, resolviendo cada uno y <em>combinando</em> las respuestas. '
    + 'La eficiencia depende de tres números: en cuántas partes se divide, de qué tamaño son y cuánto cuesta combinar.'));

  root.appendChild(callout('def', 'Esquema',
    R`<ol><li><b>Dividir:</b> partir la entrada de tamaño $n$ en $a$ subproblemas de tamaño $\approx n/b$.</li><li><b>Conquistar:</b> resolver cada uno recursivamente (con un caso base).</li><li><b>Combinar:</b> armar la respuesta global; cuesta $f(n)$.</li></ol>
    Resulta la recurrencia $T(n)=a\,T(n/b)+f(n)$. En MergeSort: $a=2$, $b=2$, $f(n)=\Theta(n)$ (el <code>merge</code>). En búsqueda binaria: $a=1$ (solo se sigue un lado), $b=2$, $f=\Theta(1)$.`));

  root.appendChild(callout('thm', 'Teorema Maestro (caso f(n) = Θ(n^d))',
    R`Si $T(n)=aT(n/b)+\Theta(n^d)$ con $a\ge1$, $b>1$, $d\ge0$, entonces
    <ul><li>si $d>\log_ba$: $T(n)=\Theta(n^d)$ (domina la <b>raíz</b>: combinar es lo caro);</li>
    <li>si $d=\log_ba$: $T(n)=\Theta(n^d\log n)$ (todos los niveles cuestan lo mismo);</li>
    <li>si $d<\log_ba$: $T(n)=\Theta(n^{\log_ba})$ (dominan las <b>hojas</b>).</li></ul>`,
    R`<p>Para $n=b^k$ el árbol de recursión tiene $k+1=\log_bn+1$ niveles; en el nivel $i$ hay $a^i$ subproblemas de tamaño $n/b^i$, cada uno con costo $(n/b^i)^d$. El costo total de ese nivel es $a^i(n/b^i)^d=n^d\,r^i$ con $r=a/b^d$. Entonces $T(n)=n^d\sum_{i=0}^{k}r^i+(\text{hojas})$ (las $a^k=n^{\log_ba}$ hojas son el último término de la suma).</p>
    <p><b>$r<1$</b> ($d>\log_ba$): la serie geométrica converge, $\sum_{i\le k}r^i\le\tfrac1{1-r}$, y $T(n)=\Theta(n^d)$ (el primer término ya es $n^d$).</p>
    <p><b>$r=1$</b> ($d=\log_ba$): hay $k+1$ términos iguales: $T(n)=n^d(k+1)=\Theta(n^d\log n)$.</p>
    <p><b>$r>1$</b> ($d<\log_ba$): la serie crece como su último término: $\sum_{i\le k}r^i=\Theta(r^k)$ y $n^dr^k=n^d\frac{a^k}{b^{dk}}=a^k=n^{\log_ba}$. Luego $T(n)=\Theta(n^{\log_ba})$. Para $n$ que no es potencia de $b$ se acota entre dos potencias consecutivas. $\blacksquare$</p>`));

  root.appendChild(callout('tip', 'Aplicaciones directas (Ej. 1–3)',
    R`<ul><li>MergeSort: $T(n)=2T(n/2)+n$, $d=1=\log_22\Rightarrow\Theta(n\log n)$.</li>
    <li>Búsqueda binaria: $T(n)=T(n/2)+1$, $d=0=\log_21\Rightarrow\Theta(\log n)$.</li>
    <li>$T(n)=3T(n/4)+n$: $\log_43\approx0{,}79<1=d\Rightarrow\Theta(n)$. $\ T(n)=3T(n/4)$: $d=0<0{,}79\Rightarrow\Theta(n^{\log_43})$.</li>
    <li>Recurrencias "restando" como $T(n)=T(n-1)+n$ no son del Teorema Maestro: se resuelven desarrollando, $T(n)=\Theta(n^2)$; $T(n)=2T(n-1)$ da $\Theta(2^n)$.</li>
    <li>Potencia $a^b$ (Ej. 6): $a^b=(a^{b/2})^2$ (y un factor $a$ extra si $b$ es impar) $\Rightarrow T(b)=T(b/2)+O(1)=\Theta(\log b)$.</li>
    <li>Índice espejo (Ej. 5): como $a$ es estrictamente creciente de enteros, $a_i-i$ es no decreciente; se busca binariamente el cambio de signo: $\Theta(\log n)$.</li></ul>`));

  root.appendChild(callout('thm', 'Contar inversiones en Θ(n log n) (Ej. 11)',
    R`Una <b>inversión</b> es un par $i<j$ con $A[i]>A[j]$. Con MergeSort modificado: se cuentan las inversiones de cada mitad (recursivamente) y se suman las <em>cruzadas</em> mientras se hace el merge: cada vez que se toma un elemento de la mitad derecha, forma inversión con <b>todos</b> los que quedan sin tomar en la izquierda.`,
    R`<p>Una inversión es de uno de tres tipos: ambos índices en la mitad izquierda, ambos en la derecha, o uno en cada una. Las dos primeras se cuentan recursivamente; contar las cruzadas por fuerza bruta costaría $\Theta(n^2)$. Como ambas mitades están ordenadas durante el merge, si se toma $R[j]$ antes que $L[i]$ es porque $R[j]<L[i]\le L[i+1]\le\dots$: forma inversión exactamente con $L[i],\dots,L[\text{fin}]$, es decir con $|L|-i$ elementos, y no hay otras inversiones cruzadas con $R[j]$. Costo: $T(n)=2T(n/2)+\Theta(n)=\Theta(n\log n)$. $\blacksquare$</p>`));

  root.appendChild(callout('warn', 'Errores comunes',
    R`<ul><li>Usar el Teorema Maestro cuando $f(n)$ no es polinomial o cuando los subproblemas no tienen el mismo tamaño.</li><li>Olvidar el costo de <em>copiar</em> subarreglos: <code>arr[:medio]</code> en Python es $\Theta(n)$, lo que cambia el $f(n)$ (en MergeSort no cambia el orden, pero en búsqueda binaria sí: pasaría a $\Theta(n)$ en total).</li><li>Que la recursión divida no garantiza que sea eficiente: si los subproblemas se solapan (Fibonacci) conviene programación dinámica.</li></ul>`));

  // Viz 1: Teorema maestro
  root.appendChild(el('h2', { text: 'Visualización 1: ¿dónde está el trabajo? (árbol de recursión)' }));
  const sa = slider({ label: 'a (subproblemas)', min: 1, max: 8, step: 1, value: 2, format: (v) => v });
  const sb = slider({ label: 'b (divisor)', min: 2, max: 8, step: 1, value: 2, format: (v) => v });
  const sd = slider({ label: 'd (f = n^d)', min: 0, max: 3, step: 0.25, value: 1, format: (v) => v.toFixed(2) });
  root.appendChild(el('div', { class: 'controls' }, [sa.wrap, sb.wrap, sd.wrap]));
  const out = readout('');
  const viz = mountCanvas(root, { height: 260, view: {}, hint: 'altura de cada barra = trabajo total del nivel i (n = bᵏ con k = 8)' });
  viz.setDraw(() => {
    const p = viz.plane; const a = Number(sa.input.value); const b = Number(sb.input.value); const d = Number(sd.input.value);
    const k = Math.min(8, Math.floor(Math.log(1e6) / Math.log(b))); const n = b ** k;
    const trabajo = Array.from({ length: k + 1 }, (_, i) => (a ** i) * ((n / b ** i) ** d));
    const mx = Math.max(...trabajo); p.view.xmin = -0.6; p.view.xmax = k + 0.6; p.view.ymin = -0.12 * mx; p.view.ymax = mx * 1.12; p.clear(); p.grid(1);
    trabajo.forEach((w, i) => { p.polygon([[i - 0.38, 0], [i + 0.38, 0], [i + 0.38, w], [i - 0.38, w]], { stroke: COLORS.accent, fill: COLORS.accent + '88', wpx: 1.5 }); p.text(String(i), i, -0.07 * mx, { align: 'center', color: COLORS.textDim }); });
    const L = Math.log(a) / Math.log(b); const eps = 1e-9;
    const caso = d > L + eps ? 1 : Math.abs(d - L) <= eps ? 2 : 3;
    const res = caso === 1 ? `Θ(n^${d})  (domina la raíz)` : caso === 2 ? `Θ(n^${d} · log n)  (todos los niveles pesan igual)` : `Θ(n^${L.toFixed(2)})  (dominan las hojas: log_${b}(${a}) = ${L.toFixed(2)})`;
    out.textContent = `T(n) = ${a}·T(n/${b}) + n^${d}   →   log_${b}(${a}) = ${L.toFixed(3)}  vs  d = ${d}\nCaso ${caso}: T(n) = ${res}\nTrabajo por nivel: ${trabajo.map((w) => (w < 1e5 ? w.toFixed(0) : w.toExponential(1))).join(' · ')}`;
  });
  [sa, sb, sd].forEach((s) => s.input.addEventListener('input', () => viz.redraw()));
  root.appendChild(out);

  // Viz 2: inversiones
  root.appendChild(el('h2', { text: 'Visualización 2: contar inversiones' }));
  const inp = el('input', { type: 'text', value: '3, 1, 4, 1, 5, 9, 2, 6', style: 'width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--bg-soft);color:var(--text);font:inherit;' });
  root.appendChild(el('div', { class: 'controls' }, [el('div', { class: 'control' }, [el('label', { text: 'Arreglo (números separados por comas): ' }), inp])]));
  const out2 = readout('');
  const calc = () => {
    const a = inp.value.split(/[ ,;]+/).map(Number).filter((x) => Number.isFinite(x) && x === x);
    if (a.length < 1 || a.length > 400) { out2.textContent = 'Ingresá entre 1 y 400 números.'; return; }
    let fuerza = 0; for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) if (a[i] > a[j]) fuerza++;
    const r = contarInversiones(a);
    out2.textContent = `n = ${a.length}\nfuerza bruta (Θ(n²)): ${fuerza} inversiones, ${(a.length * (a.length - 1)) / 2} comparaciones de pares\nMergeSort modificado (Θ(n log n)): ${r.inv} inversiones, ${r.comps} comparaciones del merge\n${fuerza === r.inv ? '✓ coinciden' : '✗ NO coinciden'}   ·   ordenado: [${r.ordenado.join(', ')}]`;
  };
  inp.addEventListener('input', calc); root.appendChild(out2); calc();
}
