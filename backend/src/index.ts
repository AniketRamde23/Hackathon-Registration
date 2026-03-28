import * as Sentry from '@sentry/node';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import cookieParser from 'cookie-parser';
const xssClean = null; // Removed due to IncomingMessage TypeError
// Routes
import authRoutes from './routes/auth.routes';
import registrationRoutes from './routes/registration.routes';
import teamRoutes from './routes/team.routes';
import paymentRoutes from './routes/payment.routes';
import ticketRoutes from './routes/ticket.routes';
import scoreRoutes from './routes/score.routes';
import adminRoutes from './routes/admin.routes';

// Config
import { env as config } from './config/env';
import { startCronJobs } from './services/cron.service';
import { initSocket } from './socket/socket';
import { logger } from './utils/logger';

// INIT SENTRY APM
Sentry.init({
  dsn: process.env.SENTRY_DSN || '',
  tracesSampleRate: 1.0,
});

const app = express();
export { app };
const httpServer = createServer(app);

// Sentry Global Tracking
// app.use(Sentry.Handlers.requestHandler());

// ── SOCKET.IO ─────────────────────────────────────────
const io = new SocketServer(httpServer, {
  cors: { origin: [config.FRONTEND_URL, config.ADMIN_URL, config.JUDGE_URL], credentials: true },
});
initSocket(io);
app.set('io', io);

// ── SECURITY MIDDLEWARE ───────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(cors({ origin: [config.FRONTEND_URL, config.ADMIN_URL, config.JUDGE_URL], credentials: true }));
app.use(express.json({ limit: '20kb' })); // Lock payload sizes
app.use(cookieParser());

// XSS & NoSQL Injection Sanitizations
// Removed mongoSanitize due to IncomingMessage getter crash limits

// Rate Limiters Array
const globalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 1500 });
const authLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 100, message: "Too many authentication requests, try again later." });
const paymentLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 50, message: "Too many payment execution requests, try again later." });
const regLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 30, message: "Too many registration payload attempts." });

app.use('/api/', globalLimiter);

// ── HEALTH CHECK ──────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// ── ROUTES ────────────────────────────────────────────
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/registrations', regLimiter, registrationRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/payments', paymentLimiter, paymentRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api/admin', adminRoutes);

// ── GLOBAL ERROR HANDLERS ─────────────────────────────
Sentry.setupExpressErrorHandler(app);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(`[Express] Runtime Error: ${err.message}`, { stack: err.stack, path: req.path });
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server execution error',
  });
});

// ── DB + SERVER EXECUTION ─────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(config.MONGODB_URI).then(() => {
    logger.info('✅ Protected MongoDB Topology mapped');
    startCronJobs();
    httpServer.listen(config.PORT, () => {
      logger.info(`🚀 Secure Application runtime active on port ${config.PORT}`);
    });
  }).catch(err => { logger.error('❌ Database mounting failed:', err); process.exit(1); });
}
