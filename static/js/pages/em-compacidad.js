// pages/em-compacidad.js — Compacidad y teorema de Heine-Borel.

import { el, selectControl } from '../utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../utils/page.js';
import { COLORS } from '../constants.js';

export function renderCompacidad(root) {
  root.appendChild(pageHeader(
    'Compacidad y Heine-Borel',
    'Un conjunto es <strong>compacto</strong> si de todo cubrimiento por abiertos se puede extraer un '
    + 'subcubrimiento finito. En $\\mathbb{R}^n$ eso equivale a ser cerrado y acotado.'
  ));

  root.appendChild(callout('def', 'Definición — Compacidad por cubrimientos',
    'Un cubrimiento abierto de $K$ es una familia $\\{U_i\\}_{i \\in I}$ de abiertos con '
    + '$K \\subseteq \\bigcup_i U_i$. El conjunto $K$ es <strong>compacto</strong> si todo cubrimiento abierto '
    + 'admite un <strong>subcubrimiento finito</strong>: existen $i_1, \\dots, i_m$ con '
    + '$K \\subseteq U_{i_1} \\cup \\dots \\cup U_{i_m}$.'
  ));

  root.appendChild(callout('def', 'Conjunto acotado',
    'En un espacio métrico, $A$ es <strong>acotado</strong> si cabe en alguna bola: existen $x_0 \\in E$ '
    + 'y $M > 0$ con $A \\subseteq B(x_0, M)$. Equivalentemente, si su diámetro '
    + '$\\operatorname{diam}(A) = \\sup\\{d(x,y) : x,y \\in A\\}$ es finito.'
  ));

  root.appendChild(callout('thm', 'Teorema de Heine-Borel',
    'En $\\mathbb{R}^n$ (con cualquiera de las métricas $d_1, d_2, d_\\infty$): '
    + '$\\;K$ es compacto $\\iff K$ es <strong>cerrado y acotado</strong>. '
    + 'Además compacto $\\Rightarrow$ toda sucesión en $K$ tiene subsucesión convergente en $K$ (Bolzano-Weierstrass).'
  ));

  root.appendChild(el('h2', { text: 'Cubrimiento del intervalo' }));
  root.appendChild(el('p', { html:
    'Mostramos un cubrimiento del conjunto por bolas (intervalos abiertos). Con el intervalo <strong>cerrado</strong> '
    + '$[0,1]$ siempre alcanza una cantidad finita. Con el <strong>abierto</strong> $(0,1]$, el cubrimiento '
    + '$U_n = (1/n,\\, 2)$ no tiene subcubrimiento finito: cerca de $0$ hacen falta infinitos.' }));

  const controls = el('div', { class: 'controls' });
  const setSel = selectControl({
    label: 'Conjunto',
    options: [
      { value: 'closed', label: '[0, 1]  (cerrado y acotado → compacto)' },
      { value: 'halfopen', label: '(0, 1]  (no cerrado → NO compacto)' },
    ],
    value: 'closed',
  });
  const step = el('button', { class: 'btn' }, '➕ Agregar abierto del cubrimiento');
  const reset = el('button', { class: 'btn ghost' }, '↺ Reiniciar');
  controls.appendChild(setSel.wrap);
  controls.appendChild(step);
  controls.appendChild(reset);
  root.appendChild(controls);

  const viz = mountCanvas(root, {
    height: 260,
    view: { xmin: -0.15, xmax: 1.25, ymin: -1, ymax: 1.4 },
    hint: 'segmento grueso = conjunto · arcos = abiertos del cubrimiento',
  });

  const out = readout('');
  root.appendChild(out);

  let n = 1; // cantidad de abiertos agregados

  function covers(kind, k) {
    // ¿k abiertos cubren el conjunto?
    if (kind === 'closed') {
      // usamos abiertos U_j = (j/(k+1) - w, j/(k+1) + w) que cubren [0,1] para k>=1
      return k >= 3; // con 3 bien elegidos alcanza (ilustrativo)
    }
    // halfopen: U_n=(1/n,2) nunca cubre (0,1] con finitos
    return false;
  }

  function draw() {
    const p = viz.plane;
    p.clear();
    const kind = setSel.select.value;

    // eje
    p.ctx.strokeStyle = COLORS.textDim; p.ctx.lineWidth = 1;
    p.ctx.beginPath(); p.ctx.moveTo(p.sx(-0.15), p.sy(0)); p.ctx.lineTo(p.sx(1.25), p.sy(0)); p.ctx.stroke();
    p.text('0', 0, -0.35, { align: 'center', color: COLORS.textDim });
    p.text('1', 1, -0.35, { align: 'center', color: COLORS.textDim });

    // el conjunto
    p.ctx.lineWidth = 6; p.ctx.strokeStyle = COLORS.accent;
    p.ctx.beginPath(); p.ctx.moveTo(p.sx(0), p.sy(0)); p.ctx.lineTo(p.sx(1), p.sy(0)); p.ctx.stroke();
    // extremos: relleno=cerrado, hueco=abierto
    p.dot(1, 0, 6, COLORS.accent, true);
    p.dot(0, 0, 6, COLORS.accent, kind === 'closed');

    // abiertos del cubrimiento
    const colors = [COLORS.pink, COLORS.cyan, COLORS.warn, COLORS.ok, COLORS.accent2];
    if (kind === 'closed') {
      for (let j = 0; j < n; j++) {
        const c = (j + 0.5) / n;
        const w = 0.62 / n + 0.08;
        drawOpen(p, c - w, c + w, 0.35 + 0.14 * (j % 3), colors[j % colors.length]);
      }
    } else {
      for (let j = 0; j < n; j++) {
        const a = 1 / (j + 2); // U_j = (1/(j+2), 2)
        drawOpen(p, a, 1.2, 0.35 + 0.14 * (j % 3), colors[j % colors.length]);
      }
    }

    const done = covers(kind, n);
    out.textContent =
      `conjunto: ${kind === 'closed' ? '[0,1]' : '(0,1]'}\n`
      + `abiertos usados: ${n}\n`
      + (kind === 'closed'
        ? (done ? '✓ Con finitos abiertos ya cubrimos [0,1]. Existe subcubrimiento finito.'
                : 'Seguí agregando: con pocos abiertos bien puestos alcanza (compacto).')
        : 'Cada nuevo U_n=(1/n, 2) empuja el borde hacia 0 pero nunca lo alcanza. '
          + 'Ningún número finito cubre (0,1] → NO compacto.');
  }

  function drawOpen(p, a, b, h, color) {
    // arco por encima del eje entre a y b, con extremos huecos
    p.ctx.strokeStyle = color; p.ctx.lineWidth = 2.5;
    p.ctx.beginPath();
    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const x = a + (b - a) * (i / steps);
      const y = h * Math.sin(Math.PI * (i / steps));
      const px = p.sx(x), py = p.sy(y);
      if (i === 0) p.ctx.moveTo(px, py); else p.ctx.lineTo(px, py);
    }
    p.ctx.stroke();
    // proyección punteada de los extremos al eje
    p.ctx.setLineDash([3, 3]); p.ctx.lineWidth = 1;
    p.ctx.beginPath();
    p.ctx.moveTo(p.sx(a), p.sy(0)); p.ctx.lineTo(p.sx(a), p.sy(0.02));
    p.ctx.stroke(); p.ctx.setLineDash([]);
  }

  viz.setDraw(draw);
  setSel.select.addEventListener('change', () => { n = 1; viz.redraw(); });
  step.addEventListener('click', () => { n = Math.min(n + 1, 9); viz.redraw(); });
  reset.addEventListener('click', () => { n = 1; viz.redraw(); });

  root.appendChild(callout('tip', 'Propiedades de compactos',
    '• Un compacto es siempre cerrado y acotado (en cualquier espacio métrico).<br>'
    + '• Cerrado dentro de compacto es compacto.<br>'
    + '• La imagen continua de un compacto es compacta (de ahí que una función continua en un compacto '
    + 'alcance máximo y mínimo).'
  ));
}
