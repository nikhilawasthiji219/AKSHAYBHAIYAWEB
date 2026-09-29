import React from 'react';
import { GraduationCap, Award, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../lib/languageContext';
import { ACHARYA_PROFILE } from '../data/acharya';

interface AcharyaProfileProps {
  onContactClick: () => void;
  showFullDetails?: boolean;
}

export const AcharyaProfile: React.FC<AcharyaProfileProps> = ({ onContactClick }) => {
  const { t } = useLanguage();
  return (
    <section className="py-16 bg-cream-light relative border-b border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-saffron uppercase tracking-widest font-serif">
              {t('ॐ धर्मो रक्षति रक्षितः', 'Om Dharo Rakshati RakshitaH')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-maroon">
              {t('आचार्य परिचय', 'Acharya Introduction')}
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left: Authentic Client Photo in ornamental frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="p-3 bg-gradient-to-br from-gold-light via-gold to-gold-dark rounded-2xl shadow-gold-md">
                <div className="bg-cream p-2 rounded-xl border border-gold/40">
                  <img
                    src={ACHARYA_PROFILE.photos.kurtaYellow}
                    alt={ACHARYA_PROFILE.name}
                    className="w-full h-96 object-cover object-top rounded-lg shadow-inner"
                  />
                  <div className="text-center pt-3 pb-1">
                    <p className="font-serif font-bold text-maroon text-base">
                      {ACHARYA_PROFILE.name}
                    </p>
                    <p className="text-xs text-saffron-dark font-medium">
                      {ACHARYA_PROFILE.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Authentic Credentials & Profile Information */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-saffron/10 text-saffron-dark border border-saffron/20 font-serif">
              {t('श्री महाकालेश्वर तीर्थ, उज्जैन', 'Shri Mahakaleshwar Dham, Ujjain')}
          </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-maroon mt-2">
                {ACHARYA_PROFILE.name}
              </h3>
              <p className="text-base font-serif text-saffron-dark font-medium">
                {ACHARYA_PROFILE.title}
              </p>
            </div>

            {/* Quote */}
            <blockquote className="border-l-4 border-gold pl-4 italic text-sm sm:text-base font-serif text-charcoal/90 bg-cream p-3 rounded-r-lg">
              "{ACHARYA_PROFILE.quote}"
            </blockquote>

            {/* Grid of Verified Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-cream p-3.5 rounded-lg border border-gold/40">
                <GraduationCap className="w-5 h-5 text-saffron flex-shrink-0 mt-0.5" />
                <div>
<h4 className="text-xs font-bold uppercase tracking-wider text-saffron-dark font-sans">
              {t('शिक्षा (Education)', 'Education')}
          </h4>
                  <p className="text-sm font-serif font-bold text-maroon mt-0.5">
              {t('शास्त्री — व्याकरण', 'Shastri - Grammar')}
          </p>
          <p className="text-sm font-serif font-bold text-maroon">
              {t('आचार्य — संस्कृत', 'Acharya - Sanskrit')}
          </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-cream p-3.5 rounded-lg border border-gold/40">
                <Award className="w-5 h-5 text-saffron flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-saffron-dark font-sans">
                    अनुभव (Experience)
                  </h4>
                  <p className="text-sm font-serif font-bold text-maroon mt-0.5">
                    {t('15+ वर्ष', '15+ years')}
                  </p>
                  <p className="text-xs text-charcoal/70 font-sans">
                    {t('वैदिक कर्मकांड एवं धार्मिक अनुष्ठान', 'Vedic Rituals and Religious Rituals')}
                  </p>
                </div>
              </div>
            </div>

            {/* Verified Expertise */}
            <div className="space-y-2 bg-cream p-4 rounded-lg border border-gold/40">
              <h4 className="text-xs font-bold uppercase tracking-wider text-saffron-dark font-sans flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-saffron" />
                {t('विशेषज्ञता (Vedic Expertise)', 'Vedic Expertise')}
              </h4>
              <p className="text-sm font-serif text-charcoal leading-relaxed">
                {ACHARYA_PROFILE.expertise}
              </p>
            </div>

            {/* Locations */}
            <div className="flex items-start gap-3 text-xs text-charcoal/80 font-sans">
              <MapPin className="w-4 h-4 text-saffron flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-maroon">{t('कर्मक्षेत्र:', 'Kshetra')}</span> {ACHARYA_PROFILE.contact.karmakshetra} | <span className="font-bold text-maroon">{t('निवास:', 'Residence')}</span> {ACHARYA_PROFILE.contact.homeAddress}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={onContactClick}
                className="px-6 py-3 rounded-lg bg-saffron hover:bg-saffron-dark text-white font-serif font-bold text-sm shadow-gold-sm hover:shadow-md transition-all flex items-center gap-2"
              >
                <span>{t('आचार्य से संपर्क करें', 'Contact Acharya')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
