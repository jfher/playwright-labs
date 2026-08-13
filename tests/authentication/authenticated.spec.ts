import { test, expect } from '@fixtures/labs.fixture';

test.use({ storageState: 'playwright/.auth/user.json' });


//* This test suit will be skipped because of the behavior of the page to validate the cookies login
test.describe.skip('Authenticated', () => {

    test('LAB-06-004 - should access secure page using stored authentication', async ({ securePage }) => {

        await securePage.open();

        await expect(securePage.logoutButton).toBeVisible();
    });

    test('LAB-06-005 - should keep unauthenticated contexts isolated', async ({ browser }) => {
        const authenticatedContext = await browser.newContext({
            storageState: 'playwright/.auth/user.json',
        });

        const unauthenticatedContext = await browser.newContext();

        const authenticatedPage = await authenticatedContext.newPage();

        const unauthenticatedPage = await unauthenticatedContext.newPage();

        await authenticatedPage.goto('/secure');
        await unauthenticatedPage.goto('/secure');

        expect(authenticatedPage.url()).toContain('/secure');
        expect(unauthenticatedPage.url()).toContain('/login');

        await authenticatedContext.close();
        await unauthenticatedContext.close();
    });
});



