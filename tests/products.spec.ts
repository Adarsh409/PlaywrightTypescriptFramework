import {test,expect} from '../src/fixtures/base';
import {HomePage} from '../src/pages/HomePage'
import product from './data/product.json'
test("should display only matching products when searching by keyword", async({page}) => {
    const productSearchData = product.productSearch;
    const homePage = new HomePage(page);
    await homePage.loadApplication()
    await homePage.searchProduct(productSearchData.searchText);
    await expect(await homePage.getSearchResultMessage()).toHaveText(`${productSearchData.expectedSearchResultCount} products found for '${productSearchData.searchText}'`)
    const searchResults = await homePage.getProductSearchResults();
    
    for(let item of searchResults)
    {
        await expect(item).toContainText(productSearchData.searchText)
    }
    
    
})