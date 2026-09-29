import React from 'react';
import { Home, Sparkles, MessageCircle, PhoneCall } from 'lucide-react';
import { ACHARYA_PROFILE } from '../data/acharya';
import { useLanguage } from '../lib/languageContext';

interface MobileBottomBarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ currentPath, onNavigate }) => {
  const { t, lang } = useLanguage();

  return (
    <nav
      aria-label={t('मोबाइल नेविगेशन', 'Mobile Navigation')}
      className="fixed bottom-0 left-0 right-0 z-50 bg-cream-light/95 backdrop-blur-md border-t-2 border-gold/40 shadow-2xl px-3 pt-2 flex items-stretch justify-around md:hidden"
      style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <button
        onClick={() => {
          onNavigate('/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center min-w-[64px] min-h-[56px] px-2 rounded-xl text-xs font-medium ${
          currentPath === '/' ? 'text-saffron-dark font-bold' : 'text-charcoal hover:text-saffron'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span>{t('होम', 'Home')}</span>
      </button>

      <button
        onClick={() => {
          onNavigate('/services');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center min-w-[64px] min-h-[56px] px-2 rounded-xl text-xs font-medium ${
          currentPath === '/services' ? 'text-saffron-dark font-bold' : 'text-charcoal hover:text-saffron'
        }`}
      >
        <Sparkles className="w-5 h-5 mb-0.5" />
        <span>{t('सेवाएँ', 'Services')}</span>
      </button>

      <a
        href={`https://wa.me/91${ACHARYA_PROFILE.contact.whatsappNumber}?text=${encodeURIComponent(
          lang === 'hi'
            ? 'प्रणाम शास्त्री जी, मैं उज्जैन में वैदिक पूजन/अनुष्ठान के लिए जानकारी प्राप्त करना चाहता हूँ।'
            : 'Pranam Shastri Ji, I want to enquire about Vedic Puja/Anushthan in Ujjain.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center min-w-[72px] min-h-[56px] text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-300 shadow-sm"
      >
        <MessageCircle className="w-5 h-5 mb-0.5 text-emerald-600" />
        <span>WhatsApp</span>
      </a>

      <button
        onClick={() => {
          onNavigate('/contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center min-w-[64px] min-h-[56px] px-2 rounded-xl text-xs font-medium ${
          currentPath === '/contact' ? 'text-saffron-dark font-bold' : 'text-charcoal hover:text-saffron'
        }`}
      >
        <PhoneCall className="w-5 h-5 mb-0.5" />
        <span>{t('संपर्क', 'Contact')}</span>
      </button>
    </nav>
  );
};
