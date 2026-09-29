import React, { useEffect, useRef, useState } from 'react';

interface LoaderProps {
  onFinish: () => void;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
}

export const Loader: React.FC<LoaderProps> = ({ onFinish }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.body.style.overflow = 'hidden';

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d') ?? null;
    let raf = 0;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const particles: Particle[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight + window.innerHeight,
      radius: Math.random() * 2.5 + 1,
      speed: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.7 + 0.3,
    }));

    const animateParticles = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(234, 88, 12, ${p.opacity})`;
        ctx.fill();
        p.y -= p.speed;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      });
      raf = requestAnimationFrame(animateParticles);
    };

    if (!reduced && canvas && ctx) {
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      animateParticles();
    }

    const handleMouseMove = (e: MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;
      const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
      const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
      card.style.transform = `rotateY(${xRatio * 22}deg) rotateX(${-yRatio * 22}deg)`;
    };
    if (!reduced && window.matchMedia('(hover: hover)').matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    let value = 0;
    const interval = window.setInterval(() => {
      value += Math.floor(Math.random() * 8) + 3;
      if (value >= 100) {
        value = 100;
        window.clearInterval(interval);
        window.setTimeout(() => setHidden(true), 500);
        window.setTimeout(onFinish, 1400);
      }
      setProgress(value);
    }, 100);

    return () => {
      document.body.style.overflow = '';
      window.clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [onFinish]);

  const handleBeadTap = () => {
    const ripple = rippleRef.current;
    if (!ripple) return;
    ripple.classList.remove('ripple-active');
    void ripple.offsetWidth;
    ripple.classList.add('ripple-active');
    if (navigator.vibrate) navigator.vibrate(40);
  };

  return (
    <div className={`loader-screen ${hidden ? 'loader-hidden' : ''}`} id="loader">
      <canvas ref={canvasRef} className="loader-canvas" />

      <div className="spiritual-card" ref={cardRef}>
        <div className="glow-halo" />
        <div className="ring-outer" />
        <div className="ring-middle" />
        <div className="ripple-ring" ref={rippleRef} />

        <button
          type="button"
          className="rudraksha-center"
          onClick={handleBeadTap}
          aria-label="आशीर्वाद हेतु मध्य मणि स्पर्श करें"
        >
          <span className="bead-om" aria-hidden="true">ॐ</span>
        </button>
      </div>

      <div className="loader-footer">
        <div className="loading-title">पावन स्थल</div>
        <p className="hint-text">आशीर्वाद हेतु मध्य मणि स्पर्श करें</p>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-counter">{progress}%</div>
      </div>
    </div>
  );
};
