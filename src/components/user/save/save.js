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
  retrieveUserRoleConfigByEmailIdRoleId,
} from "../../../actions/partneraction.js";
import {
  retrieveAllStaticData,
  retrieveAllCountryData,
} from "../../../actions/staticDataAction.js";
import { connect } from "react-redux";
import {
  createUserPartnerRoleConfig,
  createUserProfileConfig,
  retrieveByEmailId,
} from "../../../actions/userAction.js";
import AlertModal from "../../modal/alertModel.js";
import { roles, status, user_login_info } from "../../constant.js";
import { getAPIDateFormatWithTime } from "../../../helper/helper.js";
import { userRoleOptions } from "../optionsData.js";
import DataReviewService from '../../../services/dataReviewServices.js';

function SaveUser(props) {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState('');
  const [userRoleData, setUserRoleData] = useState('');
  var specialArray = [];
  useEffect(() => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    if(usrDetails){
      setUserEmail(usrDetails.email_id);
      setUserRoleData(usrDetails.role_id);
                      
      if(usrDetails.role_id === roles.admin.toUpperCase() ||
      usrDetails.role_id === roles.supervisor.toUpperCase() ||
      usrDetails.role_id === roles.supervisor_approv_1_2.toUpperCase()) {
        console.log('user list for role admin');
      } else {
        navigate("/");
      }
    }
  }, []);
  //------------------//

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const userRole = new URLSearchParams(location.search).get("role");
  const userEmailId = new URLSearchParams(location.search).get("id");
  const [partnerAccData, setPartnerAccData] = useState({});

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
    isDisabled: null
  };

  const [form, setForm] = useState(initialForm);

  const onValidate = (value, name) => {
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
  const [totalPartnerData, setTotalPartnerData] = useState([]);
  const [isDisabledUser, setisDisabledUser] = useState([]);
  const [staticData, setStaticData] = useState([]);

  const convertMultiSelectDrpToInputData = (data) => {
    let retData = "";
    if (data) {
      let outputData = [];
      data.forEach((row) => {
        outputData = outputData.concat(row.value);
      });

      let retValue = outputData.reduce(function (prev, current) {
        if (prev != 0 || prev != undefined) return prev + "," + current;
      }, 0);
      retData = retValue.replace("0,", "");
    }
    return retData;
  };

  const convertInputDataToMultiSelectDrp = (data) => {
    let outputData = [];
    if (data) {
      let inputData = data.split(",");
      inputData.forEach((row) => {
        outputData = outputData.concat({
          value: row,
          label: row,
        });
      });
    }
    return outputData;
  };

  const convertInputDataToMultiSelectDrpOnlyForCountry = (data) => {
    
    let outputData = [];
    let countryList = DataReviewService.getValueForCountryFunc();
    if (data) {
      let inputData = data.split(",");
      inputData.forEach((row) => {
        let countrySpecificName;
        countryList.forEach(element => {
        
          if(element.value == row) {
            countrySpecificName = element.label
          }
        });
        outputData = outputData.concat({
          value: row,
          label: countrySpecificName,
        });
      });
    }
    return outputData;
  };

  useEffect(() => {
    const usrDetails = JSON.parse(localStorage.getItem(user_login_info));
    if(usrDetails){
      setUserEmail(usrDetails.email_id);
      setUserRoleData(usrDetails.role_id);
    }
    //country api
    props
      .retrieveAllCountryData() //i/p for test purpose
      .then((data) => {
        let countryOptions = [];
        data.data.forEach((countryData) => {
          countryOptions = countryOptions.concat({
            value: countryData.country_code,
            label: countryData.country_name,
          });
        });
        //set data
        setCountryData(countryOptions);
        DataReviewService.setValueForCountryFunc(countryOptions)
      })
      .catch((e) => {
        console.log("retrieveAllCountryData", e);
      });

    //partner api
    props
      .retrieveAllPartnerData()
      .then((data) => {
        let partnerOptions = [];
        let partnerOptionsTotal = [];
       // specialArray = data.data;
       
        data.data.forEach((partnerData) => {
          partnerOptions = partnerOptions.concat({
            value: partnerData.partner_id,
            label: partnerData.partner_account_name,
            country_code: partnerData.country_code
          });
          partnerOptionsTotal = partnerOptionsTotal.concat({
            value: partnerData.partner_id,
            label: partnerData.partner_account_name,
            country_code: partnerData.country_code
          });
        });
        //set data
       // setPartnerDrpData(partnerOptions);
        DataReviewService.setValueForPartnerFunc(partnerOptionsTotal);
      })
      .catch((e) => {
        console.log(e);
      });

    //all static data
    props
      .retrieveAllStaticData()
      .then((data) => {
        let staticAllOptions = [];
        data.data.forEach((row) => {
          staticAllOptions = staticAllOptions.concat({
            value: row.attribute_value,
            label: row.attribute_value,
            category: row.attribute_name,
          });
        });
        setStaticData(staticAllOptions);
      })
      .catch((e) => {
        console.log("retrieveAllStaticData", e);
      });

    if (props.module === "Update") {
      //prefill the data
      if (userEmailId) {
        props
          .retrieveByEmailId(userEmailId)
          .then((data) => {
            const respData = data.filter(
              (data) => data.email_id === userEmailId
            )[0];
            //format to form
            let prefillForm = {
              firstname: respData.first_name,
              lastname: respData.last_name,
              useremailid: respData.email_id,
              userrole: respData.role_id,
              userops: respData.ops_val,
              usrzone: respData.zone_val,
              modelType: convertInputDataToMultiSelectDrp(respData.model_val),
              usrcountry: convertInputDataToMultiSelectDrpOnlyForCountry(
                respData.country_code
              ),
              isDisabled: respData.status === status.active.toUpperCase()
            };

            //set state of form
            setForm(prefillForm);
            setOptionModelSelected(
              convertInputDataToMultiSelectDrp(respData.model_val)
            );
            setTimeout(() => {
              setOptionCountrySelected(
                convertInputDataToMultiSelectDrpOnlyForCountry(
                  respData.country_code
                )
              );
            }, 2000);
        
            //prefill partner drop down
            props
              .retrieveUserRoleConfigByEmailIdRoleId(
                prefillForm.useremailid,
                prefillForm.userrole
              )
              .then((data) => {
                let filterData = data.filter(
                  (data) =>
                    data.EMAIL_ID === prefillForm.useremailid &&
                    data.ROLE_ID === prefillForm.userrole
                );
                let partnerData = [];
                filterData.forEach((rows, index) => {
                  props
                    .retrievePartnerByRole(
                      prefillForm.useremailid,
                      prefillForm.userrole
                    )
                    .then((data) => {
                      let filterData = data.data.filter(
                        (data) => data.partner_id == rows.PARTNER_ID
                      );
                      let partnerDataIndv = {
                        value: rows.PARTNER_ID,
                        label: filterData[0].partner_account_name, //partner_account_name.label
                      };
                      partnerData = partnerData.concat(partnerDataIndv);
                      let name = "partnerAccNm";
                      handlePartnerChange(partnerData);
                    })
                    .catch((e) => {
                    });
                });
              });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        setErrorRet(["Email id missing in url!!"]);
        setShowErrorModal(true);
        setShowSuccessModal(false);
      }
    }
  }, []);

  const handleCountryChange = (selected) => {
    let partnerList = [];
    partnerList = DataReviewService.getValueForPartnerFunc();
    let name = "usrcountry";
    setOptionCountrySelected(selected);
    setForm((prev) => ({
      ...prev,
      [name]: selected,
    }));

    if (selected.length === 0) {
      onValidate(true, name);
    } else {
      onValidate(false, name);
    }
    let countryOptions = [];
    selected.forEach((selectedCountry) => {
      partnerList.forEach(partnerEle => {
        if(selectedCountry.value == partnerEle.country_code) {
          countryOptions.push(partnerEle)
        }
      });
    });
    let partnerOptions = [];   
    countryOptions.forEach((partnerData) => {
      partnerOptions = partnerOptions.concat({
        value: partnerData.value,
        label: partnerData.label,
        country_code: partnerData.country_code
      });
    });
    setPartnerDrpData(partnerOptions);
    //set data
  //  setCountryData(countryOptions);

  };

  const handleModelChange = (selected) => {
    let name = "modelType";
    setOptionModelSelected(selected);
    setForm((prev) => ({
      ...prev,
      [name]: selected,
    }));

    if (selected.length === 0) {
      onValidate(true, name);
    } else {
      onValidate(false, name);
    }
  };

  const handlePartnerChange = (selected) => {
    let name = "partnerAccNm";
    setOptionPartnerSelected(selected);
    setForm((prev) => ({
      ...prev,
      [name]: selected,
    }));

    if (selected.length === 0) {
      onValidate(true, name);
    } else {
      onValidate(false, name);
    }

    //call api
    // let partnerId = selected[0]?selected.value:'';
    // console.log('partnerId',partnerId);
    props
      .retrieveAllUserRoleConfig() //i/p for test purpose
      .then((data) => {
        let gridInput = {
          dropdownField: selected,
          data: data,
        };

        setPartnerAccData(gridInput);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleIsDisabledChkChange = (selected) => {
    let name = "isDisabled";
    console.log('handleIsDisabledChkChange', selected);
    setisDisabledUser(selected.target.checked);
    setForm((prev) => ({
      ...prev,
      [name]: selected.target.checked,
    }));
  }

  const onHandleSelectChange = useCallback((value, name) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const resetForm = () => {
    //reset text fields
    let textNames = ["firstname", "lastname", "useremailid"];

    textNames.forEach((row, index) => {
      setForm((prev) => ({
        ...prev,
        [row]: "",
      }));
    });

    //reset single select fields
    let singleSelectNames = ["userrole", "userops", "usrzone"];
    singleSelectNames.forEach((row, index) => {
      onHandleSelectChange(null, row);
    });

    //reset multiselect fields
    handlePartnerChange([]);
    handleModelChange([]);
    handleCountryChange([]);

  };

  const onHandleTextChange = useCallback((event) => {
    let value = event.target.value;
    let name = event.target.name;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value === "") {
      onValidate(true, name);
    } else {
      onValidate(false, name);
    }
  }, []);

  const validateForm = () => {
    let isInvalid = false;
    Object.keys(error).forEach((x) => {
      const errObj = error[x];

      if (errObj.errorMsg) {
        isInvalid = true;
      } else if (errObj.isReq && !form[x]) {
        isInvalid = true;
        onValidate(true, x);
      } else if (form.modelType.length === 0) {
        isInvalid = true;
        onValidate(true, x);
      } else if (form.usrcountry.length === 0) {
        isInvalid = true;
        onValidate(true, x);
      } else if (form?.partnerAccNm?.length === 0) {
        isInvalid = true;
        onValidate(true, x);
      }
    });

    let otherErrors = [];
    let regularExpName = new RegExp(/^[a-zA-Z ]*$/i);
    let regularExpEmail = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    if (!regularExpName.test(form.firstname)) {
      otherErrors.push("Firstname can have only alphabets");
    }

    if (!regularExpName.test(form.lastname)) {
      otherErrors.push("Lastname can have only alphabets");
    }

    if (!regularExpEmail.test(form.useremailid)) {
      otherErrors.push("Email is not in correct format. eg. jean@se.com");
    }

    console.log("errors", otherErrors);
    if (otherErrors.length > 0) {
      isInvalid = true;
    } else {
      isInvalid = false;
    }
    setErrorRet(otherErrors);
    return !isInvalid;
  };

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const [successRet, setSuccessRet] = useState([]);

  const successmsg = {
    headerLabel: "Success....",
    variant: "success",
    header: "Data has been saved successfully!!",
    content: [successRet],
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

  const getPartnerCountryCode = (partnerID) => {
   let listOfPartner = DataReviewService.getValueForPartnerFunc();
   console.log('listOfPartner::::', listOfPartner);
   listOfPartner.forEach(element => {
    if(element.value == partnerID) {
      return element.country_code
    }
   });
  }

  const upsertUserProfile = (data) => {
    console.log('upsertUserpfoile', data);
    let payload = {
      partner_id: null,
      role_id: null,
      country_code: null,
      email_id: null,
      created_by: userEmail, //login user
      created_date: getAPIDateFormatWithTime(new Date().toUTCString()),
      updated_by: userEmail, //login user
      editor: null,
      backup_editor: null,
      approve_1: null,
      approver_2: null,
      supervisor: null,
      supervisor_approv_1_2: null,
    };

    let isError = false;

    if (data.partnerAccNm) {
      console.log("data.partnerAccNm", data.partnerAccNm);
      data.partnerAccNm.forEach( (row)  => {
        payload.partner_id = row.value; //partner id from multiselect drp
        payload.role_id = data.userrole;
        payload.country_code =  row.country_code;
        payload.email_id = data.useremailid;

        switch (data.userrole.toUpperCase()) {
          case roles.editor.toUpperCase():
            payload.editor = data.useremailid;
            break;
          case roles.backup_editor.toUpperCase():
            payload.backup_editor = data.useremailid;
            break;
          case roles.approve_1.toUpperCase():
            payload.approve_1 = data.useremailid;
            break;
          case roles.approver_2.toUpperCase():
            payload.approver_2 = data.useremailid;
            break;
          case roles.supervisor.toUpperCase():
            payload.supervisor = data.useremailid;
            break;
          case roles.supervisor_approv_1_2.toUpperCase():
            payload.supervisor_approv_1_2 = data.useremailid;
            break;
        }

        props
          .createUserPartnerRoleConfig(payload)
          .then((data) => {
          })
          .catch((e) => {
            isError = true;
            setShowSuccessModal(false);
            setErrorRet([]);
            setShowErrorModal(true);
            console.log("Error", e);
            return false;
          });
      });
    }

    if (!isError) {
      setShowSuccessModal(true);
      setShowErrorModal(false);
      if(props.module === "Create"){
        resetForm();
      }
    }
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    if (!isValid) {
      setShowErrorModal(true)
      return false;
    }
    //api call
    if (isValid) {
      postForm();
    }
  };
  
  //inactive set only by admin to block sso login, by default it should be active/pending 
  const getUserStatusUpdate = (isDisabled) => {
    console.log('getUserStatusUpdate', isDisabled);
    if(isDisabled == null || userRoleData !== roles.admin.toUpperCase()){
      return userRole === roles.admin.toUpperCase() ? status.active : status.pending;
    } else {
      return isDisabled === true ? status.active : status.disabled;
    }
  }

  const postForm = () => {
    let userData = {
      email_id: form.useremailid,
      role_id: form.userrole,
      first_name: form.firstname,
      last_name: form.lastname,
      status: getUserStatusUpdate(form.isDisabled), //only admin can directly create user
      modified_by: userEmail, //login user email id
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

    if (props.module == "Update") {
      props
        .createUserProfileConfig(userData)
        .then((data) => {
let newOne = form;
console.log('form that will go to Upsert:::', newOne);
let accountDetails = newOne.partnerAccNm;
let listOfPartner = DataReviewService.getValueForPartnerFunc();
let newAccountArray = [];
accountDetails.forEach(element => {
 
  listOfPartner.forEach(elementPartner => {
   if(element.value == elementPartner.value) {
    let obj = {
      value: element.value,
      label: element.label,
      country_code: elementPartner.country_code
    }
    newAccountArray.push(obj);
   }
  });
});
newOne.partnerAccNm = newAccountArray;


          upsertUserProfile(newOne);
        })

        .catch((e) => {
          setShowSuccessModal(false);
          setErrorRet([]);
          setShowErrorModal(true);
          console.log("Error", e);
        });
    } else {
      props
        .retrieveByEmailId(userData.email_id)
        .then((data) => {
          const respData = data.filter(
            (data) => data.email_id === userData.email_id
          );
          if (respData.length > 0) {
            setShowSuccessModal(false);
            setErrorRet(["User with this email id already exist"]);
            setShowErrorModal(true);
            return false;
          }

          props
            .createUserProfileConfig(userData)
            .then((data) => {
              upsertUserProfile(form);
            })

            .catch((e) => {
              setShowSuccessModal(false);
              setErrorRet([]);
              setShowErrorModal(true);
              console.log("Error", e);
            });
        })

        .catch((e) => {
          setShowSuccessModal(false);
          setErrorRet([]);
          setShowErrorModal(true);
          console.log("Error", e);
        });
    }
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
        {userRole == roles.supervisor_approv_1_2.toUpperCase() ? (
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
        ) : userRole == roles.admin.toUpperCase() ? (
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
        ) : userRole == roles.supervisor.toUpperCase() ? (
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
                  &nbsp;
                  <br />
                  <input
                    type="text"
                    name="firstname"
                    title="firstname"
                    disabled={props.module === "Update"}
                    className="create-usr-text"
                    placeholder="Enter First Name"
                    value={form.firstname}
                    onChange={onHandleTextChange}
                    {...error.firstname}
                  />
                  <br />
                  {error.firstname.errorMsg && (
                    <span className="text-danger">
                      {error.firstname.errorMsg === true
                        ? "First Name is required"
                        : ""}
                    </span>
                  )}
                </Col>
                <Col className="col-3">
                  <Form.Label size="sm" htmlFor="lastname">
                    Last Name
                  </Form.Label>
                  &nbsp;
                  <br />
                  <input
                    type="text"
                    name="lastname"
                    title="lastname"
                    disabled={props.module === "Update"}
                    className="create-usr-text"
                    placeholder="Enter Last Name"
                    value={form.lastname}
                    onChange={onHandleTextChange}
                    {...error.lastname}
                  />
                  <br />
                  {error.lastname.errorMsg && (
                    <span className="text-danger">
                      {error.lastname.errorMsg === true
                        ? "Last Name is required"
                        : ""}
                    </span>
                  )}
                </Col>
                <Col className="col-3">
                  <Form.Label size="sm" htmlFor="useremailid">
                    User email ID
                  </Form.Label>
                  <input
                    type="text"
                    name="useremailid"
                    title="User email id"
                    disabled={props.module === "Update"}
                    className="create-usr-text"
                    placeholder="Enter User email id"
                    value={form.useremailid}
                    onChange={onHandleTextChange}
                    {...error.useremailid}
                  />
                  <br />
                  {error.useremailid.errorMsg && (
                    <span className="text-danger">
                      {error.useremailid.errorMsg === true
                        ? "User email id is required"
                        : ""}
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
					          isDisabled={
                      props.module === "Update" && userRoleData !== roles.admin.toUpperCase()
                    }
                    options={staticData.filter(
                      (data) => data.category === "role_id"
                    )}
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
                    options={staticData.filter(
                      (data) => data.category === "ops_val"
                    )}
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
                    options={staticData.filter(
                      (data) => data.category === "zone_val"
                    )}
                    onChangeFunc={onHandleSelectChange}
                    {...error.usrzone}
                  />
                </Col>
                <Col className="col-3">
                  <Form.Label size="sm" htmlFor="modelType">
                    Model Type
                  </Form.Label>
                  <MultiSelectDrp
                    options={staticData.filter(
                      (data) => data.category === "model_val"
                    )}
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
                      {error.modelType.errorMsg === true
                        ? "Please select Model Type"
                        : ""}
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
                    overlay={tooltip("Type to search or select from dropdown")}
                  >
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
                    onChange={handleCountryChange }
                  />
                  {error.usrcountry.errorMsg && (
                    <span className="text-danger">
                      {error.usrcountry.errorMsg === true
                        ? "Please select Country"
                        : ""}
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
                      {error.partnerAccNm.errorMsg === true
                        ? "Please select Partner Account Name"
                        : ""}
                    </span>
                  )}
                </Col>
                <Col>
                  {partnerAccData &&
                    partnerAccData.data &&
                    optionPartnerSelected && (
                      <PartnerAccountList data={partnerAccData} />
                    )}
                </Col>
              </Row>
              <br />
              {props.module == "Update" && userRoleData == roles.admin.toUpperCase() && (
              <Row className="username-header">
                <Col className="col-3">
                  <Form.Label size="sm" htmlFor="isDisabledUsr">
                  <Form.Check
                    size="sm"
                    reverse
                    type={'switch'}
                    name="frmisDisabled"
                    label={`Allow SSO login`}
                    id={`isDisabledUsr`}
                    value={form.isDisabled}
                    checked={form.isDisabled}
                    onChange={(item) => {
                      handleIsDisabledChkChange(item);
                    }}
                  />
                  </Form.Label>
                </Col>
              </Row>
              )}
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
                    onClick={handleSubmit}
                  >
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
  retrieveUserRoleConfigByEmailIdRoleId,
})(SaveUser);