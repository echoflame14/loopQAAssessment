// src/pages/BasePage.ts
import { Page, Locator } from '@playwright/test';
import path from 'path';

export abstract class BasePage {
    protected constructor(protected readonly page: Page) {}
    
    abstract isDisplayed(): Promise<boolean>;
    abstract waitForLoad(): Promise<void>;
    
    /**
     * Take a screenshot of the current page state
     * @param name - Name for the screenshot file
     * @param fullPage - Whether to capture the full page or just the viewport
     */
    protected async takeScreenshot(name: string, fullPage = true): Promise<string> {
        const screenshotDir = 'test-results/screenshots';
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `${name}_${timestamp}.png`;
        const filePath = path.join(screenshotDir, fileName);
        
        await this.page.screenshot({
            path: filePath,
            fullPage
        });
        
        return filePath;
    }

    /**
     * Take a screenshot of a specific element
     * @param selector - The selector of the element to capture
     * @param name - Name for the screenshot file
     */
    protected async takeElementScreenshot(selector: string, name: string): Promise<string> {
        const screenshotDir = 'test-results/screenshots';
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `${name}_element_${timestamp}.png`;
        const filePath = path.join(screenshotDir, fileName);
        
        const element = this.page.locator(selector);
        await element.screenshot({
            path: filePath
        });
        
        return filePath;
    }
    
    protected async waitForElement(
        selector: string, 
        options = { timeout: 5000, state: 'visible' as const }
    ): Promise<void> {
        await this.page.waitForSelector(selector, options);
    }
    
    protected async clickElement(selector: string): Promise<void> {
        await this.page.click(selector);
    }
    
    protected async getText(selector: string): Promise<string> {
        return await this.page.innerText(selector);
    }
    
    protected async fillField(selector: string, value: string): Promise<void> {
        await this.page.fill(selector, value);
    }
    
    protected async isVisible(selector: string): Promise<boolean> {
        return await this.page.isVisible(selector);
    }
    
    protected getLocator(selector: string): Locator {
        return this.page.locator(selector);
    }
    
    protected async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
}