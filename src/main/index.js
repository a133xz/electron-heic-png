const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
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

  mainWindow.loadURL(
    isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../renderer/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Events
const fs = require("fs");
const convert = require("heic-convert");
const dir = "format-pictures";

ipcMain.on("convertToHeic", (event, { filePath, fileName, outputFormat }) => {
  outputFormat = outputFormat || "PNG";
  (async () => {
    const inputBuffer = fs.readFileSync(filePath);
    const outputBuffer = await convert({
      buffer: inputBuffer, // the HEIC file buffer
      format: outputFormat, // output format
      quality: 1 // the jpeg compression quality, between 0 and 1
    });

    const format = outputFormat.toLocaleLowerCase();
    const localDirectory = filePath.replace(fileName, "") + dir.replace("format", format);

    if (!fs.existsSync(localDirectory)) {
      fs.mkdirSync(localDirectory);
    }

    const newFileName = fileName.replace(".heic", `.${format}`);
    const fullPath = `${localDirectory}/${newFileName}`;

    const base64 = Buffer.from(outputBuffer).toString("base64");
    const base64Encoded = "data:image/jpg;base64," + base64;

    await fs.writeFileSync(fullPath, outputBuffer);

    event.reply("fileConverted", base64Encoded, fullPath);
  })();
});

ipcMain.on("openLink", (event, path) => {
  shell.showItemInFolder(path);
});

// Reload
try {
  require("electron-reloader")(module);
} catch (_) {}