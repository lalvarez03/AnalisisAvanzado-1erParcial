// pages/em-funciones.js — Sucesiones de funciones (Cap. 7): convergencia puntual vs. uniforme.

import { el, slider, selectControl } from '../utils/dom.js';
import { pageHeader, callout, mountCanvas } from '../utils/page.js';
import { exRef } from '../utils/ejercicios.js';
import { COLORS } from '../constants.js';
import { hexAlpha } from '../utils/canvas2d.js';

// Familias para la visualización. fn(n,x) es f_n(x); lim(x) es el límite puntual.
const FAMILIAS = {
  potencias: {
    label: 'f_n(x) = xⁿ en [0,1]',
    xmin: 0, xmax: 1, ymin: -0.2, ymax: 1.2,
    fn: (n, x) => Math.pow(x, n),
    lim: (x) => (x < 1 ? 0 : 1),
    uniforme: false,
    texto: 'Cada $f_n$ es continua pero el límite puntual salta en $x=1$. Como el límite uniforme de continuas es continuo (Teorema 7.6), <strong>no puede haber convergencia uniforme</strong>: siempre hay un $x$ cerca de $1$ donde $x^n=\\tfrac12$.',
  },
  seno: {
    label: 'f_n(x) = sen(nx)/n en [−6,6]',
    xmin: -6, xmax: 6, ymin: -1.2, ymax: 1.2,
    fn: (n, x) => Math.sin(n * x) / n,
    lim: () => 0,
    uniforme: true,
    texto: 'Acá $|f_n(x)|\\le\\tfrac1n$ para <em>todo</em> $x$: la gráfica entera entra en la banda $\\pm\\varepsilon$ cuando $n>1/\\varepsilon$. <strong>Convergencia uniforme ($\\rightrightarrows$).</strong>',
  },
  pico: {
    label: 'f_n(x) = n x² / (1 + n x²) en [0,1]',
    xmin: 0, xmax: 1, ymin: -0.2, ymax: 1.2,
    fn: (n, x) => (n * x * x) / (1 + n * x * x),
    lim: (x) => (x === 0 ? 0 : 1),
    uniforme: false,
    texto: 'El límite puntual vale $1$ salvo en $0$. El "escalón" se afina pero nunca desaparece: en $x=1/\\sqrt n$ el error es siempre $\\tfrac12$. <strong>No uniforme.</strong>',
  },
  gauss: {
    label: 'f_n(x) = x e^(−n x²) en [−3,3]',
    xmin: -3, xmax: 3, ymin: -0.8, ymax: 0.8,
    fn: (n, x) => x * Math.exp(-n * x * x),
    lim: () => 0,
    uniforme: true,
    texto: 'El máximo de $|f_n|$ es $\\tfrac{e^{-1/2}}{\\sqrt{2n}}\\to0$ (se calcula derivando). <strong>Uniforme ($\\rightrightarrows$)</strong>, aunque la gráfica tiene "jorobas" que se angostan.',
  },
  pico2: {
    label: 'f_n(x) = n² x (1 − x²)ⁿ en [0,1]',
    xmin: 0, xmax: 1, ymin: -0.5, ymax: 8,
    fn: (n, x) => n * n * x * Math.pow(1 - x * x, n),
    lim: () => 0,
    uniforme: false,
    texto: 'Tiende a $0$ en cada punto, pero cada $f_n$ tiene un pico (en $x\\approx1/\\sqrt{2n}$) cuya altura crece como $\\sqrt n$. Un pico que escapa hacia $0$: <strong>puntual pero no uniforme</strong>.',
  },
};

