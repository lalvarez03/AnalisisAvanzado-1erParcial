// js/pomodoro.js
import { getState, savePomodoroState } from './state.js';

let timerInterval = null;

function playAlarmSound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const beepCount = 3;

    for (let i = 0; i < beepCount; i++) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + i * 0.4);

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime + i * 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + i * 0.4 + 0.25);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + i * 0.4);
      osc.stop(audioCtx.currentTime + i * 0.4 + 0.25);
    }
  } catch (e) {
    console.warn('No se pudo reproducir el sonido de alarma:', e);
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

  state.isRunning = false;
  savePomodoroState(state);

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateUI() {
    display.textContent = formatTime(state.timeLeft);
    startBtn.textContent = state.isRunning ? '⏸' : '▶';
    countDisplay.textContent = `${state.completedCount} 🍅`;
  }

  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    state.isRunning = true;
    savePomodoroState(state);
    updateUI();

    timerInterval = setInterval(() => {
      if (state.timeLeft > 0) {
        state.timeLeft--;
        savePomodoroState(state);
        updateUI();
      } else {
        clearInterval(timerInterval);
        state.isRunning = false;
        
        // Sumar pomodoro completado y reiniciar tiempo a 25 min
        state.completedCount++;
        state.timeLeft = 25 * 60;
        
        savePomodoroState(state);
        updateUI();
        
        playAlarmSound();
        
        setTimeout(() => {
          alert('⏰ ¡Tiempo de Pomodoro finalizado!');
        }, 100);
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    state.isRunning = false;
    savePomodoroState(state);
    updateUI();
  }

  function resetTimer() {
    clearInterval(timerInterval);
    state.timeLeft = 25 * 60;
    state.isRunning = false;
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

  resetBtn.addEventListener('click', resetTimer);
  countResetBtn.addEventListener('click', resetCount);

  updateUI();
}