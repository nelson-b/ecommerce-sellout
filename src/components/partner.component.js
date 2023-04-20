import React, { useState } from "react";
import { connect } from "react-redux";
import { createSellOutData } from "../actions/selloutaction";
import { Button, Col, Form, Row } from "react-bootstrap";
// import { Form, Row, Col, FormGroup, Form.Label, Input, Button } from "reactstrap";

const PartnerComponent = () => {
  const initialState = {
    partner_name: "",
    partner_group: "",
    activation_date: "",
    country: "",
    business_type: "",
    playbook_type: "",
    bopp_type: "",
    model_type: "",
    currency: "",
    data_collection_type: "",
    gtm_type: "",
    ia_distributor: "",
    marketplace_seller: "",
    entity: "",
    url_address_partner: "",
    business_model: "",
    multi_country_dest: "",
    sellout_margin: "",
  };

  const [formData, setFormData] = useState(initialState);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const createPartnerHandler = () => {
    console.log(formData);
    setFormData(initialState);
  };

  return (
    <div>
      <h5 className="create-partner-header">Create New Partner</h5>

      <div className="create-partner-wrapper">
        <Form>
          <Form.Group className="mb-4">
            <Row>
              <Col>
                <Form.Label htmlFor="partner_name">Partner Name</Form.Label>
                <Form.Control
                  id="partner_name"
                  name="partner_name"
                  type="text"
                  onChange={(e) => onChangeHandler(e)}
                />
              </Col>
              <Col>
                <Form.Label htmlFor="partner_group">Partner Group</Form.Label>
                <Form.Control
                  id="partner_group"
                  name="partner_group"
                  type="text"
                  onChange={(e) => onChangeHandler(e)}
                />
              </Col>
              <Col>
                <Form.Label htmlFor="activation_date">
                  Activation Date
                </Form.Label>
                <Form.Control
                  id="activation_date"
                  name="activation_date"
                  type="date"
                  onChange={(e) => onChangeHandler(e)}
                />
              </Col>
              <Col>
                <Form.Label htmlFor="country">Country</Form.Label>
                <Form.Select
                  id="country"
                  name="country"
                  onChange={(e) => onChangeHandler(e)}
                >
                  <option></option>
                  <option>India</option>
                  <option>USA</option>
                  <option>France</option>
                  <option>Spain</option>
                  <option>Italy</option>
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-4">
            <Row>
              <Col>
                <Form.Label htmlFor="business_type">Business Type</Form.Label>
                <Form.Select
                  id="business_type"
                  name="business_type"
                  onChange={(e) => onChangeHandler(e)}
                >
                  <option></option>
                  <option>India</option>
                  <option>USA</option>
                  <option>France</option>
                  <option>Spain</option>
                  <option>Italy</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label htmlFor="playbook_type">Playbook Type</Form.Label>
                <Form.Select
                  id="playbook_type"
                  name="playbook_type"
                  onChange={(e) => onChangeHandler(e)}
                >
                  <option></option>
                  <option>India</option>
                  <option>USA</option>
                  <option>France</option>
                  <option>Spain</option>
                  <option>Italy</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label htmlFor="bopp_type"> Bopp Type</Form.Label>
                <Form.Select
                  id="bopp_type"
                  name="bopp_type"
                  onChange={(e) => onChangeHandler(e)}
                >
                  <option></option>
                  <option>India</option>
                  <option>USA</option>
                  <option>France</option>
                  <option>Spain</option>
                  <option>Italy</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label htmlFor="model_type"> Model Type</Form.Label>
                <Form.Select
                  id="model_type"
                  name="model_type"
                  onChange={(e) => onChangeHandler(e)}
                >
                  <option></option>
                  <option>India</option>
                  <option>USA</option>
                  <option>France</option>
                  <option>Spain</option>
                  <option>Italy</option>
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-4">
            <Row>
              <Col>
                <Form.Label htmlFor="currency">
                  Currency of Sellout Reporting
                </Form.Label>
                <Form.Select
                  id="currency"
                  name="currency"
                  onChange={(e) => onChangeHandler(e)}
                >
                  <option></option>
                  <option>India</option>
                  <option>USA</option>
                  <option>France</option>
                  <option>Spain</option>
                  <option>Italy</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label htmlFor="data_collection_type">
                  Data Collection Type
                </Form.Label>
                <Form.Select
                  id="data_collection_type"
                  name="data_collection_type"
                  onChange={(e) => onChangeHandler(e)}
                >
                  <option></option>
                  <option>India</option>
                  <option>USA</option>
                  <option>France</option>
                  <option>Spain</option>
                  <option>Italy</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label htmlFor="gtm_type">GTM Type</Form.Label>
                <Form.Select
                  id="gtm_type"
                  name="gtm_type"
                  onChange={(e) => onChangeHandler(e)}
                >
                  <option></option>
                  <option>India</option>
                  <option>USA</option>
                  <option>France</option>
                  <option>Spain</option>
                  <option>Italy</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label htmlFor="ia_distributor">IA Distributor</Form.Label>
                <Form.Select
                  id="ia_distributor"
                  name="ia_distributor"
                  onChange={(e) => onChangeHandler(e)}
                >
                  <option></option>
                  <option>India</option>
                  <option>USA</option>
                  <option>France</option>
                  <option>Spain</option>
                  <option>Italy</option>
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-4">
            <Row>
              <Col>
                <Form.Label htmlFor="marketplace_seller">
                  Marketplace Seller
                </Form.Label>
                <Form.Select
                  id="marketplace_seller"
                  name="marketplace_seller"
                  onChange={(e) => onChangeHandler(e)}
                >
                  <option></option>
                  <option>India</option>
                  <option>USA</option>
                  <option>France</option>
                  <option>Spain</option>
                  <option>Italy</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label htmlFor="entity">Entity</Form.Label>
                <Form.Select
                  id="entity"
                  name="entity"
                  onChange={(e) => onChangeHandler(e)}
                >
                  <option></option>
                  <option>India</option>
                  <option>USA</option>
                  <option>France</option>
                  <option>Spain</option>
                  <option>Italy</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label htmlFor="url_address_partner">
                  URL Address of Partner
                </Form.Label>
                <Form.Control
                  id="url_address_partner"
                  name="url_address_partner"
                  type="text"
                  onChange={(e) => onChangeHandler(e)}
                />
              </Col>
              <Col>
                <Form.Label htmlFor="business_model">Business Model</Form.Label>
                <Form.Select
                  id="business_model"
                  name="business_model"
                  onChange={(e) => onChangeHandler(e)}
                >
                  <option></option>
                  <option>India</option>
                  <option>USA</option>
                  <option>France</option>
                  <option>Spain</option>
                  <option>Italy</option>
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-4">
            <Row>
              <Col>
                <Form.Label htmlFor="multi_country_dest">
                  Multi-country Destination
                </Form.Label>
                <Form.Select
                  id="multi_country_dest"
                  name="multi_country_dest"
                  onChange={(e) => onChangeHandler(e)}
                >
                  <option></option>
                  <option>India</option>
                  <option>USA</option>
                  <option>France</option>
                  <option>Spain</option>
                  <option>Italy</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label htmlFor="sellout_margin">
                  Estimated Sellout Margin
                </Form.Label>
                <Form.Select
                  id="sellout_margin"
                  name="sellout_margin"
                  onChange={(e) => onChangeHandler(e)}
                >
                  <option></option>
                  <option>India</option>
                  <option>USA</option>
                  <option>France</option>
                  <option>Spain</option>
                  <option>Italy</option>
                </Form.Select>
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
          </Form.Group>
        </Form>
      </div>

      <div className="btn-create-partner">
        <Button variant="outline-primary" className="btn btn-cancel">
          Cancel
        </Button>
        <Button
          variant="secondary"
          className="btn btn-create"
          onClick={createPartnerHandler}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default connect(null, { createSellOutData })(PartnerComponent);
