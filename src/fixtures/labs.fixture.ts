import { FileUploadPage } from "@pages/file-upload.page";
import { FileDownloadPage } from "@pages/file-download.page";
import { JavascriptAlertsPage } from "@pages/javascript-alerts.page";
import { test as base, expect } from "@playwright/test";

type LabFixtures = {
    jsAlertsPage: JavascriptAlertsPage;
    fileUploadPage: FileUploadPage;
    fileDownloadPage: FileDownloadPage;
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

    fileDownloadPage: async ({ page }, use) => {
        const downloadFilePage = new FileDownloadPage(page);
        await downloadFilePage.open();
        await use(downloadFilePage);
        await downloadFilePage.page.close();
    }
});

export { expect };
