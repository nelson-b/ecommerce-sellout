import React from "react";
import { connect } from "react-redux";
import { sellOutData } from "../../actions/selloutaction";
import MyMenu from "../menu/menu.component.js";
import { Container, Row, Col, Button } from "react-bootstrap";
import './home.component.css';
import PerformanceOverview from "./po.component";

function Home(){
    return(
        <>
            <Container fluid>
                <Row>
                    <MyMenu/>
                </Row>
                <Row className="justify-content-end">
                    <Col md={2}><Button className="button-block" size="lg" variant="success">Data Review</Button>{''}</Col>
                    <Col md={2}><Button className="button-block" size="lg" variant="success">BU Split</Button>{''}</Col>
                    <Col md={2}><Button className="button-block" size="lg" variant="success">Data Input</Button>{''}</Col>
                    <Col md={2}><Button className="button-block" size="lg" variant="success">Partner Data</Button>{''}</Col>
                </Row>
                <br/>
                <Row>
                    <PerformanceOverview/>
                </Row>
            </Container>
        </>
    );
}

export default connect(null, null)(Home);