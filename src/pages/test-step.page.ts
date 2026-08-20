import { type Locator, type Page } from '@playwright/test';
import path from 'path';

export class TestStepPage {
    readonly page: Page;

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    readonly addProductButton: Locator;
    readonly openCartButton: Locator;

    readonly checkoutButton: Locator;
    readonly confirmOrderButton: Locator;

    readonly orderMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');

        this.addProductButton = page.locator('#add-product');
        this.openCartButton = page.locator('#open-cart');

        this.checkoutButton = page.locator('#checkout');
        this.confirmOrderButton = page.locator('#confirm-order');

        this.orderMessage = page.locator('#order-message');
    }

    async open() {
        const filePath = path.resolve(__dirname, '../../src/pages/lab-pages/test-step.html');
        await this.page.goto(`file://${filePath}`);
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async addProduct(): Promise<void> {
        await this.addProductButton.click();
    }

    async openCart(): Promise<void> {
        await this.openCartButton.click();
    }

    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async confirmOrder(): Promise<void> {
        await this.confirmOrderButton.click();
    }
}
