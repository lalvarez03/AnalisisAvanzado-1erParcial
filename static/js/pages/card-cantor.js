// pages/card-cantor.js — Argumento diagonal de Cantor: ℝ no es numerable.

import { el } from '../utils/dom.js';
import { pageHeader, callout, readout } from '../utils/page.js';
import { COLORS } from '../constants.js';

export function renderCantor(root) {
  root.appendChild(pageHeader(
    'Cantor: los reales no son numerables',
    'El <strong>argumento diagonal</strong>. Suponé que pudiste listar todos los reales de $[0,1)$. '
    + 'Cantor construye uno que no está en tu lista. Contradicción: la lista era imposible.'
  ));

  root.appendChild(callout('thm', 'Teorema (Cantor)',
    '$[0,1)$ no es numerable. En consecuencia $\\mathbb{R}$ tampoco lo es. Su cardinal se nota $c$ '
    + '(el “continuo”) y cumple $\\aleph_0 < c$.',
    // demostración diagonal formal
    '<p><span class="proof-step">Diagonal.</span> Por el absurdo, supongamos que $[0,1)$ es numerable, '
    + 'es decir que existe una enumeración $x_1, x_2, x_3, \\dots$ de todos sus elementos. Escribimos cada '
    + 'uno en desarrollo decimal: $x_k = 0.d_{k1} d_{k2} d_{k3}\\dots$</p>'
    + '<p>Definimos un número $y = 0.e_1 e_2 e_3 \\dots$ eligiendo el dígito $k$-ésimo distinto del de la '
    + 'diagonal: $e_k = 5$ si $d_{kk} \\ne 5$, y $e_k = 4$ si $d_{kk} = 5$ (así evitamos el $9$ y el $0$, '
    + 'que darían desarrollos ambiguos).</p>'
    + '<p>Entonces $y \\in [0,1)$, pero $y \\ne x_k$ para todo $k$, porque difieren en la posición $k$. '
    + 'Así $y$ no está en la enumeración, contradiciendo que fuera completa.</p>'
    + '<p>Luego no existe tal enumeración: $[0,1)$ no es numerable. $\\blacksquare$</p>'
  ));

  root.appendChild(callout('def', 'Idea de la demostración',
    'Supongamos una enumeración $x_1, x_2, x_3, \\dots$ de todos los números de $[0,1)$, escritos en decimal. '
    + 'Definimos $y$ cambiando el $k$-ésimo dígito de $x_k$: si es $5$ lo ponemos $4$, si no, lo ponemos $5$. '
    + 'Entonces $y$ difiere de <em>cada</em> $x_k$ en la posición $k$, así que $y$ no está en la lista. Absurdo.'
  ));

  root.appendChild(el('h2', { text: 'Construí el número diagonal' }));
  root.appendChild(el('p', { html:
    'Abajo hay una “lista” de reales generada al azar. La diagonal está resaltada; el número $y$ se forma '
    + 'con la regla anti-diagonal. Verificá que $y$ no coincide con ninguna fila.' }));

  const controls = el('div', { class: 'controls' });
  const regen = el('button', { class: 'btn' }, '🎲 Nueva lista');
  const step = el('button', { class: 'btn ghost' }, '▶ Revelar dígito de y');
  const reset = el('button', { class: 'btn ghost' }, '↺ Reiniciar y');
  controls.appendChild(regen); controls.appendChild(step); controls.appendChild(reset);
  root.appendChild(controls);

  const tableWrap = el('div', { style: 'overflow-x:auto;' });
  root.appendChild(tableWrap);

  const yOut = readout('y = 0. _ _ _ _ _ _ _ _   (revelá dígitos)');
  root.appendChild(yOut);

  const cmp = el('div', { style: 'margin:10px 0;' });
  root.appendChild(cmp);

  const SIZE = 8;
  let rows = [];
  let revealed = 0;

  function antiDigit(d) { return d === 5 ? 4 : 5; }

  function genRows() {
    rows = [];
    for (let i = 0; i < SIZE; i++) {
      const digits = [];
      for (let j = 0; j < SIZE; j++) digits.push(Math.floor(Math.random() * 10));
      rows.push(digits);
    }
    revealed = 0;
    build();
  }

  function yDigits() {
    return rows.map((r, k) => antiDigit(r[k]));
  }

  function build() {
    const y = yDigits();
    const table = el('table', { class: 'tbl' });
    const head = el('tr', {});
    head.appendChild(el('th', { text: '' }));
    for (let j = 0; j < SIZE; j++) head.appendChild(el('th', { text: 'd' + (j + 1) }));
    table.appendChild(head);

    rows.forEach((r, i) => {
      const tr = el('tr', {});
      tr.appendChild(el('td', { html: `x<sub>${i + 1}</sub> = 0.` }));
      r.forEach((d, j) => {
        const isDiag = i === j;
        const td = el('td', {
          text: String(d),
          style: isDiag
            ? `font-weight:700;color:#1a1130;background:${COLORS.warn};text-align:center;`
            : 'text-align:center;',
        });
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });

    // fila y
    const yr = el('tr', { style: 'border-top:2px solid var(--accent);' });
    yr.appendChild(el('td', { html: '<strong>y = 0.</strong>', style: 'color:var(--pink);' }));
    for (let j = 0; j < SIZE; j++) {
      const shown = j < revealed;
      yr.appendChild(el('td', {
        text: shown ? String(y[j]) : '·',
        style: `text-align:center;font-weight:700;color:${shown ? '#1a1130' : 'var(--text-dim)'};`
          + (shown ? `background:${COLORS.pink};` : ''),
      }));
    }
    table.appendChild(yr);

    tableWrap.innerHTML = '';
    tableWrap.appendChild(table);

    const yStr = y.map((d, j) => (j < revealed ? d : '_')).join(' ');
    yOut.textContent = 'y = 0. ' + yStr + (revealed === SIZE ? '   ← ¡difiere de cada xₖ en la posición k!' : '');

    // comparación de la última fila revelada
    if (revealed > 0 && revealed <= SIZE) {
      const k = revealed - 1;
      cmp.innerHTML = `<span class="chip">Regla: dígito k=${k + 1} de x<sub>${k + 1}</sub> es `
        + `<strong>${rows[k][k]}</strong> → y usa <strong>${y[k]}</strong></span> `
        + `<span class="chip ok">y ≠ x<sub>${k + 1}</sub> ✓</span>`;
    } else { cmp.innerHTML = ''; }
    if (window.MathJax?.typesetPromise) window.MathJax.typesetPromise([cmp]);
  }

  regen.addEventListener('click', genRows);
  step.addEventListener('click', () => { if (revealed < SIZE) { revealed++; build(); } });
  reset.addEventListener('click', () => { revealed = 0; build(); });

  genRows();

  root.appendChild(callout('warn', 'Un detalle honesto',
    'El desarrollo decimal no es único (p. ej. $0.4999\\ldots = 0.5$). Por eso la regla evita el $9$ y el $0$: '
    + 'usando solo $4$ y $5$, el $y$ construido tiene desarrollo único y realmente no está en la lista. '
    + 'La Práctica 2 lo formaliza con desarrollos binarios y $[0,1) \\sim \\{0,1\\}^{\\mathbb{N}}$.'
  ));

  root.appendChild(callout('tip', 'Consecuencias',
    'Como $\\mathbb{Q}$ es numerable y $\\mathbb{R}$ no, los <strong>irracionales</strong> son no numerables '
    + '(si fueran contables, $\\mathbb{R} = \\mathbb{Q} \\cup \\text{Irr}$ sería contable). '
    + 'También: “hay más reales que nombres finitos”, porque las palabras sobre un alfabeto finito son numerables.'
  ));
}
