# 📌 PROJECT STATE / HANDOFF — Akshay Bhaiya Website

> **Purpose:** If this AI session ends (token limit, new chat), read this file first.
> It contains everything needed to continue without re-discovering the project.
> **Last updated:** 2026-10-25

---

## 1. Quick start

```powershell
cd E:\AKSHAYBHAIYAWEB
npm install
npm run dev          # http://localhost:5173 (or 5174 if busy)
npm run typecheck    # tsc --noEmit (also npm run lint)
npm run build        # tsc -b && vite build
npm test             # Playwright: builds + serves preview on 4173, runs all specs
npm run test:ui      # Playwright UI mode
```

> `npm test` runs the suite against the **production build** (`vite preview`,
> port 4173) for deterministic results. The audit specs use the dev server on
> 5174 instead — see §7.

---

## 2. Project facts

| Item | Value |
|---|---|
| Owner | Vedic priest Acharya Akshay Bhaiya (शास्त्री अक्षय अवस्थी जी), Ujjain |
| Stack | React 19 + TypeScript + Vite 6 + Tailwind CSS 3 |
| Backend | **None exists** (despite AGENTS.md saying "API routes") |
| Database | **None** — content stored in browser `localStorage` |
| Auth | Client-side only (`sessionStorage` flag) |
| Hosting target | Vercel / Netlify — static `dist/`; SPA fallback configured |
| Path alias | `@/*` → `./src/*` |
| Tailwind colors | saffron `#E87512`, gold `#C89B3C`, cream `#FFF8E8`, maroon `#641E12`, charcoal `#2B2118` |
| Fonts | Noto Serif Devanagari (headings), Noto Sans Devanagari + Inter (body) |
| Language | Hindi default, English toggle via `src/lib/languageContext.tsx` (`t('हिंदी', 'English')`) |

### Key files

```
src/
├── App.tsx                      # hand-rolled router + scroll-reveal engine
├── main.tsx                     # mounts App only (single audio widget)
├── index.css                    # Tailwind + all custom Vedic styles + loader CSS
├── lib/
│   ├── cmsStore.ts              # localStorage "CMS" (fake backend)
│   ├── enquiry.ts               # ✅ shared validation + WhatsApp enquiry message/URL
│   ├── languageContext.tsx      # hi/en toggle helper `t()`
│   └── utils.ts                 # cn() = clsx + tailwind-merge
├── data/                        # services.ts (14), blogs.ts, gallery.ts, acharya.ts
├── components/
│   ├── Loader.tsx               # ✅ redesigned (Om + circular progress + typing mantra)
│   ├── BookingForm.tsx          # ✅ shadcn/ui form, submits to WhatsApp
│   ├── ContactSection.tsx       # ✅ shadcn/ui form, labels + inline errors, WhatsApp submit
│   ├── audio/BackgroundMusic.tsx    # plays /audio/background.mp3 (exists)
│   └── ui/                      # shadcn components: button, card, checkbox, dialog,
│                                # input, label, select, sheet, textarea, dock, works-wheel
└── pages/                       # Home, About, Services, ServiceDetail, SpecialAnushthan,
                                 # Gallery, Blogs, BlogDetail, Contact, Legal, Prototypes,
                                 # Admin, NotFound
```

### Routes (App.tsx)
`/` · `/about` · `/services` · `/services/:slug` · `/special-anushthan` · `/gallery` · `/blogs` · `/blogs/:slug` · `/contact` · `/privacy-policy` · `/terms-and-conditions` · `/prototypes` · `/admin`
Unknown route or unknown service/blog slug → `NotFoundPage` (404).

---

## 3. What has been DONE in previous sessions

1. **shadcn MCP integration**
   - `.mcp.json` → `npx shadcn@latest mcp` (for Claude)
   - `components.json` → Tailwind `tailwind.config.js`, CSS `src/index.css`, aliases `@/components`, `@/lib/utils`, lucide icons, `cssVariables: false`
   - Installed: `button, card, input, label, select, checkbox, textarea, sheet, dialog`
   - Added dependency: `class-variance-authority`
2. **`BookingForm.tsx` refactored** to shadcn `Input/Label/Select/Checkbox/Textarea/Button`.
   - ⚠️ `Checkbox onCheckedChange` returns `boolean`; cast is used (`checked as boolean`).
