import { Environment } from '@config/Environment';
import { APIRequestContext } from '@playwright/test';

export interface AuthData {
    username: string;
    password: string;
}

export async function loginAuth(request: APIRequestContext): Promise<string> {
    const response = await request.post(
        `${Environment.RESTFUL_BOOKER_BASE_URL}/auth`,
        {
            data: {
                username: Environment.RESTFUL_USERNAME,
                password: Environment.RESTFUL_PASSWORD,
            },
        },
    );

    if (response.status() !== 200) {
        throw new Error(
            `Login failed. Status: ${response.status()}`,
        );
    }

    const { token } = await response.json();
    return token as string;
}