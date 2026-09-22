const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("window:minimize"),
  maximize: () => ipcRenderer.send("window:maximize"),
  close: () => ipcRenderer.send("window:close"),
  showMainWindow: () => ipcRenderer.send("window:show-main"),
  openDataFolder: () => ipcRenderer.send("open:data-folder"),
  setAutostart: (enabled) => ipcRenderer.send("set:autostart", enabled),
});
