// materias/alc/index.js — manifiesto de Álgebra Lineal Computacional (DM · FCEN · UBA).
// Contrato: js/core/materia.js · Guía: .kiro/skills/materias-componentes/SKILL.md
// Teoría de referencia: apunte de Acosta–Laplagne + Prácticas 1 a 7 (2C 2026). Todo vive en esta carpeta.

import { UNIDADES, HERRAMIENTAS } from './plan.js';
import { RESULTADOS } from './resultados.js';
import { ESTUDIO } from './estudio.js';

import { renderEspacios } from './pages/espacios.js';
import { renderMatrices } from './pages/matrices.js';
import { renderTL } from './pages/tl.js';
import { renderFlotante } from './pages/flotante.js';
import { renderNormas } from './pages/normas.js';
import { renderCondicion } from './pages/condicion.js';
import { renderLU } from './pages/lu.js';
import { renderOrtogonal } from './pages/ortogonal.js';
import { renderAutovalores } from './pages/autovalores.js';
import { renderMarkov } from './pages/markov.js';
import { renderPotencia } from './pages/potencia.js';
import { renderHermitianas } from './pages/hermitianas.js';
import { renderSVD } from './pages/svd.js';
import { renderCuadrados } from './pages/cuadrados.js';
import { renderInterpolacion } from './pages/interpolacion.js';
import { renderIterativos } from './pages/iterativos.js';
import { renderGradiente } from './pages/gradiente.js';

import { GUIA_P1 } from './guias/guia-p1.js';
import { GUIA_P2 } from './guias/guia-p2.js';
import { GUIA_P3 } from './guias/guia-p3.js';
import { GUIA_P4 } from './guias/guia-p4.js';
import { GUIA_P5 } from './guias/guia-p5.js';
import { GUIA_P6 } from './guias/guia-p6.js';
import { GUIA_P7 } from './guias/guia-p7.js';

export default {
  id: 'alc',
  nombre: 'Álgebra Lineal Computacional',
  nombreCorto: 'ALC',
  icono: '🧮',
  color: '#38d9d9',
  institucion: 'DM · FCEN · UBA',
  subtitulo: 'Prácticas 1 a 7 · Teoría, visualizaciones y ejercicios resueltos — DM · FCEN · UBA',
  intro: 'Álgebra lineal pensada para <strong>calcular</strong>: qué hace una matriz, cuánto error amplifica y qué algoritmos '
    + '(LU, QR, potencia, SVD, gradiente) resuelven los problemas de verdad. Cada unidad sigue una práctica y el apunte de Acosta–Laplagne.',
  inicioRuta: 'Los temas siguen el orden de las prácticas. Primero el <strong>escenario</strong> (espacios y matrices), después el '
    + '<strong>error numérico</strong> (flotante, normas, condición), los <strong>métodos directos</strong> (LU, QR), los '
    + '<strong>autovalores</strong> (potencia, SVD), el ajuste de datos y por último los <strong>métodos iterativos</strong>.',
  primeraPagina: 'alc-espacios',
  // 1.er parcial: hasta Markov (el Cap. III del temario cierra con potencia y Markov, ambos en P4).
  primerParcial: ['p1', 'p2', 'p3', 'p4'],

  unidades: UNIDADES,
  herramientas: HERRAMIENTAS,

  paginas: {
    'alc-espacios': renderEspacios,
    'alc-matrices': renderMatrices,
    'alc-tl': renderTL,
    'alc-flotante': renderFlotante,
    'alc-normas': renderNormas,
    'alc-condicion': renderCondicion,
    'alc-lu': renderLU,
    'alc-ortogonal': renderOrtogonal,
    'alc-autovalores': renderAutovalores,
    'alc-markov': renderMarkov,
    'alc-potencia': renderPotencia,
    'alc-hermitianas': renderHermitianas,
    'alc-svd': renderSVD,
    'alc-cuadrados': renderCuadrados,
    'alc-interpolacion': renderInterpolacion,
    'alc-iterativos': renderIterativos,
    'alc-gradiente': renderGradiente,
  },

  resultados: RESULTADOS,
  estudio: ESTUDIO,
  guias: [
    { id: 'p1', nombre: 'Práctica 1 · Sistemas y espacios vectoriales', datos: GUIA_P1 },
    { id: 'p2', nombre: 'Práctica 2 · TL, punto flotante y condición', datos: GUIA_P2 },
    { id: 'p3', nombre: 'Práctica 3 · LU, Cholesky y QR', datos: GUIA_P3 },
    { id: 'p4', nombre: 'Práctica 4 · Autovalores y Markov', datos: GUIA_P4 },
    { id: 'p5', nombre: 'Práctica 5 · Hermitianas y SVD', datos: GUIA_P5 },
    { id: 'p6', nombre: 'Práctica 6 · Interpolación y cuadrados mínimos', datos: GUIA_P6 },
    { id: 'p7', nombre: 'Práctica 7 · Métodos iterativos', datos: GUIA_P7 },
  ],

  // Las hojas se ordenan en partes plegables (core/estructura.js): teoría abierta, laboratorios cerrados.
  estructura: 'secciones',

  machete: 'machete.html',
};
