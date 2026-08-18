import { Page } from '@playwright/test';

export async function loadResponsivePage(page: Page) {
    await page.setContent(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta name="viewport"
                  content="width=device-width,
                  initial-scale=1.0">

            <title>Responsive Booking</title>

            <style>
                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    font-family: Arial, sans-serif;
                }

                header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                    border-bottom: 1px solid #ddd;
                }

                nav {
                    display: flex;
                    gap: 20px;
                }

                #menu-button {
                    display: none;
                }

                main {
                    padding: 40px;
                }

                .cards {
                    display: grid;
                    grid-template-columns:
                        repeat(3, 1fr);
                    gap: 20px;
                }

                .card {
                    padding: 20px;
                    border: 1px solid #ddd;
                }

                @media (max-width: 768px) {
                    nav {
                        display: none;
                    }

                    #menu-button {
                        display: block;
                    }

                    main {
                        padding: 20px;
                    }

                    .cards {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        </head>

        <body>
            <header>
                <strong>Booking App</strong>

                <nav>
                    <a href="#">Home</a>
                    <a href="#">Bookings</a>
                    <a href="#">Profile</a>
                </nav>

                <button id="menu-button">
                    Menu
                </button>
            </header>

            <main>
                <h1>Bookings</h1>

                <section class="cards">
                    <article class="card">
                        Booking 1
                    </article>

                    <article class="card">
                        Booking 2
                    </article>

                    <article class="card">
                        Booking 3
                    </article>
                </section>
            </main>
        </body>
        </html>
    `);
}
