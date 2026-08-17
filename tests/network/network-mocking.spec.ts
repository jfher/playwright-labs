import { test, expect } from '@playwright/test';
import { loadBookingPage } from '@utils/booking-mocked-page';

test.describe("Network Interception & Mocking 001-005", () => {
    test('LAB-13-001 - should display mocked booking data', async ({ page }) => {
        await page.route(
            '**/api/bookings/123',
            async (route) => {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        id: 123,
                        firstname: 'Marcus',
                        lastname: 'QA',
                    }),
                });
            },
        );

        await loadBookingPage(page);
        await page.locator('#search').click();

        await expect(page.locator('#result')).toBeVisible();
        await expect(page.locator('#booking-name')).toHaveText('Marcus QA');
        await expect(page.locator('#booking-id-result')).toHaveText('Booking #123');
    });


    test('LAB-13-002 - should display an error when API returns 500', async ({ page }) => {
        await page.route(
            '**/api/bookings/123',
            async (route) => {
                await route.fulfill({
                    status: 500,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        error: 'Internal Server Error',
                    }),
                });
            },
        );

        await loadBookingPage(page);
        await page.locator('#search').click();

        await expect(page.locator('#error')).toBeVisible();
        await expect(page.locator('#error')).toHaveText('Unable to load booking.');
    });

    test('LAB-13-003 - should handle a 404 response', async ({ page }) => {
        await page.route(
            '**/api/bookings/123',
            async (route) => {
                await route.fulfill({
                    status: 404,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        error: 'Booking not found',
                    }),
                });
            },
        );

        await loadBookingPage(page);

        await page.locator('#search').click();
        await expect(page.locator('#error')).toBeVisible();
    });

    test('LAB-13-004 - should display empty state when API returns no booking', async ({ page }) => {
        await page.route(
            '**/api/bookings/123',
            async (route) => {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(null),
                });
            },
        );

        await loadBookingPage(page);

        await page.locator('#search').click();
        await expect(page.locator('#empty')).toBeVisible();
        await expect(page.locator('#result')).toBeHidden();
    });

    test('LAB-13-005 - should display loading state while API is slow', async ({ page }) => {
        await page.route(
            '**/api/bookings/123',
            async (route) => {
                await new Promise(
                    (resolve) =>
                        setTimeout(
                            resolve,
                            1500,
                        ),
                );

                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        id: 123,
                        firstname: 'Marcus',
                        lastname: 'QA',
                    }),
                });
            },
        );

        await loadBookingPage(page);

        await page.locator('#search').click();
        await expect(page.locator('#loading')).toBeVisible();
        await expect(page.locator('#result')).toBeVisible();
    });
})