import React from 'react';
import { SpecialAnushthan } from '../components/SpecialAnushthan';
import { BookingForm } from '../components/BookingForm';
import { ACHARYA_PROFILE } from '../data/acharya';
import { MessageCircle, Sparkles, ScrollText, CheckCircle2 } from 'lucide-react';

interface SpecialAnushthanPageProps {
  onNavigate?: (path: string) => void;
}

export const SpecialAnushthanPage: React.FC<SpecialAnushthanPageProps> = () => {
  const anushthanHighlights = [
    {
      title: "संकल्प आधारित अनुष्ठान",
      desc: "यजमान के विशिष्ट कुल, गोत्र और मनोरथ (संतान, स्वास्थ्य, गृह शांति, व्यवसाय) के अनुसार वैदिक विद्वानों द्वारा सविधि संकल्प।"
    },
    {
      title: "शास्त्रसम्मत समिधा व द्रव्य",
      desc: "पलाश, शमी, खैर, अपामार्ग, घृत, पंचामृत एवं औषधियों द्वारा शुद्ध वैदिक वेदी पर महायज्ञ।"
    },
    {
      title: "उज्जैन पावन तीर्थ सान्निध्य",
      desc: "श्री महाकालेश्वर ज्योतिर्लिंग, मंगलनाथ, सिद्धवट, हरसिद्धि शक्तिपीठ अथवा पावन रामघाट क्षिप्रा तट पर आयोजन।"
    },
    {
      title: "वैदिक ऋत्विक ब्राह्मण वरण",
      desc: "वेदपाठी, सदाचारी एवं व्याकरण-संहिता में निष्णात योग्य ब्राह्मणों द्वारा मंत्रोच्चार।"
    }
  ];

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Feature Banner */}
        <SpecialAnushthan onContactClick={() => {
          const formElement = document.getElementById('anushthan-booking');
          formElement?.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Explanations (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-cream-light p-6 sm:p-8 rounded-2xl border-2 border-gold/40 shadow-sm space-y-4">
              <span className="text-xs font-bold text-saffron uppercase tracking-widest font-serif flex items-center gap-1.5">
                <ScrollText className="w-4 h-4 text-saffron" /> ॥ यजमान संकल्प ॥
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-maroon">
                विशेष पूजन एवं अनुष्ठान क्या है?
              </h2>
              <div className="w-16 h-1 bg-gold"></div>

              <p className="text-sm sm:text-base font-serif text-charcoal/90 leading-relaxed">
                जीवन में कई बार परिस्थितियां ऐसी बनती हैं जब सामान्य दैनिक पूजन के अतिरिक्त किसी विशिष्ट देव-कृपा, ग्रह शांति अथवा दैहिक-दैविक-भौतिक तापों के निवारण हेतु दीर्घकालीन वैदिक अनुष्ठान की आवश्यकता होती है।
              </p>

              <p className="text-sm font-serif text-charcoal/80 leading-relaxed">
                शास्त्री अक्षय अवस्थी जी के सान्निध्य में यजमान अपने ग्रह-दोष, कुल परंपरा अथवा मनोरथ के अनुसार अनुष्ठान का स्वरूप तय कर सकते हैं। जैसे:
              </p>

              <ul className="space-y-2 text-xs sm:text-sm font-serif text-maroon">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-saffron flex-shrink-0" />
                  <span>सवा लाख महामृत्युंजय संपुट जप एवं दशांश हवन</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-saffron flex-shrink-0" />
                  <span>121 आवर्तन महारुद्र प्रयोग अथवा अतिरुद्र यज्ञ</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-saffron flex-shrink-0" />
                  <span>शतचंडी महायज्ञ (100 दुर्गा सप्तशती पाठ)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-saffron flex-shrink-0" />
                  <span>बगलामुखी शत्रु शमन एवं राजभय निवारण अनुष्ठान</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-saffron flex-shrink-0" />
                  <span>पार्थिव शिवलिंग निर्माण एवं महारुद्राभिषेक</span>
                </li>
              </ul>
            </div>

            {/* Highlights cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {anushthanHighlights.map((item, idx) => (
                <div key={idx} className="bg-cream-light p-4 rounded-xl border border-gold/40 space-y-1">
                  <h4 className="text-sm font-serif font-bold text-maroon flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-saffron" />
                    {item.title}
                  </h4>
                  <p className="text-xs font-serif text-charcoal/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct helpline banner */}
            <div className="bg-cream-light p-5 rounded-xl border border-gold/40 flex items-center justify-between">
              <div>
                <p className="text-xs font-serif text-saffron-dark font-bold">आचार्य जी से प्रत्यक्ष परामर्श</p>
                <p className="text-base font-bold font-sans text-maroon">+91 {ACHARYA_PROFILE.contact.primaryPhone}</p>
              </div>
              <a
                href={`https://wa.me/91${ACHARYA_PROFILE.contact.whatsappNumber}?text=${encodeURIComponent('प्रणाम शास्त्री जी, मैं अपने विशेष संकल्प/पूजन हेतु संपर्क कर रहा हूँ।')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold font-serif rounded-lg flex items-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right: Booking Form (6 cols) */}
          <div className="lg:col-span-6" id="anushthan-booking">
            <BookingForm preselectedService="Special Anushthan / Custom Puja" />
          </div>

        </div>

      </div>
    </div>
  );
};
