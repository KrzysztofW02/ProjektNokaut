import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./customcss/custom.css"

function Grid(){
    return (
      <div className="MarginGridTop">
        <Container>
          {/* Stack the columns on mobile by making one full-width and the other half-width */}
          <Row>
            <Col xs={6} md={4}>
              col1
            </Col>
            <Col xs={6} md={4}>
              col2
            </Col>
            <Col xs={6} md={4}>
              col3
            </Col>
          </Row>

          {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
          <Row>
            <Col xs={6} md={4}>
              col21
            </Col>
            <Col xs={6} md={4}>
              col22
            </Col>
            <Col xs={6} md={4}>
              col23
            </Col>
          </Row>

          {/* Columns are always 50% wide, on mobile and desktop */}
          <Row>
            <Col xs={6} md={4}>
              col31
            </Col>
            <Col xs={6} md={4}>
              co32
            </Col>
            <Col xs={6} md={4}>
              co33
            </Col>
          </Row>
        </Container>
      </div>
    );
}


    

export default Grid;