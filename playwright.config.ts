import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'], // HTML reporter for nice UI
    ['list'], // List reporter for CI
  ],
  use: {
    baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
  // Add screenshot configuration
  outputDir: 'test-results',
  preserveOutput: 'failures-only',
});