import { Page } from '@playwright/test';

export async function loadPerformancePage(page: Page) {
    await page.setContent(`
        <!DOCTYPE html>
        <html lang="en">
        <body>
            <h1>Performance Demo</h1>

            <button id="load">
                Load data
            </button>

            <p id="loading" hidden>
                Loading...
            </p>

            <p id="result"></p>

            <script>
                document
                    .querySelector('#load')
                    .addEventListener(
                        'click',
                        async () => {
                            const loading =
                                document
                                    .querySelector(
                                        '#loading',
                                    );

                            const result =
                                document
                                    .querySelector(
                                        '#result',
                                    );

                            loading.hidden = false;

                            const response =
                                await fetch(
                                    'https://www.example.com/api/performance',
                                );

                            const data =
                                await response.json();

                            loading.hidden = true;

                            result.textContent =
                                data.message;
                        },
                    );
            </script>
        </body>
        </html>
    `);
}
