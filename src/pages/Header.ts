import { Page, Locator } from '@playwright/test'
import { HomePage } from './HomePage';
import {CartPage} from '../pages/CartPage';


export class Header
{
    private readonly page: Page;
    private readonly homeLink: Locator;
    private readonly cartLink: Locator;
    constructor(page: Page)
    {
        this.page = page;
        this.homeLink = page.getByRole("link", { name: "Home" });
       this.cartLink = page.getByRole("link",{name:"cart"})
    }

    private async waitForPageLoad()
    {
        await this.page.waitForLoadState('networkidle');
    }

    async navigateToHomePage():Promise<HomePage>
    {
        await this.homeLink.click();
        await this.waitForPageLoad();
        return new HomePage(this.page);
    }

    async navigateToCartPage():Promise<CartPage>
    {
        await this.cartLink.click();
        await this.waitForPageLoad();
        return new CartPage(this.page);

    }

   
}
