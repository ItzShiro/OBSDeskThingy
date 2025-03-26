import { ipc, win } from "../modules/Electron.mjs";
import { ws } from "../index.js";

function runIpc() {
  ipc.on("server_start", (e, type) => {
    switch (type) {
      case "ws":
        ws.Start("8080").then((e) => {
          win.webContents.send("server_started", type);
        });
        break;
      case "web":
        break;
    }
  });

  ipc.on("server_restart", (e, type) => {
    switch (type) {
      case "ws":
        ws.Stop().then((e) => {
          console.log(e);
          win.webContents.send("server_stopped", type);
          ws.Start("8080").then((e) => {
            win.webContents.send("server_started", type);
            win.webContents.send("server_restarted", type);
          });
        });

        break;
      case "web":
        break;
    }
  });

  ipc.on("server_terminate", (e, type) => {
    switch (type) {
      case "ws":
        ws.Stop();
        win.webContents.send("server_stopped", type);
        break;
      case "web":
        break;
    }
  });
}

export { runIpc };
