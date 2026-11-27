// navigation.js — capa superior: enrutado por hash, menú de materias y barra lateral de la materia activa.
//
// Rutas (location.hash):
//   (vacío) | #materias         → menú de materias (capa superior)
//   #<materia>/<pagina>         → página de una materia concreta, p. ej. #analisis-avanzado/sup-inf
//   #<pagina>                   → página de la materia activa (así linkean las páginas entre sí)
//
// Dos "mundos" dentro de cada materia (ver core/modo.js):
//   · Teóricas: inicio + temas de las unidades (definiciones, demostraciones, gráficas y resultados clave).
//   · Prácticas: menú 'practicas' + estudiar por práctica + ejercicios resueltos + asistente, segmentado por unidad.
// La página abierta decide el modo (plan().modoDePagina); el menú lateral y la paleta siguen al modo.
//
// Cada materia es un componente (static/materias/<id>/): este archivo no conoce ninguna en particular.

import { DEFAULT_PAGE } from './constants.js';
import { REGISTRO, MATERIA_POR_DEFECTO, buscarMateria } from '../materias/registry.js';
import { activarMateria, reactivarMateria, etiquetaParcial, materiaActiva, hayMateriaActiva, plan, claveMateria } from './core/materia.js';
import {
  getState, markVisited, progressPercent, runCleanups, recargarProgreso,
  toggleVisited, resetProgress,
} from './state.js';
import { typeset, el } from './utils/dom.js';
import { configurarGlosario, iniciarGlosario } from './utils/glosario.js';
import { crearTarjetaResultado, alternarTodos, etiquetaAlternar } from './utils/resultados-cards.js';
import { renderHub } from './core/hub.js';
import { renderInicio } from './core/paginas/inicio.js';
import { renderPracticas, practicasDeMateria, guiasSueltas } from './core/paginas/practicas.js';
import { renderEstudio } from './core/paginas/estudio.js';
import { renderGuia } from './core/paginas/guia.js';
import { renderFeedback } from './core/paginas/feedback.js';
import { MODOS, getModo, setModo, alCambiarModo, iniciarSwitchModo } from './core/modo.js';
import { EVENTO_CONFIG, aplicarConfigGlobal } from './core/config-usuario.js';
import { EVENTO_SELECCION, leerSeleccion, irAPractica } from './core/seleccion.js';
import { estructurarHoja } from './core/estructura.js';

const EVENTO_AJUSTES = 'aa:ajustes';
const MATERIA_ACTIVA_KEY = 'aa_materia_activa';
const GENERICAS = {
  inicio: renderInicio, practicas: renderPracticas, estudio: renderEstudio, guia: renderGuia, feedback: renderFeedback,
};

let contentEl = null;
let pageRegistry = {};
let tokenRuta = 0;                 // evita carreras si se navega mientras carga una materia
const modulos = new Map();         // id -> manifiesto ya importado

// ---------------------------------------------------------------------------
// Carga y activación de materias
// ---------------------------------------------------------------------------

/** Importa (una sola vez) el manifiesto de una materia del registro. */
export async function cargarManifiesto(id) {
  if (modulos.has(id)) return modulos.get(id);
  const meta = buscarMateria(id);
  if (!meta || meta.estado !== 'activa') return null;
  const mod = await meta.cargar();
  const manifiesto = mod.default;
  modulos.set(id, manifiesto);
  return manifiesto;
}

function materiaGuardada() {
  try {
    const id = localStorage.getItem(MATERIA_ACTIVA_KEY);
    if (id && buscarMateria(id)?.estado === 'activa') return id;
  } catch { /* ignore */ }
  return MATERIA_POR_DEFECTO;
}

async function asegurarMateria(id) {
  if (hayMateriaActiva() && materiaActiva().id === id) return true;
  const manifiesto = await cargarManifiesto(id);
  if (!manifiesto) return false;
  activarMateria(manifiesto);
  configurarGlosario(manifiesto.glosario);
  iniciarGlosario();
  recargarProgreso();
  pageRegistry = { ...GENERICAS, ...(manifiesto.paginas || {}) };
  try { localStorage.setItem(MATERIA_ACTIVA_KEY, id); } catch { /* ignore */ }
  reconstruirMenu();
  aplicarMarca(manifiesto);
  return true;
}

