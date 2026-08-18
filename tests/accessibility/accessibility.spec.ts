import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('Accessibility Testing', () => {
    test('LAB-12-001 - should not have automatically detectable accessibility violations', async ({ page }) => {
        await page.setContent(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <title>Booking Search</title>
                </head>

                <body>
                    <main>
                        <h1>Booking Search</h1>

                        <label for="booking-id">
                            Booking ID
                        </label>

                        <input
                            id="booking-id"
                            type="text"
                        />

                        <button>
                            Search
                        </button>
                    </main>
                </body>
            </html>
        `);

        const results = await new AxeBuilder({
            page,
        }).analyze();

        expect(results.violations).toEqual([]);
    });

    test('LAB-12-002 - should detect accessibility violations', async ({ page }) => {
        await page.setContent(`
        <html lang="en">
            <head>
                <title>Booking Search</title>
            </head>

            <body>
                <main>
                    <h1>Booking Search</h1>

                    <input
                        type="text"
                        id="booking-id"
                    />

                    <button>
                        Search
                    </button>
                </main>
            </body>
        </html>
    `);

        const results = await new AxeBuilder({
            page,
        }).analyze();

        expect(results.violations.length).toBeGreaterThan(0);
    });

    test('LAB-12-003 - should provide useful accessibility violation details', async ({ page }) => {
        await page.setContent(`
        <html lang="en">
            <head>
                <title>Booking Search</title>
            </head>

            <body>
                <main>
                    <h1>Booking Search</h1>

                    <input
                        type="text"
                        id="booking-id"
                    />

                    <button>
                        Search
                    </button>
                </main>
            </body>
        </html>
    `);

        const results = await new AxeBuilder({
            page,
        }).analyze();

        for (const violation of results.violations) {
            console.log({
                id: violation.id,
                impact: violation.impact,
                help: violation.help,
                nodes: violation.nodes.length,
            });
        }

        expect(results.violations.length).toBeGreaterThan(0);
    });

    test('LAB-12-004 - should not have critical or serious accessibility violations', async ({ page }) => {
        await page.setContent(`
        <html lang="en">
            <head>
                <title>Booking Search</title>
            </head>

            <body>
                <main>
                    <h1>Booking Search</h1>

                    <label for="booking-id">
                        Booking ID
                    </label>

                    <input
                        id="booking-id"
                        type="text"
                    />

                    <button>
                        Search
                    </button>
                </main>
            </body>
        </html>
    `);

        const results = await new AxeBuilder({
            page,
        }).analyze();

        const blockingViolations = results.violations.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious');

        expect(blockingViolations).toEqual([]);
    });

    test('LAB-12-005 - should scan only the booking form', async ({ page }) => {
        await page.setContent(`
        <html lang="en">
            <head>
                <title>Booking</title>
            </head>

            <body>
                <header>
                    Header
                </header>

                <main>
                    <section id="booking-form">
                        <h1>Booking</h1>

                        <label for="booking-id">
                            Booking ID
                        </label>

                        <input
                            id="booking-id"
                            type="text"
                        />

                        <button>
                            Search
                        </button>
                    </section>
                </main>

                <footer>
                    Footer
                </footer>
            </body>
        </html>
    `);

        const results = await new AxeBuilder({
            page,
        })
            .include('#booking-form')
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('LAB-12-006 - should validate button accessibility', async ({ page }) => {
        await page.setContent(`
        <html lang="en">
            <head>
                <title>Buttons</title>
            </head>

            <body>
                <main>
                    <button>
                        Search booking
                    </button>
                </main>
            </body>
        </html>
    `);

        const results = await new AxeBuilder({
            page,
        })
            .withRules(['button-name'])
            .analyze();

        expect(results.violations).toEqual([]);
    });

    test('LAB-12-007 - should validate functionality and accessibility', async ({ page }) => {
        await page.setContent(`
        <html lang="en">
            <head>
                <title>Booking Search</title>
            </head>

            <body>
                <main>
                    <h1>Booking Search</h1>

                    <label for="booking-id">
                        Booking ID
                    </label>

                    <input
                        id="booking-id"
                        type="text"
                    />

                    <button id="search">
                        Search booking
                    </button>
                </main>
            </body>
        </html>
    `);

        const button = page.locator('#search');

        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();

        const results = await new AxeBuilder({
            page,
        }).analyze();

        expect(results.violations).toEqual([]);
    });

    test('LAB-12-008 - should allow keyboard navigation to the search button', async ({ page }) => {
        await page.setContent(`
        <html lang="en">
            <head>
                <title>Keyboard Test</title>
            </head>

            <body>
                <main>
                    <label for="booking-id">
                        Booking ID
                    </label>

                    <input
                        id="booking-id"
                        type="text"
                    />

                    <button id="search">
                        Search
                    </button>
                </main>
            </body>
        </html>
    `);

        await page.locator('#booking-id').focus();
        await page.keyboard.press('Tab');

        await expect(page.locator('#search')).toBeFocused();
    });
});
