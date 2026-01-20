import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { analyzeAudio } from '../services/audioAnalyzer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure Multer for audio uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        const uniqueName = `audio_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
    fileFilter: (req, file, cb) => {
        const allowedTypes = /wav|mp3|m4a|ogg|flac/;
        const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mime = allowedTypes.test(file.mimetype);

        if (ext && mime) {
            cb(null, true);
        } else {
            cb(new Error('Nur Audio-Dateien erlaubt! (wav, mp3, m4a, ogg, flac)'));
        }
    }
});

/**
 * POST /api/analysis/upload
 * Upload & analyze audio file
 */
router.post('/upload', upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: true,
                message: 'Keine Audio-Datei hochgeladen'
            });
        }

        console.log('📁 Analyzing:', req.file.originalname);

        // Analyze audio file
        const analysis = await analyzeAudio(req.file.path);

        res.json({
            error: false,
            message: 'Audio erfolgreich analysiert',
            data: {
                filename: req.file.originalname,
                size: req.file.size,
                ...analysis
            }
        });
    } catch (error) {
        console.error('Analysis Error:', error);
        res.status(500).json({
            error: true,
            message: 'Fehler bei der Audio-Analyse',
            details: error.message
        });
    }
});

/**
 * GET /api/analysis/presets/:style
 * Get style-specific mixing presets
 */
router.get('/presets/:style', (req, res) => {
    const { style } = req.params;

    const presets = {
        aggro: {
            name: 'AGGRESSIV',
            bpm_range: [140, 160],
            vocal_chain: {
                eq: {
                    lowCut: { freq: 80, slope: 12 },
                    lowMid: { freq: 250, gain: -3, q: 1.2 },
                    presence: { freq: 4500, gain: 6, q: 2.0 },
                    air: { freq: 12000, gain: 2, q: 0.7 }
                },
                compression: {
                    threshold: -18,
                    ratio: 4.0,
                    attack: 10,
                    release: 80,
                    makeupGain: 6
                },
                saturation: {
                    drive: 45,
                    tone: 50,
                    mix: 40
                }
            },
            fx: {
                reverb: { decay: 0.8, predelay: 15, mix: 8 },
                delay: { time: 125, feedback: 20, mix: 12 }
            },
            mastering: {
                lufs_target: -9.0,
                peak_ceiling: -0.3
            }
        },
        emo: {
            name: 'EMOTIONAL',
            bpm_range: [90, 110],
            vocal_chain: {
                eq: {
                    lowCut: { freq: 70, slope: 12 },
                    lowMid: { freq: 200, gain: -2, q: 1.0 },
                    presence: { freq: 3500, gain: 4, q: 1.5 },
                    air: { freq: 12000, gain: 5, q: 0.8 }
                },
                compression: {
                    threshold: -16,
                    ratio: 3.0,
                    attack: 25,
                    release: 120,
                    makeupGain: 5
                },
                saturation: {
                    drive: 25,
                    tone: 30,
                    mix: 35
                }
            },
            fx: {
                reverb: { decay: 1.8, predelay: 20, mix: 18 },
                delay: { time: 250, feedback: 35, mix: 20 }
            },
            mastering: {
                lufs_target: -10.0,
                peak_ceiling: -0.5
            }
        },
        story: {
            name: 'STORYTELLING',
            bpm_range: [85, 95],
            vocal_chain: {
                eq: {
                    lowCut: { freq: 90, slope: 12 },
                    lowMid: { freq: 300, gain: -1, q: 0.8 },
                    presence: { freq: 3000, gain: 3, q: 1.2 },
                    air: { freq: 10000, gain: 3, q: 0.6 }
                },
                compression: {
                    threshold: -15,
                    ratio: 3.5,
                    attack: 20,
                    release: 100,
                    makeupGain: 4
                },
                saturation: {
                    drive: 30,
                    tone: 35,
                    mix: 30
                }
            },
            fx: {
                reverb: { decay: 1.2, predelay: 18, mix: 12 },
                delay: { time: 150, feedback: 25, mix: 15 }
            },
            mastering: {
                lufs_target: -10.5,
                peak_ceiling: -0.5
            }
        }
    };

    if (!presets[style]) {
        return res.status(404).json({
            error: true,
            message: `Style '${style}' nicht gefunden`
        });
    }

    res.json({
        error: false,
        data: presets[style]
    });
});

export default router;
