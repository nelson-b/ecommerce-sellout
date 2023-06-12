import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { Container, Row } from "react-bootstrap";
import { useCallback, useMemo, useRef, useState } from "react";
import { retrieveAllPartnerData } from "../../actions/partneraction";
import { connect } from "react-redux";

function PartnerAccountList(props) {
    const gridRef = useRef();
    console.log('PartnerAccountList',props.data.data);
    const [rowData, setRowData] = useState([]);
    // gridRef.current.api.refreshCells();

    const columnDefs = [
        { headerName: "Partner Account Name", field: "partner_account_name" },
        { headerName: "Country", field: "country_code", minWidth: 100, suppressSizeToFit: true, suppressMenu: true },
        { headerName: "Model", field: "model_type", minWidth: 100, suppressSizeToFit: true, suppressMenu: true },
        // { headerName: "Current Editor", field: "currentEditor" },
        // { headerName: "Current 1st Approver", field: "current1stApprover" },
        // { headerName: "Current 2nd Approver", field: "current2ndApprover" }
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

    const onGridReady = useCallback(() => {
        // let data =[ 
        // {
        //     partner_account_name:"Partner 1",
        //     country_code: "USA",
        //     model_type: "Model 1",
        //     // currentEditor: "Editor 1", 
        //     // current1stApprover: "Approver 1", 
        //     // current2ndApprover: "Approver 2"
        // },
        // {
        //     partner_account_name:"Partner 2",
        //     country_code: "Ireland",
        //     model_type: "Model 2", 
        //     // currentEditor: "Editor 2", 
        //     // current1stApprover: "Approver 1", 
        //     // current2ndApprover: "Approver 2"
        // }];
        // props.api.retrieveAllPartnerData() //i/p for test purpose
        // .then((data) => {
        //   console.log("retrieveAllPartnerData", data);
        //   const respData = data.filter(data => data.partner_id === partnerId);
        //   console.log("filter by id", respData);
        //   console.log('partnerData', partnerData);
        console.log('partner grid onload');
        // if(props.data){
        //     setRowData(props.data.data);
        // }
        // })
        // .catch((e) => {
        //   console.log(e);
        // });
    },[]);

    return (
        <>
          <Container fluid>
          <Row
          className="ag-theme-alpine ag-grid-table"
          style={{ height: 200, marginTop: "10px" }}>
                <AgGridReact
                    ref={gridRef}
                    className="ag-theme-alpine"
                    animateRows="true"
                    rowData={ rowData }
                    columnDefs={ columnDefs }
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                />
            </Row>
          </Container>
        </>
    );
}

export default connect(null, { retrieveAllPartnerData })(PartnerAccountList);