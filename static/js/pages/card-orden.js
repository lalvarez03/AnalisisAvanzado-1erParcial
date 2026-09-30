// pages/card-orden.js — Orden entre cardinales, Cantor–Bernstein, partes.

import { el, slider } from '../utils/dom.js';
import { pageHeader, callout, mountCanvas } from '../utils/page.js';
import { exRef } from '../utils/ejercicios.js';
import { COLORS } from '../constants.js';

export function renderOrden(root) {
  root.appendChild(pageHeader(
    'Orden entre cardinales',
    'Comparamos tamaños con inyecciones. El teorema de Cantor sobre partes garantiza que '
    + 'siempre hay cardinales mayores: no existe “el infinito más grande”.'
  ));

  root.appendChild(callout('def', 'Comparar cardinales',
    '$|A| \\le |B|$ si existe una <strong>inyección</strong> $A \\hookrightarrow B$. '
    + '$|A| = |B|$ si hay una biyección. Y $|A| < |B|$ si $|A| \\le |B|$ pero $A \\not\\sim B$.'
  ));

  root.appendChild(callout('thm', 'Cantor–Schröder–Bernstein',
    'Si existen inyecciones $A \\hookrightarrow B$ y $B \\hookrightarrow A$, entonces $A \\sim B$. '
    + 'Es la herramienta para probar igualdades de cardinal sin construir la biyección a mano.'
  ));

  root.appendChild(callout('thm', 'Teorema de Cantor (partes)',
    'Para todo conjunto $A$: $\\;|A| < |\\mathcal{P}(A)|$. '
    + 'Nunca hay una sobreyección $A \\to \\mathcal{P}(A)$. Además $\\mathcal{P}(A) \\sim \\{0,1\\}^{A}$, '
    + 'y si $|A| = n$ entonces $|\\mathcal{P}(A)| = 2^n$.'
  ));

  root.appendChild(el('h2', { text: 'Partes de un conjunto finito: 2ⁿ' }));
  root.appendChild(el('p', { html:
    'Cada subconjunto de $\\{1, \\dots, n\\}$ se codifica como una cadena binaria: el bit $i$ dice si $i$ pertenece. '
    + 'Movés $n$ y ves crecer $\\mathcal{P}(A)$ de forma explosiva.' }));

  const nSlider = slider({ label: 'n (elementos del conjunto)', min: 1, max: 6, step: 1, value: 3 });
  root.appendChild(el('div', { class: 'controls' }, [nSlider.wrap]));

  const viz = mountCanvas(root, {
    height: 320,
    view: { xmin: 0, xmax: 1, ymin: 0, ymax: 1 },
    hint: 'cada fila = un subconjunto (cadena de bits ∈ {0,1}ⁿ)',
  });

  const info = callout('', 'Conteo', '');
  root.appendChild(info);

  function draw() {
    const p = viz.plane;
    p.clear();
    const n = Number(nSlider.input.value);
    const total = 2 ** n;
    const W = p.width, H = p.height;
    const cols = Math.ceil(Math.sqrt(total * (W / H)));
    const rows = Math.ceil(total / cols);
    const cellW = W / cols, cellH = H / rows;
    const bit = Math.min(cellW / (n + 1), cellH * 0.5);

    for (let s = 0; s < total; s++) {
      const cx = (s % cols) * cellW + cellW / 2;
      const cy = Math.floor(s / cols) * cellH + cellH / 2;
      const bits = s.toString(2).padStart(n, '0');
      for (let i = 0; i < n; i++) {
        const on = bits[i] === '1';
        const bx = cx - (n * bit) / 2 + i * bit;
        p.ctx.fillStyle = on ? COLORS.accent : COLORS.panel;
        p.ctx.strokeStyle = COLORS.border;
        p.ctx.lineWidth = 1;
        p.ctx.fillRect(bx, cy - bit * 0.45, bit * 0.9, bit * 0.9);
        p.ctx.strokeRect(bx, cy - bit * 0.45, bit * 0.9, bit * 0.9);
      }
    }
    info.querySelector('div:last-child').innerHTML =
      `Con $n = ${n}$ hay $2^{${n}} = ${total}$ subconjuntos. `
      + (n < 6 ? '' : 'La cantidad crece exponencialmente.');
    if (window.MathJax?.typesetPromise) window.MathJax.typesetPromise([info]);
  }

  viz.setDraw(draw);
  nSlider.input.addEventListener('input', () => viz.redraw());

  root.appendChild(el('h2', { text: 'La jerarquía de infinitos' }));
  const table = el('table', { class: 'tbl' });
  table.innerHTML = `
    <tr><th>Conjunto</th><th>Cardinal</th><th>Tipo</th></tr>
    <tr><td>$\\{1,\\dots,n\\}$</td><td>$n$</td><td>finito</td></tr>
    <tr><td>$\\mathbb{N},\\ \\mathbb{Z},\\ \\mathbb{Q}$</td><td>$\\aleph_0$</td><td>numerable</td></tr>
    <tr><td>$\\mathbb{R},\\ [0,1),\\ \\mathcal{P}(\\mathbb{N}),\\ \\{0,1\\}^{\\mathbb{N}}$</td><td>$c = 2^{\\aleph_0}$</td><td>no numerable</td></tr>
    <tr><td>$\\mathcal{P}(\\mathbb{R})$</td><td>$2^{c}$</td><td>“aún más grande”</td></tr>
  `;
  root.appendChild(table);

  root.appendChild(callout('tip', 'Datos de la Práctica 2',
    '$\\mathcal{P}(\\mathbb{N}) \\sim \\mathbb{R}$, así que $|\\mathcal{P}(\\mathbb{N})| = c$. '
    + 'El conjunto de subconjuntos <em>finitos</em> de un numerable es numerable. '
    + 'Y $|\\mathbb{R}^k| = c$ para todo $k$: agregar dimensiones no agranda el continuo.'
  ));
  root.appendChild(exRef(2, [7, 8, 10, 11, 14, 15]));
}
