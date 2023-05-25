import React, { useState } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Image,
  Badge,
  Button,
  Toast,
  ToastContainer,
  Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./../../images/schneider-electric-logo.svg";
import loginUserPic from "./../../images/loginUser.jpg";
import { AiFillBell } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import "./menu.component.css";

function MyMenu(props) {
  const [username, setLoggedInUsrName] = useState("Jean-Pascal");
  const [showNotifiation, setshowNotification] = useState(false);
  const [notificationCount, setnotificationCount] = useState(1); //currently set with test values
  const [position, setPosition] = useState("top-start");

  const location = useLocation();
  const notificationMessage = location?.state?.message;
  console.log("notificationMessage", notificationMessage);

  //set current notification count
  const setNotification = (value) => setnotificationCount(value);
  //set username
  const setUsername = (usrname) => setLoggedInUsrName(usrname);
  //show/hide notification
  const toggleShowNotification = () => {
    setshowNotification(!showNotifiation);
    setnotificationCount(0);
  };

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
          <Nav className="me-auto"></Nav>
          <Nav>
            {props.role != "admin" ? (
              <Nav.Link>
                <Button size="lg" variant="light">
                  <AiFillBell onClick={toggleShowNotification} />
                  <Badge pill bg="danger">
                    {notificationCount}
                  </Badge>
                </Button>
                <ToastContainer containerPosition="position-relative">
                  <Toast
                    show={showNotifiation}
                    onClose={toggleShowNotification}
                  >
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
                    {notificationMessage > 0 ? (
                      <Toast.Body>
                        {" "}
                        {`${notificationMessage} Partner Accounts Sent for Investigation`}
                      </Toast.Body>
                    ) : (
                      ""
                    )}
                  </Toast>
                </ToastContainer>
              </Nav.Link>
            ) : (
              <div></div>
            )}

            <NavDropdown
              onClick={() => setshowNotification(false)}
              align="end"
              title={
                <div>
                  <Image
                    src={loginUserPic}
                    style={{ height: 35, width: 35, padding: 6 }}
                    roundedCircle
                  ></Image>
                  <b>{username}</b>
                </div>
              }
              className="pull-right"
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="/action1">Action 1</NavDropdown.Item>
              <NavDropdown.Item href="/action2">Action 2</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyMenu;
