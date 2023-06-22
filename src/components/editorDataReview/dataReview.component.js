import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";

import { useNavigate } from "react-router-dom";

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

import { allCalMonths } from "../constant";

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

import { connect } from "react-redux";

function DataReviewComponent(props) {
  const gridRef = useRef();

  const navigate = useNavigate();
  const [rowData, setRowData] = useState();
  const [radioValue, setRadioValue] = useState("1");
  const location = useLocation();
  const historicalRole = new URLSearchParams(location.search).get("role");
  const [reviewData, setReviewData] = useState([]);

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
    props
      .retrieveHistoricalData("nelson@se.com", year, historicalRole)
      .then((data) => {
        let final_arr = [];

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
          obj.systemComments = item.comments;
          obj.editorComments = item.editor_comment;
          obj.YTD = "";
          obj.YTD_Growth = "";
          obj.ambition = "";
          obj.approverComments = "";
          obj.partner_id = item.partner_id;
          obj.year_val = item.year_val;

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

          final_arr.push(obj);
          setReviewData(final_arr);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getQuarterReviewData();
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
      console.log('data in cal', data);
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

  const setVarCMvsLYCalc = (params) => {
    let resp = getCMLYValues(params);

    if (resp != undefined) {
      return resp.CurrentMonthCY - resp.CurrentMonthLY;
    }

    return 0;
  };

  const setVarCMvsLYCalcPerc = (params) => {
    let resp = getCMLYValues(params);

    console.log("setVarCMvsLYCalcPerc", resp);

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
    } else {
      return { backgroundColor: "white", "border-color": "#e2e2e2" };
    }
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = String(currentDate.getFullYear()).slice(-2);

  for (let i = 5; i > 0; i--) {
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
            // field: monthField,
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

            // valueGetter: (params) => {
            //   return getYTDSelloutGrowthPercCalc(params);
            // },

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
          // field: monthField,
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
          // field: prevYearwithMonthValue,
          field: radioValue == 1 ? prevYearwithMonthValue : prevYearwithMonthValue + "E",
          editable: false,
          singleClickEdit: true,
          minWidth: 100,
          aggFunc: "sum",
          sortable: true,
          suppressMenu: true,
          valueParser: (params) => Number(params.newValue),
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
        // field: prevYearwithMonthValue,
        field: radioValue == 1 ? prevYearwithMonthValue : prevYearwithMonthValue + "E",
        editable: false,
        sortable: true,
        filter: "agNumberColumnFilter",
        aggFunc: "sum",
        suppressMenu: true,
        singleClickEdit: true,
        minWidth: 100,
        valueParser: (params) => Number(params.newValue),
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
    navigate(`/dataInput?role=${historicalRole}`);
  };

  const handleDtaInputNavigation = () => {
    navigate(`/dataInput?role=${historicalRole}`);
  };

  const historicalDataNavigation = () => {
    navigate(`/historicalData?role=${historicalRole}`);
  };

  const handleSave = () => {
    setRowData(rowData);
  };

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
                  className="btn-upload cancel-header"
                  onClick={() => {
                    handleDtaInputNavigation(historicalRole);
                  }}
                >
                  Cancel
                </Button>
              </Col>

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
                  className="btn-upload save-header"
                  onClick={() => {
                    handleSave();
                  }}
                >
                  Save
                </Button>
              </Col>
            </Row>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default connect(null, { retrieveHistoricalData })(DataReviewComponent);
