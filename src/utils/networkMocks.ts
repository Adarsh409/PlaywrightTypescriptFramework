import { Page } from '@playwright/test';

const PRODUCT_DETAILS_API = /api\.practicesoftwaretesting\.com\/products\/[^/?]+$/;

export async function mockProductStock(page: Page, inStock: boolean)
{
    await page.route(PRODUCT_DETAILS_API, async route =>
    {
        const response = await route.fetch();
        const productDetails = await response.json();
        await route.fulfill({ response, json: { ...productDetails, in_stock: inStock } });
    });
}
