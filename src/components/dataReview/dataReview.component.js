import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  Button,
  Row,
  Col,
  Stack,
  ToggleButton,
  ButtonGroup
} from "react-bootstrap";
import "./dataReview.css";
import { month } from "../constant";
import MyMenu from "../menu/menu.component.js";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import data from "../../data/dataReview.json";
import dataEuro from "../../data/dataReviewEuro.json";

function DataReviewComponent({}) {
  const [rowData, setRowData] = useState(data);
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Reporting Currency", value: "1" },
    { name: "Euro", value: "2" },
  ];

  const columnDefs = [
    { field: 'Zone', rowGroup: true, hide: true },
    {
      field: "Partner",
      headerName: "Partner",
      filter: true,
      sortable: true,
      pinned: "left"
    },
    {
      field: "Country",
      headerName: "Country",
      rowGroup: true,
      filter: true,
      sortable: true,
      pinned: "left"
    },
    {
      field: "Model",
      rowGroup: true,
      filter: true,
      sortable: true,
      pinned: "left"
    },
    {
      headerName: "Status",
      field: "Status",
      minWidth: 100,
      filter: true,
      sortable: true,
      cellStyle: (params) => {
        if (params.value === "Active") {
          return { color: "green" };
        } else {
          return { color: "darkorange" };
        }
      },
    },
  ];

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
    };
  }, []);

  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "Filter Criteria Zone",
      minWidth: 220,
      filter: true,
      sortable: true,
      pinned: "left",
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
        suppressCount: true,
        checkbox: true,
      },
    };
  }, []);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = String(currentDate.getFullYear()).slice(-2);

  for (let i = 7; i > 0; i--) {
    let date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - (i - 1),
      1
    );
    const monthName = month[date.getMonth()];
    const year = String(date.getFullYear()).slice(-2);
    const monthWithYearLabel = monthName + " " + year;
    const monthWithYearValue = monthName + "" + year;

    // to make sure user entered number only
    const checkNumericValue = (params) => {
      const newValInt = Number(params.newValue.toFixed(2));
      const valueChanged = params.data[monthWithYearLabel] !== newValInt;
      if (valueChanged) {
        params.data[monthWithYearLabel] =
          newValInt >= 0
            ? newValInt
            : params.oldValue !== undefined
            ? params.oldValue
            : "";
      }
      return valueChanged;
    };
    if (currentYear !== year && currentMonth !== 0) continue;
    i == 1
      ? columnDefs.push(
          {
            headerName: monthWithYearLabel,
            field: monthWithYearValue,
            editable: true,
            singleClickEdit: true,
            minWidth: 100,
            aggFunc: "sum",
            valueParser: (params) => Number(params.newValue),
            valueSetter: checkNumericValue,
          },
          {
            headerName: "vat. VM vs LM (value)",
            field: "vatVMvsLvalue",
            minWidth: 200,
            editable: true,
            singleClickEdit: true,
            aggFunc: "sum",
            filter: "agNumberColumnFilter",
            sortable: true,
          },
          {
            headerName: "vat. VM vs LM (%)",
            field: "vatVMvsLM",
            minWidth: 170,
            editable: true,
            filter: "agNumberColumnFilter",
            sortable: true,
            aggFunc: "sum",
            singleClickEdit: true,
          }
        )
      : columnDefs.push({
          headerName: monthWithYearLabel,
          field: monthWithYearValue,
          editable: true,
          sortable: true,
          filter: "agNumberColumnFilter",
          aggFunc: "sum",
          singleClickEdit: true,
          minWidth: 100,
          valueParser: (params) => Number(params.newValue),
          valueSetter: checkNumericValue,
        });
  }

  const previousYear = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 12,
    1
  );
  const prevMonth = month[previousYear.getMonth()];
  const prevYear = String(previousYear.getFullYear()).slice(-2);

  const prevYearwithMonthValue = prevMonth + "" + prevYear;
  const prevYearwithMonthLabel = prevMonth + " " + prevYear;

  if (previousYear !== prevYear && prevMonth !== 0);
  " "
    ? columnDefs.push(
        {
          headerName: prevYearwithMonthLabel,
          field: prevYearwithMonthValue,
          editable: true,
          singleClickEdit: true,
          minWidth: 100,
          aggFunc: "sum",
          valueParser: (params) => Number(params.newValue),
        },
        {
          headerName: "vat. VM vs LM (value)",
          field: "vatVMvsLvalue",
          minWidth: 200,
          editable: true,
          singleClickEdit: true,
          aggFunc: "sum",
          filter: "agNumberColumnFilter",
          sortable: true,
        }
      )
    : columnDefs.push({
        headerName: prevYearwithMonthLabel,
        field: prevYearwithMonthValue,
        editable: true,
        sortable: true,
        filter: "agNumberColumnFilter",
        aggFunc: "sum",
        singleClickEdit: true,
        minWidth: 100,
        valueParser: (params) => Number(params.newValue),
      });

  const handleCancel = () => {
    setRowData(data);
  };

  const handleEdit = () => {
    setRowData(data);
  };

  const handleConfirm = () => {
    setRowData(rowData);
    console.log("Save Clicked");
    console.log(rowData);
  };

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => data)
      .then((data) => setRowData(data));
  }, []);

  return (
    <>
      <MyMenu />
      <div className="mt-3">
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
                    variant={idx % 2 ? "outline-success" : "outline-danger"}
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
          <div className="historical-data">
            <div className="data">Historical Data</div>
          </div>
        </Stack>
      </div>

      <div
        className="ag-theme-alpine"
        style={{ height: 450, margin: "7px 20px 0px 20px" }}
      >
        <AgGridReact
          rowData={radioValue == 1 ? data : dataEuro}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          groupDisplayType={"singleColumn"}
          showOpenedGroup={true}
          animateRows={true}
          suppressAggFuncInHeader={true}
          groupIncludeTotalFooter={true}
          groupIncludeFooter={true}
          groupDefaultExpanded={-1}
          onGridReady={onGridReady}
        ></AgGridReact>
        <div className="">
          <Row style={{ float: "right", marginTop: "10px" }}>
            <Col xs="auto">
              <Button
                variant="outline-secondary"
                className="btn-upload"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                variant="outline-secondary"
                className="btn-upload"
                onClick={() => {
                  handleEdit();
                }}
              >
                Edit
              </Button>
            </Col>
            <Col>
              <Button
                // variant="dark"
                variant="outline-secondary"
                className="btn-upload"
                onClick={() => {
                  handleConfirm();
                }}
              >
                Confirm
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default DataReviewComponent;
