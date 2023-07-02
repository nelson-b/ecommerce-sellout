import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { AgGridColumn } from "ag-grid-react";
import {
  Button,
  Row,
  Col,
  Stack,
  ToggleButton,
  ButtonGroup,
  Breadcrumb,
  Container,
  Form,
} from "react-bootstrap";

import { allCalMonths, quarters, roles, user_login_info } from "../constant";

import MyMenu from "../menu/menu.component.js";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import approverData from "../../data/reviewApprover.json";
import approverDataEuro from "../../data/reviewApproverEuro.json";
import footerTotalReview from "./../editorDataReview/footerTotalReview";
import AlertModal from "../modal/alertModel";
import active from "../../images/active.png";
import closed from "../../images/closed.png";
import Home from "../../images/home-icon.png";
import "../approverDataReview/dataReviewApprover.css";
import { useLocation } from "react-router-dom";
import { retrieveHistoricalData } from "../../actions/selloutaction";
import {
  createData,
  updateSellOutReviewData,
  updateSellOutData,
} from "../../actions/dataInputAction";
import { connect } from "react-redux";
import {
  retrieveInputCalenderData,
} from "../../actions/inputCalenderAction";
import {retrievePartnerByRole} from "../../actions/partneraction";

function DataReviewApprover(props) {
  const gridRef = useRef();
  const navigate = useNavigate();

  //sso login func
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setuserRole] = useState('');

  useEffect(() => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    //if user not login then redirect to login page
    if(usrDetails){
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);

      if(usrDetails.role_id === roles.approve_1.toUpperCase() || 
        usrDetails.role_id === roles.approver_2.toUpperCase() ||
        usrDetails.role_id === roles.supervisor_approv_1_2.toUpperCase()){
          console.log('data review for approver');
      } else {
        //if not approver 1 or approver 2 then navigate to login page
        navigate("/");
      }
    }
  }, []);
  //------------------//

  const [rowData, setRowData] = useState();

  const [reviewData, setReviewData] = useState([]);

  const [radioValue, setRadioValue] = useState("1");

  const [message, setMessage] = useState(0);

  const location = useLocation();

  let historicalRole = new URLSearchParams(location.search).get("role");
  const [isYearColumnVisible, setIsYearColumnVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [shouldDisableSaveButton, setShouldDisableSaveButton] = useState(false);

  const radios = [
    { name: "Reporting Currency", value: "1" },
    { name: "Euro", value: "2" },
  ];

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

  const columnDefs = [
    {
      headerName: "Zone",

      field: "zone_val",

      rowGroup: true,

      hide: true,
    },

    {
      headerName: "Country",

      field: "country_code",

      rowGroup: true,

      hide: true,

      filter: true,

      pinned: "left",

      suppressSizeToFit: true,

      editable: false,
    },

    {
      headerName: "Model",

      field: "model_type",

      rowGroup: true,

      hide: true,

      filter: true,

      pinned: "left",

      suppressSizeToFit: true,

      editable: false,
    },

    {
      headerName: "Partner Account Name",

      field: "partner_account_name",

      rowGroup: true,

      hide: true,

      filter: true,

      pinned: "left",

      suppressSizeToFit: true,

      editable: false,
    },

    {
      headerName: "Currency of Reporting",
      field: radioValue == 1 ? "trans_currency_code" : "trans_currency_codeE",

      pinned: "left",

      width: 140,

      editable: false,

      suppressMenu: true,
    },

    {
      headerName: "Status",

      field: "status",

      pinned: "left",

      width: 110,

      suppressMenu: true,

      cellRenderer: (params) => {
        const Status = params.value;

        return (
          <div>
            {Status === "ACTIVE" && (
              <img src={active} alt="active" style={{ width: "80px" }} />
            )}

            {Status === "Closed" && (
              <img src={closed} alt="closed" style={{ width: "80px" }} />
            )}
          </div>
        );
      },
    },
  ];

  const getCurrentQuarter = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const quarter = Math.ceil(month / 3);
    return `Q${quarter}`;
  };

  const getQuarterMonths = (quarter) => {
    const quarters = {
      Q1: ["Jan", "Feb", "Mar"],
      Q2: ["Apr", "May", "Jun"],
      Q3: ["Jul", "Aug", "Sep"],
      Q4: ["Oct", "Nov", "Dec"],
    };

    return quarters[quarter] || [];
  };

  let userMail = "";

  if (historicalRole == "approve_1") {
    userMail = "nelson@se.com";
  }

  if (historicalRole == "approver_2") {
    userMail = "nelson@se.com";
  }

  if (historicalRole == "superApproverUser") {
    historicalRole = "supervisor_approv_1_2";
    userMail = "cnchn00073@example.com";
  }

  const year = new Date().getFullYear();

  const getQuarterReviewData = (userMail, year, historicalRole) => {
    let yearCurrent = new Date().getFullYear();
    props
      .retrieveHistoricalData(userMail, year, historicalRole)
      .then((data) => {
        let final_arr = [];
        if(data.length) {
          let previousAPIData = data;
          props
          .retrievePartnerByRole(userMail,historicalRole)
          .then((data) => {
            console.log('showMeData from next API', data.data);
            if(data.data.length) {
              let secondArray =[];
              secondArray = data?.data;
              for(let i=0; i<previousAPIData.length; i++) {
                for(let j=0; j<secondArray.length; j++) {
                  if(previousAPIData[i].partner_id == secondArray[j].partner_id){
                    secondArray.splice(j,1);
                  }
                }
              }
              previousAPIData = previousAPIData.concat(secondArray);
              console.log('previousAPIData:::', previousAPIData);
              previousAPIData.map((item) => {
                let string_year_val = item.year_val? item.year_val.toString(): yearCurrent.toString();
                let itemYear = string_year_val.slice(2, string_year_val.length);
                let obj = {};
                obj.zone_val = item.zone_val;
                obj.country_code = item.country_code;
                obj.partner_account_name = item.partner_account_name;
                obj.model_type = item.model_type;
                obj.status = item.status;
                obj.trans_currency_code = item.trans_currency_code;
                obj["trans_currency_codeE"] = "EUR";
                obj.SelloutCQ = "";
                obj.systemComments = "";
                obj.editorComments = item.editor_comment;
                obj.YTD = "";
                obj.YTD_Growth = "";
                obj.ambition = "";
                obj.approverComments = "";
                obj.partner_id = item.partner_id;
                obj.year_val = item.year_val;
                obj.batch_upload_flag = item.batch_upload_flag;
                if(item.months) {
                  item.months.map((each) => {
                    if (each.month_val === "jan") {
                      obj["Jan" + itemYear] = each.sellout_local_currency;
                      obj["Jan" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "feb") {
                      obj["Feb" + itemYear] = each.sellout_local_currency;
                      obj["Feb" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "mar") {
                      obj["Mar" + itemYear] = each.sellout_local_currency;
                      obj["Mar" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "apr") {
                      obj["Apr" + itemYear] = each.sellout_local_currency;
                      obj["Apr" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "may") {
                      obj["May" + itemYear] = each.sellout_local_currency;
                      obj["May" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "jun") {
                      obj["Jun" + itemYear] = each.sellout_local_currency;
                      obj["Jun" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "jul") {
                      obj["Jul" + itemYear] = each.sellout_local_currency;
                      obj["Jul" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "aug") {
                      obj["Aug" + itemYear] = each.sellout_local_currency;
                      obj["Aug" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "sep") {
                      obj["Sep" + itemYear] = each.sellout_local_currency;
                      obj["Sep" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "oct") {
                      obj["Oct" + itemYear] = each.sellout_local_currency;
                      obj["Oct" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "nov") {
                      obj["Nov" + itemYear] = each.sellout_local_currency;
                      obj["Nov" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "dec") {
                      obj["Dec" + itemYear] = each.sellout_local_currency;
                      obj["Jan" + itemYear + "E"] = each.sellout;
                    }
                  });
                } else {
                  obj["Jan" + itemYear] = '';
                  obj["Jan" + itemYear + "E"] = '';
                  obj["Feb" + itemYear] = '';
                  obj["Feb" + itemYear + "E"] = '';
                  obj["Mar" + itemYear] = '';
                  obj["Mar" + itemYear + "E"] = '';
                  obj["Apr" + itemYear] = '';
                  obj["Apr" + itemYear + "E"] = '';
                  obj["May" + itemYear] = '';
                  obj["May" + itemYear + "E"] = '';
                  obj["Jun" + itemYear] = '';
                  obj["Jun" + itemYear + "E"] = '';
                  obj["Jul" + itemYear] = '';
                  obj["Jul" + itemYear + "E"] = '';
                  obj["Aug" + itemYear] = '';
                  obj["Aug" + itemYear + "E"] = '';
                  obj["Sep" + itemYear] = '';
                  obj["Sep" + itemYear + "E"] = '';
                  obj["Oct" + itemYear] = '';
                  obj["Oct" + itemYear + "E"] = '';
                  obj["Nov" + itemYear] = '';
                  obj["Nov" + itemYear + "E"] = '';
                  obj["Dec" + itemYear] = '';
                  obj["Dec" + itemYear + "E"] = '';
                }
                final_arr.push(obj);
              });
              console.log('final_arr::', final_arr);
              let preYear = yearCurrent - 1;
              getQuarterReviewDataPrevious(final_arr, preYear);
             // setRowData(formatGetPayload(previousAPIData, true));
            } else {
              previousAPIData.map((item) => {
                let string_year_val = item.year_val? item.year_val.toString(): yearCurrent.toString();
                let itemYear = string_year_val.slice(2, string_year_val.length);
                let obj = {};
                obj.zone_val = item.zone_val;
                obj.country_code = item.country_code;
                obj.partner_account_name = item.partner_account_name;
                obj.model_type = item.model_type;
                obj.status = item.status;
                obj.trans_currency_code = item.trans_currency_code;
                obj["trans_currency_codeE"] = "EUR";
                obj.SelloutCQ = "";
                obj.systemComments = "";
                obj.editorComments = item.editor_comment;
                obj.YTD = "";
                obj.YTD_Growth = "";
                obj.ambition = "";
                obj.approverComments = "";
                obj.partner_id = item.partner_id;
                obj.year_val = item.year_val;
                obj.batch_upload_flag = item.batch_upload_flag;
                  item?.months.map((each) => {
                    if (each.month_val === "jan") {
                      obj["Jan" + itemYear] = each.sellout_local_currency;
                      obj["Jan" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "feb") {
                      obj["Feb" + itemYear] = each.sellout_local_currency;
                      obj["Feb" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "mar") {
                      obj["Mar" + itemYear] = each.sellout_local_currency;
                      obj["Mar" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "apr") {
                      obj["Apr" + itemYear] = each.sellout_local_currency;
                      obj["Apr" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "may") {
                      obj["May" + itemYear] = each.sellout_local_currency;
                      obj["May" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "jun") {
                      obj["Jun" + itemYear] = each.sellout_local_currency;
                      obj["Jun" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "jul") {
                      obj["Jul" + itemYear] = each.sellout_local_currency;
                      obj["Jul" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "aug") {
                      obj["Aug" + itemYear] = each.sellout_local_currency;
                      obj["Aug" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "sep") {
                      obj["Sep" + itemYear] = each.sellout_local_currency;
                      obj["Sep" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "oct") {
                      obj["Oct" + itemYear] = each.sellout_local_currency;
                      obj["Oct" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "nov") {
                      obj["Nov" + itemYear] = each.sellout_local_currency;
                      obj["Nov" + itemYear + "E"] = each.sellout;
                    }
                    if (each.month_val === "dec") {
                      obj["Dec" + itemYear] = each.sellout_local_currency;
                      obj["Jan" + itemYear + "E"] = each.sellout;
                    }
                  });
                final_arr.push(obj);
              });
              let preYear = yearCurrent - 1;
              console.log('final_arr::', final_arr);
              getQuarterReviewDataPrevious(final_arr, preYear);
             // setRowData(formatGetPayload(previousAPIData, true));
            }
     
          })
          .catch((e) => {
            console.log("Data Input", e);
          });
        
        }
        let preYear = yearCurrent - 1;
        getQuarterReviewDataPrevious(final_arr, preYear);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getPreviousQuarterData = (quarter) => {
    let today = new Date();
    let year = today.getFullYear();
    props
      .retrieveInputCalenderData(year, quarter, "approver")
      .then((data) => {
        let closingData = data.CLOSING_DATE;
        let openingDate = data.OPENING_DATE;

        let dataOpen = new Date(openingDate);
        var day1 = dataOpen.getDate().toString().padStart(2, "0");
        var month1 = (dataOpen.getMonth() + 1).toString().padStart(2, "0");
        var year1 = dataOpen.getFullYear().toString();
        let openD =  month1 + "-" + day1 + "-" + year1;

        let dateCus = new Date(closingData);
        var day = dateCus.getDate().toString().padStart(2, "0");
        var month = (dateCus.getMonth() + 1).toString().padStart(2, "0");
        var year = dateCus.getFullYear().toString();
        let complete =  month + "-" + day + "-" + year;
        let today = new Date();
        let datessss =
          parseInt(today.getMonth() + 1) +
          "-" +
          today.getDate() +
          "-" +
          today.getFullYear();
        let tempToday = new Date(datessss);
        let tempClosing = new Date(complete);
        let tempOpen = new Date(openD);
        let tempOpenTime = tempOpen.getTime();

        let tempToDayTime = tempToday.getTime();
        let tempClosingTime = tempClosing.getTime();
        if (tempToDayTime > tempClosingTime || tempToDayTime < tempOpenTime) {
          setShouldDisableSaveButton(true);
        } else {
          setShouldDisableSaveButton(false);
        }
      })
      .catch((e) => {
        console.log("Partner list", e);
      });
  };

  const getQuarterReviewDataPrevious = (currentYearArray, preYear) => {
    let final_arr_previous = [];
    let combinedArray = [];

    props
      .retrieveHistoricalData(userMail, preYear, historicalRole)
      .then((data) => {
        data.map((item) => {
          let string_year_val = item.year_val.toString();
          let itemYear = string_year_val.slice(2, string_year_val.length);
          let obj = {};
          obj.zone_val = item.zone_val;
          obj.country_code = item.country_code;
          obj.partner_account_name = item.partner_account_name;
          obj.model_type = item.model_type;
          obj.status = item.status;
          obj.trans_currency_code = item.trans_currency_code;
          obj["trans_currency_codeE"] = "EUR";
          obj.SelloutCQ = "";
          obj.systemComments = "";
          obj.editorComments = item.editor_comment;
          obj.YTD = "";
          obj.YTD_Growth = "";
          obj.ambition = "";
          obj.approverComments = item.comments;
          obj.partner_id = item.partner_id;
          obj.year_val = item.year_val;
          obj.created_by = item.created_by;
          obj.created_date = item.created_date;
          obj.approval_status = item.approval_status;
          obj.batch_upload_flag = item.batch_upload_flag;
          item.months.map((each) => {
            if (each.month_val === "jan") {
              obj["Jan" + itemYear] = each.sellout_local_currency;
              obj["Jan" + itemYear + "E"] = each.sellout;
            }
            if (each.month_val === "feb") {
              obj["Feb" + itemYear] = each.sellout_local_currency;
              obj["Feb" + itemYear + "E"] = each.sellout;
            }
            if (each.month_val === "mar") {
              obj["Mar" + itemYear] = each.sellout_local_currency;
              obj["Mar" + itemYear + "E"] = each.sellout;
            }
            if (each.month_val === "apr") {
              obj["Apr" + itemYear] = each.sellout_local_currency;
              obj["Apr" + itemYear + "E"] = each.sellout;
            }
            if (each.month_val === "may") {
              obj["May" + itemYear] = each.sellout_local_currency;
              obj["May" + itemYear + "E"] = each.sellout;
            }
            if (each.month_val === "jun") {
              obj["Jun" + itemYear] = each.sellout_local_currency;
              obj["Jun" + itemYear + "E"] = each.sellout;
            }
            if (each.month_val === "jul") {
              obj["Jul" + itemYear] = each.sellout_local_currency;
              obj["Jul" + itemYear + "E"] = each.sellout;
            }
            if (each.month_val === "aug") {
              obj["Aug" + itemYear] = each.sellout_local_currency;
              obj["Aug" + itemYear + "E"] = each.sellout;
            }
            if (each.month_val === "sep") {
              obj["Sep" + itemYear] = each.sellout_local_currency;
              obj["Sep" + itemYear + "E"] = each.sellout;
            }
            if (each.month_val === "oct") {
              obj["Oct" + itemYear] = each.sellout_local_currency;
              obj["Oct" + itemYear + "E"] = each.sellout;
            }
            if (each.month_val === "nov") {
              obj["Nov" + itemYear] = each.sellout_local_currency;
              obj["Nov" + itemYear + "E"] = each.sellout;
            }
            if (each.month_val === "dec") {
              obj["Dec" + itemYear] = each.sellout_local_currency;
              obj["Jan" + itemYear + "E"] = each.sellout;
            }
          });

          final_arr_previous.push(obj);
        });

        if (final_arr_previous.length) {
          currentYearArray.forEach((elementCurrent) => {
            final_arr_previous.forEach((elementPrevious) => {
              if (elementCurrent.partner_id == elementPrevious.partner_id) {
                let uniObj = {};
                uniObj = elementCurrent;
                uniObj.PreviousYearData = elementPrevious;
                combinedArray.push(uniObj);
              }
            });
          });

          setReviewData(combinedArray);
        } else {
          console.log('currentYearArray:::', currentYearArray);
          setReviewData(currentYearArray);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getQuarterReviewData(userMail, year, historicalRole);
    getPreviousQuarterData(getCurrentQuarter());
  }, []);

  const onBtShowYearColumn = useCallback((hisData, radio) => {
    const currentDate = new Date();
    const currentYear = String(currentDate.getFullYear()).slice(-2);
    const currentMonth = allCalMonths[currentDate.getMonth()];
    // const currentMonth = 'Jul'; // To test quarter basis
    let currentQuarter = 0;
    let currentQuarterIndex = 0;
    let index = 1;
    let selectedYear = currentYear;

    for (const quarter in quarters) {
      if (quarters[quarter].includes(currentMonth)) {
        currentQuarter = quarter;
        currentQuarterIndex = quarters[quarter].indexOf(currentMonth);
        break;
      }
      index++;
    }

    let resultQuarter = 0;

    if (currentQuarterIndex === 0) {
      const previousIndex = index - 1 ? index - 1 : 4;
      if (index - 1 == 0) {
        selectedYear = currentYear - 1;
      }
      const previousQuarter = Object.keys(quarters)[previousIndex - 1];
      resultQuarter = previousQuarter;
    } else {
      resultQuarter = currentQuarter;
    }
    const q2Values = quarters[resultQuarter];
    setIsYearColumnVisible(true);

    let gridArr = [
      {
        headerName: "Zone",

        field: "zone_val",

        rowGroup: true,

        hide: true,
      },

      {
        headerName: "Country",

        field: "country_code",

        rowGroup: true,

        hide: true,

        filter: true,

        pinned: "left",

        suppressSizeToFit: true,

        editable: false,
      },

      {
        headerName: "Model",

        field: "model_type",

        rowGroup: true,

        hide: true,

        filter: true,

        pinned: "left",

        suppressSizeToFit: true,

        editable: false,
      },

      {
        headerName: "Partner Account Name",

        field: "partner_account_name",

        rowGroup: true,

        hide: true,

        filter: true,

        pinned: "left",

        suppressSizeToFit: true,

        editable: false,
      },

      {
        headerName: "Currency of Reporting",
        field: radioValue == 1 ? "trans_currency_code" : "trans_currency_codeE",
        pinned: "left",

        width: 140,

        editable: false,

        suppressMenu: true,
      },

      {
        headerName: "Status",

        field: "status",

        pinned: "left",

        width: 110,

        suppressMenu: true,

        cellRenderer: (params) => {
          const Status = params.value;

          return (
            <div>
              {Status === "ACTIVE" && (
                <img src={active} alt="active" style={{ width: "80px" }} />
              )}

              {Status === "Closed" && (
                <img src={closed} alt="closed" style={{ width: "80px" }} />
              )}
            </div>
          );
        },
      },

      {
        headerName: `${q2Values[0]}${selectedYear}`,

        field:
          radio == 1
            ? `${q2Values[0]}${selectedYear}`
            : `${q2Values[0]}${selectedYear}E`,

        filter: true,

        sortable: true,

        minWidth: 100,

        aggFunc: "sum",

        suppressSizeToFit: true,

        suppressMenu: true,

        columnGroupShow: "open",

        cellStyle: { "border-color": "#e2e2e2" },
      },

      {
        headerName: `${q2Values[1]}${selectedYear}`,

        field:
          radio == 1
            ? `${q2Values[1]}${selectedYear}`
            : `${q2Values[1]}${selectedYear}E`,

        filter: true,

        sortable: true,

        minWidth: 100,

        aggFunc: "sum",

        suppressSizeToFit: true,

        suppressMenu: true,

        columnGroupShow: "open",

        cellStyle: { "border-color": "#e2e2e2" },
      },

      {
        headerName: `${q2Values[2]}${selectedYear}`,

        field:
          radio == 1
            ? `${q2Values[2]}${selectedYear}`
            : `${q2Values[2]}${selectedYear}E`,

        filter: true,

        sortable: true,

        minWidth: 100,

        aggFunc: "sum",

        suppressSizeToFit: true,

        suppressMenu: true,

        columnGroupShow: "open",

        cellStyle: { "border-color": "#e2e2e2" },
      },

      {
        headerName: "Sellout value Current Quarter",

        field: "SelloutCQ",

        editable: false,

        minWidth: 150,

        wrapHeaderText: true,

        aggFunc: "sum",

        sortable: true,

        suppressMenu: true,

        cellStyle: { "border-color": "#e2e2e2" },

        valueGetter: (params) => {
          return getTotSellOutCurrQuatrCalc(params);
        },
      },

      {
        headerName: "YTD Sellout Value",

        field: "YTD",

        editable: false,

        minWidth: 140,

        wrapHeaderText: true,

        aggFunc: "sum",

        sortable: true,

        suppressMenu: true,

        cellStyle: { "border-color": "#e2e2e2" },

        valueGetter: (params) => {
          return getTotalYTDSellOutGrowthCalc(params);
        },
      },

      {
        headerName: "YTD Sellout Growth",

        field: "YTD_Growth",

        editable: false,

        minWidth: 150,

        wrapHeaderText: true,

        aggFunc: "sum",

        sortable: true,

        suppressMenu: true,

        valueFormatter: (params) => {
          return callThisFunction(params);
         },

        valueGetter: (params) => {
          return getYTDSelloutGrowthPercCalc(params);
        },

        cellStyle: function (params) {
          if (params.value < "0") {
            return {
              color: "#ff0000",

              fontWeight: "bold",

              "border-color": "#e2e2e2",
            };
          } else {
            return {
              color: "#009530",

              fontWeight: "bold",

              "border-color": "#e2e2e2",
            };
          }
        },
      },

      {
        headerName: "Ambition Data",

        field: "ambition",

        editable: false,

        minWidth: 120,

        wrapHeaderText: true,

        aggFunc: "sum",

        sortable: true,

        suppressMenu: true,

        cellStyle: { "border-color": "#e2e2e2" },
      },

      {
        headerName: "System Comments",

        field: "systemComments",

        editable: false,

        wrapHeaderText: true,

        minWidth: 140,

        aggFunc: "sum",

        sortable: true,

        suppressMenu: true,

        cellStyle: { "border-color": "#e2e2e2" },
      },

      {
        headerName: "Editor Comments",

        field: "editor_comment",

        editable: false,

        wrapHeaderText: true,

        minWidth: 140,

        aggFunc: "sum",

        sortable: true,

        suppressMenu: true,

        cellStyle: { "border-color": "#e2e2e2" },
      },

      {
        headerName: "Approver Comments",

        field: "comments",

        editable: true,

        wrapHeaderText: true,

        minWidth: 140,

        aggFunc: "sum",

        sortable: true,

        suppressMenu: true,

        singleClickEdit: true,

        cellStyle: { "border-color": "#e2e2e2" },

        cellClassRules: { "cursor-pointer": () => true },
      },
    ];

    gridRef.current.api.setColumnDefs(gridArr);
  }, []);

  const onBtHideYearColumn = useCallback(() => {
    setIsYearColumnVisible(false);

    gridRef.current.api.setColumnDefs([
      {
        headerName: "Zone",

        field: "zone_val",

        rowGroup: true,

        hide: true,
      },

      {
        headerName: "Country",

        field: "country_code",

        rowGroup: true,

        hide: true,

        filter: true,

        pinned: "left",

        suppressSizeToFit: true,

        editable: false,
      },

      {
        headerName: "Model",

        field: "model_type",

        rowGroup: true,

        hide: true,

        filter: true,

        pinned: "left",

        suppressSizeToFit: true,

        editable: false,
      },

      {
        headerName: "Partner Account Name",

        field: "partner_account_name",

        rowGroup: true,

        hide: true,

        filter: true,

        pinned: "left",

        suppressSizeToFit: true,

        editable: false,
      },

      {
        headerName: "Currency of Reporting",
        field: radioValue == 1 ? "trans_currency_code" : "trans_currency_codeE",

        pinned: "left",

        width: 140,

        editable: false,

        suppressMenu: true,
      },

      {
        headerName: "Status",

        field: "status",

        pinned: "left",

        width: 110,

        suppressMenu: true,

        cellRenderer: (params) => {
          const Status = params.value;

          return (
            <div>
              {Status === "ACTIVE" && (
                <img src={active} alt="active" style={{ width: "80px" }} />
              )}

              {Status === "Closed" && (
                <img src={closed} alt="closed" style={{ width: "80px" }} />
              )}
            </div>
          );
        },
      },

      {
        headerName: "Sellout value Current Quarter",

        field: "SelloutCQ",

        editable: false,

        minWidth: 150,

        wrapHeaderText: true,

        aggFunc: "sum",

        sortable: true,

        suppressMenu: true,

        cellStyle: { "border-color": "#e2e2e2" },

        valueGetter: (params) => {
          return getTotSellOutCurrQuatrCalc(params);
        },
      },

      {
        headerName: "YTD Sellout Value",

        field: "YTD",

        editable: false,

        minWidth: 140,

        wrapHeaderText: true,

        aggFunc: "sum",

        sortable: true,

        suppressMenu: true,

        cellStyle: { "border-color": "#e2e2e2" },

        valueGetter: (params) => {
          return getTotalYTDSellOutGrowthCalc(params);
        },
      },

      {
        headerName: "YTD Sellout Growth",

        field: "YTD_Growth",

        editable: false,

        minWidth: 150,

        wrapHeaderText: true,

        aggFunc: "sum",

        sortable: true,

        suppressMenu: true,

        valueFormatter: (params) => {
          return callThisFunction(params);
         },

        valueGetter: (params) => {
          return getYTDSelloutGrowthPercCalc(params);
        },

        cellStyle: function (params) {
          if (params.value < "0") {
            return {
              color: "#ff0000",

              fontWeight: "bold",

              "border-color": "#e2e2e2",
            };
          } else {
            return {
              color: "#009530",

              fontWeight: "bold",

              "border-color": "#e2e2e2",
            };
          }
        },
      },

      {
        headerName: "Ambition Data",

        field: "ambition",

        editable: false,

        minWidth: 120,

        wrapHeaderText: true,

        aggFunc: "sum",

        sortable: true,

        suppressMenu: true,

        cellStyle: { "border-color": "#e2e2e2" },
      },

      {
        headerName: "System Comments",
        field: "systemComments",
        editable: false,

        wrapHeaderText: true,

        minWidth: 140,

        aggFunc: "sum",

        sortable: true,

        suppressMenu: true,

        cellStyle: { "border-color": "#e2e2e2" },
      },

      {
        headerName: "Editor Comments",
        field: "editor_comment",
        editable: false,
        wrapHeaderText: true,
        minWidth: 140,

        aggFunc: "sum",

        sortable: true,

        suppressMenu: true,

        cellStyle: { "border-color": "#e2e2e2" },
      },

      {
        headerName: "Approver Comments",
        field: "comments",
        editable: true,
        wrapHeaderText: true,
        minWidth: 140,
        aggFunc: "sum",

        sortable: true,

        suppressMenu: true,

        singleClickEdit: true,

        cellStyle: { "border-color": "#e2e2e2" },

        cellClassRules: { "cursor-pointer": () => true },
      },
    ]);
  }, []);

  const getMonthField = (month) => {
    const currentDate = new Date();

    const currentYear = String(currentDate.getFullYear()).slice(-2);

    const monthValue = month + currentYear;

    return monthValue;
  };

  const getPrevMonthField = (month) => {
    const currentDate = new Date();

    const currentYear = String(currentDate.getFullYear() - 1).slice(-2);

    const monthValue = month + currentYear;

    return monthValue;
  };

  const getTotSellOutCurrQuatrCalc = (params) => {
    const quat = getCurrentQuarter();
    const quatMonths = getQuarterMonths(quat);
    let year = new Date().getFullYear();
    let selectedValueString = year.toString();
    let choppedOffYear = selectedValueString.slice(
      2,
      selectedValueString.length
    );

    let customizedQuarterMonths = [];
    quatMonths.forEach((element) => {
      customizedQuarterMonths.push(element + choppedOffYear);
    });

    let tempTotal = 0;
    customizedQuarterMonths.map((item) => {
      if (item in params?.data) {
        tempTotal += params?.data[item];
      }
    });

    if (isNaN(tempTotal)) {
      tempTotal = "";
    }
    if (tempTotal == 0) {
      tempTotal = "";
    }

    return tempTotal;
  };

  const getTotalYTDSellOutGrowthCalc = (params) => {
    let year = new Date().getFullYear();

    let selectedValueString = year.toString();

    let choppedOffYear = selectedValueString.slice(
      2,

      selectedValueString.length
    );

    let customizedQuarterMonths = [];

    monthsOfTheYear.forEach((element) => {
      customizedQuarterMonths.push(element + choppedOffYear);
    });

    let tempTotal = 0;

    customizedQuarterMonths.map((item) => {
      if (item in params?.data) {
        tempTotal += params?.data[item];
      }
    });

    if (isNaN(tempTotal)) {
      tempTotal = "";
    }
    if (tempTotal == 0) {
      tempTotal = "";
    }

    return tempTotal;
  };

  const callThisFunction = (params) => {
    return params.value.toFixed(2) + "%";
  };

  const getYTDSelloutGrowthPercCalc = (params) => {
    let previousYearData = params.data.PreviousYearData;

    let currentYearData = params.data;

    if (previousYearData) {
      let percentageOfGrowth = 0;

      let totalOfCurrentYearGrowth = getTotalYTDSellOutGrowthCalc(params);

      let yearCustom = previousYearData.year_val;

      let selectedValueString = yearCustom.toString();

      let choppedOffYear = selectedValueString.slice(
        2,
        selectedValueString.length
      );

      let customizedYearMonths = [];

      monthsOfTheYear.forEach((element) => {
        customizedYearMonths.push(element + choppedOffYear);
      });

      let tempTotalPreviousYear = 0;

      customizedYearMonths.map((item) => {
        if (item in previousYearData) {
          tempTotalPreviousYear += previousYearData[item];
        }
      });

      if (tempTotalPreviousYear > 0 && totalOfCurrentYearGrowth > 0) {
        let tempTotalDiff = totalOfCurrentYearGrowth - tempTotalPreviousYear;

        let tempDivision = tempTotalDiff / tempTotalPreviousYear;

        percentageOfGrowth = tempDivision * 100;

        return percentageOfGrowth;
      } else {
        return percentageOfGrowth;
      }
    } else {
      return 0;
    }
  };

  columnDefs.push(
    {
      headerName: "Sellout value Current Quarter",

      field: "SelloutCQ",

      editable: false,

      minWidth: 150,

      wrapHeaderText: true,

      aggFunc: "sum",

      sortable: true,

      suppressMenu: true,

      cellStyle: { "border-color": "#e2e2e2" },

      valueGetter: (params) => {
        return getTotSellOutCurrQuatrCalc(params);
      },
    },

    {
      headerName: "YTD Sellout Value",

      field: "YTD",

      editable: false,

      minWidth: 140,

      wrapHeaderText: true,

      aggFunc: "sum",

      sortable: true,

      suppressMenu: true,

      cellStyle: { "border-color": "#e2e2e2" },

      valueGetter: (params) => {
        return getTotalYTDSellOutGrowthCalc(params);
      },
    },

    {
      headerName: "YTD Sellout Growth",

      field: "YTD_Growth",

      editable: false,

      minWidth: 150,

      wrapHeaderText: true,

      aggFunc: "sum",

      sortable: true,

      suppressMenu: true,

      valueFormatter: (params) => {
        return callThisFunction(params);
       },

      valueGetter: (params) => {
        return getYTDSelloutGrowthPercCalc(params);
      },

      cellStyle: function (params) {
        if (params.value < "0") {
          return {
            color: "#ff0000",

            fontWeight: "bold",

            "border-color": "#e2e2e2",
          };
        } else {
          return {
            color: "#009530",

            fontWeight: "bold",

            "border-color": "#e2e2e2",
          };
        }
      },
    },

    {
      headerName: "Ambition Data",

      field: "ambition",

      editable: false,

      minWidth: 120,

      wrapHeaderText: true,

      aggFunc: "sum",

      sortable: true,

      suppressMenu: true,

      cellStyle: { "border-color": "#e2e2e2" },
    },

    {
      headerName: "System Comments",

      field: "systemComments",

      editable: false,

      wrapHeaderText: true,

      minWidth: 140,

      aggFunc: "sum",

      sortable: true,

      suppressMenu: true,

      cellStyle: { "border-color": "#e2e2e2" },
    },

    {
      headerName: "Editor Comments",

      field: "editorComments",

      editable: false,

      wrapHeaderText: true,

      minWidth: 140,

      aggFunc: "sum",

      sortable: true,

      suppressMenu: true,

      cellStyle: { "border-color": "#e2e2e2" },
    },

    {
      headerName: "Approver Comments",
      field: "approverComments",
      editable: true,
      wrapHeaderText: true,
      minWidth: 140,
      aggFunc: "sum",
      sortable: true,
      suppressMenu: true,
      singleClickEdit: true,
      cellStyle: { "border-color": "#e2e2e2" },
      cellClassRules: { "cursor-pointer": () => true },
    }
  );

  const defaultColDef = useMemo(() => {
    return {
      wrapHeaderText: true,

      autoHeaderHeight: true,

      cellClassRules: {
        greenBackground: (params) => {
          return params.node.footer;
        },
      },

      flex: 1,

      resizable: true,

      filter: true,

      sortable: true,

      suppressSizeToFit: true,

      suppressMenuHide: true,
    };
  }, []);

  const autoGroupColumnDef = useMemo(() => {
    return {
      width: 180,

      filterValueGetter: (params) => {
        if (params.node) {
          var colGettingGrouped = params.colDef.showRowGroup + "";

          return params.api.getValue(colGettingGrouped, params.node);
        }
      },

      pinned: "left",

      cellRenderer: "agGroupCellRenderer",

      cellRendererParams: {
        suppressCount: true,

        checkbox: true,

        checkboxSelection: true,

        innerRenderer: footerTotalReview,
      },

      cellRendererParams: {
        checkbox: true,
      },

      headerCheckboxSelection: true,

      headerCheckboxSelectionCurrentPageOnly: true,
    };
  }, []);

  const handleCheckboxClick = (params) => {
    const selectedRows = params.api.getSelectedRows();

    setMessage(selectedRows?.length);
  };

  const handleSave = useCallback((data, validateKey) => {
    let monthArray = [];
    let itemYear = String(data[0].year_val).slice(-2);

    allCalMonths.forEach((element) => {
      const saveArray =
        radioValue == 1
          ? data[0][`${element + itemYear}`]
          : data[0][`${element + itemYear}E`];
      if (saveArray > 0) {
        monthArray.push({
          month: element.toLowerCase(),
          sellout_local_currency: saveArray,
          trans_type: "",
        });
      }
    });

    let reqData = [
      {
        partner_id: data[0].partner_id,
        partner_name: data[0].partner_account_name,
        country_code: data[0].country_code,
        year_val: data[0].year_val.toString(),
        months: monthArray,
        trans_currency_code: data[0].trans_currency_code,
        created_by: data[0].created_by,
        created_date: data[0].created_date,
        approval_status: validateKey ? "2" : data[0].approval_status.toString(),
        editor_comment: data[0].editorComments,
        comments: data[0].approverComments,
        batch_upload_flag: data[0].batch_upload_flag.toString(),
      },
    ];

    props
      .updateSellOutData(reqData)
      .then((data) => {
        // setReviewData(data);
        setShowSuccessModal(true);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  }, []);

  const handleReviewNavigation = () => {
    if (
      historicalRole === "superApproverUser" ||
      historicalRole === "supervisor_approv_1_2"
    ) {
      navigate("/superApproverUser/home");
    } else if (historicalRole === "approve_1") {
      navigate("/approver_1/home");
    } else {
      navigate("/approver_2/home");
    }
  };

  const handleInvestigation = () => {
    alert(
      message === 1
        ? `${message} Partner Account Sent For Investigation `
        : message > 1
        ? `${message} Partners Account Sent For Investigation `
        : ""
    );
  };

  const historicalDataNavigation = () => {
    navigate(`/historicalData?role=${historicalRole}`);
  };

  const getRowStyle = (params) => {
    if (params.node.aggData) {
      return { fontWeight: "bold" };
    }
  };

  const onExpandCol = useCallback((e) => {
    gridRef.current.api.collapseAll();

    if (e.target.value === "Zone") {
      gridRef.current.api.forEachNode((node) => {
        console.log("node.level", node.level);

        if (node.level === 0) {
          gridRef.current.api.setRowNodeExpanded(node, true);

          return;
        }
      });
    } else if (e.target.value === "Country") {
      gridRef.current.api.forEachNode((node) => {
        console.log("node.level", node.level);

        if (node.level === 0 || node.level === 1) {
          gridRef.current.api.setRowNodeExpanded(node, true);

          return;
        }
      });
    } else if (e.target.value === "Model") {
      gridRef.current.api.forEachNode((node) => {
        console.log("node.level", node.level);

        if (node.level === 0 || node.level === 1 || node.level === 2) {
          gridRef.current.api.setRowNodeExpanded(node, true);

          return;
        }
      });
    } else if (e.target.value === "Partner") {
      gridRef.current.api.forEachNode((node) => {
        console.log("node.level", node.level);

        if (
          node.level === 0 ||
          node.level === 1 ||
          node.level === 2 ||
          node.level === 3
        ) {
          gridRef.current.api.setRowNodeExpanded(node, true);

          return;
        }
      });
    } else {
      gridRef.current.api.collapseAll();
    }
  }, []);

  const onCollapseAll = useCallback(() => {
    gridRef.current.api.collapseAll();
  }, []);

  const successmsg = {
    headerLabel: "Success....",
    variant: "success",
    header: "Data has been saved successfully!!",
    content: [],
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu />
        </Row>

        <div>
          {historicalRole === "approve_1" ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/approver_1/home">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : historicalRole === "approver_2" ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/approver_2/home">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : historicalRole === "superApproverUser" ||
            "supervisor_approv_1_2" ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/superApproverUser/home">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : (
            <div></div>
          )}
        </div>

        <div>
          <Stack direction="horizontal" gap={4}>
            <div className="sell-out-header">Sell Out Data Review</div>

            <div className="mt-0 ms-auto">
              <Row className="quarter-months">Quarter Months</Row>

              <Col className="">
                <Button
                  className={`show-data toggle-button ${
                    isYearColumnVisible ? "active" : ""
                  }`}
                  onClick={() => {
                    onBtShowYearColumn(reviewData, radioValue);
                    setTimeout(() => {
                      onBtShowYearColumn(reviewData, radioValue);
                    }, 10);
                  }}
                >
                  Show
                </Button>

                <Button
                  className={`show-data toggle-button ${
                    !isYearColumnVisible ? "active" : ""
                  }`}
                  onClick={() => onBtHideYearColumn()}
                >
                  Hide
                </Button>
              </Col>
            </div>

            <div className="mt-0">
              <Row className="currency-mode">CURRENCY MODE</Row>

              <Col>
                <ButtonGroup>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={idx % 2 ? "outline-success" : "outline-success"}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => {
                        setRadioValue(e.currentTarget.value);

                        setMessage(0);

                        setIsYearColumnVisible(false);
                      }}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Col>
            </div>

            <div className="historical-header">
              <Button
                className="btn-historical historical-data"
                onClick={() => {
                  historicalDataNavigation(historicalRole);
                }}
              >
                Historical Data
              </Button>
            </div>
          </Stack>
        </div>

        <Row>
          <Col md={3}>
            <Row>
              <Col md={4}>
                <Form.Label size="sm" htmlFor="expand_by">
                  Expand by
                </Form.Label>
              </Col>

              <Col>
                <Form.Select
                  size="sm"
                  id="expand_by"
                  name="expand_by"
                  onChange={onExpandCol}
                >
                  <option>Collapse all</option>

                  <option value="Zone">Zone</option>

                  <option selected value="Country">
                    Country
                  </option>

                  <option value="Model">Model</option>

                  <option value="Partner">Partner</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>

          {/* <Col md={2}>

            <Button className="btn-collapseall edit-header"

            onClick={onCollapseAll}

            >Collapse all</Button>

          </Col> */}
        </Row>

        <Row
          className="ag-theme-alpine ag-grid-table"
          style={{ height: 320, marginTop: "10px" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={radioValue == 1 ? reviewData : reviewData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            groupHideOpenParents={true}
            showOpenedGroup={true}
            animateRows={true}
            suppressAggFuncInHeader={true}
            groupIncludeTotalFooter={true}
            groupIncludeFooter={true}
            getRowStyle={getRowStyle}
            rowSelection={"multiple"}
            onSelectionChanged={handleCheckboxClick}
            groupSelectsChildren={true}
            suppressMenuHide={true}
            groupDefaultExpanded={1}
            suppressRowClickSelection={true}
            suppressCellSelection={true}
          ></AgGridReact>

          <div className="checkbox-message">
            {message === 1
              ? `${message} Partner Selected `
              : message > 1
              ? `${message} Partners Selected `
              : ""}
          </div>

          <div>
            <Row className="mb-3" style={{ float: "right", marginTop: "10px" }}>
              <Col xs="auto">
                <Button
                  className="btn-upload cancel-header"
                  onClick={() => {
                    handleReviewNavigation(historicalRole);
                  }}
                >
                  Cancel
                </Button>
              </Col>

              <Col xs="auto">
                <Button
                  className={shouldDisableSaveButton ? 'btn-invest active-button' : 'btn-invest edit-header'}
                  disabled={shouldDisableSaveButton}
                  onClick={(e) => handleInvestigation(message)}
                >
                  Send For Investigation
                </Button>
              </Col>

              <Col xs="auto">
                <Button
                  className={shouldDisableSaveButton ? 'btn-upload active-button' : 'btn-upload edit-header'}
                  disabled={shouldDisableSaveButton}
                  onClick={(e) => handleSave(reviewData, 0)}
                >
                  Save
                </Button>
                <AlertModal
                  show={showSuccessModal}
                  handleClose={handleCloseSuccessModal}
                  body={successmsg}
                />
              </Col>

              <Col>
                <Button
                  className={shouldDisableSaveButton ? 'btn-upload active-button' : 'btn-upload save-header'}
                  disabled={shouldDisableSaveButton}
                  onClick={() => {
                    handleSave(reviewData, 1);
                  }}
                >
                  Validate
                </Button>
              </Col>
            </Row>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default connect(null, {
  retrieveHistoricalData,
  updateSellOutReviewData,
  createData,
  updateSellOutData,
  retrieveInputCalenderData,
  retrievePartnerByRole
})(DataReviewApprover);
