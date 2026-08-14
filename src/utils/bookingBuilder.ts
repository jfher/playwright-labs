export interface Booking {
    firstname: string,
    lastname: string,
    totalprice: number,
    depositpaid: boolean,
    bookingdates: {
        checkin: string,
        checkout: string,
    },
    additionalneeds: string,
};

const mockedBooking = {
    firstname: 'Marcos',
    lastname: 'QA',
    totalprice: 100,
    depositpaid: true,
    bookingdates: {
        checkin: '2026-08-13',
        checkout: '2026-08-20',
    },
    additionalneeds: 'Breakfast',
}

export function createBooking(): Booking {
    return mockedBooking;
}

export function updateBooking(booking: Partial<Booking>): Booking {
    return {
        ...mockedBooking,
        ...booking,
    } as Booking
}