import { ipc, win } from "../modules/Electron.mjs";
import OBS from "../modules/OBS.js";

function obsIpc() {
  ipc.on("connectToObs", (e, data) => {
    console.log(data);
  });
}

export { obsIpc };
