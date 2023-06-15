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
import { allCalMonths } from "../constant.js";
import * as xlsx from "xlsx-js-style";
import { ckeckErrors } from "../utils/index.js";
import { connect } from "react-redux";
import {
  updateBuSplitData,
  retrieveBuSplitData,
} from "../../actions/buSplitAction.js";

function BusinessUnitSplit(props) {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [showShouldUpdModal, setShowShouldUpdModal] = useState(false);
  const [errorBtnDisable, setErrorBtnDisable] = useState(false);
  const [errorData, setErrorData] = useState([]);

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

  const handleSave = useCallback(() => {
    let errorLog = [];
    //iterate in the grid
    gridRef.current.api.forEachNode((rowNode, index) => {
      if (rowNode.data.Total != 100) {
        errorLog = errorLog.concat(
          "Total not 100% at partner id: " + rowNode.data.id
        );
      }
    });

    console.log("errorLog", errorLog);

    if (errorLog.length > 0) {
      setErrorData(["Total should be 100% for all Bussiness units"]);
      setShowErrorModal(true);
      setShowSuccessModal(false);
    } else {
      setErrorData([]);
      setShowErrorModal(false);
      setShowSuccessModal(true);
    }
  }, []);

  const gridRef = useRef(null);

  const buSplitData = [
    {
      partner_id: "Adalbert",
      country_code: "France",
      Partner_Account_Name: "Adalbert Zajadacz (Part of DEHA) DEU",
      model_type: "E1 - Dist",
      quarter: "Q1 2023",
      //ag grid format
      // SP: 10,
      // H_and_D: 20,
      // PP: 30,
      // DE: 20,
      // IA: 20,
      // wrong format
      // attribute_name: "bopp_type",
      // attribute_val: "SP",
      // total: 400.89,
      // attribute_name: "bopp_type",
      // attribute_val: "H&D",
      // total: 400.89,
      // attribute_name: "bopp_type",
      // attribute_val: "PP",
      // total: 400.89,
      // attribute_name: "bopp_type",
      // attribute_val: "DE",
      // total: 400.89,
      // attribute_name: "bopp_type",
      // attribute_val: "IA",
      // total: 400.89,
      attributes: [
        {
          attribute_name: "bopp_type",
          attribute_val: "SP",
          total: 25,
        },
        {
          attribute_name: "bopp_type",
          attribute_val: "H&D",
          total: 25,
        },
        {
          attribute_name: "bopp_type",
          attribute_val: "PP",
          total: 20,
        },
        {
          attribute_name: "bopp_type",
          attribute_val: "DE",
          total: 15,
        },
        {
          attribute_name: "bopp_type",
          attribute_val: "IA",
          total: 5,
        },
      ],
    },
    {
      partner_id: "AFB",
      country_code: "Canada",
      Partner_Account_Name: "AFB eSolutions DEU",
      model_type: "E1 - Dist",
      quarter: "Q1 2023",
      attributes: [
        {
          attribute_name: "bopp_type",
          attribute_val: "SP",
          total: 25,
        },
        {
          attribute_name: "bopp_type",
          attribute_val: "H&D",
          total: 25,
        },
        {
          attribute_name: "bopp_type",
          attribute_val: "PP",
          total: 20,
        },
        {
          attribute_name: "bopp_type",
          attribute_val: "DE",
          total: 15,
        },
        {
          attribute_name: "bopp_type",
          attribute_val: "IA",
          total: 15,
        },
      ],
    },
    {
      partner_id: "Ahlsell",
      country_code: "Norway",
      Partner_Account_Name: "Ahlsell ELKO NOR",
      model_type: "E1 - Dist",
      quarter: "Q1 2023",
      attributes: [
        {
          attribute_name: "bopp_type",
          attribute_val: "SP",
          total: 25,
        },
        {
          attribute_name: "bopp_type",
          attribute_val: "H&D",
          total: 25,
        },
        {
          attribute_name: "bopp_type",
          attribute_val: "PP",
          total: 20,
        },
        {
          attribute_name: "bopp_type",
          attribute_val: "DE",
          total: 15,
        },
        {
          attribute_name: "bopp_type",
          attribute_val: "IA",
          total: 15,
        },
      ],
    },
    {
      partner_id: "Ahlsell",
      country_code: "Finland",
      Partner_Account_Name: "Ahlsell ELKO SWE",
      model_type: "E2 - Dist",
      quarter: "Q2 2023",
      attributes: [
        {
          attribute_name: "bopp_type",
          attribute_val: "SP",
          total: 25,
        },
        {
          attribute_name: "bopp_type",
          attribute_val: "H&D",
          total: 25,
        },
        {
          attribute_name: "bopp_type",
          attribute_val: "PP",
          total: 20,
        },
        {
          attribute_name: "bopp_type",
          attribute_val: "DE",
          total: 15,
        },
        {
          attribute_name: "bopp_type",
          attribute_val: "IA",
          total: 15,
        },
      ],
    },
  ];

  const sumTotal = (params, index) => {
    let totalBu =
      Number(Math.round(params.data.attributes[0].total)) +
      Number(Math.round(params.data.attributes[1].total)) +
      Number(Math.round(params.data.attributes[2].total)) +
      Number(Math.round(params.data.attributes[3].total)) +
      Number(Math.round(params.data.attributes[4].total));

    params.data["Total"] = Number(Math.round(totalBu));
    return params.data.Total;
  };

  const isTot100Per = (params) => {
    if (params.data.Total !== 100) {
      return { backgroundColor: "red" };
    }
    return { backgroundColor: "white", borderColor: "#e2e2e2" };
  };

  const checkNumericValue = (params, field) => {
    console.log("checkNumericValue", params.newValue);
    console.log("Is NAN", isNaN(params.newValue));
    if (isNaN(params.newValue) === true) {
      params.data[field] = Number(0);
      return params.data[field];
    }
    console.log(
      "Number(Math.round(params.newValue))",
      Number(Math.round(params.newValue))
    );
    params.data[field] = Number(Math.round(params.newValue));
    console.log("checkNumericValue", params.data[field]);
    return params.data[field];
  };

  const columnDefs = [
    {
      field: "partner_id",
      hide: true,
    },
    {
      headerName: "Country",
      field: "country_code",
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
      field: "model_type",
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
      field: "attributes",
      minWidth: 70,
      editable: true,
      suppressMenu: true,
      cellStyle: { borderColor: "#e2e2e2" },
      valueFormatter: (params) => {
        return Math.round(params.value) + "%";
      },
      valueSetter: (params) => {
        return checkNumericValue(params, "SP");
      },
      valueGetter: (params) => {
        const attributeSP = params.data.attributes.find(
          (attr) => attr.attribute_val === "SP"
        );
        return attributeSP ? attributeSP.total : null;
      },
    },
    {
      headerName: "H&D",
      field: "attributes",
      minWidth: 70,
      editable: true,
      suppressMenu: true,
      cellStyle: { borderColor: "#e2e2e2" },
      valueFormatter: (params) => {
        return Math.round(params.value) + "%";
      },
      valueSetter: (params) => {
        return checkNumericValue(params, "H&D");
      },
      valueGetter: (params) => {
        const attributeSP = params.data.attributes.find(
          (attr) => attr.attribute_val === "H&D"
        );
        return attributeSP ? attributeSP.total : null;
      },
    },
    {
      headerName: "PP",
      field: "attributes",
      minWidth: 70,
      editable: true,
      suppressMenu: true,
      cellStyle: { borderColor: "#e2e2e2" },
      valueFormatter: (params) => {
        return Math.round(params.value) + "%";
      },
      valueSetter: (params) => {
        return checkNumericValue(params, "PP");
      },
      valueGetter: (params) => {
        const attributeSP = params.data.attributes.find(
          (attr) => attr.attribute_val === "PP"
        );
        return attributeSP ? attributeSP.total : null;
      },
    },
    {
      headerName: "DE",
      field: "attributes",
      minWidth: 70,
      editable: true,
      suppressMenu: true,
      cellStyle: { borderColor: "#e2e2e2" },
      valueFormatter: (params) => {
        return Math.round(params.value) + "%";
      },
      valueSetter: (params) => {
        return checkNumericValue(params, "DE");
      },
      valueGetter: (params) => {
        const attributeSP = params.data.attributes.find(
          (attr) => attr.attribute_val === "DE"
        );
        return attributeSP ? attributeSP.total : null;
      },
    },
    {
      headerName: "IA",
      field: "attributes",
      minWidth: 70,
      editable: true,
      suppressMenu: true,
      cellStyle: { borderColor: "#e2e2e2" },
      valueFormatter: (params) => {
        return Math.round(params.value) + "%";
      },
      valueSetter: (params) => {
        return checkNumericValue(params, "IA");
      },
      valueGetter: (params) => {
        const attributeSP = params.data.attributes.find(
          (attr) => attr.attribute_val === "IA"
        );
        return attributeSP ? attributeSP.total : null;
      },
    },
    {
      headerName: "Total",
      field: "Total",
      minWidth: 80,
      editable: false,
      suppressMenu: true,
      cellStyle: { borderColor: "#e2e2e2" },
      valueFormatter: (params) => {
        return Math.round(params.value) + "%";
      },
      valueGetter: (params) => {
        console.log("xxx", params);
        return sumTotal(params);
      },
      cellStyle: (params) => {
        return isTot100Per(params);
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
    props
      .retrieveBuSplitData()
      .then((data) => {
        setRowData(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const name = "John Bae";

  const successmsg = {
    headerLabel: "Success....",
    variant: "success",
    header: "Data has been saved successfully!!",
    content: [],
  };

  const errormsg = {
    headerLabel: "Error....",
    variant: "danger",
    header: "Please recitify and retry",
    content: errorData,
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
          let result = e.target.result;
          let workbook = xlsx.read(result, { type: "array" });
          let sheetName = workbook.SheetNames[0];
          let worksheet = workbook.Sheets[sheetName];
          let json = xlsx.utils.sheet_to_json(worksheet);
          let errorJson = [];

          buSplitData.forEach((b) => {
            if (
              json.find(
                (j) => j.Partner_Account_Name === b.Partner_Account_Name
              ) == undefined
            ) {
              errorJson.push(`Partner account is not matched with the data`);
            }
          });

          if (!errorJson.length) {
            buSplitData.forEach((b) => {
              json.forEach((j) => {
                if (b.Partner_Account_Name === j.Partner_Account_Name) {
                  if (
                    b.Country === j.Country &&
                    b.partner_id === j.partner_id &&
                    b.Model === j.Model &&
                    b.Quarter === j.Quarter
                  ) {
                    errorJson = [];
                  } else {
                    errorJson.push(
                      `Busplit account details are not matched with the data`
                    );
                  }
                }
              });
            });
          }

          json.forEach((i) => {
            if (i.SP) {
              if (isNaN(i.SP)) {
                errorJson.push(
                  `Bu split accepts only Numeric value in - ${i.Partner_Account_Name} partner`
                );
              }
            }
            if (i.H_and_D) {
              if (isNaN(i.H_and_D)) {
                errorJson.push(
                  `Bu split accepts only Numeric value in - ${i.Partner_Account_Name} partner`
                );
              }
            }
            if (i.PP) {
              if (isNaN(i.PP)) {
                errorJson.push(
                  `Bu split accepts only Numeric value in - ${i.Partner_Account_Name} partner`
                );
              }
            }
            if (i.DE) {
              if (isNaN(i.DE)) {
                errorJson.push(
                  `Bu split accepts only Numeric value in - ${i.Partner_Account_Name} partner`
                );
              }
            }
            if (i.IA) {
              if (isNaN(i.IA)) {
                errorJson.push(
                  `Bu split accepts only Numeric value in - ${i.Partner_Account_Name} partner`
                );
              }
            }
          });

          json.forEach((e) => {
            const splitData = e.SP + e.H_and_D + e.PP + e.DE + e.IA;

            if (splitData > 100) {
              errorJson.push(
                `Total should not be greater than or less than 100% for - ${e.Partner_Account_Name} partner`
              );
            }
          });

          setFileData(json);
          if (errorJson.length > 0) {
            setErrorData(errorJson);
            setShowErrorModal(true);
            setShowSuccessModal(false);
          } else {
            setErrorData([]);
            setShowErrorModal(false);
            setShowSuccessModal(true);
            setSelectedFile(null);
          }
          errorJson = [];
        };
        reader.readAsArrayBuffer(selectedFile.file[0]);
      }
    }
    setSelectedFile(null);
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

      const monthName = allCalMonths[date.getMonth()];
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
    const currentDate = new Date();
    const workbook = xlsx.utils.book_new();
    const sheet1 = xlsx.utils.json_to_sheet(exportedData);
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
    workbook.Sheets["Sell out BuSplit Data"]["K1"].s = {
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
                <Breadcrumb.Item href="/editor/home">
                  <img
                    src={Home}
                    alt="home"
                    style={{ height: "20px", width: "80px", cursor: "pointer" }}
                  />
                </Breadcrumb.Item>
              </Breadcrumb>
            ) : buRole === "approver" ? (
              <Breadcrumb>
                <Breadcrumb.Item href="/approver/home">
                  <img
                    src={Home}
                    alt="home"
                    style={{ height: "20px", width: "80px", cursor: "pointer" }}
                  />
                </Breadcrumb.Item>
              </Breadcrumb>
            ) : buRole === "superApproverUser" ? (
              <Breadcrumb>
                <Breadcrumb.Item href="/superApproverUser/home">
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
              rowData={buSplitData}
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
                    disabled={errorBtnDisable}
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

export default connect(null, { retrieveBuSplitData, updateBuSplitData })(
  BusinessUnitSplit
);
