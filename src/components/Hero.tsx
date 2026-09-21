import React from 'react';
import { MapPin, Sparkles, Phone, CalendarCheck } from 'lucide-react';
import { ACHARYA_PROFILE } from '../data/acharya';

interface HeroProps {
  onNavigate: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden bg-[#FFF8E8] border-b border-[#C89B3C]/30">
      <div className="relative w-full overflow-hidden min-h-[520px] lg:min-h-[580px] flex items-center">
        
        {/* 1. AI-Generated Holy Ujjain Ghats & Temple Sunrise Background */}
        <img
          src="/images/hero_ai_bg.jpg"
          alt="श्री महाकालेश्वर तीर्थ, उज्जैन - पावन क्षिप्रा तट एवं प्राचीन मंदिर"
          className="kenburns absolute inset-0 w-full h-full object-cover object-[center_35%]"
        />

        {/* 2. Delicate Atmospheric Lighting & Readability Gradients */}
        {/* Desktop Left-to-Right Soft Warm Parchment Gradient */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#FFF9ED]/95 via-[#FFF9ED]/85 to-transparent w-3/5 lg:w-1/2 pointer-events-none" />
        
        {/* Mobile Full-Cover Soft Gradient for complete text clarity */}
        <div className="block md:hidden absolute inset-0 bg-gradient-to-b from-[#FFF9ED]/95 via-[#FFF9ED]/85 to-[#FFF9ED]/90 pointer-events-none" />

        {/* Bottom subtle blend into following page sections */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#FFF8E8] to-transparent pointer-events-none" />

        {/* 3. Main Hero Content Layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* Left Column: Authentic Credentials, Title & CTAs */}
            <div className="max-w-xl space-y-4 sm:space-y-5 text-left order-2 md:order-1">
              
              {/* Sacred Invocation Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF3D6] border border-[#C89B3C]/60 shadow-xs">
                <span className="text-[#D9610B] text-xs">ॐ</span>
                <span className="text-xs font-serif font-bold text-[#54230E] tracking-wider">
                  ॥ श्री महाकालेश्वराय नमः ॥
                </span>
                <span className="text-[#D9610B] text-xs">ॐ</span>
              </div>

              {/* Acharya Heading & Subtitle */}
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold font-serif text-[#3B1D0B] leading-tight tracking-wide drop-shadow-xs">
                  {ACHARYA_PROFILE.name}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl font-serif text-[#8E2800] font-semibold mt-1 flex items-center gap-2">
                  <span>{ACHARYA_PROFILE.title}</span>
                </p>
              </div>

              {/* Tagline enclosed in delicate ornamental pill box */}
              <div className="bg-[#FFFDF8]/90 backdrop-blur-sm border border-[#C89B3C]/45 rounded-2xl px-5 py-3 shadow-xs">
                <p className="text-xs sm:text-sm md:text-[15px] font-serif text-[#2B2118] font-medium leading-relaxed">
                  वैदिक परंपराओं एवं शास्त्रोक्त विधि-विधान से<br className="hidden sm:inline" />
                  पूजन, संस्कार एवं धार्मिक अनुष्ठान
                </p>
              </div>

              {/* Verified Badges: Experience & Qualification */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-[13px] font-serif">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF3E0] border border-[#D4AF37]/50 text-[#4A2411] font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#D9610B]" />
                  15+ वर्षों का शास्त्रोक्त अनुभव
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF3E0] border border-[#D4AF37]/50 text-[#4A2411] font-semibold">
                  शास्त्री (व्याकरण) • आचार्य (संस्कृत)
                </span>
              </div>

              {/* Location Badge */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-serif text-[#3B1D0B] font-bold">
                <div className="w-6 h-6 rounded-full bg-[#E87512] flex items-center justify-center text-white shadow-xs shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>{ACHARYA_PROFILE.contact.postalLocation}</span>
              </div>

              {/* Services Availability Banner from reference video */}
              <div className="pt-1">
                <p className="text-xs sm:text-sm font-serif font-medium text-[#7D2918] italic">
                  Our services are available both online and offline.
                </p>
              </div>

              {/* Call-to-Action Buttons matching reference video */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('/contact')}
                  className="cta-shimmer inline-flex items-center gap-2 bg-[#9A1B1E] hover:bg-[#7E1417] text-white px-7 py-3 rounded-full font-serif font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 tracking-wide"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Contact Us (संपर्क करें)</span>
                </button>

                <button
                  onClick={() => onNavigate('/services')}
                  className="inline-flex items-center gap-2 bg-[#1F1F1F] hover:bg-[#333333] text-white border border-[#444] px-6 py-3 rounded-full font-serif font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 tracking-wide"
                >
                  <span>View All Services</span>
                  <span>➔</span>
                </button>

                <a
                  href={`tel:${ACHARYA_PROFILE.contact.primaryPhone}`}
                  className="inline-flex items-center gap-2 bg-[#FFFDF8] hover:bg-[#FAF1D9] text-[#54230E] border border-[#C89B3C] px-4 py-3 rounded-full font-serif font-bold text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D9610B]" />
                  <span>+91 {ACHARYA_PROFILE.contact.primaryPhone}</span>
                </a>
              </div>

            </div>

            {/* Right Column: User's Acharya Ji Photograph with Sacred Radiance */}
            <div className="relative flex justify-center items-end order-1 md:order-2 shrink-0">
              
              {/* Subtle Golden Spiritual Radiance / Aura behind Acharya Ji */}
              <div className="absolute inset-0 m-auto w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-tr from-[#E87512]/25 via-[#F7A028]/20 to-transparent blur-2xl -z-10 pointer-events-none" />

              {/* Acharya Ji Cutout Image */}
              <div className="relative group">
                <img
                  src="/images/acharya_hero.png"
                  alt="शास्त्री अक्षय अवस्थी जी — वैदिक कर्मकांड एवं धार्मिक अनुष्ठान आचार्य, उज्जैन"
                  className="h-[340px] sm:h-[420px] md:h-[470px] lg:h-[530px] w-auto object-contain drop-shadow-[0_12px_24px_rgba(43,20,5,0.35)] transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                />
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
