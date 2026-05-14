import React, { useState } from 'react';
import ReactPlayerYouTube from 'react-player/youtube';
import ReactPlayerTwitch from 'react-player/twitch';
import ReactPlayerGeneric from 'react-player';
import { Volume2, VolumeX, Trash2, AlertCircle, Loader } from 'lucide-react';

const VideoPlayer = ({ stream, isUnmuted, onToggleMute, onRemove }) => {
  const [status, setStatus] = useState('loading'); // 'loading', 'ready', 'error'
  
  const isYouTube = stream.url.includes('youtube.com') || stream.url.includes('youtu.be');
  const isTwitch = stream.url.includes('twitch.tv');
  
  const PlayerComponent = isYouTube ? ReactPlayerYouTube : (isTwitch ? ReactPlayerTwitch : ReactPlayerGeneric);

  return (
    <div className={`player-wrapper ${isUnmuted ? 'active-audio' : ''}`}>
      <PlayerComponent
        url={stream.url}
        className="react-player"
        width="100%"
        height="100%"
        playing={true}
        muted={!isUnmuted}
        controls={true}
        volume={isUnmuted ? 1 : 0}
        onReady={() => setStatus('ready')}
        onError={(e) => {
          console.error("VideoPlayer Error:", e);
          setStatus('error');
        }}
        config={{
          youtube: {
            playerVars: { autoplay: 1 }
          },
          twitch: {
            options: { 
              autoplay: true, 
              parent: ['localhost', '127.0.0.1'] 
            }
          }
        }}
      />

      {/* Status Overlays */}
      {status === 'loading' && (
        <div className="status-overlay">
          <Loader size={24} className="spinner" />
        </div>
      )}
      
      {status === 'error' && (
        <div className="status-overlay">
          <div className="error-box">
            <AlertCircle size={24} style={{ margin: '0 auto 0.5rem auto' }} />
            <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Failed to Load</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Unsupported URL or Adblocker</div>
          </div>
        </div>
      )}
      
      {/* Sleek Corner Controls */}
      <div className="corner-controls">
        <button 
          className={`control-btn ${isUnmuted ? 'active' : ''}`} 
          onClick={() => onToggleMute(stream.id)}
          title={isUnmuted ? "Mute" : "Unmute"}
        >
          {isUnmuted ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
        
        <button 
          className="control-btn danger" 
          onClick={() => onRemove(stream.id)}
          title="Remove video"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
