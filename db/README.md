# Database plan — `localStorage` → Supabase Postgres

> Status: **plan + one applied-by-you migration.** No server is connected, so
> nothing here has run. The only executable artifact is
> `migrations/0001_rituals.sql`; everything else is a decision document.

---

## 1. Where the data lives today

One browser key holds the entire site:

```js
localStorage['akshay_website_cms_v2'] = {
  gallery:    GalleryItem[],      // 30+ photos/videos
  categories: GalleryCategory[],
  blogs:      Blog[],
  services:   Service[],          // the 14 rituals
  profile:    AcharyaProfileType, // priest bio + contact + photo paths
  settings:   SiteSettings,       // ticker text, toggles, adminPasswordHash
  lastUpdated: string,
}
localStorage['akshay_admin_auth_v1'] // "logged in" flag — the whole auth system
```

Consequences, all already known and accepted:

| Symptom | Cause |
|---|---|
| Edits are invisible on other devices | State is per-browser |
| Clearing site data wipes the site content | No durable store |
| `admin123` gate is bypassable from DevTools | Auth is a client-side flag |
| `settings.adminPasswordHash` is readable by any visitor | It is in the same public key |

The last row matters for this plan: **the password hash must not become a
readable database column.** It moves to Supabase Auth, not to a table.

---

## 2. Target shape

```
Browser (React SPA)
   │
   ├─► Postgres (Supabase)   short strings only: titles, timings, prices,
   │                         and image FILE NAMES (~200 bytes/row)
   │
   └─► ImageKit CDN          every pixel, resized + re-encoded per request
```

Why the split: the free 500 MB data tier is only a constraint if images are in
it. Storing `mahakal-puja.jpg` instead of a 500 KB JPEG means tens of thousands
of rows fit. `migrations/0001_rituals.sql` encodes this contract in a column
comment.

---

## 3. Table map

| Today (`localStorage`) | Target table | Notes |
|---|---|---|
| `services[]` | **`rituals`** | Created in `0001_rituals.sql`. See §4 for the columns still missing. |
| `blogs[]` | `blogs` | `content text[]` → `jsonb` (array of paragraphs) or a child table. |
| `gallery[]` | `gallery_items` | `imageUrl` → `image_path` (file name only); `videoUrl` likewise. |
| `categories[]` | `gallery_categories` | 8-ish rows, `id` + `label`. |
| `profile{}` | `site_profile` | Single row. `contact`/`photos` as `jsonb` is fine at this size. |
| `settings{}` | `site_settings` | Single row. **Exclude `adminPasswordHash`** — see §6.1. |
| *(nothing)* | `enquiries` | New. Only if WhatsApp-only delivery is ever revisited. |
| `akshay_admin_auth_v1` | *(delete)* | Replaced by Supabase Auth sessions. |

`rituals` vs `services`: the table is named `rituals` because that is the
domain word (अनुष्ठान) and it is what the priest says. The React type stays
`Service`; an adapter maps snake_case rows to the existing camelCase type so no
component changes.

---

## 4. Gap before `services` can be migrated

`0001_rituals.sql` matches the agreed six-column contract exactly. The real
`Service` type carries more, and `/services/:slug` routing **requires `slug`**:

| Missing column | Type | Why |
|---|---|---|
| `slug` | `text unique not null` | Deep links (`/services/grah-shanti`) break without it |
| `short_desc` | `text` | Card summary |
| `significance` | `text` | Detail page body |
| `methodology` | `text` | Detail page body |
| `materials` | `text[]` | Detail page list |
| `benefits` | `text[]` | Detail page list |
| `suitable_time` | `text` | Detail page |
| `icon_type` | `text` | Icon selection in the UI |
| `badge` | `text` | Optional ribbon |
| `featured` | `boolean default false` | Home page ordering |
| `sort_order` | `int4` | Curated order; `order by id` is only a stand-in |

Add these as `0002_rituals_content.sql` **before** switching the site over.
Do not add them speculatively before then — one migration per intent.

---

## 5. Migration order

Each phase leaves the site working. Stop after any phase.

