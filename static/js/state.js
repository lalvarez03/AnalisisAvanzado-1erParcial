// state.js
import { PAGE_ORDER } from './constants.js';

const STORAGE_KEY = 'aa_visited_pages';
const POMODORO_KEY = 'aa_pomodoro_state';

const DEFAULT_POMO_TIME = 25 * 60; // 25 minutos

function loadVisited() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function loadPomodoroState() {
  try {
    const raw = localStorage.getItem(POMODORO_KEY);
    if (!raw) return { timeLeft: DEFAULT_POMO_TIME, isRunning: false, completedCount: 0 };
    
    const data = JSON.parse(raw);
    return {
      timeLeft: typeof data.timeLeft === 'number' ? data.timeLeft : DEFAULT_POMO_TIME,
      isRunning: false,
      completedCount: typeof data.completedCount === 'number' ? data.completedCount : 0
    };
  } catch {
    return { timeLeft: DEFAULT_POMO_TIME, isRunning: false, completedCount: 0 };
  }
}

export function savePomodoroState(pomoState) {
  try {
    localStorage.setItem(POMODORO_KEY, JSON.stringify({
      timeLeft: pomoState.timeLeft,
      isRunning: pomoState.isRunning,
      completedCount: pomoState.completedCount
    }));
  } catch { /* ignorar errores */ }
}

const state = {
  currentPage: null,
  visited: loadVisited(),
  cleanups: [],
  pomodoro: loadPomodoroState()
};

export function getState() {
  return state;
}

export function markVisited(page) {
  if (!PAGE_ORDER.includes(page)) return;
  state.visited.add(page);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.visited]));
  } catch { /* ignorar errores */ }
}

export function progressPercent() {
  const topics = PAGE_ORDER.filter((p) => p !== 'inicio' && p !== 'quiz');
  const done = topics.filter((p) => state.visited.has(p)).length;
  return Math.round((done / topics.length) * 100);
}

export function registerCleanup(fn) {
  if (typeof fn === 'function') state.cleanups.push(fn);
}

export function runCleanups() {
  for (const fn of state.cleanups) {
    try { fn(); } catch (e) { console.warn('cleanup error', e); }
  }
  state.cleanups = [];
}