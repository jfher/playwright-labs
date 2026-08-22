import { type Locator, type Page } from '@playwright/test';
import path from 'path';

export class DebuggingPage {
    readonly page: Page;
    readonly title: Locator;
    readonly loadDataButton: Locator;
    readonly status: Locator;
    readonly result: Locator;

    constructor(page: Page) {
        this.page = page;

        this.title = page.locator('#title');
        this.loadDataButton = page.locator('#load-data');
        this.status = page.locator('#status');
        this.result = page.locator('#result');
    }

    async loadData(): Promise<void> {
        await this.loadDataButton.click();
    }

    async open() {
        const filePath = path.resolve(__dirname, '../../src/pages/lab-pages/debugging.html');

        await this.page.goto(`file://${filePath}`);
    }
}
