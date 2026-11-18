---
name: materias-componentes
description: Usar para crear, completar, modificar o revisar una MATERIA de la app de estudio (cada materia es un componente autocontenido en static/materias/<id>/ con su plan, páginas de teoría, resultados clave, guías de ejercicios resueltos, espacio "Estudiar por práctica" y machete), o para tocar el menú de materias / el núcleo multi-materia (registry, router, progreso por materia). Incluye el scaffolder `py tools/nueva_materia.py`, el contrato del manifiesto y los formatos de cada archivo. Ignorar en tareas que no toquen la estructura de materias.
---

# Materias como componentes

La app tiene **dos capas**:

1. **Núcleo / capa superior** (`static/js/`): menú de materias, router por hash, barra superior, Pomodoro, progreso, y páginas genéricas
   (`inicio`, `estudio`, `guia`, `feedback`). **No conoce ninguna materia en particular.**
2. **Materias** (`static/materias/<id>/`): cada una es un componente con su propia información, ejercicios, formatos y estructura.
   El núcleo solo lee su **manifiesto** (`index.js`).

```
static/
├─ index.html, machete.html           # shells (no cambian por materia)
├─ js/core/  materia.js hub.js machete.js paginas/{inicio,estudio,guia,feedback}.js
├─ js/{navigation,state,app,pomodoro,config,constants}.js
├─ js/utils/                          # KIT COMPARTIDO: dom, page, canvas2d, resueltos (solvedExercise), dnd, ejercicios.exRef
└─ materias/
   ├─ registry.js                     # catálogo (una entrada por materia)
   └─ <id>/                           # ← un componente por materia
      ├─ index.js                     # manifiesto (contrato)
      ├─ plan.js                      # unidades + páginas + herramientas
      ├─ pages/*.js                   # páginas propias de teoría/visualización
      ├─ guias/*.js                   # ejercicios resueltos
      ├─ resultados.js                # teoremas/propiedades por tema
      ├─ estudio.js                   # "Estudiar por práctica"
      ├─ machete.html                 # fragmento HTML por fases
      └─ README.md
```

> **Nota histórica:** `analisis-avanzado` es la materia original. Su `index.js`, `plan.js`, `resultados.js`, `estudio.js` y
> `machete.html` ya están en su carpeta, pero sus páginas interactivas siguen en `js/pages/` y sus guías en `js/utils/guia-p*.js`
> (el manifiesto las importa desde ahí). **Las materias nuevas guardan todo dentro de su carpeta.** No copies ese layout.

## Crear una materia (flujo recomendado)

1. `py tools/nueva_materia.py <id> "Nombre" --icono 🧮 --color "#35c98a" --institucion "DM · FCEN · UBA" --descripcion "..."`
   - `id` en kebab-case (`algebra-lineal`). No sobrescribe nada existente; registra la materia en `registry.js`.
2. Abrir `index.html#<id>/inicio` (servidor: `iniciar_app.bat`). La materia ya aparece en el menú de materias.
3. Completar, en este orden: `plan.js` → `pages/*.js` → `resultados.js` → `guias/*.js` + `estudio.js` → `machete.html`.
4. Verificar (ver "Checklist") y, si hay datos de ejemplo del scaffolder, borrarlos.

Registro manual (si no se usa el scaffolder): una entrada en `static/materias/registry.js`
`{ id, nombre, icono, color, institucion, descripcion, estado: 'activa' | 'proximamente', cargar: () => import('./<id>/index.js') }`.

## Contrato del manifiesto (`index.js` → `export default {...}`)

| Campo | Tipo | Notas |
|---|---|---|
| `id`, `nombre`, `nombreCorto`, `icono`, `color`, `institucion`, `subtitulo` | string | `id` = nombre de carpeta y clave en el registro |
| `intro`, `inicioRuta` | HTML | textos del menú principal de la materia |
| `primeraPagina` | id de página | a donde lleva "Empezar por el principio" |
| `unidades` | `[{id, num, etiqueta, ic, color, titulo, capitulo, resumen, requiere:[ids], paginas:[{id, ic, titulo, desc}]}]` | cada `paginas[].id` cuenta para el progreso |
| `herramientas` | `[{id, ic, titulo, desc}]` | páginas sueltas; no cuentan para el progreso |
| `paginas` | `{ [idPagina]: (root) => void }` | render de cada página propia; pisa a las genéricas |
| `resultados` | `{ [idPagina]: [{n, e, ref?, p?}] }` | se muestra al pie de cada tema |
| `estudio` | `[{id, titulo, teoria, paginas:[[id,nombre]], resumen, saber[], recetas[[titulo,cuerpo]], mapa[[ej,tema,técnica,teoría]], errores[]}]` | un objeto por guía |
| `guias` | `[{id, nombre, datos:[ejercicio]}]` | `id` igual al de `estudio` para enlazarlos |
| `machete` | `'machete.html'` | fragmento dentro de la carpeta de la materia |
| `almacenamiento` | `{visited, seen, lastPage, navCollapsed, practica}` | **solo** para conservar claves antiguas; las materias nuevas no lo usan |

