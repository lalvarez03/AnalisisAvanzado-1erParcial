// pages/sup-inf.js — Supremos e ínfimos (Práctica 1).

import { el, slider, selectControl } from '../utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../utils/page.js';
import { exRef } from '../utils/ejercicios.js';
import { seccionResueltos } from '../utils/resueltos.js';
import { RES_SUP_INF } from '../utils/resueltos-data.js';
import { COLORS } from '../constants.js';

// Conjuntos de ejemplo en R (representados por muestras + descripción analítica).
// Cada conjunto declara sup/inf y si son máximo/mínimo, para explorar AMBOS lados.
const SETS = {
  interval_oc: {
    label: '(0, 1]   (semiabierto)',
    sample: () => Array.from({ length: 40 }, (_, i) => 0.02 + (0.98 * i) / 39),
    sup: 1, hasMax: true, inf: 0, hasMin: false,
    note: 'sup = 1 y es MÁXIMO (1 ∈ A). inf = 0 pero NO es mínimo (0 ∉ A). Caso clásico: existe máximo pero no mínimo.',
  },
  interval_co: {
    label: '[0, 1)   (semiabierto al revés)',
    sample: () => Array.from({ length: 40 }, (_, i) => (0.98 * i) / 39),
    sup: 1, hasMax: false, inf: 0, hasMin: true,
    note: 'inf = 0 y es MÍNIMO (0 ∈ A). sup = 1 pero NO es máximo (1 ∉ A). El espejo del caso anterior: existe mínimo pero no máximo.',
  },
  inv_2n: {
    label: 'B = { 1/2ⁿ : n ∈ ℕ }',
    sample: () => Array.from({ length: 10 }, (_, i) => 1 / Math.pow(2, i + 1)),
    sup: 0.5, hasMax: true, inf: 0, hasMin: false,
    note: 'sup = 1/2 = máx (n=1). inf = 0 (los términos → 0) pero 0 ∉ B: NO hay mínimo. El ínfimo es el límite que no se alcanza.',
  },
  inv_2n_0: {
    label: 'B ∪ {0}',
    sample: () => [0, ...Array.from({ length: 10 }, (_, i) => 1 / Math.pow(2, i + 1))],
    sup: 0.5, hasMax: true, inf: 0, hasMin: true,
    note: 'Ahora 0 ∈ A, así que inf = 0 = MÍNIMO. Agregar el punto límite convierte el ínfimo en mínimo.',
  },
  neg_inv_n: {
    label: 'C = { −1/n : n ∈ ℕ }',
    sample: () => Array.from({ length: 12 }, (_, i) => -1 / (i + 1)),
    sup: 0, hasMax: false, inf: -1, hasMin: true,
    note: 'Espejo de {1/n}: inf = −1 = MÍNIMO (n=1). sup = 0 pero NO es máximo (0 ∉ C). Acá lo interesante es el supremo no alcanzado.',
  },
  half_line: {
    label: 'D = [−1, +∞)   (semirrecta)',
    sample: () => Array.from({ length: 50 }, (_, i) => -1 + (5 * i) / 49),
    sup: Infinity, hasMax: false, inf: -1, hasMin: true,
    note: 'inf = −1 = MÍNIMO. No está acotado superiormente: no tiene supremo (finito). Muestra un lado acotado y el otro no.',
  },
  quad: {
    label: '{ x² − x − 1 : x ∈ ℝ }',
    sample: () => Array.from({ length: 60 }, (_, i) => { const x = -2 + (4 * i) / 59; return x * x - x - 1; }),
    sup: Infinity, hasMax: false, inf: -1.25, hasMin: true,
    note: 'La parábola x²−x−1 tiene mínimo en x=1/2: vale −5/4 = MÍNIMO. No está acotada superiormente.',
  },
  two_sided: {
    label: 'E = (−2, −1) ∪ (1, 2)   (dos trozos)',
    sample: () => [
      ...Array.from({ length: 20 }, (_, i) => -2 + 0.03 + (0.94 * i) / 19),
      ...Array.from({ length: 20 }, (_, i) => 1 + 0.03 + (0.94 * i) / 19),
    ],
    sup: 2, hasMax: false, inf: -2, hasMin: false,
    note: 'sup = 2 e inf = −2, ninguno alcanzado (ambos extremos abiertos). No hay ni máximo ni mínimo, aunque el conjunto no sea un intervalo.',
  },
  q_incomplete: {
    label: 'A = { r ∈ ℚ : r² < 2 }  (Incompletitud de ℚ)',
    sample: () => [1, 1.4, 1.41, 1.414, 1.4142, 1.41421, 1.414213, 1.4142135],
    sup: Math.SQRT2, hasMax: false, inf: -Math.SQRT2, hasMin: false,
    note: 'El supremo en ℝ es √2 ≈ 1.4142..., pero √2 ∉ ℚ. Muestra que ℚ carece del Axioma de Completitud.',
  },
};

