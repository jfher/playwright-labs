import { test, expect } from '@fixtures/labs.fixture';

test.describe('Iframe', () => {
    test('LAB-04-001 - should access content inside an iframe', async ({ iframePage }) => {
        await expect(iframePage.editor).toBeVisible();

        const editorText = await iframePage.getEditorText();

        expect(editorText).toContain('Your content goes here.');
    });

    //* This test will be skipped because the TinyMCE disabled editting based on the update plan request
    test.skip('LAB-04-002 - should fill content inside an iframe', async ({ iframePage }) => {
        const text = 'Playwright iframe test';

        await iframePage.enableEditing();

        await iframePage.fillEditor(text);

        await expect(iframePage.editor).toHaveText(text);
    });

    test('LAB-04-003.1 - should access the iframe using a locator', async ({ iframePage, page }) => {
        const iframeElement = page.locator('#mce_0_ifr');

        const frame = await iframeElement.contentFrame();

        expect(frame).not.toBeNull();
    });

    test('LAB-04-003.2 - should access the iframe using frame and a name', async ({ iframePage, page }) => {
        const frame = page.frame({
            name: 'mce_0_ifr',
        });

        expect(frame).toBeTruthy();
    });

    test('LAB-04-003.3 - should access to the iframe using an url', async ({ iframePage, page }) => {
        const frame = page.frames().find((frame) => frame.url().includes('the-internet.herokuapp.com'));

        expect(frame).toBeTruthy();
    });

    //* This test will be skipped because the TinyMCE disabled editting based on the update plan request
    test.skip('LAB-04-004 - should update the iframe editor content', async ({ iframePage }) => {
        const text = 'QA Automation with Playwright';

        await iframePage.fillEditor(text);

        await expect(iframePage.editor).toHaveText(text);
    });
});
