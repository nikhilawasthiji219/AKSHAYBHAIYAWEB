import React from 'react';
import { PhoneCall, MessageCircle, CalendarCheck } from 'lucide-react';
import { VedicIcon } from '../../src/components/VedicIcon';
import { SERVICES_DATA } from '../../src/data/services';

// Variant E — निरंतर उपलब्धता (Persistent Booking Bar)
// Dimension: बुकिंग-मार्ग। Hypothesis: स्क्रॉल के हर बिंदु पर बुकिंग एक ही टैप दूर रहे —
// सेवा-कार्ड पर अलग CTA नहीं (शोर शून्य), लेकिन पेज कहीं से भी WhatsApp/Call/बुकिंग तक खुला।
// NOTE: मौजूदा MobileBottomBar "nav-first" है; E उसका "booking-first" प्रस्ताव है।

const WA = 'https://wa.me/919300096938';
const WA_MSG = encodeURIComponent(
  'प्रणाम शास्त्री जी। मैं उज्जैन में वैदिक कर्मकांड / अनुष्ठान की बुकिंग हेतु जानकारी चाहता हूँ। शुभ मुहूर्त एवं आगे की प्रक्रिया का निर्देश करें।'
);

export const BookingBarE: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const featured = SERVICES_DATA.filter((s) => s.featured).slice(0, 4);

  return (
    <div>
      {/* मिनि-स्क्रॉल व्यूपोर्ट — व्यवहार यहीं दिखता है */}
      <div className="relative h-80 overflow-y-auto rounded-xl border-2 border-gold/40 bg-cream-light">
        <div className="px-4 pt-4 pb-2 text-center bg-cream-soft">
          <h3 className="font-serif text-lg font-bold text-maroon-deep">वैदिक कर्मकांड एवं अनुष्ठान — उज्जैन</h3>
          <p className="text-[11px] text-charcoal/70">
            शास्त्री (व्याकरण) • आचार्य (संस्कृत) • 15+ वर्ष अनुभव
          </p>
        </div>

        <ul className="px-4 py-3 space-y-3">
          {featured.map((s) => (
            <li key={s.id} className="flex items-center gap-3 rounded-xl border border-gold/30 bg-white px-3 py-2.5">
              <span className="shrink-0 w-10 h-10 rounded-full bg-gold-pale flex items-center justify-center">
                <VedicIcon type={s.iconType} className="w-6 h-6 text-saffron-dark" />
              </span>
              <span className="min-w-0">
                <span className="block font-serif font-bold text-charcoal text-sm">{s.title}</span>
                <span className="block text-[11px] text-charcoal/60 truncate">{s.shortDesc}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="h-24" /> {/* स्क्रॉल खेलने के लिए जगह */}

        {/* Sticky बुकिंग-बार — व्यूपोर्ट के निचले हिस्से में चिपका रहता है */}
        <div className="sticky bottom-0 z-10">
          <div
            className="flex items-center gap-2 bg-maroon-deep/97 backdrop-blur px-3 py-2 border-t-2 border-gold"
            style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))' }}
          >
            <a
              href="tel:9300096938"
              aria-label="फ़ोन करें"
              data-event="cta_click" data-variant="E" data-location="booking_bar"
              className="flex flex-col items-center justify-center min-h-[44px] min-w-[56px] rounded-xl text-white/90 hover:text-white"
            >
              <PhoneCall className="w-5 h-5" />
              <span className="text-[10px] font-bold">फ़ोन</span>
            </a>
            <a
              href={`${WA}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              data-event="whatsapp_open" data-variant="E" data-location="booking_bar"
              className="flex-1 flex items-center justify-center gap-2 min-h-[44px] min-w-[64px] rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp पर बुक करें
            </a>
            <button
              onClick={() => onNavigate('/contact')}
              aria-label="बुकिंग अनुरोध भरें"
              data-event="cta_click" data-variant="E" data-location="booking_bar"
              className="flex flex-col items-center justify-center min-h-[44px] min-w-[56px] rounded-xl text-white/90 hover:text-white"
            >
              <CalendarCheck className="w-5 h-5" />
              <span className="text-[10px] font-bold">बुकिंग</span>
            </button>
          </div>
        </div>
      </div>

      <p className="mt-2 text-[11px] text-charcoal/65">
        डेस्कटॉप हेडर: नेविगेशन के साथ ही <strong>WhatsApp / फ़ोन</strong> फ़िक्स हेतु सुझाव — उसी सिद्धांत का desktop नमूना है।
      </p>
    </div>
  );
};
