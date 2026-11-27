// pages/em-compacidad.js — Compacidad, Heine-Borel, Bolzano-Weierstrass y Heine-Cantor.

import { el, selectControl, slider } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';

export function renderCompacidad(root) {
  root.appendChild(pageHeader(
    'Compacidad en Espacios Métricos',
    'Cubrimientos abiertos, caracterización secuencial (Bolzano-Weierstrass), Teorema de Heine-Borel en $\\mathbb{R}^n$ y propiedades fundamentales para funciones continuas.'
  ));

  // 1. DEFINICIÓN POR CUBRIMIENTOS
  root.appendChild(callout('def', '1. Definición — Compacidad por Cubrimientos Abiertos',
    'Sea $(E,d)$ un espacio métrico y $K \\subseteq E$.<br>'
    + '• Un <strong>cubrimiento abierto</strong> de $K$ es una familia de conjuntos abiertos $\\{U_i\\}_{i \\in I}$ tal que $K \\subseteq \\bigcup_{i \\in I} U_i$.<br>'
    + '• El conjunto $K$ es <strong>compacto</strong> si de todo cubrimiento abierto de $K$ se puede extraer un <strong>subcubrimiento finito</strong>: existen índices $i_1, i_2, \\dots, i_m \\in I$ tales que $K \\subseteq U_{i_1} \\cup U_{i_2} \\cup \\dots \\cup U_{i_m}$.'
  ));

  // 2. CARACTERIZACIÓN SECUENCIAL
  root.appendChild(callout('thm', '2. Compacidad Secuencial (Bolzano-Weierstrass)',
    'Un subconjunto $K \\subseteq E$ es <strong>compacto</strong> $\\iff$ toda sucesión $(x_n)_{n \\in \\mathbb{N}} \\subseteq K$ posee una <strong>subsucesión convergente</strong> $(x_{n_k})_{k \\in \\mathbb{N}}$ cuyo límite pertenece a $K$ (i.e. $x_{n_k} \\to x_0 \\in K$).'
  ));

  // 3. TEOREMA DE HEINE-BOREL EN R^n
  root.appendChild(callout('thm', '3. Teorema de Heine-Borel (en ℝⁿ)',
    'En $(\\mathbb{R}^n, d_2)$ (y equivalentemente bajo $d_1$ y $d_\\infty$):<br>'
    + '$K \\subseteq \\mathbb{R}^n$ es <strong>compacto $\\iff K$ es cerrado y acotado</strong>.<br>'
    + '<em>Atención:</em> En espacios métricos generales de dimensión infinita (como $C([0,1])$), ser cerrado y acotado <strong>no</strong> garantiza compacidad.'
  ));

  // 4. PROPIEDADES FUNDAMENTALES Y FUNCIONES CONTINUAS
  root.appendChild(callout('def', '4. Teoremas Fundamentales sobre Compactos',
    '• <strong>Imagen continua de un compacto:</strong> Si $f: E \\to F$ es continua y $K \\subseteq E$ es compacto, entonces $f(K)$ es compacto en $F$.<br>'
    + '• <strong>Teorema de Weierstrass (Extremos absolutos):</strong> Toda función continua $f: K \\to \\mathbb{R}$ definida en un compacto $K \\neq \\emptyset$ alcanza su mínimo y máximo absolutos en $K$.<br>'
    + '• <strong>Teorema de Heine-Cantor:</strong> Si $f: K \\to F$ es continua sobre un compacto $K$, entonces $f$ es <strong>uniformemente continua</strong> en $K$.<br>'
    + '• <strong>Subespacios:</strong> Un subconjunto cerrado dentro de un compacto es compacto.'
  ));

  // --- SECCIÓN INTERACTIVA 1: CUBRIMIENTOS DE INTERVALOS EN ℝ ---
  root.appendChild(el('h2', { text: '1. Simulador de Cubrimientos Abiertos en ℝ' }));
  root.appendChild(el('p', { html:
    'Elegí un conjunto $K \\subseteq \\mathbb{R}$ y probá agregar abiertos $U_n$. '
    + 'En conjuntos compactos como $[0,1]$, una cantidad finita alcanza siempre para cubrir todo el conjunto. '
    + 'En conjuntos no compactos como $(0,1]$ o $\\mathbb{R}$, es posible construir cubrimientos infinitos sin ningún subcubrimiento finito.' }));

  const controls1 = el('div', { class: 'controls' });
  const setSel = selectControl({
    label: 'Conjunto K ⊂ ℝ',
    options: [
      { value: 'closed', label: '[0, 1]  (Cerrado y acotado → COMPACTO)' },
      { value: 'open', label: '(0, 1]  (No cerrado → NO COMPACTO)' },
      { value: 'unbounded', label: '[0, +∞)  (No acotado → NO COMPACTO)' },
    ],
    value: 'closed',
  });
  const btnAdd = el('button', { class: 'btn' }, '➕ Agregar abierto U_n');
  const btnReset = el('button', { class: 'btn ghost' }, '↺ Reiniciar');
  controls1.appendChild(setSel.wrap);
  controls1.appendChild(btnAdd);
  controls1.appendChild(btnReset);
  root.appendChild(controls1);

  const viz1 = mountCanvas(root, {
    height: 240,
    view: { xmin: -0.2, xmax: 2.2, ymin: -0.5, ymax: 1.5 },
    hint: 'Línea inferior = Conjunto K | Arcos = Abiertos U_n del cubrimiento',
  });

  const out1 = readout('');
  root.appendChild(out1);

  let numOpen = 1;

  function draw1() {
    const p = viz1.plane;
    p.clear();
    const kind = setSel.select.value;

    // Eje X
    p.ctx.strokeStyle = COLORS.textDim; p.ctx.lineWidth = 1;
    p.ctx.beginPath(); p.ctx.moveTo(p.sx(-0.2), p.sy(0)); p.ctx.lineTo(p.sx(2.2), p.sy(0)); p.ctx.stroke();
    p.text('0', 0, -0.25, { align: 'center', color: COLORS.textDim });
    p.text('1', 1, -0.25, { align: 'center', color: COLORS.textDim });

    // Dibujar el conjunto K
    p.ctx.lineWidth = 6; p.ctx.strokeStyle = COLORS.accent;
    p.ctx.beginPath();
    if (kind === 'unbounded') {
      p.ctx.moveTo(p.sx(0), p.sy(0)); p.ctx.lineTo(p.sx(2.2), p.sy(0)); p.ctx.stroke();
      p.dot(0, 0, 6, COLORS.accent, true);
    } else {
      p.ctx.moveTo(p.sx(0), p.sy(0)); p.ctx.lineTo(p.sx(1), p.sy(0)); p.ctx.stroke();
      p.dot(1, 0, 6, COLORS.accent, true);
      p.dot(0, 0, 6, COLORS.accent, kind === 'closed');
    }

    // Dibujar la familia de abiertos U_n
    const palette = [COLORS.pink, COLORS.cyan, COLORS.warn, COLORS.ok, COLORS.accent2];
    let covered = false;

    if (kind === 'closed') {
      for (let j = 0; j < numOpen; j++) {
        const center = (j + 0.5) / numOpen;
        const radius = 0.65 / numOpen + 0.1;
        drawArc(p, center - radius, center + radius, 0.3 + 0.12 * (j % 3), palette[j % palette.length]);
      }
      covered = numOpen >= 3;
    } else if (kind === 'open') {
      for (let j = 0; j < numOpen; j++) {
        const left = 1 / (j + 2); // U_j = (1/(j+2), 2)
        drawArc(p, left, 1.3, 0.3 + 0.12 * (j % 3), palette[j % palette.length]);
      }
      covered = false; // Infinitos necesarios cerca de 0
    } else { // unbounded
      for (let j = 0; j < numOpen; j++) {
        drawArc(p, -0.1, j + 1.1, 0.3 + 0.12 * (j % 3), palette[j % palette.length]);
      }
      covered = false; // Nunca cubre todo [0, +inf)
    }

    out1.textContent =
      `CONJUNTO K: ${kind === 'closed' ? '[0,1]' : kind === 'open' ? '(0,1]' : '[0, +∞)'}\n`
      + `Abiertos utilizados en el cubrimiento: ${numOpen}\n`
      + (kind === 'closed'
        ? (covered ? '✓ CUBIERTO: Existe subcubrimiento finito. ¡[0,1] es compacto!' : 'Seguí agregando abiertos: con una cantidad finita alcanza.')
        : kind === 'open'
          ? '⚠ Cerca de x=0 los abiertos (1/n, 2) no alcanzan a cubrir el borde con una cantidad finita. NO es compacto.'
          : '⚠ Al expandirse al infinito, ningún subconjunto finito de la familia (-0.1, n) cubre [0, +∞). NO es compacto.');
  }

  function drawArc(p, a, b, h, col) {
    p.ctx.strokeStyle = col; p.ctx.lineWidth = 2.5;
    p.ctx.beginPath();
    const steps = 30;
    for (let i = 0; i <= steps; i++) {
      const x = a + (b - a) * (i / steps);
      const y = h * Math.sin(Math.PI * (i / steps));
      if (i === 0) p.ctx.moveTo(p.sx(x), p.sy(y)); else p.ctx.lineTo(p.sx(x), p.sy(y));
    }
    p.ctx.stroke();
  }

  viz1.setDraw(draw1);
  setSel.select.addEventListener('change', () => { numOpen = 1; viz1.redraw(); });
  btnAdd.addEventListener('click', () => { numOpen = Math.min(numOpen + 1, 10); viz1.redraw(); });
  btnReset.addEventListener('click', () => { numOpen = 1; viz1.redraw(); });

  // --- SECCIÓN INTERACTIVA 2: COMPACIDAD SECUENCIAL EN ℝ² ---
  root.appendChild(el('h2', { text: '2. Compacidad Secuencial en ℝ² (Bolzano-Weierstrass)' }));
  root.appendChild(el('p', { html:
    'Generá una sucesión de puntos $(x_n)_{n \\in \\mathbb{N}}$ dentro del plano. '
    + 'Si el dominio $K$ es cerrado y acotado (disco cerrado $\\overline{B}(0,2)$), '
    + 'el teorema de Bolzano-Weierstrass garantiza que existe una subsucesión $(x_{n_k})$ que **converge a un punto de $K$** (resaltado en verde).' }));

  const controls2 = el('div', { class: 'controls' });
  const setSel2 = selectControl({
    label: 'Dominio K ⊂ ℝ²',
    options: [
      { value: 'compact', label: 'B̄(0,2)  Disco Cerrado (COMPACTO)' },
      { value: 'non_compact', label: 'B(0,2)  Disco Abierto (Falta la frontera)' },
    ],
    value: 'compact',
  });
  const btnGenSeq = el('button', { class: 'btn' }, '🎲 Generar Sucesión (x_n)');
  controls2.appendChild(setSel2.wrap);
  controls2.appendChild(btnGenSeq);
  root.appendChild(controls2);

  const viz2 = mountCanvas(root, {
    height: 380,
    view: { xmin: -3, xmax: 3, ymin: -3, ymax: 3 },
    hint: 'Puntos celestes = (x_n) | Puntos amarillos = Subsucesión (x_n_k) | Punto verde = Límite en K',
  });

  const out2 = readout('');
  root.appendChild(out2);

  let sequence = [];
  let subseq = [];
  let limitPoint = null;

  function generateSequence() {
    const isCompact = setSel2.select.value === 'compact';
    sequence = [];
    subseq = [];
    
    // Generar un límite candidato en el borde r=2 o cerca
    const targetAngle = Math.random() * 2 * Math.PI;
    const targetR = isCompact ? 2.0 : 1.99;
    limitPoint = { x: targetR * Math.cos(targetAngle), y: targetR * Math.sin(targetAngle) };

    for (let n = 1; n <= 40; n++) {
      // Puntos tendiendo al límite objetivo con oscilación
      const r = isCompact 
        ? Math.min(2.0, targetR - (0.8 / n) + (Math.random() * 0.2 - 0.1))
        : Math.min(1.98, 2.0 - (1.0 / n));
      const a = targetAngle + (Math.sin(n) * 0.5) / n;
      const pt = { x: r * Math.cos(a), y: r * Math.sin(a), n };
      sequence.push(pt);

      if (n % 4 === 0) {
        subseq.push(pt);
      }
    }
  }

  function draw2() {
    const p = viz2.plane;
    p.clear();
    p.grid(1);

    const isCompact = setSel2.select.value === 'compact';

    // Borde del dominio K
    p.circle(0, 0, 2, {
      stroke: isCompact ? COLORS.accent2 : COLORS.warn,
      wpx: 2,
      dash: isCompact ? [] : [4, 4],
    });

    if (sequence.length === 0) generateSequence();

    // Dibujar toda la sucesión (x_n)
    sequence.forEach((pt) => {
      p.dot(pt.x, pt.y, 3, COLORS.cyan);
    });

    // Dibujar la subsucesión (x_{n_k})
    subseq.forEach((pt) => {
      p.dot(pt.x, pt.y, 5, COLORS.warn);
    });

    // Dibujar punto límite
    if (limitPoint) {
      const inDomain = isCompact || Math.hypot(limitPoint.x, limitPoint.y) < 2.0;
      p.dot(limitPoint.x, limitPoint.y, 7, inDomain ? COLORS.ok : COLORS.err);
      p.text(inDomain ? 'x₀ ∈ K' : 'x₀ ∉ K', limitPoint.x + 0.15, limitPoint.y + 0.1, {
        color: inDomain ? COLORS.ok : COLORS.err,
        font: 'bold 12px Inter'
      });
    }

    out2.textContent =
      `EVALUACIÓN EN ${isCompact ? 'DISCO CERRADO (COMPACTO)' : 'DISCO ABIERTO (NO COMPACTO)'}:\n`
      + `• Sucesión generada (x_n): 40 términos en K.\n`
      + `• Subsucesión elegida (x_n_k): ${subseq.length} términos resueltos.\n`
      + (isCompact
        ? '✓ Bolzano-Weierstrass: El límite x₀ de la subsucesión pertenece a K (K es cerrado y acotado).'
        : '⚠ El límite de la subsucesión cae en la frontera r=2, que NO pertenece al abierto B(0,2). Por ende, NO es compacto.');
  }

  viz2.setDraw(draw2);
  setSel2.select.addEventListener('change', () => { generateSequence(); viz2.redraw(); });
  btnGenSeq.addEventListener('click', () => { generateSequence(); viz2.redraw(); });
}