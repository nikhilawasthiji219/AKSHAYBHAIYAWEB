import React from 'react';
import { ContactSection } from '../components/ContactSection';

import { ACHARYA_PROFILE } from '../data/acharya';

export const ContactPage: React.FC = () => {
  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Contact Banner Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-saffron uppercase tracking-widest font-serif">
            ॥ श्री महाकालेश्वर शरणम् ॥
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-maroon">
            पूजन एवं अनुष्ठान संपर्क
          </h1>
          <p className="text-base sm:text-lg font-serif text-saffron-dark font-medium">
            {ACHARYA_PROFILE.title} — उज्जैन तीर्थ क्षेत्र
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
          <p className="text-xs sm:text-sm text-charcoal/80 font-sans">
            नीचे दिए गए प्रपत्र (Form) अथवा सीधी कॉल/WhatsApp के माध्यम से आचार्य जी से परामर्श प्राप्त करें।
          </p>
        </div>

        {/* Embedded Contact Component */}
        <ContactSection />

      </div>
    </div>
  );
};
