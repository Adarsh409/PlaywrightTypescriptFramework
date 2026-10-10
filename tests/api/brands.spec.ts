import {test,expect} from '../../src/fixtures/api';
import {buildRequestBody} from '../../src/api/RequestBuilder';
import brandData from '../data/brands.json'
import addNewBrandRequest from '../data/requests/addNewBrand.json'
import updateBrandRequest from '../data/requests/updateBrand.json'

test("should return the matching brand when searching brands by name", async({api}) => {
    const response = await api.get(brandData.searchEndpoint, {q: brandData.searchText});

    expect(response.status()).toBe(200);
    const names: string[] = (await response.json()).map((brand: {name: string}) => brand.name);
    expect(names).toContain(brandData.expectedName);
    for (const name of names)
    {
        expect.soft(name, `brand name "${name}" should contain the search text`).toContain(brandData.searchText);
    }
})

test("should add, update and delete a brand", async({api, adminToken}) => {
    const suffix = Date.now();
    const created = {brand_name: `${brandData.newBrand.name} ${suffix}`, slug: `${brandData.newBrand.slug}-${suffix}`};
    const updated = {brand_name: `${brandData.updatedBrand.name} ${suffix}`, slug: `${brandData.updatedBrand.slug}-${suffix}`};

    const response = await api.post(brandData.addEndpoint, buildRequestBody(addNewBrandRequest, created));
    expect(response.status()).toBe(201);
    const brand = await response.json();
    const brandUrl = `${brandData.addEndpoint}/${brand.id}`;
    expect(brand).toMatchObject({name: created.brand_name, slug: created.slug});

    expect((await api.put(brandUrl, buildRequestBody(updateBrandRequest, updated))).status()).toBe(200);
    const getResponse = await api.get(brandUrl);
    expect(getResponse.status()).toBe(200);
    expect(await getResponse.json()).toMatchObject({id: brand.id, name: updated.brand_name, slug: updated.slug});

    expect((await api.delete(brandUrl, adminToken)).status()).toBe(204);
    expect((await api.get(brandUrl)).status()).toBe(404);
})
