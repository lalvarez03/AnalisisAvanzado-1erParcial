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
    'Tres operadores que describen la topología de un conjunto. Movés el punto de prueba y '
    + 'la app te dice si cae en el interior, la frontera o el exterior.'
  ));

  root.appendChild(callout('def', 'Los tres operadores',
    'Sea $A \\subseteq E$. Un punto $x$ es:<br>'
    + '• <strong>interior</strong> ($x \\in A^\\circ$) si hay una bola $B(x,r) \\subseteq A$;<br>'
    + '• <strong>de adherencia</strong> ($x \\in \\overline{A}$) si toda bola $B(x,r)$ corta a $A$;<br>'
    + '• <strong>de la frontera</strong> ($x \\in \\partial A$) si toda bola corta a $A$ y a $A^c$.<br>'
    + 'Se cumple $A^\\circ \\subseteq A \\subseteq \\overline{A}$ y $\\;\\partial A = \\overline{A} \\setminus A^\\circ$.'
  ));

  root.appendChild(callout('def', 'Abierto y cerrado',
    '$A$ es <strong>abierto</strong> si $A = A^\\circ$ (todo punto es interior). '
    + '$A$ es <strong>cerrado</strong> si $A = \\overline{A}$, equivalentemente si $A^c$ es abierto. '
    + 'No son opuestos: $\\varnothing$ y $E$ son ambos; $[0,1)$ no es ninguno.'
  ));

  root.appendChild(callout('def', 'Entorno',
    'Un <strong>entorno</strong> de un punto $x$ es cualquier conjunto $V$ que contiene una bola '
    + '$B(x,r)$ con $r > 0$. Así, $x \\in A^\\circ$ equivale a que $A$ es un entorno de $x$.'
  ));

  root.appendChild(el('h2', { text: 'Explorador de un conjunto en R²' }));
  root.appendChild(el('p', { html:
    'Elegí un conjunto $A$ (la zona azul). Arrastrá el punto para probar posiciones. La bolita chica a su '
    + 'alrededor representa un entorno: <strong>si toda la bolita queda dentro de $A$</strong>, el punto es '
    + 'interior; <strong>si la bolita toca $A$ y su complemento a la vez</strong>, está en la frontera. '
    + 'Los bordes <strong>sólidos pertenecen</strong> a $A$; los <strong>punteados (naranja) no pertenecen</strong>.' }));

  root.appendChild(callout('tip', 'Para ver bien la frontera',
    'Poné el punto justo sobre un borde. En un borde <em>sólido</em> (pertenece a $A$) el punto está en '
    + '$A \\cap \\partial A$; en un borde <em>punteado</em> (no pertenece) está en $\\partial A$ pero fuera de $A$. '
    + 'En ambos casos es frontera, porque toda bolita chica corta a $A$ y a su complemento.'
  ));

  const setSel = selectControl({
    label: 'Conjunto A',
    options: [
      { value: 'disc_open', label: 'Disco abierto  {‖x‖ < 2}' },
      { value: 'disc_closed', label: 'Disco cerrado  {‖x‖ ≤ 2}' },
      { value: 'annulus', label: 'Corona  {1 < ‖x‖ ≤ 2}' },
      { value: 'square', label: 'Cuadrado con lado faltante' },
      { value: 'punctured', label: 'Disco menos el centro' },
    ],
    value: 'disc_open',
  });
  root.appendChild(el('div', { class: 'controls' }, [setSel.wrap]));

  const viz = mountCanvas(root, {
    height: 440,
    view: { xmin: -4, xmax: 4, ymin: -4, ymax: 4 },
    hint: 'arrastrá el punto ✜ · la bolita muestra un entorno chico a su alrededor',
  });

  // leyenda de colores
  root.appendChild(el('div', { class: 'legend' }, [
    el('span', { html: `<span class="swatch" style="background:${COLORS.ok}"></span> interior (A°): toda bolita chica queda dentro de A` }),
    el('span', { html: `<span class="swatch" style="background:${COLORS.warn}"></span> frontera (∂A): toda bolita toca A y su complemento` }),
    el('span', { html: `<span class="swatch" style="background:${COLORS.err}"></span> exterior: alguna bolita queda fuera de Ā` }),
  ]));

  const out = readout('');
  root.appendChild(out);

  // punto de prueba (mundo)
  let probe = { x: 1.0, y: 1.0 };
  const testR = 0.18;   // bolita chica: refleja mejor la noción "para todo r pequeño"

  // pertenencia a A
  function inA(kind, x, y) {
    const n = Math.hypot(x, y);
    switch (kind) {
      case 'disc_open': return n < 2;
      case 'disc_closed': return n <= 2;
      case 'annulus': return n > 1 && n <= 2;
      case 'square': {
        const inSq = x >= -2 && x <= 2 && y >= -2 && y <= 2;
        // le "falta" el lado superior (y == 2) -> abierto arriba
        return inSq && !(Math.abs(y - 2) < 1e-9);
      }
      case 'punctured': return n < 2 && n > 1e-9;
      default: return false;
    }
  }

  // Clasifica muestreando la bolita en anillos concéntricos (fino cerca del centro).
  function classify(kind, cx, cy, r) {
    let inCount = 0, outCount = 0, tot = 0;
    const rings = 8, sectors = 24;
    // incluir el centro
    tot++; if (inA(kind, cx, cy)) inCount++; else outCount++;
    for (let ri = 1; ri <= rings; ri++) {
      const rr = (r * ri) / rings;
      for (let si = 0; si < sectors; si++) {
        const a = (2 * Math.PI * si) / sectors;
        tot++;
        if (inA(kind, cx + rr * Math.cos(a), cy + rr * Math.sin(a))) inCount++; else outCount++;
      }
    }
    const touchesA = inCount > 0;
    const touchesComp = outCount > 0;
    const allA = outCount === 0;
    return { touchesA, touchesComp, allA, frac: inCount / tot };
  }

  function drawSet(p, kind) {
    // pinta A muestreando la vista (relleno tenue)
    const N = 90;
    const img = p.ctx;
    const W = p.width, H = p.height;
    const cell = W / N;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < Math.round(H / cell); j++) {
        const wx = p.wx(i * cell + cell / 2);
        const wy = p.wy(j * cell + cell / 2);
        if (inA(kind, wx, wy)) {
          img.fillStyle = 'rgba(91,140,255,0.16)';
          img.fillRect(i * cell, j * cell, cell + 1, cell + 1);
        }
      }
    }
    // Bordes de referencia. Sólido = el borde PERTENECE a A; punteado = NO pertenece.
    if (kind === 'disc_open' || kind === 'punctured') {
      // r=2 no pertenece (abierto)
      p.circle(0, 0, 2, { stroke: COLORS.warn, wpx: 2, dash: [3, 4] });
    }
    if (kind === 'disc_closed') {
      // r=2 sí pertenece (cerrado)
      p.circle(0, 0, 2, { stroke: COLORS.accent2, wpx: 2 });
    }
    if (kind === 'annulus') {
      // {1 < ‖x‖ ≤ 2}: r=2 pertenece (sólido), r=1 no pertenece (punteado)
      p.circle(0, 0, 2, { stroke: COLORS.accent2, wpx: 2 });
      p.circle(0, 0, 1, { stroke: COLORS.warn, wpx: 2, dash: [3, 4] });
    }
    if (kind === 'punctured') {
      // el punto quitado del centro: hueco marcado
      p.dot(0, 0, 5, COLORS.err, false);
      p.text('punto quitado', 0.2, -0.35, { color: COLORS.err, font: '11px Inter' });
    }
    if (kind === 'square') {
      // Lados que SÍ pertenecen (sólidos) vs el lado faltante y=2 (punteado fino).
      img.setLineDash([]);
      p.segment(-2, -2, 2, -2, COLORS.accent2, 2);   // base
      p.segment(-2, -2, -2, 2, COLORS.accent2, 2);   // izquierdo
      p.segment(2, -2, 2, 2, COLORS.accent2, 2);     // derecho
      // lado superior y=2: NO pertenece → punteado + etiqueta
      p.segment(-2, 2, 2, 2, COLORS.warn, 2, [3, 4]);
      p.text('lado y=2 excluido', -1.9, 2.3, { color: COLORS.warn, font: '11px Inter' });
    }
    img.setLineDash([]);
  }

  function draw() {
    const p = viz.plane;
    p.clear();
    p.grid(1);
    const kind = setSel.select.value;
    drawSet(p, kind);

    const c = classify(kind, probe.x, probe.y, testR);
    // color y clasificación
    let color = COLORS.err, tipo = 'exterior', enFrontera = false;
    if (c.allA) { color = COLORS.ok; tipo = 'INTERIOR (x ∈ A°)'; }
    else if (c.touchesA && c.touchesComp) { color = COLORS.warn; tipo = 'FRONTERA (x ∈ ∂A)'; enFrontera = true; }
    else { color = COLORS.err; tipo = 'EXTERIOR (x ∈ (Ā)ᶜ)'; }

    // bolita de prueba (chica) — relleno suave
    p.circle(probe.x, probe.y, testR, { stroke: color, fill: hexAlpha(color, 0.22), wpx: 2 });

    // Si está en la frontera, resaltar: anillo pulsante fijo alrededor para que se note.
    if (enFrontera) {
      p.circle(probe.x, probe.y, testR * 1.9, { stroke: hexAlpha(COLORS.warn, 0.5), wpx: 1.5, dash: [4, 4] });
    }

    // marcador central nítido: punto pleno + cruz corta
    p.dot(probe.x, probe.y, 3.5, color);
    p.segment(probe.x - 0.12, probe.y, probe.x + 0.12, probe.y, '#fff', 1.5);
    p.segment(probe.x, probe.y - 0.12, probe.x, probe.y + 0.12, '#fff', 1.5);
    // etiqueta de estado junto al punto
    p.text(enFrontera ? '∂A' : c.allA ? 'A°' : 'ext', probe.x + testR + 0.15, probe.y + 0.1,
      { color, font: 'bold 13px Inter' });

    const belongs = inA(kind, probe.x, probe.y);
    const enClausura = c.touchesA;              // toda bola corta A ⇒ adherencia
    out.textContent =
      `punto x = (${probe.x.toFixed(2)}, ${probe.y.toFixed(2)})\n`
      + `¿x ∈ A?         ${belongs ? 'sí' : 'no'}\n`
      + `¿x ∈ A° (interior)?   ${c.allA ? 'sí' : 'no'}\n`
      + `¿x ∈ Ā (clausura)?    ${enClausura ? 'sí' : 'no'}\n`
      + `¿x ∈ ∂A (frontera)?   ${enFrontera ? 'sí' : 'no'}\n`
      + `→ clasificación: ${tipo}`;
  }

  viz.setDraw(draw);
  setSel.select.addEventListener('change', () => viz.redraw());

  // arrastre del punto
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

  root.appendChild(callout('thm', 'Identidades útiles',
    '$(A^\\circ)^c = \\overline{A^c}$ y $\\;\\overline{A}^{\\,c} = (A^c)^\\circ$.<br>'
    + '$(A \\cap B)^\\circ = A^\\circ \\cap B^\\circ$ y $\\;\\overline{A \\cup B} = \\overline{A} \\cup \\overline{B}$.<br>'
    + 'La frontera es siempre cerrada y $\\partial A = \\partial(A^c)$.'
  ));
  root.appendChild(exRef(3, [3, 5, 6, 9]));

  root.appendChild(seccionResueltos('Ejercicios resueltos', RES_TOPOLOGIA));
}
