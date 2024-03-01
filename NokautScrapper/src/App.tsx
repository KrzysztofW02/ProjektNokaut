import { useState } from 'react'
import './App.css'
import GetProductsList from './WebScrapper'


function App() {
  const [count, setCount] = useState(0)

  let ProductData: Array<Product> = [];

  GetProductsList("hulajnoga elektryczna").then((data) => {
    ProductData = data
    console.log(ProductData);
  });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          //*logo*/
          </a>
        <a href="https://react.dev" target="_blank">
          //*logo*/
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
export default App
