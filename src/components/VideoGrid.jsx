import React from 'react';
import VideoPlayer from './VideoPlayer';
import { MonitorPlay } from 'lucide-react';

const VideoGrid = ({ streams, activeAudioId, onToggleMute, onRemove }) => {
  if (streams.length === 0) {
    return (
      <div className="empty-state">
        <div className="css-animation-container">
          <div className="anim-grid">
            <div className="anim-item anim-1"><MonitorPlay size={32} strokeWidth={1.5} /></div>
            <div className="anim-item anim-2"><MonitorPlay size={32} strokeWidth={1.5} /></div>
            <div className="anim-item anim-3"><MonitorPlay size={32} strokeWidth={1.5} /></div>
            <div className="anim-item anim-4"><MonitorPlay size={32} strokeWidth={1.5} /></div>
          </div>
          <div className="anim-glow"></div>
        </div>
        <h2 className="empty-state-title">Ready to Multistream</h2>
        <p className="empty-state-subtitle">Paste a YouTube, Twitch, or direct video link above to build your ultimate viewing grid.</p>
      </div>
    );
  }

  // Determine grid class based on number of streams
  const gridClass = `grid-${streams.length}`;

  return (
    <div className={`video-grid ${gridClass}`}>
      {streams.map(stream => (
        <VideoPlayer
          key={stream.id}
          stream={stream}
          isUnmuted={stream.id === activeAudioId}
          onToggleMute={onToggleMute}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
