import axios from "axios";
import * as cheerio from "cheerio";

async function GetProductsList(productToSearch: string) {
    const url = "https://www.nokaut.pl/produkt:" + productToSearch + ".html";
    url.replace(" ", "%20");

    const response = await axios.get(url);
    const selector = cheerio.load(response.data);
    const products: Array<Product> = [];

    selector(".Title>a").each((i, el) => {
        const prod: Product = {
            title: selector(el).text(),
            offerFrom: "",
            price: "",
            image: "",
            url: "",
        }
        products.push(prod);
    });
    selector(".Offers").each((i, el) => {
        products[i].offerFrom = selector(el).text();
    });
    selector(".Price").each((i, el) => {
        products[i].price = selector(el).text();
    });

    return products;
}

export default GetProductsList;