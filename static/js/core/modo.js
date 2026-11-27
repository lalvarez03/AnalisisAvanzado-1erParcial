// core/modo.js — los dos "mundos" de la app: Teóricas y Prácticas.
//
// El modo vive en <body data-modo="teoria|practica">: el CSS cambia la paleta con ese atributo,
// y navigation.js reconstruye el menú lateral según el modo. Es una preferencia global (no por materia).

export const MODOS = {
  teoria: { id: 'teoria', etiqueta: 'Teóricas', ic: '📖', home: 'inicio' },
  practica: { id: 'practica', etiqueta: 'Prácticas', ic: '✏️', home: 'practicas' },
};

const MODO_KEY = 'aa_modo';
const oyentes = new Set();
let actual = null;

function leerGuardado() {
  try {
    const v = localStorage.getItem(MODO_KEY);
    return MODOS[v] ? v : 'teoria';
  } catch { return 'teoria'; }
}

export function getModo() {
  if (!actual) actual = leerGuardado();
  return actual;
}

/** Cambia de modo (idempotente). Avisa a los oyentes solo si realmente cambió. */
export function setModo(modo) {
  if (!MODOS[modo]) return;
  const cambio = modo !== getModo();
  actual = modo;
  document.body.dataset.modo = modo;
  try { localStorage.setItem(MODO_KEY, modo); } catch { /* ignorar */ }
  syncSwitch();
  if (cambio) oyentes.forEach((fn) => fn(modo));
}

export function alCambiarModo(fn) { oyentes.add(fn); }

function syncSwitch() {
  const sw = document.getElementById('modo-switch');
  if (!sw) return;
  sw.dataset.modo = getModo();
  sw.querySelectorAll('[data-modo-btn]').forEach((b) => {
    const on = b.dataset.modoBtn === getModo();
    b.setAttribute('aria-selected', on ? 'true' : 'false');
    b.tabIndex = on ? 0 : -1;
  });
}

/**
 * Conecta el interruptor de la barra superior.
 * @param {(modo:string)=>void} irA  navega al menú principal del modo elegido.
 */
export function iniciarSwitchModo(irA) {
  document.body.dataset.modo = getModo();
  const sw = document.getElementById('modo-switch');
  if (!sw) return;
  const botones = [...sw.querySelectorAll('[data-modo-btn]')];
  botones.forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.modoBtn !== getModo()) irA(b.dataset.modoBtn);
  }));
  // Flechas ← → entre las dos pestañas (patrón de tabs accesible).
  sw.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const destino = e.key === 'ArrowLeft' ? 'teoria' : 'practica';
    if (destino !== getModo()) irA(destino);
    sw.querySelector(`[data-modo-btn="${destino}"]`)?.focus();
  });
  syncSwitch();
}
