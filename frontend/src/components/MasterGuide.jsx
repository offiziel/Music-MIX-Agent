import React from 'react';

const WORKFLOW_STEPS = [
  {
    title: '1. Vorbereitung',
    description: 'Spuren in Cubase 15 normalisieren auf -18dB RMS. Headroom ist die Basis für iZotope.',
    icon: '📁',
    color: 'cyan'
  },
  {
    title: '2. Vocal Pitching',
    description: 'Melodyne 5 für Korrekturen, danach Auto-Tune Pro (Retune 5-15ms) für den Radio-Look.',
    icon: '🎵',
    color: 'purple'
  },
  {
    title: '3. Die "Sauce"',
    description: 'Pultec EQ Trick: Gleichzeitiger Boost/Cut bei 60Hz für Fundament ohne Matsch.',
    icon: '🔥',
    color: 'orange'
  },
  {
    title: '4. Gruppen-Routing',
    description: 'Alle Vocals auf einen Bus senden. Dort: iZotope Neutron 4 Mix Assistant für den Glue.',
    icon: '🎚️',
    color: 'emerald'
  },
  {
    title: '5. Mastering',
    description: 'Ozone Stabilizer auf "Subtle". Limiter auf -0.1dB Ceiling pushen. Target: -10 LUFS.',
    icon: '✨',
    color: 'pink'
  }
];

const PLUGIN_TIPS = [
  {
    plugin: 'iZotope Nectar 4',
    tips: [
      'De-Esser bei 5.2-7.5kHz für scharfe S-Laute',
      'Auto Level Mode auf -3dB Target',
      'Saturation 10-25% für Wärme',
      'Compressor: Attack 5-15ms, Ratio 3:1-6:1'
    ],
    color: 'emerald'
  },
  {
    plugin: 'iZotope Ozone 12',
    tips: [
      'IRC IV Mode für Transient-Erhaltung',
      'Target LUFS: -10.0 für Streaming',
      'Imager: +15-30% Stereo Width über 2kHz',
      'High-Shelf ab 10kHz für Air (+1-2dB)'
    ],
    color: 'cyan'
  },
  {
    plugin: 'FabFilter Pro-Q 3',
    tips: [
      'High-Pass bei 80-120Hz für Vocals',
      'Presence Boost 3-5kHz (+2 bis +4dB)',
      'Dynamic EQ als Sidechain De-Esser',
      'Natural Shelf mit Q-Faktor 0.71'
    ],
    color: 'purple'
  },
  {
    plugin: 'Valhalla VintageVerb',
    tips: [
      'Pre-Delay: 15-35ms (verhindert Matsch)',
      'Decay: Aggro 0.8-1.2s, Emotional 1.8-2.8s',
      'High-Cut bei 8-10kHz für Klarheit',
      'Mix: 12-25% für Vocals'
    ],
    color: 'pink'
  }
];

const REFERENCE_TRACKS = [
  { artist: 'Bushido', track: 'Sonnenbank Flavour', year: '2003', style: 'Aggro Berlin' },
  { artist: 'Prinz Pi', track: 'Kompass ohne Norden', year: '2013', style: 'Emotional' },
  { artist: 'RAF Camora', track: 'Primo', year: '2017', style: 'Modern/Trap' },
  { artist: 'Kollegah', track: 'Alpha', year: '2014', style: 'Oldschool/Boom Bap' },
  { artist: 'Apache 207', track: 'Roller', year: '2019', style: 'Melodic Trap' },
];

const MasterGuide = () => {
  return (
    <div className="p-10 space-y-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter">
          Berlin Production <span className="text-accent-cyan">Workflow</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Professionelle Deutschrap-Produktionstechniken für Cubase 15 und iZotope Suite
        </p>
      </div>

      {/* Workflow Steps */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
          <span>🎯</span> Workflow Steps
        </h3>
        {WORKFLOW_STEPS.map((step, idx) => (
          <div
            key={idx}
            className="daw-panel p-6 flex gap-6 items-start hover:border-accent-cyan/50 transition-all cursor-pointer"
          >
            <div className="text-5xl">{step.icon}</div>
            <div className="flex-1">
              <h4 className={`font-bold text-accent-${step.color} text-lg mb-2`}>
                {step.title}
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Plugin Tips */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
          <span>🔌</span> Plugin Quick Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PLUGIN_TIPS.map((item, idx) => (
            <div key={idx} className={`daw-panel p-6 border-l-4 border-accent-${item.color}`}>
              <h4 className={`font-bold text-accent-${item.color} mb-4`}>
                {item.plugin}
              </h4>
              <ul className="space-y-2">
                {item.tips.map((tip, tipIdx) => (
                  <li key={tipIdx} className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="text-accent-cyan mt-0.5">▸</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Reference Tracks */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
          <span>🎧</span> Reference Tracks
        </h3>
        <div className="daw-panel p-6">
          <p className="text-sm text-slate-400 mb-4">
            Nutze diese Tracks als Referenz für deinen Mix. A/B-Vergleich ist essentiell!
          </p>
          <div className="space-y-2">
            {REFERENCE_TRACKS.map((track, idx) => (
              <div
                key={idx}
                className="bg-slate-900/50 p-4 rounded-lg flex justify-between items-center hover:bg-slate-900 transition-all"
              >
                <div>
                  <div className="font-bold text-white">
                    {track.artist} - {track.track}
                  </div>
                  <div className="text-xs text-slate-500">
                    {track.year} • {track.style}
                  </div>
                </div>
                <div className="text-2xl">🎵</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="daw-panel p-6 border-t-4 border-accent-cyan">
        <h3 className="text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-3 mb-4">
          <span>💡</span> Best Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="font-bold text-emerald-400">DO:</div>
            <ul className="space-y-1 text-slate-400">
              <li>✓ -18dB Headroom vor Mastering</li>
              <li>✓ Reference-Tracks nutzen</li>
              <li>✓ Breaks einlegen (Ohren ruhen lassen)</li>
              <li>✓ Mono-Check für Phase-Probleme</li>
              <li>✓ Low-Cut Filter auf ALLEN Spuren</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="font-bold text-red-400">DON'T:</div>
            <ul className="space-y-1 text-slate-400">
              <li>✗ Zu viel Kompression (Pumping)</li>
              <li>✗ Master-Bus über -0.1dB</li>
              <li>✗ EQ ohne A/B-Vergleich</li>
              <li>✗ Reverb ohne High-Cut</li>
              <li>✗ Tuning zu aggressiv (Robot-Effekt)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="text-center text-xs text-slate-500 space-y-2">
        <p>Mix Mentor AI v3.0 - Professional Deutschrap Production Assistant</p>
        <p>Powered by Claude AI • Built for Cubase 15 & iZotope Suite</p>
      </div>
    </div>
  );
};

export default MasterGuide;
