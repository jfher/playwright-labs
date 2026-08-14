import { Locator, Page } from '@playwright/test';

export default class MultipleWindowsPage {
    readonly page: Page;
    readonly newWindowLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newWindowLink = page.getByRole('link', { name: 'Click Here' });
    }

    async open(): Promise<void> {
        await this.page.goto('/windows');
    }

    async newWindow(): Promise<Page> {
        const context = this.page.context();

        const [newPage] = await Promise.all([context.waitForEvent('page'), this.newWindowLink.click()]);

        await newPage.waitForLoadState();

        return newPage;
    }
}
