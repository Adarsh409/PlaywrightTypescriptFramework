import { test as base, expect } from '@playwright/test';
import { ApiClient } from '../api/ApiClient';
import { getRequiredEnv } from '../utils/env';

type ApiFixture = {
    api: ApiClient;
    adminToken: string;
}

export const test = base.extend<ApiFixture>({
    api: async({request},use)=>
    {
        await use(new ApiClient(request));
    },

    adminToken: async({api},use)=>
    {
        const response = await api.generateToken(getRequiredEnv('ADMIN_LOGIN_EMAIL'), getRequiredEnv('ADMIN_LOGIN_PASSWORD'));
        expect(response.status()).toBe(200);
        await use((await response.json()).access_token);
    }
});
export{expect}
