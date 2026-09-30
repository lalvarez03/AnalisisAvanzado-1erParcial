# Requisitos mínimos y guía de instalación

Esta app es un servidor web local (FastAPI) que corre en tu PC y se ve en el
navegador. Es liviana: no entrena modelos ni hace cálculos pesados, así que
casi cualquier computadora actual la corre sin problemas.

---

## 1. Requisitos mínimos

| Componente | Mínimo | Recomendado |
|-----------|--------|-------------|
| Sistema operativo | Windows 10 / macOS 11 / Linux reciente | Windows 11 |
| Python | 3.8 | 3.11 o 3.13 |
| RAM | 2 GB libres | 4 GB o más |
| Disco | ~150 MB (Python + dependencias) | — |
| CPU | Cualquiera de los últimos 10 años | — |
| Navegador | Chrome / Edge / Firefox actualizado | Chrome o Edge |
| Internet | Sí, la primera vez (y para las fórmulas) | Conexión estable |

> **Por qué necesitás internet:** las fórmulas matemáticas (MathJax) y los
> gráficos (ECharts) se descargan desde un CDN al abrir la app. Sin conexión,
> el texto se ve pero las fórmulas aparecen como código `$...$` y algunos
> gráficos no cargan. La primera ejecución también descarga las dependencias
> de Python.

---

## 2. Verificar si ya tenés Python

Abrí una terminal (en Windows: buscá **PowerShell** en el menú Inicio) y
ejecutá, uno por uno, estos comandos hasta que alguno responda una versión:

```powershell
python --version
python3 --version
py --version
```

- Si ves algo como `Python 3.11.5` → ✅ ya tenés Python, pasá al **paso 4**.
- Si los tres dan error o "no se reconoce" → seguí con el **paso 3**.

> El número debe empezar con **3**. Si dice `Python 2.x`, necesitás instalar
> Python 3.

---

## 3. Instalar Python (solo si no lo tenés)

### Windows
1. Entrá a https://www.python.org/downloads/ y descargá la última versión 3.x.
2. Ejecutá el instalador.
3. **IMPORTANTE:** en la primera pantalla, tildá la casilla
   **"Add python.exe to PATH"** antes de continuar.
4. Hacé clic en **Install Now** y esperá a que termine.
5. Cerrá y volvé a abrir la terminal, y verificá con `python --version`.

### macOS
- Opción simple: descargá el instalador desde https://www.python.org/downloads/
- Opción con Homebrew: `brew install python`

### Linux (Debian/Ubuntu)
```bash
sudo apt update && sudo apt install python3 python3-pip
```

---

## 4. Ejecutar la app

### Opción A — Automática (Windows, recomendada)

1. Abrí la carpeta del proyecto en el Explorador de archivos.
2. Hacé **doble clic** en `iniciar_app.bat`.
3. Se abre una ventana negra que:
   - detecta Python,
   - instala las dependencias la primera vez (puede tardar 1–2 minutos),
   - inicia el servidor,
   - abre el navegador solo cuando todo está listo.
4. Listo: la app queda en `http://localhost:8000`.

> La primera vez tarda más porque descarga FastAPI y Uvicorn. Las siguientes
> veces arranca en segundos.

### Opción B — Manual (cualquier sistema)

Desde la carpeta del proyecto, en la terminal:

```bash
# 1. Instalar dependencias (solo la primera vez)
py -m pip install -r requirements.txt

# 2. Iniciar el servidor
py -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Después abrí el navegador en http://localhost:8000

> En macOS/Linux usá `python3` en lugar de `py`.

---

## 5. Detener la app

- **Opción A:** cerrá la ventana de terminal titulada
  "Analisis Avanzado - Servidor".
- **Opción B:** presioná `Ctrl + C` en la terminal donde corre el servidor.

---

## 6. Problemas comunes

**"python no se reconoce como comando"**
Python no está en el PATH. Reinstalalo tildando "Add python.exe to PATH"
(paso 3), o probá con `py` en lugar de `python`.

**El navegador muestra las fórmulas como `$...$`**
No hay conexión a internet, o el CDN está bloqueado. Conectate a internet y
recargá la página (F5).

**"El puerto 8000 ya está en uso"**
Otra app está usando ese puerto. Cerrá la otra, o iniciá en otro puerto:
```bash
py -m uvicorn app.main:app --port 8010
```
y abrí http://localhost:8010

**El launcher no instala las dependencias**
Instalalas a mano:
```bash
py -m pip install -r requirements.txt
```
Si `pip` falla por permisos, agregá `--user` al final.

**La página no carga al instante**
Esperá unos segundos (el servidor puede tardar en levantar) y recargá con F5.

---

## 7. ¿Necesito una GPU o mucha RAM?

No. La app solo sirve páginas HTML/JavaScript y hace cálculos triviales en el
navegador (dibujar puntos, evaluar fórmulas simples). Corre igual de bien en
una notebook modesta que en una PC potente.
