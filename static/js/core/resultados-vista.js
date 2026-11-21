// core/resultados-vista.js — pestaña separada con los "resultados clave" de un tema.
//
//   resultados.html?m=<id-materia>&p=<id-pagina>[#r-<n>]
//
// Igual que el machete, pero por tema: carga el manifiesto de la materia, arma un encabezado con el contexto
// (unidad y tema), un índice lateral con scroll-spy y la lista de tarjetas (las mismas del pie del tema).

import { buscarMateria, MATERIA_POR_DEFECTO } from '../../materias/registry.js';
import { crearPlan } from './materia.js';
import { configurarGlosario, iniciarGlosario } from '../utils/glosario.js';
import { crearTarjetaResultado, alternarTodos, etiquetaAlternar } from '../utils/resultados-cards.js';
import { el, typeset } from '../utils/dom.js';

const $ = (id) => document.getElementById(id);

function mostrarError(msg, hrefVolver = 'index.html#materias') {
  $('rv-side').hidden = true;
  $('rv-main').innerHTML = '';
  $('rv-main').appendChild(el('div', { class: 'rv-error' }, [
    el('p', { text: msg }),
    el('a', { class: 'btn', href: hrefVolver }, '← Volver a la app'),
  ]));
  $('rv-unidad').textContent = '';
}

