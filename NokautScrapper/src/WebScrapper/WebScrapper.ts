import axios from "axios";
import * as cheerio from "cheerio";

export async function GetProductsList(productToSearch: string) {
    let response;
    const url = "https://www.nokaut.pl/produkt:" + productToSearch + ".html";
    url.replace(" ", "%20");

    try {
        response = await axios.get(url);
    }
    catch(error) {
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