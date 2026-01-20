# 🎛️ MIX MENTOR AI - Google AI Studio Setup Guide

**Vollständiger Leitfaden zum Erstellen von Mix Mentor AI in Google AI Studio Build Mode**

---

## 📋 Übersicht

Dieser Guide zeigt dir **Schritt für Schritt**, wie du Mix Mentor AI direkt in Google AI Studio erstellst - **ohne lokale Installation**, komplett im Browser!

### Was du bekommst:
- ✅ Professionelle DAW-Style Web-App für Deutschrap-Produktion
- ✅ Audio-Upload + Web Audio API Spektrum-Analyzer
- ✅ Gemini AI Integration für VST-Parameter-Generierung
- ✅ 4 Deutschrap-Styles (Aggro Berlin, Emotional/PI, Afro/Modern, Oldschool)
- ✅ Cubase 15 Mix-Chain mit exakten Plugin-Parametern
- ✅ **KOSTENLOS**: 1.500 Requests/Tag im Gemini Free Tier

---

## 🚀 Schritt 1: Google AI Studio öffnen

1. Gehe zu: **https://aistudio.google.com**
2. Melde dich mit deinem Google-Account an
3. Klicke auf **"New Prompt"** oder **"Build mode"**

---

## ⚙️ Schritt 2: System Instructions konfigurieren

Klicke auf **"System instructions"** und füge folgenden Text ein:

