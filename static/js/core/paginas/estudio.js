// core/paginas/estudio.js — espacio de estudio por guía de ejercicios (genérico).
// Lee de la materia activa: `estudio` (recetas, mapa, errores) y `guias` (ejercicios resueltos),
// emparejados por `id`.

import { el } from '../../utils/dom.js';
import { pageHeader, callout } from '../../utils/page.js';
import { solvedExercise } from '../../utils/resueltos.js';
import { materiaActiva, claveMateria } from '../materia.js';

function typesetNode(node) {
  if (window.MathJax?.typesetPromise) {
    requestAnimationFrame(() => window.MathJax.typesetPromise([node]).catch(() => {}));
  }
}

const lista = (items) => el('ul', {}, items.map((t) => el('li', { html: t })));

function seccionPractica(m, p) {
  const frag = el('div', {});

  frag.appendChild(el('h2', { text: p.titulo }));
  frag.appendChild(el('p', { class: 'page-sub', html: '<strong>Teoría de referencia:</strong> ' + p.teoria }));
  if (p.paginas?.length) {
    frag.appendChild(el('div', { class: 'controls' }, p.paginas.map(([id, nombre]) =>
      el('a', { class: 'btn ghost', href: '#' + id }, '📖 ' + nombre))));
  }

  frag.appendChild(callout('tip', 'La idea en una mirada', p.resumen));

  frag.appendChild(el('h3', { text: '1 · Qué tenés que saber antes de empezar' }));
  frag.appendChild(lista(p.saber || []));

  frag.appendChild(el('h3', { text: '2 · Recetas: cómo se ataca cada tipo de ejercicio' }));
  (p.recetas || []).forEach(([titulo, cuerpo]) => frag.appendChild(callout('', titulo, cuerpo)));

  frag.appendChild(el('h3', { text: '3 · Mapa de ejercicios' }));
  const tbl = el('table', { class: 'tbl' });
  tbl.innerHTML = '<tr><th>Ej.</th><th>Tema</th><th>Técnica</th><th>Teoría previa</th></tr>'
    + (p.mapa || []).map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('');
  frag.appendChild(tbl);

  frag.appendChild(el('h3', { text: '4 · Errores comunes' }));
  frag.appendChild(callout('warn', 'Ojo con', '<ul>' + (p.errores || []).map((e) => `<li>${e}</li>`).join('') + '</ul>'));

  frag.appendChild(el('h3', { text: '5 · Practicar: ejercicios resueltos paso a paso' }));
  const datos = (m.guias || []).find((g) => g.id === p.id)?.datos || [];
  const holder = el('div', {});
  const rotuloAbrir = `▶ Abrir los ${datos.length} ejercicios resueltos`;
  const btn = el('button', { class: 'btn' }, rotuloAbrir);
  let abierto = false;
  btn.addEventListener('click', () => {
    abierto = !abierto;
    if (abierto && !holder.children.length) datos.forEach((cfg) => holder.appendChild(solvedExercise(cfg)));
    holder.style.display = abierto ? 'block' : 'none';
    btn.textContent = abierto ? '▼ Ocultar ejercicios' : rotuloAbrir;
    if (abierto) typesetNode(holder);
  });
  if (!datos.length) { btn.disabled = true; btn.textContent = 'Todavía no hay ejercicios resueltos'; }
  frag.appendChild(el('div', { class: 'controls' }, [btn]));
  holder.style.display = 'none';
  frag.appendChild(holder);

  return frag;
}

export function renderEstudio(root) {
  const m = materiaActiva();
  const KEY = claveMateria('practica');
  const estudio = m.estudio || [];

  root.appendChild(pageHeader(
    'Estudiar por práctica',
    'Un espacio por cada guía de ejercicios de <strong>' + m.nombre + '</strong>: qué teoría necesitás, '
    + 'la receta de cada tipo de ejercicio, un mapa que conecta cada ejercicio con su teoría y los ejercicios resueltos paso a paso.'
  ));

  if (!estudio.length) {
    root.appendChild(callout('warn', 'Sin contenido todavía', 'Esta materia aún no tiene guías de estudio cargadas.'));
    return;
  }

  root.appendChild(callout('tip', 'Cómo estudiar una práctica',
    '<ol><li>Leé <em>La idea en una mirada</em> y repasá la teoría linkeada.</li>'
    + '<li>Mirá las <em>recetas</em> y el <em>mapa</em>: así sabés qué técnica va con cada ejercicio.</li>'
    + '<li>Intentá el ejercicio en papel. Después revelá <em>un paso por vez</em> en la sección de ejercicios resueltos.</li>'
    + '<li>Repasá los <em>errores comunes</em> al final.</li></ol>'
  ));

  const picker = el('div', { class: 'ex-picker' });
  const holder = el('div', {});
  root.appendChild(el('div', { class: 'ex-picker-label', text: 'Práctica' }));
  root.appendChild(picker);
  root.appendChild(holder);

  function load(p) {
    [...picker.children].forEach((b) => b.classList.toggle('active', b.dataset.id === p.id));
    try { localStorage.setItem(KEY, p.id); } catch { /* ignore */ }
    holder.innerHTML = '';
    holder.appendChild(seccionPractica(m, p));
    typesetNode(holder);
  }

  estudio.forEach((p) => {
    const partes = p.titulo.split(' · ');
    picker.appendChild(el('button', {
      class: 'ex-pill',
      dataset: { id: p.id },
      onClick: () => load(p),
    }, partes.length > 1 ? partes[0] + ' · ' + partes[1].split(' y ')[0] : p.titulo));
  });

  let inicial = estudio[0];
  try {
    const guardada = localStorage.getItem(KEY);
    inicial = estudio.find((p) => p.id === guardada) || inicial;
  } catch { /* ignore */ }
  load(inicial);
}