| Phase | Work | Risk |
|---|---|---|
| **0** *(this commit)* | Prototype page + `0001_rituals.sql`. Nothing in `src/` touched. | none |
| **1** | Read-only: app fetches from `rituals`, falls back to bundled `SERVICES_DATA` on error. | low |
| **2** | Move photos to ImageKit; `public/` shrinks by ~18 MB; `image_path` values backfilled. | low |
| **3** | Writes: Supabase Auth (email+password, one account), RLS write policies, admin panel posts instead of `saveCMSData`. | medium — first real auth |
| **4** | Blogs + gallery tables, same read-then-write pattern. | medium |
| **5** | Delete `cmsStore.ts`'s localStorage path and the bundled fallbacks. | low |

Phase 1 is the one that de-risks everything else: a failed query degrades to
today's behaviour instead of an empty page.

---

## 6. Decisions still open

1. **Admin authentication.** Supabase Auth, one account, email + password.
   The current `admin123` gate and `settings.adminPasswordHash` are deleted, not
   migrated — a hash in a publicly readable table is worse than no hash.
   Admin writes go through RLS policies tied to the authenticated user, or
   through a server route holding `service_role`. Never the browser.
2. **Enquiries.** Still WhatsApp-only (§5.1 of `PROJECT_STATE.md`). Adding an
   `enquiries` table only helps if something writes to it; that needs a server
   route, which is a separate decision.
3. **Blog body shape.** `text[]` → `jsonb` keeps ordering and allows structured
   blocks later; a child table is more normalised but heavier for 10 posts.
4. **ImageKit folder layout.** Flat (`/rudrabhishek.jpg`) is simplest; folders
   per media type (`/rituals/…`, `/gallery/…`) make bulk operations easier.

---

## 7. Performance: what to measure first

The rule for this migration is **no index without an `EXPLAIN` that shows a
reason.** Today there is nothing to measure, so this is the day-one baseline to
capture once the project is live:

```sql
-- row count and real footprint (the number that decides if the free tier is fine)
select count(*)                                        as rows,
       pg_size_pretty(pg_total_relation_size('public.rituals')) as total_size
from public.rituals;

-- the exact query the prototype runs
explain (analyze, buffers, format text)
select id, title, description, duration, price, image_path
from public.rituals
order by id
limit 100;
```

Expected and acceptable on a 14-row table: `Index Scan` (or `Seq Scan`) on one
heap page, `Execution Time` well under 1 ms. **Do not add indexes to fix that** —
there is nothing to fix, and each index costs write throughput.

Also record, in the browser:

| Metric | Where | Target |
|---|---|---|
| PostgREST response size | DevTools → Network → `rituals?select=…` | < 10 KB |
| Rows returned | console line printed by `app.js` | equals `count(*)` |
| LCP with ImageKit transforms | Lighthouse | < 2.5 s on 4G |
| Bytes of images on first paint | Network, filtered to Image | lazy-loaded, so ~1 screenful |

If a future query filters on text, add a **trigram** index, not a btree —
btree cannot serve `ilike '%term%'`. `0001_rituals.sql` carries the commented
example.

---

## 8. Applying the migration

```powershell
# Supabase CLI linked to the project
supabase db push

# or: paste db/migrations/0001_rituals.sql into the dashboard SQL editor
```

Then verify the security posture is actually what the file claims — this is the
step people skip:

```sql
-- expect: rowsecurity = true
select relrowsecurity from pg_class where oid = 'public.rituals'::regclass;

-- expect exactly one policy, cmd = SELECT
select polname, polcmd, polroles::regrole[] from pg_policy
where polrelid = 'public.rituals'::regclass;

-- expect: select only for anon. If insert/update/delete appear, stop.
select grantee, privilege_type from information_schema.role_table_grants
where table_name = 'rituals' and grantee in ('anon', 'authenticated')
order by grantee, privilege_type;
```

Finally, from a browser console on any origin, confirm a write is refused:

```js
// must fail with 42501 / "row-level security policy"
await fetch(`${SUPABASE_URL}/rest/v1/rituals`, {
  method: 'POST',
  headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'probe' }),
});
```

If that insert succeeds, RLS is not doing its job — treat it as a production
incident, not a config detail.
