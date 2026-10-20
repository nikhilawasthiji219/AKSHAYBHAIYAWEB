import React from 'react';
import { HeroA } from '../../prototypes/variant-a/HeroA';
import { HeroB } from '../../prototypes/variant-b/HeroB';
import { HeroC } from '../../prototypes/variant-c/HeroC';
import { HeroD } from '../../prototypes/variant-d/HeroD';
import { BookingBarE } from '../../prototypes/round2/BookingBarE';
import { InlineCtaF } from '../../prototypes/round2/InlineCtaF';
import { GuidedFormG } from '../../prototypes/round2/GuidedFormG';
import { DepthDetailH } from '../../prototypes/round2/DepthDetailH';

export const PrototypesPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const card = 'rounded-2xl border-2 border-gold/40 overflow-hidden bg-white shadow-gold-md';
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8 bg-cream">
      <div className="text-center space-y-1">
        <h1 className="font-serif text-3xl font-bold text-maroon-deep">Prototype Vault — Hero (Round 1) • Booking Layer (Round 2)</h1>
        <p className="font-sans text-sm text-charcoal/70">A–D: hero tone • E–H: बुकिंग-मार्ग (एक आयाम) • असली कॉपी • <a className="underline" href="/">← back home</a></p>
      </div>
      <section className={card}><p className="px-4 py-2 font-bold font-serif bg-cream-soft border-b border-gold/30">A — Mahakal Royal (fix-only hypothesis: trust retention)</p><HeroA onNavigate={onNavigate} /></section>
      <section className={card}><p className="px-4 py-2 font-bold font-serif bg-cream-soft border-b border-gold/30">B — Ujjain Heritage (hypothesis: devotional distinctiveness)</p><HeroB onNavigate={onNavigate} /></section>
      <section className={card}><p className="px-4 py-2 font-bold font-serif bg-cream-soft border-b border-gold/30">C — Modern Vedic ⭐ (hypothesis: clarity + performance)</p><HeroC onNavigate={onNavigate} /></section>
      <section className={card}><p className="px-4 py-2 font-bold font-serif bg-cream-soft border-b border-gold/30">D — Temple &amp; Ritual (hypothesis: story-driven discovery)</p><HeroD onNavigate={onNavigate} /></section>

      <div className="pt-4 text-center">
        <h2 className="font-serif text-2xl font-bold text-maroon-deep">Round 2 — बुकिंग-कन्वर्ज़न के मार्ग (E/F/G/H)</h2>
        <p className="font-sans text-xs text-charcoal/60">बाकी पृष्ठ समान — केवल "बुकिंग तक कैसे पहुंचें" बदला गया</p>
      </div>

      <section className={card}><p className="px-4 py-2 font-bold font-serif bg-cream-soft border-b border-gold/30">E — Persistent Booking Bar (hypothesis: स्क्रॉल के हर बिंदु पर बुकिंग एक tap दूर)</p>
        <div className="p-4"><BookingBarE onNavigate={onNavigate} /></div>
      </section>
      <section className={card}><p className="px-4 py-2 font-bold font-serif bg-cream-soft border-b border-gold/30">F — Inline Service CTAs ⭐ (hypothesis: बुकिंग रुचि-क्षण पर ही, पूर्व-भरित संदेश के साथ)</p>
        <div className="p-4"><InlineCtaF onNavigate={onNavigate} /></div>
      </section>
      <section className={card}><p className="px-4 py-2 font-bold font-serif bg-cream-soft border-b border-gold/30">G — Guided Booking Form (hypothesis: संरचित पूर्व-भरा संदेश → कम चैट-बोझ, गंभीर यजमान)</p>
        <div className="p-4"><GuidedFormG onNavigate={onNavigate} /></div>
      </section>
      <section className={card}><p className="px-4 py-2 font-bold font-serif bg-cream-soft border-b border-gold/30">H — Depth-first Detail (hypothesis: गहराई पहले → गंभीर क्लाइंट का विश्वास)</p>
        <div className="p-4"><DepthDetailH onNavigate={onNavigate} /></div>
      </section>
    </div>
  );
};
