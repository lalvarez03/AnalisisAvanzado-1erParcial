// utils/resultados-cards.js — tarjetas de "resultados clave" (título + enunciado + desglose +/−).
//
// Las usan dos vistas: el pie de cada tema (js/navigation.js) y la pestaña separada (resultados.html).
// Cada tarjeta siempre muestra título y enunciado; el botón + / − despliega la demostración y el ejemplo
// de uso paso a paso (se arman recién la primera vez que se abren). Los términos del glosario son clickeables.

import { el, typeset } from './dom.js';
import { solvedExercise } from './resueltos.js';
import { marcarTerminos } from './glosario.js';

let contadorDesgloses = 0;   // ids únicos para aria-controls

/**
 * Construye la tarjeta de un resultado.
 * @param {{n:string, e:string, ref?:string, p?:string, x?:object}} r
 * @param {{onCambio?:()=>void, id?:string}} [opts] onCambio se llama al abrir/cerrar el desglose.
 * @returns {HTMLElement} con métodos `_setAbierto(bool)` y `_estaAbierto()` (si no hay desglose: `_setAbierto` es null).
 */
export function crearTarjetaResultado(r, opts = {}) {
  // Esquema: e = enunciado · p = demostración · x = ejemplo de uso paso a paso.
  const enun = el('div', { class: 'res-enun', html: '<div class="res-lbl">📌 Enunciado</div>' + r.e });
  marcarTerminos(enun);   // el enunciado está siempre visible, con sus términos clickeables
  const partes = [enun];

  let toggleBtn = null;
  let setAbierto = null;
  let estaAbierto = () => false;

  if (r.p || r.x) {
    const desglose = el('div', { class: 'res-desglose', hidden: true });
    // El botón +/− es discreto y accesible por teclado (Tab, Enter/Espacio).
    const idDesglose = 'res-d-' + (++contadorDesgloses);
    desglose.id = idDesglose;
    toggleBtn = el('button', {
      class: 'res-bullet', type: 'button', 'aria-expanded': 'false', 'aria-controls': idDesglose,
      title: 'Ver demostración y ejemplo', 'aria-label': 'Desglosar: ' + r.n.replace(/<[^>]+>/g, ''),
    }, '+');
    let armado = false;
    const armar = () => {
      if (armado) return;
      armado = true;
      const cuerpoD = el('div', { class: 'res-desglose-body' });
      if (r.p) {
        const prueba = el('div', { class: 'res-sub-body res-proof-d', html: '<div class="res-lbl">🧩 Demostración</div>' + r.p });
        marcarTerminos(prueba);
        cuerpoD.appendChild(prueba);
      }
      if (r.x) {
        const ej = el('div', { class: 'res-ex-d' }, [el('div', { class: 'res-lbl', text: '✏️ Ejemplo de uso, paso a paso' })]);
        ej.appendChild(solvedExercise({ fuente: 'Ejemplo de uso · ' + r.n, ...r.x }));
        marcarTerminos(ej);   // antes de que MathJax procese las fórmulas
        cuerpoD.appendChild(ej);
      }
      desglose.appendChild(cuerpoD);
    };
    setAbierto = (abrir) => {
      if (abrir) armar();
      desglose.hidden = !abrir;
      toggleBtn.textContent = abrir ? '−' : '+';
      toggleBtn.setAttribute('aria-expanded', abrir ? 'true' : 'false');
      toggleBtn.title = abrir ? 'Ocultar demostración y ejemplo' : 'Ver demostración y ejemplo';
      if (abrir) typeset(desglose);
    };
    estaAbierto = () => !desglose.hidden;
    toggleBtn.addEventListener('click', () => { setAbierto(desglose.hidden); opts.onCambio?.(); });
    partes.push(desglose);
  }

  const cabeza = el('div', { class: 'res-card-head' }, [
    toggleBtn || el('span', { class: 'res-bullet res-bullet-static', 'aria-hidden': 'true' }, '◆'),
    el('span', { class: 'res-name', html: r.n }),
    r.ref ? el('span', { class: 'res-ref', text: r.ref }) : null,
  ]);
  // Clic con mouse sobre el título también desglosa (no agrega otra parada de Tab: el foco queda en el botón).
  if (toggleBtn) {
    cabeza.classList.add('res-head-click');
    cabeza.addEventListener('click', (e) => {
      if (e.target.closest('.res-bullet, .term')) return;
      toggleBtn.click();
    });
  }
  const item = el('div', { class: 'res-item res-card' }, [cabeza, el('div', { class: 'res-body' }, partes)]);
  if (opts.id) item.id = opts.id;
  item._setAbierto = setAbierto;
  item._estaAbierto = estaAbierto;
  return item;
}

/** Cuántas tarjetas tienen desglose y cuántas están abiertas. */
export function estadoDesgloses(items) {
  const con = items.filter((d) => d._setAbierto);
  return { total: con.length, abiertos: con.filter((d) => d._estaAbierto()).length };
}

/** Si hay algo cerrado, abre todo; si todo está abierto, cierra todo. Devuelve true si quedó abierto. */
export function alternarTodos(items) {
  const { total, abiertos } = estadoDesgloses(items);
  const abrir = abiertos < total;
  items.forEach((d) => { if (d._setAbierto) d._setAbierto(abrir); });
  return abrir;
}

/** Texto del botón general según el estado: "Desglosar" o "Contraer". */
export function etiquetaAlternar(items) {
  const { total, abiertos } = estadoDesgloses(items);
  return total > 0 && abiertos === total ? 'Contraer' : 'Desglosar';
}
