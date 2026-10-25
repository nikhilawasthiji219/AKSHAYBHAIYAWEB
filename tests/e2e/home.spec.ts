import { test, expect } from '@playwright/test';

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

  test('navigates to about page via navbar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /परिचय|About/i }).click();
    await expect(page).toHaveURL('/about');
  });

  test('opens WhatsApp on floating button click', async ({ page }) => {
    await page.goto('/');
    const popupPromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: /Contact on WhatsApp/ }).click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(/whatsapp.com|wa\.me/);
  });
});
