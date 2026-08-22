import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Parallelism', () => {
    test.beforeEach(async ({ page }) => {
        const filePath = path.resolve(
            __dirname,
            '../../src/pages/lab-pages/parallelism.html'
        );

        await page.goto(`file://${filePath}`);
    })

    test('LAB-25-001 - test A', async ({ page }, testInfo) => {

        console.log(
            `Test: ${testInfo.title} | Worker: ${testInfo.workerIndex}`
        );

        await expect(page.locator('#title')).toHaveText('Parallelism Lab');
    });

    test('LAB-25-002 - test B', async ({ page }, testInfo) => {

        console.log(
            `Test: ${testInfo.title} | Worker: ${testInfo.workerIndex}`
        );

        await expect(page.locator('#title')).toHaveText('Parallelism Lab');
    });

    test('LAB-25-003 - test C', async ({ page }, testInfo) => {

        console.log(
            `Test: ${testInfo.title} | Worker: ${testInfo.workerIndex}`
        );

        await expect(page.locator('#title')).toHaveText('Parallelism Lab');
    });

    test('LAB-25-004 - data A', async ({ }, testInfo) => {

        const id = `data-${testInfo.testId}`;

        console.log(id);
    });

    test('LAB-25-005 - data B', async ({ }, testInfo) => {

        const id = `data-${testInfo.testId}`;

        console.log(id);
    });

    test('LAB-25-006 - file A', async ({ }, testInfo) => {

        const path = testInfo.outputPath('result.txt');

        console.log(path);
    });


    test('LAB-25-007 - file B', async ({ }, testInfo) => {

        const path = testInfo.outputPath('result.txt');

        console.log(path);
    });
});