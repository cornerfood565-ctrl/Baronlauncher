const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("baron", Object.freeze({
  getAppInfo: () => ipcRenderer.invoke("baron:app-info"),\n  windowControl: (action) => ipcRenderer.invoke("baron:window-control", action),
  selectDirectory: () => ipcRenderer.invoke("baron:select-directory"),
  openExternal: (url) => ipcRenderer.invoke("baron:open-external", url)
}));
