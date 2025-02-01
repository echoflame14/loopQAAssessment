// e2e/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('Login Page', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
        loginPage = new LoginPage(page);
        await loginPage.waitForLoad();
    });

    test('should login successfully with valid credentials', async ({ page }) => {
        await loginPage.login('admin', 'password123');
        // After successful login we should no longer see the login form
        expect(await loginPage.isDisplayed()).toBeFalsy();
    });
});