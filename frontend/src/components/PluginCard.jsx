import React from 'react';

const PluginCard = ({ plugin }) => {
  const { slot, name, parameters = {}, description = '' } = plugin;

  // Extract plugin vendor and name
  const getPluginInfo = (fullName) => {
    const parts = fullName.split(' ');
    const vendor = parts[0];
    const pluginName = parts.slice(1).join(' ');
    return { vendor, pluginName };
  };

  const { vendor, pluginName } = getPluginInfo(name);

  // Get color based on vendor
  const getVendorColor = (vendor) => {
    const colors = {
      'iZotope': 'emerald',
      'FabFilter': 'cyan',
      'Auto-Tune': 'purple',
      'Valhalla': 'pink',
      'UAD': 'orange',
      'Waves': 'blue',
      'Slate': 'red',
    };
    return colors[vendor] || 'slate';
  };

  const color = getVendorColor(vendor);

  return (
    <div className="vst-card p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className={`text-xs font-bold text-accent-${color} uppercase tracking-widest`}>
            Slot {slot} • {vendor}
          </div>
          <h3 className="text-xl font-black text-white mt-1">
            {pluginName}
          </h3>
        </div>
        <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-2xl">
          🎛️
        </div>
      </div>

      {/* Parameters */}
      {Object.keys(parameters).length > 0 && (
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Parameters
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(parameters).slice(0, 6).map(([param, data]) => (
              <div key={param} className="bg-slate-900/50 p-3 rounded-lg">
                <div className="text-[9px] text-slate-500 uppercase mb-1">
                  {param}
                </div>
                <div className="text-sm font-bold text-white font-mono">
                  {data.value}{data.unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="bg-black/30 p-4 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-400 leading-relaxed">
            {description.substring(0, 200)}
            {description.length > 200 && '...'}
          </div>
        </div>
      )}
    </div>
  );
};

export default PluginCard;
