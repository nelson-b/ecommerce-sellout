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
      Jan_E: true,
      Feb_E: false,
      Mar_E: false,
      Apr_E: true,
      May_E: true,
      Jan: 23,
      Feb: 56,
      Mar: 67,
      Apr: 46,
      May: 64
    },
    {
      id: "Partner B",
      zone: "Zone 2",
      country: "Country B",
      partner: "Partner B",
      model: "E2",
      status: "Active",
      currency: "USD",
      Jan_E: true,
      Feb_E: false,
      Mar_E: false,
      Apr_E: true,
      May_E: true,
      Jan: 23,
      Feb: 56,
      Mar: 67,
      Apr: 46,
      May: 64
    },
    {
      id: "Partner C",
      zone: "Zone 1",
      country: "Country C",
      partner: "Partner C",
      model: "E2",
      status: "Active",
      currency: "Euro",
      Jan_E: true,
      Feb_E: false,
      Mar_E: false,
      Apr_E: true,
      May_E: true,
      Jan: 23,
      Feb: 56,
      Mar: 67,
      Apr: 46,
      May: 64
    },
    {
      id: "Partner D",
      zone: "Zone 2",
      country: "Country B",
      partner: "Partner D",
      model: "E2",
      status: "Inactive",
      currency: "USD",
      Jan_E: true,
      Feb_E: false,
      Mar_E: false,
      Apr_E: true,
      May_E: true,
      Jan: 23,
      Feb: 56,
      Mar: 67,
      Apr: 46,
      May: 64
    },
  ];

  const [rowData, setRowData] = useState(null);

  const columnDefs = [
    {
      field: "id",
      hide: true
    },
    {
      field: "year",
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

    var isEstimated = (filterMonths[monthYrKey] == true);
    if (isEstimated == true)
      return { backgroundColor: "#EEB265" };
    return { backgroundColor: "white" };
  }

  const onCellDoubleClicked  = useCallback((params, monthField) => {
    console.log('onCellDoubleClicked',params);
    if(params.data){
    // let monthYrCol = monthWithYearField + '_E';
    // console.log('monthYrCol', monthYrCol);
    console.log('params.data.partner', params.data.partner);
    console.log('gridRef', gridRef);
    var rowNode = gridRef.current.api.getRowNode(params.data.partner);
    
    const itemsToUpdate = [];
    gridRef.current.api.forEachNodeAfterFilterAndSort(function (
      rowNode,
      index
    ) 
    {
        console.log('index', index);
        const data = rowNode.data;
        console.log('selectedNodes.data',rowNode.data)

        // const currentDate = new Date();
        // const currentYear = currentDate.getUTCFullYear();

        switch(monthField){
          case ('Jan'):
            data.Jan_E = !data.Jan_E
            break;
          case ('Feb'):
            data.Feb_E = !data.Feb_E
            break;
          case ('Mar'):
            data.Mar_E = !data.Mar_E
            break;
          case ('Apr'):
            data.Apr_E = !data.Apr_E
            break;
          case ('May'):
            data.May_E = !data.May_E
            break;
          case ('Jun'):
            data.Jun_E = !data.Jun_E
            break;
          case ('Jul'):
            data.Jul_E = !data.Jul_E
            break;
          case ('Aug'):
            data.Aug_E = !data.Aug_E
            break;
          case ('Sep'):
            data.Sep_E = !data.Sep_E
            break;
          case ('Oct'):
            data.Oct_E = !data.Oct_E
            break;
          case ('Nov' ):
            data.Nov_E = !data.Nov_E
            break;
          case ('Dec' ):
            data.Dec_E = !data.Dec_E
            break;
        }
        // var filterMonths = Object.keys(rowNode.data)
        // .filter(key => [monthYrCol].includes(key))
        // .reduce((obj, key) => {
        //   obj[key] = params.data[key];
        //   return obj;
        // }, {});

        // console.log('filterMonths', filterMonths);

        // console.log('prev data.monthYrCol', data.monthYrCol);
        // data.monthYrCol = !data.monthYrCol;
        // console.log('curr data.monthYrCol', data.monthYrCol);
        itemsToUpdate.push(data);
    });
    const res = gridRef.current.api.applyTransaction({ update: itemsToUpdate });
    console.log('itemsToUpdate', res);

    // var rowNode = params.node;
    // console.log('rowNode prev', rowNode);
    // rowNode.setDataValue(monthYrCol, true);
    // console.log('rowNode curr', rowNode);
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
    const monthWithYearHeader = monthName;
    const monthWithYearField = monthName;
    const monthWithYearAEFlagField = monthName + '_E';

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
    const itemsToUpdate = [];
    gridRef.current.api.forEachNodeAfterFilterAndSort(function (
      selectedNodes,
      index
    ) 
    {
        console.log('index', index);
        const data = selectedNodes.data;
        console.log('selectedNodes.data',selectedNodes.data)
        data.Jan23_E = true;
        itemsToUpdate.push(data);
    });
    const res = gridRef.current.api.applyTransaction({ update: itemsToUpdate });
    console.log('itemsToUpdate', res);
  });
  
  const markActual = () =>
  {
    const selectedCells = gridRef.current.api.getCellRanges();
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    console.log('get selected cells', selectedCells);
    console.log('get selected nodes', selectedNodes);
    const itemsToUpdate = [];
    gridRef.current.api.forEachNodeAfterFilterAndSort(function (
      selectedNodes,
      index
    ) 
    {
        console.log('index', index);
        const data = selectedNodes.data;
        console.log('selectedNodes.data',selectedNodes.data)
        data.Jan23_E = false;
        itemsToUpdate.push(data);
    });
    const res = gridRef.current.api.applyTransaction({ update: itemsToUpdate });
    console.log('itemsToUpdate', res);
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
            pagination={true}
            paginationAutoPageSize={true}
            animateRows={true}
            rowSelection={'multiple'}
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
                onClick={handleCancel}>
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
