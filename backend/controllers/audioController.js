import audioAnalysisService from '../services/audioAnalysis.js';
import aiService from '../services/aiServiceHybrid.js';
import fs from 'fs/promises';

/**
 * Audio Controller - Handles all audio-related endpoints
 */
class AudioController {

  /**
   * POST /api/analyze
   * Analyze uploaded audio file
   */
  async analyze(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No audio file uploaded'
        });
      }

      console.log(`[AudioController] Analyzing file: ${req.file.originalname}`);

      // Perform audio analysis
      const analysis = await audioAnalysisService.analyzeAudio(req.file.path);

      // Clean up uploaded file
      await fs.unlink(req.file.path).catch(() => {});

      res.json({
        success: true,
        data: analysis
      });

    } catch (error) {
      console.error('[AudioController] Analysis error:', error);

      // Clean up file on error
      if (req.file) {
        await fs.unlink(req.file.path).catch(() => {});
      }

      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * POST /api/generate-preset
   * Generate VST preset based on analysis and style
   */
  async generatePreset(req, res) {
    try {
      const { analysisData, style, vocalType } = req.body;

      if (!analysisData || !style) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: analysisData, style'
        });
      }

      console.log(`[AudioController] Generating preset for style: ${style}, vocalType: ${vocalType}`);

      // Generate mixing instructions using AI
      const instructions = await aiService.generateMixingInstructions(
        analysisData,
        style,
        vocalType || 'main'
      );

      res.json({
        success: true,
        data: instructions
      });

    } catch (error) {
      console.error('[AudioController] Preset generation error:', error);

      // Fallback to quick preset
      const fallback = aiService.generateQuickPreset(req.body.style, req.body.vocalType);

      res.json({
        success: true,
        data: {
          ...fallback,
          summary: 'AI service unavailable - using fallback preset',
          warning: 'This is a generic preset. For best results, configure your Claude API key.'
        }
      });
    }
  }

  /**
   * POST /api/get-instructions
   * Get detailed mixing instructions for a specific plugin
   */
  async getInstructions(req, res) {
    try {
      const { pluginName, style, analysisData } = req.body;

      if (!pluginName || !style) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: pluginName, style'
        });
      }

      // Generate specific plugin instructions
      const instructions = await this.generatePluginInstructions(
        pluginName,
        style,
        analysisData
      );

      res.json({
        success: true,
        data: instructions
      });

    } catch (error) {
      console.error('[AudioController] Instructions error:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Generate detailed instructions for a specific plugin
   */
  async generatePluginInstructions(pluginName, style, analysisData) {
    const pluginDatabase = {
      'iZotope Nectar 4': {
        description: 'Complete vocal production suite',
        modules: ['Pitch', 'Compressor', 'EQ', 'De-Esser', 'Saturation', 'Gate', 'Reverb', 'Delay'],
        workflow: 'Insert Slot 1 - Primary vocal processing'
      },
      'iZotope Ozone 12': {
        description: 'Professional mastering suite',
        modules: ['EQ', 'Dynamics', 'Maximizer', 'Imager', 'Exciter', 'Stabilizer'],
        workflow: 'Master Bus - Final mastering chain'
      },
      'FabFilter Pro-Q 3': {
        description: 'Surgical EQ with dynamic capabilities',
        modules: ['Dynamic EQ', 'Spectrum Analyzer', 'Linear Phase', 'Mid/Side'],
        workflow: 'Insert Slot 2 - Frequency sculpting'
      },
      'Auto-Tune Pro': {
        description: 'Industry-standard pitch correction',
        modules: ['Auto Mode', 'Graph Mode', 'Retune Speed', 'Humanize'],
        workflow: 'Insert Slot 1 (before EQ) - Pitch correction'
      },
      'Valhalla VintageVerb': {
        description: 'Lush reverb plugin',
        modules: ['Reverb Type', 'Decay Time', 'Pre-Delay', 'Mix'],
        workflow: 'Send FX 1 - Spatial effects'
      }
    };

    const plugin = pluginDatabase[pluginName] || {
      description: 'Third-party plugin',
      modules: [],
      workflow: 'Insert as needed'
    };

    return {
      plugin: pluginName,
      ...plugin,
      style: style,
      recommendedSettings: `Detailed settings for ${pluginName} in ${style} context`,
      analysisContext: analysisData ? {
        lufs: analysisData.lufs,
        peakLevel: analysisData.peak,
        frequencyBalance: analysisData.frequencyBalance
      } : null
    };
  }

  /**
   * GET /api/styles
   * Get available mixing styles
   */
  async getStyles(req, res) {
    const styles = {
      aggro: {
        name: 'AGGRO BERLIN',
        description: 'Bushido, Sido, Fler - Aggressive, dry, maximum loudness',
        color: '#EF4444',
        characteristics: ['Hard compression', 'Emphasized mids 2-4kHz', 'Minimal reverb', 'Maximum presence'],
        referenceArtists: ['Bushido', 'Sido', 'Fler', 'B-Tight'],
        targetLUFS: -8,
        era: '2000-2010'
      },
      emotional: {
        name: 'EMOTIONAL/PI',
        description: 'Prinz Pi, Casper - Melodic, airy, long reverb',
        color: '#8B5CF6',
        characteristics: ['Natural tuning', 'Gentle compression', 'Long reverb (1.8-2.8s)', 'High-shelf air'],
        referenceArtists: ['Prinz Pi', 'Casper', 'Alligatoah'],
        targetLUFS: -10,
        era: '2015-2025'
      },
      afro: {
        name: 'AFRO/MODERN',
        description: 'RAF Camora, Bonez MC - Trap-inspired, Auto-Tune, stereo width',
        color: '#10B981',
        characteristics: ['Auto-Tune (10-20ms retune)', 'Stereo imaging', 'Modern highs', 'Ping-pong delays'],
        referenceArtists: ['RAF Camora', 'Bonez MC', 'Ufo361'],
        targetLUFS: -9,
        era: '2015-2020'
      },
      oldschool: {
        name: 'OLDSCHOOL/BOOM BAP',
        description: 'Kollegah, Farid Bang - Warm low-mids, tape saturation',
        color: '#F59E0B',
        characteristics: ['Warm low-mids (250Hz)', 'Tape saturation', 'Pultec EQ trick', 'Analog feel'],
        referenceArtists: ['Kollegah', 'Farid Bang', 'Haftbefehl'],
        targetLUFS: -10,
        era: '2010-2015'
      }
    };

    res.json({
      success: true,
      data: styles
    });
  }

  /**
   * GET /api/health
   * Health check endpoint
   */
  async health(req, res) {
    res.json({
      success: true,
      status: 'operational',
      version: '3.0.0',
      timestamp: new Date().toISOString()
    });
  }
}

export default new AudioController();
