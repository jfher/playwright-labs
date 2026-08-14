import { FileUploadPage } from '@pages/file-upload.page';
import { FileDownloadPage } from '@pages/file-download.page';
import { JavascriptAlertsPage } from '@pages/javascript-alerts.page';
import { test as base, expect } from '@playwright/test';
import { IframePage } from '@pages/iframe.page';
import MultipleWindowsPage from '@pages/multiple-windows.page';
import { BasicAuthPage } from '@pages/basic-auth.page';
import { LoginPage } from '@pages/login.page';
import { SecurePage } from '@pages/secure.page';
import { StoragePage } from '@pages/storage.page';
import { NetworkPage } from '@pages/network.page';

type LabFixtures = {
    jsAlertsPage: JavascriptAlertsPage;
    fileUploadPage: FileUploadPage;
    fileDownloadPage: FileDownloadPage;
    iframePage: IframePage;
    multipleWindowsPage: MultipleWindowsPage;
    basicAuthPage: BasicAuthPage;
    loginPage: LoginPage;
    securePage: SecurePage;
    storagePage: StoragePage;
    networkPage: NetworkPage;
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
    },

    iframePage: async ({ page }, use) => {
        const iframePage = new IframePage(page);
        await iframePage.open();
        await use(iframePage);
        await iframePage.page.close();
    },

    multipleWindowsPage: async ({ page }, use) => {
        const multipleWindowsPage = new MultipleWindowsPage(page);
        await multipleWindowsPage.open();
        await use(multipleWindowsPage);
        await multipleWindowsPage.page.close();
    },

    basicAuthPage: async ({ page }, use) => {
        const basicAuthPage = new BasicAuthPage(page);
        await basicAuthPage.open();
        await use(basicAuthPage);
        await basicAuthPage.page.close();
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await use(loginPage);
        await loginPage.page.close();
    },

    securePage: async ({ page }, use) => {
        const securePage = new SecurePage(page);
        await use(securePage);
    },

    storagePage: async ({ page }, use) => {
        const storagePage = new StoragePage(page);
        await storagePage.open();
        await use(storagePage);
        await storagePage.page.close();
    },

    networkPage: async ({ page }, use) => {
        const networkPage = new NetworkPage(page);
        await networkPage.open();
        await use(networkPage);
        await networkPage.page.close();
    },
});

export { expect };
