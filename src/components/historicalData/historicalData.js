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
import "./historicalData.css";

function HistoricalData({}) {
  const gridRef = useRef();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState();
  const [radioValue, setRadioValue] = useState("1");
  const location = useLocation();
  const screenRole = new URLSearchParams(location.search).get("role");
  const [selectedValue, setSelectedValue] = useState(new Date().getFullYear());

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
      headerName: "Partner Account Name",
      field: "Partner",
      filter: true,
      sortable: true,
      pinned: "left",
      width: 170,
      suppressSizeToFit: true,
    },
    {
      headerName: "Partner ID",
      field: "partner_id",
      hide: true,
    },
    {
      headerName: "Country",
      field: "Country",
      rowGroup: true,
      width: 140,
      hide: true,
      filter: true,
      sortable: true,
      pinned: "left",
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Model",
      field: "Model",
      width: 140,
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
      field: "currency",
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
      field: "Status",
      pinned: "left",
      width: 110,
      suppressSizeToFit: true,
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

    if (
      !(allCalMonths[currentDate.getMonth()] === monthName)
    ) {
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
        field: monthField,
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

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => rowData)
      .then((rowData) => setRowData(rowData));
  }, []);

  const handleExport = useCallback(() => {
    const params = {
      fileName: "Sell out Historical Data.xlsx",
      sheetName: "Historical Data",
    };
    gridRef.current.api.exportDataAsExcel(params);
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
  };

  const getMonthFeildValues = (params) => {
    var filterTotalMonths = [];
    for (
      let i =
        selectedValue == new Date().getFullYear()
          ? new Date().getMonth() + 1
          : 12;
      i > 0;
      i--
    ) {
      const currentDate = new Date();

      let date = new Date(selectedValue, currentDate.getMonth() - (i - 1), 1);
      const monthName = allCalMonths[date.getMonth()];
      const year =
        selectedValue == new Date().getFullYear()
          ? String(date.getFullYear()).slice(-2)
          : String(selectedValue).slice(-2);

      const monthField =
        selectedValue == new Date().getFullYear()
          ? monthName + year
          : allCalMonths[12 - i] + year;

      filterTotalMonths.push(
        Object.keys(params.data)
          .filter((key) => [monthField].includes(key))
          .reduce((obj, key) => {
            obj[key] = params.data[key];
            return obj;
          }, {})
      );
    }
    return filterTotalMonths.length ? filterTotalMonths : undefined;
  };

  const settotalVlaues = (params) => {
    let resp = getMonthFeildValues(params);
    if (resp != undefined) {
      const sum = resp.reduce((acc, obj) => {
        const value = Object.values(obj)[0];
        return acc + value;
      }, 0);
      return sum;
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
          ) : screenRole === "approver" ? (
            <Breadcrumb style={{ marginBottom: "-30px" }}>
              <Breadcrumb.Item href="/approver/home">
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
          ) : screenRole === "superApproverUser" ? (
            <Breadcrumb style={{ marginBottom: "-30px" }}>
              <Breadcrumb.Item href="/superUser/home">
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
            rowData={radioValue == 1 ? historyData : historyData}
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
            excelStyles={excelStyles}
            suppressMenuHide={true}
            groupDefaultExpanded={-1}
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

export default HistoricalData;
