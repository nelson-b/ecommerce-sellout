import React, { useCallback, useMemo, useState, useRef } from "react";
import { connect } from "react-redux";
import { sellOutData } from "../../actions/selloutaction";
import MyMenu from "../menu/menu.component.js";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import adminOverview from "../../data/adminOverview.json";
import approvalOneOverview from "../../data/approverOneOverview.json";
import approvalTwoOverview from "../../data/approverTwoOverview.json";
import "../home/home.component.css"; 

function AdminOverview(props) {
  const gridRef = useRef();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState();

  const ChildMessageRenderer = (props) => {
    const invokeNotify = () => {
      if (props.data?.data_input?.length) {
        console.log(props.data.data_input?.length ? `${props.data.data_input} selected for Notify` : "");
        
      } else if (props.data?.approval_stage1?.length) {
        console.log(props.data.approval_stage1?.length ? `${props.data.approval_stage1} selected for Notify` : "");

      } else if (props.data?.approval_stage2?.length) {
        console.log(props.data.approval_stage2?.length ? `${props.data.approval_stage2} selected for Notify` : "");
      }
    };
    return (
      <div>
        <Button
          style={{
            height: 30,
            width: 100,
            lineHeight: 0.5,
            margin: "0px 0px 5px 0px",
          }}
          onClick={invokeNotify}
          className="notify-header btn-reject"
        >
          NOTIFY
        </Button>
      </div>
    );
  };

  const adminDef = [
    {
      headerName: "Data Input",
      field: "data_input",
      width: 120,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "OPS",
      field: "ops",
      spanHeaderHeight: true,
      width: 100,
      suppressSizeToFit: true,
    },
    {
      headerName: "Zone",
      field: "zone",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      width: 120,
    },
    {
      headerName: "Country",
      field: "country",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      width: 120,
    },
    {
      headerName: "Model",
      field: "Model",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      width: 100,
    },
    {
      headerName: "Number of Partner Account Associated",
      field: "partner_account_associate",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      minWidth: 170,
      suppressMenu: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: "Number of Partner Account Filled in",
      field: "partner_account_id",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      minWidth: 160,
      suppressMenu: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: "Remaining Accounts To Fill in",
      field: "reamaining_account",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      minWidth: 160,
      cellStyle: { textAlign: 'center' },
      suppressMenu: true,
      cellClass: "grid-cell-centered",
      cellStyle: function (params) {
        if (params.value >= 10) {
          return { color: "#b10043", fontWeight: "bold" };
        } else if (params.value < 0) {
          return { color: "#ff0000", fontWeight: "bold" };
        } else if (params.value > 0) {
          return { color: "#009530", fontWeight: "bold" };
        } else {
          return null;
        }
      },
    },
    {
      headerName: "Action",
      field: "action",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      width: 170,
      suppressMenu: true,
      cellRenderer: ChildMessageRenderer,
    },
  ];

  const approverOneDef = [
    {
      headerName: "1st Approval Stage",
      field: "approval_stage1",
      minWidth: 180,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "OPS",
      field: "ops",
      spanHeaderHeight: true,
      width: 100,
      suppressSizeToFit: true,
    },
    {
      headerName: "Zone",
      field: "zone",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      width: 120,
    },
    {
      headerName: "Country",
      field: "country",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      width: 120,
    },
    {
      headerName: "Model",
      field: "Model",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      width: 100,
    },
    {
      headerName: "Number of Partner Account Associated",
      field: "partner_account_associate",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      minWidth: 170,
      suppressMenu: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: "Number of Partner Account Validated",
      field: "partner_account_validate",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      minWidth: 160,
      suppressMenu: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: "Remaining Accounts To Validate",
      field: "reamaining_account_Validate",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      minWidth: 170,
      suppressMenu: true,
      cellClass: "grid-cell-centered",
      cellStyle: function (params) {
        if (params.value >= 10) {
          return { color: "#b10043", fontWeight: "bold" };
        } else if (params.value < 0) {
          return { color: "#ff0000", fontWeight: "bold" };
        } else if (params.value > 0) {
          return { color: "#009530", fontWeight: "bold" };
        } else {
          return null;
        }
      },
    },
    {
      headerName: "Action",
      field: "action",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      width: 170,
      suppressMenu: true,
      cellRenderer: ChildMessageRenderer,
    },
  ];

  const approverTwoDef = [
    {
      headerName: "2nd Approval Stage",
      field: "approval_stage2",
      minWidth: 180,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "OPS",
      field: "ops",
      spanHeaderHeight: true,
      width: 100,
      suppressSizeToFit: true,
    },
    {
      headerName: "Zone",
      field: "zone",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      width: 120,
    },
    {
      headerName: "Country",
      field: "country",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      width: 120,
    },
    {
      headerName: "Model",
      field: "Model",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      width: 100,
    },
    {
      headerName: "Number of Partner Account Associated",
      field: "partner_account_associate",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      minWidth: 170,
      suppressMenu: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: "Number of Partner Account Validated",
      field: "partner_account_validate",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      minWidth: 160,
      suppressMenu: true,
      cellClass: "grid-cell-centered",
    },
    {
      headerName: "Remaining Accounts To Validate",
      field: "reamaining_account_Validate",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      minWidth: 170,
      cellClass: "grid-cell-centered",
      suppressMenu: true,
      cellStyle: function (params) {
        if (params.value >= 10) {
          return { color: "#b10043", fontWeight: "bold" };
        } else if (params.value < 0) {
          return { color: "#ff0000", fontWeight: "bold" };
        } else if (params.value > 0) {
          return { color: "#009530", fontWeight: "bold" };
        } else {
          return null;
        }
      },
    },
    {
      headerName: "Action",
      field: "action",
      spanHeaderHeight: true,
      suppressSizeToFit: true,
      width: 170,
      suppressMenu: true,
      cellRenderer: ChildMessageRenderer,
    },
  ];

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      resizable: true,
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

  const partnerDataNavigation = (props) => {
    navigate(`/partner/list?role=${props.role}`);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu role={props.role}/>
        </Row>
        <Row>
          <div>
            <Row className="" style={{ float: "right" }}>
              <Col xs="auto">
                <Button className="btn-overview save-header">User Data</Button>
              </Col>
              <Col xs="auto">
                <Button
                  className="btn-overview save-header"
                  onClick={() => {
                    partnerDataNavigation(props);
                  }}
                >
                  Partner Data
                </Button>
              </Col>
              <Col xs="auto">
                <Button className="btn-data save-header">Input Calendar</Button>
              </Col>
            </Row>
          </div>
        </Row>

        <div className="sell-out-admin-header">Admin Overview</div>
        <Row
          className="ag-theme-alpine ag-grid-table"
          style={{ height: 200, marginTop: "10px" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={adminOverview}
            columnDefs={adminDef}
            defaultColDef={defaultColDef}
            animateRows={true}
            getRowStyle={getRowStyle}
            onGridReady={onGridReady}
            suppressMenuHide={true}
          ></AgGridReact>
        </Row>

        <Row
          className="ag-theme-alpine ag-grid-table"
          style={{ height: 200, marginTop: "20px" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={approvalOneOverview}
            columnDefs={approverOneDef}
            defaultColDef={defaultColDef}
            animateRows={true}
            getRowStyle={getRowStyle}
            onGridReady={onGridReady}
            suppressMenuHide={true}
          ></AgGridReact>
        </Row>

        <Row
          className="ag-theme-alpine ag-grid-table"
          style={{ height: 200, marginTop: "20px", marginBottom: "30px" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={approvalTwoOverview}
            columnDefs={approverTwoDef}
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

export default AdminOverview;
