// utils/glosario.js — subrayado de términos y popup con su definición formal.
//
// La materia aporta un diccionario (manifiesto.glosario):
//   { [id]: { nombre, alias: ['regex', ...], def: 'HTML + LaTeX' } }
// `alias` son fragmentos de expresión regular (sin grupos de captura) que se buscan sin distinguir
// mayúsculas ni acentos de capitalización. `marcarTerminos(raíz)` envuelve en <span class="term"> la
// PRIMERA aparición de cada término dentro de `raíz` (fuera de las fórmulas $...$), y al hacer clic
// en un término se abre un popup con su definición formal.

import { typeset } from './dom.js';

// Una fórmula LaTeX: $$..$$, $..$, \(..\) o \[..\]. Con el grupo de captura, split() la conserva en índices impares.
const MATH = /(\$\$[\s\S]+?\$\$|\$[^$]+?\$|\\\([\s\S]+?\\\)|\\\[[\s\S]+?\\\])/;
const SALTAR = '.term, mjx-container, script, style, code, button, summary, .glos-pop';

let glosario = {};
let regex = null;       // regex global con todos los alias (más largos primero)
let matchers = [];      // [{ id, re }] para saber a qué término corresponde cada coincidencia

/** Registra el diccionario de la materia activa y compila las expresiones. */
export function configurarGlosario(dic) {
  glosario = dic || {};
  const alias = [];
  matchers = [];
  for (const [id, t] of Object.entries(glosario)) {
    const lista = t.alias && t.alias.length ? t.alias : [];
    lista.forEach((a) => alias.push(a));
    if (lista.length) matchers.push({ id, re: new RegExp('^(?:' + lista.join('|') + ')$', 'iu') });
  }
  alias.sort((a, b) => b.length - a.length);
  regex = alias.length
    ? new RegExp('(?<![\\p{L}\\p{N}])(?:' + alias.join('|') + ')(?![\\p{L}\\p{N}])', 'giu')
    : null;
}

function idDe(texto) {
  const m = matchers.find((x) => x.re.test(texto));
  return m ? m.id : null;
}

/**
 * Subraya la primera aparición de cada término del glosario dentro de `raiz`.
 * Complejidad: O(L · k) con L = longitud del texto y k = nº de términos (k ≈ 100, constante).
 */
export function marcarTerminos(raiz) {
  if (!regex || !raiz) return;
  const vistos = new Set();
  const walker = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement && !n.parentElement.closest(SALTAR) && n.nodeValue.trim()
      ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
  });
  const nodos = [];
  while (walker.nextNode()) nodos.push(walker.currentNode);

  nodos.forEach((nodo) => {
    const trozos = nodo.nodeValue.split(MATH);
    const frag = document.createDocumentFragment();
    let cambio = false;
    trozos.forEach((trozo, i) => {
      if (i % 2 === 1) { frag.appendChild(document.createTextNode(trozo)); return; }   // fórmula: intacta
      let ultimo = 0;
      regex.lastIndex = 0;
      let m;
      while ((m = regex.exec(trozo)) !== null) {
        const id = idDe(m[0]);
        if (!id || vistos.has(id)) continue;
        vistos.add(id);
        cambio = true;
        if (m.index > ultimo) frag.appendChild(document.createTextNode(trozo.slice(ultimo, m.index)));
        const s = document.createElement('span');
        s.className = 'term';
        s.dataset.term = id;
        s.tabIndex = 0;
        s.setAttribute('role', 'button');
        s.title = 'Ver definición formal: ' + glosario[id].nombre;
        s.textContent = m[0];
        frag.appendChild(s);
        ultimo = m.index + m[0].length;
      }
      if (ultimo < trozo.length) frag.appendChild(document.createTextNode(trozo.slice(ultimo)));
    });
    if (cambio) nodo.parentNode.replaceChild(frag, nodo);
  });
}

// ---------------------------------------------------------------------------
// Popup
// ---------------------------------------------------------------------------

let pop = null;
let actual = null;      // span que abrió el popup

function cerrar() {
  if (pop) pop.hidden = true;
  actual = null;
}

function posicionar() {
  if (!pop || !actual || pop.hidden) return;
  const r = actual.getBoundingClientRect();
  const w = pop.offsetWidth;
  const h = pop.offsetHeight;
  const margen = 10;
  let left = Math.min(Math.max(margen, r.left), window.innerWidth - w - margen);
  let top = r.bottom + 8;
  if (top + h > window.innerHeight - margen) top = Math.max(margen, r.top - h - 8);   // si no entra abajo, va arriba
  pop.style.left = left + 'px';
  pop.style.top = top + 'px';
}

function abrir(span) {
  const t = glosario[span.dataset.term];
  if (!t) return;
  if (!pop) {
    pop = document.createElement('div');
    pop.className = 'glos-pop';
    pop.setAttribute('role', 'dialog');
    document.body.appendChild(pop);
  }
  actual = span;
  pop.innerHTML = '';
  const cab = document.createElement('div');
  cab.className = 'glos-pop-head';
  const nombre = document.createElement('strong');
  nombre.textContent = t.nombre;
  const x = document.createElement('button');
  x.type = 'button';
  x.className = 'glos-pop-x';
  x.setAttribute('aria-label', 'Cerrar');
  x.textContent = '✕';
  x.addEventListener('click', cerrar);
  cab.append(nombre, x);
  const cuerpo = document.createElement('div');
  cuerpo.className = 'glos-pop-body';
  cuerpo.innerHTML = t.def;
  pop.append(cab, cuerpo);
  pop.setAttribute('aria-label', 'Definición: ' + t.nombre);
  pop.hidden = false;
  posicionar();
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise([pop]).then(posicionar).catch(() => {});
  } else {
    typeset(pop);
  }
}

let iniciado = false;
/** Instala (una sola vez) los listeners globales del popup. */
export function iniciarGlosario() {
  if (iniciado) return;
  iniciado = true;
  document.addEventListener('click', (e) => {
    const span = e.target.closest && e.target.closest('.term');
    if (span) {
      e.preventDefault();
      if (actual === span && pop && !pop.hidden) cerrar(); else abrir(span);
      return;
    }
    if (pop && !pop.hidden && !e.target.closest('.glos-pop')) cerrar();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { cerrar(); return; }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('term')) {
      e.preventDefault();
      abrir(e.target);
    }
  });
  window.addEventListener('resize', posicionar);
  // Si se scrollea la página, el término se mueve: cerramos (salvo que el scroll sea dentro del popup).
  document.addEventListener('scroll', (e) => {
    if (pop && !pop.hidden && !(e.target instanceof Node && pop.contains(e.target))) cerrar();
  }, true);
}
