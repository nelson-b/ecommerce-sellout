"use strict";

import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";

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
import { allCalMonths, roles, user_login_info } from "../constant.js";
import * as xlsx from "xlsx-js-style";
import { ckeckErrors } from "../utils/index.js";
import { connect } from "react-redux";
import {
  updateBuSplitData,
  retrieveBuSplitData,
  retrivePartnerAccountName,
} from "../../actions/buSplitAction.js";

function BusinessUnitSplit(props) {
  const location = useLocation();
  const navigate = useNavigate();

  //sso login func
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setuserRole] = useState('');
    
  useEffect(() => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    //if user not login then redirect to login page
    if(usrDetails){
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);
    
      if(usrDetails.role_id !== roles.editor.toUpperCase() || 
         usrDetails.role_id !== roles.approve_1.toUpperCase() ||
         usrDetails.role_id !== roles.approver_2.toUpperCase() ||
         usrDetails.role_id !== roles.supervisor_approv_1_2.toUpperCase()) {
        navigate("/");
      }
    }
  }, []);
  //------------------//

  const [selectedFile, setSelectedFile] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [showShouldUpdModal, setShowShouldUpdModal] = useState(false);
  const [errorBtnDisable, setErrorBtnDisable] = useState(false);
  const [errorData, setErrorData] = useState([]);
  const [fileInput_ref, setFileInputRef] = useState("1");

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

  const [rowData, setRowData] = useState([]);
  const buRole = new URLSearchParams(location.search).get("role");
  const handleClearClick = () => {
    window.location.reload();
  };

  const handleSave = useCallback((data) => {
    let reqData = {
      country_code: data[0].country_code,
      partner_id: data[0].partner_id,
      model_type: data[0].model_type,
      year_val: data[0].year_val,
      quarter: data[0].quarter,
      attributes: data[0].attributes,
      created_by: data[0].created_by,
      created_date: data[0].created_date,
      modified_by: data[0].modified_by,
      modified_date: data[0].modified_date,
      active_flag: data[0].active_flag,
    };

    let apiData = 0;

    reqData.attributes.forEach((e) => {
      apiData = apiData + e.total;
    });

    if (apiData == 100) {
      props
        .updateBuSplitData(reqData)
        .then((data) => {
          if (data?.data?.attributes?.length) {
            setShowSuccessModal(true);
          }
        })

        .catch((e) => {
          console.log("Error", e);
        });
    } else {
      setShowErrorModal(true);
    }
  }, []);

  const handleUpload = useCallback((data) => {
    let reqData = {
      country_code: data[0].Country,
      model_type: data[0].Model,
      quarter: data[0].Quarter,
      attributes: [
        { attribute_name: "bopp_type", attribute_val: "SP", total: data[0].SP },
        {
          attribute_name: "bopp_type",
          attribute_val: "H&D",
          total: data[0]["H&D"],
        },
        { attribute_name: "bopp_type", attribute_val: "PP", total: data[0].PP },
        { attribute_name: "bopp_type", attribute_val: "DE", total: data[0].DE },
        { attribute_name: "bopp_type", attribute_val: "IA", total: data[0].IA },
      ],
      partner_id: "CHN-CN-00072",
      year_val: new Date().getFullYear(),
      created_by: userMail,
      created_date: new Date().toUTCString(),
      modified_by: userMail,
      modified_date: new Date().toUTCString(),
      active_flag: "false",
    };

    if (data[0].Total == 100) {
      props
        .updateBuSplitData(reqData)
        .then((data) => {
          if (data?.data?.attributes?.length) {
            setShowSuccessModal(true);
            onGridReady([]);
          }
        })

        .catch((e) => {
          console.log("Error", e);
        });
    } else {
      setShowErrorModal(true);
    }
  }, []);

  const gridRef = useRef(null);

  const buSplitData = [
    {
      partner_id: "Ahlsell",
      country_code: "Finland",
      Partner_Account_Name: "Ahlsell ELKO SWE",
      model_type: "E1",
      quarter: "Q2",
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

  const sumTotal = (params) => {
    let total = 0;

    for (let i = 0; i < filteredSplitValue.length; i++) {
      const splitHeader = filteredSplitValue[i].attribute_val;

      const attribute = params.data.attributes.find(
        (attr) => attr.attribute_val === splitHeader
      );

      if (attribute) {
        total += attribute.total;
      }
    }

    return total;
  };

  const isTot100Per = (params) => {
    if (params.value !== 100) {
      return { backgroundColor: "red" };
    }
    return { backgroundColor: "white", borderColor: "#e2e2e2" };
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

      field: "partner_account_name",

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
  ];

  let filteredSplitValue = [];

  if (rowData?.length) {
    filteredSplitValue = rowData[0]?.attributes?.filter(
      (obj) => obj.attribute_val !== null
    );

    for (let i = 0; i < filteredSplitValue?.length; i++) {
      const splitHeader = filteredSplitValue[i]?.attribute_val;
      const splitField = "field_" + i;

      columnDefs.push({
        headerName: splitHeader,
        field: splitField,
        minWidth: 70,
        editable: true,
        suppressMenu: true,
        cellStyle: { borderColor: "#e2e2e2" },
        valueFormatter: (params) => {
          return Math.round(params.value) + "%";
        },
        valueParser: (params) => Number(params.newValue),
        valueGetter: (params) => {
          const attribute = params.data.attributes.find(
            (attr) => attr.attribute_val == splitHeader
          );
          return attribute ? attribute.total : null;
        },
        valueSetter: function (params) {
          const attribute = params.data.attributes.find(
            (attr) => attr.attribute_val === splitHeader
          );
          if (attribute) {
            attribute.total = Number(params.newValue);
            return true; // Return true to indicate successful value setting
          } else {
            return false; // Return false or omit the return statement to indicate unsuccessful value setting
          }
        },
      });
    }
  }

  columnDefs.push({
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
      return sumTotal(params);
    },

    cellStyle: (params) => {
      return isTot100Per(params);
    },
  });

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

  let userMail = "";

  if (buRole == "editor") {
    userMail = "nelson@se.com";
  }
  if (buRole == "approve_1" || buRole == "approver_2") {
    userMail = "chncn00072@example.com";
  }
  if (buRole == "superApproverUser") {
    userMail = "chncn00072@example.com";
  }
  let year = new Date().getFullYear();

  const onGridReady = useCallback((params) => {
    props
      .retrieveBuSplitData(
        userMail,
        buRole == "superApproverUser" ? "supervisor_approv_1_2" : buRole,
        year
      )
      .then((data) => {
        props
          .retrivePartnerAccountName(
            data.data[0].partner_id,
            data.data[0].country_code
          )
          .then((data1) => {
            let obj = {};
            obj = data.data[0];
            obj.partner_account_name = data1.partner_account_name;
            let sampleArray = [];
            sampleArray.push(obj);
            setRowData(sampleArray);
          })

          .catch((e) => {
            console.log(e);
          });
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
    setSelectedFile(null);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleCloseShouldUpdModal = () => {
    setShowShouldUpdModal(false);
  };

  const handleChange = ({ target }) => {
    console.log("handle change::. ", target);
    setSelectedFile(target);
  };

  const handleClick = (event) => {
    setSelectedFile(event.target.files);
  };

  const postBatchData = () => {
    let dateNew = Date.now();
    setFileInputRef(dateNew);
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
          rowData.forEach((b) => {
            if (
              json.find(
                (j) => j["Partner Account Name"] == b.partner_account_name
              ) == undefined
            ) {
              errorJson.push(`Partner account is not matched with the data`);
            }
          });

          if (!errorJson.length) {
            rowData.forEach((b) => {
              json.forEach((j) => {
                if (b.partner_account_name === j["Partner Account Name"]) {
                  if (
                    b.country_code === j.Country &&
                    b.model_type === j.Model &&
                    b.quarter === j.Quarter
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
                  `Bu split accepts only Numeric value in - ${i["Partner Account Name"]} partner`
                );
              }
            }

            if (i["H&D"]) {
              if (isNaN(i["H&D"])) {
                errorJson.push(
                  `Bu split accepts only Numeric value in - ${i["Partner Account Name"]} partner`
                );
              }
            }

            if (i.PP) {
              if (isNaN(i.PP)) {
                errorJson.push(
                  `Bu split accepts only Numeric value in - ${i["Partner Account Name"]} partner`
                );
              }
            }

            if (i.DE) {
              if (isNaN(i.DE)) {
                errorJson.push(
                  `Bu split accepts only Numeric value in - ${i["Partner Account Name"]} partner`
                );
              }
            }

            if (i.IA) {
              if (isNaN(i.IA)) {
                errorJson.push(
                  `Bu split accepts only Numeric value in - ${i["Partner Account Name"]} partner`
                );
              }
            }
          });

          json.forEach((e) => {
            const splitData = e.SP + e["H&D"] + e.PP + e.DE + e.IA;

            console.log("e in total", JSON.stringify(e), splitData);

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
            handleUpload(json);
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
      let data = rowData.filter((item) => item[monthField] != "");
      if (data.length > 0) {
        console.log("show data already exist popup");
        setShowShouldUpdModal(true);
        return;
      }
    }
    postBatchData();
  };

  const onSubmit = (frmData) => {
    console.log("frmData", frmData);
    setSelectedFile(frmData);
    ShouldUpdate();
  };

  const onError = (error) => {
    console.log("ERROR:::", error);
  };

  const excelStyles = useMemo(() => {
    return [
      {
        id: "header",
        alignment: {
          vertical: "Center",
        },
        font: {
          bold: true,
          color: "#ffffff",
        },
        interior: {
          color: "#009530",
          pattern: "Solid",
        },
      },
    ];
  }, []);

  const buSplitExcel = useCallback(() => {
    const params = {
      fileName: "Sell out BuSplit Data.xlsx",
      sheetName: "BuSplit Data",
    };
    gridRef.current.api.exportDataAsExcel(params);
  }, []);

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
            ) : buRole === "approve_1" ? (
              <Breadcrumb>
                <Breadcrumb.Item href="/approver_1/home">
                  <img
                    src={Home}
                    alt="home"
                    style={{ height: "20px", width: "80px", cursor: "pointer" }}
                  />
                </Breadcrumb.Item>
              </Breadcrumb>
            ) : buRole === "approver_2" ? (
              <Breadcrumb>
                <Breadcrumb.Item href="/approver_2/home">
                  <img
                    src={Home}
                    alt="home"
                    style={{ height: "20px", width: "80px", cursor: "pointer" }}
                  />
                </Breadcrumb.Item>
              </Breadcrumb>
            ) : buRole === "superApproverUser" ||
              buRole === "supervisor_approv_1_2" ? (
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
                        key={fileInput_ref}
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
                onClick={(e) => buSplitExcel()}
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
              excelStyles={excelStyles}
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
                      handleSave(rowData);
                    }}
                  >
                    Save
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
                </Col>
              </Row>
            </div>
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default connect(null, {
  retrieveBuSplitData,

  retrivePartnerAccountName,

  updateBuSplitData,
})(BusinessUnitSplit);
