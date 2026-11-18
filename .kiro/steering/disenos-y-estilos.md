---
inclusion: always
---

# Diseños y estilos del proyecto

Este steering documenta los sistemas de diseño que están activos o en reserva para
el proyecto educativo. Usalo como referencia antes de crear o modificar cualquier
componente visual.

---

## Sistema activo: Análisis Avanzado

**Paleta** (definida en `static/js/constants.js`):

| Variable CSS / JS    | Hex       | Uso                              |
|----------------------|-----------|----------------------------------|
| `--bg` / `bg`        | `#0f1421` | Fondo global                     |
| `--bg-soft` / `bgSoft` | `#161d2e` | Fondo de secciones, cards       |
| `--panel` / `panel`  | `#1c2438` | Paneles, sidebars                |
| `--border` / `border`| `#2c3654` | Bordes y separadores             |
| `--grid` / `grid`    | `#25304d` | Grilla del canvas                |
| `--text` / `text`    | `#e8ecf6` | Texto principal                  |
| `--text-dim` / `textDim` | `#9aa6c4` | Texto secundario, placeholders |
| `--accent` / `accent`| `#5b8cff` | Azul de acción primaria          |
| `--accent2` / `accent2` | `#7c5cff` | Violeta de acción secundaria   |
| `--ok` / `ok`        | `#35c98a` | Éxito, confirmación              |
| `--warn` / `warn`    | `#ffb454` | Advertencia, callout             |
| `--err` / `err`      | `#ff6b7a` | Error, alert                     |
| `--pink` / `pink`    | `#ff6bd6` | Curvas, elemento de highlight    |
| `--cyan` / `cyan`    | `#38d9d9` | Elemento extra, contraste        |

**Tipografía:** Inter (sans-serif), cargada vía sistema. LaTeX renderizado con
MathJax 3 (CDN, inline `$...$`, display `$$...$$`). Visualizaciones con
ECharts 5 (CDN) y canvas 2D propio (`canvas2d.js`).

**Estilo general:** modo oscuro, fondo casi negro `#0f1421`, tarjetas con borde
sutil, tipografía clara y compacta. Sin sombras pesadas; contraste alto para
fórmulas matemáticas.

**Componentes reutilizables** (`static/js/utils/`):
- `page.js` → `pageHeader`, `callout`, `proofBlock`, `mountCanvas`, `readout`
- `dom.js` → `el`, `typeset`, `slider`, `selectControl`
- `canvas2d.js` → `createPlane`, `hexAlpha`
- `resueltos.js` → `solvedExercise`, `seccionResueltos`
- `quiz.js` → `buildQuiz`

---

## Sistema en reserva: "Claude Code Club" (materia futura sin definir)

Capturado de referencia visual externa. **No implementado aún.** Guardado para
integrarlo en una materia nueva cuando se defina.

### Descripción visual

Estilo editorial de documento técnico, fondo crema/pergamino, tipografía
monoespaciada para contenido técnico y sans-serif condensado para títulos.
Paleta warm-orange sobre fondo off-white, con negro para texto y código.

### Paleta

| Rol                  | Color aprox. | Notas                                     |
|----------------------|--------------|-------------------------------------------|
| Fondo de página      | `#f5ede0`    | Crema/pergamino cálido                    |
| Fondo de cards/TOC   | `#ffffff`    | Blanco puro para contraste                |
| Acento principal     | `#e85d04`    | Naranja quemado (botón CTA, bullets)      |
| Acento secundario    | `#f4a51a`    | Amarillo-naranja (badge "JOIN", resalte)  |
| Texto principal      | `#1a1a1a`    | Casi negro                                |
| Texto secundario     | `#555555`    | Gris oscuro para metadatos                |
| Fondo de código      | `#1a1a1a`    | Negro; texto en crema o `#f5ede0`         |
| Acento de código     | `#e85d04`    | Label de lenguaje ("BASH") en naranja     |
| Borde de tarjeta     | `#000000`    | Negro sólido, 2 px, estilo editorial      |

### Tipografía

- **Títulos de sección**: sans-serif condensado en mayúsculas, negrita
  (`font-stretch: condensed; text-transform: uppercase`).
- **TOC / numeración**: monoespaciado pequeño (`font-family: monospace`),
  ítem activo en naranja y negrita.
- **Cuerpo**: sans-serif regular, cuerpo 15–16 px, interlineado 1.6.
- **Código**: monoespaciado sobre fondo negro, con label de lenguaje en naranja
  en la esquina superior izquierda y botón "COPY" en naranja superior derecho.

### Layout

- **Dos columnas**: columna izquierda fija (220–240 px) con tabla de contenidos
  (`#TOC`) y CTAs; columna derecha (contenido principal) con scroll.
- **TOC**: tarjeta blanca con borde negro 2 px; numeración `01`, `02`...
  en mono; ítem activo en naranja bold; sección activa con texto más claro.
- **Bloques de código**: fondo `#1a1a1a`, bordes negros, label y botón COPY.
- **Bullets de lista**: cuadrado naranja sólido (`■`) en lugar de punto redondo.
- **CTA principal**: botón relleno naranja (`#e85d04`), texto en negro bold,
  borde negro 2 px, flecha `→` al final.
- **CTA secundario**: botón outline negro, texto negro, ícono PDF.
- **Topbar**: fondo negro, logo naranja, nav en blanco/naranja, botón "JOIN" en
  naranja con borde naranja.

### Componentes clave a crear cuando se implemente

```
TOCSidebar        — columna izquierda con scroll-spy
ArticlePage       — layout dos columnas
CodeBlock         — bloque oscuro con label y botón COPY
StepSection       — sección con número de paso en título
EditorialBullet   — lista con ■ naranja
CTAPrimary        — botón naranja → negro
CTASecondary      — botón outline con ícono PDF
TopbarEditorial   — header negro con logo naranja
```

