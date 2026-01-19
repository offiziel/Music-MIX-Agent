# 🎵 AI Mixing Assistant Pro 2025

**Dein intelligenter Deutschrap-Mixing-Assistent mit KI-Power!**

Ein vollständig funktionsfähiger, KI-gestützter Mixing-Assistant spezialisiert auf Deutschrap-Produktion. Nutzt Google Gemini AI für kontextbewusste Mix-Empfehlungen und bietet eine realistische VST-ähnliche Benutzeroberfläche.

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

### 1. Repository klonen
```bash
git clone https://github.com/your-username/Music-MIX-Agent.git
cd Music-MIX-Agent
```

### 2. API Key einrichten
1. Hol dir einen **kostenlosen** Google Gemini API Key: [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Öffne `index.html` in einem Browser
3. Klicke auf **Settings** (unten links)
4. Füge deinen API Key ein und speichere

### 3. Los geht's!
- Öffne einfach `index.html` in deinem Browser
- Keine Installation, keine Dependencies, keine Builds!

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

### Stack
- **React 18** (über CDN)
- **TailwindCSS** (Styling)
- **Google Gemini 2.0 Flash** (AI)
- **Marked.js** (Markdown-Rendering)
- **LocalStorage** (Persistenz)

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

## 📊 Verbesserte Features (vs. Code 1)

| Feature | Code 1 | Optimiert |
|---------|--------|-----------|
| Knob-Interaktion | ❌ Nur Klick | ✅ Drag & Drop |
| Persistenz | ❌ Keine | ✅ Auto-Save |
| Chat-Kontext | ❌ Limitiert | ✅ Vollständig |
| API-Management | ❌ Basic | ✅ Retry + Error Handling |
| Export/Import | ❌ Keine | ✅ JSON-Format |
| Presets | ❌ Keine | ✅ Style-spezifisch |
| Settings | ❌ Hardcoded | ✅ Sicheres Modal |
| Notifications | ❌ Keine | ✅ Toast Messages |
| Loading States | ❌ Basic | ✅ Professional Spinner |
| Design | ⚠️ Basic | ✅ Gradients + Glow |

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
- [ ] Audio File Upload & Analyse
- [ ] Spectrum Analyzer Visualisierung
- [ ] Mehr Style-Presets (Trap, Drill, Boom-Bap)
- [ ] Multi-Language Support
- [ ] Cloud Sync für Settings
- [ ] VST Plugin Integration (Web Audio API)

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