```
Du bist MIX MENTOR AI - ein Elite-Mixing-Engineer mit 25+ Jahren Erfahrung in deutscher Rap-Produktion.

# EXPERTISE

Du kennst EXAKT die Workflows von:
- **DAWs**: Cubase 14/15, Logic Pro X, Ableton Live 12
- **Mixing Plugins**: iZotope Suite (Nectar 4, Ozone 11/12, Neutron 4, RX 11), FabFilter Pro-Q 3/Pro-C 2/Pro-L 2, Waves Gold/Diamond Bundle
- **Mastering**: SSL G-Master Buss Compressor, Brainworx bx_masterdesk, HOFA IQ-Series
- **German Rap Standards**: -10 LUFS für Streaming (Spotify/Apple Music/YouTube)

# DEUTSCHRAP EVOLUTION (2000-2025)

## 1. AGGRO BERLIN ERA (2000-2010)
**Artists**: Bushido, Sido, Fler, Bass Sultan Hengzt, B-Tight
**Sonic Characteristics**:
- Vocals: Hart, trocken, präsent in den Mitten (2-4 kHz Boost +3-5dB)
- Kompression: BRUTAL (Ratio 6:1-10:1, Attack 1-3ms, Release 50-100ms)
- Reverb: MINIMAL (Small Room 0.4-0.8s, Pre-Delay 15-30ms)
- Low-End: Sidechain mit 808 Bass (80-120 Hz)
- Effekte: Slap Delay (120-180ms), Tape Saturation (Waves J37)

**Cubase Insert Chain**:
1. iZotope RX 11 Voice De-noise (-18dB Reduction)
2. FabFilter Pro-Q 3: HPF 80Hz 24dB/oct, Boost 2.5kHz +4dB Q:2.0, Cut 8kHz -2dB Q:1.5
3. Waves CLA-76 Bluey: ALL BUTTONS IN, Attack Fast, Release Fast
4. iZotope Nectar 4: Saturation "Analog" 20%, De-Esser 6.5kHz -8dB
5. FabFilter Pro-C 2: Ratio 4:1, Threshold -12dB, Knee 0dB, Attack 3ms, Release 80ms
6. Waves Doubler: Width 35%, Delay 18ms, Separation 70Hz-8kHz
7. Cubase Stereo Delay: L=1/8, R=1/4, Mix 15%, Feedback 25%, HPF 400Hz
8. FabFilter Pro-L 2: True Peak Limiter, Ceiling -0.3dB, Lookahead 10ms

## 2. EMOTIONAL/PRINZ PI (2010-2020)
**Artists**: Prinz Pi, Casper, Marteria, Kool Savas (Märchenprinz-Era)
**Sonic Characteristics**:
- Vocals: Melodisch, luftig, breite Stereo-Präsenz
- Kompression: Sanft (Ratio 2:1-3:1, Attack 10-20ms, Release 200-400ms)
- Reverb: LANG (Hall 1.8-2.8s, Pre-Delay 80-120ms, Tail Modulation)
- Höhen: Seidige Air 10-12kHz (+2-4dB Shelf)
- Auto-Tune: Subtil (Retune Speed 50-100ms, Natural Vibrato)

**Cubase Insert Chain**:
1. Celemony Melodyne 5 (Pitch Correction, Drift Compensation)
2. FabFilter Pro-Q 3: HPF 60Hz 18dB/oct, Boost 250Hz +2dB Q:0.8, Boost 10kHz +3dB Shelf
3. iZotope Nectar 4: Compressor "Vintage", Ratio 2.5:1, Attack 15ms, Release 300ms
4. Waves H-Delay: Time 320ms, Feedback 35%, Mix 22%, HPF 800Hz, LPF 6kHz
5. Valhalla VintageVerb: Hall, Decay 2.2s, Pre-Delay 100ms, Mix 28%, Damping 6kHz
6. FabFilter Pro-C 2: Ratio 2:1, Threshold -18dB, Knee 6dB, Attack 12ms, Release 250ms
7. iZotope Ozone 12 Imager: Stereoize 120Hz-10kHz, Width +25%
8. FabFilter Pro-L 2: Transparent, Ceiling -0.5dB, Lookahead 5ms

## 3. AFRO/MODERN TRAP (2015-2025)
**Artists**: RAF Camora, Bonez MC, Capital Bra, Ufo361, 01099, Luciano
**Sonic Characteristics**:
- Vocals: Auto-Tune STARK (10-20ms Retune), Hi-Hats prominent
- Kompression: Parallel (NY-Style, Dry 70% + Wet 30%)
- Reverb: Plate mit Early Reflections (0.8-1.4s)
- Stereo-Width: BREIT (+20-35% oberhalb 2kHz)
- Sub-Bass: 808 Tuning auf Song-Key, Sidechain mit Kick

**Cubase Insert Chain**:
1. Antares Auto-Tune Pro: Retune Speed 15ms, Humanize 10, Flex-Tune 5, Natural Vibrato ON
2. FabFilter Pro-Q 3: HPF 100Hz 24dB/oct, Cut 400Hz -3dB Q:2.5, Boost 5kHz +4dB Q:1.8
3. Waves SSL G-Channel: EQ +3dB @ 3kHz, Comp Ratio 4:1, Fast Attack
4. Soundtoys Decapitator: Mode "A", Drive 4.2, Mix 25%, Tone 7500Hz
5. iZotope Nectar 4: Harmony "Octave Up/Down", Mix 18%, Pitch Correction ON
6. FabFilter Pro-C 2: Ratio 3:1, Threshold -15dB, Knee 3dB, Attack 5ms, Release 120ms
7. Waves Vitamin: Lo-Mid Punch +2dB, Hi Presence +3dB, Stereo Enhance 45%
8. FabFilter Pro-L 2: Modern, Ceiling -0.1dB, Lookahead 8ms

## 4. OLDSCHOOL BOOM BAP (2000-2015)
**Artists**: Kollegah, Farid Bang, Haftbefehl, KC Rebell, Summer Cem
**Sonic Characteristics**:
- Vocals: Warme Low-Mids (250-400Hz), Tape Saturation
- Kompression: 1176-Style (Attack 3-5ms, Release 50-80ms)
- Reverb: Small Room/Chamber (0.6-1.2s)
- Höhen: Gedämpft (5kHz Low-Pass bei -2dB/oct)
- Effekte: Pultec EQ Trick (Boost+Cut @ 100Hz für Punch)

**Cubase Insert Chain**:
1. Waves Abbey Road RS56 Passive EQ: +4dB @ 250Hz (Low), -2dB @ 10kHz (High)
2. Universal Audio 1176LN Limiting Amplifier: ALL BUTTONS, Attack 3, Release 5
3. iZotope Nectar 4: Saturation "Tube" 35%, Warmth Mode ON
4. FabFilter Pro-Q 3: Pultec Trick: Boost 100Hz +3dB Q:0.7, Cut 100Hz -2dB Q:2.0
5. Waves CLA Vocals: Compress "Heavy", Bass +2, Treble -1, Reverb 25%, Delay 18%
6. Cubase RoomWorks SE: Small Room, Size 15m², Decay 0.9s, Mix 18%
7. Waves J37 Tape: Speed 15 IPS, Saturation 50%, Wow/Flutter 25%, Mix 40%
8. FabFilter Pro-L 2: Vintage, Ceiling -0.3dB, Lookahead 6ms

# MIXING-PROZESS

## 1. VOCAL ROUTING (Cubase 15)
```
Audio Track → Insert FX (1-8) → Send 1 (Reverb Bus) → Send 2 (Delay Bus) → Vocal Bus → Mix Bus → Stereo Out
```

## 2. TARGET WERTE
- **LUFS**: -10.0 LUFS (Streaming Standard)
- **True Peak**: -0.1 dB (für Codec Headroom)
- **Dynamic Range**: 6-8 DR (Deutschrap Kompromiss zwischen Punch und Dynamik)
- **Stereo Width**: 40-60% (Mono bis 250Hz, Stereo ab 500Hz)

## 3. FREQUENZ-GUIDELINES
- **Sub (20-60 Hz)**: Entfernen (HPF 80Hz 24dB/oct)
- **Bass (60-250 Hz)**: Sidechain mit 808, -3dB bei 120Hz wenn muddy
- **Low-Mids (250-500 Hz)**: Boxiness reduzieren (-2 bis -4dB)
- **Mids (500-2000 Hz)**: Präsenz für Sprachverständlichkeit
- **Upper-Mids (2-5 kHz)**: +3 bis +5dB für Aggro-Style, +2dB für Emotional
- **Highs (5-10 kHz)**: +2 bis +4dB Shelf für Air, De-Esser bei 6.5kHz
- **Air (10-20 kHz)**: +2 bis +3dB Shelf (nur bei hochwertigen Recordings)

# ANTWORT-FORMAT

Wenn du Audio-Analyse-Daten erhältst, antworte IMMER in diesem Format:

```
# 🎛️ MIX MENTOR AI - Analyse

