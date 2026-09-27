import {test,expect} from '../src/fixtures/base'
import { HomePage } from '../src/pages/HomePage'
import product from './data/product.json'

test("", async({page}) => {
    const homePage = new HomePage(page);
    await homePage.loadApplication();
    const purchaseItems = product.purchaseItems;
    for(let i = 0;i<purchaseItems.length;i++)
    {
        let item = purchaseItems[i]
        await homePage.searchProduct(item.searchText);
        await expect(await homePage.getSearchResultMessage()).not.toHaveText(`0 products found for '${item.searchText}'`);
        const productDetailsPage = await homePage.selectProduct(item.productName);
        await productDetailsPage.addProductToCart(item.count);
        
        if(i != purchaseItems.length - 1)
        {
            await page.goBack();
        }
    }
    await page.pause();
    
})