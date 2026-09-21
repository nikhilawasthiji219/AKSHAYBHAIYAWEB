import React from 'react';
import { ACHARYA_PROFILE } from '../data/acharya';
import { ShieldCheck, Lock } from 'lucide-react';

export const LegalPages: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  if (type === 'privacy') {
    return (
      <div className="bg-cream min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-maroon">
              गोपनीयता नीति (Privacy Policy)
            </h1>
            <p className="text-xs font-serif text-saffron-dark">
              अंतिम अद्यतन: 2026 | {ACHARYA_PROFILE.name}
            </p>
            <div className="w-20 h-0.5 bg-gold mx-auto"></div>
          </div>

          <div className="bg-cream-light rounded-2xl border border-gold/40 p-6 sm:p-10 shadow-sm space-y-6 text-sm font-serif text-charcoal/90 leading-relaxed">
            <div className="flex items-center gap-2 text-maroon font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-saffron" />
              <span>1. यजमान की धार्मिक व व्यक्तिगत जानकारी की सुरक्षा</span>
            </div>
            <p>
              {ACHARYA_PROFILE.name} की आधिकारिक वेबसाइट पर आपके द्वारा प्रदान किया गया नाम, संपर्क नंबर, जन्म विवरण (DOB/Birth Time), गोत्र अथवा पारिवारिक जानकारी पूर्णतः सुरक्षित एवं गोपनीय रखी जाती है।
            </p>

            <div className="flex items-center gap-2 text-maroon font-bold text-base">
              <Lock className="w-5 h-5 text-saffron" />
              <span>2. डेटा का उपयोग</span>
            </div>
            <p>
              आपके द्वारा साझा की गई जानकारी का उपयोग केवल और केवल आपके द्वारा अनुरोधित वैदिक पूजन, संकल्प एवं मुहूर्त परामर्श हेतु ही किया जाता है। हम किसी भी तृतीय पक्ष (Third-party) के साथ आपका डेटा साझा या विक्रय नहीं करते हैं।
            </p>

            <div className="flex items-center gap-2 text-maroon font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-saffron" />
              <span>3. संपर्क सूचना</span>
            </div>
            <p>
              यदि आपको अपनी जानकारी अथवा गोपनीयता के संबंध में कोई प्रश्न हो, तो आप सीधे <strong className="text-maroon">{ACHARYA_PROFILE.contact.email}</strong> अथवा <strong className="text-maroon">+91 {ACHARYA_PROFILE.contact.primaryPhone}</strong> पर संपर्क कर सकते हैं।
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-maroon">
            नियम एवं शर्तें (Terms & Conditions)
          </h1>
          <p className="text-xs font-serif text-saffron-dark">
            अंतिम अद्यतन: 2026 | {ACHARYA_PROFILE.name}
          </p>
          <div className="w-20 h-0.5 bg-gold mx-auto"></div>
        </div>

        <div className="bg-cream-light rounded-2xl border border-gold/40 p-6 sm:p-10 shadow-sm space-y-6 text-sm font-serif text-charcoal/90 leading-relaxed">
          <div className="flex items-center gap-2 text-maroon font-bold text-base">
            <ShieldCheck className="w-5 h-5 text-saffron" />
            <span>1. पूजन एवं अनुष्ठान स्वरूप</span>
          </div>
          <p>
            समस्त पूजन, संस्कार एवं अनुष्ठान सनातन वैदिक परंपराओं एवं शास्त्रोक्त विधि-विधान के अनुसार उज्जैन तीर्थ क्षेत्र अथवा यजमान के निर्धारित स्थान पर संपन्न कराए जाते हैं।
          </p>

          <div className="flex items-center gap-2 text-maroon font-bold text-base">
            <ShieldCheck className="w-5 h-5 text-saffron" />
            <span>2. मूल्य एवं दक्षिणा नीति</span>
          </div>
          <p>
            किसी भी अनुष्ठान की सामग्री, ऋत्विक ब्राह्मणों की संख्या एवं समयावधि के आधार पर यजमान को परामर्श के उपरांत स्पष्ट विवरण प्रदान किया जाता है। वेबसाइट पर कोई अग्रिम डिजिटल गेटवे भुगतान अनिवार्य नहीं है।
          </p>

          <div className="flex items-center gap-2 text-maroon font-bold text-base">
            <ShieldCheck className="w-5 h-5 text-saffron" />
            <span>3. तीर्थ मर्यादा एवं आचार संहिता</span>
          </div>
          <p>
            श्री महाकालेश्वर ज्योतिर्लिंग, मंगलनाथ एवं क्षिप्रा तट पर पूजन के समय तीर्थ क्षेत्र की मर्यादा एवं पारंपरिक परिधान (धोती-कुर्ता / साड़ी) का पालन करना यजमान हेतु शास्त्र सम्मत माना जाता है।
          </p>
        </div>
      </div>
    </div>
  );
};
