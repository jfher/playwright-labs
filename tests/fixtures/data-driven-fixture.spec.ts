import { test, expect } from './test-data.fixture';
import { loadRegistrationPage } from '@utils/registration-mocked-page';

test('LAB-15-007 - should use fixture data', async ({ page, user }) => {
    await loadRegistrationPage(page);

    await page.locator('#name').fill(user.name);
    await page.locator('#email').fill(user.email);
    await page.locator('#role').selectOption(user.role);
    await page.locator('button').click();

    await expect(page.locator('#result')).toHaveText('Registration successful');
});
