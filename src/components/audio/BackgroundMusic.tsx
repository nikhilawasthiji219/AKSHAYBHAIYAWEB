import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * BackgroundMusic
 * ─────────────────────────────────────────────────────────────────────────────
 * Autoplay strategy (browsers block audio without user interaction):
 *
 *  1. Try to play IMMEDIATELY on mount — works on repeat visitors whose
 *     browser has a high "Media Engagement Index" for the site.
 *  2. If blocked, attach ONE-TIME listeners to EVERY possible first-gesture
 *     event (click, touchstart, scroll, mousemove, keydown) so music starts
 *     on the very first thing the user does.
 *  3. After started, remove all gesture listeners to avoid duplicate calls.
 *
 * Audio file: public/audio/background.mp3
 */

const AUDIO_SRC = '/audio/background.mp3';
const LS_KEY    = 'bg_music_muted';
const VOLUME    = 0.28;

export const BackgroundMusic: React.FC = () => {
  const audioRef   = useRef<HTMLAudioElement | null>(null);
  const fadeRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedRef = useRef(false); // ref so gesture listeners can read it

  const savedMuted = () => {
    try { return localStorage.getItem(LS_KEY) === 'true'; } catch { return false; }
  };

  const [muted,   setMuted]   = useState<boolean>(savedMuted);
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(false);

  /* ── fade helper ─────────────────────────────────────────────────────── */
  const clearFade = () => {
    if (fadeRef.current) { clearInterval(fadeRef.current); fadeRef.current = null; }
  };

  const fadeTo = useCallback((target: number, onDone?: () => void) => {
    clearFade();
    const audio = audioRef.current;
    if (!audio) return;
    const step = target > audio.volume ? 0.015 : -0.015;
    fadeRef.current = setInterval(() => {
      const a = audioRef.current;
      if (!a) { clearFade(); return; }
      const next = a.volume + step;
      if ((step > 0 && next >= target) || (step < 0 && next <= target)) {
        a.volume = Math.max(0, Math.min(1, target));
        clearFade();
        if (target === 0) a.pause();
        onDone?.();
      } else {
        a.volume = Math.max(0, Math.min(1, next));
      }
    }, 40);
  }, []);

  /* ── core play function ──────────────────────────────────────────────── */
  const startMusic = useCallback(() => {
    if (startedRef.current) return;
    const audio = audioRef.current;
    if (!audio) return;

    // Read muted state directly from localStorage to avoid stale closure
    const isMuted = localStorage.getItem(LS_KEY) === 'true';
    if (isMuted) return;

    audio.volume = 0;
    audio.play()
      .then(() => {
        startedRef.current = true;
        setStarted(true);
        fadeTo(VOLUME);
      })
      .catch(() => {
        // Still blocked — gesture listeners will retry
      });
  }, [fadeTo]);

  /* ── gesture listener cleanup ref ───────────────────────────────────── */
  const gestureCleanupRef = useRef<(() => void) | null>(null);

  /* ── mount ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop    = true;
    audio.preload = 'auto';
    audio.volume  = 0;
    audioRef.current = audio;

    // Show button after slight delay
    const t = setTimeout(() => setVisible(true), 600);

    // Attempt 1: direct autoplay
    startMusic();

    // Attempt 2: attach listeners for first gesture (covers autoplay-blocked case)
    const onGesture = () => {
      startMusic();
      // Once played, remove all gesture listeners
      if (startedRef.current) {
        gestureCleanupRef.current?.();
      }
    };

    const events = ['click', 'touchstart', 'touchend', 'scroll', 'mousemove', 'keydown', 'pointerdown'];
    events.forEach(ev => window.addEventListener(ev, onGesture, { passive: true }));

    const cleanup = () => {
      events.forEach(ev => window.removeEventListener(ev, onGesture));
    };
    gestureCleanupRef.current = cleanup;

    return () => {
      clearTimeout(t);
      clearFade();
      cleanup();
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── tab visibility: pause when hidden, resume when shown ───────────── */
  useEffect(() => {
    const handle = () => {
      const audio = audioRef.current;
      if (!audio || muted) return;
      if (document.hidden) {
        fadeTo(0);
      } else if (startedRef.current) {
        audio.volume = 0;
        audio.play().catch(() => {});
        fadeTo(VOLUME);
      }
    };
    document.addEventListener('visibilitychange', handle);
    return () => document.removeEventListener('visibilitychange', handle);
  }, [muted, fadeTo]);

  /* ── mute / unmute toggle ────────────────────────────────────────────── */
  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setMuted(prev => {
      const next = !prev;
      try { localStorage.setItem(LS_KEY, String(next)); } catch {}
      if (next) {
        fadeTo(0);
      } else {
        audio.volume = 0;
        audio.play().catch(() => {});
        fadeTo(VOLUME);
        startedRef.current = true;
        setStarted(true);
      }
      return next;
    });
  }, [fadeTo]);

  return (
    <button
      onClick={toggle}
      aria-label={muted ? 'संगीत चालू करें' : 'संगीत बंद करें'}
      title={muted ? 'संगीत चालू करें' : 'संगीत बंद करें'}
      className={`
        fixed bottom-[4.5rem] md:bottom-5 left-3 z-50
        flex items-center gap-1.5 px-2.5 py-1.5 rounded-full
        bg-[#FFF8E8]/92 border border-[#C89B3C]/60
        shadow-md shadow-[#3B1D0B]/20 backdrop-blur-sm
        hover:bg-[#FFF3D6] hover:border-[#C94F08]/70 hover:shadow-lg
        active:scale-95 select-none
        transition-all duration-700 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      style={{ fontFamily: 'serif' }}
    >
      {/* Icon */}
      {muted ? (
        <VolumeX className="w-4 h-4 text-[#7D2918] shrink-0" />
      ) : (
        <Volume2
          className={`w-4 h-4 text-[#C94F08] shrink-0 ${
            started ? '[animation:pulse_2s_ease-in-out_infinite]' : ''
          }`}
        />
      )}

      {/* Hindi label */}
      <span className="text-[10px] font-bold text-[#4A170C] leading-none">
        {muted ? 'संगीत' : 'बज रहा'}
      </span>

      {/* Om accent */}
      <span className="text-[11px] text-[#C89B3C] leading-none">ॐ</span>
    </button>
  );
};
