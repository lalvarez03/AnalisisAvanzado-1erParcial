// pages/em-distancia.js — Espacios métricos: distancia y bolas.

import { el, slider, selectControl } from '../utils/dom.js';
import { pageHeader, callout, mountCanvas } from '../utils/page.js';
import { exRef } from '../utils/ejercicios.js';
import { COLORS } from '../constants.js';
import { registerCleanup } from '../state.js';

// Métricas en R^2 (con centro en el origen para la bola).
const METRICS = {
  d2: { name: 'Euclídea  d₂', d: (x, y) => Math.hypot(x, y), tex: 'd_2(x,y)=\\sqrt{\\sum (x_i-y_i)^2}' },
  d1: { name: 'Taxicab  d₁', d: (x, y) => Math.abs(x) + Math.abs(y), tex: 'd_1(x,y)=\\sum |x_i-y_i|' },
  dinf: { name: 'Máximo  d∞', d: (x, y) => Math.max(Math.abs(x), Math.abs(y)), tex: 'd_\\infty(x,y)=\\max_i |x_i-y_i|' },
};

export function renderDistancia(root) {
  root.appendChild(pageHeader(
    'Distancia y bolas',
    'Una <strong>métrica</strong> mide cuán lejos están dos puntos. Cambiar la métrica cambia la forma '
    + 'de las bolas, aunque en $\\mathbb{R}^n$ todas las bolas “atrapan” los mismos conjuntos abiertos.'
  ));

  root.appendChild(callout('def', 'Definición — Espacio métrico',
    'Un par $(E, d)$ con $d: E \\times E \\to \\mathbb{R}_{\\ge 0}$ tal que para todo $x,y,z$:<br>'
    + '1) $d(x,y) = 0 \\iff x = y$ (positividad e identidad);<br>'
    + '2) $d(x,y) = d(y,x)$ (simetría);<br>'
    + '3) $d(x,z) \\le d(x,y) + d(y,z)$ (desigualdad triangular).'
  ));

  root.appendChild(callout('def', 'Las tres métricas de ℝⁿ',
    'Para $x = (x_1,\\dots,x_n)$ e $y = (y_1,\\dots,y_n)$:<br>'
    + '<strong>Euclídea:</strong> $\\displaystyle d_2(x,y) = \\Big(\\sum_{i=1}^{n} (x_i - y_i)^2\\Big)^{1/2}$<br>'
    + '<strong>Taxicab (Manhattan):</strong> $\\displaystyle d_1(x,y) = \\sum_{i=1}^{n} |x_i - y_i|$<br>'
    + '<strong>Del máximo (supremo):</strong> $\\displaystyle d_\\infty(x,y) = \\max_{1 \\le i \\le n} |x_i - y_i|$'
  ));

  root.appendChild(callout('def', 'Otras métricas y distancias',
    '<strong>Métrica discreta</strong> (en cualquier $E$): $\\delta(x,y) = 0$ si $x = y$, y $\\delta(x,y) = 1$ si $x \\ne y$.<br>'
    + '<strong>Distancia de un punto a un conjunto:</strong> $d(x, A) = \\inf\\{ d(x,a) : a \\in A \\}$.<br>'
    + '<strong>Diámetro</strong> de $A$: $\\operatorname{diam}(A) = \\sup\\{ d(x,y) : x, y \\in A \\}$ ($A$ es acotado si es finito).'
  ));

  root.appendChild(callout('def', 'Bolas y entornos',
    '<strong>Bola abierta</strong> de centro $x$ y radio $r &gt; 0$: '
    + '$B(x,r) = \\{ y \\in E : d(x,y) \\lt r \\}$.<br>'
    + '<strong>Bola cerrada:</strong> $\\overline{B}(x,r) = \\{ y \\in E : d(x,y) \\le r \\}$.<br>'
    + '<strong>Entorno</strong> de $x$: cualquier conjunto que contenga una bola $B(x,r)$ con $r &gt; 0$.<br>'
    + 'La forma de la bola depende de la métrica (ver abajo).'
  ));

  root.appendChild(el('h2', { text: 'La forma de la bola B(0, r)' }));
  root.appendChild(el('p', { html:
    'Elegí la métrica y el radio. El área coloreada es $\\{y : d(0,y) < r\\}$. '
    + 'La grilla te ayuda a leer coordenadas; los puntos verdes están dentro, los rojos fuera.' }));

  const controls = el('div', { class: 'controls' });
  const metricSel = selectControl({
    label: 'Métrica',
    options: Object.entries(METRICS).map(([k, v]) => ({ value: k, label: v.name })),
    value: 'd2',
  });
  const rSlider = slider({ label: 'radio r', min: 0.5, max: 4, step: 0.1, value: 2, format: (v) => v.toFixed(1) });
  const showAll = el('label', { style: 'display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text-dim);' }, [
    el('input', { type: 'checkbox' }), 'comparar las 3 bolas',
  ]);
  controls.appendChild(metricSel.wrap);
  controls.appendChild(rSlider.wrap);
  controls.appendChild(el('div', { class: 'control' }, [el('label', { text: 'Extra' }), showAll]));
  root.appendChild(controls);

  const viz = mountCanvas(root, {
    height: 440,
    view: { xmin: -5, xmax: 5, ymin: -5, ymax: 5 },
    hint: 'B(0, r) para la métrica elegida',
  });

  // puntos de prueba fijos
  const probes = [[1.2, 0.8], [3, 1.5], [-2, 2.5], [0.5, -3], [-3.2, -1]];

  function ballShape(metric, r, p) {
    // devuelve puntos [x,y] del borde de la bola de radio r en la métrica
    const pts = [];
    if (metric === 'd2') {
      for (let a = 0; a <= Math.PI * 2 + 0.01; a += 0.05) pts.push([r * Math.cos(a), r * Math.sin(a)]);
    } else if (metric === 'd1') {
      pts.push([r, 0], [0, r], [-r, 0], [0, -r]);
    } else {
      pts.push([r, r], [-r, r], [-r, -r], [r, -r]);
    }
    return pts;
  }

  function draw() {
    const p = viz.plane;
    p.clear();
    p.grid(1);
    const r = Number(rSlider.input.value);
    const compare = showAll.querySelector('input').checked;

    if (compare) {
      const styles = { d2: COLORS.accent, d1: COLORS.pink, dinf: COLORS.cyan };
      for (const key of ['dinf', 'd2', 'd1']) {
        p.polygon(ballShape(key, r), { stroke: styles[key], fill: null, wpx: 2.5 });
      }
    } else {
      const key = metricSel.select.value;
      p.polygon(ballShape(key, r), { stroke: COLORS.accent, fill: 'rgba(91,140,255,0.18)', wpx: 2.5 });
      // puntos de prueba
      const metric = METRICS[key];
      for (const [px, py] of probes) {
        const inside = metric.d(px, py) < r;
        p.dot(px, py, 5, inside ? COLORS.ok : COLORS.err);
      }
    }
    // centro
    p.dot(0, 0, 4, COLORS.text);
    p.text('0', 0.15, -0.35, { color: COLORS.textDim, font: '12px Inter' });
  }

  viz.setDraw(draw);
  metricSel.select.addEventListener('change', () => viz.redraw());
  rSlider.input.addEventListener('input', () => viz.redraw());
  showAll.querySelector('input').addEventListener('change', () => viz.redraw());

  root.appendChild(el('div', { class: 'legend' }, [
    el('span', { html: `<span class="swatch" style="background:${COLORS.accent}"></span> d₂ (círculo)` }),
    el('span', { html: `<span class="swatch" style="background:${COLORS.pink}"></span> d₁ (rombo)` }),
    el('span', { html: `<span class="swatch" style="background:${COLORS.cyan}"></span> d∞ (cuadrado)` }),
  ]));

  root.appendChild(callout('thm', 'Métricas equivalentes',
    'En $\\mathbb{R}^n$ vale $\\; d_\\infty(x,y) \\le d_2(x,y) \\le d_1(x,y) \\le n\\, d_\\infty(x,y)$, '
    + 'de donde $B_1(x,r) \\subseteq B_2(x,r) \\subseteq B_\\infty(x,r) \\subseteq B_1(x,nr)$. '
    + 'Por eso $d_1, d_2, d_\\infty$ definen la <em>misma topología</em>: los mismos abiertos, la misma noción de límite.'
  ));
  root.appendChild(exRef(3, [1, 2, 12]));

  root.appendChild(callout('tip', '¿Es una métrica?',
    'No toda fórmula sirve: $d(x,y) = (x-y)^2$ <strong>no</strong> es métrica en $\\mathbb{R}$ (falla la triangular), '
    + 'pero $d(x,y) = \\sqrt{|x-y|}$ sí lo es. La métrica discreta $\\delta(x,y) = [x \\ne y]$ también.'
  ));

  registerCleanup(() => {});
}
