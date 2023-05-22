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
import partnerEdit from "../../images/partner-edit.png";
import Home from "../../images/home-icon.png";
import partnerData from "../../data/partnerList.json";
import "../partnerList/partnerList.css";

function PartnerList(props) {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState();

  const handlePartnerEdit = (params) => {
    navigate(`/updatePartner?id=${params.data.partnerID}`);
  };

  const handleCreate = () => {
    navigate("/addPartner");
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
      field: "platformNmae",
      width: 150,
      sortable: true,
      filter: true,
      suppressNavigable: true,
      editable: false,
    },
    {
      headerName: "Partner Account Name",
      field: "PartnerAccount",
      width: 150,
      sortable: true,
      filter: true,
      suppressNavigable: true,
      editable: false,
    },
    {
      headerName: "Reseller Name",
      field: "reseller",
      width: 140,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true
    },
    {
      headerName: "Schneider Electric Entity",
      field: "schneider",
      width: 150,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true
    },
    {
      headerName: "Partner Group",
      field: "partnerGroup",
      width: 150,
      sortable: true,
      filter: true,
      suppressNavigable: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Partner ID",
      field: "partnerID",
      width: 150,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Status",
      field: "Status",
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
          </div>
        );
      },
    },
    {
      headerName: "Country",
      field: "Country",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Business Type",
      field: "BusinessType",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true
    },
    {
      headerName: "E2 Playbook Type",
      field: "playbookType",
      width: 150,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true
    },
    {
      headerName: "Activation Date",
      field: "activation",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true
    },
    {
      headerName: "Model Type",
      field: "ModelType",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true
    },
    {
      headerName: "Currency of Sellout Reporting",
      field: "currency",
      width: 170,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true
    },
    {
      headerName: "Data Collection Type",
      field: "dataCollection",
      width: 150,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true
    },
    {
      headerName: "BOPP Type",
      field: "bopp",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true
    },
    {
      headerName: "GTM Type",
      field: "gtm",
      width: 100,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true
    },
    {
      headerName: "Partner Sellout Margin",
      field: "partnerMargin",
      width: 170,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true
    },
    {
      headerName: "Partner URL",
      field: "partnerURL",
      width: 170,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true
    },
    {
      headerName: "Editor",
      field: "editor",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true
    },
    {
      headerName: "Backup Editor",
      field: "backup",
      width: 140,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true
    },
    {
      headerName: "Approver 1",
      field: "Approver1",
      width: 180,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true
    },
    {
      headerName: "Approver 2",
      field: "Approver2",
      width: 180,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
      suppressMenu: true
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

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu />
        </Row>
        <div>
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <img
                src={Home}
                alt="home"
                style={{ height: "20px", width: "80px", cursor: "pointer" }}
              />
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Row>
          <Col>
            <div className="sell-out-partner-header">Sell Out Partner List</div>
          </Col>
          <Col md={2} className="partner-container">
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
        </Row>
        <>
          <div
            className="ag-theme-alpine ag-grid-table"
            style={{ height: 350, margin: "7px 0px 0px 0px" }}
          >
            <AgGridReact
              className="ag-theme-alpine"
              animateRows="true"
              rowData={props.role === "approver" ? partnerData: partnerData }
              columnDefs={props.role === "approver" ? columnDefs: columnDefs }
              defaultColDef={defaultColDef}
              enableRangeSelection="true"
              rowSelection="multiple"
              suppressRowClickSelection="true"
              suppressMenuHide= {true}
            />
          </div>
        </>
      </Container>
    </>
  );
}

export default PartnerList;
