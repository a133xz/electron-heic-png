const fs = require("fs");
const { contextBridge, ipcRenderer } = require("electron");

process.once("loaded", () => {
  const { contextBridge, ipcRenderer, shell } = require("electron");

  contextBridge.exposeInMainWorld("node", {
    readdirSync: fs.readdirSync,
    readFileSync: fs.readFileSync
  });

  contextBridge.exposeInMainWorld("electron", {
    on(eventName, callback) {
      ipcRenderer.on(eventName, callback);
    },
    send: (channel, data) => {
      ipcRenderer.send(channel, data);
    },
    async invoke(eventName, ...params) {
      return await ipcRenderer.invoke(eventName, ...params);
    },

    async shellOpenExternal(url) {
      await shell.openExternal(url);
    },

    async shellOpenPath(file) {
      await shell.openPath(file);
    },

    async shellTrashItem(file) {
      await shell.trashItem(file);
    }
  });
});
