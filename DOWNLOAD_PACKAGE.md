# 📦 DOWNLOAD PACKAGE - Music MIX Agent

## 🎯 Übersicht

Dieses Repository enthält **zwei separate Anwendungen**:

1. **🎸 DEUTSCHRAP PRODUCER GUIDE 2025** - Standalone Web-App (kein Setup erforderlich)
2. **🎛️ Mix Mentor AI v3.0** - Full-Stack Audio-Analyse-Tool (Backend + Frontend)

---

## 📥 Download Optionen

### Option 1: ZIP Download von GitHub

**Direkter Download:**
```
https://github.com/offiziel/Music-MIX-Agent/archive/refs/heads/main.zip
```

**Über GitHub Interface:**
1. Gehe zu: https://github.com/offiziel/Music-MIX-Agent
2. Klicke auf grünen **"Code"** Button
3. Wähle **"Download ZIP"**
4. Entpacke die Datei

### Option 2: Git Clone

```bash
git clone https://github.com/offiziel/Music-MIX-Agent.git
cd Music-MIX-Agent
```

---

## 📂 Paket Struktur

```
Music-MIX-Agent/
│
├── 🌐 STANDALONE WEB-APP (Sofort nutzbar)
│   ├── index.html                    # Hauptdatei - Im Browser öffnen!
│   └── Keine Installation nötig!
│
├── 📚 DOKUMENTATION
│   ├── README.md                     # Projektübersicht
│   ├── DEPLOYMENT.md                 # ⭐ Diese Datei! Deployment-Guide
│   ├── DOWNLOAD_PACKAGE.md           # Download-Anleitung
│   ├── QUICKSTART.md                 # Schnelleinstieg
│   ├── AI_PROVIDER_GUIDE.md          # API-Konfiguration
│   └── PROJECT_STRUCTURE.md          # Code-Struktur
│
├── 🎛️ BACKEND (Mix Mentor AI)
│   ├── backend/
│   │   ├── server.js                 # Express Server
│   │   ├── package.json              # Dependencies
│   │   ├── .env.example              # Config-Template
│   │   ├── controllers/              # Request Handler
│   │   ├── services/                 # Business Logic
│   │   ├── routes/                   # API Endpoints
│   │   └── config/                   # Konfiguration
│   │
│   └── 🖥️ FRONTEND (React App)
│       ├── frontend/
│       │   ├── src/                  # React Components
│       │   ├── public/               # Static Assets
│       │   ├── package.json          # Dependencies
│       │   ├── .env.example          # Config-Template
│       │   └── vite.config.js        # Build Config
│
└── 🤖 GITHUB ACTIONS
    └── .github/workflows/deploy.yml  # Auto-Deployment
```

---

## 🚀 Quick Start (3 Optionen)

### ✅ Option 1: Standalone Web-App (EMPFOHLEN)

**Für wen:** Produzenten, die sofort loslegen wollen

**Voraussetzungen:** Nur ein Browser!

**Schritte:**
1. Download ZIP (siehe oben)
2. Entpacke die Datei
3. Doppelklick auf **`index.html`**
4. **FERTIG!** 🎉

**Optional - API Key hinzufügen:**
```javascript
// Öffne index.html mit Editor (z.B. VS Code)
// Suche Zeile 71:
const apiKey = "";

// Trage Google Gemini API Key ein:
const apiKey = "AIzaSy...dein-key";

// Speichern und neu laden
```

**Google Gemini API Key (Kostenlos):**
1. Gehe zu: https://aistudio.google.com/app/apikey
2. Klicke "Create API Key"
3. Kopiere den Key
4. Trage in `index.html` ein

---

### ✅ Option 2: Full-Stack Installation (Entwickler)

**Für wen:** Entwickler, die Backend-Features nutzen wollen

**Voraussetzungen:**
- Node.js 18+
- FFmpeg
- Claude API Key

**Schritte:**

#### 1. Backend Setup (5 Minuten)

```bash
# Terminal 1
cd Music-MIX-Agent/backend

# Installiere Dependencies
npm install

# Erstelle .env Datei
cp .env.example .env

# Bearbeite .env mit deinem Editor
nano .env
# oder
code .env
```

**Füge in `.env` ein:**
```env
PORT=3001
NODE_ENV=development
ANTHROPIC_API_KEY=sk-ant-api03-dein-key-hier
GEMINI_API_KEY=dein-gemini-key-hier
FRONTEND_URL=http://localhost:5173
```

**Starte Backend:**
```bash
npm run dev
```

✅ **Backend läuft:** http://localhost:3001

#### 2. Frontend Setup (5 Minuten)

```bash
# Terminal 2
cd Music-MIX-Agent/frontend

# Installiere Dependencies
npm install

# Erstelle .env Datei
cp .env.example .env

# Bearbeite .env
nano .env
```

