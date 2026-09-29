import React from 'react';
import { HeroA } from '../../prototypes/variant-a/HeroA';
import { HeroB } from '../../prototypes/variant-b/HeroB';
import { HeroC } from '../../prototypes/variant-c/HeroC';
import { HeroD } from '../../prototypes/variant-d/HeroD';

export const PrototypesPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const card = 'rounded-2xl border-2 border-gold/40 overflow-hidden bg-white shadow-gold-md';
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8 bg-cream">
      <div className="text-center space-y-1">
        <h1 className="font-serif text-3xl font-bold text-maroon-deep">Prototype Variations — Hero</h1>
        <p className="font-sans text-sm text-charcoal/70">A/B/C/D equal fidelity • real Hindi copy • <a className="underline" href="/">← back home</a></p>
      </div>
      <section className={card}><p className="px-4 py-2 font-bold font-serif bg-cream-soft border-b border-gold/30">A — Mahakal Royal (fix-only hypothesis: trust retention)</p><HeroA onNavigate={onNavigate} /></section>
      <section className={card}><p className="px-4 py-2 font-bold font-serif bg-cream-soft border-b border-gold/30">B — Ujjain Heritage (hypothesis: devotional distinctiveness)</p><HeroB onNavigate={onNavigate} /></section>
      <section className={card}><p className="px-4 py-2 font-bold font-serif bg-cream-soft border-b border-gold/30">C — Modern Vedic ⭐ (hypothesis: clarity + performance)</p><HeroC onNavigate={onNavigate} /></section>
      <section className={card}><p className="px-4 py-2 font-bold font-serif bg-cream-soft border-b border-gold/30">D — Temple &amp; Ritual (hypothesis: story-driven discovery)</p><HeroD onNavigate={onNavigate} /></section>
    </div>
  );
};
