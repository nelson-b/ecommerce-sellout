"use strict";

import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useMemo, useCallback, useRef } from "react";
import {
  Button,
  Row,
  Col,
  Container,
  Form,
  Breadcrumb,
  Stack,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import MyMenu from "../menu/menu.component.js";
import "ag-grid-enterprise";
import Home from "../../images/home-icon.png";
import { useLocation } from "react-router-dom";
import AlertModel from "../modal/alertModel";
import { AllCalMonths } from "../constant";
import * as xlsx from "xlsx-js-style";

function BusinessUnitSplit() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [fileError, setFileError] = useState([]);
  const [showShouldUpdModal, setShowShouldUpdModal] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    reValidateMode: "onChange",
  });

  const location = useLocation();
  const buRole = new URLSearchParams(location.search).get("role");

  const [rowData, setRowData] = useState(null);

  const handleClearClick = () => {
    window.location.reload();
  };

  const handleSave = (e) => {
    e.preventDefault();
    setRowData(rowData);
  };

  const gridRef = useRef(null);

  const buSplitData = [
    {
      id: "Adalbert",
      Country: "France",
      Partner_Account_Name: "Adalbert Zajadacz (Part of DEHA) DEU",
      Model: "E1 - Dist",
      quarter: "Q1 2023",
      sp: 25,
      h_d: 15,
      pp: 10,
      de: 27,
      ia: 23,
      total: 100,
    },
    {
      id: "AFB",
      Country: "Caneda",
      Partner_Account_Name: "AFB eSolutions DEU",
      Model: "E1 - Dist",
      quarter: "Q1 2023",
      sp: 10,
      h_d: 20,
      pp: 30,
      de: 20,
      ia: 20,
      total: 100,
    },
    {
      id: "Ahlsell",
      Country: "Norway",
      Partner_Account_Name: "Ahlsell ELKO NOR",
      Model: "E1 - Dist",
      quarter: "Q1 2023",
      sp: 15,
      h_d: 30,
      pp: 10,
      de: 30,
      ia: 15,
      total: 100,
    },
    {
      id: "Ahlsell",
      Country: "Finland",
      Partner_Account_Name: "Ahlsell ELKO SWE",
      Model: "E2 - Dist",
      quarter: "Q2 2023",
      sp: 25,
      h_d: 25,
      pp: 25,
      de: 25,
      ia: 25,
      total: 100,
    },
  ];

  const columnDefs = [
    {
      field: "id",
      hide: true,
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
      headerName: "Quarter",
      field: "quarter",
      sortable: true,
      filter: true,
      pinned: "left",
      width: 100,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "SP",
      field: "sp",
      minWidth: 70,
      editable: true,
      suppressMenu: true,
      cellStyle: { "border-color": "#e2e2e2" },
      valueFormatter: (params) => {
        return params.value + "%";
      },
    },
    {
      headerName: "H&D",
      field: "h_d",
      minWidth: 70,
      editable: true,
      suppressMenu: true,
      cellStyle: { "border-color": "#e2e2e2" },
      valueFormatter: (params) => {
        return params.value + "%";
      },
    },
    {
      headerName: "PP",
      field: "pp",
      minWidth: 70,
      editable: true,
      suppressMenu: true,
      cellStyle: { "border-color": "#e2e2e2" },
      valueFormatter: (params) => {
        return params.value + "%";
      },
    },
    {
      headerName: "DE",
      field: "de",
      minWidth: 70,
      editable: true,
      suppressMenu: true,
      cellStyle: { "border-color": "#e2e2e2" },
      valueFormatter: (params) => {
        return params.value + "%";
      },
    },
    {
      headerName: "IA",
      field: "ia",
      minWidth: 70,
      editable: true,
      suppressMenu: true,
      cellStyle: { "border-color": "#e2e2e2" },
      valueFormatter: (params) => {
        return params.value + "%";
      },
    },
    {
      headerName: "Total",
      field: "total",
      minWidth: 80,
      editable: false,
      suppressMenu: true,
      cellStyle: { "border-color": "#e2e2e2" },
      valueFormatter: (params) => {
        return params.value + "%";
      },
    },
  ];

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      resizable: true,
      filter: true,
      sortable: true,
      suppressSizeToFit: true,
      suppressMenuHide: true,
    }),
    []
  );

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => buSplitData)
      .then((data) => setRowData(data));
  }, []);

  const name = "John Bae";

  const successmsg = {
    headerLabel: "Success....",
    variant: "success",
    header: "Data has been saved successfully!!",
    content: ["Navigating you to the Sell out data review page....."],
  };

  const errormsg = {
    headerLabel: "Error....",
    variant: "danger",
    header:
      "There are below errors while processing. Please recitify and retry",
    content: fileError,
  };

  const shouldUpdateMsg = {
    headerLabel: "Warning....",
    variant: "warning",
    header: "Do you wish to update the existing data!!",
    content: [
      "Your previous data would be lost if you update it with new data",
    ],
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleCloseShouldUpdModal = () => {
    setShowShouldUpdModal(false);
  };

  const handleChange = ({ target }) => {
    setSelectedFile(target);
  };

  const handleClick = (event) => {
    setSelectedFile(event.target.files);
  };

  const postBatchData = () => {
    const file = selectedFile.file[0];

    if (
      file.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setError("fileData", {
        type: "filetype",
        message: "Only Excel files are valid for upload.",
      });
      return;
    } else {
      var res = ShouldUpdate();
      res ? setShowShouldUpdModal(true) : setShowShouldUpdModal(false);

      if (selectedFile.file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          console.log("reader onload");
          let result = e.target.result;
          let workbook = xlsx.read(result, { type: "array" });
          let sheetName = workbook.SheetNames[0];
          let worksheet = workbook.Sheets[sheetName];
          let json = xlsx.utils.sheet_to_json(worksheet);
          let errorJson = [];
          console.log("Reading excel: ", json);

          setFileData(json);
          // fileData.forEach((i) => {
          // });

          if (errorJson.length > 0) {
            setFileError(errorJson);
            setShowErrorModal(true);
            setShowSuccessModal(false);
          } else {
            setFileError([]);
            setShowErrorModal(false);
            setShowSuccessModal(true);
            setSelectedFile(null);
          }
          errorJson = [];
        };
        setSelectedFile(null);

        reader.readAsArrayBuffer(selectedFile.file[0]);
      }
    }
  };

  const ShouldUpdate = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = String(currentDate.getFullYear()).slice(-2);

    for (let i = 7; i > 0; i--) {
      let date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - (i - 1),
        1
      );

      const monthName = AllCalMonths[date.getMonth()];
      const year = String(date.getFullYear()).slice(-2);
      const monthField = monthName + "_Amount";

      if (currentYear !== year && currentMonth !== 0) continue;

      let data = buSplitData.filter((item) => item[monthField] != "");

      if (data.length > 0) {
        console.log("show data already exist popup");
        setShowShouldUpdModal(true);
        return;
      }
    }
    postBatchData();
  };

  const onSubmit = (frmData) => {
    setSelectedFile(frmData);
    ShouldUpdate();
  };

  const onError = (error) => {
    console.log("ERROR:::", error);
  };

  const buSplitExcel = async (exportedData) => {
    const tempData = exportedData.map((e) => {
      const { id, ...rest } = e;
      return rest;
    });

    const currentDate = new Date();
    const workbook = xlsx.utils.book_new();
    const sheet1 = xlsx.utils.json_to_sheet(tempData);
    xlsx.utils.book_append_sheet(workbook, sheet1, "Sell out BuSplit Data");

    workbook.Sheets["Sell out BuSplit Data"]["A1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },
      font: { bold: true, color: { rgb: "FFFFFF" } },
    };
    workbook.Sheets["Sell out BuSplit Data"]["B1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },
      font: { bold: true, color: { rgb: "FFFFFF" } },
    };
    workbook.Sheets["Sell out BuSplit Data"]["C1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },
      font: { bold: true, color: { rgb: "FFFFFF" } },
    };
    workbook.Sheets["Sell out BuSplit Data"]["D1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },
      font: { bold: true, color: { rgb: "FFFFFF" } },
    };
    workbook.Sheets["Sell out BuSplit Data"]["E1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },
      font: { bold: true, color: { rgb: "FFFFFF" } },
    };
    workbook.Sheets["Sell out BuSplit Data"]["F1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },
      font: { bold: true, color: { rgb: "FFFFFF" } },
    };
    workbook.Sheets["Sell out BuSplit Data"]["G1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },
      font: { bold: true, color: { rgb: "FFFFFF" } },
    };
    workbook.Sheets["Sell out BuSplit Data"]["H1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },
      font: { bold: true, color: { rgb: "FFFFFF" } },
    };
    workbook.Sheets["Sell out BuSplit Data"]["I1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },
      font: { bold: true, color: { rgb: "FFFFFF" } },
    };
    workbook.Sheets["Sell out BuSplit Data"]["J1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },
      font: { bold: true, color: { rgb: "FFFFFF" } },
    };
    xlsx.writeFile(
      workbook,
      "Sell out BuSplit Data " + currentDate.getFullYear() + ".xlsx"
    );
  };

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu />
        </Row>
        <Row>
          <Stack direction="horizontal" gap={4}>
            {buRole === "editor" ? (
              <Breadcrumb>
                <Breadcrumb.Item href="/editorHome">
                  <img
                    src={Home}
                    alt="home"
                    style={{ height: "20px", width: "80px", cursor: "pointer" }}
                  />
                </Breadcrumb.Item>
              </Breadcrumb>
            ) : buRole === "approver" ? (
              <Breadcrumb>
                <Breadcrumb.Item href="/approverHome">
                  <img
                    src={Home}
                    alt="home"
                    style={{ height: "20px", width: "80px", cursor: "pointer" }}
                  />
                </Breadcrumb.Item>
              </Breadcrumb>
            ) : buRole === "superApproverUser" ? (
              <Breadcrumb>
                <Breadcrumb.Item href="/superUserHome">
                  <img
                    src={Home}
                    alt="home"
                    style={{ height: "20px", width: "80px", cursor: "pointer" }}
                  />
                </Breadcrumb.Item>
              </Breadcrumb>
            ) : (
              <div></div>
            )}
            <div className="mt-0 ms-auto">
              <Row className="edited-header">Edited By: {name}</Row>
              <Col className="edited-header">
                LAST UPDATE: 16/05/2022 14:26 UTC{" "}
              </Col>
            </div>
          </Stack>
        </Row>

        <div className="sell-out-header">Business Unit Split</div>
        <div className="sell-out-input-upload">
          <Row>
            <Col xs="auto" className="align-item-center file-upload-container">
              <Form.Label>BATCH UPLOAD</Form.Label>
            </Col>
            <Col xs="auto">
              <Form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                <Row>
                  <Col xs="auto">
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="file"
                        accept=".xlsx,.xls"
                        // value={selectedFile}
                        onClick={handleClick}
                        onChange={handleChange}
                        {...register("file", {
                          required: "Excel file is required",
                        })}
                      />
                      {errors.file && (
                        <Form.Text className="text-danger">
                          {errors.file.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xs="auto">
                    <Button className=" btn-upload save-header" type="submit">
                      Upload
                    </Button>
                    <AlertModel
                      show={showSuccessModal}
                      handleClose={handleCloseSuccessModal}
                      body={successmsg}
                    />
                    <AlertModel
                      show={showErrorModal}
                      handleClose={handleCloseErrorModal}
                      body={errormsg}
                    />
                    <AlertModel
                      show={showShouldUpdModal}
                      handleClose={handleCloseShouldUpdModal}
                      body={shouldUpdateMsg}
                      handleConfirm={postBatchData}
                      button1Label={"Confirm"}
                      button2Label={"Cancel"}
                    />
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col xs="auto">
              <Button
                size="lg"
                className="edit-header"
                onClick={(e) => buSplitExcel(buSplitData)}
              >
                Download Template
              </Button>
            </Col>
          </Row>
        </div>

        <Row className="overview-container">
          <Row
            className="ag-theme-alpine ag-grid-table"
            style={{ height: 280, width: 1110, marginTop: "10px" }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows={true}
              enableRangeSelection={true}
              suppressCopySingleCellRanges={true}
              onGridReady={onGridReady}
              suppressMenuHide={true}
            ></AgGridReact>
            <div>
              <Row
                className="mb-3"
                style={{ justifyContent: "end", marginTop: "20px" }}
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
                    className="btn-upload save-header"
                    onClick={() => {
                      handleSave();
                    }}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            </div>
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default BusinessUnitSplit;