export function renderSupInf(root) {
  root.appendChild(pageHeader(
    'Supremos e ínfimos',
    'El axioma de completitud de $\\mathbb{R}$: todo conjunto no vacío y acotado superiormente tiene '
    + '<strong>supremo</strong>. Es lo que distingue $\\mathbb{R}$ de $\\mathbb{Q}$.'
  ));

  root.appendChild(callout('def', 'Cotas y conjuntos acotados',
    '$c$ es <strong>cota superior</strong> de $A$ si $a \\le c$ para todo $a \\in A$; es '
    + '<strong>cota inferior</strong> si $c \\le a$ para todo $a \\in A$.<br>'
    + '$A$ está <strong>acotado superiormente</strong> si tiene alguna cota superior, '
    + '<strong>acotado inferiormente</strong> si tiene cota inferior, y <strong>acotado</strong> si tiene ambas.'
  ));

  root.appendChild(callout('def', 'Supremo, ínfimo, máximo y mínimo',
    '$s$ es <strong>supremo</strong> de $A$ (la <em>menor</em> cota superior) si:<br>'
    + '1) $a \\le s$ para todo $a \\in A$ (es cota superior);<br>'
    + '2) si $t$ es otra cota superior, entonces $s \\le t$.<br>'
    + 'El <strong>ínfimo</strong> $\\inf A$ es la <em>mayor</em> cota inferior (definición análoga).<br>'
    + 'Si $\\sup A \\in A$ es el <strong>máximo</strong> ($\\max A$); si $\\inf A \\in A$ es el '
    + '<strong>mínimo</strong> ($\\min A$).'
  ));

  root.appendChild(callout('thm', 'Teorema 1.11 — Principio de Arquímedes',
    'Dado cualquier $x \\in \\mathbb{R}$, existe un $n \\in \\mathbb{N}$ tal que $n > x$.<br>'
    + '<em>Equivalente:</em> El conjunto $\\mathbb{N}$ no está acotado superiormente en $\\mathbb{R}$.<br>'
    + '• <strong>Versión Infinitesimal (Prop. 1.12):</strong> Si $y > 0$, existe $n \\in \\mathbb{N}$ tal que $0 < \\frac{1}{n} < y$.',
    '<p><span class="proof-step">Demostración (Por el absurdo):</span><br>'
    + 'Supongamos por el absurdo que $\\mathbb{N}$ está acotado superiormente. Como $\\mathbb{N} \\neq \\emptyset$, el Axioma de Completitud de $\\mathbb{R}$ garantiza la existencia de su supremo $s = \\sup(\\mathbb{N}) \\in \\mathbb{R}$.<br>'
    + 'Si consideramos $t = s - 1 < s$, entonces $t$ no puede ser cota superior de $\\mathbb{N}$. Luego, existe un $m \\in \\mathbb{N}$ tal que $s - 1 < m \\le s$.<br>'
    + 'Sumando $1$ a la desigualdad se obtiene $s < m + 1$. Dado que $m + 1 \\in \\mathbb{N}$, esto contradice que $s$ sea cota superior de $\\mathbb{N}$. $\\blacksquare$</p>'
    + '<p><span class="proof-step">Demostración de la versión infinitesimal:</span><br>'
    + 'Como $y > 0$, su inverso multiplicativo $y^{-1} \\in \\mathbb{R}$ existe. Por el Principio de Arquímedes, existe $n \\in \\mathbb{N}$ tal que $n > y^{-1}$, lo cual es equivalente a $\\frac{1}{n} < y$. $\\blacksquare$</p>'
  ));

  root.appendChild(callout('thm', 'Propiedad 1.14 — Densidad de ℚ y ℝ \\ ℚ en ℝ',
    'Sean $x, y \\in \\mathbb{R}$ con $x < y$:<br>'
    + '1. <strong>Densidad de ℚ:</strong> Existe un racional $q \\in \\mathbb{Q}$ tal que $x < q < y$.<br>'
    + '2. <strong>Densidad de irracinoales:</strong> Existe un irracional $z \\in \\mathbb{R} \\setminus \\mathbb{Q}$ tal que $x < z < y$.',
    '<p><span class="proof-step">Demostración (Densidad de ℚ):</span><br>'
    + 'Dado que $y - x > 0$, por la versión infinitesimal de Arquímedes existe $n \\in \\mathbb{N}$ tal que $0 < \\frac{1}{n} < y - x$, lo que implica $n(y - x) > 1$, es decir, $ny - nx > 1$.<br>'
    + 'Al ser la distancia entre $nx$ y $ny$ estrictamente mayor a $1$, existe un entero $m \\in \\mathbb{Z}$ tal que $nx < m < ny$. Dividiendo por $n$, resulta $x < \\frac{m}{n} < y$. Tomando $q = \\frac{m}{n} \\in \\mathbb{Q}$, queda probado. $\\blacksquare$</p>'
    + '<p><span class="proof-step">Demostración (Densidad de irracionales):</span><br>'
    + 'Como $\\sqrt{2} > 0$, se cumple $\\frac{x}{\\sqrt{2}} < \\frac{y}{\\sqrt{2}}$. Por la densidad de $\\mathbb{Q}$, existe $q \\in \\mathbb{Q}$ no nulo tal que $\\frac{x}{\\sqrt{2}} < q < \\frac{y}{\\sqrt{2}}$.<br>'
    + 'Multiplicando por $\\sqrt{2}$, se obtiene $x < q\\sqrt{2} < y$. El número $z = q\\sqrt{2}$ es irracional (si fuera racional, $\\sqrt{2} = z/q$ sería racional, lo cual es absurdo). $\\blacksquare$</p>'
  ));

  root.appendChild(callout('warn', 'Axioma de Completitud',
    'Todo $A \\subseteq \\mathbb{R}$ no vacío y acotado superiormente tiene supremo en $\\mathbb{R}$. '
    + '$\\mathbb{Q}$ no lo cumple: $\\{r \\in \\mathbb{Q} : r^2 < 2\\}$ no tiene supremo en $\\mathbb{Q}$ '
    + '(sería $\\sqrt{2}$).',
    // demostración de que Q no es completo
    '<p><span class="proof-step">Demostración:</span><br>'
    + '1. $A \\neq \\emptyset$ pues $1 \\in \\mathbb{Q}$ y $1^2 = 1 < 2 \\implies 1 \\in A$.<br>'
    + '2. $A$ está acotado superiormente por $2$ (si $r > 2 \\implies r^2 > 4 > 2 \\implies r \\notin A$).<br>'
    + '3. Supongamos por el absurdo que existe $s = \\sup(A) \\in \\mathbb{Q}$. Por tricotomía, analizamos las tres opciones:<br>'
    + '&nbsp;&nbsp;• <strong>Caso $s^2 = 2$:</strong> Imposible, pues $\\sqrt{2} \\notin \\mathbb{Q}$.<br>'
    + '&nbsp;&nbsp;• <strong>Caso $s^2 < 2$:</strong> Por densidad, como $s < \\sqrt{2}$, existe $q \\in \\mathbb{Q}$ tal que $s < q < \\sqrt{2}$. Elevando al cuadrado, $q^2 < 2 \\implies q \\in A$. Pero $q > s$, contradiciendo que $s$ sea cota superior.<br>'
    + '&nbsp;&nbsp;• <strong>Caso $s^2 > 2$:</strong> Por densidad, como $s > \\sqrt{2}$, existe $q \\in \\mathbb{Q}$ tal que $\\sqrt{2} < q < s$. Para todo $r \\in A$ vale $r^2 < 2 < q^2 \\implies r < q$, luego $q$ es cota superior de $A$. Pero $q < s$, contradiciendo que $s$ sea la menor cota superior.<br>'
    + 'Por contradicción, no existe tal $s \\in \\mathbb{Q}$. $\\blacksquare$</p>'
  ));


  root.appendChild(el('h2', { text: 'Caracterización ε del supremo' }));
  root.appendChild(exRef(1, 3));
  root.appendChild(callout('', 'La versión operativa',
    '$s = \\sup(A)$ $\\iff$ $s$ es cota superior <strong>y</strong> para todo $\\varepsilon > 0$ existe '
    + '$a \\in A$ con $s - \\varepsilon < a \\le s$.<br>'
    + 'Análogamente, $i = \\inf(A)$ $\\iff$ $i$ es cota inferior <strong>y</strong> para todo '
    + '$\\varepsilon > 0$ existe $a \\in A$ con $i \\le a < i + \\varepsilon$.<br>'
    + '<em>Idea:</em> si te corrés un poquito a la izquierda de $s$ (o a la derecha de $i$), siempre '
    + 'encontrás un elemento del conjunto.',
    // demostración de la equivalencia
    '<p><span class="proof-step">(⇒)</span> Sea $s = \\sup(A)$. Es cota superior por definición. '
    + 'Dado $\\varepsilon > 0$, el número $s - \\varepsilon$ es menor que $s$, así que no puede ser cota '
    + 'superior (porque $s$ es la menor). Luego existe $a \\in A$ con $a > s - \\varepsilon$; y $a \\le s$ '
    + 'por ser $s$ cota superior. Entonces $s - \\varepsilon < a \\le s$.</p>'
    + '<p><span class="proof-step">(⇐)</span> Supongamos que $s$ es cota superior y cumple la condición ε. '
    + 'Sea $t < s$ cualquier número. Tomando $\\varepsilon = s - t > 0$, existe $a \\in A$ con '
    + '$a > s - \\varepsilon = t$. Entonces $t$ no es cota superior. Por lo tanto toda cota superior es '
    + '$\\ge s$: $s$ es la menor, es decir $s = \\sup(A)$. $\\blacksquare$</p>'
  ));

  root.appendChild(el('h2', { text: 'Explorador' }));
  root.appendChild(el('p', { html:
    'Elegí un conjunto y el <strong>modo</strong>: en <em>Supremo</em> se analiza la menor cota superior; '
    + 'en <em>Ínfimo</em>, la mayor cota inferior. Movés la cota candidata $t$ y la tolerancia $\\varepsilon$, '
    + 'y la app te dice si $t$ es cota (superior o inferior según el modo) y si la banda '
    + 'atrapa algún elemento (lo que confirma el supremo o el ínfimo).' }));
  root.appendChild(exRef(1, 4));

  const controls = el('div', { class: 'controls' });
  const setSel = selectControl({
    label: 'Conjunto A',
    options: Object.entries(SETS).map(([k, v]) => ({ value: k, label: v.label })),
    value: 'interval_oc',
  });
  const modeSel = selectControl({
    label: 'Modo',
    options: [{ value: 'sup', label: 'Supremo (menor cota superior)' },
              { value: 'inf', label: 'Ínfimo (mayor cota inferior)' }],
    value: 'sup',
  });
  const tSlider = slider({ label: 'cota candidata t', min: -2.4, max: 2.4, step: 0.02, value: 1.3, format: (v) => v.toFixed(2) });
  const epsSlider = slider({ label: 'ε', min: 0.02, max: 1, step: 0.02, value: 0.3, format: (v) => v.toFixed(2) });
  controls.appendChild(setSel.wrap);
  controls.appendChild(modeSel.wrap);
  controls.appendChild(tSlider.wrap);
  controls.appendChild(epsSlider.wrap);
  root.appendChild(controls);

  const viz = mountCanvas(root, {
    height: 240,
    view: { xmin: -2.4, xmax: 2.4, ymin: -1, ymax: 1 },
    hint: 'puntos = elementos de A · línea verde = sup/inf · línea naranja = cota candidata t',
  });

  const out = readout('');
  root.appendChild(out);

  const noteEl = callout('tip', 'Sobre este conjunto', SETS['interval_oc'].note);
  root.appendChild(noteEl);

  function draw() {
    const p = viz.plane;
    p.clear();
    // eje
    p.ctx.strokeStyle = COLORS.textDim; p.ctx.lineWidth = 1.5;
    p.ctx.beginPath(); p.ctx.moveTo(0, p.sy(0)); p.ctx.lineTo(p.width, p.sy(0)); p.ctx.stroke();
    for (const tick of [-2, -1, 0, 1, 2]) {
      p.ctx.strokeStyle = COLORS.grid;
      p.ctx.beginPath(); p.ctx.moveTo(p.sx(tick), p.sy(-0.1)); p.ctx.lineTo(p.sx(tick), p.sy(0.1)); p.ctx.stroke();
      p.text(String(tick), tick, -0.35, { align: 'center', color: COLORS.textDim, font: '11px Inter' });
    }

    const S = SETS[setSel.select.value];
    const mode = modeSel.select.value; // 'sup' | 'inf'
    const isSup = mode === 'sup';
    const t = Number(tSlider.input.value);
    const eps = Number(epsSlider.input.value);
    const val = isSup ? S.sup : S.inf;          // el valor (sup o inf)
    const hasVal = isFinite(val);
    const isExtremeInSet = isSup ? S.hasMax : S.hasMin;

    // banda:  sup → (sup−ε, sup] ;  inf → [inf, inf+ε)
    if (hasVal) {
      p.ctx.fillStyle = 'rgba(53,201,138,0.16)';
      const bx1 = isSup ? val - eps : val;
      const bx2 = isSup ? val : val + eps;
      const xL = p.sx(bx1), xR = p.sx(bx2);
      p.ctx.fillRect(xL, 0, xR - xL, p.height);
    }

    // puntos del conjunto (verdes si caen en la banda)
    const pts = S.sample();
    let inBand = 0;
    for (const a of pts) {
      if (a < -2.4 || a > 2.4) continue;
      const inb = hasVal && (isSup
        ? (a > val - eps && a <= val + 1e-9)
        : (a >= val - 1e-9 && a < val + eps));
      if (inb) inBand++;
      p.dot(a, 0, inb ? 5 : 3.5, inb ? COLORS.ok : COLORS.accent);
    }

    // línea del sup/inf
    if (hasVal) {
      p.ctx.strokeStyle = COLORS.ok; p.ctx.lineWidth = 2;
      p.ctx.beginPath(); p.ctx.moveTo(p.sx(val), p.sy(-0.6)); p.ctx.lineTo(p.sx(val), p.sy(0.6)); p.ctx.stroke();
      p.text(isSup ? 'sup' : 'inf', val, 0.75, { align: 'center', color: COLORS.ok, font: 'bold 12px Inter' });
    } else {
      const msg = isSup ? 'no acotado sup. →' : '← no acotado inf.';
      p.text(msg, isSup ? 1.5 : -1.5, 0.75, { align: 'center', color: COLORS.warn, font: '12px Inter' });
    }

    // cota candidata t
    p.ctx.strokeStyle = COLORS.warn; p.ctx.lineWidth = 2; p.ctx.setLineDash([5, 4]);
    p.ctx.beginPath(); p.ctx.moveTo(p.sx(t), p.sy(-0.6)); p.ctx.lineTo(p.sx(t), p.sy(0.6)); p.ctx.stroke();
    p.ctx.setLineDash([]);
    p.text('t', t, -0.75, { align: 'center', color: COLORS.warn, font: 'bold 12px Inter' });

    // ¿es cota (superior o inferior)?
    const isCota = isSup ? pts.every((a) => a <= t + 1e-9) : pts.every((a) => a >= t - 1e-9);
    const cotaTxt = isSup
      ? (isCota ? '✓ es cota superior de A' : '✗ NO es cota superior (hay elementos mayores)')
      : (isCota ? '✓ es cota inferior de A' : '✗ NO es cota inferior (hay elementos menores)');
    const bandaTxt = isSup ? '(sup−ε, sup]' : '[inf, inf+ε)';
    const extremeName = isSup ? 'máximo' : 'mínimo';

    out.textContent =
      `Modo: ${isSup ? 'SUPREMO' : 'ÍNFIMO'}\n`
      + `t = ${t.toFixed(2)}:  ${cotaTxt}\n`
      + (hasVal
        ? `${isSup ? 'sup' : 'inf'}(A) = ${val.toFixed(3)} ${isExtremeInSet ? `(= ${extremeName})` : `(no es ${extremeName}: ${isSup ? 'sup' : 'inf'} ∉ A)`}\n`
          + `en ${bandaTxt}:  ${inBand} elemento(s) → confirma que es la ${isSup ? 'menor cota superior' : 'mayor cota inferior'}`
        : `A no está acotado ${isSup ? 'superiormente' : 'inferiormente'}: no tiene ${isSup ? 'supremo' : 'ínfimo'} (finito).`);
  }

  viz.setDraw(draw);
  setSel.select.addEventListener('change', () => {
    noteEl.querySelector('div:last-child').textContent = SETS[setSel.select.value].note;
    viz.redraw();
  });
  modeSel.select.addEventListener('change', () => {
    // reposicionar t a un lugar razonable según el modo
    const S = SETS[setSel.select.value];
    if (modeSel.select.value === 'inf') tSlider.input.value = String(Math.max(-2.4, (isFinite(S.inf) ? S.inf : -2) - 0.3));
    else tSlider.input.value = String(Math.min(2.4, (isFinite(S.sup) ? S.sup : 2) + 0.3));
    tSlider.setLabel(Number(tSlider.input.value));
    viz.redraw();
  });
  tSlider.input.addEventListener('input', () => viz.redraw());
  epsSlider.input.addEventListener('input', () => viz.redraw());

  root.appendChild(callout('thm', 'Propiedades útiles (Ej. 5–6)',
    '• Si $A \\subseteq B$ y $B$ acotado sup., entonces $\\sup A \\le \\sup B$.<br>'
    + '• $\\inf(-A) = -\\sup(A)$.<br>'
    + '• Si $c > 0$: $\\sup(cA) = c\\,\\sup(A)$.<br>'
    + 'Además, ínfimo y supremo son <strong>únicos</strong> cuando existen.',
    // demostraciones
    '<p><span class="proof-step">$A \\subseteq B \\Rightarrow \\sup A \\le \\sup B$:</span> '
    + '$\\sup B$ es cota superior de $B$, y como $A \\subseteq B$, también lo es de $A$. Como $\\sup A$ '
    + 'es la <em>menor</em> cota superior de $A$, $\\sup A \\le \\sup B$.</p>'
    + '<p><span class="proof-step">$\\inf(-A) = -\\sup A$:</span> $a \\le \\sup A\\ \\forall a$ '
    + '$\\iff -a \\ge -\\sup A\\ \\forall a$, así que $-\\sup A$ es cota inferior de $-A$. Si $c$ es otra '
    + 'cota inferior de $-A$, entonces $-c$ es cota superior de $A$, luego $-c \\ge \\sup A$, o sea '
    + '$c \\le -\\sup A$: es la mayor cota inferior.</p>'
    + '<p><span class="proof-step">Unicidad:</span> si $s$ y $s\'$ son supremos, cada uno es cota superior '
    + 'y el otro es la menor, entonces $s \\le s\'$ y $s\' \\le s$, luego $s = s\'$. $\\blacksquare$</p>'
  ));
  root.appendChild(exRef(1, [5, 6]));

  root.appendChild(seccionResueltos('Ejercicios resueltos', RES_SUP_INF));

  root.appendChild(callout('tip', '¿Querés practicar las demostraciones?',
    'En el <a href="#asistente">Asistente de ejercicios</a> podés armar paso a paso, arrastrando, la prueba '
    + 'de la caracterización $\\varepsilon$ del supremo y otras de la Práctica 1.'
  ));
}
