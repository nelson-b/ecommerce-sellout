"use strict";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useCallback, useRef } from "react";
import { Button, Row, Col, Container, Breadcrumb } from "react-bootstrap";
import MyMenu from "../menu/menu.component.js";
import { AgGridReact } from "ag-grid-react";
import active from "../../images/active.png";
import closed from "../../images/closed.png";
import Pending from "../../images/pending.png";
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
import { roles } from "../constant.js";

function PartnerList(props) {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState();
  const location = useLocation();
  let screenRole = new URLSearchParams(location.search).get("role");

  const handlePartnerEdit = (params) => {
    if (
      screenRole === "superUser" ||
      screenRole === "admin" ||
      screenRole === "superApproverUser"
    ) {
      navigate(
        `/higerLevelUser/partner/update?id=${params.data.partner_id}&role=${screenRole}`
      );
    } else {
      navigate(
        `/partner/update?id=${params.data.partner_id}&role=${screenRole}`
      );
    }
  };

  const handleCreate = () => {
    if (
      screenRole === "superUser" ||
      screenRole === "admin" ||
      screenRole === "superApproverUser"
    ) {
      navigate(`/higerLevelUser/partner/create?role=${screenRole}`);
    } else {
      navigate(`/partner/create?role=${screenRole}`);
    }
  };

  const handleRequest = () => {
    navigate(`/partner/requestList?role=${screenRole}`);
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
            {/* {Status === "Pending" && (
              <img src={Pending} alt="Pending" style={{ width: "80px" }} />
            )} */}
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
      field: "created_by",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "Backup Editor",
      field: "BACKUP_EDITOR",
      width: 140,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "Approver 1",
      field: "Approver1",
      width: 180,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "Approver 2",
      field: "Approver2",
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

  let userMail = "";

  if (screenRole == "editor") {
    userMail = "nelson@se.com";
  }
  if (screenRole == "superApproverUser") {
    userMail = "thomas@se.com";
  }
  if (screenRole == "admin") {
    userMail = "jean@se.com";
  }
  if (screenRole == "superUser") {
    userMail = "marie@se.com";
  }
  if (screenRole == "approve_1") {
    userMail = "cnchn00073@example.com";
  }
  if (screenRole == "approver_2") {
    userMail = "cnchn00073@example.com";
  }
  // screenRole = (screenRole == "superUser" 
  // ? "SUPERVISOR" 
  // : screenRole == "superApproverUser" 
  // ? "SUPERVISOR_APPROVER_1_2"
  // : screenRole)

  const onGridReady = useCallback((params) => {
    let filterData = {
      role: screenRole,
      userMail: userMail,
    };

    let previousAPIData = [];
    props
      .retrievePartnerByRole(
        screenRole == roles.admin ||
          screenRole == roles.superUser ||
          screenRole == roles.superApproverUser
          ? ""
          : filterData.userMail, 
        screenRole == roles.admin ||
          screenRole == roles.superUser ||
          screenRole == roles.superApproverUser
          ? ""
          : filterData.role
      )
      .then((data) => {
        previousAPIData = data?.data;
        let tempRole = screenRole;

        if (screenRole == "admin") {
          setRowData(previousAPIData);
        }
          
        if(screenRole == roles.superUser) {
          tempRole = 'SUPERVISOR'
        }
        if(screenRole == roles.superApproverUser) {
          tempRole = 'SUPERVISOR_APPROV_1_2'
        }
        debugger;
        if (screenRole != 'admin') {
        props.retrieveUserRoleConfigByEmailIdRoleId(userMail, tempRole)
          .then((data2) => {
            if (data2.length) {
              for (let i = 0; i < previousAPIData.length; i++) {
                data2.map((secondArray) => {
                  if (previousAPIData[i].partner_id == secondArray.PARTNER_ID) {
                    previousAPIData[i].Approver1 = secondArray.APPROVE_1;
                    previousAPIData[i].Approver2 = secondArray.APPROVER_2;
                   debugger;
                    previousAPIData[i].BACKUP_EDITOR =
                      secondArray.BACKUP_EDITOR;

                    previousAPIData[i].EDITOR = secondArray.EDITOR;
                  } else {
                    previousAPIData[i].Approver1 = "";
                    previousAPIData[i].Approver2 = "";
                    previousAPIData[i].BACKUP_EDITOR = "";
                    previousAPIData[i].EDITOR = "";
                  }
                });
              }
              setRowData(previousAPIData.filter((e) => e.status == "ACTIVE"));
            } else {
              setRowData(data.data.filter((e) => e.status == "ACTIVE"));
            }
          })
          .catch((e) => {
            console.log("Partner list", e);
          });
        }
        // setRowData(data.data.filter((e) => e.status == "ACTIVE"));
      })

      .catch((e) => {
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
          {screenRole === "admin" ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/admin/home">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : screenRole === "superApproverUser" ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/superApproverUser/home">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : screenRole === "approve_1" ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/approver_1/home">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : screenRole === "approver_2" ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/approver_2/home">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : screenRole === "editor" ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/editor/home">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : screenRole === "superUser" || screenRole == "SUPERVISOR" ? (
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
            {screenRole === "admin" ||
            screenRole === "superUser" ||
            screenRole === "superApproverUser" ? (
              <Col xs="auto" className="partner-container">
                <Button
                  size="md"
                  className="partner-header save-header"
                  onClick={() => {
                    handleRequest(screenRole);
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
                  handleCreate(screenRole);
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
