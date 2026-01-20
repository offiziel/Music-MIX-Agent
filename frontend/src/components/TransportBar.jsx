import React, { useState, useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';
import { useAPI } from '../hooks/useAPI';

const TransportBar = () => {
  const { audioData } = useAudio();
  const { loading } = useAPI();
  const [cpuUsage] = useState(4);
  const [ramUsage] = useState(1.2);

  return (
    <footer className="h-10 border-t border-slate-800 bg-daw-header flex items-center justify-between px-8 text-[9px] font-mono">
      {/* Left: Audio Info */}
      <div className="flex gap-6 text-slate-400">
        <span>
          BPM: <span className="text-white">{audioData.bpm || '--'}</span>
        </span>
        <span>
          SAMPLE RATE:{' '}
          <span className="text-white">
            {audioData.sampleRate ? `${(audioData.sampleRate / 1000).toFixed(1)} kHz` : '48.0 kHz'}
          </span>
        </span>
        <span>
          LUFS: <span className="text-white">{audioData.lufs?.toFixed(1) || '--'}</span>
        </span>
      </div>

      {/* Center: Status */}
      <div
        className={`uppercase tracking-widest transition-all ${
          loading
            ? 'text-purple-500 animate-pulse'
            : 'text-accent-cyan'
        }`}
      >
        {loading ? '⚡ AI Processing...' : '● System Live - Ready for Production'}
      </div>

      {/* Right: System Stats */}
      <div className="flex gap-4 text-slate-400">
        <span>
          CPU: <span className="text-white">{cpuUsage}%</span>
        </span>
        <span>
          RAM: <span className="text-white">{ramUsage} GB</span>
        </span>
      </div>
    </footer>
  );
};

export default TransportBar;
