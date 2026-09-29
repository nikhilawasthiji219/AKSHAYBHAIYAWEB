import React from 'react';
import { MapPin, Sparkles, Phone, CalendarCheck, ArrowRight } from 'lucide-react';
import { useCMS } from '../lib/cmsStore';
import { useLanguage } from '../lib/languageContext';

interface HeroProps {
  onNavigate: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const cms = useCMS();
  const profile = cms.profile;
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#FFF8E8] border-b border-[#C89B3C]/30">
      <div className="relative w-full overflow-hidden min-h-[500px] md:min-h-[560px] lg:min-h-[580px] flex items-center">
        
        {/* 1. Holy Ujjain Ghats & Temple Sunrise Background */}
        <img
          src="/images/hero_ai_bg.jpg"
          alt="श्री महाकालेश्वर तीर्थ, उज्जैन - पावन क्षिप्रा तट एवं प्राचीन मंदिर"
          className="kenburns absolute inset-0 w-full h-full object-cover object-[center_35%]"
        />

        {/* 2. Atmospheric Lighting & Readability Gradients */}
        {/* Desktop Left-to-Right Soft Warm Parchment Gradient */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#FFF9ED]/96 via-[#FFF9ED]/88 to-transparent w-3/5 lg:w-1/2 pointer-events-none" />
        
        {/* Mobile Full-Cover Soft Gradient for complete text clarity */}
        <div className="block md:hidden absolute inset-0 bg-gradient-to-b from-[#FFFDF7]/97 via-[#FFF9ED]/92 to-[#FFF8E8]/96 pointer-events-none" />

        {/* Bottom subtle blend into following page sections */}
        <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#FFF8E8] to-transparent pointer-events-none" />

        {/* 3. Main Hero Content Layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-10 w-full">
          
          {/* ========================================================= */}
          {/* MOBILE SPECIFIC HERO LAYOUT (Screen < md) */}
          {/* ========================================================= */}
          <div className="flex flex-col items-center text-center md:hidden space-y-3.5">
            
            {/* Sacred Invocation Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF3D6] border border-[#C89B3C]/60 shadow-2xs">
              <span className="text-[#D9610B] text-xs">ॐ</span>
              <span className="text-[11px] font-serif font-bold text-[#54230E] tracking-wider">
                ॥ श्री महाकालेश्वराय नमः ॥
              </span>
              <span className="text-[#D9610B] text-xs">ॐ</span>
            </div>

            {/* Acharya Ji Radiant Medallion Portrait on Mobile */}
            <div className="relative my-1">
              <div className="w-28 h-28 xs:w-32 xs:h-32 rounded-full p-1 bg-gradient-to-br from-[#D9610B] via-[#FFD978] to-[#9A1B1E] shadow-lg relative">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#FFF8E8] border-2 border-white">
                  <img
                    src="/images/acharya_hero.png"
                    alt={profile.name}
                    className="w-full h-full object-cover object-[center_top] scale-110"
                    loading="eager"
                  />
                </div>
                {/* Spiritual Tilak Accent Badge */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-[#9A1B1E] text-white text-[10px] font-serif font-bold px-2.5 py-0.5 rounded-full border border-white shadow-xs whitespace-nowrap">
                  उज्जैन तीर्थ
                </div>
              </div>
            </div>

            {/* Main Heading & Subtitle */}
            <div className="space-y-1">
              <h1 className="text-2xl xs:text-[26px] font-bold font-serif text-[#3B1D0B] leading-tight drop-shadow-xs">
                {profile.name}
              </h1>
              <p className="text-sm xs:text-[15px] font-serif text-[#8E2800] font-semibold leading-snug">
                {profile.title}
              </p>
            </div>

            {/* Verified Credentials Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-serif">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#FAF3E0] border border-[#D4AF37]/50 text-[#4A2411] font-semibold">
                <Sparkles className="w-3 h-3 text-[#D9610B]" />
                {profile.experienceYears} वर्षों का अनुभव
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#FAF3E0] border border-[#D4AF37]/50 text-[#4A2411] font-semibold">
                शास्त्री • आचार्य (संस्कृत)
              </span>
            </div>

            {/* Tagline */}
            <div className="bg-[#FFFDF8]/95 border border-[#C89B3C]/40 rounded-xl px-3.5 py-2 shadow-2xs max-w-sm">
              <p className="text-xs font-serif text-[#2B2118] leading-relaxed">
                {t('वैदिक परंपराओं एवं शास्त्रोक्त विधि-विधान से पूजन, संस्कार एवं धार्मिक अनुष्ठान', 'Vedic traditions and scriptural methods for puja, sanskar and religious rituals')}
              </p>
            </div>

            {/* Action Buttons: 2 Primary Columns + 1 Direct Call */}
            <div className="w-full max-w-sm pt-1 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onNavigate('/contact')}
                  className="cta-shimmer inline-flex items-center justify-center gap-1.5 bg-[#9A1B1E] active:bg-[#7E1417] text-white px-3 py-2.5 min-h-[44px] rounded-xl font-serif font-bold text-xs shadow-md tracking-wide"
                >
                  <CalendarCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>{t('पूजा बुक करें', 'Book Puja')}</span>
                </button>

                <button
                  onClick={() => onNavigate('/services')}
                  className="inline-flex items-center justify-center gap-1 bg-[#1F1F1F] active:bg-[#333333] text-white px-3 py-2.5 min-h-[44px] rounded-xl font-serif font-bold text-xs shadow-sm tracking-wide"
                >
                  <span>{t('सभी सेवाएँ', 'All Services')}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>

              <a
                href={`tel:${profile.contact.primaryPhone}`}
                className="inline-flex items-center justify-center gap-2 bg-[#FFFDF8] text-[#54230E] border border-[#C89B3C] w-full py-2.5 min-h-[44px] rounded-xl font-serif font-bold text-xs shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#D9610B] shrink-0" />
                <span>{t('कॉल करें: +91 ' + profile.contact.primaryPhone, 'Call: +91 ' + profile.contact.primaryPhone)}</span>
              </a>
            </div>

            {/* Online / Offline Availability Notice */}
            <p className="text-[11px] font-serif text-[#7D2918] font-medium pt-0.5">
              {t('✨ सेवाएँ ऑनलाइन एवं उज्जैन मंदिर में प्रत्यक्ष उपलब्ध हैं', '✨ Services available both online and offline at Ujjain temple')}
            </p>

          </div>

          {/* ========================================================= */}
          {/* DESKTOP & TABLET HERO LAYOUT (Screen >= md) */}
          {/* ========================================================= */}
          <div className="hidden md:flex items-center justify-between gap-8 lg:gap-12">
            
            {/* Left Column: Credentials, Heading & CTAs */}
            <div className="max-w-xl w-full space-y-5 text-left">
              
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
                <h1 className="text-4xl md:text-5xl lg:text-[48px] font-bold font-serif text-[#3B1D0B] tracking-wide drop-shadow-xs">
                  {profile.name}
                </h1>
                <p className="text-xl md:text-2xl font-serif text-[#8E2800] font-semibold mt-1.5 flex items-center gap-2">
                  <span>{profile.title}</span>
                </p>
              </div>

              {/* Tagline enclosed in delicate ornamental pill box */}
              <div className="bg-[#FFFDF8]/90 backdrop-blur-sm border border-[#C89B3C]/45 rounded-2xl px-5 py-3 shadow-xs">
                <p className="text-sm md:text-[15px] font-serif text-[#2B2118] font-medium leading-relaxed">
                  वैदिक परंपराओं एवं शास्त्रोक्त विधि-विधान से<br className="hidden sm:inline" />
                  पूजन, संस्कार एवं धार्मिक अनुष्ठान
                </p>
              </div>

              {/* Verified Badges: Experience & Qualification */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-[13px] font-serif">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF3E0] border border-[#D4AF37]/50 text-[#4A2411] font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#D9610B]" />
                  {profile.experienceYears} वर्षों का शास्त्रोक्त अनुभव
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF3E0] border border-[#D4AF37]/50 text-[#4A2411] font-semibold">
                  शास्त्री (व्याकरण) • आचार्य (संस्कृत)
                </span>
              </div>

              {/* Location Badge */}
              <div className="flex items-center gap-2 text-sm font-serif text-[#3B1D0B] font-bold">
                <div className="w-6 h-6 rounded-full bg-[#E87512] flex items-center justify-center text-white shadow-xs shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>{profile.contact.postalLocation}</span>
              </div>

              {/* Services Availability Banner */}
              <div className="pt-1">
                <p className="text-sm font-serif font-medium text-[#7D2918] italic">
                  Our services are available both online and offline in Ujjain.
                </p>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('/contact')}
                  className="cta-shimmer inline-flex items-center justify-center gap-2 bg-[#9A1B1E] hover:bg-[#7E1417] text-white px-6 py-3.5 min-h-[48px] rounded-xl font-serif font-bold text-base shadow-md hover:shadow-lg transition-all active:scale-[0.98] tracking-wide"
                >
                  <CalendarCheck className="w-4 h-4 shrink-0" />
                  <span>Contact Us (संपर्क करें)</span>
                </button>

                <button
                  onClick={() => onNavigate('/services')}
                  className="inline-flex items-center justify-center gap-2 bg-[#1F1F1F] hover:bg-[#333333] text-white border border-[#444] px-6 py-3.5 min-h-[48px] rounded-xl font-serif font-bold text-base shadow-sm hover:shadow-md transition-all active:scale-[0.98] tracking-wide"
                >
                  <span>View All Services</span>
                  <span aria-hidden="true">➔</span>
                </button>

                <a
                  href={`tel:${profile.contact.primaryPhone}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#FFFDF8] hover:bg-[#FAF1D9] text-[#54230E] border border-[#C89B3C] px-4 py-3 min-h-[48px] rounded-xl font-serif font-bold text-sm shadow-2xs hover:shadow-xs transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D9610B] shrink-0" />
                  <span>+91 {profile.contact.primaryPhone}</span>
                </a>
              </div>

            </div>

            {/* Right Column: User's Acharya Ji Photograph with Sacred Radiance */}
            <div className="relative flex justify-center items-end shrink-0">
              
              {/* Subtle Golden Spiritual Radiance / Aura behind Acharya Ji */}
              <div className="absolute inset-0 m-auto w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-tr from-[#E87512]/25 via-[#F7A028]/20 to-transparent blur-2xl -z-10 pointer-events-none" />

              {/* Acharya Ji Cutout Image */}
              <div className="relative group">
                <img
                  src="/images/acharya_hero.png"
                  alt={`${profile.name} — वैदिक कर्मकांड एवं धार्मिक अनुष्ठान आचार्य, उज्जैन`}
                  className="h-[420px] md:h-[470px] lg:h-[530px] w-auto max-w-full object-contain drop-shadow-[0_12px_24px_rgba(43,20,5,0.35)] transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
