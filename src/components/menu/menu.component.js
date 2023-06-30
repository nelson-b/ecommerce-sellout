import React, { useEffect, useState } from "react";
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
  ListGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./../../images/schneider-electric-logo.svg";
import loginUserPic from "./../../images/loginUser.jpg";
import { AiFillBell } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import "./menu.component.css";
import Cookies from "js-cookie";

function MyMenu(props) {
  const navigate = useNavigate();
  const [username, setLoggedInUsrName] = useState("Jean-Pascal");
  const [showNotifiation, setshowNotification] = useState(false);
  const [notificationCount, setnotificationCount] = useState(null); //currently set with test values
  const [position, setPosition] = useState("top-start");
  const [notificationMessage, setNotificationMessage] = useState([]);
  
  useEffect(() => {
    const usrDetails = JSON.parse(localStorage.getItem('user_login_info'));
    //if user not login then redirect to login page
    if(usrDetails){
      setUsername(usrDetails.first_name + " " + usrDetails.last_name);
    } 
    else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    //notification api call
    setNotificationMessage([
      {
        Id: "1",
        Title: "Partner request creation has been approved",
        Content: "",
        URL: "",
      },
      {
        Id: "2",
        Title: "Data Input Window closing reminder - 6 days Remaining",
        Content: "",
        URL: "",
      },
      {
        Id: "3",
        Title: "Partner data update request sent successfully.",
        Content: "",
        URL: "",
      },
      {
        Id: "4",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "5",
        Title: "Partner request creation has been approved",
        Content: "",
        URL: "",
      },
      {
        Id: "6",
        Title: "Data Input Window closing reminder - 6 days Remaining",
        Content: "",
        URL: "",
      },
      {
        Id: "7",
        Title: "Partner data update request sent successfully.",
        Content: "",
        URL: "",
      },
      {
        Id: "8",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "9",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "10",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "11",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "12",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "13",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "14",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "15",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "16",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "17",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "18",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "19",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "20",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "21",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "22",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "23",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "24",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "25",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "26",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "27",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "28",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "29",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
      {
        Id: "30",
        Title: "Approver sent back data for correction - View",
        Content: "",
        URL: "",
      },
    ]);
  }, []);

  useEffect(() => {
    console.log("notificationMessage", notificationMessage.length);
    setnotificationCount(notificationMessage.length);
  }, [notificationMessage]);

  const location = useLocation();

  //set current notification count
  const setNotification = (value) => setnotificationCount(value);
  //set username
  const setUsername = (usrname) => setLoggedInUsrName(usrname);
  //show/hide notification
  const toggleShowNotification = () => {
    setshowNotification(!showNotifiation);
    setnotificationCount(0);
  };

  // Method to remove data from cookies
  const handleLogout = () => {
    //navigate to the login page
    Cookies.remove("access_token");
    localStorage.removeItem("user_login_info");
    navigate("/");
  };

  return (
    <>
      <Navbar bg="white" collapseOnSelect variant="light">
        <Container fluid>
          <Navbar.Brand>
            <Nav.Link href="/">
              <img alt="logo" src={logo} style={{ height: 50 }} />
            </Nav.Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {props.role != "admin" ? (
                <Nav.Link>
                  <Button
                    size="lg"
                    variant="light"
                    onClick={toggleShowNotification}
                  >
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
                      </Toast.Header>
                      <Toast.Body>
                        <ListGroup className="list-group">
                          {notificationMessage.map((row) => (
                            <ListGroup.Item key={row.Title}>
                              {row.Title}
                            </ListGroup.Item>
                          ))}
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
                      src={""}
                      style={{ height: 35, width: 35, padding: 6 }}
                      roundedCircle
                    ></Image>
                    <b>{username}</b>
                  </div>
                }
                className="pull-right"
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item onClick={ handleLogout } href="/">logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MyMenu;