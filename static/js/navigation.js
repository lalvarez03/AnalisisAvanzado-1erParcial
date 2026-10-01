// navigation.js — enrutado por hash y control de la barra lateral.

import { DEFAULT_PAGE, PAGE_ORDER, PAGE_TITLES } from './constants.js';
import { getState, markVisited, progressPercent, runCleanups } from './state.js';
import { typeset, el } from './utils/dom.js';

let pageRegistry = {};
let contentEl = null;

function updateActiveLink(page) {
  document.querySelectorAll('.nav-link').forEach((a) => {
    a.classList.toggle('active', a.dataset.page === page);
  });
  // Abrir automáticamente el grupo que contiene la página activa.
  const activeLink = document.querySelector('.nav-link.active');
  if (activeLink) {
    const group = activeLink.closest('.nav-group');
    if (group) setGroupCollapsed(group, false);
  }
}

// --- Grupos colapsables del nav ---
const NAV_STATE_KEY = 'aa_nav_collapsed';

function loadCollapsed() {
  try { return new Set(JSON.parse(localStorage.getItem(NAV_STATE_KEY) || '[]')); }
  catch { return new Set(); }
}
function saveCollapsed(set) {
  try { localStorage.setItem(NAV_STATE_KEY, JSON.stringify([...set])); } catch { /* ignore */ }
}

function setGroupCollapsed(group, collapsed) {
  group.classList.toggle('collapsed', collapsed);
  const btn = group.querySelector('.nav-group-title');
  if (btn) btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
}

function initCollapsibleGroups() {
  const collapsed = loadCollapsed();
  const groups = [...document.querySelectorAll('.nav-group')];
  groups.forEach((group, i) => {
    const title = group.querySelector('.nav-group-title');
    if (!title) return;
    const key = title.textContent.trim() || ('g' + i);
    group.dataset.groupKey = key;
    // estado inicial según localStorage
    setGroupCollapsed(group, collapsed.has(key));
    // hacer el título interactivo
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

function pageNav(page) {
  // Botones anterior / siguiente al pie de cada página.
  const idx = PAGE_ORDER.indexOf(page);
  const wrap = el('div', {
    class: 'controls',
    style: 'justify-content: space-between; margin-top: 40px; border-top: 1px solid var(--border); padding-top: 20px;',
  });
  const prev = PAGE_ORDER[idx - 1];
  const next = PAGE_ORDER[idx + 1];
  if (prev) {
    wrap.appendChild(el('button', {
      class: 'btn ghost',
      onClick: () => { location.hash = prev; },
    }, '← ' + PAGE_TITLES[prev]));
  } else { wrap.appendChild(el('span')); }
  if (next) {
    wrap.appendChild(el('button', {
      class: 'btn',
      onClick: () => { location.hash = next; },
    }, PAGE_TITLES[next] + ' →'));
  } else { wrap.appendChild(el('span')); }
  return wrap;
}

function render(page) {
  runCleanups();
  const renderer = pageRegistry[page] || pageRegistry[DEFAULT_PAGE];
  const resolved = pageRegistry[page] ? page : DEFAULT_PAGE;

  contentEl.innerHTML = '';
  try {
    renderer(contentEl);
  } catch (e) {
    console.error('Error al renderizar la página', resolved, e);
    contentEl.appendChild(el('div', { class: 'callout warn', html:
      '<div class="tag">Error</div>No se pudo cargar esta sección. Revisá la consola.' }));
  }

  if (resolved !== 'inicio') contentEl.appendChild(pageNav(resolved));

  getState().currentPage = resolved;
  markVisited(resolved);
  updateActiveLink(resolved);
  updateProgress();
  typeset(contentEl);
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  closeSidebar();
}

function currentHashPage() {
  const p = (location.hash || '').replace(/^#/, '');
  return p || DEFAULT_PAGE;
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

export function initNavigation(registry) {
  pageRegistry = registry;
  contentEl = document.getElementById('content');

  window.addEventListener('hashchange', () => render(currentHashPage()));

  document.getElementById('menu-toggle')?.addEventListener('click', openSidebar);
  document.getElementById('sidebar-overlay')?.addEventListener('click', closeSidebar);

  initCollapsibleGroups();

  // Render inicial.
  render(currentHashPage());
  updateProgress();
}
