import { Locator, Page } from '@playwright/test';

export class NetworkPage {
    readonly page: Page;

    readonly productList: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productList = page.locator('#product-list');
        this.errorMessage = page.locator('#error-message');
    }

    async open(): Promise<void> {
        await this.page.setContent(`
            <!DOCTYPE html>
            <html>
                <body>
                    <h1>Products</h1>

                    <div id="product-list"></div>

                    <div id="error-message"></div>

                    <script>
                        async function loadProducts() {
                            try {
                                const response =
                                    await fetch('https://example.com/api/products');

                                if (!response.ok) {
                                    document
                                        .querySelector('#error-message')
                                        .textContent =
                                            'Unable to load products';

                                    return;
                                }

                                const products =
                                    await response.json();

                                document
                                    .querySelector('#product-list')
                                    .textContent =
                                        products
                                            .map(
                                                product =>
                                                    product.name,
                                            )
                                            .join(', ');
                            } catch {
                                document
                                    .querySelector('#error-message')
                                    .textContent =
                                        'Unable to load products';
                            }
                        }
                        loadProducts();
                    </script>
                </body>
            </html>
        `);
    }

    async getProductsText(): Promise<string> {
        return (await this.productList.textContent()) ?? '';
    }

    async getErrorMessage(): Promise<string> {
        return (await this.errorMessage.textContent()) ?? '';
    }
}
