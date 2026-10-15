# Project: Akshay Bhaiya Website
## What this product
A premium, responsive website for Vedic priest Acharya Akshay Bhaiya based at श्री महाकालेश्वर तीर्थ, उज्जैन. The site showcases 14+ religious services, blog posts, gallery of ritual photos, and an enquiry form that opens WhatsApp for bookings. It serves as a digital presence for the priest's services while maintaining traditional authenticity with heritage design aesthetics.

## Stack (do not change without asking)
- Frontend: React 19 + TypeScript + Vite + Tailwind CSS
- Backend: None (static site with API routes for enquiries)
- Database: PostgreSQL (future) / Supabase
- Auth: None (static site)
- Hosting: Vercel / Netlify

## Rules
- Never commit secrets. All secrets go in environment variables, documented in .env.example.
- Every new API endpoint needs: input validation, auth check, authorization check, tests.
- Every database change goes through a migration file. Never edit the DB by hand.
- Run lint, typecheck and tests before saying a task is done.
- Ask before adding a new dependency.
- Prefer small, reviewable changes. One feature per branch.

## Commands
- Dev: `npm run dev`
- Test: `npm test`
- Lint/typecheck: `npm run lint && npm run typecheck`
- Build: `npm run build`