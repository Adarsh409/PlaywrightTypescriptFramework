import { Page, Locator,expect } from '@playwright/test'
import { HomePage } from './HomePage';
import {CartPage} from '../pages/CartPage';


export class Header
{
    private readonly page: Page;
    private readonly homeLink: Locator;
    private readonly cartLink: Locator;
    private readonly cartQuantity: Locator;
    //readonly cartCount: Locator;
    constructor(page: Page)
    {
        this.page = page;
        this.homeLink = page.getByRole("link", { name: "Home" });
       this.cartLink = page.getByRole("link",{name:"cart"})
       //this.cartCount = this.cartLink.locator('span');
       this.cartQuantity = page.getByTestId('cart-quantity')
    }

    async getCartQuantity():Promise<Locator>
    {
        return this.cartQuantity;
    }

    private async waitForPageLoad()
    {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async navigateToHomePage():Promise<HomePage>
    {
        await this.homeLink.click();
        await this.waitForPageLoad();
        return new HomePage(this.page);
    }

    async isCartPageLinkVisible()
    {
        return this.cartLink;
    }

    async navigateToCartPage():Promise<CartPage>
    {
        await this.cartLink.click();
        await this.page.waitForURL('**/checkout');
        await this.waitForPageLoad();
        return new CartPage(this.page);
    }

   
}
