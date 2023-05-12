import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "./parentInput.component.css";
import DataReviewComponent from "../dataReview/dataReview.component";
import { get, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import * as xlsx from "xlsx";
import * as FileSaver from "file-saver";
import { batchUploadType } from "./batchUploadType";
import ReportData from "../../data/downloadReport.json";

function BatchInputComponent({}) {
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

  const[fileData, setFileData] = useState([]);

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
        const reader = new FileReader();
        reader.onload = (e) => {
          console.log("reader onload");
          const result = e.target.result;
          const workbook = xlsx.read(result, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = xlsx.utils.sheet_to_json(worksheet);
          console.log("Reading excel: ", json);
          json.forEach((i) => {
            fileData.push([
              {
                Partner: i.Partner,
              },
            ]);
          });
        };
        reader.readAsArrayBuffer(data.file[0]);
      }
      // navigate("/dataReview");
      console.log("Reading excel useState: ", fileData);
    }
  };

  const onError = (error) => {
    console.log("ERROR:::", error);
  };

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async (exportedData) => {
    const ws = xlsx.utils.json_to_sheet(exportedData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = xlsx.write(wb, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileExtension);
  };

  return (
    <>
      <Container fluid>
        <h5 className="input-header">Sell Out Data Input</h5>
        <Container className="sell-out-input-upload">
          <Row>
            <Col xs="auto" className="align-item-center file-upload-position">
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
                    <Button
                      variant="primary"
                      className="btn-upload"
                      type="submit">
                      className="btn-upload save-header"
                      type="submit"
                    >
                      Upload
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col xs="auto">
              <Button
                className="btn-download edit-header"
                onClick={(e) => exportToExcel(ReportData)}
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
