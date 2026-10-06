import { Page, Locator,expect } from '@playwright/test'
import { HomePage } from './HomePage';
import {CartPage} from '../pages/CartPage';
import {SignInPage} from './SignInPage';


export class Header
{
    private readonly page: Page;
    private readonly homeLink: Locator;
    private readonly cartLink: Locator;
    private readonly cartQuantity: Locator;
    private readonly signInLink: Locator;
    constructor(page: Page)
    {
        this.page = page;
        this.homeLink = page.getByRole("link", { name: "Home" });
       this.cartLink = page.getByRole("link",{name:"cart"})
       this.signInLink = page.getByRole("link",{name:"Sign in"})
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

    async navigateToSignInPage():Promise<SignInPage>
    {
        await this.signInLink.click();
        await this.waitForPageLoad();
        return new SignInPage(this.page);
    }

    async navigateToCartPage():Promise<CartPage>
    {
        await this.cartLink.click();
        await this.page.waitForURL('**/checkout');
        await this.waitForPageLoad();
        return new CartPage(this.page);
    }

   
}
