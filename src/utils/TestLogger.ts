// src/utils/TestLogger.ts
import { TestInfo } from '@playwright/test';

export class TestLogger {
    private readonly isDebugEnabled: boolean;

    constructor(private testInfo: TestInfo) {
        this.isDebugEnabled = process.env.DEBUG === 'true';
    }

    info(message: string) {
        // Only add to annotations, no console output
        this.testInfo.annotations.push({ type: 'info', description: message });
    }

    debug(message: string) {
        // Only add to annotations, no console output
        this.testInfo.annotations.push({ type: 'debug', description: message });
    }

    error(message: string, error?: Error) {
        const errorMessage = `${message}${error ? `: ${error.message}` : ''}`;
        this.testInfo.annotations.push({ type: 'error', description: errorMessage });
        // Only log actual errors, not verification failures
        if (!message.includes('verification')) {
            console.error(`✕ ${errorMessage}`);
        }
        if (error?.stack) {
            this.testInfo.annotations.push({ type: 'error', description: error.stack });
        }
    }

    step(message: string) {
        // Only add to annotations, no console output
        this.testInfo.annotations.push({ type: 'step', description: message });
    }

    duration(ms: number) {
        this.testInfo.annotations.push({ type: 'debug', description: `Test completed in ${ms}ms` });
    }
}