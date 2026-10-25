import { test, expect } from './fixtures';

test.describe('Contact / Enquiry', () => {
  test('contact page loads with labelled form fields', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: /पूजन एवं अनुष्ठान संपर्क/ })).toBeVisible();
    await expect(page.getByLabel(/नाम/)).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'मोबाइल नंबर *' })).toBeVisible();
    await expect(page.getByLabel(/संदेश/)).toBeVisible();
  });

  test('whatsapp enquiry link is present', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('link', { name: /व्हाट्सऐप|WhatsApp/ }).first()).toBeVisible();
  });

  test('empty submit shows inline errors instead of an alert', async ({ page }) => {
    let dialogSeen = false;
    page.on('dialog', async (dialog) => {
      dialogSeen = true;
      await dialog.dismiss();
    });

    await page.goto('/contact');
    await page.getByRole('button', { name: /पूजन\/अनुष्ठान हेतु संपर्क करें/ }).click();

    await expect(page.getByText('कृपया अपना नाम दर्ज करें')).toBeVisible();
    await expect(page.getByText('कृपया मोबाइल नंबर दर्ज करें')).toBeVisible();
    expect(dialogSeen).toBe(false);
  });

  test('valid submit opens WhatsApp pre-filled with the enquiry', async ({ page }) => {
    // Stub window.open so the test asserts the delivery URL without touching the
    // network (wa.me would navigate away and made this test slow/flaky).
    await page.addInitScript(() => {
      (window as unknown as { __openedUrls: string[] }).__openedUrls = [];
      window.open = ((url?: string | URL) => {
        (window as unknown as { __openedUrls: string[] }).__openedUrls.push(String(url));
        return null;
      }) as typeof window.open;
    });

    await page.goto('/contact');
    await page.locator('#contact-name').fill('परीक्षण यजमान');
    await page.locator('#contact-mobile').fill('9876543210');
    await page.locator('#contact-message').fill('रुद्राभिषेक हेतु परामर्श');
    await page.getByRole('checkbox').first().check();
    await page.getByRole('button', { name: /पूजन\/अनुष्ठान हेतु संपर्क करें/ }).click();

    await expect(page.getByText(/Send दबाकर/)).toBeVisible();

    const opened = await page.evaluate(
      () => (window as unknown as { __openedUrls: string[] }).__openedUrls
    );
    expect(opened).toHaveLength(1);

    const url = opened[0];
    expect(url).toMatch(/^https:\/\/wa\.me\/919300096938\?text=/);

    const decoded = decodeURIComponent(url);
    expect(decoded).toContain('परीक्षण यजमान');
    expect(decoded).toContain('9876543210');
    expect(decoded).toContain('रुद्राभिषेक हेतु परामर्श');
  });
});
