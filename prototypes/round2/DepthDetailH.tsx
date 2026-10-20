import React, { useState } from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';
import { VedicIcon } from '../../src/components/VedicIcon';
import { SERVICES_DATA } from '../../src/data/services';

// Variant H — गहराई पहले (Depth-first / expandable detail)
// Dimension: बुकिंग-मार्ग। Hypothesis: यजमान पहले आचार्य की विद्वत्ता जांचता है —
// कार्ड फैलकर मूल सिद्धांत • विधि • सामग्री • शुभ समय सीधे दिखे, फिर दो sachche CTA।
// लक्ष्य: गंभीर यजमान का विश्वास बने — कम अधिक से अधिक गंभीर प्रश्न।

const WA = 'https://wa.me/919300096938';

export const DepthDetailH: React.FC<{ onNavigate: (p: string) => void }> = () => {
  const featured = SERVICES_DATA.filter((s) => s.featured).slice(0, 4);
  const [openId, setOpenId] = useState<string>(featured[1]?.id ?? featured[0].id);

  return (
    <div className="space-y-3">
      {featured.map((s) => {
        const open = s.id === openId;
        return (
          <article
            key={s.id}
            className={`rounded-2xl border-2 overflow-hidden bg-white transition ${
              open ? 'border-gold shadow-gold-md' : 'border-gold/35 shadow-gold-sm'
            }`}
          >
            <button
              onClick={() => setOpenId(open ? '' : s.id)}
              aria-expanded={open}
              data-event="service_select" data-variant="H" data-location="service_detail" data-service={s.id}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
            >
              <span className="shrink-0 w-11 h-11 rounded-xl bg-gold-pale flex items-center justify-center">
                <VedicIcon type={s.iconType} className="w-7 h-7 text-saffron-dark" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-[15px] font-bold text-charcoal">{s.title}</span>
                <span className="block text-[11px] text-charcoal/60">{s.badge ?? 'शास्त्रोक्त विधि-विधान'}</span>
              </span>
              <span
                aria-hidden="true"
                className={`text-gold-dark text-xl font-serif transition-transform ${open ? 'rotate-45' : ''}`}
              >
                ＋
              </span>
            </button>

            <div className={`grid transition-all ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <div className="px-4 py-3 rounded-b-2xl bg-cream-soft space-y-2.5 animate-fadeIn">
                  <p className="text-[12px] leading-relaxed text-charcoal/85">
                    <strong className="font-serif text-maroon-deep">मूल सिद्धांत:</strong> {s.significance}
                  </p>
                  <p className="text-[12px] leading-relaxed text-charcoal/85">
                    <strong className="font-serif text-maroon-deep">विधि-विधान:</strong> {s.methodology}
                  </p>
                  <p className="text-[12px] leading-relaxed text-charcoal/85">
                    <strong className="font-serif text-maroon-deep">आवश्यक सामग्री:</strong> {s.materials.slice(0, 6).join(' • ')}
                  </p>
                  <p className="text-[12px] leading-relaxed text-charcoal/85">
                    <strong className="font-serif text-maroon-deep">शुभ समय:</strong> {s.suitableTime}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={`${WA}?text=${encodeURIComponent(
                        `प्रणाम शास्त्री जी। मुझे "${s.title}" अनुष्ठान हेतु मुहूर्त एवं विधि-विधान जानकारी चाहिए।`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-event="whatsapp_open" data-variant="H" data-location="service_detail" data-service={s.id}
                      className="flex items-center gap-2 min-h-[44px] rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[13px] px-5"
                    >
                      <MessageCircle className="w-4 h-4" />
                      बातचीत/बुकिंग
                    </a>
                    <a
                      href="tel:9300096938"
                      data-event="cta_click" data-variant="H" data-location="service_detail_call"
                      className="flex items-center gap-2 min-h-[44px] rounded-full border border-gold/60 px-4 text-maroon-deep font-bold text-[13px] hover:bg-white"
                    >
                      <PhoneCall className="w-4 h-4" />
                      फ़ोन पर सुनें
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
      <p className="text-[11px] text-charcoal/60">कार्ड फैलते हैं: पहला प्रश्न अपने आप बता देता है — "क्या ये महामंत्र अनुष्ठान है?"</p>
    </div>
  );
};
