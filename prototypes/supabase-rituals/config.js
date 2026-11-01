/**
 * Runtime configuration for the rituals grid.
 *
 * This file is committed with placeholders on purpose — a static page has no
 * build step, so values cannot be injected from the environment at build time.
 * Replace the three placeholders locally.
 *
 * SECURITY
 * --------
 * - `supabaseAnonKey` is PUBLIC by design. It is the same key every visitor of
 *   a Supabase site downloads. It is only safe because Row Level Security is
 *   enabled on every table and grants nothing but SELECT — see
 *   db/migrations/0001_rituals.sql.
 * - NEVER put a `service_role` key in this file. That key bypasses RLS and
 *   grants full read/write to anyone who opens DevTools. Anything that needs it
 *   must run server-side.
 */
window.__RITUALS_CONFIG__ = {
  /**
   * The Supabase API endpoint, NOT the marketing site.
   * Correct:   https://abcdefghijklmnop.supabase.co
   * Incorrect: https://supabase.co        (no project ref → every request 400s)
   * Incorrect: https://supabase.com
   */
  supabaseUrl: 'https://YOUR-PROJECT-REF.supabase.co',

  /** Settings → API → "anon public" key. Safe to ship, see the note above. */
  supabaseAnonKey: 'YOUR-PUBLIC-ANON-KEY',

  /**
   * ImageKit "URL endpoint" from the dashboard, without a trailing slash.
   * Correct: https://ik.imagekit.io/your_imagekit_id
   */
  imagekitEndpoint: 'https://ik.imagekit.io/YOUR_IMAGEKIT_ID',

  /**
   * Exposes helpers on window.__rituals for manual debugging. Turn off once
   * the page is in front of real visitors.
   */
  debug: true,
};
