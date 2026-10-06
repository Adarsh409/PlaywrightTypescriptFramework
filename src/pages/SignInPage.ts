import{Page,Locator} from '@playwright/test';
import {BasePage} from './BasePage'
import {AccountPage} from './AccountPage';
export class SignInPage extends BasePage
{
    private readonly emailField:Locator;
    private readonly passwordField:Locator;
    private readonly loginButton:Locator;
    constructor(page:Page)
    {
        super(page);
        this.emailField = page.getByPlaceholder("Your email");
        this.passwordField = page.getByPlaceholder("Your password");
        this.loginButton = page.getByRole("button",{name:"Login"});

    }

    async enterEmail(email:string)
    {
        await this.emailField.fill(email);
    }

    async enterPassword(password:string)
    {
        await this.passwordField.fill(password);
    }

    async login(email:string,password:string):Promise<AccountPage>
    {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.loginButton.click();
        await this.page.waitForURL('**/account');
        return new AccountPage(this.page);
    }
}