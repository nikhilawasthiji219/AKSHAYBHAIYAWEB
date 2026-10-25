import { ACHARYA_PROFILE } from '../data/acharya';
import type { ContactFormData } from '../types';

/**
 * Shared enquiry helpers.
 *
 * The site is static (no server), so the guaranteed delivery path is WhatsApp:
 * on submit we validate, build a formatted enquiry and open wa.me with the
 * message pre-filled. Nothing is silently "saved" — if WhatsApp cannot open we
 * surface the raw link so the visitor can still reach the priest.
 */

export type EnquiryErrors = Partial<Record<keyof ContactFormData, string>>;

export function validateEnquiry(data: ContactFormData): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = 'कृपया अपना नाम दर्ज करें';
  }

  const cleanPhone = data.mobileNumber.replace(/\D/g, '');
  if (!cleanPhone) {
    errors.mobileNumber = 'कृपया मोबाइल नंबर दर्ज करें';
  } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    errors.mobileNumber = '10 अंकों का मान्य भारतीय मोबाइल नंबर दर्ज करें';
  }

  if (!data.serviceRequired && !data.isCustomPuja) {
    errors.serviceRequired = 'कृपया पूजन / अनुष्ठान का चयन करें';
  }

  return errors;
}

export function buildEnquiryMessage(data: ContactFormData): string {
  const service = data.isCustomPuja
    ? 'विशेष पूजन / Custom Anushthan'
    : data.serviceRequired || 'सामान्य परामर्श';

  const digits = data.mobileNumber.replace(/\D/g, '');
  const phone = digits ? `+91 ${digits}` : 'उल्लेखित नहीं';

  return `*॥ श्री गणेशाय नमः ॥*
*पूजन/अनुष्ठान enquiry:*
- *नाम:* ${data.fullName.trim() || 'उल्लेखित नहीं'}
- *मोबाइल:* ${phone}
- *जन्म तिथि:* ${data.dateOfBirth || 'उपलब्ध नहीं'}
- *जन्म समय:* ${data.birthTime || 'उपलब्ध नहीं'}
- *सेवा/पूजन:* ${service}
- *संदेश/संकल्प:* ${data.message.trim() || 'कोई अतिरिक्त संदेश नहीं'}

*प्रणाम शास्त्री जी, कृपया मार्गदर्शन प्रदान करें।*`;
}

export function buildWhatsAppUrl(data: ContactFormData): string {
  return `https://wa.me/91${ACHARYA_PROFILE.contact.whatsappNumber}?text=${encodeURIComponent(
    buildEnquiryMessage(data)
  )}`;
}

/**
 * Opens WhatsApp with the enquiry pre-filled.
 * Returns the URL so callers can render a manual fallback link.
 */
export function sendEnquiryViaWhatsApp(data: ContactFormData): string {
  const url = buildWhatsAppUrl(data);
  window.open(url, '_blank', 'noopener,noreferrer');
  return url;
}
