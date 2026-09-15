# Justfile for Hush - Unbound edge native voice engine
# Run `just` or `just --list` to view all available commands.

set shell := ["powershell", "-NoProfile", "-Command"]

# Show all available commands
default:
    @just --list

# ----------------------------------------------------------------------
# Development & Execution
# ----------------------------------------------------------------------

# Run Hush in development mode with live reload (Vite + Electron + Python sidecar)
dev:
    npm run app

# Launch the compiled Electron application
launch:
    npm start

# Run the headless Python WebSocket service standalone
service port="4874":
    $env:PYTHONPATH="."; .\.venv\Scripts\python.exe -m hush.service --port {{port}}

# ----------------------------------------------------------------------
# Build & Compilation
# ----------------------------------------------------------------------

# Build both React Vite frontend and Electron TypeScript scripts
build:
    npm run build:all

# Build React + Vite frontend into dist-app/
build-frontend:
    npm run build

# Compile Electron TypeScript scripts (main.ts, preload.ts) into dist-electron/
build-electron:
    npm run build:electron

# Build headless Python engine into dist/hush-engine/ using PyInstaller
build-engine:
    .\.venv\Scripts\pyinstaller.exe packaging/engine/engine.spec --noconfirm


# Build all components (React frontend, Electron scripts, and Python engine)
build-all: build build-engine

# ----------------------------------------------------------------------
# Packaging & Installation
# ----------------------------------------------------------------------

# Package the production Windows release using electron-builder
package: build
    npx electron-builder --win

# Full release package: build engine, frontend, and package Windows executable
package-all: build-all
    npx electron-builder --win

# Build Windows installer and portable packages via PowerShell orchestrator
package-windows:
    powershell -ExecutionPolicy Bypass -File packaging\windows\build-installer.ps1

# Install packaged app to %LOCALAPPDATA%\Programs\Hush and create Start Menu shortcuts
install:
    powershell -ExecutionPolicy Bypass -File packaging\windows\install.ps1

# Uninstall Hush from %LOCALAPPDATA%\Programs\Hush and remove shortcuts/registry entries
uninstall:
    powershell -ExecutionPolicy Bypass -File packaging\windows\uninstall.ps1

# Tag a release and push to GitHub to trigger automated CI/CD release workflow
release tag="":
    powershell -NoProfile -Command "$t = '{{tag}}'; if (-not $t) { $t = 'v' + (Get-Content package.json | ConvertFrom-Json).version }; Write-Host '--> Creating release tag:' $t -ForegroundColor Green; git tag $t; git push origin $t; Write-Host '--> Release tag pushed! GitHub Actions CI/CD will now build and publish release artifacts.' -ForegroundColor Cyan"



# ----------------------------------------------------------------------
# Testing & Verification
# ----------------------------------------------------------------------

# Run automated integration test for Hush WebSocket service
test-service:
    $env:PYTHONPATH="."; .\.venv\Scripts\python.exe tests/test_service.py

# Run all test suites
test: test-service
    $env:PYTHONPATH="."; .\.venv\Scripts\python.exe tests/test_audio.py

# ----------------------------------------------------------------------
# Environment Setup & Maintenance
# ----------------------------------------------------------------------

# Install Python requirements and NPM packages
setup:
    .\.venv\Scripts\python.exe -m pip install -r requirements.txt
    npm install

# Clean build artifacts and temporary files
clean:
    if (Test-Path "dist-app") { Remove-Item -Recurse -Force "dist-app" }
    if (Test-Path "dist-electron") { Remove-Item -Recurse -Force "dist-electron" }
    if (Test-Path "dist-package") { Remove-Item -Recurse -Force "dist-package" }
    Write-Output "Cleaned dist-app, dist-electron, and dist-package directories."
