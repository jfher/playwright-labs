import { test, expect } from '@playwright/test';
import { ParameterizationPage } from '@pages/parameterization.page';
import { loginCases } from '@test-data/login-data';
import path from 'path';

test.describe('Parameterization', () => {
    loginCases.forEach(({ scenario, username, password, expectedMessage }) => {
        test.beforeEach(async ({ page }) => {
            const filePath = path.resolve(__dirname, '../../src/pages/lab-pages/parameterization.html');
            await page.goto(`file://${filePath}`);
        });

        test(`LAB-22-001 - login should handle ${scenario}`, async ({ page }) => {
            const loginPage = new ParameterizationPage(page);

            await test.step('Submit credentials', async () => {
                await loginPage.login(username, password);
            });

            await test.step('Verify response', async () => {
                await expect(loginPage.message).toHaveText(expectedMessage);
            });
        });
    });
});
