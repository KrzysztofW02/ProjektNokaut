import axios from "axios";
import * as cheerio from "cheerio";
import { NumericType } from "mongodb";

export async function GetProductsList(productToSearch: string, page: number = 1): Promise<Array<Product>> {
    productToSearch = productToSearch+"--"+page;
    const databaseProducts = await checkDatabaseForProduct(productToSearch);

    // If the product is in the database and it was updated in the last 24 hours, return the products from the database
    if (databaseProducts !== null && databaseProducts.products.length > 0) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if(new Date(databaseProducts.LastUpdate) > yesterday) {
            return databaseProducts.products;
        }
    }

    const products = await scrappProducts(productToSearch) || [];

    saveToDatabase(products, productToSearch);

    return products;
}

async function saveToDatabase(products: Array<Product>, name: string) {
    await axios.post("http://localhost:3001/api/products", { productName: name, products: products });
}

async function checkDatabaseForProduct(productToSearch: string) {
    const response = await axios.get("http://localhost:3001/api/products?productName=" + productToSearch);
    return response.data;
}

async function scrappProducts(productToSearch: string, page: number = 1) {
    let response;
    const url = "https://www.nokaut.pl/produkt:" + productToSearch + ".html";
    url.replace(" ", "%20");

    try {
        response = await axios.get(url);
    }
    catch (error) {
        console.log("Failed to fetch data");
        return [];

    }
    const selector = cheerio.load(response.data);

    const products: Array<Product> = [];

    selector(".Title>a").each((_i, el) => {
        const prod: Product = {
            title: selector(el).text(),
            offerFrom: "",
            price: "",
            image: "",
            sellerUrl: "",
        }
        products.push(prod);
    });

    selector(".Offers").each((i, el) => {
        products[i].offerFrom = selector(el).text();
    });

    selector(".Price").each((i, el) => {
        products[i].price = selector(el).text();
    });

    selector(".ProductItem img").each((i, el) => {
        products[i].image = selector(el).attr('src') || " ";
        if (products[i].image == " "){
            products[i].image = selector(el).attr('data-src') || "";
        }
    });


    const promises: any[] = [];
    selector(".Title a").each(async (i, el) => {
        if(selector(el).attr('href')?.includes("www.nokaut.pl")) {
            promises.push(
            getRedirectedUrl(selector(el).attr('href') || "").then(url => {
                products[i].sellerUrl = url;
                })
            );
        }
        else{
            products[i].sellerUrl = selector(el).attr('href') || "";
        }
    });

    await Promise.all(promises);

    return products;
}
async function getRedirectedUrl(nokautRedirectWebsite: string) {
    let response;
    try {
        response = await axios.get(nokautRedirectWebsite);
    }
    catch (error) {
        console.log("Failed to fetch data");
        return "";

    }
    const selector = cheerio.load(response.data);
    return selector(".PromoOffer a").attr('href') || " ";
}

