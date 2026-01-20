import anthropic, { SYSTEM_PROMPT } from '../config/anthropic.js';

/**
 * AI Service for VST Parameter Generation
 * Uses Claude API to generate precise mixing instructions
 */
class AIService {

  /**
   * Generate mixing instructions based on audio analysis and selected style
   */
  async generateMixingInstructions(analysisData, style, vocalType = 'main') {
    try {
      const prompt = this.buildPrompt(analysisData, style, vocalType);

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

      const response = message.content[0].text;

      // Parse response into structured format
      return this.parseAIResponse(response, analysisData);

    } catch (error) {
      console.error('[AIService] Error:', error);
      throw new Error(`AI generation failed: ${error.message}`);
    }
  }

  /**
   * Build detailed prompt for Claude
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

  /**
   * Parse AI response into structured format
   */
  parseAIResponse(response, analysisData) {
    // Extract sections from response
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

    // Generate radar chart parameters
    const radarParams = this.generateRadarParameters(analysisData, response);

    return {
      ...sections,
      radarParameters: radarParams,
      analysisData: analysisData,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Extract section from AI response
   */
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

  /**
   * Extract insert chain with structured plugin data
   */
  extractInsertChain(response) {
    const insertSection = this.extractSection(response, 'CUBASE INSERT CHAIN', 'SEND EFFECTS');

    // Parse plugin entries
    const plugins = [];
    const pluginRegex = /\*\*Slot[:\s]*(\d+)\*\*.*?\*\*Plugin[:\s]*([^\n*]+)\*\*/gi;

    let match;
    while ((match = pluginRegex.exec(insertSection)) !== null) {
      const slot = parseInt(match[1]);
      const pluginName = match[2].trim();

      // Extract parameters for this plugin
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

  /**
   * Extract parameters from plugin block
   */
  extractPluginParameters(block) {
    const params = {};

    // Match patterns like "Threshold: -15 dB", "Ratio: 4:1", "Attack: 10ms"
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

  /**
   * Generate radar chart parameters based on analysis and AI response
   */
  generateRadarParameters(analysis, aiResponse) {
    // Calculate parameters (0-100 scale)
    const params = {
      air: 0,       // High frequency content (brilliance)
      crunch: 0,    // Saturation/Distortion intensity
      squeeze: 0,   // Compression amount
      space: 0,     // Reverb/Spatial effects
      width: 0,     // Stereo imaging
      tuning: 0     // Pitch correction amount
    };

    // AIR: Based on brilliance spectrum
    params.air = Math.min(100, analysis.spectrum.brilliance.energy * 5);

    // CRUNCH: Check if saturation is mentioned in AI response
    const saturationMatch = aiResponse.match(/saturation[:\s]*(\d+)/i);
    params.crunch = saturationMatch ? parseInt(saturationMatch[1]) : 15;

    // SQUEEZE: Based on dynamic range (inverse relationship)
    params.squeeze = Math.max(0, 100 - (analysis.dynamicRange * 5));

    // SPACE: Check reverb decay time mentions
    const reverbMatch = aiResponse.match(/decay[:\s]*(\d+\.?\d*)\s*s/i);
    params.space = reverbMatch ? Math.min(100, parseFloat(reverbMatch[1]) * 40) : 50;

    // WIDTH: Check for stereo width mentions
    const widthMatch = aiResponse.match(/width[:\s]*[+]?(\d+)/i);
    params.width = widthMatch ? parseInt(widthMatch[1]) * 2 : 40;

    // TUNING: Check for auto-tune/retune speed
    const tuneMatch = aiResponse.match(/retune[:\s]*(\d+)/i);
    if (tuneMatch) {
      const retuneSpeed = parseInt(tuneMatch[1]);
      // Lower retune speed = more tuning (inverse)
      params.tuning = Math.max(0, 100 - retuneSpeed);
    } else {
      params.tuning = 30; // Default moderate tuning
    }

    return params;
  }

  /**
   * Generate quick preset based on style (fallback if API fails)
   */
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
}

export default new AIService();
