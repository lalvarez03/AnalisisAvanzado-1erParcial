// core/paginas/inicio.js — menú principal de UNA materia: ruta de aprendizaje por unidades.
// Genérico: todo sale del manifiesto de la materia activa (unidades, herramientas, textos).

import { el } from '../../utils/dom.js';
import { materiaActiva, plan, etiquetaParcial } from '../materia.js';
import { irAPractica } from '../seleccion.js';
import { getState, lastPage, progressPercent } from '../../state.js';

function irAEjercicios(unidadId) {
  irAPractica('estudio', unidadId);
}

function progresoUnidad(u) {
  const visited = getState().visited;
  const hechas = u.paginas.filter((p) => visited.has(p.id)).length;
  return { hechas, total: u.paginas.length, pct: Math.round((hechas / u.paginas.length) * 100) };
}

function hero(m) {
  const { PAGE_TITLES, UNIDADES } = plan();
  const visited = getState().visited;
  const ultima = lastPage();
  const pct = progressPercent();

  // Siguiente página sugerida: la primera no visitada en el orden del plan.
  const orden = UNIDADES.flatMap((u) => u.paginas.map((p) => p.id));
  const siguiente = orden.find((id) => !visited.has(id)) || null;

  const botones = [];
  if (ultima && PAGE_TITLES[ultima]) {
    botones.push(el('a', { class: 'hero-btn primary', href: '#' + ultima }, `▶ Seguir: ${PAGE_TITLES[ultima]}`));
  }
  if (siguiente && siguiente !== ultima) {
    botones.push(el('a', { class: 'hero-btn', href: '#' + siguiente }, `Próximo tema: ${PAGE_TITLES[siguiente]}`));
  }
  if (!ultima && orden.length) {
    botones.push(el('a', { class: 'hero-btn primary', href: '#' + (m.primeraPagina || orden[0]) }, '🚀 Empezar por el principio'));
  }

  return el('section', { class: 'hero', style: `--materia:${m.color}` }, [
    el('div', { class: 'hero-text' }, [
      el('h1', { class: 'hero-title', text: m.nombre }),
      el('p', { class: 'hero-sub', html: m.intro || '' }),
      el('div', { class: 'hero-actions' }, botones),
    ]),
    el('div', { class: 'hero-progress' }, [
      el('div', { class: 'ring', style: `--p:${pct}` }, [el('span', { text: pct + '%' })]),
      el('small', { text: 'temas recorridos (editable en el menú)' }),
    ]),
  ]);
}

function flujo() {
  return el('section', { class: 'flow' }, [
    el('h2', { class: 'home-h2', text: 'Cómo estudiar cada unidad' }),
    el('div', { class: 'flow-steps' }, [
      ['1', '💡', 'Entendé la idea', 'Leé la motivación y manipulá la visualización.'],
      ['2', '📜', 'Definiciones y teoremas', 'Con cuantificadores completos y demostración.'],
      ['3', '🗺️', 'Mapa de la práctica', 'Qué técnica va con cada ejercicio.'],
      ['4', '✏️', 'Resolvé y compará', 'Intentá en papel; revelá la solución de a un paso.'],
      ['5', '📌', 'Repasá', 'Con los resultados clave y el machete.'],
    ].map(([n, ic, h, p]) => el('div', { class: 'flow-step' }, [
      el('div', { class: 'flow-num', text: n }),
      el('div', { class: 'flow-ic', text: ic }),
      el('h4', { text: h }),
      el('p', { text: p }),
    ]))),
  ]);
}

