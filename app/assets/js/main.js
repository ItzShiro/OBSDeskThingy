const { ipcRenderer: ipc } = require("electron");

document
  .querySelector(".window_controlButton-close")
  .addEventListener("click", () => {
    ipc.send("closeWindow");
  });

document
  .querySelector(".window_controlButton-minimize")
  .addEventListener("click", () => {
    ipc.send("minimizeWindow");
  });

document.querySelectorAll(".right.tile>.card").forEach((e) => {
  const type = e.getAttribute("serverType");
  const bt = {
    start: e.querySelector(".right>.startButton"),
    restart: e.querySelector(".right>.restartButton"),
    terminate: e.querySelector(".right>.terminateButton"),
  };

  bt.start.addEventListener("click", () => {
    ipc.send(`server_start`, type);
  });
  bt.restart.addEventListener("click", () => {
    ipc.send(`server_restart`, type);
  });
  bt.terminate.addEventListener("click", () => {
    ipc.send(`server_terminate`, type);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  ipc.on("server_started", (e, type) => {
    document
      .querySelector(`[serverType='${type}'] > .right>.startButton`)
      .classList.add("deactivated");
    document
      .querySelector(`[serverType='${type}'] > .right>.restartButton`)
      .classList.remove("deactivated");
    document
      .querySelector(`[serverType='${type}'] > .right>.terminateButton`)
      .classList.remove("deactivated");
    document.querySelector(
      `[serverType='${type}'] > .left>.status`
    ).innerHTML = `Status: ONLINE`;
  });
  ipc.on("server_stopped", (e, type) => {
    document
      .querySelector(`[serverType='${type}'] > .right>.startButton`)
      .classList.remove("deactivated");
    document
      .querySelector(`[serverType='${type}'] > .right>.restartButton`)
      .classList.add("deactivated");
    document
      .querySelector(`[serverType='${type}'] > .right>.terminateButton`)
      .classList.add("deactivated");
    document.querySelector(
      `[serverType='${type}'] > .left>.status`
    ).innerHTML = `Status: OFFLINE`;
  });
  ipc.on("server_restarted", (e, type) => {
    document
      .querySelector(`[serverType='${type}'] > .right>.restartButton`)
      .classList.add("animate");
    setTimeout(() => {
      document
        .querySelector(`[serverType='${type}'] > .right>.restartButton`)
        .classList.remove("animate");
    }, 1000);
  });
});

function connectToObs() {
  ipc.send("connectToObs", {
    ip: "127.0.0.1",
    port: 4455,
    key: false,
  });
}
document
  .querySelector(".window_obsConnectButton")
  .addEventListener("click", () => {
    connectToObs();
  });
