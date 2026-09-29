import{Page,Locator} from '@playwright/test';
import {BasePage} from '../pages/BasePage'
export class CartPage extends BasePage{
    private readonly productRows:Locator;
    private readonly productName:Locator;
    private readonly productQuantity:Locator;
    private readonly productPrice:Locator;
    private readonly productTotalPrice:Locator;

    constructor(page:Page)
    {
        super(page);
        this.productRows = page.getByRole('table').getByRole('row').filter({has: this.page.getByTestId("product-title")});
        this.productName = page.getByTestId('product-title');
        this.productQuantity = page.getByTestId('product-quantity');
        this.productPrice = page.getByTestId('product-price');
        this.productTotalPrice = page.getByTestId('line-price')
    }

    async isProductRowsVisible():Promise<boolean>
    {
         return await this.productRows.first().isEnabled();
    }


    async getProductInfoInCart()
    {
        const products = await this.productRows.all();
        console.log(products.length)
        const cartData: Record<string,{'quantity':string,'price':string,'total':string}>={};
        for(let product of products)
        {
            let productName:string = await product.locator(this.productName).textContent() ?? '';
            let productQuantity:string = await product.locator(this.productQuantity).inputValue();
            let productPrice:string = await product.locator(this.productPrice).textContent() ?? '';
            let productTotalPrice:string = await product.locator(this.productTotalPrice).textContent() ?? '';
            cartData[productName.trim()] = {
                'quantity':productQuantity.trim(),
                'price':productPrice.trim(),
                'total':productTotalPrice.trim()
            }
            

        }
        
        return cartData;
    }
}