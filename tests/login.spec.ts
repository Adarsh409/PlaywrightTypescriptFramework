import {test,expect} from '../src/fixtures/base';
import accountData from './data/account.json'

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
