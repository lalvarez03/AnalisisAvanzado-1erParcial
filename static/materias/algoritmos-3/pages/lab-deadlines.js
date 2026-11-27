// materias/algoritmos-3/pages/lab-deadlines.js — laboratorio paso a paso: planificar tareas con deadlines (Práctica 7, Ej. 5).
//
// Idea: tareas de 1 unidad con una hora límite (deadline). Greedy: ordenar por deadline y aceptar cada tarea si todavía llega.
// El laboratorio avanza UNA tarea por vez y dice en palabras qué decide el algoritmo y por qué.
// Costo del algoritmo: O(n log n) por el ordenamiento; el recorrido es O(n).

import { el } from '../../../js/utils/dom.js';

const PRESETS = [
  { nombre: 'Ejemplo básico', d: [2, 1, 3, 2, 5, 4, 4, 1] },
  { nombre: 'Todas vencen en 2', d: [2, 2, 2, 2] },
  { nombre: 'El orden de llegada pierde', d: [3, 3, 1, 1] },
  { nombre: 'Sobra tiempo', d: [6, 5, 7, 8] },
];

/** Índices de las tareas ordenadas por deadline creciente (estable). O(n log n). */
const ordenar = (D) => D.map((_, i) => i).sort((a, b) => D[a] - D[b] || a - b);

/** Simula el greedy sobre las primeras `k` tareas ordenadas. O(n). */
function simular(D, ord, k) {
  const acept = []; const rech = [];
  for (let s = 0; s < k; s++) { const i = ord[s]; if (acept.length + 1 <= D[i]) acept.push(i); else rech.push(i); }
  return { acept, rech };
}

/** Ingenuo: acepta en el orden en que llegan si todavía llega a tiempo. O(n). */
function ingenuo(D) {
  let t = 0; const hechas = [];
  D.forEach((d, i) => { if (t + 1 <= d) { t++; hechas.push(i); } });
  return hechas;
}

const nombre = (i) => 't' + (i + 1);

