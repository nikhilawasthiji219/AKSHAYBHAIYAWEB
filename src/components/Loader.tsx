import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onFinish: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [mantraIndex, setMantraIndex] = useState(0);

  const MANTRA = 'श्री महाकालेश्वराय नमः';

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    let value = 0;
    const interval = window.setInterval(() => {
      value += Math.floor(Math.random() * 7) + 3;
      if (value >= 100) {
        value = 100;
        window.clearInterval(interval);
        window.setTimeout(() => setHidden(true), 600);
        window.setTimeout(onFinish, 1500);
      }
      setProgress(value);
    }, 110);

    // Cycle through mantra characters for a "revealing" effect
    let charIdx = 0;
    const mantraInterval = window.setInterval(() => {
      setMantraIndex((prev) => (prev + 1) % MANTRA.length);
      charIdx += 1;
      if (charIdx >= MANTRA.length * 2) {
        window.clearInterval(mantraInterval);
      }
    }, 120);

    return () => {
      document.body.style.overflow = '';
      window.clearInterval(interval);
    };
  }, [onFinish]);

  const revealedMantra = MANTRA.slice(0, mantraIndex + 1);

  return (
    <div
      className={`loader-screen ${hidden ? 'loader-hidden' : ''}`}
      id="loader"
      role="status"
      aria-label="पृष्ठ लोड हो रहा है"
    >
      {/* Sacred background glow */}
      <div className="loader-bg-glow" />
      <div className="loader-bg-glow loader-bg-glow-2" />

      {/* Mandala pattern (subtle) */}
      <div className="loader-mandala" />

      <div className="loader-center">
        {/* Outer sacred ring */}
        <div className="loader-ring loader-ring-outer" />
        <div className="loader-ring loader-ring-inner" />

        {/* Central Om symbol */}
        <div className="loader-om">
          <span className="loader-om-char">ॐ</span>
        </div>

        {/* Progress ring (circular) */}
        <div className="loader-progress-wrap">
          <svg
            className="loader-progress-svg"
            viewBox="0 0 100 100"
          >
            <circle
              className="loader-progress-track"
              cx="50"
              cy="50"
              r="42"
              stroke="rgba(200, 155, 60, 0.15)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              className="loader-progress-fill"
              cx="50"
              cy="50"
              r="42"
              stroke="var(--saffron, #E87512)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              style={{
                strokeDasharray: '264',
                strokeDashoffset: 264 - (264 * progress) / 100,
                transition: 'stroke-dashoffset 0.3s ease',
              }}
            />
          </svg>
          <span className="loader-progress-text">{progress}%</span>
        </div>
      </div>

      <div className="loader-footer">
        <div className="loader-mantra">
          <span className="loader-mantra-revealed">{revealedMantra}</span>
          <span className="loader-mantra-cursor">।</span>
        </div>
        <p className="loader-hint">
          शास्त्री अक्षय अवस्थी जी | उज्जैन
        </p>
      </div>
    </div>
  );
};
