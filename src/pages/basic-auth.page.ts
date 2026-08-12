import { Page, Locator } from "@playwright/test";

export class BasicAuthPage {

    readonly page: Page;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.successMessage = page.locator('body');
    }

    async open(): Promise<void> {
        await this.page.goto('/basic_auth');
    }

    async getContent(): Promise<string> {
        return (await this.successMessage.textContent()) ?? '';
    }

};
