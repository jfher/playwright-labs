import { test as base } from '@playwright/test';

type TestFixtures = {
    testResource: string;
};

export const test = base.extend<TestFixtures>({
    testResource: async ({}, use) => {
        console.log('SETUP: creating resource');

        const resource = 'temporary-resource';

        await use(resource);

        console.log('TEARDOWN: cleaning resource');
    },
});

export { expect } from '@playwright/test';
