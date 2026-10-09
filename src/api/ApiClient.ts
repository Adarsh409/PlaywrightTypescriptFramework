import { APIRequestContext, APIResponse } from '@playwright/test';

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
}
