import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const RadarChartComponent = ({ data, color = '#22D3EE' }) => {
  // Transform data for Recharts
  const chartData = [
    { parameter: 'Air', value: data.air || 0, fullMark: 100 },
    { parameter: 'Crunch', value: data.crunch || 0, fullMark: 100 },
    { parameter: 'Squeeze', value: data.squeeze || 0, fullMark: 100 },
    { parameter: 'Space', value: data.space || 0, fullMark: 100 },
    { parameter: 'Width', value: data.width || 0, fullMark: 100 },
    { parameter: 'Tuning', value: data.tuning || 0, fullMark: 100 },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis
            dataKey="parameter"
            tick={{ fill: '#94A3B8', fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#64748B', fontSize: 9 }}
          />
          <Radar
            name="Parameters"
            dataKey="value"
            stroke={color}
            fill={color}
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Parameter Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-[10px]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="text-slate-400">
            <span className="font-bold text-white">Air:</span> High-Freq Content
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-400" />
          <span className="text-slate-400">
            <span className="font-bold text-white">Crunch:</span> Saturation
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <span className="text-slate-400">
            <span className="font-bold text-white">Squeeze:</span> Compression
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <span className="text-slate-400">
            <span className="font-bold text-white">Space:</span> Reverb Depth
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-slate-400">
            <span className="font-bold text-white">Width:</span> Stereo Image
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-pink-400" />
          <span className="text-slate-400">
            <span className="font-bold text-white">Tuning:</span> Pitch Correction
          </span>
        </div>
      </div>
    </div>
  );
};

export default RadarChartComponent;
