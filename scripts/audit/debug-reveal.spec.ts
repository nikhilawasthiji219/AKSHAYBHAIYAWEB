import { test } from '@playwright/test';

test('debug reveal system', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  // wait for loader to detach naturally
  await page.waitForSelector('#loader', { state: 'detached', timeout: 8000 }).catch(() => {});

  const log: any[] = [];

  const snap = async (label: string) => {
    const data = await page.evaluate(() => ({
      scrollY: window.scrollY,
      bodyOverflow: document.body.style.overflow,
      htmlOverflowY: getComputedStyle(document.documentElement).overflowY,
      docScrollable: document.documentElement.scrollHeight > window.innerHeight,
      total: document.querySelectorAll('.reveal').length,
      visible: document.querySelectorAll('.reveal.is-visible').length,
      // pick a sample hidden one and inspect
      sample: (() => {
        const el = document.querySelector('.reveal:not(.is-visible)') as HTMLElement | null;
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
          text: (el.textContent || '').trim().slice(0, 40),
          top: Math.round(r.top),
          h: Math.round(r.height),
          opacity: cs.opacity,
          display: cs.display,
          visibility: cs.visibility,
          parentOverflow: getComputedStyle(el.parentElement!).overflow,
          parentContentVisibility: getComputedStyle(el.parentElement!).contentVisibility,
        };
      })(),
    }));
    log.push({ label, ...data });
  };

  await snap('after-load');

  // scroll step by step
  for (const y of [400, 800, 1200, 1600, 2000, 2400, 2800]) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(400);
    await snap(`scrolled-${y}`);
  }

  console.log(JSON.stringify(log, null, 2));
});
