import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/services';
import { ACHARYA_PROFILE } from '../data/acharya';
import { Send, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import { ContactFormData } from '../types';

interface BookingFormProps {
  preselectedService?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    mobileNumber: '',
    dateOfBirth: '',
    birthTime: '',
    serviceRequired: preselectedService || '',
    message: '',
    isCustomPuja: false,
    isBookingSystem: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'कृपया अपना नाम दर्ज करें (Name is required)';
    }

    // Indian mobile number: 10 digits starting with 6,7,8,9
    const cleanPhone = formData.mobileNumber.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs.mobileNumber = 'कृपया 10 अंकों का मान्य भारतीय मोबाइल नंबर दर्ज करें';
    }

    if (!formData.serviceRequired && !formData.isCustomPuja) {
      errs.serviceRequired = 'कृपया आवश्यक पूजन / अनुष्ठान का चयन करें';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate enquiry capture
    setIsSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    if (!validate()) return;

    const message = `*॥ श्री गणेशाय नमः ॥*
*पूजन/अनुष्ठान enquiry:*
- *नाम:* ${formData.fullName}
- *मोबाइल:* ${formData.mobileNumber}
- *जन्म तिथि:* ${formData.dateOfBirth || 'उपलब्ध नहीं'}
- *जन्म समय:* ${formData.birthTime || 'उपलब्ध नहीं'}
- *सेवा/पूजन:* ${formData.isCustomPuja ? 'विशेष पूजन/Custom Anushthan' : formData.serviceRequired}
- *संदेश/संकल्प:* ${formData.message || 'कोई अतिरिक्त संदेश नहीं'}

*प्रणाम शास्त्री जी, कृपया मार्गदर्शन प्रदान करें।*`;

    window.open(
      `https://wa.me/91${ACHARYA_PROFILE.contact.whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <div className="bg-cream-light rounded-2xl border-2 border-gold/50 p-6 sm:p-8 shadow-gold-md">
      
      {/* Form Header */}
      <div className="text-center mb-6 space-y-1">
        <span className="text-xs font-bold text-saffron uppercase tracking-widest font-serif">
          ॥ ॐ नमः शिवाय ॥
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold font-serif text-maroon">
          पूजन/अनुष्ठान के लिए संपर्क करें
        </h3>
        <p className="text-xs sm:text-sm font-serif text-charcoal/80">
          प्रत्येक अनुष्ठान की सामग्री, अवधि एवं स्वरूप अलग होने के कारण मूल्य संपर्क के बाद बताया जाएगा।
        </p>
      </div>

      {isSubmitted ? (
        <div className="text-center py-10 px-4 space-y-4 bg-cream rounded-xl border border-emerald-400">
          <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
          <h4 className="text-2xl font-bold font-serif text-maroon">
            आपकी enquiry प्राप्त हो गई है।
          </h4>
          <p className="text-base font-serif text-charcoal/90">
            शास्त्री अक्षय अवस्थी जी शीघ्र आपसे संपर्क करेंगे।
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  fullName: '',
                  mobileNumber: '',
                  dateOfBirth: '',
                  birthTime: '',
                  serviceRequired: '',
                  message: '',
                  isCustomPuja: false,
                  isBookingSystem: true
                });
              }}
              className="text-xs font-serif text-saffron-dark underline"
            >
              अन्य enquiry दर्ज करें
            </button>
            <button
              onClick={handleWhatsAppSend}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-semibold flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp पर भी प्रेषित करें
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Row 1: Name & Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold font-serif text-maroon mb-1">
                यजमान का नाम (Full Name) *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="उदा. राहुल शर्मा"
                className={`w-full px-3.5 py-2.5 rounded-lg bg-cream border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-saffron/40 ${
                  errors.fullName ? 'border-red-500' : 'border-gold/40'
                }`}
              />
              {errors.fullName && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold font-serif text-maroon mb-1">
                मोबाइल नंबर (Mobile Number) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-charcoal/60 font-sans font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  placeholder="9876543210"
                  className={`w-full pl-11 pr-3.5 py-2.5 rounded-lg bg-cream border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-saffron/40 ${
                    errors.mobileNumber ? 'border-red-500' : 'border-gold/40'
                  }`}
                />
              </div>
              {errors.mobileNumber && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.mobileNumber}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: DOB & Birth Time (Optional, useful for Kundali & Vedic Muhurat) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold font-serif text-maroon mb-1">
                जन्म तिथि (DOB - यदि ज्ञात हो)
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-cream border border-gold/40 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold font-serif text-maroon mb-1">
                जन्म समय (Birth Time - यदि ज्ञात हो)
              </label>
              <input
                type="time"
                value={formData.birthTime}
                onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-cream border border-gold/40 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-saffron/40"
              />
            </div>
          </div>

          {/* Row 3: Required Service Dropdown */}
          <div>
            <label className="block text-xs font-bold font-serif text-maroon mb-1">
              अपेक्षित पूजन / अनुष्ठान (Required Puja / Service) *
            </label>
            <select
              value={formData.serviceRequired}
              onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
              disabled={formData.isCustomPuja}
              className={`w-full px-3.5 py-2.5 rounded-lg bg-cream border text-sm font-serif focus:outline-none focus:ring-2 focus:ring-saffron/40 ${
                formData.isCustomPuja ? 'bg-stone-200 text-stone-500 cursor-not-allowed' : 'text-charcoal'
              } ${errors.serviceRequired ? 'border-red-500' : 'border-gold/40'}`}
            >
              <option value="">-- पूजन का चयन करें --</option>
              {SERVICES_DATA.map((srv) => (
                <option key={srv.id} value={srv.title}>
                  {srv.title}
                </option>
              ))}
            </select>
            {errors.serviceRequired && (
              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.serviceRequired}
              </p>
            )}
          </div>

          {/* Checkboxes specified in prompt */}
          <div className="flex flex-wrap items-center gap-6 py-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.isCustomPuja}
                onChange={(e) => setFormData({ ...formData, isCustomPuja: e.target.checked })}
                className="w-4 h-4 rounded text-saffron focus:ring-saffron border-gold/50"
              />
              <span className="text-xs font-serif font-bold text-maroon">
                ☐ Request Custom Puja (विशेष संकल्प आधारित पूजन)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.isBookingSystem}
                onChange={(e) => setFormData({ ...formData, isBookingSystem: e.target.checked })}
                className="w-4 h-4 rounded text-saffron focus:ring-saffron border-gold/50"
              />
              <span className="text-xs font-serif font-semibold text-charcoal/80">
                ☐ Booking System (सीधे परामर्श व समय निर्धारण)
              </span>
            </label>
          </div>

          {/* Message / Sankalp */}
          <div>
            <label className="block text-xs font-bold font-serif text-maroon mb-1">
              संदेश / पारिवारिक मनोरथ (Message)
            </label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="अपनी समस्या, अभीष्ट तिथि या विशेष मनोरथ लिखें..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-cream border border-gold/40 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-saffron/40"
            />
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              className="w-full sm:flex-1 py-3.5 px-6 rounded-lg bg-saffron hover:bg-saffron-dark text-white font-serif font-bold text-base shadow-saffron-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>पूजन/अनुष्ठान के लिए संपर्क करें</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppSend}
              className="w-full sm:w-auto py-3.5 px-5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-serif font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>WhatsApp द्वारा भेजें</span>
            </button>
          </div>

          <p className="text-[11px] text-center text-charcoal/60 font-sans">
            🔒 आपकी समस्त व्यक्तिगत व धार्मिक जानकारी पूर्णतः सुरक्षित एवं गोपनीय रखी जाती है।
          </p>

        </form>
      )}

    </div>
  );
};
