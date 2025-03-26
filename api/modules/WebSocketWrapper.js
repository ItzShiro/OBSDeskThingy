import { WebSocketServer } from "ws";
import { setTimeout } from "node:timers";

class WebSocketServerWrapper {
  constructor() {
    (this.server = null),
      (this.clients = []),
      (this.eventHandlers = {
        message: null,
        error: null,
        clientConnected: null,
        clientDisconnected: null,
      });
  }
  async Start(port) {
    this.server = new WebSocketServer({ port: port });
    console.log("WebSocket server started on port " + port);
    this.server.on("error", (error) => {
      console.log(error);
      if (this.eventHandlers.error) {
        this.eventHandlers.error(error);
      }
    });

    this.server.on("connection", (ws) => {
      this.clients.push(ws);
      if (this.eventHandlers.clientConnected) {
        this.eventHandlers.clientConnected(ws);
      }
      ws.on("message", (message) => {
        if (this.eventHandlers.message) {
          this.eventHandlers.message({ ws: ws, msg: message.toString() });
        }
      });
    });

    this.server.on("close", () => {
      if (this.eventHandlers.clientDisconnected) {
        this.eventHandlers.clientDisconnected(ws);
        this.clients.splice(this.clients.indexOf(ws), 1);
      }
    });
    return this.server;
  }

  Stop() {
    return new Promise((resolve) => {
      this.server.clients.forEach((socket) => {
        socket.close();
        process.nextTick(() => {
          if ([socket.OPEN, socket.CLOSING].includes(socket.readyState)) {
            socket.terminate();
          }
        });
      });
      this.server.close();
      resolve(true);
      console.log("WebSocket server stopped.");
    });
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
  GetWS() {
    if (this.server) {
      return this.server;
    } else {
      console.error("WebSocket is not started. Call Start() first.");
    }
  }
  send(Message) {
    this.server.clients.forEach((client) => {
      client.send(Message);
    });
  }
}

export default WebSocketServerWrapper;