/** Marca de la barra superior (logo, título, subtítulo, machete) según la materia activa. */
function aplicarMarca(m) {
  document.documentElement.style.setProperty('--materia', m.color || '#5b8cff');
  // La marca de la barra superior es fija ("Estudio" → menú de materias); la materia se ve en la barra lateral.
  const mac = document.getElementById('machete-link');
  if (mac) {
    mac.hidden = !m.machete;
    mac.href = 'machete.html?m=' + encodeURIComponent(m.id);
  }
}

function modoHub(on) {
  document.body.classList.toggle('modo-hub', on);
  if (on) {
    document.title = 'Ñatos de Ciencias · Tus materias';
    closeSidebar();
  }
}

// ---------------------------------------------------------------------------
// Menú lateral (generado desde el plan de la materia activa; cambia según el modo)
// ---------------------------------------------------------------------------

/** Reconstruye el menú del modo actual y sus grupos colapsables. */
function reconstruirMenu() {
  buildSidebar();
  initCollapsibleGroups();
  syncProgressUI();
}

/** Botón superior del menú: lleva al menú principal del modo actual. */
function botonMenuModo(m, modo) {
  const esPractica = modo === 'practica';
  return el('a', {
    class: 'nav-materia', 'data-materia-inicio': '1', href: '#' + MODOS[modo].home,
    title: (esPractica ? 'Menú de Prácticas de ' : 'Menú de ') + m.nombre, style: `--unit:${m.color}`,
  }, [
    el('span', { class: 'nav-materia-ic', text: esPractica ? '✏️' : (m.icono || '∑') }),
    el('span', { class: 'nav-materia-txt' }, [
      el('strong', { text: m.nombre }),
      el('small', { text: esPractica ? 'Menú de prácticas' : 'Menú de la teoría' }),
    ]),
  ]);
}

function grupoHerramientas(lista, titulo, sigil) {
  const group = el('div', { class: 'nav-group nav-tools', style: '--unit:#9aa6c4' });
  group.appendChild(el('div', { class: 'nav-group-title' }, [
    el('span', { class: 'nav-num', text: sigil }),
    el('span', { class: 'nav-group-name', text: titulo }),
  ]));
  lista.forEach((h) => {
    group.appendChild(el('div', { class: 'nav-row nav-row-tool' }, [
      el('a', { class: 'nav-link', 'data-page': h.id, href: '#' + h.id }, h.ic + ' ' + h.titulo),
    ]));
  });
  return group;
}

function buildSidebar() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const modo = getModo();
  nav.innerHTML = '';
  nav.dataset.modo = modo;
  if (modo === 'practica') buildSidebarPractica(nav); else buildSidebarTeoria(nav);
}

// --- Teóricas: unidades con sus temas (checkbox de progreso) y atajo a los ejercicios de cada unidad ---
function buildSidebarTeoria(nav) {
  const m = materiaActiva();
  const { UNIDADES, HERRAMIENTAS } = plan();
  nav.appendChild(botonMenuModo(m, 'teoria'));

  let ultimoParcial = null;
  UNIDADES.forEach((u) => {
    const lp = etiquetaParcial(u.id);
    if (lp && lp !== ultimoParcial) { nav.appendChild(el('div', { class: 'nav-parcial', text: lp })); ultimoParcial = lp; }
    const group = el('div', { class: 'nav-group', style: `--unit:${u.color}`, 'data-unit': u.id });

    // Encabezado: solo título (colapsa el grupo). Los checks de grupo se quitaron.
    const rotulo = u.etiqueta || String(u.num);
    group.appendChild(el('div', { class: 'nav-group-head' }, [
      el('div', { class: 'nav-group-title' }, [
        el('span', { class: 'nav-num', text: rotulo }),
        el('span', { class: 'nav-group-name', text: u.titulo }),
      ]),
    ]));

    u.paginas.forEach((p) => {
      // Fila: checkbox de progreso + enlace al tema (el checkbox no va dentro del <a>).
      const check = el('button', {
        class: 'nav-check', type: 'button', role: 'checkbox', 'aria-checked': 'false',
        title: 'Marcar o desmarcar como recorrido', 'aria-label': 'Recorrido: ' + p.titulo,
      });
      check.addEventListener('click', () => { toggleVisited(p.id); onProgressChanged(); });
      group.appendChild(el('div', { class: 'nav-row', 'data-row': p.id }, [
        el('a', { class: 'nav-link', 'data-page': p.id, href: '#' + p.id }, p.titulo),
        check,
      ]));
    });

    nav.appendChild(group);
  });

  // Solo las herramientas que son de teoría o neutrales ("Extra"); las de práctica viven en el otro mundo.
  const deTeoria = HERRAMIENTAS.filter((h) => plan().modoDePagina(h.id) === 'teoria');
  const extra = HERRAMIENTAS.filter((h) => h.grupo === 'extra');
  if (deTeoria.length) nav.appendChild(grupoHerramientas(deTeoria, 'Herramientas', '★'));
  if (extra.length) nav.appendChild(grupoHerramientas(extra, 'Extra', '✦'));

  // Reiniciar todo el progreso de ESTA materia.
  const reset = el('button', { class: 'nav-reset', type: 'button', title: 'Desmarcar todos los temas de esta materia' }, '↺ Reiniciar progreso');
  reset.addEventListener('click', () => {
    if (!window.confirm('¿Desmarcar todos los temas recorridos de ' + m.nombre + '?')) return;
    resetProgress();
    onProgressChanged();
  });
  nav.appendChild(reset);
}

