import React from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  autoplay?: boolean;
  title?: string;
  className?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ 
  videoId, 
  autoplay = false, 
  title = "YouTube video player",
  className = ""
}) => {
  // Convert YouTube URL to embed format
  const embedUrl = `https://www.youtube.com/embed/${videoId}${autoplay ? '?autoplay=1&mute=1' : ''}`;

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
