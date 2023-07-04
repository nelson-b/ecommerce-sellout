"use strict";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Button, Row, Col, Container, Breadcrumb } from "react-bootstrap";
import MyMenu from "../../menu/menu.component.js";
import { AgGridReact } from "ag-grid-react";
import Home from "../../../images/home-icon.png";
import "../list/list.css";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { retrieveAllNewListByRole } from "../../../actions/userAction.js";
import userEditIcon from "../../../images/edit-icon.png";
import { roles, user_login_info } from "../../constant.js";

function UserList(props) {
  const navigate = useNavigate();

  //sso login func
  const [userEmail, setUserEmail] = useState('');
  const [userRoleData, setUserRoleData] = useState('');
                  
  useEffect(() => {
        const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
        //if user not login then redirect to login page
        if(usrDetails){
          setUserEmail(usrDetails.email_id);
          setUserRoleData(usrDetails.role_id);
                    
          if(usrDetails.role_id === roles.admin.toUpperCase() ||
            usrDetails.role_id === roles.supervisor.toUpperCase() ||
            usrDetails.role_id === roles.supervisor_approv_1_2.toUpperCase()) {
            console.log('user list for role admin');
          } else {
            navigate("/");
          }
        }
  }, []);

  const [rowData, setRowData] = useState();
  const location = useLocation();

  const handleUserEdit = (params) => {
    navigate(`/user/update?id=${params.data.email_id}&role=${userRoleData}`);
  };

  const handleCreate = () => {
    navigate(`/user/create?role=${userRoleData}`);
  };

  const columnDefs = [
    {
      headerName: "Edit",
      field: "Edit",
      hide: false,
      editable: false,
      width: 80,
      flex: 0,
      suppressMenu: true,
      cellRenderer: (params) => {
        const Status = params.value;
        return (
          <div>
            <img
              src={userEditIcon}
              alt="user"
              onClick={(e) => handleUserEdit(params)}
              style={{ height: "20px", width: "20px", cursor: "pointer" }}
            />
          </div>
        );
      },
    },
    {
      headerName: "First Name",
      field: "first_name",
      width: 200,
      sortable: true,
      filter: true,
      suppressNavigable: true,
      editable: false,
    },
    {
      headerName: "Last Name",
      field: "last_name",
      width: 200,
      sortable: true,
      filter: true,
      suppressNavigable: true,
      editable: false,
    },
    {
      headerName: "User ID",
      field: "email_id",
      width: 200,
      sortable: true,
      filter: true,
      suppressNavigable: true,
      editable: false,
    },
    {
      headerName: "Role",
      field: "role_id",
      width: 150,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "Ops",
      field: "ops_val",
      width: 200,
      sortable: true,
      filter: true,
      suppressNavigable: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Zone",
      field: "zone_val",
      width: 200,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Country",
      field: "country_code",
      width: 200,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Model",
      field: "model_val",
      width: 180,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
  ];

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      resizable: true,
      filter: true,
      sortable: true,
      suppressSizeToFit: true,
      suppressMenuHide: true,
    }),
    []
  );



  const onGridReady = useCallback((params) => {
    props
      .retrieveAllNewListByRole(userRoleData == roles.admin ? '' : userRoleData)// for admin all users should be visible
      .then((data) => {
        setRowData(data.filter((e) => e.status == "ACTIVE"));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleRequest = () => {
    navigate(`/user/Request?role=${userRoleData}`);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu />
        </Row>
        <div>
          {userRoleData === "admin" ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/admin/home">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
              <span> &nbsp;{">"}</span>
              <Breadcrumb.Item active style={{ fontWeight: "bold" }}>
                &nbsp;User List
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : userRoleData === "superApproverUser" ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/superApproverUser/home">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
              <span> &nbsp;{">"}</span>
              <Breadcrumb.Item active style={{ fontWeight: "bold" }}>
                &nbsp;User List
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : userRoleData === "superUser" ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/superUser">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
              <span> &nbsp;{">"}</span>
              <Breadcrumb.Item active style={{ fontWeight: "bold" }}>
                &nbsp;User List
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : (
            <div></div>
          )}
        </div>
        <Row>
          <div className="partner-request-header">
            <Col>
              <div className="sell-out-partner-header">USER LIST</div>
            </Col>
            <div>
              <Row className="" style={{ float: "right" }}>
                <Col xs="auto">
                  {userRoleData == "admin" && (
                    <Button
                      size="md"
                      className="btn-overview save-header"
                      onClick={() => {
                        handleRequest(userRoleData);
                      }}
                    >
                      Requests
                    </Button>
                  )}
                </Col>
                <Col xs="auto">
                  <Button
                    size="md"
                    className="btn-overview save-header"
                    onClick={() => {
                      handleCreate(userRoleData);
                    }}
                  >
                    Create User
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Row>
        <>
          <div
            className="ag-theme-alpine ag-grid-table"
            style={{ height: 350, margin: "7px 0px 0px 0px" }}
          >
            <AgGridReact
              className="ag-theme-alpine"
              animateRows="true"
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              enableRangeSelection="true"
              rowSelection="multiple"
              suppressRowClickSelection="true"
              suppressMenuHide={true}
              onGridReady={onGridReady}
            />
          </div>
        </>
      </Container>
    </>
  );
}

export default connect(null, { retrieveAllNewListByRole })(UserList);