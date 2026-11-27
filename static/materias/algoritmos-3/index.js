// materias/algoritmos-3/index.js — manifiesto de Técnicas de Diseño de Algoritmos (Algoritmos y Estructuras de Datos III · DC · FCEyN · UBA).
// Contrato: js/core/materia.js · Guía: .kiro/skills/materias-componentes/SKILL.md
// Teoría y prácticas: material de la cátedra 2C 2026 (Prácticas 1 a 9). Todo vive en esta carpeta.

import { UNIDADES, HERRAMIENTAS } from './plan.js';
import { RESULTADOS } from './resultados.js';
import { ESTUDIO } from './estudio.js';

import { renderDemostraciones } from './pages/demostraciones.js';
import { renderComplejidad } from './pages/complejidad.js';
import { renderGrafos } from './pages/grafos.js';
import { renderRepresentacion } from './pages/representacion.js';
import { renderBfsDfs } from './pages/bfs-dfs.js';
import { renderDyc } from './pages/dyc.js';
import { renderBacktracking } from './pages/backtracking.js';
import { renderDP } from './pages/dp.js';
import { renderGreedy } from './pages/greedy.js';
import { renderCaminos } from './pages/caminos.js';
import { renderFloyd } from './pages/floyd.js';
import { renderEstados } from './pages/estados.js';
import { renderFlujo } from './pages/flujo.js';

import { GUIA_P1, GUIA_P2, GUIA_P3, GUIA_P4 } from './guias/guias-1-4.js';
import { GUIA_P5, GUIA_P6, GUIA_P7, GUIA_P8, GUIA_P9 } from './guias/guias-5-9.js';

export default {
  id: 'algoritmos-3',
  nombre: 'Técnicas de Diseño de Algoritmos',
  nombreCorto: 'Algoritmos 3',
  icono: '🧠',
  color: '#ff8a5b',
  institucion: 'DC · FCEyN · UBA',
  subtitulo: 'Prácticas 1 a 9 · Teoría, algoritmos animados y ejercicios resueltos — DC · FCEyN · UBA',
  intro: 'Cómo <strong>diseñar</strong> un algoritmo y, sobre todo, cómo <strong>demostrar</strong> que es correcto y eficiente. Un recorrido por las técnicas '
    + 'de la materia (grafos, divide y conquista, backtracking, programación dinámica, greedy, caminos mínimos y flujos) con animaciones paso a paso.',
  inicioRuta: 'El <strong>primer parcial</strong> cubre demostraciones, grafos, algoritmos sobre grafos, divide y conquista y backtracking (P1–P5). '
    + 'El <strong>segundo parcial</strong> cubre programación dinámica, greedy, camino mínimo y flujo máximo (P6–P9). Cada técnica se apoya en la anterior: '
    + 'backtracking → programación dinámica → grafos con pesos → flujos.',
  primeraPagina: 'a3-demostraciones',
  // 1.er parcial: hasta backtracking (P1–P5). 2.º parcial: DP, greedy, caminos mínimos y flujo.
  primerParcial: ['p1', 'p2', 'p3', 'p4', 'p5'],

  unidades: UNIDADES,
  herramientas: HERRAMIENTAS,

  paginas: {
    'a3-demostraciones': renderDemostraciones,
    'a3-complejidad': renderComplejidad,
    'a3-grafos': renderGrafos,
    'a3-representacion': renderRepresentacion,
    'a3-bfs-dfs': renderBfsDfs,
    'a3-dyc': renderDyc,
    'a3-backtracking': renderBacktracking,
    'a3-dp': renderDP,
    'a3-greedy': renderGreedy,
    'a3-caminos': renderCaminos,
    'a3-floyd': renderFloyd,
    'a3-estados': renderEstados,
    'a3-flujo': renderFlujo,
  },

  resultados: RESULTADOS,
  estudio: ESTUDIO,
  guias: [
    { id: 'p1', nombre: 'Práctica 1 · Demostraciones y complejidad', datos: GUIA_P1 },
    { id: 'p2', nombre: 'Práctica 2 · Introducción a grafos', datos: GUIA_P2 },
    { id: 'p3', nombre: 'Práctica 3 · Algoritmos sobre grafos', datos: GUIA_P3 },
    { id: 'p4', nombre: 'Práctica 4 · Divide y conquista', datos: GUIA_P4 },
    { id: 'p5', nombre: 'Práctica 5 · Backtracking', datos: GUIA_P5 },
    { id: 'p6', nombre: 'Práctica 6 · Programación dinámica', datos: GUIA_P6 },
    { id: 'p7', nombre: 'Práctica 7 · Greedy', datos: GUIA_P7 },
    { id: 'p8', nombre: 'Práctica 8 · Camino mínimo', datos: GUIA_P8 },
    { id: 'p9', nombre: 'Práctica 9 · Flujo en redes', datos: GUIA_P9 },
  ],

  // Las hojas se ordenan en partes plegables (core/estructura.js): teoría abierta, laboratorios cerrados.
  estructura: 'secciones',

  machete: 'machete.html',
};
