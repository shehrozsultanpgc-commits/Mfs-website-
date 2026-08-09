const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000/api/live');
ws.on('open', () => {
  console.log('Connected to WS');
  // Send some dummy audio
  const dummyAudio = Buffer.alloc(1024 * 16).fill(0).toString('base64');
  ws.send(JSON.stringify({ audio: dummyAudio }));
  setTimeout(() => {
    ws.close();
  }, 2000);
});
ws.on('message', (data) => {
  console.log('Received:', data.toString());
});
ws.on('error', (err) => {
  console.error('Error:', err);
});
ws.on('close', (code, reason) => {
  console.log('Closed:', code, reason.toString());
});
