import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { Container, Row } from "react-bootstrap";
import { useCallback, useMemo, useState } from "react";

function PartnerAccountList(props) {
    const [rowData, setRowData] = useState([]);
    
    const columnDefs = [
        { headerName: "Partner Account Name", field: "partneraccname" },
        { headerName: "Current Editor", field: "currentEditor" },
        { headerName: "Current 1st Approver", field: "current1stApprover" },
        { headerName: "Current 2nd Approver", field: "current2ndApprover" }
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
        setRowData([
        {
            partneraccname:"Partner 1", currentEditor: "Editor 1", current1stApprover: "Approver 1", current2ndApprover: "Approver 2"
        },
        {
            partneraccname:"Partner 2", currentEditor: "Editor 2", current1stApprover: "Approver 1", current2ndApprover: "Approver 2"
        }])
    },[]);

    return (
        <>
          <Container fluid>
          <Row
          className="ag-theme-alpine ag-grid-table"
          style={{ height: 200, marginTop: "10px" }}>
                <AgGridReact
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

export default PartnerAccountList;