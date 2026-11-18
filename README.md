# Análisis Avanzado — Aprendizaje Interactivo

App web para estudiar **Cardinalidad** y **Espacios Métricos** de la materia
Análisis Avanzado (DM · FCEN · UBA), con visualizaciones interactivas.

Cada tema combina la definición formal (renderizada con LaTeX) con una
visualización manipulable: arrastrás puntos, movés sliders y ves cómo cambian
las nociones topológicas en tiempo real.

## Temas cubiertos

**Fundamentos**
- Supremos e ínfimos (cotas, axioma de completitud, caracterización ε)
- Sucesiones (límite ε–n₀, monótonas acotadas, subsucesiones)

**Cardinalidad**
- Equivalencia de conjuntos (biyecciones)
- Conjuntos finitos, numerables y no numerables
- El Hotel de Hilbert
- Argumento diagonal de Cantor: ℝ no es numerable
- Orden entre cardinales (partes de un conjunto, jerarquía de infinitos)

**Espacios Métricos**
- Distancia y bolas (métricas d₁, d₂, d∞)
- Interior, clausura y frontera; abiertos y cerrados
- Puntos de acumulación y puntos aislados
- Compacidad y teorema de Heine-Borel
- Sucesiones de Cauchy y completitud
- Continuidad (ε–δ)
- Teorema del punto fijo de Banach

**Sucesiones de funciones (Práctica 7)**
- Convergencia puntual vs. uniforme con visualización de la franja $\varepsilon$
- Continuidad, integral y derivada del límite; series y criterio M de Weierstrass

**Progreso y feedback**
- El avance se maneja con checkboxes en el menú lateral (por tema, por práctica o todo junto).
- "Tu opinión": comentario positivo/negativo con hasta 2 imágenes. En GitHub Pages se envía a un
  Google Apps Script (planilla + Drive + mail; ver `docs/feedback-apps-script.md` y `static/js/config.js`);
  con el servidor local se guarda en `feedback/` (ignorada por git).

**Estudiar por práctica**
- Un espacio por cada guía (P1–P7): teoría necesaria, recetas, mapa de ejercicios,
  errores comunes y ejercicios resueltos paso a paso

**Espacios Normados (Práctica 6)**
- Normas ‖·‖₁, ‖·‖₂, ‖·‖∞ en ℝⁿ; bolas y su forma (rombo, círculo, cuadrado)
- Equivalencia de normas en dimensión finita; Cesàro; subespacios
- Espacios ℓ∞, ℓ² y ℝₙ[t]; operadores lineales (continuo ⟺ acotado)
- Norma de un operador; derivación (no continua) vs. operador integral

Más un **Asistente de ejercicios** donde armás demostraciones de la Práctica 1
arrastrando los pasos al orden correcto (o completando huecos), y una
**autoevaluación** con preguntas basadas en las Prácticas 2, 3, 5 y 6.

## Cómo ejecutar

### Opción 1: Ejecución automática (recomendado)

1. Hacé doble clic en `iniciar_app.bat`.
2. El script detecta Python, instala las dependencias si hace falta e inicia el servidor.
3. El navegador se abre solo en http://localhost:8000 cuando el servidor está listo.

### Opción 2: Ejecución manual

```bash
# 1. Instalar dependencias
py -m pip install -r requirements.txt

# 2. Iniciar servidor
py -m uvicorn app.main:app --host 0.0.0.0 --port 8000

# 3. Abrir el navegador en http://localhost:8000
```

### Detener el servidor

- Cerrá la ventana de terminal "Analisis Avanzado - Servidor", o
- Presioná Ctrl+C en esa ventana.

## Requisitos

- Python 3.8 o superior
- Navegador web moderno (Chrome, Firefox, Edge) con conexión a internet
  (MathJax y ECharts se cargan desde CDN)

## Estructura del proyecto

```
.
├── iniciar_app.bat          Launcher (Windows)
├── wait_for_server.ps1      Health check con polling
├── requirements.txt
├── app/
│   └── main.py              FastAPI: sirve la SPA y expone /health/
└── static/
    ├── index.html
    ├── css/styles.css
    └── js/
        ├── app.js           Entry point (orquestador)
        ├── constants.js     Paleta y configuración
        ├── state.js         Estado + progreso
        ├── navigation.js    Router por hash
        ├── utils/           Helpers (dom, canvas2d, page, quiz)
        └── pages/           Una página por tema
```

El frontend usa **ES Modules nativos** (sin bundler): el navegador carga
`app.js` con `type="module"` y este importa el resto.

## Varias materias (componentes)

La app tiene una capa superior (menú de materias, router, Pomodoro, progreso) y cada materia es un
componente autocontenido en `static/materias/<id>/` (plan, páginas, ejercicios resueltos, resultados clave,
espacio de estudio y machete). El progreso se guarda por materia.

```bash
# Crear una materia nueva (genera la carpeta y la registra en static/materias/registry.js)
py tools/nueva_materia.py algebra-lineal "Álgebra Lineal" --icono 🧮 --color "#35c98a"
```

El machete de cada materia se abre en `machete.html?m=<id>`. La guía para crear y mantener materias es la
skill local `.kiro/skills/materias-componentes/SKILL.md`.

## Sobre el contenido

Las definiciones, teoremas y ejercicios siguen las notas de clase y las
Prácticas 1–6 de Análisis Avanzado, más el segundo parcial 2024. Es material de
estudio complementario y no reemplaza las demostraciones completas del curso.
