import { APIRequestContext, expect } from '@playwright/test';

export class ApiUtils
{
    private readonly request: APIRequestContext;
    private readonly baseUrl = 'https://api.practicesoftwaretesting.com';

    constructor(request: APIRequestContext)
    {
        this.request = request;
    }



    async getProductIdByName(productName: string): Promise<string>
    {
        const response = await this.request.get(`${this.baseUrl}/products/search`, {
            params: { q: productName }
        });
        expect(response.ok(), `Failed to search for product '${productName}': ${response.status()}`).toBeTruthy();
        const body = await response.json();
        const product = body.data.find((p: { name: string }) => p.name === productName);
        expect(product, `Product '${productName}' not found in search results`).toBeDefined();
        return product.id;
    }

    async createCart(): Promise<string>
    {
        const response = await this.request.post(`${this.baseUrl}/carts`);
        expect(response.ok(), `Failed to create cart: ${response.status()}`).toBeTruthy();
        const body = await response.json();
        return body.id;
    }

    async addProductToCart(cartId: string, productId: string, quantity: number): Promise<void>
    {
        const response = await this.request.post(`${this.baseUrl}/carts/${cartId}`, {
            data: { product_id: productId, quantity:quantity }
        });
        expect(response.ok(), `Failed to add product ${productId} to cart ${cartId}: ${response.status()}`).toBeTruthy();
    }
}
