import { Locator, Page } from '@playwright/test';

export class BookingPage {
    readonly page: Page;

    readonly bookingIdInput: Locator;
    readonly searchButton: Locator;
    readonly bookingResult: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bookingIdInput = page.locator('#booking-id');
        this.searchButton = page.locator('#search-booking');
        this.bookingResult = page.locator('#booking-result');
        this.errorMessage = page.locator('#error-message');
    }

    async open(): Promise<void> {
        await this.page.setContent(`
            <!DOCTYPE html>
            <html>
                <body>
                    <h1>Booking Search</h1>

                    <input
                        id="booking-id"
                        type="number"
                        placeholder="Booking ID"
                    />

                    <button id="search-booking">
                        Search
                    </button>

                    <div id="booking-result"></div>

                    <div id="error-message"></div>

                    <script>
                        document
                            .querySelector('#search-booking')
                            .addEventListener(
                                'click',
                                async () => {
                                    const id =
                                        document
                                            .querySelector(
                                                '#booking-id',
                                            )
                                            .value;

                                    try {
                                        const response =
                                            await fetch(
                                                'https://restful-booker.herokuapp.com/booking/' +
                                                    id,
                                            );

                                        if (!response.ok) {
                                            document
                                                .querySelector(
                                                    '#error-message',
                                                )
                                                .textContent =
                                                    'Booking not found';

                                            return;
                                        }

                                        const booking =
                                            await response.json();

                                        document
                                            .querySelector(
                                                '#booking-result',
                                            )
                                            .textContent =
                                                booking.firstname +
                                                ' ' +
                                                booking.lastname;
                                    } catch {
                                        document
                                            .querySelector(
                                                '#error-message',
                                            )
                                            .textContent =
                                                'Unable to retrieve booking';
                                    }
                                },
                            );
                    </script>
                </body>
            </html>
        `);
    }

    async searchBooking(bookingId: number): Promise<void> {
        await this.bookingIdInput.fill(bookingId.toString());
        await this.searchButton.click();
    }

    async getBookingResult(): Promise<string> {
        return ((await this.bookingResult.textContent()) ?? '');
    }

    async getErrorMessage(): Promise<string> {
        return ((await this.errorMessage.textContent()) ?? '');
    }
}