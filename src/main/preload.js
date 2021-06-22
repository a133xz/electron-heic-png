const { contextBridge, ipcRenderer, shell } = require("electron");

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("electron", {
    on(eventName, callback) {
      ipcRenderer.on(eventName, callback);
    },
    send: (channel, data) => {
      ipcRenderer.send(channel, data);
    },

    async showItemInFolder(url) {
      await shell.showItemInFolder(url);
    }
  });
});
