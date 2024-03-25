import "./App.css";
import { GetProductsList } from "./WebScrapper/WebScrapper";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import { useState } from "react";

function App() {
  const [productToSearch, setProductToSearch] = useState(
    ""
  );
  
  const [products, setProductData] = useState<Product[]>([]);

  const handleOrderChange = (newProducts: Product[]) => {
    setProductData(newProducts);
  };

  const handleSearch = (searchText: string) => {
    setProductToSearch(searchText);
    GetProductsList(searchText).then((data) => {
      setProductData(data);
    });
  };

  return (
    <>
      <div>
        <Navbar
          products={products}
          onSearch={handleSearch}
          changeProducts={handleOrderChange}
        />
      </div>

      <div className="mt-5">
        <Grid
          products={products}
          productToSearch={productToSearch}
          changeProducts={handleOrderChange}
        />
      </div>
    </>
  );
}
export default App;
