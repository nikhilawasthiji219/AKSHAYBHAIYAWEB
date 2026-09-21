import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, MessageCircle } from 'lucide-react';
import { ACHARYA_PROFILE } from '../data/acharya';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
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
            Home
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
              <span>Services</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#C89B3C]" />
            </button>

            {openDropdown === 'services' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#C89B3C]/30 py-2 z-50 animate-fadeIn">
                <button
                  onClick={() => handleLinkClick('/services/kalsarp-dosh-nivaran')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  कालसर्प दोष निवारण पूजा
                </button>
                <button
                  onClick={() => handleLinkClick('/services/mangal-bhaat-puja')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  मंगल भात पूजा (मंगलनाथ मंदिर)
                </button>
                <button
                  onClick={() => handleLinkClick('/services/rudrabhishek')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  रुद्राभिषेक एवं महामृत्युंजय
                </button>
                <button
                  onClick={() => handleLinkClick('/services/navgraha-shanti')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  नवग्रह शांति अनुष्ठान
                </button>
                <div className="border-t border-[#F3E7CA] my-1"></div>
                <button
                  onClick={() => handleLinkClick('/services')}
                  className="w-full text-left px-4 py-2 text-xs font-serif font-bold text-[#D9610B] hover:bg-[#FFF8E8] flex items-center justify-between"
                >
                  <span>View All Services</span>
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
              <span>Packages</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#C89B3C]" />
            </button>

            {openDropdown === 'packages' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#C89B3C]/30 py-2 z-50 animate-fadeIn">
                <button
                  onClick={() => handleLinkClick('/special-anushthan')}
                  className="w-full text-left px-4 py-2.5 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors font-medium"
                >
                  Spiritual Discourse Packages
                  <span className="block text-[11px] text-[#7D2918]">श्रीमद्भागवत, शिवपुराण, रामकथा</span>
                </button>
                <button
                  onClick={() => handleLinkClick('/special-anushthan')}
                  className="w-full text-left px-4 py-2.5 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors font-medium"
                >
                  Special Packages
                  <span className="block text-[11px] text-[#7D2918]">शतचंडी, महारुद्र, विशेष अनुष्ठान</span>
                </button>
                <div className="border-t border-[#F3E7CA] my-1"></div>
                <button
                  onClick={() => handleLinkClick('/special-anushthan')}
                  className="w-full text-left px-4 py-2 text-xs font-serif font-bold text-[#D9610B] hover:bg-[#FFF8E8] flex items-center justify-between"
                >
                  <span>View All Packages</span>
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
            Blog
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
              <span>About</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#C89B3C]" />
            </button>

            {openDropdown === 'about' && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#C89B3C]/30 py-2 z-50 animate-fadeIn">
                <button
                  onClick={() => handleLinkClick('/about')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  About Mahakal
                </button>
                <button
                  onClick={() => handleLinkClick('/about')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  About Pandit Akshay Ji
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
              <span>More</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#C89B3C]" />
            </button>

            {openDropdown === 'more' && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#C89B3C]/30 py-2 z-50 animate-fadeIn">
                <button
                  onClick={() => handleLinkClick('/gallery')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  Gallery
                </button>
                <button
                  onClick={() => handleLinkClick('/special-anushthan')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  Panchang
                </button>
                <button
                  onClick={() => handleLinkClick('/about')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  Testimonials
                </button>
                <button
                  onClick={() => handleLinkClick('/contact')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  Free Consultation
                </button>
                <button
                  onClick={() => handleLinkClick('/contact')}
                  className="w-full text-left px-4 py-2 text-xs font-serif text-[#3B1D0B] hover:bg-[#FFF8E8] hover:text-[#D9610B] transition-colors"
                >
                  Contact Us
                </button>
              </div>
            )}
          </div>

          {/* Language Selector Pill */}
          <div className="px-2.5 py-1 rounded-full border border-[#C89B3C] text-[#8E2800] bg-[#FFF8E8] text-xs font-bold font-serif cursor-default select-none shadow-2xs">
            हिंदी
          </div>

        </nav>

        {/* Right: Dual CTA Buttons (Puja Book Kare & Contact Us - NO Pandit Login) */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* 1. Puja Book Kare Pill Button (Red/Maroon as in video) */}
          <button
            onClick={() => handleLinkClick('/contact')}
            className="bg-[#9A1B1E] hover:bg-[#7E1417] text-white px-5 py-2.5 rounded-full text-xs sm:text-[13px] font-serif font-bold shadow-sm transition-all transform hover:scale-[1.02] tracking-wide"
          >
            Puja Book Kare
          </button>

          {/* 2. Contact Us Pill Button (Dark Charcoal/Black as in video) */}
          <button
            onClick={() => handleLinkClick('/contact')}
            className="bg-[#1F1F1F] hover:bg-[#333333] text-white px-5 py-2.5 rounded-full text-xs sm:text-[13px] font-serif font-bold shadow-sm transition-all transform hover:scale-[1.02] tracking-wide"
          >
            Contact Us
          </button>

        </div>

        {/* Mobile Hamburger toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`https://wa.me/91${ACHARYA_PROFILE.contact.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full text-emerald-700 bg-emerald-50 border border-emerald-300"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded text-[#4A170C] border border-[#C89B3C]/40 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF7] border-b border-[#C89B3C]/30 px-4 pt-3 pb-5 space-y-3">
          <div className="text-xs text-[#C94F08] font-semibold pb-2 border-b border-[#C89B3C]/20 flex justify-between">
            <span>श्री महाकालेश्वर तीर्थ, उज्जैन</span>
            <span>📞 {ACHARYA_PROFILE.contact.primaryPhone}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleLinkClick('/')}
              className="text-left px-3 py-2 rounded text-xs font-serif font-bold text-[#3B1D0B] hover:bg-[#FFF8E8]"
            >
              होम (Home)
            </button>
            <button
              onClick={() => handleLinkClick('/services')}
              className="text-left px-3 py-2 rounded text-xs font-serif font-bold text-[#3B1D0B] hover:bg-[#FFF8E8]"
            >
              सेवाएं (Services)
            </button>
            <button
              onClick={() => handleLinkClick('/special-anushthan')}
              className="text-left px-3 py-2 rounded text-xs font-serif font-bold text-[#3B1D0B] hover:bg-[#FFF8E8]"
            >
              पैकेज (Packages)
            </button>
            <button
              onClick={() => handleLinkClick('/gallery')}
              className="text-left px-3 py-2 rounded text-xs font-serif font-bold text-[#3B1D0B] hover:bg-[#FFF8E8]"
            >
              गैलरी (Gallery)
            </button>
            <button
              onClick={() => handleLinkClick('/blogs')}
              className="text-left px-3 py-2 rounded text-xs font-serif font-bold text-[#3B1D0B] hover:bg-[#FFF8E8]"
            >
              ब्लॉग (Blog)
            </button>
            <button
              onClick={() => handleLinkClick('/about')}
              className="text-left px-3 py-2 rounded text-xs font-serif font-bold text-[#3B1D0B] hover:bg-[#FFF8E8]"
            >
              परिचय (About)
            </button>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => handleLinkClick('/contact')}
              className="flex-1 bg-[#9A1B1E] text-white text-center py-2.5 rounded-full font-serif font-bold text-xs shadow-xs"
            >
              पूजा बुक करें
            </button>
            <button
              onClick={() => handleLinkClick('/contact')}
              className="flex-1 bg-[#1F1F1F] text-white text-center py-2.5 rounded-full font-serif font-bold text-xs shadow-xs"
            >
              संपर्क करें
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
