import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/services';
import { Send, CheckCircle2, MessageCircle, AlertCircle, ExternalLink } from 'lucide-react';
import type { ContactFormData } from '../types';
import { sendEnquiryViaWhatsApp, validateEnquiry, type EnquiryErrors } from '../lib/enquiry';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface BookingFormProps {
  preselectedService?: string;
}

/** Radix Select forbids an empty string value, so use a sentinel for "none". */
const SERVICE_NONE = '__none__';

const emptyForm = (service = ''): ContactFormData => ({
  fullName: '',
  mobileNumber: '',
  dateOfBirth: '',
  birthTime: '',
  serviceRequired: service,
  message: '',
  isCustomPuja: false,
  isBookingSystem: true,
});

export const BookingForm: React.FC<BookingFormProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState<ContactFormData>(() => emptyForm(preselectedService));
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waUrl, setWaUrl] = useState('');

  const update = <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateEnquiry(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // Guaranteed delivery path: hand the enquiry to WhatsApp.
    setWaUrl(sendEnquiryViaWhatsApp(formData));
    setIsSubmitted(true);
  };

  /** Re-open WhatsApp from the success screen (user may have closed it). */
  const resendToWhatsApp = () => {
    setWaUrl(sendEnquiryViaWhatsApp(formData));
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
          <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
          <h4 className="text-2xl font-bold font-serif text-maroon">
            WhatsApp पर enquiry भेजें
          </h4>
          <p className="text-base font-serif text-charcoal/90 max-w-md mx-auto">
            आपका विवरण तैयार है। कृपया WhatsApp में{' '}
            <strong>Send</strong> दबाकर शास्त्री जी तक संदेश पहुँचाएँ। यदि WhatsApp
            नहीं खुला तो नीचे दिए लिंक का उपयोग करें।
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData(emptyForm(preselectedService));
                setErrors({});
              }}
              className="text-xs font-serif text-saffron-dark underline min-h-[44px] px-2"
            >
              अन्य enquiry दर्ज करें
            </button>
            <button
              onClick={resendToWhatsApp}
              className="min-h-[44px] px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp फिर से खोलें
            </button>
          </div>
          {waUrl && (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-charcoal/60 underline break-all"
            >
              <ExternalLink className="w-3 h-3 shrink-0" /> WhatsApp नहीं खुला? यहाँ क्लिक करें
            </a>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Row 1: Name & Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="booking-name" className="text-xs font-bold font-serif text-maroon">
                यजमान का नाम (Full Name) *
              </Label>
              <Input
                id="booking-name"
                type="text"
                autoComplete="name"
                value={formData.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                placeholder="उदा. राहुल शर्मा"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? 'booking-name-error' : undefined}
                className={`text-sm font-sans focus:ring-saffron/40 ${
                  errors.fullName ? 'border-red-500' : 'border-gold/40'
                }`}
              />
              {errors.fullName && (
                <p id="booking-name-error" className="text-[11px] text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.fullName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-mobile" className="text-xs font-bold font-serif text-maroon">
                मोबाइल नंबर (Mobile Number) *
              </Label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-charcoal/60 font-sans font-bold">
                  +91
                </span>
                <Input
                  id="booking-mobile"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={10}
                  value={formData.mobileNumber}
                  onChange={(e) => update('mobileNumber', e.target.value)}
                  placeholder="9876543210"
                  aria-invalid={Boolean(errors.mobileNumber)}
                  aria-describedby={errors.mobileNumber ? 'booking-mobile-error' : undefined}
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-cream text-sm font-sans focus:ring-saffron/40 ${
                    errors.mobileNumber ? 'border-red-500' : 'border-gold/40'
                  }`}
                />
              </div>
              {errors.mobileNumber && (
                <p id="booking-mobile-error" className="text-[11px] text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.mobileNumber}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: DOB & Birth Time (optional, for Kundali & Muhurat) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="booking-dob" className="text-xs font-bold font-serif text-maroon">
                जन्म तिथि (DOB - यदि ज्ञात हो)
              </Label>
              <Input
                id="booking-dob"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => update('dateOfBirth', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-cream border border-gold/40 text-sm font-sans focus:ring-saffron/40"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-time" className="text-xs font-bold font-serif text-maroon">
                जन्म समय (Birth Time - यदि ज्ञात हो)
              </Label>
              <Input
                id="booking-time"
                type="time"
                value={formData.birthTime}
                onChange={(e) => update('birthTime', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-cream border border-gold/40 text-sm font-sans focus:ring-saffron/40"
              />
            </div>
          </div>

          {/* Row 3: Required Service Dropdown */}
          <div className="space-y-2">
            <Label className="text-xs font-bold font-serif text-maroon">
              अपेक्षित पूजन / अनुष्ठान (Required Puja / Service) *
            </Label>
            <Select
              value={formData.serviceRequired || SERVICE_NONE}
              onValueChange={(value) => update('serviceRequired', value === SERVICE_NONE ? '' : value)}
              disabled={formData.isCustomPuja}
            >
              <SelectTrigger
                aria-invalid={Boolean(errors.serviceRequired)}
                aria-describedby={errors.serviceRequired ? 'booking-service-error' : undefined}
                className={`w-full px-3.5 py-2.5 rounded-lg bg-cream border text-sm font-serif focus:ring-saffron/40 ${
                  formData.isCustomPuja ? 'bg-stone-200 text-stone-500 cursor-not-allowed' : 'text-charcoal'
                } ${errors.serviceRequired ? 'border-red-500' : 'border-gold/40'}`}
              >
                <SelectValue placeholder="-- पूजन का चयन करें --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={SERVICE_NONE}>-- पूजन का चयन करें --</SelectItem>
                {SERVICES_DATA.map((srv) => (
                  <SelectItem key={srv.id} value={srv.title}>
                    {srv.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.serviceRequired && (
              <p id="booking-service-error" className="text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.serviceRequired}
              </p>
            )}
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap items-center gap-6 py-1">
            <div className="flex items-center gap-2 select-none min-h-[44px]">
              <Checkbox
                checked={formData.isCustomPuja}
                onCheckedChange={(checked) => update('isCustomPuja', checked as boolean)}
                aria-label="विशेष संकल्प आधारित पूजन (Custom Puja)"
                className="rounded text-saffron focus:ring-saffron border-gold/50"
              />
              <span className="text-xs font-serif font-bold text-maroon">
                विशेष संकल्प आधारित पूजन (Custom Puja)
              </span>
            </div>

            <div className="flex items-center gap-2 select-none min-h-[44px]">
              <Checkbox
                checked={formData.isBookingSystem}
                onCheckedChange={(checked) => update('isBookingSystem', checked as boolean)}
                aria-label="सीधे परामर्श व समय निर्धारण"
                className="rounded text-saffron focus:ring-saffron border-gold/50"
              />
              <span className="text-xs font-serif font-semibold text-charcoal/80">
                सीधे परामर्श व समय निर्धारण
              </span>
            </div>
          </div>

          {/* Message / Sankalp */}
          <div className="space-y-2">
            <Label htmlFor="booking-message" className="text-xs font-bold font-serif text-maroon">
              संदेश / पारिवारिक मनोरथ (Message)
            </Label>
            <Textarea
              id="booking-message"
              rows={3}
              maxLength={500}
              value={formData.message}
              onChange={(e) => update('message', e.target.value)}
              placeholder="अपनी समस्या, अभीष्ट तिथि या विशेष मनोरथ लिखें..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-cream border border-gold/40 text-sm font-sans focus:ring-saffron/40"
            />
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Button
              type="submit"
              className="w-full sm:flex-1 py-3.5 px-6 rounded-lg bg-saffron hover:bg-saffron-dark text-white font-serif font-bold text-base shadow-saffron-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>पूजन/अनुष्ठान के लिए संपर्क करें</span>
            </Button>

            <button
              type="button"
              onClick={() => setWaUrl(sendEnquiryViaWhatsApp(formData))}
              className="w-full sm:w-auto min-h-[48px] py-3 px-5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-serif font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>WhatsApp द्वारा भेजें</span>
            </button>
          </div>

          <p className="text-[11px] text-center text-charcoal/60 font-sans">
            🔒 भेजने पर WhatsApp खुलेगा — आपकी जानकारी सीधे शास्त्री जी तक पहुँचेगी।
          </p>
        </form>
      )}
    </div>
  );
};
