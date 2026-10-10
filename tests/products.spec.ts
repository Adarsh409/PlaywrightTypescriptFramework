import {test,expect} from '../src/fixtures/Base';
import {mockProductStock} from '../src/utils/networkMocks'
import product from './data/product.json'
test("should display only matching products when searching by keyword", async({homePage}) => {
    const productSearchData = product.productSearch;
    await homePage.searchProduct(productSearchData.searchText);
    await expect(await homePage.getSearchResultMessage()).toHaveText(`${productSearchData.expectedSearchResultCount} products found for '${productSearchData.searchText}'`)
    const searchResults = await homePage.getProductSearchResults();
    
    for(let item of searchResults)
    {
        await expect(item).toContainText(productSearchData.searchText)
    }


})

test("should display Out of stock message when the product is returned as out of stock", async({page, homePage}) => {
    await mockProductStock(page, false);
    const productDetailsPage = await homePage.selectFirstProduct();

    await expect(await productDetailsPage.getOutOfStockMessage()).toHaveText('Out of stock');
})
