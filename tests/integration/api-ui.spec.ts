import { test, expect } from '@playwright/test';
import { BookingPage } from '@pages/booking.page';
import { createBooking, generateBookingData } from '@utils/booking-api';
import { loginAuth } from '@utils/auth-api';
import { Environment } from '@config/Environment';

//* Disable security and CORS
test.use({
    launchOptions: {
        args: ['--disable-web-security'],
    },
})

test.describe('API + UI Integration', () => {
    test('LAB-10-001 - should create booking through API and find it through UI', async ({ request, page }) => {
        const bookingPage = new BookingPage(page);

        const bookingData = {
            firstname: 'Marcos',
            lastname: 'QA',
            totalprice: 150,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-08-13',
                checkout: '2026-08-20',
            },
            additionalneeds: 'Breakfast',
        };

        const createResponse = await request.post(
            `${Environment.RESTFUL_BOOKER_BASE_URL}/booking`,
            {
                data: bookingData,
            },
        );

        expect(createResponse.status()).toBe(200);

        const createBody = await createResponse.json();

        const bookingId = createBody.bookingid;

        expect(bookingId).toBeDefined();

        await bookingPage.open();

        await bookingPage.searchBooking(
            bookingId,
        );

        await expect(bookingPage.bookingResult).toHaveText('Marcos QA');
    });

    test('LAB-10-002 - should use API for test data setup', async ({ request, page }) => {
        const bookingPage = new BookingPage(page);
        const bookingId = await createBooking(request, generateBookingData());

        await bookingPage.open();

        await bookingPage.searchBooking(
            bookingId,
        );
        await expect(bookingPage.bookingResult).toHaveText('Marcos QA');
    });

    test('LAB-10-003 - should verify UI data through API', async ({ request, page }) => {
        const bookingPage = new BookingPage(page);

        const bookingId = await createBooking(request, generateBookingData({ firstname: 'Marcus', lastname: 'Verification' }));
        await bookingPage.open();

        await bookingPage.searchBooking(
            bookingId,
        );

        await expect(bookingPage.bookingResult).toHaveText('Marcus Verification');

        const apiResponse = await request.get(
            `${Environment.RESTFUL_BOOKER_BASE_URL}/booking/${bookingId}`,
        );

        expect(apiResponse.status()).toBe(200);

        const apiBooking = await apiResponse.json();

        expect(apiBooking.firstname).toBe('Marcus');
        expect(apiBooking.lastname).toBe('Verification');
    });

    test('LAB-10-004 - should clean test data through API', async ({ request, page }) => {
        const bookingPage = new BookingPage(page);

        const bookingId = await createBooking(request, generateBookingData({ firstname: 'Marcus', lastname: 'Cleanup' }));

        try {
            await bookingPage.open();

            await bookingPage.searchBooking(
                bookingId,
            );

            await expect(bookingPage.bookingResult).toHaveText('Marcus Cleanup');
        } finally {
            const token = await loginAuth(request);

            const deleteResponse = await request.delete(
                `${Environment.RESTFUL_BOOKER_BASE_URL}/${bookingId}`,
                {
                    headers: {
                        Cookie: `token=${token}`,
                    },
                },
            );

            expect([201, 404]).toContain(deleteResponse.status());
        }
    });


    test('LAB-10-005 - should validate the booking lifecycle', async ({ request }) => {
        const bookingId = await createBooking(request, generateBookingData({ firstname: 'Marcus', lastname: 'Lifecycle' }))

        const getResponse = await request.get(
            `${Environment.RESTFUL_BOOKER_BASE_URL}/booking/${bookingId}`,
        );

        expect(getResponse.status()).toBe(200);

        const token = await loginAuth(request);

        const updateResponse = await request.put(
            `${Environment.RESTFUL_BOOKER_BASE_URL}/booking/${bookingId}`,
            {
                headers: {
                    Cookie: `token=${token}`,
                },
                data: generateBookingData({ firstname: 'Marcus Updated' })
            },
        );
        expect(updateResponse.status()).toBe(200);

        const updatedBooking = await updateResponse.json();
        expect(updatedBooking.firstname).toBe('Marcus Updated');

        const deleteResponse = await request.delete(
            `${Environment.RESTFUL_BOOKER_BASE_URL}/booking/${bookingId}`,
            {
                headers: {
                    Cookie: `token=${token}`,
                },
            }
        );
        expect(deleteResponse.status()).toBe(201);

        const finalResponse = await request.get(
            `${Environment.RESTFUL_BOOKER_BASE_URL}/booking/${bookingId}`,
        );

        expect(finalResponse.status()).toBe(404);
    });
});