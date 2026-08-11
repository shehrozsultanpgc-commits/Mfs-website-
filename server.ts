import 'dotenv/config';
import http from 'http';
import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer as createViteServer } from 'vite';
import { WebSocketServer } from 'ws';
import orderRoutes from './server/routes/orderRoutes';
import notificationRoutes from './server/routes/notificationRoutes';
import aiRoutes from './server/routes/aiRoutes';
import { setupLiveAssistant } from './server/routes/aiLiveRoutes';
import { sanitizeRequestMiddleware } from './server/utils/security';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust proxy for Cloud Run reverse proxy layer & express-rate-limit
  app.set('trust proxy', 1);

  // 1. CORS Security Configuration
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, iframe inner requests) or any origin in dev/preview
        callback(null, true);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    })
  );

  // 2. Helmet Security Headers (Configured for iframe preview compatibility)
  app.use(
    helmet({
      frameguard: false, // Allow iframe embedding for AI Studio preview
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: false, // Disabled for inline scripts/styles in preview
      xssFilter: true,
      noSniff: true,
      hidePoweredBy: true,
    })
  );

  // 3. Body Parsing Middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // 4. Global Input Sanitization Middleware
  app.use('/api', sanitizeRequestMiddleware);

  // 5. Express Rate Limiters for Brute-Force & Denial-of-Service Protection
  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 200 requests per 15 mins
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      error: 'Too many requests from this IP. Please try again after 15 minutes.',
    },
  });

  const strictCheckoutLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // Limit checkout/notifications to 30 requests per 15 mins
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      error: 'Order/Notification submission limit reached. Please try again in 15 minutes or contact support on WhatsApp.',
    },
  });

  const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit AI assistant requests
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      error: 'MFS AI Assistant query limit reached. Please wait a few minutes before sending more messages.',
    },
  });

  // Apply General Limiter on API
  app.use('/api', generalLimiter);

  // API Health Endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'MFS Growth Agency API Engine',
      security: 'Enterprise Hardened (CORS, Helmet, RateLimit, Sanitization)',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    });
  });

  // Mount Routes with Specific Rate Limits & Sanitization
  app.use('/api/orders', strictCheckoutLimiter, orderRoutes);
  app.use('/api/notifications', strictCheckoutLimiter, notificationRoutes);
  app.use('/api/ai', aiLimiter, aiRoutes);

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
