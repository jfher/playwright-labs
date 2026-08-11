import { test, expect } from "@fixtures/labs.fixture";

test.describe("JavaScript Dialogs", () => {
    test("LAB-01-001 - should handle an alert dialog", async ({ jsAlertsPage, page }) => {
        let dialogMessage = "";

        page.once("dialog", async (dialog) => {
            expect(dialog.type()).toBe("alert");
            dialogMessage = dialog.message();
            await dialog.accept();
        });

        await jsAlertsPage.openAlert(true);
        expect(dialogMessage).toBe("I am a JS Alert");

        await expect(jsAlertsPage.resultMessage).toHaveText("You successfully clicked an alert");
    });

    test("LAB-01-002 - should accept a confirm dialog", async ({ jsAlertsPage, page }) => {
        let dialogMessage = "";

        page.once("dialog", async (dialog) => {
            expect(dialog.type()).toBe("confirm");
            dialogMessage = dialog.message();
            await dialog.accept();
        });

        await jsAlertsPage.openConfirm(true);

        expect(dialogMessage).toBe("I am a JS Confirm");

        await expect(jsAlertsPage.resultMessage).toHaveText("You clicked: Ok");
    });

    test("LAB-01-003 - should dismiss a confirm dialog", async ({ jsAlertsPage, page }) => {
        page.once("dialog", async (dialog) => {
            expect(dialog.type()).toBe("confirm");

            expect(dialog.message()).toBe("I am a JS Confirm");

            await dialog.dismiss();
        });

        await jsAlertsPage.openConfirm();

        await expect(jsAlertsPage.resultMessage).toHaveText("You clicked: Cancel");
    });

    test("LAB-01-004 - should accept a prompt with text", async ({ jsAlertsPage, page }) => {
        const promptValue = "Playwright";

        page.once("dialog", async (dialog) => {
            expect(dialog.type()).toBe("prompt");
            expect(dialog.message()).toBe("I am a JS prompt");
            await dialog.accept(promptValue);
        });

        await jsAlertsPage.openPrompt();
        await expect(jsAlertsPage.resultMessage).toHaveText(`You entered: ${promptValue}`);
    });

    test("LAB-01-005 - should dismiss a prompt", async ({ jsAlertsPage, page }) => {
        page.once("dialog", async (dialog) => {
            expect(dialog.type()).toBe("prompt");
            expect(dialog.message()).toBe("I am a JS prompt");
            await dialog.dismiss();
        });

        await jsAlertsPage.openPrompt();
        await expect(jsAlertsPage.resultMessage).toHaveText("You entered: null");
    });

    test("LAB-01-006 - should dismiss an alert dialog", async ({ jsAlertsPage, page }) => {
        const [dialog] = await Promise.all([page.waitForEvent("dialog"), jsAlertsPage.openAlert()]);

        expect(dialog.type()).toBe("alert");
        expect(dialog.message()).toBe("I am a JS Alert");

        await dialog.accept();

        await expect(jsAlertsPage.resultMessage).toHaveText("You successfully clicked an alert");
    });

    test("LAB-01-007 - should accept a confirm using waitForEvent", async ({ jsAlertsPage, page }) => {
        const [dialog] = await Promise.all([page.waitForEvent("dialog"), jsAlertsPage.openConfirm()]);

        expect(dialog.type()).toBe("confirm");
        expect(dialog.message()).toBe("I am a JS Confirm");

        await dialog.accept();

        await expect(jsAlertsPage.resultMessage).toHaveText("You clicked: Ok");
    });

    test("LAB-01-008 - should provide a value to a prompt", async ({ jsAlertsPage, page }) => {
        const promptValue = "Playwright";

        const [dialog] = await Promise.all([page.waitForEvent("dialog"), jsAlertsPage.openPrompt()]);

        expect(dialog.type()).toBe("prompt");
        expect(dialog.message()).toBe("I am a JS prompt");

        await dialog.accept(promptValue);

        await expect(jsAlertsPage.resultMessage).toHaveText(`You entered: ${promptValue}`);
    });

    test("LAB-01-009 - should validate the expected dialog type", async ({ jsAlertsPage, page }) => {
        const [dialog] = await Promise.all([page.waitForEvent("dialog"), jsAlertsPage.openConfirm()]);

        expect(dialog.type()).toBe("confirm");

        await dialog.accept();

        await expect(jsAlertsPage.resultMessage).toHaveText("You clicked: Ok");
    });
});
