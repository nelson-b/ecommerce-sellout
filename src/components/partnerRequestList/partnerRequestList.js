import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
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

import { month, roles, status, user_login_info } from "../constant";

import MyMenu from "../menu/menu.component.js";

import active from "../../images/active.png";

import closed from "../../images/closed.png";

import Pending from "../../images/pending.png";

import "ag-grid-enterprise";

import "ag-grid-community/styles/ag-grid.css";

import "ag-grid-community/styles/ag-theme-alpine.css";

import partnerRequest from "../../data/partnerRequestList.json";

import Home from "../../images/home-icon.png";

import { useLocation } from "react-router-dom";

import { connect } from "react-redux";

import {
  retrievePartnerByRole,
  updatePartner,
} from "../../actions/partneraction";

function PartnerRequestList(props) {
  const gridRef = useRef();

  const navigate = useNavigate();

  //sso login func
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setuserRole] = useState("");

  useEffect(() => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);

      if (
        usrDetails.role_id === roles.admin.toUpperCase() ||
        usrDetails.role_id === roles.supervisor.toUpperCase() ||
        usrDetails.role_id === roles.supervisor_approv_1_2.toUpperCase()
      ) {
        console.log(
          "Partner request page for role admin/supervisor/supervisor_approv_1_2"
        );
      } else {
        navigate("/");
      }
    }
  }, []);
  //------------------//

  const location = useLocation();
  const [rowData, setRowData] = useState();
  const [message, setMessage] = useState(0);
  const [rowsSelectedForUpdation, setRowsSelectedForUpdation] = useState(0);
  const columnDefs = [
    {
      headerName: "Partner Account Name",
      field: "partner_account_name",
      filter: true,
      pinned: "left",
      width: 220,
      suppressSizeToFit: true,
      editable: false,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },

    {
      headerName: "Partner Group",

      field: "partner_group",

      filter: true,

      width: 150,

      pinned: "left",

      suppressSizeToFit: true,

      editable: false,
    },

    {
      headerName: "Partner ID",

      field: "partner_id",

      filter: true,

      pinned: "left",

      width: 140,

      suppressSizeToFit: true,
    },

    {
      headerName: "Status",

      field: "status",

      pinned: "left",

      width: 120,

      editable: false,

      cellRenderer: (params) => {
        const Status = params.value;

        return (
          <div>
            {Status === "PENDING" && (
              <img src={Pending} alt="Pending" style={{ width: "80px" }} />
            )}
            {Status === "EDITED" && (
              <img src={Pending} alt="Pending" style={{ width: "80px" }} />
            )}
          </div>
        );
      },
    },

    {
      headerName: "Country",

      field: "country_code",

      pinned: "left",

      width: 120,

      sortable: true,

      filter: true,

      suppressSizeToFit: true,

      editable: false,
    },

    {
      headerName: "Business Type",

      field: "business_type",

      minWidth: 120,

      sortable: true,

      filter: true,

      suppressSizeToFit: true,

      editable: false,

      suppressMenu: true,
    },

    {
      headerName: "E2 Playbook Type",

      field: "e2_playbook_type",

      minWidth: 140,

      sortable: true,

      filter: true,

      suppressSizeToFit: true,

      editable: false,

      suppressMenu: true,
    },

    {
      headerName: "Activation Date",

      field: "activation_date",

      minWidth: 120,

      sortable: true,

      filter: true,

      suppressSizeToFit: true,

      editable: false,

      suppressMenu: true,

      valueFormatter: (params) => {
        var date = new Date(params.value);

        var day = date.getDate().toString().padStart(2, "0");

        var month = (date.getMonth() + 1).toString().padStart(2, "0");

        var year = date.getFullYear().toString().substring(2);

        return day + "/" + month + "/" + year;
      },
    },

    {
      headerName: "Model Type",

      field: "model_type",

      minWidth: 120,

      sortable: true,

      filter: true,

      suppressSizeToFit: true,

      editable: false,

      suppressMenu: true,
    },

    {
      headerName: "Currency of Sellout Reporting",

      field: "trans_currency_code",

      minWidth: 170,

      sortable: true,

      filter: true,

      suppressSizeToFit: true,

      editable: false,

      suppressMenu: true,
    },

    {
      headerName: "Data Collection Type",

      field: "data_collection_type",

      minWidth: 150,

      sortable: true,

      filter: true,

      suppressSizeToFit: true,

      editable: false,

      suppressMenu: true,
    },

    {
      headerName: "BOPP Type",

      field: "bopp_type",

      minWidth: 120,

      sortable: true,

      filter: true,

      suppressSizeToFit: true,

      editable: false,

      suppressMenu: true,
    },

    {
      headerName: "MarketPlace Seller",

      field: "marketplace_seller",

      minWidth: 140,

      sortable: true,

      filter: true,

      suppressSizeToFit: true,

      editable: false,

      suppressMenu: true,
    },

    {
      headerName: "Schneider Electric Entity",

      field: "se_entity",

      minWidth: 150,

      sortable: true,

      filter: true,

      suppressSizeToFit: true,

      editable: false,

      suppressMenu: true,
    },

    {
      headerName: "GTM Type",

      field: "gtm_type",

      minWidth: 100,

      sortable: true,

      filter: true,

      suppressSizeToFit: true,

      editable: false,

      suppressMenu: true,
    },

    {
      headerName: "Partner Sellout Margin",

      field: "partner_sellout_margin",

      minWidth: 170,

      sortable: true,

      filter: true,

      suppressSizeToFit: true,

      editable: false,

      suppressMenu: true,
    },

    {
      headerName: "Partner URL",

      field: "partner_url",

      minWidth: 170,

      sortable: true,

      filter: true,

      suppressSizeToFit: true,

      editable: false,

      suppressMenu: true,
    },

    {
      headerName: "Editor",

      field: "created_by",

      minWidth: 120,

      sortable: true,

      filter: true,

      suppressSizeToFit: true,

      editable: false,

      suppressMenu: true,
    },

    {
      headerName: "Backup Editor",

      field: "",

      minWidth: 140,

      sortable: true,

      filter: true,

      suppressSizeToFit: true,

      editable: false,

      suppressMenu: true,
    },

    {
      headerName: "Approver 1",

      field: "Approver1",

      minWidth: 180,

      sortable: true,

      filter: true,

      suppressSizeToFit: true,

      editable: false,

      suppressMenu: true,
    },

    {
      headerName: "Approver 2",

      field: "Approver2",

      minWidth: 180,

      sortable: true,

      filter: true,

      suppressSizeToFit: true,

      editable: false,

      suppressMenu: true,
    },
  ];

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
    setRowsSelectedForUpdation(params.api.getSelectedRows());
    const selectedRows = params.api.getSelectedRows();
    setMessage(selectedRows?.length);
  };

  const retReqData = (data, status) => {
    let formatData = {
      partner_id: data.partner_id,
      platform_name: data.platform_name,
      country_code: data.country_code,
      partner_group: data.partner_group,
      se_entity: data.se_entity,
      reseller_name: data.reseller_name,
      partner_account_name: data.partner_account_name,
      activation_date: data.activation_date,
      deactivation_date: data.deactivation_date,
      deactivation_reason: data.deactivation_reason,
      business_type: data.business_type,
      model_type: data.model_type,
      trans_currency_code: data.trans_currency_code,
      data_collection_type: data.data_collection_type,
      partner_sellout_margin: data.partner_sellout_margin,
      partner_url: data.partner_url,
      e2_playbook_type: data.e2_playbook_type,
      bopp_type: data.bopp_type,
      gtm_type: data.gtm_type,
      created_by: data.created_by ? data.created_by : userEmail,
      created_date: new Date().toUTCString(),
      modified_by: userEmail,
      last_modified_date: new Date().toUTCString(),
      status: status,
      batch_upload_flag: false,
      active_flag: "False",
    };
    return formatData;
  };

  const handleReject = () => {
    const selectedRows = rowsSelectedForUpdation;
    if (selectedRows.length) {
      selectedRows.forEach((data) => {
        let reqData = retReqData(data, status.reject);

        props
          .updatePartner(reqData)
          .then((data) => {
            let filterData = {
              role: userRole,
              userMail: userEmail,
            };

            props
              .retrievePartnerByRole(
                userRole == roles.admin.toUpperCase() ||
                  userRole == roles.supervisor.toUpperCase() ||
                  userRole == roles.supervisor_approv_1_2.toUpperCase()
                  ? ""
                  : filterData.userMail,

                userRole == roles.admin.toUpperCase() ||
                  userRole == roles.supervisor.toUpperCase() ||
                  userRole == roles.supervisor_approv_1_2.toUpperCase()
                  ? ""
                  : filterData.role
              )
              .then((data) => {
                setRowData(data.data.filter((e) => e.status == "PENDING" || e.status == "EDITED"));
              })
              .catch((e) => {
                console.log(e);
                setRowData([]);
              });
          })

          .catch((e) => {
            console.log("Error", e);
          });
      });
      setMessage(0);
    }
  };

  const handleApprove = () => {
    const selectedRows = rowsSelectedForUpdation;

    if (selectedRows.length) {
      selectedRows.forEach((data) => {
        let reqData = retReqData(data, status.active);
        props
          .updatePartner(reqData)
          .then((data) => {
            let filterData = {
              role: userRole,
              userMail: userEmail,
            };

            props
              .retrievePartnerByRole(
                userRole == roles.admin.toUpperCase() ||
                  userRole == roles.supervisor.toUpperCase() ||
                  userRole == roles.supervisor_approv_1_2.toUpperCase()
                  ? ""
                  : filterData.userMail,

                userRole == roles.admin.toUpperCase() ||
                  userRole == roles.supervisor.toUpperCase() ||
                  userRole == roles.supervisor_approv_1_2.toUpperCase()
                  ? ""
                  : filterData.role
              )

              .then((data) => {
                setRowData(
                  data.data.filter(
                    (e) => e.status == "PENDING" || e.status == "EDITED"
                  )
                );
              })
              .catch((e) => {
                setRowData([]);

                console.log(e);
              });
          })
          .catch((e) => {
            console.log("Error", e);
          });
      });
      setMessage(0);
    }
  };

  const onGridReady = useCallback((params) => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setuserRole(usrDetails.role_id);
    }
    let filterData = {
      role: usrDetails.role_id,
      userMail: usrDetails.email_id,
    };
    props
      .retrievePartnerByRole(
        usrDetails.role_id == roles.admin.toUpperCase() ||
          usrDetails.role_id == roles.supervisor.toUpperCase() ||
          usrDetails.role_id == roles.supervisor_approv_1_2.toUpperCase()
          ? ""
          : filterData.userMail,

        usrDetails.role_id == roles.admin.toUpperCase() ||
          usrDetails.role_id == roles.supervisor.toUpperCase() ||
          usrDetails.role_id == roles.supervisor_approv_1_2.toUpperCase()
          ? ""
          : filterData.role
      )

      .then((data) => {
        setRowData(data.data.filter((e) => e.status == "PENDING" || e.status == "EDITED"));
      })

      .catch((e) => {
        console.log(e);
        setRowData([]);
      });
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu />
        </Row>

        <div>
          {userRole == roles.admin.toUpperCase() ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/admin/home">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>

              <span style={{ color: "grey" }}> &nbsp;{">"}</span>

              <Breadcrumb.Item active style={{ color: "#000000" }}>
                &nbsp;Partner List
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : userRole == roles.supervisor.toUpperCase() ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/superUser">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>

              <span style={{ color: "grey" }}> &nbsp;{">"}</span>

              <Breadcrumb.Item active style={{ color: "#000000" }}>
                &nbsp;Partner List
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : (
            <Breadcrumb>
              <Breadcrumb.Item href="/superApproverUser/home">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>

              <span style={{ color: "grey" }}> &nbsp;{">"}</span>

              <Breadcrumb.Item active style={{ color: "#000000" }}>
                &nbsp;Partner List
              </Breadcrumb.Item>
            </Breadcrumb>
          )}
        </div>

        <div className="sell-out-request-header">
          Sell Out Partner Request List
        </div>

        <Row
          className="ag-theme-alpine ag-grid-table"
          style={{ height: 400, marginTop: "10px" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            groupHideOpenParents={true}
            animateRows={true}
            onGridReady={onGridReady}
            rowSelection={"multiple"}
            groupSelectsChildren={true}
            suppressMenuHide={true}
            enableRangeSelection={true}
            suppressRowClickSelection={true}
            onSelectionChanged={handleCheckboxClick}
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
                    handleReject();
                  }}
                >
                  Reject
                </Button>
              </Col>

              <Col>
                <Button
                  className="btn-upload save-header"
                  onClick={() => {
                    handleApprove();
                  }}
                >
                  Approve
                </Button>
              </Col>
            </Row>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default connect(null, {
  retrievePartnerByRole,
  updatePartner,
})(PartnerRequestList);
