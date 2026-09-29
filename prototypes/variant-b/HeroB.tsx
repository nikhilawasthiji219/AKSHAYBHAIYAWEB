import React from 'react';

// Variant B — Ujjain Heritage (editorial / dense)
// Hypothesis: temple-arch + maroon banner boosts devotional distinctiveness.
export const HeroB: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => (
  <section className="special-anushthan-bg text-cream-light border-y-2 border-gold/40">
    <div className="max-w-6xl mx-auto grid md:grid-cols-[0.9fr_1.1fr] gap-8 p-8 items-center">
      <div className="vedic-arch-frame overflow-hidden bg-cream">
        <img src="/images/acharya_hero.png" alt="आचार्य — उज्जैन" className="w-full h-[420px] object-cover object-top" loading="eager" />
      </div>
      <div className="space-y-4">
        <p className="text-gold-light font-serif text-sm tracking-widest">॥ अवंतिका क्षेत्र • रामघाट • उज्जैन ॥</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-cream-light leading-tight">
          वैदिक परंपरा,<br />शास्त्रोक्त विधान
        </h1>
        <p className="font-serif text-cream-light/80 text-sm leading-relaxed">
          रुद्राभिषेक • महामृत्युंजय जाप • नवचंडी • शतचंडी यज्ञ • नवग्रह शांति • प्राण प्रतिष्ठा
        </p>
        <button
          onClick={() => onNavigate('/contact')}
          data-event="cta_click" data-variant="B" data-location="hero"
          className="bg-gold hover:bg-gold-dark text-maroon-deep px-7 py-3 rounded-full font-serif font-bold text-sm"
        >
          विशेष पूजन हेतु संपर्क करें
        </button>
      </div>
    </div>
  </section>
);
