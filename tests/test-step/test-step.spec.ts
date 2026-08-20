import { test, expect } from '@playwright/test';
import { TestStepPage } from '@pages/test-step.page';

test.describe('LAB-21 - test.step()', () => {
    test('LAB-21-001 - should complete purchase using test steps', async ({ page }) => {
        const shopPage = new TestStepPage(page);
        await shopPage.open();

        await test.step('Login', async () => {
            await shopPage.login('admin', '1234');
        });

        await test.step('Add product to cart', async () => {
            await shopPage.addProduct();
        });

        await test.step('Open cart', async () => {
            await shopPage.openCart();
        });

        await test.step('Checkout', async () => {
            await shopPage.checkout();
        });

        await test.step('Confirm order', async () => {
            await shopPage.confirmOrder();
        });

        await expect(shopPage.orderMessage).toHaveText('Order completed');
    });
});
