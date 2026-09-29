import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, MessageCircle } from 'lucide-react';
import { ACHARYA_PROFILE } from '../data/acharya';
import { useLanguage } from '../lib/languageContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { lang, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFFDF7]/98 backdrop-blur-md shadow-md py-2 border-b border-[#C89B3C]/30'
          : 'bg-[#FFFDF7] py-2.5 border-b border-[#C89B3C]/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Identity matching Pandit Bhavesh style for Pandit Akshay Ji */}
        <button
          onClick={() => handleLinkClick('/')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-[#C89B3C] flex items-center justify-center p-0.5 bg-[#FFF8E8] shadow-xs shrink-0 group-hover:scale-105 transition-transform">
            <img
              src="/images/logo_akshay_avasthi_256.png"
              alt="शास्त्री अक्षय अवस्थी जी"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-extrabold uppercase text-[#D9610B] tracking-wider font-serif">
                PANDIT
              </span>
            </div>
            <span className="block text-base sm:text-lg font-bold font-serif text-[#3B1D0B] leading-none tracking-wide">
              {ACHARYA_PROFILE.name}
            </span>
            <span className="block text-[10px] font-medium text-[#7D2918] tracking-tight mt-0.5">
              {ACHARYA_PROFILE.title}
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation with Dropdowns matching reference video */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          
          {/* 1. Home */}
          <button
            onClick={() => handleLinkClick('/')}
            className={`text-sm font-serif font-semibold transition-colors ${
              currentPath === '/' ? 'text-[#D9610B]' : 'text-[#3B1D0B] hover:text-[#D9610B]'
            }`}
          >
            {t('होम', 'Home')}
          </button>

          {/* 2. Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('services')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleLinkClick('/services')}
              className={`flex items-center gap-1 text-sm font-serif font-semibold transition-colors ${
                currentPath.startsWith('/services') ? 'text-[#D9610B]' : 'text-[#3B1D0B] hover:text-[#D9610B]'
              }`}
            >
              <span>{t('सेवाएँ', 'Services')}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#C89B3C]" />
            </button>

            {openDropdown === 'services' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#C89B3C]/30 py-2 z-50 animate-fadeIn">
                <button
                  onClick={() => handleLinkClick('/services/kalsarp-dosh-nivaran')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  {t('कालसर्प दोष निवारण पूजा', 'Kalsarp Dosh Nivaran Puja')}
                </button>
                <button
                  onClick={() => handleLinkClick('/services/mangal-bhaat-puja')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  {t('मंगल भात पूजा (मंगलनाथ मंदिर)', 'Mangal Bhaat Puja (Mangalnath Temple)')}
                </button>
                <button
                  onClick={() => handleLinkClick('/services/rudrabhishek')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  {t('रुद्राभिषेक एवं महामृत्युंजय', 'Rudrabhishek & Mahamrityunjay')}
                </button>
                <button
                  onClick={() => handleLinkClick('/services/navgraha-shanti')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  {t('नवग्रह शांति अनुष्ठान', 'Navgraha Shanti Anushthan')}
                </button>
                <div className="border-t border-[#F3E7CA] my-1"></div>
                <button
                  onClick={() => handleLinkClick('/services')}
                  className="w-full text-left px-4 py-2 text-xs font-serif font-bold text-[#D9610B] hover:bg-[#FFF8E8] flex items-center justify-between"
                >
                  <span>{t('सभी सेवाएँ देखें', 'View All Services')}</span>
                  <span>➔</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. Packages Dropdown (Exactly as shown in video) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('packages')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleLinkClick('/special-anushthan')}
              className={`flex items-center gap-1 text-sm font-serif font-semibold transition-colors ${
                currentPath === '/special-anushthan' ? 'text-[#D9610B]' : 'text-[#3B1D0B] hover:text-[#D9610B]'
              }`}
            >
              <span>{t('पैकेज', 'Packages')}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#C89B3C]" />
            </button>

            {openDropdown === 'packages' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#C89B3C]/30 py-2 z-50 animate-fadeIn">
                <button
                  onClick={() => handleLinkClick('/special-anushthan')}
                  className="w-full text-left px-4 py-2.5 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors font-medium"
                >
                  {t('आध्यात्मिक कथा पैकेज', 'Spiritual Discourse Packages')}
                  <span className="block text-[11px] text-[#7D2918]">{t('श्रीमद्भागवत, शिवपुराण, रामकथा', 'Srimad Bhagwat, Shiv Puran, Ram Katha')}</span>
                </button>
                <button
                  onClick={() => handleLinkClick('/special-anushthan')}
                  className="w-full text-left px-4 py-2.5 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors font-medium"
                >
                  {t('विशेष पैकेज', 'Special Packages')}
                  <span className="block text-[11px] text-[#7D2918]">{t('शतचंडी, महारुद्र, विशेष अनुष्ठान', 'Shatchandi, Maharudra, Special Anushthan')}</span>
                </button>
                <div className="border-t border-[#F3E7CA] my-1"></div>
                <button
                  onClick={() => handleLinkClick('/special-anushthan')}
                  className="w-full text-left px-4 py-2 text-xs font-serif font-bold text-[#D9610B] hover:bg-[#FFF8E8] flex items-center justify-between"
                >
                  <span>{t('सभी पैकेज देखें', 'View All Packages')}</span>
                  <span>➔</span>
                </button>
              </div>
            )}
          </div>

          {/* 4. Blog */}
          <button
            onClick={() => handleLinkClick('/blogs')}
            className={`text-sm font-serif font-semibold transition-colors ${
              currentPath.startsWith('/blogs') ? 'text-[#D9610B]' : 'text-[#3B1D0B] hover:text-[#D9610B]'
            }`}
          >
            {t('ब्लॉग', 'Blog')}
          </button>

          {/* 5. About Dropdown (About Mahakal / About Pandit Ji) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleLinkClick('/about')}
              className={`flex items-center gap-1 text-sm font-serif font-semibold transition-colors ${
                currentPath === '/about' ? 'text-[#D9610B]' : 'text-[#3B1D0B] hover:text-[#D9610B]'
              }`}
            >
              <span>{t('परिचय', 'About')}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#C89B3C]" />
            </button>

            {openDropdown === 'about' && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#C89B3C]/30 py-2 z-50 animate-fadeIn">
                <button
                  onClick={() => handleLinkClick('/about')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  {t('महाकालेश्वर के बारे में', 'About Mahakal')}
                </button>
                <button
                  onClick={() => handleLinkClick('/about')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  {t('पंडित अक्षय जी के बारे में', 'About Pandit Akshay Ji')}
                </button>
              </div>
            )}
          </div>

          {/* 6. More Dropdown (Gallery, Panchang, Testimonials, Free Consultation, Contact Us) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('more')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="flex items-center gap-1 text-sm font-serif font-semibold text-[#3B1D0B] hover:text-[#D9610B] transition-colors"
            >
              <span>{t('अधिक', 'More')}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#C89B3C]" />
            </button>

            {openDropdown === 'more' && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#C89B3C]/30 py-2 z-50 animate-fadeIn">
                <button
                  onClick={() => handleLinkClick('/gallery')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  {t('गैलरी', 'Gallery')}
                </button>
                <button
                  onClick={() => handleLinkClick('/special-anushthan')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  {t('पंचांग', 'Panchang')}
                </button>
                <button
                  onClick={() => handleLinkClick('/about')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  {t('प्रशंसापत्र', 'Testimonials')}
                </button>
                <button
                  onClick={() => handleLinkClick('/contact')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  {t('निशुल्क परामर्श', 'Free Consultation')}
                </button>
                <button
                  onClick={() => handleLinkClick('/contact')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  {t('संपर्क करें', 'Contact Us')}
                </button>
              </div>
            )}
          </div>

          {/* Language Toggle Pill — fully functional */}
          <button
            onClick={toggleLanguage}
            title={lang === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border-2 border-[#C89B3C] text-[#8E2800] bg-[#FFF8E8] hover:bg-[#FFE8B2] text-xs font-bold font-serif cursor-pointer select-none shadow-2xs transition-all hover:scale-105 active:scale-95"
          >
            <span className="text-[10px]">{lang === 'hi' ? '🇮🇳' : '🇬🇧'}</span>
            <span>{lang === 'hi' ? 'हिंदी' : 'EN'}</span>
            <span className="text-[10px] opacity-60">⇄</span>
          </button>

        </nav>

        {/* Right: Dual CTA Buttons (Puja Book Kare & Contact Us - NO Pandit Login) */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* 1. Puja Book Kare Pill Button (Red/Maroon as in video) */}
          <button
            onClick={() => handleLinkClick('/contact')}
            className="bg-[#9A1B1E] hover:bg-[#7E1417] text-white px-5 py-2.5 rounded-full text-xs sm:text-[13px] font-serif font-bold shadow-sm transition-all transform hover:scale-[1.02] tracking-wide"
          >
            {t('पूजा बुक करें', 'Book Puja')}
          </button>

          {/* 2. Contact Us Pill Button (Dark Charcoal/Black as in video) */}
          <button
            onClick={() => handleLinkClick('/contact')}
            className="bg-[#1F1F1F] hover:bg-[#333333] text-white px-5 py-2.5 rounded-full text-xs sm:text-[13px] font-serif font-bold shadow-sm transition-all transform hover:scale-[1.02] tracking-wide"
          >
            {t('संपर्क करें', 'Contact Us')}
          </button>

        </div>

        {/* Mobile Hamburger toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`https://wa.me/91${ACHARYA_PROFILE.contact.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp पर संपर्क करें"
            className="min-w-[44px] min-h-[44px] p-2.5 rounded-full text-emerald-700 bg-emerald-50 border border-emerald-300 flex items-center justify-center"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'मेनू बंद करें' : 'मेनू खोलें'}
            aria-expanded={mobileMenuOpen}
            className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl text-[#4A170C] border border-[#C89B3C]/40 focus:outline-none flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer — scrollable, 44px+ targets, single-column editorial */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF7] border-b border-[#C89B3C]/30 px-4 pt-3 pb-5 space-y-3 max-h-[calc(100dvh-64px)] overflow-y-auto overscroll-contain">
          <div className="text-xs text-[#C94F08] font-semibold pb-2 border-b border-[#C89B3C]/20 flex justify-between gap-2 flex-wrap">
            <span>{t('श्री महाकालेश्वर तीर्थ, उज्जैन', 'Shri Mahakaleshwar Tirtha, Ujjain')}</span>
            <span>📞 {ACHARYA_PROFILE.contact.primaryPhone}</span>
          </div>

          {/* Language Toggle in mobile drawer */}
          <button
            onClick={toggleLanguage}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-[#C89B3C]/60 bg-[#FFF8E8] text-sm font-serif font-bold text-[#8E2800]"
          >
            <span>{lang === 'hi' ? '🇮🇳 हिंदी में देखें' : '🇬🇧 View in English'}</span>
            <span className="text-xs opacity-70">{lang === 'hi' ? '→ Switch to English' : '→ हिंदी में बदलें'}</span>
          </button>

          <div className="grid grid-cols-1 gap-1.5">
            <button
              onClick={() => handleLinkClick('/')}
              className="text-left px-4 py-3 min-h-[48px] rounded-xl text-sm font-serif font-bold text-[#3B1D0B] hover:bg-[#FFF8E8] active:bg-[#FFF8E8]"
            >
              {t('होम', 'Home')}
            </button>
            <button
              onClick={() => handleLinkClick('/services')}
              className="text-left px-4 py-3 min-h-[48px] rounded-xl text-sm font-serif font-bold text-[#3B1D0B] hover:bg-[#FFF8E8] active:bg-[#FFF8E8]"
            >
              {t('सेवाएँ', 'Services')}
            </button>
            <button
              onClick={() => handleLinkClick('/special-anushthan')}
              className="text-left px-4 py-3 min-h-[48px] rounded-xl text-sm font-serif font-bold text-[#3B1D0B] hover:bg-[#FFF8E8] active:bg-[#FFF8E8]"
            >
              {t('पैकेज', 'Packages')}
            </button>
            <button
              onClick={() => handleLinkClick('/gallery')}
              className="text-left px-4 py-3 min-h-[48px] rounded-xl text-sm font-serif font-bold text-[#3B1D0B] hover:bg-[#FFF8E8] active:bg-[#FFF8E8]"
            >
              {t('गैलरी', 'Gallery')}
            </button>
            <button
              onClick={() => handleLinkClick('/blogs')}
              className="text-left px-4 py-3 min-h-[48px] rounded-xl text-sm font-serif font-bold text-[#3B1D0B] hover:bg-[#FFF8E8] active:bg-[#FFF8E8]"
            >
              {t('ब्लॉग', 'Blog')}
            </button>
            <button
              onClick={() => handleLinkClick('/about')}
              className="text-left px-4 py-3 min-h-[48px] rounded-xl text-sm font-serif font-bold text-[#3B1D0B] hover:bg-[#FFF8E8] active:bg-[#FFF8E8]"
            >
              {t('परिचय', 'About')}
            </button>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => handleLinkClick('/contact')}
              className="w-full bg-[#9A1B1E] text-white text-center py-3.5 min-h-[52px] rounded-xl font-serif font-bold text-[15px] shadow-xs"
            >
              {t('पूजा बुक करें', 'Book Puja Now')}
            </button>
            <button
              onClick={() => handleLinkClick('/contact')}
              className="w-full bg-[#1F1F1F] text-white text-center py-3.5 min-h-[52px] rounded-xl font-serif font-bold text-[15px] shadow-xs"
            >
              {t('संपर्क करें', 'Contact Us')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
