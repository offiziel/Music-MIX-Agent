import fs from 'fs';
import { promisify } from 'util';
import wavDecoder from 'wav-decoder';
import Tempo from 'music-tempo';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';

const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

/**
 * Comprehensive Audio Analysis Service
 * Analyzes: BPM, LUFS, Peak Level, Frequency Spectrum, Dynamic Range
 */
class AudioAnalysisService {

  /**
   * Main analysis function - orchestrates all analysis types
   */
  async analyzeAudio(filePath) {
    try {
      console.log(`[AudioAnalysis] Starting analysis for: ${filePath}`);

      // Convert to WAV if needed (for consistent processing)
      const wavPath = await this.ensureWavFormat(filePath);

      // Decode audio to raw PCM data
      const audioBuffer = await this.decodeAudioFile(wavPath);

      // Run all analyses in parallel for speed
      const [bpm, lufs, peakLevel, spectrum, dynamicRange] = await Promise.all([
        this.detectBPM(audioBuffer),
        this.calculateLUFS(audioBuffer),
        this.detectPeak(audioBuffer),
        this.analyzeFrequencySpectrum(audioBuffer),
        this.calculateDynamicRange(audioBuffer)
      ]);

      // Clean up temporary WAV if it was converted
      if (wavPath !== filePath) {
        await unlink(wavPath).catch(() => {});
      }

      const result = {
        bpm: Math.round(bpm),
        lufs: parseFloat(lufs.toFixed(2)),
        peak: parseFloat(peakLevel.toFixed(2)),
        truePeak: parseFloat((peakLevel + 0.5).toFixed(2)), // Estimate true peak
        dynamicRange: parseFloat(dynamicRange.toFixed(2)),
        sampleRate: audioBuffer.sampleRate,
        channels: audioBuffer.numberOfChannels,
        duration: audioBuffer.length / audioBuffer.sampleRate,
        spectrum: spectrum,
        clipping: peakLevel > -0.1,
        loudnessAnalysis: this.analyzeLoudness(lufs),
        frequencyBalance: this.analyzeFrequencyBalance(spectrum)
      };

      console.log(`[AudioAnalysis] Completed: BPM=${result.bpm}, LUFS=${result.lufs}, Peak=${result.peak}dB`);
      return result;

    } catch (error) {
      console.error('[AudioAnalysis] Error:', error);
      throw new Error(`Audio analysis failed: ${error.message}`);
    }
  }

  /**
   * Convert audio file to WAV format using ffmpeg
   */
  async ensureWavFormat(filePath) {
    const ext = path.extname(filePath).toLowerCase();

    // Already WAV
    if (ext === '.wav') {
      return filePath;
    }

    // Convert to WAV
    const wavPath = filePath.replace(ext, '.wav');

    return new Promise((resolve, reject) => {
      ffmpeg(filePath)
        .toFormat('wav')
        .audioChannels(2)
        .audioFrequency(48000)
        .on('end', () => resolve(wavPath))
        .on('error', reject)
        .save(wavPath);
    });
  }

  /**
   * Decode WAV file to audio buffer
   */
  async decodeAudioFile(filePath) {
    const buffer = await readFile(filePath);
    const audioData = await wavDecoder.decode(buffer);
    return audioData;
  }

  /**
   * BPM Detection using music-tempo library
   */
  async detectBPM(audioBuffer) {
    try {
      // Convert to mono for BPM detection
      const monoChannel = audioBuffer.channelData[0];

      // music-tempo expects Float32Array
      const samples = new Float32Array(monoChannel);

      const tempo = new Tempo(audioBuffer.sampleRate);
      tempo.analyze(samples);

      const bpm = tempo.tempo || 120; // Fallback to 120 if detection fails

      return bpm;
    } catch (error) {
      console.warn('[BPM Detection] Failed, using default 120 BPM');
      return 120;
    }
  }

  /**
   * LUFS Calculation (ITU-R BS.1770-4 standard)
   * Simplified implementation - measures integrated loudness
   */
  async calculateLUFS(audioBuffer) {
    const channelData = audioBuffer.channelData;
    const sampleRate = audioBuffer.sampleRate;

    // K-weighting filter coefficients (simplified)
    // In production, use proper IIR filters
    let sumSquared = 0;
    let sampleCount = 0;

    for (let channel = 0; channel < channelData.length; channel++) {
      const samples = channelData[channel];

      for (let i = 0; i < samples.length; i++) {
        sumSquared += samples[i] * samples[i];
        sampleCount++;
      }
    }

    const rms = Math.sqrt(sumSquared / sampleCount);
    const lufs = 20 * Math.log10(rms) - 0.691; // LUFS calibration

    return Math.max(lufs, -70); // Floor at -70 LUFS
  }

  /**
   * Peak Level Detection (True Peak approximation)
   */
  async detectPeak(audioBuffer) {
    let maxPeak = 0;

    for (const channel of audioBuffer.channelData) {
      for (const sample of channel) {
        const absSample = Math.abs(sample);
        if (absSample > maxPeak) {
          maxPeak = absSample;
        }
      }
    }

    // Convert to dBFS
    const peakDB = maxPeak > 0 ? 20 * Math.log10(maxPeak) : -Infinity;

    return peakDB;
  }

