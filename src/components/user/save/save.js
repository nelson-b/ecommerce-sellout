import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
  Col,
  Form,
  Row,
  Container,
  Breadcrumb,
  Card,
  Tooltip,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import MyMenu from "../../menu/menu.component.js";
import Home from "../../../images/home-icon.png";
import { BiHelpCircle } from "react-icons/bi";
import "./save.css";
import MultiSelectDrp from "../multiSelectDropdown.js";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import {
  countryOptions,
  partnerOptions,
  modelOptions,
  userRoleOptions,
  opsOptions,
  userZoneOptions,
  userEmailOptions,
  userOptions,
} from "../optionsData.js";
import PartnerAccountList from "../partnerAccountList.component.js";
import { useLocation } from "react-router-dom";

function SaveUser(props) {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const userRole = new URLSearchParams(location.search).get("role");

  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

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

  const [optionUsernameSelected, setOptionUsernameSelected] = useState([]);
  const [optionCountrySelected, setOptionCountrySelected] = useState([]);
  const [optionModelSelected, setOptionModelSelected] = useState([]);
  const [optionPartnerSelected, setOptionPartnerSelected] = useState([]);

  const handleUserChange = (selected) => {
    setOptionUsernameSelected(selected);
    console.log("optionSelected", optionCountrySelected);
  };

  const handleCountryChange = (selected) => {
    setOptionCountrySelected(selected);
    console.log("optionSelected", optionCountrySelected);
  };

  const handleModelChange = (selected) => {
    setOptionModelSelected(selected);
    console.log("optionSelected", optionModelSelected);
  };

  const handlePartnerChange = (selected) => {
    setOptionPartnerSelected(selected);
    console.log("optionPartnerSelected", optionPartnerSelected);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    reValidateMode: "onChange",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const successmsg = {
    headerLabel: "Success....",
    variant: "success",
    header: "Data has been saved successfully!!",
    content: ["Navigating you to the Partner list page....."],
  };

  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const [errorRet, setErrorRet] = useState([]);

  const errormsg = {
    headerLabel: "Error....",
    variant: "danger",
    header:
      "There are below errors while processing. Please recitify and retry",
    content: errorRet,
  };

  const onSubmit = (data) => {
    console.log("data", data);
  };

  const onError = (error) => {
    console.log("ERROR:::", error);
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
          <Form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
            <Card className="card-Panel form-userCreate-card">
              <Row className="mt-2 username-header">
                <Form.Group className="mb-4">
                  <Row>
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
                      </OverlayTrigger>
                      <Select
                        isDisabled={props.module === "Update"}
                        aria-labelledby="aria-label"
                        inputId="username"
                        name="username"
                        onMenuOpen={onMenuOpen}
                        onMenuClose={onMenuClose}
                        options={userOptions}
                        onChange={handleUserChange}
                        {...register("username", {
                          required: "User name is required",
                        })}
                      />
                      {errors.username && (
                        <Form.Text className="text-danger">
                          {errors.username.message}
                        </Form.Text>
                      )}
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
                      <Select
                        aria-labelledby="aria-label"
                        inputId="useremailid"
                        name="useremailid"
                        onMenuOpen={onMenuOpen}
                        onMenuClose={onMenuClose}
                        options={userEmailOptions}
                        {...register("useremailid", {
                          required: "User email is required",
                        })}
                      />
                      {errors.useremailid && (
                        <Form.Text className="text-danger">
                          {errors.useremailid.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col className="col-3">
                      <Form.Label size="sm" htmlFor="userrole">
                        Role
                      </Form.Label>
                      <Select
                        aria-labelledby="aria-label"
                        inputId="userrole"
                        name="userrole"
                        onMenuOpen={onMenuOpen}
                        onMenuClose={onMenuClose}
                        options={userRoleOptions}
                        {...register("userrole", {
                          required: "User role is required",
                        })}
                      />
                      {errors.userrole && (
                        <Form.Text className="text-danger">
                          {errors.userrole.message}
                        </Form.Text>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
              </Row>
            </Card>

            <Card className="card-Panel form-userCreate-card mt-0">
              <Row>
                <Form.Label size="lg" className="create-usr-warning">
                  Select the relevant fields for user access levels
                </Form.Label>
              </Row>
              <Row className="mt-2 username-header">
                <Form.Group className="mb-4">
                  <Row>
                    <Col className="col-3">
                      <Form.Label size="sm" htmlFor="userops">
                        Ops
                      </Form.Label>
                      <Select
                        aria-labelledby="aria-label"
                        inputId="userops"
                        name="userops"
                        onMenuOpen={onMenuOpen}
                        onMenuClose={onMenuClose}
                        options={opsOptions}
                        {...register("userops", {
                          required: "User Ops is required",
                        })}
                      />
                      {errors.userops && (
                        <Form.Text className="text-danger">
                          {errors.userops.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col className="col-3">
                      <Form.Label size="sm" htmlFor="usrzone">
                        Zone
                      </Form.Label>
                      <Select
                        aria-labelledby="aria-label"
                        inputId="usrzone"
                        name="usrzone"
                        onMenuOpen={onMenuOpen}
                        onMenuClose={onMenuClose}
                        options={userZoneOptions}
                        {...register("usrzone", {
                          required: "User zone is required",
                        })}
                      />
                      {errors.usrzone && (
                        <Form.Text className="text-danger">
                          {errors.usrzone.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col className="col-3">
                      <Form.Label size="sm" htmlFor="modelType">
                        Model Type
                      </Form.Label>
                      <MultiSelectDrp
                        options={modelOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{
                          Option,
                          MultiValue,
                          animatedComponents,
                        }}
                        onChange={handleModelChange}
                        allowSelectAll={true}
                        value={optionModelSelected}
                        inputId="modelType"
                        {...register("modelType", {
                          required: "Model type is required",
                        })}
                      />
                      {errors.modelType && (
                        <Form.Text className="text-danger">
                          {errors.modelType.message}
                        </Form.Text>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
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
                    components={{ Option, MultiValue, animatedComponents }}
                    onChange={handleCountryChange}
                    allowSelectAll={true}
                    value={optionCountrySelected}
                    inputId="usrcountry"
                    {...register("usrcountry", {
                      required: "User country is required",
                    })}
                  />
                  {errors.modelType && (
                    <Form.Text className="text-danger">
                      {errors.modelType.message}
                    </Form.Text>
                  )}
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
                    hideSelectedOptions={false}
                    components={{ Option, MultiValue, animatedComponents }}
                    onChange={handlePartnerChange}
                    allowSelectAll={true}
                    value={optionPartnerSelected}
                    inputId="partnerAccNm"
                    {...register("partnerAccNm", {
                      required: "Partner Account Name is required",
                    })}
                  />
                  {errors.partnerAccNm && (
                    <Form.Text className="text-danger">
                      {errors.partnerAccNm.message}
                    </Form.Text>
                  )}
                </Col>
                <Col>
                  <PartnerAccountList />
                </Col>
              </Row>

              <div>
                <Row
                  className="mb-3"
                  style={{ float: "right", padding: "20px" }}
                >
                  <Col xs="auto">
                    <Button
                      className="btn-upload cancel-header"
                      onClick={() => {
                        handleUserCancel(userRole);
                      }}
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button className="btn-upload save-header" type="submit">
                      {props.module}
                    </Button>
                  </Col>
                </Row>
              </div>
            </Card>
          </Form>
        </Container>
      </Row>
    </Container>
  );
}

export default SaveUser;
