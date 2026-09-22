const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("window:minimize"),
  maximize: () => ipcRenderer.send("window:maximize"),
  close: () => ipcRenderer.send("window:close"),
  showMainWindow: () => ipcRenderer.send("window:show-main"),
  openDataFolder: () => ipcRenderer.send("open:data-folder"),
  setAutostart: (enabled) => ipcRenderer.send("set:autostart", enabled),
  checkUpdate: () => ipcRenderer.send("update:check"),
  installUpdate: () => ipcRenderer.send("update:install"),
  onUpdateAvailable: (callback) => {
    ipcRenderer.on("update:available", (_event, version) => callback(version));
  },
  onUpdateDownloaded: (callback) => {
    ipcRenderer.on("update:downloaded", (_event, version) => callback(version));
  },
  restartEngine: () => ipcRenderer.send("engine:restart"),
  onEngineError: (callback) => {
    ipcRenderer.on("engine:error", (_event, err) => callback(err));
  },
});
