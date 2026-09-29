import React from 'react';
import { SERVICES_DATA } from '../data/services';
import { VedicIcon } from './VedicIcon';
import { Service } from '../types';
import { useLanguage } from '../lib/languageContext';

interface ServicesGridProps {
  onSelectService: (service: Service) => void;
  onBookService: (service: Service) => void;
  onViewAll?: () => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  onSelectService,
  onBookService
}) => {
  const { t } = useLanguage();
  return (
    <section className="py-8 sm:py-12 bg-[#FFF8E8] relative" id="services">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading with decorative arrows */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3">
            <span className="text-[#C89B3C] text-lg select-none">❧</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#4A170C] tracking-wide">
              हमारी प्रमुख सेवाएं
            </h2>
            <span className="text-[#C89B3C] text-lg select-none">☙</span>
          </div>
        </div>

        {/* Main Grid + Special Anushthan Side Card exactly as in mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

          {/* 14 Services Grid — 2-col on Android for 48px+ tap targets, 7-col on desktop */}
          <div className="stagger lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 sm:gap-3">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                onClick={() => onSelectService(service)}
                className="reveal bg-[#FFFDF7] rounded-2xl border border-[#C89B3C]/35 p-3 py-4 min-h-[118px] flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#C94F08] hover:shadow-md active:scale-[0.98] transition-all duration-200 sm:aspect-[1/1.1] group"
              >
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-[#B24505] group-hover:scale-110 transition-transform mb-1.5">
                  <VedicIcon type={service.iconType} className="w-7 h-7 text-[#C94F08]" />
                </div>
                <h4 className="font-serif font-bold text-[13px] leading-snug text-[#3B1D0B] group-hover:text-[#C94F08]">
                  {service.title}
                </h4>
              </div>
            ))}
          </div>

          {/* Right: Special Anushthan Card (3 columns on desktop) */}
          <div className="reveal lg:col-span-3 bg-[#FFFDF7] rounded-2xl border border-[#C89B3C]/50 p-5 flex flex-col justify-between text-center shadow-sm">
            <div className="space-y-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#FFF4DC] border border-[#C89B3C]/40 flex items-center justify-center text-[#C94F08] mx-auto">
                <VedicIcon type="lotus" className="w-6 h-6 text-[#C94F08]" />
              </div>
              <h3 className="text-base font-bold font-serif text-[#641E12] leading-snug">
                Special Anushthan<br />/ Custom Puja
              </h3>
              <p className="text-xs font-serif text-[#2B2118]/80 leading-relaxed">
                {t('यजमान अपनी आवश्यकता एवं संकल्प के अनुसार विशेष पूजन या अनुष्ठान के लिए संपर्क करें', 'Yajman should contact for special puja or anushthan according to their need and Sankalp')}
              </p>
            </div>

            <div className="pt-4 pb-1">
              <button
                onClick={() => onBookService(SERVICES_DATA[0])}
                className="cta-shimmer w-full py-3 px-3 min-h-[48px] rounded-xl bg-[#D9610B] hover:bg-[#B84904] active:bg-[#B84904] text-white font-serif text-sm font-bold shadow-xs transition-all tracking-wide"
              >
                {t('Contact for Custom Puja', 'Contact for Custom Puja')}
              </button>
            </div>
          </div>

        </div>

        {/* Subtitle bottom notice exactly as in mockup */}
        <div className="mt-6 text-center">
          <p className="text-xs font-serif text-[#4A170C] font-medium">
            {t('अन्य पूजन एवं संस्कार भी वैदिक परंपराओं एवं शास्त्रोक्त विधि-विधान के अनुसार संपन्न कराए जाते हैं।', 'Other pujas and sanskars are also performed according to Vedic traditions and scriptural methods.')}
          </p>
        </div>

      </div>
    </section>
  );
};
