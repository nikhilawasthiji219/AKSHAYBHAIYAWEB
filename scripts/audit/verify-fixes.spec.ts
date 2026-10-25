import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const OUT = path.resolve('audit-output-3');

async function ready(page: any) {
  await page.waitForSelector('#loader', { state: 'detached', timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(800);
}

test('verify gallery wheel + mobile widgets + whatsapp delivery', async ({ page }) => {
  fs.mkdirSync(OUT, { recursive: true });

  // 1. Gallery wheel on desktop — the ring must fit inside the stage
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/gallery', { waitUntil: 'domcontentloaded' });
  await ready(page);
  await page.waitForTimeout(1500);

  const wheelGeometry = await page.evaluate(() => {
    const section = document.querySelector('section[aria-label="हमारी गैलरी"]') as HTMLElement | null;
    if (!section) return null;
    const stage = section.getBoundingClientRect();
    const cards = Array.from(section.querySelectorAll('[role="option"]')) as HTMLElement[];
    const rects = cards.map((c) => {
      const r = c.getBoundingClientRect();
      return {
        top: Math.round(r.top),
        bottom: Math.round(r.bottom),
        left: Math.round(r.left),
        right: Math.round(r.right),
        visible: r.top >= stage.top - 2 && r.bottom <= stage.bottom + 2,
      };
    });
    return { stage: { top: Math.round(stage.top), bottom: Math.round(stage.bottom) }, rects };
  });
  fs.writeFileSync(path.join(OUT, 'wheel-geometry.json'), JSON.stringify(wheelGeometry, null, 2));
  await page.screenshot({ path: path.join(OUT, 'gallery-wheel-1440.png') });

  // 2. Mobile home: floating widgets must not collide with the bottom bar
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await ready(page);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(900);

  const widgets = await page.evaluate(() => {
    const sel = ['nav[aria-label="मोबाइल नेविगेशन"]', '.music-toggle', '.floating-diya'];
    return sel.map((s) => {
      const el = document.querySelector(s) as HTMLElement | null;
      if (!el) return { sel: s, present: false };
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        sel: s,
        present: true,
        display: cs.display,
        visible: r.width > 0 && r.height > 0 && cs.visibility !== 'hidden',
        top: Math.round(r.top),
        bottom: Math.round(r.bottom),
        left: Math.round(r.left),
        right: Math.round(r.right),
      };
    });
  });
  fs.writeFileSync(path.join(OUT, 'mobile-widgets.json'), JSON.stringify(widgets, null, 2));
  await page.screenshot({ path: path.join(OUT, 'home-mobile-bottom.png') });

  // 3. Contact form submit must open WhatsApp with the enquiry pre-filled
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/contact', { waitUntil: 'domcontentloaded' });
  await ready(page);

  await page.locator('#contact-name').fill('परीक्षण यजमान');
  await page.locator('#contact-mobile').fill('9876543210');
  await page.locator('#contact-message').fill('रुद्राभिषेक हेतु परामर्श');
  // Service is required unless "Custom Puja" is selected.
  await page.getByRole('checkbox').first().check();

  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('button', { name: /पूजन\/अनुष्ठान हेतु संपर्क करें/ }).click();
  const popup = await popupPromise;
  const popupUrl = popup.url();
  fs.writeFileSync(path.join(OUT, 'whatsapp-popup-url.txt'), popupUrl);
  await popup.close();

  await expect(page.getByText(/Send दबाकर/)).toBeVisible();
  await page.screenshot({ path: path.join(OUT, 'contact-success.png') });

  const decodedUrl = decodeURIComponent(popupUrl.replace(/\+/g, ' '));
  expect(popupUrl).toMatch(/phone=919300096938|wa\.me\/919300096938/);
  expect(decodedUrl).toContain('परीक्षण यजमान');
});
