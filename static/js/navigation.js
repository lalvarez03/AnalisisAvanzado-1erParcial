// navigation.js — capa superior: enrutado por hash, menú de materias y barra lateral de la materia activa.
//
// Rutas (location.hash):
//   (vacío) | #materias         → menú de materias (capa superior)
//   #<materia>/<pagina>         → página de una materia concreta, p. ej. #analisis-avanzado/sup-inf
//   #<pagina>                   → página de la materia activa (así linkean las páginas entre sí)
//
// Cada materia es un componente (static/materias/<id>/): este archivo no conoce ninguna en particular.

import { DEFAULT_PAGE } from './constants.js';
import { REGISTRO, MATERIA_POR_DEFECTO, buscarMateria } from '../materias/registry.js';
import { activarMateria, materiaActiva, hayMateriaActiva, plan, claveMateria } from './core/materia.js';
import {
  getState, markVisited, progressPercent, runCleanups, recargarProgreso,
  toggleVisited, resetProgress,
} from './state.js';
import { typeset, el } from './utils/dom.js';
import { solvedExercise } from './utils/resueltos.js';
import { configurarGlosario, marcarTerminos, iniciarGlosario } from './utils/glosario.js';
import { renderHub } from './core/hub.js';
import { renderInicio } from './core/paginas/inicio.js';
import { renderEstudio } from './core/paginas/estudio.js';
import { renderGuia } from './core/paginas/guia.js';
import { renderFeedback } from './core/paginas/feedback.js';

const MATERIA_ACTIVA_KEY = 'aa_materia_activa';
const GENERICAS = { inicio: renderInicio, estudio: renderEstudio, guia: renderGuia, feedback: renderFeedback };

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
  buildSidebar();
  initCollapsibleGroups();
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
    document.title = 'Materias — Estudio';
    closeSidebar();
  }
}

// ---------------------------------------------------------------------------
// Menú lateral (generado desde el plan de la materia activa)
// ---------------------------------------------------------------------------

function buildSidebar() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const m = materiaActiva();
  const { UNIDADES, HERRAMIENTAS } = plan();
  nav.innerHTML = '';

  // Botón de la materia: lleva al menú de la materia (el menú de materias es la marca "Estudio" de arriba).
  nav.appendChild(el('a', { class: 'nav-materia', 'data-materia-inicio': '1', href: '#inicio', title: 'Menú de ' + m.nombre, style: `--unit:${m.color}` }, [
    el('span', { class: 'nav-materia-ic', text: m.icono || '∑' }),
    el('span', { class: 'nav-materia-txt' }, [el('strong', { text: m.nombre }), el('small', { text: 'Menú de la materia' })]),
  ]));

  UNIDADES.forEach((u) => {
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
        check,
        el('a', { class: 'nav-link', 'data-page': p.id, href: '#' + p.id }, p.titulo),
      ]));
    });

    if ((m.estudio || []).some((e) => e.id === u.id)) {
      const ej = el('a', { class: 'nav-link nav-ej', href: '#estudio', title: 'Estudiar ' + rotulo }, '🗺️ Estudiar ' + rotulo);
      ej.addEventListener('click', (e) => {
        e.preventDefault();
        try { localStorage.setItem(claveMateria('practica'), u.id); } catch { /* ignore */ }
        // Siempre re-renderizamos 'estudio' con la práctica correcta, aunque ya estemos en esa página.
        render('estudio');
        location.hash = 'estudio';
      });
      group.appendChild(ej);
    }
    nav.appendChild(group);
  });

  const herramientasPrincipales = HERRAMIENTAS.filter((h) => !h.grupo);
  const herramientasExtra      = HERRAMIENTAS.filter((h) => h.grupo === 'extra');

  function buildToolGroup(lista, titulo, sigil) {
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

  nav.appendChild(buildToolGroup(herramientasPrincipales, 'Práctica y repaso', '★'));
  if (herramientasExtra.length) {
    nav.appendChild(buildToolGroup(herramientasExtra, 'Extra', '✦'));
  }

  // Reiniciar todo el progreso de ESTA materia.
  const reset = el('button', { class: 'nav-reset', type: 'button', title: 'Desmarcar todos los temas de esta materia' }, '↺ Reiniciar progreso');
  reset.addEventListener('click', () => {
    if (!window.confirm('¿Desmarcar todos los temas recorridos de ' + m.nombre + '?')) return;
    resetProgress();
    onProgressChanged();
  });
  nav.appendChild(reset);
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
    a.classList.toggle('active', a.dataset.page === page);
  });
  document.querySelector('.nav-materia')?.classList.toggle('active', page === 'inicio');
  syncProgressUI();
  // Abrir automáticamente el grupo que contiene la página activa.
  const activeLink = document.querySelector('.nav-link.active');
  if (activeLink) {
    const group = activeLink.closest('.nav-group');
    if (group) setGroupCollapsed(group, false);
  }
}

