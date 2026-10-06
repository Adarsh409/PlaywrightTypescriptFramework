import{Page,Locator} from '@playwright/test'
import { BasePage } from "./BasePage";
export class AccountPage extends BasePage
{
    private readonly pageHeading:Locator;
    private readonly favoritesPageLink: Locator;
    private readonly profilePageLink:Locator;
    private readonly invoicesPageLink:Locator;
    private readonly messagesPageLink:Locator;
    constructor(page:Page)
    {
        super(page);
        this.pageHeading = page.getByRole('heading');
        this.favoritesPageLink = page.getByRole('link',{name:"Favorites"});
        this.profilePageLink = page.getByRole('link',{name:"Profile"});
        this.invoicesPageLink = page.getByRole('link',{name:"Invoice"});
        this.messagesPageLink = page.getByRole('link',{name:"Messages"})




    }

    async getPageHeading():Promise<Locator>
    {
        return this.pageHeading;
    }

    async getLinksEnabledStatus():Promise<Record<string,boolean>>
    {
        return {
            Favorites: await this.favoritesPageLink.isEnabled(),
            Profile: await this.profilePageLink.isEnabled(),
            Invoices: await this.invoicesPageLink.isEnabled(),
            Messages: await this.messagesPageLink.isEnabled()
        };
    }

    async getLinksHref():Promise<Record<string,string|null>>
    {
        return {
            Favorites: await this.favoritesPageLink.getAttribute('href'),
            Profile: await this.profilePageLink.getAttribute('href'),
            Invoices: await this.invoicesPageLink.getAttribute('href'),
            Messages: await this.messagesPageLink.getAttribute('href')
        };
    }


}