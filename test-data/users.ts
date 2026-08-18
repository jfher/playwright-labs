export const validUser = {
    name: 'Noe',
    email: 'noe@test.com',
    role: 'qa',
};

export const users = [
    {
        name: 'Marcus',
        email: 'marcus@test.com',
        role: 'qa',
    },
    {
        name: 'Ana',
        email: 'ana@test.com',
        role: 'developer',
    },
    {
        name: 'Carlos',
        email: 'carlos@test.com',
        role: 'manager',
    },
];

export const registrationCasesNoParametrized = [
    {
        name: 'Mario',
        email: 'mario@test.com',
        role: 'qa',
        expected: 'Registration successful',
    },
    {
        name: 'Ana',
        email: 'invalid-email',
        role: 'qa',
        expected: 'Invalid email',
    },
];

type RegistrationCase = {
    name: string;
    email: string;
    role: string;
    expected: string;
};

export const registrationCases: RegistrationCase[] = [
    {
        name: 'Mario',
        email: 'mario@test.com',
        role: 'qa',
        expected: 'Registration successful',
    },
    {
        name: 'Ana',
        email: 'invalid-email',
        role: 'qa',
        expected: 'Invalid email',
    },
];
