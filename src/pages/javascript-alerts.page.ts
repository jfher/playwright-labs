import { Locator, Page } from '@playwright/test';

export class JavascriptAlertsPage {
    readonly page: Page;

    readonly alertButton: Locator;
    readonly confirmButton: Locator;
    readonly promptButton: Locator;
    readonly resultMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.alertButton = page.getByRole('button', { name: 'Click for JS Alert' });
        this.confirmButton = page.getByRole('button', { name: 'Click for JS Confirm' });
        this.promptButton = page.getByRole('button', { name: 'Click for JS Prompt' });
        this.resultMessage = page.locator('#result');
    }

    async open() {
        await this.page.goto('/javascript_alerts');
    }

    async openAlert(waited: boolean = false) {
        waited ? await this.alertButton.click() : this.alertButton.click();
    }

    async openConfirm(waited: boolean = false) {
        waited ? await this.confirmButton.click() : this.confirmButton.click();
    }

    async openPrompt() {
        this.promptButton.click();
    }
}
