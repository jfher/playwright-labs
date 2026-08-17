import { Page } from "@playwright/test";

export async function loadBookingPage(page: Page) {
    await page.setContent(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Booking Search</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                }

                #loading,
                #error,
                #empty,
                #result {
                    display: none;
                }
            </style>
        </head>

        <body>
            <main>
                <h1>Booking Search</h1>

                <input
                    id="booking-id"
                    type="text"
                    value="123"
                />

                <button id="search">
                    Search
                </button>

                <p id="loading">
                    Loading...
                </p>

                <p id="error"></p>

                <p id="empty">
                    No booking found.
                </p>

                <section id="result">
                    <h2 id="booking-name"></h2>
                    <p id="booking-id-result"></p>
                </section>
            </main>

            <script>
                const searchButton =
                    document.querySelector('#search');

                const input =
                    document.querySelector('#booking-id');

                const loading =
                    document.querySelector('#loading');

                const error =
                    document.querySelector('#error');

                const empty =
                    document.querySelector('#empty');

                const result =
                    document.querySelector('#result');

                const name =
                    document.querySelector('#booking-name');

                const bookingId =
                    document.querySelector('#booking-id-result');

                searchButton.addEventListener(
                    'click',
                    async () => {
                        loading.style.display = 'block';
                        error.style.display = 'none';
                        empty.style.display = 'none';
                        result.style.display = 'none';

                        try {
                            const response =
                                await fetch(
                                    'https://example.com/api/bookings/' +
                                    input.value
                                );

                            if (!response.ok) {
                                throw new Error(
                                    'Request failed'
                                );
                            }

                            const booking =
                                await response.json();

                            loading.style.display = 'none';

                            if (!booking) {
                                empty.style.display =
                                    'block';

                                return;
                            }

                            name.textContent =
                                booking.firstname +
                                ' ' +
                                booking.lastname;

                            bookingId.textContent =
                                'Booking #' +
                                booking.id;

                            result.style.display =
                                'block';
                        } catch (e) {
                            loading.style.display =
                                'none';

                            error.textContent =
                                'Unable to load booking.';

                            error.style.display =
                                'block';
                        }
                    }
                );
            </script>
        </body>
        </html>
    `);
}
