"use strict";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useCallback } from "react";
import { Button, Row, Col, Container, Breadcrumb } from "react-bootstrap";
import MyMenu from "../../menu/menu.component.js";
import { AgGridReact } from "ag-grid-react";
import Home from "../../../images/home-icon.png";
import "../list/list.css";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { retrieveAllNewListByRole } from "../../../actions/userAction.js";
import userEditIcon from "../../../images/edit-icon.png";

function UserList(props) {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState();
  const location = useLocation();
  const userRole = new URLSearchParams(location.search).get("role");

  const handleUserEdit = (params) => {
    navigate(`/user/update?id=${params.data.email_id}&role=${userRole}`);
  };

  const handleCreate = () => {
    navigate(`/user/create?role=${userRole}`);
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

  let userMail = '';

  if(userRole == 'superApproverUser') {
    userMail = 'thomas@se.com'
  }
  if(userRole == 'admin') {
    userMail = 'jean@se.com'
  } 
  if(userRole == 'superUser') {
    userMail = 'marie@se.com'
  } 

  const onGridReady = useCallback((params) => {
    props
      .retrieveAllNewListByRole(userRole)
      .then((data) => {
        setRowData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleRequest = () => {
    navigate(`/user/Request?role=${userRole}`);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu />
        </Row>
        <div>
          {userRole === "admin" ? (
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
          ) : userRole === "superApproverUser" ? (
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
          ) : userRole === "superUser" ? (
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
                  {userRole == "admin" && (
                    <Button
                      size="md"
                      className="btn-overview save-header"
                      onClick={() => {
                        handleRequest(userRole);
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
                      handleCreate(userRole);
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
