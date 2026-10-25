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
npx tsc --noEmit     # typecheck
npm run build        # tsc -b && vite build
npx playwright test --project=chromium   # existing E2E suite (13 tests, all passing)
```

> ⚠️ `package.json` currently has **no** `lint`, `typecheck` or `test` scripts.
> AGENTS.md requires them — add them (see §7, task P1).

---

## 2. Project facts

| Item | Value |
|---|---|
| Owner | Vedic priest Acharya Akshay Bhaiya (शास्त्री अक्षय अवस्थी जी), Ujjain |
| Stack | React 19 + TypeScript + Vite 6 + Tailwind CSS 3 |
| Backend | **None exists** (despite AGENTS.md saying "API routes") |
| Database | **None** — content stored in browser `localStorage` |
| Auth | Client-side only (`sessionStorage` flag) |
| Hosting target | Vercel / Netlify |
| Path alias | `@/*` → `./src/*` |
| Tailwind colors | saffron `#E87512`, gold `#C89B3C`, cream `#FFF8E8`, maroon `#641E12`, charcoal `#2B2118` |
| Fonts | Noto Serif Devanagari (headings), Noto Sans Devanagari + Inter (body) |
| Language | Hindi default, English toggle via `src/lib/languageContext.tsx` (`t('हिंदी', 'English')`) |

### Key files

```
src/
├── App.tsx                      # hand-rolled router + scroll-reveal engine
├── main.tsx                     # mounts App + RudrashtakamMusic  ← duplicate audio!
├── index.css                    # Tailwind + all custom Vedic styles + loader CSS
├── lib/
│   ├── cmsStore.ts              # localStorage "CMS" (fake backend)  ← security issues
│   ├── languageContext.tsx      # hi/en toggle helper `t()`
│   └── utils.ts                 # cn() = clsx + tailwind-merge
├── data/                        # services.ts (14), blogs.ts, gallery.ts, acharya.ts
├── components/
│   ├── Loader.tsx               # ✅ redesigned (Om + circular progress + typing mantra)
│   ├── BookingForm.tsx          # ✅ refactored to shadcn/ui (used only on SpecialAnushthan)
│   ├── ContactSection.tsx       # ❌ old raw-HTML form, alert() validation, no real submit
│   ├── audio/BackgroundMusic.tsx    # plays /audio/background.mp3 (exists)
│   ├── audio/RudrashtakamMusic.tsx  # plays /audio/rudrashtakam.mp3 (MISSING!)
│   └── ui/                      # shadcn components: button, card, checkbox, dialog,
│                                # input, label, select, sheet, textarea, dock, works-wheel
└── pages/                       # Home, About, Services, ServiceDetail, SpecialAnushthan,
                                 # Gallery, Blogs, BlogDetail, Contact, Legal, Prototypes, Admin
```

### Routes (App.tsx)
`/` · `/about` · `/services` · `/services/:slug` · `/special-anushthan` · `/gallery` · `/blogs` · `/blogs/:slug` · `/contact` · `/privacy-policy` · `/terms-and-conditions` · `/prototypes` · `/admin`
Unknown → silently renders Home (no 404).

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

## 4. OPEN ISSUES (prioritized, from AUDIT_REPORT.md)

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

## 5. Decisions still needed from the user

1. **Enquiry delivery:** (a) WhatsApp-only (free, instant, no infra) · (b) Formspree/Resend email · (c) full Vercel API + Postgres/Supabase. ⬅ **blocks B1/B2/S3/S4**
2. **Admin security level:** remove hint + backdoors only (quick), or full hashed password + server auth (needs backend decision).
3. **Keep or remove `RudrashtakamMusic`?** (duplicate of `BackgroundMusic`).

---

## 6. Suggested execution order (next session)

```
1. S1 remove password hint                      (1 line)
2. S2 remove backdoors                          (small)
3. U1 reveal sweep fix                          (1 line)   → biggest visual win
4. U2 remove duplicate music widget             (1 line)
5. B3 fix missing audio                         (1 line)
6. B4/B5 cmsStore data integrity                (small)
7. U3 gallery wheel sizing                      (medium)
8. U4 mobile floating widgets                   (medium)
9. U5/A2 unify ContactSection → shadcn form     (medium)
10. A1/A3 accessibility + Hindi copy            (small)
11. P1/P2/P3 process cleanup                    (small)
12. B1/B2 real backend (needs decision)         (large)
```

---

## 7. Reusable audit commands

```powershell
# start dev server (background)
npm run dev

# full route audit (writes audit-output/report.json + screenshots)
npx playwright test --config=playwright.audit.config.ts

# reveal-engine debug (prints JSON to console)
npx playwright test scripts/audit/debug-reveal.spec.ts --config=playwright.audit.config.ts --reporter=list
```

---

## 8. Backup artifacts

- Git commits hold every change (branch: `main`).
- Zip snapshot: `backups/akshay-website-backup-<timestamp>.zip`
  (excludes `node_modules`, `dist`, `.git`, audit screenshots, local photo/video originals).
- Restore: unzip into an empty folder → `npm install` → `npm run dev`.

---

## 9. Important gotchas / conventions

- Dev server may start on **5174** if 5173 is taken — audit config points at 5174.
- `src/index.css` is ~950 lines; loader styles are at the bottom.
- The old loader CSS classes (`.spiritual-card`, `.rudraksha-center`, `.loader-canvas`, `.progress-track`, …) were **replaced**; don't reintroduce them.
- `BookingForm` checkbox needs `checked as boolean` due to Radix typing.
- `App.tsx` scroll-reveal uses `.reveal` + `.is-visible` + `.stagger` — any new section that should animate needs `className="reveal"`.
- The site is fully client-side; there are no environment variables today.
