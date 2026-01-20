# 🎵 Mix Mentor AI v3.0 - PRODUCER LEGEND SUITE

**Professional AI-Powered Mixing Assistant for German Rap Production**

Mix Mentor AI is a full-stack application that combines advanced audio analysis with Claude AI to generate precise, production-ready mixing instructions tailored for Deutschrap (German Rap) music. Built for producers working with Cubase 15, iZotope Suite, and professional VST plugins.

![Mix Mentor AI](https://img.shields.io/badge/Version-3.0.0-cyan)
![License](https://img.shields.io/badge/License-MIT-emerald)
![Node](https://img.shields.io/badge/Node-18+-purple)
![React](https://img.shields.io/badge/React-18+-orange)

---

## 🚀 Features

### 🎛️ **Advanced Audio Analysis**
- **BPM Detection** - Automatic tempo detection
- **LUFS Measurement** - ITU-R BS.1770-4 standard loudness analysis
- **Peak Detection** - True peak and dBFS measurements
- **Frequency Spectrum Analysis** - 7-band spectral energy distribution
- **Dynamic Range Calculation** - DR14 standard implementation
- **Clipping Detection** - Automatic over-limiting warnings

### 🤖 **AI-Powered Mixing Instructions**
- **Claude API Integration** - Uses Claude Sonnet 4.5 for expert-level mixing advice
- **Style-Specific Chains** - Optimized for 4 Deutschrap subgenres:
  - **AGGRO BERLIN** (Bushido, Sido, Fler) - Aggressive, dry, maximum loudness
  - **EMOTIONAL/PI** (Prinz Pi, Casper) - Melodic, airy, long reverb
  - **AFRO/MODERN** (RAF Camora, Bonez MC) - Trap-style, Auto-Tune, stereo width
  - **OLDSCHOOL/BOOM BAP** (Kollegah, Farid Bang) - Warm low-mids, tape saturation
- **Vocal Type Routing** - Separate chains for Main Vocals, Backing Vocals, and Adlibs
- **Precise VST Parameters** - Exact dB/Hz/ms/ratio values for plugins

### 🎨 **Professional DAW-Style Interface**
- **Live Spectrum Analyzer** - Real-time FFT visualization with Web Audio API
- **Radar Chart** - Visual representation of 6 key parameters (Air, Crunch, Squeeze, Space, Width, Tuning)
- **Plugin Cards** - iZotope Nectar 4, Ozone 12, FabFilter Pro-Q 3, and more
- **Master Guide** - Built-in workflow documentation for Berlin production techniques
- **Dark Theme** - Professional DAW-inspired UI with Tailwind CSS

---

## 📦 Tech Stack

### Backend
- **Node.js 18+** - Runtime environment
- **Express** - Web framework
- **@anthropic-ai/sdk** - Claude API integration
- **wav-decoder** - Audio file parsing
- **music-tempo** - BPM detection
- **fluent-ffmpeg** - Audio format conversion
- **multer** - File upload handling

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Radar chart visualization
- **Axios** - HTTP client
- **Web Audio API** - Real-time audio analysis

---

## 🛠️ Installation

### Prerequisites
- **Node.js 18 or higher**
- **npm or yarn**
- **Claude API Key** (from https://console.anthropic.com)
- **FFmpeg** (for audio conversion)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/mix-mentor-ai.git
cd mix-mentor-ai
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Add your Claude API key to .env
# ANTHROPIC_API_KEY=your_key_here
```

**Edit `backend/.env`:**
```env
PORT=3001
NODE_ENV=development
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
MAX_FILE_SIZE=100000000
ALLOWED_FORMATS=wav,mp3,flac,aif,aiff
FRONTEND_URL=http://localhost:5173
TARGET_LUFS=-10.0
TARGET_CEILING=-0.1
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Create .env file
cp .env.example .env
```

**Edit `frontend/.env`:**
```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Mix Mentor AI v3.0
VITE_APP_VERSION=3.0.0
```

### 4. Install FFmpeg (Required)

**macOS:**
```bash
brew install ffmpeg
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install ffmpeg
```

**Windows:**
Download from https://ffmpeg.org/download.html and add to PATH

---

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server runs on **http://localhost:3001**

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on **http://localhost:5173**

### Production Mode

**Build Frontend:**
```bash
cd frontend
npm run build
```

**Start Backend:**
```bash
cd backend
npm start
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### **POST /api/analyze**
Analyze uploaded audio file

**Request:**
```bash
curl -X POST http://localhost:3001/api/analyze \
  -F "audio=@vocals.wav"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "bpm": 92,
    "lufs": -12.5,
    "peak": -3.2,
    "truePeak": -2.7,
    "dynamicRange": 8.4,
    "sampleRate": 48000,
    "channels": 2,
    "duration": 185.3,
    "spectrum": {
      "subBass": { "energy": 12.3 },
      "bass": { "energy": 18.7 },
      "lowMid": { "energy": 22.1 },
      "mid": { "energy": 15.9 },
      "highMid": { "energy": 14.2 },
      "presence": { "energy": 10.5 },
      "brilliance": { "energy": 6.3 }
    },
    "frequencyBalance": [
      {
        "issue": "MUD",
        "frequency": "250-500 Hz",
        "solution": "Reduziere Low-Mids um 2-4dB mit Pro-Q 3"
      }
    ]
  }
}
```

#### **POST /api/generate-preset**
Generate VST preset based on analysis

**Request:**
```json
{
  "analysisData": { /* from /analyze */ },
  "style": "aggro",
  "vocalType": "main"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": "Aggressive vocal mix detected...",
    "insertChain": [
      {
        "slot": 1,
        "name": "iZotope Nectar 4",
        "parameters": {
          "De-Esser": { "value": -20, "unit": "dB" },
          "Frequency": { "value": 5500, "unit": "Hz" }
        }
      }
    ],
    "radarParameters": {
      "air": 40,
      "crunch": 70,
      "squeeze": 80,
      "space": 30,
      "width": 40,
      "tuning": 20
    }
  }
}
```

#### **GET /api/styles**
Get available mixing styles

**Response:**
```json
{
  "success": true,
  "data": {
    "aggro": {
      "name": "AGGRO BERLIN",
      "description": "Bushido, Sido, Fler - Aggressive, dry, maximum loudness",
      "color": "#EF4444",
      "targetLUFS": -8,
      "era": "2000-2010"
    }
  }
}
```

#### **GET /api/health**
Health check

**Response:**
```json
{
  "success": true,
  "status": "operational",
  "version": "3.0.0"
}
```

---

## 🎯 Usage Guide

### 1. Select Your Style
Choose from 4 Deutschrap styles:
- **AGGRO BERLIN** - For hard, aggressive tracks
- **EMOTIONAL/PI** - For melodic, emotional vocals
- **AFRO/MODERN** - For modern trap-style productions
- **OLDSCHOOL** - For boom-bap and classic hip-hop

### 2. Select Vocal Type
- **Main Vocals** - Lead vocal track (centered, maximum clarity)
- **Backing Vocals** - Supporting vocals (wider stereo, less presence)
- **Adlibs** - Creative elements (heavy processing, delays)

### 3. Upload Audio
- Supported formats: WAV, MP3, FLAC, AIF, M4A
- Recommended: WAV 48kHz/24-bit for best results
- Max file size: 100MB

### 4. Review Analysis
The system will automatically:
- Detect BPM and key
- Measure loudness (LUFS) and peak levels
- Analyze frequency spectrum
- Identify mixing problems

### 5. Get AI Instructions
Claude AI generates:
- **Insert Chain** - Step-by-step plugin routing
- **Send Effects** - Reverb and delay settings
- **Bus Processing** - Group channel setup
- **Mastering Chain** - Final loudness processing
- **Critical Frequencies** - Problem areas and solutions

### 6. Implement in Cubase
Follow the exact parameters provided:
- Open Cubase 15
- Insert plugins in correct order
- Copy parameter values precisely
- A/B compare with reference tracks

---

## 🎛️ Supported Plugins

### iZotope Suite
- **Nectar 4** - Vocal production
- **Ozone 11/12** - Mastering
- **Neutron 4** - Mix assistant

### FabFilter
- **Pro-Q 3** - Parametric EQ
- **Pro-C 2** - Compressor
- **Pro-L 2** - Limiter

### Others
- **Auto-Tune Pro** - Pitch correction
- **Melodyne 5** - Natural pitch editing
- **Valhalla VintageVerb** - Reverb
- **UAD 1176** - Classic compressor
- **Pultec EQP-1A** - Analog EQ emulation

---

## 🎓 Workflow Best Practices

### Preparation
1. Normalize tracks to **-18dB RMS** for headroom
2. Remove DC offset and clicks
3. Organize tracks logically

### Vocal Processing Chain
1. **Pitch Correction** (Melodyne/Auto-Tune)
2. **EQ** (High-pass + problem frequencies)
3. **Compression** (4:1 ratio, 10ms attack)
4. **De-Esser** (5.5kHz, -20dB threshold)
5. **Saturation** (10-20% for warmth)
6. **Spatial Effects** (Reverb/Delay on sends)

### Mastering
1. Group all vocals to **Vocal Bus**
2. Apply **Neutron** for glue
3. Master bus: **Ozone** with IRC IV mode
4. Target: **-10 LUFS** (Spotify/Apple standard)
5. Ceiling: **-0.1dB** (prevent clipping)

---

## 🐛 Troubleshooting

### Backend Issues

**Error: "Audio analysis failed"**
- Check if FFmpeg is installed: `ffmpeg -version`
- Verify file format is supported
- Check file size is under 100MB

**Error: "Claude API key not configured"**
- Add `ANTHROPIC_API_KEY` to `backend/.env`
- Restart backend server

**Error: "Cannot find module"**
- Run `npm install` in backend directory
- Delete `node_modules` and reinstall

### Frontend Issues

**Blank screen**
- Check if backend is running on port 3001
- Open browser console for errors
- Verify `VITE_API_URL` in frontend/.env

**Upload not working**
- Check CORS settings in backend
- Verify file size is under 100MB
- Try different audio format

**Spectrum analyzer not showing**
- Check if Web Audio API is supported (modern browsers)
- Allow microphone/audio permissions if prompted

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Anthropic** - Claude AI API
- **iZotope** - Audio processing algorithms
- **Berlin Rap Scene** - Musical inspiration and reference material
- **Cubase Community** - Production workflow insights

---

## 📞 Support

- **GitHub Issues:** https://github.com/yourusername/mix-mentor-ai/issues
- **Email:** support@mixmentor.ai
- **Discord:** https://discord.gg/mixmentor

---

## 🎵 Made with ❤️ for German Rap Producers

**Mix Mentor AI v3.0** - Professional mixing made accessible.

_"No hallucinations, just professional production."_
