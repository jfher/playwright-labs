import { test as base, type Page } from './login.fixture';

type AuthenticatedFixtures = {
    authenticatedPage: Page;
};

export const test = base.extend<AuthenticatedFixtures>({
    authenticatedPage: async ({ page, loginPage }, use) => {
        await loginPage.login('admin', '1234');
        await use(page);
    },
});

export { expect } from '@playwright/test';
