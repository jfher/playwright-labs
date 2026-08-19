import { test, expect } from '@playwright/test';
import path from 'path';
import { HooksPage } from '@pages/hooks.page';

test.describe('LAB-20 - Hooks', () => {
    let hooksPage: HooksPage;

    test.beforeEach(async ({ page }) => {
        const filePath = path.resolve(__dirname, '../../src/pages/lab-pages/hooks.html');
        await page.goto(`file://${filePath}`);
        hooksPage = new HooksPage(page);
    });

    test.describe('LAB-20-000 - Hook order', () => {
        test.beforeAll(async () => {
            console.log('1 - beforeAll');
        });

        test.beforeEach(async () => {
            console.log('2 - beforeEach');
        });

        test.afterEach(async () => {
            console.log('4 - afterEach');
        });

        test.afterAll(async () => {
            console.log('5 - afterAll');
        });

        test('test A', async () => {
            console.log('3 - test A');
        });

        test('test B', async () => {
            console.log('3 - test B');
        });
    });

    test.describe('LAB-20-0001 - hook scope', async () => {
        test.beforeEach(async () => {
            console.log('GLOBAL');
        });

        test.describe('Group A', () => {
            test.beforeEach(async () => {
                console.log('GROUP A');
            });

            test('A1', async () => { });
        });
    });

    test('LAB-20-001 - should display the page', async () => {
        await expect(hooksPage.page.locator('#page-title')).toHaveText('Hooks Lab');
    });

    test('LAB-20-002 - should save username', async () => {
        await hooksPage.enterUsername('Marcus');
        await hooksPage.save();
        await expect(hooksPage.message).toHaveText('Saved: Marcus');
    });

    test('LAB-20-003 - should validate empty username', async () => {
        await hooksPage.save();
        await expect(hooksPage.message).toHaveText('Username is required');
    });
});
