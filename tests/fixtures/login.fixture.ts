import { test as base, expect } from '@playwright/test';
import { LoginFixturePage } from '@pages/login-fixture.page';

type CustomFixtures = {
    loginPage: LoginFixturePage;
};

export const test = base.extend<CustomFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginFixturePage(page);

        await use(loginPage);
    },
});

export { expect };