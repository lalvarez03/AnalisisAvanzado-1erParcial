// core/machete.js — visor de "machete" (resumen imprimible) genérico para cualquier materia.
//
//   machete.html?m=<id-materia>
//
// Carga el fragmento HTML que declara el manifiesto de la materia (`machete: 'machete.html'`, relativo a
// su carpeta), arma el índice de fases a partir de las <section class="fase"> y tipografía con MathJax.

import { buscarMateria, MATERIA_POR_DEFECTO } from '../../materias/registry.js';

const $ = (id) => document.getElementById(id);

function mostrarError(msg) {
  $('m-root').innerHTML = `<p class="m-load">${msg} <a href="index.html#materias">Volver al menú de materias</a></p>`;
}

function armarIndice(root) {
  const toc = $('m-toc');
  toc.innerHTML = '';
  root.querySelectorAll('section.fase').forEach((sec, i) => {
    if (!sec.id) sec.id = 'f' + (i + 1);
    const num = sec.querySelector('.fase-num')?.textContent?.trim() || String(i + 1);
    const titulo = sec.querySelector('.fase-title')?.textContent?.trim() || 'Fase ' + num;
    const corto = titulo.split(/[—:·]/)[0].trim();
    const a = document.createElement('a');
    a.href = '#' + sec.id;
    a.textContent = `${num} · ${corto}`;
    toc.appendChild(a);

    // Chip con la práctica a la que corresponde la fase (si el fragmento la declara).
    const prac = sec.dataset.practica;
    if (prac) {
      const chip = document.createElement('span');
      chip.className = 'fase-prac';
      chip.textContent = prac;
      sec.querySelector('.fase-head')?.appendChild(chip);
    }
  });
}

async function iniciar() {
  const id = new URLSearchParams(location.search).get('m') || MATERIA_POR_DEFECTO;
  const meta = buscarMateria(id);
  if (!meta || meta.estado !== 'activa') return mostrarError('Materia no encontrada.');

  let manifiesto;
  try {
    manifiesto = (await meta.cargar()).default;
  } catch (e) {
    console.error(e);
    return mostrarError('No se pudo cargar la materia.');
  }
  if (!manifiesto.machete) return mostrarError('Esta materia todavía no tiene machete.');

  $('m-logo').textContent = manifiesto.icono || '📄';
  $('m-title').textContent = `Machete — ${manifiesto.nombre}`;
  $('m-sub').textContent = `Resumen por fases · definiciones + resultados clave${manifiesto.institucion ? ' · ' + manifiesto.institucion : ''}`;
  document.title = `Machete — ${manifiesto.nombre}`;
  $('m-back').href = `index.html#${manifiesto.id}/inicio`;
  $('m-back').textContent = `← ${manifiesto.nombreCorto || manifiesto.nombre}`;

  const url = new URL(`../../materias/${manifiesto.id}/${manifiesto.machete}`, import.meta.url);
  let html;
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error('HTTP ' + r.status);
    html = await r.text();
  } catch (e) {
    console.error(e);
    return mostrarError('No se pudo leer el machete de la materia.');
  }

  const root = $('m-root');
  root.innerHTML = html;
  armarIndice(root);

  const tipografiar = () => window.MathJax?.typesetPromise?.([root]).catch(() => {});
  if (window.MathJax?.typesetPromise) tipografiar();
  else {
    // MathJax se carga async desde el CDN: reintentar hasta que esté listo.
    let tries = 0;
    const iv = setInterval(() => {
      tries += 1;
      if (window.MathJax?.typesetPromise) { clearInterval(iv); tipografiar(); }
      else if (tries > 100) clearInterval(iv);
    }, 100);
  }

  if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
}

iniciar();
