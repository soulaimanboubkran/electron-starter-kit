import { contextBridge, ipcRenderer } from "electron";

// Indicate preload has executed
console.log('preload (src) loaded');

contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback: (arg0: any) => void) => {
    ipcRenderer.on("resource-usage", (_, stats) => {
      callback(stats);
    });
    return () => {
      ipcRenderer.removeAllListeners("resource-usage");
    };
  },
  getStaticData: async () => {
    return ipcRenderer.invoke("getStaticData"); // use ipcMain.handle in main
  },
  subscribeChangeView: (callback: (arg0: any) => void) => {
    ipcRenderer.on("change-view", (_, view) => {
      callback(view);
    });
    return () => {
      ipcRenderer.removeAllListeners("change-view");
    };
  },
  sendFrameAction: (payload: any) => {
    ipcRenderer.send("frame-action", payload);
  },
});
