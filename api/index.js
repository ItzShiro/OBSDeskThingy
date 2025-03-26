import WebSocketWrapper from "./modules/WebSocketWrapper.js";
import OBS from "./modules/OBS.js";

import isElectron from "./modules/isElectron.js";

export const ws = new WebSocketWrapper();

ws.on("message", (message) => {
  console.log(message);
});

ws.on("error", (error) => {
  console.error(error);
});

ws.on("clientConnected", (ws) => {
  console.log("WS Connected.");
  ws.send("Ping");
});

if (!isElectron()) {
  import("./modules/ConsoleHandler.js").then((ConsoleHandler) => {
    new ConsoleHandler.ConsoleHandler().startConsole();
  });
} else {
  import("./js/serverIpc.js").then((exports) => {
    exports.runIpc();
  });
  import("./js/obsIpc.js").then((exports) => {
    exports.obsIpc();
  });
  await import("./modules/Electron.mjs").then((electronWindow) => {
    import("electron").then((electron) => {
      electron.app
        .whenReady()
        .then(() => {
          electronWindow.createWindow();
        })
        .catch((error) => console.error(error));
    });
  });
}
