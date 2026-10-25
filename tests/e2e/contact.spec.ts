import { test, expect } from '@playwright/test';

test.describe('Contact / Enquiry', () => {
  test('contact page loads with form fields', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: /पूजन एवं अनुष्ठान संपर्क/ })).toBeVisible();
    await expect(page.getByPlaceholder(/नाम/)).toBeVisible();
    await expect(page.getByPlaceholder(/मोबाइल/)).toBeVisible();
    await expect(page.getByPlaceholder(/संदेश/)).toBeVisible();
  });

  test('whatsapp enquiry link is present', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('link', { name: /व्हाट्सऐप|WhatsApp/ })).toBeVisible();
  });
});
