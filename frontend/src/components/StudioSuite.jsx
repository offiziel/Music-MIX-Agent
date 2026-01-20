import React from 'react';
import { useAPI } from '../hooks/useAPI';
import PluginCard from './PluginCard';

const StudioSuite = ({ style, vocalType }) => {
  const { presetData, loading } = useAPI();

  if (!presetData) {
    return (
      <div className="p-10 h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">🎛️</div>
          <h3 className="text-2xl font-bold text-white">Studio Suite</h3>
          <p className="text-slate-400 max-w-md">
            Lade eine Audio-Datei hoch, um detaillierte Plugin-Parameter und
            Mixing-Anweisungen zu erhalten.
          </p>
        </div>
      </div>
    );
  }

  const { insertChain = [], sendEffects = '', busProcessing = '', masteringChain = '' } = presetData;

  return (
    <div className="p-10 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-end">
        <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter">
          Studio <span className="text-accent-emerald">Suite</span>
        </h2>
        <div className="text-right text-xs text-slate-500 font-mono">
          Style: {style.toUpperCase()} | Vocal: {vocalType.toUpperCase()}
        </div>
      </div>

      {/* Insert Chain */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
          <span className="text-2xl">🔌</span> Insert Chain
        </h3>

        {insertChain.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {insertChain.map((plugin, idx) => (
              <PluginCard key={idx} plugin={plugin} />
            ))}
          </div>
        ) : (
          <div className="daw-panel p-8 text-center text-slate-500">
            Keine Plugin-Chain verfügbar
          </div>
        )}
      </div>

      {/* Send Effects */}
      {sendEffects && (
        <div className="daw-panel p-6 border-l-4 border-purple-500">
          <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-3">
            <span className="text-2xl">🌊</span> Send Effects
          </h3>
          <div className="prose prose-invert prose-sm max-w-none">
            <pre className="bg-slate-900/50 p-4 rounded-lg text-xs text-slate-300 whitespace-pre-wrap font-mono">
              {sendEffects}
            </pre>
          </div>
        </div>
      )}

      {/* Bus Processing */}
      {busProcessing && (
        <div className="daw-panel p-6 border-l-4 border-emerald-500">
          <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-3">
            <span className="text-2xl">🎚️</span> Bus Processing
          </h3>
          <div className="prose prose-invert prose-sm max-w-none">
            <pre className="bg-slate-900/50 p-4 rounded-lg text-xs text-slate-300 whitespace-pre-wrap font-mono">
              {busProcessing}
            </pre>
          </div>
        </div>
      )}

      {/* Mastering Chain */}
      {masteringChain && (
        <div className="daw-panel p-6 border-l-4 border-cyan-500">
          <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-3">
            <span className="text-2xl">✨</span> Mastering Chain
          </h3>
          <div className="prose prose-invert prose-sm max-w-none">
            <pre className="bg-slate-900/50 p-4 rounded-lg text-xs text-slate-300 whitespace-pre-wrap font-mono">
              {masteringChain}
            </pre>
          </div>
        </div>
      )}

      {/* Raw AI Response (collapsible) */}
      {presetData.rawResponse && (
        <details className="daw-panel p-6 border-l-4 border-slate-700">
          <summary className="text-sm font-bold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors">
            📋 Complete AI Response (Click to expand)
          </summary>
          <div className="mt-4 prose prose-invert prose-sm max-w-none">
            <pre className="bg-black p-4 rounded-lg text-[10px] text-slate-400 whitespace-pre-wrap font-mono overflow-x-auto">
              {presetData.rawResponse}
            </pre>
          </div>
        </details>
      )}
    </div>
  );
};

export default StudioSuite;
