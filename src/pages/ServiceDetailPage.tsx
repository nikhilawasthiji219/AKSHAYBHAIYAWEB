import React from 'react';
import { Service } from '../types';
import { SERVICES_DATA } from '../data/services';
import { ACHARYA_PROFILE } from '../data/acharya';
import { VedicIcon } from '../components/VedicIcon';
import { ArrowLeft, Clock, CheckCircle2, ShieldAlert, Sparkles, MessageCircle } from 'lucide-react';

interface ServiceDetailPageProps {
  service: Service;
  onBack: () => void;
  onBookNow: (service: Service) => void;
  onSelectRelated: (service: Service) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onBack,
  onBookNow,
  onSelectRelated
}) => {
  const relatedServices = SERVICES_DATA.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-serif font-bold text-maroon hover:text-saffron transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>समस्त सेवाएँ पर लौटें (Back to Services)</span>
        </button>

        {/* Hero Card for Service */}
        <div className="bg-cream-light rounded-2xl border-2 border-gold/40 p-6 sm:p-10 shadow-gold-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/30 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-cream border-2 border-gold flex items-center justify-center text-saffron shadow-sm flex-shrink-0">
                <VedicIcon type={service.iconType} className="w-9 h-9" />
              </div>
              <div>
                <span className="text-xs font-bold text-saffron uppercase tracking-widest font-serif">
                  ॥ वैदिक कर्मकांड अनुष्ठान ॥
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold font-serif text-maroon">
                  {service.title}
                </h1>
                {service.badge && (
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-saffron/10 text-saffron-dark border border-saffron/30 text-xs font-serif font-bold">
                    {service.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Action */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => onBookNow(service)}
                className="px-5 py-2.5 rounded-lg bg-saffron hover:bg-saffron-dark text-white font-serif font-bold text-sm shadow-sm transition-all text-center"
              >
                Contact for Booking
              </button>
            </div>
          </div>

          {/* Short Intro */}
          <p className="text-base sm:text-lg font-serif text-charcoal/90 leading-relaxed italic bg-cream p-4 rounded-lg border-l-4 border-gold">
            "{service.shortDesc}"
          </p>

          {/* Section: Traditional Significance */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold font-serif text-maroon flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-saffron" />
              धार्मिक एवं शास्त्रोक्त महत्व (Significance)
            </h3>
            <p className="text-sm sm:text-base font-serif text-charcoal leading-relaxed">
              {service.significance}
            </p>
          </div>

          {/* Section: Methodology / Vidhi Vidhan */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xl font-bold font-serif text-maroon flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-saffron" />
              पूजन एवं अनुष्ठान विधि-विधान (Ritual Methodology)
            </h3>
            <p className="text-sm sm:text-base font-serif text-charcoal leading-relaxed">
              {service.methodology}
            </p>
          </div>

          {/* Section: Key Benefits */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xl font-bold font-serif text-maroon flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-saffron" />
              अनुष्ठान से प्राप्त फल एवं लाभ (Spiritual Benefits)
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {service.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-serif text-charcoal bg-cream p-3 rounded-lg border border-gold/30">
                  <span className="text-saffron font-bold">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Materials / Samagri Required */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xl font-bold font-serif text-maroon flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-saffron" />
              प्रमुख शास्त्रीय सामग्रियां (Sacred Materials)
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {service.materials.map((mat, idx) => (
                <span key={idx} className="px-3 py-1 rounded-md bg-cream border border-gold/40 text-xs font-serif text-maroon font-medium">
                  {mat}
                </span>
              ))}
            </div>
          </div>

          {/* Section: Suitable Timing / Muhurat */}
          <div className="bg-cream p-4 rounded-xl border border-gold/40 flex items-start gap-3">
            <Clock className="w-5 h-5 text-saffron flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-saffron-dark font-sans">
                शास्त्रोक्त शुभ काल एवं मुहूर्त (Suitable Timing)
              </h4>
              <p className="text-xs sm:text-sm font-serif text-charcoal/90 mt-0.5">
                {service.suitableTime}
              </p>
            </div>
          </div>

          {/* Pricing Policy Box */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-300 text-xs font-serif text-maroon space-y-1">
            <p className="font-bold">मूल्य निर्धारण संबंधी सूचना:</p>
            <p className="text-charcoal/80">
              प्रत्येक अनुष्ठान की सामग्री, अवधि एवं यजमान की आवश्यकता अलग होने के कारण निश्चित मूल्य प्रदर्शित नहीं किया गया है। शास्त्री जी से परामर्श उपरांत विधि और संकल्प के अनुसार विवरण दिया जाता है।
            </p>
          </div>

          {/* Bottom Booking CTA banner */}
          <div className="pt-4 border-t border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-serif font-bold text-maroon text-lg">
                क्या आप {service.title} संपन्न कराना चाहते हैं?
              </p>
              <p className="text-xs text-charcoal/70 font-sans">
                श्री महाकालेश्वर तीर्थ, उज्जैन में शास्त्रोक्त विधि से पूजन हेतु संपर्क करें।
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onBookNow(service)}
                className="flex-1 sm:flex-none px-6 py-3 bg-saffron hover:bg-saffron-dark text-white font-serif font-bold text-sm rounded-lg shadow-gold-sm transition-all"
              >
                Contact for Booking
              </button>

              <a
                href={`https://wa.me/91${ACHARYA_PROFILE.contact.whatsappNumber}?text=${encodeURIComponent(
                  `प्रणाम शास्त्री जी, मैं "${service.title}" के बारे में विस्तृत जानकारी एवं बुकिंग हेतु संपर्क कर रहा हूँ।`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg shadow-sm transition-all"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Related Services */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-serif text-maroon">
            संबंधित अन्य वैदिक अनुष्ठान (Related Rituals)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedServices.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectRelated(rel)}
                className="bg-cream-light p-4 rounded-xl border border-gold/40 hover:border-saffron hover:shadow-sm cursor-pointer transition-all space-y-1"
              >
                <div className="w-8 h-8 rounded bg-cream border border-gold/40 flex items-center justify-center text-saffron mb-2">
                  <VedicIcon type={rel.iconType} className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-sm text-maroon line-clamp-1">
                  {rel.title}
                </h4>
                <p className="text-xs font-serif text-charcoal/70 line-clamp-2">
                  {rel.shortDesc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
