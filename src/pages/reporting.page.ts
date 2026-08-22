import { type Locator, type Page } from '@playwright/test';

export class ReportingPage {
    readonly page: Page;
    readonly title: Locator;
    readonly successButton: Locator;
    readonly failureButton: Locator;
    readonly message: Locator;

    constructor(page: Page) {
        this.page = page;

        this.title = page.locator('#title');
        this.successButton = page.locator('#success-button');
        this.failureButton = page.locator('#failure-button');
        this.message = page.locator('#message');
    }

    async clickSuccess(): Promise<void> {
        await this.successButton.click();
    }

    async clickFailure(): Promise<void> {
        await this.failureButton.click();
    }
}
