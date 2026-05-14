import React from 'react';
import VideoPlayer from './VideoPlayer';
import { MonitorPlay } from 'lucide-react';

const VideoGrid = ({ streams, activeAudioId, onToggleMute, onRemove }) => {
  if (streams.length === 0) {
    return (
      <div className="empty-state">
        <MonitorPlay className="empty-state-icon" />
        <h2>No streams added yet</h2>
        <p>Paste a YouTube or Twitch link above to start watching</p>
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
