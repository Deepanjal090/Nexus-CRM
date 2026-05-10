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
Write-Host "🧹 Clearing ports 3000 and 4000..." -ForegroundColor Yellow
$ports = @(3000, 4000)
foreach ($port in $ports) {
    $processId = (Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue).OwningProcess
    if ($processId) {
        Write-Host "   Stopping process on port $port..." -ForegroundColor Gray
        Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
    }
}

# 3. Launch
Write-Header "Launching Dev Server"
Write-Host "Access NEXUS at: http://localhost:3000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop.`n"

npm run dev
