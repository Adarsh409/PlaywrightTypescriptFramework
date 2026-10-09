import { APIRequestContext, APIResponse } from '@playwright/test';
import { buildRequestBody } from './RequestBuilder';
import loginRequest from '../../tests/data/requests/login.json';

export type QueryParams = Record<string, string | number | boolean>;

export class ApiClient
{
    private readonly request: APIRequestContext;

    constructor(request: APIRequestContext)
    {
        this.request = request;
    }

    async get(url: string, queryParams?: QueryParams): Promise<APIResponse>
    {
        return await this.request.get(url, { params: queryParams });
    }

    async post(url: string, body: unknown): Promise<APIResponse>
    {
        return await this.request.post(url, { data: body });
    }

    async generateToken(email: string, password: string): Promise<APIResponse>
    {
        return await this.post('/users/login', buildRequestBody(loginRequest, { email, password }));
    }
}
