import React, { useCallback, useMemo, useState, useRef } from "react";
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
import { month } from "../constant";
import MyMenu from "../menu/menu.component.js";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import approverData from "../../data/reviewApprover.json";
import footerTotalReview from "./../editorDataReview/footerTotalReview";
import active from "../../images/active.png";
import closed from "../../images/closed.png";
import Home from "../../images/home-icon.png";
import "../approverDataReview/dataReviewApprover.css";

function DataReviewApprover({}) {
  const gridRef = useRef();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState();
  const [radioValue, setRadioValue] = useState("1");
  const [message, setMessage] = useState(0);
  const [updatedData, setUpdatedData] = useState(rowData);

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
      filter: true,
      pinned: "left",
      width: 150,
      suppressSizeToFit: true,
    },
    {
      headerName: "Currency of Reporting",
      field: "currency",
      pinned: "left",
      width: 140,
      editable: false,
      suppressMenu: true
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
  const quat = getCurrentQuarter();

  const getQuarterMonths = (quarter) => {
    const quarters = {
      Q1: ["Jan", "Feb", "Mar"],
      Q2: ["Apr", "May", "Jun"],
      Q3: ["Jul", "Aug", "Sep"],
      Q4: ["Oct", "Nov", "Decr"],
    };
    return quarters[quarter] || [];
  };
  const quatMonths = getQuarterMonths(quat);

  quatMonths.forEach((month, index) => {
    const currentDate = new Date();
    const currentYear = String(currentDate.getFullYear()).slice(-2);
    const monthValue = month + currentYear;
    const columnDef = {
      headerName: `${monthValue}`,
      field: `${monthValue}`,
      filter: true,
      sortable: true,
      minWidth: 100,
      aggFunc: "sum",
      suppressSizeToFit: true,
      suppressMenu: true
    };
    columnDefs.push(columnDef);
  });

  columnDefs.push(
    {
      headerName: "Sellout value Current Quarter",
      field: "Sellout",
      editable: false,
      minWidth: 150,
      wrapHeaderText: true,
      aggFunc: "sum",
      sortable: true,
      suppressMenu: true,
      cellStyle: function (params) {
        if (params.value > "0") {
          return { color: "#009530", fontWeight: "bold" };
        } else if (params.value < "0") {
          return { color: "#ff0000", fontWeight: "bold" };
        } else if (params.value == 0) {
          return { color: "#009530", fontWeight: "bold" };
        } else {
          return null;
        }
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
      cellStyle: function (params) {
        if (params.value > "0") {
          return { color: "#009530", fontWeight: "bold" };
        } else if (params.value < "0") {
          return { color: "#ff0000", fontWeight: "bold" };
        } else if (params.value == 0) {
          return { color: "#009530", fontWeight: "bold" };
        } else {
          return null;
        }
      },
    },
    {
      headerName: "YTD Sellout Growth Vs Last Year (%)",
      field: "YTD_Growth",
      editable: false,
      minWidth: 180,
      wrapHeaderText: true,
      aggFunc: "sum",
      sortable: true,
      suppressMenu: true,
      valueFormatter: (params) => {
        return params.value + "%";
      },
      cellStyle: function (params) {
        if (params.value > "0") {
          return { color: "#009530", fontWeight: "bold" };
        } else if (params.value < "0") {
          return { color: "#ff0000", fontWeight: "bold" };
        } else if (params.value == 0) {
          return { color: "#009530", fontWeight: "bold" };
        } else {
          return null;
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
      suppressMenu: true
    },
    {
      headerName: "System Comments",
      field: "systemComments",
      editable: false,
      wrapHeaderText: true,
      minWidth: 140,
      aggFunc: "sum",
      sortable: true,
      suppressMenu: true
    },
    {
      headerName: "Editor Comments",
      field: "editorComments",
      editable: false,
      wrapHeaderText: true,
      minWidth: 140,
      aggFunc: "sum",
      sortable: true,
      suppressMenu: true
    },
    {
      headerName: "Approver Comments",
      field: "approverComments",
      editable: true,
      wrapHeaderText: true,
      minWidth: 140,
      aggFunc: "sum",
      sortable: true,
      suppressMenu: true
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
      width: 160,
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
    navigate("/approverHome");
  };

  const handleInvestigation = () => {
    // navigate("/editorHome", { state: { message } });
    alert(message ? `${message} Partner Selected for Data Approval ` : "");
  };

  const handleConfirm = () => {
    setRowData(rowData);
  };

  const getRowStyle = (params) => {
    if (params.node.aggData) {
      return { fontWeight: "bold" };
    }
  };

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
          <Breadcrumb>
            <Breadcrumb.Item href="/approverHome">
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
              <Button className="btn-md historical-data">
                Historical Data
              </Button>
            </div>
          </Stack>
        </div>

        <Row
          className="ag-theme-alpine ag-grid-table"
          style={{ height: 370, marginTop: "10px" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={radioValue == 1 ? approverData : approverData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            groupHideOpenParents={true}
            showOpenedGroup={true}
            animateRows={true}
            suppressAggFuncInHeader={true}
            groupIncludeTotalFooter={true}
            groupIncludeFooter={true}
            groupDefaultExpanded={-1}
            onGridReady={onGridReady}
            getRowStyle={getRowStyle}
            rowSelection={"multiple"}
            onSelectionChanged={handleCheckboxClick}
            groupSelectsChildren={true}
            suppressMenuHide= {true}
          ></AgGridReact>
          <div className="checkbox-message">
            {message > 0
              ? `${message} Partner Selected for Data Approval `
              : ""}
          </div>
          <div>
            <Row className="mb-3" style={{ float: "right", marginTop: "20px" }}>
              <Col xs="auto">
                <Button
                  className="btn-upload cancel-header"
                  onClick={() => {
                    handleReviewNavigation();
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
