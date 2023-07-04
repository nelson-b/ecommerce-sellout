import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "./parentInput.component.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import * as xlsx from "xlsx-js-style";
import AlertModel from "../modal/alertModel";
import { allCalMonths, roles, user_login_info } from "../constant";
import { ckeckErrors } from "../utils/index.js";
import { retrieveAllData, createData } from "../../actions/dataInputAction";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUIDateFormat, getAPIDateFormatWithTime } from "../../helper/helper";

function BatchInputComponent({ savedData, props, userDetails }) {
  console.log(
    "getUIDateFormatWithTime",
    getAPIDateFormatWithTime(new Date().toUTCString())
  );
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
      
        if(usrDetails.role_id === roles.editor.toUpperCase() || 
          usrDetails.role_id === roles.approve_1.toUpperCase() ||
          usrDetails.role_id === roles.approver_2.toUpperCase() ||
          usrDetails.role_id === roles.supervisor_approv_1_2.toUpperCase()) {
        } else {
          navigate("/");
        }
      }
    }, []);
    //------------------//

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

  const handleChange = ({ target }) => {
    setSelectedFile(target);
  };

  const handleClick = (event) => {
    setSelectedFile(event.target.files);
  };

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [fileError, setFileError] = useState([]);
  const [showShouldUpdModal, setShowShouldUpdModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  let selectedFrmFile = null;
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleCloseShouldUpdModal = () => {
    setShowShouldUpdModal(false);
  };

  const successmsg = {
    headerLabel: "Success....",
    variant: "success",
    header: "Data has been saved successfully!!",
    content: ["Navigating you to the Sell out data review page....."],
  };

  const errormsg = {
    headerLabel: "Error....",
    variant: "danger",
    header: "There are errors while processing",
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

  const postBatchData = (frmData) => {
    const file = frmData.file[0];
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
      if (file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          let result = e.target.result;
          let workbook = xlsx.read(result, { type: "array" });
          let sheetName = workbook.SheetNames[1];
          let worksheet = workbook.Sheets[sheetName];
          let json = xlsx.utils.sheet_to_json(worksheet);
          let errorJson = [];
          setFileData(json);
          errorJson = ckeckErrors(json, json);

          json.forEach((i) => {
            if (i.Jan_Amount) {
              if (isNaN(i.Jan_Amount)) {
                errorJson.push(
                  "There should be number for Jan month at partner : " +
                    i["Partner Account Name"]
                );
              }
            }
            if (i.Feb_Amount) {
              if (isNaN(i.Feb_Amount)) {
                errorJson.push(
                  "There should be number for Feb month at partner : " +
                    i["Partner Account Name"]
                );
              }
            }
            if (i.Mar_Amount) {
              if (isNaN(i.Mar_Amount)) {
                errorJson.push(
                  "There should be number for Mar month at partner : " +
                    i["Partner Account Name"]
                );
              }
            }
            if (i.Apr_Amount) {
              if (isNaN(i.Apr_Amount)) {
                errorJson.push(
                  "There should be number at Apr at partner : " +
                    i["Partner Account Name"]
                );
              }
            }
            if (i.May_Amount) {
              if (isNaN(i.May_Amount)) {
                errorJson.push(
                  "There should be number at May at partner : " +
                    i["Partner Account Name"]
                );
              }
            }
            if (i.Jun_Amount) {
              if (isNaN(i.Jun_Amount)) {
                errorJson.push(
                  "There should be number at Jun at partner : " +
                    i["Partner Account Name"]
                );
              }
            }
            if (i.Jul_Amount) {
              if (isNaN(i.Jul_Amount)) {
                errorJson.push(
                  "There should be number at Jul at partner : " +
                    i["Partner Account Name"]
                );
              }
            }
            if (i.Aug_Amount) {
              if (isNaN(i.Aug_Amount)) {
                errorJson.push(
                  "There should be number at Jul at partner : " +
                    i["Partner Account Name"]
                );
              }
            }
            if (i.Sep_Amount) {
              if (isNaN(i.Sep_Amount)) {
                errorJson.push(
                  "There should be number at Jul at partner : " +
                    i["Partner Account Name"]
                );
              }
            }
            if (i.Oct_Amount) {
              if (isNaN(i.Oct_Amount)) {
                errorJson.push(
                  "There should be number at Oct at partner : " +
                    i["Partner Account Name"]
                );
              }
            }
            if (i.Nov_Amount) {
              if (isNaN(i.Nov_Amount)) {
                errorJson.push(
                  "There should be number at Nov at partner : " +
                    i["Partner Account Name"]
                );
              }
            }
            if (i.Dec_Amount) {
              if (isNaN(i.Dec_Amount)) {
                errorJson.push(
                  "There should be number at Dec at partner : " +
                    i["Partner Account Name"]
                );
              }
            }
          });

          if (errorJson.length > 0) {
            setFileError(errorJson);
            setShowErrorModal(true);
            setShowSuccessModal(false);
            setShowShouldUpdModal(false);
          } else {
            //call api
            let payload = [];

            // //iterate in the grid
            json.forEach((rowNode, index) => {
              //api to save data
              let monthArray = [];
              //12 months loop
              allCalMonths.forEach((element) => {
                if (rowNode[`${element}_Amount`] > 0) {
                  monthArray.push({
                    month: element.toLowerCase(),
                    sellout_local_currency: String(
                      rowNode[`${element}_Amount`]
                    ),
                    trans_type:
                      rowNode[`${element}_Estimated`] == true ? "EST" : "ACT",
                  });
                }
              });

              let formatPayload = {
                partner_id: rowNode.Partner_id,
                partner_name: rowNode.Partner_Account_Name,
                country_code: rowNode.Country_code,
                year_val: String(rowNode.Year),
                months: monthArray,
                trans_currency_code: rowNode.Currency_Of_Reporting,
                created_by: userDetails.loginUser, //login user
                created_date: getAPIDateFormatWithTime(
                  new Date().toUTCString()
                ),
                approval_status: "0",
                editor_comment: "",
                comments: "waiting for approver",
                batch_upload_flag: "true",
              };

              if (formatPayload.months.length > 0) {
                payload.push(formatPayload);
              }
            });
            props
              .createData(payload)
              .then((data) => {
                document.getElementById("sellout-editor-input").reset();
                setFileError([]);
                setShowErrorModal(false);
                setShowSuccessModal(true);
                setShowShouldUpdModal(false);
                setTimeout(() => navigate(`/dataReview?role=${userRole}`), 3000);
              })
              .catch((e) => {
                document.getElementById("sellout-editor-input").reset();
                setFileError([]);
                setShowErrorModal(true);
                setShowSuccessModal(false);
                setShowShouldUpdModal(false);
                return;
              });
            // });
          }

          errorJson = [];
        };

        reader.readAsArrayBuffer(frmData.file[0]);
      }
    }
  };

  const onSubmit = (frmData) => {
    postBatchData(frmData);
  };

  const onError = (error) => {
    console.log("ERROR:::", error);
  };

  const readMeData = [
    ["How to use this template"],
    [
      "1. Please verify the partner name, channel, Model and correct the values in case of any invalid data.",
    ],
    [
      "2. If the value mentioned as True means it is estimated value. If nothing mentioned, by Default values treated as actuals. ",
    ],
    [
      "3. For each month, we have a flag field with suffix IsEstimated for each month (e.g Jan_IsEstimated) to indicate values as Actual or Estimate. ",
    ],
    [
      "4. Zone, Country, Partner and Model fields are text fields. All alpha numeric characters are allowed (e.g A-Z, 1, 2, & % etc)",
    ],
    [
      "5. Partner field should be unique for each record. It would be used as identifier for each record.",
    ],
    [
      "6. Fill only the data from the previous 6 months to the current reporting month for the current academic year.",
    ],
    [
      "7. All months field can have only numbers with precision of maximum 2 decimals allowed.",
    ],
    ["8. Please verify the values in each cell before the upload"],
  ];

  const getExactData =  (index, amount) => {
    let today = new Date();
    let month = today.getMonth();
    if(index < month) {
    } else {
      amount = '';

    }
    return amount
  }

  const exportToExcel = async () => {
    let exportExcelData = [];

    console.log("savedData", savedData);

    savedData.forEach((row, index) => {
      let indvRespPayload = {
        Zone: row.Zone,

        Country: row.Country,

        Country_code: row.Country_code,

        Partner_Account_Name: row.Partner_Account_Name,

        Partner_id: row.Partner_id,

        Model: row.Model,

        Currency_Of_Reporting: row.Currency_Of_Reporting,

        Status: row.Status,

        Year: row.Year,

        Jan_Amount: getExactData(0, row.Jan_Amount),

        Feb_Amount: getExactData(1, row.Feb_Amount),

        Mar_Amount: getExactData(2, row.Mar_Amount),

        Apr_Amount: getExactData(3, row.Apr_Amount),

        May_Amount: getExactData(4, row.May_Amount),

        Jun_Amount: getExactData(5, row.Jun_Amount),

        Jul_Amount: getExactData(6, row.Jul_Amount),

        Aug_Amount: getExactData(7, row.Aug_Amount),

        Sep_Amount: getExactData(8, row.Sep_Amount),

        Oct_Amount: getExactData(9, row.Oct_Amount),

        Nov_Amount: getExactData(10, row.Nov_Amount),

        Dec_Amount: getExactData(11, row.Dec_Amount),

        Jan_Estimated: row.Jan_Estimated,

        Feb_Estimated: row.Feb_Estimated,

        Mar_Estimated: row.Mar_Estimated,

        Apr_Estimated: row.Apr_Estimated,

        May_Estimated: row.May_Estimated,

        Jun_Estimated: row.Jun_Estimated,

        Jul_Estimated: row.Jul_Estimated,

        Aug_Estimated: row.Aug_Estimated,

        Sep_Estimated: row.Sep_Estimated,

        Oct_Estimated: row.Oct_Estimated,

        Nov_Estimated: row.Nov_Estimated,

        Dec_Estimated: row.Dec_Estimated,
      };

      exportExcelData = exportExcelData.concat(indvRespPayload);
    });

    console.log("exportExcelData", exportExcelData);

    const tempData = exportExcelData.map((e) => {
      const { id, status, ...rest } = e;

      return rest;
    });

    const currentDate = new Date();

    const totalValue = [];

    for (let i = 12; i > 0; i--) {
      let date = new Date(
        currentDate.getFullYear(),

        currentDate.getMonth() - (i - 1),

        1
      );

      const monthName = allCalMonths[date.getMonth()];

      const monthField = monthName + "_Amount";

      totalValue.push(monthField);
    }

    let totalAmount = 0;

    tempData.forEach((e, i) => {
      totalValue.forEach((m) => {
        totalAmount = Number(totalAmount) + Number(e[m]);
      });

      tempData[i].GrandTotal = totalAmount;

      totalAmount = 0;
    });

    const workbook = xlsx.utils.book_new();

    const readmeDataWithoutHeader = readMeData.slice(0);

    const sheet1 = xlsx.utils.aoa_to_sheet(readmeDataWithoutHeader);

    xlsx.utils.book_append_sheet(workbook, sheet1, "Read Me");

    const sheet2 = xlsx.utils.json_to_sheet(tempData);

    xlsx.utils.book_append_sheet(workbook, sheet2, "Sell out Data Input");

    //style excel header with green bgcolor and white forecolor

    workbook.Sheets["Sell out Data Input"]["A1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["B1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["C1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["D1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["E1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["F1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["G1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["H1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["I1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["J1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["K1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["L1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["M1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["N1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["O1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["P1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["Q1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["R1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["S1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["T1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["U1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["V1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "e47f00" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["W1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "e47f00" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["X1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "e47f00" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["Y1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "e47f00" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["Z1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "e47f00" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["AA1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "e47f00" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["AB1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "e47f00" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["AC1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "e47f00" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["AD1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "e47f00" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["AE1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "e47f00" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["AF1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "e47f00" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["AG1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "e47f00" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    workbook.Sheets["Sell out Data Input"]["AH1"].s = {
      fill: { patternType: "solid", fgColor: { rgb: "009E4D" } },

      font: { bold: true, color: { rgb: "FFFFFF" } },
    };

    xlsx.writeFile(
      workbook,

      "Sell out Data Input" + currentDate.getFullYear() + ".xlsx"
    );
  };

  return (
    <>
      <Container fluid>
        <h5 className="sell-out-input-header">Sell Out Data Input</h5>
        <Container className="sell-out-input-upload">
          <Row>
            <Col xs="auto" className="align-item-center file-upload-container">
              <Form.Label>BATCH UPLOAD</Form.Label>
            </Col>
            <Col xs="auto">
              <Form
                id="sellout-editor-input"
                noValidate
                onSubmit={handleSubmit(onSubmit, onError)}
              >
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
                onClick={(e) => exportToExcel()}
              >
                Download Template
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default connect(null, { retrieveAllData, createData })(BatchInputComponent);
