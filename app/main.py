"""
Análisis Avanzado — App interactiva de aprendizaje.

Backend mínimo con FastAPI que sirve la aplicación estática (frontend en
ES Modules) y expone un endpoint de health check para el launcher.

Temas cubiertos:
  - Cardinalidad (equivalencia de conjuntos, numerabilidad, Cantor).
  - Espacios métricos (topología, compacidad, completitud, continuidad,
    punto fijo, sucesiones de Cauchy).
"""
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles

BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = BASE_DIR / "static"
INDEX_FILE = STATIC_DIR / "index.html"

app = FastAPI(
    title="Análisis Avanzado — Aprendizaje Interactivo",
    description="Cardinalidad y Espacios Métricos (UBA).",
    version="1.0.0",
)


@app.get("/health/")
def health():
    """Health check. El launcher espera status 'ok' antes de abrir el navegador."""
    ready = INDEX_FILE.exists() and (STATIC_DIR / "js" / "app.js").exists()
    if not ready:
        return JSONResponse(
            status_code=503,
            content={"status": "loading", "message": "Archivos estáticos no disponibles aún."},
        )
    return {"status": "ok", "data_loaded": True}


@app.get("/")
def index():
    """Sirve la SPA."""
    return FileResponse(INDEX_FILE)


# Servir el frontend estático bajo /static (compatibilidad hacia atrás)
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

# Servir el frontend en la raíz para que las rutas relativas (css/..., js/...)
# funcionen igual que en GitHub Pages. Debe montarse al final para no pisar
# las rutas /health/ e /.
app.mount("/", StaticFiles(directory=str(STATIC_DIR), html=True), name="root")
