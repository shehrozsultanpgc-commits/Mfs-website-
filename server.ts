import 'dotenv/config';
import http from 'http';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { WebSocketServer } from 'ws';
import app from './server/app';
import { setupLiveAssistant } from './server/routes/aiLiveRoutes';

async function startServer() {
  const PORT = 3000;

  // Static files from public directory (videos, images, assets)
  app.use(express.static(path.join(process.cwd(), 'public')));

  const server = http.createServer(app);

  // Attach WebSocket server for Gemini Live API
  const wss = new WebSocketServer({ noServer: true });
  setupLiveAssistant(wss);

  server.on('upgrade', (request, socket, head) => {
    try {
      const url = new URL(request.url || '', `http://${request.headers.host || 'localhost'}`);
      if (url.pathname === '/api/live') {
        wss.handleUpgrade(request, socket, head, (ws) => {
          wss.emit('connection', ws, request);
        });
      }
    } catch (e) {
      socket.destroy();
    }
  });

  // Vite middleware for development vs static production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: { server } },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`[MFS Server] Enterprise Platform Engine listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[MFS Server Startup Error]:', err);
  process.exit(1);
});

