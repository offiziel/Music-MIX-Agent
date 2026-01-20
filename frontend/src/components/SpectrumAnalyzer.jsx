import React, { useEffect, useRef } from 'react';
import { useAudio } from '../hooks/useAudio';

const SpectrumAnalyzer = ({ color = '#22D3EE' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const { getFrequencyData, isPlaying, analyserRef } = useAudio();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = 200 * dpr;
    ctx.scale(dpr, dpr);

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = 200;

      // Clear canvas
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);

      if (!isPlaying || !analyserRef.current) {
        // Draw idle state
        ctx.fillStyle = color + '20';
        ctx.fillRect(0, height / 2 - 1, width, 2);
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      // Get frequency data
      const frequencyData = getFrequencyData();
      const barCount = Math.min(128, frequencyData.length);
      const barWidth = width / barCount;

      // Draw bars
      for (let i = 0; i < barCount; i++) {
        const value = frequencyData[i];
        const barHeight = (value / 255) * height * 0.9;

        // Gradient for each bar
        const gradient = ctx.createLinearGradient(0, height - barHeight, 0, height);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color + '40');

        ctx.fillStyle = gradient;
        ctx.fillRect(
          i * barWidth,
          height - barHeight,
          barWidth - 1,
          barHeight
        );
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, color, getFrequencyData, analyserRef]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg border border-daw-border"
        style={{ height: '200px', background: '#000' }}
      />
      <div className="absolute top-2 right-2 text-[9px] font-mono text-slate-600 uppercase tracking-wider">
        FFT 2048
      </div>
    </div>
  );
};

export default SpectrumAnalyzer;
