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
import { allCalMonths, quarters } from "../constant";
import MyMenu from "../menu/menu.component.js";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import approverData from "../../data/reviewApprover.json";
import approverDataEuro from "../../data/reviewApproverEuro.json";
import footerTotalReview from "./../editorDataReview/footerTotalReview";
import active from "../../images/active.png";
import closed from "../../images/closed.png";
import Home from "../../images/home-icon.png";
import "../approverDataReview/dataReviewApprover.css";
import { useLocation } from "react-router-dom";
import { retrieveHistoricalData } from "../../actions/selloutaction";
import { connect } from "react-redux";

function DataReviewApprover(props) {
  const gridRef = useRef();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState();
  const [reviewData, setReviewData] = useState([]);
  const [radioValue, setRadioValue] = useState("1");
  const [message, setMessage] = useState(0);
  const location = useLocation();
  let historicalRole = new URLSearchParams(location.search).get("role");
  const [isYearColumnVisible, setIsYearColumnVisible] = useState(false);
  const radios = [
    { name: "Reporting Currency", value: "1" },
    { name: "Euro", value: "2" },
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
      field: "trans_currency_code",
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

  if (historicalRole == "approve_1" || historicalRole == "approver_2") {
    userMail = "abc@example.com";
  }
  if (historicalRole == "superApproverUser") {
    historicalRole = "supervisor_approv_1_2";
    userMail = "abc@example.com";
  }

  const year = new Date().getFullYear();

  const getQuarterReviewData = (userMail, year, historicalRole) => {
    props
      .retrieveHistoricalData(userMail, year, historicalRole)
      .then((data) => {
        let final_arr = [];
        data.map((item) => {
          let obj = {};
          obj.zone_val = item.zone_val;
          obj.country_code = item.country_code;
          obj.partner_account_name = item.partner_account_name;
          obj.model_type = item.model_type;
          obj.status = item.status;
          obj.trans_currency_code = item.trans_currency_code;
          obj.SelloutCQ = "";
          obj.systemComments = item.comments;
          obj.editorComments = item.editor_comment;
          obj.YTD = "";
          obj.YTD_Growth = "";
          obj.ambition = "";
          obj.approverComments = "";
          item.months.map((each) => {
            if (each.month_val === "jan") {
              obj.Jan23 = each.sellout_local_currency;
              obj.Jan23E = each.sellout;
            }
            if (each.month_val === "feb") {
              obj.Feb23 = each.sellout_local_currency;
              obj.Feb23E = each.sellout;
            }
            if (each.month_val === "mar") {
              obj.Mar23 = each.sellout_local_currency;
              obj.Mar23E = each.sellout;
            }
            if (each.month_val === "apr") {
              obj.Apr23 = each.sellout_local_currency;
              obj.Apr23E = each.sellout;
            }
            if (each.month_val === "may") {
              obj.May23 = each.sellout_local_currency;
              obj.May23E = each.sellout;
            }
            if (each.month_val === "jun") {
              obj.Jun23 = each.sellout_local_currency;
              obj.Jun23E = each.sellout;
            }
            if (each.month_val === "jul") {
              obj.Jul23 = each.sellout_local_currency;
              obj.Jul23E = each.sellout;
            }
            if (each.month_val === "aug") {
              obj.Aug23 = each.sellout_local_currency;
              obj.Aug23E = each.sellout;
            }
            if (each.month_val === "sep") {
              obj.Sep23 = each.sellout_local_currency;
              obj.Sep23E = each.sellout;
            }
            if (each.month_val === "oct") {
              obj.Oct23 = each.sellout_local_currency;
              obj.Oct23E = each.sellout;
            }
            if (each.month_val === "nov") {
              obj.Nov23 = each.sellout_local_currency;
              obj.Nov23E = each.sellout;
            }
            if (each.month_val === "dec") {
              obj.Dec23 = each.sellout_local_currency;
              obj.Dec23E = each.sellout;
            }
          });
          final_arr.push(obj);
        });

        console.log("final_arr::::", final_arr);
        setReviewData(final_arr);
      })

      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getQuarterReviewData(userMail, year, historicalRole);
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
        field: "trans_currency_code",
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
          return params.value + "%";
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
      },
    ];

    //  gridArr.splice(6,0, ...testArr)

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
        field: "trans_currency_code",
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
          return params.value + "%";
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
    let sellOutValArr = [];
    quatMonths.forEach((month, index) => {
      let fieldMonth = getMonthField(month);

      if (params.data) {
        var filterMonthCQ = Object.keys(params.data)
          .filter((key) => [fieldMonth].includes(key))
          .reduce((obj, key) => {
            obj[key] = params.data[key];
            return obj;
          }, {});
      }

      if (filterMonthCQ) {
        let fieldMonthData = filterMonthCQ[fieldMonth];
        sellOutValArr = sellOutValArr.concat(fieldMonthData);
      }
    });

    let selloutCQ = sellOutValArr.reduce(function (prev, current) {
      return prev + +current;
    }, 0);

    if (params.data) {
      params.data.SelloutCQ = selloutCQ != undefined ? selloutCQ : 0;
    }
    return selloutCQ;
  };

  const getTotalYTDSellOutGrowthCalc = (params) => {
    const currentDate = new Date();
    const getYTDMonths = allCalMonths.slice(0, currentDate.getMonth());

    let YTDSellOutValArr = [];
    getYTDMonths.forEach((month, index) => {
      let fieldMonth = getMonthField(month);

      if (params.data) {
        var filterMonthsYTD = Object.keys(params.data)
          .filter((key) => [fieldMonth].includes(key))
          .reduce((obj, key) => {
            obj[key] = params.data[key];
            return obj;
          }, {});
      }

      if (filterMonthsYTD) {
        let fieldMonthData = filterMonthsYTD[fieldMonth];
        YTDSellOutValArr = YTDSellOutValArr.concat(fieldMonthData);
      }
    });

    let YTD = YTDSellOutValArr.reduce(function (prev, current) {
      return prev + +current;
    }, 0);

    if (params.data) {
      params.data.YTD = YTD != undefined ? YTD : 0;
    }

    return YTD;
  };

  const getYTDSelloutGrowthPercCalc = (params) => {
    //YTD Sellout CY
    if (params.data) {
      let YTDSelloutCY = params.data.YTD;

      //YTD Sellout LY
      const getYTDMonthsLY = allCalMonths;
      let YTDSellOutValArrLY = [];
      getYTDMonthsLY.forEach((month, index) => {
        let fieldMonth = getPrevMonthField(month);

        if (params.data) {
          var filterMonthsYTDLY = Object.keys(params.data)
            .filter((key) => [fieldMonth].includes(key))
            .reduce((obj, key) => {
              obj[key] = params.data[key];
              return obj;
            }, {});
        }

        if (filterMonthsYTDLY) {
          let fieldMonthData = filterMonthsYTDLY[fieldMonth];
          YTDSellOutValArrLY = YTDSellOutValArrLY.concat(fieldMonthData);
        }
      });

      let YTDSelloutLY = YTDSellOutValArrLY.reduce(function (prev, current) {
        return prev + +current;
      }, 0);

      let YTD_Growth = ((YTDSelloutCY - YTDSelloutLY) / YTDSelloutLY) * 100;
      params.data.YTD_Growth = Math.round(YTD_Growth);
      return Math.round(YTD_Growth);
    }

    return 0;
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
        return params.value + "%";
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

  const handleSave = (params) => {
    const gridApi = params.api;
    const updatedRowData = gridApi.getData();
    setRowData(updatedRowData);
  };

  const handleReviewNavigation = () => {
    if (historicalRole === "superApproverUser" || historicalRole === "supervisor_approv_1_2") {
      navigate("/superApproverUser/home");
    } else if (historicalRole === "approve_1") {
      navigate("/approve_1/home");
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

  const handleConfirm = () => {
    setRowData(rowData);
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

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu />
        </Row>

        <div>
          {historicalRole === "approve_1" ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/approve_1/home">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : historicalRole === "approver" ||
            historicalRole === "approver_2" ? (
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
            historicalRole === "supervisor_approv_1_2" ? (
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
                  className="btn-invest edit-header"
                  onClick={(e) => handleInvestigation(message)}
                >
                  Send For Investigation
                </Button>
              </Col>
              <Col xs="auto">
                <Button
                  className="btn-upload edit-header"
                  onClick={(e) => handleSave()}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  className="btn-upload save-header"
                  onClick={() => {
                    handleConfirm();
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

export default connect(null, { retrieveHistoricalData })(DataReviewApprover);
