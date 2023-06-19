import React, { useState, useCallback, useEffect } from "react";
import Select from "../singleSelect.js";
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
import makeAnimated from "react-select/animated";
import PartnerAccountList from "../partnerAccountList.component.js";
import "../save/save.css";
import { 
  retrieveAllPartnerData, 
  retrievePartnerByRole, 
  retrieveAllUserRoleConfig, 
  retrieveUserRoleConfigByEmailIdRoleId 
} from "../../../actions/partneraction.js";
import { retrieveAllStaticData, retrieveAllCountryData } from "../../../actions/staticDataAction.js";
import { connect } from "react-redux";
import { 
  createUserPartnerRoleConfig, 
  createUserProfileConfig, 
  retrieveByEmailId 
} from "../../../actions/userAction.js";
import AlertModal from "../../modal/alertModel.js";
import { roles, status } from "../../constant.js";
import { getAPIDateFormatWithTime } from "../../../helper/helper.js";

function SaveUser(props) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const userRole = new URLSearchParams(location.search).get("role");
  const userEmailId = new URLSearchParams(location.search).get("id");
  const [partnerAccData, setPartnerAccData] = useState({});
  
  let loginUserId = '';

  if(userRole == 'superApproverUser') {
    loginUserId = 'thomas@se.com'
  }
  if(userRole == 'admin') {
    loginUserId = 'jean@se.com'
  } 
  if(userRole == 'superUser') {
    loginUserId = 'marie@se.com'
  }

  const initialForm = {
    firstname: null,
    lastname: null,
    useremailid: null,
    userrole: null,
    userops: null,
    usrzone: null,
    modelType: [],
    usrcountry: [],
    partnerAccNm: [],
  };

  const [form, setForm] = useState(initialForm);

  const onValidate = (value, name) => {
    console.log('onValidate',value, name);
    setError((prev) => ({
      ...prev,
      [name]: { ...prev[name], errorMsg: value },
    }));
  };

  const [error, setError] = useState({
    firstname: {
      isReq: true,
      errorMsg: "",
      onValidateFunc: onValidate,
    },
    lastname: {
      isReq: true,
      errorMsg: "",
      onValidateFunc: onValidate,
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
  const [countryData, setCountryData] = useState([]);
  const [partnerDrpData, setPartnerDrpData] = useState([]);
  const [staticData, setStaticData] = useState([]);
    
  const convertMultiSelectDrpToInputData = (data) => {
    let retData = '';
    if(data){
      let outputData = [];
      data.forEach((row) => {
        outputData = outputData.concat(row.value);
      });

      let retValue = outputData.reduce(function (prev, current) {
        if(prev!=0 || prev!=undefined)
          return prev +","+current;
      }, 0);
      retData = retValue.replace('0,','');
    }
    return retData;
  }

  const convertInputDataToMultiSelectDrp = (data) => {
    let outputData = [];
    if(data){
      let inputData = data.split(',');
      inputData.forEach((row) => {
        outputData = outputData.concat({
          value: row,
          label: row
        });
      });
    }
    return outputData;
  }

  useEffect(() => {
  //country api
  props.retrieveAllCountryData() //i/p for test purpose
    .then((data) => {
      console.log('retrieveAllCountryData', data);
      let countryOptions = [];
      data.data.forEach((countryData) => {
        countryOptions = countryOptions.concat({
          value: countryData.country_code,
          label: countryData.country_name
        });
      });
      //set data
      setCountryData(countryOptions);
    })
    .catch((e) => {
      console.log('retrieveAllCountryData', e);
  });

  //partner api
  props.retrieveAllPartnerData()
  .then((data) => {
    console.log('retrieveAllPartnerData', data);
    let partnerOptions = [];
    data.data.forEach((partnerData) => {
      partnerOptions = partnerOptions.concat({
        value: partnerData.partner_id,
        label: partnerData.partner_account_name
      });
    });
    //set data
    setPartnerDrpData(partnerOptions);
  })
  .catch((e) => {
    console.log(e);
  });

  //all static data
  props.retrieveAllStaticData()
    .then((data) => {
      console.log('retrieveAllStaticData', data);
        let staticAllOptions = [];
        data.data.forEach((row) => {
          staticAllOptions = staticAllOptions.concat({
            value: row.attribute_value,
            label: row.attribute_value,
            category: row.attribute_name
          });
        });
        setStaticData(staticAllOptions);
      })
      .catch((e) => {
        console.log('retrieveAllStaticData', e);
  });
  
  if(props.module === 'Update'){
    //prefil the data
    props.retrieveByEmailId(userEmailId)
      .then((data) => {
        console.log('retrieveByEmailId', data, userEmailId);
        const respData = data.filter(data => data.email_id === userEmailId)[0];
        console.log('filter data', respData);
        //format to form
        let prefillForm = {
          firstname: respData.first_name,
          lastname: respData.last_name,
          useremailid: respData.email_id,
          userrole: respData.role_id,
          userops: respData.ops_val,
          usrzone: respData.zone_val,
          modelType: convertInputDataToMultiSelectDrp(respData.model_val),
          usrcountry: convertInputDataToMultiSelectDrp(respData.country_code)
        }

        console.log('prefillForm', prefillForm);
        //set state of form
        setForm(prefillForm);
        console.log('convertInputDataToMultiSelectDrp', convertInputDataToMultiSelectDrp('model 1,model 2'));
        setOptionModelSelected(convertInputDataToMultiSelectDrp(respData.model_val));
        setOptionCountrySelected(convertInputDataToMultiSelectDrp(respData.country_code));
        //prefill partner drop down
        props.retrieveUserRoleConfigByEmailIdRoleId(prefillForm.useremailid, prefillForm.userrole)
        .then((data) => {
          console.log('retrieveUserRoleConfigByEmailIdRoleId', data);
          let filterData = data.filter(data => data.EMAIL_ID === prefillForm.useremailid && data.ROLE_ID === prefillForm.userrole)
          console.log('filterData', filterData);
          let partnerData = [];
          filterData.forEach((rows, index)=> {
            console.log('partnerDrpData', partnerDrpData);
            props
            .retrievePartnerByRole(prefillForm.useremailid, prefillForm.userrole)
            .then((data) => {
              console.log('retrievePartnerByRole', data);
              let filterData = data.data.filter(data => data.partner_id == rows.PARTNER_ID);
              console.log('partnerData', filterData);
              let partnerDataIndv = {
                value: rows.PARTNER_ID,
                label: filterData[0].partner_account_name//partner_account_name.label
              }
              console.log('partnerDataIndv', partnerDataIndv);
              partnerData = partnerData.concat(partnerDataIndv);
              console.log('partnerData', partnerData);    
              let name = "partnerAccNm";
              setOptionPartnerSelected(partnerData);
              setForm((prev) => ({
                ...prev,
                [name]: partnerData,
              }));
            })
            .catch((e) => {
              console.log('Partner list', e);
            });
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
    }
  }, []);

  const handleCountryChange = (selected) => {
    let name = "usrcountry";
    setOptionCountrySelected(selected);
    console.log("optionSelected", optionCountrySelected);
    setForm((prev) => ({
      ...prev,
      [name]: selected,
    }));
    
    if(selected.length===0){
      onValidate(true, name);
    } else
    {
      onValidate(false, name);
    }
  };

  const handleModelChange = (selected) => {
    let name = "modelType";
    setOptionModelSelected(selected);
    setForm((prev) => ({
      ...prev,
      [name]: selected,
    }));

    if(selected.length===0){
      onValidate(true, name);
    } else
    {
      onValidate(false, name);
    }
  };

  const handlePartnerChange = (selected) => {
    console.log('handlePartnerChange', selected[0]?.value);
    let name = "partnerAccNm";
    setOptionPartnerSelected(selected);
    setForm((prev) => ({
      ...prev,
      [name]: selected,
    }));

    if(selected.length===0){
      onValidate(true, name);
    } else
    {
      onValidate(false, name);
    }

    //call api
    // let partnerId = selected[0]?selected.value:'';
    // console.log('partnerId',partnerId);
    props.retrieveAllUserRoleConfig() //i/p for test purpose
    .then((data) => {
      console.log("retrieveAllPartnerData", data);
      let gridInput = {
        dropdownField: selected,
        data: data
      }

      setPartnerAccData(gridInput);
    })
    .catch((e) => {
      console.log(e);
    });
  };

  const onHandleSelectChange = useCallback((value, name) => {
    console.log('onHandleSelectChange', value, name);
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

    if(value===''){
      onValidate(true, name);
    }
    else
    {
      onValidate(false, name);
    }
  }, []);

  const validateForm = () => {
    let isInvalid = false;
    console.log('error', error);
    Object.keys(error).forEach((x) => {
      const errObj = error[x];
      
      if (errObj.errorMsg) {
        isInvalid = true;
      } else if (errObj.isReq && !form[x]) {
        isInvalid = true;
        onValidate(true, x);
      }
      else if (form.modelType.length === 0) {
        isInvalid = true;
        onValidate(true, x);
      } 
      else if (form.usrcountry.length === 0) {
        isInvalid = true;
        onValidate(true, x);
      } 
      else if (form.partnerAccNm.length === 0) {
        isInvalid = true;
        onValidate(true, x);
      }
    });

    return !isInvalid;
  };

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const successmsg = {
    headerLabel: "Success....",
    variant: "success",
    header: "Data has been saved successfully!!",
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
    content: errorRet
  }

  const upsertUserProfile =(data) =>{
    let payload = {
      partner_id: null,
      role_id: null,
      country_code: null,
      email_id: null,
      created_by: loginUserId, //login user
      updated_by: loginUserId, //login user
      editor: null,
      backup_editor: null,
      approve_1: null,
      approver_2: null,
      supervisor: null,
      supervisor_approv_1_2: null
    }

    if(data.partnerAccNm){
      console.log('data.partnerAccNm', data.partnerAccNm);
      data.partnerAccNm.forEach((row)=>{
        payload.partner_id = row.value; //partner id from multiselect drp
        payload.role_id = data.userrole;
        payload.country_code = 'CHN';
        payload.email_id = data.useremailid;

        switch(data.userrole.toUpperCase())
        {
          case roles.editor.toUpperCase(): payload.editor = data.useremailid; break;
          case roles.backup_editor.toUpperCase(): payload.backup_editor = data.useremailid; break;
          case roles.approver1.toUpperCase(): payload.approve_1 = data.useremailid; break;
          case roles.approver2.toUpperCase(): payload.approve_2 = data.useremailid; break;
          case roles.superUser.toUpperCase(): payload.supervisor = data.useremailid; break;
          case roles.superApproverUser.toUpperCase(): payload.supervisor_approv_1_2 = data.useremailid; break;
        }

        console.log('input createUserPartnerRoleConfig', payload);
        props.createUserPartnerRoleConfig(payload)
          .then((data) => {
            console.log('createUserPartnerRoleConfig o/p', data);
          })
          .catch((e) => {
            setShowSuccessModal(false);
            setErrorRet([]);
            setShowErrorModal(true);
            console.log('Error', e);
            return;
          });
      });

      setShowSuccessModal(true);
      setShowErrorModal(false);
    }
  }

  const handleSubmit = () => {
    const isValid = validateForm();

    if (!isValid) {
      console.error("Invalid Form!");
      return false;
    }

    console.log("Data:", form);

    //api call

    let userData = {
      email_id: form.useremailid,
      role_id: form.userrole,
      first_name: form.firstname,
      last_name: form.lastname,
      status: userRole == roles.admin ? status.active : status.pending,
      modified_by: loginUserId, //login user email id
      created_date: getAPIDateFormatWithTime(new Date().toUTCString()),
      modified_date: getAPIDateFormatWithTime(new Date().toUTCString()),
      active_flag: "True",
      record_start_date: getAPIDateFormatWithTime(new Date().toUTCString()),
      record_end_date: getAPIDateFormatWithTime(new Date().toUTCString()),
      ops_val: form.userops,
      zone_val: form.usrzone,
      model_val: convertMultiSelectDrpToInputData(form.modelType),
      country_code: convertMultiSelectDrpToInputData(form.usrcountry),
    };

    console.log('model type', convertMultiSelectDrpToInputData(form.modelType));
    console.log("Req Data:", userData);

    props.createUserProfileConfig(userData)
        .then((data) => {
          console.log('createUserProfileConfig input', data);
          upsertUserProfile(form);
        })
        .catch((e) => {
          setShowSuccessModal(false);
          setErrorRet([]);
          setShowErrorModal(true);
          console.log('Error', e);
          return;
    });
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
            <Breadcrumb.Item href="/superApproverUser/home">
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
                  <Form.Label size="sm" htmlFor="firstname">
                    First Name
                  </Form.Label>
                  &nbsp;<br/>
                  <input type="text"   
                    name="firstname"
                    title="firstname"
                    disabled={props.module === 'Update'} 
                    className="create-usr-text"
                    placeholder="Enter First Name"
                    value={form.firstname}
                    onChange={ onHandleTextChange }
                    {...error.firstname} /><br/>
                    {error.firstname.errorMsg && (
                    <span className="text-danger">
                        {error.firstname.errorMsg === true ? "First Name is required":""}
                    </span>
                    )}
                </Col>
                <Col className="col-3">
                  <Form.Label size="sm" htmlFor="lastname">
                    Last Name
                  </Form.Label>
                  &nbsp;<br/>
                  <input type="text"   
                    name="lastname"
                    title="lastname"
                    disabled={props.module === 'Update'}
                    className="create-usr-text"
                    placeholder="Enter Last Name"
                    value={form.lastname}
                    onChange={ onHandleTextChange }
                    {...error.lastname} /><br/>
                    {error.lastname.errorMsg && (
                    <span className="text-danger">
                        {error.lastname.errorMsg === true ? "Last Name is required":""}
                    </span>
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
                  <br/>
                  <input type="text"
                    name="useremailid"
                    title="User email id"
                    disabled={props.module === 'Update'}
                    className="create-usr-text"
                    placeholder="Enter User email id"
                    value={form.useremailid}
                    onChange={ onHandleTextChange }
                    {...error.useremailid} /><br/>
                  {error.useremailid.errorMsg && (
                  <span className="text-danger">
                      {error.useremailid.errorMsg === true ? "User email id is required":""}
                  </span>
                  )}
                </Col>
                <Col className="col-3">
                  <Form.Label size="sm" htmlFor="userrole">
                    Role
                  </Form.Label>
                  <Select
                    name="userrole"
                    title="User Role"
                    value={form.userrole} // staticData
                    isDisabled={props.module === 'Update'}
                    options={ staticData.filter(data => data.category === "role_id") }
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
                    options={staticData.filter(data => data.category === "ops_val")}
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
                    options={staticData.filter(data => data.category === "zone_val")}
                    onChangeFunc={onHandleSelectChange}
                    {...error.usrzone}
                  />
                </Col>
                <Col className="col-3">
                  <Form.Label size="sm" htmlFor="modelType">
                    Model Type
                  </Form.Label>
                  <MultiSelectDrp
                    options={staticData.filter(data => data.category === "model_val")}
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
                  {error.modelType.errorMsg && (
                  <span className="text-danger">
                      {error.modelType.errorMsg === true ? "Please select Model Type" : ""}
                  </span>
                  )}
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
                    overlay={tooltip("Type to search or select from dropdown")}>
                    <span>
                      <BiHelpCircle />
                    </span>
                  </OverlayTrigger>
                  <MultiSelectDrp
                    options={countryData}
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
                  />
                  {error.usrcountry.errorMsg && (
                  <span className="text-danger">
                      {error.usrcountry.errorMsg === true ? "Please select Country" : ""}
                  </span>
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
                    options={partnerDrpData}
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
                  {error.partnerAccNm.errorMsg && (
                  <span className="text-danger">
                      {error.partnerAccNm.errorMsg === true ? "Please select Partner Account Name" : ""}
                  </span>
                  )}
                </Col>
                <Col>
                { partnerAccData && partnerAccData.data && optionPartnerSelected && (
                  <PartnerAccountList data={ partnerAccData } />
                )}
                </Col>
              </Row>
            </Card>
            <div>
              <Row className="mb-3" style={{ float: "right", padding: "20px" }}>
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
                  <Button
                    className="btn-upload save-header"
                    onClick={handleSubmit}>
                    {props.module}
                  </Button>
                  <AlertModal
                  show={showSuccessModal}
                  handleClose={handleCloseSuccessModal}
                  body={successmsg}
                />
                <AlertModal
                  show={showErrorModal}
                  handleClose={handleCloseErrorModal}
                  body={errormsg}
                />
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </Row>
    </Container>
  );
}

export default connect(null, { 
  retrieveAllPartnerData,
  retrieveAllCountryData, 
  retrieveAllStaticData,
  createUserPartnerRoleConfig,
  createUserProfileConfig,
  retrievePartnerByRole,
  retrieveByEmailId,
  retrieveAllUserRoleConfig,
  retrieveUserRoleConfigByEmailIdRoleId
 })(SaveUser);