import React, { createContext, useContext, useRef, useState } from 'react';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState({
    lufs: -18,
    peak: -6,
    bpm: 0,
    duration: 0
  });
  const [currentFile, setCurrentFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const audioBufferRef = useRef(null);

  /**
   * Initialize Web Audio API
   */
  const initAudioContext = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      analyserRef.current.connect(audioCtxRef.current.destination);
    }
    return audioCtxRef.current;
  };

  /**
   * Load audio file for Web Audio API processing
   */
  const loadAudioFile = async (file) => {
    const ctx = initAudioContext();

    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

      audioBufferRef.current = audioBuffer;
      setCurrentFile(file);

      // Update basic audio data
      setAudioData(prev => ({
        ...prev,
        duration: audioBuffer.duration
      }));

      return audioBuffer;
    } catch (error) {
      console.error('[Audio] Error loading file:', error);
      throw error;
    }
  };

  /**
   * Play audio
   */
  const play = () => {
    if (!audioBufferRef.current) return;

    const ctx = initAudioContext();

    // Stop previous source if playing
    if (sourceRef.current) {
      try {
        sourceRef.current.stop();
      } catch (e) {
        // Ignore errors from already stopped sources
      }
    }

    // Create new source
    sourceRef.current = ctx.createBufferSource();
    sourceRef.current.buffer = audioBufferRef.current;
    sourceRef.current.connect(analyserRef.current);

    sourceRef.current.onended = () => {
      setIsPlaying(false);
    };

    sourceRef.current.start(0);
    setIsPlaying(true);
  };

  /**
   * Stop audio
   */
  const stop = () => {
    if (sourceRef.current) {
      try {
        sourceRef.current.stop();
      } catch (e) {
        // Ignore errors
      }
      setIsPlaying(false);
    }
  };

  /**
   * Get frequency data for visualization
   */
  const getFrequencyData = () => {
    if (!analyserRef.current) return new Uint8Array(0);

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    return dataArray;
  };

  /**
   * Get time domain data for waveform
   */
  const getTimeDomainData = () => {
    if (!analyserRef.current) return new Uint8Array(0);

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteTimeDomainData(dataArray);
    return dataArray;
  };

  /**
   * Update audio metrics (from backend analysis)
   */
  const updateAudioMetrics = (metrics) => {
    setAudioData(prev => ({
      ...prev,
      ...metrics
    }));
    setAnalysisResult(metrics);
  };

  const value = {
    isPlaying,
    audioData,
    currentFile,
    analysisResult,
    analyserRef,
    loadAudioFile,
    play,
    stop,
    getFrequencyData,
    getTimeDomainData,
    updateAudioMetrics
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};
