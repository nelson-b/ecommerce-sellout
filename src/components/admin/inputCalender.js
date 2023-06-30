import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Col,
  Form,
  Row,
  Container,
  Breadcrumb,
  Card,
  Table,
} from "react-bootstrap";
import MyMenu from "../menu/menu.component.js";
import Home from "../../images/home-icon.png";
import { useForm } from "react-hook-form";
import "../admin/inputCalendar.css";
import { quarters } from "../constant.js";
import {
  createInputCalenderData,
  retrieveInputCalenderData,
} from "../../actions/inputCalenderAction";
import AlertModel from "../modal/alertModel.js";
import { getUIDateFormat } from "../../../src/helper/helper";

function InputCalendar(props) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    reValidateMode: "onChange",
  });

  const monthsOfTheYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const onSubmit = (data) => {
    let today = new Date();
    let year = today.getFullYear();
    let getKeys = Object.keys(data);
    let newArr = [];

    getKeys.forEach((element) => {
      let getIndex = element.lastIndexOf("_");
      newArr.push(element.slice(getIndex + 1));
    });
    let uniqueArray = [...new Set(newArr)];
    let finalArray = [];
    
    uniqueArray.forEach((uElement) => {
      if (
        (data["currmonth_closedt_" + uElement] &&
          data["currmonth_opndt_" + uElement]) !== ""
      ) {
        let quarterNme = uElement;

        if (
          quarterNme == "1" ||
          quarterNme == "2" ||
          quarterNme == "3" ||
          quarterNme == "4"
        ) {
          quarterNme = "Q" + uElement;
        }

        let finalObj = {
          year_val: year.toString(),
          month_quarter_val: quarterNme,
          role_id: "approver",
          opening_date: data["currmonth_opndt_" + uElement],
          closing_date: data["currmonth_closedt_" + uElement],
          created_date: today,
          created_by: "john@example.com",
          modified_date: today,
          modified_by: "jane@example.com",
        };

        finalArray.push(finalObj);
      }
    });

    finalArray.forEach((dataToPost) => {
      props.createInputCalenderData(dataToPost).then((data) => {
        console.log("data is saved::", data);
        setShowSuccessModal(true);
      });
    });
    // setTimeout(() => {
    //   setShowSuccessModal(true);
    //   document.getElementById("input-calender-form").reset();
    // }, 2000);
  };

  const onError = (error) => {
    console.log("ERROR:::", error);
  };

  const getCurrentQuarter = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const quarter = Math.ceil(month / 3);
    return `Q${quarter}`;
  };

  const getPrevQuarter = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const quarter = Math.ceil(month / 3);
    if (quarter == 1) {
      return `Q${quarter}`;
    } else {
      return `Q${quarter - 1}`;
    }
  };

  const currentQuater = getCurrentQuarter();
  const prevQuater = getPrevQuarter();

  const getQuarterMonths = useCallback((quarter) => {
    return quarters[quarter] || [];
  }, []);

  const getPrevQuarterMonths = useCallback((quarter) => {
    return quarters[quarter] || [];
  }, []);

  const [quaterMonths, setQuaterMonths] = useState();
  const [prevQuarterMonths, setPrevQuarterMonths] = useState(
    getPrevQuarterMonths(prevQuater)
  );

  const [nextQuarter, setNextQuarter] = useState([]);
  const [prevQuarter, setPrevQuarter] = useState([]); //fetched form API

  useEffect(() => {
    const d = new Date();
    let months = d.getMonth();
    let monthsArray = [];

    for (let i = months; i < 12; i++) {
      if (monthsArray.length < 3) {
        monthsArray.push(monthsOfTheYear[i]);
      }
    }

    setQuaterMonths(monthsArray);
    let monthsArrayReverse = [];
    let minusMonth = months - 1;

    for (let i = minusMonth; i >= 0; i--) {
      if (monthsArrayReverse.length < 6) {
        monthsArrayReverse.push(monthsOfTheYear[i]);
      }
    }
    getPreviousQuarterData(prevQuater);
    getNextQuarter();
    getPreviousQuarterMonthViseData(monthsArrayReverse.reverse());
  }, []);

  const getPreviousQuarterData = (quarter) => {
    let today = new Date();

    let year = today.getFullYear();
    props
      .retrieveInputCalenderData(year, quarter, "approver")
      .then((data) => {
        let obj = {
          quarter: data.MONTH_QUARTER_VAL,
          openingDate: getUIDateFormat(data.OPENING_DATE, true),
          closingDate: getUIDateFormat(data.CLOSING_DATE, true),
        };

        setPrevQuarter((prevArray) => [...prevArray, obj]);
      })

      .catch((e) => {
        console.log("Partner list", e);
      });
  };

  const [prevQuaterMonthsData, setPrevQuaterMonthsData] = useState([]);

  const getPreviousQuarterMonthViseData = (prevQuarterMonths) => {
    let today = new Date();
    let year = today.getFullYear();
    let prevQuarterMonthViseData = [];
    for (let i = 0; i < prevQuarterMonths.length; i++) {
      props
        .retrieveInputCalenderData(year, prevQuarterMonths[i], "approver")

        .then((data) => {
          let obj = {
            month: data.MONTH_QUARTER_VAL,
            openingDate: getUIDateFormat(data.OPENING_DATE, true),
            closingDate: getUIDateFormat(data.CLOSING_DATE, true),
            srNo: i + 1,
          };

          setPrevQuaterMonthsData((prevArray) => [...prevArray, obj]);
        })

        .catch((e) => {
          console.log("QURTER list", e);
        });
    }
  };

  const getNextQuarter = useCallback(() => {
    let currQuatNum = currentQuater.slice(1, 2);
    let nextQuatrs = [];
    for (let i = currQuatNum; i <= 4; i++) {
      nextQuatrs = nextQuatrs.concat(i);
    }
    setNextQuarter(nextQuatrs || []);
  }, []);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const successmsg = {
    headerLabel: "Success....",

    variant: "success",

    header: "Data has been saved successfully!!",

    content: [],
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const [errorRet, setErrorRet] = useState([]);

  const errormsg = {
    headerLabel: "Error....",

    variant: "danger",

    header: "There are errors while processing.",

    content: errorRet,
  };

  //post api

  //get api

  return (
    <Container fluid>
      <Row>
        <MyMenu />
      </Row>

      <Row>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/home">
            <img
              src={Home}
              alt="home"
              style={{ height: "20px", width: "80px", cursor: "pointer" }}
            />
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>

      <Row>
        <h5 className="form-sellout-header">INPUT CALENDER</h5>

        <Container fluid>
          <Form
            id="input-calender-form"
            noValidate
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <Card className="card-Panel form-calendar-card">
              <Row>
                <Form.Group className="mb-4">
                  <Row>
                    <h5 className="form-sellout-header">
                      Sell Out Data Input Window
                    </h5>
                  </Row>

                  <Row>
                    <Col md="5">
                      {quaterMonths &&
                        quaterMonths.map((month, index) => (
                          <>
                            <Row>
                              <h6 className="form-sellout-header">
                                {`Month of ${month}`}
                              </h6>
                            </Row>

                            <Row>
                              <Col>
                                <Form.Label
                                  size="sm"
                                  className="calendar-label"
                                  htmlFor={"currmonth_opndt_" + month}
                                >
                                  Opening Date
                                </Form.Label>
                                &nbsp;
                                <Form.Control
                                  size="sm"
                                  id={"currmonth_opndt_" + month}
                                  name={"currmonth_opndt_" + month}
                                  min={new Date().toISOString().split("T")[0]}
                                  type="date"
                                  {...register(`currmonth_opndt_${month}`)}
                                />
                                {errors[`currmonth_opndt_${month}`] && (
                                  <Form.Text className="text-danger">
                                    {errors[`currmonth_opndt_${month}`].message}
                                  </Form.Text>
                                )}
                              </Col>

                              <Col>
                                <Form.Label
                                  size="sm"
                                  className="calendar-label"
                                  htmlFor={"currmonth_closedt_" + month}
                                >
                                  Closing Date
                                </Form.Label>
                                &nbsp;
                                <Form.Control
                                  size="sm"
                                  id={"currmonth_closedt_" + month}
                                  name={"currmonth_closedt_" + month}
                                  type="date"
                                  {...register(`currmonth_closedt_${month}`)}
                                />
                                {errors[`currmonth_closedt_${month}`] && (
                                  <Form.Text className="text-danger">
                                    {
                                      errors[`currmonth_closedt_${month}`]
                                        .message
                                    }
                                  </Form.Text>
                                )}
                              </Col>
                            </Row>
                          </>
                        ))}
                    </Col>

                    <Col className="prev-window-panel">
                      <Card className="card-Panel prev-window-table">
                        <Row>
                          <h5 className="form-sellout-header">
                            Previous Months Input Window
                          </h5>
                        </Row>

                        <Row>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th></th>
                                <th>Opening Date</th>
                                <th>Closing Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {prevQuaterMonthsData &&
                                prevQuaterMonthsData
                                  .sort((a, b) => (a.srNo > b.srNo ? 1 : -1))
                                  .map((data, index) => (
                                    <tr>
                                      <td>{data.month}</td>
                                      <td>{data.openingDate}</td>
                                      <td>{data.closingDate}</td>
                                    </tr>
                                  ))}
                            </tbody>
                          </Table>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </Form.Group>
              </Row>
            </Card>

            <br />

            <Card className="card-Panel form-calendar-card">
              <Row>
                <Form.Group className="mb-4">
                  <Row>
                    <h5 className="form-sellout-header">
                      Sell Out Data Approver Window
                    </h5>
                  </Row>

                  <Row>
                    <Col md="5">
                      {nextQuarter &&
                        nextQuarter.map((quarter, index) => (
                          <>
                            <Row>
                              <h6 className="form-sellout-header">{`Quarter ${quarter}`}</h6>
                            </Row>

                            <Row>
                              <Col>
                                <Form.Label
                                  size="sm"
                                  className="calendar-label"
                                  htmlFor={"currmonth_opndt_" + quarter}
                                >
                                  Opening Date
                                </Form.Label>
                                &nbsp;
                                <Form.Control
                                  size="sm"
                                  id={"currmonth_opndt_" + quarter}
                                  name={"currmonth_opndt_" + quarter}
                                  min={new Date().toISOString().split("T")[0]}
                                  type="date"
                                  {...register(`currmonth_opndt_${quarter}`)}
                                />
                                {errors[`currmonth_opndt_${quarter}`] && (
                                  <Form.Text className="text-danger">
                                    {
                                      errors[`currmonth_opndt_${quarter}`]
                                        .message
                                    }
                                  </Form.Text>
                                )}
                              </Col>

                              <Col>
                                <Form.Label
                                  size="sm"
                                  className="calendar-label"
                                  htmlFor={"currmonth_closedt_" + quarter}
                                >
                                  Closing Date
                                </Form.Label>
                                &nbsp;
                                <Form.Control
                                  size="sm"
                                  id={"currmonth_closedt_" + quarter}
                                  name={"currmonth_closedt_" + quarter}
                                  type="date"
                                  {...register(`currmonth_closedt_${quarter}`)}
                                />
                                {errors[`currmonth_closedt_${quarter}`] && (
                                  <Form.Text className="text-danger">
                                    {
                                      errors[`currmonth_closedt_${quarter}`]
                                        .message
                                    }
                                  </Form.Text>
                                )}
                              </Col>
                            </Row>
                          </>
                        ))}
                    </Col>

                    <Col className="prev-window-panel">
                      <Card className="card-Panel prev-window-table">
                        <Row>
                          <h5 className="form-sellout-header">
                            Previous Quarter Approval Window
                          </h5>
                        </Row>

                        <Row>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th></th>
                                <th>Opening Date</th>
                                <th>Closing Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {prevQuarter &&
                                prevQuarter.map((data, index) => (
                                  <tr>
                                    <td>{"Quarter " + data.quarter}</td>
                                    <td>{data.openingDate}</td>
                                    <td>{data.closingDate}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </Table>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </Form.Group>
              </Row>
            </Card>

            <Row className="mb-3" style={{ float: "right", padding: "20px" }}>
              <Col xs="auto">
                <Button className="btn-upload save-header" type="submit">
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
          <AlertModel
            show={showSuccessModal}
            handleClose={handleCloseSuccessModal}
            body={successmsg}
          />
          <AlertModel
            show={showErrorModal}
            handleClose={handleCloseErrorModal}
            body={errormsg}
          />
        </Container>
      </Row>
    </Container>
  );
}

export default connect(null, {
  createInputCalenderData,
  retrieveInputCalenderData,
})(InputCalendar);
