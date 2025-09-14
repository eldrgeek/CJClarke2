import React from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  autoplay?: boolean;
  title?: string;
  className?: string;
  language?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ 
  videoId, 
  autoplay = false, 
  title = "YouTube video player",
  className = "",
  language = "en"
}) => {
  // Convert YouTube URL to embed format with language support for captions
  const params = new URLSearchParams();
  if (autoplay) {
    params.append('autoplay', '1');
    params.append('mute', '1');
  }
  // Add language parameters for Spanish subtitles
  if (language === 'es') {
    params.append('cc_lang_pref', 'es');
    params.append('cc_load_policy', '1'); // Force captions to be shown
    params.append('hl', 'es'); // Interface language
  }
  
  const queryString = params.toString();
  const embedUrl = `https://www.youtube.com/embed/${videoId}${queryString ? `?${queryString}` : ''}`;

  return (
    <div className={`relative w-full ${className}`}>
      <div className="aspect-video">
        <iframe
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default YouTubeEmbed;
