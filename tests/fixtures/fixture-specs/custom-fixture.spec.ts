import { test, expect } from '../login.fixture';
import path from 'path';

test.describe('Custom Fixtures', () => {
    test('LAB-17-001 - should login using a custom fixture', async ({ page, loginPage }) => {
        const filePath = path.resolve(__dirname, '../../../src/pages/lab-pages/login-fixture.html');

        await page.goto(`file://${filePath}`);
        await loginPage.login('admin', '1234');
        await expect(loginPage.message).toHaveText('Login successful');
    });

    test('LAB-17-002 - should login with valid credentials', async ({ page, loginPage }) => {
        const filePath = path.resolve(__dirname, '../../../src/pages/lab-pages/login-fixture.html');

        await page.goto(`file://${filePath}`);
        await loginPage.login('admin', '1234');

        await expect(loginPage.message).toHaveText('Login successful');
    });

    test('LAB-17-003 - should reject invalid credentials', async ({ page, loginPage }) => {

        const filePath = path.resolve(__dirname, '../../../src/pages/lab-pages/login-fixture.html');

        await page.goto(`file://${filePath}`);
        await loginPage.login('admin', 'wrong');

        await expect(loginPage.message).toHaveText('Invalid credentials');
    });
});