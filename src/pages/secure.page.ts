import { Locator, Page } from '@playwright/test';

export class SecurePage {
    readonly page: Page;

    readonly successMessage: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.successMessage = page.locator('#flash');
        this.logoutButton = page.getByRole('link', { name: 'Logout' });
    }

    async open(): Promise<void> {
        await this.page.goto('/secure');
    }

    async getSuccessMessage(): Promise<string> {
        return (await this.successMessage.textContent()) ?? '';
    }
}
