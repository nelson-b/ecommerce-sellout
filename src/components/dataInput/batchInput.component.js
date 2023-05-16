import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "./parentInput.component.css";
import { get, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React, { useState, useMemo } from "react";
import * as xlsx from "xlsx";
import FileSaver from "file-saver";
import ReportData from "../../data/downloadReport.json";
import AlertModel from "../modal/alertModel";

function BatchInputComponent({ getData }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    reValidateMode: "onChange",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [fileError, setFileError] = useState([]);

  const handleShowSuccessModal = () => {
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleShowErrorModal = () => {
    setShowErrorModal(true);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const successmsg = {
    headerLabel: "Success....",
    variant: "success",
    header: 'Data has been saved successfully!!',
    content: ['Navigating you to the Sell out data review page.....']
  }

  const errormsg = {
    headerLabel: "Error....",
    variant: "danger",
    header: "There are below errors while processing. Please recitify and retry",
    content: fileError
  }

  const onSubmit = (data) => {
    const file = data.file[0];
    console.log("file", file);

    if (
      file.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setError("file", {
        type: "filetype",
        message: "Only Excel files are valid for upload.",
      });
      return;
    } else {
      if (data.file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          console.log("reader onload");
          let result = e.target.result;
          let workbook = xlsx.read(result, { type: "array" });
          let sheetName = workbook.SheetNames[0];
          let worksheet = workbook.Sheets[sheetName];
          let json = xlsx.utils.sheet_to_json(worksheet);
          let errorJson = [];
          console.log("Reading excel: ", json);
          setFileData(json);
          fileData.forEach((i) => {
              if(i.Jan){
                if(isNaN(i.Jan)){
                  errorJson.push('There should be number for Jan month at partner : ' + i.Partner);
                  console.log('There should be number for Jan month at partner : ' + i.Partner);
                }
              }
              if(i.Feb){
                if(isNaN(i.Feb)){
                  errorJson.push('There should be number for Feb month at partner : ' + i.Partner);
                  console.log('There should be number for Feb at partner : ' + i.Partner);
                }
              }
              if(i.Mar){
                if(isNaN(i.Mar)){
                  errorJson.push('There should be number for Mar month at partner : ' + i.Partner);
                  console.log('There should be number for Mar month at partner : ' + i.Partner);
                }
              }
              if(i.Apr){
                if(isNaN(i.Apr)){
                  errorJson.push('There should be number at Apr at partner : ' + i.Partner);
                  console.log('There should be number at Apr at partner : ' + i.Partner);
                }
              }
              if(i.May){
                if(isNaN(i.May)){
                  errorJson.push('There should be number at May at partner : ' + i.Partner);
                  console.log('There should be number at May at partner : ' + i.Partner);
                }
              }
              if(i.Jun){
                if(isNaN(i.Jun)){
                  errorJson.push('There should be number at Jun at partner : ' + i.Partner);
                  console.log('There should be number at Jun at partner : ' + i.Partner);
                }
              }
              if(i.Jul){
                if(isNaN(i.Jul)){
                  errorJson.push('There should be number at Jul at partner : ' + i.Partner);
                  console.log('There should be number at Jul at partner : ' + i.Partner);
                }
              }
              if(i.Aug){
                if(isNaN(i.Aug)){
                  errorJson.push('There should be number at Jul at partner : ' + i.Partner);
                  console.log('There should be number at Aug at partner : ' + i.Partner);
                }
              }
              if(i.Sep){
                if(isNaN(i.Sep)){
                  errorJson.push('There should be number at Jul at partner : ' + i.Partner);
                  console.log('There should be number at Sep at partner : ' + i.Partner);
                }
              }
              if(i.Oct){
                if(isNaN(i.Oct)){
                  errorJson.push('There should be number at Oct at partner : ' + i.Partner);
                  console.log('There should be number at Oct at partner : ' + i.Partner);
                }
              }
              if(i.Nov){
                if(isNaN(i.Nov)){
                  errorJson.push('There should be number at Nov at partner : ' + i.Partner);
                  console.log('There should be number at Nov at partner : ' + i.Partner);
                }
              }
              if(i.Dec){
                if(isNaN(i.Dec)){
                  errorJson.push('There should be number at Dec at partner : ' + i.Partner);
                  console.log('There should be number at Dec at partner : ' + i.Partner);
                }
              }
          });

          if(errorJson.length > 0){
            setFileError(errorJson);
            setShowErrorModal(true);
            setShowSuccessModal(false);
          }
          else
          {
            setFileError([]);
            setShowErrorModal(false);
            setShowSuccessModal(true);
            setTimeout(()=>navigate('/dataReview'), 3000);
          }

          errorJson = [];
        };

        reader.readAsArrayBuffer(data.file[0]);
      }
      console.log("Reading excel useState: ", fileData);
      console.log('fileError',fileError);
    }
  };

  const onError = (error) => {
    console.log("ERROR:::", error);
  };

  const readMeData = [
    ["Read me Demo"],
    [
          "1. In this we acn able to see Zone, Country, Partner, Modal level fields",
    ],
    [     "2. We ahve Estimated and Actual values of Months"],
    [     "3. Example: Jan to Dec estimated and actual values"],
    [
          "4. If the value is TRUE then its a estimated value otherwise its a actual value",
    ],
  ];

  const exportToExcel = async (exportedData) => {
    const tempData = exportedData.map((e) => {
      const { id, status, ...rest } = e;
      return rest;
    });

    const workbook = xlsx.utils.book_new();
    const readmeDataWithoutHeader = readMeData.slice(0);
    const sheet1 = xlsx.utils.aoa_to_sheet(readmeDataWithoutHeader);
    xlsx.utils.book_append_sheet(workbook, sheet1, "Read Me");

    const sheet2 = xlsx.utils.json_to_sheet(tempData);
    xlsx.utils.book_append_sheet(workbook, sheet2, "Sell out Data Input");

    xlsx.writeFile(workbook, "Sell out Data Input.xlsx");
  };

  return (
    <>
      <Container fluid>
        <h5 className="sell-out-input-header">Sell Out Data Input</h5>
        <Container className="sell-out-input-upload">
          <Row>
            <Col xs="auto" className="align-item-center file-upload-container">
              <Form.Label>BATCH UPLOAD</Form.Label>
            </Col>
            <Col xs="auto">
              <Form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                <Row>
                  <Col xs="auto">
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Control
                        type="file"
                        accept=".xlsx,.xls"
                        {...register("file", {
                          required: "Excel file is required",
                        })}
                      />
                      {errors.file && (
                        <Form.Text className="text-danger">
                          {errors.file.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xs="auto">
                    <Button className=" btn-upload save-header" type="submit">
                      Upload
                    </Button>
                    <AlertModel
                      show={ showSuccessModal }
                      handleClose={ handleCloseSuccessModal }
                      body={ successmsg }
                    />
                    <AlertModel
                      show={ showErrorModal }uu
                      handleClose={ handleCloseErrorModal }
                      body={ errormsg }
                    />
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col xs="auto">
              <Button
                size="lg"
                className="edit-header"
                onClick={(e) => exportToExcel(getData)}
              >
                Download Template
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default BatchInputComponent;
