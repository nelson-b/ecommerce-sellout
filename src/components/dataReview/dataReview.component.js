import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Row, Col, Stack } from "react-bootstrap";
import "./dataReview.css";
import { month } from "../constant";
import MyMenu from "../menu/menu.component.js";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function DataReviewComponent({ excelData }) {
  function getData() {
    return [
      {
        Country: "Ireland",
        Partner: "Partner C",
        Model: "2016",
        BU: 10,
        Status: "Active",
        Jan23: "20",
        Feb23: "34",
        Mar23: "45",
        Apr23: "878",
      },
      {
        Country: "India",
        Partner: "Partner A",
        Model: "2016",
        BU: 2,
        Status: "Inactive",
        Jan23: "20",
        Feb23: "34",
        Mar23: "45",
        Apr23: "878",
      },
      {
        Country: "Germany",
        Partner: "Partner C",
        Model: "2016",
        BU: 2,
        Status: "Active",
        Jan23: "20",
        Feb23: "34",
        Mar23: "45",
        Apr23: "878",
      },
      {
        Country: "France",
        Partner: "Partner F",
        Model: "2016",
        BU: 10,
        Status: "Active",
        Jan23: "20",
        Feb23: "34",
        Mar23: "45",
        Apr23: "878",
      },
    ];
  }

  const [rowData, setRowData] = useState(getData());
  const columnDefs = [
    {
      field: "Country",
      headerName: "Country",
      rowGroup: true,
      filter: true,
      sortable: true,
      minWidth: 120,
    },
    {
      field: "Partner",
      headerName: "Partner",
      rowGroup: true,
      filter: true,
      minWidth: 120,
      sortable: true,
    },
    {
      field: "Model",
      minWidth: 130,
      filter: "agNumberColumnFilter",
      sortable: true,
    },
    {
      field: "BU",
      minWidth: 70,
      filter: "agNumberColumnFilter",
      sortable: true,
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
      headerName: "Zone",
      filter: true,
      sortable: true,
      aggFunc: "sum",
      minWidth: 220,
      cellRenderer: "agGroupCellRenderer",
    }
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
            aggFunc: "sum",
            minWidth: 100,
            valueParser: (params) => Number(params.newValue),
            valueSetter: checkNumericValue,
          },
          {
            headerName: "vat. VM vs LM (value)",
            field: "comment",
            editable: true,
            filter: true,
            sortable: true,
            singleClickEdit: true,
            minWidth: 200,
          },
          {
            headerName: "vat. VM vs LM (%)",
            field: "comment",
            editable: true,
            filter: true,
            sortable: true,
            singleClickEdit: true,
            minWidth: 170,
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
  
  const handleCancel = () => {
    setRowData(getData);
  };

  const handleEdit = () => {
    setRowData(rowData);
  };

  const handleConfirm = () => {
    setRowData(rowData);
    console.log("Save Clicked");
    console.log(rowData);
  };

  return (
    <>
      <MyMenu />
      <Stack direction="horizontal" gap={4}>
        <div className="mt-3 sell-out-header">Sell Out Data Review</div>
        <div className="mt-3 ms-auto">
          <Row className="currency-mode">CURRENCY MODE</Row>
          <Col></Col>
        </div>
        <div className="mt-3 historical-data">
          <div className="data">Historical Data</div>
        </div>
      </Stack>

      <div
        className="ag-theme-alpine"
        style={{ height: 400, margin: "7px 20px 0px 20px" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          groupDisplayType={"singleColumn"}
          showOpenedGroup={true}
          animateRows={true}
          suppressAggFuncInHeader={true}
          groupIncludeTotalFooter={true}
          groupIncludeFooter={true}
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
                variant="dark"
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
