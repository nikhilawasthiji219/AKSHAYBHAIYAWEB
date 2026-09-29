import React from 'react';
import { SERVICES_DATA } from '../data/services';
import { Service } from '../types';
import { VedicIcon } from '../components/VedicIcon';

interface ServicesPageProps {
  onSelectService: (service: Service) => void;
  onBookService: (service: Service) => void;
  onNavigate?: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onSelectService,
  onBookService
}) => {
  return (
    <div className="bg-[#FFF8E8] min-h-screen">
      
      {/* Top Scenic Banner: Exact panoramic temple skyline from the middle mockup */}
      <div className="relative w-full h-44 sm:h-52 md:h-60 overflow-hidden flex items-center justify-center border-b border-[#C89B3C]/30">
        <img
          src="/photos/mahakal_temple_banner.jpg"
          alt="श्री महाकालेश्वर मंदिर उज्जैन"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-10 text-center space-y-1.5 bg-[#FFF8E8]/85 backdrop-blur-xs px-8 py-3 rounded-2xl border border-[#C89B3C]/40 shadow-sm">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#4A170C]">
            हमारी सेवाएं
          </h1>
          <p className="text-xs sm:text-sm font-serif text-[#641E12]">
            वैदिक परंपराओं एवं शास्त्रोक्त विधि-विधान से पूजन, संस्कार एवं धार्मिक अनुष्ठान
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* 14 Services Grid (7x2 on desktop) */}
        <div className="stagger grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5 sm:gap-3">
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

        {/* Special Anushthan Banner: Exact gold banner from middle mockup */}
        <div className="reveal bg-[#FFF8DE] rounded-2xl border border-[#C89B3C]/50 p-6 sm:p-8 text-center space-y-3 shadow-sm relative overflow-hidden">
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none hidden md:block">
            <VedicIcon type="lotus" className="w-32 h-32 text-[#C89B3C]" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#4A170C]">
            Special Anushthan / Custom Puja
          </h3>
          <p className="text-xs sm:text-sm font-serif text-[#3B1D0B]/80 max-w-xl mx-auto">
            यजमान अपनी आवश्यकता एवं संकल्प के अनुसार विशेष पूजन या अनुष्ठान के लिए संपर्क करें
          </p>
          <div className="pt-2">
            <button
              onClick={() => onBookService(SERVICES_DATA[0])}
              className="px-6 py-2.5 rounded-full bg-[#D9610B] hover:bg-[#B84904] text-white font-serif font-bold text-xs shadow-xs tracking-wide"
            >
              अपने विशेष पूजन/अनुष्ठान के लिए संपर्क करें
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
