import { FileDownloadPage } from "@pages/file-download.page";
import { JavascriptAlertsPage } from "@pages/javascript-alerts.page";
import { test as base, expect } from "@playwright/test";

type LabFixtures = {
    jsAlertsPage: JavascriptAlertsPage;
    fileDownloadPage: FileDownloadPage;
};

export const test = base.extend<LabFixtures>({
    jsAlertsPage: async ({ page }, use) => {
        const jsPage = new JavascriptAlertsPage(page);
        await jsPage.open();
        await use(jsPage);
        await jsPage.page.close();
    },
    fileDownloadPage: async ({ page }, use) => {
        const downloadFilePage = new FileDownloadPage(page);
        await downloadFilePage.open();
        await use(downloadFilePage);
        await downloadFilePage.page.close();
    }

});

export { expect };
