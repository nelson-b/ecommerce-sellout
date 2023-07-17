import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
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
import { allCalMonths, quarters } from "../constant";
import { retrieveInputCalenderData } from "../../actions/inputCalenderAction.js";

function Home(props) {
  const gridRef = useRef();
  const navigate = useNavigate();
  //sso login func
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setuserRole] = useState("");
  const [openingDatePrepared, setOpeningDate] = useState("");
  const [closingDatePrepared, setClosinggDate] = useState("");
  const [shouldShosEditor, setShouldShosEditor] = useState(true);

  const monthsOfTheYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  useEffect(() => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    //if user not login then redirect to login page
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);
      if (
        usrDetails.role_id === roles.editor.toUpperCase() ||
        usrDetails.role_id === roles.backup_editor.toUpperCase() ||
        usrDetails.role_id === roles.approve_1.toUpperCase() ||
        usrDetails.role_id === roles.approver_2.toUpperCase() ||
        usrDetails.role_id === roles.supervisor_approv_1_2.toUpperCase()
      ) {
      } else {
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
    if (params?.data) {
      let getValue = params?.data["sellout_growth_vs_last_year"];
      let splitVal = getValue.split("%");
      let onlyNumber = Number(splitVal[0]);
      return onlyNumber;
    } else {
      return "";
    }
  };

  const getValueFormatter = (params) => {
    if (params.value) {
      return params.value + "%";
    } else {
      return "";
    }
  };

  const calcSellOutCurrYTDvsLYYTD = (params) => {
    if (params.data != undefined) {
      params.data["sellout_growth_vs_last_year"] = Math.round(
        ((params.data["sum_sellout"] -
          params.data.LY_YTD_Sellout_Value_In_K_EUR) /
          params.data.LY_YTD_Sellout_Value_In_K_EUR) *
          100
      );

      return params.data["Sellout Growth Vs Last Year"];
    } else {
      return Math.round(
        ((params.node.aggData["YTD Sellout Value (In K EUR)"] -
          params.node.aggData.LY_YTD_Sellout_Value_In_K_EUR) /
          params.node.aggData.LY_YTD_Sellout_Value_In_K_EUR) *
          100
      );
    }
  };

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
      ],
    },
    {
      headerName: "YTD Sellout Value (In K EUR)",
      field: "sum_sellout",
      spanHeaderHeight: true,
      aggFunc: "sum",
      minWidth: 160,
      cellClass: "grid-cell-centered",
      cellStyle: { borderRightColor: "#e2e2e2" },
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
          return {
            color: "#ff0000",
            fontWeight: "bold",
            borderRightColor: "#e2e2e2",
          };
        } else if (params.value > "0") {
          return {
            color: "#009530",
            fontWeight: "bold",
            borderRightColor: "#e2e2e2",
          };
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
          return {
            color: "#e47f00",
            fontWeight: "bold",
            borderRightColor: "#e2e2e2",
          };
        } else if (params.value < "0") {
          return {
            color: "#ff0000",
            fontWeight: "bold",
            borderRightColor: "#e2e2e2",
          };
        } else if (params.value == 0) {
          return {
            color: "#009530",
            fontWeight: "bold",
            borderRightColor: "#e2e2e2",
          };
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
    },
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
        },
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
          return {
            color: "#ff0000",
            fontWeight: "bold",
            borderRightColor: "#e2e2e2",
          };
        } else if (params.value > "0") {
          return {
            color: "#009530",
            fontWeight: "bold",
            borderRightColor: "#e2e2e2",
          };
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
          return {
            color: "#e47f00",
            fontWeight: "bold",
            borderRightColor: "#e2e2e2",
          };
        } else if (params.value < "0") {
          return {
            color: "#ff0000",
            fontWeight: "bold",
            borderRightColor: "#e2e2e2",
          };
        } else if (params.value == 0) {
          return {
            color: "#009530",
            fontWeight: "bold",
            borderRightColor: "#e2e2e2",
          };
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
      cellStyle: { borderRightColor: "#e2e2e2" },
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

  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  const previousMonthIndex = (currentMonthIndex + 11) % 12;
  const previousMonth = allCalMonths[previousMonthIndex];
  const monthArray = [previousMonth];

  const currentQuarter = Math.floor((currentDate.getMonth() + 3) / 3);
  const previousQuarter = currentQuarter - 1 === 0 ? 4 : currentQuarter - 1;
  const previousQuarterMonths = quarters[`Q${previousQuarter}`];

  const getProperDate = (dates) => {
    let onlyYEar = dates.slice(0, 4);
    console.log('dates:::', dates);
    let splitTIme = dates.split(" ");
    console.log('splitTIme:', splitTIme);
    let times = splitTIme[1];
    times= times.slice(0,5);
    console.log('times;:', times);
    let dt = dates;
    let dat = new Date(dt);
    let arr = dat.toString().substring(4, 10).split(" ");
    console.log('arr::::', arr);
    switch (arr[1]) {
      case 1:
        arr[1] += "st";
        break;
      case 2:
        arr[1] += "nd";
        break;
      case 3:
        arr[1] += "rd";
        break;
      case 21:
        arr[1] += "st";
        break;
      case 22:
        arr[1] += "nd";
        break;
      case 23:
        arr[1] += "rd";
        break;
      case 31:
        arr[1] += "st";
        break;
      default:
        arr[1] += "th";
        break;
    }
    let newOnesss = arr[1] + " " + arr[0] + " " + onlyYEar + " " + times + " UTC";
    return newOnesss;
  };

  const getPreviousQuarterData = (quarter) => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));

    let today = new Date();
    let year = today.getFullYear();
    let roleToPassInParam;

    if (usrDetails.role_id === roles.editor.toUpperCase()) {
      setShouldShosEditor(true);
      roleToPassInParam = "EDITOR";
    } else {
      setShouldShosEditor(false);
      roleToPassInParam = "APPROVER";
    }
    props
      .retrieveInputCalenderData(year, quarter, roleToPassInParam)
      .then((data) => {
        let closingData = data.CLOSING_DATE;
        let openingDate = data.OPENING_DATE;
        console.log("newonenewonenewone::", closingData.slice(0, 4));

        let getOpeningDate = getProperDate(openingDate);
        let getClosingDate = getProperDate(closingData);
        setOpeningDate(getOpeningDate);
        setClosinggDate(getClosingDate);
        console.log("prepared date format::", getOpeningDate, getClosingDate);
      })
      .catch((e) => {
        console.log("Partner list", e);
      });
  };

  const onGridReady = useCallback((params) => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);
    }
    let newDate = new Date().getMonth();
    let currentQurterForAPI;
    if (newDate <= 3) {
      currentQurterForAPI = "Q1";
    } else if (newDate > 3 && newDate <= 6) {
      currentQurterForAPI = "Q2";
    } else if (newDate > 6 && newDate <= 9) {
      currentQurterForAPI = "Q3";
    } else {
      currentQurterForAPI = "Q4";
    }
    let dataToPassInParams;
    if (usrDetails.role_id === roles.editor.toUpperCase()) {

      let todays = new Date();
      let cMonth = todays.getMonth();
      dataToPassInParams = monthsOfTheYear[cMonth];
    } else {
      dataToPassInParams = currentQurterForAPI;
    }

    getPreviousQuarterData(dataToPassInParams);
    let dashboard = [];
    if (usrDetails.role_id === roles.editor.toUpperCase()) {
      dashboard = monthArray;
    } else {
      dashboard = previousQuarterMonths;
    }
    props
      .retrieveDashoboardData(
        usrDetails.email_id,
        usrDetails.role_id,
        year,
        dashboard
      )
      .then((data) => {
        let customizedArrayForGrid = [];
        if (data.response_data.length > 0) {
          setSelloutAccuracy(data);

          for (let i = 0; i < data.response_data.length; i++) {
            let elementArray = data.response_data[i];
            elementArray?.models.forEach((eleFModelForMod) => {
              let obj = {
                country_name: elementArray.country_name,
                model_type: eleFModelForMod.model_type,
                sum_sellout: eleFModelForMod.sum_sellout,
                sellout_growth_vs_last_year:
                  eleFModelForMod.sellout_growth_vs_last_year,
                partners_account_to_complete:
                  eleFModelForMod.partners_account_to_complete,
                rejected_partners_account:
                  eleFModelForMod.rejected_partners_account,
                partner_accounts_completed_approver:
                  eleFModelForMod.partner_accounts_completed_approver,
              };
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
              ) : props.role === "approve_1" || props.role === "approver_2" ? (
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
              ) : props.role === "approve_1" || props.role === "approver_2" ? (
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
              ) : props.role === "approve_1" || props.role === "approver_2" ? (
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
              ) : props.role === "approve_1" || props.role === "approver_2" ? (
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
              {shouldShosEditor ?  (
              'Sell Out Data Input Window Is Open from '+openingDatePrepared

              ):(
                'Sell Out Approver Window Is Open from '+openingDatePrepared

              )
              }
            </div>
          </Col>
          <Col>
            <div className="window-header">
            {shouldShosEditor ?  (
              'Sell Out Data Input Window Will be Closed by '+ closingDatePrepared

              ):(
                'Sell Out Approver Window Will be Closed by '+ closingDatePrepared

              )
              }
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default connect(null, {
  retrieveDashoboardData,
  retrieveInputCalenderData,
})(Home);
