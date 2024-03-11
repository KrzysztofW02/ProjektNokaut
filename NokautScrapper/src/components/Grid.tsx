import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "react-bootstrap";
import { GetProductsList } from "../WebScrapper/WebScrapper";
import "./Navbar";
import "./customcss/custom.css"


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
    <div className="MarginGridTop MainContainerSize">
      <div>
        {products.length > 0 ? (
          <Row style={{marginBottom: '15px'}}>
            {products.map((product, index) => (
              <Col key={index} xs={4} md={4} style={{marginBottom: '30px'}}>
                <Card>
                  <Card.Link style={{textDecoration: 'none', color:'grey'}}href={product.sellerUrl}>
                    <Card.Img variant="top" src={product.image} alt="" />
                    <Card.Body>
                      <Card.Title style={{fontSize: '15px', textDecoration: 'none'}}>{product.title}</Card.Title>
                      <Card.Text style={{fontSize: '20px', textDecoration: 'none'}}>{product.price}</Card.Text>
                    </Card.Body>
                  </Card.Link>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p className="Loading">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Grid;
