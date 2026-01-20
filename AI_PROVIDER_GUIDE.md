# 🤖 AI Provider Guide - Claude vs. Gemini

Mix Mentor AI unterstützt **zwei AI-Engines** für die Mixing-Instruktionen:

## 📊 Vergleich

| Feature | Claude Sonnet 4.5 | Gemini 1.5 Pro |
|---------|-------------------|----------------|
| **Kosten** | $0.05/Analyse (~100 Analysen für 5€) | **KOSTENLOS** bis 1.500 Requests/Tag |
| **Qualität** | ⭐⭐⭐⭐⭐ Exzellent | ⭐⭐⭐⭐ Sehr gut |
| **Technische Details** | Sehr präzise, menschlich | Gut, etwas robotischer |
| **Context Window** | 200K Tokens | 2M Tokens (10x größer!) |
| **Geschwindigkeit** | Schnell (~3-5s) | Schnell (~2-4s) |
| **Best for** | Production, maximale Qualität | Development, Testing, Budget |

---

## 💰 Kosten-Analyse

### Claude Sonnet 4.5
- **Input**: $3.00 / 1M Tokens
- **Output**: $15.00 / 1M Tokens
- **Pro Analyse**: ~$0.05 (6.000 Tokens)
- **Mit 5 Euro**: ~100 Analysen

### Gemini 1.5 Pro
- **FREE TIER**: 1.500 Requests/Tag (0 Kosten!)
- **Pro Analyse**: $0 im Free Tier
- **Mit 0 Euro**: Unbegrenzt (bis Limit)

---

## 🚀 Setup: Claude verwenden

### 1. API Key holen
Gehe zu: https://console.anthropic.com

- Registriere dich / Log in
- Gehe zu **API Keys**
- Erstelle neuen Key
- Kopiere den Key (beginnt mit `sk-ant-api03-...`)

### 2. Konfigurieren
Bearbeite `backend/.env`:
```env
AI_PROVIDER=claude
ANTHROPIC_API_KEY=sk-ant-api03-DEIN_KEY_HIER
```

### 3. Dependencies installieren
```bash
cd backend
npm install @anthropic-ai/sdk
```

### 4. Server neu starten
```bash
npm run dev
```

✅ Fertig! Claude wird nun verwendet.

---

## 🆓 Setup: Gemini verwenden (KOSTENLOS!)

### 1. API Key holen
Gehe zu: https://aistudio.google.com/apikey

- Log in mit Google Account
- Klicke **"Create API Key"**
- Wähle **"Create API key in new project"**
- Kopiere den Key (beginnt mit `AIzaSy...`)

### 2. Konfigurieren
Bearbeite `backend/.env`:
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=AIzaSy-DEIN_KEY_HIER
```

### 3. Dependencies installieren
```bash
cd backend
npm install @google/generative-ai
```

### 4. Hybrid Service aktivieren
Bearbeite `backend/controllers/audioController.js`:

Ändere Zeile 2:
```javascript
// Alt:
import aiService from '../services/aiService.js';

// Neu:
import aiService from '../services/aiServiceHybrid.js';
```

### 5. Server neu starten
```bash
npm run dev
```

✅ Fertig! Gemini wird nun verwendet (KOSTENLOS!).

---

## 🎯 Empfehlungen

### Nutze Claude wenn:
✅ Du maximale Qualität willst
✅ Technische Präzision wichtig ist
✅ Du Budget für 5-10 Euro hast
✅ Production-Ready App

### Nutze Gemini wenn:
✅ Du testen/entwickeln willst (KOSTENLOS!)
✅ Budget begrenzt ist (0 Euro!)
✅ 1.500 Analysen/Tag ausreichen
✅ Gute Qualität ok ist (90% von Claude)

---

## 🔄 Zwischen APIs wechseln

Du kannst jederzeit wechseln:

1. **Backend stoppen** (Ctrl+C)
2. **`.env` bearbeiten**:
   ```env
   AI_PROVIDER=gemini  # oder claude
   ```
3. **Hybrid Service aktivieren** (siehe oben)
4. **Server neu starten**: `npm run dev`

---

## 📈 Free Tier Limits

### Gemini Free Tier:
- **1.500 Requests pro Tag**
- **1 Million Tokens pro Tag Input**
- **Keine Kosten**
- Perfekt für: 50-150 Audio-Analysen/Tag

### Claude:
- **Pay-as-you-go** (keine festen Limits)
- Mindestaufladung: $5
- Gut für: Production mit voller Kontrolle

---

## 🧪 Qualitätstest

Beide AIs nutzen den **gleichen System Prompt** (25+ Jahre Deutschrap-Expertenwissen).

**Unterschiede:**
- **Claude**: Flüssigere, menschlichere Formulierungen
- **Gemini**: Etwas technischer, aber genauso präzise

**Empfehlung:** Teste beide mit dem gleichen Audio-File und vergleiche!

---

## 🎓 Beispiel: Hybrid Setup

**Entwicklung:** Gemini (kostenlos)
**Production:** Claude (beste Qualität)

Wechsle einfach `AI_PROVIDER` in `.env` je nach Environment!

---

## 💡 Tipps

1. **Gemini zuerst testen** (0 Kosten!)
2. **Bei Zufriedenheit bleiben**
3. **Für Production: Claude upgraden**
4. **Beide Keys konfigurieren** (Fallback-Option)

---

## 🐛 Troubleshooting

### "AI Provider not configured"
- Prüfe `.env`: `AI_PROVIDER=gemini` oder `claude`
- Prüfe API Key ist eingetragen
- Server neu starten

### "Invalid API Key"
- Claude: Key beginnt mit `sk-ant-api03-`
- Gemini: Key beginnt mit `AIzaSy`
- Neu erstellen auf jeweiliger Platform

### "Quota exceeded" (Gemini)
- Du hast 1.500 Requests/Tag überschritten
- Warte bis nächster Tag (UTC Reset)
- ODER wechsle zu Claude

---

## 📞 Support

- **Claude Docs**: https://docs.anthropic.com
- **Gemini Docs**: https://ai.google.dev/docs
- **GitHub Issues**: https://github.com/yourusername/mix-mentor-ai/issues

---

**Viel Erfolg mit Mix Mentor AI! 🎵**

_Beide AIs liefern production-ready Mixing-Instruktionen für Deutschrap._
