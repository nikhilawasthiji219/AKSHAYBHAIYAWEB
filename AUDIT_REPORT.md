# 🔍 End-to-End Audit Report — Akshay Bhaiya Website

**Date:** 2026‑10‑25
**Method:** Playwright (Chromium) against `npm run dev`, all 13 routes @ 1440×900 and 390×844, plus code review.
**Screenshots:** `audit-output/` and `audit-output-2/` (desktop + mobile, full page)

---

## ✅ What passed

| Check | Result |
|---|---|
| Existing E2E suite (13 tests) | **13/13 pass** |
| Horizontal overflow (all pages, desktop + mobile) | **None** |
| Broken images | **None** |
| JS console errors / page errors | **None** |
| Route navigation (home → services → detail → contact, blogs, gallery) | Works |
| TypeScript compile + production build | Passes |
| Fonts & Devanagari rendering | Correct |

---

## 🔴 CRITICAL — Security

### 1. Admin password printed on the public login page
`src/pages/AdminPage.tsx:534`
```
💡 डिफ़ॉल्ट पासवर्ड: admin123
```
Anyone visiting `/admin` is told the password.

### 2. Plaintext password + hardcoded backdoors
`src/lib/cmsStore.ts:17, 236‑243, 249‑259`
- Default password stored in plain text in `localStorage` (`adminPasswordHash`).
- `loginAdmin()` accepts **three** passwords: stored one, `mahakal123`, and `admin`.
- `changeAdminPassword()` likewise accepts the two hardcoded ones as "current password".

### 3. Auth is client-side only
`cmsStore.ts:230‑247` — `checkAdminAuth()` just reads `sessionStorage['akshay_admin_auth_v1']`. Anyone can open DevTools and set it to `authenticated`. There is no server session at all.

### 4. "CMS" edits are per-browser only (not a real CMS)
All content lives in `localStorage` under `akshay_website_cms_v2`. Whatever the priest edits in `/admin` is visible **only in that browser** — other visitors still see the built-in data. A cleared cache wipes all edits.

---

## 🔴 CRITICAL — Backend / Data

### 5. There is no backend. Enquiries are never sent or saved.
- `src/components/ContactSection.tsx:23‑30` — `handleSubmit` only calls `setIsSubmitted(true)`.
- `src/components/BookingForm.tsx:46‑59` — same behaviour.
- No `api/` folder, no fetch call, no email/WhatsApp transport on submit, no database.
- **Result:** anyone who fills the form and presses "Contact for Puja/Anushthan" sees a success message, but the enquiry goes nowhere. This is the single biggest business bug.

### 6. Missing audio asset
`/audio/rudrashtakam.mp3` does **not exist** (`public/audio/` contains only `background.mp3`), yet `RudrashtakamMusic` mounts it on every page → **12 failed network requests** per page load.

### 7. Empty-array data bug
`cmsStore.ts:44‑47`
```ts
gallery: parsed.gallery.length > 0 ? parsed.gallery : INITIAL_CMS_DATA.gallery
```
If the admin deletes **all** gallery items / blogs / services, the defaults silently come back on reload. Deleting the last item is impossible.

### 8. Silent delete failures
`deleteGalleryItem`, `deleteBlog`, `deleteService` always `return true`, even if the id was never found.

### 9. Shallow backup import validation
`importBackupJSON` only checks 4 keys exist — no schema validation; a bad import can corrupt the store.

---

## 🟠 HIGH — UI bugs

### 10. Scroll-reveal can permanently hide content (blank sections)
`src/App.tsx:77‑83`
```ts
if (rect.top < vh - 40 && rect.bottom > 0) show(el);
```
Fast scroll / fling / deep-link skips elements from below the fold to above it, so they never satisfy the check. They stay at `opacity: 0` **forever**.

**Reproduced:** on Home only 7 of 14 service chips render; the whole "हमारे लेख" block is blank. On Gallery, 8 photos never appear.
**Fix:** drop the `rect.bottom > 0` condition (anything at or above the viewport should be revealed).

