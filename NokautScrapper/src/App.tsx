import { useState } from "react";
import "./App.css";
import { GetProductsList } from "./WebScrapper/WebScrapper";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);


  let ProductData: Array<Product> = [];

  GetProductsList("hulajnoga").then((data) => {
    ProductData = data;
    console.log(ProductData);
  });

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}
export default App;
