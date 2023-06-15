import React, { useCallback, useMemo, useState, useRef } from "react";
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

function DataReviewApprover(props) {
  const gridRef = useRef();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState();
  const [radioValue, setRadioValue] = useState("1");
  const [message, setMessage] = useState(0);
  const location = useLocation();
  const historicalRole = new URLSearchParams(location.search).get("role");
  const [isYearColumnVisible, setIsYearColumnVisible] = useState(false);

  const radios = [
    { name: "Reporting Currency", value: "1" },
    { name: "Euro", value: "2" },
  ];

  const columnDefs = [
    {
      field: "Zone",
      rowGroup: true,
      hide: true,
    },
    {
      headerName: "Country",
      field: "Country",
      rowGroup: true,
      hide: true,
      filter: true,
      pinned: "left",
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Model",
      field: "Model",
      rowGroup: true,
      hide: true,
      filter: true,
      pinned: "left",
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Partner Account Name",
      field: "Partner",
      rowGroup: true,
      hide: true,
      filter: true,
      pinned: "left",
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Currency of Reporting",
      field: "currency",
      pinned: "left",
      width: 140,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "Status",
      field: "Status",
      pinned: "left",
      width: 110,
      suppressMenu: true,
      cellRenderer: (params) => {
        const Status = params.value;
        return (
          <div>
            {Status === "Active" && (
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

  const onBtShowYearColumn = useCallback(() => {
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
    gridRef.current.api.setColumnDefs([
      {
        field: "Zone",
        rowGroup: true,
        hide: true,
      },
      {
        headerName: "Country",
        field: "Country",
        rowGroup: true,
        hide: true,
        filter: true,
        pinned: "left",
        suppressSizeToFit: true,
        editable: false,
      },
      {
        headerName: "Model",
        field: "Model",
        rowGroup: true,
        hide: true,
        filter: true,
        pinned: "left",
        suppressSizeToFit: true,
        editable: false,
      },
      {
        headerName: "Partner Account Name",
        field: "Partner",
        rowGroup: true,
        hide: true,
        filter: true,
        pinned: "left",
        suppressSizeToFit: true,
        editable: false,
      },
      {
        headerName: "Currency of Reporting",
        field: "currency",
        pinned: "left",
        width: 140,
        editable: false,
        suppressMenu: true,
      },
      {
        headerName: "Status",
        field: "Status",
        pinned: "left",
        width: 110,
        suppressMenu: true,
        cellRenderer: (params) => {
          const Status = params.value;
          return (
            <div>
              {Status === "Active" && (
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
        field: `${q2Values[0]}${selectedYear}`,
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
        field: `${q2Values[1]}${selectedYear}`,
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
        field: `${q2Values[2]}${selectedYear}`,
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
    ]);
  }, []);

  const onBtHideYearColumn = useCallback(() => {
    setIsYearColumnVisible(false);
    gridRef.current.api.setColumnDefs([
      {
        field: "Zone",
        rowGroup: true,
        hide: true,
      },
      {
        headerName: "Country",
        field: "Country",
        rowGroup: true,
        hide: true,
        filter: true,
        pinned: "left",
        suppressSizeToFit: true,
        editable: false,
      },
      {
        headerName: "Model",
        field: "Model",
        rowGroup: true,
        hide: true,
        filter: true,
        pinned: "left",
        suppressSizeToFit: true,
        editable: false,
      },
      {
        headerName: "Partner Account Name",
        field: "Partner",
        rowGroup: true,
        hide: true,
        filter: true,
        pinned: "left",
        suppressSizeToFit: true,
        editable: false,
      },
      {
        headerName: "Currency of Reporting",
        field: "currency",
        pinned: "left",
        width: 140,
        editable: false,
        suppressMenu: true,
      },
      {
        headerName: "Status",
        field: "Status",
        pinned: "left",
        width: 110,
        suppressMenu: true,
        cellRenderer: (params) => {
          const Status = params.value;
          return (
            <div>
              {Status === "Active" && (
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
      console.log("index", index);
      let fieldMonth = getMonthField(month);
      console.log("fieldMonth", fieldMonth);
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
      return prev + + current;
    }, 0);

    console.log("selloutCQ", selloutCQ);

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
      console.log("index", index);
      let fieldMonth = getMonthField(month);
      console.log("fieldMonth", fieldMonth);
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
    console.log("getYTDSelloutGrowthPercCalc", params.data);
    //YTD Sellout CY
    if (params.data) {
      let YTDSelloutCY = params.data.YTD;

      //YTD Sellout LY
      const getYTDMonthsLY = allCalMonths;

      let YTDSellOutValArrLY = [];
      getYTDMonthsLY.forEach((month, index) => {
        console.log("index", index);
        let fieldMonth = getPrevMonthField(month);
        console.log("fieldMonth", fieldMonth);
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
      //% difference of YTD Sellout CY vs YTD Sellout LY
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
    if (historicalRole === "superApproverUser") {
      navigate("/superUser/home");
    } else {
      navigate("/approver/home");
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
    console.log("onExpandCol", e.target.value);

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

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => approverData)
      .then((approverData) => setRowData(approverData));
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu />
        </Row>
        <div>
          {historicalRole === "approver" ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/approver/home">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : historicalRole === "superApproverUser" ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/superUser/home">
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
                    onBtShowYearColumn();
                    setTimeout(() => {
                      onBtShowYearColumn();
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
            rowData={radioValue == 1 ? approverData : approverDataEuro}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            groupHideOpenParents={true}
            showOpenedGroup={true}
            animateRows={true}
            suppressAggFuncInHeader={true}
            groupIncludeTotalFooter={true}
            groupIncludeFooter={true}
            onGridReady={onGridReady}
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

export default DataReviewApprover;
