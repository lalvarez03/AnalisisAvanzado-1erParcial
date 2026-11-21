// materias/analisis-avanzado/resultados.js — resultados clave por página de teoría.
//
// Cada resultado tiene: { n: nombre, ref: referencia en la teórica/práctica,
//   d: definiciones formales, e: enunciado, p: demostración,
//   x: { enunciado, idea, pasos: [{ idea, detalle }], conclusion }  ← ejemplo de uso paso a paso }.
// Se muestran al pie de cada tema (js/navigation.js → resultadosClave). Los textos viven en resultados/*.js.

import { SUP_INF } from './resultados/sup-inf.js';
import { SUCESIONES } from './resultados/sucesiones.js';
import {
  CARD_EQUIVALENCIA, CARD_NUMERABLES, CARD_HILBERT, CARD_CANTOR, CARD_ORDEN,
} from './resultados/cardinalidad.js';
import { EM_DISTANCIA, EM_TOPOLOGIA, EM_ACUMULACION } from './resultados/metricos-1.js';
import { EM_CAUCHY } from './resultados/metricos-2.js';
import { EM_CONTINUIDAD } from './resultados/continuidad.js';
import { EM_COMPACIDAD, EM_PUNTOFIJO } from './resultados/compacidad.js';
import { EM_NORMADOS } from './resultados/normados.js';
import { EM_FUNCIONES } from './resultados/funciones.js';

export const RESULTADOS = {
  'sup-inf': SUP_INF,
  'sucesiones': SUCESIONES,
  'card-equivalencia': CARD_EQUIVALENCIA,
  'card-numerables': CARD_NUMERABLES,
  'card-hilbert': CARD_HILBERT,
  'card-cantor': CARD_CANTOR,
  'card-orden': CARD_ORDEN,
  'em-distancia': EM_DISTANCIA,
  'em-topologia': EM_TOPOLOGIA,
  'em-acumulacion': EM_ACUMULACION,
  'em-cauchy': EM_CAUCHY,
  'em-continuidad': EM_CONTINUIDAD,
  'em-compacidad': EM_COMPACIDAD,
  'em-puntofijo': EM_PUNTOFIJO,
  'em-normados': EM_NORMADOS,
  'em-funciones': EM_FUNCIONES,
};
