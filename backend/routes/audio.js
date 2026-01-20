import express from 'express';
import multer from 'multer';
import path from 'path';
import audioController from '../controllers/audioController.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'audio-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /wav|mp3|flac|aif|aiff|m4a/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype) || file.mimetype.startsWith('audio/');

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only audio files are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 100000000 // 100MB default
  },
  fileFilter: fileFilter
});

// Routes
router.post('/analyze', upload.single('audio'), audioController.analyze);
router.post('/generate-preset', audioController.generatePreset);
router.post('/get-instructions', audioController.getInstructions);
router.get('/styles', audioController.getStyles);
router.get('/health', audioController.health);

export default router;
