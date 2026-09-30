import {test,expect} from '../src/fixtures/base'
import { HomePage } from '../src/pages/HomePage'
import product from './data/product.json'
import validationText from '../tests/constants/validation-text.json'
import {ApiUtils} from '../src/utils/apiUtils'
test("should add multiple products to cart with correct quantities", async({page}) => {
    const homePage = new HomePage(page);
    let itemCount = 0;
    await homePage.loadApplication();
    const purchaseItems = product.purchaseList1;
    for(let i = 0;i<purchaseItems.length;i++)
    {
        let item = purchaseItems[i]
        await homePage.searchProduct(item.searchText);
        await expect(await homePage.getSearchResultMessage()).not.toHaveText(`0 products found for '${item.searchText}'`);
        const productDetailsPage = await homePage.selectProduct(item.productName);
        await productDetailsPage.addProductToCart(item.count);
        const alertMsg = await productDetailsPage.getAlertMsg();
        await expect.soft(alertMsg).toHaveText(validationText.product.addToCartSuccess)
        itemCount = itemCount + Number(item.count);
             await page.goBack();
        await expect.soft(await homePage.header.getCartQuantity()).toHaveText(String(itemCount))
       
    }
     const cartPage = await homePage.header.navigateToCartPage()
        expect(await cartPage.isProductRowsVisible()).toBeTruthy();
        const cartInfo = await cartPage.getProductInfoInCart();
        for(let item of purchaseItems)
        {
            expect.soft(cartInfo).toHaveProperty(item.productName)
            expect.soft(cartInfo[item.productName]?.quantity).toBe(String(item.count))
        }
    
    
});


test('show display the correct product prices', async({page}) =>{
    const homePage = new HomePage(page);
    await homePage.loadApplication();

    const apiUtils = new ApiUtils(page.context().request);
    const productsToAdd = product.purchaseList1;
    const cartId = await apiUtils.createCart();
    let totalQuantity = 0;

    for(let item of productsToAdd)
    {
        const productId = await apiUtils.getProductIdByName(item.productName);
        await apiUtils.addProductToCart(cartId,productId,item.count)
        totalQuantity += item.count;
    }

    await homePage.setCartId(cartId, totalQuantity);
    const cartPage = await homePage.header.navigateToCartPage();
    const cartInfo = await cartPage.getProductInfoInCart();

    let expectedGrandTotal = 0;
    for(let item of productsToAdd)
    {
        const info = cartInfo[item.productName];
        expect.soft(info).toBeDefined();
        const price = parseFloat(info.price.replace('$', ''));
        const total = parseFloat(info.total.replace('$', ''));
        expect.soft(total).toBe(Number((price * item.count).toFixed(2)));
        expectedGrandTotal += total;
    }

    const actualGrandTotal = await cartPage.getCartTotal();
    expect.soft(actualGrandTotal).toBe(Number(expectedGrandTotal.toFixed(2)));
})