# NEXUS Run Script (PowerShell)
# This script handles infrastructure, dependencies, and starting the dev server.

$ErrorActionPreference = "Stop"

# Force Node.js into the current session path
$env:PATH += ";C:\Program Files\nodejs\"

function Write-Header {
    param([string]$Text)
    Write-Host ""
    Write-Host "=== $Text ===" -ForegroundColor Cyan
}

# 0. System Check
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "`n❌ Error: 'npm' not found even after forcing path." -ForegroundColor Red
    Write-Host "Please reinstall Node.js and restart your computer.`n" -ForegroundColor Yellow
    exit 1
}

Write-Header "NEXUS Platform Lifecycle"

# 1. Infrastructure (Optional)
if (Get-Command docker-compose -ErrorAction SilentlyContinue) {
    Write-Host "[Infra] Starting containers (MinIO, Meilisearch)..." -ForegroundColor Yellow
    docker-compose -f infra/docker-compose.yml up -d
} else {
    Write-Host "[Infra] docker-compose not found. Using SQLite and skipping optional services." -ForegroundColor Gray
}

# 2. Dependency Check
if (!(Test-Path "node_modules")) {
    Write-Header "Installing Dependencies"
    npm install
}

# 3. Port Cleanup
Write-Host "[System] Ensuring ports 3000 (Web) and 4000 (API) are clear..." -ForegroundColor Yellow
$ports = @(3000, 4000)
foreach ($port in $ports) {
    try {
        $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
        if ($connections) {
            foreach ($conn in $connections) {
                $procId = $conn.OwningProcess
                $procName = (Get-Process -Id $procId).ProcessName
                Write-Host "   -> Stopping $procName (PID: $procId) on port $port..." -ForegroundColor Gray
                Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
            }
            Start-Sleep -Seconds 1 # Wait for OS to release port
        }
    } catch {
        Write-Host "   -> Warning: Could not clear port $port. It might be in use by a system service." -ForegroundColor Red
    }
}

# 3. Launch
Write-Header "Launching Dev Server"
$localIP = (Get-NetIPAddress | Where-Object { $_.AddressState -eq 'Preferred' -and $_.AddressFamily -eq 'IPv4' -and $_.InterfaceAlias -notlike '*Loopback*' } | Select-Object -First 1).IPAddress
Write-Host "Access NEXUS at:" -ForegroundColor Green
Write-Host "  Local:   http://localhost:3000" -ForegroundColor Cyan
if ($localIP) {
    Write-Host "  Network: http://$localIP`:3000" -ForegroundColor Cyan
}
Write-Host "Press Ctrl+C to stop.`n"

npm run dev
