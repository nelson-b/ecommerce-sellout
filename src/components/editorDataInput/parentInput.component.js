"use strict";

import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useMemo, useCallback, useRef } from "react";
import { Button, Row, Col, Container, Form, Breadcrumb } from "react-bootstrap";
import { allCalMonths } from "../constant";
import "./parentInput.component.css";
import BatchInputComponent from "./batchInput.component";
import MyMenu from "../menu/menu.component.js";
import "ag-grid-enterprise";
import active from "../../images/active.png";
import closed from "../../images/closed.png";
import Home from "../../images/home-icon.png";
import AlertModal from "../modal/alertModel";
import { useLocation } from "react-router-dom";

function DataInputComponent(props) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const location = useLocation();
  const dataRole = new URLSearchParams(location.search).get("role");

  const handleClearClick = () => {
    window.location.reload();
  };

  const [showShouldUpdModal, setShowShouldUpdModal] = useState(false);

  const [isGridValChg, setGridValChg] = useState(false);

  const handleCloseShouldUpdModal = () => {
    setShowShouldUpdModal(false);
  };

  const shouldUpdateMsg={
    headerLabel: "Warning....",
    variant: "warning",
    header: 'Do you wish to update the existing data!!',
    content: ['Your previous data would be lost if you update it with new data']
  }

  const handleSave = (e) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = String(currentDate.getFullYear()).slice(-2);
    
    if(isGridValChg){
      setShowShouldUpdModal(true);
      return;
    }
    //post data
    postData();
  }

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const successmsg = {
    headerLabel: "Success....",
    variant: "success",
    header: 'Data has been saved successfully!!',
    content: []
  }

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const postData = () => {
    //console.log('api call to save manual data');
    setShowShouldUpdModal(false);
    let payload = [];

    //iterate in the grid
    gridRef.current.api.forEachNode((rowNode, index) => {
      console.log('index', index);
      //api to save data
        console.log('editor inp grid', rowNode.data);
        let monthArray = [];
        //12 months loop 
        allCalMonths.forEach(element => {          
          if(rowNode.data[`${element}_Amount`]>0){
            monthArray.push({
              month: element,
              sellout_local_currency: rowNode.data[`${element}_Amount`],
              trans_type: rowNode.data[`${element}_Estimated`] == true ? 'EST' : 'ACT'
            });
          }
        });
      
        let formatPayload = {
          partner_id: rowNode.data.id,
          partner_name: rowNode.data.Partner_Account_Name,
          country_code: rowNode.data.Country,
          year_val: rowNode.data.Year,
          months: monthArray,
          trans_currency_code: rowNode.data.Currency_Of_Reporting,
          created_by: 'thomas@se.com',
          created_date: new Date(),
          approval_status: 0,
          editor_comment: rowNode.data.comment,
          comments: 'waiting for approver',
          batch_upload_flag: false
        };

        console.log('formatPayload', formatPayload);
        payload.push(formatPayload);
    });

    console.log('payload', payload);
    setShowSuccessModal(true);
  }
  
  const gridRef = useRef(null);

  const getData = [
    {
      id: "Adalbert",
      Zone: "DACH",
      Country: "Germany",
      Partner_Account_Name:  "Adalbert Zajadacz (Part of DEHA) DEU",
      Partner_Code: "Adalbert",
      Model: "E1 - Dist",
      Currency_Of_Reporting : "EUR",
      Status: "Active",
      Year: 2023,
      Jan_Amount: 341.56,
      Feb_Amount: 342.56,
      Mar_Amount: 563.34,
      Apr_Amount: 234.7,
      May_Amount: 983.5,
      Jun_Amount: 634.5,
      Jul_Amount: 0,
      Aug_Amount: 0,
      Sep_Amount: 0,
      Oct_Amount: 0,
      Nov_Amount: 0,
      Dec_Amount: 0,
      Jan_Estimated: "",
      Feb_Estimated: true,
      Mar_Estimated: "",
      Apr_Estimated: "",
      May_Estimated: true,
      Jun_Estimated: "",
      Jul_Estimated: "",
      Aug_Estimated: true,
      Sep_Estimated: true,
      Oct_Estimated: "",
      Nov_Estimated: true,
      Dec_Estimated: "",
      GrandTotal: 0,
    },
    {
      id: "AFB",
      Zone: "DACH",
      Country: "Germany",
      Partner_Account_Name: "AFB eSolutions DEU",
      Partner_Code: "AFB",
      Model: "E1 - Dist",
      Currency_Of_Reporting: "EUR",
      Status: "Active",
      Year: 2023,
      Jan_Amount: 0,
      Feb_Amount: 0,
      Mar_Amount: 0,
      Apr_Amount: 0,
      May_Amount: 0,
      Jun_Amount: 0,
      Jul_Amount: "",
      Aug_Amount: 0,
      Sep_Amount: 0,
      Oct_Amount: 0,
      Nov_Amount: 0,
      Dec_Amount: 0,
      Jan_Estimated: "",
      Feb_Estimated: true,
      Mar_Estimated: "",
      Apr_Estimated: "",
      May_Estimated: true,
      Jun_Estimated: "",
      Jul_Estimated: "",
      Aug_Estimated: true,
      Sep_Estimated: true,
      Oct_Estimated: "",
      Nov_Estimated: true,
      Dec_Estimated: "",
      GrandTotal: 0,
    },
    {
      id: "Ahlsell",
      Zone: "Nordics",
      Country: "Norway",
      Partner_Account_Name: "Ahlsell ELKO NOR",
      Partner_Code: "Ahlsell",
      Model: "E1 - Dist",
      Currency_Of_Reporting: "NOK",
      Status: "Active",
      Year: 2023,
      Jan_Amount: 1705,
      Feb_Amount: 1705,
      Mar_Amount: 1710,
      Apr_Amount: 1710,
      May_Amount: 1715,
      Jun_Amount: 120,
      Jul_Amount: 0,
      Aug_Amount: "",
      Sep_Amount: 0,
      Oct_Amount: 0,
      Nov_Amount: 0,
      Dec_Amount: 0,
      Jan_Estimated: "",
      Feb_Estimated: true,
      Mar_Estimated: "",
      Apr_Estimated: "",
      May_Estimated: true,
      Jun_Estimated: "",
      Jul_Estimated: "",
      Aug_Estimated: true,
      Sep_Estimated: true,
      Oct_Estimated: "",
      Nov_Estimated: true,
      Dec_Estimated: "",
      GrandTotal: 0,
    },
    {
      id: "Ahlsellr",
      Zone: "Nordics",
      Country: "Sweden",
      Partner_Account_Name: "Ahlsell ELKO SWE",
      Partner_Code: "Ahlsell",
      Model: "E2 - Dist",
      Currency_Of_Reporting: "SEK",
      Status: "Closed",
      Year: 2023,
      Jan_Amount: 1515,
      Feb_Amount: 1535,
      Mar_Amount: 4665,
      Apr_Amount: 4665,
      May_Amount: 5655,
      Jun_Amount: 230,
      Jul_Amount: 0,
      Aug_Amount: 0,
      Sep_Amount: 0,
      Oct_Amount: 0,
      Nov_Amount: 0,
      Dec_Amount: 0,
      Jan_Estimated: "",
      Feb_Estimated: true,
      Mar_Estimated: "",
      Apr_Estimated: "",
      May_Estimated: true,
      Jun_Estimated: "",
      Jul_Estimated: "",
      Aug_Estimated: true,
      Sep_Estimated: true,
      Oct_Estimated: "",
      Nov_Estimated: true,
      Dec_Estimated: "",
      GrandTotal: 0,
    },
    {
      id: "Ahlsellr",
      Zone: "Nordics",
      Country: "Sweden",
      Partner_Account_Name: "Ahlsell ELKO SWE",
      Partner_Code: "Ahlsell",
      Model: "E2 - Dist",
      Currency_Of_Reporting: "SEK",
      Status: "Closed",
      Year: 2023,
      Jan_Amount: 1515,
      Feb_Amount: 1535,
      Mar_Amount: 4665,
      Apr_Amount: 4665,
      May_Amount: 5655,
      Jun_Amount: 230,
      Jul_Amount: 0,
      Aug_Amount: 0,
      Sep_Amount: 0,
      Oct_Amount: 0,
      Nov_Amount: 0,
      Dec_Amount: 0,
      Jan_Estimated: "",
      Feb_Estimated: true,
      Mar_Estimated: "",
      Apr_Estimated: "",
      May_Estimated: true,
      Jun_Estimated: "",
      Jul_Estimated: "",
      Aug_Estimated: true,
      Sep_Estimated: true,
      Oct_Estimated: "",
      Nov_Estimated: true,
      Dec_Estimated: "",
      GrandTotal: 0,
    }
  ];
  
  const columnDefs = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "year",
      hide: true,
    },
    {
      headerName: "Zone",
      field: "Zone",
      sortable: true,
      filter: true,
      pinned: "left",
      suppressNavigable: true,
      cellClass: "no-border",
      editable: false,
      width: 100,
    },
    {
      headerName: "Country",
      field: "Country",
      sortable: true,
      filter: true,
      pinned: "left",
      suppressNavigable: true,
      width: 140,
      suppressSizeToFit: true,
      cellClass: "no-border",
      editable: false,
    },
    {
      headerName: "Partner Account Name",
      field: "Partner_Account_Name",
      sortable: true,
      filter: true,
      pinned: "left",
      width: 270,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      field: "Partner_Code",
      hide: true,
    },
    {
      headerName: "Model",
      field: "Model",
      sortable: true,
      filter: true,
      pinned: "left",
      width: 120,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Currency of Reporting",
      field: "Currency_Of_Reporting",
      width: 140,
      editable: false,
      pinned: "left",
      suppressMenu: true
    },
    {
      headerName: "Status",
      field: "Status",
      width: 110,
      pinned: "left",
      editable: false,
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

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1,
      editable: true,
      minWidth: 50,
      suppressSizeToFit: true,
      sortable: true,
      filter: true,
    }),
    []
  );

  //fn set is estimated
  const fnSetIsEstimated = (params, monthField) => {
    let monthYrKey = monthField.replace('_Amount','') + "_Estimated";
    var filterMonths = Object.keys(params.data)
      .filter((key) => [monthYrKey].includes(key))
      .reduce((obj, key) => {
        obj[key] = params.data[key];
        return obj;
      }, {});

    var isEstimated = filterMonths[monthYrKey] == true;
    if (isEstimated == true) return { backgroundColor: "#EEB265" };
    return { backgroundColor: "white", 
    // 'borderColor': '#e2e2e2'
  };
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = String(currentDate.getFullYear()).slice(-2);

  for (let i = 5; i > 0; i--) {
    let date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - (i), 
      1
    );
    
    const monthName = allCalMonths[date.getMonth()];
    const year = String(date.getFullYear()).slice(-2);
    const monthHeader = monthName + ' ' + year;
    const monthField = monthName+'_Amount';
    const monthAEFlagField = monthName + "_Estimated";

    // to make sure user entered number only
    const checkNumericValue = (params) => {
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
            suppressMenu: true,
            valueParser: (params) => Number(params.newValue),
            valueSetter: checkNumericValue,
            cellStyle: (params) => {
              return fnSetIsEstimated(params, monthField);
            },
            enableRangeSelection: true,
          },
          {
            field: monthAEFlagField,
            hide: true,
          },
          {
            headerName: "Editor's Comment",
            field: "comment",
            editable: true,
            singleClickEdit: true,
            minWidth: 300,
            suppressMenu: true
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
          cellStyle: (params) => {
            return fnSetIsEstimated(params, monthField);
          },
          enableRangeSelection: true,
          suppressMenu: true
        });
  }

  // callback tells the grid to use the 'id' attribute for IDs, IDs should always be strings
  const getRowId = useMemo(() => {
    return (params) => {
      return params.data.id;
    };
  }, []);

  const toggleActualEstimate = useCallback((isEstimate) =>
  {
    const selectedCells = gridRef.current.api.getCellRanges();
    const itemsToUpdate = [];
    selectedCells.forEach((currRow) => {
      //row level loop
      currRow.columns.forEach((currCol) => {
        //col level loop
        for (
          let i = currRow.startRow.rowIndex; i < currRow.endRow.rowIndex + 1; i++
        ) {
          gridRef.current.api.forEachNodeAfterFilterAndSort(function (
            rowNodes,
            index
          ) {
            if (index === i) {
              let data = rowNodes.data;
              let monthField = currCol.colId;

              if (monthField != undefined) {
                switch (monthField) {
                  case "Jan_Amount":
                    //console.log("Jan");
                    data.Jan_Estimated = isEstimate;
                    //console.log(data.Jan_Estimated);
                    break;
                  case "Feb_Amount":
                    //console.log("Feb");
                    data.Feb_Estimated = isEstimate;
                    //console.log(data.Feb_Estimated);
                    break;
                  case "Mar_Amount":
                    //console.log("Mar");
                    data.Mar_Estimated = isEstimate;
                    break;
                  case "Apr_Amount":
                    //console.log("Apr");
                    data.Apr_Estimated = isEstimate;
                    break;
                  case "May_Amount":
                    //console.log("May");
                    data.May_Estimated = isEstimate;
                    break;
                  case "Jun_Amount":
                    //console.log("Jun");
                    data.Jun_Estimated = isEstimate;
                    break;
                  case "Jul_Amount":
                    //console.log("Jul");
                    data.Jul_Estimated = isEstimate;
                    break;
                  case "Aug_Amount":
                    //console.log("Aug");
                    data.Aug_Estimated = isEstimate;
                    break;
                  case "Sep_Amount":
                    //console.log("Sep");
                    data.Sep_Estimated = isEstimate;
                    break;
                  case "Oct_Amount":
                    //console.log("Oct");
                    data.Oct_Estimated = isEstimate;
                    break;
                  case "Oct_Amount":
                    //console.log("Oct");
                    data.Nov_Estimated = isEstimate;
                    break;
                  case "Dec_Amount":
                    //console.log("Dec");
                    data.Dec_Estimated = isEstimate;
                    break;
                }
              }
              itemsToUpdate.push(data);
            }
          });
        }
      });
    });
    const res = gridRef.current.api.applyTransaction({ update: itemsToUpdate });
    gridRef.current.api.redrawRows();
  }, []);

  const fnIsEstimated = useCallback((param) => {
    toggleActualEstimate(param.target.checked);
  });
  
  const onGridReady = useCallback((params) => {
    //console.log("onGridReady");
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => getData)
      .then((data) => setRowData(data));
  }, []);

  const handleNavigation = () => {
    navigate(`/dataReview?role=${dataRole}`);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu />
        </Row>
        <Row>
          <Breadcrumb>
            <Breadcrumb.Item href="/editor/home">
              <img
                src={Home}
                alt="home"
                style={{ height: "20px", width: "80px", cursor: "pointer" }}
              />
            </Breadcrumb.Item>
          </Breadcrumb>
          <BatchInputComponent getData={getData} />
        </Row>
        <Row className="justify-content-end">
          <Col md={2} className="estimate-container">
            <Form.Check
              label="Is Estimate"
              id="lblIsEstimate"
              onChange={fnIsEstimated}
            />
          </Col>
        </Row>
        <Row className="ag-theme-alpine" style={{ height: 300 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationAutoPageSize={true}
            animateRows={true}
            getRowId={getRowId}
            enableRangeSelection={true}
            suppressCopySingleCellRanges={true}
            onGridReady={onGridReady}
            suppressMenuHide= {true}
          ></AgGridReact>
        </Row>
        <Row
          className="mb-3"
          style={{ float: "right", marginTop: "20px" }}
        >
          <Col xs="auto">
            <Button
              className="btn-upload cancel-header"
              onClick={() => {
                handleClearClick();
              }}
            >
              Clear
            </Button>
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
            <AlertModal
                show={ showShouldUpdModal }
                handleClose={ handleCloseShouldUpdModal }
                body={ shouldUpdateMsg }
                handleConfirm={ postData }
                button1Label = {'Confirm'}
                button2Label = {'Cancel'}
            />
            <AlertModal
                show={ showSuccessModal }
                handleClose={ handleCloseSuccessModal }
                body={ successmsg }
            />
          </Col>
          <Col>
            <Button
              className="btn-upload save-header"
              onClick={() => {
                handleNavigation(dataRole);
              }}
            >
              Next
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DataInputComponent;