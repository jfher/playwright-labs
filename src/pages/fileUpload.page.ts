import { Locator, Page } from "@playwright/test";

export class FileUploadPage {
    readonly page: Page;

    readonly fileInput: Locator;
    readonly fileDnDInput: Locator;
    readonly uploadButton: Locator;
    readonly uploadedFiles: Locator;
    readonly uploadedDnDFiles: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fileInput = page.locator("#file-upload");
        this.fileDnDInput = page.locator("#drag-drop-upload");
        this.uploadButton = page.locator("#file-submit");
        this.uploadedFiles = page.locator("#uploaded-files");
        this.uploadedDnDFiles = page.locator("span[data-dz-name]").first();
    }

    async open() {
        this.page.goto('/upload')
    }

    async uploadFile(filePath: string) {
        await this.fileInput.setInputFiles(filePath);
    }

    async uploadFileDnD(filePath: string) {
        await this.fileDnDInput.drop({ files: filePath });
    }

    async submitFile() {
        await this.uploadButton.click();
    }
}