import { type Locator, type Page } from '@playwright/test';
import path from 'path';

export class AnnotationsPage {
    readonly page: Page;
    readonly title: Locator;
    readonly loginButton: Locator;
    readonly message: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('#title');
        this.loginButton = page.locator('#login');
        this.message = page.locator('#message');
    }

    async open(): Promise<void> {
        const filePath = path.resolve(__dirname, '../../src/pages/lab-pages/annotations.html');
        await this.page.goto(`file://${filePath}`);
    }

    async login(): Promise<void> {
        await this.loginButton.click();
    }
}
