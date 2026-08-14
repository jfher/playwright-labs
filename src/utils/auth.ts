import { Environment } from "@config/Environment";

export async function login(): Promise<string> {
    const authResponse = await fetch(`${Environment.RESTFUL_BOOKER_BASE_URL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: Environment.RESTFUL_USERNAME,
            password: Environment.RESTFUL_PASSWORD,
        }),
    });

    const { token } = await authResponse.json();

    return token as string;
}