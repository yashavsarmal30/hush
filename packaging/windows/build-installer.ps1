<#
.SYNOPSIS
    Builds and packages the complete Windows production release of Hush.
.DESCRIPTION
    Compiles the React frontend, builds Electron TypeScript scripts,
    optionally bundles the standalone Python engine, and packages
    NSIS installers and portable executables using electron-builder.
#>

[CmdletBinding()]
param(
    [switch]$BuildEngine,
    [switch]$Clean
)

$ErrorActionPreference = "Stop"

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Push-Location $projectRoot

try {
    Write-Host "==============================================" -ForegroundColor Cyan
    Write-Host " Building Hush Windows Production Release" -ForegroundColor Cyan
    Write-Host "==============================================" -ForegroundColor Cyan

    # 1. Environment Verification
    Write-Host "--> Checking prerequisites..." -ForegroundColor Yellow
    if (-not (Get-Command "npm" -ErrorAction SilentlyContinue)) {
        throw "npm is required but was not found in PATH."
    }
    if (-not (Get-Command "node" -ErrorAction SilentlyContinue)) {
        throw "node is required but was not found in PATH."
    }

    # 2. Clean
    if ($Clean) {
        Write-Host "--> Cleaning old build directories..." -ForegroundColor Yellow
        @("dist-app", "dist-electron", "dist-package") | ForEach-Object {
            if (Test-Path $_) { Remove-Item -Recurse -Force $_ }
        }
    }

    # 3. Compile Python Engine (optional standalone bundle)
    if ($BuildEngine) {
        Write-Host "--> Compiling Python engine with PyInstaller..." -ForegroundColor Green
        $pyPath = Join-Path $projectRoot ".venv\Scripts\pyinstaller.exe"
        $specPath = Join-Path $projectRoot "packaging\engine\engine.spec"
        if (Test-Path $pyPath) {
            & $pyPath $specPath --noconfirm
        } else {
            pyinstaller $specPath --noconfirm
        }
    }


    # 4. Build Vite Frontend & Electron
    Write-Host "--> Compiling React frontend and Electron scripts..." -ForegroundColor Green
    npm run build:all

    # 5. Run electron-builder
    Write-Host "--> Packaging with electron-builder..." -ForegroundColor Green
    npx electron-builder --win

    # 6. Verification and Checksums
    $distPackage = Join-Path $projectRoot "dist-package"
    if (Test-Path $distPackage) {
        Write-Host "`n==============================================" -ForegroundColor Green
        Write-Host " Built Windows Packages Successfully!" -ForegroundColor Green
        Write-Host "==============================================" -ForegroundColor Green
        
        $files = Get-ChildItem -Path $distPackage -Filter "*.exe"
        foreach ($file in $files) {
            $hash = (Get-FileHash -Path $file.FullName -Algorithm SHA256).Hash
            Write-Host "File: $($file.Name)" -ForegroundColor White
            Write-Host "Size: $([math]::Round($file.Length / 1MB, 2)) MB" -ForegroundColor Gray
            Write-Host "SHA256: $hash`n" -ForegroundColor DarkGray
        }
    }
} finally {
    Pop-Location
}
