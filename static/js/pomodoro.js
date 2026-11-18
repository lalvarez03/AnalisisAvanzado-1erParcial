// js/pomodoro.js — temporizador Pomodoro con tiempos editables y contador ajustable.
import {
  getState, savePomodoroState,
  loadPomodoroSettings, savePomodoroSettings, sanitizePomoSettings, DEFAULT_POMO_SETTINGS,
} from './state.js';

let timerInterval = null;
let audioCtx = null;

const MODOS = {
  work: { icono: '🍅', etiqueta: 'Foco', titulo: '🍅' },
  break: { icono: '☕', etiqueta: 'Descanso corto', titulo: '☕ Descanso' },
  long: { icono: '🌴', etiqueta: 'Descanso largo', titulo: '🌴 Descanso largo' },
};

const PRESETS = [
  { nombre: 'Clásico 25 / 5', work: 25, shortBreak: 5, longBreak: 15 },
  { nombre: 'Largo 50 / 10', work: 50, shortBreak: 10, longBreak: 25 },
  { nombre: 'Corto 15 / 3', work: 15, shortBreak: 3, longBreak: 10 },
];

// Alarma estilo reloj despertador digital (~3 segundos de beeps rítmicos).
function playAlarmSound() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const startTime = audioCtx.currentTime;
    [0, 1.0, 2.0].forEach((burstTime) => {
      [0, 0.12].forEach((beepOffset) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const t = startTime + burstTime + beepOffset;
        osc.type = 'square';
        osc.frequency.setValueAtTime(1800, t);
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

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Acepta "25" (minutos), "25:30" (mm:ss) o "1:05:00" (h:mm:ss). Devuelve segundos o null.
function parseTiempo(texto) {
  const t = String(texto).trim();
  if (!t) return null;
  const partes = t.split(':').map((x) => x.trim());
  if (partes.some((p) => !/^\d+$/.test(p))) return null;
  const nums = partes.map(Number);
  let seg;
  if (nums.length === 1) seg = nums[0] * 60;
  else if (nums.length === 2) seg = nums[0] * 60 + nums[1];
  else if (nums.length === 3) seg = nums[0] * 3600 + nums[1] * 60 + nums[2];
  else return null;
  if (seg < 1 || seg > 180 * 60) return null;
  return seg;
}

export function initPomodoro() {
  const $ = (id) => document.getElementById(id);
  const widget = $('pomodoro-widget');
  const display = $('pomo-display');
  const modeEl = $('pomo-mode');
  const startBtn = $('pomo-start-btn');
  const resetBtn = $('pomo-reset-btn');
  const skipBtn = $('pomo-skip-btn');
  const countDisplay = $('pomo-count-display');
  const countResetBtn = $('pomo-count-reset-btn');
  const countDecBtn = $('pomo-count-dec-btn');
  const countIncBtn = $('pomo-count-inc-btn');
  const settingsBtn = $('pomo-settings-btn');

  if (!widget || !display || !startBtn || !resetBtn || !countDisplay) return;

  const state = getState().pomodoro;
  let settings = loadPomodoroSettings();

  // Al recargar la app se mantiene pausado.
  state.isRunning = false;
  state.targetEndTime = null;
  if (!MODOS[state.mode]) state.mode = 'work';

  const durationOf = (mode, s = settings) =>
    (mode === 'work' ? s.work : mode === 'long' ? s.longBreak : s.shortBreak) * 60;

  function save() { savePomodoroState(state); }

  function updateUI() {
    const formatted = formatTime(state.timeLeft);
    if (!display.querySelector('input')) display.textContent = formatted;
    startBtn.textContent = state.isRunning ? '⏸' : '▶';
    startBtn.title = state.isRunning ? 'Pausar' : 'Iniciar';
    countDisplay.textContent = `${state.completedCount} 🍅`;
    const m = MODOS[state.mode];
    modeEl.textContent = m.icono;
    modeEl.title = m.etiqueta;
    display.classList.toggle('is-break', state.mode !== 'work');
    widget.classList.toggle('is-running', state.isRunning);
    resetBtn.title = 'Reiniciar esta fase (' + durationOf(state.mode) / 60 + ' min)';
    skipBtn.title = state.mode === 'work' ? 'Saltar al descanso (no suma pomodoro)' : 'Saltar el descanso';
    // El título base lo pone la navegación (materia · página); acá solo se antepone el reloj.
    const base = document.title.replace(/^\([^)]*\)\s*\S+\s+(?:Descanso largo|Descanso)?\s*/u, '');
    document.title = state.isRunning || state.timeLeft !== durationOf(state.mode)
      ? `(${formatted}) ${m.titulo} ${base}`
      : base;
  }

  function stopInterval() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  function startTimer() {
    stopInterval();
    state.isRunning = true;
    state.targetEndTime = Date.now() + state.timeLeft * 1000;
    save();
    updateUI();
    timerInterval = setInterval(() => {
      // Se calcula con la hora real: no se desfasa si la pestaña queda en segundo plano.
      state.timeLeft = Math.max(0, Math.round((state.targetEndTime - Date.now()) / 1000));
      if (state.timeLeft > 0) { save(); updateUI(); } else finishPhase();
    }, 500);
  }

  function pauseTimer() {
    stopInterval();
    state.isRunning = false;
    state.targetEndTime = null;
    save();
    updateUI();
  }

  function goTo(mode, autoStart) {
    stopInterval();
    state.mode = mode;
    state.timeLeft = durationOf(mode);
    state.isRunning = false;
    state.targetEndTime = null;
    save();
    updateUI();
    if (autoStart) startTimer();
  }

  function finishPhase() {
    stopInterval();
    if (settings.sound) playAlarmSound();
    if (state.mode === 'work') {
      state.completedCount++;
      const largo = state.completedCount % settings.longEvery === 0;
      goTo(largo ? 'long' : 'break', settings.autoBreak);
    } else {
      goTo('work', settings.autoWork);
    }
  }

  function skipPhase() {
    // Saltar no cuenta como pomodoro completado.
    goTo(state.mode === 'work' ? 'break' : 'work', false);
  }

  function resetPhase() { goTo(state.mode, false); }

  function setCount(n) {
    state.completedCount = Math.min(999, Math.max(0, n));
    save();
    updateUI();
  }

  // --- Edición del tiempo actual (clic en el reloj, solo en pausa) ---
  function editarTiempo() {
    if (state.isRunning || display.querySelector('input')) return;
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'pomo-edit';
    input.value = formatTime(state.timeLeft);
    input.setAttribute('aria-label', 'Tiempo actual (mm:ss o minutos)');
    display.textContent = '';
    display.appendChild(input);
    input.focus();
    input.select();

    let cerrado = false;
    const cerrar = (aplicar) => {
      if (cerrado) return;
      cerrado = true;
      if (aplicar) {
        const seg = parseTiempo(input.value);
        if (seg !== null) { state.timeLeft = seg; save(); }
        else { input.classList.add('bad'); }
      }
      display.textContent = '';
      updateUI();
    };
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') cerrar(true);
      else if (e.key === 'Escape') cerrar(false);
      e.stopPropagation();
    });
    input.addEventListener('blur', () => cerrar(true));
  }

  // --- Panel de configuración ---
  let panel = null;

  function numField(key, label, min, max, unidad) {
    return `<label class="pomo-field"><span>${label}</span>
      <span class="pomo-num"><input type="number" data-key="${key}" min="${min}" max="${max}" step="1" value="${settings[key]}" inputmode="numeric"><em>${unidad}</em></span></label>`;
  }

  function chkField(key, label) {
    return `<label class="pomo-check"><input type="checkbox" data-key="${key}" ${settings[key] ? 'checked' : ''}><span>${label}</span></label>`;
  }

  function construirPanel() {
    panel = document.createElement('div');
    panel.className = 'pomo-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Configuración del Pomodoro');
    panel.hidden = true;
    panel.innerHTML = `
      <div class="pomo-panel-head"><strong>⚙️ Pomodoro</strong><button class="pomo-btn" data-act="close" aria-label="Cerrar">✕</button></div>
      <div class="pomo-presets">${PRESETS.map((p, i) => `<button class="pomo-chip" data-preset="${i}">${p.nombre}</button>`).join('')}</div>
      <div class="pomo-grid">
        ${numField('work', 'Foco', 1, 180, 'min')}
        ${numField('shortBreak', 'Descanso corto', 1, 60, 'min')}
        ${numField('longBreak', 'Descanso largo', 1, 120, 'min')}
        ${numField('longEvery', 'Largo cada', 2, 12, 'pomodoros')}
      </div>
      <div class="pomo-checks">
        ${chkField('autoBreak', 'Arrancar el descanso automáticamente')}
        ${chkField('autoWork', 'Arrancar el siguiente pomodoro automáticamente')}
        ${chkField('sound', 'Alarma sonora al terminar')}
      </div>
      <div class="pomo-panel-foot">
        <button class="pomo-chip" data-act="test">🔔 Probar alarma</button>
        <button class="pomo-chip" data-act="defaults">Restaurar valores</button>
      </div>
      <small class="pomo-hint">Tip: con el reloj en pausa, hacé clic sobre el tiempo para editarlo (ej. 12 o 07:30).</small>`;
    document.body.appendChild(panel);

    panel.addEventListener('click', (e) => {
      const t = e.target.closest('button');
      if (!t) return;
      if (t.dataset.act === 'close') cerrarPanel();
      else if (t.dataset.act === 'test') playAlarmSound();
      else if (t.dataset.act === 'defaults') aplicarSettings({ ...DEFAULT_POMO_SETTINGS });
      else if (t.dataset.preset !== undefined) aplicarSettings({ ...settings, ...PRESETS[Number(t.dataset.preset)] });
    });
    panel.addEventListener('change', (e) => {
      const inp = e.target.closest('input[data-key]');
      if (!inp) return;
      const key = inp.dataset.key;
      const nuevo = { ...settings, [key]: inp.type === 'checkbox' ? inp.checked : Number(inp.value) };
      aplicarSettings(nuevo);
    });
  }

  function refrescarCampos() {
    if (!panel) return;
    panel.querySelectorAll('input[data-key]').forEach((inp) => {
      if (inp.type === 'checkbox') inp.checked = !!settings[inp.dataset.key];
      else inp.value = settings[inp.dataset.key];
    });
  }

  function aplicarSettings(nuevos) {
    const anterior = durationOf(state.mode);
    settings = sanitizePomoSettings(nuevos);
    savePomodoroSettings(settings);
    // Si el reloj está en pausa y sin tocar, adopta la nueva duración de la fase actual.
    if (!state.isRunning && state.timeLeft === anterior) {
      state.timeLeft = durationOf(state.mode);
      save();
    }
    refrescarCampos();
    updateUI();
  }

  function posicionarPanel() {
    const r = widget.getBoundingClientRect();
    panel.style.top = (r.bottom + 8) + 'px';
    const ancho = Math.min(340, window.innerWidth - 16);
    panel.style.width = ancho + 'px';
    panel.style.left = Math.max(8, Math.min(window.innerWidth - ancho - 8, r.right - ancho)) + 'px';
  }

  function abrirPanel() {
    if (!panel) construirPanel();
    refrescarCampos();
    posicionarPanel();
    panel.hidden = false;
    settingsBtn.setAttribute('aria-expanded', 'true');
  }

  function cerrarPanel() {
    if (!panel) return;
    panel.hidden = true;
    settingsBtn.setAttribute('aria-expanded', 'false');
  }

  settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (panel && !panel.hidden) cerrarPanel(); else abrirPanel();
  });
  document.addEventListener('click', (e) => {
    if (panel && !panel.hidden && !panel.contains(e.target) && !widget.contains(e.target)) cerrarPanel();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarPanel(); });
  window.addEventListener('resize', () => { if (panel && !panel.hidden) posicionarPanel(); });

  // --- Eventos ---
  startBtn.addEventListener('click', () => { if (state.isRunning) pauseTimer(); else startTimer(); });
  resetBtn.addEventListener('click', resetPhase);
  if (skipBtn) skipBtn.addEventListener('click', skipPhase);
  display.addEventListener('click', editarTiempo);
  if (countDecBtn) countDecBtn.addEventListener('click', () => setCount(state.completedCount - 1));
  if (countIncBtn) countIncBtn.addEventListener('click', () => setCount(state.completedCount + 1));
  if (countResetBtn) countResetBtn.addEventListener('click', () => setCount(0));

  // Botón de prueba en desarrollo (si existe)
  const finishDevBtn = $('pomo-finish-dev-btn');
  if (finishDevBtn) {
    finishDevBtn.addEventListener('click', () => {
      state.timeLeft = 1;
      state.targetEndTime = Date.now() + 1000;
      save();
      updateUI();
      if (!state.isRunning) startTimer();
    });
  }

  save();
  updateUI();
}
