import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import {
  Button,
  Row,
  Col,
  Stack,
  ToggleButton,
  ButtonGroup,
  Breadcrumb,
  Container,
} from "react-bootstrap";
import { month, roles, user_login_info } from "../constant";
import MyMenu from "../menu/menu.component.js";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import partnerPrevious from "../../data/partnerPreviousData.json";
import partnerPreviousEuro from "../../data/partnerPreviousDataEuro.json";
import Home from "../../images/home-icon.png";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import AlertModal from "../modal/alertModel";
import {
  getQuarterData,
  createData,
  updateSellOutData,
} from "../../actions/dataInputAction";
import { allCalMonths } from "../constant";

function PartnerQuarterApprover(props) {
  const gridRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  //sso login func
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setuserRole] = useState("");

  const [validateAll, setValidateAll] = useState([]);

  useEffect(() => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    //if user not login then redirect to login page
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);

      if (
        usrDetails.role_id === roles.approve_1.toUpperCase() ||
        usrDetails.role_id === roles.approver_2.toUpperCase() ||
        usrDetails.role_id === roles.supervisor_approv_1_2.toUpperCase()
      ) {
        console.log(
          "previous quarter review for approver for supervisor_approv_1_2, approve_1, approver_2"
        );
      } else {
        navigate("/");
      }
    }
  }, []);
  //------------------//


  const [rowData, setRowData] = useState([]);
  const [radioValue, setRadioValue] = useState("1");
  const [message, setMessage] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const radios = [
    { name: "Reporting Currency", value: "1" },
    { name: "Euro", value: "2" },
  ];

  const handleValidate = (activeData) => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);
    }
    props
      .createData(activeData)
      .then((data) => {
        props
          .getQuarterData(usrDetails.email_id, usrDetails.role_id, year, month)
          .then((data) => {
            setRowData(data);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };
  let rejectData = (data, status1) => {
    let userData = [];
    let monthArray = [];
    monthArray.push({
      month: data.month_impacted,
      sellout_local_currency: data.sellout_approved_val_local_currency,
      trans_type: "",
    });

    userData.push({
      partner_id: data.partner_id[0],
      partner_name: data.partner_account_name,
      country_code: data.country_code,
      year_val: JSON.stringify(new Date().getFullYear()),
      months: monthArray,
      trans_currency_code: "DOL",
      created_by: data.created_by?data.created_by:userEmail,
      created_date: new Date().toISOString().replace("T", " ").slice(0, -5),
      approval_status:
        status1 == "REJECT"
          ? "3"
          : userRole == roles.approve_1.toUpperCase()
          ? "1"
          : userRole == roles.approver_2.toUpperCase()
          ? "2"
          : "5",

      editor_comment: data.editor_comment,
      comments: "waiting for approver",
      batch_upload_flag: "false",
    });
    return userData;
  };

  const ChildMessageRenderer = (props) => {
    const invokeReject = () => {
      let reqData = rejectData(
        rowData.find(
          (e) => e.partner_account_name == props.data.partner_account_name
        ),
        "REJECT"
      );

      handleValidate(reqData);
    };
    const invokeValidate = () => {
      let reqData = rejectData(
        rowData.find(
          (e) => e.partner_account_name == props.data.partner_account_name
        ),
        "VALIDATE"
      );
      handleValidate(reqData);
    };

    return (
      <div>
        <div>
          {props.data.editor_comment}
          <Button
            style={{
              height: 30,
              width: 100,
              lineHeight: 0.5,
              margin: "0px 0px 5px 50px",
            }}
            onClick={invokeReject}
            className="cancel-header btn-reject"
          >
            Reject
          </Button>
          <Button
            style={{
              height: 30,
              width: 100,
              lineHeight: 0.5,
              margin: " 0px 10px 5px 20px",
            }}
            onClick={invokeValidate}
            className="save-header btn-reject"
          >
            Validate
          </Button>
        </div>
      </div>
    );
  };

  const CustomHeader = ({ displayName, radioValue }) => {
    const unit = radioValue === "1" ? "K" : "K\u20AC";

    return (
      <div>
        <span style={{ fontSize: "13px" }}>
          {displayName} (in {unit})
        </span>
      </div>
    );
  };

  const columnDefs = [
    {
      field: "zone_val",
      headerName: "Zone",
      filter: true,
      width: 140,
      pinned: "left",
      suppressSizeToFit: true,

      editable: false,

      headerCheckboxSelection: true,

      checkboxSelection: true,

      showDisabledCheckboxes: true,
    },

    {
      headerName: "Country",

      field: "country_code",

      filter: true,

      width: 140,

      pinned: "left",

      suppressSizeToFit: true,

      editable: false,
    },

    {
      headerName: "Partner Account Name",

      field: "partner_account_name",

      filter: true,

      pinned: "left",

      width: 170,

      suppressSizeToFit: true,
    },

    {
      headerName: "Month Impacted",

      field: "month_impacted",

      pinned: "left",

      width: 140,

      editable: false,
    },

    {
      headerName: "Sellout value Approved",

      headerComponentFramework: CustomHeader,

      headerComponentParams: {
        displayName: "Sellout value Approved",

        radioValue,
      },

      field:
        radioValue == 1
          ? "sellout_approved_val_local_currency"
          : "sellout_approved_val_in_KE",

      editable: false,

      minWidth: 150,

      wrapHeaderText: true,

      sortable: true,

      suppressMenu: true,

      cellStyle: { "border-color": "#e2e2e2" },
    },

    {
      headerName: "New value",

      headerComponentFramework: CustomHeader,

      headerComponentParams: {
        displayName: "New value",

        radioValue,
      },

      field:
        radioValue == 1 ? "new_value_in_local_currency" : "new_value_in_KE",

      editable: false,

      minWidth: 100,

      wrapHeaderText: true,

      sortable: true,

      suppressMenu: true,

      cellStyle: { "border-color": "#e2e2e2" },
    },

    {
      headerName: "Change in Value",

      field: "changeValue",

      minWidth: 90,

      editable: false,

      wrapHeaderText: true,

      sortable: true,

      suppressMenu: true,

      cellStyle: { "border-color": "#e2e2e2" },
    },

    {
      headerName: "Change In %",

      field: "change_per",

      minWidth: 90,

      editable: false,

      wrapHeaderText: true,

      sortable: true,

      suppressMenu: true,

      cellStyle: { "border-color": "#e2e2e2" },
    },

    {
      headerName: "Modified By",

      field: "userChange",

      editable: false,

      minWidth: 140,

      wrapHeaderText: true,

      sortable: true,

      suppressMenu: true,

      cellStyle: { "border-color": "#e2e2e2" },
    },

    {
      headerName: "Editors Comments",

      field: "editor_comment",

      minWidth: 600,

      maxWidth: 600,

      flex: 5,

      editable: false,

      wrapHeaderText: true,

      sortable: true,

      suppressMenu: true,

      cellRenderer: ChildMessageRenderer,

      cellStyle: { "border-color": "#e2e2e2" },
    },
  ];

  let year = new Date().getFullYear();
  const quarters = {
    Q1: ["jan", "feb", "mar"],
    Q2: ["apr", "may", "jun"],
    Q3: ["jul", "aug", "aep"],
    Q4: ["oct", "nov", "dec"],
  };

  let dateSample = new Date().getMonth();
  let currentQuarter = 1;
  let previousPreviousQuarter = "Q!";
  if (dateSample <= 3) {
    currentQuarter = 1;
  } else if (dateSample <= 6 && dateSample > 3) {
    currentQuarter = 2;
  } else if (dateSample <= 9 && dateSample > 6) {
    currentQuarter = 3;
  } else {
    currentQuarter = 4;
  }

  if (currentQuarter == 1) {
    previousPreviousQuarter = "Q1";
  } else {
    previousPreviousQuarter = currentQuarter - 1;
  }
  let arrayOfPrevPreviousQuarter = quarters["Q" + previousPreviousQuarter];
  const month = arrayOfPrevPreviousQuarter;
  const getPreviousData = (userMail, quarterRole, year, month) => {
    props
      .getQuarterData(userMail, quarterRole, year, month)
      .then((data) => {
        setRowData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    //if user not login then redirect to login page
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);
    }
    getPreviousData(usrDetails.email_id, usrDetails.role_id, year, month);

  }, []);

  const defaultColDef = useMemo(() => {
    return {
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClassRules: {
        greenBackground: (params) => {
          return params.node.footer;
        },
      },
      flex: 1,
      resizable: true,
      filter: true,
      sortable: true,
      suppressSizeToFit: true,
      suppressMenuHide: true,
    };
  }, []);

  const handleCheckboxClick = (params) => {
    const selectedRows = params.api.getSelectedRows();
    setValidateAll(selectedRows);
    setMessage(selectedRows?.length);
  };

  const handleReviewNavigation = () => {
    if (
      userRole == roles.supervisor_approv_1_2.toUpperCase()
    ) {
      navigate("/superApproverUser/home");
    } else if (userRole == roles.approve_1.toUpperCase()) {
      navigate("/approver_1/home");
    } else {
      navigate("/approver_2/home");
    }
  };

  const handleConfirm = useCallback((data, event) => {
  
     let monthArray = [];
     let reqData = [];
     data?.forEach((e) => {
       monthArray.push({
         month: e.month_impacted,
         sellout_local_currency: e.sellout_approved_val_local_currency,
         trans_type: "",
       });
       reqData.push({
         partner_id: e.partner_id[0],
         partner_name: e.partner_account_name,
         country_code: e.country_code,
         year_val: JSON.stringify(new Date().getFullYear()),
         months: monthArray,
         trans_currency_code: "DOL",
         created_by: e.created_by,
         created_date: new Date().toISOString().replace("T", " ").slice(0, -5),
         approval_status:
           userRole == roles.approve_1.toUpperCase()
             ? "1"
             : userRole == roles.approver_2.toUpperCase()
             ? "2"
             : "5",
         editor_comment: e.editor_comment,
         comments: "waiting for approver",
         batch_upload_flag: "false",
       });
       monthArray = [];
     });
     props
       .createData(reqData)
       .then((data) => {
         // setReviewData(data);
         setShowSuccessModal(true);
       })
       .catch((e) => {
         console.log("Error", e);
       });
   }, []);

  const successmsg = {
    headerLabel: "Success....",
    variant: "success",
    header: "Data has been saved successfully!!",
    content: [],
  };

  const handleCloseSuccessModal = () => {
    getPreviousData(userEmail, userRole, year, month);
    setShowSuccessModal(false);
  };

  const handleInvestigation = (params) => {
    alert(
      message === 1
        ? `${message} Partner Account Sent For Investigation `
        : message > 1
        ? `${message} Partners Account Sent For Investigation `
        : ""
    );
  };

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu />
        </Row>
        <div>
          {userRole == roles.approve_1.toUpperCase() ? (
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
        </div>
        <div>
          <Stack direction="horizontal">
            <div className="sell-out-header">Previous Quarter Data Review</div>
            <div className="mt-0 ms-auto">
              <Row className="currency-mode">CURRENCY MODE</Row>
              <Col>
                <ButtonGroup>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={idx % 2 ? "outline-success" : "outline-success"}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => {
                        setRadioValue(e.currentTarget.value);
                        setMessage(0);
                      }}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Col>
            </div>
          </Stack>
        </div>

        <Row
          className="ag-theme-alpine ag-grid-table"
          style={{ height: 320, marginTop: "10px" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={radioValue == 1 ? rowData : rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            groupHideOpenParents={true}
            animateRows={true}
            // onGridReady={onGridReady}
            rowSelection={"multiple"}
            suppressRowClickSelection={true}
            onSelectionChanged={handleCheckboxClick}
            groupSelectsChildren={true}
            suppressMenuHide={true}
            headerCheckboxSelection={true}
            checkboxSelection={true}
            // onSelectionChanged={handleSelectionChanged}
          ></AgGridReact>
          <div className="checkbox-message">
            {message === 1
              ? `${message} Partner Selected `
              : message > 1
              ? `${message} Partners Selected `
              : ""}
          </div>
          <div>
            <Row className="mb-3" style={{ float: "right", marginTop: "10px" }}>
              <Col xs="auto">
                <Button
                  className="btn-upload cancel-header"
                  onClick={() => {
                    handleReviewNavigation(userRole);
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col xs="auto">
                <Button
                  className="btn-invest edit-header"
                  onClick={(e) => handleInvestigation(message)}
                >
                  Send For Investigation
                </Button>
              </Col>
              <Col>
                <Button
                  className="btn-data save-header"
                  onClick={() => {
                    if (validateAll?.length) {
                      handleConfirm(validateAll);
                    }
                  }}
                >
                  Validate All
                </Button>
                <AlertModal
                  show={showSuccessModal}
                  handleClose={handleCloseSuccessModal}
                  body={successmsg}
                />
              </Col>
            </Row>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default connect(null, {
  getQuarterData,
  createData,
  updateSellOutData,
})(PartnerQuarterApprover);
