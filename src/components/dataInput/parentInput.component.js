"use strict";

import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useMemo, useCallback, useRef } from "react";
import { Button, Row, Col, Container, Form, Breadcrumb } from "react-bootstrap";
import { month } from "../constant";
import "./parentInput.component.css";
import BatchInputComponent from "./batchInput.component";
import MyMenu from "../menu/menu.component.js";
import CancelModal from "../modal/cancelModal";
import "ag-grid-enterprise";
import active from "../../images/active.png";
import closed from "../../images/closed.png";
import Home from "../../images/home-icon.png";

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
      PartnerAccountName: "Partner A",
      model: "E1",
      status: "Active",
      CurrencyOfReporting : "INR",
      Jan_Estimated: "",
      Jan: 23,
      Feb_Estimated: true,
      Feb: 56,
      Mar_Estimated: "",
      Mar: 67,
      Apr_Estimated: "",
      Apr: 46,
      May_Estimated: true,
      May: 39,
      Jun_Estimated: "",
      Jun: "",
      Jul_Estimated: "",
      Jul: "",
      Aug_Estimated: true,
      Aug: "",
      Sep_Estimated: true,
      Sep: "",
      Oct_Estimated: "",
      Oct: "",
      Nov_Estimated: true,
      Nov: "",
      Dec_Estimated: "",
      Dec: "",
      GrandTotal: 106.2,
    },
    {
      id: "Partner B",
      zone: "Zone 2",
      country: "Country B",
      PartnerAccountName: "Partner B",
      model: "E2",
      status: "Close",
      CurrencyOfReporting: "USD",
      Jan_Estimated: true,
      Jan: 23,
      Feb_Estimated: "",
      Feb: 56,
      Mar_Estimated: "",
      Mar: 67,
      Apr_Estimated: true,
      Apr: 46,
      May_Estimated: "",
      May: 79,
      Jun_Estimated: true,
      Jun: "",
      Jul_Estimated: "",
      Jul: "",
      Aug_Estimated: true,
      Aug: "",
      Sep_Estimated: "",
      Sep: "",
      Oct_Estimated: "",
      Oct: "",
      Nov_Estimated: true,
      Nov: "",
      Dec_Estimated: "true",
      Dec: "",
      GrandTotal: 106.2,
    },
    {
      id: "Partner C",
      zone: "Zone 1",
      country: "Country C",
      PartnerAccountName: "Partner C",
      model: "E2",
      status: "Active",
      CurrencyOfReporting: "EURO",
      Jan_Estimated: "",
      Jan: 23,
      Feb_Estimated: "",
      Feb: 56,
      Mar_Estimated: "",
      Mar: 67,
      Apr_Estimated: true,
      Apr: 46,
      May_Estimated: "",
      May: 45,
      Jun_Estimated: "",
      Jun: "",
      Jul_Estimated: true,
      Jul: "",
      Aug_Estimated: true,
      Aug: 67,
      Sep_Estimated: "",
      Sep: "",
      Oct_Estimated: true,
      Oct: "",
      Nov_Estimated: "",
      Nov: "",
      Dec_Estimated: "",
      Dec: "",
      GrandTotal: 106.2,
    },
    {
      id: "Partner D",
      zone: "Zone 2",
      country: "Country B",
      PartnerAccountName: "Partner D",
      model: "E2",
      status: "Close",
      CurrencyOfReporting: "USD",
      Jan_Estimated: true,
      Jan: 23,
      Feb_Estimated: "",
      Feb: 56,
      Mar_Estimated: "",
      Mar: 67,
      Apr_Estimated: true,
      Apr: 46,
      May_Estimated: "",
      May: 56,
      Jun_Estimated: true,
      Jun: "",
      Jul_Estimated: "",
      Jul: "",
      Aug_Estimated: "",
      Aug: "",
      Sep_Estimated: true,
      Sep: "",
      Oct_Estimated: "",
      Oct: "",
      Nov_Estimated: true,
      Nov: "",
      Dec_Estimated: "",
      Dec: "",
      GrandTotal: 106.2,
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
      hide: true,
    },
    {
      headerName: "Zone",
      field: "zone",
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
      field: "country",
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
      field: "PartnerAccountName",
      sortable: true,
      filter: true,
      pinned: "left",
      width: 140,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Model",
      field: "model",
      sortable: true,
      filter: true,
      pinned: "left",
      width: 120,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Currency of Reporting",
      field: "CurrencyOfReporting",
      width: 100,
      editable: false,
      pinned: "left",
    },
    {
      headerName: "Status",
      field: "status",
      width: 110,
      pinned: "left",
      editable: false,
      cellRenderer: (params) => {
        const Status = params.value;
        return (
          <div>
            {Status === "Active" && (
              <img src={active} alt="active" style={{ width: "80px" }} />
            )}
            {Status === "Close" && (
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
    let monthYrKey = monthField + "_Estimated";
    var filterMonths = Object.keys(params.data)
      .filter((key) => [monthYrKey].includes(key))
      .reduce((obj, key) => {
        obj[key] = params.data[key];
        return obj;
      }, {});

    var isEstimated = filterMonths[monthYrKey] == true;
    if (isEstimated == true) return { backgroundColor: "#EEB265" };
    return { backgroundColor: "white" };
  };

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
    const monthField = monthName;
    const monthAEFlagField = monthName + "_Estimated";

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
            cellStyle: (params) => {
              return fnSetIsEstimated(params, monthField);
            },
            enableRangeSelection: true,
            // onCellDoubleClicked: params => { toggleAEDoubleClicked(params, monthField) }
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
    selectedCells.forEach((currRow, currIndex) => {
      //row level loop
      currRow.columns.forEach((currCol, currIndex) => {
        //col level loop
        for (
          let i = currRow.startRow.rowIndex;
          i < currRow.endRow.rowIndex + 1;
          i++
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
                  case "Jan":
                    console.log("Jan");
                    data.Jan_Estimated = isEstimate;
                    console.log(data.Jan_Estimated);
                    break;
                  case "Feb":
                    console.log("Feb");
                    data.Feb_Estimated = isEstimate;
                    console.log(data.Feb_Estimated);
                    break;
                  case "Mar":
                    console.log("Mar");
                    data.Mar_Estimated = isEstimate;
                    break;
                  case "Apr":
                    console.log("Apr");
                    data.Apr_Estimated = isEstimate;
                    break;
                  case "May":
                    console.log("May");
                    data.May_Estimated = isEstimate;
                    break;
                  case "Jun":
                    console.log("Jun");
                    data.Jun_Estimated = isEstimate;
                    break;
                  case "Jul":
                    console.log("Jul");
                    data.Jul_Estimated = isEstimate;
                    break;
                  case "Aug":
                    console.log("Aug");
                    data.Aug_Estimated = isEstimate;
                    break;
                  case "Sep":
                    console.log("Sep");
                    data.Sep_Estimated = isEstimate;
                    break;
                  case "Oct":
                    console.log("Oct");
                    data.Oct_Estimated = isEstimate;
                    break;
                  case "Oct":
                    console.log("Oct");
                    data.Nov_Estimated = isEstimate;
                    break;
                  case "Dec":
                    console.log("Dec");
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
          <Breadcrumb>
            <Breadcrumb.Item href="/">
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
            // rowSelection={'multiple'}
            getRowId={getRowId}
            enableRangeSelection={true}
            suppressCopySingleCellRanges={true}
            onGridReady={onGridReady}
          ></AgGridReact>
        </Row>
        <Row
          className="mb-3"
          style={{ float: "right", marginRight: "10px", marginTop: "10px" }}
        >
          <Col xs="auto">
            <Button
              className="btn-upload cancel-header"
              onClick={handleShowModal}
            >
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
            <Button
              className="btn-upload save-header"
              onClick={() => {
                handleNavigation();
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
