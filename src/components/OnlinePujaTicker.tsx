import React from 'react';
import { Megaphone } from 'lucide-react';

interface OnlinePujaTickerProps {
  onNavigate: (path: string) => void;
}

export const OnlinePujaTicker: React.FC<OnlinePujaTickerProps> = ({ onNavigate }) => {
  const handleClick = () => {
    onNavigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#B91C1C] text-white py-2.5 overflow-hidden border-y border-[#DC2626] shadow-sm select-none">
      <div className="flex items-center cursor-pointer group" onClick={handleClick}>
        <div className="flex animate-marquee whitespace-nowrap items-center text-xs sm:text-sm font-semibold tracking-wide">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center mx-6 gap-3">
              <Megaphone className="w-4 h-4 text-[#FDE047] animate-bounce shrink-0" />
              <span>Online Puja services are also available through us.</span>
              <span className="underline decoration-[#FDE047] text-[#FEF08A] font-bold group-hover:text-white transition-colors">
                Click here
              </span>
              <span className="text-[#FCA5A5] mx-2">•</span>
              <span>हमारे माध्यम से ऑनलाइन एवं ऑफलाइन दोनों प्रकार की पूजन सेवाएं उपलब्ध हैं।</span>
              <span className="underline decoration-[#FDE047] text-[#FEF08A] font-bold group-hover:text-white transition-colors">
                यहां क्लिक करें
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