Todo el contrato está comentado en `static/js/core/materia.js`. Los ids de página son únicos **dentro** de la materia.
Ids reservados con versión genérica: `inicio`, `estudio`, `guia`, `feedback` (declarar `estudio`/`guia`/`feedback` en `herramientas` para que aparezcan en el menú).

## Formatos de contenido (lo que cambia entre materias)

- **Página de teoría**: `export function renderX(root)` usando el kit (`pageHeader`, `callout('def'|'thm'|'tip'|'warn', tag, html, proofHtml?)`,
  `mountCanvas`, `slider`, `selectControl`, `exRef`). Mantener `.kiro/steering/audiencia-estudiante.md` (motivación → intuición → definición → ejemplo →
  teorema+prueba → visualización → errores comunes) y `teoria-analisis-avanzado.md` como modelo de rigor.
- **Ejercicio resuelto** (`guias/*.js`): `{ fuente, enunciado, idea?, pasos:[{idea, detalle}], conclusion? }` → componente `solvedExercise`.
  Una materia con otro formato (p. ej. problemas numéricos, código, laboratorio) crea su **propio componente** en su carpeta y lo usa en una página propia.
- **Resultado clave**: `{ n, e, ref?, p? }`. **Machete**: `<section class="fase" id="fN" data-practica="…">` con `.fase-head`, `.defs-clave`, `.m-cols` y `.m-card`
  (clases en `css/machete.css`). El índice y la etiqueta de práctica se generan solos.
- **Etiquetas de unidad**: `etiqueta` es libre (`P1`, `U3`, `Cap. 2`, `Lab`…); el menú, el inicio y los botones "Ejercicios de …" la usan.
- **Herramientas propias** (quiz, simulador, laboratorio): agregar a `herramientas` y a `paginas`.

## Reglas de aislamiento (importante)

1. **Una materia nunca importa de otra materia.** Solo del kit compartido (`../../../js/utils/*.js`, `../../../js/constants.js`) y de su carpeta.
2. **El núcleo nunca importa una materia concreta** (solo `registry.js`). Nada de `if (materia.id === …)` en `js/`.
3. **Links entre páginas**: `href="#<idPagina>"` (se resuelven contra la materia activa). Para ir a otra materia: `#<materiaId>/<idPagina>`.
   Menú de materias: `#materias`. Machete: `machete.html?m=<id>`.
4. **Progreso por materia**: claves `aa:<id>:visited|seen|lastPage|navCollapsed|practica` (ver `claveMateria`). Usar siempre `claveMateria(...)`; nunca claves fijas.
   Pomodoro y preferencias son globales a propósito.
5. Si una necesidad es común a varias materias (nuevo tipo de callout, componente de ejercicio), va al **kit compartido** `js/utils/`, no se duplica.
6. Seguir las reglas del repo: `.gitignore` de datos corporativos, nada de datos reales; LaTeX con `\\` doble dentro de strings JS.

## Checklist de verificación (antes de dar una materia por lista)

- [ ] `py tools/nueva_materia.py` / entrada en `registry.js`; abre en `index.html#<id>/inicio`.
- [ ] Todo `paginas[].id` de `unidades` y de `herramientas` tiene render (propio o genérico) y viceversa.
- [ ] `resultados` solo con ids de páginas de teoría existentes; `guias[].id` ↔ `estudio[].id` emparejados.
- [ ] Cada ejercicio tiene `enunciado`, `pasos` y cierre ($\blacksquare$); sin pasos "se deja como ejercicio" sin justificar.
- [ ] El machete carga en `machete.html?m=<id>` y el índice superior muestra todas las fases.
- [ ] Sintaxis: `node --check --input-type=module < archivo.js` por cada JS; el servidor de `app/main.py` no necesita cambios.
- [ ] Progreso: marcar/desmarcar en el menú no afecta a otras materias.

## Cómo cambiar el núcleo sin romper las materias

- Agregar un campo al manifiesto: **opcional** y con valor por defecto en el núcleo; documentarlo acá y en `core/materia.js`.
- Renombrar un id de página en una materia invalida el progreso guardado de esos temas (aceptable); no renombrar `inicio/estudio/guia/feedback`.
- Cambios en `state.js`/`navigation.js`: probar con **dos** materias (crear una de prueba con el scaffolder y borrarla después).
