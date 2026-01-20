import React, { useEffect, useRef } from 'react';
import { useAudio } from '../hooks/useAudio';
import { useAPI } from '../hooks/useAPI';
import SpectrumAnalyzer from './SpectrumAnalyzer';
import RadarChart from './RadarChart';

const STYLES = {
  aggro: { name: 'AGGRO BERLIN', color: '#EF4444' },
  emotional: { name: 'EMOTIONAL/PI', color: '#8B5CF6' },
  afro: { name: 'AFRO/MODERN', color: '#10B981' },
  oldschool: { name: 'OLDSCHOOL/BOOM', color: '#F59E0B' }
};

const Dashboard = ({ style }) => {
  const { audioData, analysisResult, isPlaying, play, stop } = useAudio();
  const { presetData } = useAPI();

  return (
    <div className="p-10 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-end">
        <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter">
          Live <span className="text-accent-cyan">Bridge</span>
        </h2>
        <div className="text-right text-xs text-slate-500 font-mono">
          Input: Spectral Analyzer Active
        </div>
      </div>

      {/* Spectrum Analyzer */}
      <SpectrumAnalyzer color={STYLES[style].color} />

      {/* Playback Controls */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={isPlaying ? stop : play}
          disabled={!audioData.duration}
          className={`px-8 py-3 rounded-lg font-bold uppercase tracking-wider transition-all ${
            !audioData.duration
              ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
              : isPlaying
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-emerald-500 text-white hover:bg-emerald-600'
          }`}
        >
          {isPlaying ? '⏸ Stop' : '▶ Play'}
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Mixing Assistant */}
        <div className="daw-panel p-6 border-t-4 border-cyan-500">
          <h4 className="text-sm font-bold text-white mb-4 uppercase flex items-center gap-2">
            <span>🤖</span> AI Mixing Assistant
          </h4>
          {presetData?.summary ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                {presetData.summary}
              </p>
              {presetData.warning && (
                <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg text-[10px] text-orange-400">
                  ⚠️ {presetData.warning}
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs italic text-slate-400 leading-relaxed">
              Lade eine Audio-Datei hoch, um KI-gestützte Mixing-Empfehlungen zu erhalten.
            </p>
          )}
        </div>

        {/* Plugin Chain */}
        <div className="daw-panel p-6 border-t-4 border-emerald-500">
          <h4 className="text-sm font-bold text-white mb-4 uppercase flex items-center gap-2">
            <span>🔌</span> Plugin Chain
          </h4>
          {presetData?.insertChain?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {presetData.insertChain.slice(0, 5).map((plugin, idx) => (
                <div
                  key={idx}
                  className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-500/20"
                >
                  {plugin.name}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs italic text-slate-400">
              Keine Plugin-Chain verfügbar. Analysiere zuerst eine Audio-Datei.
            </p>
          )}
        </div>
      </div>

      {/* Radar Chart + Frequency Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="daw-panel p-6">
          <h4 className="text-sm font-bold text-white mb-4 uppercase">
            Parameter Overview
          </h4>
          {presetData?.radarParameters ? (
            <RadarChart data={presetData.radarParameters} color={STYLES[style].color} />
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-500 text-sm">
              Keine Daten verfügbar
            </div>
          )}
        </div>

        {/* Frequency Analysis */}
        <div className="daw-panel p-6">
          <h4 className="text-sm font-bold text-white mb-4 uppercase">
            Frequency Balance
          </h4>
          {analysisResult?.spectrum ? (
            <div className="space-y-3">
              {Object.entries(analysisResult.spectrum).map(([band, data]) => (
                <div key={band}>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-slate-400 uppercase">{band}</span>
                    <span className="text-slate-300 font-mono">{data.energy.toFixed(1)}%</span>
                  </div>
                  <div className="meter-bg">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all"
                      style={{ width: `${data.energy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 text-sm">
              Keine Spektrum-Daten verfügbar
            </div>
          )}
        </div>
      </div>

      {/* Frequency Issues */}
      {analysisResult?.frequencyBalance?.length > 0 && (
        <div className="daw-panel p-6 border-l-4 border-orange-500">
          <h4 className="text-sm font-bold text-white mb-4 uppercase flex items-center gap-2">
            <span>⚠️</span> Erkannte Probleme
          </h4>
          <div className="space-y-3">
            {analysisResult.frequencyBalance.map((issue, idx) => (
              <div key={idx} className="bg-slate-900/50 p-3 rounded-lg">
                <div className="font-bold text-orange-400 text-xs mb-1">
                  {issue.issue.replace(/_/g, ' ')} ({issue.frequency})
                </div>
                <div className="text-[10px] text-slate-400">
                  {issue.solution}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
