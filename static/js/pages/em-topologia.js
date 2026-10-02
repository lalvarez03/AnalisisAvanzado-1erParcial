// pages/em-topologia.js — Interior, clausura, frontera; abiertos y cerrados.

import { el, selectControl } from '../utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../utils/page.js';
import { exRef } from '../utils/ejercicios.js';
import { seccionResueltos } from '../utils/resueltos.js';
import { RES_TOPOLOGIA } from '../utils/resueltos-data.js';
import { COLORS } from '../constants.js';
import { hexAlpha } from '../utils/canvas2d.js';
import { registerCleanup } from '../state.js';

export function renderTopologia(root) {
  root.appendChild(pageHeader(
    'Interior, clausura y frontera',
    'Clasificación de puntos en espacios métricos, relaciones algebraicas, equivalencia secuencial y ejemplos clásicos.'
  ));

  // 1. DEFINICIONES FORMALES Y CLASIFICACIÓN DE PUNTOS
  root.appendChild(callout('def', '1. Definiciones Formales y Clasificación de Puntos en (M, d)',
    'Sea $(M,d)$ un espacio métrico y $E \\subseteq M$. Un punto $x \\in M$ se clasifica como:<br>'
    + '• <strong>Punto Interior ($E^\\circ$):</strong> $x \\in E$ tal que existe $r > 0$ con $B(x,r) \\subseteq E$. El interior $E^\\circ$ es el abierto más grande contenido en $E$.<br>'
    + '• <strong>Punto de Adherencia ($\\overline{E}$):</strong> para todo $r > 0$, $B(x,r) \\cap E \\neq \\emptyset$. La clausura $\\overline{E}$ es el cerrado más pequeño que contiene a $E$.<br>'
    + '• <strong>Punto de Acumulación ($E\'$):</strong> para todo $r > 0$, $(B(x,r) \\setminus \\{x\\}) \\cap E \\neq \\emptyset$ (equivalente a que $B(x,r) \\cap E$ contenga infinitos puntos).<br>'
    + '• <strong>Punto de Frontera ($\\partial E$):</strong> para todo $r > 0$, $B(x,r) \\cap E \\neq \\emptyset$ y $B(x,r) \\cap E^c \\neq \\emptyset$.<br>'
    + '• <strong>Punto Aislado:</strong> $x \\in E$ tal que existe $r > 0$ con $B(x,r) \\cap E = \\{x\\}$ (es decir, $x \\in E \\setminus E\'$).'
  ));

  // 2. RELACIONES Y DESCOMPOSICIONES FUNDAMENTALES
  root.appendChild(callout('thm', '2. Relaciones y Descomposiciones Fundamentales',
    '• <strong>Inclusiones en cadena:</strong> $E^\\circ \\subseteq E \\subseteq \\overline{E}$.<br>'
    + '• <strong>Descomposiciones de la Clausura:</strong> $\\overline{E} = E \\cup E\' = E \\cup \\partial E$.<br>'
    + '• <strong>Expresiones de la Frontera:</strong> $\\partial E = \\overline{E} \\cap \\overline{E^c} = \\overline{E} \\setminus E^\\circ$.<br>'
    + '• <strong>Caracterización de Abiertos y Cerrados:</strong><br>'
    + '&nbsp;&nbsp;- $A$ es abierto $\\iff A = A^\\circ$.<br>'
    + '&nbsp;&nbsp;- $F$ es cerrado $\\iff F = \\overline{F} \\iff E\' \\subseteq F$.'
  ));

  // 3. CARACTERIZACIÓN SECUENCIAL
  root.appendChild(callout('def', '3. Caracterización Secuencial (Topología-Sucesiones)',
    '• <strong>Clausura secuencial:</strong> $x \\in \\overline{E} \\iff \\exists (x_n)_{n \\in \\mathbb{N}} \\subseteq E$ tal que $x_n \\to x$.<br>'
    + '• <strong>Derivado secuencial:</strong> $x \\in E\' \\iff \\exists (x_n)_{n \\in \\mathbb{N}} \\subseteq E \\setminus \\{x\\}$ con términos distintos dos a dos tal que $x_n \\to x$.<br>'
    + '• <strong>Cerrados por sucesiones:</strong> $E$ es cerrado $\\iff$ para toda sucesión $(x_n) \\subseteq E$ tal que $x_n \\to x$, se tiene que $x \\in E$.'
  ));

  // 4. TABLA DE EJEMPLOS CLÁSICOS Y CASOS PATOLÓGICOS EN (R, |·|)
  const tableWrap = el('div', { class: 'm-card', style: 'margin: 20px 0; overflow-x: auto;' });
  tableWrap.appendChild(el('h2', { text: '4. Tabla de Ejemplos Clásicos y Casos Patológicos en (ℝ, |·|)' }));
  
  const table = el('table', { style: 'width:100%; border-collapse: collapse; font-size: 13.5px;' });
  table.innerHTML = `
    <thead>
      <tr style="border-bottom: 2px solid var(--border); background: var(--bg-soft); text-align: left;">
        <th style="padding: 8px;">Conjunto $E$</th>
        <th style="padding: 8px;">Interior $E^\\circ$</th>
        <th style="padding: 8px;">Clausura $\\overline{E}$</th>
        <th style="padding: 8px;">Derivado $E'$</th>
        <th style="padding: 8px;">Frontera $\\partial E$</th>
        <th style="padding: 8px;">Clasificación</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid var(--border);">
        <td style="padding: 8px; font-weight: bold;">$(0, 1]$</td>
        <td style="padding: 8px;">$(0, 1)$</td>
        <td style="padding: 8px;">$[0, 1]$</td>
        <td style="padding: 8px;">$[0, 1]$</td>
        <td style="padding: 8px;">$\\{0, 1\\}$</td>
        <td style="padding: 8px; color: var(--warn);">Ni abierto ni cerrado</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border);">
        <td style="padding: 8px; font-weight: bold;">$\\mathbb{Q}$</td>
        <td style="padding: 8px;">$\\emptyset$</td>
        <td style="padding: 8px;">$\\mathbb{R}$</td>
        <td style="padding: 8px;">$\\mathbb{R}$</td>
        <td style="padding: 8px;">$\\mathbb{R}$</td>
        <td style="padding: 8px; color: var(--warn);">Ni abierto ni cerrado</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border);">
        <td style="padding: 8px; font-weight: bold;">$\\mathbb{Z}$</td>
        <td style="padding: 8px;">$\\emptyset$</td>
        <td style="padding: 8px;">$\\mathbb{Z}$</td>
        <td style="padding: 8px;">$\\emptyset$</td>
        <td style="padding: 8px;">$\\mathbb{Z}$</td>
        <td style="padding: 8px; color: var(--ok);">Cerrado</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--border);">
        <td style="padding: 8px; font-weight: bold;">$(0, 1) \\cup \\{2\\}$</td>
        <td style="padding: 8px;">$(0, 1)$</td>
        <td style="padding: 8px;">$[0, 1] \\cup \\{2\\}$</td>
        <td style="padding: 8px;">$[0, 1]$</td>
        <td style="padding: 8px;">$\\{0, 1, 2\\}$</td>
        <td style="padding: 8px; color: var(--warn);">Ni abierto ni cerrado</td>
      </tr>
    </tbody>
  `;
  tableWrap.appendChild(table);
  root.appendChild(tableWrap);

  // NOTA: Si usas MathJax en tu proyecto, llama al re-renderizado aquí:
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise([tableWrap]);
  }

  // EXPLORADOR INTERACTIVO 2D
  root.appendChild(el('h2', { text: 'Explorador Interactivo en R²' }));
  root.appendChild(el('p', { html:
    'Elegí un conjunto $A$ (zona azul) y arrastrá el punto de prueba $\\boldsymbol{x}$. La bolita representa un entorno '
    + '$B(x,r)$: evalúa si es un punto interior, de frontera o exterior.' }));

  const setSel = selectControl({
    label: 'Conjunto A',
    options: [
      { value: 'disc_open', label: 'Disco abierto  {‖x‖ < 2}' },
      { value: 'disc_closed', label: 'Disco cerrado  {‖x‖ ≤ 2}' },
      { value: 'annulus', label: 'Corona  {1 < ‖x‖ ≤ 2}' },
      { value: 'square', label: 'Cuadrado con lado faltante' },
      { value: 'punctured', label: 'Disco menos el centro (punto aislado en compl.)' },
    ],
    value: 'disc_open',
  });
  root.appendChild(el('div', { class: 'controls' }, [setSel.wrap]));

  const viz = mountCanvas(root, {
    height: 440,
    view: { xmin: -4, xmax: 4, ymin: -4, ymax: 4 },
    hint: 'arrastrá el punto ✜ · evalúa las condiciones de entorno',
  });

  root.appendChild(el('div', { class: 'legend' }, [
    el('span', { html: `<span class="swatch" style="background:${COLORS.ok}"></span> interior (A°)` }),
    el('span', { html: `<span class="swatch" style="background:${COLORS.warn}"></span> frontera (∂A)` }),
    el('span', { html: `<span class="swatch" style="background:${COLORS.err}"></span> exterior ((Ā)ᶜ)` }),
  ]));

  const out = readout('');
  root.appendChild(out);

  let probe = { x: 1.0, y: 1.0 };
  const testR = 0.18;

  function inA(kind, x, y) {
    const n = Math.hypot(x, y);
    switch (kind) {
      case 'disc_open': return n < 2;
      case 'disc_closed': return n <= 2;
      case 'annulus': return n > 1 && n <= 2;
      case 'square': {
        const inSq = x >= -2 && x <= 2 && y >= -2 && y <= 2;
        return inSq && !(Math.abs(y - 2) < 1e-9);
      }
      case 'punctured': return n < 2 && n > 1e-9;
      default: return false;
    }
  }

  function classify(kind, cx, cy, r) {
    let inCount = 0, outCount = 0, tot = 0;
    const rings = 8, sectors = 24;
    tot++; if (inA(kind, cx, cy)) inCount++; else outCount++;
    for (let ri = 1; ri <= rings; ri++) {
      const rr = (r * ri) / rings;
      for (let si = 0; si < sectors; si++) {
        const a = (2 * Math.PI * si) / sectors;
        tot++;
        if (inA(kind, cx + rr * Math.cos(a), cy + rr * Math.sin(a))) inCount++; else outCount++;
      }
    }
    return { touchesA: inCount > 0, touchesComp: outCount > 0, allA: outCount === 0 };
  }

  function drawSet(p, kind) {
    const N = 90;
    const W = p.width, H = p.height;
    const cell = W / N;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < Math.round(H / cell); j++) {
        const wx = p.wx(i * cell + cell / 2);
        const wy = p.wy(j * cell + cell / 2);
        if (inA(kind, wx, wy)) {
          p.ctx.fillStyle = 'rgba(91,140,255,0.16)';
          p.ctx.fillRect(i * cell, j * cell, cell + 1, cell + 1);
        }
      }
    }
    if (kind === 'disc_open' || kind === 'punctured') p.circle(0, 0, 2, { stroke: COLORS.warn, wpx: 2, dash: [3, 4] });
    if (kind === 'disc_closed') p.circle(0, 0, 2, { stroke: COLORS.accent2, wpx: 2 });
    if (kind === 'annulus') {
      p.circle(0, 0, 2, { stroke: COLORS.accent2, wpx: 2 });
      p.circle(0, 0, 1, { stroke: COLORS.warn, wpx: 2, dash: [3, 4] });
    }
    if (kind === 'punctured') p.dot(0, 0, 5, COLORS.err, false);
    if (kind === 'square') {
      p.ctx.setLineDash([]);
      p.segment(-2, -2, 2, -2, COLORS.accent2, 2);
      p.segment(-2, -2, -2, 2, COLORS.accent2, 2);
      p.segment(2, -2, 2, 2, COLORS.accent2, 2);
      p.segment(-2, 2, 2, 2, COLORS.warn, 2, [3, 4]);
    }
    p.ctx.setLineDash([]);
  }

  function draw() {
    const p = viz.plane;
    p.clear();
    p.grid(1);
    const kind = setSel.select.value;
    drawSet(p, kind);

    const c = classify(kind, probe.x, probe.y, testR);
    let color = COLORS.err, tipo = 'exterior', enFrontera = false;
    if (c.allA) { color = COLORS.ok; tipo = 'INTERIOR (x ∈ A°)'; }
    else if (c.touchesA && c.touchesComp) { color = COLORS.warn; tipo = 'FRONTERA (x ∈ ∂A)'; enFrontera = true; }
    else { color = COLORS.err; tipo = 'EXTERIOR (x ∈ (Ā)ᶜ)'; }

    p.circle(probe.x, probe.y, testR, { stroke: color, fill: hexAlpha(color, 0.22), wpx: 2 });
    if (enFrontera) p.circle(probe.x, probe.y, testR * 1.9, { stroke: hexAlpha(COLORS.warn, 0.5), wpx: 1.5, dash: [4, 4] });

    p.dot(probe.x, probe.y, 3.5, color);
    p.text(enFrontera ? '∂A' : c.allA ? 'A°' : 'ext', probe.x + testR + 0.15, probe.y + 0.1, { color, font: 'bold 13px Inter' });

    const belongs = inA(kind, probe.x, probe.y);
    out.textContent =
      `Punto x = (${probe.x.toFixed(2)}, ${probe.y.toFixed(2)})\n`
      + `¿x ∈ A?               ${belongs ? 'sí' : 'no'}\n`
      + `¿x ∈ A° (interior)?     ${c.allA ? 'sí' : 'no'}\n`
      + `¿x ∈ Ā (clausura)?      ${c.touchesA ? 'sí' : 'no'}\n`
      + `¿x ∈ ∂A (frontera)?     ${enFrontera ? 'sí' : 'no'}\n`
      + `→ Clasificación: ${tipo}`;
  }

  viz.setDraw(draw);
  setSel.select.addEventListener('change', () => viz.redraw());

  let dragging = false;
  function pointerToWorld(ev) {
    const rect = viz.canvas.getBoundingClientRect();
    const px = (ev.touches ? ev.touches[0].clientX : ev.clientX) - rect.left;
    const py = (ev.touches ? ev.touches[0].clientY : ev.clientY) - rect.top;
    return { x: viz.plane.wx(px), y: viz.plane.wy(py) };
  }
  function onDown(ev) {
    const w = pointerToWorld(ev);
    if (Math.hypot(w.x - probe.x, w.y - probe.y) < 0.6) { dragging = true; ev.preventDefault(); }
  }
  function onMove(ev) {
    if (!dragging) return;
    const w = pointerToWorld(ev);
    probe.x = Math.max(-4, Math.min(4, w.x));
    probe.y = Math.max(-4, Math.min(4, w.y));
    viz.redraw();
    ev.preventDefault();
  }
  function onUp() { dragging = false; }
  viz.canvas.addEventListener('mousedown', onDown);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
  viz.canvas.addEventListener('touchstart', onDown, { passive: false });
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('touchend', onUp);
  registerCleanup(() => {
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
    window.removeEventListener('touchmove', onMove);
    window.removeEventListener('touchend', onUp);
  });
  root.appendChild(exRef(3, [3, 5, 6, 9]));
  root.appendChild(seccionResueltos('Ejercicios resueltos', RES_TOPOLOGIA));
}