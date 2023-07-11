"use strict";
import CancelMoodal from "../modal/cancelModal";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Button, Row, Col, Container, Form, Breadcrumb } from "react-bootstrap";
import { allCalMonths, roles, user_login_info } from "../constant";
import "./parentInput.component.css";
import BatchInputComponent from "./batchInput.component";
import MyMenu from "../menu/menu.component.js";
import "ag-grid-enterprise";
import active from "../../images/active.png";
import closed from "../../images/closed.png";
import updated from "../../images/updated.png";
import rejected from "../../images/rejected.png";
import Home from "../../images/home-icon.png";
import AlertModal from "../modal/alertModel";
import { useLocation } from "react-router-dom";
import {
  createData,
  retrieveAllData,
  updateSellOutData,
} from "../../actions/dataInputAction";
import { retrievePartnerByRole } from "../../actions/partneraction";
import { connect } from "react-redux";
import {
  getAPIDateFormatWithTime,
  getUIDateFormat,
  getUIDateFormatWithTime,
} from "../../helper/helper";
import { retrieveInputCalenderData } from "../../actions/inputCalenderAction";
function DataInputComponent(props) {
  const navigate = useNavigate();

  //sso login func
  const [userEmail, setUserEmail] = useState("");
  const [userRoleData, setuserRoleData] = useState("");

  useEffect(() => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    //if user not login then redirect to login page
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setuserRoleData(usrDetails.role_id);

      if (usrDetails.role_id === roles.editor.toUpperCase() ||
          usrDetails.role_id === roles.backup_editor.toUpperCase()) {
        console.log("input screen for editor role");
      } else {
        navigate("/");
      }
    }
  }, []);
  //------------------//
  const [showModal, setShowModal] = useState(false);

  const [shouldDisableSaveButton, setShouldDisableSaveButton] = useState(false);

  const [rowData, setRowData] = useState(null);

  const location = useLocation();
  const userRole = new URLSearchParams(location.search).get("role");

	const handleShowModal = () => {
		setShowModal(true);
	}

	const handleCloseModal = () => {
		setShowModal(false);
	}

	const handleConfirmModal = () => {
		handleNavigation(userRole);
	}

  const monthsOfTheYear = [
    "Jan",

    "Feb",

    "Mar",

    "Apr",

    "May",

    "Jun",

    "Jul",

    "Aug",

    "Sep",

    "Oct",

    "Nov",

    "Dec",
  ];

  const filterGlobalData = {
    loginUser: userEmail,
    currentYear: String(new Date().getFullYear()),
    userRole: userRole,
  };

  const handleClearClick = () => {
    window.location.reload();
  };

  const [showShouldUpdModal, setShowShouldUpdModal] = useState(false);

  const [isGridValChg, setGridValChg] = useState(false);

  const handleCloseShouldUpdModal = () => {
    setShowShouldUpdModal(false);
  };

  const shouldUpdateMsg = {
    headerLabel: "Warning....",
    variant: "warning",
    header: "Do you wish to update the existing data!!",
    content: [
      "Your previous data would be lost if you update it with new data",
    ],
  };

  const handleSave = (e) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = String(currentDate.getFullYear()).slice(-2);
    if (isGridValChg) {
      setShowShouldUpdModal(true);
      return;
    }

    //post data

    postData();
  };

  const [fileError, setFileError] = useState([]);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const successmsg = {
    headerLabel: "Success....",

    variant: "success",

    header: "Data has been saved successfully!!",

    content: [],
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const errormsg = {
    headerLabel: "Error....",

    variant: "danger",

    header: "There are errors while processing",

    content: [],
  };

  const postData = useCallback(() => {
	  
	const usrDetails = JSON.parse(localStorage.getItem(user_login_info));

    //if user not login then redirect to login page

    if (usrDetails) {

      setUserEmail(usrDetails.email_id);

      setuserRoleData(usrDetails.role_id);

    }  
	  
	  
    setShowShouldUpdModal(false);

    let payload = [];

    //iterate in the grid

    gridRef.current.api.forEachNode((rowNode, index) => {
      //api to save data

      let monthArray = [];

      allCalMonths.forEach((element) => {
        let amount = rowNode.data[`${element}_Amount`];

        console.log("amount::", amount);

        if (amount) {
        } else {
          amount = 0;
        }

        if (rowNode.data[`${element}_Amount`] > 0) {
          monthArray.push({
            month: element.toLowerCase(),
            sellout_local_currency: String(amount),
            trans_type:
              rowNode.data[`${element}_Estimated`] == true ? "EST" : "ACT",
          });
        }
      });
      let currentYear = String(currentDate.getFullYear());
      let formatPayload = {
        partner_id: rowNode.data.id,
        partner_name: rowNode.data.Partner_Account_Name,
        country_code: rowNode.data.Country_code,
        year_val: rowNode.data.Year ? String(rowNode.data.Year) : currentYear,
        months: monthArray,
        trans_currency_code: rowNode.data.Currency_Of_Reporting,
        created_by: usrDetails.email_id,
        created_date: getAPIDateFormatWithTime(new Date().toUTCString()),
        approval_status: "0",
        editor_comment: rowNode.data.Comment,
        comments: "waiting for approver",
        batch_upload_flag: rowNode.data.batch_upload_flag,
        approved_date: new Date().toISOString().replace("T", " ").slice(0, -5),
      };

      if (formatPayload.months.length > 0) {
        payload.push(formatPayload);
      }
    });

    props
      .updateSellOutData(payload)
      .then((data) => {
        setFileError([]);
        setShowErrorModal(false);
        setShowSuccessModal(true);
        setShowShouldUpdModal(false);
      })

      .catch((e) => {
        setFileError([]);
        setShowErrorModal(true);
        setShowSuccessModal(false);
        setShowShouldUpdModal(false);
      });

    // })

    gridRef.current.api.refreshCells();
  }, []);

  const gridRef = useRef(null);

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
      minWidth: 70, suppressMenu: true, suppressSizeToFit: true, width: 70,
    },

    {
      headerName: "Country",

      field: "Country",

      sortable: true,

      filter: true,

      pinned: "left",

      suppressNavigable: true,

      suppressSizeToFit: true,

      cellClass: "no-border",

      editable: false,
    },

    {
      field: "Country_code",

      hide: true,
    },

    {
      headerName: "Partner Account Name",

      field: "Partner_Account_Name",

      sortable: true,

      filter: true,

      pinned: "left",

      suppressSizeToFit: true,

      editable: false,
      minWidth: 180, suppressMenu: true, suppressSizeToFit: true, width: 180,
    },

    {
      field: "partner_id",

      hide: true,
    },

    {
      field: "approval_status",

      hide: true,
    },

    {
      field: "approved_by",

      hide: true,
    },

    {
      field: "approved_date",

      hide: true,
    },

    {
      headerName: "Model",

      field: "Model",

      sortable: true,

      filter: true,

      pinned: "left",

      suppressSizeToFit: true,

      editable: false,
    },

    {
      headerName: "Currency of Reporting",

      field: "Currency_Of_Reporting",

      editable: false,

      pinned: "left",

      suppressMenu: true,
    },

    {
      headerName: "Status",

      field: "Status",

      pinned: "left",

      editable: false,

      suppressMenu: true,

      cellRenderer: (params) => {
        const Status = params.value;
        return (
          <div>
            {Status === "ACTIVE" && (
              <img src={active} alt="active" style={{ width: "80px" }} />
            )}
            {Status === "ClOSED" && (
              <img src={closed} alt="closed" style={{ width: "80px" }} />
            )}
			      {Status === "REJECT" && (
              <img src={rejected} alt="rejected" style={{ width: "80px" }} />
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

      minWidth: 100, suppressMenu: true, suppressSizeToFit: true, width: 100,

      suppressSizeToFit: true,

      sortable: true,

      filter: true,
    }),

    []
  );

  //fn set is estimated

  const fnSetIsEstimated = (params, monthField) => {
    let monthYrKey = monthField.replace("_Amount", "") + "_Estimated";

    var filterMonths = Object.keys(params.data)

      .filter((key) => [monthYrKey].includes(key))

      .reduce((obj, key) => {
        obj[key] = params.data[key];

        return obj;
      }, {});

    var isEstimated = filterMonths[monthYrKey] == true;

    if (isEstimated == true) return { backgroundColor: "#EEB265" };

    return { backgroundColor: "white", borderColor: "#e2e2e2"};
  };

  const currentDate = new Date();

  const currentMonth = currentDate.getMonth();

  const currentYear = String(currentDate.getFullYear()).slice(-2);

  for (let i = 6; i > 0; i--) {
    let date = new Date(
      currentDate.getFullYear(),

      currentDate.getMonth() - i,

      1
    );

    const monthName = allCalMonths[date.getMonth()];

    const year = String(date.getFullYear()).slice(-2);

    const monthHeader = monthName + " " + year;

    const monthField = monthName + "_Amount";

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

            field: "Comment",

            editable: true,

            singleClickEdit: true,

            minWidth: 300,

            suppressMenu: true,
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

          suppressMenu: true,
        });
  }

  // callback tells the grid to use the 'id' attribute for IDs, IDs should always be strings

  const getRowId = useMemo(() => {
    return (params) => {
      return params.data.id;
    };
  }, []);

  const toggleActualEstimate = useCallback((isEstimate) => {
    const selectedCells = gridRef.current.api.getCellRanges();

    const itemsToUpdate = [];

    selectedCells.forEach((currRow) => {
      //row level loop

      currRow.columns.forEach((currCol) => {
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
                  case "Jan_Amount":
                    data.Jan_Estimated = isEstimate;

                    break;

                  case "Feb_Amount":
                    data.Feb_Estimated = isEstimate;

                    break;

                  case "Mar_Amount":
                    data.Mar_Estimated = isEstimate;

                    break;

                  case "Apr_Amount":
                    data.Apr_Estimated = isEstimate;

                    break;

                  case "May_Amount":
                    data.May_Estimated = isEstimate;

                    break;

                  case "Jun_Amount":
                    data.Jun_Estimated = isEstimate;

                    break;

                  case "Jul_Amount":
                    data.Jul_Estimated = isEstimate;

                    break;

                  case "Aug_Amount":
                    data.Aug_Estimated = isEstimate;

                    break;

                  case "Sep_Amount":
                    data.Sep_Estimated = isEstimate;

                    break;

                  case "Oct_Amount":
                    data.Oct_Estimated = isEstimate;

                    break;

                  case "Oct_Amount":
                    data.Nov_Estimated = isEstimate;

                    break;

                  case "Dec_Amount":
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

  const getMonthVal = (monthArray, month) => {
    let filterData = monthArray.filter(
      (data) => data.month_val.toLowerCase() == month.toLowerCase()
    );

    if (filterData.length > 0 && filterData != undefined) {
      return filterData[0].sellout_local_currency == 0
        ? ""
        : filterData[0].sellout_local_currency;
    } else {
      return "";
    }
  };

  const getTransTypeVal = (monthArray, month) => {
    let filterData = monthArray.filter(
      (data) => data.month_val.toLowerCase() == month.toLowerCase()
    );

    if (filterData.length > 0 && filterData != undefined) {
      return filterData[0].trans_type == "EST" ? true : false;
    } else {
      return false;
    }
  };

  const formatGetPayload = useCallback((data, isManualInput) => {
	  
	const usrDetails = JSON.parse(localStorage.getItem(user_login_info));

    //if user not login then redirect to login page

    if (usrDetails) {

      setUserEmail(usrDetails.email_id);

      setuserRoleData(usrDetails.role_id);
	}
    console.log("formatGetPayload::", data);
    let respPayload = [];

    data.forEach((row, index) => {
      let indvRespPayload = {
        Zone: row.zone_val,
        Country: row.country_name,
        Country_code: row.country_code,
        Partner_Account_Name: row.partner_account_name,
        id: row.partner_id,
        Partner_id: row.partner_id,
        Model: row.model_type,
        Currency_Of_Reporting: row.trans_currency_code,
        Status: row.status,
        Year: row.year_val,
        Jan_Amount: row.months ? getMonthVal(row.months, allCalMonths[0]) : "", // "jan"
        Feb_Amount: row.months ? getMonthVal(row.months, allCalMonths[1]) : "", //"feb"
        Mar_Amount: row.months ? getMonthVal(row.months, allCalMonths[2]) : "", //"march"
        Apr_Amount: row.months ? getMonthVal(row.months, allCalMonths[3]) : "", //"apr"
        May_Amount: row.months ? getMonthVal(row.months, allCalMonths[4]) : "", //may
        Jun_Amount: row.months ? getMonthVal(row.months, allCalMonths[5]) : "", //jun
        Jul_Amount: row.months ? getMonthVal(row.months, allCalMonths[6]) : "", //"jul"
        Aug_Amount: row.months ? getMonthVal(row.months, allCalMonths[7]) : "", //aug
        Sep_Amount: row.months ? getMonthVal(row.months, allCalMonths[8]) : "", //sep
        Oct_Amount: row.months ? getMonthVal(row.months, allCalMonths[9]) : "", //oct
        Nov_Amount: row.months ? getMonthVal(row.months, allCalMonths[10]) : "", //nov
        Dec_Amount: row.months ? getMonthVal(row.months, allCalMonths[11]) : "", //dec
        Jan_Estimated: row.months
          ? getTransTypeVal(row.months, allCalMonths[0])
          : "", //jan
        Feb_Estimated: row.months
          ? getTransTypeVal(row.months, allCalMonths[1])
          : "", //feb
        Mar_Estimated: row.months
          ? getTransTypeVal(row.months, allCalMonths[2])
          : "", //"mar"
        Apr_Estimated: row.months
          ? getTransTypeVal(row.months, allCalMonths[3])
          : "", //"apr"
        May_Estimated: row.months
          ? getTransTypeVal(row.months, allCalMonths[4])
          : "", //may
        Jun_Estimated: row.months
          ? getTransTypeVal(row.months, allCalMonths[5])
          : "", //jun
        Jul_Estimated: row.months
          ? getTransTypeVal(row.months, allCalMonths[6])
          : "", //jul
        Aug_Estimated: row.months
          ? getTransTypeVal(row.months, allCalMonths[7])
          : "", //aug
        Sep_Estimated: row.months
          ? getTransTypeVal(row.months, allCalMonths[8])
          : "", //sep
        Oct_Estimated: row.months
          ? getTransTypeVal(row.months, allCalMonths[9])
          : "", //oct
        Nov_Estimated: row.months
          ? getTransTypeVal(row.months, allCalMonths[10])
          : "", //nov
        Dec_Estimated: row.months
          ? getTransTypeVal(row.months, allCalMonths[11])
          : "", //dec
        created_by: usrDetails.email_id,
        created_date: row.created_date,
        approved_by: row.approved_by,
        approved_date: row.approved_date,
        approval_status: row.approval_status,
        Comment: row.editor_comment,
        comments: row.comments,
        batch_upload_flag: "false",
      };

      respPayload = respPayload.concat(indvRespPayload);
    });

    return respPayload;
  });

  const onGridReady = useCallback((params) => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setuserRoleData(usrDetails.role_id);
    }
    console.log("coming inside parent input component");
    let previousAPIData = [];
    props
      .retrieveAllData(
        usrDetails.email_id,
        filterGlobalData.currentYear,
        usrDetails.role_id
      )
      .then((data) => {
        if (data) {
          previousAPIData = data;
          props
            .retrievePartnerByRole(usrDetails.email_id, usrDetails.role_id)
            .then((data) => {
              console.log("showMeData from next API", data.data);
              let secondArray = [];
              secondArray = data?.data;
              let letsCreateNewCombinedArray = [];
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
              setRowData(formatGetPayload(previousAPIData, true));
            })
            .catch((e) => {
              console.log("Data Input", e);
            });
        } else {
          props
          .retrievePartnerByRole(usrDetails.email_id, usrDetails.role_id)
          .then((data) => {
            console.log("showMeData from next API", data.data);
            let secondArray = [];
            secondArray = data?.data;      
            previousAPIData = previousAPIData.concat(secondArray);
            setRowData(formatGetPayload(previousAPIData, true));
          })
          .catch((e) => {
            console.log("Data Input", e);
          });
        }
      })
      .catch((e) => {
        console.log("Data Input", e);
      });
    let todays = new Date();
    let cMonth = todays.getMonth();
    getPreviousQuarterData(monthsOfTheYear[cMonth]);
  }, []);

  const getPreviousQuarterData = (quarter) => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));

    let today = new Date();
    let year = today.getFullYear();
    props
      .retrieveInputCalenderData(year, quarter, usrDetails.role_id)
      .then((data) => {
        let closingData = data.CLOSING_DATE;
        let openingDate = data.OPENING_DATE;

        let dataOpen = new Date(openingDate);
        var day1 = dataOpen.getDate().toString().padStart(2, "0");
        var month1 = (dataOpen.getMonth() + 1).toString().padStart(2, "0");
        var year1 = dataOpen.getFullYear().toString();
        let openD = month1 + "-" + day1 + "-" + year1;

        let dateCus = new Date(closingData);
        var day = dateCus.getDate().toString().padStart(2, "0");
        var month = (dateCus.getMonth() + 1).toString().padStart(2, "0");
        var year = dateCus.getFullYear().toString();
        let complete = month + "-" + day + "-" + year;
        let today = new Date();
        let datessss =
          parseInt(today.getMonth() + 1) +
          "-" +
          today.getDate() +
          "-" +
          today.getFullYear();
        let tempToday = new Date(datessss);
        let tempClosing = new Date(complete);
        let tempOpen = new Date(openD);
        let tempOpenTime = tempOpen.getTime();

        let tempToDayTime = tempToday.getTime();
        let tempClosingTime = tempClosing.getTime();
        if (tempToDayTime > tempClosingTime || tempToDayTime < tempOpenTime) {
          setShouldDisableSaveButton(true);
        } else {
          setShouldDisableSaveButton(false);
        }
      })
      .catch((e) => {
        console.log("Partner list", e);
      });
  };

  const handleNavigation = () => {
    navigate(`/dataReview?role=${userRole}`);
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

          <BatchInputComponent
            savedData={rowData}
            props={props}
            userDetails={filterGlobalData}
          />
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
            paginationAutoPageSize={true}
            animateRows={true}
            getRowId={getRowId}
            enableRangeSelection={true}
            suppressCopySingleCellRanges={true}
            onGridReady={onGridReady}
            suppressMenuHide={true}
          ></AgGridReact>
        </Row>

        <Row className="mb-3" style={{ float: "right", marginTop: "20px" }}>
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
              className={
                shouldDisableSaveButton
                  ? "btn-upload active-button"
                  : "btn-upload edit-header"
              }
              disabled={shouldDisableSaveButton}
              onClick={() => {
                handleSave();
              }}
            >
              Save
            </Button>

            <AlertModal
              show={showShouldUpdModal}
              handleClose={handleCloseShouldUpdModal}
              body={shouldUpdateMsg}
              handleConfirm={postData}
              button1Label={"Confirm"}
              button2Label={"Cancel"}
            />

            <AlertModal
              show={showErrorModal}
              handleClose={handleCloseErrorModal}
              body={errormsg}
            />
            <AlertModal
              show={showSuccessModal}
              handleClose={handleCloseSuccessModal}
              body={successmsg}
            />
          </Col>
 
		<Col>
            <Button
              className="btn-upload save-header"
              onClick={
                handleShowModal
                // handleNavigation(userRole);
              }
            > Next

            </Button>

            <CancelMoodal
              show={showModal}
              handleClose={handleCloseModal}
              handleConfirm={handleConfirmModal}
              body={"Make sure that values are saved, before navigating to the next page"}
              button1={"Cancel"}
              button2={"Confirm"}
            />
          </Col>
 
 
        </Row>
      </Container>
    </>
  );
}

export default connect(null, {
  createData,
  retrieveAllData,
  updateSellOutData,
  retrieveInputCalenderData,
  retrievePartnerByRole,
})(DataInputComponent);
