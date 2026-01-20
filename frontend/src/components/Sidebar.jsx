import React, { useState } from 'react';
import { useAudio } from '../hooks/useAudio';
import { useAPI } from '../hooks/useAPI';

const STYLES = {
  aggro: { name: 'AGGRO BERLIN', color: '#EF4444', desc: 'Bushido, Sido - Aggressive & Dry' },
  emotional: { name: 'EMOTIONAL/PI', color: '#8B5CF6', desc: 'Prinz Pi - Melodic & Airy' },
  afro: { name: 'AFRO/MODERN', color: '#10B981', desc: 'RAF Camora - Trap Style' },
  oldschool: { name: 'OLDSCHOOL', color: '#F59E0B', desc: 'Kollegah - Boom Bap' }
};

const VOCAL_TYPES = [
  { id: 'main', label: 'Main Vocals', icon: '🎤' },
  { id: 'backing', label: 'Backing Vocals', icon: '🎵' },
  { id: 'adlibs', label: 'Adlibs', icon: '✨' }
];

const Sidebar = ({ style, setStyle, vocalType, setVocalType }) => {
  const { audioData, loadAudioFile, updateAudioMetrics, currentFile } = useAudio();
  const { analyzeAudio, generatePreset, loading } = useAPI();
  const [analyzing, setAnalyzing] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setAnalyzing(true);

    try {
      // Load into Web Audio API
      await loadAudioFile(file);

      // Analyze on backend
      const analysis = await analyzeAudio(file);
      updateAudioMetrics(analysis);

      // Auto-generate preset
      await generatePreset(analysis, style, vocalType);

    } catch (error) {
      console.error('Upload error:', error);
      alert(`Fehler: ${error.message}`);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <aside className="w-80 bg-daw-sidebar border-r border-slate-800 p-6 space-y-8 overflow-y-auto">
      {/* Style Selection */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          1. Style Selection
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(STYLES).map(([key, s]) => (
            <button
              key={key}
              onClick={() => setStyle(key)}
              className={`p-3 rounded-lg border text-left text-xs transition-all ${
                style === key
                  ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-600'
              }`}
            >
              <span className="font-bold block">{s.name}</span>
              <span className="text-[9px] opacity-60">{s.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Vocal Type Selection */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          1.5 Vocal Type
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {VOCAL_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setVocalType(type.id)}
              className={`p-3 rounded-lg border text-left text-xs transition-all ${
                vocalType === type.id
                  ? 'border-accent-emerald bg-accent-emerald/10 text-accent-emerald'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-600'
              }`}
            >
              <span className="mr-2">{type.icon}</span>
              <span className="font-bold">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Audio Input */}
      <div className="space-y-4 daw-panel p-4 border-cyan-500/30">
        <h3 className="text-[10px] font-bold text-accent-cyan uppercase tracking-widest">
          2. Audio Input
        </h3>
        <input
          type="file"
          id="audioUpload"
          className="hidden"
          accept="audio/*"
          onChange={handleFileUpload}
          disabled={analyzing}
        />
        <button
          onClick={() => document.getElementById('audioUpload').click()}
          disabled={analyzing}
          className={`w-full py-3 rounded font-black text-xs transition-all ${
            analyzing
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
              : 'btn-primary'
          }`}
        >
          {analyzing ? 'ANALYZING...' : 'SPUR / SONG LADEN'}
        </button>

        {currentFile && (
          <div className="text-[10px] text-slate-500 truncate">
            📁 {currentFile.name}
          </div>
        )}
      </div>

      {/* Analysis Metrics */}
      <div className="space-y-4 daw-panel p-4">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          3. Analysis Metrics
        </h3>
        <div className="space-y-3 text-[11px] font-mono">
          {/* BPM */}
          <div className="flex justify-between items-center">
            <span className="text-slate-500">BPM:</span>
            <span className="text-white font-bold">
              {audioData.bpm || '--'}
            </span>
          </div>

          {/* Peak Level */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-500">Peak Level:</span>
              <span className={`font-bold ${
                audioData.peak > -1 ? 'text-red-500' :
                audioData.peak > -6 ? 'text-orange-500' :
                'text-accent-cyan'
              }`}>
                {audioData.peak?.toFixed(1) || '--'} dB
              </span>
            </div>
            <div className="meter-bg">
              <div
                className="meter-fill"
                style={{ width: `${Math.min(100, (parseFloat(audioData.peak || -60) + 60) * 1.6)}%` }}
              />
            </div>
          </div>

          {/* LUFS */}
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Integr. LUFS:</span>
            <span className={`font-bold ${
              audioData.lufs >= -10 && audioData.lufs <= -8 ? 'text-emerald-400' :
              audioData.lufs > -8 ? 'text-orange-500' :
              'text-accent-cyan'
            }`}>
              {audioData.lufs?.toFixed(1) || '--'} LUFS
            </span>
          </div>

          {/* Dynamic Range */}
          {audioData.dynamicRange && (
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Dynamic Range:</span>
              <span className="text-purple-400 font-bold">
                {audioData.dynamicRange.toFixed(1)} dB
              </span>
            </div>
          )}

          {/* Duration */}
          {audioData.duration > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Duration:</span>
              <span className="text-slate-300">
                {Math.floor(audioData.duration / 60)}:{String(Math.floor(audioData.duration % 60)).padStart(2, '0')}
              </span>
            </div>
          )}
        </div>

        {/* Status Messages */}
        {audioData.loudnessAnalysis && (
          <div className={`p-3 rounded-lg text-[10px] border ${
            audioData.loudnessAnalysis.status === 'PERFECT' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
            audioData.loudnessAnalysis.status === 'TOO_LOUD' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
            'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
          }`}>
            <div className="font-bold mb-1">{audioData.loudnessAnalysis.status}</div>
            <div className="opacity-80">{audioData.loudnessAnalysis.message}</div>
          </div>
        )}
      </div>

      {/* AI Status */}
      {loading && (
        <div className="daw-panel p-4 border-purple-500/30">
          <div className="text-[10px] text-purple-400 uppercase tracking-widest animate-pulse">
            ⚡ AI Processing...
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
