import{Page,Locator} from '@playwright/test'
export class ProductDetailsPage
{
    private readonly addToCartButton:Locator;
    private readonly addQuantityButton:Locator;
    private readonly alertMsg:Locator;
    constructor(page:Page)
    {
        this.addToCartButton = page.getByRole("button",{name:"Add to cart"});
        this.addQuantityButton = page.getByRole("button",{name:"Increase quantity"})
        this.alertMsg = page.getByRole("alert");
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
}