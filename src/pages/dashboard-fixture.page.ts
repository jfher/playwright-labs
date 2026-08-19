import { type Locator, type Page } from '@playwright/test';

export class DashboardFixturePage {
    readonly page: Page;
    readonly title: Locator;
    readonly welcomeMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.title = page.locator('#title');
        this.welcomeMessage = page.locator('#welcome-message');
    }
}
