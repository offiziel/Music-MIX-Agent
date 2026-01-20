# 📁 Project Structure

```
Music-MIX-Agent/
│
├── backend/                          # Node.js/Express Backend
│   ├── config/
│   │   └── anthropic.js             # Claude API configuration + System Prompt
│   ├── controllers/
│   │   └── audioController.js       # Request handlers for all endpoints
│   ├── routes/
│   │   └── audio.js                 # API route definitions
│   ├── services/
│   │   ├── audioAnalysis.js         # Audio analysis engine (BPM, LUFS, spectrum)
│   │   └── aiService.js             # AI preset generation with Claude
│   ├── uploads/                     # Temporary audio file storage (auto-created)
│   ├── .env.example                 # Environment variables template
│   ├── package.json                 # Backend dependencies
│   └── server.js                    # Express server entry point
│
├── frontend/                         # React/Vite Frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── Dashboard.jsx        # Main analysis view
│   │   │   ├── Header.jsx           # Top navigation bar
│   │   │   ├── MasterGuide.jsx      # Production workflow guide
│   │   │   ├── PluginCard.jsx       # VST plugin display card
│   │   │   ├── RadarChart.jsx       # Parameter visualization
│   │   │   ├── Sidebar.jsx          # Left panel (style selector, metrics)
│   │   │   ├── SpectrumAnalyzer.jsx # Real-time audio visualization
│   │   │   ├── StudioSuite.jsx      # Plugin parameter view
│   │   │   └── TransportBar.jsx     # Bottom status bar
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAPI.jsx           # API communication layer
│   │   │   └── useAudio.jsx         # Web Audio API management
│   │   ├── styles/
│   │   │   └── index.css            # Global Tailwind styles
│   │   ├── utils/                   # Utility functions (reserved)
│   │   ├── App.jsx                  # Main application component
│   │   └── main.jsx                 # React entry point
│   ├── .env.example                 # Environment variables template
│   ├── index.html                   # HTML template
│   ├── package.json                 # Frontend dependencies
│   ├── postcss.config.js            # PostCSS configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   └── vite.config.js               # Vite build configuration
│
├── shared/                           # Shared types/utilities (reserved)
│
├── .gitignore                       # Git ignore rules
├── QUICKSTART.md                    # Quick setup guide
├── PROJECT_STRUCTURE.md             # This file
└── README.md                        # Complete documentation
```

## Component Hierarchy

```
App.jsx
├── Header (view, setView)
├── Sidebar (style, setStyle, vocalType, setVocalType)
└── Main Content (conditional rendering)
    ├── Dashboard (view === 'dashboard')
    │   ├── SpectrumAnalyzer
    │   ├── RadarChart
    │   └── Frequency Analysis
    ├── StudioSuite (view === 'studio')
    │   └── PluginCard (multiple instances)
    └── MasterGuide (view === 'guide')
└── TransportBar
```

## Data Flow

```
User Uploads Audio File
        ↓
Frontend (useAudio hook)
        ↓
Backend /api/analyze
        ↓
audioAnalysisService.analyzeAudio()
  - BPM Detection
  - LUFS Calculation
  - Peak Detection
  - Frequency Spectrum Analysis
        ↓
Returns Analysis Data
        ↓
Frontend /api/generate-preset
        ↓
aiService.generateMixingInstructions()
  - Sends data to Claude API
  - Receives detailed mixing instructions
  - Parses response into structured format
        ↓
Returns Preset Data
        ↓
Frontend Displays:
  - Dashboard: Overview + Radar Chart
  - Studio Suite: Plugin Parameters
  - Spectrum Analyzer: Real-time visualization
```

## Key Technologies by Layer

### Backend
- **Express** - Web framework
- **Multer** - File upload handling
- **FFmpeg** - Audio format conversion
- **wav-decoder** - WAV file parsing
- **music-tempo** - BPM detection
- **@anthropic-ai/sdk** - Claude AI integration

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Radar chart visualization
- **Axios** - HTTP requests
- **Web Audio API** - Real-time audio processing

## File Sizes (Approximate)

| Component | LOC | Purpose |
|-----------|-----|---------|
| audioAnalysis.js | ~400 | Core audio analysis engine |
| aiService.js | ~300 | AI preset generation |
| anthropic.js | ~100 | System prompt (expert knowledge) |
| Dashboard.jsx | ~150 | Main UI view |
| Sidebar.jsx | ~200 | Input controls |
| SpectrumAnalyzer.jsx | ~100 | FFT visualization |

## Environment Variables

### Backend (.env)
- `ANTHROPIC_API_KEY` - Claude API key (required)
- `PORT` - Server port (default: 3001)
- `FRONTEND_URL` - CORS origin
- `MAX_FILE_SIZE` - Upload limit (default: 100MB)
- `TARGET_LUFS` - Mastering target (default: -10.0)

### Frontend (.env)
- `VITE_API_URL` - Backend API URL (default: http://localhost:3001/api)
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Version number

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/analyze | Analyze audio file |
| POST | /api/generate-preset | Generate VST preset |
| POST | /api/get-instructions | Get plugin-specific instructions |
| GET | /api/styles | Get available mixing styles |
| GET | /api/health | Health check |

## State Management

### Global Contexts
1. **AudioContext** (useAudio)
   - Audio file management
   - Web Audio API state
   - Playback controls
   - Real-time analysis data

2. **APIContext** (useAPI)
   - Backend communication
   - Loading states
   - Error handling
   - Preset data caching

### Local State
- Component-specific UI state
- Form inputs
- Modal visibility

## Build & Deploy

### Development
```bash
# Backend: http://localhost:3001
cd backend && npm run dev

# Frontend: http://localhost:5173
cd frontend && npm run dev
```

### Production
```bash
# Build frontend
cd frontend && npm run build

# Serve with backend
cd backend && npm start
```

---

Built with ❤️ for professional German Rap producers
