const { contextBridge, ipcRenderer, shell } = require('electron');

process.once('loaded', () => {
  contextBridge.exposeInMainWorld('electron', {
    send: (channel, data) => {
      // whitelist channels
      let validChannels = ['convertToHeic', 'showFileTypeError'];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel, func) => {
      let validChannels = ['fileConverted', 'isError'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    async showItemInFolder(url) {
      await shell.showItemInFolder(url);
    }
  });
});
