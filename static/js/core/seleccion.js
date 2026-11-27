// core/seleccion.js — qué práctica/guía está elegida en las páginas "estudio" y "guia".
// Es lo que permite que el menú lateral del modo Prácticas (segmentado por unidad) abra directo
// la práctica correcta. Se guarda por materia: `practica` (estudio) y `guia` (ejercicios resueltos).

import { claveMateria } from './materia.js';

export const EVENTO_SELECCION = 'aa:seleccion';

const clave = (pagina) => claveMateria(pagina === 'guia' ? 'guia' : 'practica');

export function leerSeleccion(pagina) {
  try { return localStorage.getItem(clave(pagina)); } catch { return null; }
}

/** Guarda la selección y avisa (para que el menú resalte la entrada correcta). */
export function guardarSeleccion(pagina, id) {
  try { localStorage.setItem(clave(pagina), id); } catch { /* ignorar */ }
  window.dispatchEvent(new CustomEvent(EVENTO_SELECCION));
}

/** Navega a `estudio` o `guia` con la práctica elegida (re-renderiza aunque ya estemos ahí). */
export function irAPractica(pagina, id) {
  if (id) guardarSeleccion(pagina, id);
  if (location.hash === '#' + pagina) window.dispatchEvent(new HashChangeEvent('hashchange'));
  else location.hash = pagina;
}
