import { JavascriptAlertsPage } from "@pages/javascript-alerts.page";
import { test as base, expect } from "@playwright/test";

type LabFixtures = {
    jsAlertsPage: JavascriptAlertsPage;
};

export const test = base.extend<LabFixtures>({
    jsAlertsPage: async ({ page }, use) => {
        const jsPage = new JavascriptAlertsPage(page);
        await jsPage.open();
        await use(jsPage);
        await jsPage.page.close();
    },
});

export { expect };
