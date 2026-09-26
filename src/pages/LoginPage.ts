import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage';
import { MyAccountPage } from './MyAccountPage'
import { Header } from './Header'

export class LoginPage extends BasePage
{
    readonly header: Header;
    private readonly emailField:Locator;
    private readonly passwordField:Locator;
    private readonly loginButton:Locator;

    constructor(page:Page)
    {
        super(page);
        this.header = new Header(page);
        this.emailField = page.getByRole("textbox",{name:"Email address *"})
        this.passwordField = page.getByRole("textbox",{name:"Password *"})
        this.loginButton = page.getByRole("button",{name:"Login"})
    }

    async enterEmail(email:string)
    {
        await this.emailField.fill(email)
    }

    async enterPassword(password:string)
    {
        await this.passwordField.fill(password)
    }

    async clickLoginButton():Promise<MyAccountPage>
    {
        await this.loginButton.click();
        await this.waitForPageLoad();
        return new MyAccountPage(this.page);
    }

    async doLogin(email:string,password:string):Promise<MyAccountPage>
    {
        await this.enterEmail(email)
        await this.enterPassword(password)
        return await this.clickLoginButton();
    }
}
