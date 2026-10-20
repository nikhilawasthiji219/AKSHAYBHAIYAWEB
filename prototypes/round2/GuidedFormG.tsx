import React, { useState } from 'react';
import { Send, PhoneCall } from 'lucide-react';
import { SERVICES_DATA } from '../../src/data/services';

// Variant G — संरचित बुकिंग (Guided booking form → WhatsApp)
// Dimension: बुकिंग-मार्ग। Hypothesis: एक तापमान-पूर्ण booking खंड (सेवा + तिथि-प्रयोजन + प्रयोग स्थान)
// से पूर्व-भरित संदेश जाए — शास्त्री जी को चैट का बोझ घटे, गंभीर यजमान पहचान में आएं।
// NOTE: असली ₹/मूल्य प्रदर्शन नहीं (design §25 — असत्य संख्या/मूल्य वर्जित), केवल संकल्प-सूचना।

const WA = 'https://wa.me/919300096938';
const OTHER = 'अन्य अनुष्ठान / परामर्श';

export const GuidedFormG: React.FC<{ onNavigate: (p: string) => void }> = () => {
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [mode, setMode] = useState<'ujjain' | 'online'>('ujjain');
  const minDate = new Date().toISOString().slice(0, 10);

  const serviceOptions = SERVICES_DATA.filter((s) => s.featured).slice(0, 6).map((s) => s.title);
  const options = [...serviceOptions, OTHER];

  const message = [
    'प्रणाम शास्त्री जी, बुकिंग अनुरोध:',
    `• अनुष्ठान: ${service || 'परामर्श हेतु संपर्क'}`,
    date ? `• वांछित तिथि प्रयोजन: ${date}` : '• तिथि: मुहूर्त अप्रत्यक्ष निर्देश हेतु खुला',
    `• प्रयोग रूप: ${mode === 'ujjain' ? 'उज्जैन में उपस्थिति' : 'ऑनलाइन अनुष्ठान/जाप'}`,
    'कृपया मुहूर्त, विधि-विधान एवं आगे की प्रक्रिया बताएं।',
  ].join('\n');

  const waHref = `${WA}?text=${encodeURIComponent(message)}`;

  return (
    <div className="rounded-2xl overflow-hidden border-2 border-gold/50 shadow-gold-md">
      <div className="bg-maroon-gradient text-cream-light px-5 py-3">
        <h4 className="font-serif text-lg font-bold">बुकिंग अनुरोध — चार चरण, एक संदेश</h4>
        <p className="text-[11px] text-cream-light/80">
          अनुष्ठान चुनें → तिथि प्रयोजन का इशारा → प्रयोग स्थान → WhatsApp पर भेजें
        </p>
      </div>

      <form
        className="bg-cream-light p-4 space-y-4"
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          window.open(waHref, '_blank', 'noopener,noreferrer');
        }}
      >
        {/* 1. अनुष्ठान chips */}
        <div>
          <label className="block text-xs font-bold text-maroon-deep mb-2">१ • अनुष्ठान चुनें</label>
          <div className="flex flex-wrap gap-2" role="group" aria-label="अनुष्ठान चयन">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setService(service === opt ? '' : opt)}
                aria-pressed={service === opt}
                className={`min-h-[40px] rounded-full px-4 text-xs font-bold border transition ${
                  service === opt
                    ? 'bg-saffron text-white border-saffron-dark shadow-saffron-md'
                    : 'bg-white text-charcoal border-gold/50 hover:border-gold'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 2. तिथि */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="pt-date" className="block text-xs font-bold text-maroon-deep mb-1.5">
              २ • वांछित तिथि (वैकल्पिक)
            </label>
            <input
              id="pt-date"
              type="date"
              min={minDate}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full min-h-[44px] rounded-xl border border-gold/50 bg-white px-3 text-sm text-charcoal"
            />
          </div>

          {/* 3. प्रयोग स्थान */}
          <div className="text-xs font-bold text-maroon-deep">
            <span className="block mb-1.5">३ • प्रयोग स्थान</span>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 min-h-[36px] rounded-xl border border-gold/40 bg-white px-3 cursor-pointer">
                <input
                  type="radio" name="pt-mode" value="ujjain" checked={mode === 'ujjain'}
                  onChange={() => setMode('ujjain')}
                  className="w-4 h-4 accent-saffron"
                />
                उज्जैन में उपस्थिति
              </label>
              <label className="flex items-center gap-2 min-h-[36px] rounded-xl border border-gold/40 bg-white px-3 cursor-pointer">
                <input
                  type="radio" name="pt-mode" value="online" checked={mode === 'online'}
                  onChange={() => setMode('online')}
                  className="w-4 h-4 accent-saffron"
                />
                ऑनलाइन अनुष्ठान/जाप
              </label>
            </div>
          </div>
        </div>

        {/* 4. भेजें */}
        <div className="flex flex-wrap gap-2.5 items-center">
          <button
            type="submit"
            data-event="form_submit_success" data-variant="G" data-location="booking_form"
            className="flex items-center justify-center gap-2 min-h-[48px] rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 shadow-sm"
          >
            <Send className="w-4 h-4" />
            व्याप्त विवरण सहित WhatsApp भेजें
          </button>
          <a
            href="tel:9300096938"
            data-event="cta_click" data-variant="G" data-location="booking_form_fallback"
            className="flex items-center gap-2 min-h-[44px] rounded-full border border-gold/60 px-4 text-maroon-deep font-bold text-xs hover:bg-cream-soft"
          >
            <PhoneCall className="w-4 h-4" />
            फ़ोन पर परामर्श
          </a>
        </div>
        <p className="text-[10px] text-charcoal/55">संदेश आपकी दी हुई जानकारी से पूर्व-भरित होकर WhatsApp में खुलता है।</p>
      </form>
    </div>
  );
};
