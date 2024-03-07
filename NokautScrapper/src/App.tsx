import { useState } from "react";
import "./App.css";
import { GetProductsList } from "./WebScrapper/WebScrapper";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";

function App() {
  const [count, setCount] = useState(0);


  let ProductData: Array<Product> = [];

  GetProductsList("hulajnoga elektryczna").then((data) => {
    ProductData = data;
    console.log(ProductData);
  });

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="mt-5">
        <Grid />
      </div>
    </>
  );
}
export default App;
