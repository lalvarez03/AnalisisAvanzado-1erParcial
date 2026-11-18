"""
Análisis Avanzado — App interactiva de aprendizaje.

Backend mínimo con FastAPI que sirve la aplicación estática (frontend en
ES Modules) y expone un endpoint de health check para el launcher.

Temas cubiertos:
  - Cardinalidad (equivalencia de conjuntos, numerabilidad, Cantor).
  - Espacios métricos (topología, compacidad, completitud, continuidad,
    punto fijo, sucesiones de Cauchy).
"""
import base64
import binascii
import json
import re
import threading
import time
import uuid
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Literal

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

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


# ---------------------------------------------------------------------------
# Feedback: se guarda en disco (carpeta feedback/, ignorada por git).
# Solo funciona cuando la app corre con este servidor (iniciar_app.bat). En
# GitHub Pages el frontend usa el endpoint de Google Apps Script (ver
# static/js/config.js y docs/feedback-apps-script.md).
# ---------------------------------------------------------------------------
FEEDBACK_DIR = BASE_DIR / "feedback"
MAX_BODY_BYTES = 8 * 1024 * 1024      # 8 MB por request (2 imágenes + texto en base64)
MAX_IMAGE_BYTES = 3 * 1024 * 1024     # 3 MB por imagen ya decodificada
MAX_IMAGES = 2
MAX_TEXT = 2000

# Firma de archivo (magic bytes) -> extensión. No se confía en el nombre ni el mime del cliente.
_IMAGE_SIGNATURES = (
    (b"\x89PNG\r\n\x1a\n", "png"),
    (b"\xff\xd8\xff", "jpg"),
    (b"RIFF", "webp"),  # se completa con la marca WEBP en bytes 8..12
)


def _detect_image_ext(raw: bytes):
    for sig, ext in _IMAGE_SIGNATURES:
        if raw.startswith(sig):
            if ext == "webp" and raw[8:12] != b"WEBP":
                return None
            return ext
    return None


# Anti-spam: una opinión cada 30 minutos por IP y por navegador (id anónimo). Memoria del proceso:
# se reinicia con el servidor, lo cual alcanza para el uso local de esta app.
COOLDOWN_SECONDS = 30 * 60
_CLIENTE_VALIDO = re.compile(r"^[A-Za-z0-9-]{8,64}$")
_ultimos_envios: Dict[str, float] = {}
_lock_envios = threading.Lock()


def _claves_limite(request: Request, cliente: str) -> List[str]:
    claves = []
    if request.client and request.client.host:
        claves.append("ip:" + request.client.host)
    if _CLIENTE_VALIDO.match(cliente or ""):
        claves.append("c:" + cliente)
    return claves


def _segundos_restantes(claves: List[str], ahora: float) -> int:
    """Segundos que faltan para poder enviar de nuevo (0 si ya se puede). Poda entradas vencidas."""
    for k in [k for k, t in _ultimos_envios.items() if ahora - t >= COOLDOWN_SECONDS]:
        del _ultimos_envios[k]
    faltan = [COOLDOWN_SECONDS - (ahora - _ultimos_envios[k]) for k in claves if k in _ultimos_envios]
    return int(max(faltan)) + 1 if faltan else 0


class FeedbackImage(BaseModel):
    name: str = Field(default="imagen", max_length=120)
    data: str  # base64 sin prefijo data:


class FeedbackIn(BaseModel):
    tipo: Literal["positivo", "negativo"]
    materia: str = Field(default="", max_length=80)
    comentario: str = Field(min_length=3, max_length=MAX_TEXT)
    tema: str = Field(default="", max_length=120)
    contacto: str = Field(default="", max_length=120)
    imagenes: List[FeedbackImage] = Field(default_factory=list)
    website: str = ""  # honeypot: un humano lo deja vacío
    cliente: str = Field(default="", max_length=64)  # id anónimo del navegador (para el límite de envíos)


@app.post("/api/feedback")
async def post_feedback(payload: FeedbackIn, request: Request):
    """Guarda un comentario (positivo/negativo) con hasta 2 imágenes en feedback/<fecha>_<id>/."""
    length = request.headers.get("content-length")
    if length and length.isdigit() and int(length) > MAX_BODY_BYTES:
        raise HTTPException(status_code=413, detail="El envío es demasiado grande.")
    if payload.website:  # bot: se responde "ok" sin guardar nada
        return {"status": "ok"}
    if len(payload.imagenes) > MAX_IMAGES:
        raise HTTPException(status_code=422, detail=f"Máximo {MAX_IMAGES} imágenes.")

    # Límite de envíos (se consulta antes de procesar; se registra recién cuando se guardó bien).
    claves = _claves_limite(request, payload.cliente)
    with _lock_envios:
        espera = _segundos_restantes(claves, time.time())
    if espera:
        return JSONResponse(
            status_code=429,
            headers={"Retry-After": str(espera)},
            content={
                "detail": f"Ya enviaste una opinión hace poco. Podés enviar otra en {max(1, espera // 60)} min.",
                "retry_after": espera,
            },
        )

    decoded = []
    for img in payload.imagenes:
        try:
            raw = base64.b64decode(img.data, validate=True)
        except (binascii.Error, ValueError):
            raise HTTPException(status_code=422, detail="Imagen con formato inválido.")
        if len(raw) > MAX_IMAGE_BYTES:
            raise HTTPException(status_code=413, detail="Cada imagen puede pesar hasta 3 MB.")
        ext = _detect_image_ext(raw)
        if ext is None:
            raise HTTPException(status_code=422, detail="Solo se aceptan imágenes PNG, JPG o WEBP.")
        decoded.append((raw, ext))

    stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    folder = FEEDBACK_DIR / f"{stamp}_{uuid.uuid4().hex[:6]}"
    folder.mkdir(parents=True, exist_ok=True)
    files = []
    for i, (raw, ext) in enumerate(decoded, start=1):
        fname = f"imagen_{i}.{ext}"  # nombre generado por el servidor
        (folder / fname).write_bytes(raw)
        files.append(fname)

    record = {
        "fecha": datetime.now().isoformat(timespec="seconds"),
        "tipo": payload.tipo,
        "materia": payload.materia.strip(),
        "tema": payload.tema.strip(),
        "comentario": payload.comentario.strip(),
        "contacto": payload.contacto.strip(),
        "imagenes": files,
        "user_agent": request.headers.get("user-agent", "")[:200],
    }
    (folder / "feedback.json").write_text(json.dumps(record, ensure_ascii=False, indent=2), encoding="utf-8")
    with _lock_envios:
        ahora = time.time()
        for k in claves:
            _ultimos_envios[k] = ahora
    return {"status": "ok", "id": folder.name}


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
