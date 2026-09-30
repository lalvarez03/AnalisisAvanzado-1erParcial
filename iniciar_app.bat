@echo off
REM Script de inicio automatico - Analisis Avanzado (Aprendizaje Interactivo)
REM Inicia el servidor FastAPI y abre el navegador.

echo.
echo ========================================
echo  Analisis Avanzado - App Interactiva
echo  Cardinalidad y Espacios Metricos
echo  Iniciando servidor...
echo ========================================
echo.

cd /d "%~dp0"

set PYTHON_CMD=
echo Verificando instalacion de Python...
echo.

python --version >nul 2>&1
if not errorlevel 1 (
    set PYTHON_CMD=python
    goto :validate_version
)

python3 --version >nul 2>&1
if not errorlevel 1 (
    set PYTHON_CMD=python3
    goto :validate_version
)

py --version >nul 2>&1
if not errorlevel 1 (
    set PYTHON_CMD=py
    goto :validate_version
)

goto :python_not_found

:validate_version
for /f "tokens=2" %%i in ('%PYTHON_CMD% --version 2^>^&1') do set PYTHON_VERSION=%%i
for /f "tokens=1 delims=." %%i in ("%PYTHON_VERSION%") do set PYTHON_MAJOR=%%i

if %PYTHON_MAJOR% LSS 3 goto :python2_only_found

echo [OK] Python %PYTHON_VERSION% detectado (comando: %PYTHON_CMD%)
echo.
goto :python_found

:python_not_found
echo.
echo ========================================
echo ERROR: Python 3.x no encontrado
echo ========================================
echo.
echo No se pudo encontrar una instalacion valida de Python 3.x
echo Se intentaron los comandos: python, python3, py
echo.
echo Por favor:
echo   1. Instala Python 3.x desde https://www.python.org/downloads/
echo   2. O agrega Python al PATH del sistema
echo.
pause
exit /b 1

:python2_only_found
echo.
echo ========================================
echo ERROR: Version de Python incompatible
echo ========================================
echo.
echo Se detecto Python %PYTHON_VERSION% pero se requiere Python 3.x o superior.
echo Instala Python 3.x desde https://www.python.org/downloads/
echo.
pause
exit /b 1

:python_found
REM Verificar dependencia principal (uvicorn); si falta, instalar todo.
%PYTHON_CMD% -c "import uvicorn, fastapi" >nul 2>&1
if errorlevel 1 (
    echo Dependencias no encontradas. Instalando desde requirements.txt...
    %PYTHON_CMD% -m pip install -r requirements.txt
    if errorlevel 1 (
        echo.
        echo ERROR: No se pudieron instalar las dependencias.
        echo Ejecuta manualmente: %PYTHON_CMD% -m pip install -r requirements.txt
        echo.
        pause
        exit /b 1
    )
)

echo Iniciando servidor en http://localhost:8000
echo.

start "Analisis Avanzado - Servidor" cmd /c "%PYTHON_CMD% -m uvicorn app.main:app --host 0.0.0.0 --port 8000 & pause"

echo.
powershell -ExecutionPolicy Bypass -File "%~dp0wait_for_server.ps1" -TimeoutSeconds 120

echo.
echo Abriendo navegador en http://localhost:8000
start http://localhost:8000

echo.
echo ========================================
echo  Aplicacion iniciada
echo ========================================
echo.
echo El servidor corre en la ventana "Analisis Avanzado - Servidor".
echo Para detenerlo, cerra esa ventana o presiona Ctrl+C en ella.
echo.
echo Si la pagina no carga al instante, espera unos segundos y recarga (F5).
echo.

pause
