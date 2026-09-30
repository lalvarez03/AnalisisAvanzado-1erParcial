param(
    [int]$TimeoutSeconds = 120,
    [string]$Url = "http://localhost:8000/health/",
    [int]$IntervalSeconds = 2
)

$MaxAttempts = [math]::Floor($TimeoutSeconds / $IntervalSeconds)
$attempt = 0
$success = $false

Write-Host "Esperando a que el servidor este listo..." -ForegroundColor Cyan
Write-Host "URL: $Url"
Write-Host "Timeout maximo: $TimeoutSeconds segundos"
Write-Host ""

while ($attempt -lt $MaxAttempts -and -not $success) {
    $attempt++

    try {
        $response = Invoke-WebRequest -Uri $Url -Method GET -TimeoutSec 3 -UseBasicParsing -ErrorAction Stop

        if ($response.StatusCode -eq 200) {
            $content = $response.Content | ConvertFrom-Json
            if ($content.status -eq "ok") {
                Write-Host ""
                Write-Host "[OK] Servidor listo!" -ForegroundColor Green
                Write-Host ""
                $success = $true
                exit 0
            }
            elseif ($content.status -eq "loading") {
                Write-Host "Intento $attempt/$MaxAttempts - Servidor iniciado, cargando..." -ForegroundColor Yellow
            }
        }
    }
    catch {
        $errorMsg = $_.Exception.Message
        if ($errorMsg -like "*503*") {
            Write-Host "Intento $attempt/$MaxAttempts - Servidor iniciado, cargando..." -ForegroundColor Yellow
        }
        else {
            Write-Host "Intento $attempt/$MaxAttempts - Esperando que el servidor inicie..." -ForegroundColor Yellow
        }
    }

    if (-not $success) {
        Start-Sleep -Seconds $IntervalSeconds
    }
}

if (-not $success) {
    Write-Host ""
    Write-Host "[TIMEOUT] El servidor no respondio tras $TimeoutSeconds segundos." -ForegroundColor Red
    Write-Host "El navegador se abrira igual. Si la pagina no carga, espera unos segundos y recarga." -ForegroundColor Yellow
    Write-Host ""
    exit 1
}
