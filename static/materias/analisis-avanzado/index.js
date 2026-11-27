// materias/analisis-avanzado/index.js — manifiesto de la materia (DM · FCEN · UBA).
// Contrato: ver js/core/materia.js y la skill "materias-componentes".
//
// Nota de estructura: esta es la materia original de la app. Sus páginas interactivas y sus
// guías resueltas siguen en js/pages/ y js/utils/guia-p*.js; el manifiesto las expone al núcleo.
// Las materias nuevas guardan TODO dentro de su propia carpeta (la plantilla ya lo hace así).

import { UNIDADES, HERRAMIENTAS } from './plan.js';
import { RESULTADOS } from './resultados.js';
import { GLOSARIO } from './glosario.js';
import { ESTUDIO } from './estudio.js';

// Páginas propias de la materia (visualizaciones interactivas)
import { renderSupInf } from './pages/sup-inf.js';
import { renderSucesiones } from './pages/sucesiones.js';
import { renderEquivalencia } from './pages/card-equivalencia.js';
import { renderNumerables } from './pages/card-numerables.js';
import { renderHilbert } from './pages/card-hilbert.js';
import { renderCantor } from './pages/card-cantor.js';
import { renderOrden } from './pages/card-orden.js';
import { renderDistancia } from './pages/em-distancia.js';
import { renderTopologia } from './pages/em-topologia.js';
import { renderAcumulacion } from './pages/em-acumulacion.js';
import { renderContinuidad } from './pages/em-continuidad.js';
import { renderCompacidad } from './pages/em-compacidad.js';
import { renderCauchy } from './pages/em-cauchy.js';
import { renderPuntoFijo } from './pages/em-puntofijo.js';
import { renderNormados } from './pages/em-normados.js';
import { renderFunciones } from './pages/em-funciones.js';
import { renderAsistente } from './pages/asistente.js';

// Guías de ejercicios resueltos
import { GUIA_P1 } from './guias/guia-p1.js';
import { GUIA_P2 } from './guias/guia-p2.js';
import { GUIA_P3 } from './guias/guia-p3.js';
import { GUIA_P4 } from './guias/guia-p4.js';
import { GUIA_P5 } from './guias/guia-p5.js';
import { GUIA_P6 } from './guias/guia-p6.js';
import { GUIA_P7 } from './guias/guia-p7.js';
import { GUIA_SP2024 } from './guias/guia-sp2024.js';

export default {
  id: 'analisis-avanzado',
  nombre: 'Análisis Avanzado',
  nombreCorto: 'Análisis Avanzado',
  icono: '∑',
  color: '#5b8cff',
  institucion: 'DM · FCEN · UBA',
  subtitulo: 'Prácticas 1 a 7 · Teoría, visualizaciones y ejercicios resueltos — DM · FCEN · UBA',
  intro: 'Un lugar para <strong>entender</strong> la materia, no solo para leerla. Cada unidad sigue el orden de las '
    + 'guías de ejercicios: primero la idea, después la definición y la demostración, y al final los ejercicios resueltos.',
  inicioRuta: 'Los temas están ordenados como las guías de ejercicios. <strong>Espacios métricos</strong> (P3) y '
    + '<strong>espacios normados</strong> (P6) son unidades distintas: primero se construye la topología con métricas '
    + 'generales y recién después se agrega la estructura de espacio vectorial.',
  primeraPagina: 'sup-inf',
  // 1.er parcial: hasta completitud (Cauchy y completitud está en P3). El resto es 2.º parcial.
  primerParcial: ['p1', 'p2', 'p3'],

  unidades: UNIDADES,
  herramientas: HERRAMIENTAS,

  paginas: {
    'sup-inf': renderSupInf,
    'sucesiones': renderSucesiones,
    'card-equivalencia': renderEquivalencia,
    'card-numerables': renderNumerables,
    'card-hilbert': renderHilbert,
    'card-cantor': renderCantor,
    'card-orden': renderOrden,
    'em-distancia': renderDistancia,
    'em-topologia': renderTopologia,
    'em-acumulacion': renderAcumulacion,
    'em-continuidad': renderContinuidad,
    'em-compacidad': renderCompacidad,
    'em-cauchy': renderCauchy,
    'em-puntofijo': renderPuntoFijo,
    'em-normados': renderNormados,
    'em-funciones': renderFunciones,
    'asistente': renderAsistente,
  },

  // Rutas viejas que ya no existen: se redirigen (enlaces guardados, "seguir donde dejaste").
  redirecciones: { quiz: 'estudio' },

  resultados: RESULTADOS,
  glosario: GLOSARIO,
  estudio: ESTUDIO,
  guias: [
    { id: 'p1', nombre: 'Práctica 1 · Supremos y sucesiones', datos: GUIA_P1 },
    { id: 'p2', nombre: 'Práctica 2 · Cardinalidad', datos: GUIA_P2 },
    { id: 'p3', nombre: 'Práctica 3 · Espacios métricos', datos: GUIA_P3 },
    { id: 'p4', nombre: 'Práctica 4 · Continuidad y unif. continuidad', datos: GUIA_P4 },
    { id: 'p5', nombre: 'Práctica 5 · Compacidad y punto fijo', datos: GUIA_P5 },
    { id: 'p6', nombre: 'Práctica 6 · Espacios normados', datos: GUIA_P6 },
    { id: 'p7', nombre: 'Práctica 7 · Sucesiones de funciones', datos: GUIA_P7 },
    { id: 'sp2024', nombre: '2º parcial 2024 · Series y medida', datos: GUIA_SP2024 },
  ],

  machete: 'machete.html',

  // Claves de localStorage previas a la existencia de varias materias (conservan el progreso ya guardado).
  almacenamiento: {
    visited: 'aa_visited_pages',
    seen: 'aa_seen_pages',
    lastPage: 'aa_last_page',
    navCollapsed: 'aa_nav_collapsed',
    practica: 'aa_estudio_practica',
  },
};