### 11. Two background-music widgets overlap
- `main.tsx:12` mounts `RudrashtakamMusic` (fixed `bottom-0 left-2`, z‑40).
- `App.tsx:317` mounts `BackgroundMusic` (fixed `bottom-[4.5rem] left-3`, z‑50).
Both render on every public page; on mobile they collide with the bottom nav, the diya FAB and each other.

### 12. Gallery hero wheel is broken on desktop
`src/pages/GalleryPage.tsx:45‑60` + `works-wheel.tsx`
- Wheel starts at page top (`h-[92vh]`) under the sticky navbar → top card is clipped.
- Ring radius (`cardH × 1.14`) makes the ring taller than the stage → top/bottom cards cut off.
- The right-hand index list (`top-[7.5%] right-[2.5%]`, tiny `0.04 × cardH` font) overlaps cards and is unreadable.

### 13. Floating-widget pile-up on mobile
On a 390 px screen, all of these are fixed at/near the bottom simultaneously:
bottom nav (74 px) + music pill + music circle + diya FAB + WhatsApp pill → they overlap each other and page content.

### 14. `alert()` used for form validation
`ContactSection.tsx:26` — blocking `alert()` instead of inline errors (the shadcn `BookingForm` already does inline errors correctly).

### 15. Inconsistent forms
`SpecialAnushthanPage` uses the new shadcn `BookingForm`, but `ContactPage` uses the older raw-HTML `ContactSection`. Two different validation styles and success states.

---

## 🟡 MEDIUM — Accessibility

### 16. Tap targets below 44 px
Measured in Chromium:

| Element | Size |
|---|---|
| Footer links (all pages) | **~38 × 16 px** |
| Gallery category pills | **~50–92 × 22 px** |
| Desktop nav items | ~19–51 × 20 px |
| "View All" gallery link | 65 × 16 px |

### 17. Missing form labels
`ContactSection` inputs use placeholders only — no `<label>`/`aria-label`, so screen readers announce nothing.

### 18. Icon-only buttons without accessible names
Gallery dock icons rely on `aria-label` on the inner button (ok), but the Admin modal close/delete icon buttons and the music widgets need auditing.

### 19. English copy in Hindi mode
Footer tagline ("Authentic Vedic Rituals, Puja, Spiritual Discourse, Astrology, Vastu and Spiritual Services in Ujjain.") and address/labels in `ContactSection` are hardcoded English despite the `t()` helper being available.

---

## 🟡 MEDIUM — Project / process

### 20. Missing npm scripts required by AGENTS.md
`package.json` only has `dev`, `build`, `preview`.
`npm run lint`, `npm run typecheck`, `npm test` **do not exist**, although AGENTS.md/CLAUDE.md require them before "done".

### 21. Stray mockup in source
`src/components/nnn/nnm.html` — a leftover static mockup inside the app source tree (not imported).

### 22. No 404 route
Unknown paths silently render the Home page (`App.tsx:271‑284`), so broken links are invisible.

### 23. `RudrashtakamMusic` attaches listeners to elements that don't exist yet
`RudrashtakamMusic.tsx:73‑80` queries `a`/`button` at mount time; lazy-loaded pages mount later, so most listeners never attach. Also has a stale-closure dependency (`userInteracted` read inside the mount effect).

---

## Suggested fix order

| # | Fix | Effort | Impact |
|---|---|---|---|
| 1 | Real enquiry delivery (API/email or WhatsApp-on-submit fallback) | M | 🔥 Revenue |
| 2 | Remove password hint + backdoors; hash password | S | 🔥 Security |
| 3 | Reveal-sweep condition fix (`rect.top < vh - 40`) | XS | 🔥 Blank sections |
| 4 | Remove duplicate music widget / add missing mp3 | XS | High |
| 5 | Fix gallery wheel sizing/offset | S | High |
| 6 | Fix mobile floating widget positions | S | High |
| 7 | Empty-array fallback + delete return values | XS | Med |
| 8 | 44 px tap targets + form labels + Hindi footer copy | S | Med |
| 9 | Add `lint` / `typecheck` / `test` scripts | XS | Process |
| 10 | 404 page + remove stray mockup | XS | Polish |

---

**Legend:** XS ≈ <15 min · S ≈ 15–60 min · M ≈ 1–3 h
