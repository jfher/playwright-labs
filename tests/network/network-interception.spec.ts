import { test, expect } from '@playwright/test';
import { loadBookingPage } from '@utils/booking-mocked-page';

test.describe('Network Interception & Mocking 006-008', () => {
    test('LAB-13-006 - should add a custom test header', async ({ page }) => {
        let interceptedHeader = '';

        await page.route('**/api/bookings/123', async (route) => {
            interceptedHeader = route.request().headers()['x-test-mode'] ?? '';

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    id: 123,
                    firstname: 'Marcus',
                    lastname: 'QA',
                }),
            });
        });

        await loadBookingPage(page);

        await page.locator('#search').click();
        expect(interceptedHeader).toBe('');
    });

    test('LAB-13-007 - should modify a real API response', async ({ page }) => {
        await page.route('https://restful-booker.herokuapp.com/booking/123', async (route) => {
            const response = await route.fetch();

            const body = await response.json();
            body.firstname = 'Mocked';

            await route.fulfill({
                response,
                json: body,
            });
        });

        await loadBookingPage(page);
        await page.locator('#search').click();
    });

    test('LAB-13-008 - should handle a network failure', async ({ page }) => {
        await page.route('**/api/bookings/123', async (route) => {
            await route.abort();
        });

        await loadBookingPage(page);

        await page.locator('#search').click();
        await expect(page.locator('#error')).toBeVisible();
    });
});
