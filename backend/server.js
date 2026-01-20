import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import audioRoutes from './routes/audio.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('[Server] Created uploads directory');
}

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Request logging

// API Routes
app.use('/api', audioRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Mix Mentor AI Backend',
    version: '3.0.0',
    status: 'operational',
    endpoints: {
      analyze: 'POST /api/analyze',
      generatePreset: 'POST /api/generate-preset',
      getInstructions: 'POST /api/get-instructions',
      styles: 'GET /api/styles',
      health: 'GET /api/health'
    },
    docs: 'https://github.com/yourusername/mix-mentor-ai'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Server] Error:', err);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║                                                           ║');
  console.log('║            🎵  MIX MENTOR AI v3.0 Backend  🎵             ║');
  console.log('║                                                           ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`[Server] Running on http://localhost:${PORT}`);
  console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[Server] Claude API: ${process.env.ANTHROPIC_API_KEY ? '✓ Configured' : '✗ Not configured'}`);
  console.log(`[Server] CORS Origin: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log('');
  console.log('[Server] Ready to analyze audio and generate mixing presets!');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[Server] SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('[Server] SIGINT received, shutting down gracefully...');
  process.exit(0);
});

export default app;