// --- Prácticas: un grupo por práctica/unidad, con "Estudiar" y "Ejercicios resueltos" ---
function buildSidebarPractica(nav) {
  const m = materiaActiva();
  const { HERRAMIENTAS } = plan();
  nav.appendChild(botonMenuModo(m, 'practica'));

  let ultimoParcial = null;
  practicasDeMateria(m).forEach(({ u, estudio, guia }) => {
    const lp = etiquetaParcial(u.id);
    if (lp && lp !== ultimoParcial) { nav.appendChild(el('div', { class: 'nav-parcial', text: lp })); ultimoParcial = lp; }
    const rotulo = u.etiqueta || String(u.num);
    const group = el('div', { class: 'nav-group', style: `--unit:${u.color}`, 'data-unit': u.id });
    group.appendChild(el('div', { class: 'nav-group-head' }, [
      el('div', { class: 'nav-group-title' }, [
        el('span', { class: 'nav-num', text: rotulo }),
        el('span', { class: 'nav-group-name', text: u.titulo }),
      ]),
    ]));
    if (estudio) group.appendChild(enlaceSeleccion('estudio', u.id, '🗺️ Estudiar ' + rotulo));
    if (guia) group.appendChild(enlaceSeleccion('guia', u.id, `📖 Ejercicios resueltos (${guia.datos.length})`));
    nav.appendChild(group);
  });

  const sueltas = guiasSueltas(m);
  if (sueltas.length) {
    const group = el('div', { class: 'nav-group', style: '--unit:#ffb454' });
    group.appendChild(el('div', { class: 'nav-group-title' }, [
      el('span', { class: 'nav-num', text: '📝' }),
      el('span', { class: 'nav-group-name', text: 'Parciales' }),
    ]));
    sueltas.forEach((g) => group.appendChild(enlaceSeleccion('guia', g.id, g.nombre)));
    nav.appendChild(group);
  }

  const herramientas = HERRAMIENTAS.filter((h) => !h.grupo && h.id !== 'estudio' && h.id !== 'guia'
    && plan().modoDePagina(h.id) === 'practica');
  const extra = HERRAMIENTAS.filter((h) => h.grupo === 'extra');
  if (herramientas.length) nav.appendChild(grupoHerramientas(herramientas, 'Herramientas', '★'));
  if (extra.length) nav.appendChild(grupoHerramientas(extra, 'Extra', '✦'));
}

/** Enlace del menú de prácticas que abre `estudio` o `guia` con una práctica ya elegida. */
function enlaceSeleccion(pagina, id, texto) {
  const a = el('a', { class: 'nav-link nav-sel', 'data-page': pagina, 'data-sel': id, href: '#' + pagina }, texto);
  a.addEventListener('click', (e) => { e.preventDefault(); irAPractica(pagina, id); });
  return a;
}

