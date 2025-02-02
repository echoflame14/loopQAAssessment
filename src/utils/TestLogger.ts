// src/utils/TestLogger.ts
import { TestInfo } from '@playwright/test';

export class TestLogger {
    private readonly isDebugEnabled: boolean;

    constructor(private testInfo: TestInfo) {
        // Check if DEBUG is 'true' (string comparison since env vars are strings)
        this.isDebugEnabled = process.env.DEBUG === 'true';
    }

    private formatMessage(level: string, message: string): string {
        return `${level.padEnd(7)} | ${message}`;
    }

    info(message: string) {
        this.testInfo.annotations.push({ type: 'info', description: message });
        console.log(this.formatMessage('INFO', message));
    }

    debug(message: string) {
        if (this.isDebugEnabled) {
            this.testInfo.annotations.push({ type: 'debug', description: message });
            console.log(this.formatMessage('DEBUG', message));
        }
    }

    error(message: string, error?: Error) {
        const errorMessage = `${message}${error ? `: ${error.message}` : ''}`;
        this.testInfo.annotations.push({ type: 'error', description: errorMessage });
        console.error(this.formatMessage('ERROR', errorMessage));
        if (error?.stack) {
            console.error('Stack trace:');
            console.error(error.stack);
        }
    }

    step(message: string) {
        this.testInfo.annotations.push({ type: 'step', description: message });
        console.log(this.formatMessage('STEP', `${message}`));
    }

    duration(ms: number) {
        if (this.isDebugEnabled) {
            this.debug(`Test completed in ${ms}ms`);
        }
    }
}