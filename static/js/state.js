// state.js — estado de la sesión.
//  · Pomodoro: global (no depende de la materia).
//  · Progreso (temas recorridos, última página): POR MATERIA. Se recarga al activar otra materia.

import { plan, materiaActiva, hayMateriaActiva, claveMateria } from './core/materia.js';

const POMODORO_KEY = 'aa_pomodoro_state';
const DEFAULT_POMO_TIME = 25 * 60; // 25 minutos
const POMO_SETTINGS_KEY = 'aa_pomodoro_settings';

// ---------------------------------------------------------------------------
// Pomodoro
// ---------------------------------------------------------------------------

// Configuración editable del Pomodoro (duraciones en minutos).
export const DEFAULT_POMO_SETTINGS = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
  longEvery: 4,       // cada cuántos pomodoros toca el descanso largo
  autoBreak: true,    // al terminar un pomodoro, arranca solo el descanso
  autoWork: false,    // al terminar un descanso, arranca solo el próximo pomodoro
  sound: true,
};

function clampInt(v, min, max, fallback) {
  const n = Math.round(Number(v));
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

export function sanitizePomoSettings(s = {}) {
  const d = DEFAULT_POMO_SETTINGS;
  return {
    work: clampInt(s.work, 1, 180, d.work),
    shortBreak: clampInt(s.shortBreak, 1, 60, d.shortBreak),
    longBreak: clampInt(s.longBreak, 1, 120, d.longBreak),
    longEvery: clampInt(s.longEvery, 2, 12, d.longEvery),
    autoBreak: s.autoBreak === undefined ? d.autoBreak : !!s.autoBreak,
    autoWork: s.autoWork === undefined ? d.autoWork : !!s.autoWork,
    sound: s.sound === undefined ? d.sound : !!s.sound,
  };
}

export function loadPomodoroSettings() {
  try {
    const raw = localStorage.getItem(POMO_SETTINGS_KEY);
    return sanitizePomoSettings(raw ? JSON.parse(raw) : {});
  } catch {
    return sanitizePomoSettings({});
  }
}

export function savePomodoroSettings(settings) {
  try { localStorage.setItem(POMO_SETTINGS_KEY, JSON.stringify(settings)); } catch { /* ignorar */ }
}

export function loadPomodoroState() {
  try {
    const raw = localStorage.getItem(POMODORO_KEY);
    if (!raw) return { timeLeft: DEFAULT_POMO_TIME, isRunning: false, completedCount: 0, mode: 'work', targetEndTime: null };
    const data = JSON.parse(raw);
    return {
      timeLeft: typeof data.timeLeft === 'number' ? data.timeLeft : DEFAULT_POMO_TIME,
      isRunning: false,
      completedCount: typeof data.completedCount === 'number' ? data.completedCount : 0,
      mode: (data.mode === 'break' || data.mode === 'long') ? data.mode : 'work',
      targetEndTime: null,
    };
  } catch {
    return { timeLeft: DEFAULT_POMO_TIME, isRunning: false, completedCount: 0, mode: 'work', targetEndTime: null };
  }
}

export function savePomodoroState(pomoState) {
  try {
    localStorage.setItem(POMODORO_KEY, JSON.stringify({
      timeLeft: pomoState.timeLeft,
      isRunning: pomoState.isRunning,
      completedCount: pomoState.completedCount,
      mode: pomoState.mode,
    }));
  } catch { /* ignorar errores */ }
}

// ---------------------------------------------------------------------------
// Progreso por materia
// ---------------------------------------------------------------------------

function leerSet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

const state = {
  currentPage: null,
  visited: new Set(),
  seen: new Set(),
  cleanups: [],
  pomodoro: loadPomodoroState(),
};

/** Carga el progreso guardado de la materia activa (llamar al activar una materia). */
export function recargarProgreso() {
  const vis = leerSet(claveMateria('visited'));
  state.visited = vis || new Set();
  // Migración: antes solo existía "visited"; todo lo visitado cuenta como visto.
  state.seen = leerSet(claveMateria('seen')) || new Set(state.visited);
  state.currentPage = null;
}

export function getState() {
  return state;
}

const teoria = () => plan().PAGINAS_TEORIA;

function persistVisited() {
  try { localStorage.setItem(claveMateria('visited'), JSON.stringify([...state.visited])); } catch { /* ignorar */ }
}
function persistSeen() {
  try { localStorage.setItem(claveMateria('seen'), JSON.stringify([...state.seen])); } catch { /* ignorar */ }
}

/**
 * Se llama al abrir una página. Solo los temas de teoría cuentan para el progreso.
 * La PRIMERA vez que se abre un tema se marca como recorrido; después el usuario
 * manda: si lo desmarca en el menú, abrirlo de nuevo no lo vuelve a marcar.
 */
export function markVisited(page) {
  if (page !== 'inicio') {
    try { localStorage.setItem(claveMateria('lastPage'), page); } catch { /* ignorar */ }
  }
  if (!teoria().includes(page)) return;
  if (!state.seen.has(page)) {
    state.seen.add(page);
    state.visited.add(page);
    persistSeen();
    persistVisited();
  }
}

/** Marca o desmarca un tema a mano (checkbox del menú). */
export function setVisited(page, value) {
  if (!teoria().includes(page)) return;
  state.seen.add(page); // cualquier decisión manual cuenta como "ya visto"
  if (value) state.visited.add(page); else state.visited.delete(page);
  persistSeen();
  persistVisited();
}

export function toggleVisited(page) {
  setVisited(page, !state.visited.has(page));
  return state.visited.has(page);
}

/** Marca o desmarca varios temas (un grupo entero o todo). */
export function setManyVisited(pages, value) {
  pages.forEach((p) => setVisited(p, value));
}

export function resetProgress() {
  state.visited.clear();
  state.seen.clear();
  persistVisited();
  persistSeen();
  try { localStorage.removeItem(claveMateria('lastPage')); } catch { /* ignorar */ }
}

export function lastPage() {
  if (!hayMateriaActiva()) return null;
  try { return localStorage.getItem(claveMateria('lastPage')); } catch { return null; }
}

export function progressPercent() {
  const t = teoria();
  if (!t.length) return 0;
  return Math.round((t.filter((p) => state.visited.has(p)).length / t.length) * 100);
}

/**
 * Progreso de cualquier materia ya cargada (sin activarla): lo usa el menú de materias.
 * @returns {{hechos:number, total:number, pct:number, ultima:string|null}}
 */
export function progresoDeMateria(manifiesto) {
  const total = manifiesto.unidades.reduce((n, u) => n + u.paginas.length, 0);
  const ids = new Set(manifiesto.unidades.flatMap((u) => u.paginas.map((p) => p.id)));
  const vis = leerSet(claveMateria('visited', manifiesto)) || new Set();
  const hechos = [...vis].filter((p) => ids.has(p)).length;
  let ultima = null;
  try { ultima = localStorage.getItem(claveMateria('lastPage', manifiesto)); } catch { /* ignorar */ }
  return { hechos, total, pct: total ? Math.round((hechos / total) * 100) : 0, ultima };
}

// ---------------------------------------------------------------------------
// Limpieza al cambiar de página
// ---------------------------------------------------------------------------

export function registerCleanup(fn) {
  if (typeof fn === 'function') state.cleanups.push(fn);
}

export function runCleanups() {
  for (const fn of state.cleanups) {
    try { fn(); } catch (e) { console.warn('cleanup error', e); }
  }
  state.cleanups = [];
}

export { materiaActiva };
