import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const AddStream = ({ onAdd, streamCount, maxStreams }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalUrl = url.trim();
    if (finalUrl && streamCount < maxStreams) {
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = 'https://' + finalUrl;
      }
      onAdd(finalUrl);
      setUrl('');
    }
  };

  const isMaxReached = streamCount >= maxStreams;

  return (
    <form onSubmit={handleSubmit} className="add-stream-form">
      <input
        type="text"
        className="input-field"
        placeholder={isMaxReached ? "Max 8 streams reached" : "Paste YouTube or Twitch URL..."}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={isMaxReached}
      />
      <button 
        type="submit" 
        className="button-primary"
        disabled={isMaxReached || !url.trim()}
      >
        <Plus size={18} />
        <span>Add</span>
      </button>
    </form>
  );
};

export default AddStream;
