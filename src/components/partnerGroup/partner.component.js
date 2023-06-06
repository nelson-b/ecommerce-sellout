import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Col, Form, Row, Container, Breadcrumb, Card, Tooltip, OverlayTrigger,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import MyMenu from "../menu/menu.component.js";
import { BiHelpCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import Home from "../../images/home-icon.png";
import partnerData from "../../data/partnerList.json";
import "./partner.component.css";
import { CreatePartnerData } from "../../actions/partneraction";
import AlertModel from "../modal/alertModel";
import { useNavigate } from "react-router-dom";
import { roles } from "../constant.js";
function PartnerComponent(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const userRole = new URLSearchParams(location.search).get("role");
  
  const initialState = {
    platform_name: "",
    country_code: "",
    partner_group: "",
    se_entity: "",
    reseller_name: "",
    activation_date: "",
    business_type:"",
    partner_account_name: "",
    model_type: "",
    partner_url: "",
    trans_currency_code: "",
    data_collection_type: "",
    partner_sellout_margin: "",
    e2_playbook_type: "",
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
  
  const data = partnerData.find((e)=> e.partnerID === id);

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
    console.log("form data", data);
    data.created_by = 'test123';
    data.modified_by = 'test123';
    data.status = 'approved';
    data.partner_account_name = data.platform_name + '_' + data.reseller_name + '_' + data.se_entity;
    
    //create api
    props.CreatePartnerData(data)
      .then((data) => {
        setShowSuccessModal(true);
        setShowErrorModal(false);
        setTimeout(()=>navigate('/partner/list'), 3000);
      })
      .catch((e) => {
        setShowSuccessModal(false);
        setErrorRet([e.message]);
        setShowErrorModal(true);
        console.log('Error', e);
      });
  };

  const onError = (error) => {
    console.log("ERROR:::", error);
  };

  const tooltip = (val) => <Tooltip id="tooltip">{val}</Tooltip>;

  const handlePatnerCancel = () => {
    navigate(`/partner/list?role=${userRole}`);
  };

  return (
    <Container fluid>
      <Row>
        <MyMenu />
      </Row>
      <Row>
        <Breadcrumb>
        {userRole === "editor" && (
          <Breadcrumb.Item href="/editor/home">
            <img
              src={Home}
              alt="home"
              style={{ height: "20px", width: "80px", cursor: "pointer" }}
            />
          </Breadcrumb.Item>
          )}
          {userRole === "approver" && (
          <Breadcrumb.Item href="/approver/home">
            <img
              src={Home}
              alt="home"
              style={{ height: "20px", width: "80px", cursor: "pointer" }}
            />
          </Breadcrumb.Item>
          )}
          {userRole === "superApproverUser" && (
          <Breadcrumb.Item href="/superUser/home">
            <img
              src={Home}
              alt="home"
              style={{ height: "20px", width: "80px", cursor: "pointer" }}
            />
          </Breadcrumb.Item>
          )}
          {userRole === "superUser" && (
          <Breadcrumb.Item href="/superUser">
            <img
              src={Home}
              alt="home"
              style={{ height: "20px", width: "80px", cursor: "pointer" }}
            />
          </Breadcrumb.Item>
          )}
          {userRole === "admin" && (
          <Breadcrumb.Item href="/admin/home">
            <img
              src={Home}
              alt="home"
              style={{ height: "20px", width: "80px", cursor: "pointer" }}
            />
          </Breadcrumb.Item>
          )}
          <span> &nbsp;{">"}</span>
            <Breadcrumb.Item active style={{ fontWeight: "bold" }}>
              &nbsp;{props.module} Partner
            </Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <h5 className="form-sellout-header">{props.module} New Partner</h5>
        <Container fluid>
          <Form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
            <Row>
              <Card className="card-Panel form-partner-card">
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
                        disabled={props.module === 'Update'}
                        type="text"
                        value={data?.platformNmae}
                        {...register("platform_name", {
                          required: "Platform name is required",
                          pattern: {
                            value:
                            /^[A-Za-z]+$/i,
                            message: "Platform name can have only alphabets",
                          },
                        })}
                      />
                      {errors.platform_name && (
                        <Form.Text className="text-danger">
                          {errors.platform_name.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="country_code">
                        Country
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        id="country_code"
                        name="country_code"
                        {...register("country_code", {
                          required: "Country is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option value={"USA"}>USA</option>
                      </Form.Select>
                      {errors.country_code && (
                        <Form.Text className="text-danger">
                          {errors.country_code.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="partner_group">
                        Partner Group
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        id="partner_group"
                        name="partner_group"
                        {...register("partner_group", {
                          required: "Partner group is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option>Partner 1</option>
                        <option>Partner 2</option>
                        <option>Partner 3</option>
                      </Form.Select>
                      {errors.partner_group && (
                        <Form.Text className="text-danger">
                          {errors.partner_group.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="se_entity">
                        Schneider Electric Entity
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        id="se_entity"
                        name="se_entity"
                        {...register("se_entity", {
                          required: "Schneider Electric Entity is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option>Entity 1</option>
                        <option>Entity 2</option>
                        <option>Entity 3</option>
                      </Form.Select>
                      {errors.se_entity && (
                        <Form.Text className="text-danger">
                          {errors.se_entity.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="reseller_name">
                        Reseller Name
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        id="reseller_name"
                        name="reseller_name"
                        type="text"
                        {...register("reseller_name", {
                          required: "Reseller name is required",
                          pattern: {
                            value:
                            /^[A-Za-z]+$/i,
                            message: "Reseller name can have only alphabets",
                          },
                        })}
                      />
                      {errors.reseller_name && (
                        <Form.Text className="text-danger">
                          {errors.reseller_name.message}
                        </Form.Text>
                      )}
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
                      <Form.Label size="sm" htmlFor="partner_account_name">
                        Partner Account Name
                      </Form.Label>
                      &nbsp;
                      <OverlayTrigger
                        placement="right"
                        overlay={tooltip(
                          "Platform name + 3 letters for country"
                        )}
                      >
                        <span>
                          <BiHelpCircle />
                        </span>
                      </OverlayTrigger>
                      <Form.Control
                        size="sm"
                        id="partner_account_name"
                        name="partner_account_name"
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
                        disabled={props.module === 'Update'}
                        max={new Date().toISOString().split('T')[0]}
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
                      <Form.Label size="sm" htmlFor="partner_url">
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
                        id="partner_url"
                        name="partner_url"
                        type="url"
                        value={data?.partnerURL}
                        {...register("partner_url", {
                          required: "URL Address of Partner is required",
                          pattern: {
                            value:
                              /^((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?)*$/i,
                            message: "URL format incorrect",
                          },
                        })}
                      />
                      {errors.partner_url && (
                        <Form.Text className="text-danger">
                          {errors.partner_url.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="trans_currency_code">
                        Currency of Sellout Reporting
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        id="trans_currency_code"
                        name="trans_currency_code"
                        {...register("trans_currency_code", {
                          required: "Currency of Sellout Reporting is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option>AUD</option>
                        <option>INR</option>
                        <option>USD</option>
                      </Form.Select>
                      {errors.trans_currency_code && (
                        <Form.Text className="text-danger">
                          {errors.trans_currency_code.message}
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
                      <Form.Label size="sm" htmlFor="partner_sellout_margin">
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
                        id="partner_sellout_margin"
                        name="partner_sellout_margin"
                        type="number"
                        {...register("partner_sellout_margin", {
                          required: "Partner Sellout Margin is required",
                        })}
                      />
                      {errors.partner_sellout_margin && (
                        <Form.Text className="text-danger">
                          {errors.partner_sellout_margin.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="e2_playbook_type">
                        E2 Playbook Type
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        id="e2_playbook_type"
                        name="e2_playbook_type"
                        {...register("e2_playbook_type", {
                          required: "E2 Playbook Type is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option value={"type1"}>Type 1</option>
                        <option value={"type2"}>Type 2</option>
                        <option value={"type3"}>Type 3</option>
                      </Form.Select>
                      {errors.e2_playbook_type && (
                        <Form.Text className="text-danger">
                          {errors.e2_playbook_type.message}
                        </Form.Text>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Row
                    className={
                      props.module === 'Create'
                        ? "partnerRowCreate"
                        : ""
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
                    {props.module === 'Update' && (
                      <>
                      <Col>
                      <Form.Label size="sm" htmlFor="partner_status">
                        Partner Status
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        className="field-Prop"
                        id="partner_status"
                        name="partner_status"
                        {...register("partner_status", {
                          required: "Partner status is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </Form.Select>
                      {errors.partner_status && (
                        <Form.Text className="text-danger">
                          {errors.partner_status.message}
                        </Form.Text>
                      )}
                    </Col>
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
                      </>
                    )}
                    {props.module === 'Update' && (
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
            { props.showHigherLevelModule && (
              <Row>
                <Card className="card-Panel form-partner-card">
                <Form.Group className="mb-4">
                  <Row>
                    <Col>
                      <Form.Label size="sm" htmlFor="editor">
                        Editor
                      </Form.Label>
                      &nbsp;
                      <Form.Select
                        disabled={ (userRole===roles.editor || userRole===roles.approver)?true:false}
                        size="sm"
                        className="field-Prop"
                        id="editor"
                        name="editor"
                        {...register("editor", {
                          required: "Editor is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option>Direct</option>
                        <option>Indirect</option>
                      </Form.Select>
                      {errors.editor && (
                        <Form.Text className="text-danger">
                          {errors.editor.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="backupEditor">
                        Backup Editor
                      </Form.Label>
                      &nbsp;
                      <Form.Select
                        disabled={ (userRole===roles.editor || userRole===roles.approver)}
                        size="sm"
                        className="field-Prop"
                        id="backupEditor"
                        name="backupEditor"
                        {...register("backupEditor", {
                          required: "Backup Editor is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option>Direct</option>
                        <option>Indirect</option>
                      </Form.Select>
                      {errors.editor && (
                        <Form.Text className="text-danger">
                          {errors.editor.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="approver1">
                        Approver 1
                      </Form.Label>
                      <Form.Select
                        disabled={ (userRole===roles.editor || userRole===roles.approver)}
                        size="sm"
                        className="field-Prop"
                        id="approver1"
                        name="approver1"
                        {...register("approver1", {
                          required: "Approver 1 is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option>Direct</option>
                        <option>Indirect</option>
                      </Form.Select>
                      {errors.approver1 && (
                        <Form.Text className="text-danger">
                          {errors.approver1.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="approver2">
                        Approver 2
                      </Form.Label>
                      <Form.Select
                        disabled={ (userRole===roles.editor || userRole===roles.approver)}
                        size="sm"
                        className="field-Prop"
                        id="approver2"
                        name="approver2"
                        {...register("approver2", {
                          required: "Approver 2 is required",
                        })}
                      >
                        <option value="">N/A</option>
                        <option>Direct</option>
                        <option>Indirect</option>
                      </Form.Select>
                      {errors.approver2 && (
                        <Form.Text className="text-danger">
                          {errors.approver2.message}
                        </Form.Text>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
                </Card>
              </Row>
            )}
            <Row className="mb-3" style={{ float: "right", marginTop: "10px" }}>
              <Col xs="auto">
                  <Button
                    className="btn-upload cancel-header"
                    onClick={() => {
                      handlePatnerCancel(userRole);
                    }}
                  >
                    Cancel
                  </Button>
              </Col>
              <Col xs="auto">
                <Button className="btn-upload save-header" type="submit">
                  { props.module }
                </Button>
                <AlertModel
                      show={ showSuccessModal }
                      handleClose={ handleCloseSuccessModal }
                      body={ successmsg }
                    />
                <AlertModel
                      show={ showErrorModal }
                      handleClose={ handleCloseErrorModal }
                      body={ errormsg }
                    />
              </Col>
            </Row>
          </Form>
        </Container>
      </Row>
    </Container>
  );
}

export default connect(null, { CreatePartnerData })(PartnerComponent);
