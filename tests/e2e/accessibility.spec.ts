import { test, expect } from '@playwright/test';

test.describe('Accessibility basics', () => {
  test('home page has main and navigation landmarks', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('navigation')).toBeVisible();
  });
});