// Refleja el estado de "recorrido" en checkboxes, grupos, badge y (si está abierto) el inicio.
function syncProgressUI() {
  if (!hayMateriaActiva()) return;
  const visited = getState().visited;
  document.querySelectorAll('.nav-row[data-row]').forEach((row) => {
    const on = visited.has(row.dataset.row);
    row.classList.toggle('visited', on);
    row.querySelector('.nav-check')?.setAttribute('aria-checked', on ? 'true' : 'false');
  });
  plan().UNIDADES.forEach((u) => {
    const group = document.querySelector(`.nav-group[data-unit="${u.id}"]`);
    if (!group) return;
    const n = u.paginas.filter((p) => visited.has(p.id)).length;
    group.classList.toggle('all-done', n === u.paginas.length);
  });
  updateProgress();
}

function onProgressChanged() {
  syncProgressUI();
  if (getState().currentPage === 'inicio') {
    const y = contentEl.scrollTop;
    render('inicio');
    contentEl.scrollTop = y;
  }
}

function updateActiveLink(page) {
  document.querySelectorAll('.nav-link[data-page]').forEach((a) => {
    // Los enlaces de "estudio"/"guia" por práctica solo se resaltan si son la práctica elegida.
    const sel = a.dataset.sel;
    const on = a.dataset.page === page && (!sel || sel === leerSeleccion(page));
    a.classList.toggle('active', on);
  });
  document.querySelector('.nav-materia')?.classList.toggle('active', page === MODOS[getModo()].home);
  syncProgressUI();
  // Abrir automáticamente el grupo que contiene la página activa.
  const activeLink = document.querySelector('.nav-link.active');
  if (activeLink) {
    const group = activeLink.closest('.nav-group');
    if (group) setGroupCollapsed(group, false);
  }
}

// --- Grupos colapsables del nav (estado separado por modo) ---
const navKey = () => claveMateria('navCollapsed') + (getModo() === 'practica' ? ':practica' : '');

function loadCollapsed() {
  try { return new Set(JSON.parse(localStorage.getItem(navKey()) || '[]')); }
  catch { return new Set(); }
}
function saveCollapsed(set) {
  try { localStorage.setItem(navKey(), JSON.stringify([...set])); } catch { /* ignore */ }
}

function setGroupCollapsed(group, collapsed) {
  group.classList.toggle('collapsed', collapsed);
  const btn = group.querySelector('.nav-group-title');
  if (btn) btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
}

