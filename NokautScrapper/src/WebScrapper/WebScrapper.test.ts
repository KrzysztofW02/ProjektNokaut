import { describe, expect } from "@jest/globals";
import { GetProductsList } from "./WebScrapper.ts";
import axios from "axios";

describe("GetProductsList", () => {
  it("returns products list for a valid product", async () => {
    const products = await GetProductsList("hulajnoga");

    expect(products.length).toBeGreaterThan(0);
    products.forEach(
      (element: {
        title: string;
        offerFrom: string;
        price: string;
        image: string;
        sellerUrl: string;
      }) => {
        expect(element.title).toBeTruthy();
        expect(element.offerFrom).toBeTruthy();
        expect(element.price).toBeTruthy();
        expect(element.image).toBeTruthy();
        expect(element.sellerUrl).toBeTruthy();
      }
    );
  });

  it("returns an empty array for an invalid product", async () => {
    // Mock axios.get to throw an error

    const products = await GetProductsList("");

    expect(products).toEqual([]);
  });

  it("test database concurency", async () => {

    const products: Product[] = [
      {
        title: "Product 1",
        offerFrom: "Seller 1",
        price: "100",
        image: "image1",
        sellerUrl: "url1",
      },
      {
        title: "Product 2",
        offerFrom: "Seller 2",
        price: "200",
        image: "image2",
        sellerUrl: "url2",
      },
    ];
    await axios.post("http://localhost:3001/api/products", {
      productName: "testProduct",
      products: products,
    });
    
    const response = await axios.get(
      "http://localhost:3001/api/products?productName=" + "testProduct"
    );
    expect(response.data.products).toEqual(products);
  });

});
