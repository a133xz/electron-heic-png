const { promisify } = require("util");
const fs = require("fs");
const convert = require("heic-convert");

(async () => {
  const inputBuffer = fs.readFileSync("/Users/antonio/Downloads/sample1.heic");
  const outputBuffer = await convert({
    buffer: inputBuffer, // the HEIC file buffer
    format: "JPEG", // output format
    quality: 1 // the jpeg compression quality, between 0 and 1
  });

  await promisify(fs.writeFile)("/Users/antonio/Downloads/result.jpg", outputBuffer);
})();
