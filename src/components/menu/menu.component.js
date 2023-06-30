import React, { useEffect, useState } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Badge,
  Button,
  Toast,
  ToastContainer,
  ListGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./../../images/schneider-electric-logo.svg";
import { AiFillBell } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import "./menu.component.css";
import Cookies from "js-cookie";
import { user_login_info } from "../constant";
import { getNotificationsByRoleAndEmail } from "../../actions/dataInputAction";
import { connect } from "react-redux";

function MyMenu(props) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [showNotifiation, setshowNotification] = useState(false);

  const [notificationCount, setnotificationCount] = useState(null); //currently set with test values

  const [position, setPosition] = useState("top-start");

  const [notificationMessage, setNotificationMessage] = useState([]);

  const [dynamicNotificationMessage, setDynamicNotificationMessage] = useState(
    []
  );

  //sso login
  useEffect(() => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    console.log('menu usrDetails', usrDetails);
    //if user not login then redirect to login page
    if(usrDetails){
      setUserName(usrDetails.first_name + ' '+ usrDetails.last_name);
      console.log('userName', userName);
    }
    else {
      navigate("/");
    }
  }, []);
  //------------------//

  useEffect(() => {
    //notification api call

    callApiToGetNotifications();
  }, []);

  useEffect(() => {}, [notificationMessage]);

  const callApiToGetNotifications = () => {
    props

      .getNotificationsByRoleAndEmail("sdoiuj796@example.com", "APPROVE_1")

      .then((data) => {
        setDynamicNotificationMessage(data);

        setnotificationCount(data.length);
      })

      .catch((e) => {
        console.log("menu notifications error", e);
      });
  };

  const location = useLocation();

  //set current notification count

  const setNotification = (value) => setnotificationCount(value);

  //show/hide notification

  const toggleShowNotification = () => {
    setshowNotification(!showNotifiation);

    setnotificationCount(0);
  };

  // Method to remove data from cookies
  const handleLogout = () => {
    //navigate to the login page
    Cookies.remove("access_token");
    localStorage.removeItem(user_login_info);
    navigate("/");
  };

  return (
    <>
      <Navbar bg="white" collapseOnSelect variant="light">
        <Container fluid>
          <Navbar.Brand>
            <Nav.Link>
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
                          {dynamicNotificationMessage.map((row) => (
                            <ListGroup.Item key={row.ID}>
                              {row.NOTIFICATION_INFO}
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
                    {/* <Image
                      src={""}
                      style={{ height: 35, width: 35, padding: 6 }}
                      roundedCircle
                    ></Image> */}
                    <b>{ userName }</b>
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

export default connect(null, {
  getNotificationsByRoleAndEmail,
})(MyMenu);