// --- Grupos colapsables del nav ---
const navKey = () => claveMateria('navCollapsed');

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
  // Primera vez (sin estado guardado): todo colapsado; se abre solo el grupo de la página activa.
  const primeraVez = localStorage.getItem(navKey()) === null;
  const collapsed = primeraVez
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
  // Botones anterior / siguiente al pie de cada página (orden del plan de la materia).
  const { PAGE_ORDER, PAGE_TITLES } = plan();
  const idx = PAGE_ORDER.indexOf(page);
  const wrap = el('div', {
    class: 'controls',
    style: 'justify-content: space-between; margin-top: 40px; border-top: 1px solid var(--border); padding-top: 20px;',
  });
  const prev = PAGE_ORDER[idx - 1];
  const next = PAGE_ORDER[idx + 1];
  if (prev) {
    wrap.appendChild(el('button', { class: 'btn ghost', onClick: () => { location.hash = prev; } }, '← ' + PAGE_TITLES[prev]));
  } else { wrap.appendChild(el('span')); }
  if (next) {
    wrap.appendChild(el('button', { class: 'btn', onClick: () => { location.hash = next; } }, PAGE_TITLES[next] + ' →'));
  } else { wrap.appendChild(el('span')); }
  return wrap;
}

// Checklist de teoremas, lemas y propiedades del tema (manifiesto: `resultados`).
function resultadosClave(page) {
  const lista = materiaActiva().resultados?.[page];
  if (!lista || !lista.length) return null;
  const u = plan().unidadDePagina(page);
  const items = lista.map((r) => {
    // Esquema: d = definición formal · e = enunciado · p = demostración · x = ejemplo de uso paso a paso.
    // Visible: el enunciado. Dentro del botón "Desglose": definición (siempre visible), demostración y ejemplo.
    const enun = el('div', { class: 'res-enun', html: '<div class="res-lbl">📌 Enunciado</div>' + r.e });
    marcarTerminos(enun);   // el enunciado formal está siempre visible, con sus términos clickeables
    const partes = [enun];
    let desglose = null;
    if (r.p || r.x) {
      desglose = el('details', { class: 'res-sub res-desglose' }, [
        el('summary', {}, '🔎 Desglose: demostración y ejemplo'),
      ]);
      let armado = false;
      // El contenido se construye recién al abrirlo (evita crear cientos de componentes al cargar la página).
      desglose.addEventListener('toggle', () => {
        if (!desglose.open || armado) return;
        armado = true;
        const cuerpoD = el('div', { class: 'res-desglose-body' });
        if (r.p) {
          const prueba = el('div', { class: 'res-sub-body res-proof-d', html: '<div class="res-lbl">🧩 Demostración</div>' + r.p });
          marcarTerminos(prueba);
          cuerpoD.appendChild(prueba);
        }
        if (r.x) {
          const ej = el('div', { class: 'res-ex-d' }, [el('div', { class: 'res-lbl', text: '✏️ Ejemplo de uso, paso a paso' })]);
          ej.appendChild(solvedExercise({ fuente: 'Ejemplo de uso · ' + r.n, ...r.x }));
          marcarTerminos(ej);   // antes de que MathJax procese las fórmulas
          cuerpoD.appendChild(ej);
        }
        desglose.appendChild(cuerpoD);
        typeset(desglose);
      });
      partes.push(desglose);
    }
    // Tarjeta siempre visible: título + enunciado formal; el único desplegable es el desglose.
    const cuerpo = el('div', { class: 'res-body' }, partes);
    const item = el('div', { class: 'res-item res-card' }, [
      el('div', { class: 'res-card-head' }, [
        el('span', { class: 'res-name', html: r.n }),
        r.ref ? el('span', { class: 'res-ref', text: r.ref }) : null,
      ]),
      cuerpo,
    ]);
    item._desglose = desglose;
    return item;
  });
  const todos = el('button', { class: 'btn ghost', type: 'button' }, 'Abrir / cerrar todos los desgloses');
  todos.addEventListener('click', () => {
    const abrir = items.some((d) => d._desglose && !d._desglose.open);
    items.forEach((d) => { if (d._desglose) d._desglose.open = abrir; });
    typeset(wrap);
  });
  const wrap = el('section', { class: 'results', style: u ? `--unit:${u.color}` : '' }, [
    el('div', { class: 'results-head' }, [
      el('h2', { text: '📌 Resultados clave de este tema' }),
      todos,
    ]),
    el('p', { class: 'page-sub', html: 'Cada resultado muestra su título y su enunciado formal. Abrí el <strong>desglose</strong> para ver la <strong>demostración</strong> y un <strong>ejemplo de uso paso a paso</strong>. Los términos <span class="term-demo">subrayados</span> (en el enunciado, la demostración y el ejemplo) son clickeables: te muestran su definición formal.' }),
    ...items,
  ]);
  wrap.addEventListener('toggle', () => typeset(wrap), true);
  return wrap;
}

function render(page) {
  runCleanups();
  const { PAGE_TITLES } = plan();
  const resolved = (pageRegistry[page] && (page in PAGE_TITLES)) ? page : DEFAULT_PAGE;
  const renderer = pageRegistry[resolved];

  contentEl.innerHTML = '';
  try {
    renderer(contentEl);
  } catch (e) {
    console.error('Error al renderizar la página', resolved, e);
    contentEl.appendChild(el('div', { class: 'callout warn', html:
      '<div class="tag">Error</div>No se pudo cargar esta sección. Revisá la consola.' }));
  }

  const bloqueResultados = resultadosClave(resolved);
  if (bloqueResultados) contentEl.appendChild(bloqueResultados);

  if (resolved !== 'inicio') contentEl.appendChild(pageNav(resolved));

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

  route();
}

export { REGISTRO };
