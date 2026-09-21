import React from 'react';
import { Home, Sparkles, MessageCircle, PhoneCall } from 'lucide-react';
import { ACHARYA_PROFILE } from '../data/acharya';

interface MobileBottomBarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ currentPath, onNavigate }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-cream-light/95 backdrop-blur-md border-t-2 border-gold/40 shadow-2xl py-2 px-3 flex items-center justify-around md:hidden">
      <button
        onClick={() => {
          onNavigate('/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center text-xs font-medium ${
          currentPath === '/' ? 'text-saffron-dark font-bold' : 'text-charcoal hover:text-saffron'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span>होम</span>
      </button>

      <button
        onClick={() => {
          onNavigate('/services');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center text-xs font-medium ${
          currentPath === '/services' ? 'text-saffron-dark font-bold' : 'text-charcoal hover:text-saffron'
        }`}
      >
        <Sparkles className="w-5 h-5 mb-0.5" />
        <span>सेवाएँ</span>
      </button>

      <a
        href={`https://wa.me/91${ACHARYA_PROFILE.contact.whatsappNumber}?text=${encodeURIComponent(
          'प्रणाम शास्त्री जी, मैं उज्जैन में वैदिक पूजन/अनुष्ठान के लिए जानकारी प्राप्त करना चाहता हूँ।'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300 shadow-sm"
      >
        <MessageCircle className="w-5 h-5 mb-0.5 text-emerald-600" />
        <span>WhatsApp</span>
      </a>

      <button
        onClick={() => {
          onNavigate('/contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center text-xs font-medium ${
          currentPath === '/contact' ? 'text-saffron-dark font-bold' : 'text-charcoal hover:text-saffron'
        }`}
      >
        <PhoneCall className="w-5 h-5 mb-0.5" />
        <span>संपर्क</span>
      </button>
    </div>
  );
};
