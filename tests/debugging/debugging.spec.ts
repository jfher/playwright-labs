import { test, expect } from '@playwright/test';
import { DebuggingPage } from '@pages/debugging.page';

test.describe('Trace / Debugging', () => {
    test.describe.configure({
        retries: 2,
    });

    //* This test its skipped because it will fail on purpose to show how traces are generated
    test.skip('LAB-27-001 - should load data', async ({ page }, testInfo) => {
        console.log('Retry:', testInfo.retry);
        const debuggingPage = new DebuggingPage(page);
        await debuggingPage.open();

        await test.step('Load data', async () => {
            await debuggingPage.loadData();
        });

        await test.step('Verify status', async () => {
            await expect(debuggingPage.status).toHaveText('Loaded nope');
        });

        await test.step('Verify result', async () => {
            await expect(debuggingPage.result).toHaveText('Data loaded successfully');
        });
    });
});
