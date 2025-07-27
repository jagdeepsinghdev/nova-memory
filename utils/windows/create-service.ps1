# PowerShell script to create a Windows service for Nova Memory MCP
# Run as Administrator

$serviceName = "NovaMCPServer"
$displayName = "Nova Memory MCP Server"
$description = "Model Context Protocol server for Nova Memory AI system"
$nodePath = (Get-Command node).Path
$scriptPath = Join-Path $PSScriptRoot "auto-start-mcp.js"

# Check if running as admin
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator"))
{
    Write-Host "This script needs to be run as Administrator." -ForegroundColor Red
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    exit 1
}

# Check if service exists
$service = Get-Service -Name $serviceName -ErrorAction SilentlyContinue

if ($service) {
    Write-Host "Service already exists. Removing old service..." -ForegroundColor Yellow
    Stop-Service -Name $serviceName -Force -ErrorAction SilentlyContinue
    sc.exe delete $serviceName
    Start-Sleep -Seconds 2
}

# Create the service using nssm (if available) or sc.exe
$nssmPath = "$env:ChocolateyInstall\bin\nssm.exe"

if (Test-Path $nssmPath) {
    Write-Host "Creating service using NSSM..." -ForegroundColor Green
    & $nssmPath install $serviceName $nodePath $scriptPath
    & $nssmPath set $serviceName DisplayName $displayName
    & $nssmPath set $serviceName Description $description
    & $nssmPath set $serviceName Start SERVICE_AUTO_START
} else {
    Write-Host "NSSM not found. Creating basic service..." -ForegroundColor Yellow
    $binPath = "`"$nodePath`" `"$scriptPath`""
    New-Service -Name $serviceName -BinaryPathName $binPath -DisplayName $displayName -Description $description -StartupType Automatic
}

Write-Host "✅ Service created successfully!" -ForegroundColor Green
Write-Host "Starting service..." -ForegroundColor Cyan
Start-Service -Name $serviceName

Write-Host "`n📋 Service Commands:" -ForegroundColor Cyan
Write-Host "  Start:   Start-Service -Name $serviceName"
Write-Host "  Stop:    Stop-Service -Name $serviceName"
Write-Host "  Status:  Get-Service -Name $serviceName"
Write-Host "  Remove:  sc.exe delete $serviceName"