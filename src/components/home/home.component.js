import React, { useCallback, useMemo, useState, useRef } from "react";
import { connect } from "react-redux";
import MyMenu from "../menu/menu.component.js";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./home.component.css";
import PerformanceOverview from "./performanceOverview";
import { AgGridReact } from "ag-grid-react";
import editorOverview from "../../data/editorOverview.json";
import approveOverview from "../../data/approverOverview.json";
import superOverview from "../../data/superOverview.json";
import footerTotalReview from "../editorDataReview/footerTotalReview";

function Home(props) {
  const gridRef = useRef();
  const navigate = useNavigate();

  const [rowData, setRowData] = useState();

  const dataInputNavigation = (props) => {
    navigate(`/dataInput?role=${props}`);
  };

  const dataReviewNavigation = (props) => {
    navigate(`/dataReview?role=${props}`);
  };

  const partnerDataNavigation = (props) => {
    navigate(`/partner/list?role=${props}`);
  };

  const buSplitNavigation = (props) => {
    navigate(`/buSplit?role=${props}`);
  };

  const approverReviewNavigation = (props) => {
    navigate(`/approverReview?role=${props}`);
  };

  const partnerQuarterNavigation = (props) => {
    navigate(`/partner/previousReview?role=${props}`);
  };

  const userNavigation = (props) => {
    navigate(`/user/list?role=${props}`);
  };

  const calcSellOutCurrYTDvsLYYTD = (params) => { 
      if(params.data!=undefined){
        params.data["Sellout Growth Vs Last Year"] = Math.round((
          (params.data["YTD Sellout Value (In K EUR)"] - params.data.LY_YTD_Sellout_Value_In_K_EUR)
        /params.data.LY_YTD_Sellout_Value_In_K_EUR) * 100);
    
      return params.data["Sellout Growth Vs Last Year"];
    }
    else
    {
      return Math.round((
        (params.node.aggData["YTD Sellout Value (In K EUR)"] - params.node.aggData.LY_YTD_Sellout_Value_In_K_EUR)
      /params.node.aggData.LY_YTD_Sellout_Value_In_K_EUR) * 100);
    }
  }

  const editorColDefs = [
    {
      headerName: "Scope",
      children: [
        {
          field: "Country",
          rowGroup: true,
          hide: true,
        },
        { field: "Model" },
      ],
    },
    {
      field: "LY_YTD_Sellout_Value_In_K_EUR",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 160,
      cellClass: "grid-cell-centered",
      hide: true
    },
    {
      field: "YTD Sellout Value (In K EUR)",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 160,
      cellClass: "grid-cell-centered",
    },
    {
      field: "Sellout Growth Vs Last Year",
      spanHeaderHeight: true,
      minWidth: 150,
      cellClass: "grid-cell-centered",
      valueFormatter: (params) => {
        return params.value + "%";
      },
      valueGetter: (params) => {
        return calcSellOutCurrYTDvsLYYTD(params);
      },
      cellStyle: function (params) {
        if (params.value < "0") {
          return { color: "#ff0000", fontWeight: "bold", 'borderRightColor': '#e2e2e2'};
        } else if (params.value > "0") {
          return { color: "#009530", fontWeight: "bold", 'borderRightColor': '#e2e2e2'};
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
      cellClass: "grid-cell-centered",
      cellStyle: function (params) {
        if (params.value > "0") {
          return { color: "#e47f00", fontWeight: "bold", 'borderRightColor': '#e2e2e2'};
        } else if (params.value < "0") {
          return { color: "#ff0000", fontWeight: "bold", 'borderRightColor': '#e2e2e2'};
        } else if (params.value == 0) {
          return { color: "#009530", fontWeight: "bold", 'borderRightColor': '#e2e2e2'};
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
      cellClass: "grid-cell-centered",
      cellStyle: function (params) {
        if (params.value > "0") {
          return { color: "#b10043", fontWeight: "bold" };
        } else if (params.value < "0") {
          return { color: "#ff0000", fontWeight: "bold" };
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
      cellClass: "grid-cell-centered",
    },
    {
      field: "Sellout Growth Vs Last Year",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 150,
      cellClass: "grid-cell-centered",
      valueFormatter: (params) => {
        return params.value + "%";
      },
      cellStyle: function (params) {
        if (params.value < "0") {
          return { color: "#ff0000", fontWeight: "bold", 'borderRightColor': '#e2e2e2'};
        } else if (params.value > "0") {
          return { color: "#009530", fontWeight: "bold", 'borderRightColor': '#e2e2e2'};
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
      cellClass: "grid-cell-centered",
      cellStyle: function (params) {
        if (params.value > "0") {
          return { color: "#e47f00", fontWeight: "bold", 'borderRightColor': '#e2e2e2'};
        } else if (params.value < "0") {
          return { color: "#ff0000", fontWeight: "bold", 'borderRightColor': '#e2e2e2'};
        } else if (params.value == 0) {
          return { color: "#009530", fontWeight: "bold", 'borderRightColor': '#e2e2e2'};
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
      cellClass: "grid-cell-centered",
      cellStyle: function (params) {
        if (params.value > "0") {
          return { color: "#b10043", fontWeight: "bold" };
        } else if (params.value < "0") {
          return { color: "#ff0000", fontWeight: "bold" };
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
      cellClass: "grid-cell-centered",
      cellStyle: {'borderRightColor': '#e2e2e2'},
    },
    {
      field: "Sellout Growth Vs Last Year",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 150,
      cellClass: "grid-cell-centered",
      valueFormatter: (params) => {
        return params.value + "%";
      },
      cellStyle: function (params) {
        if (params.value < "0") {
          return { color: "#ff0000", fontWeight: "bold" , 'borderRightColor': '#e2e2e2'};
        } else if (params.value > "0") {
          return { color: "#009530", fontWeight: "bold" , 'borderRightColor': '#e2e2e2'};
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
      cellClass: "grid-cell-centered",
      cellStyle: {'borderRightColor': '#e2e2e2'},
      cellStyle: function (params) {
        if (params.value > "0") {
          return { color: "#e47f00", fontWeight: "bold", 'borderRightColor': '#e2e2e2'};
        } else if (params.value < "0") {
          return { color: "#ff0000", fontWeight: "bold" ,'borderRightColor': '#e2e2e2'};
        } else if (params.value == 0) {
          return { color: "#009530", fontWeight: "bold" , 'borderRightColor': '#e2e2e2'};
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
      cellClass: "grid-cell-centered",
      cellStyle: function (params) {
        if (params.value > "0") {
          return { color: "#b10043", fontWeight: "bold" };
        } else if (params.value < "0") {
          return { color: "#ff0000", fontWeight: "bold" };
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
      minWidth: 150,
      cellStyle: {'borderRightColor': '#e2e2e2'},
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
            <Row className="mb-4" style={{ float: "right" }}>
              {props.role === "superApproverUser" ? (
                <Col xs="auto">
                  <Button
                    className="btn-data save-header"
                    onClick={() => {
                      approverReviewNavigation(props.role);
                    }}
                  >
                    Data Review
                  </Button>
                </Col>
              ) : (
                ""
              )}
              {props.role === "superApproverUser" ? (
                <Col xs="auto">
                  <Button
                    className="btn-approve save-header"
                    onClick={() => {
                      partnerQuarterNavigation(props.role);
                    }}
                  >
                    Previous Data Approval
                  </Button>
                </Col>
              ) : (props.role === "approver" || props.role === "approve_1" || props.role === "approver_2") ? (
                <Col xs="auto">
                  <Button
                    className="btn-data save-header"
                    onClick={() => {
                      approverReviewNavigation(props.role);
                    }}
                  >
                    Data Review
                  </Button>
                </Col>
              ) : props.role === "editor" ? (
                <Col xs="auto">
                  <Button
                    className="btn-data save-header"
                    onClick={() => {
                      dataInputNavigation(props.role);
                    }}
                  >
                    Data Input
                  </Button>
                </Col>
              ) : (
                ""
              )}

              {props.role === "superApproverUser" ? (
                <Col xs="auto">
                  <Button
                    className="btn-split save-header"
                    onClick={() => {
                      buSplitNavigation(props.role);
                    }}
                  >
                    BU Split
                  </Button>
                </Col>
              ) : (props.role === "approver" || props.role === "approve_1" || props.role === "approver_2") ? (
                <Col xs="auto">
                  <Button
                    className="btn-approve save-header"
                    onClick={() => {
                      partnerQuarterNavigation(props.role);
                    }}
                  >
                    Previous Data Approval
                  </Button>
                </Col>
              ) : props.role === "editor" ? (
                <Col xs="auto">
                  <Button
                    className="btn-data save-header"
                    onClick={() => {
                      dataReviewNavigation(props.role);
                    }}
                  >
                    Data Review
                  </Button>
                </Col>
              ) : (
                ""
              )}

              {props.role === "superApproverUser" ? (
                <Col xs="auto">
                  <Button
                    className="btn-data save-header"
                    onClick={() => {
                      partnerDataNavigation(props.role);
                    }}
                  >
                    Partner Data
                  </Button>
                </Col>
              ) : (props.role === "approver" || props.role === "approve_1" || props.role === "approver_2") ? (
                <Col xs="auto">
                  <Button
                    className="btn-data save-header"
                    onClick={() => {
                      buSplitNavigation(props.role);
                    }}
                  >
                    BU Split
                  </Button>
                </Col>
              ) : props.role === "editor" ? (
                <Col xs="auto">
                  <Button
                    className="btn-data save-header"
                    onClick={() => {
                      buSplitNavigation(props.role);
                    }}
                  >
                    BU Split
                  </Button>
                </Col>
              ) : (
                ""
              )}

              {props.role === "superApproverUser" ? (
                <Col xs="auto">
                  <Button
                    className="btn-split save-header"
                    onClick={() => {
                      userNavigation(props.role);
                    }}
                  >
                    User Data
                  </Button>
                </Col>
              ) : (props.role === "approver" || props.role === "approve_1" || props.role === "approver_2") ? (
                <Col>
                  <Button
                    className="btn-data save-header"
                    onClick={() => {
                      partnerDataNavigation(props.role);
                    }}
                  >
                    Partner Data
                  </Button>
                </Col>
              ) : props.role === "editor" ? (
                <Col>
                  <Button
                    className="btn-data save-header"
                    onClick={() => {
                      partnerDataNavigation(props.role);
                    }}
                  >
                    Partner Data
                  </Button>
                </Col>
              ) : (
                ""
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
            style={{ height: 350, width: 1110, marginTop: "10px" }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={
                props.role === "superApproverUser"
                  ? superOverview
                  : props.role === "approver"
                  ? approveOverview
                  : editorOverview
              }
              columnDefs={
                props.role === "superApproverUser"
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
              Sell Out Data Input Window Is Open Till 20th May 18:00 UTC
            </div>
          </Col>
          <Col>
            <div className="window-header">
              Sell Out Data Input Window Will be Closed by 25th May 18:00 UTC
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default connect(null, null)(Home);
