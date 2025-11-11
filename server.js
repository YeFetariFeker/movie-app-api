/* server.js – Movie API entry point */
//require('dotenv').config();                       // ← load .env first

const express = require('express');
const server = express();
const router = require('./routes/router');        // all API routes
const PORT = process.env.PORT || 3000;

/* -------------------- SECURITY -------------------- */
const helmet = require('helmet');
const cors = require('cors');

/* 1. Helmet – CSP (fixed keys, commas, defaults) */
const cspDirectives = {
  'img-src': ["'self'", 'https:', 'data:'],
  'script-src': ["'self'", 'https://cdn.jsdelivr.net'],
  'style-src': ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
  'font-src': ["'self'", 'https://cdn.jsdelivr.net'],
  'connect-src': ["'self'"]
};

server.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    directives: cspDirectives
  })
);

/* 2. CORS – whitelist in production */
const allowedOrigins = [
  'http://localhost:5173',               // Vite/React dev
  'https://your-movie-app.com'           // ← replace with your domain
];

server.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  })
);

/* -------------------- BODY PARSERS -------------------- */
server.use(express.json({ limit: '10mb' }));
server.use(express.urlencoded({ extended: true }));

/* -------------------- ROUTES -------------------- */
server.use('/', router);   // → /api, /api/movie, etc.

/* -------------------- ERROR HANDLERS -------------------- */
// 404 – JSON
server.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.originalUrl,
    message: 'Check /api for available endpoints.'
  });
});

// 500 – catch all
server.use((err, req, res, next) => {
  console.error('UNHANDLED ERROR:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { message: err.message })
  });
});

/* -------------------- START SERVER -------------------- */
server.listen(PORT, () => {
  console.log(`My Movie API is now showing on http://localhost:${PORT}`);
  console.log(`API Index: http://localhost:${PORT}/api`);
});

