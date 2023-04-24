import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "./sellOutInput.component.css";
import SellOutDataComponent from "./sellOutData.component";

const SellOutInputComponent = () => {
  return (
    <>
      <Container fluid>
        <h5 className="input-header">Sell Out Data Input</h5>

        <Container className="sell-out-input-upload">
          <Row>
            <Col xs="auto" className="align-item-center file-upload-position">
              <Form.Label>EXCEL FILE UPLOAD</Form.Label>
            </Col>
            <Col xs="auto">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Button variant="primary" className="btn-upload">
                Upload
              </Button>
            </Col>
            <Col xs="auto">
              <Button variant="secondary" className="btn-download">
                Download Template
              </Button>
            </Col>
          </Row>
        </Container>

        <h5 className="input-header">Scope Selection For Manual Input</h5>

        {/* <Container fluid>
          <Row>
            <Col xs="auto" className="col-md-2">
              <Form.Select size="sm">
                <option>Select Partner</option>
                <option value="Amazon">Amazon</option>
                <option>Flipkart</option>
              </Form.Select>
            </Col>
            <Col xs="auto" className="col-md-2">
              <Form.Select size="sm">
                <option>Select Model</option>
                <option>Amazon</option>
                <option>Flipkart</option>
              </Form.Select>
            </Col>
            <Col xs="auto" className="col-md-2">
              <Form.Select size="sm">
                <option>Select Country</option>
                <option>Amazon</option>
                <option>Flipkart</option>
              </Form.Select>
            </Col>
            <Col xs="auto" className="col-md-2">
              <Form.Select size="sm">
                <option>Select Zone</option>
                <option>Amazon</option>
                <option>Flipkart</option>
              </Form.Select>
            </Col>
            <Col xs="auto" className="col-md-2">
              <Form.Select size="sm">
                <option>Select Period</option>
                <option>Amazon</option>
                <option>Flipkart</option>
              </Form.Select>
            </Col>
            <Col className="col-md-2">
              <Form>
                <Button variant="primary" size="md" className="btn-add">
                  Add
                </Button>
              </Form>
            </Col>
          </Row>
        </Container> */}
      </Container>
      <SellOutDataComponent />
    </>
  );
};

export default SellOutInputComponent;
