"use strict";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useCallback, useRef } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import MyMenu from "../menu/menu.component.js";
import { AgGridReact } from "ag-grid-react";
import active from "../../images/active.png";
import closed from "../../images/closed.png";
import partnerEdit from "../../images/partner-edit.png";
import partnerData from "../../data/partnerList.json";
import "../partnerList/partnerList.css";

function PartnerList() {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState();

  const handlePartnerEdit = () => {
    navigate("/updatePartner");
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
      cellRenderer: (params) => {
        const Status = params.value;
        return (
          <div>
            <img
              src={partnerEdit}
              alt="partner"
              onClick={handlePartnerEdit}
              style={{ height: "20px", width: "20px", cursor: "pointer" }}
            />
          </div>
        );
      },
    },
    {
      headerName: "Partner Account Name",
      field: "PartnerAccount",
      width: 120,
      //   cellStyle: { whiteSpace: "normal", lineHeight: "1.2" },
      //   cellRenderer: (params) => {
      //     return (
      //       <div
      //         style={{
      //           whiteSpace: "normal",
      //           lineHeight: "1.2",
      //           overflow: "hidden",
      //           textOverflow: "ellipsis",
      //         }}
      //       >
      //         {params.value}
      //       </div>
      //     );
      //   },
      sortable: true,
      filter: true,
      suppressNavigable: true,
      editable: false,
    },
    {
      headerName: "partner Group",
      field: "partnerGroup",
      width: 120,
      sortable: true,
      filter: true,
      suppressNavigable: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Partner ID",
      field: "partnerID",
      width: 120,
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
    },
    {
      headerName: "E2 Playbook Type",
      field: "playbookType",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Activation Date",
      field: "activation",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Model Type",
      field: "ModelType",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Currency of Sellout Reporting",
      field: "currency",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Data Collection Type",
      field: "dataCollection",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "BOPP Type",
      field: "bopp",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Marketplace Seller",
      field: "marketplace",
      width: 140,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Schneider Electric Entity",
      field: "schneider",
      width: 130,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "GTM Type",
      field: "gtm",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Partner Sellout Margin",
      field: "partnerMargin",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Partner URL",
      field: "partnerURL",
      width: 170,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Editor",
      field: "editor",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Backup Editor",
      field: "backup",
      width: 120,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Approver 1",
      field: "Approver1",
      width: 180,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
    {
      headerName: "Approver 2",
      field: "Approver2",
      width: 180,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      editable: false,
    },
  ];

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
    }),
    []
  );

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu />
        </Row>
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
              rowData={partnerData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              //   rowHeight={48}
              enableRangeSelection="true"
              rowSelection="multiple"
              suppressRowClickSelection="true"
            />
          </div>
        </>
      </Container>
    </>
  );
}

export default PartnerList;
