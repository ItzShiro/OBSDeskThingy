class WebSocketClient {
  constructor() {
    this.ws = null;
    this.eventHandlers = {
      message: null,
      error: null,
      disconnect: null,
      connect: null,
    };
    this.connected = false;
  }

  Connect(ip, port) {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(`ws://${ip}:${port}`);
      this.ws.onopen = (ws) => {
        this.connected = true;
        if (this.eventHandlers.connect) {
          this.eventHandlers.connect(ws);
        }
        resolve(ws);
      };
      this.ws.onmessage = (event) => {
        if (this.eventHandlers.message) {
          this.eventHandlers.message(event.data);
        }
      };
      this.ws.onerror = (error) => {
        if (this.eventHandlers.error) {
          this.eventHandlers.error(error);
        }
        reject(error);
      };
      this.ws.onclose = () => {
        this.connected = false;
        if (this.eventHandlers.disconnect) {
          this.eventHandlers.disconnect();
        }
      };
    });
  }
  Disconnect() {
    if (this.ws && this.connected == true) {
      this.ws.close();
      this.connected = false;
      return true;
    } else {
      console.error("WebSocket is not connected. Call Connect() first.");
      return null;
    }
  }
  GetWS() {
    if (this.connected) {
      return this.ws;
    } else {
      console.error("WebSocket is not connected. Call Connect() first.");
      return null;
    }
  }

  on(eventType, callback) {
    if (eventType in this.eventHandlers) {
      this.eventHandlers[eventType] = callback;
    } else {
      console.error(
        'Invalid event type. Supported types are "message", "error", "disconnect", and "connect".'
      );
    }
  }

  send(Message) {
    this.ws.send(Message);
  }
}
export default WebSocketClient;
