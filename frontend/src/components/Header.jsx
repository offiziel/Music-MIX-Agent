import React from 'react';

const Header = ({ view, setView }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'studio', label: 'Studio Suite' },
    { id: 'guide', label: 'Master Guide' }
  ];

  return (
    <header className="h-16 border-b border-slate-800 bg-daw-header flex items-center justify-between px-8">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-black text-white tracking-tighter uppercase">
          Mix Mentor <span className="text-accent-cyan">v3.0</span>
        </h1>

        <nav className="flex gap-4 h-16 text-[10px] font-bold uppercase tracking-widest">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`px-4 transition-all ${
                view === tab.id
                  ? 'active-tab'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider">
        STATUS: PRODUCER_READY_2026
      </div>
    </header>
  );
};

export default Header;
