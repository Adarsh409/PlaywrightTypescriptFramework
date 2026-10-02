import {test,expect} from '../src/fixtures/base';
import {HomePage} from '../src/pages/HomePage'
import {CheckoutPage} from '../src/pages/CheckoutPage'
import {ApiUtils} from '../src/utils/apiUtils'
import product from './data/product.json'
import checkoutData from './data/checkout.json'

test("should complete guest checkout for products added via the api", async({page}) => {
    const homePage = new HomePage(page);
    await homePage.loadApplication();

    const apiUtils = new ApiUtils(page.context().request);
    const productsToAdd = product.purchaseList1;
    const cartId = await apiUtils.createCart();
    let totalQuantity = 0;

    for(let item of productsToAdd)
    {
        const productId = await apiUtils.getProductIdByName(item.productName);
        await apiUtils.addProductToCart(cartId,productId,item.count)
        totalQuantity += item.count;
    }

    await homePage.setCartId(cartId, totalQuantity);
    await expect(await homePage.header.isCartPageLinkVisible()).toBeVisible({ timeout: 30000 });
    const cartPage = await homePage.header.navigateToCartPage();
    await cartPage.getProductInfoInCart();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.proceedFromCart();
    await checkoutPage.continueAsGuest(checkoutData.guestDetails);
    await checkoutPage.fillBillingAddress(checkoutData.billingAddress);
    await checkoutPage.selectPaymentMethodAndFinish(checkoutData.paymentMethod);

    await expect(checkoutPage.getPaymentSuccessMessage()).toHaveText('Payment was successful');
})
