const WebSocket = require('ws');

const wss = new WebSocket.Server({ host: '0.0.0.0', port: 8080 });  // Listen on all interfaces
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Listen for messages from clients
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
