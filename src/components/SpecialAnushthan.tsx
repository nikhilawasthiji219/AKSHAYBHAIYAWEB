import React from 'react';
import { Sparkles, MessageCircle, CalendarCheck } from 'lucide-react';
import { ACHARYA_PROFILE } from '../data/acharya';

interface SpecialAnushthanProps {
  onContactClick: () => void;
}

export const SpecialAnushthan: React.FC<SpecialAnushthanProps> = ({ onContactClick }) => {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 special-anushthan-bg text-cream-light overflow-hidden border-y-2 border-gold/40">
      
      {/* Background Sacred Geometric Silhouette */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full border-4 border-gold/30 flex items-center justify-center">
          <div className="w-[450px] h-[450px] rounded-full border-2 border-saffron/40 flex items-center justify-center">
            <span className="text-[180px] font-serif text-gold-light select-none">ॐ</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron/20 border border-gold-light/40 text-gold-light text-xs sm:text-sm font-serif">
          <Sparkles className="w-4 h-4 text-gold-light" />
          <span>संकल्पबद्ध अनुष्ठान एवं विशेष वैदिक यज्ञ</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-gold-light tracking-wide">
          Special Anushthan / Custom Puja
        </h2>

        {/* Decorative divider */}
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>

        {/* Text */}
        <p className="text-lg sm:text-xl md:text-2xl font-serif text-cream leading-relaxed max-w-3xl mx-auto">
          "यजमान अपनी आवश्यकता एवं संकल्प के अनुसार विशेष पूजन या अनुष्ठान के लिए संपर्क कर सकते हैं।"
        </p>

        <p className="text-sm font-sans text-cream-light/80 max-w-2xl mx-auto leading-relaxed">
          प्रत्येक परिवार, जातक और कुल की परंपरा तथा ग्रह स्थिति भिन्न होती है। आचार्य जी से प्रत्यक्ष विमर्श कर अपने अभीष्ट मनोरथ (संतान, विवाह, व्यापार, रोग निवारण या गृह प्रतिष्ठा) के अनुरूप विशेष विधि-विधान तय करें।
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left max-w-3xl mx-auto">
          <div className="bg-black/30 border border-gold/30 rounded-lg p-4 backdrop-blur-sm">
            <h4 className="font-serif font-bold text-gold-light text-sm">शास्त्रोक्त संकल्प</h4>
            <p className="text-xs text-cream/80 mt-1">गोत्र, नाम एवं विशेष मनोरथ के साथ वैदिक ब्राह्मणों द्वारा अनुष्ठान।</p>
          </div>
          <div className="bg-black/30 border border-gold/30 rounded-lg p-4 backdrop-blur-sm">
            <h4 className="font-serif font-bold text-gold-light text-sm">पवित्र तीर्थ क्षेत्र</h4>
            <p className="text-xs text-cream/80 mt-1">महाकाल धाम, मंगलनाथ, सिद्धवट अथवा रामघाट क्षिप्रा तट पर संपन्न।</p>
          </div>
          <div className="bg-black/30 border border-gold/30 rounded-lg p-4 backdrop-blur-sm">
            <h4 className="font-serif font-bold text-gold-light text-sm">शुद्ध वैदिक सामग्रियां</h4>
            <p className="text-xs text-cream/80 mt-1">शास्त्रसम्मत समिधा, हविष्य, पंचामृत एवं औषधियों का उपयोग।</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onContactClick}
            className="cta-shimmer w-full sm:w-auto px-8 py-4 rounded-lg bg-saffron hover:bg-saffron-light text-white font-serif font-bold text-base shadow-saffron-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <CalendarCheck className="w-5 h-5" />
            <span>अपने विशेष पूजन/अनुष्ठान के लिए संपर्क करें</span>
          </button>

          <a
            href={`https://wa.me/91${ACHARYA_PROFILE.contact.whatsappNumber}?text=${encodeURIComponent(
              'प्रणाम शास्त्री जी, मैं अपने विशेष संकल्प/पूजन (Custom Anushthan) के संबंध में मार्गदर्शन चाहता हूँ।'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-serif font-bold text-base border border-emerald-400 shadow-md transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5 text-white" />
            <span>WhatsApp पर सीधी चर्चा करें</span>
          </a>
        </div>

      </div>
    </section>
  );
};
