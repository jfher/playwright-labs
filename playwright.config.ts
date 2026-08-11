import { defineConfig, devices } from "@playwright/test";
import { Environment } from "@config/Environment";

export default defineConfig({
    testDir: "./tests",

    timeout: Environment.DEFAULT_TIMEOUT,

    expect: { timeout: Environment.EXPECT_TIMEOUT },

    fullyParallel: true,

    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,

    reporter: [["list"], ["html", { open: "never" }]],

    use: {
        baseURL: Environment.BASE_URL,
        headless: Environment.HEADLESS,
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        actionTimeout: Environment.DEFAULT_TIMEOUT,
    },

    projects: [
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
            },
        },
    ],
});
