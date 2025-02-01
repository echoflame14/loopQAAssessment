import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { TEST_CREDENTIALS } from '../test-data/test-data';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto('/');
        await loginPage.waitForLoad();
    });

    test('should login successfully with valid credentials', async ({ page }) => {
        // Perform login
        await loginPage.login(TEST_CREDENTIALS.email, TEST_CREDENTIALS.password);
        
        // Verify login was successful - the login form should no longer be visible
        expect(await loginPage.isDisplayed()).toBeFalsy();
    });
});