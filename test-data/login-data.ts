export type LoginTestData = {
    username: string;
    password: string;
    expectedMessage: string;
    scenario: string;
};

export const loginCases: LoginTestData[] = [
    {
        scenario: 'valid credentials',
        username: 'admin',
        password: '1234',
        expectedMessage: 'Login successful',
    },
    {
        scenario: 'invalid password',
        username: 'admin',
        password: 'wrong',
        expectedMessage: 'Invalid credentials',
    },
    {
        scenario: 'invalid username',
        username: 'wrong',
        password: '1234',
        expectedMessage: 'Invalid credentials',
    },
    {
        scenario: 'empty credentials',
        username: '',
        password: '',
        expectedMessage: 'Invalid credentials',
    },
];
