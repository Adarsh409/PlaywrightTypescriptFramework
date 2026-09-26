import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'
import { Header } from './Header'

export class HomePage extends BasePage
{
    readonly header: Header;
    private readonly myAccountButton: Locator;
    private readonly searchField:Locator;
    private readonly searchButton:Locator;
    private readonly searchResults:Locator;
    private readonly searchResultText:Locator;

    constructor(page: Page)
    {
        super(page);
        this.header = new Header(page);
        this.myAccountButton = page.getByRole("button", { name: "My account" });
        this.searchField = page.getByRole("textbox",{name:"Search"});
        this.searchButton = page.getByRole("button",{name:"Search "});
        this.searchResults = page.getByTestId("product-name");
        this.searchResultText = page.getByTestId("search-result-count")
    }

    async loadApplication()
    {
        await this.page.goto("/")
        await this.waitForPageLoad();
    }

    async enterSearchText(searchText:string)
    {
        await this.searchField.fill(searchText)
    }

    async clickSearchButton()
    {
        await this.searchButton.click();
        
    }

    async getSearchResultMessage()
    {
        return this.searchResultText;
    }

    async searchProduct(searchText:string)
    {
        await this.enterSearchText(searchText);
        await this.clickSearchButton();
        
    }

    async getProductSearchResults()
    {
        
        return await this.searchResults.all();
        

    }

   
}
