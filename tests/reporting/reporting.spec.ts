import { test, expect } from '@playwright/test';
import path from 'path';

import { ReportingPage } from '@pages/reporting.page';

test.describe('Reporting', () => {
    test.beforeEach(async ({ page }) => {
        const filePath = path.resolve(__dirname, '../../src/pages/lab-pages/reporting.html');

        await page.goto(`file://${filePath}`);
    });

    test('LAB-28-001 - should display reporting page', { tag: '@smoke' }, async ({ page }) => {
        const reportingPage = new ReportingPage(page);

        await expect(reportingPage.title).toHaveText('Reporting Lab');
    });

    test('LAB-28-002 - should display success message', { tag: '@smoke' }, async ({ page }) => {
        const reportingPage = new ReportingPage(page);

        await test.step('Click success', async () => {
            await reportingPage.clickSuccess();
        });

        await test.step('Verify message', async () => {
            await expect(reportingPage.message).toHaveText('Success');
        });
    });

    //* This test its made on purpose to fail, and show the reporting of a failure test
    test.skip('LAB-28-003 - should demonstrate failure reporting', { tag: '@regression' }, async ({ page }) => {
        const reportingPage = new ReportingPage(page);

        await test.step('Click failure', async () => {
            await reportingPage.clickFailure();
        });

        await test.step('Verify expected success', async () => {
            await expect(reportingPage.message).toHaveText('Success');
        });
    });
});
