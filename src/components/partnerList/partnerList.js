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
import partnerEdit from "../../images/partner-edit.png";
import Home from "../../images/home-icon.png";
import partnerData from "../../data/partnerList.json";
import "../partnerList/partnerList.css";
import { RetrieveAllPartnerData } from "../../actions/partneraction";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

function PartnerList(props) {
  console.log("props", props);
  const navigate = useNavigate();
  const [rowData, setRowData] = useState();
  const location = useLocation();
  const screenRole = new URLSearchParams(location.search).get("id");

  const handlePartnerEdit = (params) => {
    navigate(`/updatePartner?id=${params.data.partnerID}`);
  };

  const handleCreate = () => {
    navigate("/addPartner");
  };

  const handleRequest = () => {
    navigate("/partnerRequestList");
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
      width: 150,
      sortable: true,
      filter: true,
      suppressNavigable: true,
      editable: false,
    },
    {
      headerName: "Reseller Name",
      field: "reseller_name",
      width: 140,
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
      width: 150,
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
            {Status === "Active" && (
              <img src={active} alt="active" style={{ width: "80px" }} />
            )}
            {Status === "Closed" && (
              <img src={closed} alt="closed" style={{ width: "80px" }} />
            )}
            {Status === "Pending" && (
              <img src={Pending} alt="Pending" style={{ width: "80px" }} />
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
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    {
      headerName: "E2 Playbook Type",
      field: "e2_playbook_type",
      width: 150,
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
      width: 150,
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
      width: 170,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true,
    },
    // {
    //   headerName: "Editor",
    //   field: "created_by",
    //   width: 120,
    //   sortable: true,
    //   filter: true,
    //   suppressSizeToFit: true,
    //   editable: false,
    //   suppressMenu: true
    // },
    // {
    //   headerName: "Backup Editor",
    //   field: "created_by",
    //   width: 140,
    //   sortable: true,
    //   filter: true,
    //   suppressSizeToFit: true,
    //   editable: false,
    //   suppressMenu: true
    // },
    // {
    //   headerName: "Approver 1",
    //   field: "Approver1",
    //   width: 180,
    //   sortable: true,
    //   filter: true,
    //   suppressSizeToFit: true,
    //   editable: false,
    //   suppressMenu: true
    // },
    // {
    //   headerName: "Approver 2",
    //   field: "Approver2",
    //   width: 180,
    //   sortable: true,
    //   filter: true,
    //   suppressSizeToFit: true,
    //   editable: false,
    //   suppressMenu: true
    // },
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
    let data = props
      .RetrieveAllPartnerData()
      .then((data) => {
        console.log("RetrieveAllPartnerData", data);
        setRowData(data);
      })
      .catch((e) => {
        console.log(e);
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
              <Breadcrumb.Item href="/adminHome">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : screenRole === "superUser" ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/superUserHome">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : screenRole === "approver" ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/approverHome">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : screenRole === "editor" ? (
            <Breadcrumb>
              <Breadcrumb.Item href="/editorHome">
                <img
                  src={Home}
                  alt="home"
                  style={{ height: "20px", width: "80px", cursor: "pointer" }}
                />
              </Breadcrumb.Item>
            </Breadcrumb>
          ) : (
            ""
          )}
        </div>
        <Row>
          <div className="partner-request-header">
            <Col>
              <div className="sell-out-partner-header">
                Sell Out Partner List
              </div>
            </Col>
            {screenRole === "admin" || screenRole === "superUser" ? (
              <Col xs="auto" className="partner-container">
                <Button
                  size="md"
                  className="partner-header save-header"
                  onClick={() => {
                    handleRequest();
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
                  handleCreate();
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

export default connect(null, { RetrieveAllPartnerData })(PartnerList);
