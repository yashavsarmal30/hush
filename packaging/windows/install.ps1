<#
.SYNOPSIS
    Installs Hush for the current user into %LOCALAPPDATA%\Programs\Hush.
.DESCRIPTION
    Deploys the packaged Hush application, creates Start Menu and Desktop shortcuts,
    creates an elevated Administrator shortcut, and registers the uninstaller with Windows.
#>

[CmdletBinding()]
param(
    [switch]$NoShortcuts,
    [switch]$NoAdminShortcut,
    [switch]$StartAfterInstall
)

$ErrorActionPreference = "Stop"

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host " Hush Voice-to-Text — Windows Installer" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$srcElectron = Join-Path $projectRoot "dist-package\win-unpacked"
$srcLegacy = Join-Path $projectRoot "dist\Hush"

if (Test-Path "$srcElectron\Hush.exe") {
    $src = $srcElectron
} elseif (Test-Path "$srcLegacy\Hush.exe") {
    $src = $srcLegacy
} else {
    Write-Error "Build output not found. Please run 'just package' or 'npm run package:win' first."
    exit 1
}

$dst = Join-Path $env:LOCALAPPDATA "Programs\Hush"

# Stop any currently running instance to release file locks
Write-Host "--> Checking for running instances of Hush..." -ForegroundColor Yellow
Get-Process -Name Hush -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 500

# Deploy application files
Write-Host "--> Installing to $dst..." -ForegroundColor Green
if (Test-Path $dst) {
    Remove-Item -Recurse -Force $dst
}
New-Item -ItemType Directory -Force $dst | Out-Null
Copy-Item -Recurse "$src\*" $dst

# Copy uninstall script into destination directory
$uninstallScriptSource = Join-Path $PSScriptRoot "uninstall.ps1"
if (Test-Path $uninstallScriptSource) {
    Copy-Item -Force $uninstallScriptSource (Join-Path $dst "uninstall.ps1")
}

# Setup Shortcuts
if (-not $NoShortcuts) {
    $programs = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs"
    $desktop = [Environment]::GetFolderPath("Desktop")
    $ws = New-Object -ComObject WScript.Shell

    # 1. Start Menu Shortcut
    $lnkPath = Join-Path $programs "Hush.lnk"
    $lnk = $ws.CreateShortcut($lnkPath)
    $lnk.TargetPath = "$dst\Hush.exe"
    $lnk.WorkingDirectory = $dst
    $lnk.Description = "Hush — Unbound edge-native voice dictation"
    $lnk.IconLocation = "$dst\Hush.exe,0"
    $lnk.Save()
    Write-Host "--> Created Start Menu shortcut: $lnkPath" -ForegroundColor Gray

    # 2. Desktop Shortcut
    $desktopLnkPath = Join-Path $desktop "Hush.lnk"
    $desktopLnk = $ws.CreateShortcut($desktopLnkPath)
    $desktopLnk.TargetPath = "$dst\Hush.exe"
    $desktopLnk.WorkingDirectory = $dst
    $desktopLnk.Description = "Hush — Unbound edge-native voice dictation"
    $desktopLnk.IconLocation = "$dst\Hush.exe,0"
    $desktopLnk.Save()
    Write-Host "--> Created Desktop shortcut: $desktopLnkPath" -ForegroundColor Gray

    # 3. Elevated Administrator Shortcut
    if (-not $NoAdminShortcut) {
        $adminLnkPath = Join-Path $programs "Hush (administrator).lnk"
        $adminLnk = $ws.CreateShortcut($adminLnkPath)
        $adminLnk.TargetPath = "$dst\Hush.exe"
        $adminLnk.WorkingDirectory = $dst
        $adminLnk.Description = "Hush (Admin) — dictation for elevated apps (Terminal, Regedit)"
        $adminLnk.IconLocation = "$dst\Hush.exe,0"
        $adminLnk.Save()

        # Set the RunAsAdministrator byte flag at offset 0x15 of the .lnk file
        try {
            $bytes = [IO.File]::ReadAllBytes($adminLnkPath)
            $bytes[0x15] = $bytes[0x15] -bor 0x20
            [IO.File]::WriteAllBytes($adminLnkPath, $bytes)
            Write-Host "--> Created Elevated Administrator shortcut: $adminLnkPath" -ForegroundColor Gray
        } catch {
            Write-Warning "Could not flag admin shortcut as elevated: $_"
        }
    }
}

# Register with Windows Add/Remove Programs (Registry)
$regKey = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Hush"
try {
    if (-not (Test-Path $regKey)) {
        New-Item -Path $regKey -Force | Out-Null
    }
    Set-ItemProperty -Path $regKey -Name "DisplayName" -Value "Hush"
    Set-ItemProperty -Path $regKey -Name "DisplayVersion" -Value "1.4.0"
    Set-ItemProperty -Path $regKey -Name "Publisher" -Value "Hush Community"
    Set-ItemProperty -Path $regKey -Name "DisplayIcon" -Value "$dst\Hush.exe,0"
    Set-ItemProperty -Path $regKey -Name "InstallLocation" -Value $dst
    Set-ItemProperty -Path $regKey -Name "UninstallString" -Value "powershell.exe -NoProfile -ExecutionPolicy Bypass -File `"$dst\uninstall.ps1`""
    Set-ItemProperty -Path $regKey -Name "QuietUninstallString" -Value "powershell.exe -NoProfile -ExecutionPolicy Bypass -File `"$dst\uninstall.ps1`" -Quiet"
    Write-Host "--> Registered in Windows Settings (Add/Remove Programs)." -ForegroundColor Gray
} catch {
    Write-Warning "Could not register uninstaller in Registry: $_"
}

Write-Host "==============================================" -ForegroundColor Green
Write-Host " Hush successfully installed!" -ForegroundColor Green
Write-Host " Location: $dst\Hush.exe" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Green

if ($StartAfterInstall) {
    Start-Process "$dst\Hush.exe"
}
