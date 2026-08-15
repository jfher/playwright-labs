import { APIRequestContext } from '@playwright/test';

export interface BookingData {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: {
        checkin: string;
        checkout: string;
    };
    additionalneeds?: string;
}

export function generateBookingData(data?: Partial<BookingData>): BookingData {
    return {
        firstname: data?.firstname || 'Marcos',
        lastname: data?.lastname || 'QA',
        totalprice: data?.totalprice || 150,
        depositpaid: data?.depositpaid || true,
        bookingdates: {
            checkin: data?.bookingdates?.checkin || '2026-08-13',
            checkout: data?.bookingdates?.checkout || '2026-08-20',
        },
        additionalneeds: data?.additionalneeds || 'Breakfast',
    };
}

export async function createBooking(request: APIRequestContext, booking: BookingData): Promise<number> {
    const response = await request.post(
        'https://restful-booker.herokuapp.com/booking',
        {
            data: booking,
        },
    );

    if (response.status() !== 200) {
        throw new Error(
            `Booking creation failed. Status: ${response.status()}`,
        );
    }

    const body = await response.json();
    return body.bookingid;
}