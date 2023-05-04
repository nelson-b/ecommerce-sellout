import React from "react";
import BatchInputComponent from "./batchInput.component";

function ExcelData() {
  const excelExportData = [
    {
      zone: "Zone 1",
      country: "Country A",
      partner: "Partner C",
      model: "E1",
      status: "Active",
      currency: "INR",
    },
    {
      zone: "Zone 2",
      country: "Country B",
      partner: "Partner C",
      model: "E2",
      status: "Active",
      currency: "USD",
    },
    {
      zone: "Zone 1",
      country: "Country C",
      partner: "Partner B",
      model: "E2",
      status: "Active",
      currency: "Euro",
    },
    {
      zone: "Zone 2",
      country: "Country B",
      partner: "Partner C",
      model: "E2",
      status: "Inactive",
      currency: "USD",
    },
  ];

  return (
    <div>
      <BatchInputComponent
        exceldata={excelExportData}
        fileName={" Excel report"}
      ></BatchInputComponent>
    </div>
  );
}
export default ExcelData;
