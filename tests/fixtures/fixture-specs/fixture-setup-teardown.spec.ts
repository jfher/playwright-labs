import { test, expect } from '../../fixtures/resource.fixture';

test.describe('LAB-19 - Fixture Setup / Teardown', () => {
    test('LAB-19-001 - should use the prepared resource', async ({ testResource }) => {
        console.log('TEST: using resource');
        expect(testResource).toBe('temporary-resource');
    });
});
