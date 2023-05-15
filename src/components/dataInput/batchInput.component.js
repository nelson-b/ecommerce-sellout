import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "./parentInput.component.css";
import { get, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React, { useState, useMemo } from "react";
import * as xlsx from "xlsx";
import * as FileSaver from "file-saver";

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

  const [fileData, setFileData] = useState([]);

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
