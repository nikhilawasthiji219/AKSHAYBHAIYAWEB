import { test, expect } from './fixtures';

test.describe('Services', () => {
  test('lists all 14 services', async ({ page }) => {
    await page.goto('/services');
    // Scope to <main>: the footer also contains a "हमारी सेवाएं" heading.
    await expect(page.getByRole('main').getByRole('heading', { name: /हमारी सेवाएं/ })).toBeVisible();
    // 14 service cards each render an h4 with the service title
    await expect(page.locator('h4')).toHaveCount(14);
    await expect(page.getByText('रुद्राभिषेक')).toBeVisible();
  });

  test('navigates to service detail page', async ({ page }) => {
    await page.goto('/services');
    await page.getByText('रुद्राभिषेक').first().click();
    await expect(page).toHaveURL(/\/services\/rudrabhishek/);
    await expect(page.locator('h1')).toHaveText(/रुद्राभिषेक/);
  });

  test('special anushthan book button navigates to contact', async ({ page }) => {
    await page.goto('/services');
    await page.getByRole('button', { name: /अपने विशेष पूजन/ }).click();
    await expect(page).toHaveURL('/contact');
  });
});
