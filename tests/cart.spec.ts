import {test,expect} from '../src/fixtures/base'

test("should add multiple products to cart with correct quantities", async({cartWithProducts}) => {
    const { cartPage, purchaseItems } = cartWithProducts;

    expect(await cartPage.isProductRowsVisible()).toBeTruthy();
    const cartInfo = await cartPage.getProductInfoInCart();
    for(let item of purchaseItems)
    {
        expect.soft(cartInfo).toHaveProperty(item.productName)
        expect.soft(cartInfo[item.productName]?.quantity).toBe(String(item.count))
    }
});


test('show display the correct product prices', async({cartWithProducts}) =>{
    const { cartPage, purchaseItems } = cartWithProducts;

    const cartInfo = await cartPage.getProductInfoInCart();
    let expectedGrandTotal = 0;
    for(let item of purchaseItems)
    {
        const info = cartInfo[item.productName];
        expect.soft(info).toBeDefined();
        const price = parseFloat(info.price.replace('$', ''));
        const total = parseFloat(info.total.replace('$', ''));
        expect.soft(total).toBe(Number((price * item.count).toFixed(2)));
        expectedGrandTotal += total;
    }

    const actualGrandTotal = await cartPage.getCartTotal();
    expect.soft(actualGrandTotal).toBe(Number(expectedGrandTotal.toFixed(2)));
})
