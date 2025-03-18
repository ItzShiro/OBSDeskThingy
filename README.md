
#OBS Desk Thingy

##**Overview of functions**

> ###WebSocketClient
The `WebSocketClient` class provides a simple and convenient way to establish and manage a WebSocket connection to a server. It allows you to send and receive messages, handle connection events, and manage the connection lifecycle.

**Constructor**
---------------

### `WebSocketClient()`

Initializes a new instance of the `WebSocketClient` class.

* **Properties:**
	+ `ws`: The WebSocket object, initially set to `null`.
	+ `eventHandlers`: An object containing event handlers for the following events:
		- `message`: Called when a message is received from the server.
		- `error`: Called when an error occurs on the connection.
		- `disconnect`: Called when the connection is closed.
		- `connect`: Called when the connection is established.
	+ `connected`: A boolean indicating whether the connection is established, initially set to `false`.

**Methods**
------------

### `Connect(ip, port)`

Establishes a WebSocket connection to the specified IP and port.

* **Parameters:**
	+ `ip`: The IP address of the server to connect to.
	+ `port`: The port number of the server to connect to.
* **Returns:** None
* **Description:** Sets up the WebSocket connection and event listeners for connection open, message receipt, error, and close events.

### `GetWS()`

Returns the WebSocket object if the connection is established.

* **Returns:** The WebSocket object if connected, otherwise `null`.
* **Description:** Checks if the connection is established and returns the WebSocket object if so. If not, logs an error and returns `null`.

### `on(eventType, callback)`

Sets an event handler for the specified event type.

* **Parameters:**
	+ `eventType`: The type of event to handle (one of "message", "error", "disconnect", or "connect").
	+ `callback`: The function to call when the event occurs.
* **Returns:** None
* **Description:** Sets the event handler for the specified event type to the provided callback function. If the event type is invalid, logs an error.

**Example Usage**
-----------------

```javascript
const client = new WebSocketClient();

// Establish a connection to the server
client.Connect('localhost', 8080);

// Set up event handlers
client.on('message', (message) => {
  console.log(`Received message: ${message}`);
});

client.on('error', (error) => {
  console.error(`Error occurred: ${error}`);
});

// Get the WebSocket object
const ws = client.GetWS();
if (ws) {
  // Send a message to the server
  ws.send('Hello, server!');
}
```

Note: This documentation is written in Markdown format and is intended to be used as a reference for developers working with the `OBS-DeskThingy_v2` project.
