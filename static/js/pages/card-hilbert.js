// pages/card-hilbert.js — El Hotel de Hilbert (intuición del infinito numerable).

import { el } from '../utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../utils/page.js';
import { COLORS } from '../constants.js';
import { registerCleanup } from '../state.js';

export function renderHilbert(root) {
  root.appendChild(pageHeader(
    'El Hotel de Hilbert',
    'Un hotel con infinitas habitaciones $1, 2, 3, \\dots$, todas ocupadas. '
    + '¿Cómo hacemos lugar? Cada escenario es una biyección $\\mathbb{N} \\to \\mathbb{N}$ disfrazada.'
  ));

  root.appendChild(callout('def', 'La regla del hotel',
    'Hay una habitación por cada natural y todas están ocupadas. Reubicar huéspedes solo es válido si '
    + '<strong>nadie queda sin cuarto y nadie comparte</strong>: es decir, si la reasignación es una biyección.'
  ));

  const scenarios = {
    uno: {
      label: 'Llega 1 huésped nuevo',
      rule: 'Cada huésped n → n+1. Queda libre la habitación 1.',
      map: (n) => n + 1, newGuests: [1], newAt: (i) => 1,
    },
    k: {
      label: 'Llegan k huéspedes',
      rule: 'Cada huésped n → n+k. Quedan libres 1..k.',
      map: (n, k) => n + k, dynamicK: true,
    },
    bus: {
      label: 'Llega un colectivo infinito',
      rule: 'Cada huésped n → 2n (habitaciones pares). Los impares quedan para los nuevos.',
      map: (n) => 2 * n, infinite: true,
    },
  };

  const controls = el('div', { class: 'controls' });
  const sel = el('select', {});
  for (const [key, s] of Object.entries(scenarios)) sel.appendChild(el('option', { value: key }, s.label));
  controls.appendChild(el('div', { class: 'control' }, [el('label', { text: 'Escenario' }), sel]));

  const kInput = el('input', { type: 'number', min: 1, max: 6, value: 3, style: 'width:80px;' });
  const kWrap = el('div', { class: 'control', style: 'display:none;' }, [el('label', { text: 'k (huéspedes)' }), kInput]);
  controls.appendChild(kWrap);

  const go = el('button', { class: 'btn' }, '▶ Reubicar');
  controls.appendChild(go);
  root.appendChild(controls);

  const ruleEl = callout('tip', 'Regla de reubicación', scenarios.uno.rule);
  root.appendChild(ruleEl);

  const out = readout('Elegí un escenario y presioná “Reubicar”.');
  root.appendChild(out);

  const viz = mountCanvas(root, {
    height: 260,
    view: { xmin: 0, xmax: 1, ymin: 0, ymax: 1 },
    hint: 'habitaciones: azul = ocupada por antiguo huésped · rosa = nuevo huésped',
  });

  const ROOMS = 12;
  // estado de la animación
  let anim = { active: false, t: 0, key: 'uno', k: 3 };

  function draw() {
    const p = viz.plane;
    p.clear();
    const W = p.width, H = p.height;
    const m = 24;
    const cw = (W - 2 * m) / ROOMS;
    const roomY = H * 0.5 - 24, roomH = 48;
    const t = anim.active ? anim.t : 1;

    for (let r = 1; r <= ROOMS; r++) {
      const x = m + (r - 1) * cw;
      // color según destino
      const key = anim.key;
      const s = scenarios[key];
      let occupant = null; // 'old' | 'new' | null
      let fromLabel = '';
      if (key === 'uno') {
        if (r === 1) { occupant = t > 0.6 ? 'new' : null; fromLabel = 'nuevo'; }
        else { occupant = 'old'; fromLabel = String(r - 1); }
      } else if (key === 'k') {
        const k = anim.k;
        if (r <= k) { occupant = t > 0.6 ? 'new' : null; fromLabel = 'nuevo'; }
        else { occupant = 'old'; fromLabel = String(r - k); }
      } else if (key === 'bus') {
        if (r % 2 === 0) { occupant = 'old'; fromLabel = String(r / 2); }
        else { occupant = t > 0.6 ? 'new' : null; fromLabel = 'bus'; }
      }

      p.ctx.fillStyle = occupant === 'old' ? COLORS.accent : occupant === 'new' ? COLORS.pink : COLORS.panel;
      p.ctx.strokeStyle = COLORS.border;
      p.ctx.lineWidth = 1.5;
      roundRect(p.ctx, x + 3, roomY, cw - 6, roomH, 8);
      p.ctx.fill(); p.ctx.stroke();

      // número de habitación
      p.textPx('#' + r, x + cw / 2, roomY - 10, { align: 'center', color: COLORS.textDim, font: '12px Inter' });
      // ocupante
      if (occupant) {
        p.ctx.fillStyle = occupant === 'new' ? '#1a1130' : '#fff';
        p.textPx(fromLabel, x + cw / 2, roomY + roomH / 2, { align: 'center', baseline: 'middle', font: '12px Inter', color: occupant === 'new' ? '#1a1130' : '#fff' });
      }
    }
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  viz.setDraw(draw);

  sel.addEventListener('change', () => {
    kWrap.style.display = sel.value === 'k' ? 'flex' : 'none';
    ruleEl.querySelector('div:last-child').innerHTML = scenarios[sel.value].rule;
    anim = { active: false, t: 1, key: sel.value, k: Number(kInput.value) };
    viz.redraw();
  });

  let raf = 0;
  go.addEventListener('click', () => {
    const key = sel.value;
    anim = { active: true, t: 0, key, k: Number(kInput.value) };
    const start = performance.now();
    cancelAnimationFrame(raf);
    const loop = (now) => {
      anim.t = Math.min(1, (now - start) / 900);
      viz.redraw();
      if (anim.t < 1) raf = requestAnimationFrame(loop);
      else { anim.active = false; showResult(key); }
    };
    raf = requestAnimationFrame(loop);
  });
  registerCleanup(() => cancelAnimationFrame(raf));

  function showResult(key) {
    const s = scenarios[key];
    if (key === 'uno') out.textContent = 'f(n) = n + 1  es biyectiva.  La habitación 1 quedó libre para el huésped nuevo.  ✓ Todos alojados.';
    else if (key === 'k') out.textContent = `f(n) = n + ${anim.k}  es biyectiva.  Habitaciones 1..${anim.k} quedan libres.  ✓ Todos alojados.`;
    else out.textContent = 'f(n) = 2n  manda a todos a las pares.  Las infinitas impares alojan al colectivo infinito.  ✓ ℕ ∪ ℕ ~ ℕ.';
  }

  root.appendChild(callout('thm', 'La moraleja formal',
    'Cada escenario construye una biyección de $\\mathbb{N}$ (o $\\mathbb{N} \\sqcup \\mathbb{N}$) en $\\mathbb{N}$. '
    + 'Esto muestra que $\\aleph_0 + 1 = \\aleph_0$, $\\;\\aleph_0 + k = \\aleph_0$ y $\\;\\aleph_0 + \\aleph_0 = \\aleph_0$. '
    + 'El infinito numerable “absorbe” sumas numerables.'
  ));
}