async function iniciar() {
  const qs = new URLSearchParams(location.search);
  const id = qs.get('m') || MATERIA_POR_DEFECTO;
  const pagina = qs.get('p');
  const meta = buscarMateria(id);
  if (!meta || meta.estado !== 'activa') return mostrarError('Materia no encontrada.');

  let manifiesto;
  try {
    manifiesto = (await meta.cargar()).default;
  } catch (e) {
    console.error(e);
    return mostrarError('No se pudo cargar la materia.');
  }

  const plan = crearPlan({ unidades: manifiesto.unidades, herramientas: manifiesto.herramientas });
  const volver = `index.html#${manifiesto.id}/${pagina || 'inicio'}`;
  const lista = manifiesto.resultados?.[pagina];
  if (!pagina || !lista || !lista.length) {
    return mostrarError('Este tema no tiene resultados clave para mostrar.', `index.html#${manifiesto.id}/inicio`);
  }

  configurarGlosario(manifiesto.glosario);
  iniciarGlosario();

  const unidad = plan.unidadDePagina(pagina);
  const tema = unidad?.paginas.find((p) => p.id === pagina);
  const tituloTema = tema?.titulo || plan.PAGE_TITLES[pagina] || pagina;
  const color = unidad?.color || manifiesto.color || '#5b8cff';
  document.documentElement.style.setProperty('--unit', color);
  document.title = `Resultados clave · ${tituloTema} — ${manifiesto.nombre}`;

  // ---- Encabezado --------------------------------------------------------
  $('rv-logo').textContent = manifiesto.icono || '∑';
  $('rv-materia').textContent = manifiesto.nombre;
  $('rv-unidad').textContent = unidad ? `${unidad.etiqueta || unidad.num} · ${unidad.titulo}` : 'Resultados clave';
  $('rv-back').href = volver;
  $('rv-back-brand').href = volver;

  // ---- Tarjetas ----------------------------------------------------------
  const btnToggle = $('rv-toggle');
  const actualizar = () => { btnToggle.textContent = etiquetaAlternar(items); };
  const items = lista.map((r, i) => crearTarjetaResultado(r, { id: 'r-' + (i + 1), onCambio: actualizar }));

  const conDesglose = items.filter((d) => d._setAbierto).length;
  const hero = el('section', { class: 'rv-hero' }, [
    el('div', { class: 'rv-hero-ic', text: tema?.ic || unidad?.ic || '📌' }),
    el('div', { class: 'rv-hero-txt' }, [
      el('div', { class: 'rv-kicker', text: 'Resultados clave' }),
      el('h1', { text: tituloTema }),
      tema?.desc ? el('p', { class: 'rv-desc', text: tema.desc }) : null,
      el('div', { class: 'rv-chips' }, [
        el('span', { class: 'rv-chip', text: `${items.length} resultado${items.length === 1 ? '' : 's'}` }),
        conDesglose ? el('span', { class: 'rv-chip', text: `${conDesglose} con demostración o ejemplo` }) : null,
      ]),
    ]),
  ]);
  const ayuda = el('p', { class: 'rv-help', html:
    'Tocá el <strong>+</strong> (o el título) de un resultado para ver la <strong>demostración</strong> y un '
    + '<strong>ejemplo de uso paso a paso</strong>. Los términos <span class="term-demo">subrayados</span> '
    + 'muestran su definición formal al hacer clic.' });
  const listaEl = el('div', { class: 'rv-list' }, items);

  // ---- Anterior / siguiente tema con resultados --------------------------
  const conResultados = plan.PAGINAS_TEORIA.filter((p) => manifiesto.resultados?.[p]?.length);
  const pos = conResultados.indexOf(pagina);
  const vecino = (p, flecha) => {
    const t = plan.PAGE_TITLES[p];
    return el('a', {
      class: 'rv-vecino' + (flecha === '←' ? ' prev' : ' next'),
      href: `resultados.html?m=${encodeURIComponent(manifiesto.id)}&p=${encodeURIComponent(p)}`,
    }, [
      el('small', { text: flecha === '←' ? '← Tema anterior' : 'Tema siguiente →' }),
      el('span', { text: t }),
    ]);
  };
  const pie = el('nav', { class: 'rv-vecinos', 'aria-label': 'Otros temas' }, [
    pos > 0 ? vecino(conResultados[pos - 1], '←') : el('span'),
    pos >= 0 && pos < conResultados.length - 1 ? vecino(conResultados[pos + 1], '→') : el('span'),
  ]);

  const main = $('rv-main');
  main.innerHTML = '';
  main.append(hero, ayuda, listaEl, pie);

  // ---- Índice lateral con scroll-spy ------------------------------------
  const toc = $('rv-toc');
  toc.innerHTML = '';
  const enlaces = items.map((it, i) => {
    const a = el('a', { href: '#' + it.id, class: 'rv-toc-link' }, [
      el('span', { class: 'rv-toc-n', text: String(i + 1).padStart(2, '0') }),
      el('span', { class: 'rv-toc-t', html: lista[i].n }),
    ]);
    toc.appendChild(a);
    return a;
  });
  $('rv-side').hidden = false;

  const marcar = (idx) => enlaces.forEach((a, i) => {
    a.classList.toggle('active', i === idx);
    if (i === idx) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  });
  if ('IntersectionObserver' in window) {
    const visibles = new Set();
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        const i = items.indexOf(en.target);
        if (en.isIntersecting) visibles.add(i); else visibles.delete(i);
      });
      if (visibles.size) marcar(Math.min(...visibles));
    }, { rootMargin: '-90px 0px -55% 0px' });
    items.forEach((it) => obs.observe(it));
  }
  toc.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    const dest = document.getElementById(a.getAttribute('href').slice(1));
    dest?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', a.getAttribute('href'));
  });

  // ---- Acciones ----------------------------------------------------------
  btnToggle.hidden = conDesglose === 0;
  btnToggle.addEventListener('click', () => { alternarTodos(items); actualizar(); });
  $('rv-print').hidden = false;
  $('rv-print').addEventListener('click', () => window.print());

  // Al imprimir se despliega todo; al terminar se restauran los estados previos.
  let previos = null;
  window.addEventListener('beforeprint', () => {
    previos = items.map((d) => (d._setAbierto ? d._estaAbierto() : null));
    items.forEach((d) => d._setAbierto?.(true));
  });
  window.addEventListener('afterprint', () => {
    if (!previos) return;
    items.forEach((d, i) => { if (d._setAbierto) d._setAbierto(previos[i]); });
    previos = null;
    actualizar();
  });

  actualizar();
  typeset(main);
  typeset(toc);

  if (location.hash) {
    requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
  }
}

iniciar();
