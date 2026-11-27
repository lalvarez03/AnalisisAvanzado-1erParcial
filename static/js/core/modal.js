// core/modal.js — ventana emergente (popup) accesible y reutilizable.
//   · role="dialog" + aria-modal, titulada con aria-labelledby.
//   · Se cierra con la X, con Esc, tocando fuera del cuadro o al cambiar de ruta.
//   · El foco entra al cuadro, queda atrapado con Tab y vuelve al botón que la abrió.
//   · Bloquea el scroll del fondo mientras está abierta (clase `modal-abierto` en <body>).
//
// abrirModal({ titulo, ancho }) → { cuerpo, cerrar }   (el contenido se arma dentro de `cuerpo`)

import { el } from '../utils/dom.js';

let abierta = null;
let contador = 0;

const FOCUSABLES = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function cerrarModal() { if (abierta) abierta.cerrar(); }

export function abrirModal({ titulo, ancho = 720 }) {
  cerrarModal();
  const previo = document.activeElement;
  const idTitulo = 'modal-titulo-' + (++contador);

  const cuerpo = el('div', { class: 'modal-cuerpo' });
  const cerrarBtn = el('button', { class: 'modal-x', type: 'button', 'aria-label': 'Cerrar', title: 'Cerrar (Esc)' }, '✕');
  const caja = el('div', {
    class: 'modal-caja', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': idTitulo, tabindex: '-1',
    style: `max-width:${ancho}px`,
  }, [
    el('header', { class: 'modal-head' }, [el('h2', { id: idTitulo, class: 'modal-titulo', text: titulo }), cerrarBtn]),
    cuerpo,
  ]);
  const fondo = el('div', { class: 'modal-fondo' }, [caja]);

  function cerrar() {
    if (abierta !== api) return;
    abierta = null;
    document.removeEventListener('keydown', teclas, true);
    window.removeEventListener('hashchange', cerrar);
    fondo.remove();
    document.body.classList.remove('modal-abierto');
    if (previo && document.contains(previo) && typeof previo.focus === 'function') previo.focus();
  }

  function teclas(e) {
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); cerrar(); return; }
    if (e.key !== 'Tab') return;
    const items = [...caja.querySelectorAll(FOCUSABLES)].filter((n) => !n.hidden && n.offsetParent !== null);
    if (!items.length) { e.preventDefault(); caja.focus(); return; }
    const primero = items[0];
    const ultimo = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === primero || document.activeElement === caja)) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
  }

  cerrarBtn.addEventListener('click', cerrar);
  // Cierra solo si el click empezó y terminó en el fondo (no al soltar un arrastre de texto dentro del cuadro).
  let pulsoFondo = false;
  fondo.addEventListener('mousedown', (e) => { pulsoFondo = e.target === fondo; });
  fondo.addEventListener('click', (e) => { if (e.target === fondo && pulsoFondo) cerrar(); });
  document.addEventListener('keydown', teclas, true);
  window.addEventListener('hashchange', cerrar);

  const api = { cuerpo, cerrar };
  abierta = api;
  document.body.appendChild(fondo);
  document.body.classList.add('modal-abierto');
  caja.focus();
  return api;
}
