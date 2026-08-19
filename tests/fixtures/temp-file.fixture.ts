import { test as base } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

type FileFixtures = {
    tempFilePath: string;
};

export const test = base.extend<FileFixtures>({
    tempFilePath: async ({}, use) => {
        const filePath = path.resolve('test-results', `temp-${Date.now()}.txt`);

        console.log(`SETUP: creating ${filePath}`);

        await fs.mkdir(path.dirname(filePath), { recursive: true });

        await fs.writeFile(filePath, 'LAB-19 temporary file');

        await use(filePath);

        console.log(`TEARDOWN: deleting ${filePath}`);

        await fs.rm(filePath, {
            force: true,
        });
    },
});

export { expect } from '@playwright/test';
