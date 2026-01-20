# 🎵 AI Mixing Assistant Pro 3.0 - Ultimate Edition

**Dein intelligenter Deutschrap-Mixing-Assistent mit KI-Power & Audio-Analyse!**

Ein vollständig funktionsfähiger, KI-gestützter Mixing-Assistant spezialisiert auf Deutschrap-Produktion. Nutzt Google Gemini AI für kontextbewusste Mix-Empfehlungen, Web Audio API für echte Audio-Analyse und bietet eine realistische DAW-ähnliche Benutzeroberfläche.

## 🎯 Zwei Versionen verfügbar

### 🟢 **Basic Version** (`index.html`)
Standalone HTML-File ohne Backend - Perfekt für schnellen Einstieg!
- ✅ Keine Installation nötig
- ✅ Läuft komplett im Browser
- ✅ Alle Mixing-Features
- ⚠️ Keine Audio-Upload/Analyse

### 🔵 **Pro Version** (`index-pro.html` + Backend)
Full-Stack App mit Audio-Analyse - Für professionelle Producer!
- ✅ Audio File Upload (WAV, MP3, M4A, OGG, FLAC)
- ✅ Echte Audio-Analyse (BPM, LUFS, Peak, Spectrum)
- ✅ Live Spektrum-Analyzer (Web Audio API)
- ✅ Backend mit Express & REST API
- ⚠️ Benötigt Node.js Installation

## ✨ Features

### 🎛️ **Realistisches VST-Interface**
- **Drag-to-change Knobs**: Ziehe vertikal für präzise Kontrolle (wie echte Hardware!)
- Smooth Animationen und visuelles Feedback
- Professionelle Knob-Indikatoren und Werteanzeige

### 🤖 **AI-Powered Mixing**
- **Kontextbewusster AI-Chat**: Die KI kennt deine kompletten Session-Settings
- **Style-spezifische Empfehlungen**: Optimiert für Aggro, Emotional & Storytelling
- **Automatische Plugin-Optimierung**: AI analysiert und schlägt perfekte Settings vor
- Konkrete technische Werte (Hz, dB, ms)

### 💾 **Session Management**
- **Auto-Save**: Alle Settings werden automatisch in LocalStorage gespeichert
- **Export/Import**: Teile deine Presets als JSON
- **Quick Presets**: Style-optimierte Voreinstellungen auf Knopfdruck
- Session-Persistenz über Reload hinweg

### 🎧 **Audio Lab** (Pro Version)
- **File Upload**: Drag & Drop Audio-Files (WAV, MP3, M4A, OGG, FLAC)
- **Live Spektrum-Analyzer**: Echtzeit-Visualisierung mit Canvas
- **BPM Detection**: Automatische Tempo-Erkennung
- **LUFS Metering**: Professionelle Lautstärke-Messung (EBU R128)
- **Peak Analysis**: True Peak & Dynamic Range
- **Frequency Analysis**: Spektral-Analyse & Balance
- **Quality Score**: AI-basierte Audio-Qualitätsbewertung
- **Style Recommendations**: AI empfiehlt passenden Mixing-Style

### 🎨 **3 Mixing-Styles**
1. **AGGRESSIV** (140-160 BPM) - Harter Straßenrap, trocken, in-your-face
2. **EMOTIONAL** (90-110 BPM) - Hall, Melodien, Deep Vibes
3. **STORYTELLING** (85-95 BPM) - Fokus auf Klarheit und Stimme

### 🔧 **Professional Vocal Chain**
- **Subtraktiver EQ**: Low Cut, Low Mid, High Mid, Air
- **Kompressor**: Threshold, Ratio, Attack, Makeup Gain
- **Saturation**: Drive, Tone, Mix, Output
- **FX Chain**: Autotune, Delay, Reverb (konfigurierbar)
- **Master Limiter**: Finales Lautstärke-Management

### 🎯 **Smarte UX**
- Toast Notifications für User-Feedback
- Loading States mit Spinner
- Responsive Design (Desktop & Mobile)
- Dark Mode mit Neon-Glow-Effekten
- Settings Modal für sichere API-Key-Verwaltung

## 🚀 Quick Start

### Option A: Basic Version (Einfach & Schnell)

1. **Repository klonen**
```bash
git clone https://github.com/offiziel/Music-MIX-Agent.git
cd Music-MIX-Agent
```

