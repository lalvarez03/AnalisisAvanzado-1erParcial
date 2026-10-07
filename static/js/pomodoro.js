// js/pomodoro.js
import { getState, savePomodoroState } from './state.js';

let timerInterval = null;
const ORIGINAL_TITLE = 'Análisis Avanzado — Aprendizaje Interactivo';

// Alarma estilo Reloj Despertador Digital (~3 segundos de beeps rítmicos)
function playAlarmSound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const startTime = audioCtx.currentTime;
    
    // 3 ráfagas dobles durante 3 segundos
    const bursts = [0, 1.0, 2.0, 3.0];
    
    bursts.forEach((burstTime) => {
      [0, 0.12].forEach((beepOffset) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        // Onda cuadrada tipo reloj despertador digital
        osc.type = 'square';
        osc.frequency.setValueAtTime(1800, startTime + burstTime + beepOffset);

        const t = startTime + burstTime + beepOffset;
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(t);
        osc.stop(t + 0.08);
      });
    });
  } catch (e) {
    console.warn('No se pudo reproducir la alarma:', e);
  }
}

export function initPomodoro() {
  const display = document.getElementById('pomo-display');
  const startBtn = document.getElementById('pomo-start-btn');
  const resetBtn = document.getElementById('pomo-reset-btn');
  const countDisplay = document.getElementById('pomo-count-display');
  const countResetBtn = document.getElementById('pomo-count-reset-btn');

  if (!display || !startBtn || !resetBtn || !countDisplay || !countResetBtn) return;

  const state = getState().pomodoro;

  // Al recargar la app se mantiene pausado
  state.isRunning = false;
  state.targetEndTime = null;
  savePomodoroState(state);

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateUI() {
    const formatted = formatTime(state.timeLeft);
    display.textContent = formatted;
    startBtn.textContent = state.isRunning ? '⏸' : '▶';
    countDisplay.textContent = `${state.completedCount} 🍅`;

    // Actualizar el título de la pestaña del navegador
    if (state.mode === 'break') {
      document.title = `(${formatted}) ☕ Descanso — Análisis Avanzado`;
      display.classList.add('is-break');
      resetBtn.textContent = '⏭️';
      resetBtn.title = 'Saltear descanso';
    } else {
      document.title = `(${formatted}) 🍅 Análisis Avanzado`;
      display.classList.remove('is-break');
      resetBtn.textContent = '↺';
      resetBtn.title = 'Reiniciar temporizador';
    }
  }

  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    
    state.isRunning = true;
    // Marca el momento exacto en que debe finalizar
    state.targetEndTime = Date.now() + state.timeLeft * 1000;
    savePomodoroState(state);
    updateUI();

    timerInterval = setInterval(() => {
      // Calcular tiempo restante basándonos en la hora real (evita desfasaje al cambiar de pestaña)
      const remaining = Math.max(0, Math.round((state.targetEndTime - Date.now()) / 1000));
      state.timeLeft = remaining;

      if (state.timeLeft > 0) {
        savePomodoroState(state);
        updateUI();
      } else {
        clearInterval(timerInterval);
        playAlarmSound();

        if (state.mode === 'work') {
          // Termina trabajo -> Pasa a descanso de 5 min y arranca el descanso
          state.completedCount++;
          state.mode = 'break';
          state.timeLeft = 5 * 60;
          savePomodoroState(state);
          updateUI();
          startTimer();
        } else {
          // Termina descanso -> Carga 25 min, pasa a modo trabajo y queda EN PAUSA
          state.mode = 'work';
          state.timeLeft = 25 * 60;
          state.isRunning = false;
          state.targetEndTime = null;
          savePomodoroState(state);
          updateUI();
        }
      }
    }, 500);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    state.isRunning = false;
    state.targetEndTime = null;
    savePomodoroState(state);
    updateUI();
  }

  function handleResetOrSkip() {
    clearInterval(timerInterval);
    state.isRunning = false;
    state.targetEndTime = null;

    if (state.mode === 'break') {
      state.mode = 'work';
      state.timeLeft = 25 * 60;
    } else {
      state.timeLeft = 25 * 60;
    }

    savePomodoroState(state);
    updateUI();
  }

  function resetCount() {
    state.completedCount = 0;
    savePomodoroState(state);
    updateUI();
  }

  startBtn.addEventListener('click', () => {
    if (state.isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  });

  resetBtn.addEventListener('click', handleResetOrSkip);
  countResetBtn.addEventListener('click', resetCount);

  // Botón de prueba en desarrollo (si existe)
  const finishDevBtn = document.getElementById('pomo-finish-dev-btn');
  if (finishDevBtn) {
    finishDevBtn.addEventListener('click', () => {
      state.timeLeft = 1;
      state.targetEndTime = Date.now() + 1000;
      savePomodoroState(state);
      updateUI();
      if (!state.isRunning) startTimer();
    });
  }

  updateUI();
}