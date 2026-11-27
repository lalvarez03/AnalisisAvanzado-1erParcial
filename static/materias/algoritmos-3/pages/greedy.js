// materias/algoritmos-3/pages/greedy.js — Algoritmos greedy y pruebas de correctitud (Práctica 7).

import { el, slider } from '../../../js/utils/dom.js';
import { pageHeader, callout, mountCanvas, readout } from '../../../js/utils/page.js';
import { COLORS } from '../../../js/constants.js';
import { labDeadlines } from './lab-deadlines.js';

const R = String.raw;
const ESTACIONES = [0, 40, 75, 110, 150, 190, 230, 270, 300, 340, 380, 420, 455, 500];

/** Greedy: desde la última carga, llegar a la estación más lejana alcanzable. Devuelve índices de paradas o null si es imposible. O(n). */
function rutaGreedy(xs, C, M) {
  let ult = 0; const paradas = [];
  while (M - xs[ult] > C) {
    let j = ult; while (j + 1 < xs.length && xs[j + 1] - xs[ult] <= C) j++;
    if (j === ult) return null;
    paradas.push(j); ult = j;
  }
  return paradas;
}

/** Óptimo por programación dinámica: min paradas para llegar a cada estación. O(n^2). */
function rutaOptima(xs, C, M) {
  const n = xs.length; const d = Array(n).fill(Infinity); d[0] = 0;
  for (let j = 1; j < n; j++) for (let i = 0; i < j; i++) if (xs[j] - xs[i] <= C && d[i] + 1 < d[j]) d[j] = d[i] + 1;
  let mejor = Infinity; for (let i = 0; i < n; i++) if (M - xs[i] <= C) mejor = Math.min(mejor, d[i]);
  return mejor;
}

