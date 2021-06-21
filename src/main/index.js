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
  win.loadURL(
    isDevelopment
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../renderer/index.html")}`
  );
  win.on("closed", () => (mainWindow = null));
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
  })();
});

ipcMain.on("openLink", (event, path) => {
  shell.showItemInFolder(path);
});
