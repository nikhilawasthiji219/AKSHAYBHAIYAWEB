import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/services';
import { ACHARYA_PROFILE } from '../data/acharya';
import { Phone, Mail, MapPin, CheckCircle2, MessageCircle } from 'lucide-react';
import { ContactFormData } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    mobileNumber: '',
    dateOfBirth: '',
    birthTime: '',
    serviceRequired: '',
    message: '',
    isCustomPuja: false,
    isBookingSystem: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobileNumber) {
      alert('कृपया नाम एवं मोबाइल नंबर दर्ज करें।');
      return;
    }
    setIsSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const message = `*॥ श्री गणेशाय नमः ॥*
*पूजन/अनुष्ठान enquiry:*
- *नाम:* ${formData.fullName || 'उल्लेखित नहीं'}
- *मोबाइल:* ${formData.mobileNumber || 'उल्लेखित नहीं'}
- *जन्म तिथि:* ${formData.dateOfBirth || 'उपलब्ध नहीं'}
- *जन्म समय:* ${formData.birthTime || 'उपलब्ध नहीं'}
- *सेवा/पूजन:* ${formData.isCustomPuja ? 'विशेष पूजन/Custom Anushthan' : formData.serviceRequired || 'सामान्य परामर्श'}
- *संदेश:* ${formData.message || 'कोई अतिरिक्त संदेश नहीं'}

*प्रणाम शास्त्री जी, कृपया मार्गदर्शन प्रदान करें।*`;

    window.open(
      `https://wa.me/91${ACHARYA_PROFILE.contact.whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <section className="py-12 bg-[#FFF8E8] relative" id="contact">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with 'संपर्क करें' matching bottom-center mockup */}
        <div className="text-center mb-8 relative">
          <div className="inline-block px-6 py-1.5 rounded-full bg-[#FFF0D4] border border-[#C89B3C]/40">
            <span className="font-serif font-bold text-base text-[#641E12]">
              संपर्क करें
            </span>
            <span className="text-[11px] font-serif text-[#C94F08] ml-2">
              (पूजन/अनुष्ठान परामर्श)
            </span>
          </div>
        </div>

        {/* 2-Column Box matching exact layout of bottom center mockup */}
        <div className="bg-[#FFFDF7] rounded-2xl border border-[#C89B3C]/40 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Acharya info & Hotline */}
            <div className="md:col-span-5 space-y-4 text-xs font-serif">
              <div>
                <h3 className="text-lg font-bold font-serif text-[#3B1D0B]">
                  {ACHARYA_PROFILE.name}
                </h3>
                <p className="text-[11px] text-[#7D2918] font-medium">
                  {ACHARYA_PROFILE.title}
                </p>
              </div>

              {/* Phone numbers */}
              <div className="flex items-start gap-2.5 pt-1">
                <div className="w-5 h-5 rounded-full border border-[#C94F08] flex items-center justify-center text-[#C94F08] flex-shrink-0 mt-0.5">
                  <Phone className="w-3 h-3" />
                </div>
                <div className="font-sans font-semibold text-xs text-[#3B1D0B] space-y-0.5">
                  <p>9300096938</p>
                  <p>8982102113</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full border border-[#C94F08] flex items-center justify-center text-[#C94F08] flex-shrink-0 mt-0.5">
                  <Mail className="w-3 h-3" />
                </div>
                <p className="font-sans text-[11px] text-[#3B1D0B] break-all">
                  {ACHARYA_PROFILE.contact.email}
                </p>
              </div>

              {/* Residence */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full border border-[#C94F08] flex items-center justify-center text-[#C94F08] flex-shrink-0 mt-0.5">
                  <MapPin className="w-3 h-3" />
                </div>
                <p className="text-[11px] text-[#2B2118] leading-relaxed">
                  D21A, हाटकेश्वर विहार कॉलोनी,<br />
                  चिंतामण रोड, उज्जैन, मध्य प्रदेश
                </p>
              </div>

              {/* Karmakshetra */}
              <div className="pt-2 border-t border-[#C89B3C]/20 text-[11px] text-[#641E12]">
                <strong className="text-[#3B1D0B]">कर्मक्षेत्र:</strong> {ACHARYA_PROFILE.contact.karmakshetra}
              </div>

              {/* Direct WhatsApp Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/91${ACHARYA_PROFILE.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-serif font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp पर तुरंत चर्चा करें</span>
                </a>
              </div>
            </div>

            {/* Right Column: Form matching exact mockup fields */}
            <div className="md:col-span-7">
              <h4 className="font-serif font-bold text-xs text-[#641E12] mb-3">
                पूजन/अनुष्ठान हेतु पूछताछ करें
              </h4>

              {isSubmitted ? (
                <div className="bg-[#FFF8E8] border border-emerald-400 p-6 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <p className="font-serif font-bold text-sm text-[#3B1D0B]">
                    आपकी enquiry प्राप्त हो गई है। शीघ्र संपर्क किया जाएगा।
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-[#C94F08] underline font-serif"
                  >
                    अन्य संदेश भेजें
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs font-serif">
                  
                  {/* Row 1: Name & Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="नाम *"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-[#C89B3C]/40 bg-[#FFFDF7] text-xs font-sans focus:outline-none focus:border-[#C94F08]"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="मोबाइल नंबर *"
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-[#C89B3C]/40 bg-[#FFFDF7] text-xs font-sans focus:outline-none focus:border-[#C94F08]"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 2: DOB & Birth Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="जन्म तिथि (DD/MM/YYYY)"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-[#C89B3C]/40 bg-[#FFFDF7] text-xs font-sans focus:outline-none focus:border-[#C94F08]"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="जन्म समय (उदा. 10:30 AM)"
                        value={formData.birthTime}
                        onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-[#C89B3C]/40 bg-[#FFFDF7] text-xs font-sans focus:outline-none focus:border-[#C94F08]"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service Selection */}
                  <div>
                    <select
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-[#C89B3C]/40 bg-[#FFFDF7] text-xs font-serif focus:outline-none focus:border-[#C94F08]"
                    >
                      <option value="">-- आवश्यक पूजन / सेवा चुनें --</option>
                      {SERVICES_DATA.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  {/* Row 4: Message */}
                  <div>
                    <textarea
                      rows={2}
                      placeholder="संदेश..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-[#C89B3C]/40 bg-[#FFFDF7] text-xs font-sans focus:outline-none focus:border-[#C94F08]"
                    />
                  </div>

                  {/* Checkboxes matching mockup */}
                  <div className="flex items-center gap-4 text-[11px] pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isCustomPuja}
                        onChange={(e) => setFormData({ ...formData, isCustomPuja: e.target.checked })}
                        className="w-3.5 h-3.5 text-[#C94F08]"
                      />
                      <span>Request Custom Puja</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isBookingSystem}
                        onChange={(e) => setFormData({ ...formData, isBookingSystem: e.target.checked })}
                        className="w-3.5 h-3.5 text-[#C94F08]"
                      />
                      <span>Booking System</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 px-4 rounded bg-[#D9610B] hover:bg-[#B84904] text-white font-serif font-bold text-xs shadow-xs transition-colors"
                    >
                      पूजन/अनुष्ठान के लिए संपर्क करें
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppSend}
                      className="px-3 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-serif text-xs font-bold transition-colors"
                      title="WhatsApp पर भेजें"
                    >
                      WhatsApp
                    </button>
                  </div>

                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
