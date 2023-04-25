import React, { useState } from "react";
import { Nav,  Navbar, NavDropdown, Container, Image, Badge, Button, Toast,
  ToastContainer, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './../../images/schneider-electric-logo.png'
import loginUserPic from "./../../images/loginUser.jpg";
import { AiFillBell } from 'react-icons/ai';
import './menu.component.css';

function MyMenu(args){

  const [username, setLoggedInUsrName] = useState("Jean-Pascal");
  const [showNotifiation, setshowNotification] = useState(false);
  const [notificationCount, setnotificationCount] = useState(1); //currently set with test values

  //set current notification count
  const setNotification = (value) => setnotificationCount(value);
  //set username
  const setUsername = (usrname) => setLoggedInUsrName(usrname);
  //show/hide notification
  const toggleShowNotification = () => {
    setshowNotification(!showNotifiation);
    setnotificationCount(0);
  }

  const [position, setPosition] = useState('top-start');

    return (
    <Navbar bg="white" collapseOnSelect variant="light">
      <Container fluid>
        <Navbar.Brand>
          <Nav.Link href="/">
            <img alt="logo" src={logo} style={{ height: 70, width: 200 }} />
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        </Nav>
        <Nav>
            <Nav.Link>
              <Button size="lg" variant="light" onClick={toggleShowNotification}>
                <AiFillBell/><Badge pill bg="danger">{ notificationCount }</Badge>
              </Button>
              <ToastContainer containerPosition="position-relative">
              <Toast show={showNotifiation} onClose={toggleShowNotification}>
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                  <strong className="me-auto">Notifications</strong>
                  <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>You have got one inbox message!!</Toast.Body>
              </Toast>
              </ToastContainer>
            </Nav.Link>
            <NavDropdown onClick={() => setshowNotification(false)} align="end" title={
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