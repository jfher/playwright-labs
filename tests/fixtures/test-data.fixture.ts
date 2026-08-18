import { test as base, expect } from '@playwright/test';
import { createUser, User } from '@factories/user.factory';

type TestFixtures = {
    user: User;
};

export const test = base.extend<TestFixtures>({
    user: async ({}, use) => {
        const user = createUser();
        await use(user);
    },
});

export { expect };
