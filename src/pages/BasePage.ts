import { Page,Locator } from '@playwright/test'

export abstract class BasePage
{
    protected readonly page: Page;
    private readonly accountName:Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.accountName = page.locator("#menu");
    }

    protected async waitForPageLoad()
    {
        await this.page.waitForLoadState('networkidle');
    }

    getAccountNameLocator():Locator
    {
        return this.accountName;
    }
}