3. **`Loader.tsx` redesigned** (Om symbol, rotating rings, SVG circular progress, typing mantra
   "श्री महाकालेश्वराय नमः", subtitle "शास्त्री अक्षय अवस्थी जी | उज्जैन", reduced-motion support).
   Old canvas/diya/rudraksha loader CSS was replaced in `src/index.css` under
   `/* ---------- Sacred loading screen (Vedic heritage redesign) ---------- */`.
4. **Full E2E audit completed** → see `AUDIT_REPORT.md` + screenshots in `audit-output*/`.
5. **Audit tooling created** (can be reused):
   - `playwright.audit.config.ts` (points at port **5174** — change if dev server port differs)
   - `scripts/audit/site-audit.spec.ts` (all routes, overflow, broken images, console errors)
   - `scripts/audit/visual-audit.spec.ts` (scroll-reveal verification + screenshots)
   - `scripts/audit/debug-reveal.spec.ts` (reveal-engine debugging)
6. **Verification status:** `tsc --noEmit` ✅ · `npm run build` ✅ · 13/13 Playwright tests ✅

---

## 3b. ✅ FIXES APPLIED (session 2026-10-25, after backup)

| # | Issue | What was done | Files |
|---|---|---|---|
| U1 | Reveal permanently hides fast-scrolled content | Sweep now reveals anything at/above the viewport (`rect.top < vh - 40`) | `src/App.tsx` |
| U2/B3 | Duplicate music widget + 12 failed `/audio/rudrashtakam.mp3` requests | `RudrashtakamMusic` unmounted from `main.tsx`; component deleted | `src/main.tsx`, deleted `src/components/audio/RudrashtakamMusic.tsx` |
| U4 | Mobile floating-widget pile-up | Removed `display:block` from `.floating-diya` so `hidden md:flex` works; music toggle uses `.music-toggle` (above 74 px bottom bar on mobile, `bottom-5` on desktop) | `src/index.css`, `src/components/audio/BackgroundMusic.tsx` |
| U3 | Gallery wheel cards clipped / unreadable index | `CARD_H 0.38→0.30`, `RING_R 1.14→1.02`, `INDEX 0.04→0.058`; index list now vertically centred in the right gutter, hidden below `lg` | `src/components/ui/works-wheel.tsx` |
| S1 | Password hint on public login | Removed `💡 डिफ़ॉल्ट पासवर्ड: admin123` | `src/pages/AdminPage.tsx` |
| S2 | Hardcoded backdoors | Removed `mahakal123` / `admin` from `loginAdmin` + `changeAdminPassword`; min new password now 8 chars | `src/lib/cmsStore.ts` |
| B4 | Empty arrays restored defaults | Only falls back when the key is missing / not an array | `src/lib/cmsStore.ts` |
| B5 | Silent delete failures | `deleteGalleryItem` / `deleteBlog` / `deleteService` return `false` when nothing matched; the gallery & blog admin toasts show the real result | `src/lib/cmsStore.ts`, `src/pages/AdminPage.tsx` |
| B6 | Shallow backup import | Validates arrays, `profile.name`, and required id/slug/imageUrl fields; imports only known keys | `src/lib/cmsStore.ts` |
| B1 | Enquiries went nowhere | **WhatsApp-on-submit** for both forms via new shared helper; success copy says "WhatsApp opened, press Send" (no fake "received"); manual fallback link | new `src/lib/enquiry.ts`, `ContactSection.tsx`, `BookingForm.tsx` |
| U5/U6/A2 | `alert()` + two form styles + no labels | `ContactSection` rebuilt on shadcn primitives with `<Label htmlFor>`, inline errors, `aria-invalid`/`aria-describedby`, 44 px controls | `src/components/ContactSection.tsx` |
| — | Radix `SelectItem value=""` crash risk | Replaced with `__none__` sentinel in both forms | `BookingForm.tsx`, `ContactSection.tsx` |
| A1 | Small tap targets | Footer quick/service/contact links 44 px, gallery filter pills 44 px, `View All` 44 px, desktop nav `py-2`, admin modal close 44 px | `Footer.tsx`, `Gallery.tsx`, `ElasticGallery.tsx`, `Navbar.tsx`, `AdminPage.tsx` |
| A3 | English footer tagline in Hindi mode | Wrapped in `t()` | `Footer.tsx` |
| — | Admin icon buttons had no accessible names | Added `aria-label` to modal close + password visibility buttons | `src/pages/AdminPage.tsx` |
| P2 | No 404 | New `NotFoundPage`; unknown routes and unknown service/blog slugs now render it | new `src/pages/NotFoundPage.tsx`, `src/App.tsx` |
| P3 | Stray mockup | Deleted `src/components/nnn/` | — |
| P1 | npm scripts | `lint` / `typecheck` / `test` already present (lint = `tsc --noEmit`, no ESLint dependency) | `package.json` |
| — | Tests | Contact spec now uses labels; added inline-validation, WhatsApp-payload and 404 tests; new `layout.spec.ts` guards against horizontal overflow on key routes | `tests/e2e/*.spec.ts` |
| — | Flaky suite (dev-server stalls, loader race) | Suite runs against the **production preview** (build + `vite preview` on 4173, 4 workers, 60 s timeout); fixture waits for `main` to mount *then* `#loader` to detach (the old wait resolved instantly on an empty DOM, so clicks hit the overlay) | `playwright.config.ts`, new `tests/e2e/fixtures.ts` |
| — | Tests depended on wa.me network | Popup tests replaced with `href` + stubbed `window.open` assertions; the real popup flow is covered by `scripts/audit/verify-fixes.spec.ts` (run manually against the dev server) | `tests/e2e/home.spec.ts`, `tests/e2e/contact.spec.ts` |
| S1+ | Default password easy to forget | Admin dashboard shows a warning banner while the password is still `admin123`; password fields labelled + 8-char hint | `src/pages/AdminPage.tsx` |
| P5 | Deep links would 404 on a static host | Added `vercel.json` (build + SPA rewrite) and `public/_redirects` (Netlify); deep-link + unknown-slug tests added | `vercel.json`, `public/_redirects`, `tests/e2e/services.spec.ts`, `tests/e2e/blogs.spec.ts` |
| — | README described a Next.js app that does not exist | Rewritten for the actual React 19 + Vite stack, routes, deploy steps, enquiry flow and CMS caveats | `README.md` |
| — | Thin social/search metadata | Added Twitter card, theme colour and `ProfessionalService` JSON-LD (name, phone, address, timings) | `index.html` |

