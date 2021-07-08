const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const path = require("path");
const fs = require("fs");
const convert = require("heic-convert");
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

// Events
ipcMain.on("convertToHeic", (event, { filePath, fileName, outputFormat }) => {
  (async () => {
    const inputBuffer = fs.readFileSync(filePath);
    const outputBuffer = await convert({
      buffer: inputBuffer, // the HEIC file buffer
      format: outputFormat, // output format
      quality: 1 // the jpeg compression quality, between 0 and 1
    });

    const format = outputFormat.toLocaleLowerCase();
    const currentDirectory = filePath.replace(fileName, "");
    const picturesFolder = currentDirectory + format + "-pictures";

    if (!fs.existsSync(picturesFolder)) {
      fs.mkdirSync(picturesFolder);
    }

    const heicFile = fileName.replace(".heic", `.${format}`);
    const absolutePath = `${picturesFolder}/${heicFile}`;

    const base64 = Buffer.from(outputBuffer).toString("base64");
    const base64Encoded = "data:image/jpg;base64," + base64;

    await fs.writeFileSync(absolutePath, outputBuffer);

    event.reply("fileConverted", base64Encoded, absolutePath);
  })().catch((e) => {
    console.error(e.message);
    dialog.showMessageBoxSync({
      type: "error",
      message: "Error converting the file"
    });
    event.reply("isError");
  });
});

ipcMain.on("showFileTypeError", () => {
  dialog.showMessageBoxSync({
    type: "error",
    message: "Only HEIC allowed"
  });
});
