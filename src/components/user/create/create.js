import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Col, Form, Row, Container, Breadcrumb, Card, Tooltip, OverlayTrigger, Button,
} from "react-bootstrap";
import MyMenu from "../../menu/menu.component.js";
import Home from "../../../images/home-icon.png";
import { BiHelpCircle } from "react-icons/bi";
import "./create.css" 
import MultiSelectDrp from "../multiSelectDropdown";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import { countryOptions, partnerOptions, modelOptions } from "../optionsData.js";
import PartnerAccountList from "../partnerAccountList.component.js";

function CreateUser() {                
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  const Option = props => {
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

  const MultiValue = props => (
    <components.MultiValue {...props}>
      <span>{props.data.label}</span>
    </components.MultiValue>
  );
  
  const animatedComponents = makeAnimated();

  const [optionCountrySelected, setOptionCountrySelected] = useState([]);
  const [optionModelSelected, setOptionModelSelected] = useState([]);
  const [optionPartnerSelected, setOptionPartnerSelected] = useState([]);

  const handleCountryChange = (selected) => {
    setOptionCountrySelected(selected);
    console.log('optionSelected', optionCountrySelected);
  }

  const handleModelChange = (selected) => {
    setOptionModelSelected(selected);
    console.log('optionSelected', optionModelSelected);
  }

  const handlePartnerChange = (selected) => {
    setOptionPartnerSelected(selected);
    console.log('optionPartnerSelected', optionPartnerSelected);
  }
  
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
    header: 'Data has been saved successfully!!',
    content: ['Navigating you to the Partner list page.....']
  }

  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const [errorRet, setErrorRet] = useState([]);

  const errormsg = {
    headerLabel: "Error....",
    variant: "danger",
    header: "There are below errors while processing. Please recitify and retry",
    content: errorRet
  }

  const onSubmit = (data) => {

  }

  const onError = (error) => {
    console.log("ERROR:::", error);
  };

  const tooltip = (val) => <Tooltip id="tooltip">{val}</Tooltip>;

  return (
    <Container fluid>
      <Row>
        <MyMenu />
      </Row>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item href="/superUserHome">
            <img
              src={Home}
              alt="home"
              style={{ height: "20px", width: "80px", cursor: "pointer" }}
            />
          </Breadcrumb.Item>
          <span> &nbsp;{">"}</span>
            <Breadcrumb.Item active style={{ fontWeight: "bold" }}>
              &nbsp;Create User
            </Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
          <h5 className="form-sellout-header">Create New User</h5>
          <Container fluid>
            <Form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
              <Row>
                <Card className="card-Panel form-userCreate-card">
                  <Form.Group className="mb-4">
                  <Row>
                      <Col>
                            <Form.Label size="sm" htmlFor="username">
                              Username
                            </Form.Label>
                            &nbsp;
                            <OverlayTrigger
                              placement="right"
                              overlay={tooltip(
                                "Enter a name to search or select from dropdown"
                              )}>
                              <span>
                                <BiHelpCircle />
                              </span>
                            </OverlayTrigger>
                            <Select
                              aria-labelledby="aria-label"
                              inputId="aria-example-input"
                              name="aria-live-color"
                              onMenuOpen={onMenuOpen}
                              onMenuClose={onMenuClose}
                              options={countryOptions}
                            />
                      </Col>
                      <Col>
                            <Form.Label size="sm" htmlFor="useremailid">
                              User email ID
                            </Form.Label>
                            &nbsp;
                            <OverlayTrigger
                              placement="right"
                              overlay={tooltip(
                                "Enter name to search or select from dropdown"
                              )}>
                              <span>
                                <BiHelpCircle />
                              </span>
                            </OverlayTrigger>
                            <Select
                              aria-labelledby="aria-label"
                              inputId="aria-example-input"
                              name="aria-live-color"
                              onMenuOpen={onMenuOpen}
                              onMenuClose={onMenuClose}
                              options={countryOptions}
                            />
                      </Col>
                      <Col>
                            <Form.Label size="sm" htmlFor="userrole">
                              Role
                            </Form.Label>
                            <Select
                              aria-labelledby="aria-label"
                              inputId="aria-example-input"
                              name="aria-live-color"
                              onMenuOpen={onMenuOpen}
                              onMenuClose={onMenuClose}
                              options={countryOptions}
                            />
                      </Col>
                  </Row>
                  </Form.Group>
                </Card>
              </Row>
              <Row>
                <Card className="card-Panel form-userCreate-card">
                  <Row>
                    <Form.Label size="lg" className="create-usr-warning">
                      Select the relevant fields for user access levels
                    </Form.Label>
                  </Row>
                  <Row>
                    <Form.Group className="mb-4">
                    <Row>
                        <Col>
                              <Form.Label size="sm" htmlFor="ops">
                                Ops
                              </Form.Label>
                              <Select
                              aria-labelledby="aria-label"
                              inputId="aria-example-input"
                              name="aria-live-color"
                              onMenuOpen={onMenuOpen}
                              onMenuClose={onMenuClose}
                              options={countryOptions}
                            />
                        </Col>
                        <Col>
                              <Form.Label size="sm" htmlFor="usrzone">
                                Zone
                              </Form.Label>
                              <Select
                                aria-labelledby="aria-label"
                                inputId="aria-example-input"
                                name="aria-live-color"
                                onMenuOpen={onMenuOpen}
                                onMenuClose={onMenuClose}
                                options={countryOptions}
                              />
                        </Col>
                        <Col>
                              <Form.Label size="sm" htmlFor="modelType">
                                Model Type
                              </Form.Label>
                              <MultiSelectDrp
                                options={ modelOptions }
                                isMulti
                                closeMenuOnSelect={ false }
                                hideSelectedOptions={ false }
                                components={{ Option, MultiValue, animatedComponents }}
                                onChange={ handleModelChange }
                                allowSelectAll={true}
                                value={optionModelSelected}
                              />
                      </Col>
                    </Row>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Label size="lg" className="create-usr-warning">
                      Select the relevant fields for user sub access levels
                    </Form.Label>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Label size="sm" htmlFor="usrcountry">Country</Form.Label>
                      &nbsp;
                      <OverlayTrigger
                        placement="right"
                        overlay={tooltip(
                        "Type to search or select from dropdown"
                        )}>
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
                        onChange={ handleCountryChange }
                        allowSelectAll={true}
                        value={optionCountrySelected}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>                  
                    <Col>
                        <Form.Label size="sm" htmlFor="partnerAccNm">Partner Account Name</Form.Label>
                        &nbsp;
                        <OverlayTrigger
                          placement="right"
                          overlay={tooltip(
                          "Type to search or select from dropdown"
                          )}>
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
                          value={optionPartnerSelected} />
                    </Col>
                    <Col><PartnerAccountList/></Col>
                  </Row>
                </Card>
              </Row>
              <Row className="mb-3" style={{ float: "right", padding: "20px" }}>
                <Col xs="auto">
                  <Button
                    className="btn-upload cancel-header">
                    Cancel
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button className="btn-upload save-header" type="submit">
                    Create
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
      </Row>
    </Container>
  );
}

export default CreateUser;