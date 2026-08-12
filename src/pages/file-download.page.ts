import { Download, Locator, Page } from "@playwright/test";

export class FileDownloadPage {
    readonly page: Page;
    readonly downloadLinks: Locator;

    constructor(page: Page) {
        this.page = page;
        this.downloadLinks = page.locator('.example a');
    }

    async open(): Promise<void> {
        await this.page.goto('/download');
    }

    async downloadTargetFile(fileName: string): Promise<Download> {
        const link = this.page.getByRole('link', { name: fileName });

        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            link.click(),
        ]);

        return download;
    }

    async getFirstDownloadFileName(): Promise<string> {
        const fileName = await this.downloadLinks
            .first()
            .textContent();

        if (!fileName) {
            throw new Error('No download link was found.');
        }

        return fileName;
    }
}