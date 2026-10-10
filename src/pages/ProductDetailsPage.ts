import{Page,Locator} from '@playwright/test'
export class ProductDetailsPage
{
    private readonly addToCartButton:Locator;
    private readonly addQuantityButton:Locator;
    private readonly alertMsg:Locator;
    private readonly outOfStockMessage:Locator;
    constructor(page:Page)
    {
        this.addToCartButton = page.getByRole("button",{name:"Add to cart"});
        this.addQuantityButton = page.getByRole("button",{name:"Increase quantity"})
        this.alertMsg = page.getByRole("alert");
        this.outOfStockMessage = page.getByTestId("out-of-stock");
    }

    async clickAddToCartButton()
    {
        await this.addToCartButton.click();
    }

    async addQuantity(count:number)
    {
        while(count != 1)
        {
            await this.addQuantityButton.click();
            count--;
        }
    }

    async addProductToCart(quantity:number)
    {
        await this.addQuantity(quantity);
        await this.clickAddToCartButton();
    }

    async getAlertMsg()
    {
        return this.alertMsg;
    }

    async getOutOfStockMessage()
    {
        return this.outOfStockMessage;
    }
}
