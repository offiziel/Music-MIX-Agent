# Advanced Settings für Google AI Studio

**Konfiguriere diese Einstellungen in AI Studio (⚙️ Symbol):**

---

## 🤖 MODEL SELECTION

### Empfohlen für beste Qualität:
```
Model: gemini-2.0-flash-thinking-exp-1219
```
- Beste Reasoning-Fähigkeiten
- Thinking-Mode verfügbar
- Optimal für komplexe VST-Parameter-Berechnungen

### Alternative (Schneller):
```
Model: gemini-1.5-flash-002
```
- Schnellere Antworten (< 2 Sekunden)
- Gut für Tests
- Günstiger im Paid-Tier

### Alternative (Stabil):
```
Model: gemini-1.5-pro
```
- Bewährte Qualität
- Größerer Context (2M Tokens)
- Standard-Wahl für Production

---

## 🧠 THINKING LEVEL

```
Thinking Level: High
```

**Warum High?**
- Mix Mentor AI braucht präzise dB/Hz/ms-Werte
- Komplexe Berechnungen für Kompressor-Ratios
- Style-spezifische Entscheidungen (Aggro vs. Emotional)

**Alternativen:**
- `Medium`: Gute Balance, schneller (für Tests)
- `Low`: Nur für einfache Anfragen (nicht empfohlen)

---

## 🎚️ GENERATION SETTINGS

### Temperature
```
Temperature: 0.1
```
**Niedrig = Präzise!**
- Bei 0.1: Konsistente, exakte Werte
- Bei 0.7: Kreativer, aber weniger präzise
- **Für Mix Mentor AI**: Immer < 0.3 nutzen!

### Max Output Tokens
```
Max Output Tokens: 4096
```
**Grund:**
- Cubase Insert Chains sind lang (8 Slots)
- Pro-Tipps + Erklärungen brauchen Platz
- Minimum: 2048, Empfohlen: 4096

### Top-K
```
Top-K: 40
```
**Standard-Wert**, passt für Mix Mentor AI

### Top-P
```
Top-P: 0.95
```
**Standard-Wert**, passt für Mix Mentor AI

---

## 🛡️ SAFETY SETTINGS

```
Hate Speech: Block none
Harassment: Block none
Sexually Explicit: Block none
Dangerous Content: Block none
```

**Warum "Block none"?**
- Technische Begriffe wie "Compression", "Attack", "Punch"
- Song-Titel könnten gefiltert werden
- Künstlernamen (z.B. "Bushido", "Aggro Berlin")

**Wichtig:** Mix Mentor AI generiert nur Audio-Mixing-Parameter, keine problematischen Inhalte!

---

## 📸 MEDIA RESOLUTION

```
Media Resolution: High
```

**Optional** (falls du später Screenshots oder Audio-Spectrograms hochladen willst)

**Alternativen:**
- `Low`: Für reine Text-Eingaben ausreichend
- `Medium`: Standard-Wahl
- `High`: Beste Qualität für Bilder/Audio

---

## 🔧 ADVANCED OPTIONS (Optional)

### Response MIME Type
```
MIME Type: text/plain
```
**Standard**, da wir Markdown-formatierte Texte erwarten

### Stop Sequences (Optional)
```
Stop Sequences: (leer lassen)
```
Nicht nötig für Mix Mentor AI

### Response Schema (Optional)
```
Schema: (nicht aktivieren)
```
Wir nutzen freien Text, kein JSON-Schema nötig

---

## 🛠️ TOOLS & CONTAINER

### Code Execution
```
Code Execution: ✅ ON
```
**Aktivieren für:**
- Audio-Berechnungen (BPM, LUFS, Peak)
- Web Audio API Code-Generation
- Mathematische Formeln für Kompression

### Function Calling
```
Function Calling: ✅ ON
```
**Aktivieren für:**
- Strukturierte Responses
- UI-Interaktionen
- API-Calls

### Grounding with Google Search
```
Grounding: ❌ OFF
```
**Nicht nötig**, da:
- Mix Mentor AI nutzt inlined Knowledge (System Instructions)
- Keine Web-Suche erforderlich
- Spart Kosten im Paid-Tier

---

## 📊 ZUSAMMENFASSUNG

**Copy & Paste diese Einstellungen:**

```yaml
# AI Studio Advanced Settings für Mix Mentor AI v3.0

model: gemini-2.0-flash-thinking-exp-1219
thinking_level: high

generation:
  temperature: 0.1
  max_output_tokens: 4096
  top_k: 40
  top_p: 0.95

safety:
  hate_speech: BLOCK_NONE
  harassment: BLOCK_NONE
  sexually_explicit: BLOCK_NONE
  dangerous_content: BLOCK_NONE

media:
  resolution: high

tools:
  code_execution: true
  function_calling: true
  grounding: false
```

---

## 💡 PRO-TIPPS

### 1. Model wechseln für Tests
Während der Entwicklung: `gemini-1.5-flash-002` (schneller)
Für Production: `gemini-2.0-flash-thinking-exp-1219` (beste Qualität)

### 2. Temperature anpassen
- Für exakte Plugin-Parameter: `0.1`
- Für kreative Pro-Tipps: `0.3`
- **NIE über 0.5** gehen bei Mix Mentor AI!

### 3. Thinking Level testen
Vergleiche Responses mit `medium` vs. `high`:
- `high` gibt ausführlichere Erklärungen
- `medium` ist schneller, aber weniger detailliert

### 4. Output Tokens überwachen
Falls Responses abgeschnitten werden:
- Erhöhe auf `8192` Tokens
- Oder bitte AI, kompakter zu antworten

---

## ✅ Checkliste

Bevor du die App generierst:

- [ ] Model: `gemini-2.0-flash-thinking-exp-1219` ✓
- [ ] Thinking Level: `High` ✓
- [ ] Temperature: `0.1` ✓
- [ ] Max Tokens: `4096` ✓
- [ ] Safety: Alle auf `Block none` ✓
- [ ] Code Execution: `ON` ✓
- [ ] Function Calling: `ON` ✓
- [ ] Grounding: `OFF` ✓

**→ Jetzt bist du ready für "Build Mode"!**
