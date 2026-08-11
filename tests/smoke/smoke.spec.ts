import { test, expect } from "@playwright/test";

test("SMOKE-001 - application is accessible", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/The Internet/);
    await expect(page.getByRole("heading", { name: "Welcome to the-internet" })).toBeVisible();
});
