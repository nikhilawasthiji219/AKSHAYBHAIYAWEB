import React from 'react';

// Variant C — Modern Vedic (minimal / performance) — RECOMMENDED
// Hypothesis: removing Ken Burns + heavy accents improves LCP/CLS + mobile clarity.
export const HeroC: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => (
  <section className="bg-cream-light">
    <div className="max-w-5xl mx-auto px-4 py-12 text-center space-y-5">
      <p className="text-xs font-serif font-bold text-saffron-dark tracking-widest">॥ श्री महाकालेश्वराय नमः ॥</p>
      <h1 className="font-sans text-4xl md:text-5xl font-bold text-charcoal">शास्त्री अक्षय अवस्थी जी</h1>
      <p className="font-sans text-base text-charcoal/80">वैदिक कर्मकांड एवं धार्मिक अनुष्ठान आचार्य — उज्जैन</p>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('/contact')}
          data-event="cta_click" data-variant="C" data-location="hero"
          className="bg-saffron hover:bg-saffron-dark text-white rounded-full px-8 py-3 font-bold text-sm shadow-saffron-md"
        >
          पूजन हेतु संपर्क करें
        </button>
        <a href="tel:9300096938" className="bg-white border border-gold text-maroon-deep rounded-full px-6 py-3 font-bold text-sm">
          📞 +91 93000 96938
        </a>
        <a href="https://wa.me/919300096938" className="bg-emerald-700 text-white rounded-full px-6 py-3 font-bold text-sm">
          WhatsApp
        </a>
      </div>
      <p className="text-xs text-charcoal/60">शास्त्री (व्याकरण) • आचार्य (संस्कृत) • 15+ वर्ष अनुभव</p>
    </div>
  </section>
);
