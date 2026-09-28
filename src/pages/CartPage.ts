import{Page,Locator,expect} from '@playwright/test';
import {BasePage} from '../pages/BasePage'
export class CartPage extends BasePage{

    constructor(page:Page)
    {
        super(page);
    }


    async getProductInfoInCart()
    {
        const productRows = this.page.getByRole('table').getByRole('row').filter({has: this.page.getByTestId("product-title")});
        //await expect(productRows.first()).toBeVisible();
        const products = await productRows.all();
        console.log(products.length)
        const cartData: Record<string,{'quantity':string,'price':string,'total':string}>={};
        for(let product of products)
        {
            let productName:string = await product.getByTestId('product-title').textContent() ?? '';
            let productQuantity:string = await product.getByTestId('product-quantity').inputValue();
            let productPrice:string = await product.getByTestId('product-price').textContent() ?? '';
            let productTotalPrice:string = await product.getByTestId('line-price').textContent() ?? '';
            cartData[productName.trim()] = {
                'quantity':productQuantity.trim(),
                'price':productPrice.trim(),
                'total':productTotalPrice.trim()
            }
            console.table(cartData)

        }
    }
}