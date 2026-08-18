import { randomUUID } from 'node:crypto';

export type User = {
    name: string;
    email: string;
    role: string;
};

export function createUser(overrides: Partial<User> = {}): User {
    const id = randomUUID();

    return {
        name: `User ${id}`,
        email: `user-${id}@test.com`,
        role: 'qa',
        ...overrides,
    };
}
