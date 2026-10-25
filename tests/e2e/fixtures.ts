import { test as base, expect, type Page } from '@playwright/test';

/**
 * Wait until the app is actually interactive on a cold load:
 *  1. React must have mounted (`main` exists) — this guarantees the loading
 *     screen is either present or already finished, so the `detached` wait
 *     below cannot pass prematurely on an empty DOM;
 *  2. the first-visit loading screen (`#loader`) must detach (~3.4 s intro);
 *  3. the lazy route chunk must finish (Suspense fallback replaced).
 *
 * A previous version only waited for `#loader` to detach, which resolved
 * instantly when React had not mounted yet — the click then hit the overlay.
 */
async function waitForAppReady(page: Page) {
  await page.locator('main').waitFor({ state: 'attached', timeout: 20000 });

  await page
    .locator('#loader')
    .waitFor({ state: 'detached', timeout: 20000 })
    .catch(() => {});

  await expect(page.locator('main'))
    .not.toContainText('लोड हो रहा है', { timeout: 20000 })
    .catch(() => {});
}

export const test = base.extend({
  page: async ({ page }, use) => {
    const originalGoto = page.goto.bind(page);
    page.goto = (async (url, options) => {
      const response = await originalGoto(url, options);
      await waitForAppReady(page);
      return response;
    }) as typeof page.goto;

    await use(page);
  },
});

export { expect };
