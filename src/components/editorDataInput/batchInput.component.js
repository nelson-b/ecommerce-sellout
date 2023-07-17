import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "./parentInput.component.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import * as xlsx from "xlsx-js-style";
import AlertModel from "../modal/alertModel";
import { allCalMonths, quarters,roles, user_login_info } from "../constant";
import { ckeckErrors } from "../utils/index.js";
import { retrieveAllData, createData } from "../../actions/dataInputAction";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUIDateFormat, getAPIDateFormatWithTime } from "../../helper/helper";

function BatchInputComponent({
  savedData,
  props,
  userDetails,
  shouldDisableSaveButton,
  openingDate,
  closingDate
}) {
  const location = useLocation();

  const navigate = useNavigate();
  //sso login func
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setuserRole] = useState("");

  useEffect(() => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    //if user not login then redirect to login page
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);

      if (
        usrDetails.role_id === roles.editor.toUpperCase() ||
        usrDetails.role_id === roles.backup_editor.toUpperCase() ||
        usrDetails.role_id === roles.approve_1.toUpperCase() ||
        usrDetails.role_id === roles.approver_2.toUpperCase() ||
        usrDetails.role_id === roles.supervisor_approv_1_2.toUpperCase()
      ) {
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

  const getCurrentQuarterForPostAPI = () => {
    const currentDate = new Date();
    const currentYear = String(currentDate.getFullYear()).slice(-2);
    const currentMonth = allCalMonths[currentDate.getMonth()];
    // const currentMonth = 'Jul'; // To test quarter basis
    let currentQuarter = 0;
    let currentQuarterIndex = 0;
    let index = 1;
    let selectedYear = currentYear;

    for (const quarter in quarters) {
      if (quarters[quarter].includes(currentMonth)) {
        currentQuarter = quarter;
        currentQuarterIndex = quarters[quarter].indexOf(currentMonth);
        break;
      }
      index++;
    }

    let resultQuarter = 0;
    if (currentQuarterIndex === 0) {
      const previousIndex = index - 1 ? index - 1 : 4;
      if (index - 1 == 0) {
        selectedYear = currentYear - 1;
      }
      const previousQuarter = Object.keys(quarters)[previousIndex - 1];
      resultQuarter = previousQuarter;
    } else {
      resultQuarter = currentQuarter;
    }
    const q2Values = quarters[resultQuarter];
    return q2Values;
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
                    i.Partner_Account_Name
                );
              } else if (i.Jan_Amount < 0) {
                errorJson.push(
                  "There should not be negative number for Jan month at partner : " +
                    i.Partner_Account_Name
                );
              }
            }
            if (i.Feb_Amount) {
              if (isNaN(i.Feb_Amount)) {
                errorJson.push(
                  "There should be number for Feb month at partner : " +
                    i.Partner_Account_Name
                );
              } else if (i.Feb_Amount < 0) {
                errorJson.push(
                  "There should not be negative number for Feb month at partner : " +
                    i.Partner_Account_Name
                );
              }
            }
            if (i.Mar_Amount) {
              if (isNaN(i.Mar_Amount)) {
                errorJson.push(
                  "There should be number for Mar month at partner : " +
                    i.Partner_Account_Name
                );
              } else if (i.Mar_Amount < 0) {
                errorJson.push(
                  "There should not be negative number for Mar month at partner : " +
                    i.Partner_Account_Name
                );
              }
            }
            if (i.Apr_Amount) {
              if (isNaN(i.Apr_Amount)) {
                errorJson.push(
                  "There should be number at Apr at partner : " +
                    i.Partner_Account_Name
                );
              } else if (i.Apr_Amount < 0) {
                errorJson.push(
                  "There should not be negative number for Apr month at partner : " +
                    i.Partner_Account_Name
                );
              }
            }
            if (i.May_Amount) {
              if (isNaN(i.May_Amount)) {
                errorJson.push(
                  "There should be number at May at partner : " +
                    i.Partner_Account_Name
                );
              } else if (i.May_Amount < 0) {
                errorJson.push(
                  "There should not be negative number for May month at partner : " +
                    i.Partner_Account_Name
                );
              }
            }
            if (i.Jun_Amount) {
              if (isNaN(i.Jun_Amount)) {
                errorJson.push(
                  "There should be number at Jun at partner : " +
                    i.Partner_Account_Name
                );
              } else if (i.Jun_Amount < 0) {
                errorJson.push(
                  "There should not be negative number for Jun month at partner : " +
                    i.Partner_Account_Name
                );
              }
            }
            if (i.Jul_Amount) {
              if (isNaN(i.Jul_Amount)) {
                errorJson.push(
                  "There should be number at Jul at partner : " +
                    i.Partner_Account_Name
                );
              } else if (i.Jul_Amount < 0) {
                errorJson.push(
                  "There should not be negative number for Jul month at partner : " +
                    i.Partner_Account_Name
                );
              }
            }
            if (i.Aug_Amount) {
              if (isNaN(i.Aug_Amount)) {
                errorJson.push(
                  "There should be number at Aug at partner : " +
                    i.Partner_Account_Name
                );
              } else if (i.Aug_Amount < 0) {
                errorJson.push(
                  "There should not be negative number for Aug month at partner : " +
                    i.Partner_Account_Name
                );
              }
            }
            if (i.Sep_Amount) {
              if (isNaN(i.Sep_Amount)) {
                errorJson.push(
                  "There should be number at Sep at partner : " +
                    i.Partner_Account_Name
                );
              } else if (i.Sep_Amount < 0) {
                errorJson.push(
                  "There should not be negative number for Sep month at partner : " +
                    i.Partner_Account_Name
                );
              }
            }
            if (i.Oct_Amount) {
              if (isNaN(i.Oct_Amount)) {
                errorJson.push(
                  "There should be number at Oct at partner : " +
                    i.Partner_Account_Name
                );
              } else if (i.Oct_Amount < 0) {
                errorJson.push(
                  "There should not be negative number for Oct month at partner : " +
                    i.Partner_Account_Name
                );
              }
            }
            if (i.Nov_Amount) {
              if (isNaN(i.Nov_Amount)) {
                errorJson.push(
                  "There should be number at Nov at partner : " +
                    i.Partner_Account_Name
                );
              } else if (i.Nov_Amount < 0) {
                errorJson.push(
                  "There should not be negative number for Nov month at partner : " +
                    i.Partner_Account_Name
                );
              }
            }
            if (i.Dec_Amount) {
              if (isNaN(i.Dec_Amount)) {
                errorJson.push(
                  "There should be number at Dec at partner : " +
                    i.Partner_Account_Name
                );
              } else if (i.Dec_Amount < 0) {
                errorJson.push(
                  "There should not be negative number for Dec month at partner : " +
                    i.Partner_Account_Name
                );
              }
            }
          });

          const currentYear = new Date().getFullYear();
          json.forEach((rowNode) => {
            if (
              rowNode.Year != currentYear &&
              rowNode.Year !== "" &&
              rowNode.Year !== undefined &&
              rowNode.Year !== null
            ) {
              errorJson.push(
                `Invalid year value. Please enter the current year for partner: ${rowNode["Partner_Account_Name"]}`
              );
              return;
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
            let q2Values = getCurrentQuarterForPostAPI();
            let lowerCaseMonths = [];
            q2Values.forEach((element) => {
              lowerCaseMonths.push(element.toLowerCase());
            });
            let isEverythingOkay = true;
            if(savedData.length != json.length){
              isEverythingOkay = false;
            } else {
            }
            savedData.forEach(oldData => {
             let getTHings =  json.filter((e) => e.Partner_id == oldData.Partner_id );
             if(getTHings.length){
             } else {
              isEverythingOkay = false;
             }
            });
            if(isEverythingOkay){
            // //iterate in the grid
            json.forEach((rowNode, index) => {
              let seriousData =  savedData.filter((e) =>e.Partner_id == rowNode.Partner_id)
              let seriousDataForMonths = seriousData[0].SeriousData.months;
              let approvalStatus =0;
              //api to save data
              let monthArray = [];
              //12 months loop
              allCalMonths.forEach((element) => {
                let abcData =  seriousDataForMonths.filter((e) =>e.month_val == element.toLowerCase());

                if (rowNode[`${element}_Amount`] >= 0) {
                  if (rowNode[`${element}_Amount`] !== "") {
                    if(rowNode[`${element}_Amount`] == abcData[0].sellout_local_currency) {
                      approvalStatus = abcData[0].approval_status
                    } else {
                      approvalStatus = 0;
                    }
                    let amountRounded = String(rowNode[`${element}_Amount`]);
                    monthArray.push({
                      month: element.toLowerCase(),
                      sellout_local_currency:
                        parseFloat(amountRounded).toFixed(),
                      trans_type:
                        rowNode[`${element}_Estimated`] == true ? "EST" : "ACT",
                        approval_status: approvalStatus
                    });
                  }
                }
              });

              let formatPayload = {
                partner_id: rowNode.Partner_id,
                partner_name: rowNode.Partner_Account_Name,
                country_code: rowNode.Country_code,
                year_val: String(rowNode.Year),
                months: monthArray,
                trans_currency_code: rowNode.Currency_Of_Reporting,
                created_by: userDetails.loginUser,
                modified_by: userDetails.loginUser, //login user
                created_date: getAPIDateFormatWithTime(
                  new Date().toUTCString()
                ),
                approval_status: "0",
                editor_comment: "",
                comments: "",
                batch_upload_flag: "true",
                approved_date: rowNode.approved_date?rowNode.approved_date:null,
                CURRENT_QUARTER_MONTHS: lowerCaseMonths,
                opening_date: openingDate,
                closing_date: closingDate,
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
                setTimeout(
                  () => navigate(`/dataReview?role=${userRole}`),
                  3000
                );
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
          } else {
            setShowErrorModal(true);
            setShowSuccessModal(false);
            setShowShouldUpdModal(false);
          }
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
    ["Overall guidance "],
    [
      "This template is to upload sell out value for the past 6 months and categorize whether the sell out values are estimates or actual values. ",
    ],
    [
      "You can upload several batches of data via the batch method. If sellout values are already in the system, you will overwrite them when loading a new value for these partners and months.",
    ],

    [" Do and don't on the sellout value columns "],
    ["The sell out value columns are named (Jan_Amount, Feb_Amount…). "],
    [
      "You need to input sell out value only (not sell in). Please see the training guide on how to calculate the sell out value. ",
    ],
    [
      "Only the last 6 months sell out value can be updated. Previous year will be closed after December reporting period happening in January Y+1. To update previous periods, please liaise with the Admin Team and your Super User.  ",
    ],
    [
      "The input is done in Kilo (with 2 decimals maximum if needed) and in currency of reporting (mentioned in the template under the “Currency_Of_Reporting”). ",
    ],
    [
      "When downloading the template, you will see the current sell out value in the system. If you input a different sell out value in the template, it will be loaded into the system, and will replace the existing sell out value. ",
    ],
    [
      "If you input a “0”, the existing value in the system will be replaced by a 0. ",
    ],
    [
      "If you leave the cell empty/ blank, then the existing value in the system will remain (no update). ",
    ],

    ["Do and don't on the “estimated” columns "],
    [
      "You can use this template to define whether the sell out value is a estimate or the actual value (you might have to estimate the sell out value while waiting actual values from the partner). ",
    ],
    ["The “estimated” columns are named (Jan_Estimated, Feb_Estimated…). "],
    [
      "Please write “TRUE” if sellout is estimated, “FALSE” if sellout is actual ",
    ],
    [
      "Leaving the cell empty/ blank will populate the field as “actual”. You can always change that later in the application ",
    ],

    ["Do and don't on the partner account details "],
    [
      "Don't change/ add/ remove partner account details in this template. The application will not recognize any changes, which will lead to an upload error. ",
    ],
    [
      "If you need to update partner details (partner account name, status, currency of reporting), please go to the partner account section. ",
    ],
  ];

  const getExactData = (index, amount) => {
    let today = new Date();
    let month = today.getMonth();
    if (index < month) {
    } else {
      amount = "";
    }
    return amount;
  };

  const exportToExcel = async () => {
    let exportExcelData = [];
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

    workbook.Sheets["Read Me"]["A1"].s = {
      font: { bold: true, color: { rgb: "000000" } },
      alignment: { horizontal: "center" },
    };
    workbook.Sheets["Read Me"]["A4"].s = {
      font: { bold: true, color: { rgb: "000000" } },
    };
    workbook.Sheets["Read Me"]["A12"].s = {
      font: { bold: true, color: { rgb: "000000" } },
    };
    workbook.Sheets["Read Me"]["A17"].s = {
      font: { bold: true, color: { rgb: "000000" } },
    };
    sheet1["!cols"] = [{ wch: 200 }];

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
                    <Button
                      className={
                        shouldDisableSaveButton
                          ? "btn-upload active-button"
                          : "btn-upload save-header"
                      }
                      type="submit"
                      disabled={shouldDisableSaveButton}
                    >
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

export default connect(null, { retrieveAllData, createData })(
  BatchInputComponent
);
