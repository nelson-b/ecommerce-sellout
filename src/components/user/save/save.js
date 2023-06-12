import React, { useState, useCallback } from "react";
import Select from "../singleSelect.js";
import {
  countryOptions,
  partnerOptions,
  modelOptions,
  userRoleOptions,
  opsOptions,
  userZoneOptions,
  userOptions,
  userEmailOptions,
} from "../optionsData.js";
import {
  Breadcrumb,
  Card,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Form,
  Tooltip,
  Button,
} from "react-bootstrap";
import MyMenu from "../../menu/menu.component.js";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Home from "../../../images/home-icon.png";
import { BiHelpCircle } from "react-icons/bi";
import MultiSelectDrp from "../multiSelectDropdown.js";
import { components } from "react-select";
import makeAnimated, { Input } from "react-select/animated";
import PartnerAccountList from "../partnerAccountList.component.js";
import "../save/save.css";

function SaveUser(props) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const userRole = new URLSearchParams(location.search).get("role");

  const [form, setForm] = useState({
    username: null,
    useremailid: null,
    userrole: null,
    userops: null,
    usrzone: null,
    modelType: [],
    usrcountry: [],
    partnerAccNm: [],
  });

  const onValidate = (value, name) => {
    setError((prev) => ({
      ...prev,
      [name]: { ...prev[name], errorMsg: value },
    }));
  };

  const [error, setError] = useState({
    username: {
      isReq: true,
      errorMsg: "",
      // onValidateFunc: onValidate,
    },
    useremailid: {
      isReq: true,
      errorMsg: "",
      onValidateFunc: onValidate,
    },
    userrole: {
      isReq: true,
      errorMsg: "",
      onValidateFunc: onValidate,
    },
    userops: {
      isReq: true,
      errorMsg: "",
      onValidateFunc: onValidate,
    },
    usrzone: {
      isReq: true,
      errorMsg: "",
      onValidateFunc: onValidate,
    },
    modelType: {
      isReq: true,
      errorMsg: "",
      onValidateFunc: onValidate,
    },
    usrcountry: {
      isReq: true,
      errorMsg: "",
      onValidateFunc: onValidate,
    },
    partnerAccNm: {
      isReq: true,
      errorMsg: "",
      onValidateFunc: onValidate,
    },
  });

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  const MultiValue = (props) => (
    <components.MultiValue {...props}>
      <span>{props.data.label}</span>
    </components.MultiValue>
  );

  const animatedComponents = makeAnimated();

  const [optionCountrySelected, setOptionCountrySelected] = useState([]);
  const [optionModelSelected, setOptionModelSelected] = useState([]);
  const [optionPartnerSelected, setOptionPartnerSelected] = useState([]);

  const handleCountryChange = (selected) => {
    let name = "usrcountry";
    setOptionCountrySelected(selected);
    console.log("optionSelected", optionCountrySelected);
    setForm((prev) => ({
      ...prev,
      [name]: selected,
    }));
  };

  const handleModelChange = (selected) => {
    let name = "modelType";
    setOptionModelSelected(selected);
    setForm((prev) => ({
      ...prev,
      [name]: selected,
    }));
  };

  const handlePartnerChange = (selected) => {
    let name = "partnerAccNm";
    setOptionPartnerSelected(selected);
    setForm((prev) => ({
      ...prev,
      [name]: selected,
    }));
  };

  const onHandleSelectChange = useCallback((value, name) => {
    console.log('onHandleSelectChange',value, name);
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const onHandleTextChange = useCallback((event) => {
    let value = event.target.value;
    let name = event.target.name;
    console.log('onHandleSelectChange', name, value);
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log('form.username', form.username);
  }, [form]);

  const validateForm = () => {
    let isInvalid = false;
    Object.keys(error).forEach((x) => {
      const errObj = error[x];
      console.log('errObj',errObj);
      if (errObj.errorMsg) {
        isInvalid = true;
      } else if (errObj.isReq && !form[x]) {
        console.log('error',error);
        console.log('form[x]', form[x]);
        isInvalid = true;
        onValidate(true, x);
      }
      else if (form.username === '' || form.username === undefined) { 
        console.log('error',error);
        isInvalid = true;
      }
      else if (form.modelType.length === 0) {
        isInvalid = true;
      } else if (form.usrcountry.length === 0) {
        isInvalid = true;
      } else if (form.partnerAccNm.length === 0) {
        isInvalid = true;
      }
    });

    return !isInvalid;
  };

  const handleSubmit = () => {
    const isValid = validateForm();

    if (form.usrcountry.length > 0) {
    }
    if (!isValid) {
      console.error("Invalid Form!");
      return false;
    }

    console.log("Data:", form);
  };

  const tooltip = (val) => <Tooltip id="tooltip">{val}</Tooltip>;

  const handleUserCancel = () => {
    navigate(`/user/list?role=${userRole}`);
  };

  return (
    <Container fluid>
      <Row>
        <MyMenu role={props.role} />
      </Row>
      <Row>
        {userRole === "superApproverUser" ? (
          <Breadcrumb>
            <Breadcrumb.Item href="/superUser/home">
              <img
                src={Home}
                alt="home"
                style={{ height: "20px", width: "80px", cursor: "pointer" }}
              />
            </Breadcrumb.Item>
            <span> &nbsp;{">"}</span>
            <Breadcrumb.Item active style={{ fontWeight: "bold" }}>
              &nbsp;{props.module} User
            </Breadcrumb.Item>
          </Breadcrumb>
        ) : userRole === "admin" ? (
          <Breadcrumb>
            <Breadcrumb.Item href="/admin/home">
              <img
                src={Home}
                alt="home"
                style={{ height: "20px", width: "80px", cursor: "pointer" }}
              />
            </Breadcrumb.Item>
            <span> &nbsp;{">"}</span>
            <Breadcrumb.Item active style={{ fontWeight: "bold" }}>
              &nbsp;{props.module} User
            </Breadcrumb.Item>
          </Breadcrumb>
        ) : userRole === "superUser" ? (
          <Breadcrumb>
            <Breadcrumb.Item href="/superUser">
              <img
                src={Home}
                alt="home"
                style={{ height: "20px", width: "80px", cursor: "pointer" }}
              />
            </Breadcrumb.Item>
            <span> &nbsp;{">"}</span>
            <Breadcrumb.Item active style={{ fontWeight: "bold" }}>
              &nbsp;{props.module} User
            </Breadcrumb.Item>
          </Breadcrumb>
        ) : (
          <div></div>
        )}
      </Row>
      <Row>
        <h5 className="form-sellout-header">{props.module} User</h5>
        <Container fluid>
          <div className="form">
            <Card className="card-Panel form-userCreate-card">
              <Row className="mt-2 username-header">
                <Col className="col-3">
                  <Form.Label size="sm" htmlFor="username">
                    Username
                  </Form.Label>
                  &nbsp;
                  <OverlayTrigger
                    placement="right"
                    overlay={tooltip(
                      "Enter a name to search or select from dropdown"
                    )}
                  >
                    <span>
                      <BiHelpCircle />
                    </span>
                  </OverlayTrigger><br/>
                  <input type="text"   
                    name="username"
                    title="Username"
                    className="create-usr-text"
                    placeholder="Enter username"
                    value={form.username}
                    onChange={ onHandleTextChange }
                    {...error.username} /><br/>
                  <span className="text-danger">
                    {(form.username === '' || form.username === undefined)
                      ? "Username is required"
                      : ""}
                  </span>
                </Col>
                <Col className="col-3">
                  <Form.Label size="sm" htmlFor="useremailid">
                    User email ID
                  </Form.Label>
                  &nbsp;
                  <OverlayTrigger
                    placement="right"
                    overlay={tooltip(
                      "Enter name to search or select from dropdown"
                    )}
                  >
                    <span>
                      <BiHelpCircle />
                    </span>
                  </OverlayTrigger>
                  <br/>
                  <input type="text"
                    name="useremailid"
                    title="User email id"
                    className="create-usr-text"
                    placeholder="Enter User email id"
                    value={form.useremailid}
                    onChange={ onHandleTextChange }
                    {...error.useremailid} /><br/>
                  <span className="text-danger">
                    {(form.useremailid === '' || form.useremailid === undefined)
                      ? "User email id is required"
                      : ""}
                  </span>
{/* 
                  <Select
                    name="useremailid"
                    title="User email id"
                    value={form.useremailid}
                    options={userEmailOptions}
                    onChangeFunc={onHandleSelectChange}
                    {...error.useremailid}
                  /> */}
                </Col>
                <Col className="col-3">
                  <Form.Label size="sm" htmlFor="userrole">
                    Role
                  </Form.Label>
                  <Select
                    name="userrole"
                    title="User Role"
                    value={form.userrole}
                    options={userRoleOptions}
                    onChangeFunc={onHandleSelectChange}
                    {...error.userrole}
                  />
                </Col>
              </Row>
            </Card>
            <Card className="card-Panel form-userCreate-card mt-0">
              <Row>
                <Form.Label size="lg" className="create-usr-warning">
                  Select the relevant fields for user access levels
                </Form.Label>
              </Row>
              <Row className="mt-2 username-header">
                <Col className="col-3">
                  <Form.Label size="sm" htmlFor="userops">
                    Ops
                  </Form.Label>
                  <Select
                    name="userops"
                    title="Ops"
                    value={form.userops}
                    options={opsOptions}
                    onChangeFunc={onHandleSelectChange}
                    {...error.userops}
                  />
                </Col>
                <Col className="col-3">
                  <Form.Label size="sm" htmlFor="usrzone">
                    Zone
                  </Form.Label>
                  <Select
                    name="usrzone"
                    title="Zone"
                    value={form.usrzone}
                    options={userZoneOptions}
                    onChangeFunc={onHandleSelectChange}
                    {...error.usrzone}
                  />
                </Col>
                <Col className="col-3">
                  <Form.Label size="sm" htmlFor="modelType">
                    Model Type
                  </Form.Label>
                  <MultiSelectDrp
                    options={modelOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    name="modelType"
                    title="Model Type"
                    hideSelectedOptions={false}
                    components={{ Option, MultiValue, animatedComponents }}
                    onChange={(item) => {
                      handleModelChange(item);
                    }}
                    allowSelectAll={true}
                    value={optionModelSelected}
                    {...error.modelType}
                  />
                  <span className="text-danger">
                    {form.modelType.length === 0
                      ? "Please select Model Type"
                      : ""}
                  </span>
                </Col>
              </Row>
              <Row>
                <Form.Label size="lg" className="create-usr-warning">
                  Select the relevant fields for user sub access levels
                </Form.Label>
              </Row>
              <Row className="username-header">
                <Col className="col-3">
                  <Form.Label size="sm" htmlFor="usrcountry">
                    Country
                  </Form.Label>
                  &nbsp;
                  <OverlayTrigger
                    placement="right"
                    overlay={tooltip("Type to search or select from dropdown")}
                  >
                    <span>
                      <BiHelpCircle />
                    </span>
                  </OverlayTrigger>
                  <MultiSelectDrp
                    options={countryOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    title="Country"
                    components={{ Option, MultiValue, animatedComponents }}
                    allowSelectAll={true}
                    value={optionCountrySelected}
                    inputId="usrcountry"
                    name="usrcountry"
                    onChange={handleCountryChange}
                    {...error.usrcountry}
                  />
                  <span className="text-danger">
                    {form.usrcountry.length === 0
                      ? "Please select Country"
                      : ""}
                  </span>
                </Col>
              </Row>
              <br />
              <Row className="username-header">
                <Col className="col-3">
                  <Form.Label size="sm" htmlFor="partnerAccNm">
                    Partner Account Name
                  </Form.Label>
                  &nbsp;
                  <OverlayTrigger
                    placement="right"
                    overlay={tooltip("Type to search or select from dropdown")}
                  >
                    <span>
                      <BiHelpCircle />
                    </span>
                  </OverlayTrigger>
                  <MultiSelectDrp
                    options={partnerOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    title="Partner Account Name"
                    hideSelectedOptions={false}
                    components={{ Option, MultiValue, animatedComponents }}
                    allowSelectAll={true}
                    value={optionPartnerSelected}
                    inputId="partnerAccNm"
                    name="partnerAccNm"
                    onChange={handlePartnerChange}
                    {...error.partnerAccNm}
                  />
                  <span className="text-danger">
                    {form.partnerAccNm.length === 0
                      ? "Please select Partner Account Name"
                      : ""}
                  </span>
                </Col>
                <Col>
                  <PartnerAccountList data={optionPartnerSelected} />
                </Col>
              </Row>
            </Card>
            <div>
              <Row className="mb-3" style={{ float: "right", padding: "20px" }}>
                <Col xs="auto">
                  <Button className="btn-upload cancel-header">Cancel</Button>
                </Col>
                <Col xs="auto">
                  <Button
                    className="btn-upload save-header"
                    onClick={handleSubmit}
                  >
                    {props.module}
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </Row>
    </Container>
  );
}

export default SaveUser;
