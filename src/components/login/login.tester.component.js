import React, { useCallback, useState } from "react";
import "./login.component.css";
import logo from "./../../images/schneider-electric-logo.svg";
import {
  Button,
  Col,
  Form,
  Row,
  Container,
  Breadcrumb,
  Card,
} from "react-bootstrap";
import { BiHome } from "react-icons/bi";
import MyMenu from "../menu/menu.component";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { retrieveStaticDataByAttrName } from "../../actions/staticDataAction";
import { retrieveByEmailId } from "../../actions/userAction";
import { redirectUrl, signInLink, tokenExpiryMinusAttr } from "../../config";
import { api_ret_client_id, client_id, roles, status, user_login_info, user_not_exist_msg } from "../constant";
import AlertModal from "../modal/alertModel";
import Cookies from "js-cookie";

function TesterLogin(props) {
  const navigate = useNavigate();
  
  const initialState = {
    username: ""
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    reValidateMode: "onChange",
  });

  const [formData, setFormData] = useState(initialState);

  const onSubmit = (data) => {
    loginNavigation(data);
  };

  const onError = (error) => {
    console.log("ERROR:::", error);
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

  const loginNavigation = (data) => {
    props.retrieveByEmailId(data.username)
        .then((data) => {
          data = data.filter(data => data.status === status.active.toUpperCase());
          console.log('retrieveByEmailId', data);
          if(data.length > 0){
          setShowErrorModal(false);
          
          let respData = {
            email_id: data[0].email_id,
            role_id: data[0].role_id,
            first_name: data[0].first_name,
            last_name: data[0].last_name
          };
          
          console.log('respData', respData);
          let principalId = `{'email_id':'${respData.email_id}','role_id':'${respData.role_id}','first_name':'${respData.first_name}','last_name':'${respData.last_name}','status':'ACTIVE','modified_by':'jean@se.com','created_date':'2023-06-29T06:25:30','modified_date':'2023-06-29T06:24:54','ops_val':'Operations Val','zone_val':'Zone Val2','model_val':'Model Val','country_code':'USA'}`;
          //save userinfo in local storage
          localStorage.setItem(user_login_info, principalId.replace(/'/g, '"'));
          //expiring token half hour before ping to avoid conflicts
          let inMinutes = new Date(new Date().getTime() + Number(7200 - tokenExpiryMinusAttr) * 1000); //data.expires_in 2 hr
          Cookies.set('access_token', '0003iVQuKLAfubveu482WxN5ISvy', { expires: inMinutes }) //token expires in a day

          console.log('respData', respData);
          //redirect to home page
          handleNavigation(respData.role_id);
        }
        else {
          //user does not exist
          console.error(user_not_exist_msg);
          setErrorRet([user_not_exist_msg]);
          setShowErrorModal(true);
        }
      })
      .catch((e) => {
        console.log(e);
      })
  };

  const handleNavigation = (usrRole) => {
    console.log('handleNavigation', usrRole);
    if(usrRole === roles.editor.toUpperCase()){
      navigate("/editor/home");
    }
    if(usrRole === roles.backup_editor.toUpperCase()){
      navigate("/editor/home");
    }
    if(usrRole === roles.approve_1.toUpperCase()){
      navigate("/approver_1/home");
    }
    if(usrRole === roles.approver_2.toUpperCase()){
      navigate("/approver_2/home");
    }
    if(usrRole === roles.supervisor_approv_1_2.toUpperCase()){
      navigate("/superApproverUser/home");
    }
    if(usrRole === roles.supervisor.toUpperCase()){
      navigate("/superUser");
    }
    if(usrRole === roles.admin.toUpperCase()){
      navigate("/admin/home");
    }

    console.log('loginNavigation', roles);
  }

  return (
    <Container fluid>
      <Row>
        <Form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
          <Row className="justify-content-center">
            <Card className="cardPanel">
            <Card.Title><center>Only for Testing purpose</center></Card.Title>
              <center>
                <Card.Img className="logo" variant="top" src={logo} />
              </center>
              <Row>
                <Form.Group className="mb-4">
                  <Row className="justify-content-center">
                    <Form.Control
                      size="sm"
                      className="formField"
                      id="username"
                      name="username"
                      placeholder="john@se.com"
                      type="text"
                      {...register("username", {
                        required: "User name is required",
                      })}
                    />
                    {errors.username && (
                      <center>
                        <Form.Text className="text-danger">
                          {errors.username.message}
                        </Form.Text>
                      </center>
                    )}
                  </Row>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Row className="justify-content-center mb-4">
                    <Button
                      className="btn-login save-header btn-create"
                      type="submit"
                      >
                      Login
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
                  </Row>
                </Form.Group>
              </Row>
            </Card>
          </Row>
        </Form>
      </Row>
    </Container>
  );
}

export default connect(null, { retrieveStaticDataByAttrName, retrieveByEmailId })(TesterLogin);