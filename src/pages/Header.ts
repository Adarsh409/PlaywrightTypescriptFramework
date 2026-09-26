import { Page, Locator } from '@playwright/test'
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';

export class Header
{
    private readonly page: Page;
    private readonly homeLink: Locator;
    private readonly signInLink: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.homeLink = page.getByRole("link", { name: "Home" });
        this.signInLink = page.getByRole("link", { name: "Sign in" });
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

    async navigateToLoginPage():Promise<LoginPage>
    {
        await this.signInLink.click();
        await this.waitForPageLoad();
        return new LoginPage(this.page);
    }
}
