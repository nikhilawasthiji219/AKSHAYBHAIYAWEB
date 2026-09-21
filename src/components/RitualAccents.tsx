import React from 'react';
import { ACHARYA_PROFILE } from '../data/acharya';

export const RitualAccents: React.FC = () => {
  return (
    <>
      {/* Floating Animated Diya with Live WhatsApp Pulse */}
      <a
        className="floating-diya"
        href={`https://wa.me/91${ACHARYA_PROFILE.contact.whatsappNumber}?text=${encodeURIComponent(
          'नमस्ते आचार्य जी, मुझे उज्जैन में पूजा एवं अनुष्ठान के बारे में जानकारी चाहिए।'
        )}`}
        target="_blank"
        rel="noreferrer"
        aria-label="चैट सहायक खोलें"
      >
        <span className="diya-flame" />
        <span className="diya-bowl" />
        <span className="diya-chat-hint">चैट</span>
      </a>

      {/* Floating Vedic Petals Orbit (Subtle decorative animations) */}
      <div className="flower-orbit flower-orbit-left" aria-hidden="true">
        <span>✿</span>
        <span>✽</span>
        <span>✿</span>
      </div>
      <div className="flower-orbit flower-orbit-right" aria-hidden="true">
        <span>✽</span>
        <span>✿</span>
        <span>✽</span>
      </div>
    </>
  );
};
