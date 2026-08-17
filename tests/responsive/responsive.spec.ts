import { test, expect, devices } from '@playwright/test';
import { loadResponsivePage } from '@utils/responsive-mocked-page';

test.describe('Responsive Page Tests', () => {
    test('LAB-14-001 - should display desktop navigation', async ({
        page,
    }) => {
        await page.setViewportSize({
            width: 1280,
            height: 720,
        });

        await loadResponsivePage(page);

        await expect(page.locator('nav')).toBeVisible();
        await expect(page.locator('#menu-button')).toBeHidden();
    });

    test('LAB-14-002 - should display mobile navigation', async ({ page }) => {
        await page.setViewportSize({
            width: 390,
            height: 844,
        });

        await loadResponsivePage(page);

        await expect(page.locator('nav')).toBeHidden();
        await expect(page.locator('#menu-button')).toBeVisible();
    });

    test('LAB-14-003 - should stack cards on mobile', async ({ page }) => {
        await page.setViewportSize({
            width: 390,
            height: 844,
        });

        await loadResponsivePage(page);

        const cards = page.locator('.card');

        await expect(cards).toHaveCount(3);

        const first = await cards.nth(0).boundingBox();
        const second = await cards.nth(1).boundingBox();

        expect(first).not.toBeNull();
        expect(second).not.toBeNull();
        expect(second!.y).toBeGreaterThan(first!.y);
    });

    test('LAB-14-006 - should support landscape orientation', async ({ page }) => {
        await page.setViewportSize({
            width: 844,
            height: 390,
        });

        await loadResponsivePage(page);

        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('.cards')).toBeVisible();
    });

    test('LAB-14-007 - should switch layout at the breakpoint', async ({ page }) => {
        await page.setViewportSize({
            width: 768,
            height: 720,
        });

        await loadResponsivePage(page);

        await expect(
            page.locator('#menu-button'),
        ).toBeVisible();

        await page.setViewportSize({
            width: 769,
            height: 720,
        });

        await expect(page.locator('#menu-button')).toBeHidden();
        await expect(page.locator('nav')).toBeVisible();
    });

    test('LAB-14-008 - should match mobile layout', async ({ page }) => {
        await page.setViewportSize({
            width: 390,
            height: 844,
        });

        await loadResponsivePage(page);

        await expect(page).toHaveScreenshot(
            'booking-mobile.png',
            {
                fullPage: true,
            },
        );
    });
})

test.use({
    ...devices['iPhone 13'],
});

test.describe('Mobile Device', () => {
    test('LAB-14-004 - should run using a mobile device profile', async ({ page }) => {
        await loadResponsivePage(page);

        await expect(page.locator('#menu-button')).toBeVisible();
    });
});

test.use({
    ...devices['iPhone 13'],
});

test.describe('Touch interactions', () => {
    test('LAB-14-005 - should open the mobile menu using touch', async ({ page }) => {
        await page.setContent(`
                <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta name="viewport"
                            content="width=device-width,
                            initial-scale=1.0">

                        <title>Mobile Emulation</title>
                    </head>
                    <body>
                        <button id="menu">
                            Menu
                        </button>

                        <nav
                            id="mobile-menu"
                            hidden
                        >
                            <a href="#">
                                Home
                            </a>
                        </nav>
                    </body>
        
                    <script>
                        document
                            .querySelector('#menu')
                            .addEventListener(
                                'click',
                                () => {
                                    document
                                        .querySelector(
                                            '#mobile-menu'
                                        )
                                        .hidden = !document.querySelector('#mobile-menu').hidden;
                                }
                            );
                    </script>
                    </html>
                `);
        await page.locator('#menu').tap();
        await expect(page.locator('#mobile-menu')).toBeVisible();
    });
});