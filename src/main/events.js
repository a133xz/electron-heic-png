const { ipcMain, dialog } = require("electron");
const fs = require("fs");
const convert = require("heic-convert");

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
