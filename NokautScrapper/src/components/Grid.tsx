import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import "react-bootstrap";
import { GetProductsList } from "../WebScrapper/WebScrapper";
import "./Navbar";
import "./customcss/custom.css";
interface Product {
  title: string;
  offerFrom: string;
  price: string;
  image: string;
  sellerUrl: string;
}

function Grid({ productToSearch }: { productToSearch: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const bottomBoundaryRef = useRef<HTMLDivElement>(null);

  const fetchNextPage = () => {
    setLoading(true);
    const nextPage = currentPage + 1;
    GetProductsList(productToSearch, nextPage).then((data) => {
      setProducts([...products, ...data]);
      setCurrentPage(nextPage);
      setLoading(false);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        bottomBoundaryRef.current &&
        window.innerHeight + window.scrollY >=
          bottomBoundaryRef.current.offsetTop
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [products]);

  return (
    <div className="MarginGridTop MainContainerSize">
      <div>
        {products.length > 0 && (
          <Row style={{ marginBottom: "15px" }}>
            {products.map((product, index) => (
              <Col key={index} xs={4} md={4} style={{ marginBottom: "30px" }}>
                <Card className="Card">
                  <Card.Link
                    style={{ textDecoration: "none", color: "black" }}
                    href={product.sellerUrl}
                  >
                    <Card.Img variant="top" src={product.image} alt="" />
                    <Card.Body>
                      <Card.Title
                        style={{
                          fontSize: "15px",
                          textDecoration: "none",
                          textWrap: "nowrap",
                        }}
                      >
                        {product.title}
                      </Card.Title>
                      <Card.Text
                        style={{
                          fontSize: "20px",
                          textDecoration: "none",
                          color: "red",
                        }}
                      >
                        {product.price}
                      </Card.Text>
                    </Card.Body>
                  </Card.Link>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        {loading && <p className="Loading">Loading...</p>}
        <div ref={bottomBoundaryRef}></div>
      </div>
    </div>
  );
}
export default Grid;
