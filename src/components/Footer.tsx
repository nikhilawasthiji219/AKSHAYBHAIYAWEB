import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, ChevronRight, ArrowUp } from 'lucide-react';
import { ACHARYA_PROFILE } from '../data/acharya';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'होम', path: '/' },
    { label: 'हमारे बारे में', path: '/about' },
    { label: 'कालसर्प पूजा', path: '/services/kalsarp-dosh-nivaran' },
    { label: 'मंगल भात पूजा (मंगलनाथ व अंगारेश्वर मंदिर)', path: '/services/mangal-bhaat-puja' },
    { label: 'नवग्रह शांति पूजा', path: '/services/navgraha-shanti' },
    { label: 'केमद्रुम दोष निवारण पूजा', path: '/services/kemdrum-dosh' },
    { label: 'गैलरी', path: '/gallery' },
    { label: 'संपर्क करें', path: '/contact' },
  ];

  const ourServices = [
    { label: 'गुरु चांडाल दोष शांति पूजा', path: '/services/guru-chandal-dosh' },
    { label: 'शनि चांडाल दोष निवारण पूजा', path: '/services/shani-chandal-dosh' },
    { label: 'विष दोष निवारण पूजा', path: '/services/vish-dosh-nivaran' },
    { label: 'अर्क विवाह एवं कुंभ विवाह', path: '/services/ark-vivah-kumbh-vivah' },
    { label: 'महामृत्युंजय जाप एवं अनुष्ठान', path: '/services/mahamrityunjay-jaap' },
    { label: 'आध्यात्मिक कथा पैकेज', path: '/special-anushthan' },
    { label: 'विशेष पैकेज', path: '/special-anushthan' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    scrollToTop();
  };

  return (
    <footer className="bg-[#181818] text-[#D1D5DB] border-t-2 border-[#C89B3C]/50 pt-14 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid exactly matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-[#333333]">
          
          {/* Column 1: Logo & Mission Statement */}
          <div className="space-y-4">
            <div className="inline-block bg-white p-2.5 rounded-lg shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full border border-[#C89B3C] flex items-center justify-center p-0.5 bg-[#FFF8E8] shrink-0">
                  <img
                    src="/images/logo_akshay_avasthi_256.png"
                    alt="शास्त्री अक्षय अवस्थी जी"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div>
                  <div className="text-xs font-serif font-extrabold text-[#D9610B] tracking-wider uppercase">
                    PANDIT
                  </div>
                  <div className="text-sm font-serif font-bold text-[#3B1D0B] leading-none">
                    Akshay Awasthi
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed font-sans pt-1">
              Authentic Vedic Rituals, Puja, Spiritual Discourse, Astrology, Vastu and Spiritual Services in Ujjain.
            </p>

            <div className="pt-2 text-xs text-[#C89B3C] font-serif">
              ॥ श्री महाकालेश्वराय नमः ॥
            </div>
          </div>

          {/* Column 2: त्वरित लिंक (Quick Links) */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold font-serif text-[#F59E0B] tracking-wide relative inline-block pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#D97706]">
              त्वरित लिंक
            </h3>

            <ul className="space-y-2 text-xs sm:text-[13px] font-sans text-[#D1D5DB] pt-1">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleLinkClick(item.path)}
                    className="flex items-center gap-1.5 hover:text-[#F59E0B] transition-colors text-left group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#F59E0B] group-hover:translate-x-0.5 transition-transform shrink-0" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: हमारी सेवाएं (Our Services) */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold font-serif text-[#F59E0B] tracking-wide relative inline-block pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#D97706]">
              हमारी सेवाएं
            </h3>

            <ul className="space-y-2 text-xs sm:text-[13px] font-sans text-[#D1D5DB] pt-1">
              {ourServices.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleLinkClick(item.path)}
                    className="flex items-center gap-1.5 hover:text-[#F59E0B] transition-colors text-left group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#F59E0B] group-hover:translate-x-0.5 transition-transform shrink-0" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: संपर्क जानकारी (Contact Info) */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold font-serif text-[#F59E0B] tracking-wide relative inline-block pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#D97706]">
              संपर्क जानकारी
            </h3>

            <ul className="space-y-3 text-xs sm:text-[13px] font-sans text-[#E5E7EB] pt-1">
              <li>
                <a
                  href={`tel:${ACHARYA_PROFILE.contact.primaryPhone}`}
                  className="flex items-center gap-2.5 hover:text-[#F59E0B] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>+91 {ACHARYA_PROFILE.contact.primaryPhone}</span>
                </a>
              </li>

              <li>
                <a
                  href={`https://wa.me/91${ACHARYA_PROFILE.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-[#F59E0B] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>+91 {ACHARYA_PROFILE.contact.whatsappNumber}</span>
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${ACHARYA_PROFILE.contact.email}`}
                  className="flex items-center gap-2.5 hover:text-[#F59E0B] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>{ACHARYA_PROFILE.contact.email}</span>
                </a>
              </li>

              <li>
                <div className="flex items-start gap-2.5 text-[#D1D5DB]">
                  <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                  <span>Ujjain (M.P.) — श्री महाकालेश्वर तीर्थ</span>
                </div>
              </li>
            </ul>

            <div className="pt-3">
              <button
                onClick={() => handleLinkClick('/contact')}
                className="w-full bg-[#D97706] hover:bg-[#B45309] text-white py-2 px-4 rounded-lg font-serif font-bold text-xs transition-all shadow-sm"
              >
                पूजन परामर्श / संकल्प बुक करें
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright and Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#9CA3AF]">
          <p>© 2026. {ACHARYA_PROFILE.name}. सर्वाधिकार सुरक्षित।</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#F59E0B] hover:text-white transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-[#262626] border border-[#C89B3C]/40 flex items-center justify-center">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
            <span>Back to Top</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
