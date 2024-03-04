import {describe, expect} from '@jest/globals';
import { GetProductsList } from './WebScrapper.ts';

describe('GetProductsList', () => {
    it('returns products list for a valid product', async () => {

        const products = await GetProductsList('hulajnoga');

        expect(products.length).toBeGreaterThan(0);
        products.forEach(element => {
            expect(element.title).toBeTruthy();
            expect(element.offerFrom).toBeTruthy();
            expect(element.price).toBeTruthy();
            expect(element.image).toBeTruthy();
            expect(element.sellerUrl).toBeTruthy();
        });
    });

    it('returns an empty array for an invalid product', async () => {
        // Mock axios.get to throw an error

        const products = await GetProductsList('');

        expect(products).toEqual([]);
    });
});