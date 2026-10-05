// pages/inicio.js — presentación y mapa del contenido organizado por temas.

import { el } from '../utils/dom.js';
import { pageHeader, callout } from '../utils/page.js';

// Estructura organizada por secciones temáticas de la materia
const SECCIONES = [
  {
    titulo: 'Supremos, Ínfimos y Sucesiones',
    cards: [
      { page: 'sup-inf', ic: '📏', h: 'Supremos e ínfimos', p: 'Cotas, supremo, ínfimo y el axioma de completitud.' },
      { page: 'sucesiones', ic: '📈', h: 'Sucesiones', p: 'Límites con ε–n₀, monótonas y subsucesiones.' },
    ]
  },
  {
    titulo: 'Cardinalidad',
    cards: [
      { page: 'card-equivalencia', ic: '🔗', h: 'Equivalencia de conjuntos', p: 'Biyecciones y qué significa "tener el mismo tamaño".' },
      { page: 'card-numerables', ic: '🔢', h: 'Finitos y numerables', p: 'ℕ, ℤ, ℚ y el cardinal ℵ₀.' },
      { page: 'card-hilbert', ic: '🏨', h: 'Hotel de Hilbert', p: 'La intuición del infinito, jugando.' },
      { page: 'card-cantor', ic: '🌀', h: 'Cantor y ℝ', p: 'El argumento diagonal: ℝ no es numerable.' },
      { page: 'card-orden', ic: '📊', h: 'Orden entre cardinales', p: 'ℵ₀ < c, partes de un conjunto, 2^ℕ.' },
    ]
  },
  {
    titulo: 'Espacios Métricos',
    cards: [
      { page: 'em-distancia', ic: '📐', h: 'Distancia y bolas', p: 'Métricas d₁, d₂, d∞ y sus bolas.' },
      { page: 'em-topologia', ic: '🧭', h: 'Interior, clausura, frontera', p: 'Abiertos, cerrados y los tres operadores.' },
      { page: 'em-acumulacion', ic: '🎯', h: 'Acumulación y aislados', p: 'Conjunto derivado y puntos aislados.' },
      { page: 'em-compacidad', ic: '🫧', h: 'Compacidad · Heine-Borel', p: 'Cubrimientos abiertos y subcubrimientos finitos.' },
      { page: 'em-cauchy', ic: '➰', h: 'Cauchy y completitud', p: 'Sucesiones de Cauchy y espacios completos.' },
      { page: 'em-continuidad', ic: '〰️', h: 'Continuidad', p: 'ε–δ y preimagen de abiertos.' },
      { page: 'em-puntofijo', ic: '📍', h: 'Punto fijo', p: 'Contracciones y el teorema de Banach.' },
    ]
  },
  {
    titulo: 'Práctica Interactiva',
    cards: [
      { page: 'asistente', ic: '🧩', h: 'Asistente de ejercicios', p: 'Armá demostraciones de la Práctica 1 arrastrando pasos.' },
      { page: 'guia', ic: '📖', h: 'Guía resuelta', p: 'Ejercicios tipo parcial resueltos paso a paso.' },
      { page: 'quiz', ic: '✍️', h: 'Autoevaluación', p: 'Poné a prueba tus conocimientos con preguntas clave.' },
    ]
  }
];

export function renderInicio(root) {
  root.appendChild(pageHeader(
    'Análisis Avanzado — Aprendizaje Interactivo',
    'Una guía visual para dominar <strong>Supremos e ínfimos</strong>, <strong>Sucesiones</strong>, '
    + '<strong>Cardinalidad</strong> y <strong>Espacios Métricos</strong>. '
    + 'Cada tema combina la definición formal con una visualización que podés manipular.'
  ));

  root.appendChild(callout('tip', 'Cómo usar esta app',
    'Recorré los temas en orden con los botones <em>Siguiente</em>, o saltá al que te interese desde el menú. '
    + 'Las visualizaciones son interactivas: arrastrá puntos, movete con los sliders y observá cómo cambian las definiciones. '
    + 'En el <strong>Asistente de ejercicios</strong> armás demostraciones de la práctica arrastrando pasos, y al final hay una '
    + '<strong>autoevaluación</strong> con preguntas basadas en las prácticas de la materia.'
  ));

  // Renderizar las secciones divididas por temas
  for (const sec of SECCIONES) {
    // Título destacado para cada módulo de la materia
    root.appendChild(el('h2', { 
      text: sec.titulo, 
      style: 'margin-top: 28px; margin-bottom: 12px; font-size: 20px; color: var(--cyan); border-bottom: 1px solid var(--border); padding-bottom: 6px;' 
    }));

    // Grilla de tarjetas para la sección actual
    const grid = el('div', { class: 'home-grid', style: 'margin-top: 12px; margin-bottom: 24px;' });
    
    for (const c of sec.cards) {
      grid.appendChild(el('a', { class: 'home-card', href: '#' + c.page }, [
        el('div', { class: 'ic', text: c.ic }),
        el('h4', { text: c.h }),
        el('p', { text: c.p }),
      ]));
    }
    
    root.appendChild(grid);
  }

  root.appendChild(callout('', 'Sobre el contenido',
    'Las definiciones, teoremas y ejercicios siguen las notas de clase y las Prácticas 1–3 de '
    + 'Análisis Avanzado (DM · FCEN · UBA). La app es material de estudio complementario, no reemplaza '
    + 'las demostraciones completas del curso.'
  ));
}