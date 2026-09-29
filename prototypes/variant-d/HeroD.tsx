import React from 'react';

// Variant D — Temple & Ritual (rich storytelling)
// Hypothesis: gallery-first narrative boosts ritual discovery, highest cost.
export const HeroD: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const rituals = [
    { title: 'रुद्राभिषेक', img: '/images/gal_rudra.jpg' },
    { title: 'महामृत्युंजय जाप', img: '/images/gal_mrityunjay.jpg' },
    { title: 'नवचंडी', img: '/images/gal_navchandi.jpg' },
    { title: 'शतचंडी यज्ञ', img: '/images/gal_shatchandi.jpg' },
    { title: 'दुर्गा अर्चन', img: '/images/gal_durga.jpg' },
  ];
  return (
    <section className="bg-[#FFFDF8] border border-[#efd9b4] rounded-2xl m-4 p-4">
      <p className="text-center font-serif text-sm text-maroon">रामघाट, उज्जैन — अनुष्ठान दर्शन</p>
      <div className="flex gap-2 h-[280px] mt-3">
        {rituals.map((r, i) => (
          <button
            key={r.title}
            onClick={() => onNavigate('/gallery')}
            data-event="cta_click" data-variant="D" data-location="hero"
            className={`relative flex-1 overflow-hidden rounded-xl border border-gold/40 ${i === 0 ? 'flex-[3]' : ''}`}
          >
            <img src={r.img} alt={r.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <span className="absolute bottom-2 left-2 text-white text-xs font-bold drop-shadow">{r.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