function tarjetaUnidad(m, u) {
  const visited = getState().visited;
  const prog = progresoUnidad(u);
  const primeraPendiente = u.paginas.find((p) => !visited.has(p.id)) || u.paginas[0];
  const estado = prog.hechas === 0 ? 'Empezar' : (prog.hechas === prog.total ? 'Repasar' : 'Continuar');
  const tieneEjercicios = (m.estudio || []).some((e) => e.id === u.id);

  const requiere = u.requiere?.length
    ? el('span', { class: 'unit-req', text: 'Antes: ' + u.requiere.map((r) => r.toUpperCase()).join(' · ') })
    : el('span', { class: 'unit-req', text: 'Punto de partida' });

  const pasos = el('ol', { class: 'unit-steps' }, u.paginas.map((p) =>
    el('li', {}, [
      el('a', { href: '#' + p.id, class: visited.has(p.id) ? 'done' : '' }, [
        el('span', { class: 'step-mark', text: visited.has(p.id) ? '✓' : p.ic }),
        el('span', { class: 'step-body' }, [
          el('strong', { text: p.titulo }),
          el('small', { text: p.desc }),
        ]),
      ]),
    ])));

  const acciones = [el('a', { class: 'hero-btn primary', href: '#' + primeraPendiente.id }, `${estado} ›`)];
  if (tieneEjercicios) {
    acciones.push(el('button', { class: 'hero-btn', onClick: () => irAEjercicios(u.id) }, `✏️ Ejercicios de ${u.etiqueta || 'U' + u.num}`));
  }

  return el('article', { class: 'unit', style: `--unit:${u.color}` }, [
    el('div', { class: 'unit-rail' }, [el('div', { class: 'unit-badge', text: u.etiqueta || String(u.num) })]),
    el('div', { class: 'unit-card' }, [
      el('div', { class: 'unit-head' }, [
        el('div', {}, [
          el('h3', { class: 'unit-title', text: u.ic + ' ' + u.titulo }),
          el('div', { class: 'unit-meta' }, [el('span', { text: u.capitulo || '' }), requiere]),
        ]),
        el('div', { class: 'unit-prog', title: `${prog.hechas} de ${prog.total} temas` }, [
          el('div', { class: 'bar' }, [el('i', { style: `width:${prog.pct}%` })]),
          el('small', { text: `${prog.hechas}/${prog.total}` }),
        ]),
      ]),
      el('p', { class: 'unit-desc', text: u.resumen }),
      pasos,
      el('div', { class: 'unit-actions' }, acciones),
    ]),
  ]);
}

export function renderInicio(root) {
  const m = materiaActiva();
  const { UNIDADES, HERRAMIENTAS } = plan();

  root.appendChild(hero(m));
  root.appendChild(flujo());

  root.appendChild(el('h2', { class: 'home-h2', text: 'Ruta de aprendizaje' }));
  root.appendChild(el('p', { class: 'page-sub', html:
    (m.inicioRuta || '') + ' <em>Tu avance se maneja desde el menú lateral: tildá o destildá cada tema (o el grupo entero) cuando quieras.</em>' }));

  const ruta = el('div', { class: 'route' });
  let ultimoParcial = null;
  UNIDADES.forEach((u) => {
    const lp = etiquetaParcial(u.id);
    if (lp && lp !== ultimoParcial) { ruta.appendChild(el('h3', { class: 'parcial-titulo', text: lp })); ultimoParcial = lp; }
    ruta.appendChild(tarjetaUnidad(m, u));
  });
  root.appendChild(ruta);

  // Las herramientas de práctica (estudiar por práctica, ejercicios resueltos, asistente) viven en el otro mundo.
  root.appendChild(el('h2', { class: 'home-h2', text: 'Repaso y práctica' }));
  const grid = el('div', { class: 'home-grid' });
  grid.appendChild(el('a', { class: 'home-card', href: '#practicas' }, [
    el('div', { class: 'ic', text: '✏️' }),
    el('h4', { text: 'Pasar a Prácticas' }),
    el('p', { text: 'Estudiar por práctica, ejercicios resueltos y asistente de demostraciones, guía por guía.' }),
  ]));
  if (m.machete) {
    grid.appendChild(el('a', { class: 'home-card', href: 'machete.html?m=' + encodeURIComponent(m.id), target: '_blank', rel: 'noopener' }, [
      el('div', { class: 'ic', text: '📄' }),
      el('h4', { text: 'Machete' }),
      el('p', { text: 'Resumen de definiciones y teoremas para tener a mano (se puede imprimir).' }),
    ]));
  }
  root.appendChild(grid);

  const extra = HERRAMIENTAS.filter((h) => h.grupo === 'extra');
  if (extra.length) {
    root.appendChild(el('h2', { class: 'home-h2', text: 'Extra' }));
    const gridExtra = el('div', { class: 'home-grid' });
    extra.forEach((h) => {
      gridExtra.appendChild(el('a', { class: 'home-card', href: '#' + h.id }, [
        el('div', { class: 'ic', text: h.ic }),
        el('h4', { text: h.titulo }),
        el('p', { text: h.desc }),
      ]));
    });
    root.appendChild(gridExtra);
  }

  root.appendChild(el('div', { class: 'callout tip' }, [
    el('div', { class: 'tag', text: 'Tip de estudio' }),
    el('div', { html:
      'Con el interruptor <strong>Teóricas ⇄ Prácticas</strong> de la barra superior cambiás de mundo: la teoría para entender, las prácticas para ejercitar. '
      + 'Usá el <strong>Pomodoro</strong>: 25 minutos de una unidad, 5 de descanso. '
      + 'Podés cambiar la duración con el engranaje ⚙️ y subir o bajar el contador de pomodoros con ＋ y −.' }),
  ]));

  root.appendChild(el('p', { class: 'home-foot', html:
    'Material de estudio complementario de ' + m.nombre + (m.institucion ? ' (' + m.institucion + ')' : '')
    + '; no reemplaza las demostraciones completas del curso.' }));
}
