import { test, expect } from "@fixtures/labs.fixture";
import path from 'node:path';
import fs from 'node:fs/promises';

test.describe('File Download', () => {
    test('LAB-03-001 should download a file', async ({ fileDownloadPage }) => {

        const fileName = await fileDownloadPage.getFirstDownloadFileName();

        const download = await fileDownloadPage.downloadTargetFile(fileName);

        expect(download.suggestedFilename()).toBe(fileName);
    });

    test('LAB-03-002 - should save the downloaded file', async ({ fileDownloadPage }, testInfo) => {

        const fileName = await fileDownloadPage.getFirstDownloadFileName();

        const download = await fileDownloadPage.downloadTargetFile(fileName);

        const downloadPath = path.join(
            testInfo.outputDir,
            download.suggestedFilename(),
        );

        await download.saveAs(downloadPath);

        await fs.access(downloadPath);

        expect(download.suggestedFilename()).toBe(fileName);
    });


    test('LAB-03-003 - should validate downloaded file content', async ({ fileDownloadPage }, testInfo) => {
        const fileName = await fileDownloadPage.getFirstDownloadFileName();

        const download = await fileDownloadPage.downloadTargetFile(fileName);

        const downloadPath = path.join(
            testInfo.outputDir,
            download.suggestedFilename(),
        );

        await download.saveAs(downloadPath);

        const content = await fs.readFile(
            downloadPath,
            'utf-8',
        );

        expect(content.length).toBeGreaterThan(0);
    });
})