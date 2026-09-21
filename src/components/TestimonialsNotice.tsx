import React from 'react';
import { MessageSquareHeart, ShieldCheck } from 'lucide-react';

export const TestimonialsNotice: React.FC = () => {
  return (
    <section className="py-12 bg-cream-light border-y border-gold/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        
        <div className="w-12 h-12 rounded-full bg-cream border border-gold flex items-center justify-center text-saffron mx-auto">
          <MessageSquareHeart className="w-6 h-6" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold font-serif text-maroon">
          यजमान अनुभव एवं समीक्षा
        </h3>

        <div className="bg-cream p-6 rounded-xl border border-gold/40 shadow-sm max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-saffron-dark font-serif text-sm font-semibold mb-2">
            <ShieldCheck className="w-4 h-4 text-saffron" />
            <span>सत्यता एवं प्रामाणिकता का संकल्प</span>
          </div>
          <p className="text-base sm:text-lg font-serif text-charcoal/90 italic">
            "यजमानों के वास्तविक अनुभव शीघ्र जोड़े जाएंगे।"
          </p>
          <p className="text-xs text-charcoal/60 font-sans mt-3">
            हम किसी भी प्रकार की कृत्रिम या असत्यापित समीक्षाओं को प्रकाशित नहीं करते हैं। आगामी दिनों में अनुष्ठान संपन्न करा चुके यजमानों के अधिकृत अनुभव यहाँ साझा किए जाएंगे।
          </p>
        </div>

      </div>
    </section>
  );
};
