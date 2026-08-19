import { test, expect } from '../fixtures/authenticated.fixture';
import path from 'path';

test.describe('LAB-18 - Fixture Composition', () => {
    test('LAB-18-001 - should use a composed authenticated fixture', async ({ authenticatedPage }) => {
        const dashboardFilePath = path.resolve(__dirname, '../../src/pages/lab-pages/dashboard-fixture.html');
        await authenticatedPage.goto(`file://${dashboardFilePath}`);
        await expect(authenticatedPage.locator('#title')).toHaveText('Dashboard');
    });
});
