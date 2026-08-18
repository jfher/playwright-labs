import { Environment } from '@config/Environment';
import { test, expect } from '@playwright/test';
import { loadPerformancePage } from '@utils/performance-mocked-page';

test.describe('Performance Testing', () => {
    test('LAB-16-001 - should collect navigation timing metrics', async ({ page }) => {
        await page.goto('/');

        const navigation = await page.evaluate(() => {
            const entry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

            return {
                startTime: entry.startTime,
                responseStart: entry.responseStart,
                responseEnd: entry.responseEnd,
                domContentLoaded: entry.domContentLoadedEventEnd,
                loadEventEnd: entry.loadEventEnd,
            };
        });

        expect(navigation).toBeTruthy();
        expect(navigation.loadEventEnd).toBeGreaterThan(0);
    });

    test('LAB-16-002 - should measure page load time', async ({ page }) => {
        await page.goto('/');

        const loadTime = await page.evaluate(() => {
            const entry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

            return entry.loadEventEnd - entry.startTime;
        });

        console.log(`Page load time: ${loadTime.toFixed(2)} ms`);

        expect(loadTime).toBeGreaterThan(0);
    });

    test('LAB-16-003 - should measure a browser-side operation', async ({ page }) => {
        await page.goto('/');

        const duration = await page.evaluate(() => {
            const start = performance.now();

            for (let i = 0; i < 1_000_000; i++) {
                Math.sqrt(i);
            }

            return performance.now() - start;
        });

        console.log(`Operation duration: ${duration.toFixed(2)} ms`);

        expect(duration).toBeGreaterThan(0);
    });

    test('LAB-16-004 - should collect resource timing information', async ({ page }) => {
        await page.goto('/');

        const resources = await page.evaluate(() => {
            return performance.getEntriesByType('resource').map((entry) => {
                const resource = entry as PerformanceResourceTiming;

                return {
                    name: resource.name,
                    duration: resource.duration,
                    transferSize: resource.transferSize,
                };
            });
        });

        expect(resources.length).toBeGreaterThan(0);

        console.table(resources);
    });

    test('LAB-16-005 - should identify slow resources', async ({ page }) => {
        await page.goto('/');

        const resources = await page.evaluate(() => {
            return performance.getEntriesByType('resource').map((entry) => {
                const resource = entry as PerformanceResourceTiming;

                return {
                    name: resource.name,
                    duration: resource.duration,
                };
            });
        });

        const slowResources = resources.filter((resource) => resource.duration > 500);

        console.table(slowResources);

        expect(Array.isArray(slowResources)).toBe(true);
    });

    test('LAB-16-006 - should stay within the navigation performance budget', async ({ page }) => {
        await page.goto('/');

        const loadTime = await page.evaluate(() => {
            const entry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

            return entry.loadEventEnd - entry.startTime;
        });

        console.log(`Navigation time: ${loadTime.toFixed(2)} ms`);

        expect(loadTime).toBeLessThan(Environment.PERFORMANCE_BUDGET_MS);
    });

    test('LAB-16-007 - should measure a controlled API response time', async ({ page }) => {
        await page.route('**/api/performance', async (route) => {
            await new Promise((resolve) => setTimeout(resolve, 500));

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'Performance response',
                }),
            });
        });

        await loadPerformancePage(page);

        const start = performance.now();

        await page.locator('#load').click();

        await expect(page.locator('#result')).toHaveText('Performance response');

        const duration = performance.now() - start;

        console.log(`UI/API operation: ${duration.toFixed(2)} ms`);

        expect(duration).toBeGreaterThanOrEqual(500);
    });

    test('LAB-16-008 - should measure fetch duration', async ({ page }) => {
        await page.route('**/api/performance', async (route) => {
            await new Promise((resolve) => setTimeout(resolve, 500));

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    status: 'ok',
                }),
            });
        });

        await page.goto('/');

        const duration = await page.evaluate(async () => {
            const start = performance.now();

            await fetch('/api/performance');

            return performance.now() - start;
        });

        console.log(`Fetch duration: ${duration.toFixed(2)} ms`);

        expect(duration).toBeGreaterThanOrEqual(500);
    });

    test('LAB-16-009 - should identify the slowest resources', async ({ page }) => {
        await page.goto('/');

        const resources = await page.evaluate(() => {
            return performance.getEntriesByType('resource').map((entry) => {
                const resource = entry as PerformanceResourceTiming;

                return {
                    name: resource.name,
                    duration: resource.duration,
                };
            });
        });

        const slowest = [...resources].sort((a, b) => b.duration - a.duration).slice(0, 5);

        console.table(slowest);

        expect(slowest.length).toBeGreaterThan(0);
    });
});