**Verification (end of this session):** `tsc --noEmit` ✅ · `npm run build` ✅ ·
`npm test` → **75/75 passed** (25 specs × 3 projects: desktop Chromium, Pixel 5, iPhone 12) ·
`scripts/audit/verify-fixes.spec.ts` ✅ (wheel geometry fits the stage, mobile music toggle
sits above the bottom bar, contact submit opens WhatsApp with the Hindi message pre-filled).

**Still open (needs a product decision):**
- **B2 / S3 / S4** — the "CMS" is still `localStorage` + `sessionStorage` auth. Content is per-browser and auth is bypassable. Fixing properly needs a backend + database + server session (see §5).
- **B1 hardening** — WhatsApp delivery depends on the visitor pressing Send in WhatsApp. A server-side copy (email/DB) would guarantee capture.

---

## 4. OPEN ISSUES (prioritized, from AUDIT_REPORT.md)

> Status: most UI/security/data-integrity items are fixed — see §3b. The tables
> below are kept as the original audit record; items still open are marked ⏳.

### 🔴 Critical — Backend / Data
| # | Issue | File / line | Fix idea |
|---|---|---|---|
| B1 | Enquiry form saves nothing — only `setIsSubmitted(true)` | `ContactSection.tsx:29`, `BookingForm.tsx:58` | Add real endpoint (Vercel `/api/enquiry` + email via Resend/Nodemailer) **or** immediately open WhatsApp with prefilled message as the guaranteed path |
| B2 | CMS is localStorage-only; edits invisible to other users; cache clear wipes them | `cmsStore.ts:8` | Real DB (Supabase/Postgres) or JSON file + API; needs decision |
| B3 | `/audio/rudrashtakam.mp3` missing → 12 failed requests/page | `RudrashtakamMusic.tsx:20` | Delete widget OR add mp3 OR point to `/audio/background.mp3` |
| B4 | Deleting all gallery/blogs/services restores defaults | `cmsStore.ts:44‑47` (`length > 0` checks) | Detect first run via separate `initialized` flag instead of `length` |
| B5 | `delete*()` always returns `true` | `cmsStore.ts:120‑125,149‑154,178‑183` | Return `findIndex !== -1` result |
| B6 | `importBackupJSON` shallow validation | `cmsStore.ts:208‑219` | Validate array types + required string fields |

