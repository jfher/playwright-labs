import { JavascriptAlertsPage } from "@pages/javascript-alerts.page"
import { test as base, expect } from "@playwright/test";

type LabFixtures = {
    jsAlertsPage: JavascriptAlertsPage;
}

export const test = base.extend<LabFixtures>({
    jsAlertsPage: async ({ page }, use) => {
        await use(new JavascriptAlertsPage(page));
    }
})

export { expect };