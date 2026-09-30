import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export interface GuestDetails
{
    email: string;
    firstName: string;
    lastName: string;
}

export interface BillingAddress
{
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    houseNumber: string;
}

export class CheckoutPage extends BasePage
{
    private readonly proceedFromCartButton: Locator;
    private readonly continueAsGuestTab: Locator;
    private readonly guestEmail: Locator;
    private readonly guestFirstName: Locator;
    private readonly guestLastName: Locator;
    private readonly guestSubmitButton: Locator;
    private readonly proceedFromGuestButton: Locator;
    private readonly street: Locator;
    private readonly city: Locator;
    private readonly state: Locator;
    private readonly country: Locator;
    private readonly postalCode: Locator;
    private readonly houseNumber: Locator;
    private readonly proceedFromAddressButton: Locator;
    private readonly paymentMethod: Locator;
    private readonly finishButton: Locator;
    private readonly paymentSuccessMessage: Locator;

    constructor(page: Page)
    {
        super(page);
        this.proceedFromCartButton = page.getByTestId('proceed-1');
        this.continueAsGuestTab = page.getByRole('tab', { name: 'Continue as Guest' });
        this.guestEmail = page.getByTestId('guest-email');
        this.guestFirstName = page.getByTestId('guest-first-name');
        this.guestLastName = page.getByTestId('guest-last-name');
        this.guestSubmitButton = page.getByTestId('guest-submit');
        this.proceedFromGuestButton = page.getByTestId('proceed-2-guest');
        this.street = page.getByTestId('street');
        this.city = page.getByTestId('city');
        this.state = page.getByTestId('state');
        this.country = page.getByTestId('country');
        this.postalCode = page.getByTestId('postal_code');
        this.houseNumber = page.getByTestId('house_number');
        this.proceedFromAddressButton = page.getByTestId('proceed-3');
        this.paymentMethod = page.getByTestId('payment-method');
        this.finishButton = page.getByTestId('finish');
        this.paymentSuccessMessage = page.getByTestId('payment-success-message');
    }

    async proceedFromCart(): Promise<void>
    {
        await this.proceedFromCartButton.click();
    }

    async continueAsGuest(guestDetails: GuestDetails): Promise<void>
    {
        await this.continueAsGuestTab.click();
        await this.guestEmail.fill(guestDetails.email);
        await this.guestFirstName.fill(guestDetails.firstName);
        await this.guestLastName.fill(guestDetails.lastName);
        await this.guestSubmitButton.click();
        await this.proceedFromGuestButton.click();
    }

    async fillBillingAddress(billingAddress: BillingAddress): Promise<void>
    {
        await this.street.fill(billingAddress.street);
        await this.city.fill(billingAddress.city);
        await this.state.fill(billingAddress.state);
        await this.country.selectOption({ label: billingAddress.country });
        await this.postalCode.fill(billingAddress.postalCode);
        await this.houseNumber.fill(billingAddress.houseNumber);
        await this.proceedFromAddressButton.click();
    }

    async selectPaymentMethodAndFinish(paymentMethod: string): Promise<void>
    {
        await this.paymentMethod.selectOption(paymentMethod);
        await this.finishButton.click();
    }

    getPaymentSuccessMessage(): Locator
    {
        return this.paymentSuccessMessage;
    }
}