## 📊 AUDIO ANALYSE
- **BPM**: [Wert]
- **LUFS**: [Wert] dB
- **True Peak**: [Wert] dB
- **Duration**: [Wert]s
- **Style**: [AGGRO BERLIN / EMOTIONAL/PI / AFRO/MODERN / OLDSCHOOL]

## 🔍 ANALYSE SUMMARY
- **Genre Match**: [Wie gut passt die Aufnahme zum gewählten Style?]
- **Probleme**: [Z.B. zu leise, Clipping, muddy Low-Mids, harsche Höhen]
- **Stärken**: [Z.B. klare Stimme, gute Dynamik, saubere Aufnahme]

## 🔌 CUBASE 15 INSERT CHAIN (Main Vocals)

**Slot 1: [Plugin-Name]**
- [Parameter 1]: [Exakter Wert mit Einheit]
- [Parameter 2]: [Exakter Wert mit Einheit]
...

**Slot 2: [Plugin-Name]**
...

[Fortsetzung bis Slot 8]

## 🎚️ SEND EFFECTS

**Send 1 - Reverb Bus:**
- Plugin: [Name]
- [Parameter mit Werten]

**Send 2 - Delay Bus:**
- Plugin: [Name]
- [Parameter mit Werten]

## 🎹 MASTERING CHAIN (Mix Bus)

**Insert 1: [Plugin]**
...

**Final Limiter:**
- Target: -10.0 LUFS, -0.1dB True Peak
- [Parameter]

## 💡 PRO-TIPPS
- [3-5 konkrete Tipps für diesen Style]
```

# WICHTIG

- Antworte IMMER auf Deutsch
- Nutze EXAKTE Werte (dB, Hz, ms, Ratio, %)
- Nenne konkrete Plugin-Namen (iZotope, FabFilter, Waves, etc.)
- Erkläre das "Warum" hinter jedem Setting
- Berücksichtige den gewählten Deutschrap-Style (Aggro/Emotional/Afro/Oldschool)
```

---

## 🎯 Schritt 3: Advanced Settings konfigurieren

Klicke auf **"Advanced Settings"** (⚙️ Symbol) und stelle ein:

### Model Selection
- **Empfohlen für Qualität**: `gemini-2.0-flash-thinking-exp-1219`
- **Alternative (schneller)**: `gemini-1.5-flash-002`
- **Alternative (günstig)**: `gemini-1.5-pro`

### Thinking Level
- **Wähle**: `High` oder `Medium`
- *(Wichtig für komplexe VST-Parameter-Berechnungen)*

### Generation Settings
```
Temperature: 0.1
  (Niedrig für präzise dB/Hz-Werte)

Max Output Tokens: 4096
  (Für ausführliche Mix-Chains)

Top-K: 40
Top-P: 0.95
```

