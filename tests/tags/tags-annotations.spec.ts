import { test, expect } from '@playwright/test';
import { AnnotationsPage } from '@pages/annotations.page';

test.describe('Tags and Annotations', () => {
    test('LAB-23-001 - should login successfully', { tag: ['@smoke', '@authentication'] }, async ({ page }) => {
        const annotationsPage = new AnnotationsPage(page);
        await annotationsPage.open();
        await annotationsPage.login();

        await expect(annotationsPage.message).toHaveText('Login successful');
    });

    test.describe('Authentication', { tag: '@authentication' }, () => {
        test(
            'should login successfully',
            {
                tag: ['@smoke', '@critical'],
                annotation: [
                    {
                        type: 'requirement',
                        description: 'AUTH-001',
                    },
                    {
                        type: 'owner',
                        description: 'QA Team',
                    },
                ],
            },
            async ({ page }) => {
                const annotationsPage = new AnnotationsPage(page);
                await annotationsPage.open();

                await test.step('Login', async () => {
                    await annotationsPage.login();
                });

                await test.step('Verify login result', async () => {
                    await expect(annotationsPage.message).toHaveText('Login successful');
                });
            }
        );
    });
});
