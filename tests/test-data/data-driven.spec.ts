import { expect, test } from '@playwright/test';
import { loadRegistrationPage } from '@utils/registration-mocked-page';
import { registrationCases, registrationCasesNoParametrized, users, validUser } from '@test-data/users';
import { createUser } from 'src/factories/user.factory';

test.describe('Data-driven Testing', () => {
    test('LAB-15-001 - should register a valid user', async ({ page }) => {
        await loadRegistrationPage(page);

        await page.locator('#name').fill(validUser.name);
        await page.locator('#email').fill(validUser.email);
        await page.locator('#role').selectOption(validUser.role);
        await page.locator('button').click();

        await expect(page.locator('#result')).toHaveText('Registration successful');
    });

    for (const user of users) {
        test(`LAB-15-002 - should register ${user.role}`, async ({ page }) => {
            await loadRegistrationPage(page);

            await page.locator('#name').fill(validUser.name);
            await page.locator('#email').fill(validUser.email);
            await page.locator('#role').selectOption(validUser.role);

            await page.locator('button').click();

            await expect(page.locator('#result')).toHaveText('Registration successful');
        });
    }

    for (const testCase of registrationCasesNoParametrized) {
        test(`LAB-15-003 - should register an user being  ${testCase.expected}`, async ({ page }) => {
            await loadRegistrationPage(page);

            await page.locator('#name').fill(testCase.name);
            await page.locator('#email').fill(testCase.email);
            await page.locator('#role').selectOption(testCase.role);

            await page.locator('button').click();

            await expect(page.locator('#result')).toHaveText(testCase.expected);
        });
    }

    for (const testCase of registrationCases) {
        test(`LAB-15-004 - should register ${testCase.email}`, async ({ page }) => {
            await loadRegistrationPage(page);

            await page.locator('#name').fill(testCase.name);
            await page.locator('#email').fill(testCase.email);
            await page.locator('#role').selectOption(testCase.role);

            await page.locator('button').click();

            await expect(page.locator('#result')).toHaveText(testCase.expected);
        });
    }

    test('LAB-15-006 - should register generated user', async ({ page }) => {
        const user = createUser({
            role: 'qa',
        });

        await loadRegistrationPage(page);

        await page.locator('#name').fill(user.name);
        await page.locator('#email').fill(user.email);
        await page.locator('#role').selectOption(user.role);

        await page.locator('button').click();

        await expect(page.locator('#result')).toHaveText('Registration successful');
    });
});
