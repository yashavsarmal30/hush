# Setting Up and Running Hush Locally

This guide provides complete instructions for developers setting up, developing, testing, and packaging **Hush** locally.

---

## 📋 Prerequisites

- **Node.js**: Version 18+ (Node 20+ recommended) and npm
- **Python**: Version 3.10, 3.11, 3.12, or 3.13 (64-bit)
- **Git**: For cloning the repository
- **Just** (Optional, recommended): Fast command runner (`winget install Casey.Just` or `cargo install just`)
- **Microphone**: Any built-in or USB microphone

---

## 🚀 Quick Start (Development Mode)

### 1. Clone the Repository
```powershell
git clone https://github.com/yashavsarmal30/hush.git
cd hush
```

### 2. Set Up Python Virtual Environment
```powershell
# Windows (PowerShell)
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

On Linux:
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 3. Install Node.js Dependencies
```powershell
npm install
```

### 4. Run Hush in Development Mode
To launch the complete application with Vite hot-reload, Electron desktop shell, and Python WebSocket sidecar automatically:

```powershell
# Using Just:
just dev

# Or using npm:
npm run app
```

---

## 🛠️ Building and Packaging

### Build React Frontend & Electron Scripts
```powershell
# Using Just:
just build

# Or using npm:
npm run build:all
```
Compiled assets will be placed in `dist-app/` and `dist-electron/`.

### Package Windows Production Application
Generates the NSIS installer (`dist-package/Hush Setup 1.4.0.exe`) and portable executable (`dist-package/Hush 1.4.0.exe`):

```powershell
# Using Just:
just package

# Or using npm:
npm run package:win
```

### Package with Standalone Compiled Python Engine
```powershell
just package-all
```

---

## 🧪 Testing & Verification

Run the automated WebSocket integration tests against the Python speech service:

```powershell
just test-service
```

Or manually:
```powershell
$env:PYTHONPATH="."; .\.venv\Scripts\python.exe tests/test_service.py
```

---

## 📂 Project Organization

```
hush/
├── build_assets/           # Application icons, graphics, and social banner generators
├── docs/                   # Landing page, SEO guides, and documentation (GitHub Pages)
├── electron/               # Electron main process and secure preload script
├── hush/                   # Python speech engine sidecar (WebSocket, OpenVINO, audio, hooks)
├── packaging/              # Production deployment assets
│   ├── arch/               # Arch Linux PKGBUILD & AUR scripts
│   ├── engine/             # PyInstaller engine spec & launcher
│   └── windows/            # Windows NSIS, Inno Setup, PowerShell installers, manifest
├── public/                 # Static frontend assets, icons, and audio chimes
├── src/                    # React 18 + Tailwind CSS + shadcn/ui application
├── tests/                  # Automated integration tests
├── electron-builder.json   # Windows packaging configuration
├── justfile                # One-word developer commands
├── package.json            # Node dependencies and build scripts
└── requirements.txt        # Python speech engine dependencies
```
