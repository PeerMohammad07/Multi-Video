import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
import AddStream from './components/AddStream';
import VideoGrid from './components/VideoGrid';
import { initGA, logPageView, logEvent } from './analytics';
import './App.css';

function App() {
  const [streams, setStreams] = useState(() => {
    const saved = localStorage.getItem('multistream_videos');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeAudioId, setActiveAudioId] = useState(() => {
    const saved = localStorage.getItem('multistream_active_audio');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  useEffect(() => {
    localStorage.setItem('multistream_videos', JSON.stringify(streams));
  }, [streams]);

  useEffect(() => {
    localStorage.setItem('multistream_active_audio', JSON.stringify(activeAudioId));
  }, [activeAudioId]);
  
  const MAX_STREAMS = 8;

  const handleAddStream = (url) => {
    if (streams.length >= MAX_STREAMS) return;

    const newStream = {
      id: Date.now().toString(),
      url: url,
    };

    setStreams(prev => [...prev, newStream]);
    logEvent("Stream", "Add", url);
    
    // We intentionally do NOT set activeAudioId here. 
    // Browsers block autoplaying unmuted videos, so it's best to start muted.
  };

  const handleRemoveStream = (id) => {
    setStreams(prev => prev.filter(stream => stream.id !== id));
    logEvent("Stream", "Remove");
    
    // If we removed the stream with active audio, pick another one or set to null
    if (activeAudioId === id) {
      const remaining = streams.filter(stream => stream.id !== id);
      setActiveAudioId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const handleToggleMute = (id) => {
    // If clicking the currently unmuted stream, mute it. Otherwise, unmute the clicked one and mute others.
    setActiveAudioId(prevId => {
      const isMuting = prevId === id;
      logEvent("Stream", isMuting ? "Mute" : "Unmute");
      return isMuting ? null : id;
    });
  };

  return (
    <div className="app-container">
      <div className="top-bar">
        <AddStream 
          onAdd={handleAddStream} 
          streamCount={streams.length} 
          maxStreams={MAX_STREAMS} 
        />
      </div>

      <main className="main-content">
        <VideoGrid 
          streams={streams}
          activeAudioId={activeAudioId}
          onToggleMute={handleToggleMute}
          onRemove={handleRemoveStream}
        />
      </main>
    </div>
  );
}

export default App;
