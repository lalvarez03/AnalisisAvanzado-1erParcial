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

  // Render inicial.
  render(currentHashPage());
  updateProgress();
}
