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
import userEditIcon from "../../../images/edit-icon.png";

function UserList() {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState();
  const location = useLocation();
  const userRole = new URLSearchParams(location.search).get("role");
  
  const handleUserEdit = (params) => {
    navigate(`/updateUser?id=${ params.data.userId }`);
  };

  const handleCreate = () => {
    navigate("/user/create");
  };

  const columnDefs = [
    {
      headerName: "Edit",
      field: "Edit",
      hide: false,
      editable: false,
      width: 80,
      suppressMenu: true,
      cellRenderer: (params) => {
        const Status = params.value;
        console.log("params data", params);
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
      headerName: "Username",
      field: "username",
      width: 250,
      sortable: true,
      filter: true,
      suppressNavigable: true,
      editable: false,
    },
    {
      headerName: "User ID",
      field: "userId",
      width: 300,
      sortable: true,
      filter: true,
      suppressNavigable: true,
      editable: false,
    },
    {
      headerName: "Role",
      field: "userrole",
      width: 200,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "Ops",
      field: "userOps",
      width: 200,
      sortable: true,
      filter: true,
      suppressNavigable: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Zone",
      field: "userZone",
      width: 250,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Country",
      field: "usrCountry",
      width: 200,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Model",
      field: "usrModel",
      width: 200,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    }
  ];

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    }),
    []
  );
  
  const onGridReady = useCallback((params) => {
    setRowData([
        {
            username: 'UserName 1',
            userId: 'UserId 1',
            userrole: 'Editor 1',
            userOps: 'Ops 1',
            userZone: 'Zone A',
            usrCountry: 'Country 1',
            usrModel: 'E1'
        },
        {
            username: 'UserName 2',
            userId: 'UserId 2',
            userrole: 'Editor 2',
            userOps: 'Ops 2',
            userZone: 'Zone A',
            usrCountry: 'Country 2',
            usrModel: 'E2'
        },
        {
            username: 'UserName 3',
            userId: 'UserId 3',
            userrole: 'Editor 3',
            userOps: 'Ops 3',
            userZone: 'Zone A',
            usrCountry: 'Country 3',
            usrModel: 'E3'
        },
    ]);
  }, []);

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
              <Breadcrumb.Item href="/superUser/home">
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
            ""
          )}
        </div>
        <Row>
          <div className="partner-request-header">
            <Col>
              <div className="sell-out-partner-header">
                USER LIST
              </div>
            </Col>
            <Col xs="auto" className="partner-container">
              {userRole == 'admin' && (
              <Button
                size="md"
                className="partner-header save-header">
                Requests
              </Button>
              )}
            </Col>
            <Col xs="auto" className="partner-container">
              <Button
                size="md"
                className="partner-header save-header"
                onClick={() => {
                  handleCreate();
                }}>
                Create User
              </Button>
            </Col>
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

export default connect(null, null)(UserList);