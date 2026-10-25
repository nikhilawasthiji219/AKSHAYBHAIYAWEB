import { test, expect } from './fixtures';

test.describe('Gallery', () => {
  test('loads gallery page with heading and images', async ({ page }) => {
    await page.goto('/gallery');
    await expect(page.getByRole('heading', { name: /हमारी गैलरी|Our Gallery/ })).toBeVisible();
    await expect(page.locator('img').first()).toBeVisible();
  });
});
