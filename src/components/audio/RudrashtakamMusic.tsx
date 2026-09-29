import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';

interface RudrashtakamMusicProps {
  className?: string;
}

export const RudrashtakamMusic: React.FC<RudrashtakamMusicProps> = ({
  className,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Check if user has previously interacted (saved in localStorage)
  const [userInteracted, setUserInteracted] = useState<boolean>(false);

  // Audio element setup
  useEffect(() => {
    const audio = new Audio('/audio/rudrashtakam.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.3;

    audioRef.current = audio;

    // Try to autoplay immediately
    const tryAutoPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setUserInteracted(true);
        localStorage.setItem('rudrashtakam_music_state', 'playing');
        localStorage.setItem('rudrashtakam_user_interacted', 'true');
      } catch (error) {
        // Browser blocked autoplay - user needs to interact first
        setUserInteracted(true); // Mark as interacted so we don't keep trying
        // Show UI for user to play
      }
    };

    // Try autoplay immediately
    tryAutoPlay().catch(() => {
      // Autoplay failed, user will need to tap/click
    });

    // Handle play/pause events
    const handlePlay = () => {
      setIsPlaying(true);
      try {
        localStorage.setItem('rudrashtakam_music_state', 'playing');
      } catch {}
    };

    const handlePause = () => {
      setIsPlaying(false);
      try {
        localStorage.setItem('rudrashtakam_music_state', 'paused');
      } catch {}
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Also listen for user interactions (clicks, taps, key presses) globally
    const handleUserInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        // Don't autoplay again, let user control
      }
    };

    const anchors = document.querySelectorAll('a');
    anchors.forEach((a) => a.addEventListener('click', handleUserInteraction));

    const buttons = document.querySelectorAll('button');
    buttons.forEach((b) => b.addEventListener('click', handleUserInteraction));

    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach((i) => i.addEventListener('focus', handleUserInteraction));

    // Keyboard events
    window.addEventListener('keydown', handleUserInteraction);

    // Touch events
    window.addEventListener('touchstart', handleUserInteraction);
    window.addEventListener('mousedown', handleUserInteraction);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      anchors.forEach((a) => a.removeEventListener('click', handleUserInteraction));
      buttons.forEach((b) => b.removeEventListener('click', handleUserInteraction));
      inputs.forEach((i) => i.removeEventListener('focus', handleUserInteraction));
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('mousedown', handleUserInteraction);
    };
  }, []);

  // Check saved state from localStorage on mount (if user already interacted)
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('rudrashtakam_music_state');
      const userInteractedStr = localStorage.getItem('rudrashtakam_user_interacted');
      
      if (userInteractedStr === 'true') {
        setUserInteracted(true);
      }
      
      if (savedState === 'playing' && userInteracted) {
        setIsPlaying(true);
        if (audioRef.current) {
          audioRef.current.play().catch(() => {
            // Browser may still block
          });
        }
      } else if (savedState === 'paused' && userInteracted) {
        setIsPlaying(false);
        if (audioRef.current) {
          audioRef.current.pause();
        }
      }
    } catch {}
  }, [userInteracted]);

  // Save state when toggling
  useEffect(() => {
    try {
      if (isPlaying) {
        localStorage.setItem('rudrashtakam_music_state', 'playing');
      } else {
        localStorage.setItem('rudrashtakam_music_state', 'paused');
      }
    } catch {}
  }, [isPlaying]);

  // Pause on visibility change (tab hidden)
  useEffect(() => {
    if (!isPlaying) return;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPlaying(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  // Pause when gallery video is playing
  useEffect(() => {
    const handleVideoPlay = () => {
      if (isPlaying) {
        setIsPlaying(false);
      }
    };
    window.addEventListener('gallery-video-play', handleVideoPlay);
    return () => {
      window.removeEventListener('gallery-video-play', handleVideoPlay);
    };
  }, [isPlaying]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMusic();
      }
    };
    const element = buttonRef.current;
    if (element) {
      element.addEventListener('keydown', handleKeyDown);
      return () => {
        element.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);

  // Try/catch wrapper for play/pa use
  const toggleMusic = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      try {
        if (next && audioRef.current) {
          audioRef.current.play().catch(() => {
            // Browser blocked playback - keep paused
          });
        } else if (!next && audioRef.current) {
          audioRef.current.pause();
        }
      } catch {
        // Ignore errors
      }
      return next;
    });
  };

  // Button click handler
  const handleClick = () => {
    toggleMusic();
  };

  // Check prefers-reduced-motion
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      ref={buttonRef}
      className={`fixed bottom-0 left-2 z-40 ${className || ''} ${
        reducedMotion ? 'transition-none' : ''
      }`}
      aria-label="Toggle background music"
      aria-pressed={isPlaying}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleMusic();
        }
      }}
    >
      <div className="relative group w-10 h-10 rounded-full bg-[#FFF8EA] border border-[#C9A24A] transition-colors hover:bg-[#FFF3D6] group-hover:shadow-xs">
        {isPlaying ? (
          <Moon className="w-5 h-5 text-[#C94F08] group-hover:text-gray-600 transition-colors" aria-hidden="true" />
        ) : (
          <Sun className="w-5 h-5 text-[#C94F08] group-hover:text-gray-600 transition-colors" aria-hidden="true" />
        )}
        <span className="absolute bottom-1.5 right-1.5 text-xs text-[#854805] font-serif font-bold group-hover:translate-y-[-2.5] transition-transform">
          {isPlaying ? 'रुको' : 'रुद्राष्टकम'}
        </span>
      </div>
    </div>
  );
};