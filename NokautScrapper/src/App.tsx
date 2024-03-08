import "./App.css";
import { GetProductsList } from "./WebScrapper/WebScrapper";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";

function App() {
  let ProductData: Array<Product> = [];

  /*GetProductsList("hulajnoga elektryczna").then((data) => {
    ProductData = data;
    console.log(ProductData);
  });
*/
  const handleSearch = (searchText: string) => {
    GetProductsList(searchText).then((data) => {
      ProductData = data;
      console.log(ProductData);
    });
  };

  return (
    <>
      <div>
        <Navbar onSearch={handleSearch} />
      </div>

      <div className="mt-5">
        <Grid />
      </div>
    </>
  );
}
export default App;
