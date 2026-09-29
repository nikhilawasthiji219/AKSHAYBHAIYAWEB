import { MapPin } from 'lucide-react';

interface DarkRibbonProps {
  onContactClick: () => void;
}

export const DarkRibbon: React.FC<DarkRibbonProps> = ({ onContactClick }) => {
  return (
    <section className="bg-[#2A1005] text-[#FFF8E8] py-4 border-y border-[#C89B3C]/30 relative overflow-hidden">

      {/* Decorative trident background watermark on left */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
        <span className="text-4xl text-[#E87512]">🔱</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left relative z-10">

        {/* Left location details */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-serif">
          <MapPin className="w-4 h-4 text-[#E87512] flex-shrink-0" />
          <span>
            <strong className="text-[#E6C66A]">{t('अवंतिका क्षेत्र', 'Avanti Kshetra')}</strong> | रामघाट | उज्जैन
          </span>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <span className="text-xs sm:text-sm font-serif text-[#E6C66A]">
            {t('अपने विशेष पूजन/अनुष्ठान के लिए अभी संपर्क करें', 'Contact for Special Puja/Anushthan now')}
          </span>

          <button
            onClick={onContactClick}
            className="px-4 py-1.5 rounded-full bg-[#B84904] hover:bg-[#D9610B] text-white text-xs font-serif font-bold shadow-xs transition-colors"
          >
            Contact Now
          </button>
        </div>

      </div>
    </section>
  );
};
