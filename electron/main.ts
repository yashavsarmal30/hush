import {
  app,
  BrowserWindow,
  screen,
  ipcMain,
  Tray,
  Menu,
  shell,
  nativeImage,
} from "electron";
import path from "path";
import { spawn, ChildProcess } from "child_process";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null = null;
let overlayWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let pythonProcess: ChildProcess | null = null;

const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;
const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL || "http://localhost:5173";

// Ensure single instance
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

function getAppRoot(): string {
  return path.resolve(__dirname, "..");
}

function getAppIconPath(): string {
  const root = getAppRoot();
  const icoPath = path.join(root, "public", "icon.ico");
  const pngPath = path.join(root, "public", "icon.png");
  if (process.platform === "win32" && fs.existsSync(icoPath)) {
    return icoPath;
  }
  return pngPath;
}

function startPythonService() {
  const root = getAppRoot();
  let pythonCmd = "";
  let args: string[] = [];

  if (isDev) {
    const venvPython = path.join(root, ".venv", "Scripts", "python.exe");
    if (fs.existsSync(venvPython)) {
      pythonCmd = venvPython;
    } else {
      pythonCmd = "python";
    }
    args = ["-m", "hush.service"];
  } else {
    // Production packaged engine
    const candidates = [
      path.join(process.resourcesPath, "engine", "hush-engine.exe"),
      path.join(process.resourcesPath, "engine", "Hush.exe"),
      path.join(process.resourcesPath, "hush-engine.exe"),
      path.join(process.resourcesPath, "Hush.exe"),
      path.join(root, "dist", "Hush", "Hush.exe"),
      path.join(root, "hush-engine.exe"),
    ];
    const found = candidates.find((c) => fs.existsSync(c));
    if (found) {
      pythonCmd = found;
      args = [];
    } else {
      const venvPython = path.join(root, ".venv", "Scripts", "python.exe");
      pythonCmd = fs.existsSync(venvPython) ? venvPython : "python";
      args = ["-m", "hush.service"];
    }
  }

  console.log(`[Hush] Launching Python backend: ${pythonCmd} ${args.join(" ")}`);
  try {
    pythonProcess = spawn(pythonCmd, args, {
      cwd: root,
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });

    pythonProcess.stdout?.on("data", (data) => {
      const str = data.toString().trim();
      console.log(`[Python] ${str}`);
    });

    pythonProcess.stderr?.on("data", (data) => {
      console.error(`[Python Err] ${data.toString().trim()}`);
    });

    pythonProcess.on("close", (code) => {
      console.log(`[Python] exited with code ${code}`);
      pythonProcess = null;
    });
  } catch (err) {
    console.error("[Hush] Failed to spawn Python service:", err);
  }
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 880,
    height: 680,
    minWidth: 780,
    minHeight: 560,
    frame: false,
    backgroundColor: "#09090b",
    icon: getAppIconPath(),
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(getAppRoot(), "dist-app", "index.html"));
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
  });

  mainWindow.on("close", (event) => {
    // Hide to tray instead of quitting
    if (!isQuitting) {
      event.preventDefault();
      mainWindow?.hide();
    }
  });
}

function createOverlayWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const overlayWidth = 340;
  const overlayHeight = 56;
  const x = Math.round((width - overlayWidth) / 2);
  const y = Math.round(height - overlayHeight - 24);

  overlayWindow = new BrowserWindow({
    width: overlayWidth,
    height: overlayHeight,
    x,
    y,
    frame: false,
    transparent: true,
    backgroundColor: "#00000000",
    alwaysOnTop: true,
    skipTaskbar: true,
    hasShadow: false,
    resizable: false,
    focusable: false,
    icon: getAppIconPath(),
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  overlayWindow.setAlwaysOnTop(true, "screen-saver");

  if (isDev) {
    overlayWindow.loadURL(`${VITE_DEV_SERVER_URL}/#overlay`);
  } else {
    overlayWindow.loadURL(
      `file://${path.join(getAppRoot(), "dist-app", "index.html")}#overlay`
    );
  }

  overlayWindow.once("ready-to-show", () => {
    overlayWindow?.showInactive();
  });
}

function createTray() {
  const iconPath = getAppIconPath();
  let icon = fs.existsSync(iconPath)
    ? nativeImage.createFromPath(iconPath)
    : nativeImage.createEmpty();

  tray = new Tray(icon);

  tray.setToolTip("Hush — 100% Local Voice Engine");

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Hush — Local Voice Engine",
      enabled: false,
    },
    { type: "separator" },
    {
      label: "Open Dashboard",
      click: () => {
        mainWindow?.show();
        mainWindow?.focus();
      },
    },
    {
      label: "Toggle Floating Pill",
      click: () => {
        if (overlayWindow?.isVisible()) {
          overlayWindow.hide();
        } else {
          overlayWindow?.showInactive();
        }
      },
    },
    { type: "separator" },
    {
      label: "Quit Hush",
      click: () => {
        isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
  tray.on("click", () => {
    mainWindow?.show();
    mainWindow?.focus();
  });
  tray.on("double-click", () => {
    mainWindow?.show();
    mainWindow?.focus();
  });
}

// IPC handlers
ipcMain.on("window:minimize", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender) || mainWindow;
  win?.minimize();
});

ipcMain.on("window:maximize", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender) || mainWindow;
  if (win?.isMaximized()) {
    win.unmaximize();
  } else {
    win?.maximize();
  }
});

ipcMain.on("window:close", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender) || mainWindow;
  if (win === mainWindow && !isQuitting) {
    win?.hide();
  } else {
    win?.close();
  }
});


ipcMain.on("window:show-main", () => {
  mainWindow?.show();
  mainWindow?.focus();
});

ipcMain.on("open:data-folder", () => {
  const localAppData = process.env.LOCALAPPDATA || "";
  const hushDir = path.join(localAppData, "Hush");
  if (fs.existsSync(hushDir)) {
    shell.openPath(hushDir);
  }
});

ipcMain.on("set:autostart", (_event, enabled: boolean) => {
  app.setLoginItemSettings({
    openAtLogin: enabled,
  });
});

let isQuitting = false;

app.whenReady().then(() => {
  startPythonService();
  createMainWindow();
  createOverlayWindow();
  createTray();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
      createOverlayWindow();
    }
  });
});

app.on("before-quit", () => {
  isQuitting = true;
  if (pythonProcess) {
    console.log("[Hush] Terminating Python service on quit...");
    pythonProcess.kill("SIGTERM");
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin" && isQuitting) {
    app.quit();
  }
});
