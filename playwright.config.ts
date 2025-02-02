import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Improved reporter configuration
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/test-results.json' }]
  ],

  // Global setup configuration
  globalSetup: path.join(__dirname, './global-setup.ts'),
  
  // Module resolution configuration
  require: [
    'tsconfig-paths/register'
  ],

  use: {
    baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Additional useful configurations
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15000,
    navigationTimeout: 30000,
    
    // Capture console logs and errors
    contextOptions: {
      logger: {
        isEnabled: (name, severity) => true,
        log: (name, severity, message, args) => console.log(`${name} ${severity}: ${message}`)
      }
    }
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Additional Chrome-specific settings
        launchOptions: {
          args: ['--disable-dev-shm-usage']
        }
      },
    }
  ],

  // Output configuration
  outputDir: 'test-results',
  preserveOutput: 'failures-only',
  
  // Timeout configurations
  timeout: 30000,
  expect: {
    timeout: 10000
  },
  
  // Path resolution help
  webServer: {
    command: 'npm run test',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    env: {
      TS_NODE_PROJECT: path.join(__dirname, './tsconfig.json'),
      TS_NODE_BASEURL: __dirname,
    }
  }
});