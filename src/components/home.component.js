import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveSellOutData } from "../actions/selloutaction";
import MyMenu from "./menu/menu.component.js";
import { Breadcrumb, BreadcrumbItem, Container, Row } from "react-bootstrap";
import { BiHome } from 'react-icons/bi';

function Home(){
    return(
        <>
            <Container fluid>
                <Row>
                    <MyMenu/>
                </Row>
                <Row>
                    <Breadcrumb>
                        <BreadcrumbItem active style={{width:100}}><BiHome/>Home</BreadcrumbItem>
                    </Breadcrumb>
                </Row>
            </Container>
        </>
    );
}

export default connect(null, { retrieveSellOutData })(Home);