**Füge in `.env` ein:**
```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Mix Mentor AI v3.0
```

**Starte Frontend:**
```bash
npm run dev
```

✅ **Frontend läuft:** http://localhost:5173

#### 3. FFmpeg Installation

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
1. Download: https://ffmpeg.org/download.html
2. Entpacke nach `C:\ffmpeg`
3. Füge `C:\ffmpeg\bin` zu PATH hinzu

**Test:**
```bash
ffmpeg -version
```

---

### ✅ Option 3: Lokaler Webserver (Standalone)

**Für wen:** User, die einen lokalen Server bevorzugen

**Python 3 (bereits installiert):**
```bash
cd Music-MIX-Agent
python3 -m http.server 8000
```

**Öffne Browser:** http://localhost:8000

**Oder mit Node.js:**
```bash
npx http-server -p 8000
```

---

## 🎮 Features nach Package-Typ

### 📦 Package 1: Standalone Web-App (index.html)

| Feature | Verfügbar | Beschreibung |
|---------|-----------|--------------|
| Style-Auswahl | ✅ | 3 Deutschrap Styles (Aggro/Emotional/Story) |
| Session Setup | ✅ | Track & Effect Konfiguration |
| Mixing Console | ✅ | Virtuelle VST-Racks mit Knobs |
| KI-Mentor Chat | ✅ | Interaktiver Assistent |
| Audio Upload | ❌ | Nur im Full-Stack verfügbar |
| Audio Analyse | ❌ | Nur im Full-Stack verfügbar |
| BPM Detection | ❌ | Nur im Full-Stack verfügbar |
| LUFS Measurement | ❌ | Nur im Full-Stack verfügbar |

**Perfekt für:**
- Schnelle Plugin-Empfehlungen
- Mixing-Workflows lernen
- Style-spezifische Settings
- Unterwegs ohne Installation

---

### 📦 Package 2: Full-Stack App (Backend + Frontend)

| Feature | Verfügbar | Beschreibung |
|---------|-----------|--------------|
| Style-Auswahl | ✅ | 4 Styles + Custom |
| Audio Upload | ✅ | WAV, MP3, FLAC, AIF |
| BPM Detection | ✅ | Automatische Tempo-Erkennung |
| LUFS Measurement | ✅ | ITU-R BS.1770-4 Standard |
| Spectrum Analyzer | ✅ | 7-Band Frequenzanalyse |
| Dynamic Range | ✅ | DR14 Berechnung |
| VST Presets | ✅ | Exakte Parameter für Plugins |
| Claude AI | ✅ | Expert-Level Mixing-Advice |
| Radar Chart | ✅ | Visuelle Parameter-Darstellung |

**Perfekt für:**
- Professionelle Audio-Analyse
- Präzise Mixing-Parameter
- Loudness-Optimierung
- Production-Ready Workflows

---

## 🔑 API Keys Konfiguration

### Standalone Web-App (index.html)

**Google Gemini API (Kostenlos):**

1. **Key erstellen:**
   - Gehe zu: https://aistudio.google.com/app/apikey
   - Klicke "Create API Key"
   - Kopiere den Key (beginnt mit `AIzaSy...`)

2. **Key eintragen:**
   ```javascript
   // Öffne index.html mit Editor
   // Zeile 71:
   const apiKey = "AIzaSyDEIN-KEY-HIER";
   ```

3. **Speichern und neu laden**

**Alternative - LocalStorage:**
```javascript
// In Browser Console (F12):
localStorage.setItem('gemini_api_key', 'AIzaSy...');
```

---

### Full-Stack App (Backend)

**Claude API (Kostenpflichtig):**

1. **Key erstellen:**
   - Registriere auf: https://console.anthropic.com
   - Gehe zu: API Keys
   - Erstelle neuen Key

2. **Key eintragen:**
   ```bash
   # backend/.env
   ANTHROPIC_API_KEY=sk-ant-api03-dein-key
   ```

3. **Server neu starten:**
   ```bash
   cd backend
   npm run dev
   ```

---

## 📋 Installation Checklists

### ✅ Standalone Checklist

- [ ] ZIP heruntergeladen und entpackt
- [ ] `index.html` im Browser geöffnet
- [ ] Gemini API Key erstellt (optional)
- [ ] API Key in Zeile 71 eingetragen (optional)
- [ ] Browser neu geladen
- [ ] Style-Auswahl funktioniert
- [ ] Mixing Console sichtbar
- [ ] KI-Mentor antwortet (wenn API Key gesetzt)

**Fertig!** Du kannst loslegen 🎉

---

### ✅ Full-Stack Checklist

