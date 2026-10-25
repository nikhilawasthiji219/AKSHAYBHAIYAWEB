import { test, expect } from './fixtures';

test.describe('Home page', () => {
  test('loads and shows hero heading with acharya name', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1').first()).toHaveText(/शास्त्री अक्षय अवस्थी जी/);
    await expect(page).toHaveTitle(/शास्त्री अक्षय|अवस्थी|उज्जैन/);
  });

  test('navigates to services page via hero CTA', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /सभी सेवाएँ|View All Services/ }).click();
    await expect(page).toHaveURL('/services');
    await expect(page.getByRole('heading', { name: /हमारी सेवाएं/ })).toBeVisible();
  });

  test('navigates to about page via navbar', async ({ page, isMobile }) => {
    await page.goto('/');
    if (isMobile) {
      await page.getByRole('button', { name: /मेनू खोलें|Open menu/ }).click();
    }
    await page.getByRole('button', { name: /^(परिचय|About)$/ }).click();
    await expect(page).toHaveURL('/about');
  });

  test('all WhatsApp actions use the priest number, at least one is pre-filled', async ({ page }) => {
    await page.goto('/');

    // Assert link targets instead of opening wa.me — external navigations made
    // the popup-based test slow and flaky. The floating button (desktop) and the
    // bottom-bar item (mobile) are the ones that carry a pre-filled message.
    const links = page.getByRole('link', { name: /WhatsApp/ });
    const total = await links.count();
    expect(total).toBeGreaterThan(0);

    let preFilled = 0;
    for (let i = 0; i < total; i++) {
      const link = links.nth(i);
      if (!(await link.isVisible())) continue;

      const href = await link.getAttribute('href');
      expect(href).toContain('wa.me/919300096938');
      if (href?.includes('?text=')) preFilled += 1;
    }

    expect(preFilled).toBeGreaterThan(0);
  });

  test('reveals all sections after a fast scroll to the bottom', async ({ page }) => {
    await page.goto('/');
    // Hero has two responsive <h1>s (one hidden per breakpoint) — text check only.
    await expect(page.locator('h1').first()).toHaveText(/शास्त्री अक्षय अवस्थी जी/);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await expect(page.locator('.reveal:not(.is-visible)')).toHaveCount(0);
  });

  test('unknown route renders the 404 page', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
    await expect(page.getByText(/यह पृष्ठ नहीं मिला/)).toBeVisible();
  });
});
