import { test, expect } from '../../fixtures/temp-file.fixture';
import fs from 'fs/promises';

test.describe('LAB-19 - Fixture Setup / Teardown', () => {
    test('LAB-19-003 - should use temporary file', async ({ tempFilePath }) => {
        const content = await fs.readFile(tempFilePath, 'utf-8');

        expect(content).toBe('LAB-19 temporary file');
    });
});