function initCollapsibleGroups() {
  // Primera vez (sin estado guardado): en Teóricas todo colapsado salvo el grupo de la página activa;
  // en Prácticas todo abierto (cada grupo tiene solo 2 enlaces).
  const primeraVez = localStorage.getItem(navKey()) === null;
  const colapsarTodo = primeraVez && getModo() === 'teoria';
  const collapsed = colapsarTodo
    ? new Set([...document.querySelectorAll('.nav-group-title')].map((t) => t.textContent.trim()))
    : loadCollapsed();
  const groups = [...document.querySelectorAll('#nav .nav-group')];
  groups.forEach((group, i) => {
    const title = group.querySelector('.nav-group-title');
    if (!title) return;
    const key = title.textContent.trim() || ('g' + i);
    group.dataset.groupKey = key;
    setGroupCollapsed(group, collapsed.has(key));
    title.setAttribute('role', 'button');
    title.setAttribute('tabindex', '0');
    const toggle = () => {
      const nowCollapsed = !group.classList.contains('collapsed');
      setGroupCollapsed(group, nowCollapsed);
      const s = loadCollapsed();
      if (nowCollapsed) s.add(key); else s.delete(key);
      saveCollapsed(s);
    };
    title.addEventListener('click', toggle);
    title.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
}

function updateProgress() {
  const badge = document.getElementById('progress-badge');
  if (badge) badge.textContent = progressPercent() + '%';
}

// ---------------------------------------------------------------------------
// Contenido de página
// ---------------------------------------------------------------------------

function pageNav(page) {
  // Botones anterior / siguiente al pie de cada tema de teoría (orden de las unidades de la materia).
  const { PAGINAS_TEORIA, PAGE_TITLES } = plan();
  const orden = ['inicio', ...PAGINAS_TEORIA];
  const idx = orden.indexOf(page);
  const wrap = el('div', {
    class: 'controls',
    style: 'justify-content: space-between; margin-top: 40px; border-top: 1px solid var(--border); padding-top: 20px;',
  });
  const prev = orden[idx - 1];
  const next = orden[idx + 1];
  if (prev) {
    wrap.appendChild(el('button', { class: 'btn ghost', onClick: () => { location.hash = prev; } }, '← ' + PAGE_TITLES[prev]));
  } else { wrap.appendChild(el('span')); }
  if (next) {
    wrap.appendChild(el('button', { class: 'btn', onClick: () => { location.hash = next; } }, PAGE_TITLES[next] + ' →'));
  } else {
    // Último tema de teoría: el siguiente paso natural es pasar al otro mundo.
    wrap.appendChild(el('button', { class: 'btn', onClick: () => { location.hash = MODOS.practica.home; } }, '✏️ Pasar a las Prácticas →'));
  }
  return wrap;
}

// Resultados clave del tema (manifiesto: `resultados`). Las tarjetas viven en utils/resultados-cards.js
// y se reutilizan en la pestaña separada (resultados.html).
function resultadosClave(page) {
  const lista = materiaActiva().resultados?.[page];
  if (!lista || !lista.length) return null;
  const u = plan().unidadDePagina(page);

  // "Desglosar" / "Contraer" según el estado actual de las tarjetas.
  const todos = el('button', { class: 'btn ghost', type: 'button' }, 'Desglosar');
  const actualizar = () => { todos.textContent = etiquetaAlternar(items); };
  const items = lista.map((r) => crearTarjetaResultado(r, { onCambio: actualizar }));
  todos.addEventListener('click', () => { alternarTodos(items); actualizar(); });

  // "Separar": abre estos mismos resultados en una pestaña propia.
  const separar = el('a', {
    class: 'btn ghost res-separar', target: '_blank', rel: 'noopener',
    href: `resultados.html?m=${encodeURIComponent(materiaActiva().id)}&p=${encodeURIComponent(page)}`,
    title: 'Abrir los resultados de este tema en otra pestaña',
  }, '↗ Separar');

  const wrap = el('section', { class: 'results', style: u ? `--unit:${u.color}` : '' }, [
    el('div', { class: 'results-head' }, [
      el('h2', { text: '📌 Resultados clave de este tema' }),
      el('div', { class: 'results-acciones' }, [todos, separar]),
    ]),
    el('p', { class: 'page-sub', html: 'Cada resultado muestra su título y su enunciado formal. Tocá el <strong>+</strong> (o el título) de un resultado para desglosar la <strong>demostración</strong> y un <strong>ejemplo de uso paso a paso</strong>. Los términos <span class="term-demo">subrayados</span> (en el enunciado, la demostración y el ejemplo) son clickeables: te muestran su definición formal.' }),
    ...items,
  ]);
  wrap.addEventListener('toggle', () => typeset(wrap), true);
  return wrap;
}

function render(page) {
  runCleanups();
  const { PAGE_TITLES, PAGINAS_TEORIA } = plan();
  // Rutas que ya no existen (p. ej. la vieja autoevaluación) se redirigen a su reemplazo.
  const destino = materiaActiva().redirecciones?.[page];
  if (destino) {
    history.replaceState(null, '', '#' + destino);
    page = destino;
  }
  const resolved = (pageRegistry[page] && (page in PAGE_TITLES)) ? page : DEFAULT_PAGE;
  const renderer = pageRegistry[resolved];

  // La página decide el mundo: si cambia de modo, se reconstruye el menú lateral (y cambia la paleta).
  const modoPagina = plan().modoDePagina(resolved);
  if (modoPagina) setModo(modoPagina);

  contentEl.innerHTML = '';
  try {
    renderer(contentEl);
  } catch (e) {
    console.error('Error al renderizar la página', resolved, e);
    contentEl.appendChild(el('div', { class: 'callout warn', html:
      '<div class="tag">Error</div>No se pudo cargar esta sección. Revisá la consola.' }));
  }

  const esTema = PAGINAS_TEORIA.includes(resolved);
  if (esTema && materiaActiva().estructura === 'secciones') {
    try { estructurarHoja(contentEl); } catch (e) { console.error('No se pudo estructurar la hoja', resolved, e); }
  }
  if (esTema) {
    const bloqueResultados = resultadosClave(resolved);
    if (bloqueResultados) contentEl.appendChild(bloqueResultados);
    contentEl.appendChild(pageNav(resolved));
  }

  getState().currentPage = resolved;
  markVisited(resolved);
  updateActiveLink(resolved);
  updateProgress();
  document.title = (resolved === 'inicio' ? '' : PAGE_TITLES[resolved] + ' · ') + materiaActiva().nombre;
  typeset(contentEl);
  // Scroll al tope: contentEl tiene overflow-y:auto, así que scrollea él (no window).
  // Se resetea en dos momentos: inmediatamente (evita flash) y en el siguiente frame
  // de layout (después de que el DOM se expanda con el contenido recién insertado).
  contentEl.scrollTop = 0;
  window.scrollTo(0, 0);
  requestAnimationFrame(() => {
    contentEl.scrollTop = 0;
    window.scrollTo(0, 0);
  });
  closeSidebar();
}

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------

/** @returns {{tipo:'hub'}|{tipo:'pagina', materia:string|null, pagina:string}} */
function parseHash() {
  const raw = (location.hash || '').replace(/^#\/?/, '');
  if (!raw || raw === 'materias') return { tipo: 'hub' };
  const [a, b] = raw.split('/');
  if (b !== undefined && buscarMateria(a)) return { tipo: 'pagina', materia: a, pagina: b || DEFAULT_PAGE };
  if (buscarMateria(a) && b === undefined) return { tipo: 'pagina', materia: a, pagina: DEFAULT_PAGE };
  return { tipo: 'pagina', materia: null, pagina: raw };
}

async function route() {
  const mi = ++tokenRuta;
  const r = parseHash();

  if (r.tipo === 'hub') {
    runCleanups();
    modoHub(true);
    getState().currentPage = null;
    contentEl.innerHTML = '';
    renderHub(contentEl, { onAbrir: abrirMateria, cargarManifiesto });
    contentEl.scrollTop = 0;
    return;
  }

  const id = r.materia || (hayMateriaActiva() ? materiaActiva().id : materiaGuardada());
  if (!(hayMateriaActiva() && materiaActiva().id === id)) {
    contentEl.innerHTML = '<p class="page-sub" style="margin-top:40px">Cargando materia…</p>';
  }
  const ok = await asegurarMateria(id);
  if (mi !== tokenRuta) return;                       // se navegó a otro lado mientras cargaba
  if (!ok) { location.hash = 'materias'; return; }
  modoHub(false);
  render(r.pagina);
}

/** Abre una materia desde el menú: va a su última página o, si es la primera vez, a su menú principal. */
function abrirMateria(id, pagina) {
  location.hash = id + '/' + (pagina || DEFAULT_PAGE);
}

// --- Sidebar móvil ---
function openSidebar() {
  document.getElementById('sidebar')?.classList.add('open');
  document.getElementById('sidebar-overlay')?.classList.add('show');
}
function closeSidebar() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebar-overlay')?.classList.remove('show');
}

export function initNavigation() {
  contentEl = document.getElementById('content');

  window.addEventListener('hashchange', route);
  document.getElementById('menu-toggle')?.addEventListener('click', openSidebar);
  document.getElementById('sidebar-overlay')?.addEventListener('click', closeSidebar);

  // Interruptor Teóricas ⇄ Prácticas: lleva al menú principal del mundo elegido.
  iniciarSwitchModo((modo) => { location.hash = MODOS[modo].home; });
  alCambiarModo(() => { if (hayMateriaActiva()) { reconstruirMenu(); updateActiveLink(getState().currentPage); } });
  // Ajustes de la materia (orden de unidades / agrupación por parcial): se recalcula el plan y se redibuja.
  window.addEventListener(EVENTO_AJUSTES, (e) => {
    if (!hayMateriaActiva()) return;
    if (e.detail?.id && e.detail.id !== materiaActiva().id) return;   // era otra materia: se aplica al abrirla
    reactivarMateria();
    reconstruirMenu();
    // Si se está viendo el menú de materias no hay nada que redibujar en el contenido.
    if (!document.body.classList.contains('modo-hub')) {
      const y = contentEl.scrollTop;
      render(getState().currentPage || 'inicio');
      contentEl.scrollTop = y;
    }
  });
  // Preferencias globales (Pomodoro, avance, materias visibles).
  window.addEventListener(EVENTO_CONFIG, aplicarConfigGlobal);
  aplicarConfigGlobal();
  // Cambiar de práctica/guía desde las pestañas de la página actualiza el resaltado del menú.
  window.addEventListener(EVENTO_SELECCION, () => { if (hayMateriaActiva()) updateActiveLink(getState().currentPage); });

  route();
}

export { REGISTRO };
