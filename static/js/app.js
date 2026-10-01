// app.js — entry point. Orquesta la carga de páginas y la navegación.

import { initNavigation } from './navigation.js';

import { renderInicio } from './pages/inicio.js';
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
import { renderCompacidad } from './pages/em-compacidad.js';
import { renderCauchy } from './pages/em-cauchy.js';
import { renderContinuidad } from './pages/em-continuidad.js';
import { renderPuntoFijo } from './pages/em-puntofijo.js';
import { renderGuia } from './pages/guia.js';
import { renderAsistente } from './pages/asistente.js';
import { renderQuiz } from './pages/quiz.js';

const registry = {
  'inicio': renderInicio,
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
  'em-compacidad': renderCompacidad,
  'em-cauchy': renderCauchy,
  'em-continuidad': renderContinuidad,
  'em-puntofijo': renderPuntoFijo,
  'guia': renderGuia,
  'asistente': renderAsistente,
  'quiz': renderQuiz,
};

initNavigation(registry);