- [ ] Repository geclont/heruntergeladen
- [ ] Node.js 18+ installiert (`node --version`)
- [ ] FFmpeg installiert (`ffmpeg -version`)
- [ ] Backend: `npm install` ausgeführt
- [ ] Backend: `.env` Datei erstellt
- [ ] Backend: Claude API Key eingetragen
- [ ] Backend: Server läuft (`npm run dev`)
- [ ] Backend Health Check: http://localhost:3001/api/health
- [ ] Frontend: `npm install` ausgeführt
- [ ] Frontend: `.env` Datei erstellt
- [ ] Frontend: Server läuft (`npm run dev`)
- [ ] Frontend öffnet: http://localhost:5173
- [ ] Audio Upload funktioniert
- [ ] Analyse zeigt Ergebnisse

**Fertig!** Full-Stack läuft 🚀

---

## 🗂️ Datei-Referenz

### Wichtigste Dateien

| Datei | Beschreibung | Editieren? |
|-------|--------------|------------|
| `index.html` | Standalone Web-App | ✅ Für API Key |
| `backend/.env` | Backend Konfiguration | ✅ Für API Keys |
| `frontend/.env` | Frontend Konfiguration | ✅ Für API URL |
| `DEPLOYMENT.md` | Deployment Guide | ❌ Nur lesen |
| `README.md` | Projekt-Dokumentation | ❌ Nur lesen |
| `QUICKSTART.md` | Schnelleinstieg | ❌ Nur lesen |

### Konfigurationsdateien

**Backend (.env):**
```env
PORT=3001                           # Backend Port
NODE_ENV=development               # development/production
ANTHROPIC_API_KEY=sk-ant-...       # Claude API Key
GEMINI_API_KEY=AIzaSy...           # Gemini API Key (optional)
FRONTEND_URL=http://localhost:5173 # CORS Configuration
MAX_FILE_SIZE=100000000            # 100MB Upload Limit
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:3001/api  # Backend URL
VITE_APP_NAME=Mix Mentor AI v3.0        # App Name
VITE_APP_VERSION=3.0.0                  # Version
```

---

## 🌐 Online Zugriff (GitHub Pages)

### Nach Push zum Main Branch:

**Automatisch verfügbar unter:**
```
https://offiziel.github.io/Music-MIX-Agent/
```

**Aktivierung (einmalig):**
1. Repository → Settings → Pages
2. Source: **GitHub Actions**
3. Warte 3-5 Minuten
4. Öffne die URL

**Updates deployen:**
```bash
git add .
git commit -m "Update"
git push origin main
# Warte 2-3 Minuten
```

---

## 🎯 Use Cases

### Scenario 1: Quick Plugin-Empfehlung
**Lösung:** Standalone Web-App
```
1. index.html öffnen
2. Style wählen (z.B. Aggro)
3. Setup konfigurieren
4. "KI-Setting" klicken
5. Plugin-Parameter kopieren
```
**Zeit:** < 1 Minute

---

### Scenario 2: Audio-Datei analysieren
**Lösung:** Full-Stack App
```
1. Backend + Frontend starten
2. WAV-Datei hochladen
3. Automatische Analyse:
   - BPM: 92
   - LUFS: -12.5 dB
   - Spectral Balance
4. KI generiert präzise Settings
5. In Cubase umsetzen
```
**Zeit:** < 5 Minuten

---

### Scenario 3: Reference Track vergleichen
**Lösung:** Full-Stack App
```
1. Reference Track hochladen (z.B. Bushido - "Sonnenbank Flavour")
2. Eigenen Mix hochladen
3. LUFS, Peak, Spektrum vergleichen
4. Claude AI generiert Anpassungen
5. Iterativ verbessern
```
**Zeit:** 10-15 Minuten

---

## 🐛 Troubleshooting

### Problem: index.html zeigt nur weißen Screen

**Lösung:**
1. Öffne Browser Console (F12)
2. Schaue nach Fehlern
3. Prüfe ob alle CDN-Links laden:
   - React: unpkg.com
   - Tailwind: cdn.tailwindcss.com
   - Marked: cdn.jsdelivr.net
4. Internetverbindung prüfen

---

### Problem: "API Key not configured"

**Für Standalone:**
```javascript
// index.html Zeile 71
const apiKey = "AIzaSy...dein-key";
```

**Für Full-Stack:**
```bash
# backend/.env
ANTHROPIC_API_KEY=sk-ant-api03-...
```

---

### Problem: Backend startet nicht

**Fehler: "Cannot find module"**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

**Fehler: "Port 3001 already in use"**
```bash
# macOS/Linux
lsof -ti:3001 | xargs kill -9

# Windows
netstat -ano | findstr :3001
taskkill /PID [PID] /F
```

---

### Problem: Audio Upload schlägt fehl

**Lösung:**
1. Prüfe FFmpeg: `ffmpeg -version`
2. Prüfe Dateiformat: WAV, MP3, FLAC, AIF
3. Prüfe Dateigröße: < 100MB
4. Prüfe Backend läuft: http://localhost:3001/api/health

