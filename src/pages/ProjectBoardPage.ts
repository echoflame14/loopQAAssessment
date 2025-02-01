// src/pages/ProjectBoardPage.ts
import { BasePage } from './BasePage';
import { Page } from '@playwright/test';
import { Column, Tag, Project } from '../types';

export class ProjectBoardPage extends BasePage {
    // Project navigation selectors
    private readonly webAppButton = 'button:has-text("Web Application")';
    private readonly mobileAppButton = 'button:has-text("Mobile Application")';
    
    // Column headings for verification
    private readonly todoColumnHeading = 'h2:has-text("To Do")';
    private readonly inProgressColumnHeading = 'h2:has-text("In Progress")';
    private readonly doneColumnHeading = 'h2:has-text("Done")';

    constructor(page: Page) {
        super(page);
    }

    async navigateToProject(project: Project): Promise<void> {
        const buttonSelector = project === Project.WEB ? this.webAppButton : this.mobileAppButton;
        await this.clickElement(buttonSelector);
        
        // Wait for project title to update in header
        const expectedTitle = project === Project.WEB ? 'Web Application' : 'Mobile Application';
        await this.page.waitForSelector(`h1:has-text("${expectedTitle}")`);
    }

    async verifyTaskInColumn(taskTitle: string, column: Column): Promise<boolean> {
        // First locate the correct column by its heading
        const columnHeading = this.getColumnHeadingSelector(column);
        const columnSection = await this.page.locator(columnHeading).locator('xpath=ancestor::div[contains(@class, "flex flex-col w-80")]');
        
        // Then look for the task card within that column
        const taskCard = columnSection.locator('h3', { hasText: taskTitle });
        return await taskCard.isVisible();
    }

    async verifyTaskTags(taskTitle: string, expectedTags: Tag[]): Promise<boolean> {
        // Find the task card containing the title
        const taskCard = this.page.locator('h3', { hasText: taskTitle })
            .locator('xpath=ancestor::div[contains(@class, "bg-white")]');
        
        // Get all tags within the task card
        const tagElements = taskCard.locator('span[class*="rounded-full"]');
        const tagTexts = await tagElements.allInnerTexts();
        
        // Verify all expected tags are present
        return expectedTags.every(tag => tagTexts.includes(tag));
    }

    private getColumnHeadingSelector(column: Column): string {
        switch (column) {
            case Column.TODO:
                return this.todoColumnHeading;
            case Column.IN_PROGRESS:
                return this.inProgressColumnHeading;
            case Column.DONE:
                return this.doneColumnHeading;
            default:
                throw new Error(`Unknown column: ${column}`);
        }
    }

    async isDisplayed(): Promise<boolean> {
        return await this.isVisible(this.webAppButton) && 
               await this.isVisible(this.mobileAppButton);
    }

    async waitForLoad(): Promise<void> {
        await this.waitForElement(this.webAppButton);
        await this.waitForElement(this.mobileAppButton);
        // Wait for the board structure to be visible
        await this.page.waitForSelector('div[class*="flex flex-col w-80"]');
    }
}