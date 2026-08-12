import { authMessages } from '@data/authMessages';
import { test, expect } from '@fixtures/labs.fixture';
import { BasicAuthPage } from '@pages/basic-auth.page';
import { usersAuth } from 'src/constants/usersAuth';

test.describe('Authentication', () => {
    /**
     * @tag @lab-06-001
     * We send the credentials via httpCredentials because the form its embedded inside an alert so its impossible to fill it as a normal form
     */
    test('LAB-06-001 - should authenticate using HTTP Basic Auth', async ({ browser }) => {
        const context = await browser.newContext({
            httpCredentials: {
                username: usersAuth.ADMIN.username,
                password: usersAuth.ADMIN.password,
            },
        });

        const page = await context.newPage();
        const basicAuthPage = new BasicAuthPage(page);
        await basicAuthPage.open();

        const content = await basicAuthPage.getContent();

        expect(content).toContain(authMessages.SUCCESS_HTTP_AUTH);
        await context.close();
    });


    test('LAB-06-002 - should login successfully', async ({ loginPage, securePage }) => {

        await loginPage.login(usersAuth.USER.username, usersAuth.USER.password);
        await expect(securePage.logoutButton).toBeVisible();

        const message = await securePage.getSuccessMessage();
        expect(message).toContain(authMessages.SUCCESS_FORM_AUTH);
    });

    test('LAB-06-003 - should create an authenticated session', async ({ context, loginPage }) => {
        await loginPage.login(usersAuth.USER.username, usersAuth.USER.password);
        const cookies = await context.cookies();

        expect(cookies.length).toBeGreaterThan(0);

        const authCookie = cookies.find(cookie => cookie.name === 'rack.session');

        expect(authCookie).toBeDefined();
    });
});