export function renderGreedy(root) {
  root.appendChild(pageHeader('Greedy: ruta eficiente, demoras y deadlines',
    'Un algoritmo <em>greedy</em> (voraz) arma la solución tomando en cada paso la mejor decisión local, sin volver atrás. Es rapidísimo cuando funciona; '
    + 'el trabajo real está en <strong>demostrar que funciona</strong>, porque muchas estrategias que "parecen obvias" fallan.'));

  root.appendChild(callout('def', 'Esquema y dos formas de demostrar',
    R`Se define un criterio (ordenar por algo, elegir el máximo, avanzar lo más posible…) y se aplica repetidamente. Para probar que el resultado $G$ es óptimo:
    <ul><li><b>Argumento de intercambio:</b> tomo una solución óptima cualquiera $S$ y muestro que se la puede modificar, sin empeorarla, para que coincida con $G$ en un elemento más (el primer índice donde difieren). Repitiendo, $S$ se transforma en $G$ sin perder optimalidad.</li>
    <li><b>Greedy va adelante (<em>stays ahead</em>):</b> muestro por inducción que, después de cada paso, $G$ está al menos tan bien como cualquier otra solución.</li></ul>`));

  root.appendChild(callout('thm', 'Caramelos: elegir los k más sabrosos (Ej. 1)',
    R`Si $C$ tiene $n$ valores y se quiere $\max_{|S|=k}\sum_{s\in S}s$, el greedy "agarrar siempre el mayor entre los que quedan" es óptimo: da la suma de los $k$ mayores. Ordenando, $O(n\log n)$ (o $O(n\log k)$ con un heap de tamaño $k$).`,
    R`<p>Intercambio. Sea $S$ óptimo y $g$ el mayor elemento de $C$. Si $g\in S$, listo. Si no, tomo cualquier $s\in S$ y defino $S'=(S\setminus\{s\})\cup\{g\}$: tiene el mismo tamaño y suma $\sum S+g-s\ge\sum S$ pues $g\ge s$. Entonces existe un óptimo que contiene a $g$. Se aplica lo mismo al problema restante $(C\setminus\{g\},k-1)$ por inducción en $k$. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Ruta eficiente: parar lo más lejos posible (Ej. 2)',
    R`Estaciones en $0=x_1\le\dots\le x_n\le M$, autonomía $C$. El greedy "desde la última carga, ir hasta la estación más lejana que se alcance con el tanque lleno (y cargar ahí)" minimiza la cantidad de paradas. Con una pasada, $O(n)$.`,
    R`<p>Sea $G=(g_1<g_2<\dots<g_p)$ la solución del greedy y $S=(s_1<\dots<s_q)$ cualquier otra válida. Sea $i$ el primer índice donde difieren, y sea $a$ la parada anterior (común: $g_{i-1}=s_{i-1}$ o el origen). Como $g_i$ es la <em>más lejana</em> alcanzable desde $a$ y $s_i$ también lo es, $s_i\le g_i$.</p>
    <p>Reemplazo $s_i$ por $g_i$ en $S$ y obtengo $S'$. Sigue siendo válida: desde $a$ se llega a $g_i$ (por definición); y de $g_i$ a $s_{i+1}$: $s_{i+1}-g_i\le s_{i+1}-s_i\le C$ ya que $g_i\ge s_i$ y $s_{i+1}$ era alcanzable desde $s_i$ (si $g_i\ge s_{i+1}$ directamente se puede eliminar $s_{i+1}$, y $S'$ tiene incluso menos paradas). Entonces $|S'|\le|S|$ y coincide con $G$ en un índice más. Iterando, $|G|\le|S|$. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Demoras: atender primero lo más corto (Ej. 7)',
    R`Con tareas de duraciones $t_i>0$ que se resuelven una tras otra, la suma de las demoras (tiempos de finalización) $\sum_i\sum_{j\le i}t_{\pi(j)}$ se minimiza ordenando las tareas de <b>menor a mayor duración</b>.`,
    R`<p>La tarea que ocupa la posición $i$ aporta $t_{\pi(i)}$ a las demoras de las $n-i+1$ tareas desde ella en adelante: la suma total es $\sum_i(n-i+1)\,t_{\pi(i)}$. Si hay dos tareas consecutivas $\pi(i),\pi(i+1)$ con $t_{\pi(i)}>t_{\pi(i+1)}$, al intercambiarlas la suma cambia en $(n-i+1)t_{\pi(i+1)}+(n-i)t_{\pi(i)}-(n-i+1)t_{\pi(i)}-(n-i)t_{\pi(i+1)}=t_{\pi(i+1)}-t_{\pi(i)}<0$: mejora estrictamente. Entonces un orden óptimo no puede tener inversiones consecutivas, es decir, está ordenado. $\blacksquare$</p>`));

  root.appendChild(callout('thm', 'Deadlines: maximizar tareas a tiempo (Ej. 5)',
    R`Tareas de 1 unidad con deadlines $d_i$. Greedy: ordenar por $d_i$ creciente y, con $t$ tareas ya aceptadas, aceptar la próxima si $t+1\le d_i$. Es óptimo.`,
    R`<p>Un conjunto de tareas es <em>factible</em> si ordenado por deadline, la $k$-ésima cumple $d\ge k$ (cada una termina a tiempo). Sea $g_i$ la cantidad aceptada por el greedy entre las primeras $i$ tareas (ordenadas) y $o_i$ la de un óptimo $O$. Probamos $g_i\ge o_i$ por inducción. Si $O$ no acepta la tarea $i$, $o_i=o_{i-1}\le g_{i-1}\le g_i$. Si la acepta, por factibilidad $o_i\le d_i$. Si $g_{i-1}\ge o_i$ ya está; si no, $g_{i-1}=o_{i-1}=o_i-1$ y $g_{i-1}+1=o_i\le d_i$, así que el greedy también la acepta: $g_i=o_i$. En particular $g_n\ge o_n$. $\blacksquare$</p>`));

  root.appendChild(callout('warn', 'Greedy que NO funciona (hay que saberlos)',
    R`<ul><li><b>Suma de subconjuntos con "el más grande que entre"</b> (Ej. 3): $S=\{6,4,3\}$, $t=7$: el greedy toma $6$ y no puede completar $1$, pero $\{4,3\}$ suma $7$.</li>
    <li><b>Vertex cover sacando siempre el de mayor grado</b> (Ej. 4) no es óptimo en general.</li>
    <li>La prueba de que un greedy funciona <em>nunca</em> es "probé con varios ejemplos": es un argumento general (intercambio o inducción).</li></ul>`));

  // Viz 1: ruta eficiente
  root.appendChild(el('h2', { text: 'Laboratorio: ruta eficiente (Ej. 2)' }));
  root.appendChild(el('p', { class: 'page-sub', text: 'Se asume que se sale del km 0 con el tanque lleno (la carga inicial no se cuenta). Las estaciones están fijas; movés la autonomía C y la longitud M del viaje.' }));
  const sC = slider({ label: 'autonomía C (km)', min: 60, max: 260, step: 5, value: 120, format: (v) => v });
  const sM = slider({ label: 'distancia M (km)', min: 300, max: 500, step: 10, value: 500, format: (v) => v });
  root.appendChild(el('div', { class: 'controls' }, [sC.wrap, sM.wrap]));
  const out = readout('');
  const viz = mountCanvas(root, { height: 170, view: {}, hint: 'puntos = estaciones · verde = paradas del greedy' });
  viz.setDraw(() => {
    const p = viz.plane; p.clear(); const C = Number(sC.input.value); const M = Number(sM.input.value); const xs = ESTACIONES.filter((x) => x <= M);
    const W = p.width; const X = (x) => 30 + (W - 60) * (x / M); const y = p.height / 2; const ctx = p.ctx;
    const par = rutaGreedy(xs, C, M); const opt = rutaOptima(xs, C, M);
    ctx.strokeStyle = COLORS.textDim; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(0), y); ctx.lineTo(X(M), y); ctx.stroke();
    if (par) { let ult = 0; [...par, null].forEach((j) => { const x0 = X(xs[ult]); const x1 = X(j === null ? M : xs[j]); ctx.strokeStyle = COLORS.ok; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc((x0 + x1) / 2, y, (x1 - x0) / 2, Math.PI, 0); ctx.stroke(); if (j !== null) ult = j; }); }
    xs.forEach((x, i) => { const esP = par && par.includes(i); ctx.beginPath(); ctx.arc(X(x), y, esP ? 8 : 5, 0, Math.PI * 2); ctx.fillStyle = esP ? COLORS.ok : COLORS.accent; ctx.fill(); ctx.fillStyle = COLORS.textDim; ctx.font = '10px Inter'; ctx.textAlign = 'center'; ctx.fillText(String(x), X(x), y + 24); });
    ctx.beginPath(); ctx.arc(X(M), y, 7, 0, Math.PI * 2); ctx.fillStyle = COLORS.warn; ctx.fill(); ctx.fillText('M', X(M), y - 14);
    out.textContent = par === null ? `Con C = ${C} km no se puede completar el viaje: hay un tramo entre estaciones (o hasta M) más largo que la autonomía.`
      : `greedy: ${par.length} paradas en los km [${par.map((j) => xs[j]).join(', ')}] · óptimo por programación dinámica: ${opt} paradas · ${par.length === opt ? '✓ coinciden' : '✗ difieren'}\nparar en TODAS las estaciones intermedias haría ${xs.length - 1} paradas.`;
  });
  [sC, sM].forEach((s) => s.input.addEventListener('input', () => viz.redraw()));
  root.appendChild(out);

  // Viz 2: demoras
  root.appendChild(el('h2', { text: 'Laboratorio: suma de demoras' }));
  const T = [5, 2, 8, 1, 3]; const out2 = readout('');
  const susma = (ord) => { let t = 0; let s = 0; ord.forEach((x) => { t += x; s += t; }); return s; };
  const mezcla = slider({ label: 'cantidad de intercambios de inversiones', min: 0, max: 10, step: 1, value: 0, format: (v) => v });
  root.appendChild(el('div', { class: 'controls' }, [mezcla.wrap]));
  const calc = () => {
    let ord = T.slice(); let k = Number(mezcla.input.value);
    // Bubble sort parcial: cada intercambio de dos consecutivos en orden decreciente mejora la suma estrictamente.
    const pasos = [susma(ord)];
    while (k-- > 0) { let hecho = false; for (let i = 0; i + 1 < ord.length && !hecho; i++) if (ord[i] > ord[i + 1]) { [ord[i], ord[i + 1]] = [ord[i + 1], ord[i]]; hecho = true; } if (!hecho) break; pasos.push(susma(ord)); }
    out2.textContent = `tareas originales: [${T.join(', ')}]  → suma de demoras = ${susma(T)}\n` + `tras ${pasos.length - 1} intercambios de pares consecutivos mal ordenados: [${ord.join(', ')}] → ${pasos[pasos.length - 1]}\n`
      + `evolución: ${pasos.join(' → ')}   (decrece estrictamente hasta el orden creciente, que es el óptimo)`;
  };
  mezcla.input.addEventListener('input', calc); root.appendChild(out2); calc();

  // Viz 3: deadlines (planificación de tareas de una unidad)
  labDeadlines(root);
}
