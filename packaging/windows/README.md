# Hush — Windows Packaging

Production packaging and distribution assets for **Hush** on Windows 10 and 11 (x64).

Hush is distributed as a native Windows desktop application powered by **Electron**, a modern **React + shadcn/ui** interface, and a high-performance local **OpenVINO Whisper** Python speech engine.

---

## Packaging Options

| Format | Output Path | Description |
|---|---|---|
| **NSIS Installer** | `dist-package/Hush Setup 1.4.0.exe` | Standard Windows wizard installer with desktop/start menu shortcuts and uninstaller registration. |
| **Portable Executable** | `dist-package/Hush 1.4.0.exe` | Self-contained single executable — run directly without installation or admin rights. |
| **Unpacked Directory** | `dist-package/win-unpacked/` | Standalone application folder ideal for fast local testing and customized deployment scripts. |
| **PowerShell Deployment** | `%LOCALAPPDATA%\Programs\Hush\` | Clean user-level installation script (`install.ps1`) with Start Menu & Administrator shortcut support. |
| **Inno Setup** | `dist-package/Hush-InnoSetup-1.4.0.exe` | Enterprise-grade installer script (`hush.iss`) supporting silent parameters (`/VERYSILENT`). |

---

## 1. Quick Build

From the repository root, you can package the entire Windows application with one command:

```powershell
# Using Just:
just package

# Or using npm:
npm run package:win
```

To build a full release including the standalone compiled Python engine (`dist/hush-engine/`):

```powershell
just package-all
```

The resulting installers and executables will be placed in `dist-package/`.

---

## 2. Automated Scripts in this Directory

| Script | Purpose |
|---|---|
| `build-installer.ps1` | End-to-end build script: checks environment, compiles frontend, compiles Electron scripts, optionally compiles PyInstaller engine, and runs `electron-builder`. |
| `install.ps1` | Deploys the unpacked build into `%LOCALAPPDATA%\Programs\Hush`, creates Start Menu and Desktop shortcuts, adds an elevated administrator shortcut, and registers in Windows Settings (*Apps & Features*). |
| `uninstall.ps1` | Cleanly terminates running Hush processes, removes all shortcuts, removes autostart entries, and deletes application files. |
| `hush.iss` | Inno Setup 6 compilation script for organizations that prefer Inno Setup over NSIS. |
| `hush.manifest` | Windows application manifest defining Per-Monitor V2 DPI awareness, Windows 10/11 compatibility, and long-path support. |
| `autostart.reg` | Registry template for configuring Hush to launch automatically at user login. |

---

## 3. PowerShell Installer (`install.ps1`)

The script installs Hush per-user without requiring Administrator UAC prompts:

```powershell
# Run the installer script
powershell -ExecutionPolicy Bypass -File packaging\windows\install.ps1
```

### Shortcuts Created:
1. **Start Menu & Desktop**: Standard shortcut launching `Hush.exe`.
2. **Hush (administrator)**: A special shortcut with the Run As Administrator bit (`0x20` flag) configured in the `.lnk`. This allows Hush to simulate keystrokes into elevated Windows Terminal, PowerShell, or Registry Editor windows where standard user-level keyboard simulation is blocked by Windows UIPI (User Interface Privilege Isolation).

---

## 4. Uninstallation (`uninstall.ps1`)

To uninstall Hush cleanly:

```powershell
powershell -ExecutionPolicy Bypass -File packaging\windows\uninstall.ps1
```

Or open **Windows Settings → Apps → Installed apps → Hush → Uninstall**.

---

## 5. Code Signing (Authenticode)

Unsigned binaries trigger Windows SmartScreen ("Unknown Publisher"). To sign the installer and binaries with an Authenticode code-signing certificate (EV or standard OV certificate):

```powershell
# Set environment variables for electron-builder
$env:CSC_LINK = "path\to\certificate.pfx"
$env:CSC_KEY_PASSWORD = "YourCertPassword"

# Or manually sign built binaries using signtool:
signtool sign /fd SHA256 /a /tr http://timestamp.digicert.com /td SHA256 "dist-package\win-unpacked\Hush.exe"
```

For open-source and personal use without a commercial certificate, users can click **"More info" → "Run anyway"** on first launch.

---

## 6. Autostart Configuration

Hush can start minimized in the system tray when Windows boots. This is configurable inside the Hush Settings Hub, or can be set via the Windows Registry:

```reg
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run]
"Hush"="\"C:\\Users\\<Username>\\AppData\\Local\\Programs\\Hush\\Hush.exe\" --minimized"
```
