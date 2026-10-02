import {test,expect} from '../src/fixtures/base';
import {HomePage} from '../src/pages/HomePage'
import {CheckoutPage} from '../src/pages/CheckoutPage'
import product from './data/product.json'
import checkoutData from './data/checkout.json'
import validationText from '../tests/constants/validation-text.json'

test("should complete guest checkout for products added via the api", async({page}) => {
    const homePage = new HomePage(page);
    await homePage.loadApplication();

    const productsToAdd = product.purchaseList1;
    let totalQuantity = 0;
    let itemCount = 0;
    for(let item of productsToAdd)
    {
         await homePage.searchProduct(item.searchText);
        await expect(await homePage.getSearchResultMessage()).not.toHaveText(`0 products found for '${item.searchText}'`);
        const productDetailsPage = await homePage.selectProduct(item.productName);
        await productDetailsPage.addProductToCart(item.count);
        const alertMsg = await productDetailsPage.getAlertMsg();
        await expect.soft(alertMsg).toHaveText(validationText.product.addToCartSuccess)
        itemCount = itemCount + Number(item.count);
             await page.goBack();
        await expect(await homePage.header.getCartQuantity()).toHaveText(String(itemCount));
        totalQuantity += item.count;
    }

    
    const cartPage = await homePage.header.navigateToCartPage();
    await cartPage.getProductInfoInCart();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.proceedFromCart();
    await checkoutPage.continueAsGuest(checkoutData.guestDetails);
    await checkoutPage.fillBillingAddress(checkoutData.billingAddress);
    await checkoutPage.selectPaymentMethodAndFinish(checkoutData.paymentMethod);

    await expect(checkoutPage.getPaymentSuccessMessage()).toHaveText('Payment was successful');
})
