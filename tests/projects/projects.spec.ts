import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Projects', { tag: '@projects' }, () => {
    test('LAB-24-001 - should run under configured project', async ({ page, browserName }) => {
        const filePath = path.resolve(__dirname, '../../src/pages/lab-pages/projects.html');
        await page.goto(`file://${filePath}`);

        await expect(page.locator('#title')).toHaveText('Projects Lab');
        console.log(`Running on: ${browserName}`);
    });
});
