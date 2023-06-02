import React, { useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown, Container, Image, Badge, Button, Toast, ToastContainer, Row, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./../../images/schneider-electric-logo.svg";
import loginUserPic from "./../../images/loginUser.jpg";
import { AiFillBell } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import "./menu.component.css";

function MyMenu(props) {
  const [username, setLoggedInUsrName] = useState("Jean-Pascal");
  const [showNotifiation, setshowNotification] = useState(false);
  const [notificationCount, setnotificationCount] = useState(null); //currently set with test values
  const [position, setPosition] = useState("top-start");
  const [notificationMessage, setNotificationMessage] = useState([]);

  useEffect(()=>{
    //notification api call
    setNotificationMessage([
      {
        Id: '1',
        Title: 'Partner request creation has been approved',
        Content: '',
        URL: ''
      },
      {
        Id: '2',
        Title: 'Data Input Window closing reminder - 6 days Remaining',
        Content: '',
        URL: ''
      },
      {
        Id: '3',
        Title: 'Partner data update request sent successfully.',
        Content: '',
        URL: ''
      },
      {
        Id: '4',
        Title: 'Approver sent back data for correction - View',
        Content: '',
        URL: ''
      },
    ]);
  },[]);

  useEffect(()=>{
    console.log('notificationMessage',notificationMessage.length);
    setnotificationCount(notificationMessage.length);
  },[notificationMessage]);

  const location = useLocation();
  // const notificationMessage = location?.state?.message;

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
                <Button size="lg" variant="light" onClick={toggleShowNotification}>
                  <AiFillBell />
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
                      {/* <small>11 mins ago</small> */}
                    </Toast.Header>
                    <Toast.Body>
                      <ListGroup>
                        {notificationMessage.map((row) =>
                        <ListGroup.Item key={row.Title}>{row.Title}</ListGroup.Item>
                        )}                        
                      </ListGroup>
                    </Toast.Body>
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
