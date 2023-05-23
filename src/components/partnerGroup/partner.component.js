import React, { useState } from "react";
import { connect } from "react-redux";
import { createSellOutData } from "../../actions/selloutaction";
import {
  Button,
  Col,
  Form,
  Row,
  Container,
  Breadcrumb,
  Card,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import MyMenu from "../menu/menu.component.js";
import { BiHome, BiHelpCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import Home from "../../images/home-icon.png";
import partnerData from "../../data/partnerList.json";
import { useNavigate } from "react-router-dom";
import "./partner.component.css";
import { CreatePartnerData } from "../../actions/partneraction";

function PartnerComponent(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const initialState = {
    platform_name: "",
    country: "",
    partnerGroup: "",
    se_electricEntity: "",
    reseller_seller: "",
    activation_date: "",
    business_type: "",
    partner_acc_name: "",
    model_type: "",
    url_address_partner: "",
    currency: "",
    data_collection_type: "",
    partnerSellOutMargin: "",
    playbook_type: "",
    bopp_type: "",
    gtm_type: "",
    deactivation_date: "",
    deactivation_reason: "",
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

  const [formData, setFormData] = useState(initialState);
  const data = partnerData.find((e) => e.partnerID === id);

  const onSubmit = (data) => {
    console.log("form data", data);
  };

  const onError = (error) => {
    console.log("ERROR:::", error);
  };

  const tooltip = (val) => <Tooltip id="tooltip">{val}</Tooltip>;

  //create api
  const savePartner = (data) => {
    CreatePartnerData(data)
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlePatnerCancel = () => {
    navigate("/partnerList");
  };

  const handleClearClick = () => {
    window.location.reload();
  };

  return (
    <Container fluid>
      <Row>
        <MyMenu />
      </Row>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item href="/editorHome">
            <img
              src={Home}
              alt="home"
              style={{ height: "20px", width: "80px", cursor: "pointer" }}
            />
          </Breadcrumb.Item>
          <span> &nbsp;{">"}</span>
          {props.isCreatedModule && (
            <Breadcrumb.Item active style={{ fontWeight: "bold" }}>
              &nbsp;Create Partner
            </Breadcrumb.Item>
          )}
          {!props.isCreatedModule && (
            <Breadcrumb.Item active style={{ fontWeight: "bold" }}>
              &nbsp;Update Partner
            </Breadcrumb.Item>
          )}
        </Breadcrumb>
      </Row>
      <Row>
        {props.isCreatedModule && (
          <h5 className="partner-header">Create New Partner</h5>
        )}
        {!props.isCreatedModule && (
          <h5 className="partner-header">Update Partner</h5>
        )}
        <Container fluid>
          <Form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
            <Row>
              <Card className="card-Panel">
                <Form.Group className="mb-4">
                  <Row>
                    <Col>
                      <Form.Label size="sm" htmlFor="platform_name">
                        Platform Name
                      </Form.Label>
                      &nbsp;
                      <OverlayTrigger
                        placement="right"
                        overlay={tooltip(
                          "Enter the Account Name to create new partner."
                        )}
                      >
                        <span>
                          <BiHelpCircle />
                        </span>
                      </OverlayTrigger>
                      <Form.Control
                        size="sm"
                        id="platform_name"
                        name="platform_name"
                        disabled={!props.isCreatedModule}
                        type="text"
                        value={data?.platformNmae}
                        {...register("platform_name", {
                          required: "Platform name is required",
                        })}
                      />
                      {errors.platform_name && (
                        <Form.Text className="text-danger">
                          {errors.platform_name.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="country">
                        Country
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        id="country"
                        name="country"
                        {...register("country", {
                          required: "Country is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option value={"India"}>India</option>
                        <option value={"USA"}>USA</option>
                        <option value={"France"}>France</option>
                        <option value={"Spain"}>Spain</option>
                        <option value={"Italy"}>Italy</option>
                      </Form.Select>
                      {errors.country && (
                        <Form.Text className="text-danger">
                          {errors.country.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="partnerGroup">
                        Partner Group
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        id="partnerGroup"
                        name="partnerGroup"
                        {...register("partnerGroup", {
                          required: "Partner group is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option>Partner 1</option>
                        <option>Partner 2</option>
                        <option>Partner 3</option>
                      </Form.Select>
                      {errors.partnerGroup && (
                        <Form.Text className="text-danger">
                          {errors.partnerGroup.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="se_electricEntity">
                        Schneider Electric Entity
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        id="se_electricEntity"
                        name="se_electricEntity"
                        {...register("se_electricEntity", {
                          required: "Schneider Electric Entity is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option>Entity 1</option>
                        <option>Entity 2</option>
                        <option>Entity 3</option>
                      </Form.Select>
                      {errors.se_electricEntity && (
                        <Form.Text className="text-danger">
                          {errors.se_electricEntity.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="reseller_seller">
                        Reseller Name
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        id="partner_id"
                        name="partner_id"
                        disabled
                        type="text"
                        value={data?.reseller}
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Row>
                    <Col>
                      <Form.Label size="sm" htmlFor="partner_id">
                        Partner ID
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        id="partner_id"
                        name="partner_id"
                        disabled
                        type="text"
                        value={data?.partnerID}
                      />
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="partner_acc_name">
                        Partner Account Name
                      </Form.Label>
                      &nbsp;
                      <OverlayTrigger
                        placement="right"
                        overlay={tooltip(
                          "Partner name + 3 letters for country"
                        )}
                      >
                        <span>
                          <BiHelpCircle />
                        </span>
                      </OverlayTrigger>
                      <Form.Control
                        size="sm"
                        id="partner_acc_name"
                        name="partner_acc_name"
                        type="text"
                        disabled
                        value={data?.PartnerAccount}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="activation_date">
                        Activation Date
                      </Form.Label>
                      &nbsp;
                      <OverlayTrigger
                        placement="right"
                        overlay={tooltip("dd-mm-yyyy")}
                      >
                        <span>
                          <BiHelpCircle />
                        </span>
                      </OverlayTrigger>
                      <Form.Control
                        size="sm"
                        id="activation_date"
                        name="activation_date"
                        disabled={!props.isCreatedModule}
                        type="date"
                        {...register("activation_date", {
                          required: "Activation Date is required",
                        })}
                      />
                      {errors.activation_date && (
                        <Form.Text className="text-danger">
                          {errors.activation_date.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="business_type">
                        Business Type
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        id="business_type"
                        name="business_type"
                        {...register("business_type", {
                          required: "Business Type is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option>Electrical</option>
                        <option>Solar</option>
                      </Form.Select>
                      {errors.business_type && (
                        <Form.Text className="text-danger">
                          {errors.business_type.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="model_type">
                        Model Type
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        id="model_type"
                        name="model_type"
                        {...register("model_type", {
                          required: "Model Type is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option>E1 - Dist</option>
                        <option>E2</option>
                        <option>E3</option>
                      </Form.Select>
                      {errors.model_type && (
                        <Form.Text className="text-danger">
                          {errors.model_type.message}
                        </Form.Text>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Row>
                    <Col>
                      <Form.Label size="sm" htmlFor="url_address_partner">
                        URL Address of Partner
                      </Form.Label>
                      &nbsp;
                      <OverlayTrigger
                        placement="right"
                        overlay={tooltip("Enter valid Partner URL")}
                      >
                        <span>
                          <BiHelpCircle />
                        </span>
                      </OverlayTrigger>
                      <Form.Control
                        size="sm"
                        id="url_address_partner"
                        name="url_address_partner"
                        type="url"
                        value={data?.partnerURL}
                        {...register("url_address_partner", {
                          required: "URL Address of Partner is required",
                          pattern: {
                            value:
                              /^((https?|ftp|smtp|http):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/i,
                            message: "URL format incorrect",
                          },
                        })}
                      />
                      {errors.url_address_partner && (
                        <Form.Text className="text-danger">
                          {errors.url_address_partner.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="currency">
                        Currency of Sellout Reporting
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        id="currency"
                        name="currency"
                        {...register("currency", {
                          required: "Currency of Sellout Reporting is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option>AUD</option>
                        <option>INR</option>
                        <option>USD</option>
                      </Form.Select>
                      {errors.currency && (
                        <Form.Text className="text-danger">
                          {errors.currency.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="data_collection_type">
                        Data Collection Type
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        id="data_collection_type"
                        name="data_collection_type"
                        {...register("data_collection_type", {
                          required: "Data Collection Type is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option>Actual Sellout</option>
                        <option>Estimated Sellout</option>
                      </Form.Select>
                      {errors.data_collection_type && (
                        <Form.Text className="text-danger">
                          {errors.data_collection_type.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="partnerSellOutMargin">
                        Partner Sellout Margin (%)
                      </Form.Label>
                      &nbsp;
                      <OverlayTrigger
                        placement="right"
                        overlay={tooltip("% with 2 decimals")}
                      >
                        <span>
                          <BiHelpCircle />
                        </span>
                      </OverlayTrigger>
                      <Form.Control
                        size="sm"
                        id="partnerSellOutMargin"
                        name="partnerSellOutMargin"
                        type="number"
                        {...register("partnerSellOutMargin", {
                          required: "Partner Sellout Margin is required",
                        })}
                      />
                      {errors.partnerSellOutMargin && (
                        <Form.Text className="text-danger">
                          {errors.partnerSellOutMargin.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="playbook_type">
                        E2 Playbook Type
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        id="playbook_type"
                        name="playbook_type"
                        {...register("playbook_type", {
                          required: "E2 Playbook Type is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option value={"type1"}>Type 1</option>
                        <option value={"type2"}>Type 2</option>
                        <option value={"type3"}>Type 3</option>
                      </Form.Select>
                      {errors.playbook_type && (
                        <Form.Text className="text-danger">
                          {errors.playbook_type.message}
                        </Form.Text>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Row
                    className={
                      props.isCreatedModule
                        ? "partnerRowCreate"
                        : "partnerRowUpdate"
                    }
                  >
                    <Col>
                      <Form.Label size="sm" htmlFor="bopp_type">
                        Bopp Type
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        id="bopp_type"
                        className="field-Prop"
                        name="bopp_type"
                        {...register("bopp_type", {
                          required: "Bopp Type is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option value={"Adopter"}>Adopter</option>
                        <option value={"Leader"}>Leader</option>
                        <option value={"Novice"}>Novice</option>
                        <option value={"Rising Stars"}>Rising Stars</option>
                      </Form.Select>
                      {errors.bopp_type && (
                        <Form.Text className="text-danger">
                          {errors.bopp_type.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="gtm_type">
                        GTM Type
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        className="field-Prop"
                        id="gtm_type"
                        name="gtm_type"
                        {...register("gtm_type", {
                          required: "GTM Type is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option>Direct</option>
                        <option>Indirect</option>
                      </Form.Select>
                      {errors.gtm_type && (
                        <Form.Text className="text-danger">
                          {errors.gtm_type.message}
                        </Form.Text>
                      )}
                    </Col>
                    {!props.isCreatedModule && (
                      <Col>
                        <Form.Label size="sm" htmlFor="deactivation_date">
                          Deactivation Date
                        </Form.Label>
                        &nbsp;
                        <OverlayTrigger
                          placement="right"
                          overlay={tooltip("dd-mm-yyyy")}
                        >
                          <span>
                            <BiHelpCircle />
                          </span>
                        </OverlayTrigger>
                        <Form.Control
                          size="sm"
                          id="deactivation_date"
                          name="deactivation_date"
                          className="field-Prop"
                          type="date"
                          {...register("deactivation_date", {
                            required: "Deactivation Date is required",
                          })}
                        />
                        {errors.deactivation_date && (
                          <Form.Text className="text-danger">
                            {errors.deactivation_date.message}
                          </Form.Text>
                        )}
                      </Col>
                    )}
                    {!props.isCreatedModule && (
                      <Col>
                        <Form.Label size="sm" htmlFor="deactivation_reason">
                          Deactivation reason
                        </Form.Label>
                        <Form.Select
                          size="sm"
                          className="field-Prop"
                          id="deactivation_reason"
                          name="deactivation_reason"
                          {...register("deactivation_reason", {
                            required: "GTM Type is required",
                          })}
                        >
                          <option value="">N/A</option>
                          <option>Partner not working with SE anymore</option>
                          <option>
                            Acquired by/ integrated in one of our other partners
                          </option>
                        </Form.Select>
                        {errors.deactivation_reason && (
                          <Form.Text className="text-danger">
                            {errors.deactivation_reason.message}
                          </Form.Text>
                        )}
                      </Col>
                    )}
                  </Row>
                </Form.Group>
              </Card>
            </Row>
            {!props.isCreatedModule && (
              <Row>
                <Form.Group className="mb-4">
                  <Row>
                    <Col>
                      <Form.Label size="sm" htmlFor="editor">
                        Editor
                      </Form.Label>
                      &nbsp;
                      <Form.Control
                        size="sm"
                        id="editor"
                        name="editor"
                        disabled={!props.isCreatedModule}
                        type="text"
                        value={data?.editor}
                      />
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="backupEditor">
                        Backup Editor
                      </Form.Label>
                      &nbsp;
                      <Form.Control
                        size="sm"
                        id="editor"
                        name="editor"
                        disabled={!props.isCreatedModule}
                        type="text"
                        value={data?.backup}
                      />
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="approver1">
                        Approver 1
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        id="approver1"
                        name="approver1"
                        disabled={!props.isCreatedModule}
                        type="text"
                        value={data?.Approver1}
                      />
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="approver2">
                        Approver 2
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        id="approver2"
                        name="approver2"
                        disabled={!props.isCreatedModule}
                        type="text"
                        value={data?.Approver2}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Row>
            )}
            <Row className="mb-3" style={{ float: "right", marginTop: "10px" }}>
              {props.isCreatedModule ? (
                <Col xs="auto">
                  <Button
                    className="btn-upload cancel-header"
                    onClick={() => {
                      handlePatnerCancel();
                    }}
                  >
                    Cancel
                  </Button>
                </Col>
              ) : (
                <Col xs="auto">
                  <Button
                    className="btn-upload cancel-header"
                    onClick={() => {
                      handleClearClick();
                    }}
                  >
                    Cancel
                  </Button>
                </Col>
              )}

              <Col xs="auto">
                <Button className="btn-upload save-header" type="submit">
                  {props.isCreatedModule ? "Create" : "Update"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Row>
    </Container>
  );
}

export default connect(null, { createSellOutData })(PartnerComponent);
