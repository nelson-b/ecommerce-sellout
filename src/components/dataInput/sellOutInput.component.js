import { Form, Row, Col, Button, Container, Nav } from "react-bootstrap";
import "./sellOutInput.component.css";
import SellOutDataComponent from "./sellOutData.component";
import DataReviewComponent from "../dataReview/dataReview.component";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as XLSX from "xlsx";

const SellOutInputComponent = () => {
  const navigate = useNavigate();

  // State management for reading Excel file
  // =========================================
  // const [excelFile, setExcelFile] = useState(null);
  // const [excelFileError, setExcelFileError] = useState(null);

  // submit
  // const [excelData, setExcelData] = useState(null);
  // =========================================

  // Reading data from Excel
  //=========================================
  // console.log(excelFile);
  // const fileType = [
  //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  // ];
  // const handleFile = (e) => {
  //   e.preventDefault();
  //   let selectedFile = e.target.files[0];

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

  // =====================================

  // submit Function
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
  //=============================================

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

  const onSubmit = (data) => {
    const file = data.file[0];
    if (
      file.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setError("file", {
        type: "filetype",
        message: "Only Excel files are valid for upload.",
      });
      return;
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      // console.log(data);
      // <DataReviewComponent />;
      navigate("/dataReview");
    }
    console.log("data:::", data);
    console.log("data:::", JSON.stringify(data));
  };

  const onError = (error) => {
    console.log("ERROR:::", error);
  };

  return (
    <>
      <Container fluid>
        <h5 className="input-header">Sell Out Data Input</h5>

        <Container className="sell-out-input-upload">
          <Row>
            <Col xs="auto" className="align-item-center file-upload-position">
              <Form.Label>EXCEL FILE UPLOAD</Form.Label>
            </Col>
            <Col xs="auto">
              <Form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                {/* <Form onSubmit={handleSubmit}> */}
                <Row>
                  <Col xs="auto">
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Control
                        type="file"
                        accept=".xlsx,.xls"
                        // onChange={handleFile}
                        {...register("file", {
                          required: "Excel file is required",
                        })}
                        // accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      />
                      {errors.file && (
                        <Form.Text className="text-danger">
                          {errors.file.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xs="auto">
                    {/* {!errors.file && (
                      <Nav.Link href="/dataReview"> */}
                    <Button
                      variant="primary"
                      className="btn-upload"
                      type="submit"
                      // onClick={() => {
                      //   <DataReview />;
                      // }}
                    >
                      Upload
                    </Button>
                    {/* </Nav.Link> */}
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col xs="auto">
              <Button variant="secondary" className="btn-download">
                Download Template
              </Button>
            </Col>
          </Row>
        </Container>

        <div className="estimate-header">
          <Form.Check type="checkbox" id="estimate" label="Is Estimate" />
        </div>

        {/* <Container fluid>
          <Row>
            <Col xs="auto" className="col-md-2">
              <Form.Select size="sm">
                <option>Select Partner</option>
                <option value="Amazon">Amazon</option>
                <option>Flipkart</option>
              </Form.Select>
            </Col>
            <Col xs="auto" className="col-md-2">
              <Form.Select size="sm">
                <option>Select Model</option>
                <option>Amazon</option>
                <option>Flipkart</option>
              </Form.Select>
            </Col>
            <Col xs="auto" className="col-md-2">
              <Form.Select size="sm">
                <option>Select Country</option>
                <option>Amazon</option>
                <option>Flipkart</option>
              </Form.Select>
            </Col>
            <Col xs="auto" className="col-md-2">
              <Form.Select size="sm">
                <option>Select Zone</option>
                <option>Amazon</option>
                <option>Flipkart</option>
              </Form.Select>
            </Col>
            <Col xs="auto" className="col-md-2">
              <Form.Select size="sm">
                <option>Select Period</option>
                <option>Amazon</option>
                <option>Flipkart</option>
              </Form.Select>
            </Col>
            <Col className="col-md-2">
              <Form>
                <Button variant="primary" size="md" className="btn-add">
                  Add
                </Button>
              </Form>
            </Col>
          </Row>
        </Container> */}
      </Container>
      <SellOutDataComponent />
    </>
  );
};

export default SellOutInputComponent;