---

## 📊 Performance Tipps

### Standalone Web-App optimieren

**Browser Cache:**
```javascript
// Service Worker für Offline-Support
// Datei: sw.js
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll(['/', '/index.html']);
    })
  );
});
```

**CDN Performance:**
- Alle Libraries kommen von CDN
- Keine Build-Schritte nötig
- Instant-Loading

---

### Full-Stack optimieren

**Backend (PM2):**
```bash
npm install -g pm2
cd backend
pm2 start server.js --name mix-mentor
pm2 startup
pm2 save
```

**Frontend (Build):**
```bash
cd frontend
npm run build
# Deploy dist/ Ordner zu Netlify/Vercel
```

---

## 🎓 Weiterführende Dokumentation

| Dokument | Inhalt | Link |
|----------|--------|------|
| **README.md** | Projektübersicht, Features | [Öffnen](README.md) |
| **DEPLOYMENT.md** | GitHub Pages, Production | [Öffnen](DEPLOYMENT.md) |
| **QUICKSTART.md** | 5-Minuten Tutorial | [Öffnen](QUICKSTART.md) |
| **AI_PROVIDER_GUIDE.md** | API Setup Details | [Öffnen](AI_PROVIDER_GUIDE.md) |
| **PROJECT_STRUCTURE.md** | Code-Architektur | [Öffnen](PROJECT_STRUCTURE.md) |

---

## 💾 Backup & Updates

### Lokales Backup erstellen

**Option 1: ZIP**
```bash
cd Music-MIX-Agent
zip -r backup-$(date +%Y%m%d).zip . -x "node_modules/*" -x ".git/*"
```

**Option 2: Git Tag**
```bash
git tag -a v1.0.0 -m "Production ready"
git push origin v1.0.0
```

---

### Updates herunterladen

**Git Pull:**
```bash
cd Music-MIX-Agent
git pull origin main
cd backend && npm install
cd ../frontend && npm install
```

**Neue ZIP downloaden:**
```
https://github.com/offiziel/Music-MIX-Agent/archive/refs/heads/main.zip
```

---

## 🚀 Nächste Schritte

### Nach Installation:

1. **Tutorial durcharbeiten:**
   - Öffne `QUICKSTART.md`
   - Folge dem 5-Minuten-Tutorial
   - Teste alle Features

2. **Ersten Mix erstellen:**
   - Wähle Style (z.B. Aggro)
   - Lade Track hoch (Full-Stack)
   - Setze Settings in Cubase um

3. **Community beitreten:**
   - GitHub Issues für Fragen
   - Teile deine Mixes
   - Feature-Requests stellen

---

## 📞 Support & Community

**GitHub Issues:**
```
https://github.com/offiziel/Music-MIX-Agent/issues
```

**Neue Features vorschlagen:**
```
https://github.com/offiziel/Music-MIX-Agent/issues/new?template=feature_request.md
```

**Bugs melden:**
```
https://github.com/offiziel/Music-MIX-Agent/issues/new?template=bug_report.md
```

---

## 🎁 Bonus: Offline-Paket

### Komplett-Offline-Version erstellen:

```bash
# 1. Clone Repository
git clone https://github.com/offiziel/Music-MIX-Agent.git

# 2. Installiere alle Dependencies
cd Music-MIX-Agent/backend && npm install
cd ../frontend && npm install

# 3. Build Frontend
cd frontend
npm run build

# 4. Erstelle ZIP mit allem
cd ../..
zip -r offline-package.zip Music-MIX-Agent \
  -x "*/node_modules/*" \
  -x "*/.git/*"
```

**Ergebnis:** `offline-package.zip` (ca. 50MB)

**Enthält:**
- Standalone Web-App
- Backend (mit Dependencies)
- Frontend (gebaut)
- Komplette Dokumentation

---

## ✅ Download Package Checklist

- [ ] ZIP heruntergeladen
- [ ] Entpackt in Arbeitsverzeichnis
- [ ] Standalone Web-App getestet (index.html)
- [ ] Dokumentation gelesen (README.md)
- [ ] API Keys erstellt (falls benötigt)
- [ ] Backend/Frontend installiert (falls Full-Stack)
- [ ] FFmpeg installiert (falls Full-Stack)
- [ ] GitHub Pages URL bookmarked
- [ ] Repository gestarrt auf GitHub ⭐

---

**🎵 Happy Producing!**

_Von Produzenten, für Produzenten - Made in Berlin._

---

## 📝 Version History

- **v3.0.0** (2025) - Full-Stack Release mit Claude AI
- **v2.0.0** (2025) - Hybrid AI Service (Claude + Gemini)
- **v1.0.0** (2024) - Initial Release

**Letzte Aktualisierung:** 2025-01-20
