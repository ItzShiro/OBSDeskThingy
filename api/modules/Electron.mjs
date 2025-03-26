import { BrowserWindow, ipcMain } from "electron";

export const ipc = ipcMain;

export let win;
export const createWindow = () => {
  win = new BrowserWindow({
    minWidth: 1000,
    width: 1000,
    minHeight: 500,
    height: 550,
    frame: false,
    titleBarStyle: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
    },
  });

  win.loadFile("../app/index.html");

  ipc.on("closeWindow", () => win.close());
  ipc.on("minimizeWindow", () => win.minimize());
};

export default createWindow;
