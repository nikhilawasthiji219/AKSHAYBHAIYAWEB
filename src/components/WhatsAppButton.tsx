import React from 'react';
import { MessageCircle } from 'lucide-react';
import { ACHARYA_PROFILE } from '../data/acharya';

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href={`https://wa.me/91${ACHARYA_PROFILE.contact.whatsappNumber}?text=${encodeURIComponent(
        'प्रणाम शास्त्री जी, मैं उज्जैन में वैदिक पूजन/अनुष्ठान के लिए परामर्श व बुकिंग हेतु संपर्क कर रहा हूँ।'
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white/80 group"
      aria-label="Contact on WhatsApp"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full"></span>
      </div>
      <span className="text-sm font-sans tracking-wide">WhatsApp परामर्श</span>
    </a>
  );
};
