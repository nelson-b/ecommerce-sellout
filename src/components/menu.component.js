import React, { useState } from "react";
import {Nav,  Navbar, NavDropdown, Form, Container, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../images/schneider-electric-logo.png"
import loginUserPic from "../images/loginUser.jpg";
import { AiFillBell } from 'react-icons/ai';

function MyMenu(args){

  const toggle = () => {
    toggleNavbar(!isOpen);
  };

  const handleSelect = (eventKey) => setLoggedInUsrName(eventKey);
  const [selectedKey, SetKey] = useState(0); 
  const [username, setLoggedInUsrName] = useState("Jean-Pascal");
  const [isOpen, toggleNavbar] = useState(false);
  
    return (
    <>
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img alt="logo" src={logo} style={{ height: 70, width: 200 }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav variant="features" activeKey={selectedKey} onSelect={handleSelect} className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll>
            <Nav.Item>
              <Nav.Link eventKey={1} href="/">BU Split</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={2} href="/">Data Input</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={3} href="/">Partner</Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav>
              <Nav.Link><AiFillBell/></Nav.Link>
              <NavDropdown title={
                <div className="pull-right">
                        <Image src={loginUserPic} style={{ height: 30, width: 30, padding:5 }} roundedCircle></Image>
                        {username}
                    </div>
                  } className="pull-right" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/action1">Action 1</NavDropdown.Item>
                <NavDropdown.Item href="/action2">Action 2</NavDropdown.Item>
              </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
    );
}

export default MyMenu