import React, { useCallback, useMemo, useState, useRef, useEffect } from "react";
import MyMenu from "../menu/menu.component.js";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import calender from "./../../images/calender.png";
import { roles, user_login_info } from "../../components/constant.js";
import { connect } from "react-redux";
import { retrieveDashoboardData } from "../../actions/selloutaction.js";
import { allCalMonths } from "../constant";

function SuperUseOverview(props) {
  const navigate = useNavigate();

  //sso login func
  const [rowData, setRowData] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setuserRole] = useState('');
              
  useEffect(() => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    //if user not login then redirect to login page
    if(usrDetails){
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);
                
      if(usrDetails.role_id === roles.supervisor.toUpperCase()) {
        console.log('Home screen for role supervisor');
      }else{
        navigate("/");
      }

      let year = new Date().getFullYear();

      const currentDate = new Date();
      const currentMonthIndex = currentDate.getMonth();
      const previousMonthIndex = (currentMonthIndex + 11) % 12;
      const previousMonth = allCalMonths[previousMonthIndex];
      const monthArray = [previousMonth];

      props
      .retrieveDashoboardData(
        usrDetails.email_id,
        usrDetails.role_id,
        year,
        monthArray
      )
      .then((data) => {
        setRowData(data);     
      })
      .catch((e) => {
        console.log(e);
      });
    }
  }, []);
  //------------------//

  const partnerDataNavigation = () => {
    navigate(`/partner/list?role=${roles.supervisor}`);
  };

  const userNavigation = () => {
    navigate(`/user/list?role=${roles.supervisor}`);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu />
        </Row>

        <Row>
          <div>
            <Row style={{ float: "right" }}>
              <Col xs="auto">
                <Button
                  className="btn-data save-header"
                  onClick={() => {
                    partnerDataNavigation(roles.supervisor);
                  }}
                >
                  Partner Data
                </Button>
              </Col>
              <Col xs="auto">
                <Button
                  className="btn-data save-header"
                  onClick={() => {
                    userNavigation(props.superUser);
                  }}
                >
                  User Data
                </Button>
              </Col>
            </Row>
          </div>
        </Row>

        <div className="sell-out-task-header">Task status</div>
        <Row style={{ margin: "7px 5px 0px 5px" }}>
          <Card>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "15px",
              }}
            >
              <img
                src={calender}
                alt="Arrow"
                style={{
                  height: "45px",
                  width: "45px",
                  display: "flex",
                  justifyContent: "center",
                }}
              />
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                  <Row className="number-header">
                    {rowData.total_partners_pending_approval}
                    <Row className="task-header">
                      request pending for Approval
                    </Row>
                  </Row>
                </Card.Text>

                <Card.Text className="task-header">
                  <Row className="number-header">
                    {rowData.total_partners_rejected}
                    <Row className="task-header">
                      request needs additional information
                    </Row>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Col>
          </Card>
        </Row>
      </Container>
    </>
  );
}

export default connect(null, {
  retrieveDashoboardData,
})(SuperUseOverview);