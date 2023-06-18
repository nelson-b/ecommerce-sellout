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
        { headerName: "Current Editor", field: "editor" },
        { headerName: "Current 1st Approver", field: "approver1" },
        { headerName: "Current 2nd Approver", field: "approver2" }
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
                console.log('index', index);
                console.log('row', row);
                console.log('partner id', row.value);
                let partnerid=row.value;
                let filterData = props.data.data.filter(data => data.PARTNER_ID === partnerid);
                console.log('filterData', filterData);
                if(filterData.length > 0){
                    gridData = gridData.concat({
                        partner_account_name: row.label,
                        editor: filterData[0].EDITOR ? filterData[0].EDITOR: '',
                        approver1: (filterData[0].APPROVE_1) ? filterData[0].APPROVE_1: '',
                        approver2: (filterData[0].APPROVER_2) ? filterData[0].APPROVER_2: '',
                    });

                    console.log('gridData', gridData);
                }
            });
            console.log('appended data', gridData);
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