import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Navbar";
import { GetProductsList } from "../WebScrapper/WebScrapper";
import { Container, Row, Col, Card } from "react-bootstrap";

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
                <Card>
                  <Card.Link href={product.sellerUrl}>
                    <Card.Img variant="top" src={product.image} alt="" />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>{product.price}</Card.Text>
                    </Card.Body>
                  </Card.Link>
                </Card>
                <br></br>
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
