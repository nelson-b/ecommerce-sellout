import React, { useState } from "react";
import {Nav,  Navbar, NavDropdown, Container, Image, Badge, Button, Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './../../images/schneider-electric-logo.png'
import loginUserPic from "./../../images/loginUser.jpg";
import { AiFillBell } from 'react-icons/ai';
import './menu.component.css';
import { Link } from "react-router-dom";

function MyMenu(args){

  const toggle = () => {
    toggleNavbar(!isOpen);
  };

  const handleSelect = (eventKey) => setLoggedInUsrName(eventKey);
  const [selectedKey, SetKey] = useState("home"); 
  const [username, setLoggedInUsrName] = useState("Jean-Pascal");
  const [isOpen, toggleNavbar] = useState(false);
  
    return (
    <Navbar bg="light" collapseOnSelect fixed="top" variant="light">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <img alt="logo" src={logo} style={{ height: 70, width: 200 }} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>
        <Nav>
            <Nav.Link>
              <Button size="lg" variant="light"><AiFillBell/><Badge pill bg="danger">9</Badge></Button>
            </Nav.Link>
              <NavDropdown align="end" title={
                    <div>
                        <Image src={loginUserPic} style={{ height: 35, width: 35, padding:6 }} roundedCircle></Image>
                        <b>{username}</b>
                    </div>
                  } className="pull-right" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/action1">Action 1</NavDropdown.Item>
                <NavDropdown.Item href="/action2">Action 2</NavDropdown.Item>
              </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}

export default MyMenu