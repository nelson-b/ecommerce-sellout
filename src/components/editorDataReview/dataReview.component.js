import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import AlertModal from "../modal/alertModel";
import { AgGridReact } from "ag-grid-react";
import {
  Button,
  Row,
  Col,
  Stack,
  ToggleButton,
  ButtonGroup,
  Breadcrumb,
  Container,
} from "react-bootstrap";
import "./dataReview.css";
import { allCalMonths, roles, user_login_info } from "../constant";
import MyMenu from "../menu/menu.component.js";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import data from "../../data/dataReview.json";
import dataEuro from "../../data/dataReviewEuro.json";
import footerTotalReview from "./footerTotalReview";
import active from "../../images/active.png";
import closed from "../../images/closed.png";
import Home from "../../images/home-icon.png";
import { useLocation } from "react-router-dom";
import { retrieveHistoricalData } from "../../actions/selloutaction";
import { updateSellOutData } from "../../actions/dataInputAction";
import { retrieveInputCalenderData } from "../../actions/inputCalenderAction";
import { connect } from "react-redux";
import { retrievePartnerByRole } from "../../actions/partneraction";

function DataReviewComponent(props) {
  const gridRef = useRef();

  const navigate = useNavigate();
  //sso login func
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setuserRole] = useState("");

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
        console.log(
          "data review screen for editor/approve_1/approver_2/supervisor_approv_1_2"
        );
      } else {
        navigate("/");
      }
    }
  }, []);
  //------------------//

  const [rowData, setRowData] = useState();

  const [radioValue, setRadioValue] = useState("1");

  const location = useLocation();


  const [reviewData, setReviewData] = useState([]);
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
    };
  }, []);

  const year = new Date().getFullYear();

  const getQuarterReviewData = () => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    //if user not login then redirect to login page
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);
    }

    let yearCurrent = new Date().getFullYear();
    props
      .retrieveHistoricalData(usrDetails.email_id, year, usrDetails.role_id)
      .then((data) => {
        let final_arr = [];
        if (data.length) {
          let previousAPIData = data;
          props
            .retrievePartnerByRole(usrDetails.email_id, usrDetails.role_id)
            .then((data) => {
              console.log("showMeData from next API", data.data);
              if (data.data.length) {
                let secondArray = [];
                secondArray = data?.data;
                for (let i = 0; i < previousAPIData.length; i++) {
                  for (let j = 0; j < secondArray.length; j++) {
                    if (
                      previousAPIData[i].partner_id == secondArray[j].partner_id
                    ) {
                      secondArray.splice(j, 1);
                    }
                  }
                }
                previousAPIData = previousAPIData.concat(secondArray);
                previousAPIData.map((item) => {
                  let string_year_val = item.year_val
                    ? item.year_val.toString()
                    : yearCurrent.toString();
                  let itemYear = string_year_val.slice(
                    2,
                    string_year_val.length
                  );
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
                  if (item.months) {
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
                    obj["Jan" + itemYear] = "";
                    obj["Jan" + itemYear + "E"] = "";
                    obj["Feb" + itemYear] = "";
                    obj["Feb" + itemYear + "E"] = "";
                    obj["Mar" + itemYear] = "";
                    obj["Mar" + itemYear + "E"] = "";
                    obj["Apr" + itemYear] = "";
                    obj["Apr" + itemYear + "E"] = "";
                    obj["May" + itemYear] = "";
                    obj["May" + itemYear + "E"] = "";
                    obj["Jun" + itemYear] = "";
                    obj["Jun" + itemYear + "E"] = "";
                    obj["Jul" + itemYear] = "";
                    obj["Jul" + itemYear + "E"] = "";
                    obj["Aug" + itemYear] = "";
                    obj["Aug" + itemYear + "E"] = "";
                    obj["Sep" + itemYear] = "";
                    obj["Sep" + itemYear + "E"] = "";
                    obj["Oct" + itemYear] = "";
                    obj["Oct" + itemYear + "E"] = "";
                    obj["Nov" + itemYear] = "";
                    obj["Nov" + itemYear + "E"] = "";
                    obj["Dec" + itemYear] = "";
                    obj["Dec" + itemYear + "E"] = "";
                  }
                  final_arr.push(obj);
                });
                let preYear = yearCurrent - 1;
                getQuarterReviewDataPrevious(final_arr, preYear);
              } else {
                previousAPIData.map((item) => {
                  let string_year_val = item.year_val
                    ? item.year_val.toString()
                    : yearCurrent.toString();
                  let itemYear = string_year_val.slice(
                    2,
                    string_year_val.length
                  );
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

                  //
                });
                let preYear = yearCurrent - 1;
                getQuarterReviewDataPrevious(final_arr, preYear);
              }
            })
            .catch((e) => {
              console.log("Data Input", e);
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getPreviousQuarterData = (quarter) => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));

    let today = new Date();
    let year = today.getFullYear();
    props
      .retrieveInputCalenderData(year, quarter, usrDetails.role_id)
      .then((data) => {
        let closingData = data.CLOSING_DATE;
        let openingDate = data.OPENING_DATE;
        let dataOpen = new Date(openingDate);
        var day1 = dataOpen.getDate().toString().padStart(2, "0");
        var month1 = (dataOpen.getMonth() + 1).toString().padStart(2, "0");
        var year1 = dataOpen.getFullYear().toString();
        let openD = month1 + "-" + day1 + "-" + year1;
        let dateCus = new Date(closingData);
        var day = dateCus.getDate().toString().padStart(2, "0");
        var month = (dateCus.getMonth() + 1).toString().padStart(2, "0");
        var year = dateCus.getFullYear().toString();
        let complete = month + "-" + day + "-" + year;
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
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));

    let combinedArray = [];
    props
      .retrieveHistoricalData(usrDetails.email_id, preYear, usrDetails.role_id)
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
          obj.approverComments = "";
          obj.partner_id = item.partner_id;
          obj.year_val = item.year_val;
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
			combinedArray = currentYearArray;
			for(let i = 0; i< combinedArray.length; i++) {
				for(let j = 0; j< final_arr_previous.length; j++) {
				  if(combinedArray[i].partner_id == final_arr_previous[j].partner_id){
					let uniObj = {};
					uniObj = combinedArray[i];
					uniObj.PreviousYearData = final_arr_previous[j];
					combinedArray[i] = uniObj;
				  }
				}
			}
          setReviewData(combinedArray);
        } else {
          setReviewData(currentYearArray);
        }
      })

      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);
    }
    console.log("Data review jbjd");
    getQuarterReviewData();
    let todays = new Date();
    let cMonth = todays.getMonth();
    getPreviousQuarterData(monthsOfTheYear[cMonth]);
  }, []);

  const autoGroupColumnDef = useMemo(() => {
    return {
      width: 170,

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

        innerRenderer: footerTotalReview,
      },
    };
  }, []);

  const getCMLMValues = (params) => {
    const currentDate = new Date();

    const currentMonth = currentDate.getMonth();

    let date = new Date(
      currentDate.getFullYear(),

      currentDate.getMonth(),

      1
    );

    const currMonthName = allCalMonths[date.getMonth() - 1];

    const lastMonthName = allCalMonths[date.getMonth() - 2];

    const year = String(date.getFullYear()).slice(-2);

    const currmonthField = currMonthName + year;

    const lastmonthField = lastMonthName + year;

    if (params.data) {
      var filterCurrMonths = Object.keys(params.data)

        .filter((key) => [currmonthField].includes(key))

        .reduce((obj, key) => {
          obj[key] = params.data[key];

          return obj;
        }, {});

      var filterLastMonths = Object.keys(params.data)

        .filter((key) => [lastmonthField].includes(key))

        .reduce((obj, key) => {
          obj[key] = params.data[key];

          return obj;
        }, {});

      let ret = {
        CurrentMonth: filterCurrMonths[currmonthField],

        LastMonth: filterLastMonths[lastmonthField],
      };

      return ret;
    }

    return undefined;
  };

  const getCMLYValues = (params) => {
    const currentDate = new Date();

    const currentMonth = currentDate.getMonth();

    let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const currMonthName = allCalMonths[date.getMonth() - 1];

    const curryear = String(date.getFullYear()).slice(-2);

    const currmonthCYField = currMonthName + curryear;

    const currmonthLYField = currMonthName + (curryear - 1);

    if (params.data) {
      var filterCurrMonthCY = Object.keys(params.data)

        .filter((key) => [currmonthCYField].includes(key))

        .reduce((obj, key) => {
          obj[key] = params.data[key];

          return obj;
        }, {});

      var filterCurrMonthLY = Object.keys(params.data)

        .filter((key) => [currmonthLYField].includes(key))

        .reduce((obj, key) => {
          obj[key] = params.data[key];

          return obj;
        }, {});

      let ret = {
        CurrentMonthCY: filterCurrMonthCY[currmonthCYField],

        CurrentMonthLY: filterCurrMonthLY[currmonthLYField],
      };

      return ret;
    }

    return undefined;
  };

  const setVarCMvsLMCalc = (params) => {
    let resp = getCMLMValues(params);

    if (resp != undefined) {
      return resp.CurrentMonth - resp.LastMonth;
    }

    return "";
  };

  const setVarCMvsLMCalcPerc = (params) => {
    let resp = getCMLMValues(params);

    if (resp != undefined) {
      if (resp.LastMonth != 0) {
        return Math.round(
          ((resp.CurrentMonth - resp.LastMonth) / resp.LastMonth) * 100
        );
      }
    }

    return 0;
  };

  const getCMLYValuesWithYear = (params) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const currMonthName = allCalMonths[date.getMonth() - 1];
    const curryear = String(date.getFullYear()).slice(-2);
    const currmonthCYField = currMonthName + curryear;
    const currmonthLYField = currMonthName + (curryear - 1);
    if (params.data?.PreviousYearData) {
      var filterCurrMonthCY = Object.keys(params.data)
        .filter((key) => [currmonthCYField].includes(key))
        .reduce((obj, key) => {
          obj[key] = params.data[key];
          return obj;
        }, {});

      var filterCurrMonthLY = Object.keys(params.data.PreviousYearData)
        .filter((key) => [currmonthLYField].includes(key))
        .reduce((obj, key) => {
          obj[key] = params.data.PreviousYearData[key];

          return obj;
        }, {});

      let ret = {
        CurrentMonthCY: filterCurrMonthCY[currmonthCYField],
        CurrentMonthLY: filterCurrMonthLY[currmonthLYField],
      };
      return ret;
    }

    return undefined;
  };

  const setVarCMvsLYCalc = (params) => {
    let resp = getCMLYValuesWithYear(params);

    if (resp != undefined) {
      return resp.CurrentMonthCY - resp.CurrentMonthLY;
    }

    return 0;
  };

  const setVarCMvsLYCalcPerc = (params) => {
    let resp = getCMLYValuesWithYear(params);

    if (resp != undefined) {
      if (resp.CurrentMonthLY != 0) {
        return Math.round(
          ((resp.CurrentMonthCY - resp.CurrentMonthLY) / resp.CurrentMonthLY) *
            100
        );
      }
    }

    return 0;
  };

  const getRowStyle = (params) => {
    if (params.node.aggData) {
      return { fontWeight: "bold" };
    }
  };

  const getTotalYTDSellOutGrowthCalc = (params) => {
    let year = new Date().getFullYear();

    let selectedValueString = year.toString();

    let choppedOffYear = selectedValueString.slice(
      2,

      selectedValueString.length
    );

    let customizedYearMonths = [];

    monthsOfTheYear.forEach((element) => {
      customizedYearMonths.push(element + choppedOffYear);
    });

    let tempTotal = 0;

    customizedYearMonths.map((item) => {
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

  const getValueFormatter = (params) => {
    return params.value.toFixed(2) + "%";
  };

const yTDSelloutCurrntYear = (params) => {
    const d = new Date();
    let months = d.getMonth();
    let currentYear = d.getFullYear();
    if (currentYear) {
      months = 12;
    }
    let selectedValueString = currentYear.toString();
    let choppedOffYear = selectedValueString.slice(
      2,
      selectedValueString.length
    );
    let customizedArrayOfMonths = [];
    if (radioValue == 1) {
      for (let i = 0; i < months; i++) {
        customizedArrayOfMonths.push(monthsOfTheYear[i] + choppedOffYear);
      }
      let tempTotal = 0;

      customizedArrayOfMonths.map((item) => {
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

    } else {
      for (let i = 0; i < months; i++) {
        customizedArrayOfMonths.push(monthsOfTheYear[i] + choppedOffYear + "E");
      }

      let tempTotal = 0;
      customizedArrayOfMonths.map((item) => {
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

    }

  };


  
  const yTDSelloutPreviousYear = (params) => {
   // console.log('params::', params);
    if (params?.data?.PreviousYearData) {
      let previousData = params?.data?.PreviousYearData;
      console.log('previousData::', previousData);
    const d = new Date();
    let currentYear = previousData.year_val.toString().slice(2);
    console.log('currentYear:::', currentYear);
    let previousYear = currentYear - 1;
    let months = d.getMonth(); 
    let total = 0;
    for(let i=0; i< monthsOfTheYear.length; i++) {
      if (radioValue == 1) {
        let key = monthsOfTheYear[i]+currentYear;
        console.log('key::', key);
        if(previousData[key]) {
          total = + previousData[key];
        }
      
      } else {
        let key = monthsOfTheYear[i]+currentYear+"E";
        if(previousData[key] == null || previousData[key] == "") {
          console.log('yes its null');
          total = +0;
        } else {
          total = + previousData[key];
        }
      }
    }
    console.log('total:::', total);
    if(total == 0) {
      return ''
    } else {
      
      return total
    }
  } else {
    return ''
  }
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

  const getPreviousYearMonthVal = (params, monthsYearPrev) => {
    if (params.data.PreviousYearData) {
      if (monthsYearPrev in params.data.PreviousYearData) {
        return params.data.PreviousYearData[monthsYearPrev];
      }
    } else {
      return "";
    }
  };

  const setIsEstimated = (params, monthField) => {
    if (params.data != undefined) {
      let monthYrKey = monthField + "_E";

      var filterMonths = Object.keys(params.data)

        .filter((key) => [monthYrKey].includes(key))

        .reduce((obj, key) => {
          obj[key] = params.data[key];

          return obj;
        }, {});

      var isEstimated = filterMonths[monthYrKey] === "true";

      if (isEstimated === true) return { backgroundColor: "#EEB265" };
			return { borderColor: "#e2e2e2" }
    } else {
      return { backgroundColor: "white", borderColor: "#e2e2e2"};
    }
  };

  const currentDate = new Date();

  const currentMonth = currentDate.getMonth();

  const currentYear = String(currentDate.getFullYear()).slice(-2);

  for (let i = 6; i > 0; i--) {
    let date = new Date(
      currentDate.getFullYear(),

      currentDate.getMonth() - i,

      1
    );

    const monthName = allCalMonths[date.getMonth()];

    const year = String(date.getFullYear()).slice(-2);

    const monthHeader = monthName + " " + year;

    const monthField = monthName + year;

    const monthAEFlagField = monthName + " _E";

    if (currentYear !== year && currentMonth !== 0) continue;

    i == 1
      ? columnDefs.push(
          {
            headerName: monthHeader,

            field: radioValue == 1 ? monthField : monthField + "E",
            editable: false,

            singleClickEdit: true,

            minWidth: 100,

            aggFunc: "sum",

            sortable: true,

            suppressMenu: true,

            valueParser: (params) => Number(params.newValue),

            cellStyle: (params) => {
              return setIsEstimated(params, monthField);
            },
			
          },
		  

          {
            field: monthAEFlagField,

            hide: true,
          },

		{
          headerName: "YTD Sellout",
          field: "YTD_Growth",
          editable: false,
          minWidth: 150,
          wrapHeaderText: true,
          aggFunc: "sum",
          sortable: true,
          suppressMenu: true,
          valueGetter: (params) => {
            return yTDSelloutCurrntYear(params);
          },
          cellStyle: { "border-color": "#e2e2e2" },
        },

        {
          headerName: "YTD Sellout LY",
          field: "YTD_Growth",
          editable: false,
          minWidth: 150,
          wrapHeaderText: true,
          aggFunc: "sum",
          sortable: true,
          suppressMenu: true,
          valueGetter: (params) => {
            return yTDSelloutPreviousYear(params);
          },
          cellStyle: { "border-color": "#e2e2e2" },
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
              return getValueFormatter(params);
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
            headerName: "var. CM vs LM (value)",

            field: "varVMvsLvalue",

            minWidth: 120,

            editable: false,

            singleClickEdit: true,

            filter: "agNumberColumnFilter",

            sortable: true,

            valueGetter: (param) => {
              return setVarCMvsLMCalc(param);
            },

            valueParser: (params) => Number(params.newValue),

            aggFunc: "sum",

            suppressMenu: true,

            cellStyle: function (params) {
              if (params.value >= 0) {
                return {
                  color: "#009530",
                  fontWeight: "bold",
                  "border-color": "#e2e2e2",
                };
              } else if (params.value < 0) {
                return {
                  color: "#ff0000",
                  fontWeight: "bold",
                  "border-color": "#e2e2e2",
                };
              }
            },
          },

          {
            headerName: "var. CM vs LM (%)",

            field: "varVMvsLM",

            minWidth: 120,

            editable: false,

            filter: "agNumberColumnFilter",

            sortable: true,

            aggFunc: "sum",

            singleClickEdit: true,

            suppressMenu: true,

            valueGetter: (param) => {
              return setVarCMvsLMCalcPerc(param);
            },

            valueFormatter: (params) => {
              return params.value + "%";
            },

            cellStyle: function (params) {
              if (params.value >= 0) {
                return {
                  color: "#009530",
                  fontWeight: "bold",
                  "border-color": "#e2e2e2",
                };
              } else if (params.value < 0) {
                return {
                  color: "#ff0000",
                  fontWeight: "bold",
                  "border-color": "#e2e2e2",
                };
              }
            },
          }
        )
      : columnDefs.push({
          headerName: monthHeader,
          field: radioValue == 1 ? monthField : monthField + "E",

          editable: false,

          sortable: true,

          filter: "agNumberColumnFilter",

          aggFunc: "sum",

          singleClickEdit: true,

          minWidth: 100,

          suppressMenu: true,

          valueParser: (params) => Number(params.newValue),

          cellStyle: (params) => {
            return setIsEstimated(params, monthField);
          },
        });
  }

  const previousYear = new Date(
    currentDate.getFullYear(),

    currentDate.getMonth() - 12,

    1
  );

  const prevMonth = allCalMonths[previousYear.getMonth() - 1];

  const prevYear = String(previousYear.getFullYear()).slice(-2);

  const prevYearwithMonthValue = prevMonth + prevYear;

  const prevYearwithMonthLabel = prevMonth + " " + prevYear;

  const euroMonthAndYearAEFlagField = prevMonth + prevYear + "_E";

  if (previousYear !== prevYear && prevMonth !== 0);

  " "
    ? columnDefs.push(
        {
          headerName: prevYearwithMonthLabel,
          field:
            radioValue == 1
              ? prevYearwithMonthValue
              : prevYearwithMonthValue + "E",
          editable: false,

          singleClickEdit: true,

          minWidth: 100,

          aggFunc: "sum",

          sortable: true,

          suppressMenu: true,

          valueParser: (params) => Number(params.newValue),

          valueGetter: (params) => {
            return getPreviousYearMonthVal(params, prevYearwithMonthValue);
          },

          cellStyle: (params) => {
            return setIsEstimated(params, prevYearwithMonthValue);
          },
        },

        {
          field: euroMonthAndYearAEFlagField,

          hide: true,
        },

        {
          headerName: "var. CM vs LY (value)",

          field: "PreVMValue",

          minWidth: 120,

          editable: false,

          singleClickEdit: true,

          aggFunc: "sum",

          filter: "agNumberColumnFilter",

          sortable: true,

          suppressMenu: true,

          valueGetter: (params) => {
            return setVarCMvsLYCalc(params);
          },

          cellStyle: function (params) {
            if (params.value >= 0) {
              return {
                color: "#009530",
                fontWeight: "bold",
                "border-color": "#e2e2e2",
              };
            } else if (params.value < 0) {
              return {
                color: "#ff0000",
                fontWeight: "bold",
                "border-color": "#e2e2e2",
              };
            }
          },
        },

        {
          headerName: "var. CM vs LY (%)",

          field: "PreVMvsLM",

          minWidth: 120,

          editable: false,

          singleClickEdit: true,

          aggFunc: "sum",

          filter: "agNumberColumnFilter",

          sortable: true,

          suppressMenu: true,

          valueGetter: (params) => {
            return setVarCMvsLYCalcPerc(params);
          },

          valueFormatter: (params) => {
            return params.value + "%";
          },

          cellStyle: function (params) {
            if (params.value >= 0) {
              return {
                color: "#009530",
                fontWeight: "bold",
                "border-color": "#e2e2e2",
              };
            } else if (params.value < 0) {
              return {
                color: "#ff0000",
                fontWeight: "bold",
                "border-color": "#e2e2e2",
              };
            }
          },
        }
      )
    : columnDefs.push({
        headerName: prevYearwithMonthLabel,
        field:
          radioValue == 1
            ? prevYearwithMonthValue
            : prevYearwithMonthValue + "E",
        editable: false,

        sortable: true,

        filter: "agNumberColumnFilter",

        aggFunc: "sum",

        suppressMenu: true,

        singleClickEdit: true,

        minWidth: 100,

        valueParser: (params) => Number(params.newValue),
        valueGetter: (params) => {
          return getPreviousYearMonthVal(params, prevYearwithMonthValue);
        },
        cellStyle: (params) => {
          return setIsEstimated(params, prevYearwithMonthValue);
        },
      });

  columnDefs.push(
    {
      headerName: "Ambition Data",

      field: "ambition",

      editable: false,

      singleClickEdit: true,

      minWidth: 200,

      aggFunc: "sum",

      sortable: true,

      suppressMenu: true,

      cellStyle: { "border-color": "#e2e2e2" },
    },

    {
      headerName: "System Comments",

      field: "systemComments",

      editable: false,

      singleClickEdit: true,

      minWidth: 200,

      aggFunc: "sum",

      sortable: true,

      suppressMenu: true,

      cellStyle: { "border-color": "#e2e2e2" },
    },

    {
      headerName: "Editor Comments",

      field: "editorComments",

      editable: true,

      singleClickEdit: true,

      minWidth: 200,

      aggFunc: "sum",

      sortable: true,

      suppressMenu: true,

      cellStyle: { "border-color": "#e2e2e2" },

      cellClassRules: { "cursor-pointer": () => true },
    },

    {
      headerName: "Approver Comments",

      field: "approverComments",

      editable: false,

      singleClickEdit: true,

      minWidth: 200,

      aggFunc: "sum",

      sortable: true,

      suppressMenu: true,

      cellStyle: { "border-color": "#e2e2e2" },
    }
  );

  const handleEdit = () => {
    navigate(`/dataInput?role=${userRole}`);
  };

  const handleDtaInputNavigation = () => {
    navigate(`/dataInput?role=${userRole}`);
  };

  const historicalDataNavigation = () => {
    navigate(`/historicalData?role=${userRole}`);
  };

  const handleSave = useCallback((data) => {
	 const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);
    }
    let requestArray = [];
    data.forEach((element) => {
      let currentYEar = new Date().getFullYear();
      let monthArray = [];
    let itemYear = String(currentYEar).slice(-2);

    allCalMonths.forEach((element) => {
      const saveArray =
        radioValue == 1
          ? data[0][`${element + itemYear}`]
          : data[0][`${element + itemYear}E`];
      if (saveArray > 0) {
        monthArray.push({
          month: element.toLowerCase(),
          sellout_local_currency: saveArray.toString(),
          trans_type: "",
        });
      }
    });
      let reqData = {
        partner_id: element.partner_id,
        partner_name: element.partner_account_name,
        country_code: element.country_code,
        year_val: element.year_val?element.year_val.toString(): new Date().getFullYear().toString(),
        months: monthArray,
        trans_currency_code: element.trans_currency_code,
        created_by: usrDetails.email_id,
        created_date: new Date().toISOString().replace("T", " ").slice(0, -5),
        approval_status: '0',
        editor_comment: element.editorComments,
        comments: element.approverComments,
        batch_upload_flag: element.batch_upload_flag.toString(),
        approved_date: new Date()
          .toISOString()
          .replace("T", " ")
          .slice(0, -5),
      };
      requestArray.push(reqData);
    });

    props
      .updateSellOutData(requestArray)
      .then((data) => {
        setShowSuccessModal(true);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  }, []);

  const excelStyles = useMemo(() => {
    return [
      {
        id: "header",

        alignment: {
          vertical: "Center",
        },

        font: {
          bold: true,

          color: "#ffffff",
        },

        interior: {
          color: "#009530",

          pattern: "Solid",
        },
      },

      {
        id: "greenBackground",

        interior: {
          color: "#b5e6b5",

          pattern: "Solid",
        },
      },
    ];
  }, []);

  const handleExport = useCallback(() => {
    const params = {
      fileName: "Sell out Data Review.xlsx",
      sheetName: "Data Review",
    };

    gridRef.current.api.exportDataAsExcel(params);
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

  // const onGridReady = useCallback(() => {
  //   fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  //     .then((resp) => data)

  //     .then((data) => setRowData(data));
  // }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu />
        </Row>

        <div>
          <Breadcrumb>
            <Breadcrumb.Item href="/editor/home">
              <img
                src={Home}
                alt="home"
                style={{ height: "20px", width: "80px", cursor: "pointer" }}
              />
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div>
          <Stack direction="horizontal" gap={4}>
            <div className="sell-out-header">Sell Out Data Review</div>

            <div className="mt-0 ms-auto">
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
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
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
                  historicalDataNavigation();
                }}
              >
                Historical Data
              </Button>
            </div>
          </Stack>
        </div>

        <Row
          className="ag-theme-alpine ag-grid-table"
          style={{ height: 350, marginTop: "10px" }}
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
            // onGridReady={onGridReady}
            getRowStyle={getRowStyle}
            excelStyles={excelStyles}
            suppressMenuHide={true}
            groupDefaultExpanded={1}
          ></AgGridReact>

          <div>
            <Row className="mb-3" style={{ float: "right", marginTop: "20px" }}>
              

              <Col xs="auto">
                <Button
                  className="btn-upload edit-header"
                  onClick={(e) => handleExport()}
                >
                  Export
                </Button>
              </Col>

              <Col xs="auto">
                <Button
                  className="btn-upload edit-header"
                  onClick={(e) => handleEdit()}
                >
                  Edit
                </Button>
              </Col>

              <Col>
                <Button
                  className={
                    shouldDisableSaveButton
                      ? "btn-upload active-button"
                      : "btn-upload save-header"
                  }
                  disabled={shouldDisableSaveButton}
                  onClick={(e) => handleSave(reviewData)}
                >
                  Save
                </Button>
                <AlertModal
                  show={showSuccessModal}
                  handleClose={handleCloseSuccessModal}
                  body={successmsg}
                />
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
  updateSellOutData,
  retrieveInputCalenderData,
  retrievePartnerByRole,
})(DataReviewComponent);
