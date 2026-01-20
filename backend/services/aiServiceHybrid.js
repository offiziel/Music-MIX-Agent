import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { SYSTEM_PROMPT } from '../config/anthropic.js';

dotenv.config();

// Bestimme welche AI verwendet werden soll
const AI_PROVIDER = process.env.AI_PROVIDER || 'claude'; // 'claude' oder 'gemini'

// Claude Setup
let anthropic = null;
if (AI_PROVIDER === 'claude' && process.env.ANTHROPIC_API_KEY) {
  anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
}

// Gemini Setup
let gemini = null;
if (AI_PROVIDER === 'gemini' && process.env.GEMINI_API_KEY) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  gemini = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
}

/**
 * Hybrid AI Service - Unterstützt Claude und Gemini
 */
class HybridAIService {

  /**
   * Generate mixing instructions mit gewählter AI
   */
  async generateMixingInstructions(analysisData, style, vocalType = 'main') {
    try {
      const prompt = this.buildPrompt(analysisData, style, vocalType);

      let response;

      // Wähle AI Provider
      if (AI_PROVIDER === 'claude' && anthropic) {
        console.log('[AI] Using Claude Sonnet 4.5');
        response = await this.generateWithClaude(prompt);
      } else if (AI_PROVIDER === 'gemini' && gemini) {
        console.log('[AI] Using Gemini 1.5 Pro');
        response = await this.generateWithGemini(prompt);
      } else {
        throw new Error(`AI Provider '${AI_PROVIDER}' nicht konfiguriert. Bitte API Key in .env eintragen.`);
      }

      // Parse response into structured format
      const result = this.parseAIResponse(response, analysisData);
      result.aiProvider = AI_PROVIDER; // Zeige welche AI verwendet wurde

      return result;

    } catch (error) {
      console.error('[AIService] Error:', error);

      // Fallback zu Quick Preset
      console.warn('[AI] Falling back to quick preset');
      return {
        ...this.generateQuickPreset(style, vocalType),
        summary: `AI Service nicht verfügbar. Fallback-Preset für ${style.toUpperCase()} style.`,
        warning: `Konfiguriere ${AI_PROVIDER.toUpperCase()}_API_KEY in .env für AI-generierte Presets.`
      };
    }
  }

  /**
   * Generate with Claude API
   */
  async generateWithClaude(prompt) {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    return message.content[0].text;
  }

  /**
   * Generate with Gemini API
   */
  async generateWithGemini(prompt) {
    const fullPrompt = `${SYSTEM_PROMPT}\n\n---\n\n${prompt}`;

    const result = await gemini.generateContent({
      contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
      generationConfig: {
        maxOutputTokens: 4000,
        temperature: 0.7,
      }
    });

    const response = await result.response;
    return response.text();
  }

