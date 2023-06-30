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
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import MyMenu from "../menu/menu.component.js";
import { BiHelpCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import Home from "../../images/home-icon.png";
import "./partner.component.css";
import {
  createPartnerData,
  retrieveAllPartnerData,
  retrievePartnerByRole,
  updatePartner,
  retrieveUserRoleConfigByPartnerId,
  retrievePartnerByPartnerID,
} from "../../actions/partneraction.js";
import {
  retrieveAllCountryData,
  retrieveAllStaticData,
} from "../../actions/staticDataAction.js";
import {
  retrieveAllUserListData,
  createUserPartnerRoleConfig,
} from "../../actions/userAction.js";
import AlertModel from "../modal/alertModel";
import { useNavigate } from "react-router-dom";
import { roles, status, user_login_info } from "../constant.js";
import {
  getAPIDateFormatWithTime,
  getUIDateFormat,
  getUIDateFormatToCompare,
} from "../../helper/helper.js";

function PartnerComponent(props) {
  const navigate = useNavigate();

  //sso login func
  const [userEmail, setUserEmail] = useState('');
  const [userRoleData, setUserRoleData] = useState('');
                
  useEffect(() => {
      const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
      //if user not login then redirect to login page
      if(usrDetails){
        setUserEmail(usrDetails.email_id);
        setUserRoleData(usrDetails.role_id);
      }
  }, []);
  //------------------//

  const location = useLocation();
  const partnerId = new URLSearchParams(location.search).get("id");
  const userRole = new URLSearchParams(location.search).get("role");
  const isHigherLevelUser =
    userRole === roles.admin ||
    userRole === roles.superUser ||
    userRole === roles.superApproverUser;
  console.log("isHigherLevelUser", isHigherLevelUser);

  let userMail = "";

  if (userRole == roles.editor) {
    userMail = "nelson@se.com";
  }
  if (userRole == roles.superUser) {
    userMail = "marie@se.com";
  }
  if (userRole == roles.superApproverUser) {
    userMail = "thomas@se.com";
  }
  if (userRole == roles.admin) {
    userMail = "jean@se.com";
  }
  if (userRole == roles.approve_1) {
    userMail = "katie@se.com";
  }
  if (userRole == roles.approver_2) {
    userMail = "katie@se.com";
  }

  const initialData = {
    partner_id: "",
    platform_name: "",
    country_code: "",
    partner_group: "",
    se_entity: "",
    reseller_name: "",
    partner_account_name: "",
    activation_date: "",
    deactivation_date: "",
    deactivation_reason: null,
    business_type: "",
    model_type: "",
    trans_currency_code: "",
    data_collection_type: "",
    partner_sellout_margin: "",
    partner_url: "",
    e2_playbook_type: "",
    bopp_type: "",
    gtm_type: "",
  };

  const [partnerData, setPartnerData] = useState(initialData);
  const [countryData, setCountryData] = useState([]);
  const [staticData, setStaticData] = useState([]);
  const [usrRoleData, setUsrRoleData] = useState([]);

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    console.log("partnerId", partnerId);
    console.log("props.module", props.module);

    //country api
    props
      .retrieveAllCountryData() //i/p for test purpose
      .then((data) => {
        console.log("retrieveAllCountryData", data);
        setCountryData(data.data);
      })
      .catch((e) => {
        console.log("retrieveAllCountryData", e);
      });

    //all static data
    props
      .retrieveAllStaticData()
      .then((data) => {
        console.log("retrieveAllStaticData", data);
        setStaticData(data.data);
      })
      .catch((e) => {
        console.log("retrieveAllStaticData", e);
      });

    //all static data
    props
      .retrieveAllUserListData()
      .then((data) => {
        console.log("retrieveAllUserListData", data);
        setUsrRoleData(data);
      })
      .catch((e) => {
        console.log("retrieveAllUserListData", e);
      });

    if (props.module === "Update") {
      if (partnerId) {
        //call get by id api
        props
          .retrievePartnerByPartnerID(partnerId) //i/p for test purpose
          .then((data) => {
            setTimeout(() => {
              setPartnerData(data?.data[0]);

              setFormData(data);
            }, 3000);
            //prefill form
          })
          .catch((e) => {
            console.log(e);
          });

        //call get user role config
        props.retrieveUserRoleConfigByPartnerId(partnerId).then((data) => {
          console.log("retrieveUserRoleConfigByPartnerId response", data);
          const respData = data.filter(
            (data) => data.PARTNER_ID === partnerId
          )[0];
          console.log("retrieveUserRoleConfigByPartnerId", respData);
          if (respData?.EDITOR) {
            setTimeout(() => {
              setValue("editor", respData.EDITOR);
            }, 2000);
          }
          if (respData?.BACKUP_EDITOR) {
            setTimeout(() => {
              setValue("backupEditor", respData.BACKUP_EDITOR);
            }, 2000);
          }

          if (respData?.APPROVE_1) {
            setTimeout(() => {
              setValue("approver1", respData.APPROVE_1);
            }, 2000);
          }

          if (respData?.APPROVER_2) {
            setTimeout(() => {
              setValue("approver2", respData.APPROVER_2);
            }, 2000);
          }
        });
      } else {
        setErrorRet(["Partner id missing in url!!"]);

        setShowErrorModal(true);

        setShowSuccessModal(false);
      }
    }
  }, []);

  const setFormData = (datass) => {
    let data = datass?.data[0];
    // trigger();
    if (data.partner_id) {
      setValue("partner_id", data.partner_id);
    }
    if (data.partner_account_name) {
      setValue("partner_account_name", data.partner_account_name);
    }
    if (data.platform_name) {
      setValue("platform_name", data.platform_name);
    }

    if (data.reseller_name) {
      setValue("reseller_name", data.reseller_name);
    }

    if (data.partner_sellout_margin) {
      setValue("partner_sellout_margin", data.partner_sellout_margin);
    }

    if (data.activation_date) {
      setValue("activation_date", getUIDateFormat(data.activation_date));
    }

    if (data.country_code) {
      console.log("coming inside country code condition", data.country_code);

      setValue("country_code", data.country_code);
    }

    if (data.partner_group) {
      setValue("partner_group", data.partner_group);
    }

    if (data.se_entity) {
      setValue("se_entity", data.se_entity);
    }

    if (data.business_type) {
      setValue("business_type", data.business_type);
    }

    if (data.model_type) {
      setValue("model_type", data.model_type);
    }

    if (data.partner_url) {
      setValue("partner_url", data.partner_url);
    }

    if (data.trans_currency_code) {
      setValue("trans_currency_code", data.trans_currency_code);
    }

    if (data.data_collection_type) {
      setValue("data_collection_type", data.data_collection_type);
    }

    if (data.e2_playbook_type) {
      setValue("e2_playbook_type", data.e2_playbook_type);
    }

    if (data.bopp_type) {
      setValue("bopp_type", data.bopp_type);
    }

    if (data.gtm_type) {
      setValue("gtm_type", data.gtm_type);
    }

    if (data.status) {
      setValue("partner_status", data.status);
    }

    if (data.deactivation_date) {
      setValue("deactivation_date", getUIDateFormat(data.deactivation_date));
    }

    if (data.deactivation_reason) {
      setValue("deactivation_reason", data.deactivation_reason);
    }
  };

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };
  const [successRet, setSuccessRet] = useState([]);

  const successmsg = {
    headerLabel: "Success....",
    variant: "success",
    header: successRet,
    content: [],
  };

  const [showErrorModal, setShowErrorModal] = useState(false);
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

  const saveUserPartnerConfigDetails = (
    partner_id,
    reqData,
    isCreateScreen
  ) => {
    let reqUserPartConfData = {
      partner_id: partner_id,
      role_id: userRole,
      country_code: reqData.country_code,
      email_id: userMail, //login user email
      created_by: userMail, //login user email
      created_date: getAPIDateFormatWithTime(new Date().toUTCString()),
      updated_by: userMail, //login user email
      editor: reqData.editor,
      backup_editor: reqData.backupEditor,
      approve_1: reqData.approver1,
      approver_2: reqData.approver2,
      supervisor: "", //super usr
      supervisor_approv_1_2: "", //super approver usr
    };

    console.log(
      "createUserPartnerRoleConfig calling...",
      JSON.stringify(reqUserPartConfData)
    );
    //create user role config
    props
      .createUserPartnerRoleConfig(reqUserPartConfData)
      .then((data) => {
        console.log("createUserPartnerRoleConfig", data);
        setShowSuccessModal(true);
        setShowErrorModal(false);
        if (isCreateScreen) {
          document.getElementById("partner-form").reset();
        }
      })
      .catch((e) => {
        setShowSuccessModal(false);
        setErrorRet([]);
        setShowErrorModal(true);
        console.log("Error", e);
        return;
      });
  };

  const onSubmit = (data) => {
    let formData = data;
    console.log("form data", data);
    let indexOf = formData.partner_sellout_margin.indexOf(".");
    if (indexOf == -1) {
      setErrorRet([]);
    } else {
      setErrorRet(["Decimal values not allowed in Sellout Margin "]);
      setShowErrorModal(true);
      return;
    }
    if (data.partner_id === "" || data.partner_id == undefined) {
      console.log("Calling create api");
      let reqData = {
        platform_name: data.platform_name,
        country_code: data.country_code,
        partner_group: data.partner_group,
        se_entity: data.se_entity,
        reseller_name: data.reseller_name,
        bopp_type: data.bopp_type,
        activation_date: data.activation_date,
        business_type: data.business_type,
        model_type: data.model_type,
        trans_currency_code: data.trans_currency_code,
        data_collection_type: data.data_collection_type,
        partner_sellout_margin: data.partner_sellout_margin,
        partner_url: data.partner_url,
        e2_playbook_type: data.e2_playbook_type,
        gtm_type: data.gtm_type,
        created_by: userMail,
        created_date: getAPIDateFormatWithTime(new Date().toUTCString()),
        modified_by: userMail,
        last_modified_date: new Date().toUTCString(),
        status:
          userRole == roles.admin ||
          userRole == roles.superUser ||
          userRole == roles.superApproverUser
            ? status.active
            : status.pending,
        batch_upload_flag: false,
        active_flag: "false",
      };

      //Create api
      props
        .retrieveAllPartnerData() //i/p for test purpose
        .then((data) => {
          console.log(
            "retrieveAllPartnerData",
            data,
            reqData.partner_account_name
          );
          const respData = data.data.filter(
            (data) => data.platform_name === reqData.platform_name
          );
          console.log("is data already exist", respData);
          let userAlreadyExist = false;
          if (respData.length > 0) {
            userAlreadyExist = true;
            setShowSuccessModal(false);
            setShowErrorModal(true);
            setErrorRet([
              "Partner name already exist, please create new one !!",
            ]);
          }

          if (!userAlreadyExist) {
            props
              .createPartnerData(reqData)
              .then((data) => {
                console.log("createPartnerData", data);
                //create user partner role config for higher level user
                if (
                  userRole === roles.superUser ||
                  userRole === roles.superApproverUser ||
                  userRole === roles.admin
                ) {
                  //call get by id api
                  props
                    .retrieveAllPartnerData() //i/p for test purpose
                    .then((data) => {
                      console.log(
                        "retrieveAllPartnerData",
                        data,
                        reqData.partner_account_name
                      );
                      const respData = data.data.filter(
                        (data) => data.platform_name === reqData.platform_name
                      )[0];
                      console.log("filter by id", respData);
                      saveUserPartnerConfigDetails(
                        respData.partner_id,
                        formData,
                        true
                      );
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                } else {
                  setSuccessRet(['Partner has been created successfully'])
                  setShowSuccessModal(true);
                  setShowErrorModal(false);
                  document.getElementById("partner-form").reset();
                }
              })
              .catch((e) => {
                setShowSuccessModal(false);
                setErrorRet([]);
                setShowErrorModal(true);
                console.log("Error", e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log("Calling update api");

      let reqData = {
        partner_id: data.partner_id,
        platform_name: data.platform_name, //
        country_code: data.country_code,
        partner_group: data.partner_group,
        se_entity: data.se_entity,
        reseller_name: data.reseller_name,
        partner_account_name: data.partner_account_name, //
        activation_date: data.activation_date,
        deactivation_date: data.deactivation_date,
        deactivation_reason: data.deactivation_reason,
        business_type: data.business_type,
        model_type: data.model_type,
        trans_currency_code: data.trans_currency_code,
        data_collection_type: data.data_collection_type,
        partner_sellout_margin: data.partner_sellout_margin,
        partner_url: data.partner_url,
        e2_playbook_type: data.e2_playbook_type,
        bopp_type: data.bopp_type,
        gtm_type: data.gtm_type,
        created_by: userMail,
        created_date: new Date().toUTCString(),
        modified_by: userMail,
        last_modified_date: new Date().toUTCString(),
        status: data.partner_status,
        batch_upload_flag: false,
        active_flag: "False",
      };

      let activationDate = getUIDateFormatToCompare(reqData.activation_date);
      let deactivationDate = "";
      if (reqData?.deactivation_date?.length) {
        deactivationDate = getUIDateFormatToCompare(reqData.deactivation_date);
      }

      if (
        new Date(activationDate).getTime() >
        new Date(deactivationDate).getTime()
      ) {
        setErrorRet([
          "Deactivation date could not be lesser then activation date",
        ]);
        setShowSuccessModal(false);
        setShowErrorModal(true);
        return false;
      }

      //update api

      console.log("update", reqData);

      props
        .updatePartner(reqData)
        .then((data) => {
          console.log("data", data);
          //update user partner role config for higher level user
          if (
            userRole === roles.superUser ||
            userRole === roles.superApproverUser ||
            userRole === roles.admin
          ) {
            saveUserPartnerConfigDetails(partnerId, formData, false);
          } else {
            setSuccessRet(['Partner has been updated successfully'])
            setShowSuccessModal(true);
            setShowErrorModal(false);
          }
        })
        .catch((e) => {
          setShowSuccessModal(false);
          setErrorRet([]);
          setShowErrorModal(true);
          console.log("Error", e);
        });
    }
  };

  const onError = (error) => {
    console.log("date with timezone", new Date());
    console.log("ERROR:::", error);
  };

  const tooltip = (val) => <Tooltip id="tooltip">{val}</Tooltip>;

  const handlePartnerCancel = () => {
    navigate(`/partner/list?role=${userRole}`);
  };

  const updateForm = useCallback((e) => {
    console.log("updateForm", e);
    console.log("updateForm", partnerData);
  }, []);

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
          {userRole === "approve_1" && (
            <Breadcrumb.Item href="/approver_1/home">
              <img
                src={Home}
                alt="home"
                style={{ height: "20px", width: "80px", cursor: "pointer" }}
              />
            </Breadcrumb.Item>
          )}
          {userRole === "approver_2" && (
            <Breadcrumb.Item href="/approver_2/home">
              <img
                src={Home}
                alt="home"
                style={{ height: "20px", width: "80px", cursor: "pointer" }}
              />
            </Breadcrumb.Item>
          )}
          {userRole === "superApproverUser" && (
            <Breadcrumb.Item href="/superApproverUser/home">
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
          <Form
            id="partner-form"
            noValidate
            onSubmit={handleSubmit(onSubmit, onError)}
          >
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
                          "Enter the Account Name to create new partner"
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
                        disabled={props.module === "Update"}
                        type="text"
                        defaultValue={partnerData.platform_name}
                        {...(props.module === "Create" && {
                          ...register("platform_name", {
                            required: "Platform name is required",
                            pattern: {
                              value: /^[a-zA-Z ]*$/i,
                              message: "Platform name can have only alphabets",
                            },
                          }),
                        })}
                      />
                      {errors.platform_name && props.module === "Create" && (
                        <Form.Text className="text-danger">
                          {errors.platform_name.message}
                        </Form.Text>
                      )}
                    </Col>
                    <Col>
                      <Form.Label size="sm" htmlFor="`country_code`">
                        Country
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        id="country_code"
                        name="country_code"
                        defaultValue={partnerData.country_code}
                        {...register("country_code", {
                          required: "Country is required",
                        })}
                      >
                        <option value=""></option>
                        {/* <option value="USA">USA</option> */}
                        {countryData &&
                          countryData.map((row) => (
                            <option value={row.country_code}>
                              {row.country_name}
                            </option>
                          ))}
                      </Form.Select>
                      {errors?.country_code && (
                        <Form.Text className="text-danger">
                          {errors?.country_code?.message}
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
                        defaultValue={partnerData.partner_group}
                        {...register("partner_group", {
                          required: "Partner group is required",
                        })}
                      >
                        <option value=""></option>
                        {/* <option value={'Partner 1'}>Partner 1</option>
                        <option value={"Amazon"}>Amazon</option>
                        <option value={'Lazada'}>Lazada</option> */}
                        {staticData &&
                          staticData
                            .filter(
                              (data) => data.attribute_name === "partner_group"
                            )
                            .map((row) => (
                              <option value={row.attribute_value}>
                                {row.attribute_value}
                              </option>
                            ))}
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
                        defaultValue={partnerData.se_entity}
                        {...register("se_entity", {
                          required: "Schneider Electric Entity is required",
                        })}
                      >
                        <option value=""></option>
                        {/* <option value={"APC"}>APC</option>
                        <option value={"TEST"}>TEST</option>
                        <option value={"Entity 3"}>Entity 3</option> */}
                        {staticData &&
                          staticData
                            .filter(
                              (data) => data.attribute_name === "se_entity"
                            )
                            .map((row) => (
                              <option value={row.attribute_value}>
                                {row.attribute_value}
                              </option>
                            ))}
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
                        defaultValue={partnerData.reseller_name}
                        type="text"
                        {...register("reseller_name", {
                          required: "Reseller name is required",
                          pattern: {
                            value: /^[a-zA-Z ]*$/i,
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
                        disabled
                        {...register("partner_id")}
                        type="text"
                        value={partnerData.partner_id}
                      />
                      <input
                        type="hidden"
                        name="partner_id"
                        value={partnerData.partner_id}
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
                        value={partnerData.partner_account_name}
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
                        disabled={props.module === "Update"}
                        max={new Date().toISOString().split("T")[0]}
                        defaultValue={getUIDateFormat(
                          partnerData.activation_date
                        )}
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
                        defaultValue={partnerData.business_type}
                        name="business_type"
                        {...register("business_type", {
                          required: "Business Type is required",
                        })}
                      >
                        <option value=""></option>
                        {/* <option value={"Electric"}>Electric</option>
                        <option value={"Solar"}>Solar</option>
                        <option value={"TEST"}>TEST</option> */}
                        {staticData &&
                          staticData
                            .filter(
                              (data) => data.attribute_name === "business_type"
                            )
                            .map((row) => (
                              <option value={row.attribute_value}>
                                {row.attribute_value}
                              </option>
                            ))}
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
                        defaultValue={partnerData.model_type}
                        {...register("model_type", {
                          required: "Model Type is required",
                        })}
                      >
                        <option value=""></option>
                        {/* <option value={'E1-Dist'}>E1-Dist</option>
                        <option value={"TEST"}>TEST</option>
                        <option value={"E3"}>E3</option> */}
                        {staticData &&
                          staticData
                            .filter(
                              (data) => data.attribute_name === "model_type"
                            )
                            .map((row) => (
                              <option value={row.attribute_value}>
                                {row.attribute_value}
                              </option>
                            ))}
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
                        defaultValue={partnerData.partner_url}
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
                        <option value=""></option>
                        {/* <option>AUD</option>
                        <option>INR</option>
                        <option>USD</option>
                        <option value={'MYR'}>MYR</option> */}
                        {staticData &&
                          staticData
                            .filter(
                              (data) =>
                                data.attribute_name === "trans_currency_code"
                            )
                            .map((row) => (
                              <option value={row.attribute_value}>
                                {row.attribute_value}
                              </option>
                            ))}
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
                        defaultValue={partnerData.data_collection_type}
                        {...register("data_collection_type", {
                          required: "Data Collection Type is required",
                        })}
                      >
                        <option value=""></option>
                        {/* <option>Actual sellin + est. eCom penetration</option>
                        <option value={"DCTYPE"}>DCTYPE</option> */}
                        {staticData &&
                          staticData
                            .filter(
                              (data) =>
                                data.attribute_name === "data_collection_type"
                            )
                            .map((row) => (
                              <option value={row.attribute_value}>
                                {row.attribute_value}
                              </option>
                            ))}
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
                      <Form.Control
                        size="sm"
                        id="partner_sellout_margin"
                        name="partner_sellout_margin"
                        type="number"
                        defaultValue={partnerData.partner_sellout_margin}
                        {...register("partner_sellout_margin", {
                          required: "Partner Sellout Margin is required",
                          min: {
                            value: 1,
                            message: "Value should be between  1% to 100%",
                          },
                          max: {
                            value: 100,
                            message: "Value should be between  1% to 100%",
                          },
                          // while update this gives error pease chcek once will uncommit
                          // pattern: {
                          //   value: /^(.)$/i,
                          //   message: "Decimal or Negative values are not allowed",
                          // },
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
                        defaultValue={partnerData.e2_playbook_type}
                        {...register("e2_playbook_type", {
                          required: "E2 Playbook Type is required",
                        })}
                      >
                        <option value="Not applicable">Not applicable</option>
                        {/* <option value={"type1"}>Type 1</option>
                        <option value={"type2"}>Type 2</option>
                        <option value={"E2"}>E2</option> */}
                        {staticData &&
                          staticData
                            .filter(
                              (data) =>
                                data.attribute_name === "e2_playbook_type"
                            )
                            .map((row) => (
                              <option value={row.attribute_value}>
                                {row.attribute_value}
                              </option>
                            ))}
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
                      props.module === "Create" ? "partnerRowCreate" : ""
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
                        defaultValue={partnerData.bopp_type}
                        {...register("bopp_type", {
                          required: "Bopp Type is required",
                        })}
                      >
                        <option value="Not applicable">Not applicable</option>
                        {/* <option value={"Adopter"}>Adopter</option>
                        <option value={"Leader"}>Leader</option>
                        <option value={"Novice"}>Novice</option>
                        <option value={"BOPP"}>BOPP</option> */}
                        {staticData &&
                          staticData
                            .filter(
                              (data) => data.attribute_name === "bopp_type"
                            )
                            .map((row) => (
                              <option value={row.attribute_value}>
                                {row.attribute_value}
                              </option>
                            ))}
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
                        defaultValue={partnerData.gtm_type}
                        {...register("gtm_type", {
                          required: "GTM Type is required",
                        })}
                      >
                        <option value=""></option>
                        {/* <option>Direct</option>
                        <option value={"GTM"}>GTM</option> */}
                        {staticData &&
                          staticData
                            .filter(
                              (data) => data.attribute_name === "gtm_type"
                            )
                            .map((row) => (
                              <option value={row.attribute_value}>
                                {row.attribute_value}
                              </option>
                            ))}
                      </Form.Select>
                      {errors.gtm_type && (
                        <Form.Text className="text-danger">
                          {errors.gtm_type.message}
                        </Form.Text>
                      )}
                    </Col>
                    {props.module === "Update" && (
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
                            defaultValue={partnerData.partner_status}
                            {...register("partner_status", {
                              required: "Partner status is required",
                            })}
                          >
                            <option value=""></option>
                            {staticData &&
                              staticData
                                .filter(
                                  (data) =>
                                    data.attribute_name === "partner_status"
                                )
                                .map((row) => (
                                  <option value={row.attribute_value}>
                                    {row.attribute_value}
                                  </option>
                                ))}
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
                            defaultValue={partnerData.deactivation_date}
                            type="date"
                            {...register("deactivation_date", {})}
                          />
                          {errors.deactivation_date && (
                            <Form.Text className="text-danger">
                              {errors.deactivation_date.message}
                            </Form.Text>
                          )}
                        </Col>
                      </>
                    )}
                    {props.module === "Update" && (
                      <Col>
                        <Form.Label size="sm" htmlFor="deactivation_reason">
                          Deactivation reason
                        </Form.Label>
                        <Form.Select
                          size="sm"
                          className="field-Prop"
                          id="deactivation_reason"
                          name="deactivation_reason"
                          defaultValue={partnerData.deactivation_reason}
                          {...register("deactivation_reason", {})}
                        >
                          <option value="">Not applicable</option>
                          {staticData &&
                            staticData
                              .filter(
                                (data) =>
                                  data.attribute_name === "deactivation_reason"
                              )
                              .map((row) => (
                                <option value={row.attribute_value}>
                                  {row.attribute_value}
                                </option>
                              ))}
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
            {props.showHigherLevelModule && (
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
                          disabled={
                            userRole === roles.editor ||
                            userRole === roles.approver_2 ||
                            userRole === roles.approve_1
                              ? true
                              : false
                          }
                          size="sm"
                          className="field-Prop"
                          id="editor"
                          name="editor"
                          {...(isHigherLevelUser && {
                            ...register("editor", {
                              required: "Editor is required",
                            }),
                          })}
                        >
                          <option value=""></option>
                          {usrRoleData &&
                            usrRoleData
                              .filter((role) => role.role_id == "EDITOR")
                              .map((row) => (
                                <option value={row.email_id}>{`${
                                  row.first_name + " " + row.last_name
                                }`}</option>
                              ))}
                        </Form.Select>
                        {errors.editor &&
                          (userRole === roles.admin ||
                            userRole === roles.superUser ||
                            userRole === roles.superApproverUser) && (
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
                          disabled={
                            userRole === roles.editor ||
                            userRole === roles.approver_2 ||
                            userRole === roles.approve_1
                          }
                          size="sm"
                          className="field-Prop"
                          id="backupEditor"
                          name="backupEditor"
                          {...(isHigherLevelUser && {
                            ...register("backupEditor", {
                              required: "Backup Editor is required",
                            }),
                          })}
                        >
                          <option value=""></option>
                          {usrRoleData &&
                            usrRoleData
                              .filter((role) => role.role_id == "BACKUP_EDITOR")
                              .map((row) => (
                                <option value={row.email_id}>{`${
                                  row.first_name + " " + row.last_name
                                }`}</option>
                              ))}
                        </Form.Select>
                        {errors.backupEditor &&
                          (userRole === roles.admin ||
                            userRole === roles.superUser ||
                            userRole === roles.superApproverUser) && (
                            <Form.Text className="text-danger">
                              {errors.backupEditor.message}
                            </Form.Text>
                          )}
                      </Col>
                      <Col>
                        <Form.Label size="sm" htmlFor="approver1">
                          Approver 1
                        </Form.Label>
                        <Form.Select
                          disabled={
                            userRole === roles.editor ||
                            userRole === roles.approver_2 ||
                            userRole === roles.approve_1
                          }
                          size="sm"
                          className="field-Prop"
                          id="approver1"
                          name="approver1"
                          {...(isHigherLevelUser && {
                            ...register("approver1", {
                              required: "Approver 1 is required",
                            }),
                          })}
                        >
                          <option value=""></option>
                          {usrRoleData &&
                            usrRoleData
                              .filter((role) => role.role_id == "APPROVER_1")
                              .map((row) => (
                                <option value={row.email_id}>{`${
                                  row.first_name + " " + row.last_name
                                }`}</option>
                              ))}
                        </Form.Select>
                        {errors.approver1 &&
                          (userRole === roles.admin ||
                            userRole === roles.superUser ||
                            userRole === roles.superApproverUser) && (
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
                          disabled={
                            userRole === roles.editor ||
                            userRole === roles.approver_2 ||
                            userRole === roles.approve_1
                          }
                          size="sm"
                          className="field-Prop"
                          id="approver2"
                          name="approver2"
                          {...(isHigherLevelUser && {
                            ...register("approver2", {
                              required: "Approver 2 is required",
                            }),
                          })}
                        >
                          <option value=""></option>
                          {usrRoleData &&
                            usrRoleData
                              .filter((role) => role.role_id == "APPROVER_2")
                              .map((row) => (
                                <option value={row.email_id}>{`${
                                  row.first_name + " " + row.last_name
                                }`}</option>
                              ))}
                        </Form.Select>
                        {errors.approver2 &&
                          (userRole === roles.admin ||
                            userRole === roles.superUser ||
                            userRole === roles.superApproverUser) && (
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
                    handlePartnerCancel(userRole);
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col xs="auto">
                <Button className="btn-upload save-header" type="submit">
                  {props.module}
                </Button>
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
              </Col>
            </Row>
          </Form>
        </Container>
      </Row>
    </Container>
  );
}

export default connect(null, {
  createPartnerData,
  updatePartner,
  retrieveAllCountryData,
  retrieveAllStaticData,
  retrieveAllUserListData,
  createUserPartnerRoleConfig,
  retrievePartnerByRole,
  retrieveUserRoleConfigByPartnerId,
  retrieveAllPartnerData,
  retrievePartnerByPartnerID,
})(PartnerComponent);
