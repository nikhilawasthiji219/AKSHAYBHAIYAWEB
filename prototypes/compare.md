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
