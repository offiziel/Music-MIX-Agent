# 🚀 Mix Mentor AI - AI Studio Prompts

**Ready-to-use Prompts für Google AI Studio Build Mode**

---

## 📁 Was ist hier drin?

Diese 3 Dateien enthalten **alles**, was du brauchst, um Mix Mentor AI in Google AI Studio zu erstellen:

| Datei | Beschreibung | Wo einfügen? |
|-------|--------------|--------------|
| `SYSTEM-INSTRUCTIONS.md` | Kompletter Expert-Prompt (25+ Jahre Mixing-Wissen) | AI Studio → "System instructions" |
| `BUILD-MODE-PROMPT.md` | App-Spezifikation für Web-App-Generierung | AI Studio → "Build mode" Chat |
| `ADVANCED-SETTINGS.md` | Alle Settings (Model, Temperature, Tools, etc.) | AI Studio → ⚙️ Advanced Settings |

---

## ⚡ Quick Start (5 Minuten)

### 1️⃣ AI Studio öffnen
```
https://aistudio.google.com
```
- Melde dich mit Google-Account an
- Klicke auf **"New Prompt"**

### 2️⃣ System Instructions einfügen
- Klicke auf **"System instructions"**
- Öffne `SYSTEM-INSTRUCTIONS.md`
- **Copy & Paste** den kompletten Text (Strg+A → Strg+C → Strg+V)
- ✅ Fertig!

### 3️⃣ Advanced Settings konfigurieren
- Klicke auf **⚙️ Symbol** (oben rechts)
- Öffne `ADVANCED-SETTINGS.md`
- Stelle die Werte ein:
  - Model: `gemini-2.0-flash-thinking-exp-1219`
  - Thinking Level: `High`
  - Temperature: `0.1`
  - Max Tokens: `4096`
  - Safety: Alle auf `Block none`
  - Code Execution: `ON`
  - Function Calling: `ON`

### 4️⃣ Build Mode aktivieren
- Klicke auf **"Build"** (oben rechts)
- Öffne `BUILD-MODE-PROMPT.md`
- **Copy & Paste** den kompletten Text in den Chat
- Sende ab (Enter)

### 5️⃣ Warten & Testen
- Gemini generiert die App (30-60 Sekunden)
- Preview öffnet sich automatisch
- Teste mit deinem Gemini API Key:
  - Hole Key: https://aistudio.google.com/apikey
  - Füge Key in die App ein
  - Lade Audio hoch
  - Analysiere!

---

## 📝 Dateien im Detail

### 🎓 SYSTEM-INSTRUCTIONS.md
**Größe**: ~8 KB | **Zeilen**: ~150

**Inhalt:**
- 4 Deutschrap-Styles (Aggro Berlin, Emotional/PI, Afro/Modern, Oldschool)
- Cubase 15 Insert Chains (8 Slots pro Style)
- Exakte Plugin-Parameter (iZotope, FabFilter, Waves)
- Frequenz-Guidelines (20 Hz - 20 kHz)
- Target-Werte (LUFS, True Peak, Dynamic Range)
- Antwort-Format (Markdown-Template)

**Nutzung:**
```
AI Studio → System instructions → Paste
```

---

### 🏗️ BUILD-MODE-PROMPT.md
**Größe**: ~5 KB | **Zeilen**: ~250

**Inhalt:**
- UI/UX Design (Dark Mode, Tailwind CSS)
- Layout (3-Spalten: Sidebar, Main, Results)
- Web Audio API Code (BPM, LUFS, Peak Detection)
- Gemini API Integration (JavaScript Fetch)
- User Flow (6 Schritte vom Upload bis Results)
- Error Handling (API Key, Audio, Errors)

**Nutzung:**
```
AI Studio → Build Mode → Paste in Chat
```

---

### ⚙️ ADVANCED-SETTINGS.md
**Größe**: ~3 KB | **Zeilen**: ~120

**Inhalt:**
- Model Selection (Gemini 2.0 Flash vs. 1.5 Pro)
- Thinking Level (Low/Medium/High)
- Generation Settings (Temperature, Tokens, Top-K/P)
- Safety Settings (Block none für technische Begriffe)
- Tools Configuration (Code Execution, Function Calling)
- Pro-Tipps (Model wechseln, Temperature anpassen)

**Nutzung:**
```
AI Studio → ⚙️ Advanced Settings → Manuell einstellen
```

---

## 🎯 Ergebnis

Nach dem Befolgen der Schritte hast du:

✅ **Eine vollständige Mix Mentor AI v3.0 Web-App**
- DAW-Style Dark Mode Interface
- Audio-Upload + Web Audio API Analyse
- Gemini AI Integration (kostenlos: 1.500 req/day)
- 4 Deutschrap-Styles mit Cubase 15 Mix-Chains
- BPM, LUFS, Peak Detection
- Spectrum Analyzer (Canvas Visualization)