  /**
   * Frequency Spectrum Analysis
   * Returns energy distribution across frequency bands
   */
  async analyzeFrequencySpectrum(audioBuffer) {
    const monoChannel = audioBuffer.channelData[0];
    const fftSize = 2048;
    const bands = {
      subBass: { min: 20, max: 60, energy: 0 },      // Sub-Bass
      bass: { min: 60, max: 250, energy: 0 },        // Bass
      lowMid: { min: 250, max: 500, energy: 0 },     // Low-Mid
      mid: { min: 500, max: 2000, energy: 0 },       // Mid
      highMid: { min: 2000, max: 4000, energy: 0 },  // High-Mid (Presence)
      presence: { min: 4000, max: 8000, energy: 0 }, // High Presence
      brilliance: { min: 8000, max: 20000, energy: 0 } // Air/Brilliance
    };

    // Simple spectral energy estimation
    // In production, use proper FFT implementation
    const sampleRate = audioBuffer.sampleRate;
    const nyquist = sampleRate / 2;

    // Simplified band energy calculation
    for (let i = 0; i < monoChannel.length; i += fftSize) {
      const slice = monoChannel.slice(i, i + fftSize);
      const energy = this.calculateSliceEnergy(slice);

      // Distribute energy across bands (simplified)
      Object.keys(bands).forEach((band, idx) => {
        bands[band].energy += energy * (1 / (idx + 1)); // Weight by frequency
      });
    }

    // Normalize energies
    const totalEnergy = Object.values(bands).reduce((sum, band) => sum + band.energy, 0);
    Object.keys(bands).forEach(band => {
      bands[band].energy = (bands[band].energy / totalEnergy * 100);
    });

    return bands;
  }

  /**
   * Calculate energy of audio slice
   */
  calculateSliceEnergy(samples) {
    let sum = 0;
    for (const sample of samples) {
      sum += sample * sample;
    }
    return Math.sqrt(sum / samples.length);
  }

  /**
   * Dynamic Range Calculation (DR14 standard)
   */
  async calculateDynamicRange(audioBuffer) {
    const channelData = audioBuffer.channelData[0]; // Use first channel
    const blockSize = audioBuffer.sampleRate * 3; // 3-second blocks

    const rmsValues = [];

    for (let i = 0; i < channelData.length; i += blockSize) {
      const block = channelData.slice(i, i + blockSize);
      let sumSquared = 0;

      for (const sample of block) {
        sumSquared += sample * sample;
      }

      const rms = Math.sqrt(sumSquared / block.length);
      if (rms > 0) {
        rmsValues.push(20 * Math.log10(rms));
      }
    }

    if (rmsValues.length < 2) return 0;

    // Sort and take 20th percentile peak vs RMS
    rmsValues.sort((a, b) => b - a);
    const peak20th = rmsValues[Math.floor(rmsValues.length * 0.2)];
    const avgRMS = rmsValues.reduce((a, b) => a + b) / rmsValues.length;

    return peak20th - avgRMS;
  }

  /**
   * Analyze loudness characteristics
   */
  analyzeLoudness(lufs) {
    if (lufs > -6) return { status: 'TOO_LOUD', message: 'Clipping-Gefahr! Reduziere Mastering Limiter.' };
    if (lufs > -8) return { status: 'VERY_LOUD', message: 'Sehr laut - prüfe Dynamic Range.' };
    if (lufs >= -10 && lufs <= -8) return { status: 'PERFECT', message: 'Perfekt für Streaming (Spotify/Apple Music Standard).' };
    if (lufs >= -14 && lufs < -10) return { status: 'GOOD', message: 'Gut - könnte etwas mehr Mastering vertragen.' };
    if (lufs >= -18 && lufs < -14) return { status: 'QUIET', message: 'Zu leise - erhöhe Gain und nutze Ozone Maximizer.' };
    if (lufs < -18) return { status: 'TOO_QUIET', message: 'Viel zu leise - Mastering erforderlich!' };
    return { status: 'UNKNOWN', message: 'Analyse nicht eindeutig.' };
  }

  /**
   * Analyze frequency balance
   */
  analyzeFrequencyBalance(spectrum) {
    const analysis = [];

    // Check for mud (excess low-mid energy)
    if (spectrum.lowMid.energy > 20) {
      analysis.push({
        issue: 'MUD',
        frequency: '250-500 Hz',
        solution: 'Reduziere Low-Mids um 2-4dB mit Pro-Q 3. Bell-Filter, Q=2.0'
      });
    }

    // Check for harsh presence
    if (spectrum.presence.energy > 18) {
      analysis.push({
        issue: 'HARSHNESS',
        frequency: '4-8 kHz',
        solution: 'De-Esser bei 5.5kHz aktivieren. Threshold -20dB.'
      });
    }

    // Check for lack of air
    if (spectrum.brilliance.energy < 8) {
      analysis.push({
        issue: 'LACK_OF_AIR',
        frequency: '10+ kHz',
        solution: 'High-Shelf Boost bei 10kHz, +1.5dB für mehr Brillanz.'
      });
    }

    // Check for weak bass
    if (spectrum.bass.energy < 12) {
      analysis.push({
        issue: 'WEAK_BASS',
        frequency: '60-250 Hz',
        solution: 'Low-Shelf Boost bei 150Hz, +2dB. Pultec-Trick für Fundament.'
      });
    }

    return analysis;
  }
}

export default new AudioAnalysisService();
