<#
.SYNOPSIS
    Uninstalls Hush from the current user account.
.DESCRIPTION
    Stops running processes, removes Start Menu and Desktop shortcuts,
    cleans up registry keys, and deletes the application directory.
#>

[CmdletBinding()]
param(
    [switch]$Quiet
)

$ErrorActionPreference = "SilentlyContinue"

if (-not $Quiet) {
    Write-Host "==============================================" -ForegroundColor Yellow
    Write-Host " Uninstalling Hush Voice-to-Text..." -ForegroundColor Yellow
    Write-Host "==============================================" -ForegroundColor Yellow
}

# 1. Stop running processes
Get-Process -Name Hush -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 500

# 2. Remove shortcuts
$programs = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs"
$desktop = [Environment]::GetFolderPath("Desktop")

$shortcuts = @(
    (Join-Path $programs "Hush.lnk"),
    (Join-Path $programs "Hush (administrator).lnk"),
    (Join-Path $desktop "Hush.lnk")
)

foreach ($sc in $shortcuts) {
    if (Test-Path $sc) {
        Remove-Item -Force $sc -ErrorAction SilentlyContinue
    }
}

# 3. Clean autostart registry entry
$runKey = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run"
Remove-ItemProperty -Path $runKey -Name "Hush" -ErrorAction SilentlyContinue

# 4. Clean uninstall registry entry
$uninstallKey = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Hush"
Remove-Item -Path $uninstallKey -Recurse -Force -ErrorAction SilentlyContinue

# 5. Delete installation directory
$installDir = Join-Path $env:LOCALAPPDATA "Programs\Hush"
if (Test-Path $installDir) {
    # If script is running from inside the install directory, spawn a background cleaner
    if ($PSScriptRoot -like "*$installDir*") {
        Start-Process -WindowStyle Hidden -FilePath powershell.exe -ArgumentList "-NoProfile -Command `"Start-Sleep -Seconds 1; Remove-Item -Recurse -Force '$installDir'`""
    } else {
        Remove-Item -Recurse -Force $installDir -ErrorAction SilentlyContinue
    }
}

if (-not $Quiet) {
    Write-Host "Hush has been successfully removed from your system." -ForegroundColor Green
}