✅ **Deployment-Optionen**
1. **AI Studio hosten**: Public Link (einfachste Methode)
2. **HTML exportieren**: Lokal öffnen (funktioniert offline)
3. **GitHub Pages**: Kostenlos hosten auf `username.github.io`

---

## 🆘 Troubleshooting

### Problem: System Instructions zu lang?
**Lösung**: AI Studio unterstützt bis zu 32K Tokens - unser Prompt hat nur ~3K. Passt easy!

### Problem: Build Mode generiert keine App?
**Lösung**:
1. Prüfe, ob "Code Execution" aktiviert ist
2. Wähle Model: `gemini-1.5-pro` (stabiler für Build Mode)
3. Teile den BUILD-MODE-PROMPT in 2 Teile auf:
   - Teil 1: ANFORDERUNGEN + DESIGN
   - Teil 2: FUNKTIONALITÄT + CODE

### Problem: App funktioniert nicht?
**Lösung**:
1. Öffne Browser Console (F12)
2. Prüfe auf JavaScript-Errors
3. Stelle sicher, dass Gemini API Key gültig ist
4. Teste mit kleiner Audio-Datei (< 10 MB)

### Problem: Gemini API Error 429 (Quota exceeded)?
**Lösung**:
- Free Tier: 1.500 Requests/Tag
- Warte 24h oder upgrade zu Paid Plan
- Oder nutze Claude API (siehe Hauptprojekt)

---

## 💰 Kosten

### Google Gemini API

| Tier | Limit | Kosten |
|------|-------|--------|
| **Free** | 1.500 req/day | **$0** |
| **Paid** | Unlimited | $0.00035/1K input tokens |
|          |            | $0.0014/1K output tokens |

**Beispiel-Rechnung** (Free Tier):
- 1 Analyse = ~1K input + 2K output Tokens
- 1.500 Analysen/Tag = **KOSTENLOS**
- Bei Paid: 1.000 Analysen = ~$3.50

**→ Starte mit Free Tier, upgrade nur wenn nötig!**

---

## 🔄 Alternativen

### Claude API nutzen (statt Gemini)

Falls du lieber Claude nutzen möchtest:

1. Nutze die **Full-Stack-Version** (siehe `/backend` + `/frontend`)
2. Oder ändere API-Endpoint in der generierten App:

```javascript
// Statt Gemini:
fetch('https://generativelanguage.googleapis.com/v1beta/...')

// Claude verwenden:
fetch('https://api.anthropic.com/v1/messages', {
  headers: {
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01'
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }]
  })
})
```

**Kosten Claude**: $3.00/1M input tokens (teurer, aber höhere Qualität)

---

## 📚 Weitere Ressourcen

### Google AI Studio
- **Docs**: https://ai.google.dev/gemini-api/docs
- **Build Mode Tutorial**: https://ai.google.dev/gemini-api/docs/build-apps
- **API Reference**: https://ai.google.dev/api/rest
- **Pricing**: https://ai.google.dev/pricing

### Deutschrap Production
- **LUFS Metering**: https://www.itu.int/rec/R-REC-BS.1770
- **iZotope Nectar 4**: https://www.izotope.com/en/products/nectar.html
- **FabFilter Pro-Q 3**: https://www.fabfilter.com/products/pro-q-3

### Mix Mentor AI Projekt
- **Full-Stack Version**: `/backend` + `/frontend` (Node.js + React)
- **Standalone HTML**: `/mix-mentor-ai-standalone.html` (Single-File)
- **Complete Guide**: `/AI-STUDIO-SETUP-GUIDE.md` (Ausführliche Version)

---

## ✅ Checkliste

Bevor du startest:

- [ ] Google-Account erstellt ✓
- [ ] AI Studio geöffnet (https://aistudio.google.com) ✓
- [ ] Gemini API Key geholt (https://aistudio.google.com/apikey) ✓
- [ ] `SYSTEM-INSTRUCTIONS.md` bereit ✓
- [ ] `BUILD-MODE-PROMPT.md` bereit ✓
- [ ] `ADVANCED-SETTINGS.md` durchgelesen ✓
- [ ] Test-Audio-Datei bereit (WAV/MP3, 3-10 MB) ✓

---

## 🎉 Let's Go!

**Alle Dateien ready?** → Gehe zu https://aistudio.google.com und starte!

**Questions?** → Siehe `/AI-STUDIO-SETUP-GUIDE.md` für ausführliche Erklärungen

**Viel Erfolg beim Mixen!** 🎛️🎤🔥

---

**Erstellt für**: Mix Mentor AI v3.0
**Datum**: Januar 2025
**Author**: Mix Mentor AI Team
**License**: MIT
