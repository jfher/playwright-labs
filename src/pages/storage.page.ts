import { Page } from '@playwright/test';

export class StoragePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open(): Promise<void> {
        await this.page.goto('/');
    }

    async setLocalStorage(key: string, value: string): Promise<void> {
        await this.page.evaluate(
            ([storageKey, storageValue]) => {
                localStorage.setItem(storageKey, storageValue);
            },
            [key, value],
        );
    }

    async getLocalStorage(key: string): Promise<string | null> {
        return this.page.evaluate(
            storageKey => {
                return localStorage.getItem(storageKey);
            },
            key,
        );
    }

    async removeLocalStorage(key: string): Promise<void> {
        await this.page.evaluate(
            storageKey => {
                localStorage.removeItem(storageKey);
            },
            key,
        );
    }

    async clearLocalStorage(): Promise<void> {
        await this.page.evaluate(() => {
            localStorage.clear();
        });
    }
}