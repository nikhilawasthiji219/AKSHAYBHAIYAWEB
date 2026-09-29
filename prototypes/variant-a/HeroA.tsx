import React from 'react';

// Variant A — Mahakal Royal (current, fix-only)
// Hypothesis: minimal fixes retain trust; best for older yajmans.
export const HeroA: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => (
  <section className="bg-cream border-b border-gold/30">
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-10">
      <div className="max-w-xl space-y-4 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF3D6] border border-gold/60 shadow-sm">
          <span className="text-saffron-dark text-xs">ॐ</span>
          <span className="text-xs font-serif font-bold text-maroon-deep tracking-wider">॥ श्री महाकालेश्वराय नमः ॥</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-maroon-deep leading-tight">
          शास्त्री अक्षय अवस्थी जी
        </h1>
        <p className="text-xl font-serif text-[#8E2800] font-semibold">वैदिक कर्मकांड एवं धार्मिक अनुष्ठान आचार्य</p>
        <p className="text-sm font-serif">श्री महाकालेश्वर तीर्थ, उज्जैन — 15+ वर्षों का शास्त्रोक्त अनुभव</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => onNavigate('/contact')}
            data-event="cta_click" data-variant="A" data-location="hero"
            className="cta-shimmer bg-[#9A1B1E] hover:bg-[#7E1417] text-white px-7 py-3 rounded-full font-serif font-bold text-sm shadow-md"
          >
            Contact Us (संपर्क करें)
          </button>
          <button
            onClick={() => onNavigate('/services')}
            className="bg-[#1F1F1F] text-white px-6 py-3 rounded-full font-serif font-bold text-sm"
          >
            View All Services →
          </button>
        </div>
      </div>
      <img src="/images/acharya_hero.png" alt="शास्त्री अक्षय अवस्थी जी" className="h-[420px] w-auto object-contain" loading="eager" />
    </div>
  </section>
);
