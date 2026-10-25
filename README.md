# शास्त्री अक्षय अवस्थी जी — Website

Premium, responsive website for Vedic priest **आचार्य शास्त्री अक्षय अवस्थी जी**,
based at श्री महाकालेश्वर तीर्थ, उज्जैन. Showcases 14+ Vedic services, blog posts,
a photo gallery of rituals, and an enquiry form that hands off to WhatsApp.

## Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS 3 + shadcn/ui primitives (Radix) |
| Icons | lucide-react |
| Routing | Client-side (`src/App.tsx`), no router dependency |
| Tests | Playwright (desktop Chromium, Pixel 5, iPhone 12) |
| Hosting | Any static host — Vercel/Netlify configs included |

No backend, no database, no environment variables. Everything is static.

## Getting started

```powershell
npm install
npm run dev          # http://localhost:5173 (5174 if busy)
npm run typecheck    # tsc --noEmit (same as npm run lint)
npm run build        # tsc -b && vite build → dist/
npm test             # builds, serves dist on 4173, runs the E2E suite
npm run test:ui      # Playwright UI mode
npm run test:report  # open the last HTML report
```

The E2E suite runs against the **production build** (`vite preview`, port 4173),
not the dev server — cold dev-server transforms made parallel runs flaky.

## Routes

| Route | Page |
|---|---|
| `/` | Home — hero, trust strip, services, special anushthan, about, gallery strip, blogs, testimonials, enquiry, contact |
| `/about` | परिचय — Acharya profile |
| `/services` | All 14 services |
| `/services/:slug` | Service detail (e.g. `/services/rudrabhishek`) |
| `/special-anushthan` | Special Anushthan / custom puja |
| `/gallery` | Category filters + lightbox + 3D wheel |
| `/blogs` | Blog listing |
| `/blogs/:slug` | Blog detail |
| `/contact` | Enquiry form, phones, map |
| `/privacy-policy`, `/terms-and-conditions` | Legal |
| `/prototypes` | Internal design previews (QA only) |
| `/admin` | Client-side content editor — see the warning below |

Unknown routes **and** unknown service/blog slugs render `NotFoundPage`.

## Deploying

```powershell
npm run build      # output in dist/
```

- **Vercel** — import the repo; `vercel.json` already sets the build command,
  output directory and the SPA rewrite.
- **Netlify** — build `npm run build`, publish `dist`; `public/_redirects` is
  copied into `dist` and provides the SPA fallback.
- **Anything else** — serve `dist/` and rewrite all unknown paths to
  `index.html`. Without that fallback, refreshing `/services/...` 404s.

## Enquiries

Both forms (`ContactSection`, `BookingForm`) share `src/lib/enquiry.ts`:

1. validate name + 10-digit Indian mobile + service (or custom puja),
2. build a formatted Hindi enquiry (नाम, मोबाइल with `+91`, जन्म विवरण, सेवा, संकल्प),
3. open `wa.me/91<whatsappNumber>?text=…` with the message pre-filled.

The visitor presses **Send** in WhatsApp — that is the delivery channel. The UI
says so explicitly and offers a manual link if the popup is blocked. Nothing is
stored server-side, so an enquiry that is never sent is lost; see
`PROJECT_STATE.md` §5 if that ever needs to change.

## Admin / CMS — read this before using it

`/admin` edits content **in the browser only**:

- content is stored in `localStorage` (`akshay_website_cms_v2`) — it is **not**
  shared with visitors or other devices, and is lost when the browser profile is
  cleared;
- auth is a `sessionStorage` flag plus a password compared in the client, so it
  is **not a security boundary** — anyone with DevTools can bypass it.

It is a convenient preview/backup tool for one person on one browser, nothing
more. The default password is `admin123`; change it on first use (the dashboard
shows a warning until you do). Real multi-device CMS = backend + database work.

## Content & assets

- `src/data/acharya.ts` — name, titles, phones, WhatsApp number, email, address, timings, photos
- `src/data/services.ts` — 14 services
- `src/data/blogs.ts` — blog posts
- `src/data/gallery.ts` — gallery items + categories
- `public/photos/` — real ritual/portrait photographs
- `public/images/` — temple art, logos, banners, blog thumbnails
- `public/audio/`, `public/videos/`

Content rules honoured: no prices anywhere (every service is “संपर्क करें”), no
fake testimonials or customer counts, no invented awards, only the qualifications
from the brief (शास्त्री – व्याकरण, आचार्य – संस्कृत).

## Structure

```
src/
├── App.tsx                 # routing, loader, scroll-reveal sweep, layout shell
├── pages/                  # one component per route
├── components/             # Navbar, Footer, Hero, services/gallery/blog sections,
│                           # forms, floating widgets, ui/ (shadcn primitives)
├── lib/
│   ├── cmsStore.ts         # localStorage CMS + client-side auth
│   ├── enquiry.ts          # validation + WhatsApp message/URL helpers
│   └── languageContext.tsx # HI/EN toggle
├── data/                   # structured content
└── index.css               # design tokens, heritage styles, loader
tests/e2e/                  # Playwright suite (imports ./fixtures, not @playwright/test)
scripts/audit/              # full-site audit + manual verification specs
```

## Docs

- `PROJECT_STATE.md` — handoff: decisions, fix log, commands, gotchas. **Read first.**
- `AUDIT_REPORT.md` — the end-to-end audit findings and their status.
