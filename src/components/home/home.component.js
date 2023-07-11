import React, { useCallback, useMemo, useState, useRef, useEffect } from "react";
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
import { roles, user_login_info } from "../constant.js";
import { retrieveDashoboardData } from "../../actions/selloutaction.js";

function Home(props) {
  const gridRef = useRef();
  const navigate = useNavigate();
  //sso login func
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setuserRole] = useState('');


  useEffect(() => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    //if user not login then redirect to login page
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);
      if (usrDetails.role_id === roles.editor.toUpperCase() ||
        usrDetails.role_id === roles.backup_editor.toUpperCase() ||
        usrDetails.role_id === roles.approve_1.toUpperCase() ||
        usrDetails.role_id === roles.approver_2.toUpperCase() ||
        usrDetails.role_id === roles.supervisor_approv_1_2.toUpperCase()) {
      }
      else {
        navigate("/");
      }
    }
  }, []);
  //------------------//

  const [rowData, setRowData] = useState([]);
  const [selloutAccuracy, setSelloutAccuracy] = useState([]);

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

  const goToGym = (params) => {
    if(params?.data) {
      let getValue = params?.data['sellout_growth_vs_last_year'];
      let splitVal = getValue.split('%');
      let onlyNumber = Number(splitVal[0]);
      return onlyNumber
    } else {
      return ''
    }
  }

  const getValueFormatter = (params) => {
    if (params.value) {
      return params.value + "%";
    } else {
      return "";
    }
  };

  const calcSellOutCurrYTDvsLYYTD = (params) => {
    if (params.data != undefined) {
      params.data['sellout_growth_vs_last_year'] = Math.round((
        (params.data['sum_sellout'] - params.data.LY_YTD_Sellout_Value_In_K_EUR)
        / params.data.LY_YTD_Sellout_Value_In_K_EUR) * 100);

      return params.data["Sellout Growth Vs Last Year"];
    }
    else {
      return Math.round((
        (params.node.aggData["YTD Sellout Value (In K EUR)"] - params.node.aggData.LY_YTD_Sellout_Value_In_K_EUR)
        / params.node.aggData.LY_YTD_Sellout_Value_In_K_EUR) * 100);
    }
  }

  const editorRowData = [{
    sellout_accuracy: 0.998084976153105,
    response_data: [
      {
        country_name: "Cambodia",
        country_code: "KHM",
        models: [
          {
            model_type: "E1 - Dist",
            partners_account_to_complete: 10,
            rejected_partners_account: 6,
            sum_sellout: 47.309999999999995,
          },
          {
            model_type: "E2 - ET",
            partners_account_to_complete: 10,
            rejected_partners_account: 6,
            sum_sellout: 0,
          }
        ],
        total: 47.419999999999995
      },
      {
        country_name: "Canada",
        country_code: "CAN",
        models: [
          {
            model_type: "E1 - Dist",
            partners_account_to_complete: 10,
            rejected_partners_account: 6,
            sum_sellout: 47.309999999999995,
          },
          {
            model_type: "E2 - ET",
            partners_account_to_complete: 10,
            rejected_partners_account: 6,
            sum_sellout: 0,
          }
        ],
        total: 47.419999999999995
      }
    ]
  }]

  const editorColDefs = [
    {
      headerName: "Scope",
      children: [
        {
          headerName: "Country",
          field: "country_name",
          rowGroup: true,
          hide: true,
        },
        {
          headerName: "Modal",
          field: "model_type",
        },
      ]
    },
    {
      headerName: "YTD Sellout Value (In K EUR)",
      field: "sum_sellout",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 160,
      cellClass: "grid-cell-centered",
      cellStyle: { 'borderRightColor': '#e2e2e2' },
    },
    {
      headerName: "Sellout Growth Vs Last Year",
      field: "sellout_growth_vs_last_year",
      spanHeaderHeight: true,
      minWidth: 150,
      aggFunc: "sum",
      cellClass: "grid-cell-centered",
      cellStyle: function (params) {
        if (params.value < "0") {
          return { color: "#ff0000", fontWeight: "bold", 'borderRightColor': '#e2e2e2' };
        } else if (params.value > "0") {
          return { color: "#009530", fontWeight: "bold", 'borderRightColor': '#e2e2e2' };
        } else {
          return null;
        }
      },
      valueGetter: (params) => {
        return goToGym(params);
      },
      valueFormatter: (params) => {
        return getValueFormatter(params);
      },
    },
    {
      headerName: "Partners Accounts To Complete",
      field: "partners_account_to_complete",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 170,
      cellClass: "grid-cell-centered",
      cellStyle: function (params) {
        if (params.value > "0") {
          return { color: "#e47f00", fontWeight: "bold", 'borderRightColor': '#e2e2e2' };
        } else if (params.value < "0") {
          return { color: "#ff0000", fontWeight: "bold", 'borderRightColor': '#e2e2e2' };
        } else if (params.value == 0) {
          return { color: "#009530", fontWeight: "bold", 'borderRightColor': '#e2e2e2' };
        } else {
          return null;
        }
      },
    },
    {
      headerName: "Accounts Rejected by Approvers",
      field: "rejected_partners_account",
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
    }
  ];

  const approverColDefs = [
    {
      headerName: "Scope",
      spanHeaderHeight: true,
      children: [
        {
          headerName: "Country",
          field: "country_name",
          width: 150,
          rowGroup: true,
          hide: true,
        },
        {
          headerName: "Modal",
           field: "model_type",
          // rowGroup: true,
          // hide: true,   
        }
      ],
    },
    {
      headerName: "YTD Sellout Value (In K EUR)",
      field: "sum_sellout",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 170,
      cellClass: "grid-cell-centered",
      valueParser: (params) => Number(params.newValue),
    },
    {
      headerName: "Sellout Growth Vs Last Year",
      field: "sellout_growth_vs_last_year",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 150,
      cellClass: "grid-cell-centered",
      cellStyle: function (params) {
        if (params.value < "0") {
          return { color: "#ff0000", fontWeight: "bold", 'borderRightColor': '#e2e2e2' };
        } else if (params.value > "0") {
          return { color: "#009530", fontWeight: "bold", 'borderRightColor': '#e2e2e2' };
        } else {
          return null;
        }
      },
    },
    {
      headerName: "Partners Accounts Completed",
      field: "partner_accounts_completed_approver",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 170,
      cellClass: "grid-cell-centered",
      cellStyle: function (params) {
        if (params.value > "0") {
          return { color: "#e47f00", fontWeight: "bold", 'borderRightColor': '#e2e2e2' };
        } else if (params.value < "0") {
          return { color: "#ff0000", fontWeight: "bold", 'borderRightColor': '#e2e2e2' };
        } else if (params.value == 0) {
          return { color: "#009530", fontWeight: "bold", 'borderRightColor': '#e2e2e2' };
        } else {
          return null;
        }
      },
    },
    {
      headerName: "Partners Accounts To Complete",
      field: "partners_account_to_complete",
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
      cellStyle: { 'borderRightColor': '#e2e2e2' },
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

  let year = new Date().getFullYear();
  let month = "jan"

  const onGridReady = useCallback((params) => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);
    }
    props
      .retrieveDashoboardData(usrDetails.email_id, usrDetails.role_id, year, month)
      .then((data) => {
        let customizedArrayForGrid = [];
        if(data.response_data.length>0) {
          setSelloutAccuracy(data);

          for(let i = 0; i< data.response_data.length; i++){
            let elementArray = data.response_data[i];
            elementArray?.models.forEach(eleFModelForMod => {
              let obj = {
                country_name: elementArray.country_name,
                model_type:eleFModelForMod.model_type,
                sum_sellout: eleFModelForMod.sum_sellout,
                sellout_growth_vs_last_year: eleFModelForMod.sellout_growth_vs_last_year,
                partners_account_to_complete: eleFModelForMod.partners_account_to_complete,
                rejected_partners_account: eleFModelForMod.rejected_partners_account,
                partner_accounts_completed_approver: eleFModelForMod.partner_accounts_completed_approver
              }
              customizedArrayForGrid.push(obj);
            });
         
          }
           setRowData(customizedArrayForGrid);
        } else {
          setRowData([]);
        }
       
      })
      .catch((e) => {
        console.log(e);
      });
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
              {props.role === "supervisor_approv_1_2" ? (
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
              {props.role === "supervisor_approv_1_2" ? (
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
              ) : (props.role === "approve_1" || props.role === "approver_2") ? (
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

              {props.role === "supervisor_approv_1_2" ? (
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
              ) : (props.role === "approve_1" || props.role === "approver_2") ? (
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

              {props.role === "supervisor_approv_1_2" ? (
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
              ) : (props.role === "approve_1" || props.role === "approver_2") ? (
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

              {props.role === "supervisor_approv_1_2" ? (
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
              ) : (props.role === "approve_1" || props.role === "approver_2") ? (
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
          <PerformanceOverview selloutAccuracy={selloutAccuracy} />
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
                props.role === "supervisor_approv_1_2"
                  ? rowData
                  : props.role === "approve_1" || props.role === "approver_2"
                    ? rowData
                    : rowData
              }
              columnDefs={
                props.role === "supervisor_approv_1_2"
                  ? editorColDefs
                  : props.role === "approve_1" || props.role === "approver_2"
                    ? approverColDefs
                    : editorColDefs
              }
              defaultColDef={defaultColDef}
              autoGroupColumnDef={defaultExcelExportParams}
              showOpenedGroup={false}
              groupHideOpenParents={true}
              animateRows={true}
              // suppressAggFuncInHeader={true}
              // groupIncludeTotalFooter={true}
              groupIncludeFooter={true}
              groupDefaultExpanded={-1}
              getRowStyle={getRowStyle}
              onGridReady={onGridReady}
              suppressAggFuncInHeader={true}
              groupIncludeTotalFooter={true}
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

export default connect(null, {
  retrieveDashoboardData,
})(Home);