import { contextBridge, ipcRenderer, shell } from "electron";

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("electron", {
    on(eventName: string, callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) {
      ipcRenderer.on(eventName, callback);
    },
    send: (channel: string, data: any) => {
      ipcRenderer.send(channel, data);
    },

    async showItemInFolder(url: string) {
      await shell.showItemInFolder(url);
    }
  });
});
