# 🚀 Quick Start Guide

## Für Eilige (2 Minuten Setup)

### Basic Version (Ohne Installation)

1. **Öffne `index.html` im Browser**
   - Doppelklick auf die Datei
   - Oder: Rechtsklick → "Öffnen mit" → Chrome/Firefox

2. **API Key holen (optional aber empfohlen)**
   - Gehe zu: https://aistudio.google.com/app/apikey
   - Klicke "Create API Key"
   - Kopiere den Key

3. **In der App einfügen**
   - Klick auf "Settings" (unten links)
   - Füge API Key ein
   - Speichern

4. **Fertig!** 🎉
   - Wähle Style (Aggro/Emotional/Storytelling)
   - Stelle Knobs ein (vertikal ziehen!)
   - Frage AI Mentor bei Bedarf

---

## Pro Version (Mit Audio-Analyse)

### Voraussetzungen
- Node.js installiert ([Download](https://nodejs.org))
- Terminal/CMD geöffnet

### Setup (5 Minuten)

```bash
# 1. In Projekt-Ordner wechseln
cd Music-MIX-Agent

# 2. Dependencies installieren
npm install

# 3. Server starten
npm start

# 4. Browser öffnen
# Gehe zu: http://localhost:3001/index-pro.html
```

### Audio analysieren

1. **Style wählen** (Aggro/Emotional/Storytelling)
2. **"AUDIO LAB" klicken**
3. **Audio-File hochladen**
   - Drag & Drop ODER
   - Klick in Drop-Zone
4. **Warten** (2-5 Sekunden)
5. **Ergebnisse ansehen**
   - BPM, LUFS, Peak
   - Spektrum-Analyzer
   - Quality Score
   - Recommendations

### Troubleshooting

**Port 3001 bereits belegt?**
```bash
# Anderen Port nutzen:
PORT=3002 npm start
# Dann: http://localhost:3002/index-pro.html
```

**"npm: command not found"?**
- Node.js nicht installiert
- Download: https://nodejs.org
- Nach Installation Terminal neu öffnen

**Backend läuft nicht?**
```bash
# Health Check:
curl http://localhost:3001/api/health

# Sollte zeigen:
# {"status":"OK","message":"AI Mixing Assistant Backend Online"}
```

---

## Nächste Schritte

### 📚 Mehr lernen
- Lies die [vollständige README](README.md)
- Check die [Features](#features)
- Siehe [Bekannte Limitationen](README.md#bekannte-limitationen)

### 🎛️ Mixing lernen
1. Starte mit "Quick Preset" für deinen Style
2. Nutze "AI-OPTIMIZE" bei jedem Plugin
3. Feintuning mit Drag-Knobs
4. Exportiere deine Settings

### 💬 AI Mentor nutzen
**Gute Fragen:**
- "Warum klingt meine Vocal dumpf?"
- "Wie viel Compression ist zu viel?"
- "Beste Delay-Settings für Aggro-Rap?"
- "EQ-Tipps gegen Matschigkeit?"

### 🎯 Pro-Tipps

**Mixing-Workflow:**
1. Audio hochladen → BPM/LUFS checken
2. Style wählen (oder AI-Empfehlung folgen)
3. Quick Preset anwenden
4. EQ → Compression → Saturation
5. FX Chain hinzufügen
6. Settings exportieren

**Keyboard Shortcuts:**
- `Esc` → Chat schließen
- `Space` → Audio Play/Pause (im Audio Lab)

---

## Support

**Probleme?**
- Check [Troubleshooting](README.md#troubleshooting)
- Öffne ein [Issue](https://github.com/offiziel/Music-MIX-Agent/issues)

**Feature-Wünsche?**
- Erstelle eine [Discussion](https://github.com/offiziel/Music-MIX-Agent/discussions)

**Happy Mixing!** 🎧🔥
