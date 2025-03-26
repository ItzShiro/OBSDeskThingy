import WebSocketClient from "./ws/WebSocketClient.js";
import ConnectWindow from "./connectWindow.js";

const wsc = new WebSocketClient();

//initial connection try.
wsc.Connect("127.0.0.1", 8080).catch((error) => {
  console.error("Error while initial connect attempt.", error);
});

wsc.on("connect", (e) => {
  wsc.send("Ping");
  e.currentTarget.readyState == 1
    ? (console.log("WS Connected, sending ping."), wsc.send("Ping"))
    : console.log("WS not connected");
  ConnectWindow.indicator("c_s").activate();
  document.querySelector(".window_connectButton").classList.remove("state2");
  ConnectWindow.close();
});
wsc.on("disconnect", (e) => {
  console.log("WS Disconnected.");
  ConnectWindow.indicator("c_s").deactivate();
  ConnectWindow.indicator("s_s").deactivate();
  document.querySelector(".window_connectButton").classList.remove("state2");
});

wsc.on("error", (e) => {
  console.log("WS ERROR:");
  console.error(e);

  ConnectWindow.disconnection();
  wsc.Disconnect();
});

wsc.on("message", (e) => {
  console.log(e);
});

function connectWithWindow() {
  wsc.Disconnect();
  var ip = document.getElementById("ipInput").value;
  var port = document.getElementById("portInput").value;

  var ipToCon = null;
  var portToCon = null;

  ip == "" ? (ipToCon = "127.0.0.1") : (ipToCon = ip);
  port == "" ? (portToCon = 8080) : (portToCon = port);

  wsc.Connect(ipToCon, portToCon);
}
document
  .querySelector(".window_connectButton")
  .addEventListener("click", () => {
    connectWithWindow();
    document.querySelector(".window_connectButton").classList.add("state2");
  });

export default wsc;
