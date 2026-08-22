import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Retries', () => {
    test.describe.configure({
        retries: 2,
    });

    test('LAB-26-001 - should pass on retry PASSED TEST', async ({ page }, testInfo) => {
        console.log(
            `Attempt: ${testInfo.retry}`,
            `title: ${testInfo.title}`,
            `retry: ${testInfo.retry}`,
            `worker: ${testInfo.workerIndex}`,
        );

        const filePath = path.resolve(
            __dirname,
            '../../src/pages/lab-pages/retries.html'
        );

        await page.goto(`file://${filePath}`);

        if (testInfo.retry === 1) {
            await expect(page.locator('#status'))
                .toHaveText('Ready');
        }
    });

    //* Both test are skipped on purpouse because only shows the retry working as expected
    test.skip('LAB-26-002 - should fail on retry FAILED TEST', async ({ page }, testInfo) => {
        console.log(
            `Attempt: ${testInfo.retry}`,
            `title: ${testInfo.title}`,
            `retry: ${testInfo.retry}`,
            `worker: ${testInfo.workerIndex}`,
        );

        const filePath = path.resolve(
            __dirname,
            '../../src/pages/lab-pages/retries.html'
        );
        await page.goto(`file://${filePath}`);

        await expect(page.locator('#status'))
            .toHaveText('Ready nop');
    });

    //* Both test are skipped on purpouse because only shows the retry working as expected
    test.skip('LAB-26-003 - should fail and then pass on retry LEAKY TEST', async ({ page }, testInfo) => {
        console.log(
            `Attempt: ${testInfo.retry}`,
            `title: ${testInfo.title}`,
            `retry: ${testInfo.retry}`,
            `worker: ${testInfo.workerIndex}`,
        );

        const filePath = path.resolve(
            __dirname,
            '../../src/pages/lab-pages/retries.html'
        );

        await page.goto(`file://${filePath}`);

        if (testInfo.retry === 0) {
            await expect(page.locator('#status'))
                .toHaveText('Ready nope');
        }

        if (testInfo.retry === 1) {
            await expect(page.locator('#status'))
                .toHaveText('Ready');
        }
    });
});