export function labDeadlines(root) {
  root.appendChild(el('h2', { text: 'Laboratorio: planificar tareas con deadlines (Ej. 5)' }));
  root.appendChild(el('p', { class: 'page-sub', html:
    '<strong>La situación.</strong> Tenés varias tareas. Cada una te lleva <strong>exactamente 1 unidad de tiempo</strong> y tiene un <strong>deadline</strong> '
    + '<em>d</em>: la tarea cuenta solo si termina en la unidad <em>d</em> o antes. Hacés una tarea por vez. '
    + '<strong>Objetivo:</strong> completar a tiempo la mayor cantidad posible.' }));
  root.appendChild(el('ol', { class: 'dl-pasos' }, [
    el('li', { html: '<strong>Ordená</strong> las tareas por deadline, de menor a mayor.' }),
    el('li', { html: '<strong>Recorrelas</strong> en ese orden, de a una. Llevás la cuenta <em>t</em> de las que ya aceptaste.' }),
    el('li', { html: 'Para la tarea actual, con deadline <em>d</em>: si <strong>t + 1 ≤ d</strong> todavía llega, así que la <strong>aceptás</strong> (ocupa la casilla t + 1). Si no, la <strong>descartás</strong>.' }),
  ]));

  const lab = el('div', { class: 'dl-lab' });
  root.appendChild(lab);

  // Entradas
  const inp = el('input', { type: 'text', 'aria-label': 'Deadlines separados por comas', style: 'width:100%;padding:8px;border-radius:8px;border:1px solid var(--border);background:var(--bg-soft);color:var(--text);font:inherit;' });
  const presets = el('div', { class: 'dl-presets', role: 'group', 'aria-label': 'Ejemplos' });
  const nota = el('div', { class: 'aj-nota' });
  lab.appendChild(el('label', { text: 'Deadlines de las tareas t1, t2, … (enteros ≥ 1, separados por comas):' }));
  lab.appendChild(inp);
  lab.appendChild(presets);
  lab.appendChild(nota);

  // Zona de dibujo
  const filaCola = el('div', { class: 'dl-fila', text: '1 · Tareas ordenadas por deadline (se recorren de izquierda a derecha)' });
  const cola = el('div', { class: 'dl-cola', 'aria-live': 'off' });
  const filaCal = el('div', { class: 'dl-fila', text: '2 · Calendario: cada casilla es 1 unidad de tiempo' });
  const casillas = el('div', { class: 'dl-casillas' });
  const filaRech = el('div', { class: 'dl-fila', text: '3 · Descartadas (no llegan a su deadline)' });
  const rechazadas = el('div', { class: 'dl-cola' });
  const dijo = el('div', { class: 'dl-dijo', role: 'status', 'aria-live': 'polite' });
  const cmp = el('div', { class: 'dl-cmp' });

  const bPrev = el('button', { class: 'btn ghost', type: 'button' }, '◀ Paso anterior');
  const bNext = el('button', { class: 'btn', type: 'button' }, 'Paso siguiente ▶');
  const bFin = el('button', { class: 'btn ghost', type: 'button' }, 'Ir al final');
  const bReset = el('button', { class: 'btn ghost', type: 'button' }, '↺ Reiniciar');
  lab.appendChild(el('div', { class: 'controls' }, [bPrev, bNext, bFin, bReset]));
  [dijo, filaCola, cola, filaCal, casillas, filaRech, rechazadas, cmp].forEach((n) => lab.appendChild(n));

  let D = []; let ord = []; let paso = 0;

  const leer = () => inp.value.split(/[ ,;]+/).map(Number).filter((x) => Number.isInteger(x) && x >= 1).slice(0, 12);

  function dibujar() {
    const n = D.length;
    cola.textContent = ''; casillas.textContent = ''; rechazadas.textContent = ''; cmp.textContent = '';
    if (!n) { dijo.className = 'dl-dijo'; dijo.textContent = 'Escribí al menos un deadline (por ejemplo: 2, 1, 3).'; bPrev.disabled = bNext.disabled = bFin.disabled = true; return; }
    const { acept, rech } = simular(D, ord, paso);
    const actual = paso > 0 ? ord[paso - 1] : null;

    ord.forEach((i, s) => {
      cola.appendChild(el('div', { class: 'dl-tarea' + (s < paso ? ' hecha' : '') + (s === paso - 1 ? ' actual' : '') }, [
        nombre(i), el('small', { text: 'd = ' + D[i] }),
      ]));
    });

    const T = Math.min(n, Math.max(...D));
    for (let k = 0; k < T; k++) {
      const i = acept[k];
      casillas.appendChild(el('div', { class: 'dl-casilla' + (i !== undefined ? ' llena' : '') + (i !== undefined && i === actual ? ' nueva' : '') }, [
        el('b', { text: 'unidad ' + (k + 1) }), i !== undefined ? nombre(i) : '—',
      ]));
    }
    rech.forEach((i) => rechazadas.appendChild(el('div', { class: 'dl-rech', text: `${nombre(i)} (d = ${D[i]})` })));
    if (!rech.length) rechazadas.appendChild(el('span', { class: 'aj-nota', text: 'Todavía ninguna.' }));

    // Qué decidió el algoritmo en este paso
    if (paso === 0) {
      dijo.className = 'dl-dijo';
      dijo.textContent = `Punto de partida: ${n} tareas ya ordenadas por deadline y ninguna aceptada (t = 0). Tocá «Paso siguiente» para mirar la primera.`;
    } else {
      const t = acept.length - (acept.includes(actual) ? 1 : 0);
      const d = D[actual];
      const ok = t + 1 <= d;
      dijo.className = 'dl-dijo ' + (ok ? 'ok' : 'no');
      dijo.textContent = `Miramos ${nombre(actual)} (deadline ${d}). Ya hay t = ${t} aceptada${t === 1 ? '' : 's'}, así que si la hacemos termina en la unidad ${t + 1}. `
        + `¿${t + 1} ≤ ${d}? ${ok ? `Sí → la aceptamos y ocupa la casilla ${t + 1}.` : `No → llegaría tarde, la descartamos.`}`;
    }

    if (paso === n) {
      const ing = ingenuo(D);
      const dif = acept.length - ing.length;
      cmp.innerHTML = `<strong>Resultado:</strong> ${acept.length} de ${n} tareas a tiempo (${acept.map(nombre).join(', ') || 'ninguna'}). `
        + `Para comparar: aceptando en el <em>orden de llegada</em> (${D.map((_, i) => nombre(i)).join(', ')}) saldrían ${ing.length}`
        + `${dif > 0 ? `, o sea ${dif} menos: por eso conviene ordenar por deadline.` : ' (acá empatan: probá el ejemplo «El orden de llegada pierde»).'}`;
    }
    bPrev.disabled = paso === 0; bNext.disabled = paso === n; bFin.disabled = paso === n;
  }

  function cargar(arr, conservarPaso = false) {
    D = arr; ord = ordenar(D);
    paso = conservarPaso ? Math.min(paso, D.length) : 0;
    nota.textContent = D.length ? `Tareas: ${D.map((d, i) => `${nombre(i)} (d = ${d})`).join(' · ')}` : '';
    dibujar();
  }

  PRESETS.forEach((p) => {
    const b = el('button', { class: 'btn ghost', type: 'button', title: p.d.join(', ') }, p.nombre);
    b.addEventListener('click', () => { inp.value = p.d.join(', '); cargar(p.d.slice()); });
    presets.appendChild(b);
  });
  inp.addEventListener('input', () => cargar(leer()));
  bNext.addEventListener('click', () => { if (paso < D.length) { paso++; dibujar(); } });
  bPrev.addEventListener('click', () => { if (paso > 0) { paso--; dibujar(); } });
  bFin.addEventListener('click', () => { paso = D.length; dibujar(); });
  bReset.addEventListener('click', () => { paso = 0; dibujar(); });

  inp.value = PRESETS[0].d.join(', ');
  cargar(PRESETS[0].d.slice());

  root.appendChild(el('div', { class: 'callout tip' }, [
    el('div', { class: 'tag', text: 'Qué mirar' }),
    el('div', { html:
      '<ul><li>Con <strong>«Todas vencen en 2»</strong> solo entran 2 tareas sin importar el orden: hay 2 unidades de tiempo antes del deadline.</li>'
      + '<li>Con <strong>«El orden de llegada pierde»</strong> (3, 3, 1, 1): en orden de llegada se aceptan las dos de deadline 3 y las de deadline 1 ya no llegan (2 tareas). Ordenando por deadline entran 3.</li>'
      + '<li>Idea de la prueba: una vez ordenadas, la tarea aceptada número <em>k</em> termina en la unidad <em>k</em>, así que solo hace falta chequear <em>k ≤ d</em>.</li></ul>' }),
  ]));
}
