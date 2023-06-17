import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { Container, Row } from "react-bootstrap";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { retrieveAllPartnerData } from "../../actions/partneraction";
import { connect } from "react-redux";

function PartnerAccountList(props) {
    const gridRef = useRef();
    console.log('PartnerAccountList', props.data);
    const [rowData, setRowData] = useState([]);

    const columnDefs = [
        { headerName: "Partner Account Name", field: "partner_account_name" },
        // { headerName: "Country", field: "country_code", minWidth: 100, suppressSizeToFit: true, suppressMenu: true },
        // { headerName: "Model", field: "model_type", minWidth: 100, suppressSizeToFit: true, suppressMenu: true }
        { headerName: "Current Editor", field: "EDITOR" },
        { headerName: "Current 1st Approver", field: "APPROVE_1" },
        { headerName: "Current 2nd Approver", field: "APPROVER_2" }
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
    
    useEffect(() => {
        console.log('partner grid onload', props.data);
        let gridData = [];
        if(props.data.data){
            props.data.dropdownField.forEach((row, index) => {
                let filterData = props.data.data.filter(data => data.partner_id === row.value);
                gridData = gridData.concat({
                    partner_account_name: row.label,
                    EDITOR: filterData.EDITOR,
                    APPROVE_1: filterData.APPROVE_1,
                    APPROVER_2: filterData.APPROVER_2
                });
            });
        }
        setRowData(gridData);
    },[props.data.dropdownField]);

    const onGridReady = useCallback(() => {
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