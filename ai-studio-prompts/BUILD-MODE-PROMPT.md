# Build Mode Prompt für Google AI Studio

**Copy & Paste diesen Text in den "Build Mode" in AI Studio:**

---

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

# DESIGN-REFERENZ

Das Interface soll aussehen wie ein professionelles DAW (Digital Audio Workstation):
- **Header**: Logo links, Status rechts, Border-Bottom
- **Sidebar**: Dunkler Background (#080B12), Panels mit Glow-Effect bei Hover
- **Main**: Großer Spectrum Analyzer oben, Results Cards darunter
- **Footer**: Compact, nur wichtige Infos

Nutze diese CSS-Klassen:
```css
.daw-panel {
  background: #0B0F1A;
  border: 1px solid #1F2937;
  border-radius: 12px;
}

.active-tab {
  color: #22D3EE;
  border-bottom: 2px solid #22D3EE;
  background: rgba(34, 211, 238, 0.05);
}

canvas {
  background: #000;
  border-radius: 8px;
  border: 1px solid #1F2937;
}
```

# WICHTIG
- Alle Texte auf DEUTSCH
- BPM-Range für Deutschrap: 80-100 BPM
- LUFS-Target: -10.0 LUFS
- Unterstützte Formate: WAV, MP3, FLAC, AIF
- API Key wird im LocalStorage gespeichert (optional für Komfort)
