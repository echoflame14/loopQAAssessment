// src/pages/BasePage.ts
import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
    protected constructor(protected readonly page: Page) {}
    
    /**
     * Check if the page is currently displayed
     */
    abstract isDisplayed(): Promise<boolean>;
    
    /**
     * Wait for the page to be fully loaded
     */
    abstract waitForLoad(): Promise<void>;
    
    /**
     * Wait for an element to be present on the page
     * @param selector - The selector to wait for
     * @param options - Optional timeout and state options
     */
    protected async waitForElement(
        selector: string, 
        options = { timeout: 5000, state: 'visible' as const }
    ): Promise<void> {
        await this.page.waitForSelector(selector, options);
    }
    
    /**
     * Click an element on the page
     * @param selector - The selector to click
     */
    protected async clickElement(selector: string): Promise<void> {
        await this.page.click(selector);
    }
    
    /**
     * Get text content from an element
     * @param selector - The selector to get text from
     */
    protected async getText(selector: string): Promise<string> {
        return await this.page.innerText(selector);
    }
    
    /**
     * Fill a form field
     * @param selector - The selector of the input field
     * @param value - The value to fill
     */
    protected async fillField(selector: string, value: string): Promise<void> {
        await this.page.fill(selector, value);
    }
    
    /**
     * Check if an element is visible
     * @param selector - The selector to check
     */
    protected async isVisible(selector: string): Promise<boolean> {
        return await this.page.isVisible(selector);
    }
    
    /**
     * Get a Locator for an element
     * @param selector - The selector to get a Locator for
     */
    protected getLocator(selector: string): Locator {
        return this.page.locator(selector);
    }
    
    /**
     * Get current page URL
     */
    protected async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
}