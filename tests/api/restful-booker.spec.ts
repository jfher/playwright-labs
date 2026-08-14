import { Environment } from '@config/Environment';
import { STATUS_CODES } from '@data/api';
import { test, expect } from '@playwright/test';
import { login } from '@utils/auth';
import { createBooking, updateBooking } from '@utils/bookingBuilder';

test.describe('RESTful Booker API', () => {
    const baseUrl = Environment.RESTFUL_BOOKER_BASE_URL;

    test('LAB-09-001 - should retrieve bookings', async ({ request }) => {
        const response = await request.get(`${baseUrl}/booking`);

        expect(response.ok()).toBe(true);
        expect(response.status()).toBe(STATUS_CODES.OK);
    });

    test('LAB-09-002 - should return booking ids', async ({ request }) => {
        const response = await request.get(`${baseUrl}/booking`);

        expect(response.status()).toBe(STATUS_CODES.OK);

        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
    });

    test('LAB-09-003 - should return booking ids with valid structure', async ({ request }) => {
        const response = await request.get(`${baseUrl}/booking`);
        expect(response.status()).toBe(STATUS_CODES.OK);

        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
        expect(body[0]).toHaveProperty('bookingid');
    });

    test('LAB-09-004 - should return JSON content type', async ({ request }) => {
        const response = await request.get(`${baseUrl}/booking`);
        expect(response.status()).toBe(STATUS_CODES.OK);

        const headers = response.headers();
        expect(headers['content-type']).toContain('application/json');
    });

    test('LAB-09-005 - should filter bookings by firstname', async ({ request }) => {
        const response = await request.get(
            `${baseUrl}/booking`,
            {
                params: {
                    firstname: 'Susan',
                },
            },
        );

        expect(response.status()).toBe(STATUS_CODES.OK);
        const body = await response.json();

        expect(Array.isArray(body)).toBe(true);
    });


    test('LAB-09-006 - should create a booking', async ({ request }) => {
        const booking = createBooking();

        const response = await request.post(
            `${baseUrl}/booking`,
            {
                data: booking,
            },
        );

        expect(response.status()).toBe(STATUS_CODES.OK);
        const body = await response.json();

        expect(body).toHaveProperty('bookingid');
        expect(body).toHaveProperty('booking');

        expect(body.booking.firstname).toBe(booking.firstname);
        expect(body.booking.lastname).toBe(booking.lastname);
    });


    test('LAB-09-007 - should create and retrieve a booking', async ({ request }) => {
        const createResponse = await request.post(
            `${baseUrl}/booking`,
            {
                data: createBooking()
            },
        );

        expect(createResponse.status()).toBe(STATUS_CODES.OK);
        const createBody = await createResponse.json();

        const bookingId = createBody.bookingid;
        expect(bookingId).toBeDefined();

        const getResponse = await request.get(`${baseUrl}/booking/${bookingId}`);
        expect(getResponse.status()).toBe(STATUS_CODES.OK);

        const booking = await getResponse.json();

        expect(booking.firstname).toBe('Marcos');
        expect(booking.lastname).toBe('QA');
    });

    test('LAB-09-008 - should update a booking', async ({ request }) => {
        const token = await login();
        const createResponse = await request.post(`${baseUrl}/booking`, {
            data: createBooking(),
        });

        const createBody = await createResponse.json();
        const bookingId = createBody.bookingid;

        const updateResponse = await request.put(`${baseUrl}/booking/${bookingId}`,
            {
                headers: {
                    Cookie: `token=${token}`,
                },
                data: updateBooking({ firstname: 'Marcos Updated', totalprice: 200 })
            },
        );
        expect(updateResponse.status()).toBe(STATUS_CODES.OK);

        const updatedBooking = await updateResponse.json();
        expect(updatedBooking.firstname).toBe('Marcos Updated');
        expect(updatedBooking.totalprice).toBe(200);
    });

    test('LAB-09-009 - should partially update a booking', async ({ request }) => {
        const token = await login();
        const createResponse = await request.post(`${baseUrl}/booking`, {
            data: createBooking(),
        });

        const createBody = await createResponse.json();
        const bookingId = createBody.bookingid;

        const patchResponse = await request.patch(
            `${baseUrl}/booking/${bookingId}`,
            {
                headers: {
                    Cookie: `token=${token}`,
                },
                data: {
                    firstname: 'Partial Update',
                },
            },
        );

        expect(patchResponse.status()).toBe(STATUS_CODES.OK);
        const booking = await patchResponse.json();
        expect(booking.firstname).toBe('Partial Update');
    });

    test('LAB-09-010 - should delete a booking', async ({ request }) => {
        const token = await login();
        const createResponse = await request.post(`${baseUrl}/booking`, {
            data: createBooking(),
        });

        const createBody = await createResponse.json();
        const bookingId = createBody.bookingid;

        const deleteResponse = await request.delete(
            `${baseUrl}/booking/${bookingId}`,
            {
                headers: { Cookie: `token=${token}` },
            }
        );

        expect(deleteResponse.status()).toBe(STATUS_CODES.CREATED);
        const getResponse = await request.get(`${baseUrl}/booking/${bookingId}`);

        expect(getResponse.status()).toBe(STATUS_CODES.NOT_FOUND);
    });

    test('LAB-09-011 - should authenticate successfully', async ({ request }) => {
        const response = await request.post(
            `${baseUrl}/auth`,
            {
                data: {
                    username: 'admin',
                    password: 'password123',
                },
            },
        );

        expect(response.status()).toBe(STATUS_CODES.OK);

        const body = await response.json();

        expect(body).toHaveProperty('token');
        expect(typeof body.token).toBe('string');
    });
});