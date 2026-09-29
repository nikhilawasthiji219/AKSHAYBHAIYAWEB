import React from 'react';
import { useCMS } from '../lib/cmsStore';
import { useLanguage } from '../lib/languageContext';

export const RitualAccents: React.FC = () => {
  const { t } = useLanguage();
  const cms = useCMS();
  const whatsappNumber = cms.profile.contact.whatsappNumber;

  return (
    <>
      {/* Floating Animated Diya on Desktop & Tablet (hidden on mobile where MobileBottomBar handles chat) */}
      <a
        className="floating-diya hidden md:flex"
        href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
          t('नमस्ते आचार्य जी, मुझे उज्जैन में पूजा एवं अनुष्ठान के बारे में जानकारी चाहिए।', 'Namaste Acharya Ji, I want information about puja and anushthan in Ujjain.')
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
