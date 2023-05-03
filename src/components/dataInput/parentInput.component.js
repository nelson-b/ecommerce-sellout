'use strict';

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useMemo, useCallback, useRef } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { month } from "../constant";
import "./parentInput.component.css";
import BatchInputComponent from "./batchInput.component";
import MyMenu from "../menu/menu.component.js";
import "ag-grid-community";

function DataInputComponent (){
  const gridRef = useRef(null);
  const getData = [
    {
      zone: "Zone 1",
      country: "Country A",
      partner: "Partner C",
      model: "E1",
      status: "Active",
      currency: "INR",
      Jan23_E: "true",
      Feb23_E: "false",
      Mar23_E: "false",
      Apr23_E: "true",
      May23_E: "true",
      Jan23: 23,
      Feb23: 56,
      Mar23: 67,
      Apr23: 46,
      May23: 64
    },
    {
      zone: "Zone 2",
      country: "Country B",
      partner: "Partner C",
      model: "E2",
      status: "Active",
      currency: "USD",
      Jan23_E: "false",
      Feb23_E: "false",
      Mar23_E: "true",
      Apr23_E: "false",
      May23_E: "true",
      Jan23: 23,
      Feb23: 56,
      Mar23: 67,
      Apr23: 46,
      May23: 64
    },
    {
      zone: "Zone 1",
      country: "Country C",
      partner: "Partner B",
      model: "E2",
      status: "Active",
      currency: "Euro",
      Jan23_E: "true",
      Feb23_E: "false",
      Mar23_E: "true",
      Apr23_E: "false",
      May23_E: "false",
      Jan23: 23,
      Feb23: 56,
      Mar23: 67,
      Apr23: 46,
      May23: 64
    },
    {
      zone: "Zone 2",
      country: "Country B",
      partner: "Partner C",
      model: "E2",
      status: "Inactive",
      currency: "USD",
      Jan23_E: "false",
      Feb23_E: "true",
      Mar23_E: "false",
      Apr23_E: "false",
      May23_E: "true",
      Jan23: 23,
      Feb23: 56,
      Mar23: 67,
      Apr23: 46,
      May23: 64
    },
  ];

  const [rowData, setRowData] = useState(getData);

  const columnDefs = [
    {
      headerName: "Zone",
      field: "zone",
      sortable: true,
      filter: true,
      pinned: "left"
    },
    {
      headerName: "Country",
      field: "country",
      sortable: true,
      filter: true,
      pinned: "left"
    },
    {
      headerName: "Partner",
      field: "partner",
      sortable: true,
      filter: true,
      pinned: "left"
    },
    {
      headerName: "Model",
      field: "model",
      sortable: true,
      filter: true,
      pinned: "left"
    },
    {
      headerName: "Status",
      field: "status",
      minWidth: 100,
      cellStyle: (params) => {
        if (params.value === "Active") {
          return { color: "green" };
        } else {
          return { color: "darkorange" };
        }
      },
    },
    {
      headerName: "Currency of Reporting",
      field: "currency",
      minWidth: 100,
    },
  ];

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      flex: 1,
    }),
    []
  );
  
  //fn set is estimated
  const fnSetIsEstimated = (params, monthWithYearField) =>{
    let monthYrKey = monthWithYearField + '_E';
    var filterMonths = Object.keys(params.data)
    .filter(key => [monthYrKey].includes(key))
    .reduce((obj, key) => {
      obj[key] = params.data[key];
      return obj;
    }, {});

    var isEstimated = (filterMonths[monthYrKey] == 'true');
    if (isEstimated == true)
      return { backgroundColor: "pink" };
    return { backgroundColor: "white" };
  }

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
    const monthWithYearHeader = monthName + " " + year;
    const monthWithYearField = monthName + year;
    const monthWithYearAEFlagField = monthName + year +'_E';

    // to make sure user entered number only
    const checkNumericValue = (params) => {
      const newValInt = Number(params.newValue.toFixed(2));
      const valueChanged = params.data[monthWithYearField] !== newValInt;
      if (valueChanged) {
        params.data[monthWithYearField] =
          newValInt >= 0
            ? newValInt
            : params.oldValue !== undefined
            ? params.oldValue
            : 0;
      }

      return valueChanged;
    };

    if (currentYear !== year && currentMonth !== 0) continue;

    i == 1
      ? columnDefs.push(
          {
            headerName: monthWithYearHeader,
            field: monthWithYearField,
            editable: true,
            singleClickEdit: true,
            minWidth: 100,
            // valueGetter: (params) => (params.value === undefined || params.value === null) ? 0: Number(params.value),
            valueParser: (params) => Number(params.newValue),
            valueSetter: checkNumericValue,
            cellStyle: params => {
              //return { backgroundColor: "pink" }
              return fnSetIsEstimated(params, monthWithYearField);
            },
            // cellRenderer: params => params.value === "" ? 0 : params.value
          },
          {
            field: monthWithYearAEFlagField,
            hide: true
          },
          {
            headerName: "Editor's Comment",
            field: "comment",
            editable: true,
            singleClickEdit: true,
            minWidth: 300,
          }
        )
      : columnDefs.push({
          headerName: monthWithYearHeader,
          field: monthWithYearField,
          editable: true,
          singleClickEdit: true,
          minWidth: 100,
          // valueGetter: (params) => (params.value === undefined || params.value === null) ? 0: Number(params.value),
          valueParser: (params) => Number(params.newValue),
          valueSetter: checkNumericValue,
          cellStyle: params => {
             return fnSetIsEstimated(params, monthWithYearField);
          },
          // cellRenderer: params => params.value === "" ? 0 : params.value
        });
  }

  const handleSave = () => {
    setRowData(rowData);
  };

  const handleCancel = () => {
    setRowData(getData);
  };

  const onCellValueChanged = (e) => {
    setRowData(
      rowData.map((obj) => {
        if (
          e.data.zone === obj.zone &&
          e.data.country === obj.country &&
          e.data.partner === obj.partner &&
          e.data.model === obj.model &&
          e.data.status === obj.status
        ) {
          return e.data;
        } else return obj;
      })
    );
  };

  const onCellDoubleClicked  = (params)=>{
    const colId = params.column.getId();
    console.log(params.data.Jan23 > 0);
    switch(colId){
      case 'Jan23':
        if(params.data.Jan23 > 0) {
          params.data.Jan23_E = true;
        }
    }
  };

  const onSelectionChanged = useCallback((event) => {
    var rowCount = event.api.getSelectedNodes().length;
    console.log('selection changed, ' + rowCount + ' rows selected');
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu/>
        </Row>
        <Row>
          <BatchInputComponent/>
        </Row>
        <Row className="justify-content-md-right">
          <Col xs={6} md={2} style={{disply:'flex', justifyContent:'right'}}><Button variant="success">Mark estimated</Button>{' '}</Col>
          <Col xs={6} md={2} style={{disply:'flex', justifyContent:'right'}}><Button variant="success">Mark actual</Button>{' '}</Col>
        </Row>
        <br></br>
        <Row className="ag-theme-alpine" style={{ height: 300 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onCellValueChanged={onCellValueChanged}
            pagination={true}
            paginationAutoPageSize={true}
            animateRows={true}
            onCellDoubleClicked={onCellDoubleClicked}
            // onRowSelected = {onRowSelected}
            // getRowId={getRowId}          
          ></AgGridReact>
          </Row>
          <Row style={{ float: "right", marginRight: "10px", marginTop: "20px" }}>
            <Col xs="auto">
              <Button
                variant="primary"
                className="btn-upload"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                variant="primary"
                className="btn-upload"
                onClick={() => {
                  handleSave();
                }}
              >
                Save
              </Button>
            </Col>
            <Col>
              <Button variant="secondary" className="btn-upload">
                Next
              </Button>
            </Col>
          </Row>
      </Container>
    </>
  );
};

export default DataInputComponent;
