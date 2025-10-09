import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Play, Pause } from 'lucide-react';

interface YouTubeEmbedProps {
  videoId: string;
  autoplay?: boolean;
  title?: string;
  className?: string;
  language?: string;
}

// Extend Window interface for YouTube IFrame API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ 
  videoId, 
  autoplay = false, 
  title = "YouTube video player",
  className = "",
  language = "en"
}) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showDateOverlay, setShowDateOverlay] = useState(false);
  const overlayShownRef = useRef(false);
  const intervalRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimeoutRef = useRef<number | null>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Initialize player when API is ready
    const initPlayer = () => {
      if (window.YT && window.YT.Player && containerRef.current) {
        // Build player parameters - DISABLE YouTube controls
        const playerVars: any = {
          controls: 0,  // Disable YouTube controls - we'll use our own
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1,
          fs: 0,  // Disable fullscreen button
          iv_load_policy: 3,  // Disable annotations
        };

        if (autoplay) {
          playerVars.autoplay = 1;
          playerVars.mute = 1;
        }

        if (language === 'es') {
          playerVars.cc_lang_pref = 'es';
          playerVars.cc_load_policy = 1;
          playerVars.hl = 'es';
        }

        playerRef.current = new window.YT.Player(`youtube-player-${videoId}`, {
          videoId: videoId,
          playerVars: playerVars,
          events: {
            onStateChange: onPlayerStateChange,
            onReady: (event: any) => {
              setIsPlayerReady(true);
              if (autoplay) {
                event.target.playVideo();
                setIsPlaying(true);
              }
            },
          },
        });
      }
    };

    // Monitor video time for overlay
    const onPlayerStateChange = (event: any) => {
      // Update playing state
      if (event.data === window.YT.PlayerState.PLAYING) {
        setIsPlaying(true);
        
        // Clear any existing interval
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        intervalRef.current = window.setInterval(() => {
          if (playerRef.current && playerRef.current.getCurrentTime) {
            const currentTime = playerRef.current.getCurrentTime();
            
            // Reset the flag if we've seeked back before the trigger point
            if (currentTime < 16.5 && overlayShownRef.current) {
              overlayShownRef.current = false;
            }
            
            // Show overlay between 16.5 and 21 seconds (at 17 seconds) - ONLY for campaign video
            if (currentTime >= 16.5 && currentTime <= 21 && !overlayShownRef.current && videoId === 'rkbzBksGn2o') {
              setShowDateOverlay(true);
              overlayShownRef.current = true;
              
              // Auto-hide after 4 seconds
              setTimeout(() => {
                setShowDateOverlay(false);
              }, 4000);
            }
            
            // Reset flag after passing the 21 second mark so it can show again on replay
            if (currentTime > 21 && overlayShownRef.current) {
              overlayShownRef.current = false;
            }
          }
        }, 100);
      } else if (event.data === window.YT.PlayerState.PAUSED) {
        setIsPlaying(false);
        // Clear interval when video is paused
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else if (event.data === window.YT.PlayerState.ENDED) {
        setIsPlaying(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      // Restore body scroll on cleanup
      document.body.style.overflow = '';
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, autoplay, language]);

  // Custom control handlers
  const togglePlay = () => {
    if (playerRef.current && isPlayerReady) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    
    // Clear existing timeout
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    
    // Hide controls after 3 seconds of no movement (only when playing)
    if (isPlaying) {
      hideControlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  return (
    <div 
      className={`relative w-full ${className}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <div className="aspect-video relative">
        <div 
          id={`youtube-player-${videoId}`}
          className="absolute inset-0 w-full h-full rounded-lg"
        />
        
        {/* Custom Controls Overlay */}
        <div 
          className={`absolute inset-0 transition-opacity duration-300 ${
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ pointerEvents: showControls || !isPlaying ? 'auto' : 'none' }}
        >
          {/* Center Play/Pause Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              disabled={!isPlayerReady}
              className={`w-20 h-20 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                !isPlayerReady ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-10 h-10 text-white" fill="currentColor" />
              ) : (
                <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
              )}
            </button>
          </div>
        </div>
        
        {/* Date Correction Overlay */}
        {showDateOverlay && (
          <div 
            className="absolute inset-0 flex items-end justify-center pointer-events-none pb-20"
            style={{ zIndex: 100 }}
          >
            <div className="bg-red-600 text-white px-6 py-4 rounded-lg shadow-2xl border-4 border-white animate-bounce mx-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 flex-shrink-0" />
                <div>
                  <div className="font-bold text-lg">NEW DATE</div>
                  <div className="text-xl font-black">Friday, October 17</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeEmbed;
