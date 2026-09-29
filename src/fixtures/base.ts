import { test as base, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';


type PageFixture = {
    cartPage : CartPage;
}
export const test = base.extend<PageFixture>({
    cartPage: async({page},use)=>
    {
        const homePage = new HomePage(page);
        await homePage.loadApplication();
        const cartPage = await homePage.header.navigateToCartPage();
        await use(cartPage)
    }
});
export{expect}