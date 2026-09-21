import React from 'react';
import { ACHARYA_PROFILE } from '../data/acharya';
import { TrustStrip } from '../components/TrustStrip';
import { ArrowRight, Phone } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#FFF8E8] min-h-screen">
      
      {/* Top Panoramic Temple Banner with 'आचार्य परिचय' matching mockup top center */}
      <div className="relative w-full h-40 sm:h-48 md:h-56 overflow-hidden flex items-center justify-center border-b border-[#C89B3C]/30">
        <img
          src="/photos/acharya_mahakal_temple.jpeg"
          alt="आचार्य परिचय पृष्ठभूमि"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-10 text-center space-y-1 bg-[#FFF8E8]/75 backdrop-blur-xs px-8 py-3 rounded-2xl border border-[#C89B3C]/40 shadow-sm">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#4A170C] tracking-wide">
            आचार्य परिचय
          </h1>
          <p className="text-xs sm:text-sm font-serif text-[#C94F08]">
            ॥ वैदिक कर्मकांड एवं धार्मिक अनुष्ठान आचार्य ॥
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Main Card: Oval framed portrait + Credentials exactly as in mockup top-center */}
        <div className="bg-[#FFFDF7] rounded-2xl border border-[#C89B3C]/40 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Framed Portrait */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-56 h-64 rounded-2xl overflow-hidden border-4 border-[#C89B3C] shadow-md bg-stone-100">
                <img
                  src="/photos/acharya_hero_saffron.jpeg"
                  alt={ACHARYA_PROFILE.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Right: Info Lines with Indian Line Icons */}
            <div className="md:col-span-7 space-y-4 text-left">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#3B1D0B]">
                  {ACHARYA_PROFILE.name}
                </h2>
                <p className="text-sm sm:text-base font-serif text-[#641E12] font-semibold mt-0.5">
                  {ACHARYA_PROFILE.title}
                </p>
              </div>

              {/* Verified Line Items matching mockup */}
              <div className="space-y-3 pt-2 text-xs sm:text-sm font-serif">
                
                {/* Education */}
                <div className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full bg-[#FFF4DC] border border-[#C89B3C]/40 flex items-center justify-center text-[#B24505] text-xs flex-shrink-0 mt-0.5">
                    🔱
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <strong className="text-[#3B1D0B] min-w-16">शिक्षा</strong>
                    <span className="text-[#2B2118]">शास्त्री — व्याकरण | आचार्य — संस्कृत</span>
                  </div>
                </div>

                {/* Experience */}
                <div className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full bg-[#FFF4DC] border border-[#C89B3C]/40 flex items-center justify-center text-[#B24505] text-xs flex-shrink-0 mt-0.5">
                    ☸
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <strong className="text-[#3B1D0B] min-w-16">अनुभव</strong>
                    <span className="text-[#2B2118]">15+ वर्ष</span>
                  </div>
                </div>

                {/* Expertise */}
                <div className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full bg-[#FFF4DC] border border-[#C89B3C]/40 flex items-center justify-center text-[#B24505] text-xs flex-shrink-0 mt-0.5">
                    🕉
                  </span>
                  <div className="flex flex-col gap-1">
                    <strong className="text-[#3B1D0B]">विशेषज्ञता</strong>
                    <p className="text-xs sm:text-sm text-[#2B2118]/90 leading-relaxed">
                      वैदिक कर्मकांड, धार्मिक अनुष्ठान, दुर्गा अर्चन, महारुद्र प्रयोग, नवचंडी, शतचंडी यज्ञ, रुद्राभिषेक, महामृत्युंजय जाप, नवग्रह शांति, मंगल पूजन, प्राण प्रतिष्ठा एवं विभिन्न वैदिक संस्कार।
                    </p>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('/contact')}
                  className="px-5 py-2.5 rounded-lg bg-[#D9610B] hover:bg-[#B84904] text-white font-serif font-bold text-xs shadow-xs flex items-center gap-1.5"
                >
                  <span>पूजन परामर्श हेतु संपर्क करें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`tel:${ACHARYA_PROFILE.contact.primaryPhone}`}
                  className="px-4 py-2.5 rounded-lg bg-[#FFF4DC] border border-[#C89B3C]/50 text-[#3B1D0B] font-serif font-bold text-xs flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C94F08]" />
                  <span>+91 {ACHARYA_PROFILE.contact.primaryPhone}</span>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Sacred Quote banner exactly as in mockup */}
        <div className="text-center py-4">
          <p className="text-base sm:text-lg font-serif italic text-[#641E12]">
            ❧ "वेदों के प्रकाश से, धर्म के मार्ग पर..." ☙
          </p>
        </div>

        {/* 3-Card Trust Strip under about */}
        <TrustStrip />

      </div>

    </div>
  );
};
