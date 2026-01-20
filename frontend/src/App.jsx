import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StudioSuite from './components/StudioSuite';
import MasterGuide from './components/MasterGuide';
import TransportBar from './components/TransportBar';
import { AudioProvider } from './hooks/useAudio';
import { APIProvider } from './hooks/useAPI';

function App() {
  const [view, setView] = useState('dashboard');
  const [style, setStyle] = useState('aggro');
  const [vocalType, setVocalType] = useState('main');

  return (
    <APIProvider>
      <AudioProvider>
        <div className="h-screen flex flex-col">
          <Header view={view} setView={setView} />

          <div className="flex flex-1 overflow-hidden">
            <Sidebar
              style={style}
              setStyle={setStyle}
              vocalType={vocalType}
              setVocalType={setVocalType}
            />

            <main className="flex-1 overflow-y-auto">
              {view === 'dashboard' && <Dashboard style={style} />}
              {view === 'studio' && <StudioSuite style={style} vocalType={vocalType} />}
              {view === 'guide' && <MasterGuide />}
            </main>
          </div>

          <TransportBar />
        </div>
      </AudioProvider>
    </APIProvider>
  );
}

export default App;
