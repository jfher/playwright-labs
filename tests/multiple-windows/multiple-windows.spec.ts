import { test, expect } from '@fixtures/labs.fixture';

test.describe('Multiple Windows', () => {
    test('LAB-05-001 - should open a new page', async ({ page, multipleWindowsPage }) => {
        const newPage = await multipleWindowsPage.newWindow();

        await expect(newPage).not.toBe(page);
    });

    test('LAB-05-002 - should navigate to the expected page', async ({ multipleWindowsPage }) => {
        const newPage = await multipleWindowsPage.newWindow();

        await expect(newPage.url()).toContain('/windows/new');
    });

    test('LAB-05-003 - should validate the new page content', async ({ multipleWindowsPage }) => {
        const newPage = await multipleWindowsPage.newWindow();

        await expect(newPage.getByRole('heading', { name: 'New Window' })).toBeVisible();
    });

    test('LAB-05-004 - should keep access to both pages', async ({ page, multipleWindowsPage }) => {
        const originalUrl = page.url();

        const newPage = await multipleWindowsPage.newWindow();

        expect(page.url()).toBe(originalUrl);
        expect(newPage.url()).toContain('/windows/new');
    });

    test('LAB-05-005 - should contain two pages after opening a new window', async ({ context, multipleWindowsPage }) => {
        expect(context.pages()).toHaveLength(1);

        await Promise.all([context.waitForEvent('page'), multipleWindowsPage.newWindow()]);

        expect(context.pages()).toHaveLength(2);
    });

    test('LAB-05-006 - should return to the original page', async ({ page, multipleWindowsPage }) => {
        const newPage = await multipleWindowsPage.newWindow();

        await expect(newPage.getByRole('heading', { name: 'New Window' })).toBeVisible();

        await expect(page).toHaveURL(/\/windows$/);
    });
});
