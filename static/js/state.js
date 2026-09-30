// state.js — estado global mínimo de la aplicación.
// Guarda la página actual y las páginas visitadas (para el % de progreso),
// persistiendo en localStorage.

import { PAGE_ORDER } from './constants.js';

const STORAGE_KEY = 'aa_visited_pages';

function loadVisited() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

const state = {
  currentPage: null,
  visited: loadVisited(),
  // Registro de destructores de la página activa (para cleanup de listeners/anim).
  cleanups: [],
};

export function getState() {
  return state;
}

export function markVisited(page) {
  if (!PAGE_ORDER.includes(page)) return;
  state.visited.add(page);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.visited]));
  } catch { /* ignorar cuota/errores */ }
}

export function progressPercent() {
  // No contamos 'inicio' ni 'quiz' como "temas".
  const topics = PAGE_ORDER.filter((p) => p !== 'inicio' && p !== 'quiz');
  const done = topics.filter((p) => state.visited.has(p)).length;
  return Math.round((done / topics.length) * 100);
}

// --- Cleanup de la página activa ---
export function registerCleanup(fn) {
  if (typeof fn === 'function') state.cleanups.push(fn);
}

export function runCleanups() {
  for (const fn of state.cleanups) {
    try { fn(); } catch (e) { console.warn('cleanup error', e); }
  }
  state.cleanups = [];
}
