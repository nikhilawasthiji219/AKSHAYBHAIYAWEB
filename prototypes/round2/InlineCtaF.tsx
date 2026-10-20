import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { VedicIcon } from '../../src/components/VedicIcon';
import { SERVICES_DATA } from '../../src/data/services';
import { Service } from '../../src/types';

// Variant F — बिंदु पर बुकिंग (Inline per-service CTAs)
// Dimension: बुकिंग-मार्ग। Hypothesis: रुचि जिस समय जागे उसी कार्ड पर
// "विशिष्ट सेवा की WhatsApp बातचीत" खुले — बुकिंग जितने क्लिक कम, संदेश जितना अधिक प्रारूपित।

const WA = 'https://wa.me/919300096938';

const waForService = (s: Service): string => {
  const msg = `प्रणाम शास्त्री जी। मुझे "${s.title}" अनुष्ठान के संदर्भ में शुभ मुहूर्त, विधि-विधान एवं आवश्यक सामग्री की जानकारी चाहिए। कृपया उपलब्ध तिथियाँ बताएं।`;
  return `${WA}?text=${encodeURIComponent(msg)}`;
};

export const InlineCtaF: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const featured = SERVICES_DATA.filter((s) => s.featured).slice(0, 4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {featured.map((s) => (
        <article
          key={s.id}
          className="rounded-2xl border-2 border-gold/40 bg-white shadow-gold-sm hover:shadow-gold-md hover:-translate-y-0.5 transition p-4 flex flex-col gap-2.5"
        >
          <div className="flex items-center gap-3">
            <span className="shrink-0 w-11 h-11 rounded-xl bg-gold-pale flex items-center justify-center">
              <VedicIcon type={s.iconType} className="w-7 h-7 text-saffron-dark" />
            </span>
            <h4 className="font-serif text-lg font-bold text-charcoal leading-snug">{s.title}</h4>
          </div>

          <p className="text-[13px] text-charcoal/75 line-clamp-3">{s.shortDesc}</p>

          <div className="mt-auto flex flex-col gap-1.5">
            <a
              href={waForService(s)}
              target="_blank"
              rel="noopener noreferrer"
              data-event="whatsapp_open" data-variant="F" data-location="service_card" data-service={s.id}
              className="flex items-center justify-center gap-2 min-h-[44px] rounded-full bg-saffron hover:bg-saffron-dark text-white font-bold text-[13px] shadow-saffron-md"
            >
              <MessageCircle className="w-4 h-4" />
              इस अनुष्ठान हेतु WhatsApp पर पूछें
            </a>
            <button
              onClick={() => onNavigate(`/services/${s.slug}`)}
              data-event="cta_click" data-variant="F" data-location="service_detail_link" data-service={s.id}
              className="flex items-center justify-center gap-1 min-h-[40px] rounded-full border border-gold/60 text-maroon-deep font-bold text-xs hover:bg-cream-soft"
            >
              विस्तृत विधि • सामग्री • शुभ समय
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};
