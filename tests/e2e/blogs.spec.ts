import { test, expect } from './fixtures';

test.describe('Blogs', () => {
  test('lists blog posts', async ({ page }) => {
    await page.goto('/blogs');
    await expect(page.getByRole('heading', { name: /वैदिक ज्ञान एवं धार्मिक जानकारी/ })).toBeVisible();
    await expect(page.getByText(/उज्जैन में रुद्राभिषेक का धार्मिक महत्व/)).toBeVisible();
  });

  test('navigates to blog detail', async ({ page }) => {
    await page.goto('/blogs');
    await page.getByRole('button', { name: /संपूर्ण लेख पढ़ें|Read More/ }).first().click();
    await expect(page).toHaveURL(/\/blogs\/rudrabhishek-ujjain-mahatva/);
  });
});
