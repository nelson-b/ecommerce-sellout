"use strict";

import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useMemo, useCallback, useRef } from "react";
import { Button, Row, Col, Container, Form } from "react-bootstrap";
import { month } from "../constant";
import "./parentInput.component.css";
import BatchInputComponent from "./batchInput.component";
import MyMenu from "../menu/menu.component.js";
import CancelModal from "../modal/cancelModal";
// import "ag-grid-community";
import "ag-grid-enterprise";
import active from "../../images/active.png";
import closed from "../../images/closed.png";

function DataInputComponent() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
      May23: 64,
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
      May23: 64,
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
      May23: 64,
    },
    {
      id: "Partner D",
      zone: "Zone 2",
      country: "Country B",
      partner: "Partner D",
      model: "E2",
      status: "Close",
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
      May23: 64,
    },
  ];

  const [rowData, setRowData] = useState(null);

  const columnDefs = [
    {
      field: "id",
      hide: true,
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
      cellClass: "no-border",
      editable: false
    },
    {
      headerName: "Country",
      field: "country",
      sortable: true,
      filter: true,
      pinned: "left",
      suppressNavigable: true,
      width: 140,
      suppressSizeToFit: true,
      cellClass: 'no-border',
      editable: false
    },
    {
      headerName: "Partner",
      field: "partner",
      sortable: true,
      filter: true,
      pinned: "left",
      width: 140,
      suppressSizeToFit: true,
      editable: false
    },
    {
      headerName: "Model",
      field: "model",
      sortable: true,
      filter: true,
      pinned: "left",
      width: 120,
      suppressSizeToFit: true,
      editable: false
    },
    {
      headerName: "Status",
      field: "status",
      minWidth: 100,
      editable: false,
      cellRenderer: (params) => {
        const Status = params.value;
        return (
          <div>
            {Status === 'Active' && <img src={active} alt="active" style= {{width: "80px"}} />}
            {Status === 'Close' && <img src={closed} alt="closed" style= {{width: "80px"}}/>}
          </div>
        );
      },
    },
    {
      headerName: "Currency of Reporting",
      field: "currency",
      minWidth: 100,
      editable: false
    },
  ];

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      flex: 1,
      editable: true,
      minWidth:50,
      suppressSizeToFit:true,
      sortable: true,
      filter: true,
    }),
    []
  );

  //fn set is estimated
  const fnSetIsEstimated = (params, monthField) =>{
    let monthYrKey = monthField + '_E';
    var filterMonths = Object.keys(params.data)
      .filter((key) => [monthYrKey].includes(key))
      .reduce((obj, key) => {
        obj[key] = params.data[key];
        return obj;
      }, {});

    var isEstimated = (filterMonths[monthYrKey] == true);
    if (isEstimated == true)
      return { backgroundColor: "#EEB265" };
    return { backgroundColor: "white" };
  };

  // const toggleAEDoubleClicked  = useCallback((params, monthField) => {
  //   console.log('onCellDoubleClicked',params);
  //   if(params.data){
  //     console.log('params.data.partner', params.data.partner);
  //     console.log('gridRef', gridRef);
  //     var rowNode = gridRef.current.api.getRowNode(params.data.partner);
    
  //     const itemsToUpdate = [];
  //     gridRef.current.api.forEachNodeAfterFilterAndSort(function (
  //       rowNode,
  //       index
  //     ) 
  //     {
  //         console.log('index', index);
  //         const data = rowNode.data;
  //         console.log('selectedNodes.data',rowNode.data)

  //         switch(monthField){
  //           case ('Jan'):
  //             data.Jan_E = !data.Jan_E
  //             break;
  //           case ('Feb'):
  //             data.Feb_E = !data.Feb_E
  //             break;
  //           case ('Mar'):
  //             data.Mar_E = !data.Mar_E
  //             break;
  //           case ('Apr'):
  //             data.Apr_E = !data.Apr_E
  //             break;
  //           case ('May'):
  //             data.May_E = !data.May_E
  //             break;
  //           case ('Jun'):
  //             data.Jun_E = !data.Jun_E
  //             break;
  //           case ('Jul'):
  //             data.Jul_E = !data.Jul_E
  //             break;
  //           case ('Aug'):
  //             data.Aug_E = !data.Aug_E
  //             break;
  //           case ('Sep'):
  //             data.Sep_E = !data.Sep_E
  //             break;
  //           case ('Oct'):
  //             data.Oct_E = !data.Oct_E
  //             break;
  //           case ('Nov' ):
  //             data.Nov_E = !data.Nov_E
  //             break;
  //           case ('Dec' ):
  //             data.Dec_E = !data.Dec_E
  //             break;
  //         }
  //         itemsToUpdate.push(data);
  //   });
  //   const res = gridRef.current.api.applyTransaction({ update: itemsToUpdate });
  //   console.log('itemsToUpdate', res);
  // }});

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
    const monthHeader = monthName + year;
    const monthField = monthName + year;
    const monthAEFlagField = monthName + '_E';

    // to make sure user entered number only
    const checkNumericValue = (params) => {
      console.log("checkNumericValue");
      const newValInt = Number(params.newValue.toFixed(2));
      const valueChanged = params.data[monthField] !== newValInt;
      if (valueChanged) {
        params.data[monthField] =
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
            headerName: monthHeader,
            field: monthField,
            editable: true,
            singleClickEdit: true,
            minWidth: 100,
            valueParser: (params) => Number(params.newValue),
            valueSetter: checkNumericValue,
            cellStyle: params => {
              return fnSetIsEstimated(params, monthField);
            },
            enableRangeSelection: true,
            // onCellDoubleClicked: params => { toggleAEDoubleClicked(params, monthField) }
          },
          {
            field: monthAEFlagField,
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
          headerName: monthHeader,
          field: monthField,
          editable: true,
          singleClickEdit: true,
          minWidth: 100,
          valueParser: (params) => Number(params.newValue),
          valueSetter: checkNumericValue,
          cellStyle: params => {
             return fnSetIsEstimated(params, monthField);
          },
          enableRangeSelection: true,
          // onCellDoubleClicked:params => { toggleAEDoubleClicked(params, monthField)}
        });
  }

  const handleSave = (e) => {
    e.preventDefault();
    setRowData(rowData);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setRowData(getData);
  };

  // callback tells the grid to use the 'id' attribute for IDs, IDs should always be strings
  const getRowId = useMemo(() => {
    return (params) => {
      return params.data.id;
    };
  }, []);

  const toggleActualEstimate = useCallback((isEstimate) => {
    const selectedCells = gridRef.current.api.getCellRanges();
    const itemsToUpdate = [];
    selectedCells.forEach((currRow, currIndex)=>{
      //row level loop
      currRow.columns.forEach((currCol, currIndex)=>{
        //col level loop
        for(let i = currRow.startRow.rowIndex; i < currRow.endRow.rowIndex+1; i++){
          gridRef.current.api.forEachNodeAfterFilterAndSort(function (
            rowNodes,
            index
          ) 
          {
            if(index===i){
              let data = rowNodes.data;
              let monthField = currCol.colId;

              if(monthField != undefined){
                switch(monthField){
                  case ('Jan'):
                    console.log('Jan');
                    data.Jan_E = isEstimate;
                    console.log(data.Jan_E);
                    break;
                  case ('Feb'):
                    console.log('Feb');
                    data.Feb_E = isEstimate;
                    console.log(data.Feb_E);
                    break;
                  case ('Mar'):
                    console.log('Mar');
                    data.Mar_E = isEstimate;
                    break;
                  case ('Apr'):
                    console.log('Apr');
                    data.Apr_E = isEstimate;
                    break;
                  case ('May'):
                    console.log('May');
                    data.May_E = isEstimate;
                    break;
                  case ('Jun'):
                    console.log('Jun');
                    data.Jun_E = isEstimate;
                    break;
                  case ('Jul'):
                    console.log('Jul');
                    data.Jul_E = isEstimate;
                    break;
                  case ('Aug'):
                    console.log('Aug');
                    data.Aug_E = isEstimate;
                    break;
                  case ('Sep'):
                    console.log('Sep');
                    data.Sep_E = isEstimate;
                    break;
                  case ('Oct'):
                    console.log('Oct');
                    data.Oct_E = isEstimate;
                    break;
                  case ('Oct'):
                    console.log('Oct');
                    data.Nov_E = isEstimate;
                    break;
                  case ('Dec'):
                    console.log('Dec');
                    data.Dec_E = isEstimate;
                    break;
                }              
              }              
              itemsToUpdate.push(data);
            }
          });
        };
      });
    });
    const res = gridRef.current.api.applyTransaction({ update: itemsToUpdate });
    gridRef.current.api.redrawRows();
  }, []);

  const fnIsEstimated = useCallback((param) => {
    toggleActualEstimate(param.target.checked);
  });

  const onGridReady = useCallback((params) => {
    console.log("onGridReady");
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => getData)
      .then((data) => setRowData(data));
  }, []);

  const handleNavigation = () => {
    navigate("/dataReview");
  };

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu />
        </Row>
        <Row>
          <BatchInputComponent />
        </Row>
        <Row className="justify-content-end">
          <Col md={2}>
            <Form.Check
              label='Is Estimated'
              id='lblIsEstimate' 
              onChange={fnIsEstimated}/>
          </Col>
          {/* <Col md={2}><Button className="btn-md" onClick={()=>toggleActualEstimate(true)} variant="success">Mark estimated</Button>{' '}</Col>
          <Col md={2}><Button className="btn-md" onClick={()=>toggleActualEstimate(false)} variant="success">Mark actual</Button>{' '}</Col> */}
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
            suppressCopySingleCellRanges={true}
            onGridReady={onGridReady}
          ></AgGridReact>
          </Row>
          <Row style={{ float: "right", marginRight: "10px", marginTop: "20px" }}>
            <Col xs="auto">
              <Button
                className="btn-upload cancel-header"
                onClick={handleShowModal}>
                Cancel
              </Button>
              <CancelModal
                show={showModal}
                handleClose={handleCloseModal}
                handleConfirm={handleCloseModal}
                body={"Are you sure you want to cancel the input."}
                button1={"Cancel"}
                button2={"Confirm"}
              />
            </Col>
            <Col xs="auto">
              <Button
                className="btn-upload edit-header"
                onClick={() => {
                  handleSave();
                }}
              >
                Save
              </Button>
            </Col>
            <Col>
              <Button className="btn-upload save-header"
               onClick={() => {
                  handleNavigation();
                }}>
                   Next
              </Button>
            </Col>
          </Row>
      </Container>
    </>
  );
}

export default DataInputComponent;
