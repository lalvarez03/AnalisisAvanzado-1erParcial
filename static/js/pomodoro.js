// js/pomodoro.js
import { getState, savePomodoroState } from './state.js';

let timerInterval = null;

// Alarma sonora continua de ~2 segundos con la Web Audio API
function play2SecondAlarm() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const startTime = audioCtx.currentTime;
    
    // Configuración para 3 segundos de duración total
    const totalDuration = 3.0; 
    const pulseDuration = 0.1; // Pitidos más cortos y rápidos
    const pulseGap = 0.05;      // Espacio entre pitidos
    
    // Calculamos la cantidad de ráfagas en 3 segundos (~11 pitidos)
    const totalPulses = Math.floor(totalDuration / (pulseDuration + pulseGap));

    for (let i = 0; i < totalPulses; i++) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      // Frecuencia más alta: alterna entre 1200 Hz y 1600 Hz (frecuencia aguda tipo reloj digital)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(i % 2 === 0 ? 1200 : 1600, startTime + i * (pulseDuration + pulseGap));

      const pulseStart = startTime + i * (pulseDuration + pulseGap);
      
      // Envolvente de volumen rápida
      gain.gain.setValueAtTime(0, pulseStart);
      gain.gain.linearRampToValueAtTime(0.4, pulseStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, pulseStart + pulseDuration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(pulseStart);
      osc.stop(pulseStart + pulseDuration);
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

  // Asegurar que no inicie solo al cargar la app
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

    // Cambiar estetica según el modo (Trabajo vs Descanso)
    if (state.mode === 'break') {
      display.classList.add('is-break');
      resetBtn.textContent = '⏭️';
      resetBtn.title = 'Saltear descanso';
    } else {
      display.classList.remove('is-break');
      resetBtn.textContent = '↺';
      resetBtn.title = 'Reiniciar temporizador';
    }
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
        play2SecondAlarm();

        if (state.mode === 'work') {
          // Finalizó Pomodoro de trabajo -> Pasar a Descanso (5 min)
          state.completedCount++;
          state.mode = 'break';
          state.timeLeft = 5 * 60;
          savePomodoroState(state);
          updateUI();

          // Iniciar descanso automáticamente
          startTimer();
        } else {
          // Finalizó Descanso -> Arrancar automáticamente nuevo Pomodoro de trabajo (25 min)
          state.mode = 'work';
          state.timeLeft = 25 * 60;
          savePomodoroState(state);
          updateUI();

          // Iniciar pomodoro automáticamente
          startTimer();
        }
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    state.isRunning = false;
    savePomodoroState(state);
    updateUI();
  }

  function handleResetOrSkip() {
    clearInterval(timerInterval);
    state.isRunning = false;

    if (state.mode === 'break') {
      // Saltear descanso -> Volver a modo Trabajo
      state.mode = 'work';
      state.timeLeft = 25 * 60;
    } else {
      // Reiniciar Pomodoro actual
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

  updateUI();
  const finishDevBtn = document.getElementById('pomo-finish-dev-btn');

if (finishDevBtn) {
  finishDevBtn.addEventListener('click', () => {
    // Establece el tiempo restante en 1 segundo para que en el próximo tick se ejecute todo el flujo completo (alarma, cambio a descanso/trabajo, incremento de contador, etc.)
    state.timeLeft = 1;
    savePomodoroState(state);
    updateUI();
    
    // Si el temporizador estaba pausado, lo iniciamos para que ejecute el final inmediatamente
    if (!state.isRunning) {
      startTimer();
    }
  });
}
}