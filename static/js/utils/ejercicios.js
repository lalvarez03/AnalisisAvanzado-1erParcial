// utils/ejercicios.js — consignas de los ejercicios de las Prácticas 1-3.
// Permite mostrar, además del número, el enunciado real del ejercicio.

import { el } from './dom.js';

// Clave: "p.n" (práctica.ejercicio). Valor: consigna en HTML/LaTeX.
export const EJERCICIOS = {
  // ---------- Práctica 1 (Supremos, Sucesiones) ----------
  '1.1': 'Probar que si $x < y + \\varepsilon$ para todo $\\varepsilon > 0$, entonces $x \\le y$. '
       + 'Deducir que si $|x - y| < \\varepsilon$ para todo $\\varepsilon > 0$, entonces $x = y$.',
  '1.2': 'Probar la densidad: (a) si $y - x > 1$ hay un entero entre $x$ e $y$; (b) entre dos reales '
       + 'hay un racional; (c) entre dos racionales hay un irracional; (d) entre dos reales hay un irracional.',
  '1.3': 'Sea $A \\subseteq \\mathbb{R}$ no vacío y acotado inferiormente. Probar la equivalencia: '
       + '$i = \\inf A \\iff$ ($i \\le a\\ \\forall a \\in A$) y ($\\forall \\varepsilon > 0\\ \\exists a \\in A: i \\le a < i + \\varepsilon$).',
  '1.4': 'Hallar, si existen, supremo, ínfimo, máximo y mínimo de: (a) $(a,b]$; '
       + '(b) $B = \\{\\tfrac{1}{2^n} : n \\in \\mathbb{N}\\}$; (c) $B \\cup \\{0\\}$; (d) $\\{x^2 - x - 1 : x \\in \\mathbb{R}\\}$; y probarlo.',
  '1.5': 'Sean $A \\subseteq B \\subseteq \\mathbb{R}$, $A \\ne \\varnothing$. Probar: (a) si $B$ está acotado '
       + 'superiormente, $A$ también y $\\sup A \\le \\sup B$; (b) análogo con ínfimos; (c) si $A$ no está acotado, $B$ tampoco.',
  '1.6': 'Dado $c \\in \\mathbb{R}$, sea $cA = \\{ca : a \\in A\\}$. Probar: (a) si $A$ está acotado sup., '
       + 'entonces $-A$ está acotado inf. e $\\inf(-A) = -\\sup A$; (b) si $c > 0$, $\\sup(cA) = c\\,\\sup A$.',
  '1.7': 'Probar, usando la definición de límite: (a) $\\lim \\tfrac{3-2n}{n+1} = -2$; '
       + '(b) $\\lim \\tfrac{\\sin n}{n} = 0$; (c) $\\lim \\tfrac{2n-3}{2n+4} = 1$.',
  '1.8': 'Sean $(x_n)$ y $(a_n)$ sucesiones reales. Probar que si $|x_n - \\ell| \\le a_n$ para todo $n$ y '
       + '$a_n \\to 0$, entonces $x_n \\to \\ell$ (criterio del sandwich).',
  '1.9': 'Si $x_n \\to \\ell_1$ e $y_n \\to \\ell_2$, probar que $x_n + y_n \\to \\ell_1 + \\ell_2$ en los casos: '
       + '(a) ambos finitos; (b) $\\ell_1$ finito, $\\ell_2 = \\infty$; (c) ambos $+\\infty$; (d) por qué falla si $+\\infty$ y $-\\infty$.',
  '1.10': 'Si $x_n \\to \\ell_1$, $y_n \\to \\ell_2$ y $x_n \\le y_n$ para todo $n$, probar que $\\ell_1 \\le \\ell_2$.',
  '1.11': 'Si $(x_n)$ converge a $0$ e $(y_n)$ está acotada, probar que $(x_n y_n)$ converge a $0$.',
  '1.12': 'Sea $(x_n)$ decreciente. Probar: (a) si está acotada inferiormente, converge y '
        + '$\\lim x_n = \\inf\\{x_n\\}$; (b) si no lo está, $x_n \\to -\\infty$.',
  '1.13': 'Sea $A$ acotado sup. y no vacío. Probar que si $A$ no tiene máximo, existe $(a_n) \\subseteq A$ '
        + 'estrictamente creciente con $a_n \\to \\sup A$.',
  '1.14': 'Sea $(x_n)$ no acotada superiormente. Probar que existe una subsucesión $(x_{n_k})$ que diverge a $+\\infty$.',
  '1.15': 'Probar que si toda subsucesión de $(x_n)$ tiene a su vez una subsubsucesión que converge a $\\ell$, '
        + 'entonces $(x_n)$ converge a $\\ell$.',
  '1.16': 'Probar: (a) si $(x_{2k})$ y $(x_{2k-1})$ convergen al mismo límite, $(x_n)$ converge; '
        + '(b) si $(x_{2k})$, $(x_{2k-1})$ y $(x_{3k})$ convergen, $(x_n)$ converge.',

  // ---------- Práctica 2 (Cardinalidad) ----------
  '2.1': 'Hallar el cardinal de: (a) $\\mathbb{Z}_{\\le -3}$; (b) $5\\mathbb{Z}$; (c) $\\mathbb{Z} \\times \\mathbb{N}$; (d) $(-1,1) \\cap \\mathbb{Q}$.',
  '2.2': 'Sean $A$ y $B$ conjuntos contables. Probar que $A \\cup B$ es contable.',
  '2.4': 'Hallar el cardinal del conjunto de los números irracionales.',
  '2.6': '(a) Sea $\\{A_n\\}_{n \\in \\mathbb{N}}$ familia de conjuntos contables. Probar que $\\bigcup_n A_n$ es contable. '
       + '(b) Con alfabeto finito, hay más reales que palabras (sucesiones finitas de símbolos).',
  '2.7': 'Sea $c = \\#\\mathbb{R}$. Probar: (a) si $\\#A = \\#B = c$, entonces $\\#(A \\cup B) = c$; '
       + '(b) si $\\#A_n = c\\ \\forall n$, entonces $\\#(\\bigcup_n A_n) = c$.',
  '2.8': 'Sea $A$ un conjunto. (a) Probar que $\\mathcal{P}(A) \\sim \\{0,1\\}^A$; (b) concluir que si $\\#A = n$, entonces $\\#\\mathcal{P}(A) = 2^n$.',
  '2.10': '(a) Probar que $[0,1) \\sim \\{0,1\\}^{\\mathbb{N}}$ (desarrollo binario). (b) Concluir que $\\#\\mathcal{P}(\\mathbb{N}) = c$.',
  '2.11': 'Probar que si $A$ es numerable, entonces $\\mathcal{P}_f(A) = \\{B \\subseteq A : B \\text{ finito}\\}$ es numerable.',
  '2.14': 'Calcular el cardinal de: (a) $\\mathcal{P}(\\mathbb{N}) \\times \\mathcal{P}(\\mathbb{N})$; (b) $[0,1) \\times [0,1)$; (c) $\\mathbb{R}^k$ para cada $k \\in \\mathbb{N}$.',
  '2.15': 'Calcular el cardinal de $\\mathbb{R}[X]$ (polinomios con coeficientes reales).',

  // ---------- Práctica 3 (Espacios métricos) ----------
  '3.1': 'Probar que son espacios métricos (dibujar una bola abierta): (a) $\\mathbb{R}$ con $|x-y|$; '
       + '(b) $\\mathbb{R}^n$ con $d_2$; (c) con $d_1$; (d) con $d_\\infty$; (e) $C([0,1])$ con $d_\\infty$; (f) la métrica discreta $\\delta$.',
  '3.2': 'Decidir cuáles son métricas en $\\mathbb{R}$: (a) $d(x,y) = (x-y)^2$; (b) $d(x,y) = \\sqrt{|x-y|}$; (c) $d(x,y) = |x^2 - y^2|$.',
  '3.3': 'Hallar interior y clausura de cada subconjunto de $\\mathbb{R}$, y decidir si es abierto o cerrado: '
       + '(a) $[0,1]$; (b) $(0,1)$; (c) $\\mathbb{Q}$; (d) $\\mathbb{Q} \\cap [0,1]$; (e) $\\mathbb{Z}$; (f) $[0,1) \\cup \\{2\\}$; '
       + '(g) $\\{\\tfrac1n\\}$; (h) $\\{\\tfrac1n\\} \\cup \\{0\\}$.',
  '3.4': 'Sea $(E,d)$, $x \\in E$, $r > 0$. Probar: (a) $\\{x\\}$ es cerrado; (b) $B(x,r)$ es abierto; '
       + '(c) $r > r\' \\Rightarrow \\overline{B(x,r\')} \\subseteq B(x,r)$; (d) $\\{y : d(x,y) \\le r\\}$ es cerrado; etc.',
  '3.5': 'Sea $A \\subseteq E$. Probar: (a) $E \\setminus A^\\circ = \\overline{E \\setminus A}$; '
       + '(b) $E \\setminus \\overline{A} = (E \\setminus A)^\\circ$. ¿Valen $\\overline{A} = \\overline{A^\\circ}$ y $A^\\circ = (\\overline{A})^\\circ$?',
  '3.6': 'Sean $A, B \\subseteq E$. Probar: (a) $(A \\cap B)^\\circ = A^\\circ \\cap B^\\circ$; '
       + '(b) $A^\\circ \\cup B^\\circ \\subseteq (A \\cup B)^\\circ$; (c) $\\overline{A \\cup B} = \\overline{A} \\cup \\overline{B}$; '
       + '(d) $\\overline{A \\cap B} \\subseteq \\overline{A} \\cap \\overline{B}$. Buscar contraejemplos para (b) y (d).',
  '3.8': 'Hallar frontera y puntos de acumulación de cada subconjunto del Ej. 3.',
  '3.9': 'Sea $A \\subseteq E$. Probar: (a) $\\partial A = \\overline{A} \\setminus A^\\circ$, y concluir que $\\partial A$ es cerrado; '
       + '(b) $\\partial A = \\overline{A} \\cap \\overline{E \\setminus A}$, y concluir $\\partial A = \\partial(E \\setminus A)$.',
  '3.10': 'Se define $d(x, A) = \\inf\\{d(x,a) : a \\in A\\}$. Probar: (a) $|d(x,A) - d(y,A)| \\le d(x,y)$; '
        + '(b) $x \\in A \\Rightarrow d(x,A) = 0$; (c) $d(x,A) = 0 \\iff x \\in \\overline{A}$; (d) $\\{d(x,A) < r\\}$ es abierto; (e) $\\{d(x,A) \\le r\\}$ es cerrado.',
  '3.12': 'En $\\mathbb{R}^n$: (a) probar que $d_\\infty \\le d_2 \\le d_1 \\le n\\,d_\\infty$; '
        + '(b) deducir $B_1(x,r) \\subseteq B_2(x,r) \\subseteq B_\\infty(x,r) \\subseteq B_1(x,nr)$.',
  '3.13': 'Sean $(x_n), (y_n)$ en $E$. Probar: (a) si $x_n \\to x$ e $y_n \\to y$, entonces $d(x_n,y_n) \\to d(x,y)$; '
        + '(b) si ambas son de Cauchy, $(d(x_n,y_n))$ converge.',
  '3.14': 'Probar que $(\\mathbb{R}^n, d_1)$, $(\\mathbb{R}^n, d_2)$ y $(\\mathbb{R}^n, d_\\infty)$ son completos.',
  '3.15': 'Sea $(E,d)$ completo y $A \\subseteq E$. Probar que si $A$ es cerrado, entonces $(A, d)$ es completo.',
  '3.16': 'Teorema de intersección de Cantor: en $E$ completo, si $(A_n)$ son cerrados, acotados, no vacíos, '
        + 'con $A_{n+1} \\subseteq A_n$ y $\\operatorname{diam}(A_n) \\to 0$, entonces $\\bigcap_n A_n$ es un único punto.',
};