### Notas de implementación futuras

- El scroll-spy del TOC requiere `IntersectionObserver` para marcar el ítem
  activo a medida que se hace scroll por las secciones del artículo.
- El botón COPY en bloques de código usa `navigator.clipboard.writeText`.
- Los títulos de paso ("STEP 1: INSTALL...") deberían ser `<h2>` con clase
  `.step-heading` que aplique `text-transform: uppercase; font-stretch: condensed`.
- El layout de dos columnas funciona bien con CSS Grid:
  `grid-template-columns: 240px 1fr` y `position: sticky` para el TOC.
- Fondo de página con `background-color: #f5ede0` y `color: #1a1a1a` como
  variables raíz del tema "editorial".

---

## Sistema en reserva: "Proceso de ilustración" (materia futura sin definir)

Capturado de referencia visual externa. **No implementado aún.** Guardado para
integrarlo en una materia nueva cuando se defina.

### Descripción visual

Infografía de pasos numerados en formato vertical tipo "timeline de cards".
Estilo hand-drawn/sketch: bordes irregulares, decoraciones a mano (estrellas,
destellos, iconos de línea), fondo off-white con textura. Paleta vibrante de
tres colores (rosa/magenta, azul marino, blanco) aplicada en alternancia entre
el header de cada card y los bordes.

### Paleta

| Rol                     | Color aprox. | Notas                                              |
|-------------------------|--------------|----------------------------------------------------|
| Fondo de página         | `#f7f3ee`    | Off-white cálido, ligera textura papel             |
| Acento primario / fill  | `#e8215a`    | Rosa-magenta fuerte; header de cards impares       |
| Acento secundario       | `#1b2a6b`    | Azul marino oscuro; header de cards pares          |
| Texto sobre acento      | `#ffffff`    | Blanco puro para texto de headers de cards         |
| Texto de cuerpo         | `#1b2a6b`    | Azul marino para el texto del párrafo de cada card |
| Fondo de card           | `#ffffff`    | Blanco puro interior de cada card                  |
| Borde de card           | `#1b2a6b`    | Azul marino, ~2–3 px, estilo sketch (irregular)    |
| Título principal        | `#e8215a`    | Rosa-magenta, tipografía bold con sombra azul      |
| Decoraciones (sparkles) | `#e8215a` / `#1b2a6b` | Estrellas y destellos en ambos acentos  |

### Tipografía

- **Título de página** ("EL PROCESO DE ILUSTRACIÓN"): hand-drawn font o bold
  condensado redondeado, mayúsculas, tamaño grande. Color rosa con sombra/offset
  en azul marino para efecto 3D.
- **Número + nombre de paso** (ej. "1 · BRIEFING"): sans-serif bold, mayúsculas,
  blanco sobre el color de fondo del header de la card.
- **Cuerpo de card**: sans-serif regular, ~13–14 px, color azul marino, interlineado 1.5.
- **Icono de paso**: ilustración de línea simple dentro del header (bocadillo,
  libro, lápiz, etc.), blanco sobre color de fondo.

### Layout

- **Una columna central**, ancho fijo (~340–380 px), centrado en la página.
- **Cards apiladas verticalmente** con separación entre ellas (~12–16 px).
- Cada card tiene:
  - **Header**: fondo de color (rosa o azul alternado), número · NOMBRE DEL PASO
    a la izquierda, icono a la derecha, todo en blanco.
  - **Body**: fondo blanco, borde azul marino sketch-style, texto de descripción.
- **Decoraciones flotantes** entre cards: pequeñas estrellas de 4 y 6 puntas,
  destellos tipo "sparkle", colocados al azar en márgenes izquierdo y derecho.
- Esquinas del borde de cards ligeramente irregulares (SVG o `border-radius`
  variable para simular el efecto hand-drawn).

### Cards de pasos (estructura de cada una)

```
┌──────────────────────────────────────────┐
│ [icono]   N · NOMBRE DEL PASO            │  ← header coloreado (rosa o azul)
├──────────────────────────────────────────┤
│ Texto descriptivo del paso. Lorem ipsum  │  ← body blanco, texto azul
│ dolor sit amet...                        │
└──────────────────────────────────────────┘
```

La alternancia de colores de header es:
- Pasos 1, 3, 5, 7 → header rosa `#e8215a`
- Pasos 2, 4, 6, 8 → header azul `#1b2a6b`

### Componentes clave a crear cuando se implemente

```
StepCard          — card con header coloreado alternado, icono, número y body
StepList          — contenedor vertical de StepCards con decoraciones entre medio
SparkleDecor      — SVG de estrella/destello decorativo para los márgenes
PageTitleSketch   — título con efecto sombra offset bicolor (rosa + azul)
```

### Notas de implementación futuras

- El efecto "hand-drawn" en los bordes se puede lograr con un SVG de borde
  irregular como `border-image`, o con un `outline` ligeramente desplazado
  del borde usando `box-shadow` múltiple.
- La sombra del título se logra con `text-shadow: 3px 3px 0 #1b2a6b` sobre
  texto en `#e8215a`.
- Las decoraciones de sparkle son SVG inline de 3 tipos de tamaño (pequeño,
  mediano, grande) posicionadas con `position: absolute` en el wrapper de la lista.
- Para un layout responsivo, en móvil la columna única ya funciona; en desktop
  se puede expandir a dos columnas de cards (grid 2 columnas) manteniendo la
  alternancia de colores izquierda-derecha.
- Los iconos de cada paso son ilustraciones de línea simples (SVG o imagen);
  se pueden usar iconos de una librería tipo Phosphor o Lucide en estilo
  `stroke` sobre el color de fondo del header.
