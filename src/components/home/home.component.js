import React, { useCallback, useMemo, useState, useRef } from "react";
import { connect } from "react-redux";
import { sellOutData } from "../../actions/selloutaction";
import MyMenu from "../menu/menu.component.js";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./home.component.css";
import PerformanceOverview from "./po.component";
import { AgGridReact } from "ag-grid-react";
import editorOverview from "../../data/editorOverview.json";
import approveOverview from "../../data/approverOverview.json";
import superOverview from "../../data/superOverview.json";
import footerTotalReview from "../editorDataReview/footerTotalReview";

function Home(props) {
  const gridRef = useRef();
  const navigate = useNavigate();

  const [rowData, setRowData] = useState();

  const dataInputNavigation = () => {
    navigate("/dataInput");
  };

  const dataReviewNavigation = () => {
    navigate("/dataReview");
  };

  const partnerDataNavigation = () => {
    navigate("/addPartner");
  };

  const approverReviewNavigation = () => {
    navigate("/approverReview");
  };

  const editorColDefs = [
    {
      headerName: "Scope",
      children: [
        {
          field: "Country",
          rowGroup: true,
          hide: true,
        },
        { field: "Model" }
      ],
    },
    {
      field: "YTD Sellout Value (In K EUR)",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 170,
    },
    {
      field: "Sellout Growth Vs Last Year",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 150,
      valueFormatter: (params) => {
        return params.value + "%";
      },
      cellStyle: function (params) {
        if (params.value < "0") {
          return { color: "#b10043", fontWeight: "bold" };
        } else if (params.value > "0") {
          return { color: "#009530", fontWeight: "bold" };
        } else {
          return null;
        }
      },
    },
    {
      field: "Partners Accounts To Complete",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 170,
      cellStyle: function (params) {
        if (params.value > "0") {
          return { color: "#e47f00", fontWeight: "bold" };
        } else if (params.value == 0) {
          return { color: "#009530", fontWeight: "bold" };
        } else {
          return null;
        }
      },
    },
    {
      field: "Accounts Rejected by Approvers",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 170,
      cellStyle: function (params) {
        if (params.value > "0") {
          return { color: "#b10043", fontWeight: "bold" };
        } else if (params.value == 0) {
          return { color: "#009530", fontWeight: "bold" };
        } else {
          return null;
        }
      },
    },
  ];

  const approverColDefs = [
    {
      headerName: "Scope",
      spanHeaderHeight: true,
      children: [
        {
          field: "Country",
          width: 150,
          rowGroup: true,
          hide: true,
        },
        { field: "Model", width: 100 },
      ],
    },
    {
      field: "YTD Sellout Value (In K EUR)",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 170,
    },
    {
      field: "Sellout Growth Vs Last Year",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 150,
      valueFormatter: (params) => {
        return params.value + "%";
      },
      cellStyle: function (params) {
        if (params.value < "0") {
          return { color: "#b10043", fontWeight: "bold" };
        } else if (params.value > "0") {
          return { color: "#009530", fontWeight: "bold" };
        } else {
          return null;
        }
      },
    },
    {
      field: "Partners Accounts Completed",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 170,
      cellStyle: function (params) {
        if (params.value > "0") {
          return { color: "#e47f00", fontWeight: "bold" };
        } else if (params.value == 0) {
          return { color: "#009530", fontWeight: "bold" };
        } else {
          return null;
        }
      },
    },
    {
      field: "Partners Accounts To Complete",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 170,
      cellStyle: function (params) {
        if (params.value > "0") {
          return { color: "#b10043", fontWeight: "bold" };
        } else if (params.value == 0) {
          return { color: "#009530", fontWeight: "bold" };
        } else {
          return null;
        }
      },
    },
  ];

  const superColColDefs = [
    {
      headerName: "Scope",
      spanHeaderHeight: true,
      children: [
        {
          field: "Country",
          width: 150,
          rowGroup: true,
          hide: true,
        },
        { field: "Model", width: 100 },
      ],
    },
    {
      field: "YTD Sellout Value (In K EUR)",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 170,
    },
    {
      field: "Sellout Growth Vs Last Year",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 150,
      valueFormatter: (params) => {
        return params.value + "%";
      },
      cellStyle: function (params) {
        if (params.value < "0") {
          return { color: "#b10043", fontWeight: "bold" };
        } else if (params.value > "0") {
          return { color: "#009530", fontWeight: "bold" };
        } else {
          return null;
        }
      },
    },
    {
      field: "Partners Accounts To Complete",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 170,
      cellStyle: function (params) {
        if (params.value > "0") {
          return { color: "#e47f00", fontWeight: "bold" };
        } else if (params.value == 0) {
          return { color: "#009530", fontWeight: "bold" };
        } else {
          return null;
        }
      },
    },
    {
      field: "Accounts Rejected by Approvers",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 170,
      cellStyle: function (params) {
        if (params.value > "0") {
          return { color: "#b10043", fontWeight: "bold" };
        } else if (params.value == 0) {
          return { color: "#009530", fontWeight: "bold" };
        } else {
          return null;
        }
      },
    },
  ];

  const defaultColDef = useMemo(() => {
    return {
      wrapHeaderText: true,
      autoHeaderHeight: true,
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
    };
  }, []);

  const defaultExcelExportParams = useMemo(() => {
    return {
      headerName: "Country",
      allColumns: true,
      cellRendererParams: {
        suppressCount: true,
        innerRenderer: footerTotalReview,
      },
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
          <MyMenu />
        </Row>
        <Row>
          <div>
            <Row className="mb-4" style={{ float: "right", marginTop: "10px" }}>
              {props.role === "superuser" ? (
                <Col xs="auto">
                  <Button
                    className="btn-data save-header"
                    onClick={() => {
                      dataReviewNavigation();
                    }}
                  >
                    Data Review
                  </Button>
                </Col>
              ) : (
                ""
              )}
              {props.role === "superuser" ? (
                <Col xs="auto">
                  <Button className="btn-approve save-header">
                    Previous Data Approval
                  </Button>
                </Col>
              ) : props.role === "approver" ? (
                <Col xs="auto">
                  <Button
                    className="btn-data save-header"
                    onClick={() => {
                      approverReviewNavigation();
                    }}
                  >
                    Data Review
                  </Button>
                </Col>
              ) : (
                <Col xs="auto">
                  <Button
                    className="btn-data save-header"
                    onClick={() => {
                      dataInputNavigation();
                    }}
                  >
                    Data Input
                  </Button>
                </Col>
              )}

              {props.role === "superuser" ? (
                <Col xs="auto">
                  <Button className="btn-split save-header">BU Split</Button>
                </Col>
              ) : props.role === "approver" ? (
                <Col xs="auto">
                  <Button className="btn-approve save-header">
                    Previous Data Approval
                  </Button>
                </Col>
              ) : (
                <Col xs="auto">
                  <Button
                    className="btn-data save-header"
                    onClick={() => {
                      dataReviewNavigation();
                    }}
                  >
                    Data Review
                  </Button>
                </Col>
              )}

              {props.role === "superuser" ? (
                <Col xs="auto">
                  <Button
                    className="btn-data save-header"
                    onClick={() => {
                      partnerDataNavigation();
                    }}
                  >
                    Partner Data
                  </Button>
                </Col>
              ) : props.role === "approver" ? (
                <Col xs="auto">
                  <Button className="btn-data save-header">BU Split</Button>
                </Col>
              ) : (
                <Col xs="auto">
                  <Button className="btn-data save-header">BU Split</Button>
                </Col>
              )}

              {props.role === "superuser" ? (
                <Col xs="auto">
                  <Button className="btn-split save-header">User Data</Button>
                </Col>
              ) : props.role === "approver" ? (
                <Col>
                  <Button
                    className="btn-data save-header"
                    onClick={() => {
                      partnerDataNavigation();
                    }}
                  >
                    Partner Data
                  </Button>
                </Col>
              ) : (
                <Col>
                  <Button
                    className="btn-data save-header"
                    onClick={() => {
                      partnerDataNavigation();
                    }}
                  >
                    Partner Data
                  </Button>
                </Col>
              )}
            </Row>
          </div>
        </Row>
        <Row>
          <PerformanceOverview />
        </Row>
        <Row className="overview-container">
          <div className="sell-out-home-header">Data Input Overview</div>
          <Row
            className="ag-theme-alpine ag-grid-table"
            style={{ height: 300, width: 1000, marginTop: "10px" }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={
                props.role === "superuser"
                  ? superOverview
                  : props.role === "approver"
                  ? approveOverview
                  : editorOverview
              }
              columnDefs={
                props.role === "superuser"
                  ? superColColDefs
                  : props.role === "approver"
                  ? approverColDefs
                  : editorColDefs
              }
              defaultColDef={defaultColDef}
              autoGroupColumnDef={defaultExcelExportParams}
              showOpenedGroup={false}
              groupHideOpenParents={true}
              animateRows={true}
              suppressAggFuncInHeader={true}
              groupIncludeTotalFooter={false}
              groupIncludeFooter={true}
              groupDefaultExpanded={-1}
              getRowStyle={getRowStyle}
              onGridReady={onGridReady}
            ></AgGridReact>
          </Row>
        </Row>
        <Row className="bottom-container">
          <Col className="window-container">
            <div className="window-header">
              Sell Out Data Input Window Is Open Till 16th May 18:00 UTC
            </div>
          </Col>
          <Col>
            <div className="window-header">
              New Partner Creation request has been approved
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default connect(null, null)(Home);