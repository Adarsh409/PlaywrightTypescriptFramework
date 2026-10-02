import { Page,Locator } from '@playwright/test'

export abstract class BasePage
{
    protected readonly page: Page;
    private readonly accountName:Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.accountName = page.locator("#menu");
    }

    protected async waitForPageLoad()
    {
        await this.page.waitForLoadState("domcontentloaded");
    }

    

    async setCartId(cartId: string, quantity: number): Promise<void>
    {
        await this.page.evaluate((cart) => {
            sessionStorage.setItem('cart_id', cart.id);
            sessionStorage.setItem('cart_quantity', String(cart.quantity));
        }, { id: cartId, quantity });
        await this.page.reload();
        await this.waitForPageLoad();
    }
}
