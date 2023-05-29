import React, { useCallback, useMemo, useState, useRef } from "react";
import { connect } from "react-redux";
import { sellOutData } from "../../actions/selloutaction";
import MyMenu from "../menu/menu.component.js";
import { Container, Row, Col, Button, Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import Home from "../../images/home-icon.png";
import { useLocation } from "react-router-dom";
import userRequestData from "../../data/userRequestData.json";

import "../home/home.component.css";

function UserRequestComponent(props) {
  const gridRef = useRef();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState();
  const location = useLocation();
  const screenRole = new URLSearchParams(location.search).get("role");

  const ChildMessageRenderer = (props) => {
    const invokeReject = () => {
      console.log(
        props.data.user_name?.length
          ? `${props.data.user_name} Selected for reject approval`
          : ""
      );
    };
    const invokeApprove = () => {
      console.log(
        props.data.user_name?.length
          ? `${props.data.user_name} selected for Validate`
          : ""
      );
    };

    return (
      <div>
        <Button
          style={{
            height: 30,
            width: 100,
            lineHeight: 0.5,
            margin: "0px 20px 5px 0px",
          }}
          onClick={invokeReject}
          className="cancel-header btn-reject"
        >
          Reject
        </Button>
        <Button
          style={{
            height: 30,
            width: 100,
            lineHeight: 0.5,
            margin: " 0px 0px 5px 0px",
          }}
          onClick={invokeApprove}
          className="save-header btn-reject"
        >
          Approve
        </Button>
      </div>
    );
  };

  const userRequestDef = [
    {
      headerName: "UserName",
      field: "user_name",
      width: 150,
      editable: false,
    },
    {
      headerName: "User ID",
      field: "user_id",
      width: 100,
    },
    {
      headerName: "Role",
      field: "role",
      width: 100,
    },
    {
      headerName: "OPS",
      field: "ops",
      width: 100,
    },
    {
      headerName: "Zone",
      field: "zone",
      width: 120,
    },
    {
      headerName: "Country",
      field: "country",
      width: 120,
    },
    {
      headerName: "Model",
      field: "Model",
      width: 100,
    },
    {
      headerName: "Action",
      field: "action",
      width: 200,
      minWidth: 200,
      maxWidth: 300,
      flex: 2,
      suppressMenu: true,
      cellRenderer: ChildMessageRenderer,
    },
  ];

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      spanHeaderHeight: true,
      filter: true,
      sortable: true,
      suppressSizeToFit: true,
      suppressMenuHide: true,
    };
  }, []);

  const getRowStyle = (params) => {
    if (params.node.aggData) {
      return { fontWeight: "bold" };
    }
  };

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu role={screenRole} />
        </Row>
        <div>
          <Breadcrumb>
            <Breadcrumb.Item href="/admin/home">
              <img
                src={Home}
                alt="home"
                style={{ height: "20px", width: "80px", cursor: "pointer" }}
              />
            </Breadcrumb.Item>
            <span style={{ color: "grey" }}> &nbsp;{">"}</span>
            <Breadcrumb.Item active style={{ color: "#000000" }}>
              &nbsp;User List
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className="sell-out-request-header">New User Requests</div>
        <Row
          className="ag-theme-alpine ag-grid-table"
          style={{ height: 350, marginTop: "10px" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={userRequestData}
            columnDefs={userRequestDef}
            defaultColDef={defaultColDef}
            animateRows={true}
            getRowStyle={getRowStyle}
            onGridReady={onGridReady}
            suppressMenuHide={true}
          ></AgGridReact>
        </Row>
      </Container>
    </>
  );
}

export default UserRequestComponent;
