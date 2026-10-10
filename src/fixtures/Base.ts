import { test as base, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';
import { SignInPage } from '../pages/SignInPage';
import product from '../../tests/data/product.json';
import validationText from '../../tests/constants/validation-text.json';

type PurchaseItem = typeof product.purchaseList1[number];

type PageFixture = {
    cartPage : CartPage;
    signInPage: SignInPage;
    cartWithProducts: { cartPage: CartPage; purchaseItems: PurchaseItem[] };
}
export const test = base.extend<PageFixture>({
    cartPage: async({page},use)=>
    {
        const homePage = new HomePage(page);
        await homePage.loadApplication();
        const cartPage = await homePage.header.navigateToCartPage();
        await use(cartPage)
    },

    signInPage: async({page},use)=>
    {
        const homePage = new HomePage(page);
        await homePage.loadApplication();
        const signInPage = await homePage.header.navigateToSignInPage();
        await use(signInPage);
    },

    cartWithProducts: async({page},use)=>
    {
        const homePage = new HomePage(page);
        await homePage.loadApplication();
        const purchaseItems = product.purchaseList1;
        let itemCount = 0;

        for(let item of purchaseItems)
        {
            await homePage.searchProduct(item.searchText);
            await expect(await homePage.getSearchResultMessage()).not.toHaveText(`0 products found for '${item.searchText}'`);
            const productDetailsPage = await homePage.selectProduct(item.productName);
            await productDetailsPage.addProductToCart(item.count);
            await expect.soft(await productDetailsPage.getAlertMsg()).toHaveText(validationText.product.addToCartSuccess)
            itemCount = itemCount + Number(item.count);
            await page.goBack();
            await expect(await homePage.header.getCartQuantity()).toHaveText(String(itemCount));
        }

        const cartPage = await homePage.header.navigateToCartPage();
        await use({ cartPage, purchaseItems });
    }
});
export{expect}