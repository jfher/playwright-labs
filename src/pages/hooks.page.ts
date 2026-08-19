import { type Locator, type Page } from '@playwright/test';

export class HooksPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly saveButton: Locator;
    readonly message: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.saveButton = page.locator('#save-button');
        this.message = page.locator('#message');
    }

    async enterUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    async save(): Promise<void> {
        await this.saveButton.click();
    }
}
