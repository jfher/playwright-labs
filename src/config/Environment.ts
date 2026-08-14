import dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

function getEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Environment variable ${name} is missing.`);
    }
    return value;
}

export const Environment = {
    BASE_URL: getEnv('BASE_URL'),
    HEADLESS: Boolean(getEnv('HEADLESS')),
    DEFAULT_TIMEOUT: Number(getEnv('DEFAULT_TIMEOUT')),
    EXPECT_TIMEOUT: Number(getEnv('EXPECT_TIMEOUT')),
};
