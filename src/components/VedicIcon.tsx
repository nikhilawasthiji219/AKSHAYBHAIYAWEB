import React from 'react';

interface VedicIconProps {
  type: string;
  className?: string;
}

export const VedicIcon: React.FC<VedicIconProps> = ({ type, className = "w-6 h-6 text-gold" }) => {
  switch (type) {
    case 'trishul':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Trishul trident */}
          <path d="M12 2v20" />
          <path d="M7 4c0 4 2 8 5 8s5-4 5-8" />
          <path d="M7 4V2" />
          <path d="M17 4V2" />
          <path d="M9 17h6" />
          <path d="M10 20h4" />
        </svg>
      );
    case 'shivaling':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Shivalinga */}
          <path d="M8 9a4 4 0 0 1 8 0v5H8V9z" />
          <path d="M4 16h16a2 2 0 0 1-2 3H6a2 2 0 0 1-2-3z" />
          <path d="M3 16c3 0 5-2 5-2" />
          <path d="M2 19h20" />
          <circle cx="12" cy="7" r="1" fill="currentColor" />
        </svg>
      );
    case 'havan':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Havan kund */}
          <path d="M4 14l3 7h10l3-7H4z" />
          <path d="M2 14h20" />
          {/* Sacred Flames */}
          <path d="M12 3c-1.5 2-2.5 3.5-1 6 1.5-2.5 3-1.5 1-6z" fill="currentColor" fillOpacity="0.2" />
          <path d="M8 8c-.5 1.5-.5 3 1.5 4" />
          <path d="M16 8c.5 1.5.5 3-1.5 4" />
        </svg>
      );
    case 'kalash':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Purna Kalash */}
          <path d="M8 10a4 4 0 0 0-3 4c0 3 3 6 7 6s7-3 7-6a4 4 0 0 0-3-4" />
          <path d="M9 10h6" />
          <path d="M10 8h4" />
          {/* Coconut & Mango leaves */}
          <path d="M12 2a3 3 0 0 1 3 4c-1 1-2 2-3 2s-2-1-3-2a3 3 0 0 1 3-4z" />
          <path d="M7 7l3 2" />
          <path d="M17 7l-3 2" />
        </svg>
      );
    case 'swastik':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Sacred Swastik */}
          <path d="M12 4v16" />
          <path d="M4 12h16" />
          <path d="M12 4h6" />
          <path d="M12 20H6" />
          <path d="M4 12V6" />
          <path d="M20 12v6" />
          <circle cx="8" cy="8" r="0.75" fill="currentColor" />
          <circle cx="16" cy="8" r="0.75" fill="currentColor" />
          <circle cx="8" cy="16" r="0.75" fill="currentColor" />
          <circle cx="16" cy="16" r="0.75" fill="currentColor" />
        </svg>
      );
    case 'lotus':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Sacred Lotus */}
          <path d="M12 4c1.5 3 3 6 3 9 0 3-3 5-3 5s-3-2-3-5c0-3 1.5-6 3-9z" />
          <path d="M12 18c3 0 7-1.5 8-6-2 0-4.5 1-6 4" />
          <path d="M12 18c-3 0-7-1.5-8-6 2 0 4.5 1 6 4" />
          <path d="M3 18c3 2 6 2 9 2s6 0 9-2" />
        </svg>
      );
    case 'serpent':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Nag / Serpent for Kalsarp */}
          <path d="M12 3a4 4 0 0 1 4 4c0 3-2 5-4 7s-3 3-1 6c1 1.5 3 1.5 5 0" />
          <path d="M8 8c1-1 2-1 4-1" />
          <circle cx="14" cy="5" r="0.75" fill="currentColor" />
        </svg>
      );
    case 'dhyan':
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Dhyan Mudra / Meditative peace */}
          <circle cx="12" cy="7" r="3" />
          <path d="M5 21c0-4 3.5-7 7-7s7 3 7 7" />
          <path d="M9 17h6" />
        </svg>
      );
  }
};
