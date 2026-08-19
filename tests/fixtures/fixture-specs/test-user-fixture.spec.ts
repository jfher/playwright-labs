import { test, expect } from '../../fixtures/test-user.fixture';

test.describe('LAB-19 - Fixture Setup / Teardown', () => {
    test('LAB-19-002 - should use test user', async ({ testUser }) => {
        console.log(`Running test with ${testUser.username}`);

        expect(testUser.username).toContain('test-user-');
    });
});
