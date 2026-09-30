// utils/canvas2d.js — helper de plano cartesiano sobre <canvas>.
// Encapsula la transformación mundo(matemático) <-> pantalla(píxeles),
// manejo de HiDPI (devicePixelRatio) y primitivas de dibujo comunes.

import { COLORS } from '../constants.js';

/** Convierte un color hex (#rrggbb) a rgba con alpha. Devuelve el color tal cual si no es hex. */
export function hexAlpha(hex, a) {
  if (typeof hex !== 'string' || hex[0] !== '#') return hex;
  const h = hex.slice(1);
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

/**
 * Crea un plano sobre un canvas.
 * @param {HTMLCanvasElement} canvas
 * @param {object} opts { xmin, xmax, ymin, ymax }  (coordenadas del mundo)
 */
export function createPlane(canvas, opts) {
  const view = {
    xmin: opts.xmin ?? -5,
    xmax: opts.xmax ?? 5,
    ymin: opts.ymin ?? -5,
    ymax: opts.ymax ?? 5,
  };
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, dpr = 1;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width = Math.max(1, Math.round(W * dpr));
    canvas.height = Math.max(1, Math.round(H * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // mundo -> pantalla
  const sx = (x) => ((x - view.xmin) / (view.xmax - view.xmin)) * W;
  const sy = (y) => H - ((y - view.ymin) / (view.ymax - view.ymin)) * H;
  // pantalla -> mundo
  const wx = (px) => view.xmin + (px / W) * (view.xmax - view.xmin);
  const wy = (py) => view.ymin + ((H - py) / H) * (view.ymax - view.ymin);

  function clear(color = COLORS.bgSoft) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, W, H);
  }

  function grid(step = 1) {
    // líneas de grilla
    ctx.lineWidth = 1;
    ctx.strokeStyle = COLORS.grid;
    ctx.beginPath();
    for (let x = Math.ceil(view.xmin / step) * step; x <= view.xmax; x += step) {
      ctx.moveTo(sx(x), 0); ctx.lineTo(sx(x), H);
    }
    for (let y = Math.ceil(view.ymin / step) * step; y <= view.ymax; y += step) {
      ctx.moveTo(0, sy(y)); ctx.lineTo(W, sy(y));
    }
    ctx.stroke();

    // Ejes: siempre visibles y bien contrastados.
    // Si el 0 está dentro del rango, el eje va en 0; si no, se ancla al borde
    // más cercano para que siempre haya una referencia clara de los ejes.
    ctx.save();
    ctx.strokeStyle = COLORS.text;
    ctx.lineWidth = 2;

    // Eje X (horizontal): en y=0 si está en rango, si no en el borde inferior/superior.
    let axisYpx;
    if (view.ymin < 0 && view.ymax > 0) axisYpx = sy(0);
    else if (view.ymin >= 0) axisYpx = H - 1;   // todo positivo → base abajo
    else axisYpx = 1;                            // todo negativo → base arriba
    ctx.beginPath();
    ctx.moveTo(0, axisYpx); ctx.lineTo(W, axisYpx); ctx.stroke();

    // Eje Y (vertical): en x=0 si está en rango, si no en el borde izq/der.
    let axisXpx;
    if (view.xmin < 0 && view.xmax > 0) axisXpx = sx(0);
    else if (view.xmin >= 0) axisXpx = 1;        // todo positivo → borde izquierdo
    else axisXpx = W - 1;                         // todo negativo → borde derecho
    ctx.beginPath();
    ctx.moveTo(axisXpx, 0); ctx.lineTo(axisXpx, H); ctx.stroke();

    ctx.restore();
  }

  function dot(x, y, r = 4, color = COLORS.accent, filled = true) {
    ctx.beginPath();
    ctx.arc(sx(x), sy(y), r, 0, Math.PI * 2);
    if (filled) { ctx.fillStyle = color; ctx.fill(); }
    else { ctx.lineWidth = 2; ctx.strokeStyle = color; ctx.fillStyle = COLORS.bgSoft; ctx.fill(); ctx.stroke(); }
  }

  function segment(x1, y1, x2, y2, color = COLORS.accent, wpx = 2, dash = null) {
    ctx.save();
    ctx.lineWidth = wpx;
    ctx.strokeStyle = color;
    if (dash) ctx.setLineDash(dash);
    ctx.beginPath();
    ctx.moveTo(sx(x1), sy(y1)); ctx.lineTo(sx(x2), sy(y2));
    ctx.stroke();
    ctx.restore();
  }

  function circle(cx, cy, r, { stroke = COLORS.accent, fill = null, wpx = 2, dash = null } = {}) {
    // Círculo en métrica euclídea: r en unidades del mundo (escala x).
    const rpx = (r / (view.xmax - view.xmin)) * W;
    ctx.save();
    ctx.lineWidth = wpx;
    if (dash) ctx.setLineDash(dash);
    ctx.beginPath();
    ctx.arc(sx(cx), sy(cy), rpx, 0, Math.PI * 2);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    ctx.strokeStyle = stroke;
    ctx.stroke();
    ctx.restore();
  }

  function polygon(points, { stroke = COLORS.accent, fill = null, wpx = 2, dash = null } = {}) {
    // points: array de [x,y] en mundo.
    ctx.save();
    ctx.lineWidth = wpx;
    if (dash) ctx.setLineDash(dash);
    ctx.beginPath();
    points.forEach(([x, y], i) => {
      const px = sx(x), py = sy(y);
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    });
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    ctx.strokeStyle = stroke;
    ctx.stroke();
    ctx.restore();
  }

  function text(str, x, y, { color = COLORS.text, font = '13px Inter, sans-serif', align = 'left', baseline = 'alphabetic' } = {}) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    ctx.fillText(str, sx(x), sy(y));
  }

  function textPx(str, px, py, { color = COLORS.text, font = '13px Inter, sans-serif', align = 'left', baseline = 'alphabetic' } = {}) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    ctx.fillText(str, px, py);
  }

  resize();
  return {
    ctx, view, resize,
    sx, sy, wx, wy,
    clear, grid, dot, segment, circle, polygon, text, textPx,
    get width() { return W; },
    get height() { return H; },
  };
}
