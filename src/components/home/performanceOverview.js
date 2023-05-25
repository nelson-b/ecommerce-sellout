import { Container, Row, Col, Card } from "react-bootstrap";
import upArrow from "./../../images/upArrow.png";
import downArrow from "./../../images/downArrow.png";
import calender from "./../../images/calender.png";

function PerformanceOverview() {
  return (
    <Container fluid>
      <Row>
        <Row>
          <Col className="d-flex justify-content-between mb-2">
            <div className="overview-header">Performance Overview</div>
          </Col>
          <Col></Col>
          <Col className="d-flex justify-content-between mb-2">
            <div className="overview-header">Task Status</div>
          </Col>
        </Row>
        <Row className="">
          <Col className="col-3">
            <Card>
              <Card.Body>
                <Card.Title className="card-header">
                  YTD Performance Vs Target
                </Card.Title>
                <Card.Text className="card-body-header">6%
                <img src={upArrow} alt="Arrow" style={{ height: "20px",width: "20px", margin: "10px 0px 0px 7px"}} />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-3">
            <Card>
              <Card.Body>
                <Card.Title className="card-header">
                  Sell out Accuracy
                </Card.Title>
                <Card.Text className="card-body-header">82%
                <img src={downArrow} alt="Arrow" style={{ height: "20px",width: "20px", margin: "10px 0px 0px 7px" }} />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-6">
            <Card>
              <Row>
                <Col style={{display: "flex", alignItems: "center", marginLeft: "15px"}}>
                <img src={calender} alt="Arrow" style={{ height: "45px",width: "45px", display:"flex", justifyContent: "center" }} />
                <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                  <Row className="number-header">2<Row className="task-header">request pending for Approval</Row></Row>
                </Card.Text>

                <Card.Text className="task-header">
                <Row className="number-header">1<Row className="task-header">request needs additional information</Row></Row>
                </Card.Text>
              </Card.Body>
              </Col>
              </Row>
              
            </Card>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export default PerformanceOverview;