export function renderFunciones(root) {
  root.appendChild(pageHeader(
    'Sucesiones de funciones',
    'Hasta ahora, un límite era un <em>número</em>. Acá el límite es una <em>función</em>: ¿qué quiere decir que $f_n\\to f$? '
    + 'Hay dos respuestas razonables y no son equivalentes.'
  ));

  root.appendChild(callout('tip', 'Motivación',
    'Queremos poder decir cosas como "si las $f_n$ son continuas, el límite también", o "la integral del límite es el límite de las integrales". '
    + 'Con la noción más débil (puntual) eso es falso; con la fuerte (uniforme) es verdadero.'
  ));

  root.appendChild(callout('def', 'Convergencia puntual (Def. 7.1)',
    'Sean $f_n,f:X\\to Y$ con $(Y,d)$ métrico. $f_n\\to f$ <strong>puntualmente</strong> si '
    + '$$\\forall x\\in X\\ \\forall\\varepsilon>0\\ \\exists n_0\\in\\mathbb{N}\\ \\forall n\\ge n_0:\\ d(f_n(x),f(x))<\\varepsilon.$$'
    + 'Acá $n_0$ puede depender de $x$ y de $\\varepsilon$.'
  ));

  root.appendChild(callout('def', 'Convergencia uniforme (Def. 7.3)',
    '$f_n\\rightrightarrows f$ <strong>uniformemente</strong> si '
    + '$$\\forall\\varepsilon>0\\ \\exists n_0\\in\\mathbb{N}\\ \\forall n\\ge n_0\\ \\forall x\\in X:\\ d(f_n(x),f(x))<\\varepsilon,$$'
    + 'equivalentemente $\\sup_{x\\in X}d(f_n(x),f(x))\\to0$. La diferencia es solo <em>dónde está el "para todo $x$"</em>: '
    + 'acá el $n_0$ es el mismo para todos los puntos. Uniforme ($\\rightrightarrows$) $\\Rightarrow$ puntual ($\\to$), no al revés.'
  ));

  root.appendChild(el('h2', { text: 'Mirarlo: la banda de ancho ε' }));
  root.appendChild(el('p', { html:
    'Convergencia uniforme significa que <strong>toda la gráfica</strong> de $f_n$ entra, a partir de cierto $n$, en la franja de ancho $2\\varepsilon$ alrededor de $f$. '
    + 'Elegí una familia, movés $n$ y fijate si la gráfica entra en la franja (verde) o si queda algún tramo afuera (rojo).' }));

  const sel = selectControl({
    label: 'Familia',
    options: Object.entries(FAMILIAS).map(([k, v]) => ({ value: k, label: v.label })),
    value: 'potencias',
  });
  const nS = slider({ label: 'n', min: 1, max: 60, step: 1, value: 3 });
  const eS = slider({ label: 'ε', min: 0.05, max: 0.5, step: 0.01, value: 0.2, format: (v) => v.toFixed(2) });
  root.appendChild(el('div', { class: 'controls' }, [sel.wrap, nS.wrap, eS.wrap]));

  const viz = mountCanvas(root, {
    height: 340,
    view: { xmin: 0, xmax: 1, ymin: -0.2, ymax: 1.2 },
    hint: 'azul: f_n · amarillo: límite puntual f · franja: f ± ε',
  });
  const read = el('div', { class: 'readout' });
  root.appendChild(read);
  const nota = callout('', 'Qué está pasando', '');
  root.appendChild(nota);

  function draw() {
    const fam = FAMILIAS[sel.select.value];
    const n = Number(nS.input.value);
    const eps = Number(eS.input.value);
    const p = viz.plane;
    p.view.xmin = fam.xmin; p.view.xmax = fam.xmax; p.view.ymin = fam.ymin; p.view.ymax = fam.ymax;
    p.clear();
    p.grid(fam.xmax - fam.xmin > 2 ? 1 : 0.25);

    const N = 600;
    const xs = [];
    for (let i = 0; i <= N; i++) xs.push(fam.xmin + ((fam.xmax - fam.xmin) * i) / N);

    // Franja f ± ε
    const ctx = p.ctx;
    ctx.save();
    ctx.fillStyle = hexAlpha(COLORS.ok, 0.18);
    ctx.beginPath();
    xs.forEach((x, i) => { const px = p.sx(x), py = p.sy(fam.lim(x) + eps); if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
    for (let i = xs.length - 1; i >= 0; i--) ctx.lineTo(p.sx(xs[i]), p.sy(fam.lim(xs[i]) - eps));
    ctx.closePath(); ctx.fill();
    ctx.restore();

    // Límite puntual
    ctx.save();
    ctx.strokeStyle = COLORS.warn; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
    ctx.beginPath();
    let pen = false;
    xs.forEach((x) => {
      const y = fam.lim(x);
      const px = p.sx(x), py = p.sy(y);
      if (!pen) { ctx.moveTo(px, py); pen = true; } else ctx.lineTo(px, py);
    });
    ctx.stroke(); ctx.restore();

    // f_n, con tramo fuera de la franja en rojo
    let supErr = 0, xWorst = xs[0];
    ctx.lineWidth = 2.5;
    for (let i = 1; i < xs.length; i++) {
      const x0 = xs[i - 1], x1 = xs[i];
      const y0 = fam.fn(n, x0), y1 = fam.fn(n, x1);
      const e1 = Math.abs(y1 - fam.lim(x1));
      if (e1 > supErr) { supErr = e1; xWorst = x1; }
      const fuera = Math.abs(y1 - fam.lim(x1)) >= eps || Math.abs(y0 - fam.lim(x0)) >= eps;
      ctx.strokeStyle = fuera ? COLORS.err : COLORS.accent;
      ctx.beginPath(); ctx.moveTo(p.sx(x0), p.sy(y0)); ctx.lineTo(p.sx(x1), p.sy(y1)); ctx.stroke();
    }

    const dentro = supErr < eps;
    read.textContent = `n = ${n}   ·   máx |f_n − f| ≈ ${supErr.toFixed(3)} (en x ≈ ${xWorst.toFixed(3)})   ·   ε = ${eps.toFixed(2)}   →   ${dentro ? 'toda la gráfica entra en la franja' : 'hay tramos fuera de la franja'}`;
    nota.querySelector('div:last-child').innerHTML = fam.texto
      + (fam.uniforme ? '' : ' Subí $n$: aunque cada punto fijo termina entrando en la franja, <em>siempre queda un tramo rojo</em> en algún lado.');
    if (window.MathJax?.typesetPromise) window.MathJax.typesetPromise([nota]).catch(() => {});
  }

  viz.setDraw(draw);
  [sel.select, nS.input, eS.input].forEach((c) => c.addEventListener('input', () => viz.redraw()));

  root.appendChild(el('h2', { text: 'Cómo se refuta (y se prueba) la convergencia uniforme' }));
  root.appendChild(callout('tip', 'Receta en tres pasos',
    '<ol>'
    + '<li><strong>Límite puntual.</strong> Fijá $x$ y hacé $n\\to\\infty$. Eso te da el único candidato $f$.</li>'
    + '<li><strong>Error uniforme.</strong> Calculá (o acotá) $M_n=\\sup_x d(f_n(x),f(x))$. Si es difícil, derivá $f_n-f$ y buscá el máximo.</li>'
    + '<li><strong>Decidí.</strong> Si $M_n\\to0$: uniforme ($f_n\\rightrightarrows f$). Si no, exhibí puntos $a_n$ con $d(f_n(a_n),f(a_n))\\ge\\alpha>0$ (Ej. 7.1). '
    + 'Atajo para no uniforme: las $f_n$ son continuas y el límite no.</li></ol>'
  ));

  root.appendChild(el('h2', { text: 'Teoremas que hacen valer la convergencia uniforme' }));

  root.appendChild(callout('thm', 'Teorema 7.6 (continuidad)',
    'Si $f_n:X\\to Y$ son continuas y $f_n\\rightrightarrows f$, entonces $f$ es continua.',
    '<p>Sea $x\\in X$, $\\varepsilon>0$. Por convergencia uniforme existe $n_0$ con $\\sup_zd\'(f_{n_0}(z),f(z))<\\varepsilon/3$. Como $f_{n_0}$ es continua en $x$, existe $\\delta>0$ con $d\'(f_{n_0}(x),f_{n_0}(y))<\\varepsilon/3$ si $d(x,y)<\\delta$. Entonces, para $d(x,y)<\\delta$:</p>'
    + '<p>$d\'(f(x),f(y))\\le d\'(f(x),f_{n_0}(x))+d\'(f_{n_0}(x),f_{n_0}(y))+d\'(f_{n_0}(y),f(y))<\\varepsilon$. $\\blacksquare$</p>'
    + '<p><em>Por qué el $\\varepsilon/3$:</em> hay tres tramos (de $f(x)$ a $f_{n_0}(x)$, de ahí a $f_{n_0}(y)$, y de ahí a $f(y)$); cada uno cuesta $\\varepsilon/3$.</p>'
  ));

  root.appendChild(callout('thm', 'Prop. 7.13 (integral)',
    'Si $f_n,f:[a,b]\\to\\mathbb{R}$ son continuas y $f_n\\rightrightarrows f$, entonces $\\int_a^bf_n\\to\\int_a^bf$.',
    '<p>$\\Big|\\int_a^bf_n-\\int_a^bf\\Big|\\le\\int_a^b|f_n-f|\\le(b-a)\\,d_\\infty(f_n,f)\\to0$. $\\blacksquare$</p>'
  ));

  root.appendChild(callout('thm', 'Teorema 7.11 (completitud) y Ejemplo 7.12',
    'Si $(f_n)$ es <em>uniformemente de Cauchy</em> ($\\forall\\varepsilon\\,\\exists n_0\\,\\forall n,m\\ge n_0:\\ \\sup_xd\'(f_n(x),f_m(x))<\\varepsilon$) y $Y$ es completo, existe $f$ con $f_n\\rightrightarrows f$. '
    + 'En consecuencia $(B(X),d_\\infty)$ y $(C(K),d_\\infty)$ ($K$ compacto) son espacios métricos <strong>completos</strong>.',
    '<p>Para cada $x$, $(f_n(x))$ es de Cauchy en $Y$ completo, así que converge; llamamos $f(x)$ al límite. Dado $\\varepsilon$, tomamos $n_0$ con $\\sup_xd\'(f_n(x),f_m(x))<\\varepsilon/2$ para $n,m\\ge n_0$. Fijado $x$ y $n\\ge n_0$, hacemos $m\\to\\infty$: $d\'(f_n(x),f(x))\\le\\varepsilon/2<\\varepsilon$. Vale para todo $x$: $f_n\\rightrightarrows f$. $\\blacksquare$</p>'
  ));

  root.appendChild(callout('thm', 'Prop. 7.15 (derivada)',
    'Si $f_n\\in C^1([a,b])$, $f_n\\to f$ puntualmente y $f_n\'\\rightrightarrows g$, entonces $f$ es derivable y $f\'=g$.',
    '<p>Por el TFC, $f_n(x)-f_n(a)=\\int_a^xf_n\'(t)\\,dt$. Pasando al límite (Prop. 7.13): $f(x)-f(a)=\\int_a^xg(t)\\,dt$. Como $g$ es continua (límite uniforme de continuas), el TFC da $f\'=g$. $\\blacksquare$</p>'
    + '<p><em>Ojo:</em> hace falta que converjan uniformemente las <strong>derivadas</strong>; que converjan las $f_n$ no alcanza (Ej. 7.5).</p>'
  ));

  root.appendChild(el('h2', { text: 'Series de funciones y criterio M de Weierstrass' }));
  root.appendChild(callout('def', 'Series de funciones',
    'Una serie $\\sum_{n\\ge1}f_n$ converge (puntual o uniformemente) si la sucesión de sumas parciales $S_N=\\sum_{n\\le N}f_n$ lo hace. '
    + 'Ej. 7.9: si las $f_n$ son continuas y la serie converge uniformemente, la suma es continua y (en $[a,b]$) se puede integrar término a término.'
  ));
  root.appendChild(callout('thm', 'Criterio M de Weierstrass',
    'Si $|u_n(x)|\\le M_n$ para todo $x\\in D$ y $\\sum M_n<\\infty$, entonces $\\sum u_n$ converge absoluta y uniformemente en $D$.',
    '<p>Para cada $x$ la serie converge absolutamente por comparación. La cola cumple $\\big|\\sum_{n>N}u_n(x)\\big|\\le\\sum_{n>N}M_n$ para todo $x\\in D$, y esa cola numérica tiende a $0$. Entonces $\\sup_D|S-S_N|\\to0$. $\\blacksquare$</p>'
  ));
  root.appendChild(callout('warn', 'Errores comunes',
    '<ul>'
    + '<li>Creer que "converge en cada punto" alcanza para conservar continuidad, integral o derivada. No: hace falta uniformidad.</li>'
    + '<li>Probar uniformidad en $[a,b]$ y concluir que vale en toda la recta. Es falso (Ej. 7.2b, 7.10a). Sí vale la recíproca útil: $f_n\\rightrightarrows f$ en cada acotado $\\Rightarrow$ <em>continua</em> en todo $\\mathbb{R}$.</li>'
    + '<li>Mirar solo el límite punto a punto de picos que escapan: $f_n\\to0$ puntual no implica $\\int f_n\\to0$.</li></ul>'
  ));

  root.appendChild(exRef(7, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]));
  root.appendChild(callout('', 'Resueltos',
    'Los once ejercicios de la Práctica 7 están resueltos paso a paso en la <a href="#guia">Guía resuelta</a> (pestaña "Práctica 7").'
  ));

  viz.redraw();
}
