import { FrameLocator, Locator, Page } from '@playwright/test';

export class IframePage {
    readonly page: Page;
    readonly iframe: FrameLocator;
    readonly editor: Locator;

    constructor(page: Page) {
        this.page = page;
        this.iframe = page.frameLocator('#mce_0_ifr');
        this.editor = this.iframe.locator('body');
    }

    async open() {
        await this.page.goto('/iframe');
    }

    async getEditorText(): Promise<string> {
        return (await this.editor.getByRole('paragraph').textContent()) ?? '';
    }

    async enableEditing(): Promise<void> {
        await this.editor.waitFor();

        await this.editor.evaluate((element) => {
            console.log('before:', element.getAttribute('contenteditable'));

            (element as HTMLElement).contentEditable = 'true';

            console.log('after:', element.getAttribute('contenteditable'));
        });
    }

    async fillEditor(text: string): Promise<void> {
        await this.editor.type(text);
    }
}