### Safety Settings
```
Alle auf: "Block none"
  (Damit technische Begriffe nicht gefiltert werden)
```

### Media Resolution
- **Wähle**: `High`
  *(Falls du später Audio/Screenshots hochladen willst)*

---

## 🏗️ Schritt 4: Build Mode aktivieren

1. Klicke oben rechts auf **"Build"** oder **"Create app"**
2. Wähle: **"Web app"** oder **"React app"**
3. Gib folgenden Build-Prompt ein:

---

### 📝 BUILD MODE PROMPT (Copy & Paste)

```
Erstelle eine professionelle DAW-Style Web-App "MIX MENTOR AI v3.0" für deutsche Rap-Produktion.

# ANFORDERUNGEN

## 1. DESIGN & UI
- **Dark Mode Interface**: Background #020408, Panels #0B0F1A
- **Tailwind CSS**: Nutze CDN (https://cdn.tailwindcss.com)
- **Fonts**: JetBrains Mono (Metriken), Inter (UI)
- **Farbschema**:
  - Cyan (#22D3EE) für aktive Elemente
  - Emerald (#10B981) für Success/Analyze
  - Slate (#64748B) für Text/Borders
  - Purple (#A855F7) für Akzente

## 2. LAYOUT (3-Spalten-Grid)

### LEFT SIDEBAR (320px)
- **Gemini API Key Input**: Password-Field mit Link zu https://aistudio.google.com/apikey
- **Style Selection**: 4 Buttons (Radio-Style)
  1. AGGRO BERLIN (Bushido, Sido - Hart & Trocken)
  2. EMOTIONAL/PI (Prinz Pi - Melodisch & Luftig)
  3. AFRO/MODERN (RAF Camora - Trap Style)
  4. OLDSCHOOL (Kollegah - Boom Bap)
- **Audio Upload**: File-Input (accept: audio/*)
- **Metrics Display**: BPM, LUFS, Peak (Live nach Upload)
- **Analyze Button**: Trigger für Gemini API Call

### CENTER (Main Content)
- **Spectrum Analyzer**: Canvas 1200x200px, Cyan Waveform
- **AI Results Section** (nach Analyse):
  - Summary Card (Cyan Border)
  - Cubase Insert Chain (Emerald Border)
  - Send Effects (Purple Border)
  - Raw Response (Collapsible Details)

### RIGHT SIDEBAR (optional, später)
- Radar Chart für Parameter (Air, Crunch, Squeeze, Space, Width, Tuning)

## 3. FUNKTIONALITÄT

### Audio Processing (Web Audio API)
```javascript
// File Upload
const audioFile = e.target.files[0];
const audioContext = new AudioContext();
const arrayBuffer = await audioFile.arrayBuffer();
const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

// BPM Detection (Simplified für Deutschrap)
const bpm = estimateBPM(audioBuffer); // Range 80-100 BPM

// LUFS Approximation
const channelData = audioBuffer.getChannelData(0);
let sumSquared = 0;
for (let i = 0; i < channelData.length; i++) {
  sumSquared += channelData[i] * channelData[i];
}
const rms = Math.sqrt(sumSquared / channelData.length);
const lufs = 20 * Math.log10(rms) - 0.691; // ITU-R BS.1770-4 Approximation

// Peak Detection
let maxPeak = 0;
for (let i = 0; i < channelData.length; i++) {
  const abs = Math.abs(channelData[i]);
  if (abs > maxPeak) maxPeak = abs;
}
const peak = 20 * Math.log10(maxPeak);

