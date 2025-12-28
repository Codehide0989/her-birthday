require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
const passport = require('./config/passport');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const contentRoutes = require('./routes/contentRoutes');

const app = express();

connectDB();

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(morgan('dev'));

app.use(compression());

app.use(cookieParser());

app.use('/api/v1/subscription/webhook', express.raw({ type: 'application/json' }));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.',
});

app.use('/api/', limiter);

app.use(passport.initialize());

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'StudySphere API is running',
    timestamp: new Date().toISOString(),
  });
});

app.use(`/api/${process.env.API_VERSION || 'v1'}/auth`, authRoutes);
app.use(`/api/${process.env.API_VERSION || 'v1'}/subscription`, subscriptionRoutes);
app.use(`/api/${process.env.API_VERSION || 'v1'}/content`, contentRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║     StudySphere API Server Started   ║
╠═══════════════════════════════════════╣
║  Environment: ${process.env.NODE_ENV?.padEnd(23) || 'development'.padEnd(23)} ║
║  Port: ${PORT.toString().padEnd(30)} ║
║  API Version: ${(process.env.API_VERSION || 'v1').padEnd(24)} ║
╚═══════════════════════════════════════╝
  `);
});

process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = app;
