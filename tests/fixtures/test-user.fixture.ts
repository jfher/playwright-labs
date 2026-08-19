import { test as base } from '@playwright/test';

type TestUser = {
    id: number;
    username: string;
};

type UserFixtures = {
    testUser: TestUser;
};

export const test = base.extend<UserFixtures>({
    testUser: async ({}, use) => {
        console.log('SETUP: creating test user');

        const testUser: TestUser = {
            id: Date.now(),
            username: `test-user-${Date.now()}`,
        };

        await use(testUser);

        console.log(`TEARDOWN: deleting user ${testUser.username}`);
    },
});

export { expect } from '@playwright/test';
