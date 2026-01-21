# 🚀 DEPLOYMENT GUIDE - Music MIX Agent

## 📋 Inhaltsverzeichnis
- [GitHub Pages Deployment](#github-pages-deployment)
- [Lokale Installation](#lokale-installation)
- [Backend + Frontend Setup](#backend--frontend-setup)
- [Konfiguration](#konfiguration)
- [Troubleshooting](#troubleshooting)

---

## 🌐 GitHub Pages Deployment

### Automatisches Deployment

Das Projekt ist **bereits konfiguriert** für automatisches GitHub Pages Deployment!

#### ✅ Was ist bereits eingerichtet:
- **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
- **Standalone Web-App** (`index.html` im Root)
- **Automatische Aktivierung** bei jedem Push zum Main-Branch

#### 🔧 Aktivierung (Einmalig):

1. **Gehe zu deinem GitHub Repository**
   ```
   https://github.com/offiziel/Music-MIX-Agent
   ```

2. **Öffne Settings → Pages**
   - Klicke auf "Settings" (oben rechts)
   - Scrolle zu "Pages" in der linken Sidebar

3. **Konfiguriere Source**
   - **Source:** GitHub Actions
   - **Branch:** (wird automatisch von Actions gesetzt)
   - Klicke "Save"

4. **Fertig! 🎉**
   Deine App ist nach ca. 2-3 Minuten verfügbar unter:
   ```
   https://offiziel.github.io/Music-MIX-Agent/
   ```

#### 🔄 Updates deployen:
Jeder Push zum Main-Branch löst automatisch ein neues Deployment aus:
```bash
git add .
git commit -m "Update Web-App"
git push origin main
```

---

## 💻 Lokale Installation (Standalone Web-App)

### Option 1: Direkt im Browser öffnen

Die `index.html` ist eine **standalone Single-Page-App** ohne Server-Anforderungen:

1. **Download das Repository:**
   ```bash
   git clone https://github.com/offiziel/Music-MIX-Agent.git
   cd Music-MIX-Agent
   ```

2. **Öffne die Datei:**
   - Doppelklick auf `index.html`
   - ODER: Rechtsklick → "Öffnen mit" → Browser

3. **API Key eintragen (optional):**
   - Öffne `index.html` mit einem Editor
   - Suche Zeile 71: `const apiKey = "";`
   - Trage deinen Google Gemini API Key ein
   - Ohne Key läuft die App im **Demo-Modus**

### Option 2: Mit lokalem Webserver

Für bessere Performance empfohlen:

#### Python (eingebaut):
```bash
# Python 3
python3 -m http.server 8000

# Öffne Browser:
http://localhost:8000
```

#### Node.js (http-server):
```bash
npx http-server -p 8000
```

#### Live Server (VS Code Extension):
1. Installiere "Live Server" Extension
2. Rechtsklick auf `index.html` → "Open with Live Server"

---

## 🎛️ Backend + Frontend Setup (Full-Stack Version)

Für die **Mix Mentor AI v3.0** Anwendung mit Audio-Analyse:

### Voraussetzungen
- **Node.js 18+**
- **FFmpeg**
- **Claude API Key** (von https://console.anthropic.com)

### 1️⃣ Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cat > .env << EOF
PORT=3001
NODE_ENV=production
ANTHROPIC_API_KEY=dein-api-key-hier
GEMINI_API_KEY=dein-gemini-key-hier
MAX_FILE_SIZE=100000000
ALLOWED_FORMATS=wav,mp3,flac,aif,aiff
FRONTEND_URL=http://localhost:5173
TARGET_LUFS=-10.0
TARGET_CEILING=-0.1
EOF

# Start backend
npm start
```

**Backend läuft auf:** `http://localhost:3001`

### 2️⃣ Frontend Setup

```bash
# Neues Terminal
cd frontend

# Install dependencies
npm install

# Create environment file
cat > .env << EOF
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Mix Mentor AI v3.0
VITE_APP_VERSION=3.0.0
EOF

# Development mode
npm run dev

# Production build
npm run build
npm run preview
```

**Frontend läuft auf:** `http://localhost:5173`

### 3️⃣ FFmpeg Installation

#### macOS:
```bash
brew install ffmpeg
```

#### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install ffmpeg
```

#### Windows:
1. Download von https://ffmpeg.org/download.html
2. Entpacke nach `C:\ffmpeg`
3. Füge `C:\ffmpeg\bin` zu PATH hinzu

---

## ⚙️ Konfiguration

### API Keys

#### Google Gemini (Kostenlos):
1. Gehe zu https://aistudio.google.com/app/apikey
2. Erstelle neuen API Key
3. Trage in `index.html` Zeile 71 ein:
   ```javascript
   const apiKey = "AIzaSy...dein-key";
   ```

#### Claude API (Backend):
1. Registriere auf https://console.anthropic.com
2. Erstelle API Key
3. Trage in `backend/.env` ein:
   ```env
   ANTHROPIC_API_KEY=sk-ant-api03-...
   ```

### Ports ändern

#### Backend Port:
In `backend/.env`:
```env
PORT=3001  # Ändere zu gewünschtem Port
```

#### Frontend API URL:
In `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001/api
```

---

## 🐛 Troubleshooting

### GitHub Pages funktioniert nicht

**Problem:** App lädt nicht oder zeigt 404

**Lösung:**
1. Prüfe ob Actions aktiviert sind:
   - Gehe zu Repository → Actions Tab
   - Schaue ob "Deploy to GitHub Pages" grün ist
2. Prüfe Pages Einstellungen:
   - Settings → Pages
   - Source muss "GitHub Actions" sein
3. Warte 5-10 Minuten nach dem Push

### API Key Fehler in index.html

**Problem:** "⚠️ DEMO MODE: Bitte API Key im Code eintragen"

**Lösung:**
1. Öffne `index.html` mit Editor
2. Suche Zeile 71
3. Trage Gemini API Key ein:
   ```javascript
   const apiKey = "dein-key-hier";
   ```
4. Speichern und neu laden

### Backend startet nicht

**Problem:** "Cannot find module" oder "Port already in use"

**Lösung:**
```bash
# Lösche node_modules und reinstalliere
cd backend
rm -rf node_modules package-lock.json
npm install

# Port freigeben (macOS/Linux)
lsof -ti:3001 | xargs kill -9

# Port freigeben (Windows)
netstat -ano | findstr :3001
taskkill /PID [PID] /F
```

### FFmpeg fehlt

**Problem:** "Audio analysis failed" oder "FFmpeg not found"

**Lösung:**
```bash
# Prüfe ob FFmpeg installiert ist
ffmpeg -version

# Falls nicht, installiere (siehe oben)
```

### CORS Fehler im Browser

**Problem:** "Access to fetch blocked by CORS policy"

**Lösung:**
Prüfe `backend/server.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

### Upload funktioniert nicht

**Problem:** Datei wird nicht hochgeladen

**Lösung:**
1. Prüfe Dateiformat: WAV, MP3, FLAC, AIF
2. Prüfe Dateigröße: Max 100MB
3. Prüfe Backend läuft: `http://localhost:3001/api/health`
4. Browser Console öffnen (F12) für Fehlerdetails

---

## 🔐 Sicherheitshinweise

### ⚠️ API Keys NIEMALS committen!

**Falsch:**
```javascript
// index.html - NICHT SO!
const apiKey = "AIzaSyDEINECHTER-KEY-HIER";
git add index.html
git push
```

**Richtig - Option 1 (Umgebungsvariablen):**
```javascript
// index.html
const apiKey = localStorage.getItem('gemini_api_key') || "";
```

**Richtig - Option 2 (Backend):**
Nutze Backend `.env` Dateien (diese sind in `.gitignore`):
```env
# backend/.env (WIRD NICHT COMMITTED)
GEMINI_API_KEY=dein-key-hier
```

### .gitignore prüfen

Stelle sicher, dass `.gitignore` enthält:
```
# API Keys
.env
.env.local
.env.production

# Node
node_modules/
```

---

## 📦 Production Deployment (Full-Stack)

### Option 1: Vercel (Empfohlen)

#### Frontend:
```bash
cd frontend
npm install -g vercel
vercel --prod
```

#### Backend:
```bash
cd backend
vercel --prod
# Setze Environment Variables im Vercel Dashboard
```

### Option 2: Heroku

```bash
# Backend
cd backend
heroku create music-mix-backend
heroku config:set ANTHROPIC_API_KEY=dein-key
git push heroku main

# Frontend
cd frontend
npm run build
# Deploy dist/ Ordner
```

### Option 3: Docker

```dockerfile
# Dockerfile (Backend)
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ .
RUN apk add --no-cache ffmpeg
EXPOSE 3001
CMD ["npm", "start"]
```

```bash
docker build -t music-mix-backend .
docker run -p 3001:3001 -e ANTHROPIC_API_KEY=key music-mix-backend
```

---

## 📊 Performance Tipps

### Index.html optimieren

1. **CDN Links prüfen:**
   Alle Libraries (React, Tailwind, Marked) kommen von CDN - keine Installation nötig!

2. **Caching aktivieren:**
   Für Production-Server, füge zu `.htaccess` hinzu:
   ```apache
   <IfModule mod_expires.c>
     ExpiresActive On
     ExpiresByType text/html "access plus 1 hour"
     ExpiresByType text/css "access plus 1 month"
     ExpiresByType application/javascript "access plus 1 month"
   </IfModule>
   ```

3. **Gzip Kompression:**
   Nginx:
   ```nginx
   gzip on;
   gzip_types text/html text/css application/javascript;
   ```

### Backend Performance

1. **PM2 für Production:**
   ```bash
   npm install -g pm2
   cd backend
   pm2 start server.js --name music-mix-api
   pm2 startup
   pm2 save
   ```

2. **Rate Limiting:**
   Bereits in `backend/server.js` konfiguriert:
   ```javascript
   // Max 100 Requests pro 15 Minuten pro IP
   ```

---

## 🎯 Quick Start Commands

### Entwicklung starten:
```bash
# Terminal 1 - Backend
cd backend && npm install && npm run dev

# Terminal 2 - Frontend
cd frontend && npm install && npm run dev
```

### Production Build:
```bash
# Frontend bauen
cd frontend
npm run build

# Backend starten
cd backend
npm start
```

### GitHub Pages Update:
```bash
git add .
git commit -m "Update deployment"
git push origin main
# Warte 2-3 Minuten, dann neu laden
```

---

## 📞 Support

**Probleme?** Öffne ein Issue auf GitHub:
```
https://github.com/offiziel/Music-MIX-Agent/issues
```

**Dokumentation:**
- `README.md` - Projektübersicht
- `QUICKSTART.md` - Schnelleinstieg
- `AI_PROVIDER_GUIDE.md` - API Setup
- `PROJECT_STRUCTURE.md` - Code-Struktur

---

## ✅ Deployment Checklist

- [ ] GitHub Actions aktiviert (Settings → Pages → GitHub Actions)
- [ ] API Keys in `.env` Dateien (NICHT in Git)
- [ ] FFmpeg installiert (für Audio-Analyse)
- [ ] Backend läuft auf Port 3001
- [ ] Frontend läuft auf Port 5173
- [ ] CORS korrekt konfiguriert
- [ ] Health Check funktioniert: `http://localhost:3001/api/health`
- [ ] GitHub Pages URL funktioniert (nach 3-5 Minuten)

---

**🎵 Made with ❤️ for German Rap Producers**

_Deployment made easy - from localhost to production in minutes!_
