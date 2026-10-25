import { test, expect } from './fixtures';

/**
 * Layout regression guard: the redesigned contact form, the floating widgets and
 * the gallery wheel must never introduce horizontal scrolling. Runs in all three
 * projects, so it covers desktop, Pixel 5 and iPhone 12 widths.
 */
const KEY_ROUTES = ['/', '/contact', '/gallery', '/services', '/blogs'];

test.describe('Layout', () => {
  for (const path of KEY_ROUTES) {
    test(`no horizontal overflow on ${path}`, async ({ page }) => {
      await page.goto(path);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );

      expect(overflow, `horizontal overflow on ${path}`).toBeLessThanOrEqual(2);
    });
  }
});
