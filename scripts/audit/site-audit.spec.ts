import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const OUT = path.resolve('audit-output');
const ROUTES: { name: string; path: string }[] = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'services', path: '/services' },
  { name: 'service-detail', path: '/services/rudrabhishek' },
  { name: 'special-anushthan', path: '/special-anushthan' },
  { name: 'gallery', path: '/gallery' },
  { name: 'blogs', path: '/blogs' },
  { name: 'blog-detail', path: '/blogs' },
  { name: 'contact', path: '/contact' },
  { name: 'privacy', path: '/privacy-policy' },
  { name: 'terms', path: '/terms-and-conditions' },
  { name: 'admin', path: '/admin' },
];

test('full site audit', async ({ page }) => {
  fs.mkdirSync(OUT, { recursive: true });
  const report: any = { pages: [], consoleErrors: [], pageErrors: [], failedRequests: [] };

  page.on('console', (msg) => {
    if (msg.type() === 'error') report.consoleErrors.push({ url: page.url(), text: msg.text() });
  });
  page.on('pageerror', (err) => report.pageErrors.push({ url: page.url(), text: err.message }));
  page.on('requestfailed', (req) =>
    report.failedRequests.push({ url: req.url(), failure: req.failure()?.errorText })
  );
  page.on('response', (res) => {
    if (res.status() >= 400) report.failedRequests.push({ url: res.url(), failure: `HTTP ${res.status()}` });
  });

  for (const route of ROUTES) {
    const entry: any = { name: route.name, path: route.path };
    await page.goto(route.path, { waitUntil: 'domcontentloaded' });

    // Skip the loader quickly by waiting for it to hide (max 4s)
    try {
      await page.waitForSelector('#loader', { state: 'detached', timeout: 4500 });
    } catch {
      await page.evaluate(() => {
        document.getElementById('loader')?.remove();
        document.body.style.overflow = '';
      });
    }

    await page.waitForTimeout(1200);

    // Horizontal overflow check
    entry.overflow = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const scrollW = document.documentElement.scrollWidth;
      const offenders: any[] = [];
      if (scrollW > docW + 2) {
        document.querySelectorAll('*').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && (r.right > docW + 2 || r.left < -2)) {
            offenders.push({
              tag: el.tagName.toLowerCase(),
              cls: (el.className || '').toString().slice(0, 120),
              left: Math.round(r.left),
              right: Math.round(r.right),
              width: Math.round(r.width),
            });
          }
        });
      }
      return { docW, scrollW, overflowBy: scrollW - docW, offenders: offenders.slice(0, 25) };
    });

    // Broken images
    entry.brokenImages = await page.evaluate(() =>
      Array.from(document.images)
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.getAttribute('src'))
        .slice(0, 30)
    );

    // Text overflow / clipped text in buttons and key elements
    entry.clippedText = await page.evaluate(() =>
      Array.from(document.querySelectorAll('button, h1, h2, h3, a'))
        .filter((el) => {
          const s = getComputedStyle(el);
          return (
            (s.overflow === 'hidden' || s.overflowX === 'hidden') &&
            el.scrollWidth > el.clientWidth + 3 &&
            (el.textContent || '').trim().length > 0 &&
            el.clientWidth > 0
          );
        })
        .slice(0, 15)
        .map((el) => ({
          tag: el.tagName.toLowerCase(),
          text: (el.textContent || '').trim().slice(0, 60),
          scrollW: el.scrollWidth,
          clientW: el.clientWidth,
        }))
    );

    // Small tap targets on mobile-ish sizes (checked on all pages; useful signal)
    entry.smallTapTargets = await page.evaluate(() =>
      Array.from(document.querySelectorAll('button, a'))
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && (r.width < 32 || r.height < 32);
        })
        .slice(0, 20)
        .map((el) => ({
          tag: el.tagName.toLowerCase(),
          text: (el.textContent || '').trim().slice(0, 40),
          w: Math.round(el.getBoundingClientRect().width),
          h: Math.round(el.getBoundingClientRect().height),
        }))
    );

    const slug = route.name;
    await page.screenshot({ path: path.join(OUT, `desktop-${slug}.png`), fullPage: true });

    // Mobile screenshot
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT, `mobile-${slug}.png`), fullPage: true });
    await page.setViewportSize({ width: 1440, height: 900 });

    report.pages.push(entry);
  }

  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
});
