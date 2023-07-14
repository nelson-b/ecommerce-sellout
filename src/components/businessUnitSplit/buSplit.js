"use strict";

import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { getUIDateFormat, getAPIDateFormatWithTime } from "../../helper/helper";

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
import { retrievePartnerByRole } from "../../actions/partneraction";

function BusinessUnitSplit(props) {
  const location = useLocation();
  const navigate = useNavigate();

  //sso login func
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setuserRole] = useState('');

  useEffect(() => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    //if user not login then redirect to login page
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);

      if (usrDetails.role_id === roles.editor.toUpperCase() ||
        usrDetails.role_id === roles.backup_editor.toUpperCase() ||
        usrDetails.role_id === roles.approve_1.toUpperCase() ||
        usrDetails.role_id === roles.approver_2.toUpperCase() ||
        usrDetails.role_id === roles.supervisor_approv_1_2.toUpperCase()) {
      } else {
        navigate("/");
      }
    }
  }, []);
  //------------------//

  const [selectedFile, setSelectedFile] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showNumberErrorModal, setShowNumberErrorModal] = useState(false);

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
  const [valuesData, setValuesDate] = useState([]);

  const handleClearClick = () => {
    window.location.reload();
  };

  const handleSave = useCallback((data) => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    //if user not login then redirect to login page
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);
    }
    let hasNegativeValues = false;

    data.forEach((element) => {
      element.attributes.forEach((e) => {
        if (e.total < 0) {
          hasNegativeValues = true;
          return;
        }
      });
    });

    if (hasNegativeValues) {
      setShowNumberErrorModal(true);
    } else {
      let shouldCallAPI = true;
      let postDateArray = [];

      data.forEach(element => {
        let reqData = {
          country_code: element.country_code,
          partner_id: element.partner_id,
          model_type: element.model_type,
          year_val: element.year_val,
          quarter: element.quarter,
          attributes: element.attributes,
          created_by: element.created_by ? element.created_by : usrDetails.email_id,
          created_date: element.created_date,
          modified_by: usrDetails.email_id,
          modified_date: getAPIDateFormatWithTime(new Date().toUTCString()),
          active_flag: "True",
        };
        let apiData = 0;
        element.attributes.forEach((e) => {
          apiData = apiData + e.total;
        });
        if (apiData == 100) {
          postDateArray.push(reqData);
        } else {
          shouldCallAPI = false;
          return;
        }
      });

      if (shouldCallAPI == true) {
        props
          .updateBuSplitData(postDateArray)
          .then((data) => {
            if (data.data.length) {
              setShowSuccessModal(true); // Show success message
            }
          })
          .catch((e) => {
            console.log("Error", e);
          });
      } else {
        setShowErrorModal(true);
      }
    }
  }, []);

  const getCurrentQuarter2 = () => {
    let dateSample = new Date().getMonth();
    let currentQuarter = 1;
    if (dateSample <= 3) {
      currentQuarter = "Q1";
    } else if (dateSample <= 6 && dateSample > 3) {
      currentQuarter = "Q2";
    } else if (dateSample <= 9 && dateSample > 6) {
      currentQuarter = "Q3";
    } else {
      currentQuarter = "Q4";
    }
    return currentQuarter;
  };

  const handleUpload = useCallback((data) => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);
    }

    let postDateArray = [];
    data.forEach(element => {
      let reqData = {
        country_code: element.Country,
        model_type: element.Model,
        quarter: element.Quarter,
        attributes: [
          { attribute_name: "bopp_type", attribute_val: "SP", total: element.SP },
          {
            attribute_name: "bopp_type",
            attribute_val: "H&D",
            total: element["H&D"],
          },
          { attribute_name: "bopp_type", attribute_val: "PP", total: element.PP },
          { attribute_name: "bopp_type", attribute_val: "DE", total: element.DE },
          { attribute_name: "bopp_type", attribute_val: "IA", total: element.IA },
        ],
        partner_id: element.Partner_id,
        year_val: new Date().getFullYear(),
        created_by: usrDetails.email_id,
        created_date: getAPIDateFormatWithTime(new Date().toUTCString()),
        modified_by: usrDetails.email_id,
        modified_date: getAPIDateFormatWithTime(new Date().toUTCString()),
        active_flag: "True",
      };
      postDateArray.push(reqData);
    })

    let totalValid = true;
    postDateArray.forEach(reqData => {
      if (reqData.attributes.reduce((sum, attr) => sum + attr.total, 0) !== 100) {
        totalValid = false;
      }
    });

    if (totalValid) {
      props
        .updateBuSplitData(postDateArray)
        .then((data) => {
          if (data?.data?.length) {
            buSplitUploadRefresh();
          }
        })
        .catch((e) => {
          console.log("Error", e);
        });
    } else {
      setShowErrorModal(true);
    }
  }, []);

  const buSplitUploadRefresh = () => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));

    let quarter = getCurrentQuarter2();
    props
      .retrieveBuSplitData(
        usrDetails.email_id,
        usrDetails.role_id == "supervisor_approv_1_2" ? "supervisor_approv_1_2" : usrDetails.role_id,
        year,
        quarter
      )
      .then((data) => {
        getInShapePlease(data?.data);
        if (data?.data) {
          let previousAPIData = data?.data;
          props
            .retrievePartnerByRole(usrDetails.email_id, usrDetails.role_id)
            .then((data) => {
              let secondArray = [];
              secondArray = setProperBUSplitData(data?.data);
              for (let i = 0; i < previousAPIData.length; i++) {
                for (let j = 0; j < secondArray.length; j++) {
                  if (
                    previousAPIData[i].partner_id == secondArray[j].partner_id
                  ) {
                    secondArray.splice(j, 1);
                  }
                }
              }
              previousAPIData = previousAPIData.concat(secondArray);
              setRowData(previousAPIData);
              setShowSuccessModal(true);
              console.log('previousAPIData', previousAPIData)
            })
            .catch((e) => {
              setRowData(previousAPIData);
              setShowSuccessModal(true);
              console.log("Data Input", e);
            });
        } else {

          props
            .retrievePartnerByRole(usrDetails.email_id, usrDetails.role_id)
            .then((data) => {
              let secondArray = [];
              secondArray = secondArray = setProperBUSplitData(data?.data);
              let previousAPIData = [];
              previousAPIData = previousAPIData.concat(secondArray);
              setRowData(previousAPIData);
              setShowSuccessModal(true);
            })
            .catch((e) => {
              setRowData([]);
              console.log("Data Input", e);
            });
        }


      }).catch((e) => {
        setRowData([]);
        console.log(e);
      });
  }

  const gridRef = useRef(null);

  const getInShapePlease = (data) => {
    let newArray = [];

    if (data.length) {
      data.forEach(element => {
        if (element.attributes) {
          element.attributes.forEach(attElement => {
            let obj = {};
            obj = attElement;
            obj.partner_id = element.partner_id;
            attElement = obj;
          });
        }
      });
    }
  }
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
      field: "partner_id",
      hide: true,
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
              &&
              attr?.partner_id == params.data.partner_id

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

  let year = new Date().getFullYear();

  const onGridReady = useCallback((params) => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    //if user not login then redirect to login page
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);
    }
    let quarter = getCurrentQuarter2();
    props
      .retrieveBuSplitData(
        usrDetails.email_id,
        usrDetails.role_id == "supervisor_approv_1_2" ? "supervisor_approv_1_2" : usrDetails.role_id,
        year,
        quarter
      )
      .then((data) => {
        setValuesDate(data)
        getInShapePlease(data?.data);
        if (data?.data) {
          let previousAPIData = data?.data;
          props
            .retrievePartnerByRole(usrDetails.email_id, usrDetails.role_id)
            .then((data) => {
              let secondArray = [];
              secondArray = setProperBUSplitData(data?.data);
              for (let i = 0; i < previousAPIData.length; i++) {
                for (let j = 0; j < secondArray.length; j++) {
                  if (
                    previousAPIData[i].partner_id == secondArray[j].partner_id
                  ) {
                    secondArray.splice(j, 1);
                  }
                }
              }
              previousAPIData = previousAPIData.concat(secondArray);
              setRowData(previousAPIData);
            })
            .catch((e) => {
              setRowData(previousAPIData);
              console.log("Data Input", e);
            });
        } else {

          props
            .retrievePartnerByRole(usrDetails.email_id, usrDetails.role_id)
            .then((data) => {
              let secondArray = [];
              secondArray = secondArray = setProperBUSplitData(data?.data);
              let previousAPIData = [];
              previousAPIData = previousAPIData.concat(secondArray);
              setRowData(previousAPIData);
            })
            .catch((e) => {
              setRowData([]);
              console.log("Data Input", e);
            });
        }


      }).catch((e) => {
        setRowData([]);
        console.log(e);
      });
  }, []);

  const setProperBUSplitData = (dataInput) => {

    let newCustomizedArray = [];
    dataInput?.forEach(element => {
      const setArray = [
        { attribute_name: 'bopp_type', attribute_val: 'PP', total: 0, partner_id: element.partner_id },
        { attribute_name: 'bopp_type', attribute_val: 'DE', total: 0, partner_id: element.partner_id },
        { attribute_name: 'bopp_type', attribute_val: 'IA', total: 0, partner_id: element.partner_id },
        { attribute_name: 'bopp_type', attribute_val: 'SP', total: 0, partner_id: element.partner_id },
        { attribute_name: 'bopp_type', attribute_val: 'H&D', total: 0, partner_id: element.partner_id }
      ];
      let obj = {
        active_flag: "True",
        attributes: setArray,
        country_code: element.country_code,
        created_by: element.created_by,
        created_date: getAPIDateFormatWithTime(new Date().toUTCString()),
        model_type: element.model_type,
        modified_by: element.modified_by,
        modified_date: getAPIDateFormatWithTime(new Date().toUTCString()),
        partner_id: element.partner_id,
        quarter: getCurrentQuarter2(),
        record_end_date: 'None',
        record_start_date: 'None',
        year_val: new Date().getFullYear(),
        partner_account_name: element.partner_account_name
      }
      newCustomizedArray.push(obj);
    });
    return newCustomizedArray;
  }

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

  const errorNumbermsg = {
    headerLabel: "Error....",
    variant: "danger",
    header: "Negative values are not allowed",
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

  const handleNumberErrorModal = () => {
    setShowNumberErrorModal(false);
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
            if (splitData > 100) {
              errorJson.push(
                `Total should not be greater than or less than 100% for - ${e["Partner Account Name"]} partner`
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
            // setShowErrorModal(false);
            // setShowSuccessModal(true);
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
      allColumns: true,
    };
    gridRef.current.api.exportDataAsExcel(params);
  }, []);

  const modifiedDate = new Date(valuesData.modified_date);
  const formattedDate = modifiedDate.toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu />
        </Row>

        <Row>
          <Stack direction="horizontal" gap={4}>
            {userRole == roles.editor.toUpperCase() ? (
              <Breadcrumb>
                <Breadcrumb.Item href="/editor/home">
                  <img
                    src={Home}
                    alt="home"
                    style={{ height: "20px", width: "80px", cursor: "pointer" }}
                  />
                </Breadcrumb.Item>
              </Breadcrumb>
            ) : userRole == roles.approve_1.toUpperCase() ? (
              <Breadcrumb>
                <Breadcrumb.Item href="/approver_1/home">
                  <img
                    src={Home}
                    alt="home"
                    style={{ height: "20px", width: "80px", cursor: "pointer" }}
                  />
                </Breadcrumb.Item>
              </Breadcrumb>
            ) : userRole == roles.approver_2.toUpperCase() ? (
              <Breadcrumb>
                <Breadcrumb.Item href="/approver_2/home">
                  <img
                    src={Home}
                    alt="home"
                    style={{ height: "20px", width: "80px", cursor: "pointer" }}
                  />
                </Breadcrumb.Item>
              </Breadcrumb>
            ) : userRole == roles.supervisor_approv_1_2.toUpperCase() ? (
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
              <Row className="edited-header">Edited By: {valuesData.modified_by}</Row>

              <Col className="edited-header">
                Last Updete: {formattedDate} UTC
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

                  <AlertModel
                    show={showNumberErrorModal}
                    handleClose={handleNumberErrorModal}
                    body={errorNumbermsg}
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
  retrievePartnerByRole,
  retrivePartnerAccountName,

  updateBuSplitData,
})(BusinessUnitSplit);