---
inclusion: always
---
# Audiencia: estudiantes que necesitan entender

El usuario final de este material es un **estudiante** de Análisis Avanzado
que está aprendiendo los temas, no un docente que ya los domina. Tu trabajo es
que entienda, no que simplemente lea resultados.

## Prioridad: comprensión antes que elegancia

- Llevá al estudiante del "qué" al "por qué". Antes de formalizar una noción,
  mostrá la intuición o el problema que la motiva: ¿qué falla sin completitud?
  ¿por qué necesitamos "numerable"? Recién después la definición formal y la
  demostración.
- No sacrifiques rigor por accesibilidad: usá las definiciones formales
  completas (con todos los cuantificadores). La accesibilidad va en el
  acompañamiento y los ejemplos, no en recortar la teoría.
- Definí cada término técnico la primera vez que aparece, aunque parezca
  obvio. No asumís que el estudiante recuerda "cota", "biyección",
  "derivado", etc.

## Estructura recomendada por tema

Seguí un orden de complejidad creciente:

1. **Motivación / problema** — una pregunta concreta o un ejemplo donde la
   noción surge naturalmente.
2. **Intuición** — una o dos frases en lenguaje común.
3. **Definición formal** — LaTeX, cuantificadores completos.
4. **Ejemplo concreto** — el más simple que muestre la idea, más un contracaso
   que muestre por qué la hipótesis es necesaria.
5. **Teorema + demostración** — paso a paso, cada paso justificado.
6. **Visualización interactiva** — algo que el estudiante manipule para ver
   cómo cambia la noción (arrastrar puntos, mover sliders).
7. **Errores comunes / consecuencias** — lo que suele confundirse.

No siempre hacen falta los siete, pero no saltes de "definición" a "teorema"
sin pasar por el ejemplo concreto.

## Lenguaje y tono

- Escribí en **español rioplatense** (vos: "arrastrás", "movés", "tildá"),
  igual que el resto del proyecto.
- Tono de compañero de cursada, no de manual: explicá como le explicarías a
  un colega, sin sonar condescendiente ni perder precisión.
- Evitá la jerga por la jerga: si decís "compacto", en la misma zona
  recordá qué significa para este cursante.

## Anticipá la confusión

- Cuando una noción tiene trampas conocidas, nombralas: el desarrollo decimal
  no único en el diagonal de Cantor; la diferencia entre convergente y de
  Cauchy cuando el espacio no es completo; que "abierto" y "cerrado" no son
  opuestos.
- Conectá temas nuevos con los que ya vio: compacidad con Heine–Borel del
  cálculo, completitud con el sup/ínf de los fundamentos.

## Visualizaciones

- Hacelas manipulables, no decorativas: que cambiar un parámetro cambie la
  noción en pantalla, para que el estudiante vea la dependencia.
- Mostrá el caso que satisface la hipótesis y el que la viola, conmutables o
  lado a lado, para que la necesidad de cada hipótesis sea visible.
- El readout/caption debe decir en palabras comunes qué está pasando, no solo
  un número.
