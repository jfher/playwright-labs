import { test, expect } from "@playwright/test"
import { JavascriptAlertsPage } from "@pages/javascript-alerts.page";

test.describe('JavaScript Dialogs', () => {
    let javascriptAlertsPage: JavascriptAlertsPage;

    test.beforeEach(async ({ page }) => {
        javascriptAlertsPage = new JavascriptAlertsPage(page);
        await javascriptAlertsPage.open();
    });

    test('LAB-01-001 - should handle an alert dialog', async ({ page }) => {
        let dialogMessage = '';

        page.once('dialog', async (dialog) => {
            expect(dialog.type()).toBe('alert');
            dialogMessage = dialog.message();
            await dialog.accept();
        });

        await javascriptAlertsPage.openAlert(true);
        expect(dialogMessage).toBe('I am a JS Alert');

        await expect(javascriptAlertsPage.resultMessage).toHaveText(
            'You successfully clicked an alert',
        );
    });

    test('LAB-01-002 - should accept a confirm dialog', async ({ page }) => {
        let dialogMessage = '';

        page.once('dialog', async (dialog) => {
            expect(dialog.type()).toBe('confirm');
            dialogMessage = dialog.message();
            await dialog.accept();
        });

        await javascriptAlertsPage.openConfirm(true);

        expect(dialogMessage).toBe(
            'I am a JS Confirm',
        );

        await expect(javascriptAlertsPage.resultMessage).toHaveText(
            'You clicked: Ok',
        );
    });

    test('LAB-01-003 - should dismiss a confirm dialog', async ({ page }) => {
        page.once('dialog', async (dialog) => {
            expect(dialog.type()).toBe('confirm');

            expect(dialog.message()).toBe(
                'I am a JS Confirm',
            );

            await dialog.dismiss();
        });

        await javascriptAlertsPage.openConfirm();

        await expect(javascriptAlertsPage.resultMessage).toHaveText(
            'You clicked: Cancel',
        );
    });

    test('LAB-01-004 - should accept a prompt with text', async ({ page }) => {
        const promptValue = 'Playwright';

        page.once('dialog', async (dialog) => {
            expect(dialog.type()).toBe('prompt');
            expect(dialog.message()).toBe('I am a JS prompt');
            await dialog.accept(promptValue);
        });

        await javascriptAlertsPage.openPrompt();
        await expect(javascriptAlertsPage.resultMessage).toHaveText(
            `You entered: ${promptValue}`,
        );
    });

    test('LAB-01-005 - should dismiss a prompt', async ({ page }) => {
        page.once('dialog', async (dialog) => {
            expect(dialog.type()).toBe('prompt');
            expect(dialog.message()).toBe('I am a JS prompt');
            await dialog.dismiss();
        });

        await javascriptAlertsPage.openPrompt();
        await expect(javascriptAlertsPage.resultMessage).toHaveText(
            'You entered: null',
        );
    });

    test('LAB-01-006 - should dismiss an alert dialog', async ({ page }) => {
        const [dialog] = await Promise.all([
            page.waitForEvent('dialog'),
            javascriptAlertsPage.openAlert(),
        ]);

        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe('I am a JS Alert');

        await dialog.accept();

        await expect(javascriptAlertsPage.resultMessage).toHaveText(
            'You successfully clicked an alert',
        );
    });


    test('LAB-01-007 - should accept a confirm using waitForEvent', async ({ page, }) => {
        const [dialog] = await Promise.all([
            page.waitForEvent('dialog'),
            javascriptAlertsPage.openConfirm(),
        ]);

        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe('I am a JS Confirm');

        await dialog.accept();

        await expect(javascriptAlertsPage.resultMessage).toHaveText(
            'You clicked: Ok',
        );
    });

    test('LAB-01-008 - should provide a value to a prompt', async ({ page, }) => {
        const promptValue = 'Playwright';

        const [dialog] = await Promise.all([
            page.waitForEvent('dialog'),
            javascriptAlertsPage.openPrompt(),
        ]);

        expect(dialog.type()).toBe('prompt');
        expect(dialog.message()).toBe('I am a JS prompt');

        await dialog.accept(promptValue);

        await expect(javascriptAlertsPage.resultMessage).toHaveText(
            `You entered: ${promptValue}`,
        );
    });

    test('LAB-01-009 - should validate the expected dialog type', async ({ page, }) => {
        const [dialog] = await Promise.all([
            page.waitForEvent('dialog'),
            javascriptAlertsPage.openConfirm(),
        ]);

        expect(dialog.type()).toBe('confirm');

        await dialog.accept();

        await expect(javascriptAlertsPage.resultMessage).toHaveText(
            'You clicked: Ok',
        );
    });
}); 