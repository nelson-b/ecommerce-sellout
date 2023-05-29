import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { Button, Col, Form, Row, Container, Breadcrumb, Card, Tooltip, OverlayTrigger, Table,
} from "react-bootstrap";
import MyMenu from "../menu/menu.component.js";
import Home from "../../images/home-icon.png";
import { useForm } from "react-hook-form";
import '../admin/inputCalendar.css'

function InputCalendar(){

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        reValidateMode: "onChange",
    });

    const onSubmit = (data) => {
        console.log("form data", data);
    }

    const onError = (error) => {
        console.log("ERROR:::", error);
    };

    const getCurrentQuarter = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const quarter = Math.ceil(month / 3);
        return `Q${quarter}`;
    };
    
    const currentQuater = getCurrentQuarter();
    
    const getQuarterMonths = (quarter) => {
        const quarters = {
          Q1: ["Jan", "Feb", "Mar"],
          Q2: ["Apr", "May", "Jun"],
          Q3: ["Jul", "Aug", "Sep"],
          Q4: ["Oct", "Nov", "Dec"],
        };
        return quarters[quarter] || [];
    };
    
    const [quaterMonths, setQuaterMonths] = useState(getQuarterMonths(currentQuater));
    
    const [nextQuarter, setNextQuarter] = useState([2,3,4]);

    const [prevQuarter, setPrevQuarter] = useState([{quarter: 1, openingDate: '11/01/2023', closingDate: '20/01/2023'}]);
    // useCallback(() => {
    //     let retVal = getQuarterMonths(currentQuater);
    //     console.log('quaterMonths', quaterMonths);
    //     setQuaterMonths(retVal);
    // },[]);

    //retr prev quarter
    const getPrevQuarter = () => {
        let getNum = getCurrentQuarter().slice(1, 1);
        let retVal = getNum == 1 ? 4 : (getNum - 1);
        console.log('Get Prev Quarter Months =>', retVal);
        return retVal;
    };

    const prevQuarterMonths = useCallback(() => {getQuarterMonths(getPrevQuarter())},[]);
    console.log('prevQuarterMonths', prevQuarterMonths);

    const [prevQuaterMonthsData, setPrevQuaterMonthsData] = useState([
        {month: 'January', openingDate: '11/01/2023', closingDate: '20/01/2023'},
        {month: 'February', openingDate: '11/02/2023', closingDate: '20/02/2023'},
        {month: 'March', openingDate: '11/03/2023', closingDate: '20/03/2023'}
    ]);

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
                    <Form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                        <Row>
                            <Card className="card-Panel form-calendar-card">
                            <Form.Group className="mb-4">
                            <Row>
                                <h5 className="form-sellout-header">Sell Out Data Input Window</h5>
                            </Row>
                            <Row>
                            <Col md="5">
                            {quaterMonths && quaterMonths.map((month, index) =>
                            <>
                            <Row>
                             <h6 className="form-sellout-header">{index==0?'Current month':`Month of ${month}`}</h6> 
                            </Row>
                            <Row>
                                <Col>
                                <Form.Label size="sm" className="calendar-label" htmlFor="currmonth_opndt">
                                    Opening Date
                                </Form.Label>
                                &nbsp;
                                <Form.Control
                                    size="sm"
                                    id="currmonth_opndt"
                                    name="currmonth_opndt"
                                    type="date"
                                    {...register("currmonth_opndt", {
                                    required: "Opening date is required",
                                    })}
                                />
                                {errors.currmonth_opndt && (
                                    <Form.Text className="text-danger">
                                        {errors.currmonth_opndt.message}
                                    </Form.Text>
                                )}
                                </Col>
                                <Col>
                                <Form.Label size="sm" className="calendar-label" htmlFor="currmonth_closedt">
                                    Closing Date
                                </Form.Label>
                                &nbsp;
                                <Form.Control
                                    size="sm"
                                    id="currmonth_closedt"
                                    name="currmonth_closedt"
                                    type="date"
                                    {...register("currmonth_closedt", {
                                    required: "Close date is required",
                                    })}
                                />
                                {errors.currmonth_closedt && (
                                    <Form.Text className="text-danger">
                                        {errors.currmonth_closedt.message}
                                    </Form.Text>
                                )}
                                </Col>
                            </Row>
                            </>
                            )}
                            </Col>
                            <Col className="prev-window-panel">
                            <Card className="card-Panel prev-window-table">
                            <Row>
                                <h5 className="form-sellout-header">Previous Months Input Window</h5>
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
                                {prevQuaterMonthsData && prevQuaterMonthsData.map((data, index) => 
                                <tr>
                                    <td>{data.month}</td>
                                    <td>{data.openingDate}</td>
                                    <td>{data.closingDate}</td>
                                </tr>)}
                            </tbody>
                            </Table>
                            </Row>
                            </Card>
                            </Col>
                            </Row>
                            </Form.Group>                            
                            </Card>
                        </Row>
                        <br/>
                        <Row>
                            <Card className="card-Panel form-calendar-card">
                                <Form.Group className="mb-4">
                                <Row>
                                    <h5 className="form-sellout-header">Sell Out Data Approver Window</h5>
                                </Row>
                                <Row>
                                <Col md="5">
                                {nextQuarter && nextQuarter.map((quarter, index) =>
                                <>
                                <Row>
                                <h6 className="form-sellout-header">{`Quarter ${quarter}`}</h6> 
                                </Row>
                                <Row>
                                    <Col>
                                    <Form.Label size="sm" className="calendar-label" htmlFor="currmonth_opndt">
                                        Opening Date
                                    </Form.Label>
                                    &nbsp;
                                    <Form.Control
                                        size="sm"
                                        id="currmonth_opndt"
                                        name="currmonth_opndt"
                                        type="date"
                                        {...register("currmonth_opndt", {
                                        required: "Opening date is required",
                                        })}
                                    />
                                    {errors.currmonth_opndt && (
                                        <Form.Text className="text-danger">
                                            {errors.currmonth_opndt.message}
                                        </Form.Text>
                                    )}
                                    </Col>
                                    <Col>
                                    <Form.Label size="sm" className="calendar-label" htmlFor="currmonth_closedt">
                                        Closing Date
                                    </Form.Label>
                                    &nbsp;
                                    <Form.Control
                                        size="sm"
                                        id="currmonth_closedt"
                                        name="currmonth_closedt"
                                        type="date"
                                        {...register("currmonth_closedt", {
                                        required: "Close date is required",
                                        })}
                                    />
                                    {errors.currmonth_closedt && (
                                        <Form.Text className="text-danger">
                                            {errors.currmonth_closedt.message}
                                        </Form.Text>
                                    )}
                                    </Col>
                                </Row>
                                </>
                                )}
                                </Col>
                                <Col className="prev-window-panel">
                                <Card className="card-Panel prev-window-table">
                                <Row>
                                    <h5 className="form-sellout-header">Previous Quarter Approval Window</h5>
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
                                    {prevQuarter && prevQuarter.map((data, index) => 
                                    <tr>
                                        <td>{"Quarter "+data.quarter}</td>
                                        <td>{data.openingDate}</td>
                                        <td>{data.closingDate}</td>
                                    </tr>)}
                                </tbody>
                                </Table>
                                </Row>
                                </Card>
                                </Col>
                                </Row>
                                </Form.Group>                            
                            </Card>
                        </Row>
                        <Row className="mb-3" style={{ float: "right", padding: "20px" }}>
                            <Col xs="auto">
                            <Button className="btn-upload save-header" type="submit">
                                Save
                            </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Row>
        </Container>
    )
}
export default connect(null, null)(InputCalendar);