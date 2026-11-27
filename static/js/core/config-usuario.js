// core/config-usuario.js — preferencias globales del usuario (localStorage), editables desde "Ajustes" del menú de materias.
//   · qué materias se muestran en la pantalla principal (el resto queda "removida" y se puede volver a agregar);
//   · si se muestra o no el avance (checks, porcentaje, barras): o se ven todos o no se ve ninguno;
//   · si se muestra o no el Pomodoro.
// Cada cambio dispara el evento `aa:config` para que la interfaz se redibuje.

export const EVENTO_CONFIG = 'aa:config';

const K_OCULTAS = 'aa_hub_ocultas';
const K_POMODORO = 'aa_pomodoro_activo';
const K_AVANCE = 'aa_avance_activo';

function leerJSON(k, defecto) {
  try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : defecto; } catch { return defecto; }
}
function escribir(k, v) { try { localStorage.setItem(k, v); } catch { /* ignorar */ } }
function avisar() { window.dispatchEvent(new Event(EVENTO_CONFIG)); }

// --- Materias visibles en la pantalla principal ---
export function materiasOcultas() { const l = leerJSON(K_OCULTAS, []); return new Set(Array.isArray(l) ? l : []); }
export function materiaVisible(id) { return !materiasOcultas().has(id); }
export function setMateriaVisible(id, visible) {
  const s = materiasOcultas(); if (visible) s.delete(id); else s.add(id);
  escribir(K_OCULTAS, JSON.stringify([...s])); avisar();
}

// --- Avance (checks / porcentaje / barras de progreso): todo o nada, para todas las materias ---
export function avanceActivo() { try { return localStorage.getItem(K_AVANCE) !== '0'; } catch { return true; } }
export function setAvanceActivo(activo) { escribir(K_AVANCE, activo ? '1' : '0'); avisar(); }

// --- Pomodoro ---
export function pomodoroActivo() { try { return localStorage.getItem(K_POMODORO) !== '0'; } catch { return true; } }
export function setPomodoroActivo(activo) {
  escribir(K_POMODORO, activo ? '1' : '0');
  // Si se desactiva con el reloj corriendo, se pausa para que no suene en segundo plano.
  if (!activo) {
    const w = document.getElementById('pomodoro-widget');
    if (w?.classList.contains('is-running')) document.getElementById('pomo-start-btn')?.click();
  }
  avisar();
}

/** Aplica al <body> las clases que ocultan el Pomodoro y el avance (valen en todas las pantallas). */
export function aplicarConfigGlobal() {
  document.body.classList.toggle('sin-pomodoro', !pomodoroActivo());
  document.body.classList.toggle('sin-avance', !avanceActivo());
}
