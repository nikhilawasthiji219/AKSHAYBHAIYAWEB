import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/services';
import { ACHARYA_PROFILE } from '../data/acharya';
import { Phone, Mail, MapPin, CheckCircle2, MessageCircle, AlertCircle, ExternalLink } from 'lucide-react';
import type { ContactFormData } from '../types';
import { useLanguage } from '../lib/languageContext';
import { sendEnquiryViaWhatsApp, validateEnquiry, type EnquiryErrors } from '../lib/enquiry';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

/** Radix Select forbids an empty string value, so use a sentinel for "none". */
const SERVICE_NONE = '__none__';

const EMPTY_FORM: ContactFormData = {
  fullName: '',
  mobileNumber: '',
  dateOfBirth: '',
  birthTime: '',
  serviceRequired: '',
  message: '',
  isCustomPuja: false,
  isBookingSystem: false
};

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
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

    // Static site: WhatsApp is the delivery channel (no server to post to).
    setWaUrl(sendEnquiryViaWhatsApp(formData));
    setIsSubmitted(true);
  };

  return (
    <section className="py-12 bg-[#FFF8E8] relative" id="contact">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Banner with 'संपर्क करें' matching bottom-center mockup */}
        <div className="text-center mb-8 relative">
          <div className="inline-block px-6 py-1.5 rounded-full bg-[#FFF0D4] border border-[#C89B3C]/40">
            <span className="font-serif font-bold text-base text-[#641E12]">
              {t('संपर्क करें', 'Contact Us')}
            </span>
            <span className="text-[11px] font-serif text-[#C94F08] ml-2">
              {(t('पूजा-अनुष्ठान परामर्श', 'Puja/Anushthan Consultation'))}
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
                  <p>
                    <a href={`tel:+91${ACHARYA_PROFILE.contact.primaryPhone}`} className="hover:underline">
                      {ACHARYA_PROFILE.contact.primaryPhone}
                    </a>
                  </p>
                  <p>
                    <a href={`tel:+91${ACHARYA_PROFILE.contact.secondaryPhone}`} className="hover:underline">
                      {ACHARYA_PROFILE.contact.secondaryPhone}
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full border border-[#C94F08] flex items-center justify-center text-[#C94F08] flex-shrink-0 mt-0.5">
                  <Mail className="w-3 h-3" />
                </div>
                <a
                  href={`mailto:${ACHARYA_PROFILE.contact.email}`}
                  className="font-sans text-[11px] text-[#3B1D0B] break-all hover:underline"
                >
                  {ACHARYA_PROFILE.contact.email}
                </a>
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
                <strong className="text-[#3B1D0B]">{t('कर्मक्षेत्र', 'Karmakshetra')}:</strong>{' '}
                {ACHARYA_PROFILE.contact.karmakshetra}
              </div>

              {/* Direct WhatsApp Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/91${ACHARYA_PROFILE.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] py-2.5 px-3 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-serif font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{t('WhatsApp पर तुरंत चर्चा करें', 'Chat instantly on WhatsApp')}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Enquiry form */}
            <div className="md:col-span-7">
              <h4 className="font-serif font-bold text-xs text-[#641E12] mb-3">
                {t('पूजन/अनुष्ठान हेतु पूछताछ करें', 'Inquire for Puja/Anushthan')}
              </h4>

              {isSubmitted ? (
                <div className="bg-[#FFF8E8] border border-emerald-400 p-6 rounded-xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <p className="font-serif font-bold text-sm text-[#3B1D0B]">
                    {t(
                      'WhatsApp में Send दबाकर enquiry भेजें। यदि WhatsApp नहीं खुला तो नीचे दिए लिंक पर क्लिक करें।',
                      'Press Send in WhatsApp to deliver your enquiry. If WhatsApp did not open, use the link below.'
                    )}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData(EMPTY_FORM);
                        setErrors({});
                      }}
                      className="min-h-[44px] px-2 text-xs text-[#C94F08] underline font-serif"
                    >
                      {t('अन्य संदेश भेजें', 'Send Another Message')}
                    </button>
                    <button
                      onClick={() => setWaUrl(sendEnquiryViaWhatsApp(formData))}
                      className="min-h-[44px] px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-serif font-bold text-xs"
                    >
                      {t('WhatsApp फिर से खोलें', 'Re-open WhatsApp')}
                    </button>
                  </div>
                  {waUrl && (
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#3B1D0B]/60 underline break-all"
                    >
                      <ExternalLink className="w-3 h-3 shrink-0" />
                      {t('WhatsApp नहीं खुला? यहाँ क्लिक करें', 'WhatsApp did not open? Click here')}
                    </a>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs font-serif" noValidate>

                  {/* Row 1: Name & Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-name" className="text-[11px] font-bold text-[#641E12]">
                        {t('नाम *', 'Name *')}
                      </Label>
                      <Input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={(e) => update('fullName', e.target.value)}
                        placeholder={t('आपका नाम', 'Your name')}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'contact-name-error' : undefined}
                        className={`h-10 text-xs font-sans bg-[#FFFDF7] ${
                          errors.fullName ? 'border-red-500' : 'border-[#C89B3C]/40'
                        }`}
                      />
                      {errors.fullName && (
                        <p id="contact-name-error" className="text-[11px] text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" /> {errors.fullName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-mobile" className="text-[11px] font-bold text-[#641E12]">
                        {t('मोबाइल नंबर *', 'Mobile Number *')}
                      </Label>
                      <Input
                        id="contact-mobile"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        maxLength={10}
                        value={formData.mobileNumber}
                        onChange={(e) => update('mobileNumber', e.target.value)}
                        placeholder="9876543210"
                        aria-invalid={Boolean(errors.mobileNumber)}
                        aria-describedby={errors.mobileNumber ? 'contact-mobile-error' : undefined}
                        className={`h-10 text-xs font-sans bg-[#FFFDF7] ${
                          errors.mobileNumber ? 'border-red-500' : 'border-[#C89B3C]/40'
                        }`}
                      />
                      {errors.mobileNumber && (
                        <p id="contact-mobile-error" className="text-[11px] text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" /> {errors.mobileNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: DOB & Birth Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-dob" className="text-[11px] font-bold text-[#641E12]">
                        {t('जन्म तिथि', 'Date of Birth')}
                      </Label>
                      <Input
                        id="contact-dob"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => update('dateOfBirth', e.target.value)}
                        className="h-10 text-xs font-sans bg-[#FFFDF7] border-[#C89B3C]/40"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-time" className="text-[11px] font-bold text-[#641E12]">
                        {t('जन्म समय', 'Birth Time')}
                      </Label>
                      <Input
                        id="contact-time"
                        type="time"
                        value={formData.birthTime}
                        onChange={(e) => update('birthTime', e.target.value)}
                        className="h-10 text-xs font-sans bg-[#FFFDF7] border-[#C89B3C]/40"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service Selection */}
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold text-[#641E12]">
                      {t('आवश्यक पूजन / सेवा *', 'Required Puja / Service *')}
                    </Label>
                    <Select
                      value={formData.serviceRequired || SERVICE_NONE}
                      onValueChange={(value) => update('serviceRequired', value === SERVICE_NONE ? '' : value)}
                      disabled={formData.isCustomPuja}
                    >
                      <SelectTrigger
                        aria-invalid={Boolean(errors.serviceRequired)}
                        aria-describedby={errors.serviceRequired ? 'contact-service-error' : undefined}
                        className={`h-10 text-xs font-serif bg-[#FFFDF7] ${
                          errors.serviceRequired ? 'border-red-500' : 'border-[#C89B3C]/40'
                        }`}
                      >
                        <SelectValue placeholder={t('-- पूजन / सेवा चुनें --', '-- Select a Puja / Service --')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={SERVICE_NONE}>
                          {t('-- पूजन / सेवा चुनें --', '-- Select a Puja / Service --')}
                        </SelectItem>
                        {SERVICES_DATA.map((s) => (
                          <SelectItem key={s.id} value={s.title}>{s.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.serviceRequired && (
                      <p id="contact-service-error" className="text-[11px] text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.serviceRequired}
                      </p>
                    )}
                  </div>

                  {/* Row 4: Message */}
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-message" className="text-[11px] font-bold text-[#641E12]">
                      {t('संदेश', 'Message')}
                    </Label>
                    <Textarea
                      id="contact-message"
                      rows={2}
                      maxLength={500}
                      placeholder={t('अपनी समस्या या मनोरथ लिखें...', 'Describe your concern or wish...')}
                      value={formData.message}
                      onChange={(e) => update('message', e.target.value)}
                      className="text-xs font-sans bg-[#FFFDF7] border-[#C89B3C]/40"
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer min-h-[44px]">
                      <Checkbox
                        checked={formData.isCustomPuja}
                        onCheckedChange={(checked) => update('isCustomPuja', checked as boolean)}
                        aria-label={t('विशेष पूजन (Custom Puja)', 'Request Custom Puja')}
                        className="border-[#C89B3C]/60"
                      />
                      <span>{t('विशेष पूजन (Custom Puja)', 'Request Custom Puja')}</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer min-h-[44px]">
                      <Checkbox
                        checked={formData.isBookingSystem}
                        onCheckedChange={(checked) => update('isBookingSystem', checked as boolean)}
                        aria-label={t('सीधे परामर्श हेतु', 'Direct consultation')}
                        className="border-[#C89B3C]/60"
                      />
                      <span>{t('सीधे परामर्श हेतु', 'Direct consultation')}</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1 flex flex-col sm:flex-row gap-2">
                    <Button
                      type="submit"
                      className="flex-1 min-h-[44px] py-2 px-4 rounded bg-[#D9610B] hover:bg-[#B84904] text-white font-serif font-bold text-xs shadow-xs"
                    >
                      {t('पूजन/अनुष्ठान हेतु संपर्क करें', 'Contact for Puja/Anushthan')}
                    </Button>

                    <button
                      type="button"
                      onClick={() => setWaUrl(sendEnquiryViaWhatsApp(formData))}
                      className="min-h-[44px] px-3 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-serif text-xs font-bold transition-colors"
                    >
                      {t('WhatsApp', 'WhatsApp')}
                    </button>
                  </div>

                  <p className="text-[10px] text-[#3B1D0B]/55 font-sans text-center">
                    🔒 {t('भेजने पर WhatsApp खुलेगा — जानकारी सीधे शास्त्री जी तक पहुँचेगी।',
                          'Submitting opens WhatsApp so your enquiry reaches Shastri Ji directly.')}
                  </p>

                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