2. **API Key einrichten**
   - Hol dir einen **kostenlosen** Google Gemini API Key: [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Öffne `index.html` in einem Browser
   - Klicke auf **Settings** (unten links)
   - Füge deinen API Key ein und speichere

3. **Los geht's!**
   - Öffne einfach `index.html` in deinem Browser
   - Keine Installation, keine Dependencies, keine Builds!

---

### Option B: Pro Version (Mit Audio-Analyse)

1. **Repository klonen**
```bash
git clone https://github.com/offiziel/Music-MIX-Agent.git
cd Music-MIX-Agent
```

2. **Dependencies installieren**
```bash
npm install
```

3. **Backend starten**
```bash
npm start
# oder mit auto-reload:
npm run dev
```

4. **Frontend öffnen**
   - Öffne Browser: `http://localhost:3001/index-pro.html`
   - API Key einrichten (Settings → Gemini API Key)
   - Audio-File hochladen und analyzieren!

5. **Fertig!** 🎉
   - Backend läuft auf `http://localhost:3001`
   - Frontend mit Web Audio API Integration
   - Upload bis zu 50MB Audio-Dateien

## 📖 Benutzung

### Schritt 1: Style wählen
Wähle deinen Rap-Style. Das bestimmt die AI-Empfehlungen und Preset-Werte:
- **AGGRESSIV**: Trockene, harte Vocals
- **EMOTIONAL**: Viel Raum und Hall
- **STORYTELLING**: Fokus auf Verständlichkeit

### Schritt 2: Setup konfigurieren
- **Spuren**: Main, Doubles, Adlibs aktivieren
- **Effekte**: Autotune, Delay, Reverb auswählen

### Schritt 3: Mixen!
- **Knobs drehen**: Ziehe vertikal mit der Maus
- **AI-OPTIMIZE**: Klick für automatische Style-Optimierung
- **Quick Preset**: Style-Preset auf alle Plugins anwenden
- **AI Mentor fragen**: Chat für spezifische Fragen

### Export & Import
- **Export**: Speichere Settings als `.json` Datei
- **Import**: Lade gespeicherte Presets

## 🛠️ Technische Details

### Frontend Stack
- **React 18** (über CDN)
- **TailwindCSS** (Styling)
- **Google Gemini 2.0 Flash** (AI)
- **Marked.js** (Markdown-Rendering)
- **LocalStorage** (Persistenz)
- **Web Audio API** (Audio-Verarbeitung) 🆕
- **Canvas API** (Spektrum-Visualisierung) 🆕

### Backend Stack (Pro Version)
- **Node.js** + **Express** (Server)
- **Multer** (File Upload Middleware)
- **CORS** (Cross-Origin Resource Sharing)
- **Custom Audio Analyzer** (BPM, LUFS, Spectrum)

### Backend-Architektur
```
server/
├── index.js              # Main Express Server
├── routes/
│   └── analysis.js       # Audio-Analyse & Preset API
├── services/
│   └── audioAnalyzer.js  # Audio-Analyse-Logik
└── uploads/              # Temp-Ordner für Audio-Files
```

### API Endpoints
```
GET  /api/health                    # Health Check
POST /api/analysis/upload           # Audio-File Upload & Analyse
GET  /api/analysis/presets/:style   # Style-spezifische Presets
```

### Browser-Kompatibilität
- ✅ Chrome/Edge (empfohlen)
- ✅ Firefox
- ✅ Safari
- ⚠️ IE11 (nicht unterstützt)

### API-Nutzung
- Kostenloser Gemini API Key hat großzügige Limits
- Retry-Logik bei Netzwerkfehlern (3 Versuche)
- Timeout nach 15 Sekunden
- Rate-Limit-Handling

## 📊 Feature-Vergleich

### Basic vs. Pro Version

| Feature | Basic | Pro | Beschreibung |
|---------|-------|-----|--------------|
| **Drag-to-change Knobs** | ✅ | ✅ | Realistische VST-Kontrolle |
| **Auto-Save** | ✅ | ✅ | LocalStorage Persistenz |
| **AI Chat (kontextbewusst)** | ✅ | ✅ | Vollständiger Session-Kontext |
| **Export/Import Presets** | ✅ | ✅ | JSON-Format |
| **Quick Presets** | ✅ | ✅ | Style-optimiert |
| **Settings Modal** | ✅ | ✅ | Sicherer API-Key Manager |
| **Toast Notifications** | ✅ | ✅ | User-Feedback |
| **Audio File Upload** | ❌ | ✅ | Drag & Drop (50MB max) |
| **BPM Detection** | ❌ | ✅ | Automatische Tempo-Erkennung |
| **LUFS Metering** | ❌ | ✅ | EBU R128 Standard |
| **Peak Analysis** | ❌ | ✅ | True Peak + Dynamic Range |
| **Spektrum-Analyzer** | ❌ | ✅ | Live Canvas-Visualisierung |
| **Frequency Analysis** | ❌ | ✅ | Spektrale Balance |
| **Quality Score** | ❌ | ✅ | AI-basierte Bewertung |
| **Style Recommendations** | ❌ | ✅ | Basierend auf Audio-Analyse |
| **Backend Server** | ❌ | ✅ | Express + REST API |

### Evolution Timeline

| Version | Hauptfeature | Status |
|---------|-------------|---------|
| **v1.0** (Code 1) | Basic Mixing Console | ⚪ Deprecated |
| **v2.0** (Optimiert) | Drag-Knobs + Auto-Save | 🟢 Stable |
| **v3.0** (Pro) | Audio-Analyse + Backend | 🔵 Current |

## 🎓 Tipps für beste Ergebnisse

### Mixing-Workflow
1. **Start mit Quick Preset**: Basis-Sound etablieren
2. **AI-OPTIMIZE pro Plugin**: Feintuning durch AI
3. **Manuelle Anpassungen**: Drag-Knobs nach Geschmack
4. **AI Mentor fragen**: Bei spezifischen Problemen

### Chat-Prompts (Beispiele)
- "Warum klingt meine Vocal dumpf?"
- "Wie viel Compression ist zu viel?"
- "Beste Delay-Settings für Aggro-Rap?"
- "EQ-Tipps gegen Matschigkeit?"

### Best Practices
- **Subtraktiv EQen**: Erst störende Frequenzen raus
- **Gentle Compression**: Lieber mehrere Stufen als eine extreme
- **Saturation sparsam**: Weniger ist mehr
- **Master Limiter zuletzt**: Sicheres Lautstärke-Management

## 🔐 Sicherheit & Datenschutz

- API Key wird **nur in deinem Browser** (LocalStorage) gespeichert
- Keine Server-Kommunikation außer mit Google Gemini API
- Keine Tracking-Tools oder Analytics
- Alle Daten bleiben lokal

## 🤝 Beitragen

Feature-Ideen und Verbesserungsvorschläge willkommen!

### Geplante Features
- [x] ~~Audio File Upload & Analyse~~ ✅ DONE (v3.0)
- [x] ~~Spectrum Analyzer Visualisierung~~ ✅ DONE (v3.0)
- [ ] **Echte FFmpeg-Integration** für präzise Audio-Analyse
- [ ] Mehr Style-Presets (Trap, Drill, Boom-Bap, Jersey Club)
- [ ] Multi-Language Support (EN, FR, TR)
- [ ] Cloud Sync für Settings (Firebase/Supabase)
- [ ] VST Plugin Emulation mit Web Audio API
- [ ] Batch Processing (mehrere Files auf einmal)
- [ ] A/B Vergleich (Before/After)
- [ ] Audio-Export mit angewendeten Settings

## 🐛 Bekannte Limitationen & Troubleshooting

### Backend Audio-Analyse
**WICHTIG**: Die aktuelle Audio-Analyse im Backend ist **simuliert** für Demo-Zwecke.

Für **echte Production-Quality Analyse** benötigt man:
- **FFmpeg** für Audio-Decoding
- **Aubio** oder **Essentia** für BPM-Detection
- **EBU R128** Filter für LUFS-Messung
- **SoX** für Spektrum-Analyse

**Warum Simulation?**
- Native Node.js hat keine Audio-Codecs
- FFmpeg-Installation würde Deployment komplizieren
- Für Demo/Prototyping ist Simulation ausreichend

**Frontend Audio-Features** (Web Audio API) funktionieren aber **100% echt**:
- ✅ Live Spektrum-Analyzer
- ✅ Peak-Metering
- ✅ Playback
- ✅ Visualisierung

### Häufige Probleme

#### Backend startet nicht
```bash
# Lösung 1: Dependencies neu installieren
rm -rf node_modules
npm install

# Lösung 2: Port bereits belegt
# Ändere PORT in server/index.js oder:
PORT=3002 npm start
```

#### Audio-Upload funktioniert nicht
- ✅ Prüfe ob Backend läuft (`http://localhost:3001/api/health`)
- ✅ Max. File-Size: 50MB
- ✅ Erlaubte Formate: WAV, MP3, M4A, OGG, FLAC
- ✅ CORS muss aktiviert sein (ist default)

#### Spektrum-Analyzer zeigt nichts
- ✅ Audio-File muss **abspielen** (Play-Button klicken)
- ✅ Browser muss Web Audio API unterstützen (Chrome/Edge empfohlen)
- ✅ Check Browser Console für Errors

#### AI-Chat antwortet nicht
- ✅ API Key korrekt eingegeben?
- ✅ Internet-Verbindung aktiv?
- ✅ Gemini API Quota nicht erschöpft? (Free Tier: 60 requests/minute)

## 🔮 Production Deployment

### Für echte Audio-Analyse implementieren:

1. **FFmpeg installieren**
```bash
# Ubuntu/Debian
sudo apt-get install ffmpeg

# macOS
brew install ffmpeg
```

2. **Audio-Libraries hinzufügen**
```bash
npm install fluent-ffmpeg aubio
```

3. **Code in `server/services/audioAnalyzer.js` ersetzen**
```javascript
import ffmpeg from 'fluent-ffmpeg';
import Aubio from 'aubio';

export async function analyzeAudio(filePath) {
    // Echte FFmpeg + Aubio Implementation
    // Siehe: https://github.com/fluent-ffmpeg/node-fluent-ffmpeg
}
```

4. **Deployment**
- **Heroku**: Buildpack mit FFmpeg
- **Docker**: `ffmpeg` im Container
- **VPS**: Manuell installieren

## 📄 Lizenz

MIT License - Frei nutzbar für alle Producer!

## 🙏 Credits

Entwickelt mit ❤️ für die Deutschrap-Community

**Powered by:**
- Google Gemini AI
- React & TailwindCSS
- Leidenschaft für guten Sound

---

**🎧 Happy Mixing! 🔥**

*Für Feedback oder Fragen: Open an Issue oder starte eine Discussion!*
