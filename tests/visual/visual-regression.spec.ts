import { test, expect } from '@playwright/test';

test.describe('Visual Regression Testing', () => {
    test('LAB-11-001 - should match the page screenshot', async ({ page }) => {
        await page.setContent(`
            <!DOCTYPE html>
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 40px;
                        }

                        .card {
                            width: 400px;
                            padding: 24px;
                            border: 1px solid #ddd;
                            border-radius: 8px;
                        }

                        h1 {
                            margin-top: 0;
                        }
                    </style>
                </head>

                <body>
                    <div class="card">
                        <h1>Booking Search</h1>
                        <p>
                            Search for an existing booking.
                        </p>
                        <button>
                            Search
                        </button>
                    </div>
                </body>
            </html>
        `);

        await expect(page).toHaveScreenshot('booking-search-page.png');
    });

    test('LAB-11-002 - should match the booking card screenshot', async ({ page }) => {
        await page.setContent(`
        <!DOCTYPE html>
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 40px;
                    }

                    .card {
                        width: 400px;
                        padding: 24px;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                    }

                    .title {
                        font-size: 24px;
                        margin-bottom: 12px;
                    }
                </style>
            </head>

            <body>
                <div class="card">
                    <div class="title">
                        Booking #123
                    </div>

                    <p>
                        Fernando QA
                    </p>
                </div>
            </body>
        </html>
    `);

        const card = page.locator('.card');

        await expect(card).toHaveScreenshot('booking-card.png');

        //* To disable animations to avoid snapshot failures
        // await expect(page).toHaveScreenshot(
        //     'page.png',
        //     {
        //         animations: 'disabled',
        //     },
        // );

        //* To take a screenshot of the full page even the viewport is smaller than the full page
        // await expect(page).toHaveScreenshot(
        //     'booking-page.png',
        //     {
        //         fullPage: true,
        //     },
        // );
    });

    test('LAB-11-003 - should allow a controlled visual tolerance', async ({ page }) => {
        await page.setContent(`
        <div
            style="
                padding: 40px;
                font-family: Arial;
            "
        >
            Visual Regression Test
        </div>
    `);

        await expect(page).toHaveScreenshot('tolerant-page.png', {
            animations: 'disabled',
            maxDiffPixels: 20,
        });

        await expect(page).toHaveScreenshot('tolerant-page.png', {
            stylePath: 'tests/visual/hide-dynamic.css',
        });
    });

    test('LAB-11-004 - should validate both behavior and appearance', async ({ page }) => {
        await page.setContent(`
        <button id="search">
            Search Booking
        </button>
    `);

        const button = page.locator('#search');

        await expect(button).toBeVisible();

        await expect(button).toHaveText('Search Booking');

        await expect(button).toHaveScreenshot('search-button.png');
    });

    test('LAB-11-005 - should validate button visual states', async ({ page }) => {
        await page.setContent(`
        <style>
            button {
                padding: 10px 20px;
            }
        </style>

        <button id="search">
            Search
        </button>
    `);

        const button = page.locator('#search');

        await expect(button).toHaveScreenshot('search-button-default.png');

        await button.hover();

        await expect(button).toHaveScreenshot('search-button-hover.png');
    });
});
