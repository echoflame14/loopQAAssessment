import { AppError, FileSystemError, PatternError } from './customErrors';
import { Page } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';

/**
 * Options for error handling
 */
interface ErrorHandlerOptions {
    /** Whether to log debug information */
    debug?: boolean;
    /** Whether to throw the error after handling */
    throwAfterHandle?: boolean;
    /** Playwright page object for taking screenshots */
    page?: Page;
    /** Optional prefix for screenshot filenames */
    screenshotPrefix?: string;
}

/**
 * Takes a screenshot when an error occurs
 * @param page - Playwright page object
 * @param context - Error context for the filename
 * @returns Path to the saved screenshot
 */
const takeErrorScreenshot = async (
    page: Page,
    context: string
): Promise<string> => {
    const screenshotDir = 'test-results/screenshots/errors';
    await fs.mkdir(screenshotDir, { recursive: true });
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedContext = context.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const fileName = `error_${sanitizedContext}_${timestamp}.png`;
    const filePath = path.join(screenshotDir, fileName);
    
    await page.screenshot({
        path: filePath,
        fullPage: true
    });
    
    return filePath;
};

/**
 * Handles application errors with consistent logging, optional throwing, and screenshot capture
 */
export const handleError = async (
    error: unknown,
    context: string,
    options: ErrorHandlerOptions = {}
): Promise<void> => {
    const { debug = false, throwAfterHandle = false, page, screenshotPrefix } = options;
    let screenshotPath: string | undefined;

    // Capture screenshot if page object is available
    if (page) {
        try {
            screenshotPath = await takeErrorScreenshot(
                page,
                screenshotPrefix ? `${screenshotPrefix}_${context}` : context
            );
        } catch (screenshotError) {
            console.error('Failed to capture error screenshot:', screenshotError);
        }
    }

    // Original error handling logic
    if (error instanceof AppError) {
        console.error(`[${error.code}] ${context}: ${error.message}`);
        if (screenshotPath) {
            console.error(`Error screenshot saved: ${screenshotPath}`);
        }
        if (debug && error.originalError) {
            console.debug('Original error:', error.originalError);
        }
    } else if (error instanceof Error) {
        console.error(`Unexpected error in ${context}:`, error.message);
        if (screenshotPath) {
            console.error(`Error screenshot saved: ${screenshotPath}`);
        }
        if (debug) {
            console.debug('Stack trace:', error.stack);
        }
    } else {
        console.error(`Unknown error in ${context}:`, error);
        if (screenshotPath) {
            console.error(`Error screenshot saved: ${screenshotPath}`);
        }
    }

    if (throwAfterHandle) {
        throw error;
    }
};

/**
 * Specific handler for file system errors with screenshot support
 */
export const handleFileSystemError = async (
    error: unknown,
    context: string,
    options: ErrorHandlerOptions = {}
): Promise<void> => {
    if (error instanceof FileSystemError) {
        await handleError(error, `File System - ${context}`, options);
    } else {
        await handleError(
            new FileSystemError(`Unexpected error in ${context}`, error),
            context,
            options
        );
    }
};

/**
 * Specific handler for pattern matching errors with screenshot support
 */
export const handlePatternError = async (
    error: unknown,
    pattern: string,
    context: string,
    options: ErrorHandlerOptions = {}
): Promise<void> => {
    if (error instanceof PatternError) {
        await handleError(error, `Pattern Matching - ${context}`, options);
    } else {
        await handleError(
            new PatternError(`Error processing pattern: ${pattern}`, pattern, error),
            context,
            options
        );
    }
};