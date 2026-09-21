import React from 'react';
import { SERVICES_DATA } from '../data/services';
import { VedicIcon } from './VedicIcon';
import { Service } from '../types';

interface ServicesGridProps {
  onSelectService: (service: Service) => void;
  onBookService: (service: Service) => void;
  onViewAll?: () => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  onSelectService,
  onBookService
}) => {
  return (
    <section className="py-12 bg-[#FFF8E8] relative" id="services">
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
          
          {/* 14 Services Grid (9 columns on desktop: 7 columns x 2 rows) */}
          <div className="stagger lg:col-span-9 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5 sm:gap-3">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                onClick={() => onSelectService(service)}
                className="reveal bg-[#FFFDF7] rounded-xl border border-[#C89B3C]/35 p-3 py-5 sm:py-3 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#C94F08] hover:shadow-md transition-all duration-200 sm:aspect-[1/1.1] group"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#B24505] group-hover:scale-110 transition-transform mb-1.5">
                  <VedicIcon type={service.iconType} className="w-7 h-7 text-[#C94F08]" />
                </div>
                <h4 className="font-serif font-bold text-xs text-[#3B1D0B] leading-tight group-hover:text-[#C94F08]">
                  {service.title}
                </h4>
              </div>
            ))}
          </div>

          {/* Right: Special Anushthan Card (3 columns on desktop) */}
          <div className="reveal lg:col-span-3 bg-[#FFFDF7] rounded-xl border border-[#C89B3C]/50 p-5 flex flex-col justify-between text-center shadow-sm">
            <div className="space-y-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#FFF4DC] border border-[#C89B3C]/40 flex items-center justify-center text-[#C94F08] mx-auto">
                <VedicIcon type="lotus" className="w-6 h-6 text-[#C94F08]" />
              </div>
              <h3 className="text-base font-bold font-serif text-[#641E12] leading-snug">
                Special Anushthan<br />/ Custom Puja
              </h3>
              <p className="text-xs font-serif text-[#2B2118]/80 leading-relaxed">
                यजमान अपनी आवश्यकता एवं संकल्प के अनुसार विशेष पूजन या अनुष्ठान के लिए संपर्क करें
              </p>
            </div>

            <div className="pt-4 pb-1">
              <button
                onClick={() => onBookService(SERVICES_DATA[0])}
                className="cta-shimmer w-full py-2 px-3 rounded-md bg-[#D9610B] hover:bg-[#B84904] text-white font-serif text-xs font-bold shadow-xs transition-all tracking-wide"
              >
                Contact for Custom Puja
              </button>
            </div>
          </div>

        </div>

        {/* Subtitle bottom notice exactly as in mockup */}
        <div className="mt-6 text-center">
          <p className="text-xs font-serif text-[#4A170C] font-medium">
            अन्य पूजन एवं संस्कार भी वैदिक परंपराओं एवं शास्त्रोक्त विधि-विधान के अनुसार संपन्न कराए जाते हैं।
          </p>
        </div>

      </div>
    </section>
  );
};
