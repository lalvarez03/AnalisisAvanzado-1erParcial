// core/estructura.js — ordena una hoja de teoría en "partes" plegables para que no abrume.
//
// Una hoja (h1 + bloques + varios <h2>) se reorganiza así:
//   · cabecera: título y bajada, siempre visibles;
//   · una barra con el índice de partes y "Abrir todas / Cerrar todas";
//   · 📖 Teoría (todo lo que viene antes del primer <h2>), abierta al entrar;
//   · una parte plegable por cada <h2> (🔬 laboratorios y visualizaciones, 📌 el resto), cerradas al entrar.
// El contenido no se modifica: solo se envuelve. Los canvas se redibujan al abrir (ResizeObserver).
// Se activa por materia con `estructura: 'secciones'` en el manifiesto.

import { el } from '../utils/dom.js';

const ES_LAB = /^(laboratorio|visualizaci[oó]n|simulador|experimento|explor)/i;

function tipoDe(titulo) {
  if (ES_LAB.test(titulo)) return { clase: 'lab', ic: '🔬', rotulo: 'Laboratorio' };
  return { clase: 'tema', ic: '📌', rotulo: 'Parte' };
}

/** Una frase corta para el resumen de la parte (la bajada de su laboratorio), si no lleva fórmulas. */
function pista(nodos) {
  const p = nodos.find((n) => n.classList?.contains('page-sub'));
  const t = (p?.textContent || '').replace(/\s+/g, ' ').trim();
  if (!t || /[$\\]/.test(t)) return '';
  const corte = t.search(/[.:] /);
  const frase = corte > 20 ? t.slice(0, corte + 1) : t;
  return frase.length > 110 ? frase.slice(0, 107).trimEnd() + '…' : frase;
}

function parte({ clase, ic, rotulo, titulo, pistaTxt, nodos, abierta, numero }) {
  const h = el('h2', { class: 'hs-tit', text: titulo });
  const resumen = el('summary', { class: 'hs-resumen' }, [
    el('span', { class: 'hs-num', text: String(numero), 'aria-hidden': 'true' }),
    el('span', { class: 'hs-ic', text: ic, 'aria-hidden': 'true' }),
    el('span', { class: 'hs-textos' }, [
      el('span', { class: 'hs-rotulo', text: rotulo }),
      h,
      pistaTxt ? el('span', { class: 'hs-pista', text: pistaTxt }) : null,
    ]),
    el('span', { class: 'hs-flecha', 'aria-hidden': 'true' }),
  ]);
  const comoUsar = clase === 'lab'
    ? el('p', { class: 'hs-como', html: '<strong>Cómo usarlo:</strong> tocá los controles (botones, deslizadores o el propio gráfico) y mirá cómo cambia el dibujo. El texto que lo acompaña dice, en palabras, qué está pasando.' })
    : null;
  const cuerpo = el('div', { class: 'hs-cuerpo' }, [comoUsar, ...nodos].filter(Boolean));
  const d = el('details', { class: 'hoja-sec hs-' + clase }, [resumen, cuerpo]);
  if (abierta) d.open = true;
  return d;
}

/** @param {HTMLElement} root contenedor de la página ya renderizada */
export function estructurarHoja(root) {
  const hijos = [...root.children];
  const h1 = hijos.findIndex((n) => n.tagName === 'H1');
  if (h1 < 0) return;
  let i = h1 + 1;
  while (hijos[i] && hijos[i].classList.contains('page-sub')) i++;
  const resto = hijos.slice(i);
  const marcas = resto.map((n, k) => (n.tagName === 'H2' ? k : -1)).filter((k) => k >= 0);
  if (!marcas.length) return;

  const intro = resto.slice(0, marcas[0]);
  const partes = [];
  if (intro.length) partes.push({ clase: 'teo', ic: '📖', rotulo: 'Teoría', titulo: 'Ideas y resultados', pistaTxt: 'Definiciones, teoremas y errores comunes', nodos: intro, abierta: true });
  marcas.forEach((m, k) => {
    const fin = marcas[k + 1] ?? resto.length;
    const titulo = resto[m].textContent.trim();
    const nodos = resto.slice(m + 1, fin);
    partes.push({ ...tipoDe(titulo), titulo, pistaTxt: pista(nodos), nodos, abierta: false });
  });
  if (partes.length < 2) return;
  if (!partes.some((p) => p.abierta)) partes[0].abierta = true;

  const detalles = partes.map((p, k) => parte({ ...p, numero: k + 1 }));
  const abrir = (v) => detalles.forEach((d) => { d.open = v; });
  const barra = el('div', { class: 'hoja-barra' }, [
    el('span', { class: 'hoja-barra-txt', html: `Esta hoja tiene <strong>${partes.length} partes</strong>. Abrí una por vez, en orden.` }),
    el('span', { class: 'hoja-barra-acc' }, [
      el('button', { class: 'btn ghost', type: 'button', onClick: () => abrir(true) }, 'Abrir todas'),
      el('button', { class: 'btn ghost', type: 'button', onClick: () => abrir(false) }, 'Cerrar todas'),
    ]),
  ]);

  // El contenido ya se movió dentro de cada parte al construirla; solo quedan los <h2> originales (su texto vive en el resumen).
  marcas.forEach((m) => resto[m].remove());
  root.appendChild(barra);
  detalles.forEach((d) => root.appendChild(d));
}
