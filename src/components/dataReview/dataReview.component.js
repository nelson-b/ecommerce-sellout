import { useState } from "react";
// import * as XLSX from "xlsx";

const DataReviewComponent = ({ excelData }) => {
  // on change state
  // const [excelFile, setExcelFile] = useState(null);
  // const [excelFileError, setExcelFileError] = useState(null);

  // // submit
  // const [excelData, setExcelData] = useState(null);

  // const handleFileUpload = (e) => {
  //   const reader = new FileReader();
  //   reader.readAsBinaryString(e.target.files[0]);
  //   reader.onload = (e) => {
  //     const data = e.target.result;
  //     const workbook = XLSX.read(data, { type: "binary" });
  //     const sheetName = workbook.SheetNames[0];
  //     const sheet = workbook.Sheets[sheetName];
  //     const parsedData = XLSX.utils.sheet_to_json(sheet);
  //     setExcelData(parsedData);
  //   };
  // };
  // const fileType = [
  //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  // ];
  // const handleFile = (e) => {
  //   // let selectedFile = e.target.files[0];
  //   let selectedFile = e.target.file[0];
  //   if (selectedFile) {
  //     // console.log(selectedFile.type);
  //     if (selectedFile && fileType.includes(selectedFile.type)) {
  //       let reader = new FileReader();
  //       reader.readAsArrayBuffer(selectedFile);
  //       reader.onload = (e) => {
  //         setExcelFileError(null);
  //         setExcelFile(e.target.result);
  //       };
  //     } else {
  //       setExcelFileError("Please select only Excel File");
  //       setExcelFile(null);
  //     }
  //   } else {
  //     console.log("Please select your file");
  //   }
  // };

  //submit Function
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (excelFile !== null) {
  //     const workbook = XLSX.read(excelFile, { type: "buffer" });
  //     const worksheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[worksheetName];
  //     const data = XLSX.utils.sheet_to_json(worksheet);
  //     setExcelData(data);
  //   } else {
  //     setExcelData(null);
  //   }
  // };

  return (
    <>
      <h5>Sell Out Data Review</h5>
      <div>
        {/* {excelData.length > 0 && ( */}
        <table>
          <thead>
            <tr>
              {/* {Object.keys(excelData[0].map((key) => <th key={key}>{key}</th>))} */}
            </tr>
          </thead>
          <tbody>{/* <Data excelData={excelData}/> */}</tbody>
        </table>
        {/* )} */}
      </div>
    </>
  );
};

export default DataReviewComponent;
