---
inclusion: always
---
# Teoría de Análisis Avanzado

Este workspace es material de estudio de **Análisis Avanzado** (DM · FCEN · UBA),
primer parcial. Toda explicación, demostración, ejercicio o visualización que
produzcas debe asentarse en la teoría formal de la materia, no en versiones
"parecidas" o de manual genérico. Si dudás de una definición o un enunciado, no
lo inventes: marcalo como pendiente de verificar contra las notas de clase o
las Prácticas 1–3 (`Archivos/p1.pdf` … `p6.pdf`, `Archivos/Análisis Avanzado 1C2026.pdf`).

## Programa del primer parcial

**Fundamentos sobre ℝ**
- Supremos e ínfimos: cotas superior/inferior, máximo/mínimo, axioma del
  supremo (completitud de ℝ), caracterización ε del supremo y del ínfimo.
- Sucesiones en ℝ: límite ε–n₀ (unicidad), sucesiones monótonas acotadas
  (toda monótona acotada converge a su sup/ínf), subsucesiones y
  Bolzano–Weierstrass (toda sucesión acotada tiene subsucesión convergente).

**Cardinalidad**
- Equivalencia de conjuntos: A ~ B sii existe biyección; es relación de
  equivalencia.
- Finito, numerable (biyecta con ℕ o con un subconjunto de ℕ), no numerable.
  ℤ y ℚ son numerables; ℝ no lo es.
- Hotel de Hilbert: ℕ se biyecta con un subconjunto propio (rasgo de los
  infinitos Dedekind).
- Argumento diagonal de Cantor: [0,1) no es numerable, por ende ℝ tampoco.
  Cardenal del continuo c, con ℵ₀ < c.
- Teorema de Cantor: |A| < |𝒫(A)|; jerarquía de infinitos.
- Schröder–Bernstein: si A ≼ B y B ≼ A entonces A ~ B.
- Orden entre cardinales y comparación de "tamaños" de infinitos.

**Espacios métricos**
- Métrica: axiomas (no negatividad, simetría, desigualdad triangular,
  d(x,y)=0 ⟺ x=y). Métricas d₁, d₂, d∞ en ℝⁿ y su equivalencia topológica.
- Bolas abiertas y cerradas; esfera; distancia de un punto a un conjunto.
- Topología inducida: interior, clausura, frontera; abiertos y cerrados,
  dualidad por complemento.
- Puntos de acumulación y aislados; derivado A'; densidad.
- Compacidad: por recubrimientos abiertos y compacidad secuencial (en
  métricos son equivalentes). Heine–Borel en ℝⁿ: compacto ⟺ cerrado y acotado.
- Sucesiones de Cauchy y completitud: ℝ completo, ℚ no completo, cerrado en
  completo es completo, teorema de intersección de Cantor.
- Continuidad: ε–δ y secuencial; equivalencia en espacios métricos.
- Teorema del punto fijo de Banach: una contracción en un espacio métrico
  completo no vacío tiene un único punto fijo y las iteradas convergen a él.

## Notación y estilo matemático

- Renderizá fórmulas con LaTeX entre `$...$` (MathJax). Usá `\mathbb{R},
  \mathbb{Q}, \mathbb{N}, \mathbb{Z}`, `\mathbb{R}^n`.
- Métricas `d_1, d_2, d_\infty`; distancia `d(x,y)`; diámetro con
  `\operatorname{diam}`; supremo/ínfimo con `\sup` / `\inf`.
- Cuantificadores de límite completos:
  $\forall \varepsilon>0\, \exists n_0\, \forall n\ge n_0:\ \dots$
- Cardinales: $\aleph_0$, $c$, $|A|$, $\mathcal{P}(A)$.
- No recortes los cuantificadores en las definiciones de límite, Cauchy,
  continuidad y compacidad: escribilas enteras.

## Rigor en demostraciones

- Cuando enunciás un teorema, incluí la demostración completa, paso a paso.
  No dejes "se prueba análogamente" salvo que sea estrictamente análogo y lo
  aclares.
- Justificá cada paso (hipótesis, definición aplicada, teorema anterior): el
  lector debe poder seguir el hilo sin rellenar huecos.
- Cerrá las demostraciones con $\blacksquare$.
- Si hay un detalle técnico necesario (p. ej. el desarrollo decimal no
  único en el diagonal de Cantor, o evitar el 0 y el 9), hacelo explícito en
  lugar de omitirlo.