// Spectrum Visualization
const canvas = document.getElementById('spectrum');
const ctx = canvas.getContext('2d');
// Draw waveform with cyan color (#22D3EE)
```

### Gemini API Integration
```javascript
const analyzeWithGemini = async (apiKey, audioAnalysis, style) => {
  const prompt = `
# AUDIO ANALYSE:
- BPM: ${audioAnalysis.bpm}
- LUFS: ${audioAnalysis.lufs} dB
- Peak: ${audioAnalysis.peak} dB
- Duration: ${audioAnalysis.duration}s
- Style: ${style.toUpperCase()}

Erstelle eine komplette Mixing-Chain für Cubase 15 mit exakten Plugin-Parametern!
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 4096,
          temperature: 0.1
        }
      })
    }
  );

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};
```

## 4. USER FLOW
1. User fügt Gemini API Key ein
2. User wählt Deutschrap-Style (z.B. "AGGRO BERLIN")
3. User lädt Audio-Datei hoch (WAV/MP3)
4. App analysiert Audio → Zeigt BPM, LUFS, Peak im Sidebar
5. User klickt "MIT GEMINI ANALYSIEREN"
6. Loading-State: "Gemini analysiert dein Audio..."
7. Results werden in Sections angezeigt:
   - 🔍 Analyse Summary
   - 🔌 Cubase Insert Chain (Slot 1-8)
   - 🎚️ Send Effects
   - 📋 Raw Response (Collapsible)

## 5. ERROR HANDLING
- API Key fehlt → Alert: "Bitte gib deinen Gemini API Key ein!"
- Kein Audio geladen → Alert: "Bitte lade zuerst ein Audio hoch!"
- Gemini API Error → Alert: "Fehler: [error.message]"

## 6. EXTRAS
- Footer: "MIX MENTOR AI v3.0 | Powered by Gemini | KOSTENLOS - 1.500 Requests/Tag"
- Status-Indicator: Zeigt aktuellen State (Ready/Analyzing/Complete)
- Responsive: Mobile-optimiert (Sidebar wird zu Accordion)

# TECHNISCHE DETAILS
- Nutze Vanilla JavaScript (kein Framework-Import nötig)
- Single-Page-App (alle Features in einer HTML-Datei)
- CDN-Imports: Tailwind CSS (https://cdn.tailwindcss.com)
- Kein Backend nötig (Direct API Calls from Browser)
```

---

## 🛠️ Schritt 5: Tools & Container aktivieren

### Code Execution
- **Aktiviere**: `ON`
- *(Für Audio-Berechnungen und Web Audio API Code)*

### Function Calling
- **Aktiviere**: `ON`
- *(Für strukturierte Responses)*

### Grounding with Google Search
- **Optional**: `OFF`
- *(Nicht nötig, da wir spezifisches Mixing-Wissen haben)*

---

## ▶️ Schritt 6: App generieren & testen

1. Klicke auf **"Generate"** oder **"Build app"**
2. Warte 30-60 Sekunden (Gemini generiert React/HTML Code)
3. **Preview** öffnet sich automatisch
4. Teste die App:
   - API Key eingeben: `AIzaSyDfvvjQtJddjvLWzFjdUxNrx-FqhngKI8E`
   - Style wählen: "AGGRO BERLIN"
   - Audio hochladen (z.B. Test-WAV)
   - "MIT GEMINI ANALYSIEREN" klicken
   - Ergebnis prüfen!

---

## 📤 Schritt 7: Export & Deployment

### Option A: AI Studio hosten (Einfachste Methode)
1. Klicke auf **"Publish"** oder **"Deploy"**
2. Wähle: **"Public link"**
3. Du erhältst eine URL: `https://aistudio.google.com/app/xxxx`
4. **Fertig!** Teile den Link oder nutze ihn selbst

### Option B: HTML exportieren
1. Klicke auf **"Export code"** oder **"< > View code"**
2. Kopiere den HTML-Code
3. Speichere als `mix-mentor-ai.html`
4. Öffne lokal im Browser (funktioniert offline!)

### Option C: GitHub Pages
1. Exportiere Code → Speichere als `index.html`
2. Erstelle GitHub Repo
3. Push zu `main` Branch
4. Settings → Pages → Deploy from `main`
5. URL: `https://username.github.io/repo-name`

---

## 🎓 Pro-Tipps für AI Studio

### Thinking Level richtig nutzen
- **Low**: Schnelle, einfache Antworten (nicht für Mix-Chains!)
- **Medium**: Gute Balance (empfohlen für Tests)
- **High**: Beste Qualität für komplexe VST-Parameter

### Prompt Iteration
Wenn die erste Version nicht perfekt ist:
1. Klicke auf **"Edit prompt"**
2. Füge Feedback hinzu: "Mache das Spectrum größer" oder "Nutze andere Farben"
3. Regeneriere die App

### System Instructions optimieren
Du kannst die System Instructions anpassen:
- Mehr Plugins hinzufügen (z.B. UAD, Plugin Alliance)
- Andere Genres (Trap, Drill, Afrobeats)
- Deutsch → Englisch für internationale Nutzer

---

## 🆘 Troubleshooting

### Problem: "Invalid API Key"
**Lösung**:
1. Gehe zu https://aistudio.google.com/apikey
2. Erstelle neuen Key (falls alter abgelaufen)
3. Kopiere Key direkt (ohne Leerzeichen!)

### Problem: Spectrum Analyzer zeigt nichts
**Lösung**:
- Browser-Console öffnen (F12)
- Prüfe auf CORS-Errors
- Stelle sicher, dass Canvas-Element existiert: `<canvas id="spectrum">`

### Problem: Audio wird nicht erkannt
**Lösung**:
- Unterstützte Formate: WAV, MP3, FLAC, AIF
- Maximale Größe: 100 MB
- Sample Rate: 44.1kHz oder 48kHz

### Problem: Gemini Quota exceeded
**Lösung**:
- Free Tier: 1.500 Requests/Tag
- Warte 24h oder upgrade zu Paid Plan
- Oder nutze Claude API (siehe Alternative unten)

---

## 🔄 Alternative: Claude API nutzen

Falls du lieber Claude API nutzen möchtest:

### API Endpoint ändern
```javascript
// Statt Gemini:
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
  { ... }
);

// Claude verwenden:
const response = await fetch(
  'https://api.anthropic.com/v1/messages',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      system: SYSTEM_PROMPT, // Aus oben
      messages: [{ role: 'user', content: prompt }]
    })
  }
);
```

---

## 📊 Kosten-Vergleich

| Provider | Model | Free Tier | Cost (Paid) |
|----------|-------|-----------|-------------|
| **Google Gemini** | 1.5 Pro | 1.500 req/day | $0.00035/1K tokens (input) |
| **Google Gemini** | 2.0 Flash | 10 req/min | $0.00015/1K tokens (input) |
| **Anthropic Claude** | Sonnet 4.5 | $5 Credit | $3.00/1M input tokens |

**Empfehlung**: Starte mit Gemini Free Tier → 1.500 Analysen/Tag sind mehr als genug!

---

## 📚 Weitere Ressourcen

### Google AI Studio Docs
- **Build Mode Tutorial**: https://ai.google.dev/gemini-api/docs/build-apps
- **API Reference**: https://ai.google.dev/api/rest/v1beta/models/generateContent
- **Pricing**: https://ai.google.dev/pricing

### Audio Production
- **iZotope Nectar 4 Docs**: https://www.izotope.com/en/products/nectar.html
- **FabFilter Tutorial**: https://www.fabfilter.com/learn
- **LUFS Measurement**: https://www.itu.int/rec/R-REC-BS.1770/en

### Deutschrap References
- **Aggro Berlin**: https://genius.com/artists/Bushido
- **Mastering Standard**: -10 LUFS (Spotify), -14 LUFS (Apple Music)

---

## ✅ Checkliste vor dem Start

- [ ] Google-Account erstellt
- [ ] Gemini API Key geholt: https://aistudio.google.com/apikey
- [ ] System Instructions kopiert (Schritt 2)
- [ ] Advanced Settings konfiguriert (Schritt 3)
- [ ] Build Mode Prompt kopiert (Schritt 4)
- [ ] Tools aktiviert: Code Execution ON (Schritt 5)
- [ ] Test-Audio-Datei bereit (WAV/MP3, ~3-5 MB)

---

## 🚀 ZUSAMMENFASSUNG

### Was du tust:
1. **AI Studio öffnen** → New Prompt
2. **System Instructions** einfügen (kompletter Expert-Prompt)
3. **Advanced Settings** konfigurieren (Temperature 0.1, Thinking High)
4. **Build Mode** aktivieren → Build Prompt einfügen
5. **Generate** → Warten → Preview testen
6. **Publish** → Public Link teilen oder HTML exportieren

### Was du bekommst:
Eine vollständige, produktionsreife Mix Mentor AI App mit:
- Audio-Upload + Web Audio API Analyse
- Gemini AI Integration (kostenlos!)
- 4 Deutschrap-Styles
- Cubase 15 Mix-Chains mit exakten VST-Parametern
- Kein Backend nötig, läuft komplett im Browser!

---

## 🎉 Du bist fertig!

Deine Mix Mentor AI läuft jetzt in Google AI Studio. Viel Spaß beim Mixen! 🎛️🎤🔥

---

**Erstellt für**: Mix Mentor AI v3.0
**Datum**: Januar 2025
**Author**: Mix Mentor AI Team
**License**: MIT
