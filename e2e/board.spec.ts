// e2e/board.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '@/pages/LoginPage';
import { ProjectBoardPage } from '@/pages/ProjectBoardPage';
import { TEST_CREDENTIALS, TEST_CASES } from '../test-data/test-data';
import { TestLogger } from '@/utils/TestLogger';

test.describe('Loop Task Management System - Acceptance Test Suite', () => {
    let loginPage: LoginPage;
    let projectBoardPage: ProjectBoardPage;
    let logger: TestLogger;

    test.beforeEach(async ({ page }, testInfo) => {
        logger = new TestLogger(testInfo);
        
        try {
            logger.step('Setting up test environment');
            loginPage = new LoginPage(page);
            projectBoardPage = new ProjectBoardPage(page);

            logger.debug('Navigating to application');
            await page.goto('/');
            await loginPage.waitForLoad();

            logger.step('Performing authentication');
            await loginPage.login(TEST_CREDENTIALS.email, TEST_CREDENTIALS.password);
            
            logger.debug('Verifying login success');
            const loginSuccess = !(await loginPage.isDisplayed());
            expect(loginSuccess, 'Login should be successful').toBeTruthy();

            logger.debug('Waiting for board initialization');
            await projectBoardPage.waitForLoad();
            
            const boardVisible = await projectBoardPage.isDisplayed();
            if (!boardVisible) {
                throw new Error('Project board failed to initialize');
            }
        } catch (error) {
            logger.error('Setup failed', error as Error);
            throw error;
        }
    });

    for (const testCase of TEST_CASES) {
        test(`[${testCase.testId}] Task Verification: "${testCase.title}"`, async ({ page }) => {
            try {
                // Navigate to project
                logger.step(`Navigating to ${testCase.project}`);
                await projectBoardPage.navigateToProject(testCase.project);
                logger.debug('Navigation successful');

                // Verify column
                logger.step(`Verifying task location in ${testCase.column}`);
                const columnVerification = await projectBoardPage.verifyTaskInColumn(
                    testCase.title,
                    testCase.column
                );
                
                if (!columnVerification) {
                    throw new Error(
                        `Task "${testCase.title}" not found in ${testCase.column} column`
                    );
                }
                logger.debug('Column verification successful');

                // Verify tags
                logger.step(`Verifying task tags: ${testCase.tags.join(', ')}`);
                const tagVerification = await projectBoardPage.verifyTaskTags(
                    testCase.title,
                    testCase.tags
                );
                
                if (!tagVerification) {
                    throw new Error(
                        `Tags mismatch for "${testCase.title}". Expected: ${testCase.tags.join(', ')}`
                    );
                }
                logger.debug('Tag verification successful');

                logger.info(`All verifications passed for "${testCase.title}"`);

            } catch (error) {
                logger.error(`Test case ${testCase.testId} failed`, error as Error);
                throw error;
            }
        });
    }

    test.afterEach(async ({ }, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            logger.error(`Test failed: ${testInfo.error?.message}`);
        }
        logger.debug(`Test duration: ${testInfo.duration}ms`);
    });
});