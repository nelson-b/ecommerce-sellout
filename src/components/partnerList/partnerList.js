"use strict";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Button, Row, Col, Container, Breadcrumb } from "react-bootstrap";
import MyMenu from "../menu/menu.component.js";
import { AgGridReact } from "ag-grid-react";
import active from "../../images/active.png";
import closed from "../../images/closed.png";
import Pending from "../../images/pending.png";
import updated from "../../images/updated.png";
import rejected from "../../images/rejected.png";
import partnerEdit from "../../images/edit-icon.png";
import Home from "../../images/home-icon.png";
import "../partnerList/partnerList.css";
import {
  retrievePartnerByRole,
  retrieveUserRoleConfigByEmailIdRoleId,
} from "../../actions/partneraction";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUIDateFormat } from "../../helper/helper.js";
import { roles, user_login_info } from "../constant.js";

function PartnerList(props) {
  const navigate = useNavigate();

  //sso login func
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setUserRole(usrDetails.role_id);
    }
  }, []);
  //------------------//

  const [rowData, setRowData] = useState();
  const location = useLocation();

  const handlePartnerEdit = (params) => {
    if (
      userRole == roles.supervisor.toUpperCase() ||
      userRole == roles.admin.toUpperCase() ||
      userRole == roles.supervisor_approv_1_2.toUpperCase()
    ) {
      navigate(
        `/higerLevelUser/partner/update?id=${params.data.partner_id}&role=${userRole}`
      );
    } else {
      navigate(`/partner/update?id=${params.data.partner_id}&role=${userRole}`);
    }
  };

  const handleCreate = () => {
    if (
      userRole == roles.supervisor.toUpperCase() ||
      userRole == roles.admin.toUpperCase() ||
      userRole == roles.supervisor_approv_1_2.toUpperCase()
    ) {
      navigate(`/higerLevelUser/partner/create?role=${userRole}`);
    } else {
      navigate(`/partner/create?role=${userRole}`);
    }
  };

  const handleRequest = () => {
    navigate(`/partner/requestList?role=${userRole}`);
  };

  const columnDefs = [
    {
      headerName: "Edit",
      field: "Edit",
      hide: false,
      editable: false,
      width: 80,
      suppressMenu: true,
      cellRenderer: (params) => {
        const Status = params.value;
        console.log("params data", params);
        return (
          <div>
            <img
              src={partnerEdit}
              alt="partner"
              onClick={(e) => handlePartnerEdit(params)}
              style={{ height: "20px", width: "20px", cursor: "pointer" }}
            />
          </div>
        );
      },
    },
    {
      headerName: "Platform Name",
      field: "platform_name",
      width: 150,
      sortable: true,
      filter: true,
      suppressNavigable: true,
      editable: false,
    },
    {
      headerName: "Partner Account Name",
      field: "partner_account_name",
      width: 250,
      sortable: true,
      filter: true,
      suppressNavigable: true,
      editable: false,
    },
    {
      headerName: "Reseller Name",
      field: "reseller_name",
      width: 170,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "Schneider Electric Entity",
      field: "se_entity",
      width: 150,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "Partner Group",
      field: "partner_group",
      width: 150,
      sortable: true,
      filter: true,
      suppressNavigable: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Partner ID",
      field: "partner_id",
      width: 200,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Status",
      field: "status",
      width: 110,
      editable: false,
      cellRenderer: (params) => {
        const Status = params.value;
        return (
          <div>
            {Status === "ACTIVE" && (
              <img src={active} alt="active" style={{ width: "80px" }} />
            )}
            {Status === "CLOSED" && (
              <img src={closed} alt="closed" style={{ width: "80px" }} />
            )}
            {Status === "REJECT" && (
              <img src={rejected} alt="rejected" style={{ width: "80px" }} />
            )}
            {Status === "EDITED" && (
              <img src={updated} alt="updated" style={{ width: "80px" }} />
            )}
          </div>
        );
      },
    },
    {
      headerName: "Country",
      field: "country_code",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Business Type",
      field: "business_type",
      width: 150,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "E2 Playbook Type",
      field: "e2_playbook_type",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "Activation Date",
      field: "activation_date",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
      valueFormatter: (params) => {
        return getUIDateFormat(params.value, true);
      },
    },
    {
      headerName: "Model Type",
      field: "model_type",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "Currency of Sellout Reporting",
      field: "trans_currency_code",
      width: 170,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "Data Collection Type",
      field: "data_collection_type",
      width: 200,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "BOPP Type",
      field: "bopp_type",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "GTM Type",
      field: "gtm_type",
      width: 100,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "Partner Sellout Margin",
      field: "partner_sellout_margin",
      width: 170,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "Partner URL",
      field: "partner_url",
      width: 200,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "Editor",
      field: "editor",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "Backup Editor",
      field: "backup_editor",
      width: 140,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "Approver 1",
      field: "approve_1",
      width: 180,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "Approver 2",
      field: "approver_2",
      width: 180,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
  ];

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    }),
    []
  );

  const onGridReady = useCallback((params) => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    if (usrDetails) {
      setUserEmail(usrDetails.email_id);
      setUserRole(usrDetails.role_id);
    }
    let filterData = {
      role: usrDetails.role_id,
      userMail: usrDetails.email_id,
    };

    let previousAPIData = [];
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
        previousAPIData = data?.data;
        let tempRole = usrDetails.role_id;
        setRowData(data.data.filter((e) => e.status == "PENDING" || e.status == "EDITED" || e.status == "ACTIVE"));


        if (usrDetails.role_id == roles.supervisor.toUpperCase()) {
          tempRole = "SUPERVISOR";
        }
        if (usrDetails.role_id == roles.supervisor_approv_1_2.toUpperCase()) {
          tempRole = "SUPERVISOR_APPROV_1_2";
        }
        // setRowData(data.data.filter((e) => e.status == "ACTIVE"));
      })

      .catch((e) => {
        setRowData([]);
        console.log("Partner list", e);
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
          ) : userRole == roles.editor.toUpperCase() ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/editor/home">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
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
            </Breadcrumb>
          ) : (
            <div></div>
          )}
        </div>
        <Row>
          <div className="partner-request-header">
            <Col>
              <div className="sell-out-partner-header">
                Sell Out Partner List
              </div>
            </Col>
            {userRole == roles.admin.toUpperCase() ||
            userRole == roles.supervisor.toUpperCase() ||
            userRole == roles.supervisor_approv_1_2.toUpperCase() ? (
              <Col xs="auto" className="partner-container">
                <Button
                  size="md"
                  className="partner-header save-header"
                  onClick={() => {
                    handleRequest(userRole);
                  }}
                >
                  Pending requests
                </Button>
              </Col>
            ) : (
              ""
            )}
            <Col xs="auto" className="partner-container">
              <Button
                size="md"
                className="partner-header save-header"
                onClick={() => {
                  handleCreate(userRole);
                }}
              >
                Create Partner
              </Button>
            </Col>
          </div>
        </Row>
        <>
          <div
            className="ag-theme-alpine ag-grid-table"
            style={{ height: 350, margin: "7px 0px 0px 0px" }}
          >
            <AgGridReact
              className="ag-theme-alpine"
              animateRows="true"
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              enableRangeSelection="true"
              rowSelection="multiple"
              suppressRowClickSelection="true"
              suppressMenuHide={true}
              onGridReady={onGridReady}
            />
          </div>
        </>
      </Container>
    </>
  );
}

export default connect(null, {
  retrievePartnerByRole,
  retrieveUserRoleConfigByEmailIdRoleId,
})(PartnerList);
