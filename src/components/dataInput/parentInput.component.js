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
// import "ag-grid-community";
import 'ag-grid-enterprise';


function DataInputComponent (){
  const gridRef = useRef(null);
  const getData = [
    {
      id: "Partner A",
      zone: "Zone 1",
      country: "Country A",
      partner: "Partner A",
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
      id: "Partner B",
      zone: "Zone 2",
      country: "Country B",
      partner: "Partner B",
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
      id: "Partner C",
      zone: "Zone 1",
      country: "Country C",
      partner: "Partner C",
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
      id: "Partner D",
      zone: "Zone 2",
      country: "Country B",
      partner: "Partner D",
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

  const [rowData, setRowData] = useState(null);

  const columnDefs = [
    {
      field: "id",
      hide: true
    },
    {
      headerName: "Zone",
      field: "zone",
      sortable: true,
      filter: true,
      pinned: "left",
      suppressNavigable: true,
      cellClass: 'no-border'
    },
    {
      headerName: "Country",
      field: "country",
      sortable: true,
      filter: true,
      pinned: "left",
      suppressNavigable: true,
      cellClass: 'no-border'
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
      minWidth:50,
      suppressSizeToFit:true,
      editable: true,
      sortable: true,
      filter: true
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

  const onCellDoubleClicked  = useCallback((params, monthWithYearField) => {
    console.log('onCellDoubleClicked',params);
    if(params.data){
    let monthYrCol = monthWithYearField + '_E';
    console.log('monthYrCol', monthYrCol);
    console.log('params.data.partner', params.data.partner);
    console.log('gridRef', gridRef);
    var rowNode = gridRef.current.api.getRowNode(params.data.partner);
    // var rowNode = params.node;
    console.log('rowNode prev', rowNode);
    rowNode.setDataValue(monthYrCol, true);
    console.log('rowNode curr', rowNode);
  }});

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
      console.log('checkNumericValue');
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
            valueParser: (params) => Number(params.newValue),
            valueSetter: checkNumericValue,
            cellStyle: params => {
              return fnSetIsEstimated(params, monthWithYearField);
            },
            enableRangeSelection: true,
            onCellDoubleClicked:params => { onCellDoubleClicked(params, monthWithYearField)}
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
          valueParser: (params) => Number(params.newValue),
          valueSetter: checkNumericValue,
          cellStyle: params => {
             return fnSetIsEstimated(params, monthWithYearField);
          },
          enableRangeSelection: true,
          onCellDoubleClicked:params => { onCellDoubleClicked(params, monthWithYearField)}
        });
  }

  const handleSave = () => {
    setRowData(rowData);
  };

  const handleCancel = () => {
    setRowData(getData);
  };

  // const onCellValueChanged = (e) => {
  //   setRowData(
  //     rowData.map((obj) => {
  //       if (
  //         e.data.zone === obj.zone &&
  //         e.data.country === obj.country &&
  //         e.data.partner === obj.partner &&
  //         e.data.model === obj.model &&
  //         e.data.status === obj.status
  //       ) {
  //         return e.data;
  //       } else return obj;
  //     })
  //   );
  // };

  // callback tells the grid to use the 'id' attribute for IDs, IDs should always be strings
  const getRowId = useMemo(() => {
    return (params) => {
      return params.data.id;
    };
  }, []);

  const markEstimated = useCallback((newGroup) => {
    const selectedCells = gridRef.current.api.getCellRanges();
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    console.log('get selected cells', selectedCells);
    console.log('get selected nodes', selectedNodes);
  });
  
  const markActual = () =>
  {
    
  }

  const onGridReady = useCallback((params) => {
    console.log('onGridReady')
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => getData)
      .then((data) => setRowData(data));
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
        <Row className="justify-content-end">
          <Col md={2}><Button className="btn-md" onClick={()=>markEstimated()} variant="success">Mark estimated</Button>{' '}</Col>
          <Col md={2}><Button className="btn-md" onClick={()=>markActual()} variant="success">Mark actual</Button>{' '}</Col>
        </Row>
        <br></br>
        <Row className="ag-theme-alpine" style={{ height: 300 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            // onCellValueChanged={onCellValueChanged}
            pagination={true}
            paginationAutoPageSize={true}
            animateRows={true}
            // onCellDoubleClicked={onCellDoubleClicked}
            rowSelection={'multiple'}
            // onRowSelected = {onRowSelected}
            getRowId={getRowId}  
            enableRangeSelection={true}
            onGridReady={onGridReady}
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
