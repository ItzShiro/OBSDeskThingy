import { OBSWebSocket } from "obs-websocket-js";

class OBS {
  constructor() {
    this.obs = null;
    this.connected = false;
    this.ws = null;
    this.eventHandlers = {
      disconnect: null,
      connected: null,
    };
  }
  async Connect(ip, port, key) {
    this.obs = new OBSWebSocket();
    try {
      await this.obs.connect(`${ip}:${port}`, key).then(() => {
        this.connected = true;
        if (this.eventHandlers.connected) {
          this.eventHandlers.connected(obs);
        }
      });
    } catch {
      console.log("Error connecting to OBS");
      this.connected = false;
    }
  }
  on(eventType, callback) {
    if (eventType in this.eventHandlers) {
      this.eventHandlers[eventType] = callback;
    } else {
      console.error(
        'Invalid event type. Supported types are "message", "error", "clientDisconnected", and "clientConnected".'
      );
    }
  }
  get() {
    if (this.obs) {
      return this.obs;
    } else {
      return null;
    }
  }
}

export default OBS;
