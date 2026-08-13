import { usersAuth } from '@data/usersAuth';
import { test, expect } from '@fixtures/labs.fixture';

test.describe('Browser Storage', () => {

    test('LAB-07-001 - should store a value in localStorage', async ({ storagePage }) => {
        await storagePage.setLocalStorage('testKey', 'testValue');

        const value = await storagePage.getLocalStorage('testKey');

        expect(value).toBe('testValue');
    });

    test('LAB-07-002 - should remove a localStorage item', async ({ storagePage }) => {
        await storagePage.setLocalStorage('testKey', 'testValue');

        await storagePage.removeLocalStorage('testKey');
        const value = await storagePage.getLocalStorage('testKey');

        expect(value).toBeNull();
    });

    test('LAB-07-003 - should clear localStorage', async ({ storagePage }) => {
        await storagePage.setLocalStorage('key1', 'value1');
        await storagePage.setLocalStorage('key2', 'value2');

        await storagePage.clearLocalStorage();

        const key1 = await storagePage.getLocalStorage('key1');
        const key2 = await storagePage.getLocalStorage('key2');

        expect(key1).toBeNull();
        expect(key2).toBeNull();
    });

    test('LAB-07-004 - should read cookies from the browser context', async ({ context, loginPage }) => {
        await loginPage.login(usersAuth.USER.username, usersAuth.USER.password);

        const cookies = await context.cookies();
        expect(cookies.length).toBeGreaterThan(0);
        expect(cookies.some(cookie => cookie.name === 'rack.session')).toBe(true);
    });

    test('LAB-07-005 - should add a cookie to the browser context', async ({ context }) => {
        await context.addCookies([
            {
                name: 'testCookie',
                value: 'testValue',
                url: 'https://the-internet.herokuapp.com',
            },
        ]);

        const cookies = await context.cookies();

        const testCookie = cookies.find(cookie => cookie.name === 'testCookie');
        expect(testCookie?.value).toBe('testValue');
    });


    test('LAB-07-006 - should clear cookies', async ({ context }) => {
        await context.addCookies([
            {
                name: 'testCookie',
                value: 'testValue',
                url: 'https://the-internet.herokuapp.com',
            },
        ]);

        expect((await context.cookies()).some(cookie => cookie.name === 'testCookie')).toBe(true);

        await context.clearCookies();

        expect((await context.cookies()).some(cookie => cookie.name === 'testCookie')).toBe(false);
    });

    test('LAB-07-007 - should isolate cookies between browser contexts', async ({ browser }) => {
        const contextA = await browser.newContext();
        const contextB = await browser.newContext();

        await contextA.addCookies([
            {
                name: 'user',
                value: 'userA',
                url: 'https://the-internet.herokuapp.com',
            },
        ]);

        const cookiesA = await contextA.cookies();
        const cookiesB = await contextB.cookies();

        expect(cookiesA.some(cookie => cookie.name === 'user')).toBe(true);
        expect(cookiesB.some(cookie => cookie.name === 'user')).toBe(false);

        await contextA.close();
        await contextB.close();
    });


    test('LAB-07-008 - should isolate localStorage between contexts', async ({ browser }) => {
        const contextA = await browser.newContext();
        const contextB = await browser.newContext();

        const pageA = await contextA.newPage();
        const pageB = await contextB.newPage();

        await pageA.goto('/');
        await pageB.goto('/');

        await pageA.evaluate(() => {
            localStorage.setItem(
                'user',
                'userA',
            );
        });

        const valueA = await pageA.evaluate(() => {
            return localStorage.getItem('user');
        });

        const valueB = await pageB.evaluate(() => {
            return localStorage.getItem('user');
        });

        expect(valueA).toBe('userA');
        expect(valueB).toBeNull();

        await contextA.close();
        await contextB.close();
    });
});