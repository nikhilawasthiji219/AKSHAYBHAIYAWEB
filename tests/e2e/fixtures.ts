import { test as base, expect, type Page } from '@playwright/test';

/**
 * Wait until the app is actually interactive on a cold load:
 *  1. React must have mounted (`main` exists);
 *  2. the lazy route chunk must finish (Suspense fallback replaced).
 */
async function waitForAppReady(page: Page) {
  await page.locator('main').waitFor({ state: 'attached', timeout: 20000 });

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
