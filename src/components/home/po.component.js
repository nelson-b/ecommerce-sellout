import { Container, Row, Col, Card } from "react-bootstrap";

function PerformanceOverview(){
    return(
        <Container fluid>
            <Row>
                <Row>
                    <Col className="d-flex justify-content-between">
                        <h3>Performance Overview</h3>
                    </Col>
                    <Col></Col>
                    <Col className="d-flex justify-content-between">
                        <h3>Task Status</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>YTD Performance Vs Target</Card.Header>
                            <Card.Body><h3>6%</h3></Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header>Sell out Accuracy</Card.Header>
                            <Card.Body><h3>82%</h3></Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>request pending for Approval</Card.Body>
                            <Card.Body>request needs additional information</Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
}

export default PerformanceOverview;