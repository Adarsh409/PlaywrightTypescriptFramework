import {test,expect} from '@playwright/test';
import {ApiClient} from '../../src/api/ApiClient';
import brandData from '../data/brands.json'

test("should return the matching brand when searching brands by name", async({request}) => {
    const api = new ApiClient(request);
    const response = await api.get(brandData.searchEndpoint, {q: brandData.searchText});

    expect(response.status()).toBe(200);
    const brands = await response.json();
    const names: string[] = brands.map((brand: {name: string}) => brand.name);
    expect(names.length).toBeGreaterThan(0);
    expect(names).toContain(brandData.expectedName);
    for (const name of names)
    {
        expect.soft(name, `brand name "${name}" should contain the search text`).toContain(brandData.searchText);
    }
})