### 🔴 Critical — Security
| # | Issue | File / line | Fix |
|---|---|---|---|
| S1 | Password printed on public login page | `AdminPage.tsx:534` | Delete that hint line |
| S2 | Plaintext password + backdoors `mahakal123`, `admin` | `cmsStore.ts:17,236‑243,249‑259` | Remove backdoors; hash (SHA-256 via WebCrypto at minimum) |
| S3 | Auth = `sessionStorage` flag, trivially bypassed | `cmsStore.ts:230‑247` | Requires real server auth to fully fix; document limitation |
| S4 | "CMS" edits local-only | see B2 | same |

### 🟠 High — UI
| # | Issue | File / line | Fix |
|---|---|---|---|
| U1 | **Scroll-reveal permanently hides content** (fast scroll skips elements; only 7/14 service cards + 0 blog cards visible on Home; 8 gallery photos missing) | `App.tsx:82` | Change `if (rect.top < vh - 40 && rect.bottom > 0)` → `if (rect.top < vh - 40)` |
| U2 | Two music widgets overlap bottom-left | `main.tsx:12` + `App.tsx:317` | Remove `RudrashtakamMusic` from `main.tsx` (keep `BackgroundMusic`) |
| U3 | Gallery wheel hero broken: cards cut behind navbar, index list overlaps, ring bigger than stage | `GalleryPage.tsx:45`, `ui/works-wheel.tsx` | Reduce ring radius / add top padding below navbar / move index list into a safe gutter |
| U4 | Mobile bottom clutter: nav(74px) + music pill + music circle + diya + WhatsApp pill collide | `BackgroundMusic.tsx:171`, `RudrashtakamMusic.tsx:212`, `RitualAccents`, `WhatsAppButton` | Single stacked FAB column with controlled offsets; hide music on mobile |
| U5 | `alert()` validation | `ContactSection.tsx:26` | Inline errors (copy BookingForm pattern) |
| U6 | Two different form implementations | `ContactSection.tsx` vs `BookingForm.tsx` | Unify on shadcn form |

### 🟡 Accessibility
| # | Issue | Fix |
|---|---|---|
| A1 | Footer links ~38×16 px; gallery pills ~22 px tall | min-h-11 (44 px) / py-3 on mobile |
| A2 | Contact inputs have placeholders but no labels | Add `<Label htmlFor>` or `aria-label` |
| A3 | Footer tagline English in Hindi mode | Use `t()` from `languageContext` |
| A4 | Nav items 20 px tall on desktop | Acceptable, but `py-2` improves hover area |

### 🟡 Process / config
| # | Issue | Fix |
|---|---|---|
| P1 | No `lint` / `typecheck` / `test` npm scripts | Add: `"typecheck": "tsc --noEmit"`, `"test": "playwright test"`, `"lint": "eslint ."` (needs eslint install — ask first) |
| P2 | No 404 route | Add fallback `NotFound` page |
| P3 | Stray mockup `src/components/nnn/nnm.html` | Delete after confirming nothing imports it |
| P4 | No `.env.example` | Create if/when env vars are introduced |

---

## 5. Decisions

1. **Enquiry delivery — DECIDED (2026-10-25, user): WhatsApp-only.**
   No backend, no database, no email service. Static hosting only. Both forms hand
   the enquiry to WhatsApp with the message pre-filled; the visitor presses Send.
   Accepted trade-off: an enquiry that is never sent is not captured anywhere.
   Revisit only if the priest asks for an inbox/CRM — then add a form endpoint
   (Formspree/Web3Forms) before reaching for a database.
2. **Admin/CMS security — accepted limitation, for now.**
   Hint + backdoors removed; the gate is still client-side (`sessionStorage` flag +
   client-side password check, content in `localStorage`). It is a single-browser
   content editor, **not** shared CMS and **not** a security boundary. Real fix
   (server session + DB) is deferred with #1. Change the password from `admin123`
   on first use — the dashboard warns until you do.
