// import { test, expect } from '@fixtures/labs.fixture';

import { NetworkPage } from '@pages/network.page';
import { test, expect } from '@playwright/test';

test.describe('Network', () => {
    test('LAB-08-001 - should intercept a network request', async ({ page }) => {
        const networkPage = new NetworkPage(page);
        let requestUrl = '';
        let method = '';

        await page.route('**/api/products', async (route) => {
            requestUrl = route.request().url();
            method = route.request().method();

            await route.continue();
        });

        await networkPage.open();

        await expect(requestUrl).toContain('/api/products');
    });

    test('LAB-08-002 - should intercept the expected HTTP method', async ({ page }) => {
        const networkPage = new NetworkPage(page);
        let method = '';

        await page.route('**/api/products', async (route) => {
            method = route.request().method();

            await route.continue();
        });

        await networkPage.open();

        await expect.poll(() => method).toBe('GET'); //* Poll returns a single value, the assertion is done on the returned value. Especially useful with async/await.
    });

    test('LAB-08-003 - should mock a successful API response', async ({ page }) => {
        const networkPage = new NetworkPage(page);

        await page.route('**/api/products', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify([
                    {
                        id: 1,
                        name: 'Playwright',
                    },
                    {
                        id: 2,
                        name: 'TypeScript',
                    },
                ]),
            });
        });

        await networkPage.open();
        await expect(networkPage.productList).toContainText('Playwright');
        await expect(networkPage.productList).toContainText('TypeScript');
    });

    test('LAB-08-004 - should handle a server error', async ({ page }) => {
        const networkPage = new NetworkPage(page);
        await page.route('**/api/products', async (route) => {
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({
                    error: 'Internal Server Error',
                }),
            });
        });

        await networkPage.open();
        await expect(networkPage.errorMessage).toHaveText('Unable to load products');
    });

    test('LAB-08-005 - should handle a network failure', async ({ page }) => {
        const networkPage = new NetworkPage(page);
        await page.route('**/api/products', async (route) => {
            await route.abort();
        });

        await networkPage.open();
        await expect(networkPage.errorMessage).toHaveText('Unable to load products');
    });

    test('LAB-08-006 - should modify request headers', async ({ page }) => {
        const networkPage = new NetworkPage(page);
        let receivedHeader = '';

        await page.route('**/api/products', async (route) => {
            const headers = {
                ...route.request().headers(),
                'x-test-header': 'qa-automation',
            };

            receivedHeader = headers['x-test-header'];

            await route.continue({
                headers,
            });
        });

        await networkPage.open();

        await expect.poll(() => receivedHeader).toBe('qa-automation');
    });
});
