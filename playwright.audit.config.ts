import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './scripts/audit',
  fullyParallel: false,
  workers: 1,
  timeout: 180000,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:5174',
    screenshot: 'off',
    trace: 'off',
  },
  projects: [
    { name: 'audit', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
  ],
});
