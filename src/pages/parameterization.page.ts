import { type Locator, type Page } from '@playwright/test';
import path from 'path';

export class ParameterizationPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly message: Locator;

    constructor(page: Page) {
        this.page = page;

        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.message = page.locator('#message');
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async open() {
        const filePath = path.resolve(__dirname, '../../src/pages/lab-pages/parameterization.html');
        await this.page.goto(`file://${filePath}`);
    }
}