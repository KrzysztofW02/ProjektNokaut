import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "./Navbar";
import { GetProductsList } from "../WebScrapper/WebScrapper";

interface Product {
  title: string;
  offerFrom: string;
  price: string;
  image: string;
  sellerUrl: string;
}

function Grid({ productToSearch }: { productToSearch: string }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    GetProductsList(productToSearch).then((data) => {
      setProducts(data);
    });
  }, [productToSearch]);

  return (
    <div className="MarginGridTop">
      <Container>
        {products.length > 0 ? (
          <Row>
            {products.map((product, index) => (
              <Col key={index} xs={6} md={4}>
                <div>
                  <br></br>
                  <br></br>
                  <a href={product.sellerUrl}>
                    <p>{product.title}</p>
                  </a>
                  {/*<p>{product.offerFrom}</p>*/}
                  <img src={product.image} alt="" />
                  <p>{product.price}</p>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </div>
  );
}

export default Grid;
