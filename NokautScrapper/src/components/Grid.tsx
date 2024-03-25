import { useEffect, useState } from "react";
import { Row, Col, Card, Dropdown } from "react-bootstrap";
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

function Grid({products, productToSearch, changeProducts }: {products:Product[], productToSearch: string, changeProducts: (newProducts: any) => void}) {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNextPage = () => {
    const nextPage = currentPage + 1;
    GetProductsList(productToSearch, nextPage).then((data) => {
      changeProducts([...products, ...data]);
      setCurrentPage(nextPage);
    });
  };

    useEffect(() => {
      GetProductsList(productToSearch).then((data) => {
        changeProducts(data);
      });
    }, [productToSearch, changeProducts]);

  return (
    <div className="MarginGridTop MainContainerSize">
      <div>
        {products.length > 0 ? (
          <>
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
                            textDecoration: "none"
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
            <Dropdown onClick={fetchNextPage} className="btnloadmore btn btn-outline-dark">Pokaż więcej</Dropdown>
          </>
        ) : (
          <p className="Loading">Loading...</p>
        )}
      </div>
    </div>
  );
}
export default Grid;
