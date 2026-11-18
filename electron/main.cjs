const { app, BrowserWindow, dialog, ipcMain, shell } = require("electron");
const path = require("node:path");

let mainWindow;

const allowedExternalHosts = new Set([
  "www.minecraft.net",
  "minecraft.net",
  "login.microsoftonline.com",
  "www.microsoft.com",
  "modrinth.com",
  "www.modrinth.com",
  "curseforge.com",
  "www.curseforge.com"
]);

function isAllowedExternalUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && allowedExternalHosts.has(url.hostname);
  } catch {
    return false;
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1100,
    minHeight: 700,
    frame: false,
    backgroundColor: "#090a0c",
    show: false,
    title: "BARON LAUNCHER",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true
    }
  });

  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (isAllowedExternalUrl(url)) {
      void shell.openExternal(url);
    }
    return { action: "deny" };
  });

  mainWindow.webContents.on("will-navigate", (event, url) => {
    const isLocalAppPage = url.startsWith("file://") ||
      (!app.isPackaged && url.startsWith("http://127.0.0.1:5173"));
    if (!isLocalAppPage) event.preventDefault();
  });

  if (!app.isPackaged) {
    void mainWindow.loadURL("http://127.0.0.1:5173");
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    void mainWindow.loadFile(path.join(__dirname, "..", "dist", "index.html"));
  }
}

ipcMain.handle("baron:window-control", (event, action) => {\n  const win = BrowserWindow.fromWebContents(event.sender);\n  if (!win) return false;\n  if (action === "minimize") win.minimize();\n  else if (action === "toggle-maximize") win.isMaximized() ? win.unmaximize() : win.maximize();\n  else if (action === "close") win.close();\n  else throw new Error("Unsupported window action.");\n  return true;\n});\n\nipcMain.handle("baron:app-info", () => ({
  name: app.getName(),
  version: app.getVersion(),
  platform: process.platform,
  arch: process.arch,
  isPackaged: app.isPackaged
}));

ipcMain.handle("baron:select-directory", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: "Choose a Minecraft game directory",
    properties: ["openDirectory", "createDirectory"]
  });

  if (result.canceled || result.filePaths.length === 0) return null;
  return result.filePaths[0];
});

ipcMain.handle("baron:open-external", async (_event, value) => {
  if (typeof value !== "string" || !isAllowedExternalUrl(value)) {
    throw new Error("This external address is not permitted.");
  }
  await shell.openExternal(value);
  return true;
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
