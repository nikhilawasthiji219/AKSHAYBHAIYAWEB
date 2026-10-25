import { defineConfig, devices } from '@playwright/test';

/**
 * E2E config.
 *
 * Tests run against the **production build** served by `vite preview` (port 4173)
 * rather than the dev server. Reason: the dev server transforms lazy route chunks
 * on demand, and a cold parallel run (~48 tests / 6 workers) made `load` exceed
 * 30 s and produced flaky, unrelated failures. Preview output is static, so the
 * suite is much faster and deterministic.
 *
 * Dev-server auditing still uses `playwright.audit.config.ts` (port 5174).
 */
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  reporter: 'html',
  timeout: 60_000,

  expect: { timeout: 10_000 },

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    // Build first so the preview always serves the current working tree.
    command: `npm run build && npm run preview -- --port ${PORT} --strictPort`,
    port: PORT,
    baseURL: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 240 * 1000,
  },
});
