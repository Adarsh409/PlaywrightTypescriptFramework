import{Page,Locator} from '@playwright/test';
import {BasePage} from '../pages/BasePage'
export class SignInPage extends BasePage
{
    private readonly emailField:Locator;
    private readonly passwordField:Locator;
    private readonly loginButton:Locator;
    constructor(page:Page)
    {
        super(page);
        this.emailField = page.getByRole("textbox",{name:"Your email"});
        this.passwordField = page.getByRole("textbox",{name:"Your password"});
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

    async login(email:string,password:string)
    {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.loginButton.click();
    }
}