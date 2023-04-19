import React, { Component } from "react";
import { connect } from "react-redux";
import { sellOutData } from "../actions/selloutaction";
import MyMenu from "./menu.component.js";
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import { BiHome } from 'react-icons/bi';

function Home(){
    return(
        <>
        <MyMenu/>
        <div className="padding:5;">
        <Breadcrumb tag="nav">
            <BreadcrumbItem active style={{width:100}}><><BiHome/>Home</></BreadcrumbItem>
        </Breadcrumb>
        </div>
        </>
    );
}

export default connect(null, { sellOutData })(Home);