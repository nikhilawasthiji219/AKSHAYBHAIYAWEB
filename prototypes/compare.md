# Prototype Comparison — Hero / Conversion Flow

Real copy only. No fake reviews/counts/prices (per design §25).

| Criterion (1-5) | A Royal (fix-only) | B Heritage (editorial) | C Modern (minimal) ⭐ | D Ritual (story) |
|---|---|---|---|---|
| clarity | 4 | 3 | 5 | 2 |
| hierarchy | 4 | 3 | 5 | 3 |
| density | 3 | 4 | 5 | 2 |
| accessibility | 3 | 2 | 5 | 2 |
| implementation cost (higher = cheaper) | 5 | 3 | 4 | 2 |
| distinctiveness | 4 | 5 | 2 | 5 |
| **Total** | **23** | **20** | **26** | **16** |

## Testing plan
- `npm run build` must stay green (tsc + vite, vendor-motion split).
- 5-second test: who / what action / where (Ujjain).
- First-click: Hero CTA vs header `Puja Book Kare` vs mobile sticky bar.
- Preference test with Hindi readers, mobile-first.
- Events: `cta_click{variant,location}`, `service_select`, `whatsapp_open`, `form_submit_success`.
- Invalidate: A if LCP>2.5s; B if >40% miss CTA; C if trust <30%; D if images missing/unlicensed.

## Converge
- **Advance: C** (+ A tokens as hybrid: gold/saffron, arch photo, invocation badge).
- Applied fixes: `shadow-xs/2xs` + `animate-fadeIn` in tailwind config, body font → Sans, `background-opacity` fix, noscript fallback, route code-splitting + `vendor-motion` chunk.
- Risks/next: upgrade `framer-motion` for React 19, upgrade `lucide-react`, compress `hero_ai_bg.jpg`, add Playwright smoke test for `/` `/services` `/contact`.

---

# Round 2 — Booking Conversion Layer (E/F/G/H)

Round 1 ने केवल hero कवर किया। Round 2 का **एक आयाम**: बुकिंग-मार्ग (yajman सेवा → WhatsApp तक कैसे पहुंचे)।
असली कॉपी, असली नंबर (`wa.me/919300096938`) — कोई फ़र्ज़ी संख्या/मूल्य/sमीक्षा नहीं (design §25)।
पूर्वावलोकन: `npm run dev` → `/prototypes`।
Components: `prototypes/round2/{BookingBarE,InlineCtaF,GuidedFormG,DepthDetailH}.tsx`।

| Criterion (1-5) | E Persistent Bar | F Inline CTA ⭐ | G Guided Form | H Depth-first |
|---|---|---|---|---|
| clarity | **5** | 4 | 4 | 3 |
| hierarchy (सेवा→कार्य) | 4 | **5** | 4 | 3 |
| density-बैलेंस | **5** | 4 | 3 | 2 |
| accessibility (44px टच) | **5** | 4 | 4 | 4 |
| implementation cost (higher = cheaper) | **5** | 3 | 2 | 2 |
| distinctiveness | 2 | 3 | 4 | **5** |
| **Total** | **26** | **23** | **21** | **19** |

Hypotheses:
- **E)** मौजूदा `MobileBottomBar` nav-first है → booking-first बार: हर स्क्रॉल-बिंदु पर WhatsApp/फ़ोन/बुकिंग उपलब्ध, सेवा-पृष्ठ बिना शोर के।
- **F)** बुकिंग रुचि-क्षण (कार्ड प्रेक्षण) पर ही विशिष्ट पूर्व-भरित संदेश से खुले — संदेश में सेवा-नाम स्वतः (प्रारूप/गुण उच्च)।
- **G)** एक booking-खंड (अनुष्ठान chips + तिथि + प्रयोग स्थान) → व्याप्त पूर्व-भरा संदेव; शास्त्री जी की चैट जितनी संरचित, उतना बोझ कम।
- **H)** विस्तार योग्य कार्ड: मूल सिद्धांत • विधि • सामग्री • शुभ समय सपाट दिखे — विद्वत्ता-जांच करने वाले गंभीर यजमान का विश्वास।

## Testing plan (Round 2)
- `npx tsc -b` एवं `npm run build` हरी रहें।
- 5-सेकंड टेस्ट (प्रत्येक स्क्रीनशॉट): "यह किसका पेज है / बुकिंग कैसे करेंगे?" सफलता ≥60%।
- First-click: कार्य "रुद्राभिषेक के लिए बात करें" — F में 2-टैप, E/G/H में 3+ टैप; सफलता = पहला क्लिक सही मार्ग।
- Preference (15 हिंदी-पाठक, मोबाइल): "किस पर तुरंत बुक करेंगे?" ≥70% जनता का विजेता।
- घटनाएँ (component में पहले से): `cta_click{variant,location}`, `whatsapp_open{variant,middle,service}`, `form_submit_success`, `service_select`।
मेट्रिक्स: प्रति session `whatsapp_open`, E bar पर first-scroll-के-बाद संपर्क छू उठना (heat), फॉर्म-रीटेक्शन यदि लगा।
- निरस्त सूचना: E — बार दृश्य "भय" हुई टेस्ट में >40% बार न देखे; F — >40% ऑडियंस "विस्तृत" ही चुनें (`whatsapp_open` न खुले); G — >60% फॉर्म-पड़ाई छोड़ना; H — विस्तार औसतस >5s रुके और CTA दृष्टि <30%।

## Converge (Round 2)
- **Advance: F** (सेवा-पृष्ठ/ServicesGrid upgrade) + **E-लाइट** (मौजूदा MobileBottomBar में सबसे प्रभावशाली `WhatsApp` एक से दो—(विस्तार `बुकिंग`))। F+E hybrid सबसे तेज़ मार्ग: कार्ड-स्तर intent + स्थिर उपलब्धता।
- G का फ़ॉर्म बाद में `/contact` BookingForm के एक-क्लिक पूर्व-भरण के रूप में मिलाई जाए (service-select से /contact जाते हुए पहले से भरा फॉर्म)।
- H की गहराई ServiceDetailPage में पहले से है — कार्ड- catchError नहीं: H का विस्तार-योग्य व्यवहार केवल grid में अपूर्णता बच सके।
- Risks: per-card पूर्व-भरित संदेश दोहरा प्रश्न बने (spam जैसा धारणा); `safe-area-inset` के साथ स्टिकी बार iOS Safari; hero pulmonary CTA (C) पर कार्ड CTA दो-CTA की थकान; G में `date` इनपुट मोबाइल कीबोर्ड। 

