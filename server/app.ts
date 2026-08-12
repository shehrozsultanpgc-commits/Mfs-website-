import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import orderRoutes from './routes/orderRoutes';
import notificationRoutes from './routes/notificationRoutes';
import aiRoutes from './routes/aiRoutes';
import { sanitizeRequestMiddleware } from './utils/security';

const app = express();

// Trust proxy for Cloud Run & Vercel reverse proxy layer
app.set('trust proxy', 1);

// 1. CORS Security Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  })
);

// 2. Helmet Security Headers
app.use(
  helmet({
    frameguard: false,
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
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

// 5. Rate Limiters
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
});

const strictCheckoutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Order/Notification submission limit reached. Please try again in 15 minutes.',
  },
});

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'MFS AI Assistant query limit reached. Please wait a few minutes before sending more messages.',
  },
});

// Apply General Limiter
app.use('/api', generalLimiter);

// API Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'MFS Growth Agency API Engine',
    security: 'Enterprise Hardened (Vercel Ready)',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Mount Routes
app.use('/api/orders', strictCheckoutLimiter, orderRoutes);
app.use('/api/notifications', strictCheckoutLimiter, notificationRoutes);
app.use('/api/ai', aiLimiter, aiRoutes);

export default app;
