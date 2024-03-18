import "./App.css";
import { GetProductsList } from "./WebScrapper/WebScrapper";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import { useState } from "react";
import { ProductsProvider } from "./contexts/productsProvider";

function App() {  
  const [productToSearch, setProductToSearch] = useState(
    "hulajnoga elektryczna"
  );
  //let ProductData: Array<Product> = [];

  /*GetProductsList("hulajnoga elektryczna").then((data) => {
    ProductData = data;
    console.log(ProductData);
  });
*/
  const [, setProductData] = useState<Product[]>([]);

  const handleSearch = (searchText: string) => {
    setProductToSearch(searchText);
    GetProductsList(searchText).then((data) => {
      setProductData(data);
      console.log(data);
    });
  };

  return (
    <ProductsProvider>
      <div>
        <Navbar onSearch={handleSearch} />
      </div>

      <div className="mt-5">
        <Grid productToSearch={productToSearch} />
      </div>
    </ProductsProvider>
  );
}
export default App;