3. ~~Keep or remove `RudrashtakamMusic`?~~ → **removed** (missing mp3, duplicated BackgroundMusic).
4. **Hosting:** static `dist/`, Vercel or Netlify. `vercel.json` and
   `public/_redirects` provide the SPA fallback — without it, deep links 404.

---

## 6. Suggested execution order

```
DONE  1. S1 remove password hint
DONE  2. S2 remove backdoors
DONE  3. U1 reveal sweep fix
DONE  4. U2 remove duplicate music widget
DONE  5. B3 missing audio (widget removed)
DONE  6. B4/B5/B6 cmsStore data integrity
DONE  7. U3 gallery wheel sizing
DONE  8. U4 mobile floating widgets
DONE  9. U5/A2 unify ContactSection → shadcn form + WhatsApp submit
DONE 10. A1/A3 accessibility + Hindi copy
DONE 11. P1/P2/P3 process cleanup (404, stray mockup, scripts)
DONE 12. Deployment config (SPA fallback), README rewrite, JSON-LD/OG meta
DEFERRED 13. B2/S3 real backend + database + server auth — user chose WhatsApp-only
```

**Launch checklist**
1. `npm run build` → deploy `dist/` to Vercel (auto via `vercel.json`) or Netlify
   (publish `dist`; `public/_redirects` ships the fallback).
2. Open `/admin`, log in with `admin123`, immediately set a real password.
3. Verify on a phone: open a service detail URL directly (deep link must load, not 404),
   submit the enquiry form, confirm WhatsApp opens pre-filled.
4. When a domain exists: make `og:image` + canonical absolute (currently relative).

---

## 7. Reusable audit commands

```powershell
# E2E suite: builds the app and serves the production bundle on port 4173
npm test

# start dev server (background) — used by the audit config / manual checks
npm run dev

# full route audit (writes audit-output/report.json + screenshots, dev server on 5174)
npx playwright test --config=playwright.audit.config.ts

# targeted fix verification (wheel geometry, mobile widgets, real WhatsApp popup)
npx playwright test scripts/audit/verify-fixes.spec.ts --config=playwright.audit.config.ts --reporter=line

# reveal-engine debug (prints JSON to console)
npx playwright test scripts/audit/debug-reveal.spec.ts --config=playwright.audit.config.ts --reporter=list
```

---

## 8. Backup artifacts

- Git commits hold every change (branch: `main`).
- `3f66d31` + tag `backup-2026-10-25_1312` — state **before** the audit fixes.
- `62e8f59` — **all audit fixes** (this session). Working tree clean.
- Zip snapshot: `backups/akshay-website-backup-<timestamp>.zip`
  (excludes `node_modules`, `dist`, `.git`, audit screenshots, local photo/video originals).
- Restore: unzip into an empty folder → `npm install` → `npm run dev`.
- Roll back the fixes only: `git revert 62e8f59` (or `git reset --hard 3f66d31`).

---

## 9. Important gotchas / conventions

- Dev server may start on **5174** if 5173 is taken — audit config points at 5174.
- `src/index.css` is ~950 lines; loader styles are at the bottom.
- The old loader CSS classes (`.spiritual-card`, `.rudraksha-center`, `.loader-canvas`, `.progress-track`, …) were **replaced**; don't reintroduce them.
- `BookingForm` checkbox needs `checked as boolean` due to Radix typing.
- `App.tsx` scroll-reveal uses `.reveal` + `.is-visible` + `.stagger` — any new section that should animate needs `className="reveal"`.
- The site is fully client-side; there are no environment variables today.
- **Enquiries:** both forms call `src/lib/enquiry.ts` (`validateEnquiry` → `sendEnquiryViaWhatsApp`). There is no server; WhatsApp is the delivery channel. Don't reintroduce a fake "we received your enquiry" success state.
- **E2E tests:** import `test, expect` from `./fixtures`, not `@playwright/test` — the fixture waits for `#loader` to detach (the intro takes ~3.4 s and WebKit needs the longer timeout).
- **Radix Select** forbids `value=""`; use the `__none__` sentinel (already done in both forms).
- Admin auth is a client-side gate only (`localStorage` hash + `sessionStorage` flag). It is **not** real security — see §5.
