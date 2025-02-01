// src/pages/LoginPage.ts
import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
    // Selectors matching the actual DOM structure
    private readonly usernameInput = '#username';
    private readonly passwordInput = '#password';
    private readonly loginButton = 'button[type="submit"]';
    private readonly loginForm = 'form.space-y-6';
    private readonly pageTitle = 'text=Project Board Login';

    constructor(page: Page) {
        super(page);
    }

    /**
     * Login to the application
     * @param username - The username to login with
     * @param password - The password to login with
     */
    async login(username: string, password: string): Promise<void> {
        await this.fillField(this.usernameInput, username);
        await this.fillField(this.passwordInput, password);
        await this.clickElement(this.loginButton);
    }

    /**
     * Check if login page is displayed
     */
    async isDisplayed(): Promise<boolean> {
        return await this.isVisible(this.loginForm) && 
               await this.isVisible(this.pageTitle);
    }

    /**
     * Wait for login page to load
     */
    async waitForLoad(): Promise<void> {
        await this.waitForElement(this.loginForm);
        await this.waitForElement(this.pageTitle);
    }

    /**
     * Get the current value of the username field
     */
    async getUsernameValue(): Promise<string> {
        return await this.page.inputValue(this.usernameInput);
    }

    /**
     * Get the current value of the password field
     */
    async getPasswordValue(): Promise<string> {
        return await this.page.inputValue(this.passwordInput);
    }
}