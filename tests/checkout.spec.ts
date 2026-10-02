import {test,expect} from '../src/fixtures/base';
import {CheckoutPage} from '../src/pages/CheckoutPage'
import checkoutData from './data/checkout.json'

test("should complete guest checkout for products added to the cart", async({page, cartWithProducts}) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.proceedFromCart();
    await checkoutPage.continueAsGuest(checkoutData.guestDetails);
    await checkoutPage.fillBillingAddress(checkoutData.billingAddress);
    await checkoutPage.selectPaymentMethodAndFinish(checkoutData.paymentMethod);

    await expect(checkoutPage.getPaymentSuccessMessage()).toHaveText('Payment was successful');
})
