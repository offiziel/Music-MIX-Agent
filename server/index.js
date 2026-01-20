import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import analysisRouter from './routes/analysis.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (Frontend)
app.use(express.static(path.join(__dirname, '..')));

// API Routes
app.use('/api/analysis', analysisRouter);

// Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'AI Mixing Assistant Backend Online',
        version: '3.0.0',
        timestamp: new Date().toISOString()
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🎵 AI Mixing Assistant Backend running on http://localhost:${PORT}`);
    console.log(`📊 API Docs: http://localhost:${PORT}/api/health`);
    console.log(`🎛️ Frontend: http://localhost:${PORT}/index.html`);
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({
        error: true,
        message: err.message || 'Internal Server Error'
    });
});
