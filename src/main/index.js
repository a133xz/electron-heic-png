const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const path = require("path");

const isProduction =
  process.env.NODE_ENV === "production" || !process || !process.env || !process.env.NODE_ENV;
const isDevelopment = !isProduction;

// Reload
try {
  require("electron-reloader")(module);
} catch (_) {}

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    titleBarStyle: "hiddenInset",
    width: 360,
    height: 450,
    minWidth: 360,
    minHeight: 450,
    icon: path.join(__dirname, "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true
    }
  });

  // Load the url of the dev server if in development mode
  // Load the index.html when not in development
  win
    .loadURL(
      isDevelopment
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../renderer/index.html")}`
    )
    .then(() => {
      // Open Dev tools
      isDevelopment && win.webContents.openDevTools();
    })
    .catch((error) => {
      //log.error(error);
    });

  // Menu
  require("./menu");
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

require("./events");
