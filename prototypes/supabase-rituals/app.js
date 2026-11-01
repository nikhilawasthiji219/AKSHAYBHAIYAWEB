/**
 * Rituals grid — Supabase for text rows, ImageKit for images.
 *
 * Why the split: Postgres holds only short strings (title, duration, price and
 * a *file name*), so the free 500 MB data tier lasts effectively forever. Every
 * pixel is served by ImageKit's CDN, resized and re-encoded on the fly. The
 * database never stores a full image URL, let alone the bytes.
 *
 * Written as a classic script (no ESM) so the page also works when opened
 * directly from disk — `file://` blocks module imports but not classic scripts.
 */
(function () {
  'use strict';

  var CONFIG = window.__RITUALS_CONFIG__ || {};

  var TABLE = 'rituals';

  /**
   * Explicit column list instead of `select('*')`: the payload can never grow
   * silently when a column is added. (With ~14 rows the saving itself is a few
   * kilobytes — the real weight here is images, which never touch Postgres.)
   */
  var COLUMNS = 'id, title, description, duration, price, image_path';

  /** Resize to 600px wide, auto-format (WebP/AVIF), quality 80. */
  var IMAGE_TRANSFORM = 'tr=w-600,f-auto,q-80';

  /**
   * Safety cap. PostgREST would happily stream 1000 rows into a DOM grid; this
   * page is a curated catalogue (single digits to a few dozen entries).
   */
  var MAX_ROWS = 100;

  var SKELETON_COUNT = 6;

  // ---------------------------------------------------------------- utilities

  /** Trim to a string; returns '' for null/undefined. */
  function text(value) {
    return value == null ? '' : String(value).trim();
  }

  /**
   * Sets textContent (never innerHTML) and reports whether anything was set.
   * Using textContent is what makes database-provided text safe: `<script>`
   * inside a title renders as literal characters.
   */
  function setText(element, value) {
    if (!element) return false;
    var value_ = text(value);
    if (!value_) return false;
    element.textContent = value_;
    return true;
  }

  /**
   * Builds the CDN URL for a stored image *path*.
   *
   *   "mahakal-puja.jpg"  → https://ik.imagekit.io/<id>/mahakal-puja.jpg?tr=…
   *
   * Rows that already hold an absolute URL are passed through untouched so
   * legacy rows keep working during a migration.
   */
  function buildImageUrl(path) {
    var raw = text(path);
    if (!raw) return '';

    if (/^https?:\/\//i.test(raw)) return raw;

    var base = text(CONFIG.imagekitEndpoint).replace(/\/+$/, '');
    if (!base) return '';

    var clean = raw.replace(/^\/+/, '').replace(/ /g, '%20');

    // Never stack transforms if the stored path already carries some.
    if (/(^|[?&])tr=/.test(clean)) return base + '/' + clean;

    var joiner = clean.indexOf('?') === -1 ? '?' : '&';
    return base + '/' + clean + joiner + IMAGE_TRANSFORM;
  }

  function setStatus(element, message, tone) {
    if (!element) return;
    element.textContent = message;
    element.className = 'status' + (tone ? ' status--' + tone : '');
  }

  function validateConfig(config) {
    var problems = [];

    var url = text(config.supabaseUrl);
    if (!url || /YOUR-PROJECT-REF/i.test(url)) {
      problems.push('supabaseUrl');
    } else if (/^https?:\/\/(www\.)?supabase\.(co|com)\/?$/i.test(url)) {
      // A bare supabase.co is not a project endpoint; PostgREST answers 400.
      problems.push('supabaseUrl (project-ref missing)');
    } else {
      try {
        // eslint-disable-next-line no-new
        new URL(url);
      } catch (err) {
        problems.push('supabaseUrl (not a URL)');
      }
    }

    var key = text(config.supabaseAnonKey);
    if (!key || /YOUR-PUBLIC-ANON-KEY/i.test(key)) problems.push('supabaseAnonKey');

    var endpoint = text(config.imagekitEndpoint);
    if (!endpoint || /YOUR_IMAGEKIT_ID/i.test(endpoint)) problems.push('imagekitEndpoint');

    return problems;
  }

  // ------------------------------------------------------------------ render

  function renderSkeletons(grid) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < SKELETON_COUNT; i += 1) {
      var card = document.createElement('div');
      card.className = 'card card--skeleton';
      card.setAttribute('aria-hidden', 'true');

      var media = document.createElement('div');
      media.className = 'card__media';

      var body = document.createElement('div');
      body.className = 'card__body';

      var line1 = document.createElement('div');
      line1.className = 'card__line';

      var line2 = document.createElement('div');
      line2.className = 'card__line card__line--short';

      body.append(line1, line2);
      card.append(media, body);
      fragment.appendChild(card);
    }

    grid.replaceChildren(fragment);
  }

  function buildCard(row, template) {
    var node = template.content.firstElementChild.cloneNode(true);

    var img = node.querySelector('.card__img');
    var src = buildImageUrl(row.image_path);

    if (src) {
      // A broken CDN path must not leave a broken-image icon in the grid.
      img.addEventListener('error', function () { img.remove(); }, { once: true });
      img.src = src;
      img.alt = text(row.title) || 'अनुष्ठान का चित्र';
    } else {
      img.remove();
    }

    setText(node.querySelector('.card__title'), row.title);

    var desc = node.querySelector('.card__desc');
    if (!setText(desc, row.description)) desc.remove();

    // Drop meta pairs the row does not fill in, and the list once both are gone.
    var meta = node.querySelector('.card__meta');
    var items = meta.querySelectorAll('.card__meta-item');

    var shown = 0;
    if (setText(items[0].querySelector('dd'), row.duration)) shown += 1;
    else items[0].remove();

    if (setText(items[1].querySelector('dd'), row.price)) shown += 1;
    else items[1].remove();

    if (shown === 0) meta.remove();

    return node;
  }

  function renderRows(rows, template, grid) {
    var fragment = document.createDocumentFragment();
    rows.forEach(function (row) { fragment.appendChild(buildCard(row, template)); });
    grid.replaceChildren(fragment);
  }

  // -------------------------------------------------------------------- load

  async function loadRituals() {
    var grid = document.getElementById('rituals-grid');
    var statusEl = document.getElementById('rituals-status');
    var template = document.getElementById('ritual-card');

    var problems = validateConfig(CONFIG);
    if (problems.length) {
      grid.replaceChildren();
      grid.setAttribute('aria-busy', 'false');
      setStatus(statusEl, 'कॉन्फ़िगरेशन अधूरा है: ' + problems.join(', ') + '. config.js देखें।', 'error');
      console.error('[rituals] incomplete config — missing:', problems);
      return;
    }

    if (!window.supabase || typeof window.supabase.createClient !== 'function') {
      grid.setAttribute('aria-busy', 'false');
      setStatus(statusEl, 'Supabase लाइब्रेरी लोड नहीं हुई। इंटरनेट कनेक्शन जाँचें।', 'error');
      console.error('[rituals] supabase-js UMD bundle did not load (CDN blocked?)');
      return;
    }

    renderSkeletons(grid);
    setStatus(statusEl, 'सेवाएँ लोड हो रही हैं…');

    var startedAt = performance.now();

    try {
      var client = window.supabase.createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey);

      var result = await client
        .from(TABLE)
        .select(COLUMNS)
        .order('id', { ascending: true })
        .limit(MAX_ROWS);

      // supabase-js resolves with { error } instead of throwing; surface it so
      // the catch below is the single error path.
      if (result.error) throw result.error;

      var rows = Array.isArray(result.data) ? result.data : [];
      renderRows(rows, template, grid);

      grid.setAttribute('aria-busy', 'false');

      if (rows.length === 0) {
        setStatus(statusEl, 'अभी कोई सेवा जोड़ी नहीं गई है।', 'empty');
      } else {
        setStatus(statusEl, rows.length + ' सेवाएँ उपलब्ध हैं।');
      }

      // One line, greppable, and the number to compare against later.
      console.info(
        '[rituals] ' + rows.length + ' rows in ' + Math.round(performance.now() - startedAt) + ' ms',
      );
    } catch (error) {
      var info = {
        message: error && error.message ? error.message : String(error),
        code: error && error.code,
        details: error && error.details,
        hint: error && error.hint,
      };

      // Log the fields, not the whole object: keeps the anon key out of any
      // copied console output, even though that key is public.
      console.error('[rituals] Supabase query failed', info);

      grid.replaceChildren();
      grid.setAttribute('aria-busy', 'false');
      setStatus(statusEl, 'सेवाएँ लोड नहीं हो सकीं। कृपया कुछ देर बाद पुनः प्रयास करें।', 'error');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadRituals, { once: true });
  } else {
    loadRituals();
  }

  if (CONFIG.debug) {
    window.__rituals = { buildImageUrl: buildImageUrl, load: loadRituals, config: CONFIG };
  }
})();
