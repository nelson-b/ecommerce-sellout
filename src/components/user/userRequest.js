import React, { useCallback, useMemo, useState, useRef } from "react";
import { connect } from "react-redux";
import { sellOutData } from "../../actions/selloutaction";
import MyMenu from "../menu/menu.component.js";
import { Container, Row, Button, Breadcrumb, Modal } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import Home from "../../images/home-icon.png";
import { useLocation } from "react-router-dom";
import userRequestData from "../../data/userRequestData.json";
import { retrieveAllUserListData } from "../../actions/userAction";
import "../home/home.component.css";

function UserRequestComponent(props) {
  const gridRef = useRef();
  const [rowData, setRowData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const location = useLocation();
  const screenRole = new URLSearchParams(location.search).get("role");

  const ChildMessageRenderer = (props) => {
    const invokeReject = () => {
      alert(
        props.data.first_name?.length
          ? `${props.data.first_name} has been rejected `
          : ""
      );
    };
    const invokeApprove = () => {
      alert(
        props.data.first_name?.length
          ? `${props.data.first_name} has been approved`
          : ""
      );
    };

    return (
      <div>
        <Button
          style={{
            height: 30,
            width: 100,
            lineHeight: 0.5,
            margin: "0px 20px 5px 0px",
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
            margin: " 0px 0px 5px 0px",
          }}
          onClick={invokeApprove}
          className="save-header btn-reject"
        >
          Approve
        </Button>
      </div>
    );
  };

  const ModalCellRenderer = (props) => {
    const { showModal, value } = props;
    const handleClick = () => {
      showModal(value);
    };
    return <div onDoubleClick={handleClick}>{value}</div>;
  };

  const columnDefs = [
    { headerName: "Country", field: "Country", minWidth: 170 },
    { headerName: "Model", field: "Model", minWidth: 150 },
    {
      headerName: "Partner Account Name",
      field: "partneraccname",
      minWidth: 250,
    },
    { headerName: "Current Editor", field: "currentEditor", minWidth: 200 },
    {
      headerName: "Current 1st Approver",
      field: "current1stApprover",
      minWidth: 200,
    },
    {
      headerName: "Current 2nd Approver",
      field: "current2ndApprover",
      minWidth: 200,
    },
  ];

  const requestData = [
    {
      Country: "Finland",
      Model: "E1",
      partneraccname: "Partner 1",
      currentEditor: "Editor 1",
      current1stApprover: "Approver 1",
      current2ndApprover: "Approver 2",
    },
    {
      Country: "Japan",
      Model: "E1",
      partneraccname: "Partner 2",
      currentEditor: "Editor 2",
      current1stApprover: "Approver 1",
      current2ndApprover: "Approver 2",
    },
  ];

  const userRequestDef = [
    {
      headerName: "UserName",
      field: "first_name",
      width: 150,
      editable: false,
      cellClassRules: { "cursor-pointer": () => true },
      cellRenderer: "modalCellRenderer",
      cellRendererParams: {
        showModal: (rowData) => handleShowModal(rowData),
      },
    },
    {
      headerName: "User ID",
      field: "email_id",
      width: 100,
    },
    {
      headerName: "Role",
      field: "role_id",
      width: 100,
    },
    {
      headerName: "OPS",
      field: "ops_val",
      width: 100,
    },
    {
      headerName: "Zone",
      field: "zone_val",
      width: 120,
    },
    {
      headerName: "Country",
      field: "country_code",
      width: 120,
    },
    {
      headerName: "Model",
      field: "model_val",
      width: 100,
    },
    {
      headerName: "Action",
      field: "action",
      width: 200,
      minWidth: 200,
      maxWidth: 300,
      flex: 2,
      suppressMenu: true,
      cellRenderer: ChildMessageRenderer,
    },
  ];

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      spanHeaderHeight: true,
      filter: true,
      sortable: true,
      suppressSizeToFit: true,
      suppressMenuHide: true,
    };
  }, []);

  const getRowStyle = (params) => {
    if (params.node.aggData) {
      return { fontWeight: "bold" };
    }
  };

  const onGridReady = useCallback((params) => {
    props
      .retrieveAllUserListData(screenRole)
      .then((data) => {
        setRowData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleShowModal = (rowData) => {
    setShowModal(true);
    setModalData(rowData);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <MyMenu />
        </Row>
        <div>
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
              &nbsp;User List
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className="sell-out-request-header">New User Requests</div>
        <Row
          className="ag-theme-alpine ag-grid-table"
          style={{ height: 350, marginTop: "10px" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={userRequestDef}
            defaultColDef={defaultColDef}
            animateRows={true}
            getRowStyle={getRowStyle}
            onGridReady={onGridReady}
            suppressMenuHide={true}
            frameworkComponents={{ modalCellRenderer: ModalCellRenderer }}
          ></AgGridReact>
        </Row>
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Partner Accounts Associated with {modalData}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="ag-theme-alpine" style={{ height: "200px" }}>
              <AgGridReact
                className="ag-theme-alpine"
                animateRows="true"
                rowData={requestData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-upload save-header"
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default connect(null, { retrieveAllUserListData })(UserRequestComponent);

