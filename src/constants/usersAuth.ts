import { Environment } from '@config/Environment';

export const usersAuth = {
    ADMIN: {
        username: 'admin',
        password: 'admin',
    },
    USER: {
        username: 'tomsmith',
        password: 'SuperSecretPassword!',
    },
    RESTFUL_USER: {
        username: Environment.RESTFUL_USERNAME,
        password: Environment.RESTFUL_PASSWORD,
    },
};
