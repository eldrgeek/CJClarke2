import React, { useState } from 'react';
import { Play } from 'lucide-react';
import YouTubeEmbed from './YouTubeEmbed';

interface YouTubeFacadeProps {
  videoId: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
  language?: string;
}

const YouTubeFacade: React.FC<YouTubeFacadeProps> = ({ 
  videoId, 
  title = "YouTube video player",
  className = "",
  autoplay = false,
  language = "en"
}) => {
  const [isLoaded, setIsLoaded] = useState(autoplay); // If autoplay is true, load immediately
  
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  
  const handleLoadVideo = () => {
    setIsLoaded(true);
  };

  if (isLoaded) {
    return (
      <YouTubeEmbed 
        videoId={videoId}
        autoplay={autoplay}
        title={title}
        className={className}
        language={language}
      />
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <div className="aspect-video relative cursor-pointer group" onClick={handleLoadVideo}>
        {/* Thumbnail Image */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-200 rounded-lg" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-red-600 hover:bg-red-700 transition-colors duration-200 rounded-full p-4 shadow-lg group-hover:scale-110 transform transition-transform duration-200">
            <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
          </div>
        </div>
        
        {/* YouTube Logo */}
        <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 rounded text-white text-sm font-semibold">
          YouTube
        </div>
        
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
          <h3 className="text-white font-semibold text-sm line-clamp-2">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default YouTubeFacade;
