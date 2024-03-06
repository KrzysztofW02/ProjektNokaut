import axios from "axios";
import * as cheerio from "cheerio";

export async function GetProductsList(productToSearch: string) {
    const databaseProducts = await checkDatabaseForProduct(productToSearch);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (databaseProducts.products.length > 0 || databaseProducts.LastUpdate > yesterday) {
        console.log("Data from database");
        return databaseProducts.products;
    }

    const products = await scrappProducts(productToSearch) || [];

    saveToDatabase(products, productToSearch);

    return products;
}

async function saveToDatabase(products: Array<Product>, name: string) {
    const response = await axios.post("http://localhost:3001/api/products", { productName: name, products: products });
    console.log(response, products);
}

async function checkDatabaseForProduct(productToSearch: string) {
    const response = await axios.get("http://localhost:3001/api/products?productName=" + productToSearch);
    return response.data;
}

async function scrappProducts(productToSearch: string) {
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
    });

    selector(".Title a").each((i, el) => {
        products[i].sellerUrl = selector(el).attr('href') || "";
    });

    return products;
}
