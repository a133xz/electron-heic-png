const { ipcMain, dialog } = require("electron");
const fs = require("fs");
const path = require("path");

const convert = require("heic-convert");

// Events
ipcMain.on("convertToHeic", (event, { filePath, outputFormat }) => {
  (async () => {
    const inputBuffer = fs.readFileSync(filePath);
    const outputBuffer = await convert({
      buffer: inputBuffer, // the HEIC file buffer
      format: outputFormat, // output format
      quality: 1 // the jpeg compression quality, between 0 and 1
    });

    const file = path.parse(filePath);
    const fileName = file.name;
    const currentDirectory = file.dir;

    const format = outputFormat.toLocaleLowerCase();
    const folderName = format + "-pictures";
    const outputFolder = currentDirectory + "/" + folderName;

    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }

    const absolutePath = `${outputFolder}/${fileName}.${format}`;
    await fs.writeFileSync(absolutePath, outputBuffer);

    const base64 = Buffer.from(outputBuffer).toString("base64");
    const base64Encoded = "data:image/jpg;base64," + base64;
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
