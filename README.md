# शास्त्री अक्षय अवस्थी जी — Website

Premium, responsive, production-ready website for a Vedic priest & ritual specialist
based at श्री महाकालेश्वर तीर्थ, उज्जैन.

## Stack

- **Next.js 14** (App Router, static generation) + **React 18**
- **Tailwind CSS** — saffron/gold/cream heritage design system (see `tailwind.config.js`)
- **Lucide React** icons
- **React Hook Form** — enquiry form validation
- Fonts: Noto Serif Devanagari / Noto Sans Devanagari / Inter (via `next/font`)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static, all 11 pages)
```

## Pages

| Route | Page |
|---|---|
| `/` | Home (hero, trust strip, services, special anushthan, about, gallery, blogs, testimonials, enquiry, contact) |
| `/about` | About Acharya |
| `/services` | Services listing (14 services) |
| `/services/[slug]` | Service detail (14 static pages) |
| `/special-anushthan` | Special Anushthan / Custom Puja |
| `/gallery` | Gallery with category filters + lightbox |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog detail (5 posts) |
| `/contact` | Enquiry form + contact/map |
| `/privacy-policy` | Privacy Policy |
| `/terms` | Terms & Conditions |

## ⚠️ Adding the REAL Acharya photograph

The client photograph was **not supplied with the project brief**, so the site ships with an
elegant branded placeholder that is **never an AI-generated person**.

To activate the real photo:

1. Place the client's photograph at **`public/images/acharya-photo.jpg`** (any reasonable
   portrait crop, e.g. 1200×1500).
2. Done. Every instance (hero, about, mobile) updates automatically — the frame, alt text
   and object-position are already configured (`object-top`, 4:5 arch crop).

To swap the file name/location, edit `photo` in `data/site.js`.

## Real gallery photos

`data/gallery.js` ships with `src: null` entries. Set a real image path + alt per item and it
appears in the masonry grid with working lightbox. Until then, honest labelled placeholders are
shown — no stock/AI images are ever presented as real ritual photographs.

## Content rules honoured

- No prices anywhere — every service is **"Contact for Booking"**
- No fake testimonials/reviews/customer counts — placeholder message shown instead
- No invented awards, certifications or experience beyond **15+ years**
- Only the qualifications from the brief: शास्त्री (व्याकरण), आचार्य (संस्कृत)

## Enquiry form behaviour

Validated (name, 10-digit Indian mobile, service, message). On submit it opens WhatsApp with
the composed enquiry (no payment, no fake backend). To persist enquiries, add a
`app/api/enquiries/route.js` (Next.js API route) writing to PostgreSQL — `components/BookingForm.jsx`
has a marked spot to swap the WhatsApp hand-off for `fetch("/api/enquiries", ...)`.

## Admin-ready architecture

All content lives in structured data files, not buried in components:

- `data/site.js` — identity, contact, nav (mirrors an admin "settings" table)
- `data/services.js` — services (mirrors an admin "services" table)
- `data/blogs.js` — posts (mirrors an admin "posts" table)
- `data/gallery.js` — gallery items + categories (mirrors "media" table)
- `data/testimonials.js` — real testimonials plug straight into the existing UI

A future `/admin` dashboard only needs CRUD forms over these shapes + image upload to
Cloudinary/S3.

## Structure

```
app/            # routes (11 pages), layout, globals.css, icon.svg
components/     # Navbar, Hero, TrustStats, ServiceCard, ServicesGrid,
                # SpecialAnushthan, AcharyaProfile, Gallery, BlogCard,
                # Testimonials, BookingForm, ContactSection, Footer,
                # MobileBottomBar, WhatsAppButton, Reveal, AcharyaPhoto, ...
data/           # admin-ready structured content
public/images/  # temple silhouette, placeholders, acharya-photo (add here)
```
