import { test, expect } from '@fixtures/labs.fixture';
import path from 'path';

test.describe('File Upload', () => {
    test('LAB-02-001 - should upload a file', async ({ fileUploadPage }) => {
        const filePath = path.join(__dirname, '../../test-data/files/example.txt');
        await fileUploadPage.uploadFile(filePath);
        await expect(fileUploadPage.fileInput).toHaveValue(/example\.txt$/);
    });

    test('LAB-02-002 - should upload a file drag and dropping on the designed area', async ({ fileUploadPage }) => {
        const filePath = path.join(__dirname, '../../test-data/files/example.txt');
        await fileUploadPage.uploadFileDnD(filePath);
        await expect(await fileUploadPage.uploadedDnDFiles.innerText()).toContain('example.txt');
    });

    test('LAB-02-003 - should upload a file and submit', async ({ fileUploadPage }) => {
        const filePath = path.join(__dirname, '../../test-data/files/example.txt');
        await fileUploadPage.uploadFile(filePath);
        await expect(fileUploadPage.fileInput).toHaveValue(/example\.txt$/);
        await fileUploadPage.submitFile();
        await expect(fileUploadPage.uploadedFiles).toHaveText('example.txt');
    });

    test('LAB-02-004 - should upload a custom file created with buffer', async ({ fileUploadPage }) => {
        await fileUploadPage.fileInput.setInputFiles({
            name: 'file1.txt',
            mimeType: 'text/plain',
            buffer: Buffer.from("Hey, this is the first file's content!")
        });
        await expect(fileUploadPage.fileInput).toHaveValue(/file1\.txt$/);
        await fileUploadPage.submitFile();
        await expect(fileUploadPage.uploadedFiles).toHaveText('file1.txt');
    });

    test('LAB-02-005 - should show an error message when form with no file attached is submitted', async ({ fileUploadPage, page }) => {
        await fileUploadPage.submitFile();
        await expect(page.getByRole('heading', { level: 1, name: 'Internal Server Error' })).toBeVisible();
        await expect(page.getByText('Internal Server Error')).toBeVisible();

    });
});