  /**
   * Build detailed prompt for AI (same for both)
   */
  buildPrompt(analysis, style, vocalType) {
    const styleDescriptions = {
      aggro: 'AGGRO BERLIN STYLE (Bushido, Sido, Fler): Aggressiv, trocken, maximale Lautheit, betonte Mitten 2-4kHz',
      emotional: 'EMOTIONAL/PRINZ PI STYLE: Melodisch, luftig, langer Reverb, sanfte Kompression, natürliches Tuning',
      afro: 'AFRO/MODERN STYLE (RAF Camora, Bonez MC): Trap-inspiriert, Auto-Tune, Stereo-Width, moderne Höhen',
      oldschool: 'OLDSCHOOL/BOOM BAP STYLE: Warme Low-Mids, Tape-Saturation, analoger Sound, kräftiger Bass'
    };

    const vocalTypeDescriptions = {
      main: 'MAIN VOCALS (Lead-Gesang) - zentral im Mix, maximale Klarheit',
      backing: 'BACKING VOCALS - unterstützend, breiter Stereo, weniger Presence',
      adlibs: 'ADLIBS - kreativ prozessiert, Effekte, Stereo-Delays'
    };

    return `
# MIXING TASK: ${styleDescriptions[style]}
## VOCAL TYPE: ${vocalTypeDescriptions[vocalType]}

## AUDIO ANALYSE-DATEN:
- **BPM**: ${analysis.bpm}
- **LUFS**: ${analysis.lufs} dB (${analysis.loudnessAnalysis.status})
- **Peak Level**: ${analysis.peak} dB
- **True Peak**: ${analysis.truePeak} dB
- **Dynamic Range**: ${analysis.dynamicRange} dB
- **Clipping**: ${analysis.clipping ? 'JA - KRITISCH!' : 'Nein'}
- **Sample Rate**: ${analysis.sampleRate} Hz
- **Duration**: ${analysis.duration.toFixed(2)}s

## FREQUENZ-SPEKTRUM:
- Sub-Bass (20-60 Hz): ${analysis.spectrum.subBass.energy.toFixed(1)}%
- Bass (60-250 Hz): ${analysis.spectrum.bass.energy.toFixed(1)}%
- Low-Mid (250-500 Hz): ${analysis.spectrum.lowMid.energy.toFixed(1)}%
- Mid (500-2000 Hz): ${analysis.spectrum.mid.energy.toFixed(1)}%
- High-Mid (2-4 kHz): ${analysis.spectrum.highMid.energy.toFixed(1)}%
- Presence (4-8 kHz): ${analysis.spectrum.presence.energy.toFixed(1)}%
- Brilliance (8-20 kHz): ${analysis.spectrum.brilliance.energy.toFixed(1)}%

## ERKANNTE PROBLEME:
${analysis.frequencyBalance.map(issue => `- **${issue.issue}** (${issue.frequency}): ${issue.solution}`).join('\n')}

---

## DEINE AUFGABE:
Erstelle eine COMPLETE SCHRITT-FÜR-SCHRITT MIX-CHAIN für Cubase 15 mit folgenden Sections:

### 1. ANALYSE SUMMARY
- Kurze Einschätzung des Audio-Materials
- Genre-Match Confidence
- Hauptprobleme und Stärken

### 2. CUBASE INSERT CHAIN (mit exakten Parametern)
Für jeden Plugin:
- **Slot-Nummer**
- **Plugin-Name** (z.B. "iZotope Nectar 4")
- **Modul** (z.B. "Compressor", "EQ", "De-Esser")
- **ALLE Parameter mit exakten Werten** (dB, Hz, ms, Ratio, etc.)
- **Begründung** (Warum diese Settings?)

### 3. SEND EFFECTS (Reverb, Delay)
- Bus-Routing Anleitung
- FX-Plugin Settings
- Send-Level in dB

### 4. GRUPPEN-BUS PROCESSING
- Group-Channel Setup
- Bus-Kompressor Settings
- Glue-Processing

### 5. MASTERING CHAIN
- Ziel: **-10.0 LUFS** (Streaming-Standard)
- Ozone Settings für IRC IV Maximizer
- Ceiling: -0.1 dB

### 6. CRITICAL FREQUENCIES
- Liste der wichtigen Frequenzen für diesen Style
- Boost/Cut Empfehlungen

### 7. A/B REFERENCE
- Empfohlene Reference-Tracks aus dem Genre
- Worauf beim Vergleich achten

Antworte EXTREM detailliert und technisch präzise. Keine vagen Aussagen!
`;
  }

  // Alle Parse-Funktionen bleiben gleich...
  parseAIResponse(response, analysisData) {
    const sections = {
      summary: this.extractSection(response, 'ANALYSE SUMMARY', 'CUBASE INSERT CHAIN'),
      insertChain: this.extractInsertChain(response),
      sendEffects: this.extractSection(response, 'SEND EFFECTS', 'GRUPPEN-BUS'),
      busProcessing: this.extractSection(response, 'GRUPPEN-BUS', 'MASTERING'),
      masteringChain: this.extractSection(response, 'MASTERING CHAIN', 'CRITICAL FREQUENCIES'),
      criticalFrequencies: this.extractSection(response, 'CRITICAL FREQUENCIES', 'A/B REFERENCE'),
      referenceTrack: this.extractSection(response, 'A/B REFERENCE', null),
      rawResponse: response
    };

    const radarParams = this.generateRadarParameters(analysisData, response);

    return {
      ...sections,
      radarParameters: radarParams,
      analysisData: analysisData,
      timestamp: new Date().toISOString()
    };
  }

  extractSection(text, startMarker, endMarker) {
    const startRegex = new RegExp(`###?\\s*\\d*\\.?\\s*${startMarker}`, 'i');
    const startMatch = text.match(startRegex);

    if (!startMatch) return '';

    let startIndex = startMatch.index + startMatch[0].length;
    let endIndex = text.length;

    if (endMarker) {
      const endRegex = new RegExp(`###?\\s*\\d*\\.?\\s*${endMarker}`, 'i');
      const endMatch = text.slice(startIndex).match(endRegex);
      if (endMatch) {
        endIndex = startIndex + endMatch.index;
      }
    }

    return text.slice(startIndex, endIndex).trim();
  }

  extractInsertChain(response) {
    const insertSection = this.extractSection(response, 'CUBASE INSERT CHAIN', 'SEND EFFECTS');
    const plugins = [];
    const pluginRegex = /\*\*Slot[:\s]*(\d+)\*\*.*?\*\*Plugin[:\s]*([^\n*]+)\*\*/gi;

    let match;
    while ((match = pluginRegex.exec(insertSection)) !== null) {
      const slot = parseInt(match[1]);
      const pluginName = match[2].trim();

      const nextSlotIndex = insertSection.indexOf(`**Slot ${slot + 1}**`, match.index);
      const pluginBlock = insertSection.slice(
        match.index,
        nextSlotIndex > 0 ? nextSlotIndex : insertSection.length
      );

      plugins.push({
        slot,
        name: pluginName,
        parameters: this.extractPluginParameters(pluginBlock),
        description: pluginBlock
      });
    }

    return plugins;
  }

