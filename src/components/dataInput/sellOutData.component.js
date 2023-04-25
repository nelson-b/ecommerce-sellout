import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useMemo } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { month } from "../constant";
import "./sellOutInput.component.css";
import axios from "axios";
import { useForm } from "react-hook-form";

const SellOutDataComponent = () => {
  const getData = [
    {
      zone: "Zone 1",
      country: "Country A",
      partner: "Partner C",
      model: "E1",
      status: "Active",
      currency: "INR",
    },
    {
      zone: "Zone 2",
      country: "Country B",
      partner: "Partner C",
      model: "E2",
      status: "Active",
      currency: "USD",
    },
    {
      zone: "Zone 1",
      country: "Country C",
      partner: "Partner B",
      model: "E2",
      status: "Active",
      currency: "Euro",
    },
    {
      zone: "Zone 2",
      country: "Country B",
      partner: "Partner C",
      model: "E2",
      status: "Inactive",
      currency: "USD",
    },
  ];

  const [rowData, setRowData] = useState(getData);
  // const [gridColumnApi, setGridColumnApi] = useState(null);
  // const [gridApi, setGridApi] = useState(null);

  const columnDefs = [
    {
      headerName: "Zone",
      field: "zone",
      sortable: true,
      filter: true,
      pinned: "left",
      // width: 130,
    },
    {
      headerName: "Country",
      field: "country",
      sortable: true,
      filter: true,
      pinned: "left",
      // width: 130,
    },
    {
      headerName: "Partner",
      field: "partner",
      sortable: true,
      filter: true,
      pinned: "left",
      // width: 150,
    },
    {
      headerName: "Model",
      field: "model",
      sortable: true,
      filter: true,
      pinned: "left",
      // width: 100,
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

  const currentDate = new Date();

  // To change current date
  // currentDate.setFullYear(2023, 7, 1);

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
    const monthWithYear = monthName + " " + year;

    // to make sure user entered number only
    const checkNumericValue = (params) => {
      const newValInt = Number(params.newValue.toFixed(2));
      const valueChanged = params.data[monthWithYear] !== newValInt;

      if (valueChanged) {
        params.data[monthWithYear] =
          // newValInt || newValInt >= 0
          newValInt >= 0
            ? newValInt
            : params.oldValue !== undefined
            ? params.oldValue
            : "";
      }

      return valueChanged;
    };

    // currentMonth === 0 => "Jan", 1=> "Feb" and so on...
    if (currentYear !== year && currentMonth !== 0) continue;

    i == 1
      ? columnDefs.push(
          {
            headerName: monthWithYear,
            field: monthWithYear,
            editable: true,
            singleClickEdit: true,
            minWidth: 100,
            valueParser: (params) => Number(params.newValue),
            valueSetter: checkNumericValue,

            // cellEditor: NumericEditor,
            // valueFormatter: myValueFormatter,
            // valueFormatter: (params) => {
            //   Number(params.data[monthWithYear]).toFixed(2);
            //   // console.log(params.data.field);
            // },
            // type: numericColumn,
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
          headerName: monthWithYear,
          field: monthWithYear,
          editable: true,
          singleClickEdit: true,
          minWidth: 100,
          valueParser: (params) => Number(params.newValue),
          valueSetter: checkNumericValue,
          // cellEditor: NumericEditor,
          // valueFormatter: (params) => {
          //   Number(params.data[monthWithYear]).toFixed(2);
          //   // console.log(params.data.field);
          // },
          // valueFormatter: numberFormatter,
        });
  }

  const handleSave = () => {
    setRowData(rowData);
    console.log("Save Clicked");
    console.log(rowData);
  };

  const handleCancel = () => {
    setRowData(getData);
  };

  // console.log(rowData);

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
  // To be used when API is available
  // const onGridReady = useCallback((params) => {
  //   axios
  //     .get("API_URL")
  //     .then((data) => setRowData(data));
  // }, []);

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: 400, margin: "25px" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onCellValueChanged={onCellValueChanged}
          pagination={true}
          paginationAutoPageSize={true}
          animateRows={true}
          // onGridReady={onGridReady}
        ></AgGridReact>
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
      </div>
    </>
  );
};

export default SellOutDataComponent;
