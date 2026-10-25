import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const OUT = path.resolve('audit-output-2');
const ROUTES: { name: string; path: string }[] = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'services', path: '/services' },
  { name: 'service-detail', path: '/services/rudrabhishek' },
  { name: 'special-anushthan', path: '/special-anushthan' },
  { name: 'gallery', path: '/gallery' },
  { name: 'blogs', path: '/blogs' },
  { name: 'contact', path: '/contact' },
  { name: 'admin', path: '/admin' },
];

async function settle(page: any) {
  // Remove loader
  try {
    await page.waitForSelector('#loader', { state: 'detached', timeout: 4000 });
  } catch {
    await page.evaluate(() => {
      document.getElementById('loader')?.remove();
      document.body.style.overflow = '';
    });
  }
  // Scroll in steps to trigger reveal animations
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7);
    const max = document.documentElement.scrollHeight;
    for (let y = 0; y <= max; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
  await page.waitForTimeout(600);
}

test('visual audit with reveal', async ({ page }) => {
  fs.mkdirSync(OUT, { recursive: true });

  for (const route of ROUTES) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(route.path, { waitUntil: 'domcontentloaded' });
    await settle(page);

    // Hidden (unrevealed) elements after scrolling through everything
    const hiddenReveals = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.reveal:not(.is-visible)')).map((el) => ({
        tag: el.tagName.toLowerCase(),
        cls: (el.className || '').toString().slice(0, 100),
        text: (el.textContent || '').trim().slice(0, 70),
        opacity: getComputedStyle(el).opacity,
        rect: (() => {
          const r = el.getBoundingClientRect();
          return { top: Math.round(r.top), h: Math.round(r.height), w: Math.round(r.width) };
        })(),
      }))
    );

    await page.screenshot({ path: path.join(OUT, `desktop-${route.name}.png`), fullPage: true });

    // Mobile
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route.path, { waitUntil: 'domcontentloaded' });
    await settle(page);

    const mobileHidden = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.reveal:not(.is-visible)')).length
    );
    const mobileOverflow = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const scrollW = document.documentElement.scrollWidth;
      const offenders: any[] = [];
      if (scrollW > docW + 2) {
        document.querySelectorAll('*').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && (r.right > docW + 2 || r.left < -2)) {
            offenders.push({
              tag: el.tagName.toLowerCase(),
              cls: (el.className || '').toString().slice(0, 90),
              left: Math.round(r.left),
              right: Math.round(r.right),
            });
          }
        });
      }
      return { docW, scrollW, by: scrollW - docW, offenders: offenders.slice(0, 15) };
    });

    // Check nav/bottom-bar overlap with footer content
    const bottomBarOverlap = await page.evaluate(() => {
      const bar = document.querySelector('nav[aria-label], nav.fixed, .fixed.bottom-0');
      if (!bar) return null;
      const r = bar.getBoundingClientRect();
      return { h: Math.round(r.height), top: Math.round(r.top), bottom: Math.round(r.bottom) };
    });

    await page.screenshot({ path: path.join(OUT, `mobile-${route.name}.png`), fullPage: true });

    fs.appendFileSync(
      path.join(OUT, 'findings.log'),
      JSON.stringify(
        { route: route.name, hiddenReveals, mobileHidden, mobileOverflow, bottomBarOverlap },
        null,
        2
      ) + '\n'
    );
  }
});
