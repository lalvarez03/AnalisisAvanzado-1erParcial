// pages/card-equivalencia.js — Equivalencia de conjuntos (coordinabilidad).

import { el, slider } from '../utils/dom.js';
import { pageHeader, callout, mountCanvas } from '../utils/page.js';
import { COLORS } from '../constants.js';

const BIYECCIONES = {
  pares: { label: 'ℕ → Pares:  f(n) = 2n', f: (n) => 2 * n, desc: 'Cada natural se empareja con un par. Sobran... ¿no? No: hay tantos pares como naturales.' },
  cuadrados: { label: 'ℕ → Cuadrados:  f(n) = n²', f: (n) => n * n, desc: 'Los cuadrados son "cada vez más raros", pero igual hay una biyección con ℕ.' },
  enteros: { label: 'ℕ → ℤ  (zig-zag)', f: (n) => (n % 2 === 0 ? n / 2 : -(n + 1) / 2), desc: 'Se recorre ℤ alternando: 0, -1, 1, -2, 2, … Así ℤ es numerable.' },
};

export function renderEquivalencia(root) {
  root.appendChild(pageHeader(
    'Equivalencia de conjuntos',
    'Dos conjuntos tienen el <em>mismo cardinal</em> cuando existe una biyección entre ellos. '
    + 'Esta es la idea que rescata a Cantor: comparar tamaños sin contar.'
  ));

  root.appendChild(callout('def', 'Tipos de función',
    'Sea $f: A \\to B$.<br>'
    + '<strong>Inyectiva:</strong> $f(x) = f(y) \\Rightarrow x = y$ (no repite imágenes).<br>'
    + '<strong>Sobreyectiva:</strong> $\\operatorname{Im}(f) = B$, es decir todo $b \\in B$ tiene preimagen.<br>'
    + '<strong>Biyectiva:</strong> inyectiva y sobreyectiva a la vez (existe la inversa $f^{-1}$).'
  ));

  root.appendChild(callout('def', 'Definición — Coordinabilidad',
    'Dos conjuntos $A$ y $B$ son <strong>coordinables</strong> (o equipotentes), y escribimos $A \\sim B$, '
    + 'si existe una función <strong>biyectiva</strong> $f: A \\to B$. '
    + 'La relación $\\sim$ es de equivalencia: es reflexiva ($\\mathrm{id}_A$), simétrica ($f^{-1}$) y '
    + 'transitiva ($g \\circ f$).'
  ));

  root.appendChild(callout('def', 'Cardinal',
    'El <strong>cardinal</strong> de un conjunto es su clase de coordinabilidad: $A$ y $B$ tienen '
    + 'el mismo cardinal ($\\#A = \\#B$) si y sólo si $A \\sim B$. '
    + 'El cardinal mide el “tamaño” de un conjunto de forma que respeta las biyecciones.'
  ));

  root.appendChild(callout('tip', 'La idea clave',
    'Para conjuntos <strong>infinitos</strong>, un conjunto puede ser coordinable con una parte propia de sí mismo. '
    + 'Eso es imposible para conjuntos finitos, y es precisamente lo que caracteriza al infinito (Dedekind).'
  ));

  root.appendChild(el('h2', { text: 'Visualizá una biyección con ℕ' }));
  root.appendChild(el('p', { html:
    'Elegí una regla $f$ y movés el slider para ver cómo cada $n \\in \\mathbb{N}$ se empareja, sin repetir ni dejar huecos, '
    + 'con un elemento del otro conjunto. Ese emparejamiento perfecto <em>es</em> la biyección.' }));

  // Controles
  const controls = el('div', { class: 'controls' });
  const sel = el('select', {});
  for (const [k, v] of Object.entries(BIYECCIONES)) {
    sel.appendChild(el('option', { value: k }, v.label));
  }
  const selWrap = el('div', { class: 'control' }, [el('label', { text: 'Biyección' }), sel]);
  const nSlider = slider({ label: 'n (cantidad de pares mostrados)', min: 3, max: 12, step: 1, value: 7 });
  controls.appendChild(selWrap);
  controls.appendChild(nSlider.wrap);
  root.appendChild(controls);

  const descEl = callout('', 'Qué estás viendo', BIYECCIONES[sel.value].desc);
  root.appendChild(descEl);

  const viz = mountCanvas(root, {
    height: 420,
    view: { xmin: 0, xmax: 10, ymin: 0, ymax: 10 },
    hint: 'ℕ a la izquierda · imagen f(n) a la derecha',
  });

  function draw() {
    const p = viz.plane;
    const key = sel.value;
    const bij = BIYECCIONES[key];
    const count = Number(nSlider.input.value);
    p.clear();

    const W = p.width, H = p.height;
    const leftX = W * 0.24, rightX = W * 0.76;
    const top = 40, bottom = H - 30;
    const rowH = (bottom - top) / (count - 1 || 1);

    p.ctx.font = '15px Inter, sans-serif';
    p.ctx.textBaseline = 'middle';

    // Encabezados
    p.textPx('ℕ', leftX, 18, { align: 'center', color: COLORS.accent, font: 'bold 16px Inter' });
    p.textPx(key === 'pares' ? 'Pares' : key === 'cuadrados' ? 'Cuadrados' : 'ℤ',
      rightX, 18, { align: 'center', color: COLORS.pink, font: 'bold 16px Inter' });

    for (let i = 0; i < count; i++) {
      const n = i + 1;
      const y = top + i * rowH;
      const fn = bij.f(n);
      // línea de emparejamiento
      p.ctx.strokeStyle = COLORS.accent2;
      p.ctx.lineWidth = 2;
      p.ctx.globalAlpha = 0.7;
      p.ctx.beginPath();
      p.ctx.moveTo(leftX + 26, y);
      p.ctx.lineTo(rightX - 30, y);
      p.ctx.stroke();
      p.ctx.globalAlpha = 1;

      // nodo izquierdo
      p.ctx.fillStyle = COLORS.accent;
      p.ctx.beginPath(); p.ctx.arc(leftX, y, 15, 0, 7); p.ctx.fill();
      p.textPx(String(n), leftX, y, { align: 'center', color: '#fff' });

      // nodo derecho
      p.ctx.fillStyle = COLORS.pink;
      p.ctx.beginPath(); p.ctx.arc(rightX, y, 17, 0, 7); p.ctx.fill();
      p.textPx(String(fn), rightX, y, { align: 'center', color: '#1a1130' });
    }
  }

  viz.setDraw(draw);
  sel.addEventListener('change', () => {
    descEl.querySelector('div:last-child').innerHTML = BIYECCIONES[sel.value].desc;
    viz.redraw();
  });
  nSlider.input.addEventListener('input', () => viz.redraw());

  root.appendChild(callout('thm', 'Consecuencia',
    'Como exhibimos biyecciones explícitas, $\\mathbb{N} \\sim 2\\mathbb{N} \\sim \\{n^2\\} \\sim \\mathbb{Z}$. '
    + 'Todos comparten el mismo cardinal, que notamos $\\aleph_0$. En la próxima sección lo formalizamos.'
  ));
}
