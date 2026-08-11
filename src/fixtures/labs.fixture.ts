import { FileUploadPage } from "@pages/fileUpload.page";
import { JavascriptAlertsPage } from "@pages/javascript-alerts.page";
import { test as base, expect } from "@playwright/test";

type LabFixtures = {
    jsAlertsPage: JavascriptAlertsPage;
    fileUploadPage: FileUploadPage;
};

export const test = base.extend<LabFixtures>({
    jsAlertsPage: async ({ page }, use) => {
        const jsPage = new JavascriptAlertsPage(page);
        await jsPage.open();
        await use(jsPage);
        await jsPage.page.close();
    },

    fileUploadPage: async ({ page }, use) => {
        const uploadPage = new FileUploadPage(page);
        await uploadPage.open();
        await use(uploadPage);
        await uploadPage.page.close();
    },
});

export { expect };
