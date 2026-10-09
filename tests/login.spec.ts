import {test,expect} from '../src/fixtures/Base';
import accountData from './data/account.json'
import validationText from './constants/validation-text.json'

test("should login with valid credentials", async({signInPage}) => {
    const email = process.env.LOGIN_EMAIL;
    const password = process.env.LOGIN_PASSWORD;
    if (!email || !password) throw new Error('LOGIN_EMAIL and LOGIN_PASSWORD must be set');
    const accountPage = await signInPage.login(email, password);

    await expect.soft(await accountPage.getPageHeading()).toHaveText('My account');
    for (const [name, link] of Object.entries(await accountPage.getLinks()))
    {
        await expect.soft(link, `${name} link should be enabled`).toBeEnabled();
        await expect.soft(link, `${name} link should have the correct href`).toHaveAttribute('href', accountData.linkHrefs[name as keyof typeof accountData.linkHrefs]);
    }

})

test("should show an error and stay on the login page for invalid credentials", async({page, signInPage}) => {
    await signInPage.attemptLogin('invalid.user@example.com', 'wrong-password');

    await expect(await signInPage.getErrorMessage()).toHaveText(validationText.login.invalidCredentials);
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect.soft(await signInPage.getPageHeading()).toBeVisible();
})