/**
 * Devuelve la consigna de un ejercicio, o null si no está registrada.
 * @param {number|string} practica
 * @param {number|string} num
 */
export function consigna(practica, num) {
  return EJERCICIOS[`${practica}.${num}`] || null;
}

/**
 * Componente visual: cita de ejercicio con su consigna desplegable.
 * Muestra "Práctica P · Ej. N" como chip y, debajo, la consigna (togglable).
 * @param {number} practica
 * @param {number|number[]} nums  un ejercicio o varios (rango)
 * @param {object} [opts] { titulo }
 * @returns {HTMLElement}
 */
export function exRef(practica, nums, opts = {}) {
  const list = Array.isArray(nums) ? nums : [nums];
  // Etiqueta: rango "a–b" si es una secuencia contigua, si no lista "a, b, c".
  const contiguous = list.length > 1 && list.every((v, i) => i === 0 || v === list[i - 1] + 1);
  let label;
  if (list.length === 1) label = `Práctica ${practica} · Ej. ${list[0]}`;
  else if (contiguous) label = `Práctica ${practica} · Ej. ${list[0]}–${list[list.length - 1]}`;
  else label = `Práctica ${practica} · Ej. ${list.join(', ')}`;

  const btn = el('button', { class: 'exref-toggle', 'aria-expanded': 'false' }, [
    el('span', { class: 'exref-badge', text: '📋 ' + label }),
    el('span', { class: 'exref-caret', text: ' ▸' }),
  ]);

  const body = el('div', { class: 'exref-body' });
  list.forEach((n) => {
    const c = consigna(practica, n);
    if (!c) return;
    body.appendChild(el('div', { class: 'exref-item' }, [
      el('span', { class: 'exref-num', text: `Ej. ${n}. ` }),
      el('span', { html: c }),
    ]));
  });
  if (!body.children.length) {
    body.appendChild(el('div', { class: 'exref-item', text: 'Consigna no disponible.' }));
  }

  const wrap = el('div', { class: 'exref-wrap' }, [btn, body]);
  btn.addEventListener('click', () => {
    const open = wrap.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    wrap.querySelector('.exref-caret').textContent = open ? ' ▾' : ' ▸';
    if (open && window.MathJax?.typesetPromise) {
      requestAnimationFrame(() => window.MathJax.typesetPromise([body]).catch(() => {}));
    }
  });
  return wrap;
}