  extractPluginParameters(block) {
    const params = {};
    const paramRegex = /([A-Za-z\s-]+):\s*([-+]?\d+\.?\d*)\s*([a-zA-Z%:\/]+)?/gi;

    let match;
    while ((match = paramRegex.exec(block)) !== null) {
      const paramName = match[1].trim();
      const value = parseFloat(match[2]);
      const unit = match[3] || '';

      params[paramName] = { value, unit };
    }

    return params;
  }

  generateRadarParameters(analysis, aiResponse) {
    const params = {
      air: Math.min(100, analysis.spectrum.brilliance.energy * 5),
      crunch: 15,
      squeeze: Math.max(0, 100 - (analysis.dynamicRange * 5)),
      space: 50,
      width: 40,
      tuning: 30
    };

    const saturationMatch = aiResponse.match(/saturation[:\s]*(\d+)/i);
    if (saturationMatch) params.crunch = parseInt(saturationMatch[1]);

    const reverbMatch = aiResponse.match(/decay[:\s]*(\d+\.?\d*)\s*s/i);
    if (reverbMatch) params.space = Math.min(100, parseFloat(reverbMatch[1]) * 40);

    const widthMatch = aiResponse.match(/width[:\s]*[+]?(\d+)/i);
    if (widthMatch) params.width = parseInt(widthMatch[1]) * 2;

    const tuneMatch = aiResponse.match(/retune[:\s]*(\d+)/i);
    if (tuneMatch) params.tuning = Math.max(0, 100 - parseInt(tuneMatch[1]));

    return params;
  }

  generateQuickPreset(style, vocalType) {
    const presets = {
      aggro: {
        insertChain: [
          { slot: 1, name: 'iZotope Nectar 4', parameters: { 'De-Esser': { value: -20, unit: 'dB' }, 'Frequency': { value: 5500, unit: 'Hz' } } },
          { slot: 2, name: 'FabFilter Pro-Q 3', parameters: { 'High-Pass': { value: 100, unit: 'Hz' }, 'Presence Boost': { value: 3, unit: 'dB' } } },
          { slot: 3, name: 'iZotope Nectar Compressor', parameters: { 'Ratio': { value: 4, unit: ':1' }, 'Attack': { value: 10, unit: 'ms' } } }
        ],
        radarParameters: { air: 40, crunch: 70, squeeze: 80, space: 30, width: 40, tuning: 20 }
      },
      emotional: {
        insertChain: [
          { slot: 1, name: 'Melodyne 5', parameters: { 'Pitch Correction': { value: 60, unit: '%' } } },
          { slot: 2, name: 'FabFilter Pro-Q 3', parameters: { 'High-Shelf': { value: 1.5, unit: 'dB' }, 'Frequency': { value: 10000, unit: 'Hz' } } },
          { slot: 3, name: 'iZotope Nectar Compressor', parameters: { 'Ratio': { value: 3, unit: ':1' }, 'Attack': { value: 20, unit: 'ms' } } }
        ],
        radarParameters: { air: 75, crunch: 20, squeeze: 50, space: 80, width: 60, tuning: 60 }
      },
      afro: {
        insertChain: [
          { slot: 1, name: 'Auto-Tune Pro', parameters: { 'Retune Speed': { value: 10, unit: 'ms' } } },
          { slot: 2, name: 'FabFilter Pro-Q 3', parameters: { 'High-Shelf': { value: 2, unit: 'dB' }, 'Frequency': { value: 12000, unit: 'Hz' } } },
          { slot: 3, name: 'Ozone Imager', parameters: { 'Stereo Width': { value: 25, unit: '%' } } }
        ],
        radarParameters: { air: 85, crunch: 30, squeeze: 60, space: 70, width: 80, tuning: 90 }
      },
      oldschool: {
        insertChain: [
          { slot: 1, name: 'UAD 1176', parameters: { 'Ratio': { value: 4, unit: ':1' }, 'Attack': { value: 3, unit: 'ms' } } },
          { slot: 2, name: 'Pultec EQP-1A', parameters: { 'Low Boost': { value: 3, unit: 'dB' }, 'Frequency': { value: 60, unit: 'Hz' } } },
          { slot: 3, name: 'Tape Saturation', parameters: { 'Drive': { value: 25, unit: '%' } } }
        ],
        radarParameters: { air: 35, crunch: 60, squeeze: 70, space: 50, width: 40, tuning: 10 }
      }
    };

    return presets[style] || presets.aggro;
  }

  /**
   * Get current AI provider info
   */
  getProviderInfo() {
    return {
      provider: AI_PROVIDER,
      configured: (AI_PROVIDER === 'claude' && !!anthropic) || (AI_PROVIDER === 'gemini' && !!gemini),
      model: AI_PROVIDER === 'claude' ? 'Claude Sonnet 4.5' : 'Gemini 1.5 Pro'
    };
  }
}

export default new HybridAIService();
