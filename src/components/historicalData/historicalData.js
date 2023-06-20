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
  Form,
} from "react-bootstrap";
import { allCalMonths } from "../constant";
import MyMenu from "../menu/menu.component.js";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import historyData from "../../data/historicalData.json";
import footerTotalReview from "../editorDataReview/footerTotalReview";
import active from "../../images/active.png";
import closed from "../../images/closed.png";
import Home from "../../images/home-icon.png";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { retrieveHistoricalData } from "../../actions/selloutaction";
import "./historicalData.css";

function HistoricalData(props) {
  const gridRef = useRef();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const [radioValue, setRadioValue] = useState("1");
  const location = useLocation();
  let screenRole = new URLSearchParams(location.search).get("role");
  const [selectedValue, setSelectedValue] = useState(new Date().getFullYear());
  const [historicalData, setHistoricalData] = useState([]);

  const radios = [
    { name: "Reporting Currency", value: "1" },
    { name: "Euro", value: "2" },
  ];

  // const getParams = () => {
  //   return {
  //     allColumns: true,
  //     fileName: "Sell out Historical Data.xlsx",
  //     sheetName: "Historical Data",
  //   };
  // };

  const columnDefs = [
    {
      headerName: "Zone",
      field: "zone_val",
      rowGroup: true,
      hide: true,
    },
    {
      headerName: "Partner Account Name",
      field: "partner_account_name",
      filter: true,
      sortable: true,
      pinned: "left",
      width: 220,
      suppressSizeToFit: true,
    },
    {
      headerName: "Partner ID",
      field: "partner_id",
      hide: true,
    },
    {
      headerName: "Country",
      field: "country_code",
      rowGroup: true,
      width: 100,
      hide: true,
      filter: true,
      sortable: true,
      pinned: "left",
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Model",
      field: "model_type",
      width: 100,
      rowGroup: true,
      hide: true,
      sortable: true,
      filter: true,
      pinned: "left",
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Currency of Reporting",
      field: "trans_currency_code",
      sortable: true,
      filter: true,
      pinned: "left",
      width: 140,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "Status",
      field: "status",
      pinned: "left",
      width: 110,
      suppressSizeToFit: true,
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

  let userMail = "";

  if (screenRole == "editor") {
    userMail = "chncn00071@example.com";
  }
  if (screenRole == "approve_1" || screenRole == "approver_2") {
    userMail = "chncn00071@example.com";
  }
  if (screenRole == "supervisor_approv_1_2") {
    userMail = "chncn00071@example.com";
  }

  const getHistoricalData = (mail, year, role) => {
    props
      .retrieveHistoricalData(mail, year, role)
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
        setHistoricalData(final_arr);
        console.log("historicalData", historicalData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getHistoricalData(userMail, selectedValue, screenRole);
  }, []);

  const getMonths = [];

  const yearVlaue =
    new Date().getFullYear() == selectedValue ? getMonths.length - 1 : 13;

  const currentDate = new Date();

  for (
    let i =
      selectedValue == new Date().getFullYear()
        ? currentDate.getMonth() + 1
        : 12;
    i > 0;
    i--
  ) {
    let date = new Date(
      selectedValue,
      selectedValue == new Date().getFullYear()
        ? currentDate.getMonth() - (i - 1)
        : 1
    );
    const monthName = allCalMonths[date.getMonth()];

    if (!(allCalMonths[currentDate.getMonth()] === monthName)) {
      const year =
        selectedValue == new Date().getFullYear()
          ? String(date.getFullYear()).slice(-2)
          : String(selectedValue).slice(-2);

      const monthHeader =
        selectedValue == new Date().getFullYear()
          ? monthName + " " + year
          : allCalMonths[12 - i] + " " + year;

      const monthField =
        selectedValue == new Date().getFullYear()
          ? monthName + year
          : allCalMonths[12 - i] + year;

      columnDefs.push({
        headerName: monthHeader,
        field: radioValue == 1 ? monthField : monthField + "E",
        editable: false,
        singleClickEdit: true,
        minWidth: 100,
        aggFunc: "sum",
        sortable: true,
        suppressMenu: true,
        cellStyle: { "border-color": "#e2e2e2" },
        valueParser: (params) => Number(params.newValue),
      });
    }
  }

  columnDefs.push({
    headerName: `${selectedValue} Total`,
    field: "total",
    minWidth: 90,
    editable: false,
    singleClickEdit: true,
    suppressMenu: true,
    cellStyle: { "border-color": "#e2e2e2" },
    aggFunc: "sum",
    valueGetter: (param) => {
      return settotalVlaues(param);
    },
  });
  columnDefs.push(
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
      editable: false,
      singleClickEdit: true,
      minWidth: 200,
      aggFunc: "sum",
      sortable: true,
      suppressMenu: true,
      cellStyle: { "border-color": "#e2e2e2" },
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

  const defaultColDef = useMemo(() => {
    return {
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClassRules: {
        greyBackground: (params) => {
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

  const getRowStyle = (params) => {
    if (params.node.aggData) {
      return { fontWeight: "bold" };
    }
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
        id: "greyBackground",
        interior: {
          color: "#D3D3D3",
          pattern: "Solid",
        },
      },
    ];
  }, []);

  const handleExport = useCallback(() => {
    const params = {
      fileName: "Sell out Historical Data.xlsx",
      sheetName: "Historical Data",
    };
    gridRef.current.api.exportDataAsExcel(params);
    // gridRef.current.api.exportDataAsCsv(getParams());
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    getHistoricalData(userMail, value, screenRole);
  };

  const getMonthFeildValues = (params) => {
    var filterTotalMonths = [];

    for (let i = 0; i < yearVlaue; i++) {
      let sum = 0;

      params?.data?.months?.forEach((month) => {
        if (
          month.sellout_local_currency !== null &&
          month.month_val != getMonths[new Date().getMonth()]
        ) {
          sum += month.sellout_local_currency;
        }
      });

      filterTotalMonths.push(sum);
    }
    return filterTotalMonths.length ? filterTotalMonths : undefined;
  };

  const settotalVlaues = (params) => {
    let resp = getMonthFeildValues(params);
    if (resp != undefined) {
      return resp[0];
    }
    return "";
  };

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu />
        </Row>
        <div>
          {screenRole === "editor" ? (
            <Breadcrumb style={{ marginBottom: "-30px" }}>
              <Breadcrumb.Item href="/editor/home">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
              <span style={{ color: "grey" }}> &nbsp;{">"}</span>
              <Breadcrumb.Item active style={{ color: "#000000" }}>
                &nbsp;Data Review
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : screenRole === "approve_1" ? (
            <Breadcrumb style={{ marginBottom: "-30px" }}>
              <Breadcrumb.Item href="/approve_1/home">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
              <span style={{ color: "grey" }}> &nbsp;{">"}</span>
              <Breadcrumb.Item active style={{ color: "#000000" }}>
                &nbsp;Data Review
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : screenRole === "approver" || screenRole === "approver_2" ? (
            <Breadcrumb style={{ marginBottom: "-30px" }}>
              <Breadcrumb.Item href="/approver_2/home">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
              <span style={{ color: "grey" }}> &nbsp;{">"}</span>
              <Breadcrumb.Item active style={{ color: "#000000" }}>
                &nbsp;Data Review
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : screenRole === "superApproverUser" ||
            screenRole === "supervisor_approv_1_2" ? (
            <Breadcrumb style={{ marginBottom: "-30px" }}>
              <Breadcrumb.Item href="/superApproverUser/home">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
              <span style={{ color: "grey" }}> &nbsp;{">"}</span>
              <Breadcrumb.Item active style={{ color: "#000000" }}>
                &nbsp;Data Review
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : (
            <div></div>
          )}
        </div>

        <div>
          <Stack direction="horizontal" gap={4}>
            <div className="sell-out-historical-header">
              Historical Sell Out Data
            </div>
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
              <Row className="year-container">
                <Form.Select
                  size="sm"
                  style={{ width: "120px", height: "35px" }}
                  value={selectedValue}
                  onChange={handleChange}
                  id="yearSelect"
                >
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </Form.Select>
              </Row>
            </div>
          </Stack>
        </div>

        <Row
          className="ag-theme-alpine ag-grid-table"
          style={{ height: 320, marginTop: "10px" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={radioValue == 1 ? historicalData : historicalData}
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
            groupDefaultExpanded={-1}
            // suppressExcelExport={true}
          ></AgGridReact>
          <div>
            <Row className="mb-3" style={{ float: "right", marginTop: "10px" }}>
              <Col xs="auto">
                <Button
                  className="btn-upload save-header"
                  onClick={(e) => handleExport()}
                >
                  Export
                </Button>
              </Col>
            </Row>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default connect(null, { retrieveHistoricalData })(HistoricalData);
